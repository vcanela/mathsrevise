'use strict';
// ── Revision · Diagnostic ───────────────────────────────────────────────────
// A one-sitting check of where a student is up to in one subject, for the
// teacher. It is not linked from home: the teacher sends the link
// (diagnostic.html?subject=maths).
//
// How it runs
//   A ladder of every topic, easiest first, then the Years 9–10 look-ahead
//   units, then the problem-solving puzzles. Each topic asks one question at
//   normal difficulty; only if that is right does a harder one on the same
//   topic follow. Every Units 1–5 topic is always asked, since those are the
//   ones being considered for retiring. From the look-ahead units on, the
//   sitting ends once the student has missed or skipped the first question
//   of STOP_AFTER topics in a row: that is the ceiling. It also ends after
//   30 minutes.
//
// Marking is silent. Each answer is checked so the ladder knows what to ask
// next, but the student never sees a tick, a cross, a score or a solution.
// Nothing here touches stars, XP or the weekly target.
//
// At the end the student downloads a plain text file: every question, their
// answer, the correct answer, the worked solution and the time taken, plus
// their practice history from the site. Progress is saved in this browser as
// they go, so a closed tab can be reopened and carried on.
// ─────────────────────────────────────────────────────────────────────────────

const Diagnostic = (() => {
  const h = Exercise.h;
  const LIMIT_MIN = 30;
  const STOP_AFTER = 6;
  const KEY = s => 'mrg_diag_' + s;

  // ── The ladder ────────────────────────────────────────────────────────────
  /**
   * The topics in the order they are asked. Maths: Units 1–5 in order, then
   * the look-ahead units by year (Year 9 before Year 10), then Unit 6.
   */
  function ladder(subject) {
    const units = Manifest.units(subject);
    const now = units.filter(u => !u.ahead && u.mix !== false);
    const ahead = units.filter(u => u.ahead);
    const puzzles = units.filter(u => !u.ahead && u.mix === false);
    const live = list => list.flatMap(u => u.exercises.filter(e => !e.soon && window.Topics && window.Topics[e.id]));
    const aheadEx = live(ahead).map((e, i) => ({ e, i })).sort((a, b) => (a.e.year || 9) - (b.e.year || 9) || a.i - b.i).map(x => x.e);
    const section = e => (e.unit.ahead ? 'Looking ahead: Years 9–10' : e.unit.mix === false ? 'Problem solving' : e.unit.short || e.unit.name);
    return [...live(now), ...aheadEx, ...live(puzzles)].map(e => ({ id: e.id, label: e.label, title: e.title, unit: e.unit.name, section: section(e), stretch: !!e.unit.ahead || e.unit.mix === false }));
  }

  // ── Building one question ─────────────────────────────────────────────────
  const SKIP_KINDS = ['code'];
  const isTagged = q => !!q.tag && /challenge|year 9|extension/i.test(q.tag);

  /**
   * One question for a topic. Stage 1: from the normal set, from its middle
   * (the start of a set is the gentlest). Stage 2: from the topic's challenge
   * set if it has one, otherwise from the hard end of the hardest set.
   * The seed makes the same question come back after a reload.
   */
  function makeQuestion(topicId, stage, seed) {
    const topic = window.Topics[topicId];
    const rng = new RNG(seed);
    const hasSci = typeof Sci !== 'undefined';
    if (hasSci) { Sci.memory = false; Sci.challenge = stage === 2 && !!topic.hasChallenge; }
    let all;
    try { all = topic.generate(rng, stage === 1 ? 'core' : 'expert'); }
    finally { if (hasSci) Sci.challenge = false; }
    const usable = (all || []).filter(q => q && q.input && !SKIP_KINDS.includes(q.input.kind));
    if (!usable.length) return null;
    let pool;
    if (stage === 1) {
      const plain = usable.filter(q => !isTagged(q));
      const list = plain.length ? plain : usable;
      const a = Math.floor(list.length * 0.25), b = Math.max(a + 1, Math.ceil(list.length * 0.65));
      pool = list.slice(a, b);
    } else if (topic.hasChallenge) {
      pool = usable;
    } else {
      const tagged = usable.filter(isTagged);
      pool = tagged.length ? tagged : usable.slice(Math.floor(usable.length * 0.6));
    }
    return rng.pick(pool.length ? pool : usable);
  }

  // ── Plain text, for the export ────────────────────────────────────────────
  /** HTML (with TeX left as written) to readable text. */
  function plain(html) {
    if (html === undefined || html === null) return '';
    const div = document.createElement('div');
    div.innerHTML = String(html)
      .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|li|tr|h\d|div)>/gi, '\n').replace(/<(td|th)[^>]*>/gi, ' | ');
    return div.textContent.replace(/\\\(|\\\)/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  /** The question's options, for multiple choice and the like. */
  function optionsText(q) {
    const s = q.input;
    const L = 'abcdefgh';
    if (s.kind === 'choice') return s.options.map((o, i) => `  ${L[i]}) ${plain(o.html)}`).join('\n');
    if (s.kind === 'spot') return s.lines.map((l, i) => `  line ${i + 1}: ${plain(l)}`).join('\n');
    if (s.kind === 'order') return s.items.map(x => '  - ' + plain(x)).join('\n');
    if (s.kind === 'match') return 'Left: ' + s.left.map(plain).join(' / ') + '\nRight: ' + s.right.map((r, j) => `${s.tags[j]}. ${plain(r)}`).join(' / ');
    if (s.kind === 'sort') return 'Groups: ' + s.bins.join(' / ') + '\n' + s.items.map(x => '  - ' + plain(x.text || x)).join('\n');
    if (s.kind === 'label') return 'Labels to choose from: ' + s.options.join(', ');
    return '';
  }

  /** What the student gave, read from the answer area as they left it. */
  function givenText(q, node) {
    const k = q.input.kind;
    const txt = el => (el ? plain(el.innerHTML) : '');
    if (['fill', 'number', 'expr', 'word'].includes(k)) {
      const vals = [...node.querySelectorAll('input')].map(i => i.value.trim());
      return vals.every(v => v === '') ? '' : vals.join(' | ');
    }
    if (k === 'choice') return txt(node.querySelector('.picked'));
    if (k === 'spot') { const rows = [...node.querySelectorAll('li')]; const i = rows.findIndex(r => r.classList.contains('picked')); return i < 0 ? '' : `line ${i + 1}: ${txt(rows[i])}`; }
    if (k === 'order') return [...node.querySelectorAll('.order-slot:not(.empty)')].map((s, i) => `${i + 1}. ${txt(s)}`).join('  ');
    if (k === 'match') return [...node.querySelectorAll('.match-col:first-child button')].map(b => txt(b)).join(' / ');
    if (k === 'sort') return [...node.querySelectorAll('.sort-list > *')].map(r => {
      const pick = r.querySelector('.sort-btn.picked');
      const item = r.cloneNode(true); item.querySelectorAll('.sort-btn').forEach(b => b.remove());
      return `${plain(item.innerHTML)} → ${pick ? pick.textContent : '(none)'}`;
    }).join('\n  ');
    if (k === 'label') return [...node.querySelectorAll('select')].map((s, i) => `${i + 1}: ${s.value || '(none)'}`).join(', ');
    if (k === 'write') { const t = node.querySelector('textarea'); return t ? t.value.trim() : ''; }
    return plain(node.innerHTML);
  }

  /** Whether anything at all has been given, so an empty Next counts as a skip. */
  function anyGiven(q, node) {
    const k = q.input.kind, has = sel => !!node.querySelector(sel);
    if (['fill', 'number', 'expr', 'word'].includes(k)) return [...node.querySelectorAll('input')].some(i => i.value.trim() !== '');
    if (k === 'choice' || k === 'spot') return has('.picked');
    if (k === 'order') return has('.order-slot:not(.empty)');
    if (k === 'match') return has('.pair-tag.set');
    if (k === 'sort') return has('.sort-btn.picked');
    if (k === 'label') return [...node.querySelectorAll('select')].some(s => s.value !== '');
    if (k === 'write') { const t = node.querySelector('textarea'); return !!(t && t.value.trim()); }
    return true;
  }

  // ── Saved state ───────────────────────────────────────────────────────────
  function load(subject) { try { return JSON.parse(localStorage.getItem(KEY(subject))) || null; } catch (_) { return null; } }
  function save(subject, st) { try { localStorage.setItem(KEY(subject), JSON.stringify(st)); } catch (_) {} }

  // ── Page ──────────────────────────────────────────────────────────────────
  const SUBJECT_TEXT = {
    maths: { name: 'Maths', kit: 'Have a calculator, a pen and some paper ready, just as you would for maths homework.' }
  };

  function start() {
    const params = new URLSearchParams(location.search);
    const subject = (params.get('subject') || 'maths').toLowerCase();
    const info = SUBJECT_TEXT[subject] || { name: Manifest.subject(subject).name, kit: 'Have a pen and some paper ready.' };
    document.title = `${info.name} check-in · Revision`;
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';
    const main = h('main', { class: 'diag' });
    root.appendChild(main);

    let st = load(subject);
    // ?restart=1 starts afresh (for the teacher trying it out). It is taken
    // off the address at once, so a reload carries on instead of restarting.
    if (params.has('restart')) {
      st = null;
      try { localStorage.removeItem(KEY(subject)); } catch (_) {}
      params.delete('restart');
      history.replaceState(null, '', location.pathname + '?' + params.toString());
    }
    if (st && st.finished) return finish(main, subject, info, st);
    if (st && st.name) return run(main, subject, info, st);
    intro(main, subject, info);
  }

  function intro(main, subject, info) {
    const name = h('input', { type: 'text', class: 'ans-box wide', placeholder: 'Your first name', 'aria-label': 'Your first name', autocomplete: 'given-name' });
    const go = h('button', { type: 'button', class: 'tool-btn primary', text: 'Start' });
    const card = h('section', { class: 'diag-intro' },
      h('h1', { text: `${info.name}: where are you up to?` }),
      h('p', { class: 'diag-lead', text: 'This is not a test you can pass or fail. It is a map. It shows your teacher which maths you already have sorted, so your practice time can go on the things that will actually stretch you.' }),
      h('h2', { text: 'How it works' }),
      h('ul', {},
        h('li', {}, h('strong', { text: 'It starts easy and gets steadily harder. ' }),
          'By the end there are questions from Years 9 and 10, and some from NCEA Level 1. Nobody is expected to answer them all. Reaching questions you cannot do yet is the whole point: it shows where your edge is.'),
        h('li', {}, h('strong', { text: 'You will not be told if an answer is right or wrong. ' }),
          'That is on purpose. Give each question your best go, then move on.'),
        h('li', {}, h('strong', { text: 'Skip is a good answer. ' }),
          'If you do not know how to start a question, press Skip. A skip tells your teacher something useful, and it is much better than a wild guess. Nobody will think less of you for it.'),
        h('li', {}, h('strong', { text: 'It takes about 30 minutes, then stops by itself. ' }),
          'It may finish sooner. That is fine too, and it does not mean anything went wrong.'),
        h('li', {}, h('strong', { text: 'Your stars, XP and weekly practice are not affected. ' }),
          'Nothing you do here counts against you anywhere on the site.'),
        h('li', {}, h('strong', { text: 'Your answers are saved as you go. ' }),
          'If the page closes, open the same link again and carry on where you were.'),
        h('li', {}, h('strong', { text: 'At the end you will download a file ' }),
          'to give to your teacher. That is all.')),
      h('p', { text: info.kit }),
      h('p', { class: 'diag-lead', text: 'Take a breath, take your time, and do your honest best. Ready?' }),
      h('div', { class: 'diag-actions' }, name, go));
    main.appendChild(card);
    const begin = () => {
      const n = name.value.trim();
      if (!n) { name.focus(); name.classList.add('bad'); return; }
      const st = { name: n, subject, started: new Date().toISOString(), elapsed: 0, pos: 0, stage: 1, misses: 0, seed: null, shownAt: 0, answers: [] };
      save(subject, st);
      main.innerHTML = '';
      run(main, subject, info, st);
    };
    go.addEventListener('click', begin);
    name.addEventListener('keydown', ev => { if (ev.key === 'Enter') begin(); });
    name.focus();
  }

  function run(main, subject, info, st) {
    const topics = ladder(subject);
    const head = h('div', { class: 'diag-head' });
    const section = h('span', { class: 'diag-section' });
    const clock = h('span', { class: 'diag-clock' });
    head.append(section, clock);
    const slot = h('div', {});
    main.append(head, slot);

    // Time counts only while the page is open, a second at a time.
    let last = Date.now();
    const tick = () => {
      const t = Date.now();
      if (!document.hidden) st.elapsed += (t - last) / 1000;
      last = t;
      const left = Math.max(0, LIMIT_MIN - st.elapsed / 60);
      clock.textContent = left > 1 ? `about ${Math.ceil(left)} minutes left` : 'nearly done';
      save(subject, st);
      if (left <= 0) end();
    };
    const timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', () => { last = Date.now(); });

    let ended = false;
    function end() {
      if (ended) return;
      ended = true;
      clearInterval(timer);
      st.finished = new Date().toISOString();
      save(subject, st);
      main.innerHTML = '';
      finish(main, subject, info, st);
    }

    function next() {
      // Past the end of the ladder, or the ceiling reached.
      while (st.pos < topics.length) {
        const t = topics[st.pos];
        if (st.seed === null) st.seed = (Math.random() * 2 ** 32) >>> 0;
        let q = null;
        try { q = makeQuestion(t.id, st.stage, st.seed); } catch (err) { console.error('diagnostic: ' + t.id, err); }
        if (q) return show(t, q);
        // Nothing usable for this stage: move on.
        st.pos++; st.stage = 1; st.seed = null;
      }
      end();
    }

    function show(t, q) {
      slot.innerHTML = '';
      section.textContent = t.section;
      const n = st.answers.length + 1;
      const card = h('article', { class: 'qcard diag-card' });
      card.appendChild(h('div', { class: 'qhead' }, h('span', { class: 'qnum', text: n }), h('div', { class: 'qtext', html: q.prompt })));
      if (q.note) card.appendChild(h('p', { class: 'qnote', html: q.note }));
      let body = card, svg = null;
      if (q.draw) {
        const dw = (q.diagram && q.diagram.w) || 230, dh = (q.diagram && q.diagram.h) || 180;
        svg = document.createElementNS(Geo.NS, 'svg');
        svg.setAttribute('class', 'qdiagram');
        body = h('div', { class: 'qbody with-diagram' });
        card.appendChild(body);
        body.appendChild(h('figure', { class: 'qdia-wrap', style: `width:min(100%, ${dw}px)` }, svg,
          q.diagram && q.diagram.caption ? h('figcaption', { class: 'dia-caption', html: q.diagram.caption }) : null));
        try { q.draw(Geo.canvas(svg, dw, dh), Geo); } catch (err) { console.error(err); }
      }
      // Multiple choice waits for Next instead of moving on at a click.
      const spec = Object.assign({}, q.input, { instant: false });
      const input = Exercise.Inputs[spec.kind](spec);
      const area = h('div', { class: 'qanswer' }, input.node);
      body.appendChild(area);
      const nextBtn = h('button', { type: 'button', class: 'tool-btn primary', text: 'Next →' });
      const skipBtn = h('button', { type: 'button', class: 'tool-btn', text: 'Skip' });
      card.appendChild(h('div', { class: 'diag-actions' }, skipBtn, nextBtn));
      slot.appendChild(card);
      // The inputs' own submit events are for practice pages; here only Next and Skip move on.
      card.addEventListener('ans-submit', ev => ev.stopPropagation(), true);
      card.addEventListener('keydown', ev => {
        if (ev.key === 'Enter' && ev.target.tagName === 'INPUT') { ev.preventDefault(); nextBtn.click(); }
      });
      if (typeof MJ !== 'undefined') MJ.typeset([card]);
      st.shownAt = st.elapsed;
      if (input.focus) try { input.focus(); } catch (_) {}

      const record = skipped => {
        const given = skipped ? '' : givenText(q, input.node);
        const blank = skipped || !anyGiven(q, input.node);
        let ok = false, correct = '';
        if (!blank || q.input.kind !== 'write') {
          try { const r = input.check(); ok = !blank && !!(r && r.ok); correct = r ? plain(r.correctHTML).replace(/^Answer:\s*/, '') : ''; } catch (err) { console.error(err); }
        }
        if (q.input.kind === 'write') ok = !blank;
        const labels = svg ? [...svg.querySelectorAll('text')].map(t => t.textContent.trim()).filter(Boolean) : [];
        st.answers.push({
          n, topic: t.id, label: t.label, title: t.title, unit: t.unit, section: t.section, stage: st.stage,
          kind: q.input.kind, prompt: plain(q.prompt), note: plain(q.note), options: optionsText(q),
          diagram: labels.length ? labels.join(', ') : '', given: blank ? '' : given, result: blank ? 'skipped' : q.input.kind === 'write' ? 'written' : ok ? 'right' : 'wrong',
          correct, explain: plain(q.explain), seconds: Math.round(st.elapsed - st.shownAt)
        });
        // Up the ladder: right at stage 1 earns the harder question; anything
        // else moves on to the next topic.
        if (st.stage === 1 && ok && q.input.kind !== 'write') { st.stage = 2; st.misses = 0; }
        else {
          if (st.stage === 1 && t.stretch) st.misses = ok ? 0 : st.misses + 1;
          st.pos++; st.stage = 1;
        }
        st.seed = null;
        save(subject, st);
        if (st.misses >= STOP_AFTER) return end();
        next();
      };
      nextBtn.addEventListener('click', () => record(false));
      skipBtn.addEventListener('click', () => record(true));
    }

    tick();
    if (!ended) next();
  }

  // ── The end, and the file ─────────────────────────────────────────────────
  function report(subject, info, st) {
    const L = [];
    const mins = Math.round(st.elapsed / 60);
    const count = r => st.answers.filter(a => a.result === r).length;
    L.push(`${info.name.toUpperCase()} DIAGNOSTIC`);
    L.push(`Student: ${st.name}`);
    const when = iso => (iso ? new Date(iso).toLocaleString('en-NZ', { dateStyle: 'medium', timeStyle: 'short' }) : '');
    L.push(`Started: ${when(st.started)}   Finished: ${when(st.finished)}`);
    L.push(`Time used: about ${mins} min of ${LIMIT_MIN}`);
    L.push(`Questions: ${st.answers.length} (right ${count('right')}, wrong ${count('wrong')}, skipped ${count('skipped')}${count('written') ? `, written ${count('written')}` : ''})`);
    const topics = ladder(subject);
    const reached = new Set(st.answers.map(a => a.topic));
    L.push(`Topics reached: ${reached.size} of ${topics.length}` + (reached.size < topics.length ? `; not reached: ${topics.filter(t => !reached.has(t.id)).map(t => t.label).join(', ')}` : ''));
    L.push('');
    L.push('How to read this: each topic starts with a question at normal difficulty (stage 1). Only if that was right did a harder one (stage 2) follow.');
    L.push(`Every Units 1–5 topic is asked. From the look-ahead units on, the sitting stops after ${STOP_AFTER} topics in a row missed or skipped, or at ${LIMIT_MIN} minutes.`);
    L.push('The student saw no marks during the sitting.');
    L.push('');
    L.push('SUMMARY BY TOPIC');
    const byTopic = new Map();
    for (const a of st.answers) { if (!byTopic.has(a.topic)) byTopic.set(a.topic, []); byTopic.get(a.topic).push(a); }
    for (const [, list] of byTopic) {
      const a0 = list[0];
      L.push(`  ${a0.label.padEnd(5)} ${a0.title.padEnd(36)} ${list.map(a => `stage ${a.stage}: ${a.result}`).join('; ')}`);
    }
    L.push('');
    L.push('QUESTIONS');
    for (const a of st.answers) {
      L.push('──────────────────────────────────────────────────────────');
      L.push(`[${a.n}] ${a.label} ${a.title} (${a.unit}) · stage ${a.stage} · ${a.seconds} s · ${a.result.toUpperCase()}`);
      L.push('Question: ' + a.prompt);
      if (a.note) L.push('Note: ' + a.note);
      if (a.diagram) L.push('Diagram labels: ' + a.diagram);
      if (a.options) L.push('Options:\n' + a.options);
      L.push('Student answer: ' + (a.result === 'skipped' ? '(skipped)' : a.given));
      if (a.correct) L.push('Correct answer: ' + a.correct);
      if (a.explain) L.push('Worked solution: ' + a.explain);
    }
    L.push('──────────────────────────────────────────────────────────');
    L.push('');
    L.push('PRACTICE HISTORY ON THIS DEVICE (from the site, before and outside this check-in)');
    for (const t of topics) {
      const r = MRG.getExercise(t.id);
      L.push(`  ${t.label.padEnd(5)} ${t.title.padEnd(36)} stars ${r.stars || 0}/3, attempts ${r.attempts || 0}, best ${r.bestScore || 0} pts${r.last ? ', last ' + r.last : ''}`);
    }
    return L.join('\n') + '\n';
  }

  function finish(main, subject, info, st) {
    const text = report(subject, info, st);
    const d = new Date(st.finished || st.started), pad = x => String(x).padStart(2, '0');
    const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const file = `diagnostic-${subject}-${st.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${day}.txt`;
    const dl = h('button', { type: 'button', class: 'tool-btn primary', text: 'Download my file' });
    dl.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      const a = h('a', { href: url, download: file });
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    });
    const copy = h('button', { type: 'button', class: 'tool-btn', text: 'Copy it instead' });
    copy.addEventListener('click', () => {
      const done = ok => { copy.textContent = ok ? 'Copied' : 'Could not copy: use Download'; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
      else done(false);
    });
    main.appendChild(h('section', { class: 'diag-intro' },
      h('h1', { text: `Thank you, ${st.name}!` }),
      h('p', { class: 'diag-lead', text: 'That is everything. You did exactly what was needed: you showed where you are up to, including the questions that were hard.' }),
      h('p', { text: `Please download your file and give it to your teacher. It is called ${file}.` }),
      h('div', { class: 'diag-actions' }, copy, dl),
      h('p', { class: 'diag-small', text: 'You can come back to this page and download it again on this device.' })));
  }

  return { start, ladder, makeQuestion, report };
})();
