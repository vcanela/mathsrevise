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
//   after   code run after the program, such as calls to the function it
//           defines; only what this prints is compared: 'print(area(3, 4))'
//   turtle  true: the turtle records the lines it draws instead of drawing,
//           and the test passes when they match the model's (or an `alts`
//           program's), however the loop was written
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
    (/\bturtle\b/.test(src) ? '<div class="turtle-canvas"></div>' : '') +
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
    if (/printed too much/.test(raw)) {
      return { name: 'Stopped', line: null, text: 'The program printed so much that it was stopped. Is there a loop that never ends?' };
    }
    let text = FRIENDLY[name] || raw.replace(/^\w+: /, '').replace(/ on line \d+$/, '');
    if (name === 'NameError') {
      const who = /name '([^']+)'/.exec(raw);
      text = who ? `Python does not know the name ${who[1]}. Check the spelling, and that it has a value before this line.`
                 : 'Python does not know one of the names on this line.';
    }
    return { name: name === 'TimeLimitError' ? 'Stopped' : name, line: line ? Number(line) : null, text };
  }

  const MAX_OUT = 20000;

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
      // A program that uses the turtle draws in o.turtle (an element), at
      // full speed, starting from a clean screen every run.
      const drawing = !!(o.turtle && /\bturtle\b/.test(src));
      if (drawing) {
        try { if (Sk.TurtleGraphics && Sk.TurtleGraphics.reset) Sk.TurtleGraphics.reset(); } catch (_) {}
        try { if (Sk.sysmodules) Sk.sysmodules.mp$del_subscript(new Sk.builtin.str('turtle')); } catch (_) {}
        o.turtle.innerHTML = '';
        Sk.TurtleGraphics = { target: o.turtle, width: 380, height: 300, animate: false };
      }
      Sk.configure({
        __future__: Sk.python3,
        execLimit: o.limit || (drawing ? 4 * LIMIT : LIMIT),
        yieldLimit: 100,
        // A loop that never ends but prints would flood the page long before
        // the time limit, so too much output stops the program too.
        output: t => {
          out += t;
          if (out.length > MAX_OUT) throw new Sk.builtin.RuntimeError('printed too much');
          if (o.onOut) o.onOut(t);
        },
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

  // ── The turtle under test ─────────────────────────────────────────────────
  // Under Check, `turtle` is this small stand-in: nothing is drawn; every
  // line the pen draws is recorded, its ends rounded to whole steps, so two
  // programs that draw the same picture in different ways record the same set.
  const TURTLE = [
    'import math',
    '_segs = set()',
    'class _Pen:',
    '    def __init__(self):',
    '        self._x = 0.0',
    '        self._y = 0.0',
    '        self._h = 0.0',
    '        self._on = True',
    '    def _line(self, nx, ny):',
    '        if self._on:',
    '            a = (int(round(self._x)), int(round(self._y)))',
    '            b = (int(round(nx)), int(round(ny)))',
    '            if a != b:',
    '                _segs.add((min(a, b), max(a, b)))',
    '        self._x = nx',
    '        self._y = ny',
    '    def forward(self, d):',
    '        self._line(self._x + d * math.cos(math.radians(self._h)), self._y + d * math.sin(math.radians(self._h)))',
    '    fd = forward',
    '    def backward(self, d):',
    '        self.forward(-d)',
    '    bk = backward',
    '    back = backward',
    '    def left(self, a):',
    '        self._h = (self._h + a) % 360',
    '    lt = left',
    '    def right(self, a):',
    '        self.left(-a)',
    '    rt = right',
    '    def penup(self):',
    '        self._on = False',
    '    pu = penup',
    '    up = penup',
    '    def pendown(self):',
    '        self._on = True',
    '    pd = pendown',
    '    down = pendown',
    '    def goto(self, x, y=None):',
    '        if y is None:',
    '            x, y = x',
    '        self._line(x, y)',
    '    setpos = goto',
    '    setposition = goto',
    '    def setheading(self, a):',
    '        self._h = a % 360',
    '    seth = setheading',
    '    def home(self):',
    '        self.goto(0, 0)',
    '        self._h = 0.0',
    '    def __getattr__(self, name):',
    '        return lambda *a, **k: None',
    '_pen = _Pen()',
    'class _Module:',
    '    def Turtle(self):',
    '        return _Pen()',
    '    def Pen(self):',
    '        return _Pen()',
    '    def Screen(self):',
    '        return _Pen()',
    '    def __getattr__(self, name):',
    '        return getattr(_pen, name)',
    'turtle = _Module()'
  ].join('\n');
  const TURTLE_NAMES = ('forward fd backward bk back left lt right rt penup pu up pendown pd down goto setpos setposition ' +
    'setheading seth home color pencolor fillcolor width pensize speed shape begin_fill end_fill hideturtle ht showturtle st ' +
    'done mainloop exitonclick bgcolor Turtle Screen').split(' ');
  const SEP = '\u0001';

  /** The program a test runs: its values set, the turtle recording, calls added after. */
  function caseSource(src, t) {
    let code = withValues(src, t.set);
    if (t.turtle) {
      const star = /^[ \t]*from[ \t]+turtle[ \t]+import[ \t]+\*[ \t]*$/m.test(code);
      code = code.replace(/^[ \t]*(import[ \t]+turtle|from[ \t]+turtle[ \t]+import[ \t]+\*)[ \t]*$/gm, '');
      code = TURTLE + '\n' + (star ? TURTLE_NAMES.map(n => `${n} = turtle.${n}`).join('\n') + '\n' : '') +
             code + '\nprint(sorted(_segs))';
    }
    if (t.after) code += `\nprint("${SEP}")\n` + t.after;
    return code;
  }
  /** The part of a test run's output that is compared. */
  const caseOutput = (out, t) => (t.after ? (String(out).split(SEP + '\n')[1] || '') : out);

  /** What a test expects: written in it, or what the model (or another right answer) records. */
  async function expected(t, spec) {
    if (typeof t.expect === 'string') return [t.expect];
    const progs = [spec.model, ...(spec.alts || [])];
    const outs = [];
    for (const prog of progs) {
      const res = await run(caseSource(prog, t), { inputs: t.inputs || [] });
      outs.push(caseOutput(res.out, t));
    }
    return outs;
  }

  /** Run a program against its tests, stopping at the first that fails. */
  async function test(src, tests, spec) {
    for (const t of tests) {
      const want = await expected(t, spec || {});
      const res = await run(caseSource(src, t), { inputs: t.inputs || [] });
      const got = caseOutput(res.out, t);
      if (res.error || !want.some(w => norm(got) === norm(w))) return { pass: false, failed: { test: t, got, error: res.error, want: want[0] } };
    }
    return { pass: true };
  }

  /**
   * input() at Run: the prompt appears in the output, with a box to type the
   * answer into, as in a terminal. Enter sends it.
   */
  const askIn = box => prompt => new Promise(resolve => {
    if (prompt) box.appendChild(document.createTextNode(prompt));
    const field = document.createElement('input');
    field.type = 'text'; field.className = 'code-in'; field.setAttribute('aria-label', 'Input for the program');
    box.appendChild(field);
    field.focus();
    field.addEventListener('keydown', ev => {
      if (ev.key !== 'Enter') return;
      ev.preventDefault();
      const v = field.value;
      field.replaceWith(document.createTextNode(v + '\n'));
      resolve(v);
    });
  });

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
    const canvas = h('div', { class: 'turtle-canvas', style: 'display:none' });
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
      const turtle = /\bturtle\b/.test(box.value);
      canvas.style.display = turtle ? '' : 'none';
      const res = await run(box.value, {
        turtle: turtle ? canvas : null,
        onOut: t => out.appendChild(document.createTextNode(t)),
        ask: askIn(out)
      });
      if (res.error) showError(res.error);
      else if (!out.textContent) {
        // A drawing is the result, so an empty console under it is just hidden.
        if (turtle && canvas.querySelector('canvas')) out.style.display = 'none';
        else out.appendChild(h('span', { class: 'code-note', text: '(The program ran, but printed nothing.)' }));
      }
      setBusy(false);
    }

    /** Check against the tests. Only a pass is handed to the engine to mark. */
    async function checkIt() {
      if (busy || passed) return;
      setBusy(true);
      status.innerHTML = '<p class="code-note">Checking…</p>';
      const res = await test(box.value, spec.tests || [], spec);
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
        .concat((f.test.inputs || []).map(v => `input ${JSON.stringify(v)}`))
        .concat(f.test.after ? [f.test.after.replace(/\n/g, '; ')] : []);
      status.innerHTML = '';
      if (f.test.turtle) {
        // A drawing cannot be shown as text: say how it differs instead.
        const count = s => (String(s).match(/\(\(/g) || []).length;
        status.appendChild(h('p', { class: 'code-verdict', html: '<strong>Not yet</strong>' + (f.error
          ? `The program stopped with ${f.error.name}: ${f.error.text}`
          : `Your turtle drew ${count(f.got)} ${count(f.got) === 1 ? 'line' : 'lines'}; the drawing asked for has ${count(f.want)}` +
            (count(f.got) === count(f.want) ? ', but they are not in the same places. Check the angles and the lengths.' : '.')) +
          (given.length ? ` (With ${given.map(g => inline(g)).join(', ')}.)` : '') }));
      } else {
        status.appendChild(h('p', { class: 'code-verdict', html: '<strong>Not yet</strong>' +
          (given.length ? `With ${given.map(g => inline(g)).join(', ')}, the program should print:` : 'The program should print:') }));
        status.appendChild(h('pre', { class: 'code-out-static', text: f.want || '(nothing)' }));
        if (f.error) status.appendChild(h('p', { class: 'code-note', text: `Instead it stopped with ${f.error.name}: ${f.error.text}` }));
        else {
          status.appendChild(h('p', { class: 'code-note', text: 'It printed:' }));
          status.appendChild(h('pre', { class: 'code-out-static', text: f.got || '(nothing)' }));
        }
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
        h('div', { class: 'code-foot' }, runBtn, checkBtn, resetBtn), canvas, out, status),
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
      const res = await run(btn.dataset.src, { onOut: t => box.appendChild(document.createTextNode(t)), ask: askIn(box),
        turtle: btn.parentElement.querySelector('.turtle-canvas') });
      if (res.error) {
        const err = document.createElement('span');
        err.className = 'code-err';
        err.textContent = (box.textContent ? '\n' : '') + `${res.error.name}${res.error.line ? ' on line ' + res.error.line : ''}: ${res.error.text}`;
        box.appendChild(err);
      } else if (!box.textContent) {
        if (btn.parentElement.querySelector('.turtle-canvas')) box.style.display = 'none';
        else box.textContent = '(The program printed nothing.)';
      }
      btn.disabled = false;
    });
  }

  return { LIMIT, highlight, block, inline, output, tryIt, run, test, norm, withValues, caseSource, caseOutput, expected, describe, available };
})();
