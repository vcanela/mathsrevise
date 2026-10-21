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

  /** Turn a declaration with slots into a topic the engine can run. */
  function topic(def) {
    const t = Object.assign({}, def);
    t.generate = (rng, diff) => def.slots.map((slot, i) => {
      const item = rng.pick(slot.items);
      const q = item(rng, diff);
      q.slot = slot.name || 'Slot ' + (i + 1);
      return q;
    });
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
      explain: o.explain
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
      explain: o.explain
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
      explain: o.explain
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
      explain: o.explain
    };
  }

  /** Spot the misconception: a line of reasoning with one wrong step. */
  function spot(rng, o) {
    return {
      prompt: o.prompt, note: o.note, tag: o.tag,
      input: { kind: 'spot', lines: o.lines, wrong: o.wrong,
               cue: o.cue || 'Click the first line that is wrong.' },
      explain: o.explain
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

  return { topic, gen, choice, tf, sort, label, spot, table, name, NAMES, m };
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

  return { particles, stateCycle, CHANGES, graph, arrow, niceStep };
})();
