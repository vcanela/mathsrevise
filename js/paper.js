'use strict';
// ── Revision · Timed paper ──────────────────────────────────────────────────
// A short maths paper sat against one clock, to practise managing time in an
// assessment. The skill is budgeting, not speed: see the whole paper first,
// give each question time in proportion to its marks, notice when one runs
// over, and move on so the easy marks at the end are not left unclaimed.
//
// So the paper is built to make those decisions real, and to show the
// student their own pattern afterwards:
//
//   Section A   one question each, early in a topic's set      1 mark each
//   Section B   parts (a), (b), (c) from one topic, rising      1 mark a part
//   Section C   one Unit 6 problem, all or nothing             5 marks
//
// Every question's budget is its marks times the pace (minutes per mark), so
// the rule a student learns is always the same one.
//
// The flow: reading time, where the student sees every question and makes
// four predictions (first, last, longest, finish?); the paper, one question
// on screen at a time so time spent can be measured, answers open until hand
// in, and a quiet note when a question runs well over budget; and results,
// where marks are split into in time and after time and the predictions are
// set against what happened. Nothing is marked until hand in, and running
// out of time never closes the paper.
//
//   paper.html                              the set-up screen
//   paper.html?length=full&pace=exam&units=1,2,3&diff=core&seed=4821
//                                           a specific paper, the same for
//                                           everyone who opens the link
// ─────────────────────────────────────────────────────────────────────────────

const Paper = (() => {

  const LENGTHS = {
    short: { name: 'Short', a: 4, b: 2 },
    full:  { name: 'Full',  a: 8, b: 4 }
  };
  // Minutes per mark. Relaxed is about the rate of an IB maths paper.
  const PACES = {
    relaxed:  { name: 'Relaxed',  perMark: 1.5 },
    standard: { name: 'Standard', perMark: 1.2 },
    exam:     { name: 'Exam',     perMark: 1.0 }
  };
  const PROBLEM_MARKS = 5;
  // How far past its budget a question goes before the quiet note appears.
  const OVER = 1.5;
  const MATHS_UNITS = [1, 2, 3, 4, 5];
  const HISTORY_KEY = 'mrg_papers';
  const PREFS_KEY = 'mrg_paper_prefs';

  const totalMarks = len => len.a + len.b * 3 + PROBLEM_MARKS;
  const totalMinutes = (len, pace) => Math.ceil(totalMarks(len) * pace.perMark - 1e-9);

  /** A budget in minutes, to the nearest half: "1 min", "3½ min". */
  function fmtBudget(min) {
    const halves = Math.max(1, Math.round(min * 2));
    const whole = Math.floor(halves / 2);
    return (whole ? whole : '') + (halves % 2 ? '½' : '') + ' min';
  }
  /** Time spent, in minutes and seconds: "3:05". */
  const fmtClock = ms => {
    const s = Math.max(0, Math.round(ms / 1000));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };

  // ── Building a paper ──────────────────────────────────────────────────────
  // Pure: the same seed and options always give the same paper, which is what
  // lets a class link hand everyone identical questions.

  /** Split a set of n questions into three bands: early, middle, late. */
  const bands = n => [0, 1, 2].map(j => [Math.round(j * n / 3), Math.round((j + 1) * n / 3) - 1]);

  function build(rng, o) {
    const len = LENGTHS[o.length] || LENGTHS.short;
    const units = (o.units && o.units.length ? o.units : MATHS_UNITS);
    const pool = Manifest.live('maths').filter(ex => ex.unit.mix !== false && units.includes(ex.unit.key) && Topics[ex.id]);
    const problems = Manifest.live('maths').filter(ex => ex.unit.mix === false && Topics[ex.id]);
    if (!pool.length || !problems.length) throw new Error('no topics to build a paper from');

    // Deal topics from a shuffled deck, so a paper repeats a topic only once
    // every topic in the chosen units has been used.
    let deck = [];
    const nextTopic = () => { if (!deck.length) deck = rng.shuffle(pool); return deck.pop(); };
    const part = (set, ex, k) => ({ q: set[k], topic: ex.id, title: ex.title, label: ex.label, index: k });

    const items = [];
    for (let i = 0; i < len.a; i++) {
      const ex = nextTopic();
      const set = Topics[ex.id].generate(rng, o.difficulty);
      // The first part of a topic's set: straightforward, quick marks.
      const k = rng.int(0, Math.max(0, Math.min(5, set.length - 1)));
      items.push({ section: 'A', marks: 1, parts: [part(set, ex, k)] });
    }
    for (let i = 0; i < len.b; i++) {
      const ex = nextTopic();
      const set = Topics[ex.id].generate(rng, o.difficulty);
      items.push({ section: 'B', marks: 3, parts: bands(set.length).map(([lo, hi]) => part(set, ex, rng.int(lo, hi))) });
    }
    // The problem is always at core difficulty: it is worth a lot, all or
    // nothing, and is there to be the question that tempts a student to stay.
    const pex = rng.pick(problems);
    const pset = Topics[pex.id].generate(rng, 'core');
    items.push({ section: 'C', marks: PROBLEM_MARKS, parts: [part(pset, pex, rng.int(0, pset.length - 1))] });

    items.forEach((it, i) => { it.n = i + 1; });
    return items;
  }

  /** Options from the URL, or null when there is no paper in it yet. */
  function readOptions() {
    const p = new URLSearchParams(location.search);
    const seed = parseInt(p.get('seed'), 10);
    if (!Number.isFinite(seed)) return null;
    const units = (p.get('units') || '').split(',').map(Number).filter(u => MATHS_UNITS.includes(u));
    return {
      seed: seed >>> 0,
      length: LENGTHS[p.get('length')] ? p.get('length') : 'short',
      pace: PACES[p.get('pace')] ? p.get('pace') : 'standard',
      units: units.length ? units : MATHS_UNITS,
      difficulty: ['core', 'hard', 'expert'].includes(p.get('diff')) ? p.get('diff') : 'core'
    };
  }

  function paperUrl(o) {
    // Written out by hand rather than with URLSearchParams, which would turn
    // the commas into %2C and make a shared link harder to read.
    return `paper.html?length=${o.length}&pace=${o.pace}&units=${o.units.join(',')}&diff=${o.difficulty}&seed=${o.seed}`;
  }

  const store = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } },
    set(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (_) {} }
  };

  // ── Page ──────────────────────────────────────────────────────────────────
  let h, root, main;

  function chrome(eyebrow) {
    document.title = 'Timed Paper · Revision';
    root = document.getElementById('app') || document.body;
    root.innerHTML = '';
    root.appendChild(h('nav', { class: 'crumbs' },
      h('a', { href: 'index.html', text: 'Home' }), h('span', { text: '/' }),
      h('a', { href: 'index.html#maths', text: 'Maths' }), h('span', { text: '/' }),
      h('span', { class: 'here', text: 'Timed paper' })));
    root.appendChild(h('header', { class: 'unit-head' },
      h('div', { class: 'unit-title' },
        h('h1', { text: 'Timed Paper' }),
        h('p', { text: 'Practise sharing your time across a whole paper, so no marks are left unclaimed at the end.' }),
        h('p', { class: 'unit-facts', text: eyebrow }))));
    main = h('main', { class: 'paper' });
    root.appendChild(main);
    root.appendChild(h('footer', { class: 'page-foot', text: 'Revision · Timed paper' }));
  }

  /** A row of buttons acting as one choice. */
  function chips(options, value, onPick) {
    const btns = options.map(([v, label]) => h('button', {
      type: 'button', class: 'paper-chip' + (v === value ? ' picked' : ''), html: label,
      onclick() { btns.forEach(b => b.classList.toggle('picked', b === this)); onPick(v); }
    }));
    return h('div', { class: 'paper-chips' }, btns);
  }

  // ── 1. Set-up ─────────────────────────────────────────────────────────────
  function renderSetup() {
    chrome('Maths');
    const level = MRG.getCurrentLevel();
    const prefs = store.get(PREFS_KEY, {});
    const o = {
      length: LENGTHS[prefs.length] ? prefs.length : 'short',
      pace: PACES[prefs.pace] ? prefs.pace : 'standard',
      units: (prefs.units || MATHS_UNITS).filter(u => MATHS_UNITS.includes(u)),
      difficulty: level.level >= 4 ? 'expert' : level.level >= 3 ? 'hard' : 'core'
    };
    if (!o.units.length) o.units = MATHS_UNITS.slice();

    const summary = h('p', { class: 'paper-summary' });
    const go = h('button', { type: 'button', class: 'tool-btn primary', text: 'Build my paper' });
    const paint = () => {
      const len = LENGTHS[o.length], pace = PACES[o.pace];
      summary.innerHTML = `<strong>${totalMarks(len)} marks in ${totalMinutes(len, pace)} minutes</strong>: ` +
        `${len.a + len.b + 1} questions, about ${Math.round(pace.perMark * 60)} seconds a mark.`;
      go.disabled = !o.units.length;
    };

    const unitBoxes = Manifest.units('maths').filter(u => MATHS_UNITS.includes(u.key)).map(u =>
      h('label', { class: 'paper-unit' },
        h('input', { type: 'checkbox', checked: o.units.includes(u.key) || null, onchange(e) {
          o.units = e.target.checked ? [...o.units, u.key].sort() : o.units.filter(k => k !== u.key);
          paint();
        } }),
        h('span', { text: u.name })));

    main.appendChild(h('section', { class: 'paper-panel' },
      h('p', {}, 'This is not a race. A paper tests whether you can share your time across every question, ' +
        'instead of starting at question 1 and hoping to reach the end. Before the clock starts you will see the ' +
        'whole paper, with a time budget for each question, and make a short plan. Afterwards you will see where your time actually went.'),
      h('h2', { text: 'Length' }),
      chips(Object.entries(LENGTHS).map(([k, l]) => [k, `${l.name} <span>${totalMarks(l)} marks</span>`]), o.length, v => { o.length = v; paint(); }),
      h('h2', { text: 'Pace' }),
      chips(Object.entries(PACES).map(([k, p]) => [k, `${p.name} <span>${p.perMark === 1 ? '1 minute' : p.perMark + ' minutes'} a mark</span>`]), o.pace, v => { o.pace = v; paint(); }),
      h('h2', { text: 'Units' }),
      h('div', { class: 'paper-units' }, unitBoxes),
      h('p', { class: 'paper-small', text: 'Every paper ends with one problem from Unit 6, worth 5 marks.' }),
      summary,
      h('div', { class: 'results-btns' }, go)));

    go.addEventListener('click', () => {
      store.set(PREFS_KEY, { length: o.length, pace: o.pace, units: o.units });
      location.href = paperUrl({ ...o, seed: (Math.random() * 2 ** 32) >>> 0 });
    });
    paint();
  }

  // ── Question cards ────────────────────────────────────────────────────────
  // The same parts as an exercise card, without the timer, the help or the
  // per-question tick: nothing is marked until the paper is handed in.
  function partCard(p, label) {
    const q = p.q;
    const card = h('article', { class: 'qcard paper-card' });
    card.appendChild(h('div', { class: 'qhead' },
      h('span', { class: 'qnum', text: label }),
      h('div', { class: 'qtext', html: q.prompt })));
    if (q.note) card.appendChild(h('p', { class: 'qnote', html: q.note }));

    let body = card;
    if (q.draw) {
      const dw = (q.diagram && q.diagram.w) || 230;
      const dh = (q.diagram && q.diagram.h) || 180;
      const svg = document.createElementNS(Geo.NS, 'svg');
      svg.setAttribute('class', 'qdiagram');
      body = h('div', { class: 'qbody with-diagram' });
      card.appendChild(body);
      body.appendChild(h('figure', { class: 'qdia-wrap', style: `width:min(100%, ${dw}px)` }, svg,
        q.diagram && q.diagram.caption ? h('figcaption', { class: 'dia-caption', html: q.diagram.caption }) : null));
      try { q.draw(Geo.canvas(svg, dw, dh), Geo); }
      catch (err) { console.error('diagram failed on question ' + label, err); }
    }
    const input = Exercise.Inputs[q.input.kind](q.input);
    const fb = h('p', { class: 'qfeedback' });
    body.appendChild(h('div', { class: 'qanswer' }, input.node, fb));
    return { card, input, fb };
  }

  const partLabel = (it, j) => it.parts.length > 1 ? `${it.n}(${'abc'[j]})` : String(it.n);
  const sectionName = { A: 'Section A · short questions', B: 'Section B · multi-part questions', C: 'Section C · problem' };

  // ── 2. Reading time and predictions ───────────────────────────────────────
  function renderPaper(o) {
    chrome('Maths · ' + LENGTHS[o.length].name + ' paper');
    const len = LENGTHS[o.length], pace = PACES[o.pace];
    const items = build(new RNG(o.seed), o);
    const maxMarks = totalMarks(len);
    const totalMs = totalMinutes(len, pace) * 60000;
    items.forEach(it => { it.budgetMin = it.marks * pace.perMark; it.budgetMs = it.budgetMin * 60000; });

    // Every part gets its card now. In reading time they are inert, so the
    // student can read but not answer; the same cards are used in the paper.
    const blocks = items.map(it => {
      it.cards = it.parts.map((p, j) => partCard(p, partLabel(it, j)));
      it.head = h('div', { class: 'paper-qhead' },
        h('h2', { text: `Question ${it.n}` }),
        h('span', { class: 'paper-meta', text: `${it.marks} ${it.marks === 1 ? 'mark' : 'marks'} · budget about ${fmtBudget(it.budgetMin)}` }));
      it.block = h('section', { class: 'paper-q', 'data-section': it.section }, it.head, it.cards.map(c => c.card));
      return it.block;
    });

    // ── Reading screen ──
    const plan = { first: null, last: null, longest: null, finish: null };
    const start = h('button', { type: 'button', class: 'tool-btn primary', text: 'Start the clock', disabled: true });
    const ready = () => { start.disabled = !Object.values(plan).every(v => v !== null); };
    const qOpts = items.map(it => [it.n, 'Q' + it.n]);

    const share = h('button', { type: 'button', class: 'tool-btn', text: 'Copy a link to this paper',
      onclick() {
        const url = new URL(paperUrl(o), location.href).href;
        const done = () => { share.textContent = 'Link copied'; };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, () => prompt('Copy this link:', url));
        else prompt('Copy this link:', url);
      } });

    const reading = h('div', { class: 'paper-reading' },
      h('section', { class: 'paper-panel' },
        h('h2', { text: 'Reading time' }),
        h('p', { class: 'paper-summary', html:
          `<strong>${maxMarks} marks in ${totalMs / 60000} minutes</strong>: about ${Math.round(pace.perMark * 60)} seconds a mark. ` +
          `So a 1-mark question deserves about ${fmtBudget(pace.perMark)}, a 3-mark question about ${fmtBudget(3 * pace.perMark)}, ` +
          `and the ${PROBLEM_MARKS}-mark problem about ${fmtBudget(PROBLEM_MARKS * pace.perMark)}.` }),
        h('p', {}, 'Read the whole paper below before you start. The clock is not running yet; take a couple of minutes. ' +
          'Then plan, by answering the four questions at the bottom.'),
        h('div', { class: 'paper-share' }, share,
          h('span', { class: 'paper-small', text: 'Everyone who opens the link gets this same paper.' }))));

    let lastSection = null;
    const preview = h('div', { class: 'paper-preview', inert: '' });
    items.forEach((it, i) => {
      if (it.section !== lastSection) { preview.appendChild(h('h3', { class: 'paper-section', text: sectionName[it.section] })); lastSection = it.section; }
      preview.appendChild(blocks[i]);
    });
    reading.appendChild(preview);

    reading.appendChild(h('section', { class: 'paper-panel paper-plan' },
      h('h2', { text: 'Your plan' }),
      h('p', { class: 'paper-small', text: 'Only you see this. It comes back in your results, next to what actually happened.' }),
      h('h3', { text: 'Which question will you do first?' }), chips(qOpts, null, v => { plan.first = v; ready(); }),
      h('h3', { text: 'Which will you leave until last?' }), chips(qOpts, null, v => { plan.last = v; ready(); }),
      h('h3', { text: 'Which do you expect to take longest?' }), chips(qOpts, null, v => { plan.longest = v; ready(); }),
      h('h3', { text: 'Will you finish in time?' }),
      chips([['comfortably', 'Comfortably'], ['just', 'Just'], ['no', 'No']], null, v => { plan.finish = v; ready(); }),
      h('div', { class: 'results-btns' }, start)));

    main.appendChild(reading);
    MJ.typeset([main]);

    start.addEventListener('click', () => {
      reading.remove();
      runPaper({ o, items, plan, maxMarks, totalMs });
      window.scrollTo(0, 0);
    });
  }

  // ── 3. The paper ──────────────────────────────────────────────────────────
  function runPaper(P) {
    const { items, maxMarks, totalMs } = P;
    const parts = items.flatMap(it => it.cards.map(c => ({ it, c, first: null, last: null, filledAtEnd: false })));
    items.forEach(it => { it.spent = 0; it.first = null; it.flagged = false; it.noted = false; });

    let current = 0, elapsed = 0, timeUp = false, allFilledAt = null, running = true;
    let lastTick = Date.now();

    const clock = h('span', { class: 'paper-clock' });
    const fill = h('div', { class: 'paper-time-fill' });
    const nav = h('div', { class: 'paper-nav' });
    const handIn = h('button', { type: 'button', class: 'tool-btn primary', text: 'Hand in' });
    const bar = h('div', { class: 'paper-bar' },
      h('div', { class: 'paper-bar-top' }, clock, handIn),
      h('div', { class: 'paper-time' }, fill), nav);
    const banner = h('p', { class: 'paper-banner', style: 'display:none',
      text: 'Time is up. Keep going if you like: anything you answer from now counts as after time.' });
    const note = h('p', { class: 'paper-note', style: 'display:none' });
    const view = h('div', { class: 'paper-view' });
    const flagBtn = h('button', { type: 'button', class: 'tool-btn', onclick() { items[current].flagged = !items[current].flagged; paintNav(); } });
    const prev = h('button', { type: 'button', class: 'tool-btn', text: '← Previous', onclick() { show(current - 1); } });
    const next = h('button', { type: 'button', class: 'tool-btn', text: 'Next →', onclick() { show(current + 1); } });
    const foot = h('div', { class: 'paper-foot' }, prev, flagBtn, next);

    main.appendChild(bar);
    main.appendChild(banner);
    main.appendChild(view);
    main.appendChild(note);
    main.appendChild(foot);

    const chipsEls = items.map((it, i) => h('button', { type: 'button', class: 'paper-qchip',
      title: `Question ${it.n}: ${it.marks} ${it.marks === 1 ? 'mark' : 'marks'}`, onclick() { show(i); } },
      h('span', { class: 'n', text: 'Q' + it.n }), h('span', { class: 'm', text: it.marks + (it.marks === 1 ? ' mark' : ' marks') })));
    nav.append(...chipsEls);

    // Any interaction with a part counts as working on it. The first one
    // records the order questions were tackled; the last decides whether an
    // answer was in time.
    parts.forEach(p => {
      const touch = ev => {
        if (!running) return;
        // Clicking the question text to read it is not working on it.
        if (ev.type === 'click' && !(ev.target.closest && ev.target.closest('button, input, select, textarea, label, li'))) return;
        if (p.first === null) p.first = elapsed;
        if (p.it.first === null) p.it.first = elapsed;
        p.last = elapsed;
        setTimeout(paintNav, 0);
      };
      ['input', 'change', 'click', 'keydown'].forEach(ev => p.c.card.addEventListener(ev, touch, true));
    });

    const filled = p => { try { return p.c.input.filled(); } catch (_) { return false; } };
    const itemState = it => {
      const f = parts.filter(p => p.it === it).map(filled);
      return f.every(Boolean) ? 'answered' : f.some(Boolean) ? 'partial' : '';
    };

    function paintNav() {
      chipsEls.forEach((c, i) => {
        const it = items[i];
        c.className = 'paper-qchip ' + itemState(it) + (i === current ? ' current' : '') + (it.flagged ? ' flagged' : '');
      });
      flagBtn.textContent = items[current].flagged ? '⚑ Flagged' : '⚑ Flag to come back';
      prev.disabled = current === 0;
      next.disabled = current === items.length - 1;
    }

    function show(i) {
      if (i < 0 || i >= items.length) return;
      current = i;
      view.innerHTML = '';
      const it = items[i];
      view.appendChild(h('p', { class: 'paper-section', text: sectionName[it.section] }));
      view.appendChild(it.block);
      paintNote();
      paintNav();
      const firstInput = it.cards[0].input;
      if (firstInput.focus && matchMedia('(pointer: fine)').matches) try { firstInput.focus(); } catch (_) {}
    }

    function paintNote() {
      const it = items[current];
      if (it.spent > OVER * it.budgetMs) {
        it.noted = true;
        note.textContent = `${fmtClock(it.spent)} on a ${it.marks}-mark question, against a budget of about ${fmtBudget(it.budgetMin)}. ` +
          'Flag it and come back once the rest are done?';
        note.style.display = '';
      } else note.style.display = 'none';
    }

    function tick() {
      const now = Date.now();
      const dt = now - lastTick;
      lastTick = now;
      if (!running) return;
      elapsed += dt;
      items[current].spent += dt;

      const attempted = parts.filter(filled).length;
      const attemptedMarks = items.reduce((s, it) => s + (it.section === 'C'
        ? (parts.some(p => p.it === it && filled(p)) ? it.marks : 0)
        : parts.filter(p => p.it === it && filled(p)).length), 0);
      if (allFilledAt === null && attempted === parts.length) allFilledAt = elapsed;

      if (!timeUp && elapsed >= totalMs) {
        timeUp = true;
        // What was answered when the time ran out, for the reflection.
        parts.forEach(p => { p.filledAtEnd = filled(p); });
        banner.style.display = '';
        bar.classList.add('over');
      }
      const used = Math.floor(elapsed / 60000), total = totalMs / 60000;
      clock.textContent = (timeUp ? `Time is up · ${fmtClock(elapsed - totalMs)} over` : `${used} of ${total} min used`) +
        ` · ${attemptedMarks} of ${maxMarks} marks attempted`;
      fill.style.width = Math.min(100, elapsed / totalMs * 100) + '%';
      paintNote();
    }

    const timer = setInterval(tick, 1000);
    const leaving = ev => { ev.preventDefault(); ev.returnValue = ''; };
    window.addEventListener('beforeunload', leaving);

    handIn.addEventListener('click', () => {
      const blank = parts.filter(p => !filled(p)).length;
      if (blank && !confirm(`${blank} ${blank === 1 ? 'part is' : 'parts are'} still blank. Hand in anyway?`)) return;
      tick();
      running = false;
      clearInterval(timer);
      window.removeEventListener('beforeunload', leaving);
      if (!timeUp) parts.forEach(p => { p.filledAtEnd = filled(p); });
      bar.remove(); banner.remove(); view.remove(); note.remove(); foot.remove();
      results({ ...P, parts, elapsed, timeUp, allFilledAt });
    });

    show(0);
    tick();
  }

  // ── 4. Results and reflection ─────────────────────────────────────────────
  function results(R) {
    const { o, items, parts, plan, maxMarks, totalMs, elapsed, allFilledAt } = R;

    // Mark every part. A part is in time if it was last changed before the
    // clock ran out.
    parts.forEach(p => {
      p.c.input.lock();
      let res;
      try { res = p.c.input.check(); } catch (err) { console.error(err); res = { ok: false, correctHTML: '' }; }
      p.ok = !!res.ok;
      p.inTime = p.last === null || p.last <= totalMs;
      const q = p.c.card && p.it.parts[p.it.cards.indexOf(p.c)].q;
      Exercise.markCard(p.c.card, p.ok ? 'right' : 'wrong');
      p.c.fb.className = 'qfeedback ' + (p.ok ? 'good' : 'bad');
      p.c.fb.innerHTML = (p.ok ? '<strong>Correct' + (p.inTime ? '' : ', after time') + '</strong>' : '<strong>Not quite</strong>' + (res.correctHTML || '')) +
        (q.explain ? (p.ok ? '' : '<br>') + q.explain : '');
    });
    const markOf = it => it.section === 'C'
      ? { inTime: parts.find(p => p.it === it && p.ok && p.inTime) ? it.marks : 0, after: parts.find(p => p.it === it && p.ok && !p.inTime) ? it.marks : 0 }
      : { inTime: parts.filter(p => p.it === it && p.ok && p.inTime).length, after: parts.filter(p => p.it === it && p.ok && !p.inTime).length };
    items.forEach(it => { it.got = markOf(it); });
    const inTime = items.reduce((s, it) => s + it.got.inTime, 0);
    const after = items.reduce((s, it) => s + it.got.after, 0);

    // ── What happened, against the plan ──
    const touched = items.filter(it => it.first !== null && it.first <= totalMs).sort((a, b) => a.first - b.first);
    const blankAtEnd = items.filter(it => parts.filter(p => p.it === it).every(p => !p.filledAtEnd));
    const longest = items.reduce((a, b) => (b.spent > a.spent ? b : a));
    const finished = allFilledAt === null ? 'no' : allFilledAt <= totalMs * 0.9 ? 'comfortably' : allFilledAt <= totalMs ? 'just' : 'no';
    const FIN = { comfortably: 'comfortably', just: 'just in time', no: 'not in time' };

    const planRows = [
      touched.length
        ? row(plan.first === touched[0].n, `You planned to start with Q${plan.first}.`, plan.first === touched[0].n ? 'You did.' : `You started with Q${touched[0].n}.`)
        : row(false, `You planned to start with Q${plan.first}.`, 'You did not answer anything before time ran out.'),
      blankAtEnd.some(it => it.n === plan.last)
        ? row(true, `You planned to leave Q${plan.last} until last.`, 'You never reached it, so it was the right one to leave.')
        : touched.length
        ? row(plan.last === touched[touched.length - 1].n, `You planned to leave Q${plan.last} until last.`,
            plan.last === touched[touched.length - 1].n ? 'You did.' : `Your last new question was Q${touched[touched.length - 1].n}.`)
        : null,
      row(plan.longest === longest.n, `You expected Q${plan.longest} to take longest.`,
        plan.longest === longest.n ? `It did: ${fmtClock(longest.spent)}.` : `It was Q${longest.n}, at ${fmtClock(longest.spent)}.`),
      row(plan.finish === finished, `You predicted you would finish ${FIN[plan.finish]}.`,
        finished !== 'no' ? `You finished ${FIN[finished]}, after ${fmtClock(allFilledAt)}.`
          : R.timeUp ? `You did not: when time ran out, ${blankAtEnd.length} ${blankAtEnd.length === 1 ? 'question was' : 'questions were'} still blank.`
          : `You handed in early with ${blankAtEnd.length} ${blankAtEnd.length === 1 ? 'question' : 'questions'} blank.`)
    ].filter(Boolean);
    function row(ok, said, did) {
      return h('li', { class: ok ? 'ok' : 'off' }, h('span', { class: 'mark', text: ok ? '✓' : '✗' }), h('span', {}, said + ' ', h('strong', { text: did })));
    }

    // ── One or two lessons, from simple rules ──
    const lessons = [];
    const blankMarks = blankAtEnd.reduce((s, it) => s + it.marks, 0);
    if (blankAtEnd.length) {
      const quick = blankAtEnd.filter(it => it.section === 'A');
      lessons.push(`${R.timeUp ? 'When time ran out' : 'When you handed in'}, ${listQ(blankAtEnd)} ${blankAtEnd.length === 1 ? 'was' : 'were'} still blank: ` +
        `${blankMarks} ${blankMarks === 1 ? 'mark' : 'marks'}.` +
        (quick.length ? ` ${quick.length === 1 ? 'The 1-mark question' : `The ${quick.length} one-mark questions`} among them needed only about ` +
          `${fmtBudget(quick.reduce((s, it) => s + it.budgetMin, 0))}${quick.length === 1 ? '' : ' between them'}. Doing the quick marks first protects them.` : ''));
    }
    const worst = items.filter(it => it.spent > OVER * it.budgetMs && it.spent - it.budgetMs > 60000)
      .sort((a, b) => (b.spent - b.budgetMs) - (a.spent - a.budgetMs))[0];
    if (worst) {
      lessons.push(`You spent ${fmtClock(worst.spent)} on Q${worst.n}, against a budget of about ${fmtBudget(worst.budgetMin)}. ` +
        `That was ${Math.round(worst.spent / Math.max(elapsed, 1) * 100)}% of your time, on ${Math.round(worst.marks / maxMarks * 100)}% of the marks.`);
    }
    const straight = touched.length > 2 && touched.every((it, i) => i === 0 || it.n > touched[i - 1].n);
    if (lessons.length < 2 && straight && blankAtEnd.length) {
      lessons.push('You worked straight through from the first question. Skimming first and taking the quick marks early means running out costs less.');
    }
    if (lessons.length < 2 && allFilledAt !== null && allFilledAt <= totalMs * 0.8) {
      lessons.push(`You answered everything with ${fmtClock(totalMs - allFilledAt)} to spare. Spend spare time checking, starting with the questions worth the most marks.`);
    }
    if (!lessons.length) lessons.push('Your time matched the marks well: no question ran far over its budget, and nothing was left blank.');
    function listQ(list) {
      const names = list.map(it => 'Q' + it.n);
      return names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];
    }

    // ── Where the time went ──
    const scale = Math.max(...items.map(it => Math.max(it.spent, it.budgetMs)), 1);
    const timeRows = items.map(it => h('div', { class: 'paper-trow' },
      h('span', { class: 'paper-tq', text: 'Q' + it.n }),
      h('span', { class: 'paper-track' },
        h('span', { class: 'paper-spent' + (it.spent > OVER * it.budgetMs ? ' over' : ''), style: `width:${it.spent / scale * 100}%` }),
        h('span', { class: 'paper-budget', style: `left:${it.budgetMs / scale * 100}%`, title: 'budget' })),
      h('span', { class: 'paper-tval', text: it.spent < 1000 ? 'not reached' : `${fmtClock(it.spent)} of ${fmtBudget(it.budgetMin)}` })));

    // ── History and XP ──
    const history = store.get(HISTORY_KEY, []);
    const prevRun = history[history.length - 1];
    const reached = items.length - blankAtEnd.length;
    history.push({ d: MRG.dayKey(), length: o.length, pace: o.pace, inTime, max: maxMarks, reached, n: items.length });
    store.set(HISTORY_KEY, history.slice(-20));
    const result = MRG.finishPractice(inTime, maxMarks, [...new Set(parts.map(p => p.it.parts[0].topic))]);

    // ── Render ──
    const review = h('section', { class: 'paper-review' }, h('h2', { text: 'Your answers' }));
    let lastSection = null;
    items.forEach(it => {
      if (it.section !== lastSection) { review.appendChild(h('h3', { class: 'paper-section', text: sectionName[it.section] })); lastSection = it.section; }
      it.head.querySelector('.paper-meta').textContent =
        `${it.got.inTime} of ${it.marks} in time` + (it.got.after ? ` · +${it.got.after} after time` : '') + ` · ${fmtClock(it.spent)} spent`;
      review.appendChild(it.block);
    });

    main.appendChild(h('section', { class: 'results paper-results' },
      h('p', { class: 'results-score', text: `${inTime} / ${maxMarks} marks in time` }),
      after ? h('p', { class: 'results-note', text: `+${after} more after time. In an assessment those would not have counted.` }) : null,
      h('p', { class: 'results-note', text: `Time used: ${fmtClock(elapsed)} of ${totalMs / 60000}:00.` }),
      result.xpGained > 0 ? h('p', { class: 'results-xp', html: `+${result.xpGained} XP &rarr; ${result.newTotal} XP total` }) : null,
      result.firstToday ? h('p', { class: 'results-note', text: 'That counts as today’s practice.' }) : null));

    main.appendChild(h('section', { class: 'paper-panel' },
      h('h2', { text: 'Your plan and what happened' }),
      h('ul', { class: 'paper-planrows' }, planRows)));

    main.appendChild(h('section', { class: 'paper-panel' },
      h('h2', { text: 'Where your time went' }),
      h('p', { class: 'paper-small', html: 'Each bar is the time you spent; the line marks the question’s budget. <span class="paper-key-over">Orange</span> is well over budget.' }),
      h('div', { class: 'paper-times' }, timeRows)));

    main.appendChild(h('section', { class: 'paper-panel paper-lessons' },
      h('h2', { text: 'For next time' }),
      lessons.slice(0, 2).map(l => h('p', { text: l })),
      prevRun ? h('p', { class: 'paper-small', text:
        `Last paper (${prevRun.d}): ${prevRun.inTime} of ${prevRun.max} in time, reached ${prevRun.reached} of ${prevRun.n} questions. ` +
        `This one: ${inTime} of ${maxMarks}, reached ${reached} of ${items.length}.` }) : null));

    main.appendChild(h('div', { class: 'results-btns' },
      h('a', { class: 'tool-btn primary', href: paperUrl({ ...o, seed: (Math.random() * 2 ** 32) >>> 0 }) }, 'Another paper like this'),
      h('a', { class: 'tool-btn', href: 'paper.html' }, 'Change the settings'),
      h('a', { class: 'tool-btn', href: 'index.html#maths' }, 'Back to maths')));

    main.appendChild(review);
    MJ.typeset([main]);
    window.scrollTo(0, 0);
  }

  function start() {
    h = Exercise.h;
    const o = readOptions();
    if (!o) return renderSetup();
    try { renderPaper(o); }
    catch (err) {
      console.error('could not build the paper', err);
      main.appendChild(h('p', { class: 'fatal', text: 'Could not build this paper: ' + err.message }));
    }
  }

  return { start, build, LENGTHS, PACES, PROBLEM_MARKS, totalMarks, totalMinutes, fmtBudget };
})();
