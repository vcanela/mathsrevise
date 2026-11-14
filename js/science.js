'use strict';
// ── Revision · Science helpers ──────────────────────────────────────────────
// Science questions come in two kinds, and the helpers here build both into
// the same question objects the engine already renders.
//
// Quantitative questions (speed, mass, reading a graph) are generated with
// fresh numbers, exactly like the maths.
//
// Conceptual questions (which state, which change, why the bottle cracked)
// cannot be generated from random numbers, so each question *slot* holds a
// pool of authored items that test the same idea. Every visit picks one item
// per slot. That keeps the two things the rest of the site relies on:
// questions vary from visit to visit, and "Try one like it" regenerates the
// same slot, which gives a different item testing the same idea.
//
// A science topic is declared with its slots rather than a generate function:
//
//   Sci.topic({
//     id: 's7e3', unit: 'y7', title: 'Speed', blurb, hint, examples,
//     slots: [
//       { name: 'Speed in m/s', items: [ Sci.gen((rng, diff) => ({ … })) ] },
//       { name: 'What speed means', items: [ rng => Sci.choice(rng, { … }), … ] }
//     ]
//   });
//
// Every item in a slot must produce the same input kind; check-topics.js
// enforces that, because "one like it" depends on it.
// ─────────────────────────────────────────────────────────────────────────────

const Sci = (() => {
  const m = Fmt.tex;

  /** Mark an item as generated, so the review page shows several samples of it. */
  const gen = fn => { fn.generated = true; return fn; };

  // ── Not seen recently ─────────────────────────────────────────────────────
  // Each slot draws from a small pool of authored items. Picking at random,
  // a student meets the same item again long before the pool runs out. So
  // the browser remembers which items this student has answered, in order,
  // and a slot prefers items not yet met; once all have been, it picks among
  // the oldest half, which spaces repeats as far apart as possible.
  //
  // `memory` is switched on by the engine for free practice and the daily
  // mix. It stays off for ?set=N, where everyone must get the same questions,
  // and for the checker and the review page.
  let memory = false;
  // `challenge` is switched on by the engine for ?set=challenge: the topic
  // then builds its Year 9 set instead of the usual one.
  let challenge = false;
  const seenKey = id => 'mrg_seen_' + id;

  function readSeen(topicId) {
    try { return JSON.parse(localStorage.getItem(seenKey(topicId))) || {}; }
    catch (_) { return {}; }
  }

  /** Record that an item was answered: move it to the end of its slot's list. */
  function markSeen(pick) {
    if (!memory || !pick) return;
    const seen = readSeen(pick.topic);
    const list = (seen[pick.slot] || []).filter(k => k !== pick.item);
    list.push(pick.item);
    seen[pick.slot] = list;
    try { localStorage.setItem(seenKey(pick.topic), JSON.stringify(seen)); } catch (_) {}
  }

  function pickIndex(rng, n, list) {
    if (!memory || n < 2) return rng.int(0, n - 1);
    const order = (list || []).filter(k => k < n);           // oldest first
    const unseen = [];
    for (let k = 0; k < n; k++) if (!order.includes(k)) unseen.push(k);
    if (unseen.length) return rng.pick(unseen);
    return rng.pick(order.slice(0, Math.ceil(n / 2)));
  }

  /** Turn a declaration with slots into a topic the engine can run.
   *
   *  `together: { slots: [...], max }` links slots whose items line up, such
   *  as one passage per item index. Each set then uses between 1 and `max`
   *  of those items for all the linked slots, in groups, instead of a fresh
   *  one for every slot: one or two reading passages per set, not six. */
  function topic(def) {
    const t = Object.assign({}, def);
    // A slot marked `challenge: 'only'` belongs to the Year 9 challenge set and
    // never appears in a normal one; `challenge: 'also'` (the Extension slot)
    // appears in both. `Sci.challenge` says which set to build.
    const inSet = slot => challenge ? !!slot.challenge : slot.challenge !== 'only';
    t.hasChallenge = def.slots.some(s => s.challenge === 'only');
    t.generate = (rng, diff) => {
      const seen = memory ? readSeen(def.id) : {};
      const tg = def.together;
      let shared = null;
      if (tg) {
        const n = def.slots[tg.slots[0]].items.length;
        // Memory across all the linked slots, oldest first.
        const order = [];
        for (const si of tg.slots) for (const k of (seen[si] || [])) { const at = order.indexOf(k); if (at >= 0) order.splice(at, 1); order.push(k); }
        const k = rng.int(1, tg.max || 2);
        shared = [];
        for (let j = 0; j < k; j++) {
          const left = order.filter(x => !shared.includes(x));
          const avail = Array.from({ length: n }, (_, x) => x).filter(x => !shared.includes(x));
          const unseen = memory ? avail.filter(x => !left.includes(x)) : avail;
          shared.push(rng.pick(unseen.length ? unseen : left.slice(0, Math.max(1, Math.ceil(left.length / 2)))));
        }
      }
      const out = [];
      def.slots.forEach((slot, i) => {
        if (!inSet(slot)) return;
        const linked = tg ? tg.slots.indexOf(i) : -1;
        const idx = linked >= 0 ? shared[Math.floor(linked * shared.length / tg.slots.length)]
                                : pickIndex(rng, slot.items.length, seen[i]);
        const q = slot.items[idx](rng, diff);
        q.pick = { topic: def.id, slot: i, item: idx };
        q.slot = slot.name || 'Slot ' + (i + 1);
        // Which "Learn it" card answers this question. An item can name its
        // own card; otherwise it takes the slot's.
        if (!q.learn && slot.learn) q.learn = slot.learn;
        // English tags these "Year 9"; a unit can name its own (coding: "Challenge").
        if (!q.tag && slot.challenge === 'only') q.tag = (typeof Manifest !== 'undefined' && Manifest.challenge(Manifest.unit(def.unit)).tag) || 'Year 9';
        out.push(q);
      });
      return out;
    };
    const Topics = window.Topics || (window.Topics = {});
    Topics[def.id] = t;
    return t;
  }

  // ── Question builders ─────────────────────────────────────────────────────

  /**
   * Multiple choice with the options shuffled. `right` is the correct option
   * (HTML), `wrong` a list of distractors; three is the usual number.
   * `keepOrder` leaves the options as given, for natural sequences such as
   * solid, liquid, gas.
   */
  function choice(rng, o) {
    // `options` lists every option in its natural order (acidic, neutral,
    // alkaline), with `right` among them; they are shown in that order.
    const opts = o.options ? o.options.map(x => ({ html: x, right: x === o.right }))
                           : [{ html: o.right, right: true }, ...o.wrong.map(w => ({ html: w, right: false }))];
    const options = o.options || o.keepOrder ? opts : rng.shuffle(opts);
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag, draw: o.draw, diagram: o.diagram,
      input: { kind: 'choice', options, correct: options.findIndex(x => x.right), wide: o.wide !== false },
      explain: o.explain, learn: o.learn
    };
  }

  /** A statement to judge true or false. The two options always appear in that order. */
  function tf(rng, o) {
    return {
      prompt: 'True or false? <em>' + o.statement + '</em>',
      note: o.note, tip: o.tip, hints: o.hints, tag: o.tag,
      input: {
        kind: 'choice',
        options: [{ html: 'True', right: !!o.answer }, { html: 'False', right: !o.answer }],
        correct: o.answer ? 0 : 1
      },
      explain: o.explain, learn: o.learn
    };
  }

  /**
   * Sort items into groups. `items` is a bank of { text, bin }; `pick` of them
   * are shown, always including at least one from every group.
   */
  function sort(rng, o) {
    const n = Math.min(o.pick || 6, o.items.length);
    let chosen;
    for (let tries = 0; tries < 50; tries++) {
      chosen = rng.sample(o.items, n);
      if (o.bins.every((_, b) => chosen.some(it => it.bin === b))) break;
    }
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag, draw: o.draw, diagram: o.diagram,
      input: { kind: 'sort', bins: o.bins, items: chosen.map(it => ({ html: it.text, bin: it.bin })),
               // The whole bank, which the review page lists. The engine ignores it.
               bank: o.items.map(it => ({ html: it.text, bin: it.bin })) },
      explain: o.explain, learn: o.learn
    };
  }

  /**
   * Label numbered markers on a diagram. `markers` are the right names in
   * marker order; `options` every name offered (defaults to the markers).
   */
  function label(rng, o) {
    const options = [...new Set(o.options || o.markers)].sort((a, b) => a.localeCompare(b));
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag, draw: o.draw, diagram: o.diagram,
      input: { kind: 'label', markers: o.markers, options },
      explain: o.explain, learn: o.learn
    };
  }

  /** Spot the misconception: a line of reasoning with one wrong step. */
  function spot(rng, o) {
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag,
      input: { kind: 'spot', lines: o.lines, wrong: o.wrong, find: o.find,
               cue: o.cue || 'Click the first line that is wrong.' },
      explain: o.explain, learn: o.learn
    };
  }

  /** A match question from rows of [left, right]. */
  function match(rng, prompt, rows, explain, o) {
    const ord = rng.shuffle(rows.map((_, i) => i));
    return Object.assign({
      prompt,
      input: { kind: 'match', left: rows.map(r => r[0]), right: ord.map(i => rows[i][1]),
               tags: ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, rows.length), answer: rows.map((_, i) => ord.indexOf(i)) },
      explain
    }, o || {});
  }

  /** An order question: `seq` is the right sequence. */
  function order(rng, prompt, seq, explain, o) {
    const ord = rng.shuffle(seq.map((_, i) => i));
    return Object.assign({
      prompt,
      input: { kind: 'order', items: ord.map(i => seq[i]), answer: seq.map((_, i) => ord.indexOf(i)),
               cue: 'Click them in order. Click one again to take it back.' },
      explain
    }, o || {});
  }

  /** Type a word: `answer` is the spelling, or a list of acceptable spellings. */
  function word(rng, o) {
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag,
      input: { kind: 'word', answer: o.answer, exact: o.exact, prefix: o.prefix, suffix: o.suffix, placeholder: o.placeholder, width: o.width },
      explain: o.explain, learn: o.learn
    };
  }

  /**
   * A piece of free writing. `prompt` is the brief, `checklist` what the
   * student ticks off afterwards, `model` one way to do it, shown only once
   * they have written their own. `key` keeps the draft in the browser.
   */
  function write(rng, o) {
    return {
      prompt: o.prompt, note: o.note, tip: o.tip, hints: o.hints, tag: o.tag,
      input: { kind: 'write', key: o.key, title: o.title, minWords: o.minWords || 40, rows: o.rows,
               placeholder: o.placeholder, checklist: o.checklist, model: o.model },
      explain: o.explain, learn: o.learn
    };
  }

  /** A small data table, as HTML, for putting inside a prompt. */
  function table(head, rows) {
    const cell = (t, tag) => `<${tag}>${t}</${tag}>`;
    return '<table class="data-table"><thead><tr>' + head.map(x => cell(x, 'th')).join('') +
      '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map(x => cell(x, 'td')).join('') + '</tr>').join('') +
      '</tbody></table>';
  }

  /** A name, for word problems. New Zealand classrooms. */
  const NAMES = ['Aroha', 'Tama', 'Mere', 'Sione', 'Priya', 'Liam', 'Ana', 'Wiremu', 'Mia', 'Jack',
                 'Hemi', 'Grace', 'Losa', 'Arjun', 'Kiri', 'Noah', 'Isla', 'Tane', 'Mei', 'Oliver'];
  const name = rng => rng.pick(NAMES);

  return { topic, gen, choice, tf, sort, label, spot, match, order, word, write, table, name, NAMES, m, markSeen,
           set memory(on) { memory = !!on; }, get memory() { return memory; },
           set challenge(on) { challenge = !!on; }, get challenge() { return challenge; } };
})();


// ── Science diagrams ────────────────────────────────────────────────────────
// Like the geometry, every picture here is computed from what it claims to
// show: particles never overlap, a liquid's particles really do touch, a
// gas's really are far apart, and graph lines pass through their data.

const SciDia = (() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', GRID = 'var(--rule-soft)';
  const P_FILL = 'var(--brand)', P_EDGE = 'var(--brand-ink)';

  function particle(d, x, y, r) {
    d.add('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r, fill: P_FILL, stroke: P_EDGE,
                      'stroke-width': 1, 'fill-opacity': 0.85 });
  }

  function arrowHead(d, from, to, colour, size) {
    size = size || 6;
    const u = Geo.norm(Geo.sub(to, from));
    const n = [-u[1], u[0]];
    const back = Geo.sub(to, Geo.scale(u, size));
    const a = Geo.add(back, Geo.scale(n, size * 0.55));
    const b = Geo.sub(back, Geo.scale(n, size * 0.55));
    d.add('path', {
      d: `M ${a[0].toFixed(2)} ${a[1].toFixed(2)} L ${to[0].toFixed(2)} ${to[1].toFixed(2)} L ${b[0].toFixed(2)} ${b[1].toFixed(2)}`,
      fill: 'none', stroke: colour || INK, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
  }

  function arrow(d, from, to, o) {
    o = o || {};
    d.line(from, to, { stroke: o.colour || INK, width: o.width || 1.6 });
    arrowHead(d, from, to, o.colour, o.head);
  }

  /**
   * Particles in a closed box, in one state of matter.
   *
   * The particle radius is the same in every state, because the particles
   * themselves never change size; only their arrangement, spacing and motion
   * do. That point is in the curriculum and a diagram that drew bigger gas
   * particles would teach the misconception.
   *
   *   solid   a regular grid, touching, sitting at the bottom
   *   liquid  touching but jumbled, settled into the bottom of the box
   *   gas     few, far apart, spread through the whole box, with motion arrows
   */
  function particles(d, state, rng, o) {
    o = o || {};
    const r = o.r || 6.5;
    const box = o.box || { x: 10, y: 10, w: d.w - 20, h: d.h - 20 };
    d.add('rect', { x: box.x, y: box.y, width: box.w, height: box.h, rx: 4,
                    fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.8 });

    const inner = { x0: box.x + r + 2, x1: box.x + box.w - r - 2, y0: box.y + r + 2, y1: box.y + box.h - r - 2 };
    const pts = [];

    if (state === 'solid') {
      const gap = 2 * r + 0.6;
      const cols = Math.min(o.cols || 6, Math.floor((inner.x1 - inner.x0) / gap) + 1);
      const rows = Math.min(o.rows || 4, Math.floor((inner.y1 - inner.y0) / gap) + 1);
      const width = (cols - 1) * gap;
      const left = box.x + (box.w - width) / 2;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) pts.push([left + i * gap, inner.y1 - j * gap]);
      }
      pts.forEach(p => particle(d, p[0], p[1], r));
      // Short arcs either side of a few particles: vibrating in place.
      if (o.vibrate !== false) {
        for (const p of pts.filter((_, k) => k % 5 === 2)) {
          d.add('path', { d: Geo.arcPath(p[0], p[1], r + 3, 150, 60), fill: 'none', stroke: MUTED, 'stroke-width': 1 });
          d.add('path', { d: Geo.arcPath(p[0], p[1], r + 3, -30, 60), fill: 'none', stroke: MUTED, 'stroke-width': 1 });
        }
      }
      return pts;
    }

    if (state === 'liquid') {
      // Ballistic deposition: drop each particle at a random x and let it
      // settle on whatever is below. Of several candidate drops, take the one
      // that lands lowest, which keeps the surface roughly level like a real
      // liquid's. The result touches its neighbours but has no pattern.
      const count = o.count || 24;
      for (let k = 0; k < count; k++) {
        let best = null;
        for (let t = 0; t < 14; t++) {
          const x = inner.x0 + rng.next() * (inner.x1 - inner.x0);
          let y = inner.y1;
          for (const p of pts) {
            const dx = Math.abs(p[0] - x);
            if (dx < 2 * r) y = Math.min(y, p[1] - Math.sqrt(4 * r * r - dx * dx));
          }
          if (y < inner.y0) continue;
          if (!best || y > best[1]) best = [x, y];
        }
        if (best) pts.push(best);
      }
      pts.forEach(p => particle(d, p[0], p[1], r));
      return pts;
    }

    // Gas: rejection sampling with a large minimum spacing.
    const count = o.count || 9;
    const minGap = o.minGap || r * 5;
    for (let t = 0; t < 4000 && pts.length < count; t++) {
      const p = [inner.x0 + rng.next() * (inner.x1 - inner.x0), inner.y0 + rng.next() * (inner.y1 - inner.y0)];
      if (pts.every(q => Math.hypot(q[0] - p[0], q[1] - p[1]) >= minGap)) pts.push(p);
    }
    pts.forEach(p => particle(d, p[0], p[1], r));
    if (o.arrows !== false) {
      for (const p of pts) {
        const ang = rng.next() * 360;
        const from = Geo.add(p, Geo.fromDir(ang, r + 2));
        const to = Geo.add(p, Geo.fromDir(ang, r + 13));
        // Only draw an arrow that stays inside the box.
        if (to[0] > box.x + 3 && to[0] < box.x + box.w - 3 && to[1] > box.y + 3 && to[1] < box.y + box.h - 3) {
          arrow(d, from, to, { colour: MUTED, width: 1.2, head: 4 });
        }
      }
    }
    return pts;
  }

  /**
   * The six changes of state as a triangle: solid and liquid along the
   * bottom, gas at the top, a pair of opposite arrows on each side.
   * `labels` gives the text at each arrow, in this order:
   *   melting, freezing, evaporation, condensation, sublimation, deposition
   * (numbers for a labelling question, names for a worked example).
   */
  const CHANGES = ['melting', 'freezing', 'evaporation', 'condensation', 'sublimation', 'deposition'];

  function stateCycle(d, labels) {
    const W = d.w, H = d.h;
    const node = {
      solid:  [W * 0.18, H * 0.82],
      liquid: [W * 0.82, H * 0.82],
      gas:    [W * 0.50, H * 0.16]
    };
    const bw = 64, bh = 26;
    for (const [k, p] of Object.entries(node)) {
      d.add('rect', { x: p[0] - bw / 2, y: p[1] - bh / 2, width: bw, height: bh, rx: 5,
                      fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.6 });
      d.text(p, k[0].toUpperCase() + k.slice(1), { size: 13 });
    }

    // From one node's edge towards another's, offset sideways so the two
    // arrows of a pair run side by side instead of on top of each other.
    const edgePoint = (p, toward) => {
      const u = Geo.norm(Geo.sub(toward, p));
      const tx = Math.abs(u[0]) > 1e-6 ? (bw / 2 + 6) / Math.abs(u[0]) : Infinity;
      const ty = Math.abs(u[1]) > 1e-6 ? (bh / 2 + 6) / Math.abs(u[1]) : Infinity;
      return Geo.add(p, Geo.scale(u, Math.min(tx, ty)));
    };
    const pair = [
      ['solid', 'liquid', 0, 1],
      ['liquid', 'gas', 2, 3],
      ['solid', 'gas', 4, 5]
    ];
    const centre = [(node.solid[0] + node.liquid[0] + node.gas[0]) / 3,
                    (node.solid[1] + node.liquid[1] + node.gas[1]) / 3];

    for (const [a, b, fwd, back] of pair) {
      const A = edgePoint(node[a], node[b]), B = edgePoint(node[b], node[a]);
      const u = Geo.norm(Geo.sub(B, A));
      let n = [-u[1], u[0]];
      // Make `n` point away from the middle of the triangle.
      const mid = Geo.mid(A, B);
      if ((mid[0] - centre[0]) * n[0] + (mid[1] - centre[1]) * n[1] < 0) n = Geo.scale(n, -1);
      const off = 7;
      // Outer arrow goes a → b; inner arrow goes b → a.
      const outA = Geo.add(A, Geo.scale(n, off)), outB = Geo.add(B, Geo.scale(n, off));
      const inA = Geo.add(A, Geo.scale(n, -off)), inB = Geo.add(B, Geo.scale(n, -off));
      arrow(d, outA, outB);
      arrow(d, inB, inA);
      // Labels sit just beyond each arrow, the outer one outside the
      // triangle and the inner one inside it. Words are set along the arrow,
      // the way a textbook does it: on the two sloping sides the inside words
      // would otherwise run into each other near the top.
      const place = (P, Q, dir, text, inside) => {
        const m = Geo.mid(P, Q);
        if (/^\d+$/.test(String(text))) {
          const at = Geo.add(m, Geo.scale(n, dir * (inside ? 14 : 15)));
          d.add('circle', { cx: at[0].toFixed(1), cy: at[1].toFixed(1), r: 9,
                            fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.3 });
          d.text(at, text, { size: 11, fill: 'var(--accent-ink)' });
        } else {
          const at = Geo.add(m, Geo.scale(n, dir * 9));
          let ang = Math.atan2(Q[1] - P[1], Q[0] - P[0]) * Geo.DEG;
          if (ang > 90) ang -= 180;
          if (ang < -90) ang += 180;        // keep the text the right way up
          const t = d.text(at, text, { size: 10.5, fill: 'var(--accent-ink)' });
          t.setAttribute('transform', `rotate(${ang.toFixed(1)} ${at[0].toFixed(1)} ${at[1].toFixed(1)})`);
        }
      };
      place(outA, outB, 1, labels[fwd], false);
      place(inA, inB, -1, labels[back], true);
    }
    return d;
  }

  /** A round number of axis steps covering `max`. */
  function niceStep(max, ticks) {
    const raw = max / (ticks || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    for (const k of [1, 2, 2.5, 5, 10]) if (raw <= k * mag) return k * mag;
    return 10 * mag;
  }

  /**
   * A line graph with labelled axes and a light grid, plotted exactly from
   * the data. Each series is { points: [[x, y], …], label, colour, dots }.
   */
  function graph(d, o) {
    const pad = { l: 46, r: 18, t: 14, b: 38 };
    const W = d.w - pad.l - pad.r, H = d.h - pad.t - pad.b;
    const xStep = o.xStep || niceStep(o.xMax, 5), yStep = o.yStep || niceStep(o.yMax, 5);
    const xMax = Math.ceil(o.xMax / xStep) * xStep, yMax = Math.ceil(o.yMax / yStep) * yStep;
    const X = x => pad.l + (x / xMax) * W;
    const Y = y => pad.t + H - (y / yMax) * H;

    // Optional shaded section, used to point at "between these times". Drawn
    // first so the grid and data lines sit on top of it.
    if (o.highlight) {
      const [a, b] = o.highlight;
      d.add('rect', { x: X(a), y: pad.t, width: X(b) - X(a), height: H,
                      fill: 'var(--accent-soft)', stroke: 'none' });
    }
    for (let x = 0; x <= xMax + 1e-9; x += xStep) {
      d.line([X(x), pad.t], [X(x), pad.t + H], { stroke: GRID, width: 1 });
      d.text([X(x), pad.t + H + 12], Fmt.num(+x.toFixed(4)), { size: 10, fill: MUTED, bold: false });
    }
    for (let y = 0; y <= yMax + 1e-9; y += yStep) {
      d.line([pad.l, Y(y)], [pad.l + W, Y(y)], { stroke: GRID, width: 1 });
      d.text([pad.l - 6, Y(y)], Fmt.num(+y.toFixed(4)), { size: 10, fill: MUTED, bold: false, anchor: 'end' });
    }
    d.line([pad.l, pad.t + H], [pad.l + W, pad.t + H], { stroke: INK, width: 1.6 });
    d.line([pad.l, pad.t], [pad.l, pad.t + H], { stroke: INK, width: 1.6 });
    d.text([pad.l + W / 2, d.h - 6], o.xLabel || '', { size: 11, fill: INK, bold: false });
    const yl = d.text([12, pad.t + H / 2], o.yLabel || '', { size: 11, fill: INK, bold: false });
    yl.setAttribute('transform', `rotate(-90 12 ${pad.t + H / 2})`);

    const colours = ['var(--dia-accent)', 'var(--brand)', 'var(--dia-unknown)'];
    (o.series || []).forEach((s, i) => {
      const col = s.colour || colours[i % colours.length];
      const path = s.points.map((p, k) => `${k ? 'L' : 'M'} ${X(p[0]).toFixed(2)} ${Y(p[1]).toFixed(2)}`).join(' ');
      d.add('path', { d: path, fill: 'none', stroke: col, 'stroke-width': 2.4,
                      'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
      if (s.dots !== false) for (const p of s.points) d.dot([X(p[0]), Y(p[1])], { r: 2.6, fill: col });
      if (s.label) {
        const last = s.points[s.points.length - 1];
        d.text([X(last[0]) + 9, Y(last[1]) - 2], s.label, { size: 12, fill: col, anchor: 'start' });
      }
    });
    return { X, Y, xMax, yMax };
  }

  return { particles, stateCycle, CHANGES, graph, arrow, niceStep, arrowHeadAt: (d, from, to) => arrowHead(d, from, to) };
})();


// ── More science diagrams ───────────────────────────────────────────────────
// Added for the rest of Years 7 and 8. Same rule as everything else: the
// picture is computed from what it claims to show.

(() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)';
  const RAD = Math.PI / 180;

  /** A rounded box with centred text, sized to the text. Returns its bounds. */
  function box(d, c, text, o) {
    o = o || {};
    const size = o.size || 11.5;
    const w = Math.max(o.minW || 0, String(text).length * size * 0.58 + 14), hgt = o.h || 22;
    d.add('rect', { x: (c[0] - w / 2).toFixed(1), y: (c[1] - hgt / 2).toFixed(1), width: w.toFixed(1), height: hgt,
                    rx: 5, fill: o.fill || 'var(--surface-2)', stroke: o.stroke || INK, 'stroke-width': 1.3 });
    d.text(c, text, { size, fill: o.colour || INK });
    return { c, w, h: hgt };
  }

  /** Where the line from a box's centre towards `p` leaves the box. */
  function boxEdge(b, p) {
    const u = Geo.norm(Geo.sub(p, b.c));
    const tx = Math.abs(u[0]) > 1e-6 ? (b.w / 2 + 3) / Math.abs(u[0]) : Infinity;
    const ty = Math.abs(u[1]) > 1e-6 ? (b.h / 2 + 3) / Math.abs(u[1]) : Infinity;
    return Geo.add(b.c, Geo.scale(u, Math.min(tx, ty)));
  }

  /** A label with a leader line to the thing it names. */
  function leader(d, labelAt, anchor, text, side) {
    d.line(labelAt, anchor, { stroke: MUTED, width: 1 });
    d.dot(anchor, { r: 2, fill: MUTED });
    if (/^\d+$/.test(String(text))) {
      d.add('circle', { cx: labelAt[0].toFixed(1), cy: labelAt[1].toFixed(1), r: 9,
                        fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.3 });
      d.text(labelAt, text, { size: 11, fill: 'var(--accent-ink)' });
    } else {
      const off = side === 'left' ? -4 : 4;
      d.add('rect', { x: side === 'left' ? labelAt[0] - String(text).length * 6.2 - 6 : labelAt[0] - 2,
                      y: labelAt[1] - 9, width: String(text).length * 6.2 + 8, height: 18,
                      fill: 'var(--surface)', stroke: 'none' });
      d.text([labelAt[0] + off, labelAt[1]], text,
             { size: 11, fill: 'var(--accent-ink)', anchor: side === 'left' ? 'end' : 'start' });
    }
  }

  // ── The Moon ──────────────────────────────────────────────────────────────
  /**
   * The Moon as it looks from New Zealand at a given phase angle: 0° new,
   * 90° first quarter, 180° full, 270° last quarter.
   *
   * In the Southern Hemisphere a waxing Moon is lit on the left. Most images
   * in books and online are drawn for the Northern Hemisphere, where it is
   * the other way round.
   *
   * The lit region is bounded by the bright limb (a semicircle) and the
   * terminator, which from Earth looks like half an ellipse whose width is
   * r·cos(phase). Both are sampled into one polygon.
   */
  function moon(d, c, r, phase) {
    phase = ((phase % 360) + 360) % 360;
    d.add('circle', { cx: c[0], cy: c[1], r, fill: 'var(--moon-dark)', stroke: INK, 'stroke-width': 1.1 });
    if (phase < 1 || phase > 359) return;                // new Moon: nothing lit
    const waxing = phase < 180;
    const s = waxing ? -1 : 1;                            // lit limb: left when waxing (NZ)
    const k = Math.cos(phase * RAD);
    const pts = [];
    const N = 48;
    for (let i = 0; i <= N; i++) {                         // bright limb, top to bottom
      const phi = -90 + (180 * i) / N;
      pts.push([c[0] + s * r * Math.cos(phi * RAD), c[1] + r * Math.sin(phi * RAD)]);
    }
    for (let i = N; i >= 0; i--) {                         // terminator, bottom to top
      const phi = -90 + (180 * i) / N;
      pts.push([c[0] + s * r * k * Math.cos(phi * RAD), c[1] + r * Math.sin(phi * RAD)]);
    }
    d.add('polygon', { points: pts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' '),
                       fill: 'var(--moon-lit)', stroke: 'none' });
    d.add('circle', { cx: c[0], cy: c[1], r, fill: 'none', stroke: INK, 'stroke-width': 1.1 });
  }

  const PHASES = [
    { name: 'new Moon', angle: 0 },
    { name: 'waxing crescent', angle: 45 },
    { name: 'first quarter', angle: 90 },
    { name: 'waxing gibbous', angle: 135 },
    { name: 'full Moon', angle: 180 },
    { name: 'waning gibbous', angle: 225 },
    { name: 'last quarter', angle: 270 },
    { name: 'waning crescent', angle: 315 }
  ];

  /**
   * Sun, Earth and Moon in a line, for an eclipse. Sizes and distances are
   * not to scale (they could not be, and still fit), which the caption says.
   */
  function eclipse(d, type) {
    const y = d.h / 2;
    const sun = [40, y];
    d.add('circle', { cx: sun[0], cy: y, r: 26, fill: 'var(--sun)', stroke: 'var(--accent)', 'stroke-width': 1.2 });
    for (let a = 0; a < 360; a += 30) {
      const p1 = Geo.add(sun, Geo.fromDir(a, 30)), p2 = Geo.add(sun, Geo.fromDir(a, 36));
      d.line(p1, p2, { stroke: 'var(--accent)', width: 1.2 });
    }
    const earthX = type === 'lunar' ? d.w * 0.58 : d.w * 0.82;
    const moonX  = type === 'lunar' ? d.w * 0.86 : d.w * 0.54;
    const er = 15, mr = 6;
    // The shadow cast away from the Sun by whichever body is in the middle.
    const casterX = type === 'lunar' ? earthX : moonX;
    const cr = type === 'lunar' ? er : mr;
    const tipX = type === 'lunar' ? d.w - 4 : earthX + 2;
    const tipHalf = type === 'lunar' ? er * 0.55 : 1.5;
    d.add('polygon', {
      points: `${casterX},${y - cr} ${tipX},${y - tipHalf} ${tipX},${y + tipHalf} ${casterX},${y + cr}`,
      fill: 'var(--shadow-fill)', stroke: 'none'
    });
    d.add('circle', { cx: earthX, cy: y, r: er, fill: 'var(--earth)', stroke: INK, 'stroke-width': 1.1 });
    d.add('circle', { cx: moonX, cy: y, r: mr, fill: 'var(--moon-lit)', stroke: INK, 'stroke-width': 1.1 });
    d.text([sun[0], y + 46], 'Sun', { size: 11, fill: MUTED, bold: false });
    d.text([earthX, y + 30], 'Earth', { size: 11, fill: MUTED, bold: false });
    d.text([moonX, y - 18], 'Moon', { size: 11, fill: MUTED, bold: false });
  }

  // ── Food webs ─────────────────────────────────────────────────────────────
  /**
   * A food web. Positions are fractions of the canvas; arrows point from the
   * food to the organism that eats it, the direction energy flows.
   */
  function web(d, w, o) {
    o = o || {};
    const boxes = {};
    for (const [id, n] of Object.entries(w.nodes)) {
      const c = [n.x * d.w, n.y * d.h];
      const isProducer = n.role === 'producer';
      boxes[id] = box(d, c, n.label, {
        size: 11, fill: isProducer ? 'var(--good-soft)' : 'var(--surface-2)',
        stroke: o.highlight === id ? 'var(--accent)' : INK
      });
    }
    // Arrows drawn after the boxes would cross their text, so draw beneath.
    const arrows = [];
    for (const [food, eater] of w.links) {
      const a = boxes[food], b = boxes[eater];
      const from = boxEdge(a, b.c), to = boxEdge(b, a.c);
      arrows.push([from, to]);
    }
    for (const [from, to] of arrows) SciDia.arrow(d, from, to, { colour: MUTED, width: 1.3, head: 5 });
  }

  // ── Cells ─────────────────────────────────────────────────────────────────
  /**
   * A plant or animal cell, with labels on leader lines. `labels` maps each
   * part to the text to show at its label (a number for a question, or the
   * name for a worked example).
   *
   * The plant cell's large vacuole pushes the nucleus and chloroplasts out
   * into a thin layer of cytoplasm against the membrane, as in a real leaf
   * cell. The canvas is 300 × 200.
   */
  const PLANT_PARTS = ['cell wall', 'cell membrane', 'cytoplasm', 'nucleus', 'vacuole', 'chloroplast'];
  const ANIMAL_PARTS = ['cell membrane', 'cytoplasm', 'nucleus'];

  function cell(d, type, labels) {
    labels = labels || {};
    // The geometry below is laid out for a 300-wide canvas and shifted to
    // the centre of whatever canvas it is given. Numbered labels fit in 300;
    // written-out names need about 420.
    const X = x => x + (d.w - 300) / 2;
    const P = p => [X(p[0]), p[1]];
    const side = p => (p[0] < d.w / 2 ? 'left' : 'right');
    if (type === 'plant') {
      d.add('rect', { x: X(80), y: 18, width: 140, height: 164, rx: 8, fill: 'none',
                      stroke: 'var(--cell-wall)', 'stroke-width': 5 });
      d.add('rect', { x: X(86), y: 24, width: 128, height: 152, rx: 6, fill: 'var(--cytoplasm)',
                      stroke: INK, 'stroke-width': 1.3 });
      d.add('rect', { x: X(108), y: 44, width: 88, height: 118, rx: 16, fill: 'var(--vacuole)',
                      stroke: MUTED, 'stroke-width': 1.1 });
      d.add('circle', { cx: X(97), cy: 58, r: 10, fill: 'var(--nucleus)', stroke: INK, 'stroke-width': 1.1 });
      for (const [x, y, rot] of [[97, 95, 90], [97, 128, 90], [97, 160, 90], [132, 34, 0], [166, 34, 0],
                                 [205, 80, 90], [205, 122, 90], [140, 169, 0], [176, 169, 0]]) {
        d.add('ellipse', { cx: X(x), cy: y, rx: 7, ry: 3.6, fill: 'var(--chloroplast)', stroke: 'var(--dia-known)',
                           'stroke-width': 0.8, transform: `rotate(${rot} ${X(x)} ${y})` });
      }
      const spots = {
        'nucleus':       [[26, 40],  [97, 58]],
        'cell wall':     [[26, 84],  [80, 84]],
        'cell membrane': [[26, 128], [86, 112]],
        'cytoplasm':     [[26, 172], [97, 145]],
        'chloroplast':   [[274, 48], [166, 34]],
        'vacuole':       [[274, 120], [160, 104]]
      };
      for (const [part, [at, anchor]] of Object.entries(spots)) {
        if (labels[part] !== undefined) leader(d, P(at), P(anchor), labels[part], side(P(at)));
      }
    } else {
      // An animal cell has no fixed shape; a slightly irregular outline says so.
      const pts = [];
      for (let a = 0; a < 360; a += 6) {
        const wob = 1 + 0.05 * Math.sin(3 * a * RAD) + 0.03 * Math.cos(5 * a * RAD);
        pts.push([X(150 + 72 * wob * Math.cos(a * RAD)), 100 + 58 * wob * Math.sin(a * RAD)]);
      }
      d.add('polygon', { points: pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' '),
                         fill: 'var(--cytoplasm)', stroke: INK, 'stroke-width': 1.4 });
      d.add('circle', { cx: X(134), cy: 92, r: 18, fill: 'var(--nucleus)', stroke: INK, 'stroke-width': 1.1 });
      const edge = pts[Math.round(340 / 6) % pts.length];
      const spots = {
        'nucleus':       [P([26, 56]),  P([126, 86])],
        'cell membrane': [P([274, 62]), edge],
        'cytoplasm':     [P([274, 150]), P([178, 122])]
      };
      for (const [part, [at, anchor]] of Object.entries(spots)) {
        if (labels[part] !== undefined) leader(d, at, anchor, labels[part], side(at));
      }
    }
  }

  // ── The Earth's layers ────────────────────────────────────────────────────
  /**
   * The Earth's interior with the inner core, outer core and mantle at their
   * true proportions of the radius (1220, 3480 and about 6340 km of 6371 km).
   * The crust is far too thin to see at this scale, so it is drawn thicker,
   * and the caption has to say so.
   */
  const LAYERS = ['crust', 'mantle', 'outer core', 'inner core'];

  function earthLayers(d, labels) {
    labels = labels || {};
    const c = [d.w * 0.38, d.h / 2], R = Math.min(d.w * 0.34, d.h * 0.46);
    const crustDrawn = Math.max(4, R * 0.06);
    const rings = [
      { r: R, fill: 'var(--crust)' },
      { r: R - crustDrawn, fill: 'var(--mantle)' },
      { r: R * 3480 / 6371, fill: 'var(--outer-core)' },
      { r: R * 1220 / 6371, fill: 'var(--inner-core)' }
    ];
    for (const ring of rings) d.add('circle', { cx: c[0], cy: c[1], r: ring.r.toFixed(1), fill: ring.fill, stroke: INK, 'stroke-width': 1 });
    const anchorAt = rr => Geo.add(c, Geo.fromDir(-35, rr));
    const mids = {
      'crust': R - crustDrawn / 2,
      'mantle': (R - crustDrawn + R * 3480 / 6371) / 2,
      'outer core': (R * 3480 / 6371 + R * 1220 / 6371) / 2,
      'inner core': R * 1220 / 6371 * 0.5
    };
    const x = d.w - 30;
    LAYERS.forEach((layer, i) => {
      if (labels[layer] === undefined) return;
      const anchor = Geo.add(c, Geo.fromDir(-50 + i * 30, mids[layer]));
      leader(d, [/^\d+$/.test(String(labels[layer])) ? x : x - 70, 26 + i * ((d.h - 52) / 3)], anchor, labels[layer], 'right');
    });
  }

  // ── Light ─────────────────────────────────────────────────────────────────
  /**
   * A ray striking a flat mirror at angle `i` to the normal. Drawn from the
   * real angle; with `reflected` it also draws the reflected ray at the same
   * angle on the other side of the normal.
   */
  function mirror(d, i, o) {
    o = o || {};
    const hit = [d.w / 2, d.h - 40];
    d.line([24, hit[1]], [d.w - 24, hit[1]], { stroke: INK, width: 2.4 });
    for (let x = 30; x < d.w - 24; x += 10) d.line([x, hit[1] + 1], [x - 7, hit[1] + 9], { stroke: MUTED, width: 1 });
    d.line([hit[0], hit[1]], [hit[0], 18], { stroke: MUTED, width: 1.2, dash: '4 3' });
    d.text([hit[0], 11], 'normal', { size: 10, fill: MUTED, bold: false });
    const L = Math.min(d.h - 70, 140);
    const start = [hit[0] - L * Math.sin(i * RAD), hit[1] - L * Math.cos(i * RAD)];
    SciDia.arrow(d, start, Geo.add(hit, Geo.scale(Geo.norm(Geo.sub(start, hit)), 2)), { colour: 'var(--dia-accent)', width: 2 });
    d.markAngle(hit, -90 - i, i, { r: 30, label: o.iLabel || i + '°', colour: 'var(--dia-accent)' });
    if (o.reflected) {
      const end = [hit[0] + L * Math.sin(i * RAD), hit[1] - L * Math.cos(i * RAD)];
      SciDia.arrow(d, hit, end, { colour: 'var(--brand)', width: 2 });
      d.markAngle(hit, -90, i, { r: 30, label: o.rLabel || i + '°', colour: 'var(--brand)' });
    }
  }

  /**
   * Light going from air into water. Three possible paths are drawn below
   * the surface: straight on, bent towards the normal (the real one,
   * calculated with refractive index 1.33), and bent away from it.
   * `order` says which letter goes on which path.
   */
  function refraction(d, i, order) {
    const hit = [d.w / 2, d.h * 0.46];
    d.add('rect', { x: 14, y: hit[1], width: d.w - 28, height: d.h - hit[1] - 8, fill: 'var(--water)', stroke: 'none' });
    d.line([14, hit[1]], [d.w - 14, hit[1]], { stroke: INK, width: 1.6 });
    d.text([24, hit[1] - 10], 'air', { size: 11, fill: MUTED, bold: false, anchor: 'start' });
    d.text([24, hit[1] + 14], 'water', { size: 11, fill: MUTED, bold: false, anchor: 'start' });
    d.line([hit[0], 10], [hit[0], d.h - 10], { stroke: MUTED, width: 1.1, dash: '4 3' });
    const L = hit[1] - 14;
    const start = [hit[0] - L * Math.sin(i * RAD), hit[1] - L * Math.cos(i * RAD)];
    SciDia.arrow(d, start, hit, { colour: 'var(--dia-accent)', width: 2 });
    const real = Math.asin(Math.sin(i * RAD) / 1.33) / RAD;
    const away = Math.min(80, i + (i - real) * 1.6);
    // With no `order`, only the true path is drawn, as an arrow.
    const angles = order ? { towards: real, straight: i, away } : { towards: real };
    const L2 = d.h - hit[1] - 20;
    for (const [kind, a] of Object.entries(angles)) {
      const end = [hit[0] + L2 * Math.sin(a * RAD), hit[1] + L2 * Math.cos(a * RAD)];
      if (!order) { SciDia.arrow(d, hit, end, { colour: 'var(--dia-accent)', width: 2 }); continue; }
      d.line(hit, end, { stroke: INK, width: 1.4 });
      const lab = Geo.add(end, Geo.scale(Geo.norm(Geo.sub(end, hit)), 10));
      d.text(lab, order[kind], { size: 12, fill: 'var(--accent-ink)' });
    }
    return { real, away };
  }

  // ── Forces ────────────────────────────────────────────────────────────────
  /**
   * A free body diagram: a box with force arrows whose lengths are in
   * proportion to the forces. `forces` is { left, right, up, down } in
   * newtons; any can be omitted.
   */
  function forceDiagram(d, forces, o) {
    o = o || {};
    const c = [d.w / 2, d.h / 2];
    const bw = 54, bh = 40;
    d.add('rect', { x: c[0] - bw / 2, y: c[1] - bh / 2, width: bw, height: bh, rx: 4,
                    fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.6 });
    if (o.label) d.text(c, o.label, { size: 11, fill: MUTED, bold: false });
    const max = Math.max(...Object.values(forces).filter(v => v > 0), 1);
    // Every arrow shares one scale, set by whichever direction has least
    // room. Otherwise a vertical arrow squeezed by the canvas height would
    // look smaller than a horizontal one for a bigger force.
    const vertical = forces.up || forces.down;
    const room = Math.min(c[0] - bw / 2 - 20, 100, vertical ? c[1] - bh / 2 - 12 : Infinity);
    const len = v => (v / max) * room;
    const dirs = { left: [-1, 0, bw / 2], right: [1, 0, bw / 2], up: [0, -1, bh / 2], down: [0, 1, bh / 2] };
    for (const [k, v] of Object.entries(forces)) {
      if (!v) continue;
      const [dx, dy, off] = dirs[k];
      const from = [c[0] + dx * off, c[1] + dy * off];
      const L = len(v);
      const to = [from[0] + dx * L, from[1] + dy * L];
      SciDia.arrow(d, from, to, { colour: 'var(--dia-accent)', width: 2.2, head: 7 });
      const lab = k === 'left' || k === 'right'
        ? [ (from[0] + to[0]) / 2, from[1] - 10 ]
        : [ from[0] + 24, (from[1] + to[1]) / 2 ];
      d.text(lab, v + ' N', { size: 11.5, fill: 'var(--dia-accent)' });
    }
  }

  /**
   * A seesaw, level, with stacks of identical blocks at whole-number
   * distances (in metres) either side of the pivot. Drawn to scale along
   * the plank, with distance marks.
   */
  function seesaw(d, left, right, o) {
    o = o || {};
    const y = d.h - 46, c = d.w / 2, half = d.w / 2 - 22;
    const span = o.span || 4;                          // metres each side
    const unit = half / span;
    d.add('rect', { x: c - half, y: y - 4, width: half * 2, height: 8, rx: 2, fill: 'var(--plank)', stroke: INK, 'stroke-width': 1.2 });
    d.add('polygon', { points: `${c},${y + 4} ${c - 14},${y + 30} ${c + 14},${y + 30}`, fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.3 });
    for (let m = 1; m <= span; m++) {
      for (const s of [-1, 1]) {
        const x = c + s * m * unit;
        d.line([x, y + 6], [x, y + 11], { stroke: MUTED, width: 1 });
        d.text([x, y + 20], m + ' m', { size: 9.5, fill: MUTED, bold: false });
      }
    }
    const blk = Math.min(20, unit * 0.7);
    const stack = (side, n, dist) => {
      const x = c + side * dist * unit;
      for (let k = 0; k < n; k++) {
        d.add('rect', { x: (x - blk / 2).toFixed(1), y: (y - 4 - (k + 1) * (blk + 1)).toFixed(1), width: blk, height: blk,
                        rx: 2, fill: 'var(--brand)', stroke: 'var(--brand-ink)', 'stroke-width': 1 });
      }
    };
    stack(-1, left.n, left.d);
    stack(1, right.n, right.d);
  }

  // ── Chromatography ────────────────────────────────────────────────────────
  /**
   * A paper chromatogram. Each reference dye travels a fixed fraction of the
   * way to the solvent front; a mixture shows a spot at the height of each
   * dye it contains, in that dye's colour.
   */
  const DYE_COLOURS = ['var(--dia-accent)', 'var(--brand)', 'var(--dia-unknown)', 'var(--dia-known)', 'var(--accent)'];

  function chromatogram(d, dyes, mixtures) {
    const top = 22, base = d.h - 30;
    const cols = dyes.length + mixtures.length;
    const x0 = 34, x1 = d.w - 22;
    d.add('rect', { x: x0 - 16, y: 10, width: x1 - x0 + 32, height: d.h - 16, rx: 2, fill: 'var(--paper-strip)', stroke: INK, 'stroke-width': 1.1 });
    d.line([x0 - 10, base], [x1 + 10, base], { stroke: MUTED, width: 1.1 });
    d.line([x0 - 10, top], [x1 + 10, top], { stroke: MUTED, width: 1.1, dash: '4 3' });
    d.text([x1 + 6, top + 9], 'solvent front', { size: 9, fill: MUTED, bold: false, anchor: 'end' });
    d.text([x1 + 6, base + 11], 'start line', { size: 9, fill: MUTED, bold: false, anchor: 'end' });
    const step = (x1 - x0) / (cols - 1 || 1);
    const yOf = rf => base - rf * (base - top);
    const all = [...dyes.map((dy, i) => ({ label: dy.label, spots: [{ rf: dy.rf, col: DYE_COLOURS[i % DYE_COLOURS.length] }] })),
                 ...mixtures.map(mx => ({ label: mx.label, spots: mx.contains.map(i => ({ rf: dyes[i].rf, col: DYE_COLOURS[i % DYE_COLOURS.length] })) }))];
    all.forEach((col, k) => {
      const x = x0 + k * step;
      d.dot([x, base], { r: 1.6, fill: MUTED });
      for (const sp of col.spots) {
        d.add('ellipse', { cx: x.toFixed(1), cy: yOf(sp.rf).toFixed(1), rx: 6, ry: 4.5, fill: sp.col, 'fill-opacity': 0.85, stroke: 'none' });
      }
      d.text([x, d.h - 8], col.label, { size: 11.5 });
    });
  }

  Object.assign(SciDia, {
    moon, PHASES, eclipse, web, cell, PLANT_PARTS, ANIMAL_PARTS,
    earthLayers, LAYERS, mirror, refraction, forceDiagram, seesaw, chromatogram, box, leader
  });
})();


// ── Learn it diagrams ──────────────────────────────────────────────────────
// Small pictures for the idea cards. Apparatus is drawn schematically, but
// where a picture makes a physical claim (a liquid's surface stays level in
// a tilted beaker, sediment collects in the lowest corner) it is computed.

(() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)';
  const RAD = Math.PI / 180;
  const SAND = 'var(--mantle)', MUD = 'var(--crust)', IRON = 'var(--moon-dark)';
  const pts = list => list.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

  /** A short label in the muted diagram style. */
  function note(d, p, text, anchor) {
    d.text(p, text, { size: 10.5, fill: MUTED, bold: false, anchor: anchor || 'middle' });
  }
  /** A label joined to what it names by a thin line. */
  function tag(d, at, to, text, anchor) {
    const back = anchor === 'end' ? 3 : anchor === 'start' ? -3 : 0;
    d.line([at[0] + back, at[1]], to, { stroke: MUTED, width: 0.9 });
    d.dot(to, { r: 1.8, fill: MUTED });
    d.text(at, text, { size: 10.5, fill: 'var(--accent-ink)', bold: false, anchor: anchor || 'start' });
  }
  /** Keep the part of a polygon at or below the line y = level (Sutherland–Hodgman, one edge). */
  function below(poly, level) {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const ain = a[1] >= level, bin = b[1] >= level;
      if (ain) out.push(a);
      if (ain !== bin) {
        const t = (level - a[1]) / (b[1] - a[1]);
        out.push([a[0] + t * (b[0] - a[0]), level]);
      }
    }
    return out;
  }
  const rot = (p, c, deg) => {
    const a = deg * RAD, x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
  };
  /** An open-topped beaker, as a path, from its four corners (rim left, base left, base right, rim right). */
  function beaker(d, c) {
    d.add('path', { d: 'M ' + c.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L '),
                    fill: 'none', stroke: INK, 'stroke-width': 1.6, 'stroke-linejoin': 'round' });
  }

  // ── Pure substance and mixture, as particles ──────────────────────────────
  function pureVsMixture(d) {
    const r = 6, gap = 2 * r + 4;
    const kinds = [
      { fill: 'var(--brand)', edge: 'var(--brand-ink)' },
      { fill: 'var(--accent)', edge: 'var(--accent-ink)' }
    ];
    // Which particles in the mixture are the second substance. Fixed, so the
    // picture is the same every visit.
    const second = new Set([1, 3, 6, 8, 12, 14, 15, 17]);
    const panel = (x0, mixed, label) => {
      const bw = (d.w - 36) / 2, bh = d.h - 42;
      d.add('rect', { x: x0, y: 8, width: bw, height: bh, rx: 4, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.5 });
      const cols = 5, rows = 4;
      const left = x0 + (bw - (cols - 1) * gap) / 2, top = 8 + (bh - (rows - 1) * gap) / 2;
      let k = 0;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++, k++) {
        const jx = ((k * 37) % 7 - 3) * 0.6, jy = ((k * 53) % 7 - 3) * 0.6;
        const kind = kinds[mixed && second.has(k) ? 1 : 0];
        d.add('circle', { cx: (left + i * gap + jx).toFixed(1), cy: (top + j * gap + jy).toFixed(1), r,
                          fill: kind.fill, stroke: kind.edge, 'stroke-width': 1, 'fill-opacity': 0.85 });
      }
      note(d, [x0 + bw / 2, d.h - 16], label);
    };
    panel(12, false, 'Pure substance');
    panel(d.w / 2 + 6, true, 'Mixture');
  }

  // ── Sieving ───────────────────────────────────────────────────────────────
  function sieve(d) {
    const P0 = [60, 34], C = [130, 104], P2 = [200, 34];
    const at = t => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P2[0],
                     (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P2[1]];
    d.add('path', { d: `M ${P0[0]} ${P0[1]} Q ${C[0]} ${C[1]} ${P2[0]} ${P2[1]}`, fill: 'none',
                    stroke: INK, 'stroke-width': 2, 'stroke-dasharray': '7 3' });
    d.line([P0[0] - 14, P0[1]], P0, { stroke: INK, width: 2 });
    d.line(P2, [P2[0] + 14, P2[1]], { stroke: INK, width: 2 });
    // Gravel resting on the mesh: each stone sits one radius above it.
    for (const [t, lift, r] of [[0.32, 8, 7], [0.45, 9, 8], [0.58, 8.5, 7.5], [0.7, 7, 6.5], [0.42, 23, 7], [0.56, 23, 7.5]]) {
      const p = at(t);
      d.add('circle', { cx: p[0].toFixed(1), cy: (p[1] - lift).toFixed(1), r, fill: MUD, stroke: INK, 'stroke-width': 1 });
    }
    // Sand grains falling through, and collecting in the tray.
    for (const [x, y] of [[118, 80], [132, 86], [126, 95], [140, 99], [121, 106], [134, 110], [128, 116]]) d.dot([x, y], { r: 1.8, fill: SAND });
    d.add('path', { d: 'M 84 120 L 84 136 L 176 136 L 176 120', fill: 'none', stroke: INK, 'stroke-width': 1.6 });
    for (let k = 0; k < 26; k++) d.dot([94 + ((k * 29) % 72), 132 - ((k * 7) % 3) * 1.8], { r: 1.8, fill: SAND });
    note(d, [130, 12], 'gravel stays in the sieve');
    note(d, [112, 100], 'sand falls through', 'end');
  }

  // ── Filtration ────────────────────────────────────────────────────────────
  function filtration(d) {
    const cx = 120;
    // Filter paper cone, the liquid sitting in it, and the residue at the tip.
    d.add('polygon', { points: pts([[cx - 44, 22], [cx + 44, 22], [cx, 70]]), fill: 'var(--paper-strip)', stroke: 'var(--accent)', 'stroke-width': 1.2 });
    d.add('polygon', { points: pts([[cx - 32, 35], [cx + 32, 35], [cx, 70]]), fill: 'var(--water)', stroke: 'none' });
    for (const [x, y] of [[0, 65], [-3, 61], [3, 61], [-6, 57], [0, 57], [6, 57], [-3, 53], [3, 53], [-9, 53], [9, 53]]) d.dot([cx + x, y], { r: 1.9, fill: MUD });
    d.add('path', { d: `M ${cx - 50} 18 L ${cx - 5} 72 L ${cx - 5} 100 M ${cx + 5} 100 L ${cx + 5} 72 L ${cx + 50} 18`,
                    fill: 'none', stroke: INK, 'stroke-width': 1.8, 'stroke-linejoin': 'round' });
    d.dot([cx, 110], { r: 2.2, fill: 'var(--earth)' });
    beaker(d, [[cx - 36, 96], [cx - 36, 148], [cx + 36, 148], [cx + 36, 96]]);
    d.add('rect', { x: cx - 35, y: 126, width: 70, height: 21, fill: 'var(--water)', stroke: 'none' });
    tag(d, [cx + 54, 34], [cx + 28, 34], 'filter paper');
    tag(d, [cx - 54, 56], [cx - 10, 56], 'residue', 'end');
    tag(d, [cx + 54, 136], [cx + 30, 136], 'filtrate');
  }

  // ── Settling and decanting ────────────────────────────────────────────────
  function decant(d) {
    // 1. Settled: mud at the bottom, clearer water above.
    const A = [[24, 46], [24, 122], [84, 122], [84, 46]];
    d.add('rect', { x: 25, y: 64, width: 58, height: 57, fill: 'var(--water)', stroke: 'none' });
    d.add('rect', { x: 25, y: 108, width: 58, height: 13, fill: MUD, 'fill-opacity': 0.85, stroke: 'none' });
    beaker(d, A);
    note(d, [54, 140], '1  Let it settle');

    // 2. Tilted to pour. The water's surface stays level, found by clipping
    // the tilted beaker at the height of its lip; the settled mud stays as a
    // layer on the base, which is what lets the water be poured off.
    const pivot = [150, 112], tilt = 26;
    const B = [[124, 50], [124, 112], [176, 112], [176, 50]].map(p => rot(p, pivot, tilt));
    const lip = B[3];
    const water = below(B, lip[1] + 1);
    const mud = [[125, 99], [125, 111], [175, 111], [175, 99]].map(p => rot(p, pivot, tilt));
    d.add('polygon', { points: pts(water), fill: 'var(--water)', stroke: 'none' });
    d.add('polygon', { points: pts(mud), fill: MUD, 'fill-opacity': 0.85, stroke: 'none' });
    beaker(d, B);
    // The stream from the lip into the second beaker.
    const C = [[204, 92], [204, 122], [244, 122], [244, 92]];
    d.add('path', { d: `M ${lip[0].toFixed(1)} ${lip[1].toFixed(1)} Q ${lip[0] + 14} ${lip[1] - 2} ${lip[0] + 16} 116`,
                    fill: 'none', stroke: 'var(--earth)', 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-opacity': 0.8 });
    d.add('rect', { x: 205, y: 110, width: 38, height: 11, fill: 'var(--water)', stroke: 'none' });
    beaker(d, C);
    note(d, [186, 140], '2  Pour off the water');
  }

  // ── Evaporation ───────────────────────────────────────────────────────────
  function evaporation(d) {
    const cx = 110;
    // Steam rising.
    for (const dx of [-14, 0, 14]) {
      const x = cx + dx;
      d.add('path', { d: `M ${x} 62 q 5 -6 0 -12 q -5 -6 0 -12 q 5 -6 0 -12`, fill: 'none', stroke: MUTED, 'stroke-width': 1.2 });
    }
    note(d, [cx - 26, 30], 'water evaporates', 'end');
    // Dish with crystals left in it.
    d.add('path', { d: `M ${cx - 38} 68 Q ${cx} 98 ${cx + 38} 68 Z`, fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.6 });
    for (const [x, y, a] of [[-10, 76, 10], [0, 79, -15], [10, 76, 25], [-4, 73, 40], [5, 73, 0]]) {
      d.add('rect', { x: cx + x - 2.5, y: y - 2.5, width: 5, height: 5, fill: 'var(--paper-strip)', stroke: INK, 'stroke-width': 0.8,
                      transform: `rotate(${a} ${cx + x} ${y})` });
    }
    tag(d, [cx + 52, 74], [cx + 14, 76], 'salt crystals');
    // Gauze, tripod and a gentle flame.
    d.line([cx - 48, 90], [cx + 48, 90], { stroke: MUTED, width: 2 });
    d.line([cx - 40, 90], [cx - 50, 146], { stroke: INK, width: 1.6 });
    d.line([cx + 40, 90], [cx + 50, 146], { stroke: INK, width: 1.6 });
    d.add('path', { d: `M ${cx} 100 Q ${cx - 10} 114 ${cx} 122 Q ${cx + 10} 114 ${cx} 100 Z`, fill: 'var(--sun)', stroke: 'var(--accent)', 'stroke-width': 1.2 });
    d.add('rect', { x: cx - 6, y: 122, width: 12, height: 24, fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.3 });
  }

  // ── Separating with a magnet ──────────────────────────────────────────────
  function magnet(d) {
    const cx = 120;
    d.add('path', { d: `M ${cx - 20} 70 L ${cx - 20} 36 A 20 20 0 0 1 ${cx + 20} 36 L ${cx + 20} 70`,
                    fill: 'none', stroke: 'var(--dia-accent)', 'stroke-width': 12 });
    d.line([cx - 20, 62], [cx - 20, 72], { stroke: INK, width: 12 });
    d.line([cx + 20, 62], [cx + 20, 72], { stroke: INK, width: 12 });
    // Iron filings clinging to the poles.
    const filing = (x, y, a) => d.line([x - 3 * Math.cos(a), y - 3 * Math.sin(a)], [x + 3 * Math.cos(a), y + 3 * Math.sin(a)], { stroke: IRON, width: 1.6 });
    for (let k = 0; k < 9; k++) {
      filing(cx - 20 + ((k * 5) % 13) - 6, 81 + (k % 3) * 4, k * 0.7);
      filing(cx + 20 + ((k * 7) % 13) - 6, 81 + (k % 3) * 4, k * 1.1);
    }
    tag(d, [cx - 40, 86], [cx - 26, 86], 'iron sticks', 'end');
    // The heap left behind: sand only.
    // Grains placed on a low-discrepancy pattern under a parabolic outline.
    d.add('path', { d: `M ${cx - 50} 140 Q ${cx} 100 ${cx + 50} 140 Z`, fill: SAND, 'fill-opacity': 0.25, stroke: 'none' });
    for (let k = 0; k < 90; k++) {
      const u = (k * 0.618034) % 1, v = (k * 0.754878) % 1;
      const x = cx - 46 + u * 92, top = 140 - 19 * (1 - ((x - cx) / 50) ** 2);
      d.dot([x, top + 2 + v * (136 - top)], { r: 1.7, fill: SAND });
    }
    d.line([cx - 60, 141], [cx + 60, 141], { stroke: INK, width: 1.4 });
    tag(d, [cx + 62, 126], [cx + 30, 132], 'sand stays');
  }

  // ── Thermal energy ────────────────────────────────────────────────────────
  function flame(d, c, s) {
    s = s || 1;
    d.add('path', { d: `M ${c[0]} ${c[1] - 16 * s} Q ${c[0] - 9 * s} ${c[1] - 3 * s} ${c[0]} ${c[1] + 4 * s} Q ${c[0] + 9 * s} ${c[1] - 3 * s} ${c[0]} ${c[1] - 16 * s} Z`,
                    fill: 'var(--sun)', stroke: 'var(--accent)', 'stroke-width': 1.2 });
  }
  /** One way thermal energy moves: 'conduction', 'convection' or 'radiation'. */
  function heatTransfer(d, kind) {
    const P = 'var(--brand)', PE = 'var(--brand-ink)';
    if (kind === 'conduction') {
      // A metal bar as a row of touching particles. Those over the flame
      // vibrate hardest; each passes energy to the next, but none move along.
      const r = 9, y = 60, n = 10, x0 = 30;
      for (let i = 0; i < n; i++) {
        const x = x0 + i * 2 * r;
        // A zigzag above each particle, taller where it vibrates more.
        const amp = Math.max(0, 5 - i * 0.55);
        if (amp > 0.8) {
          d.add('path', { d: `M ${x - 6} ${y - r - 5} l 3 ${-amp} l 3 ${amp} l 3 ${-amp} l 3 ${amp}`,
                          fill: 'none', stroke: MUTED, 'stroke-width': 1.1, 'stroke-linejoin': 'round' });
        }
        d.add('circle', { cx: x, cy: y, r, fill: P, stroke: PE, 'stroke-width': 1, 'fill-opacity': 0.85 });
      }
      flame(d, [x0 + r, 90], 1.2);
      SciDia.arrow(d, [70, 30], [200, 30], { colour: 'var(--dia-accent)', width: 2 });
      note(d, [135, 18], 'energy passes along');
      note(d, [140, 92], 'the particles stay in place');
      return;
    }
    if (kind === 'convection') {
      // A pan of water heated from below, with the current drawn as two loops.
      const L = 50, R = 190, top = 34, bot = 110;
      d.add('rect', { x: L + 1, y: top + 6, width: R - L - 2, height: bot - top - 7, fill: 'var(--water)', stroke: 'none' });
      d.add('path', { d: `M ${L} ${top} L ${L} ${bot} L ${R} ${bot} L ${R} ${top}`, fill: 'none', stroke: INK, 'stroke-width': 1.8 });
      const cx = (L + R) / 2;
      for (const side of [-1, 1]) {
        const xi = cx + side * 10, xo = cx + side * 52;
        d.add('path', { d: `M ${xi} ${bot - 12} L ${xi} ${top + 20} Q ${xi} ${top + 12} ${xi + side * 10} ${top + 12} L ${xo - side * 10} ${top + 12} Q ${xo} ${top + 12} ${xo} ${top + 22} L ${xo} ${bot - 22} Q ${xo} ${bot - 12} ${xo - side * 10} ${bot - 12} L ${xi + side * 6} ${bot - 12}`,
                        fill: 'none', stroke: 'var(--dia-accent)', 'stroke-width': 1.8 });
        SciDia.arrow(d, [xi, top + 40], [xi, top + 26], { colour: 'var(--dia-accent)', width: 1.8 });
        SciDia.arrow(d, [xo, top + 44], [xo, top + 60], { colour: 'var(--dia-accent)', width: 1.8 });
      }
      flame(d, [cx, 128], 1);
      note(d, [cx, 18], 'warm water rises; cooler water sinks');
      return;
    }
    // Radiation: from a fire across a gap, with no material needed.
    flame(d, [44, 92], 2.2);
    d.add('rect', { x: 26, y: 96, width: 36, height: 8, rx: 2, fill: MUD, stroke: INK, 'stroke-width': 1 });
    for (const dy of [-20, 0, 20]) {
      const y = 70 + dy;
      let path = `M 76 ${y}`;
      for (let x = 76; x < 176; x += 10) path += ` q 2.5 -5 5 0 q 2.5 5 5 0`;
      d.add('path', { d: path, fill: 'none', stroke: 'var(--dia-accent)', 'stroke-width': 1.5 });
      SciDia.arrow(d, [176, y], [190, y], { colour: 'var(--dia-accent)', width: 1.5 });
    }
    d.add('rect', { x: 198, y: 44, width: 18, height: 52, rx: 8, fill: 'var(--moon-lit)', stroke: INK, 'stroke-width': 1.3 });
    note(d, [130, 118], 'no material needed');
  }

  /** Particles at two temperatures: the same particles, moving at different speeds. */
  function particleSpeed(d) {
    const box = (x0, len, label) => {
      const bw = (d.w - 36) / 2, bh = d.h - 40;
      d.add('rect', { x: x0, y: 8, width: bw, height: bh, rx: 4, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.5 });
      const spots = [[0.2, 0.25, 30], [0.55, 0.2, 160], [0.82, 0.35, 250], [0.3, 0.62, 100], [0.68, 0.7, 330], [0.15, 0.85, 200], [0.5, 0.48, 60], [0.85, 0.85, 120]];
      for (const [u, v, a] of spots) {
        const c = [x0 + 10 + u * (bw - 20), 16 + v * (bh - 20)];
        const tip = Geo.add(c, Geo.fromDir(a, 6 + len));
        SciDia.arrow(d, Geo.add(c, Geo.fromDir(a, 6)), tip, { colour: MUTED, width: 1.1, head: 4 });
        d.add('circle', { cx: c[0].toFixed(1), cy: c[1].toFixed(1), r: 5, fill: 'var(--brand)', stroke: 'var(--brand-ink)', 'stroke-width': 1, 'fill-opacity': 0.85 });
      }
      note(d, [x0 + bw / 2, d.h - 16], label);
    };
    box(12, 5, 'Cooler');
    box(d.w / 2 + 6, 15, 'Hotter');
  }

  // ── The Moon's orbit, from above ──────────────────────────────────────────
  /** Sunlight from the left; the half of the Moon facing the Sun is always lit. */
  function moonOrbit(d) {
    const E = [d.w / 2 + 20, d.h / 2], R = Math.min(d.h / 2 - 22, 62);
    for (const y of [E[1] - 50, E[1], E[1] + 50]) SciDia.arrow(d, [10, y], [44, y], { colour: 'var(--accent)', width: 1.6 });
    note(d, [30, E[1] - 64], 'sunlight');
    d.add('circle', { cx: E[0], cy: E[1], r: R, fill: 'none', stroke: MUTED, 'stroke-width': 1, 'stroke-dasharray': '4 3' });
    d.add('circle', { cx: E[0], cy: E[1], r: 13, fill: 'var(--earth)', stroke: INK, 'stroke-width': 1.1 });
    note(d, [E[0], E[1] + 24], 'Earth');
    const mr = 8;
    for (const [ang, lab] of [[180, 'new'], [270, ''], [0, 'full'], [90, '']]) {
      const c = [E[0] + R * Math.cos(ang * RAD), E[1] + R * Math.sin(ang * RAD)];
      d.add('circle', { cx: c[0].toFixed(1), cy: c[1].toFixed(1), r: mr, fill: 'var(--moon-dark)', stroke: INK, 'stroke-width': 1 });
      d.add('path', { d: `M ${c[0].toFixed(1)} ${(c[1] - mr).toFixed(1)} A ${mr} ${mr} 0 0 0 ${c[0].toFixed(1)} ${(c[1] + mr).toFixed(1)} Z`,
                      fill: 'var(--moon-lit)', stroke: 'none' });
      if (lab) note(d, [c[0] + (ang === 0 ? 0 : 0), c[1] + (ang === 0 || ang === 180 ? -16 : 0)], lab);
    }
  }

  // ── Solutions ─────────────────────────────────────────────────────────────
  /** A beaker of liquid: 'solution', 'suspension' or 'saturated'. */
  function solution(d, kind) {
    const L = d.w / 2 - 44, R = d.w / 2 + 44, top = 20, bot = d.h - 30, lvl = 38;
    d.add('rect', { x: L + 1, y: lvl, width: R - L - 2, height: bot - lvl - 1, fill: 'var(--water)', stroke: 'none' });
    const S = 'var(--dia-accent)';
    if (kind === 'suspension') {
      // Clumps of undissolved solid, more of them lower down, some settled.
      for (let k = 0; k < 9; k++) {
        const x = L + 12 + ((k * 0.618) % 1) * (R - L - 24), y = lvl + 10 + ((k * 0.38 + k / 9) % 1) * (bot - lvl - 30);
        d.add('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 3.6, fill: MUD, stroke: INK, 'stroke-width': 0.6 });
      }
      for (let k = 0; k < 12; k++) d.add('circle', { cx: (L + 8 + k * 6.5).toFixed(1), cy: bot - 4 - (k % 2) * 3, r: 3.2, fill: MUD, stroke: INK, 'stroke-width': 0.6 });
    } else {
      // Dissolved: single particles spread evenly through the liquid.
      for (let k = 0; k < 26; k++) {
        const x = L + 8 + ((0.5 + k * 0.7548776662) % 1) * (R - L - 16), y = lvl + 6 + ((0.5 + k * 0.5698402910) % 1) * (bot - lvl - 14);
        d.dot([x, y], { r: 1.8, fill: S });
      }
      if (kind === 'saturated') {
        for (const [x, y, a] of [[-14, 0, 10], [-6, -2, 35], [2, 0, -10], [10, -1, 20], [-2, -6, 0], [6, -6, 45]]) {
          const cx = d.w / 2 + x, cy = bot - 5 + y;
          d.add('rect', { x: cx - 3.5, y: cy - 3.5, width: 7, height: 7, fill: 'var(--paper-strip)', stroke: INK, 'stroke-width': 0.8, transform: `rotate(${a} ${cx} ${cy})` });
        }
      }
    }
    beaker(d, [[L, top], [L, bot], [R, bot], [R, top]]);
    note(d, [d.w / 2, d.h - 12], { solution: 'dissolved: spread evenly', suspension: 'not dissolved: settles', saturated: 'no more can dissolve' }[kind]);
  }

  /** The same volume of solvent with less and more solute. */
  function concentration(d) {
    const one = (cx, n, label) => {
      const L = cx - 38, R = cx + 38, top = 16, bot = d.h - 30, lvl = 32;
      d.add('rect', { x: L + 1, y: lvl, width: R - L - 2, height: bot - lvl - 1, fill: 'var(--brand)', 'fill-opacity': 0.05 + n * 0.012, stroke: 'none' });
      for (let k = 0; k < n; k++) {
        const x = L + 8 + ((0.5 + k * 0.7548776662) % 1) * (R - L - 16), y = lvl + 6 + ((0.5 + k * 0.5698402910) % 1) * (bot - lvl - 14);
        d.dot([x, y], { r: 2, fill: 'var(--dia-accent)' });
      }
      beaker(d, [[L, top], [L, bot], [R, bot], [R, top]]);
      note(d, [cx, d.h - 12], label);
    };
    one(d.w * 0.27, 6, 'dilute');
    one(d.w * 0.73, 24, 'concentrated');
  }

  // ── How we see ────────────────────────────────────────────────────────────
  function seeing(d) {
    // Lamp, top left.
    const lamp = [40, 34];
    d.add('circle', { cx: lamp[0], cy: lamp[1], r: 11, fill: 'var(--sun)', stroke: 'var(--accent)', 'stroke-width': 1.2 });
    for (let a = 0; a < 360; a += 45) d.line(Geo.add(lamp, Geo.fromDir(a, 14)), Geo.add(lamp, Geo.fromDir(a, 18)), { stroke: 'var(--accent)', width: 1.2 });
    note(d, [lamp[0], lamp[1] + 30], 'source');
    // Book, bottom middle.
    const book = [d.w / 2, d.h - 34];
    d.add('rect', { x: book[0] - 26, y: book[1] - 8, width: 52, height: 14, rx: 2, fill: 'var(--brand)', 'fill-opacity': 0.75, stroke: INK, 'stroke-width': 1.1 });
    note(d, [book[0], book[1] + 20], 'object');
    // Eye, right.
    const eye = [d.w - 34, 40];
    d.add('path', { d: `M ${eye[0] - 16} ${eye[1]} Q ${eye[0]} ${eye[1] - 12} ${eye[0] + 16} ${eye[1]} Q ${eye[0]} ${eye[1] + 12} ${eye[0] - 16} ${eye[1]} Z`, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
    d.add('circle', { cx: eye[0] - 3, cy: eye[1], r: 4.5, fill: INK });
    note(d, [eye[0], eye[1] + 24], 'eye');
    SciDia.arrow(d, Geo.add(lamp, [14, 12]), [book[0] - 10, book[1] - 12], { colour: 'var(--dia-accent)', width: 1.8 });
    SciDia.arrow(d, [book[0] + 10, book[1] - 12], [eye[0] - 20, eye[1] + 6], { colour: 'var(--dia-accent)', width: 1.8 });
  }

  // ── Cycles and nests ──────────────────────────────────────────────────────
  /**
   * Stages round a loop, with an arrow from each to the next. `labels` go
   * clockwise from the top; optional `edges` label the arrows.
   */
  function cycle(d, labels, o) {
    o = o || {};
    const size = o.size || 11;
    const widest = Math.max(...labels.map(t => String(t).length * size * 0.58 + 14));
    const c = [d.w / 2, d.h / 2], rx = d.w / 2 - (o.padX || widest / 2 + 4), ry = d.h / 2 - (o.padY || 20);
    const n = labels.length;
    const boxes = labels.map((t, i) => {
      const a = -90 + i * 360 / n;
      const p = [c[0] + rx * Math.cos(a * RAD), c[1] + ry * Math.sin(a * RAD)];
      return SciDia.box(d, p, t, { size, h: 22, fill: o.fill && o.fill[i] });
    });
    boxes.forEach((b, i) => {
      const nb = boxes[(i + 1) % n];
      const from = boxEdgeOf(b, nb.c), to = boxEdgeOf(nb, b.c);
      // Bow each arrow outwards a little, so the loop reads as a loop.
      const mid = Geo.scale(Geo.add(from, to), 0.5);
      const out = Geo.norm(Geo.sub(mid, c));
      const ctrl = Geo.add(mid, Geo.scale(out, 14));
      d.add('path', { d: `M ${from[0].toFixed(1)} ${from[1].toFixed(1)} Q ${ctrl[0].toFixed(1)} ${ctrl[1].toFixed(1)} ${to[0].toFixed(1)} ${to[1].toFixed(1)}`,
                      fill: 'none', stroke: INK, 'stroke-width': 1.4 });
      SciDia.arrowHeadAt(d, ctrl, to);
      if (o.edges && o.edges[i]) {
        const lp = Geo.add(ctrl, Geo.scale(out, 4));
        d.text(lp, o.edges[i], { size: 9.5, fill: 'var(--accent-ink)', bold: false,
                                 anchor: Math.abs(out[0]) < 0.3 ? 'middle' : out[0] > 0 ? 'start' : 'end' });
      }
    });
  }
  function boxEdgeOf(b, p) {
    const u = Geo.norm(Geo.sub(p, b.c));
    const tx = Math.abs(u[0]) > 1e-6 ? (b.w / 2 + 3) / Math.abs(u[0]) : Infinity;
    const ty = Math.abs(u[1]) > 1e-6 ? (b.h / 2 + 3) / Math.abs(u[1]) : Infinity;
    return Geo.add(b.c, Geo.scale(u, Math.min(tx, ty)));
  }

  /** Nested regions, outermost first, each labelled in its top-left corner. */
  function nested(d, labels) {
    labels.forEach((t, i) => {
      const inset = 6 + i * 26;
      d.add('rect', { x: inset, y: inset, width: d.w - 2 * inset, height: d.h - 2 * inset, rx: 8,
                      fill: 'var(--brand)', 'fill-opacity': 0.06 + i * 0.05, stroke: 'var(--brand-ink)', 'stroke-width': 1.2 });
      d.text([inset + 8, inset + 13], t, { size: 11, fill: 'var(--brand-ink)', anchor: 'start' });
    });
  }

  Object.assign(SciDia, { note, tag, below, rot, beaker, pureVsMixture, sieve, filtration, decant, evaporation, magnet,
                         flame, heatTransfer, particleSpeed, moonOrbit, solution, concentration, seeing, cycle, nested });
})();


// ── Years 9 and 10 diagrams ─────────────────────────────────────────────────
// Bohr diagrams, a periodic table, circuit diagrams and energy transfer
// diagrams. The same rule again: an atom has exactly the electrons its
// arrangement says, a meter reads what the question says it reads.

(() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', ACC = 'var(--dia-accent)';
  const RAD = Math.PI / 180;

  // ── Atoms ─────────────────────────────────────────────────────────────────
  /** The electron arrangement of an atom with z electrons (up to 20): shells of 2, 8, 8, then 2. */
  const shellsOf = z => {
    const out = [];
    for (const cap of [2, 8, 8, 8]) { if (z <= 0) break; out.push(Math.min(cap, z)); z -= cap; }
    return out;
  };

  /**
   * A Bohr diagram: the nucleus with its protons and neutrons written in it,
   * and each shell a circle with its electrons spaced evenly round it.
   * o: { p, n, shells (defaults to the arrangement for p), c, nucleus: false
   * to leave the nucleus blank, markers: [[x, y, text]] for label questions }.
   */
  function bohr(d, o) {
    const shells = o.shells || shellsOf(o.p);
    const c = o.c || [d.w / 2, d.h / 2];
    const rN = o.rN || 17;
    const gap = o.gap || Math.min(15, (Math.min(d.w, d.h) / 2 - rN - 8) / Math.max(1, shells.length));
    d.add('circle', { cx: c[0], cy: c[1], r: rN, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.5 });
    if (o.nucleus !== false) {
      d.text([c[0], c[1] - 5.5], o.p + 'p', { size: 10 });
      d.text([c[0], c[1] + 6.5], (o.n === undefined ? '?' : o.n) + 'n', { size: 10 });
    }
    shells.forEach((k, i) => {
      const r = rN + gap * (i + 1);
      d.circle(c, r, { stroke: MUTED, width: 1.1 });
      for (let j = 0; j < k; j++) {
        const a = (-90 + (360 / k) * j + (i % 2 ? 360 / k / 2 : 0)) * RAD;
        d.add('circle', { cx: (c[0] + r * Math.cos(a)).toFixed(2), cy: (c[1] + r * Math.sin(a)).toFixed(2), r: 3.3,
                          fill: ACC, stroke: 'var(--surface)', 'stroke-width': 0.8 });
      }
    });
    return { c, rN, gap, outer: rN + gap * shells.length };
  }

  /** A numbered marker with a leader line to the point it labels. */
  function marker(d, at, to, n) {
    d.line(at, to, { stroke: MUTED, width: 1 });
    d.add('circle', { cx: at[0], cy: at[1], r: 8, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
    d.text(at, String(n), { size: 10.5 });
  }

  /** A close-up of a small nucleus (protons marked +) inside its shells, with numbered markers. */
  function atomParts(d, p, n, labels) {
    const c = [d.w / 2 - 10, d.h / 2 + 4];
    const shells = shellsOf(p);
    const rN = 20, gap = 22, br = 5.6;
    // Pack p + n balls in the nucleus: a centre one and rings round it.
    const balls = [];
    const total = p + n;
    const ring = [[0, 0]];
    for (let k = 0; k < 6; k++) ring.push([10 * Math.cos(k * 60 * RAD), 10 * Math.sin(k * 60 * RAD)]);
    for (let k = 0; k < 8; k++) ring.push([17 * Math.cos((k * 45 + 20) * RAD), 17 * Math.sin((k * 45 + 20) * RAD)]);
    for (let i = 0; i < total && i < ring.length; i++) balls.push(ring[i]);
    // Protons and neutrons alternate, so both kinds are spread through the nucleus.
    const isProton = [];
    for (let i = 0, pp = p, nn = n; i < balls.length; i++) {
      const pr = (i % 2 === 0 && pp > 0) || nn === 0;
      isProton.push(pr); if (pr) pp--; else nn--;
    }
    d.add('circle', { cx: c[0], cy: c[1], r: rN + 4, fill: 'none', stroke: MUTED, 'stroke-width': 0.8, 'stroke-dasharray': '2 2' });
    balls.forEach(([x, y], i) => {
      const isP = isProton[i];
      d.add('circle', { cx: (c[0] + x).toFixed(2), cy: (c[1] + y).toFixed(2), r: br,
                        fill: isP ? ACC : 'var(--surface-2)', stroke: INK, 'stroke-width': 0.9 });
      if (isP) d.text([c[0] + x, c[1] + y + 0.5], '+', { size: 10, fill: 'var(--surface)' });
    });
    let electron = null;
    shells.forEach((k, i) => {
      const r = rN + 4 + gap * (i + 1);
      d.circle(c, r, { stroke: MUTED, width: 1.1 });
      for (let j = 0; j < k; j++) {
        const a = (-90 + (360 / k) * j + 30) * RAD;
        const e = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
        d.add('circle', { cx: e[0].toFixed(2), cy: e[1].toFixed(2), r: 3.3, fill: 'var(--dia-unknown)' });
        if (i === shells.length - 1 && j === 0) electron = e;
      }
    });
    // Which ball is a proton, which a neutron: the first of each kind drawn.
    const kinds = balls.map(([x, y], i) => ({ x, y, p: isProton[i] }));
    const P = kinds.find(k => k.p), N = kinds.find(k => !k.p);
    const outer = rN + 4 + gap * shells.length;
    const spots = {
      proton:   [[c[0] + P.x, c[1] + P.y], [c[0] - outer - 14, c[1] - 30]],
      neutron:  [[c[0] + N.x, c[1] + N.y], [c[0] - outer - 14, c[1] + 30]],
      electron: [electron, [electron[0] + 34, electron[1] - 8]],
      shell:    [[c[0] + (rN + 4 + gap) * Math.cos(130 * RAD), c[1] + (rN + 4 + gap) * Math.sin(130 * RAD)], [c[0] - outer + 2, c[1] + outer + 4]],
      nucleus:  [[c[0] + (rN + 4) * Math.cos(-20 * RAD), c[1] + (rN + 4) * Math.sin(-20 * RAD)], [c[0] + outer + 26, c[1] + 24]]
    };
    labels.forEach((name, i) => marker(d, spots[name][1], spots[name][0], i + 1));
  }

  // ── The periodic table ────────────────────────────────────────────────────
  const SYMBOLS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
    'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'];
  /** Group (1–18) and period of an element with atomic number z, for z up to 36. */
  function place(z) {
    if (z === 1) return { g: 1, p: 1 };
    if (z === 2) return { g: 18, p: 1 };
    if (z <= 18) {
      const p = z <= 10 ? 2 : 3, k = z - (p === 2 ? 2 : 10);   // 1..8 along the period
      return { g: k <= 2 ? k : k + 10, p };
    }
    return { g: z - 18, p: 4 };
  }
  const METALS = new Set(['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga']);
  const SEMI = new Set(['B', 'Si', 'Ge', 'As']);

  /**
   * The first four periods. o: { symbols: true, shade: true (metals tinted),
   * marks: { z: 'A' } (a letter in place of the symbol, highlighted),
   * groups: true (group numbers along the top), periods: true }.
   */
  function periodic(d, o) {
    o = o || {};
    const left = o.periods ? 16 : 6, top = o.groups ? 16 : 6;
    const cw = (d.w - left - 6) / 18, ch = Math.min(22, (d.h - top - 6) / 4);
    for (let z = 1; z <= 36; z++) {
      const { g, p } = place(z), s = SYMBOLS[z - 1];
      const x = left + (g - 1) * cw, y = top + (p - 1) * ch;
      const mark = o.marks && o.marks[z];
      const fill = mark ? 'var(--dia-unknown)' : o.shade && METALS.has(s) ? 'var(--surface-2)' : 'var(--surface)';
      d.add('rect', { x: (x + 0.5).toFixed(2), y: (y + 0.5).toFixed(2), width: (cw - 1).toFixed(2), height: (ch - 1).toFixed(2),
                      fill, 'fill-opacity': mark ? 0.85 : 1, stroke: o.shade && SEMI.has(s) ? INK : MUTED, 'stroke-width': o.shade && SEMI.has(s) ? 1.1 : 0.7,
                      'stroke-dasharray': o.shade && SEMI.has(s) ? '2 1.5' : null });
      const t = mark || (o.symbols !== false ? s : '');
      if (t) d.text([x + cw / 2, y + ch / 2 + 0.5], t, { size: mark ? 10.5 : Math.min(9, cw * 0.48), fill: mark ? 'var(--surface)' : INK, bold: !!mark });
    }
    if (o.groups) for (let g = 1; g <= 18; g++) d.text([left + (g - 0.5) * cw, 8], String(g), { size: 7.5, fill: MUTED, bold: false });
    if (o.periods) for (let p = 1; p <= 4; p++) d.text([7, top + (p - 0.5) * ch], String(p), { size: 7.5, fill: MUTED, bold: false });
  }

  // ── Circuits ──────────────────────────────────────────────────────────────
  // A circuit is drawn on horizontal wires only, so every symbol is drawn one
  // way round. `gap` is how much wire each symbol replaces either side.
  const GAP = { lamp: 9, resistor: 12, motor: 9, ammeter: 9, voltmeter: 9, switch: 10, cell: 3, battery: 9 };

  function meter(d, c, letter) {
    d.add('circle', { cx: c[0], cy: c[1], r: 9, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.5 });
    d.text([c[0], c[1] + 0.5], letter, { size: 10.5 });
  }

  function symbol(d, comp, x, y) {
    const t = comp.type;
    if (t === 'lamp') {
      d.circle([x, y], 9, { width: 1.5 });
      const k = 9 * Math.SQRT1_2;
      d.line([x - k, y - k], [x + k, y + k], { width: 1.3 });
      d.line([x - k, y + k], [x + k, y - k], { width: 1.3 });
    } else if (t === 'resistor') {
      d.add('rect', { x: x - 12, y: y - 5, width: 24, height: 10, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.5 });
    } else if (t === 'motor') meter(d, [x, y], 'M');
    else if (t === 'ammeter') meter(d, [x, y], 'A');
    else if (t === 'voltmeter') meter(d, [x, y], 'V');
    else if (t === 'switch') {
      d.dot([x - 10, y], { r: 2.2 }); d.dot([x + 10, y], { r: 2.2 });
      d.line([x - 10, y], comp.open ? [x + 8, y - 10] : [x + 10, y], { width: 1.6 });
    } else if (t === 'cell' || t === 'battery') {
      const plates = t === 'battery' ? [-6, 6] : [0];
      for (const off of plates) {
        d.line([x + off - 3, y - 11], [x + off - 3, y + 11], { width: 1.6 });
        d.line([x + off + 3, y - 6], [x + off + 3, y + 6], { width: 3.2 });
      }
      if (t === 'battery') d.line([x - 3, y], [x + 3, y], { width: 1.2, dash: '2 2' });
    }
    if (comp.label) d.text([x, y + (t === 'cell' || t === 'battery' ? 20 : 18)], comp.label, { size: 10, fill: comp.unknown ? 'var(--dia-unknown)' : INK });
  }

  /** A horizontal wire from xa to xb at height y, with its symbols spaced evenly along it. */
  function wire(d, xa, xb, y, comps) {
    const n = comps.length;
    const xs = comps.map((_, i) => xa + (xb - xa) * (i + 1) / (n + 1));
    let from = xa;
    comps.forEach((c, i) => {
      const g = GAP[c.type];
      d.line([from, y], [xs[i] - g, y], { width: 1.6 });
      from = xs[i] + g;
    });
    d.line([from, y], [xb, y], { width: 1.6 });
    comps.forEach((c, i) => {
      symbol(d, c, xs[i], y);
      // A voltmeter connected across this component, drawn above it.
      if (c.volt !== undefined) {
        const g = GAP[c.type] + 12, vy = y - 31;
        d.line([xs[i] - g, y], [xs[i] - g, vy], { width: 1.3 });
        d.line([xs[i] - g, vy], [xs[i] - 9, vy], { width: 1.3 });
        d.line([xs[i] + 9, vy], [xs[i] + g, vy], { width: 1.3 });
        d.line([xs[i] + g, vy], [xs[i] + g, y], { width: 1.3 });
        d.dot([xs[i] - g, y], { r: 2.3 }); d.dot([xs[i] + g, y], { r: 2.3 });
        meter(d, [xs[i], vy], 'V');
        d.text([xs[i] + g + 4, vy], c.volt, { size: 10, anchor: 'start', fill: c.voltUnknown ? 'var(--dia-unknown)' : INK });
      }
    });
    return xs;
  }

  /**
   * A circuit diagram.
   *   series:   { kind: 'series', loop: [components on the top wire], supply: [bottom wire] }
   *   parallel: { kind: 'parallel', branches: [[components], …], supply: [bottom wire] }
   * The supply list holds the cell or battery and anything else in the main
   * circuit (a switch, an ammeter). A component is { type, label, open, volt }.
   */
  function circuit(d, o) {
    const x0 = 22, x1 = d.w - 22, yBot = d.h - 30;
    if (o.kind === 'series') {
      const yTop = o.loop.some(c => c.volt !== undefined) ? 48 : 26;
      wire(d, x0, x1, yTop, o.loop);
      wire(d, x0, x1, yBot, o.supply);
      d.line([x0, yTop], [x0, yBot], { width: 1.6 });
      d.line([x1, yTop], [x1, yBot], { width: 1.6 });
      return;
    }
    // Branches stacked between two side rails, with room below the last one
    // for the supply wire and its labels.
    const nb = o.branches.length;
    const yTop = o.branches[0].some(c => c.volt !== undefined) ? 48 : 22;
    const yLast = yBot - 50;
    const step = nb > 1 ? (yLast - yTop) / (nb - 1) : 0;
    o.branches.forEach((b, i) => {
      const y = yTop + step * i;
      wire(d, x0, x1, y, b);
      if (i > 0) { d.dot([x0, y], { r: 2.6 }); d.dot([x1, y], { r: 2.6 }); }
    });
    d.line([x0, yTop], [x0, yBot], { width: 1.6 });
    d.line([x1, yTop], [x1, yBot], { width: 1.6 });
    wire(d, x0, x1, yBot, o.supply);
  }

  // ── Energy transfer ───────────────────────────────────────────────────────
  /**
   * An energy transfer (Sankey) diagram: the input band splits into the useful
   * output, carried on to the right, and the wasted output, bent downwards.
   * Band widths are to scale. o: { total, useful, wasted, labels: [in, useful, wasted] }.
   */
  function sankey(d, o) {
    const T = o.total, k = Math.min(56, d.h * 0.42) / T;
    const hu = Math.max(3, o.useful * k), hw = Math.max(3, o.wasted * k);
    const y0 = 34, xa = 10, xs = 108, xr = d.w - 26;
    const band = { fill: 'var(--brand)', 'fill-opacity': 0.22, stroke: 'var(--brand-ink)', 'stroke-width': 1.2 };
    // One outline: in along the top, out to the right, back, down and round.
    const yb = d.h - 22;
    const pts = [[xa, y0], [xr, y0], [xr + 16, y0 + hu / 2], [xr, y0 + hu], [xs + hw, y0 + hu], [xs + hw, yb],
                 [xs + hw / 2, yb + 14], [xs, yb], [xs, y0 + hu + hw], [xa, y0 + hu + hw]];
    d.add('polygon', Object.assign({ points: pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ') }, band));
    const [lIn, lUse, lWaste] = o.labels;
    d.text([xa, y0 - 12], lIn, { size: 10.5, anchor: 'start' });
    d.text([xr, y0 - 12], lUse, { size: 10.5, anchor: 'end', fill: o.unknown === 1 ? 'var(--dia-unknown)' : INK });
    d.text([xs + hw + 10, (y0 + hu + hw + yb) / 2 + 6], lWaste, { size: 10.5, anchor: 'start', fill: o.unknown === 2 ? 'var(--dia-unknown)' : INK });
  }

  Object.assign(SciDia, { shellsOf, bohr, atomParts, place, periodic, PT_SYMBOLS: SYMBOLS, circuit, sankey });
})();


// ── More Years 9 and 10 diagrams: pH, waves and fluids ──────────────────────

(() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', ACC = 'var(--dia-accent)';

  // Universal indicator colours, pH 0 to 14. These are the indicator's own
  // colours, so they do not change with the page's light or dark theme.
  const UI = ['#d7191c', '#e8412c', '#f26b30', '#f7942f', '#fbb72f', '#f2d53a', '#cde23f', '#7cc242',
              '#3fae5a', '#2e9e8f', '#2f7fc1', '#3460b0', '#4b479c', '#5d3a8e', '#6a2c80'];

  /** The pH scale as universal indicator colours, with optional lettered marks: [{ pH, label }]. */
  function phScale(d, o) {
    o = o || {};
    const x0 = 14, x1 = d.w - 14, w = (x1 - x0) / 15, y = o.marks && o.marks.length ? 34 : 14, hgt = 22;
    UI.forEach((c, i) => {
      d.add('rect', { x: (x0 + i * w).toFixed(2), y, width: (w + 0.4).toFixed(2), height: hgt, fill: c });
      d.text([x0 + (i + 0.5) * w, y + hgt + 11], String(i), { size: 10, fill: INK, bold: false });
    });
    d.add('rect', { x: x0, y, width: x1 - x0, height: hgt, fill: 'none', stroke: INK, 'stroke-width': 1.2 });
    const ly = y + hgt + 30;
    d.text([x0, ly], 'acidic', { size: 10.5, anchor: 'start', fill: MUTED });
    d.text([x0 + 7.5 * w, ly], 'neutral', { size: 10.5, fill: MUTED });
    d.text([x1, ly], 'alkaline', { size: 10.5, anchor: 'end', fill: MUTED });
    for (const mk of o.marks || []) {
      const x = x0 + (mk.pH + 0.5) * w;
      SciDia.arrow(d, [x, 8], [x, y - 3], { colour: INK, width: 1.4, head: 5 });
      d.text([x + 9, 13], mk.label, { size: 11.5, anchor: 'start' });
    }
  }

  /** A sine wave from x0 to x1 about the line y: `cycles` whole waves of amplitude `amp`. */
  function sine(d, x0, x1, y, cycles, amp, o) {
    o = o || {};
    const n = 160, pts = [];
    for (let i = 0; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n;
      pts.push(`${i ? 'L' : 'M'} ${x.toFixed(2)} ${(y - amp * Math.sin(2 * Math.PI * cycles * i / n)).toFixed(2)}`);
    }
    d.add('path', { d: pts.join(' '), fill: 'none', stroke: o.colour || 'var(--brand)', 'stroke-width': o.width || 2.2 });
  }

  /** A double-headed arrow, for a measured distance. */
  function span(d, a, b, colour) {
    SciDia.arrow(d, a, b, { colour, width: 1.3, head: 5 });
    SciDia.arrow(d, b, a, { colour, width: 1.3, head: 5 });
  }

  /**
   * A transverse wave with numbered markers for a label question, or plain.
   * o: { cycles, markers: ['wavelength', 'amplitude', 'crest', 'trough'] (in marker order) }.
   */
  function wave(d, o) {
    o = o || {};
    const x0 = 16, x1 = d.w - 16, y = d.h / 2 + 6, amp = Math.min(38, d.h / 2 - 22), cycles = o.cycles || 2;
    d.line([x0, y], [x1, y], { stroke: MUTED, width: 1, dash: '4 3' });
    sine(d, x0, x1, y, cycles, amp);
    const lam = (x1 - x0) / cycles;
    const crest = [x0 + lam / 4, y - amp], trough = [x0 + lam * 1.75, y + amp];
    const spots = {
      wavelength: { at: [x0 + lam * 0.75, y - amp - 12], draw: () => span(d, [x0 + lam / 4, y - amp - 8], [x0 + lam * 1.25, y - amp - 8], ACC) },
      amplitude:  { at: [x0 + lam * 1.25 + 16, y - amp / 2], draw: () => span(d, [x0 + lam * 1.25, y], [x0 + lam * 1.25, y - amp], ACC) },
      crest:      { at: [crest[0] - 22, crest[1] - 6], to: crest },
      trough:     { at: [trough[0] + 24, trough[1] + 4], to: trough },
      rest:       { at: [x1 - 10, y - 14], to: [x1 - 30, y] }
    };
    (o.markers || []).forEach((name, i) => {
      const s = spots[name];
      if (s.draw) s.draw();
      if (s.to) d.line(s.at, s.to, { stroke: MUTED, width: 1 });
      d.add('circle', { cx: s.at[0], cy: s.at[1], r: 8, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
      d.text(s.at, String(i + 1), { size: 10.5 });
    });
  }

  /** Two waves, A above B, drawn to the same scale: { a: { cycles, amp }, b: { cycles, amp } }. */
  function twoWaves(d, o) {
    const x0 = 30, x1 = d.w - 12, h = d.h / 2;
    [['A', o.a, h / 2], ['B', o.b, h + h / 2]].forEach(([lab, w, y]) => {
      d.line([x0, y], [x1, y], { stroke: MUTED, width: 1, dash: '4 3' });
      sine(d, x0, x1, y, w.cycles, w.amp);
      d.text([12, y], lab, { size: 13 });
    });
  }

  /** A longitudinal wave: lines bunched into compressions and spread into rarefactions. */
  function longitudinal(d, o) {
    o = o || {};
    const x0 = 14, x1 = d.w - 14, cycles = o.cycles || 3, n = 48;
    const lam = (x1 - x0) / cycles, step = (x1 - x0) / n;
    const top = 14, bot = d.h - (o.markers ? 34 : 14);
    for (let i = 0; i <= n; i++) {
      const rest = x0 + i * step;
      const x = rest - 1.3 * step * Math.sin(2 * Math.PI * (rest - x0) / lam);
      d.line([x, top], [x, bot], { stroke: 'var(--brand)', width: 1.6 });
    }
    if (o.markers) {
      // Compressions sit where the displacement pattern bunches the lines: at the start of each wavelength.
      const marks = { compression: [x0 + lam, bot + 16], rarefaction: [x0 + lam * 1.5, bot + 16] };
      o.markers.forEach((name, i) => {
        const at = marks[name];
        d.line([at[0], bot + 8], [at[0], bot], { stroke: MUTED, width: 1 });
        d.add('circle', { cx: at[0], cy: at[1], r: 8, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
        d.text(at, String(i + 1), { size: 10.5 });
      });
    }
  }

  /** A tank of water with lettered points at given depths: marks [{ x (0–1), depth (0–1), label }]. */
  function tank(d, marks) {
    const x0 = 30, x1 = d.w - 30, top = 16, bot = d.h - 14, water = top + 10;
    d.add('rect', { x: x0, y: water, width: x1 - x0, height: bot - water, fill: 'var(--brand)', 'fill-opacity': 0.16 });
    d.line([x0, top], [x0, bot], { width: 2 }); d.line([x1, top], [x1, bot], { width: 2 }); d.line([x0, bot], [x1, bot], { width: 2 });
    d.line([x0, water], [x1, water], { stroke: 'var(--brand-ink)', width: 1.2 });
    for (const mk of marks) {
      const p = [x0 + 14 + mk.x * (x1 - x0 - 28), water + 8 + mk.depth * (bot - water - 18)];
      d.dot(p, { r: 3.5, fill: ACC });
      d.text([p[0] + 8, p[1]], mk.label, { size: 12, anchor: 'start' });
    }
  }

  Object.assign(SciDia, { phScale, UI_COLOURS: UI, wave, twoWaves, longitudinal, tank });
})();


// ── Years 9 and 10 diagrams: cells, diffusion, the water cycle, plates ─────

(() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', ACC = 'var(--dia-accent)';

  /** A numbered (or named) marker with a leader line to the point it labels. */
  function marker(d, at, to, text) {
    d.line(at, to, { stroke: MUTED, width: 1 });
    if (String(text).length <= 2) {
      d.add('circle', { cx: at[0], cy: at[1], r: 8, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
      d.text(at, String(text), { size: 10.5 });
    } else d.text([at[0], at[1] - 7], String(text), { size: 10.5 });
  }

  const BACTERIUM_PARTS = ['cell membrane', 'cytoplasm', 'genetic material'];
  /** A bacterium: no nucleus, its genetic material loose in the cytoplasm. labels: { part: marker text }. */
  function bacterium(d, labels) {
    labels = labels || {};
    const cx = d.w / 2, cy = d.h / 2 + 6, w = 170, h = 74;
    d.add('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: h / 2, fill: 'var(--cytoplasm)', stroke: INK, 'stroke-width': 1.6 });
    // A loop of DNA, tangled: a closed wobbly curve.
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const a = i / 60 * 2 * Math.PI;
      const r = 20 + 6 * Math.sin(5 * a) + 3 * Math.cos(3 * a);
      pts.push(`${i ? 'L' : 'M'} ${(cx + 1.6 * r * Math.cos(a)).toFixed(1)} ${(cy + 0.8 * r * Math.sin(a)).toFixed(1)}`);
    }
    d.add('path', { d: pts.join(' ') + ' Z', fill: 'none', stroke: ACC, 'stroke-width': 1.8 });
    // A tail (flagellum).
    d.add('path', { d: `M ${cx + w / 2} ${cy} q 14 -10 28 0 t 28 0`, fill: 'none', stroke: INK, 'stroke-width': 1.3 });
    const spots = {
      'cell membrane':    [[cx - w / 2 + 14, cy - h / 2 + 8], [cx - w / 2 - 6, cy - h / 2 - 14]],
      'cytoplasm':        [[cx - w / 2 + 30, cy + 14], [cx - w / 2 - 6, cy + h / 2 + 16]],
      'genetic material': [[cx + 1.6 * 20, cy - 4], [cx + w / 2 - 10, cy - h / 2 - 16]]
    };
    for (const [part, text] of Object.entries(labels)) marker(d, spots[part][1], spots[part][0], text);
  }

  /**
   * Particles either side of a membrane (dashed). Positions come from a fixed
   * pattern, not chance, so the picture is the same every time it is drawn.
   */
  function diffusion(d, o) {
    const x0 = 12, x1 = d.w - 12, mid = d.w / 2, top = 12, bot = d.h - 26;
    d.add('rect', { x: x0, y: top, width: x1 - x0, height: bot - top, rx: 4, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.4 });
    d.line([mid, top], [mid, bot], { stroke: INK, width: 1.6, dash: '5 4' });
    const place = (n, xa, xb, seed) => {
      for (let i = 0; i < n; i++) {
        const fx = ((i * 0.618 + seed * 0.31) % 1), fy = ((i * 0.382 + seed * 0.17 + i * i * 0.013) % 1);
        d.add('circle', { cx: (xa + 8 + fx * (xb - xa - 16)).toFixed(1), cy: (top + 8 + fy * (bot - top - 16)).toFixed(1), r: 3.6, fill: 'var(--brand)', 'fill-opacity': 0.85 });
      }
    };
    place(o.left, x0, mid, 1); place(o.right, mid, x1, 2);
    d.text([(x0 + mid) / 2, bot + 13], o.labels ? o.labels[0] : 'A', { size: 11.5 });
    d.text([(mid + x1) / 2, bot + 13], o.labels ? o.labels[1] : 'B', { size: 11.5 });
  }

  const WATER_PARTS = ['evaporation', 'condensation', 'precipitation', 'transpiration', 'runoff'];
  /** The water cycle, with each process an arrow carrying a numbered marker. markers: names in number order. */
  function waterCycle(d, markers) {
    const W = d.w, H = d.h, sea = H - 34;
    // Land on the left rising to a hill, sea on the right.
    d.add('path', { d: `M 0 ${H} L 0 ${sea - 50} Q 50 ${sea - 80} 100 ${sea - 40} L ${W * 0.55} ${sea} L ${W * 0.55} ${H} Z`, fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.3 });
    d.add('rect', { x: W * 0.55, y: sea, width: W * 0.45, height: H - sea, fill: 'var(--brand)', 'fill-opacity': 0.25 });
    d.line([W * 0.55, sea], [W, sea], { stroke: 'var(--brand-ink)', width: 1.3 });
    // A tree, a cloud and the Sun.
    const tx = 70, ty = sea - 62;
    d.line([tx, ty], [tx, ty + 22], { stroke: INK, width: 2.2 });
    d.add('circle', { cx: tx, cy: ty - 6, r: 12, fill: 'var(--dia-known)', 'fill-opacity': 0.5, stroke: INK, 'stroke-width': 1 });
    const cl = [W * 0.42, 34];
    for (const [dx, dy, r] of [[-22, 4, 13], [0, -4, 17], [22, 4, 13]]) d.add('circle', { cx: cl[0] + dx, cy: cl[1] + dy, r, fill: 'var(--surface)', stroke: INK, 'stroke-width': 1.2 });
    d.add('circle', { cx: W - 26, cy: 26, r: 13, fill: '#f2c94c', stroke: INK, 'stroke-width': 1 });
    for (const dx of [-24, -12, 12]) d.line([cl[0] + dx, 58], [cl[0] + dx - 4, 70], { stroke: 'var(--brand)', width: 1.2 });
    const arrows = {
      evaporation:   { from: [W * 0.78, sea - 6], to: [W * 0.62, 52], at: [W * 0.74, sea - 60] },
      condensation:  { from: [W * 0.6, 42], to: [cl[0] + 36, 34], at: [W * 0.58, 16], short: true },
      precipitation: { from: [cl[0] - 6, 56], to: [cl[0] - 22, sea - 58], at: [cl[0] + 14, 92] },
      transpiration: { from: [tx + 6, ty - 20], to: [cl[0] - 40, 44], at: [tx + 10, 48] },
      runoff:        { from: [110, sea - 30], to: [W * 0.53, sea - 4], at: [W * 0.32, sea - 4] }
    };
    for (const k of WATER_PARTS) {
      const a = arrows[k];
      SciDia.arrow(d, a.from, a.to, { colour: 'var(--brand-ink)', width: 1.6, head: 6 });
    }
    (markers || []).forEach((k, i) => {
      const a = arrows[k], m = [(a.from[0] + a.to[0]) / 2, (a.from[1] + a.to[1]) / 2];
      marker(d, a.at, m, i + 1);
    });
  }

  /** Two tectonic plates seen from above, with arrows showing how they move at their boundary. */
  function plates(d, type) {
    const mid = d.w / 2, top = 18, bot = d.h - 18, x0 = 16, x1 = d.w - 16;
    d.add('rect', { x: x0, y: top, width: mid - x0 - 2, height: bot - top, fill: 'var(--surface-2)', stroke: INK, 'stroke-width': 1.3 });
    d.add('rect', { x: mid + 2, y: top, width: x1 - mid - 2, height: bot - top, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.3 });
    d.line([mid, top - 6], [mid, bot + 6], { stroke: ACC, width: 2.2, dash: type === 'transform' ? null : '6 4' });
    const y = (top + bot) / 2, L = 40;
    const go = (from, to) => SciDia.arrow(d, from, to, { colour: INK, width: 2.4, head: 8 });
    if (type === 'convergent') { go([mid - 70, y], [mid - 70 + L, y]); go([mid + 70, y], [mid + 70 - L, y]); }
    else if (type === 'divergent') { go([mid - 30, y], [mid - 30 - L, y]); go([mid + 30, y], [mid + 30 + L, y]); }
    else { go([mid - 40, y + L / 2], [mid - 40, y - L / 2]); go([mid + 40, y - L / 2], [mid + 40, y + L / 2]); }
    d.text([(x0 + mid) / 2, top + 12], 'Plate A', { size: 10.5, fill: MUTED });
    d.text([(mid + x1) / 2, top + 12], 'Plate B', { size: 10.5, fill: MUTED });
  }

  Object.assign(SciDia, { BACTERIUM_PARTS, bacterium, diffusion, WATER_PARTS, waterCycle, plates });
})();
