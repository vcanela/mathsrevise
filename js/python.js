'use strict';
// ── Revision · Python in the browser ────────────────────────────────────────
// The coding pages run real Python in the page, through Skulpt (pinned to
// 1.2.0 and loaded from a CDN, on coding pages only). This file holds:
//
//   Py.block(src), Py.inline(src)   code set in a prompt, with simple colouring
//   Py.tryIt(src)                   code with a ▶ Run button, to see before predicting
//   Py.run(src, o)                  run a program → { out, error }
//   Py.test(src, tests)             run it against tests → { pass, failed }
//   Exercise.Inputs.code            the "write a program" question
//
// A program that runs for more than LIMIT ms is stopped, so a loop that never
// ends cannot freeze the page. Errors keep Python's own names (NameError,
// TypeError …), because reading them is part of learning to program, with a
// plain-English line added.
//
// A code question:
//   input: { kind: 'code', key, starter, model, tests: [ { set, inputs, expect } ] }
//   set     Python literals that replace the program's own assignments, so a
//           test can try other values: { distance: '90', time: '2' }
//   inputs  what input() returns, in order
//   expect  the output, compared line by line, ignoring trailing spaces
// ─────────────────────────────────────────────────────────────────────────────

const Py = (() => {
  const LIMIT = 3000;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── Colouring ─────────────────────────────────────────────────────────────
  const KEYWORDS = new Set(('and as assert break class continue def del elif else except False finally for from ' +
    'global if import in is lambda None nonlocal not or pass raise return True try while with yield').split(' '));
  const BUILTINS = new Set('print input int float str bool len range type round abs min max sum list sorted'.split(' '));
  const TOKEN = /(#[^\n]*)|([fF]?"(?:[^"\\\n]|\\.)*"?|[fF]?'(?:[^'\\\n]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|([^#"'A-Za-z_\d]+|.)/g;

  function highlight(src) {
    let html = '', m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      const [t, comment, str, num, word] = m;
      if (comment) html += `<span class="tk-c">${esc(t)}</span>`;
      else if (str) html += `<span class="tk-s">${esc(t)}</span>`;
      else if (num) html += `<span class="tk-n">${esc(t)}</span>`;
      else if (word && KEYWORDS.has(t)) html += `<span class="tk-k">${esc(t)}</span>`;
      else if (word && BUILTINS.has(t)) html += `<span class="tk-b">${esc(t)}</span>`;
      else html += esc(t);
    }
    return html;
  }
  /** A program set in a prompt. */
  const block = src => `<pre class="code">${highlight(src)}</pre>`;
  /** A line or fragment of code inside a sentence, an option or a list. */
  const inline = src => `<code class="code-inline">${highlight(src)}</code>`;
  /** A program's output, as it would appear on screen. */
  const output = text => `<pre class="code-out-static">${esc(text)}</pre>`;
  /**
   * A program the student can run where it stands: seeing first, then
   * predicting, is the gentle way in. The buttons are wired once, below.
   */
  const tryIt = src => `<div class="try"><pre class="code">${highlight(src)}</pre>` +
    `<button type="button" class="tool-btn try-run" data-src="${esc(src)}">&#9654; Run</button>` +
    `<pre class="code-out try-out" style="display:none"></pre></div>`;

  // ── Running ───────────────────────────────────────────────────────────────
  const available = () => typeof Sk !== 'undefined' && !!Sk.builtinFiles;

  // Coding pages load Skulpt themselves (tools/build-pages.js, same address).
  // Anywhere else, such as the daily mix, it is fetched the first time a
  // program is run, so a maths mix never downloads it.
  const SKULPT = ['https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js',
                  'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js'];
  let loading = null;
  const waitFor = (ok, ms) => new Promise(res => {
    const t0 = Date.now();
    (function poll() { if (ok() || Date.now() - t0 > ms) res(); else setTimeout(poll, 100); })();
  });
  function load() {
    if (available() || typeof document === 'undefined' || !document.head) return Promise.resolve();
    if (!loading) {
      const onPage = SKULPT.every(url => [...document.scripts].some(sc => sc.src === url));
      loading = (onPage
        ? waitFor(available, 15000)
        : SKULPT.reduce((p, url) => p.then(() => new Promise(res => {
            const tag = document.createElement('script');
            tag.src = url; tag.onload = res; tag.onerror = res;
            document.head.appendChild(tag);
          })), Promise.resolve()))
        // If it failed (no connection), let the next Run try again.
        .then(() => { if (!available()) loading = null; });
    }
    return loading;
  }

  const FRIENDLY = {
    SyntaxError: 'Python could not read this line. Look for a missing bracket, quote mark or colon.',
    IndentationError: 'The spaces at the start of a line do not match the lines around it.',
    TypeError: 'This line mixes types that do not go together, such as text and a number. str(), int() and float() convert between them.',
    ValueError: 'A value could not be converted, as in int("3.5") or int("ten").',
    ZeroDivisionError: 'Something was divided by zero.',
    IndexError: 'That position does not exist in the string or list.',
    TimeLimitError: `The program ran for more than ${LIMIT / 1000} seconds, so it was stopped. Is there a loop that never ends?`
  };

  /** A Skulpt error as { name, line, text } in plain English. */
  function describe(e) {
    const name = (e && (e.tp$name || (e.constructor && e.constructor.name))) || 'Error';
    const raw = e && e.toString ? e.toString() : String(e);
    const tb = e && e.traceback && e.traceback[0];
    const line = tb ? tb.lineno : (/line (\d+)/.exec(raw) || [])[1];
    let text = FRIENDLY[name] || raw.replace(/^\w+: /, '').replace(/ on line \d+$/, '');
    if (name === 'NameError') {
      const who = /name '([^']+)'/.exec(raw);
      text = who ? `Python does not know the name ${who[1]}. Check the spelling, and that it has a value before this line.`
                 : 'Python does not know one of the names on this line.';
    }
    return { name: name === 'TimeLimitError' ? 'Stopped' : name, line: line ? Number(line) : null, text };
  }

  // Skulpt is one interpreter per page, so programs take turns.
  let queue = Promise.resolve();

  /**
   * Run a program. `o.inputs` answers input() in order (for tests); without
   * it, `o.ask(prompt)` is asked for each answer (for a student at Run).
   * `o.onOut` receives output as it is printed.
   */
  function run(src, o) {
    o = o || {};
    const job = queue.then(() => (available() ? null : load())).then(() => new Promise(resolve => {
      if (!available()) { resolve({ out: '', error: { name: 'Unavailable', line: null, text: 'Python could not load. Check the internet connection and reload the page.' } }); return; }
      let out = '';
      const answers = o.inputs ? o.inputs.slice() : null;
      Sk.configure({
        __future__: Sk.python3,
        execLimit: o.limit || LIMIT,
        yieldLimit: 100,
        output: t => { out += t; if (o.onOut) o.onOut(t); },
        read: f => {
          if (!Sk.builtinFiles || Sk.builtinFiles.files[f] === undefined) throw new Error("File not found: '" + f + "'");
          return Sk.builtinFiles.files[f];
        },
        inputfunTakesPrompt: true,
        // A test answers input() itself; a student types the answer in.
        inputfun: prompt => answers ? (answers.length ? answers.shift() : '') : (o.ask ? o.ask(prompt) : '')
      });
      Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, src, true))
        .then(() => resolve({ out }), e => resolve({ out, error: describe(e) }));
    }));
    queue = job.catch(() => {});
    return job;
  }

  /** Output as compared in a test: no trailing spaces on a line, no trailing blank lines. */
  const norm = s => String(s).replace(/\r/g, '').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');

  /**
   * The program with some of its variables changed, so one program can be
   * tested on other values. Each name's first top-level assignment is
   * replaced; a name the program never assigns is set at the top.
   */
  function withValues(src, set) {
    const lines = src.split('\n');
    const extra = [];
    for (const [name, literal] of Object.entries(set || {})) {
      const re = new RegExp('^' + name + '\\s*=(?!=)');
      const i = lines.findIndex(l => re.test(l));
      if (i >= 0) lines[i] = `${name} = ${literal}`;
      else extra.push(`${name} = ${literal}`);
    }
    return [...extra, ...lines].join('\n');
  }

  /** Run a program against its tests, stopping at the first that fails. */
  async function test(src, tests) {
    for (const t of tests) {
      const res = await run(withValues(src, t.set), { inputs: t.inputs || [] });
      if (res.error || norm(res.out) !== norm(t.expect)) return { pass: false, failed: { test: t, got: res.out, error: res.error } };
    }
    return { pass: true };
  }

  // ── The code question ─────────────────────────────────────────────────────
  function codeInput(spec) {
    const h = Exercise.h;
    const key = spec.key ? 'mrg_code_' + spec.key : null;
    const starter = spec.starter || '';
    const box = h('textarea', {
      class: 'code-box', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off',
      'aria-label': 'Your program', rows: Math.max(5, starter.split('\n').length + 3)
    });
    let saved = null;
    try { if (key) saved = localStorage.getItem(key); } catch (_) {}
    box.value = saved !== null ? saved : starter;
    const keep = () => { try { if (key) localStorage.setItem(key, box.value); } catch (_) {} };

    // An editor that behaves like one: Tab indents, Enter keeps the indent
    // (and adds one after a colon), Backspace removes a whole indent.
    box.addEventListener('keydown', ev => {
      const { selectionStart: a, selectionEnd: b, value: v } = box;
      const put = (text, from, to, caret) => {
        box.setRangeText(text, from, to, 'end');
        if (caret !== undefined) box.setSelectionRange(caret, caret);
        keep();
      };
      if (ev.key === 'Tab' && !ev.shiftKey) { ev.preventDefault(); put('    ', a, b); }
      else if (ev.key === 'Enter' && !ev.shiftKey && !ev.ctrlKey && !ev.metaKey) {
        const lineStart = v.lastIndexOf('\n', a - 1) + 1;
        const line = v.slice(lineStart, a);
        const indent = (/^ */.exec(line) || [''])[0] + (/:\s*$/.test(line) ? '    ' : '');
        ev.preventDefault();
        put('\n' + indent, a, b);
      } else if (ev.key === 'Backspace' && a === b && a > 0) {
        const lineStart = v.lastIndexOf('\n', a - 1) + 1;
        const before = v.slice(lineStart, a);
        if (before.length && /^ +$/.test(before)) {
          ev.preventDefault();
          const cut = before.length % 4 || 4;
          put('', a - cut, a);
        }
      } else if ((ev.key === 'Enter') && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault(); runIt();
      }
    });
    box.addEventListener('input', keep);

    const out = h('pre', { class: 'code-out', 'aria-live': 'polite', style: 'display:none' });
    const status = h('div', { class: 'code-status' });
    const runBtn = h('button', { type: 'button', class: 'tool-btn code-run', html: '&#9654; Run', title: 'Run (Ctrl+Enter)' });
    const checkBtn = h('button', { type: 'button', class: 'qsubmit sort-check', html: '&#10003; Check' });
    const resetBtn = h('button', { type: 'button', class: 'tool-btn code-reset', text: 'Start again' });

    let passed = false, fails = 0, busy = false;
    const setBusy = on => { busy = on; runBtn.disabled = on; checkBtn.disabled = on || passed; };

    function showError(err) {
      out.appendChild(h('span', { class: 'code-err', text:
        (out.textContent && !out.textContent.endsWith('\n') ? '\n' : '') +
        `${err.name}${err.line ? ' on line ' + err.line : ''}: ${err.text}` }));
    }

    /** A student's own run: output appears as it is printed; input() asks in place. */
    async function runIt() {
      if (busy) return;
      setBusy(true);
      out.style.display = '';
      out.textContent = '';
      status.innerHTML = '';
      const res = await run(box.value, {
        onOut: t => out.appendChild(document.createTextNode(t)),
        ask: prompt => new Promise(resolve => {
          if (prompt) out.appendChild(document.createTextNode(prompt));
          const field = h('input', { type: 'text', class: 'code-in', 'aria-label': 'Input for the program' });
          out.appendChild(field);
          field.focus();
          field.addEventListener('keydown', ev => {
            if (ev.key !== 'Enter') return;
            ev.preventDefault();
            const v = field.value;
            field.replaceWith(document.createTextNode(v + '\n'));
            resolve(v);
          });
        })
      });
      if (res.error) showError(res.error);
      else if (!out.textContent) out.appendChild(h('span', { class: 'code-note', text: '(The program ran, but printed nothing.)' }));
      setBusy(false);
    }

    /** Check against the tests. Only a pass is handed to the engine to mark. */
    async function checkIt() {
      if (busy || passed) return;
      setBusy(true);
      status.innerHTML = '<p class="code-note">Checking…</p>';
      const res = await test(box.value, spec.tests || []);
      if (res.pass) {
        passed = true;
        status.innerHTML = '';
        setBusy(false);
        checkBtn.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true }));
        return;
      }
      fails++;
      const f = res.failed;
      const given = Object.entries(f.test.set || {}).map(([k, v]) => `${k} = ${v}`)
        .concat((f.test.inputs || []).map(v => `input ${JSON.stringify(v)}`));
      status.innerHTML = '';
      status.appendChild(h('p', { class: 'code-verdict', html: '<strong>Not yet</strong>' +
        (given.length ? `With ${given.map(g => inline(g)).join(', ')}, the program should print:` : 'The program should print:') }));
      status.appendChild(h('pre', { class: 'code-out-static', text: f.test.expect }));
      if (f.error) status.appendChild(h('p', { class: 'code-note', text: `Instead it stopped with ${f.error.name}: ${f.error.text}` }));
      else {
        status.appendChild(h('p', { class: 'code-note', text: 'It printed:' }));
        status.appendChild(h('pre', { class: 'code-out-static', text: f.got || '(nothing)' }));
      }
      status.appendChild(h('p', { class: 'code-note', text: 'Change the program and check again. Run it as often as you like.' }));
      setBusy(false);
    }

    runBtn.addEventListener('click', runIt);
    checkBtn.addEventListener('click', checkIt);
    resetBtn.addEventListener('click', () => {
      if (box.value !== starter && !confirm('Put the program back to how it started?')) return;
      box.value = starter; keep(); box.focus();
    });

    return {
      node: h('div', { class: 'code' }, box,
        h('div', { class: 'code-foot' }, runBtn, checkBtn, resetBtn), out, status),
      filled: () => passed,
      focus: () => box.focus(),
      lock() { box.readOnly = true; checkBtn.disabled = true; resetBtn.disabled = true; },
      check: () => ({ ok: passed, fails, correctHTML: '' })
    };
  }
  if (typeof Exercise !== 'undefined') Exercise.Inputs.code = codeInput;

  // ── ▶ Run on code in prompts, learn cards and examples ────────────────────
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', async ev => {
      const btn = ev.target.closest && ev.target.closest('.try-run');
      if (!btn || btn.disabled) return;
      const box = btn.parentElement.querySelector('.try-out');
      btn.disabled = true;
      box.style.display = '';
      box.textContent = '';
      const res = await run(btn.dataset.src, { onOut: t => box.appendChild(document.createTextNode(t)) });
      if (res.error) {
        const err = document.createElement('span');
        err.className = 'code-err';
        err.textContent = (box.textContent ? '\n' : '') + `${res.error.name}${res.error.line ? ' on line ' + res.error.line : ''}: ${res.error.text}`;
        box.appendChild(err);
      } else if (!box.textContent) box.textContent = '(The program printed nothing.)';
      btn.disabled = false;
    });
  }

  return { LIMIT, highlight, block, inline, output, tryIt, run, test, norm, withValues, describe, available };
})();
