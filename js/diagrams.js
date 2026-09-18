'use strict';
// ── Maths Revise · Topic diagrams ───────────────────────────────────────────
// Pictures that are not pure geometry: balance scales for equations, tiles for
// collecting terms, number lines. They take a Geo.canvas and draw into it, so
// they inherit the same colour tokens and dark-mode behaviour.
// ─────────────────────────────────────────────────────────────────────────────

const Dia = (() => {
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)';
  const XCOL = 'var(--brand)', UCOL = 'var(--dia-known)', NEGCOL = 'var(--dia-accent)';

  /**
   * A pan of an equation balance: `xs` boxes marked x and `units` small discs.
   * Negative counts are drawn hollow, which is how the "take away from both
   * sides" move is shown.
   */
  function drawPan(d, cx, topY, xs, units, opt) {
    opt = opt || {};
    const bw = 22, bh = 22, gap = 4;
    const items = [];
    for (let i = 0; i < Math.abs(xs); i++)   items.push({ kind: 'x', neg: xs < 0 });
    for (let i = 0; i < Math.abs(units); i++) items.push({ kind: 'u', neg: units < 0 });

    const perRow = Math.min(5, Math.max(3, Math.ceil(Math.sqrt(items.length))));
    const rows = Math.ceil(items.length / perRow) || 1;

    items.forEach((it, i) => {
      const r = Math.floor(i / perRow), c = i % perRow;
      const inRow = Math.min(perRow, items.length - r * perRow);
      const x = cx - (inRow * (bw + gap) - gap) / 2 + c * (bw + gap);
      const y = topY - (rows - r) * (bh + gap) + gap;
      if (it.kind === 'x') {
        d.add('rect', {
          x, y, width: bw, height: bh, rx: 3,
          fill: it.neg ? 'none' : XCOL, stroke: it.neg ? NEGCOL : XCOL,
          'stroke-width': 1.6, 'stroke-dasharray': it.neg ? '3 2' : null
        });
        d.text([x + bw / 2, y + bh / 2], 'x', { fill: it.neg ? NEGCOL : 'var(--surface)', size: 12 });
      } else {
        d.add('circle', {
          cx: x + bw / 2, cy: y + bh / 2, r: 8.5,
          fill: it.neg ? 'none' : UCOL, stroke: it.neg ? NEGCOL : UCOL,
          'stroke-width': 1.6, 'stroke-dasharray': it.neg ? '3 2' : null
        });
      }
    });
    return rows * (bh + gap);
  }

  /**
   * A whole balance: left side ax + b, right side cx + d.
   * `opt.strike` greys out the tiles being removed from both sides.
   */
  function balance(d, eq, opt) {
    opt = opt || {};
    const w = d.w, h = d.h;
    const beamY = h - 48;
    const lx = w * 0.27, rx = w * 0.73;

    drawPan(d, lx, beamY - 8, eq.lx || 0, eq.lc || 0);
    drawPan(d, rx, beamY - 8, eq.rx || 0, eq.rc || 0);

    // Beam, pivot and pans.
    d.line([lx - 42, beamY], [rx + 42, beamY], { stroke: INK, width: 2.5 });
    d.line([lx, beamY], [lx, beamY + 6], { stroke: MUTED, width: 1.5 });
    d.line([rx, beamY], [rx, beamY + 6], { stroke: MUTED, width: 1.5 });
    d.add('path', {
      d: `M ${w / 2 - 14} ${h - 14} L ${w / 2} ${beamY + 2} L ${w / 2 + 14} ${h - 14} Z`,
      fill: 'none', stroke: MUTED, 'stroke-width': 2, 'stroke-linejoin': 'round'
    });
    d.line([w / 2 - 22, h - 12], [w / 2 + 22, h - 12], { stroke: MUTED, width: 2.5 });

    if (opt.caption) d.text([w / 2, 14], opt.caption, { fill: MUTED, size: 12, bold: false });
    return d;
  }

  /** Coloured tiles for collecting like terms: one tile per unit of each term. */
  function tiles(d, groups, opt) {
    opt = opt || {};
    const palette = [XCOL, 'var(--dia-unknown)', UCOL, MUTED];
    const tw = 26, th = 26, gap = 5, groupGap = 16;
    let x = 10;
    const y = opt.y === undefined ? d.h / 2 - th / 2 : opt.y;

    groups.forEach((g, gi) => {
      const colour = palette[gi % palette.length];
      for (let i = 0; i < Math.abs(g.count); i++) {
        const neg = g.count < 0;
        d.add('rect', {
          x, y, width: tw, height: th, rx: 4,
          fill: neg ? 'none' : colour, stroke: colour,
          'stroke-width': 1.7, 'stroke-dasharray': neg ? '3 2' : null
        });
        d.text([x + tw / 2, y + th / 2], g.label,
               { fill: neg ? colour : 'var(--surface)', size: 12.5 });
        x += tw + gap;
      }
      if (gi < groups.length - 1) x += groupGap;
    });
    if (opt.caption) d.text([d.w / 2, y + th + 20], opt.caption, { fill: MUTED, size: 11.5, bold: false });
    return x;
  }

  /** A number line with optional marked points. */
  function numberLine(d, lo, hi, marks, opt) {
    opt = opt || {};
    const y = opt.y === undefined ? d.h / 2 : opt.y;
    const x0 = 22, x1 = d.w - 22;
    const at = v => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);

    d.line([x0, y], [x1, y], { stroke: INK, width: 2 });
    const step = opt.step || 1;
    for (let v = lo; v <= hi + 1e-9; v += step) {
      const x = at(v);
      d.line([x, y - 5], [x, y + 5], { stroke: MUTED, width: 1.4 });
      if (opt.labelEvery === undefined || Math.round((v - lo) / step) % opt.labelEvery === 0) {
        d.text([x, y + 17], Fmt.num(Math.round(v * 100) / 100), { fill: MUTED, size: 11, bold: false });
      }
    }
    (marks || []).forEach(m => {
      d.dot([at(m.at), y], { r: 5, fill: m.colour || NEGCOL });
      if (m.label) d.text([at(m.at), y - 16], m.label, { fill: m.colour || NEGCOL, size: 12 });
    });
    return d;
  }

  /** A rectangle split to show a(b + c) = ab + ac, the area model. */
  function areaModel(d, outside, parts, opt) {
    opt = opt || {};
    const padL = 34, padT = 26, padR = 14, padB = 20;
    const w = d.w - padL - padR, h = d.h - padT - padB;
    const totalInner = parts.reduce((s, p) => s + Math.abs(p.width), 0);
    let x = padL;
    parts.forEach((p, i) => {
      const pw = (Math.abs(p.width) / totalInner) * w;
      d.add('rect', {
        x, y: padT, width: pw, height: h,
        fill: i % 2 ? 'var(--dia-fill)' : 'var(--brand-soft)',
        stroke: INK, 'stroke-width': 1.6
      });
      d.text([x + pw / 2, padT - 12], p.label, { fill: XCOL, size: 12.5 });
      d.text([x + pw / 2, padT + h / 2], p.product, { fill: INK, size: 13 });
      x += pw;
    });
    d.text([padL - 14, padT + h / 2], outside, { fill: UCOL, size: 13 });
    if (opt.caption) d.text([d.w / 2, d.h - 6], opt.caption, { fill: MUTED, size: 11.5, bold: false });
    return d;
  }

  /**
   * Rays fanning out from a point, with the angles between chosen pairs
   * marked. Directions are given the way a student would think of them:
   * degrees anticlockwise from "east". The angle marked between two rays is
   * the one you sweep anticlockwise going from the first to the second, so it
   * is always the angle actually drawn.
   *
   *   Dia.angleFan(d, {
   *     rays:  [0, 55, 180],
   *     marks: [{ from: 0, to: 1, label: '55°' },
   *             { from: 1, to: 2, label: 'x', unknown: true }]
   *   });
   */
  function angleFan(d, spec) {
    const c = spec.center || [d.w / 2, d.h * (spec.lowCentre === false ? 0.5 : 0.62)];
    const R = spec.radius || Math.min(d.w, d.h) * (spec.lowCentre === false ? 0.42 : 0.62);
    const screen = a => -a;                        // maths degrees → screen degrees

    // A baseline through the point, drawn full width, for "on a straight line".
    if (spec.baseline) {
      d.line([c[0] - R, c[1]], [c[0] + R, c[1]], { stroke: INK, width: 2 });
    }

    spec.rays.forEach((a, i) => {
      if (spec.baseline && (a === 0 || a === 180)) return;   // already drawn
      const end = Geo.add(c, Geo.fromDir(screen(a), R));
      d.line(c, end, { stroke: INK, width: 2 });
      const lbl = (spec.rayLabels || [])[i];
      if (lbl) d.text(Geo.add(c, Geo.fromDir(screen(a), R + 12)), lbl, { fill: MUTED, size: 12 });
    });
    d.dot(c, { r: 2.8 });

    (spec.marks || []).forEach((mk, i) => {
      const a1 = spec.rays[mk.from], a2 = spec.rays[mk.to];
      let span = ((a2 - a1) % 360 + 360) % 360;              // anticlockwise sweep
      const r = mk.r || R * (0.3 + 0.07 * (i % 3));
      d.markAngle(c, screen(a1), -span, {
        r, label: mk.label, unknown: mk.unknown,
        colour: mk.colour, gap: mk.gap, size: mk.size
      });
    });

    if (spec.caption) d.text([d.w / 2, d.h - 8], spec.caption, { fill: MUTED, size: 11.5, bold: false });
    return d;
  }

  /**
   * Two parallel lines cut by a transversal, drawn at the real angle. Angle
   * positions are named by intersection (1 = upper, 2 = lower) and by which
   * of the four quadrants around it, so a question can label exactly the pair
   * it is asking about.
   *
   *   Dia.transversal(d, 62, { mark: [ {at:'1TR', label:'62°'},
   *                                    {at:'2TR', label:'x', unknown:true} ] })
   */
  function transversal(d, angleDeg, opt) {
    opt = opt || {};
    const w = d.w, h = d.h;
    const y1 = h * 0.28, y2 = h * 0.7;
    const cx = w / 2;
    // The transversal runs downwards, tilted so it meets each line at angleDeg
    // measured from the line's rightward direction.
    const dirScreen = -(angleDeg - 180);                    // pointing down-right/left
    const dy = y2 - y1;
    const stepX = dy / Math.tan(-(angleDeg) * Math.PI / 180) * -1;
    const P1 = [cx - stepX / 2, y1], P2 = [cx + stepX / 2, y2];
    const u = Geo.norm(Geo.sub(P2, P1));
    const ext = Math.min(46, h * 0.26);

    d.line([12, y1], [w - 12, y1], { stroke: INK, width: 2 });
    d.line([12, y2], [w - 12, y2], { stroke: INK, width: 2 });
    d.line(Geo.add(P1, Geo.scale(u, -ext)), Geo.add(P2, Geo.scale(u, ext)), { stroke: INK, width: 2 });
    d.parallelMark([12, y1], [cx - stepX / 2 - 20, y1], 1);
    d.parallelMark([12, y2], [cx + stepX / 2 - 20, y2], 1);

    // Directions away from each intersection, in screen degrees.
    const along = Geo.dirOf(u);                              // towards the lower point
    const dirs = {
      E: 0, W: 180,
      D: along,                                              // down the transversal
      U: (along + 180) % 360
    };
    // Quadrant names: T = above the line, B = below; L/R = left/right.
    const at = {
      '1TL': [dirs.W, dirs.U], '1TR': [dirs.U, dirs.E],
      '1BL': [dirs.D, dirs.W], '1BR': [dirs.E, dirs.D],
      '2TL': [dirs.W, dirs.U], '2TR': [dirs.U, dirs.E],
      '2BL': [dirs.D, dirs.W], '2BR': [dirs.E, dirs.D]
    };

    (opt.mark || []).forEach(mk => {
      const P = mk.at[0] === '1' ? P1 : P2;
      const [a1, a2] = at[mk.at];
      let span = ((a2 - a1) % 360 + 360) % 360;
      if (span > 180) span -= 360;
      d.markAngle(P, a1, span, {
        r: mk.r || 22, label: mk.label, unknown: mk.unknown, colour: mk.colour, gap: mk.gap
      });
    });

    if (opt.caption) d.text([w / 2, h - 6], opt.caption, { fill: MUTED, size: 11.5, bold: false });
    return { P1, P2, dirs };
  }

  /** A circle with one named part picked out in colour. */
  const CIRCLE_PARTS = ['radius', 'diameter', 'chord', 'circumference', 'tangent', 'arc', 'sector', 'segment', 'centre'];

  function circlePart(d, part, opt) {
    opt = opt || {};
    const c = [d.w / 2, d.h / 2];
    const R = Math.min(d.w, d.h) * 0.36;
    const HL = 'var(--dia-accent)';
    const at = a => Geo.add(c, Geo.fromDir(a, R));

    // Fills first, so the outline sits on top of them.
    if (part === 'sector') {
      d.add('path', {
        d: `M ${c[0]} ${c[1]} L ${at(-60)[0]} ${at(-60)[1]} A ${R} ${R} 0 0 1 ${at(30)[0]} ${at(30)[1]} Z`,
        fill: 'var(--dia-fill)', stroke: HL, 'stroke-width': 2.2
      });
    }
    if (part === 'segment') {
      d.add('path', {
        d: `M ${at(-55)[0]} ${at(-55)[1]} A ${R} ${R} 0 0 0 ${at(235)[0]} ${at(235)[1]} Z`,
        fill: 'var(--dia-fill)', stroke: HL, 'stroke-width': 2.2
      });
    }

    d.circle(c, R, { stroke: part === 'circumference' ? HL : INK, width: part === 'circumference' ? 3 : 2 });
    d.dot(c, { r: 3, fill: part === 'centre' ? HL : INK });

    if (part === 'radius')   d.line(c, at(-35), { stroke: HL, width: 3 });
    if (part === 'diameter') d.line(at(200), at(20), { stroke: HL, width: 3 });
    if (part === 'chord')    d.line(at(-125), at(-20), { stroke: HL, width: 3 });
    if (part === 'arc') {
      d.add('path', { d: Geo.arcPath(c[0], c[1], R, -70, 100), fill: 'none', stroke: HL, 'stroke-width': 3.5 });
    }
    if (part === 'tangent') {
      const t = at(-90);
      d.line([t[0] - R * 0.95, t[1]], [t[0] + R * 0.95, t[1]], { stroke: HL, width: 3 });
      d.dot(t, { r: 3, fill: HL });
    }
    if (opt.caption) d.text([d.w / 2, d.h - 8], opt.caption, { fill: MUTED, size: 11.5, bold: false });
    return d;
  }

  /**
   * Nets of common solids, drawn on a square grid so the faces line up.
   * Each net is a list of [col, row] cells plus, for prisms and pyramids,
   * triangular flaps.
   */
  const NETS = {
    cube:            { cells: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], w: 4, h: 3, solid: 'cube' },
    cuboid:          { cells: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], w: 4, h: 3, solid: 'cuboid', wide: true },
    squarePyramid:   { cells: [[1, 1]], tris: [[1, 1, 'up'], [1, 1, 'down'], [1, 1, 'left'], [1, 1, 'right']], w: 3, h: 3, solid: 'square-based pyramid' },
    triangularPrism: { cells: [[0, 1], [1, 1], [2, 1]], tris: [[1, 1, 'up'], [1, 1, 'down']], w: 3, h: 3, solid: 'triangular prism' },
    openBox:         { cells: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], w: 3, h: 3, solid: 'open box' }
  };

  function net(d, kind, opt) {
    opt = opt || {};
    const spec = NETS[kind];
    if (!spec) throw new Error('unknown net: ' + kind);
    const pad = 12;
    const s = Math.min((d.w - 2 * pad) / spec.w, (d.h - 2 * pad) / spec.h);
    const ox = (d.w - spec.w * s) / 2, oy = (d.h - spec.h * s) / 2;
    const cell = (c, r) => [ox + c * s, oy + r * s];

    for (const [c, r] of spec.cells) {
      const [x, y] = cell(c, r);
      d.add('rect', { x, y, width: s, height: s, fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.8 });
    }
    for (const [c, r, side] of (spec.tris || [])) {
      const [x, y] = cell(c, r);
      const pts = {
        up:    [[x, y], [x + s, y], [x + s / 2, y - s * 0.86]],
        down:  [[x, y + s], [x + s, y + s], [x + s / 2, y + s + s * 0.86]],
        left:  [[x, y], [x, y + s], [x - s * 0.86, y + s / 2]],
        right: [[x + s, y], [x + s, y + s], [x + s + s * 0.86, y + s / 2]]
      }[side];
      d.add('polygon', {
        points: pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' '),
        fill: 'var(--dia-fill)', stroke: INK, 'stroke-width': 1.8, 'stroke-linejoin': 'round'
      });
    }
    if (opt.caption) d.text([d.w / 2, d.h - 4], opt.caption, { fill: MUTED, size: 11.5, bold: false });
    return d;
  }

  return { balance, drawPan, tiles, numberLine, areaModel, angleFan, transversal, circlePart, net, NETS, CIRCLE_PARTS };
})();
