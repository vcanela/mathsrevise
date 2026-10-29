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

  /** Turn a declaration with slots into a topic the engine can run. */
  function topic(def) {
    const t = Object.assign({}, def);
    t.generate = (rng, diff) => {
      const seen = memory ? readSeen(def.id) : {};
      return def.slots.map((slot, i) => {
        const idx = pickIndex(rng, slot.items.length, seen[i]);
        const q = slot.items[idx](rng, diff);
        q.pick = { topic: def.id, slot: i, item: idx };
        q.slot = slot.name || 'Slot ' + (i + 1);
        // Which "Learn it" card answers this question. An item can name its
        // own card; otherwise it takes the slot's.
        if (!q.learn && slot.learn) q.learn = slot.learn;
        return q;
      });
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
    const opts = [{ html: o.right, right: true }, ...o.wrong.map(w => ({ html: w, right: false }))];
    const options = o.keepOrder ? opts : rng.shuffle(opts);
    return {
      prompt: o.prompt, note: o.note, tag: o.tag, draw: o.draw, diagram: o.diagram,
      input: { kind: 'choice', options, correct: options.findIndex(x => x.right), wide: o.wide !== false },
      explain: o.explain, learn: o.learn
    };
  }

  /** A statement to judge true or false. The two options always appear in that order. */
  function tf(rng, o) {
    return {
      prompt: 'True or false? <em>' + o.statement + '</em>',
      note: o.note, tag: o.tag,
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
      prompt: o.prompt, note: o.note, tag: o.tag, draw: o.draw, diagram: o.diagram,
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
      prompt: o.prompt, note: o.note, tag: o.tag, draw: o.draw, diagram: o.diagram,
      input: { kind: 'label', markers: o.markers, options },
      explain: o.explain, learn: o.learn
    };
  }

  /** Spot the misconception: a line of reasoning with one wrong step. */
  function spot(rng, o) {
    return {
      prompt: o.prompt, note: o.note, tag: o.tag,
      input: { kind: 'spot', lines: o.lines, wrong: o.wrong,
               cue: o.cue || 'Click the first line that is wrong.' },
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

  return { topic, gen, choice, tf, sort, label, spot, table, name, NAMES, m, markSeen,
           set memory(on) { memory = !!on; }, get memory() { return memory; } };
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
