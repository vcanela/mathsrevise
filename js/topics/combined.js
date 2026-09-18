'use strict';
// ── Maths Revise · Unit 4 topics ────────────────────────────────────────────
// Where algebra and geometry meet: angles and lengths written as expressions.
//
// Each question is built backwards. A value of x is chosen first, then real
// angles, then expressions that evaluate to those angles. The diagram is drawn
// from the real angles, so the picture is honest even though the labels are
// algebraic, and the equation the student builds is guaranteed to have the
// whole-number solution the question expects.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});
  const T = Fmt.term, S = Fmt.sum, m = Fmt.tex;
  const deg = n => Fmt.num(n) + '°';

  /**
   * n angle expressions in x that total `total` degrees.
   * Returns { x, parts: [{ a, b, angle, tex }] } or null if nothing suitable
   * turned up, which the caller retries.
   */
  function angleExprs(rng, total, n, opt) {
    opt = opt || {};
    const minA = opt.minAngle || 30;
    const maxA = opt.maxAngle || Math.min(150, total - minA * (n - 1));
    const maxConst = opt.maxConst || 45;

    for (let t = 0; t < 300; t++) {
      const x = rng.int(opt.xLo || 5, opt.xHi || 30);

      // Real angles first, so the drawing is always sensible.
      let angles = rng.partition(total - minA * n, n, 0).map(v => v + minA);
      if (angles.some(a => a > maxA)) continue;

      const parts = angles.map((ang, i) => {
        const plain = opt.allowPlain !== false && n > 2 && i === n - 1 && rng.chance(0.3);
        const a = plain ? 0 : rng.int(1, opt.maxCoef || 3);
        return { a, b: ang - a * x, angle: ang };
      });
      if (parts.every(p => p.a === 0)) continue;
      if (parts.some(p => Math.abs(p.b) > maxConst)) continue;
      if (parts.some(p => p.a === 0 && p.b < minA)) continue;
      // Some questions need a non-zero constant, or the collected equation
      // reads the same before and after the constants are dealt with.
      if (opt.nonZeroConst && parts.reduce((s, p) => s + p.b, 0) === 0) continue;

      parts.forEach(p => { p.tex = S([[p.a, 'x'], [p.b, '']]); });
      // Two identical labels make the diagram ambiguous.
      if (new Set(parts.map(p => p.tex)).size !== n) continue;

      return {
        x,
        parts,
        coefSum: parts.reduce((s, p) => s + p.a, 0),
        constSum: parts.reduce((s, p) => s + p.b, 0),
        total
      };
    }
    return null;
  }

  /**
   * As angleExprs, but guaranteed to return something. Constraints are
   * loosened step by step, and the last resort is built by hand. Every
   * exercise must produce the same number of questions on every run, so no
   * generator is allowed to give up.
   */
  function needExprs(rng, total, n, opt) {
    opt = opt || {};
    for (const relax of [0, 1, 2]) {
      const o = { ...opt, maxConst: (opt.maxConst || 45) + relax * 25, maxCoef: (opt.maxCoef || 3) + relax };
      const e = angleExprs(rng, total, n, o);
      if (e) return e;
    }
    // Hand-built fallback: near-equal angles, every coefficient 1.
    const x = Math.max(5, Math.round(total / n));
    const spread = Math.min(12, Math.floor(total / (n * 4)));
    const angles = [];
    let used = 0;
    for (let i = 0; i < n - 1; i++) {
      const a = Math.round(total / n) + (i % 2 ? spread : -spread);
      angles.push(a); used += a;
    }
    angles.push(total - used);
    const parts = angles.map(ang => ({ a: 1, b: ang - x, angle: ang, tex: S([[1, 'x'], [ang - x, '']]) }));
    return {
      x, parts, total,
      coefSum: n,
      constSum: parts.reduce((s, p) => s + p.b, 0)
    };
  }

  /** The three boxes that make up "□x + □ = □". */
  const equationBoxes = e => ({
    kind: 'fill',
    parts: [
      { input: { answer: e.coefSum, width: 56 } }, { text: m('x') },
      { text: '+' }, { input: { answer: e.constSum, width: 56 } },
      { text: '=' }, { input: { answer: e.total, width: 66 } }
    ]
  });

  const equationTex = e => m(`${S([[e.coefSum, 'x'], [e.constSum, '']])} = ${e.total}`);

  // ═══ 4.1 Build the angle equation ═════════════════════════════════════════
  Topics.u4e1 = {
    id: 'u4e1', unit: 4,
    title: 'Build the Angle Equation',
    blurb: 'The angles are written as expressions. Work out what they must total, then write the equation.',
    hint: 'First decide what the angles add up to: 180° on a straight line or in a triangle, 360° at a point or in a quadrilateral, 180(n − 2) in a polygon. Then collect the x terms and the numbers on the left, and set the whole thing equal to that total.',

    examples: [
      {
        title: 'Example 1: a triangle',
        diagram: { w: 235, h: 175 },
        draw(d, G) {
          const p = G.fit(G.triangleFromAngles(50, 70, 60), 235, 175, 42);
          d.polygon(p);
          d.angleArc(p, 0, { label: '2x', size: 12.5 });
          d.angleArc(p, 1, { label: '3x − 5', size: 12, colour: 'var(--dia-known)' });
          d.angleArc(p, 2, { label: 'x + 35', size: 12, colour: 'var(--dia-unknown)' });
        },
        steps: [
          'The three angles of a triangle add to 180°, so that is the right-hand side.',
          'Collect the \\(x\\) terms on the left: \\(2x + 3x + x = 6x\\).',
          'Collect the numbers: \\(-5 + 35 = 30\\).',
          'The equation is \\(6x + 30 = 180\\). (Solving it gives \\(x = 25\\).)'
        ],
        result: 'Equation: \\(6x + 30 = 180\\)'
      },
      {
        title: 'Example 2: angles on a straight line',
        diagram: { w: 250, h: 145 },
        draw(d) {
          Dia.angleFan(d, {
            rays: [0, 75, 180], baseline: true,
            marks: [{ from: 0, to: 1, label: '4x − 5' }, { from: 1, to: 2, label: 'x + 25', r: 36 }]
          });
        },
        steps: [
          'Angles on a straight line add to 180°.',
          '\\((4x - 5) + (x + 25) = 180\\).',
          'Collecting: \\(5x + 20 = 180\\).'
        ],
        result: 'Equation: \\(5x + 20 = 180\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: what do the angles add to?
      for (let i = 0; i < 2; i++) {
        const setting = rng.pick([
          { text: 'the three angles of a triangle',            total: 180 },
          { text: 'the angles on a straight line',             total: 180 },
          { text: 'the angles meeting at a point',             total: 360 },
          { text: 'the four angles of a quadrilateral',        total: 360 },
          { text: 'the five angles of a pentagon',             total: 540 }
        ]);
        const opts = rng.shuffle([90, 180, 360, 540].map(v => ({ html: deg(v), right: v === setting.total })));
        out.push({
          prompt: `What do ${setting.text} add up to?`,
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">${setting.total === 180 ? 'Half a turn.' : setting.total === 360 ? 'A full turn.' : `\\(180(n - 2)\\) with \\(n = ${setting.total / 180 + 2}\\).`}</span>`
        });
      }

      // Q3–4: straight line and point, build the equation.
      for (let i = 0; i < 2; i++) {
        const onLine = i === 0;
        const total = onLine ? 180 : 360;
        const n = onLine ? 2 : 3;
        const e = needExprs(rng, total, n, { minAngle: 45, maxCoef: hard ? 4 : 3 });
        // Rays at the running totals of the real angles. On a straight line we
        // need the closing ray at 180°; round a point the last angle closes
        // back onto the first ray, so the marks wrap instead.
        const rays = [0];
        e.parts.forEach(p => rays.push(rays[rays.length - 1] + p.angle));
        if (!onLine) rays.pop();
        const marks = e.parts.map((p, k) => ({
          from: k, to: (k + 1) % rays.length, label: p.tex, r: 26 + (k % 2) * 12, size: 11.5
        }));
        out.push({
          prompt: onLine
            ? 'These angles sit on a straight line. Write the equation.'
            : 'These angles meet at a point. Write the equation.',
          note: 'Collect the ' + m('x') + ' terms, collect the numbers, and set them equal to the total.',
          diagram: { w: 255, h: onLine ? 150 : 185 },
          draw: d => Dia.angleFan(d, { lowCentre: onLine, baseline: onLine, rays, marks }),
          input: equationBoxes(e),
          explain: `<span class="work">${e.parts.map(p => `(${p.tex})`).join(' + ')} = ${e.total}, which collects to ${equationTex(e)}.</span>`
        });
      }

      // Q5–6: triangle, build the equation.
      for (let i = 0; i < 2; i++) {
        const e = needExprs(rng, 180, 3, { minAngle: 35, maxAngle: 110, maxCoef: hard ? 4 : 3 });
        const A = e.parts.map(p => p.angle);
        out.push({
          prompt: 'Write the equation for the angles of this triangle.',
          diagram: { w: 270, h: 200 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(A[0], A[1], A[2]), 270, 200, 52);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, {
              label: part.tex, size: 11, gap: 16,
              colour: ['var(--dia-accent)', 'var(--dia-known)', 'var(--dia-unknown)'][k]
            }));
          },
          input: equationBoxes(e),
          explain: `<span class="work">The angles total 180°: ${e.parts.map(p => `(${p.tex})`).join(' + ')} = 180, so ${equationTex(e)}.</span>`
        });
      }

      // Q7: spot the mistake — collected the numbers into the x term.
      (() => {
        const e = needExprs(rng, 180, 3, { minAngle: 35, maxAngle: 110, maxCoef: 3, nonZeroConst: true });
        const bogus = e.coefSum + e.constSum;
        const lines = [
          'The angles of a triangle add to 180°.',
          m(`${e.parts.map(p => `(${p.tex})`).join(' + ')} = 180`),
          m(`${T(bogus, 'x')} = 180`),
          m(`x = ${Fmt.dp(180 / bogus, 2)}`)
        ];
        out.push({
          prompt: 'Somebody set up the equation for a triangle like this.',
          input: { kind: 'spot', lines, wrong: 2 },
          explain: `<span class="work">Line 3 added the plain numbers into the \\(x\\) term. They are not like terms. It should be ${equationTex(e)}, giving \\(x = ${e.x}\\).</span>`
        });
      })();

      // Q8: order the steps.
      (() => {
        const e = needExprs(rng, 180, 3, { minAngle: 35, maxAngle: 110, maxCoef: 3 });
        const items = [
          'Decide what the angles add to: 180°',
          `Write the sum: ${m(`${e.parts.map(p => `(${p.tex})`).join(' + ')} = 180`)}`,
          `Collect like terms: ${equationTex(e)}`,
          `Solve: ${m(`x = ${e.x}`)}`
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Put these steps into the order you would work through them.',
          input: { kind: 'order', items: order.map(i => items[i]), answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
          explain: '<span class="work">Total first, then the sum, then collect, then solve.</span>'
        });
      })();

      // Q9: quadrilateral, drawn with the real angles.
      (() => {
        let e = null, pts = null;
        for (let t = 0; t < 120 && !pts; t++) {
          e = angleExprs(rng, 360, 4, { minAngle: 55, maxAngle: 150, maxCoef: 3 });
          if (!e) continue;
          pts = Geo.polygonFromAngles(e.parts.map(p => p.angle), rng);
        }
        if (!e) e = needExprs(rng, 360, 4, { minAngle: 55, maxAngle: 150, maxCoef: 3 });
        out.push({
          prompt: 'Write the equation for the angles of this quadrilateral.',
          tag: 'Challenge',
          diagram: pts ? { w: 250, h: 195 } : undefined,
          draw: pts ? ((d, G) => {
            const p = G.fit(pts, 250, 195, 46);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, { label: part.tex, r: 16, size: 11 }));
          }) : undefined,
          input: equationBoxes(e),
          explain: `<span class="work">A quadrilateral totals \\(180(4 - 2) = 360°\\), so ${equationTex(e)}.</span>`
        });
      })();

      // Q10: pentagon.
      (() => {
        let e = null, pts = null;
        for (let t = 0; t < 120 && !pts; t++) {
          e = angleExprs(rng, 540, 5, { minAngle: 75, maxAngle: 150, maxCoef: 3, maxConst: 55 });
          if (!e) continue;
          pts = Geo.polygonFromAngles(e.parts.map(p => p.angle), rng);
        }
        if (!e) e = needExprs(rng, 540, 5, { minAngle: 75, maxAngle: 150, maxCoef: 3, maxConst: 55 });
        out.push({
          prompt: 'Write the equation for the angles of this pentagon.',
          tag: 'Challenge',
          note: 'Work out the total with ' + m('180(n - 2)') + ' first.',
          diagram: pts ? { w: 250, h: 200 } : undefined,
          draw: pts ? ((d, G) => {
            const p = G.fit(pts, 250, 200, 46);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, { label: part.tex, r: 15, size: 10.5 }));
          }) : undefined,
          input: equationBoxes(e),
          explain: `<span class="work">\\(180(5 - 2) = 540°\\), so ${equationTex(e)}.</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 4.2 Solve for the angle ══════════════════════════════════════════════
  Topics.u4e2 = {
    id: 'u4e2', unit: 4,
    title: 'Solve for the Angle',
    blurb: 'Build the equation, solve it, then turn x back into an actual angle.',
    hint: 'Finding x is only half the job. The question usually wants an angle, so substitute x back into the expression for that angle. Checking that all the angles now add to the right total is a free way to catch a slip.',

    examples: [
      {
        title: 'Example: two angles on a straight line',
        diagram: { w: 250, h: 145 },
        draw(d) {
          Dia.angleFan(d, {
            rays: [0, 95, 180], baseline: true,
            marks: [{ from: 0, to: 1, label: '5x + 10' }, { from: 1, to: 2, label: '4x + 17', r: 36 }]
          });
        },
        steps: [
          'They sit on a straight line, so \\((5x + 10) + (4x + 17) = 180\\).',
          'Collect like terms: \\(9x + 27 = 180\\).',
          'Take 27 off both sides: \\(9x = 153\\), so \\(x = 17\\).',
          'Now turn \\(x\\) back into angles: \\(5(17) + 10 = 95\\) and \\(4(17) + 17 = 85\\).',
          'Check: \\(95 + 85 = 180\\). ✓ If that check fails, the slip is in the algebra, not the geometry.'
        ],
        result: 'Answer: \\(x = 17\\), and the angles are 95° and 85°'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      const make = (total, n, opt) => needExprs(rng, total, n, opt);

      // Q1–2: straight line, find x.
      for (let i = 0; i < 2; i++) {
        const e = make(180, 2, { minAngle: 45, maxCoef: hard ? 4 : 3 });
        out.push({
          prompt: 'Find ' + m('x') + '.',
          diagram: { w: 250, h: 150 },
          draw: d => Dia.angleFan(d, {
            rays: [0, e.parts[0].angle, 180], baseline: true,
            marks: [
              { from: 0, to: 1, label: e.parts[0].tex, size: 11.5 },
              { from: 1, to: 2, label: e.parts[1].tex, r: 36, size: 11.5 }
            ]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', answer: e.x, width: 76 },
          explain: `<span class="work">${equationTex(e)}, so \\(${T(e.coefSum, 'x')} = ${e.total - e.constSum}\\) and \\(x = ${e.x}\\). The angles are ${e.parts.map(p => deg(p.angle)).join(' and ')}.</span>`
        });
      }

      // Q3–4: triangle, find x.
      for (let i = 0; i < 2; i++) {
        const e = make(180, 3, { minAngle: 35, maxAngle: 110, maxCoef: hard ? 4 : 3 });
        const A = e.parts.map(p => p.angle);
        out.push({
          prompt: 'Find ' + m('x') + '.',
          diagram: { w: 270, h: 200 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(A[0], A[1], A[2]), 270, 200, 52);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, { label: part.tex, size: 11, gap: 16 }));
          },
          input: { kind: 'number', prefix: m('x') + ' =', answer: e.x, width: 76 },
          explain: `<span class="work">${equationTex(e)} gives \\(x = ${e.x}\\). Checking: ${A.map(deg).join(' + ')} = 180°. ✓</span>`
        });
      }

      // Q5–6: find x, then the actual angle.
      for (let i = 0; i < 2; i++) {
        const e = make(180, 3, { minAngle: 40, maxAngle: 105, maxCoef: 3 });
        const A = e.parts.map(p => p.angle);
        const which = rng.int(0, 2);
        out.push({
          prompt: `Find ${m('x')}, then find the angle marked ${m(e.parts[which].tex)}.`,
          note: 'Two answers: the value of ' + m('x') + ', then the angle itself in degrees.',
          diagram: { w: 270, h: 200 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(A[0], A[1], A[2]), 270, 200, 52);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, {
              label: part.tex, size: 11, gap: 16,
              colour: k === which ? 'var(--dia-unknown)' : 'var(--dia-accent)',
              ticks: k === which ? 2 : 1
            }));
          },
          input: {
            kind: 'fill',
            parts: [
              { text: m('x') + ' =' }, { input: { answer: e.x, width: 62 } },
              { text: '&nbsp;&nbsp;angle =' }, { input: { answer: A[which], width: 62 } }, { text: '°' }
            ]
          },
          explain: `<span class="work">${equationTex(e)} gives \\(x = ${e.x}\\). Then \\(${e.parts[which].tex} = ${A[which]}\\)°.</span>`
        });
      }

      // Q7: spot the mistake — stopped at x.
      (() => {
        const e = make(180, 3, { minAngle: 40, maxAngle: 105, maxCoef: 3, nonZeroConst: true });
        const which = 0;
        const lines = [
          equationTex(e),
          m(`${T(e.coefSum, 'x')} = ${e.total - e.constSum}`),
          m(`x = ${e.x}`),
          `So the angle marked ${m(e.parts[which].tex)} is ${deg(e.x)}.`
        ];
        out.push({
          prompt: `The angles of a triangle are ${e.parts.map(p => m(p.tex)).join(', ')}. Somebody found the first angle like this.`,
          input: { kind: 'spot', lines, wrong: 3 },
          explain: `<span class="work">Line 4 gave \\(x\\) instead of the angle. Substitute back: \\(${e.parts[which].tex} = ${e.parts[which].angle}\\)°.</span>`
        });
      })();

      // Q8: isosceles with expressions.
      (() => {
        let x, a, base;
        do {
          x = rng.int(6, 28);
          a = rng.int(1, 3);
          base = a * x + rng.int(-20, 20);
        } while (base < 30 || base > 75);
        const apex = 180 - 2 * base;
        const b = base - a * x;
        out.push({
          prompt: 'The two base angles of this isosceles triangle are equal. Find ' + m('x') + '.',
          tag: 'Challenge',
          diagram: { w: 240, h: 180 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(base, base, apex), 240, 180, 44);
            d.polygon(p);
            d.sideTicks(p, 1, 1); d.sideTicks(p, 2, 1);
            d.angleArc(p, 0, { label: S([[a, 'x'], [b, '']]), size: 11.5 });
            d.angleArc(p, 1, { label: deg(base), colour: 'var(--dia-known)', size: 11.5 });
            d.angleArc(p, 2, { label: deg(apex), colour: 'var(--dia-muted)', size: 11.5 });
          },
          input: { kind: 'number', prefix: m('x') + ' =', answer: x, width: 76 },
          explain: `<span class="work">The base angles are equal, so \\(${S([[a, 'x'], [b, '']])} = ${base}\\), giving \\(x = ${x}\\).</span>`
        });
      })();

      // Q9: vertically opposite with expressions.
      (() => {
        let x, a, c, b, dd, ang;
        do {
          x = rng.int(5, 25);
          a = rng.int(2, 5); c = rng.intExcept(1, 4, [a]);
          b = rng.int(-15, 25); dd = (a - c) * x + b;
          ang = a * x + b;
        } while (ang < 25 || ang > 155 || Math.abs(dd) > 60);
        out.push({
          prompt: 'Two straight lines cross. The marked angles are vertically opposite, so they are equal. Find ' + m('x') + '.',
          tag: 'Challenge',
          diagram: { w: 235, h: 175 },
          draw: d => Dia.angleFan(d, {
            lowCentre: false,
            rays: [0, ang, 180, 180 + ang],
            marks: [
              { from: 0, to: 1, label: S([[a, 'x'], [b, '']]), size: 11.5, r: 30 },
              { from: 2, to: 3, label: S([[c, 'x'], [dd, '']]), size: 11.5, r: 30, colour: 'var(--dia-known)' }
            ]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', answer: x, width: 76 },
          explain: `<span class="work">\\(${S([[a, 'x'], [b, '']])} = ${S([[c, 'x'], [dd, '']])}\\) gives \\(${T(a - c, 'x')} = ${dd - b}\\), so \\(x = ${x}\\). Both angles are ${deg(ang)}.</span>`
        });
      })();

      // Q10: quadrilateral, find x and the largest angle.
      (() => {
        let e = null, pts = null;
        for (let t = 0; t < 120 && !pts; t++) {
          e = angleExprs(rng, 360, 4, { minAngle: 55, maxAngle: 145, maxCoef: 3 });
          if (!e) continue;
          pts = Geo.polygonFromAngles(e.parts.map(p => p.angle), rng);
        }
        if (!e) e = needExprs(rng, 360, 4, { minAngle: 55, maxAngle: 145, maxCoef: 3 });
        const A = e.parts.map(p => p.angle);
        const biggest = Math.max(...A);
        out.push({
          prompt: 'Find ' + m('x') + ', then give the size of the <strong>largest</strong> angle.',
          tag: 'Challenge',
          diagram: pts ? { w: 250, h: 195 } : undefined,
          draw: pts ? ((d, G) => {
            const p = G.fit(pts, 250, 195, 46);
            d.polygon(p);
            e.parts.forEach((part, k) => d.angleArc(p, k, { label: part.tex, r: 16, size: 11 }));
          }) : undefined,
          input: {
            kind: 'fill',
            parts: [
              { text: m('x') + ' =' }, { input: { answer: e.x, width: 60 } },
              { text: '&nbsp;&nbsp;largest =' }, { input: { answer: biggest, width: 62 } }, { text: '°' }
            ]
          },
          explain: `<span class="work">${equationTex(e)} gives \\(x = ${e.x}\\). The angles come to ${A.map(deg).join(', ')}, so the largest is ${deg(biggest)}.</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 4.3 Perimeter with letters ═══════════════════════════════════════════
  Topics.u4e3 = {
    id: 'u4e3', unit: 4,
    title: 'Perimeter with Letters',
    blurb: 'Sides written as expressions. Add them up, set them equal to the perimeter, solve.',
    hint: 'Perimeter is just the sides added together. Write that sum, collect like terms, and put it equal to the perimeter you were given. Then solve as an ordinary equation and substitute back for the actual lengths.',

    examples: [
      {
        title: 'Example: a rectangle',
        steps: [
          'A rectangle with width \\(x\\) and length \\(x + 4\\) has perimeter \\(x + (x+4) + x + (x+4)\\).',
          'Collecting: \\(4x + 8\\).',
          'If the perimeter is 36 cm, then \\(4x + 8 = 36\\), so \\(4x = 28\\) and \\(x = 7\\).',
          'The rectangle is 7 cm by 11 cm. Check: \\(7 + 11 + 7 + 11 = 36\\). ✓'
        ],
        result: 'Answer: \\(x = 7\\), sides 7 cm and 11 cm'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      const rectDraw = (w, l, labW, labL) => (d, G) => {
        const asp = l / w;
        const bw = Math.min(200, 130 * Math.max(1, Math.min(asp, 1.9)));
        const bh = bw / Math.max(asp, 0.55);
        const x0 = (d.w - bw) / 2, y0 = (d.h - bh) / 2;
        const p = [[x0, y0], [x0 + bw, y0], [x0 + bw, y0 + bh], [x0, y0 + bh]];
        d.polygon(p);
        d.angleArc(p, 0, { right: true, colour: 'var(--dia-muted)', markSize: 9 });
        d.sideLabel(p, 0, labL, { gap: 13 });
        d.sideLabel(p, 1, labW, { gap: 15 });
      };

      // Q1–2: write the perimeter expression.
      for (let i = 0; i < 2; i++) {
        const k = rng.int(1, 6);
        const wCoef = 1, lCoef = 1;
        const x = rng.int(3, 14);
        const w = x, l = x + k;
        out.push({
          prompt: `A rectangle is ${m('x')} cm wide and ${m(`x + ${k}`)} cm long. Write its perimeter in collected form.`,
          diagram: { w: 230, h: 150 },
          draw: rectDraw(w, l, m('x'), m(`x + ${k}`)),
          input: {
            kind: 'fill',
            parts: [
              { text: 'Perimeter =' }, { input: { answer: 4, width: 54 } }, { text: m('x') },
              { text: '+' }, { input: { answer: 2 * k, width: 54 } }, { text: 'cm' }
            ]
          },
          explain: `<span class="work">\\(x + (x+${k}) + x + (x+${k}) = 4x + ${2 * k}\\)</span>`
        });
      }

      // Q3–4: find x from the perimeter.
      for (let i = 0; i < 2; i++) {
        const k = rng.int(1, 8);
        const x = rng.int(3, 16);
        const P = 4 * x + 2 * k;
        out.push({
          prompt: `A rectangle is ${m('x')} cm wide and ${m(`x + ${k}`)} cm long. Its perimeter is ${P} cm. Find ${m('x')}.`,
          diagram: { w: 230, h: 150 },
          draw: rectDraw(x, x + k, m('x'), m(`x + ${k}`)),
          input: { kind: 'number', prefix: m('x') + ' =', answer: x, width: 76 },
          explain: `<span class="work">\\(4x + ${2 * k} = ${P}\\), so \\(4x = ${P - 2 * k}\\) and \\(x = ${x}\\). The rectangle is ${x} cm by ${x + k} cm.</span>`
        });
      }

      // Q5: triangle perimeter.
      (() => {
        let x, a, b, sides;
        do {
          x = rng.int(4, 15);
          a = [rng.int(1, 3), rng.int(1, 3), 1];
          b = [rng.int(-3, 8), rng.int(-3, 8), rng.int(1, 9)];
          sides = a.map((c, i) => c * x + b[i]);
        } while (sides.some(s => s < 2) ||
                 sides[0] + sides[1] <= sides[2] ||
                 sides[0] + sides[2] <= sides[1] ||
                 sides[1] + sides[2] <= sides[0]);
        const P = sides.reduce((s, v) => s + v, 0);
        const coefSum = a.reduce((s, v) => s + v, 0), constSum = b.reduce((s, v) => s + v, 0);
        out.push({
          prompt: `A triangle has sides ${a.map((c, i) => m(S([[c, 'x'], [b[i], '']]))).join(', ')} cm. Its perimeter is ${P} cm. Find ${m('x')}.`,
          diagram: { w: 235, h: 165 },
          draw: (d, G) => {
            // Draw the triangle with these real side lengths.
            const [s0, s1, s2] = sides;
            const A = Math.acos((s1 * s1 + s2 * s2 - s0 * s0) / (2 * s1 * s2)) * G.DEG;
            const B = Math.acos((s0 * s0 + s2 * s2 - s1 * s1) / (2 * s0 * s2)) * G.DEG;
            const p = G.fit(G.triangleFromAngles(A, B, 180 - A - B), 235, 165, 36);
            d.polygon(p);
            a.forEach((c, i) => d.sideLabel(p, i, m(S([[c, 'x'], [b[i], '']])), { gap: 15, size: 11.5 }));
          },
          input: { kind: 'number', prefix: m('x') + ' =', answer: x, width: 76 },
          explain: `<span class="work">\\(${S([[coefSum, 'x'], [constSum, '']])} = ${P}\\), so \\(x = ${x}\\). The sides are ${sides.join(', ')} cm.</span>`
        });
      })();

      // Q6: equal sides, find the side length.
      (() => {
        const x = rng.int(3, 14);
        const n = rng.pick([3, 4, 5, 6]);
        const a = rng.int(1, 3), b = rng.int(1, 9);
        const side = a * x + b;
        const P = n * side;
        out.push({
          prompt: `A regular ${Fmt.polyName(n)} has each side ${m(S([[a, 'x'], [b, '']]))} cm. Its perimeter is ${P} cm. ` +
                  `Find ${m('x')} and the length of one side.`,
          diagram: { w: 175, h: 155 },
          draw: (d, G) => {
            const p = G.fit(G.regularPolygon(n), 175, 155, 30);
            d.polygon(p);
            d.sideLabel(p, 0, m(S([[a, 'x'], [b, '']])), { gap: 13, size: 11 });
          },
          input: {
            kind: 'fill',
            parts: [
              { text: m('x') + ' =' }, { input: { answer: x, width: 58 } },
              { text: '&nbsp;&nbsp;side =' }, { input: { answer: side, width: 58 } }, { text: 'cm' }
            ]
          },
          explain: `<span class="work">\\(${P} \\div ${n} = ${side}\\) per side, so \\(${S([[a, 'x'], [b, '']])} = ${side}\\) and \\(x = ${x}\\).</span>`
        });
      })();

      // Q7: spot the mistake — counted only two sides of a rectangle.
      (() => {
        const k = rng.int(2, 7), x = rng.int(4, 14);
        const P = 4 * x + 2 * k;
        const lines = [
          `The rectangle is ${m('x')} by ${m(`x + ${k}`)}.`,
          m(`\\text{Perimeter} = x + (x + ${k})`),
          m(`= ${S([[2, 'x'], [k, '']])}`),
          m(`${S([[2, 'x'], [k, '']])} = ${P}`)
        ];
        out.push({
          prompt: 'Somebody found the perimeter of a rectangle like this.',
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 used only two sides. A rectangle has four: \\(2x + 2(x + ${k}) = 4x + ${2 * k}\\).</span>`
        });
      })();

      // Q8: area rather than perimeter, to break the pattern.
      (() => {
        const x = rng.int(3, 11), k = rng.int(1, 6);
        out.push({
          prompt: `A rectangle is ${m('x')} cm wide and ${m(`x + ${k}`)} cm long, and ${m(`x = ${x}`)}. ` +
                  'What is its <strong>area</strong>?',
          tag: 'Challenge',
          note: 'Area is width × length, not the sides added.',
          diagram: { w: 225, h: 148 },
          draw: rectDraw(x, x + k, m('x'), m(`x + ${k}`)),
          input: { kind: 'number', suffix: 'cm²', answer: x * (x + k), width: 84 },
          explain: `<span class="work">\\(${x} \\times ${x + k} = ${x * (x + k)}\\)</span>`
        });
      })();

      // Q9: perimeter with unknowns on both sides.
      (() => {
        let x, a, c, b, dd;
        do {
          x = rng.int(4, 15);
          a = rng.int(2, 5); c = rng.intExcept(1, 4, [a]);
          b = rng.int(1, 9); dd = (a - c) * x + b;
        } while (a * x + b < 3 || dd < -20 || dd > 60);
        out.push({
          prompt: `Two sides of a shape are equal in length. One is ${m(S([[a, 'x'], [b, '']]))} cm and the other is ${m(S([[c, 'x'], [dd, '']]))} cm. ` +
                  `Find ${m('x')} and the length of each side.`,
          tag: 'Challenge',
          input: {
            kind: 'fill',
            parts: [
              { text: m('x') + ' =' }, { input: { answer: x, width: 58 } },
              { text: '&nbsp;&nbsp;length =' }, { input: { answer: a * x + b, width: 62 } }, { text: 'cm' }
            ]
          },
          explain: `<span class="work">\\(${S([[a, 'x'], [b, '']])} = ${S([[c, 'x'], [dd, '']])}\\) gives \\(${T(a - c, 'x')} = ${dd - b}\\), so \\(x = ${x}\\) and each side is ${a * x + b} cm.</span>`
        });
      })();

      // Q10: which expression is the perimeter?
      (() => {
        const k = rng.int(1, 7);
        const opts = rng.shuffle([
          { html: m(`4x + ${2 * k}`), right: true },
          { html: m(`2x + ${k}`),     right: false },
          { html: m(`x^2 + ${k}x`),   right: false },
          { html: m(`4x + ${k}`),     right: false }
        ]);
        out.push({
          prompt: `Which expression is the perimeter of a rectangle ${m('x')} cm by ${m(`x + ${k}`)} cm?`,
          tag: 'Challenge',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">Four sides: \\(x + (x+${k}) + x + (x+${k}) = 4x + ${2 * k}\\). The \\(x^2\\) option is the area.</span>`
        });
      })();

      return out;
    }
  };

})();
