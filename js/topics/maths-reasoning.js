'use strict';
// ── Revision · Mathematical Reasoning (Years 9–10 maths) ────────────────────
// The second look-ahead maths unit, towards NCEA 1.4 (Demonstrate mathematical
// reasoning). From Phase 4 of the Mathematics and Statistics Years 0–10
// learning area, November 2026:
//   R1 Pythagoras' Theorem   Year 9 measurement (p. 42–43); the proof and the
//                            distance formula are Year 10, in the Challenge set
//   R2 Straight-Line Graphs  Year 10 algebra (p. 41): gradient, y-intercept,
//                            y = mx + c, the equation from two points
// Trigonometry and simultaneous equations are not in Years 9–10, so they are
// left for later.
//
// Reasoning is the point: besides calculating, students choose the right
// equation, find the wrong step in some working, and put a proof in order.
// Each exercise has a normal set and a Challenge set (?set=challenge).
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice;
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', ACC = 'var(--dia-accent)';
  const num = x => String(+(+x).toFixed(2));
  const r1 = x => Math.round(x * 10) / 10;

  // ── Diagrams ──────────────────────────────────────────────────────────────
  /**
   * A right-angled triangle drawn to scale: legs a (across) and b (up), the
   * right angle bottom left (or bottom right when flipped). Labels are
   * strings for the across leg, the upright leg and the hypotenuse; the
   * unknown one ('a', 'b' or 'c') is drawn in the accent colour.
   */
  function rightTri(d, o) {
    const pad = 34, s = Math.min((d.w - 2 * pad - 20) / o.a, (d.h - 2 * pad + 6) / o.b);
    const W = o.a * s, H = o.b * s;
    const x0 = (d.w - W) / 2, yB = d.h - pad + 4;
    const fx = o.flip ? (x => 2 * x0 + W - x) : (x => x);
    const A = [fx(x0), yB], B = [fx(x0 + W), yB], T = [fx(x0), yB - H];
    d.polygon([A, B, T], { fill: 'var(--dia-fill)', width: 1.8 });
    const k = 10, sx = o.flip ? -1 : 1;
    d.add('path', { d: `M ${A[0] + sx * k} ${A[1]} L ${A[0] + sx * k} ${A[1] - k} L ${A[0]} ${A[1] - k}`, fill: 'none', stroke: INK, 'stroke-width': 1.3 });
    const col = w => (o.unknown === w ? ACC : INK);
    const [la, lb, lc] = o.labels;
    if (la) d.text([(A[0] + B[0]) / 2, yB + 16], la, { size: 13, fill: col('a') });
    if (lb) d.text([A[0] - sx * 8, (A[1] + T[1]) / 2], lb, { size: 13, anchor: o.flip ? 'start' : 'end', fill: col('b') });
    if (lc) {
      const M = [(B[0] + T[0]) / 2, (B[1] + T[1]) / 2];
      const n = [(M[0] - A[0]), (M[1] - A[1])], L = Math.hypot(n[0], n[1]);
      d.text([M[0] + n[0] / L * 16, M[1] + n[1] / L * 14], lc, { size: 13, anchor: o.flip ? 'end' : 'start', fill: col('c') });
    }
  }

  /**
   * A coordinate grid from lo to hi on both axes, with lines and points.
   * o: { lo, hi, lines: [{ m, c } | { x }], points: [{ at: [x, y], label }] }
   */
  function grid(d, o) {
    const lo = o.lo === undefined ? -6 : o.lo, hi = o.hi === undefined ? 6 : o.hi;
    const size = Math.min(d.w, d.h) - 28, cell = size / (hi - lo);
    const ox = (d.w - size) / 2, oy = (d.h - size) / 2;
    const X = x => ox + (x - lo) * cell, Y = y => oy + (hi - y) * cell;
    for (let v = lo; v <= hi; v++) {
      d.line([X(v), Y(lo)], [X(v), Y(hi)], { stroke: 'var(--rule-soft)', width: 1 });
      d.line([X(lo), Y(v)], [X(hi), Y(v)], { stroke: 'var(--rule-soft)', width: 1 });
    }
    d.line([X(lo), Y(0)], [X(hi), Y(0)], { stroke: INK, width: 1.4 });
    d.line([X(0), Y(lo)], [X(0), Y(hi)], { stroke: INK, width: 1.4 });
    for (let v = lo; v <= hi; v++) {
      if (!v || v % 2) continue;
      d.text([X(v), Y(0) + 11], String(v), { size: 9.5, bold: false, fill: MUTED });
      d.text([X(0) - 5, Y(v)], String(v), { size: 9.5, bold: false, anchor: 'end', fill: MUTED });
    }
    d.text([X(hi) - 2, Y(0) - 9], 'x', { size: 11, anchor: 'end' });
    d.text([X(0) + 8, Y(hi) + 4], 'y', { size: 11, anchor: 'start' });
    for (const ln of o.lines || []) {
      let a, b;
      if (ln.x !== undefined) { a = [ln.x, lo]; b = [ln.x, hi]; }
      else if (ln.m === 0) { a = [lo, ln.c]; b = [hi, ln.c]; }
      else {
        const x1 = (lo - ln.c) / ln.m, x2 = (hi - ln.c) / ln.m;
        const xa = Math.max(lo, Math.min(x1, x2)), xb = Math.min(hi, Math.max(x1, x2));
        a = [xa, ln.m * xa + ln.c]; b = [xb, ln.m * xb + ln.c];
      }
      d.line([X(a[0]), Y(a[1])], [X(b[0]), Y(b[1])], { stroke: ln.colour || 'var(--brand)', width: 2.2 });
      if (ln.label) d.text([X(b[0]) - 4, Y(b[1]) + (ln.m < 0 ? -9 : 12)], ln.label, { size: 11.5, anchor: 'end', fill: ln.colour || 'var(--brand-ink)' });
    }
    for (const p of o.points || []) {
      d.dot([X(p.at[0]), Y(p.at[1])], { r: 3.6, fill: ACC });
      if (p.label) d.text([X(p.at[0]) + 6, Y(p.at[1]) - 9], p.label, { size: 11, anchor: 'start' });
    }
  }

  // ── Pythagoras helpers ────────────────────────────────────────────────────
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
  /** A triple, possibly scaled, with its legs in either order. */
  function triple(rng, maxK) {
    const t = rng.pick(TRIPLES), k = rng.int(1, maxK || 3);
    const [p, q] = rng.chance() ? [t[0], t[1]] : [t[1], t[0]];
    return [p * k, q * k, t[2] * k];
  }
  const UNITS = ['cm', 'm', 'mm'];

  // ═══ R1 Pythagoras' theorem ═══════════════════════════════════════════════

  Sci.topic({
    id: 'mr1', unit: 'reasoning',
    title: 'Pythagoras’ Theorem',
    blurb: 'In a right-angled triangle, the square on the longest side equals the sum of the squares on the other two. Use it to find a side, and to check for a right angle.',
    hint: 'Find the hypotenuse first: it is opposite the right angle, and the longest side. Then c² = a² + b². To find the hypotenuse, add the squares and take the square root. ' +
          'To find a shorter side, subtract: a² = c² − b².',

    learn: [
      { id: 'theorem', title: 'The theorem',
        diagram: { w: 200, h: 150, caption: 'c is the hypotenuse: opposite the right angle.' },
        draw(d) { rightTri(d, { a: 4, b: 3, labels: ['a', 'b', 'c'] }); },
        text: '<p>In a right-angled triangle, the <strong>hypotenuse</strong> is the side opposite the right angle. It is always the longest side.</p>' +
              '<p style="text-align:center">' + m('c^2 = a^2 + b^2') + '</p>' +
              '<p>The square of the hypotenuse equals the sum of the squares of the other two sides.</p>' },
      { id: 'long', title: 'Finding the hypotenuse',
        text: '<p>Square the two shorter sides, <strong>add</strong>, then take the square root.</p>' +
              '<p>' + m('c^2 = 6^2 + 8^2 = 36 + 64 = 100') + ', so ' + m('c = \\sqrt{100} = 10') + '.</p>' },
      { id: 'short', title: 'Finding a shorter side',
        text: '<p>Square the hypotenuse and the known side, <strong>subtract</strong>, then take the square root.</p>' +
              '<p>' + m('a^2 = 13^2 - 5^2 = 169 - 25 = 144') + ', so ' + m('a = \\sqrt{144} = 12') + '.</p>' +
              '<p>Check: a shorter side must come out less than the hypotenuse.</p>' },
      { id: 'round', title: 'Answers that are not whole numbers',
        text: '<p>Most square roots are not whole: ' + m('\\sqrt{50} = 7.0710\\ldots') + '. Keep the full value on your calculator and round only at the end, here to 7.1.</p>' },
      { id: 'check', title: 'Is it a right angle?',
        text: '<p>The theorem works backwards too. Square the longest side and compare with the sum of the squares of the other two:</p>' +
              '<ul><li>equal: the triangle has a right angle, opposite the longest side</li><li>not equal: it does not.</li></ul>' +
              '<p>Builders use 3, 4, 5: a corner with 3 m along one wall, 4 m along the other and 5 m across is square.</p>' },
      { id: 'triples', title: 'Pythagorean triples',
        text: '<p>Whole numbers that fit the theorem, such as (3, 4, 5) and (5, 12, 13), are <strong>Pythagorean triples</strong>.</p>' +
              '<p>Multiply all three by the same whole number and you get another: (3, 4, 5) gives (6, 8, 10) and (30, 40, 50).</p>' },
      { id: 'reason', title: 'Showing your reasoning',
        text: '<p>Write each step so a reader can follow it:</p><ol><li>name the hypotenuse</li><li>write the equation</li><li>substitute</li><li>solve, with units</li></ol>' +
              '<p>The common slips: adding when you should subtract, forgetting the square root, and squaring by doubling.</p>' },
      { id: 'proof', title: 'Why it is true',
        text: '<p>Put four copies of the triangle inside a square of side a + b, with the hypotenuses making a tilted square of side c in the middle.</p>' +
              '<p>The big square’s area is ' + m('(a+b)^2') + ', and also ' + m('4 \\times \\tfrac{1}{2}ab + c^2') + '. ' +
              'Expanding, ' + m('a^2 + 2ab + b^2 = 2ab + c^2') + ', so ' + m('a^2 + b^2 = c^2') + '.</p>' },
      { id: 'distance', title: 'Distance between two points',
        text: '<p>Two points on a grid make the hypotenuse of a right-angled triangle: across ' + m('x_2 - x_1') + ', up ' + m('y_2 - y_1') + '.</p>' +
              '<p style="text-align:center">' + m('d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}') + '</p>' }
    ],

    examples: [
      {
        title: 'Example 1: the hypotenuse',
        steps: ['A ramp rises 1.2 m over a horizontal 3.5 m. How long is the ramp?', 'The ramp is the hypotenuse: ' + m('c^2 = 3.5^2 + 1.2^2 = 12.25 + 1.44 = 13.69') + '.',
                m('c = \\sqrt{13.69} = 3.7') + ' m.'],
        result: '3.7 m'
      },
      {
        title: 'Example 2: a shorter side',
        steps: ['A 6.5 m ladder reaches 6 m up a wall. How far is its foot from the wall?', 'The ladder is the hypotenuse: ' + m('a^2 = 6.5^2 - 6^2 = 42.25 - 36 = 6.25') + '.',
                m('a = \\sqrt{6.25} = 2.5') + ' m.'],
        result: '2.5 m'
      }
    ],

    slots: [
      { name: 'Find the hypotenuse', learn: 'long',
        items: [Sci.gen(rng => {
          const [a, b, c] = triple(rng, 3), u = rng.pick(UNITS), flip = rng.chance();
          return { prompt: 'Find the length of the hypotenuse.', diagram: { w: 240, h: 170 },
                   draw: d => rightTri(d, { a, b, flip, labels: [`${a} ${u}`, `${b} ${u}`, '?'], unknown: 'c' }),
                   input: { kind: 'number', answer: c, suffix: u, width: 70 },
                   explain: m(`c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}`) + ', so ' + m(`c = \\sqrt{${c * c}} = ${c}`) + ` ${u}.` };
        })] },

      { name: 'Find a shorter side', learn: 'short',
        items: [Sci.gen(rng => {
          const [a, b, c] = triple(rng, 3), u = rng.pick(UNITS), flip = rng.chance(), across = rng.chance();
          const want = across ? a : b, known = across ? b : a;
          return { prompt: 'Find the length of the side marked ?.', diagram: { w: 240, h: 170 },
                   draw: d => rightTri(d, { a, b, flip, labels: [across ? '?' : `${a} ${u}`, across ? `${b} ${u}` : '?', `${c} ${u}`], unknown: across ? 'a' : 'b' }),
                   input: { kind: 'number', answer: want, suffix: u, width: 70 },
                   explain: `The hypotenuse is ${c} ${u}, so subtract: ` + m(`${c}^2 - ${known}^2 = ${c * c} - ${known * known} = ${want * want}`) + ', and ' + m(`\\sqrt{${want * want}} = ${want}`) + ` ${u}.` };
        })] },

      { name: 'Rounding', learn: 'round',
        items: [Sci.gen(rng => {
          const a = rng.int(3, 15), b = rng.int(3, 15), flip = rng.chance();
          const c2 = a * a + b * b, c = Math.sqrt(c2);
          if (Number.isInteger(c)) return { prompt: 'Find the length of the hypotenuse.', diagram: { w: 240, h: 170 },
            draw: d => rightTri(d, { a, b, flip, labels: [`${a} cm`, `${b} cm`, '?'], unknown: 'c' }),
            input: { kind: 'number', answer: c, suffix: 'cm', width: 70 }, explain: m(`c = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${c2}} = ${c}`) + ' cm.' };
          return { prompt: 'Find the length of the hypotenuse, to 1 decimal place.', diagram: { w: 240, h: 170 },
                   draw: d => rightTri(d, { a, b, flip, labels: [`${a} cm`, `${b} cm`, '?'], unknown: 'c' }),
                   input: { kind: 'number', answer: r1(c), tol: 0.051, decimal: true, suffix: 'cm', width: 70 },
                   explain: m(`c = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${c2}} = ${c.toFixed(4)}\\ldots`) + ` ≈ ${r1(c)} cm.` };
        })] },

      { name: 'Which side is the hypotenuse?', learn: 'theorem',
        items: [
          rng => C(rng, { prompt: 'In a right-angled triangle, where is the hypotenuse?', right: 'Opposite the right angle', options: ['Next to the right angle', 'Opposite the right angle', 'Along the bottom', 'It can be any side'], wide: false,
                          explain: 'The hypotenuse is opposite the right angle, and it is always the longest side.' }),
          Sci.gen(rng => {
            const [a, b, c] = triple(rng, 2);
            return C(rng, { prompt: `A right-angled triangle has sides ${rng.shuffle([a, b, c]).join(' cm, ')} cm. Which is the hypotenuse?`, right: `${c} cm`, options: [a, b, c].sort((x, y) => x - y).map(v => `${v} cm`), wide: false,
                            explain: `The hypotenuse is the longest side: ${c} cm.` });
          })
        ] },

      { name: 'The right equation', learn: 'reason',
        items: [Sci.gen(rng => {
          const [a, b, c] = triple(rng, 2), flip = rng.chance(), across = rng.chance();
          const known = across ? b : a;
          const right = m(`x^2 = ${c}^2 - ${known}^2`);
          return C(rng, { prompt: 'Which equation finds <em>x</em>?', diagram: { w: 240, h: 170 },
            draw: d => rightTri(d, { a, b, flip, labels: [across ? 'x' : `${a}`, across ? `${b}` : 'x', `${c}`], unknown: across ? 'a' : 'b' }),
            right, wrong: [m(`x^2 = ${c}^2 + ${known}^2`), m(`x = ${c} - ${known}`), m(`x^2 = ${known}^2 - ${c}^2`)],
            explain: `${c} is the hypotenuse, so ` + m(`x^2 + ${known}^2 = ${c}^2`) + ', which rearranges to ' + right + '.' });
        })] },

      { name: 'Is it a right angle?', learn: 'check',
        items: [Sci.gen(rng => {
          const [a, b, c] = triple(rng, 3), yes = rng.chance();
          const cc = yes ? c : c + rng.pick([-1, 1]);
          const lhs = a * a + b * b;
          return C(rng, { prompt: `A triangle has sides ${a} cm, ${b} cm and ${cc} cm. Does it have a right angle?`,
            right: yes ? `Yes: ${a}² + ${b}² = ${cc}²` : `No: ${a}² + ${b}² ≠ ${cc}²`,
            options: [`Yes: ${a}² + ${b}² = ${cc}²`, `No: ${a}² + ${b}² ≠ ${cc}²`], wide: false,
            explain: `${a}² + ${b}² = ${a * a} + ${b * b} = ${lhs}, and ${cc}² = ${cc * cc}. ` + (yes ? 'They are equal, so there is a right angle opposite the longest side.' : 'They are not equal, so there is no right angle.') });
        })] },

      { name: 'Pythagorean triples', learn: 'triples',
        items: [Sci.gen(rng => {
          const t = rng.pick(TRIPLES.slice(0, 4)), k = rng.int(2, 6), hide = rng.int(0, 2);
          const s = t.map(v => v * k);
          const shown = s.map((v, i) => (i === hide ? '?' : v)).join(', ');
          return { prompt: `(${t.join(', ')}) is a Pythagorean triple. What is the missing number in the triple (${shown})?`,
                   input: { kind: 'number', answer: s[hide], width: 70 },
                   explain: `The known numbers are ${k} times (${t.join(', ')}), so the missing one is ${k} × ${t[hide]} = ${s[hide]}.` };
        })] },

      { name: 'In context', learn: 'round',
        items: [
          Sci.gen(rng => {
            const L = rng.pick([5, 6, 6.5, 7, 8]), up = r1(L - rng.pick([0.4, 0.6, 0.8, 1]));
            const foot = Math.sqrt(L * L - up * up);
            return { prompt: `A ${num(L)} m ladder leans against a wall and reaches ${num(up)} m up it. How far is the foot of the ladder from the wall, to 1 decimal place?`,
                     input: { kind: 'number', answer: r1(foot), tol: 0.051, decimal: true, suffix: 'm', width: 70 },
                     explain: 'The ladder is the hypotenuse: ' + m(`\\sqrt{${num(L)}^2 - ${num(up)}^2} = ${foot.toFixed(3)}\\ldots`) + ` ≈ ${r1(foot)} m.` };
          }),
          Sci.gen(rng => {
            const [Lm, Wm] = rng.pick([[100, 70], [110, 68], [100, 60], [120, 80]]);
            const dg = Math.hypot(Lm, Wm);
            return { prompt: `A rugby field is ${Lm} m long and ${Wm} m wide. How far is it diagonally from corner to corner, to the nearest metre?`,
                     input: { kind: 'number', answer: Math.round(dg), tol: 0.51, suffix: 'm', width: 70 },
                     explain: m(`\\sqrt{${Lm}^2 + ${Wm}^2} = \\sqrt{${Lm * Lm + Wm * Wm}} = ${dg.toFixed(2)}\\ldots`) + ` ≈ ${Math.round(dg)} m.` };
          }),
          Sci.gen(rng => {
            const run = rng.pick([2.4, 3, 3.6, 4.8]), rise = rng.pick([0.5, 0.7, 0.9, 1.2]);
            const L = Math.hypot(run, rise);
            return { prompt: `A wheelchair ramp covers ${num(run)} m horizontally and rises ${num(rise)} m. How long is the ramp’s surface, to 1 decimal place?`,
                     input: { kind: 'number', answer: r1(L), tol: 0.051, decimal: true, suffix: 'm', width: 70 },
                     explain: 'The surface is the hypotenuse: ' + m(`\\sqrt{${num(run)}^2 + ${num(rise)}^2} = ${L.toFixed(3)}\\ldots`) + ` ≈ ${r1(L)} m.` };
          })
        ] },

      { name: 'Find the mistake', learn: 'reason',
        items: [
          Sci.gen(rng => {
            const [a, b, c] = triple(rng, 2);
            return Sci.spot(rng, { prompt: `A student finds a shorter side when the hypotenuse is ${c} cm and another side is ${b} cm. Which line is wrong?`,
              lines: ['The hypotenuse is ' + c + ' cm.', m(`x^2 = ${c}^2 + ${b}^2`), m(`x^2 = ${c * c + b * b}`), m(`x = ${num(Math.sqrt(c * c + b * b))}`) + ' cm'], wrong: 1,
              explain: `To find a shorter side you subtract: ` + m(`x^2 = ${c}^2 - ${b}^2 = ${a * a}`) + `, so x = ${a} cm. The answer ${num(Math.sqrt(c * c + b * b))} cm is longer than the hypotenuse, which cannot be right.` });
          }),
          Sci.gen(rng => {
            const [a, b, c] = triple(rng, 2);
            return Sci.spot(rng, { prompt: `A student finds the hypotenuse of a triangle with shorter sides ${a} cm and ${b} cm. Which line is wrong?`,
              lines: [m(`c^2 = ${a}^2 + ${b}^2`), m(`c^2 = ${2 * a} + ${2 * b}`), m(`c^2 = ${2 * a + 2 * b}`), m(`c = \\sqrt{${2 * a + 2 * b}}`)], wrong: 1,
              explain: `Squaring is not doubling: ${a}² = ${a * a} and ${b}² = ${b * b}, so c² = ${c * c} and c = ${c} cm.` });
          }),
          Sci.gen(rng => {
            const [a, b, c] = triple(rng, 2);
            return Sci.spot(rng, { prompt: `A student finds the hypotenuse of a triangle with shorter sides ${a} cm and ${b} cm. Which line is wrong?`,
              lines: [m(`c^2 = ${a}^2 + ${b}^2`), m(`c^2 = ${a * a} + ${b * b}`), m(`c^2 = ${c * c}`), m(`c = ${c * c}`) + ' cm'], wrong: 3,
              explain: `The last step forgets the square root: c = √${c * c} = ${c} cm.` });
          })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Distance between points', learn: 'distance',
        items: [Sci.gen(rng => {
          const [a, b, c] = triple(rng, 1);
          if (a > 12 || b > 12) return { prompt: 'How far apart are (1, 2) and (4, 6)?', input: { kind: 'number', answer: 5, width: 70 },
            explain: 'Across 3, up 4: ' + m('\\sqrt{3^2 + 4^2} = 5') + '.' };
          const x1 = rng.int(-5, 0), y1 = rng.int(-5, 0);
          const sx = rng.pick([1, -1]) , P = [x1, y1], Q = [x1 + a, y1 + sx * b];
          return { prompt: `How far apart are the points (${P[0]}, ${P[1]}) and (${Q[0]}, ${Q[1]})?`,
                   input: { kind: 'number', answer: c, width: 70 },
                   explain: `Across ${Q[0]} − (${P[0]}) = ${a}, ${sx > 0 ? 'up' : 'down'} ${b}: ` + m(`\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${c * c}} = ${c}`) + '.' };
        })] },

      { challenge: 'only', name: 'Two triangles', learn: 'short',
        items: [Sci.gen(rng => {
          // A kite-shaped frame: shared upright h, two bases from triples.
          const sets = [[[9, 12, 15], [16, 12, 20]], [[5, 12, 13], [9, 12, 15]], [[16, 12, 20], [5, 12, 13]], [[6, 8, 10], [15, 8, 17]]];
          const [[a1, h, c1], [a2, , c2]] = rng.pick(sets);
          return { prompt: `Two right-angled triangles share a vertical side. The first has hypotenuse ${c1} cm and base ${a1} cm. The second has hypotenuse ${c2} cm. How long is the second triangle’s base?`,
                   input: { kind: 'number', answer: a2, suffix: 'cm', width: 70 },
                   explain: `Shared side: ` + m(`\\sqrt{${c1}^2 - ${a1}^2} = ${h}`) + ' cm. Second base: ' + m(`\\sqrt{${c2}^2 - ${h}^2} = ${a2}`) + ' cm.' };
        })] },

      { challenge: 'only', name: 'Put the proof in order', learn: 'proof',
        items: [rng => Sci.order(rng, 'Put the steps of this proof of Pythagoras’ theorem in order.', [
          'Arrange four copies of a right-angled triangle (sides a, b, c) inside a square of side a + b',
          'The hypotenuses form a smaller square of side c in the middle',
          'Area of the big square: (a + b)², which expands to a² + 2ab + b²',
          'Area again, in pieces: four triangles 4 × ½ab = 2ab, plus c²',
          'So a² + 2ab + b² = 2ab + c², and subtracting 2ab gives a² + b² = c²'
        ], 'Work out one area two ways, set them equal, then simplify.')] },

      { challenge: 'only', name: 'A box’s longest rod', learn: 'long',
        items: [Sci.gen(rng => {
          const [l, w, hgt] = rng.pick([[4, 3, 12], [12, 4, 3], [6, 2, 3], [8, 4, 1], [2, 3, 6]]);
          const base = Math.hypot(l, w), dg = Math.hypot(l, w, hgt);
          return { prompt: `A box is ${l} dm long, ${w} dm wide and ${hgt} dm tall. What is the longest straight rod that fits inside, corner to opposite corner?`,
                   input: { kind: 'number', answer: r1(dg), tol: 0.051, decimal: true, suffix: 'dm', width: 70 },
                   explain: 'Across the base: ' + m(`\\sqrt{${l}^2 + ${w}^2} = ${num(base.toFixed(3))}`) + '. Then up: ' + m(`\\sqrt{${l * l + w * w} + ${hgt}^2} = ${num(dg.toFixed(3))}`) + ` dm.` };
        })] }
    ]
  });

  // ═══ R2 Straight-line graphs ══════════════════════════════════════════════

  const GRADS = [[1, 1], [2, 1], [3, 1], [-1, 1], [-2, 1], [-3, 1], [1, 2], [-1, 2], [3, 2], [-3, 2]];
  const frac = (p, q) => (q === 1 ? String(p) : `${p}/${q}`);
  const texM = (p, q) => (q === 1 ? String(p) : `${p < 0 ? '-' : ''}\\tfrac{${Math.abs(p)}}{${q}}`);
  /** y = kx + c in TeX, for a whole or decimal k. */
  const lin = (k, c) => `y = ${k === 1 ? '' : k === -1 ? '-' : k}x${c === 0 ? '' : c < 0 ? ` - ${-c}` : ` + ${c}`}`;
  /** y = mx + c written neatly. */
  function rule(p, q, c) {
    const mm = p / q;
    const mx = mm === 1 ? 'x' : mm === -1 ? '-x' : `${texM(p, q)}x`;
    return `y = ${mm === 0 ? '' : mx}${c === 0 ? (mm === 0 ? '0' : '') : c > 0 ? (mm === 0 ? c : ` + ${c}`) : (mm === 0 ? c : ` - ${-c}`)}`;
  }
  /** A line that crosses the grid well: gradient p/q, intercept c, and a second lattice point. */
  function line(rng) {
    const [p, q] = rng.pick(GRADS);
    const c = rng.int(-4, 4);
    // Second point at x = ±2q, kept on the grid.
    const xs = [2 * q, -2 * q, q, -q].filter(x => Math.abs(c + p * x / q) <= 5 && Math.abs(x) <= 5);
    const x2 = xs[0];
    return { p, q, c, pts: [[0, c], [x2, c + p * x2 / q]] };
  }

  Sci.topic({
    id: 'mr2', unit: 'reasoning',
    title: 'Straight-Line Graphs',
    blurb: 'Every straight line has a rule y = mx + c: m is how steep it is, c is where it crosses the y-axis. Read them off a graph, and find a line from two points.',
    hint: 'c is where the line crosses the y-axis (x = 0). For m, pick two points on the line: gradient = rise ÷ run. Going right, a line that goes up has a positive gradient; one that goes down, negative.',

    learn: [
      { id: 'rule', title: 'y = mx + c',
        diagram: { w: 220, h: 220, caption: 'y = 2x + 1: crosses the y-axis at 1, and rises 2 for every 1 across.' },
        draw(d) { grid(d, { lines: [{ m: 2, c: 1 }], points: [{ at: [0, 1] }, { at: [2, 5] }] }); },
        text: '<p>Every straight line (except a vertical one) has a rule ' + m('y = mx + c') + '.</p>' +
              '<ul><li><strong>m</strong> is the <strong>gradient</strong>: how steep the line is.</li>' +
              '<li><strong>c</strong> is the <strong>y-intercept</strong>: the line crosses the y-axis at ' + m('(0, c)') + '.</li></ul>' +
              '<p>Every point (x, y) on the line makes the rule true.</p>' },
      { id: 'gradient', title: 'Gradient = rise ÷ run',
        text: '<p>Choose two points on the line. Going from left to right:</p>' +
              '<p style="text-align:center">' + m('m = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y_2 - y_1}{x_2 - x_1}') + '</p>' +
              '<p>A rise of 6 over a run of 3 gives m = 2. A fall of 2 over a run of 4 gives m = −½.</p>' },
      { id: 'sign', title: 'Positive, negative, zero',
        text: '<ul><li>Positive gradient: the line goes <strong>up</strong> from left to right.</li>' +
              '<li>Negative gradient: it goes <strong>down</strong>.</li>' +
              '<li>Zero gradient: horizontal, ' + m('y = c') + '.</li>' +
              '<li>A vertical line has no gradient you can calculate (the run is 0). Its equation is ' + m('x = b') + '.</li></ul>' +
              '<p>The bigger the size of m (ignoring its sign), the steeper the line.</p>' },
      { id: 'table', title: 'From a table',
        text: '<p>In a table of a straight line, y changes by the same amount each time x goes up by 1: that change is m. The y value when x = 0 is c.</p>' +
              Sci.table(['x', '0', '1', '2', '3'], [['y', '5', '8', '11', '14']]) + '<p>Up 3 each time, starting at 5: ' + m('y = 3x + 5') + '.</p>' },
      { id: 'two', title: 'The equation from two points',
        text: '<ol><li>Find m from the two points.</li><li>Substitute one point and m into ' + m('y = mx + c') + ' and solve for c.</li></ol>' +
              '<p>Through (1, 5) and (3, 9): ' + m('m = \\dfrac{9-5}{3-1} = 2') + '. Then ' + m('5 = 2 \\times 1 + c') + ', so c = 3: ' + m('y = 2x + 3') + '.</p>' },
      { id: 'context', title: 'Lines in context',
        text: '<p>A taxi charges a $4 flag fall plus $3 per km: ' + m('C = 3d + 4') + '. The gradient is the rate ($3 per km); the intercept is the starting value ($4 before you move).</p>' }
    ],

    examples: [
      {
        title: 'Example 1: the equation from a graph',
        steps: ['A line crosses the y-axis at −2 and passes through (3, 4).', 'c = −2.', 'From (0, −2) to (3, 4): rise 6, run 3, so ' + m('m = 6 \\div 3 = 2') + '.'],
        result: m('y = 2x - 2')
      },
      {
        title: 'Example 2: through two points',
        steps: ['Through (−1, 7) and (2, −2).', m('m = \\dfrac{-2 - 7}{2 - (-1)} = \\dfrac{-9}{3} = -3') + '.', 'Substitute (2, −2): ' + m('-2 = -3 \\times 2 + c') + ', so c = 4.'],
        result: m('y = -3x + 4')
      }
    ],

    slots: [
      { name: 'Read the y-intercept', learn: 'rule',
        items: [Sci.gen(rng => {
          const L = line(rng);
          return { prompt: 'Where does this line cross the y-axis? Give the value of c.', diagram: { w: 240, h: 240 },
                   draw: d => grid(d, { lines: [{ m: L.p / L.q, c: L.c }] }),
                   input: { kind: 'number', answer: L.c, width: 60 },
                   explain: `The line crosses the y-axis at (0, ${L.c}), so c = ${L.c}.` };
        })] },

      { name: 'Read the gradient', learn: 'gradient',
        items: [Sci.gen(rng => {
          const L = line(rng);
          const [[x1, y1], [x2, y2]] = L.pts[1][0] > 0 ? L.pts : [L.pts[1], L.pts[0]];
          return { prompt: 'What is the gradient of this line? (A fraction like 1/2 is fine.)', diagram: { w: 240, h: 240 },
                   draw: d => grid(d, { lines: [{ m: L.p / L.q, c: L.c }], points: [{ at: [x1, y1] }, { at: [x2, y2] }] }),
                   input: { kind: 'number', answer: L.p / L.q, tol: 0.001, decimal: true, width: 70 },
                   explain: `From (${x1}, ${y1}) to (${x2}, ${y2}): ${y2 - y1 >= 0 ? 'rise' : 'fall'} ${Math.abs(y2 - y1)}, run ${x2 - x1}. ` +
                            m(`m = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${texM(L.p, L.q)}`) + '.' };
        })] },

      { name: 'The equation from a graph', learn: 'rule',
        items: [Sci.gen(rng => {
          const L = line(rng);
          return { prompt: 'Find the equation of this line. (Use a negative number for a negative c.)', diagram: { w: 240, h: 240 },
                   draw: d => grid(d, { lines: [{ m: L.p / L.q, c: L.c }], points: L.pts.map(at => ({ at })) }),
                   input: { kind: 'fill', parts: [{ text: m('y =') }, { input: { answer: L.p / L.q, tol: 0.001, width: 56 } }, { text: m('x\\ +') }, { input: { answer: L.c, width: 56 } }] },
                   explain: `c = ${L.c} (where it crosses the y-axis). Between the marked points, ` + m(`m = ${texM(L.p, L.q)}`) + '. So ' + m(rule(L.p, L.q, L.c)) + '.' };
        })] },

      { name: 'Up, down or flat?', learn: 'sign',
        items: [Sci.gen(rng => {
          const k = rng.pick([3, 2, -2, -4, 0]), c = rng.int(-3, 6);
          const xs = [0, 1, 2, 3], ys = xs.map(x => k * x + c);
          const ans = k > 0 ? 'Positive' : k < 0 ? 'Negative' : 'Zero';
          return C(rng, { prompt: 'This table is for a straight line. Is its gradient positive, negative or zero?' + Sci.table(['x', ...xs.map(String)], [['y', ...ys.map(String)]]),
            right: ans, options: ['Positive', 'Negative', 'Zero'], wide: false,
            explain: k === 0 ? 'y does not change, so the line is flat: gradient 0.' : `y ${k > 0 ? 'goes up' : 'goes down'} by ${Math.abs(k)} each time x goes up by 1, so the gradient is ${k}.` });
        })] },

      { name: 'Gradient from two points', learn: 'gradient',
        items: [Sci.gen(rng => {
          const [p, q] = rng.pick(GRADS), x1 = rng.int(-4, 3), y1 = rng.int(-5, 5), k = rng.int(1, 2);
          const x2 = x1 + q * k, y2 = y1 + p * k;
          return { prompt: `What is the gradient of the line through (${x1}, ${y1}) and (${x2}, ${y2})?`,
                   input: { kind: 'number', answer: p / q, tol: 0.001, decimal: true, width: 70 },
                   explain: m(`m = \\dfrac{${y2} - ${y1 < 0 ? `(${y1})` : y1}}{${x2} - ${x1 < 0 ? `(${x1})` : x1}} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${texM(p, q)}`) + '.' };
        })] },

      { name: 'Horizontal and vertical', learn: 'sign',
        items: [Sci.gen(rng => {
          const v = rng.chance(), b = rng.int(-4, 4) || 3;
          return C(rng, { prompt: `What is the equation of this ${v ? 'vertical' : 'horizontal'} line?`, diagram: { w: 220, h: 220 },
            draw: d => grid(d, { lines: [v ? { x: b } : { m: 0, c: b }] }),
            right: v ? m(`x = ${b}`) : m(`y = ${b}`), options: [m(`x = ${b}`), m(`y = ${b}`), m(`y = ${b}x`), m(`y = x + ${b}`)], wide: false,
            explain: v ? `Every point on it has x = ${b}, whatever y is.` : `Every point on it has y = ${b}: the gradient is 0.` });
        })] },

      { name: 'Which is steeper?', learn: 'sign',
        items: [Sci.gen(rng => {
          const pairs = [[2, 5], [-4, 3], [0.5, -2], [3, -1], [-5, 4], [1, -3]];
          const [a, b] = rng.pick(pairs), c1 = rng.int(-3, 3), c2 = rng.int(-3, 3);
          const A = m(lin(a, c1)), B = m(lin(b, c2));
          return C(rng, { prompt: `Which line is steeper: A, ${A}, or B, ${B}?`, right: Math.abs(a) > Math.abs(b) ? 'A' : 'B', options: ['A', 'B'], wide: false,
            explain: `Steepness is the size of m, ignoring its sign: |${a}| ${Math.abs(a) > Math.abs(b) ? '>' : '<'} |${b}|. The intercepts do not matter.` });
        })] },

      { name: 'Using the rule', learn: 'table',
        items: [Sci.gen(rng => {
          const k = rng.pick([2, 3, -2, 4, -3, 5]), c = rng.int(-6, 6), x = rng.int(-4, 6);
          return { prompt: `On the line ${m(lin(k, c))}, what is y when x = ${x}?`,
                   input: { kind: 'number', answer: k * x + c, width: 70 },
                   explain: m(`y = ${k} \\times ${x < 0 ? `(${x})` : x}${c === 0 ? '' : c < 0 ? ` - ${-c}` : ` + ${c}`} = ${k * x + c}`) + '.' };
        })] },

      { name: 'Find the mistake', learn: 'gradient',
        items: [Sci.gen(rng => {
          const [p, q] = rng.pick(GRADS.filter(g => g[0] !== g[1] && g[0] !== 0 && Math.abs(g[0]) !== Math.abs(g[1]))), x1 = rng.int(0, 2), y1 = rng.int(-2, 2);
          const x2 = x1 + 2 * q, y2 = y1 + 2 * p;
          return Sci.spot(rng, { prompt: `A student finds the gradient of the line through (${x1}, ${y1}) and (${x2}, ${y2}). Which line is wrong?`,
            lines: [`Rise: ${y2} − ${y1 < 0 ? `(${y1})` : y1} = ${y2 - y1}`, `Run: ${x2} − ${x1} = ${x2 - x1}`, m(`m = \\dfrac{\\text{run}}{\\text{rise}} = \\dfrac{${x2 - x1}}{${y2 - y1}}`), m(`m = ${num((x2 - x1) / (y2 - y1))}`)], wrong: 2,
            explain: 'Gradient is rise over run, not run over rise: ' + m(`m = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${texM(p, q)}`) + '.' });
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Equation through two points', learn: 'two',
        items: [Sci.gen(rng => {
          const [p, q] = rng.pick(GRADS.filter(g => g[1] === 1)), c = rng.int(-5, 5), x1 = rng.int(-3, 0), x2 = x1 + rng.int(2, 4);
          const y1 = p * x1 + c, y2 = p * x2 + c;
          return { prompt: `Find the equation of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`,
                   input: { kind: 'fill', parts: [{ text: m('y =') }, { input: { answer: p, width: 56 } }, { text: m('x\\ +') }, { input: { answer: c, width: 56 } }] },
                   explain: m(`m = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${p}`) + '. Substitute ' + `(${x2}, ${y2}): ` + m(`${y2} = ${p} \\times ${x2 < 0 ? `(${x2})` : x2} + c`) + `, so c = ${c}. ` + m(rule(p, 1, c)) + '.' };
        })] },

      { challenge: 'only', name: 'Gradient and a point', learn: 'two',
        items: [Sci.gen(rng => {
          const k = rng.pick([2, 3, -2, -4, 5]), c = rng.int(-6, 6), x = rng.int(1, 5);
          return { prompt: `A line has gradient ${k} and passes through (${x}, ${k * x + c}). What is its y-intercept, c?`,
                   input: { kind: 'number', answer: c, width: 60 },
                   explain: m(`${k * x + c} = ${k} \\times ${x} + c`) + `, so c = ${k * x + c} − ${k * x} = ${c}.` };
        })] },

      { challenge: 'only', name: 'In a straight line?', learn: 'gradient',
        items: [Sci.gen(rng => {
          const k = rng.pick([2, 3, -1, -2]), c = rng.int(-3, 3), yes = rng.chance();
          const P = [0, c], Q = [2, 2 * k + c], R = [4, 4 * k + c + (yes ? 0 : rng.pick([-1, 1]))];
          const g1 = (Q[1] - P[1]) / 2, g2 = (R[1] - Q[1]) / 2;
          return C(rng, { prompt: `Do the points (${P}), (${Q}) and (${R}) lie on one straight line? Choose the reason that shows it.`,
            right: yes ? `Yes: the gradient from the first to the second and from the second to the third are both ${num(g1)}` : `No: the gradients are ${num(g1)} and ${num(g2)}, which differ`,
            wrong: yes ? ['No: the y values are not equally spaced', 'Yes: all three y values are whole numbers'] : ['Yes: the x values go up by 2 each time', 'Yes: they all have whole-number coordinates'],
            explain: 'Three points are in a straight line exactly when the gradient between each pair is the same.' });
        })] },

      { challenge: 'only', name: 'Lines in context', learn: 'context',
        items: [Sci.gen(rng => {
          const rate = rng.pick([2.5, 3, 3.5]), flag = rng.pick([3, 4, 5]), d = rng.int(4, 15);
          return { prompt: `A taxi fare is ${m(`C = ${rate}d + ${flag}`)} dollars for a trip of d km. A fare was $${num(rate * d + flag)}. How far was the trip?`,
                   input: { kind: 'number', answer: d, suffix: 'km', width: 60 },
                   explain: m(`${num(rate * d + flag)} = ${rate}d + ${flag}`) + ', so ' + m(`${rate}d = ${num(rate * d)}`) + ` and d = ${d} km. The gradient, $${rate}, is the cost per km; the intercept, $${flag}, the flag fall.` };
        })] }
    ]
  });
})();
