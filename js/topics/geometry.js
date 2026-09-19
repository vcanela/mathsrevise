'use strict';
// ── Maths Revise · Unit 3 topics ────────────────────────────────────────────
// Angles, triangles, parallel lines, polygons, circles and solids.
//
// Every diagram here is built from the numbers in the question. Where a shape
// is drawn first and measured afterwards, the labels are read off the finished
// drawing, so a student who estimates from the picture gets the same answer as
// one who uses the rule.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});
  const m = Fmt.tex;
  const deg = n => Fmt.num(n) + '°';

  /** Round to whole degrees, for labels read off a measured shape. */
  const r0 = v => Math.round(v);

  // ═══ 3.1 Angle types and rules ════════════════════════════════════════════
  Topics.u3e1 = {
    id: 'u3e1', unit: 3,
    title: 'Angle Types and Rules',
    blurb: 'Naming angles, and the two rules that let you find a missing one.',
    hint: 'Angles on a straight line add to 180°. Angles round a full point add to 360°. Name by size: under 90° acute, exactly 90° right, between 90° and 180° obtuse, over 180° reflex.',

    examples: [
      {
        title: 'Example 1: naming by size',
        diagram: { w: 240, h: 150, caption: 'Less than 90°, so this one is acute' },
        draw(d) {
          Dia.angleFan(d, { rays: [0, 40], marks: [{ from: 0, to: 1, label: '40°' }] });
        },
        steps: [
          'Under 90° is <strong>acute</strong>; exactly 90° is a <strong>right angle</strong>.',
          'Between 90° and 180° is <strong>obtuse</strong>; exactly 180° is a <strong>straight angle</strong>.',
          'More than 180° is <strong>reflex</strong>.'
        ]
      },
      {
        title: 'Example 2: angles on a straight line',
        diagram: { w: 250, h: 150 },
        draw(d) {
          Dia.angleFan(d, {
            rays: [0, 115, 180], baseline: true,
            marks: [{ from: 0, to: 1, label: '115°' }, { from: 1, to: 2, label: '?', unknown: true, r: 34 }]
          });
        },
        steps: [
          'The two angles together make a straight line, so they add to 180°.',
          'Subtract what you know: \\(180 - 115 = 65\\).',
          'Check: \\(115 + 65 = 180\\). ✓'
        ],
        result: 'Answer: 65°'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: name the drawn angle.
      const usedTypes = [];
      for (let i = 0; i < 2; i++) {
        const kind = rng.pick(['acute angle', 'obtuse angle', 'reflex angle', 'right angle'].filter(k => !usedTypes.includes(k)));
        usedTypes.push(kind);
        const a = kind === 'right angle' ? 90
                : kind === 'acute angle' ? rng.int(15, 80)
                : kind === 'obtuse angle' ? rng.int(100, 170)
                : rng.int(200, 330);
        const reflex = a > 180;
        out.push({
          prompt: 'What kind of angle is marked?',
          diagram: { w: 210, h: 150 },
          draw: d => Dia.angleFan(d, {
            rays: [0, reflex ? 360 - a : a],
            marks: [reflex ? { from: 1, to: 0, label: deg(a), r: 30 } : { from: 0, to: 1, label: deg(a) }]
          }),
          input: {
            kind: 'choice',
            options: ['acute angle', 'right angle', 'obtuse angle', 'reflex angle'],
            correct: ['acute angle', 'right angle', 'obtuse angle', 'reflex angle'].indexOf(kind)
          },
          explain: `<span class="work">${deg(a)} is ${Fmt.an(kind)}.</span>`
        });
      }

      // Q3: match sizes to names.
      (() => {
        const picks = [
          { a: rng.int(20, 80),   name: 'acute' },
          { a: 90,                name: 'right' },
          { a: rng.int(100, 170), name: 'obtuse' },
          { a: rng.int(190, 340), name: 'reflex' }
        ];
        const left = picks.map(p => deg(p.a));
        const order = rng.shuffle([0, 1, 2, 3]);
        const right = order.map(i => picks[i].name);
        out.push({
          prompt: 'Match each angle to its name.',
          input: { kind: 'match', left, right, tags: ['A', 'B', 'C', 'D'], answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
          explain: '<span class="work">Acute &lt; 90°, right = 90°, obtuse between 90° and 180°, reflex &gt; 180°.</span>'
        });
      })();

      // Q4–5: angles on a straight line.
      for (let i = 0; i < 2; i++) {
        const known = hard || i === 1 ? rng.int(25, 155) : rng.int(30, 150);
        out.push({
          prompt: 'Find the missing angle on the straight line.',
          diagram: { w: 240, h: 145 },
          draw: d => Dia.angleFan(d, {
            rays: [0, known, 180], baseline: true,
            marks: [{ from: 0, to: 1, label: deg(known) }, { from: 1, to: 2, label: 'x', unknown: true, r: 36 }]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: 180 - known, width: 76 },
          explain: `<span class="work">\\(180 - ${known} = ${180 - known}\\)</span>`
        });
      }

      // Q6: angles at a point.
      (() => {
        const parts = rng.partition(360, 3, 50);
        const a1 = parts[0], a2 = parts[1], a3 = parts[2];
        out.push({
          prompt: 'The three angles meet at a point. Find ' + m('x') + '.',
          diagram: { w: 230, h: 175 },
          draw: d => Dia.angleFan(d, {
            lowCentre: false,
            rays: [0, a1, a1 + a2],
            marks: [
              { from: 0, to: 1, label: deg(a1) },
              { from: 1, to: 2, label: deg(a2) },
              { from: 2, to: 0, label: 'x', unknown: true, r: 30 }
            ]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: a3, width: 76 },
          explain: `<span class="work">Angles at a point add to 360°: \\(360 - ${a1} - ${a2} = ${a3}\\)</span>`
        });
      })();

      // Q7: spot the mistake — used 360 instead of 180.
      (() => {
        const known = rng.int(40, 140);
        const lines = [
          'The two angles are on a straight line.',
          m(`x + ${known} = 360`),
          m(`x = 360 - ${known}`),
          m(`x = ${360 - known}`)
        ];
        out.push({
          prompt: 'Somebody found the missing angle on a straight line like this.',
          diagram: { w: 220, h: 135 },
          draw: d => Dia.angleFan(d, {
            rays: [0, known, 180], baseline: true,
            marks: [{ from: 0, to: 1, label: deg(known) }, { from: 1, to: 2, label: 'x', unknown: true, r: 34 }]
          }),
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 used 360° instead of 180°. On a straight line \\(x + ${known} = 180\\), so \\(x = ${180 - known}\\).</span>`
        });
      })();

      // Q8: complementary or supplementary.
      (() => {
        const a = rng.int(20, 70);
        const comp = rng.chance();
        out.push({
          prompt: comp
            ? `Two angles are <strong>complementary</strong> and one of them is ${deg(a)}. What is the other?`
            : `Two angles are <strong>supplementary</strong> and one of them is ${deg(a + 40)}. What is the other?`,
          note: comp ? 'Complementary angles add to 90°.' : 'Supplementary angles add to 180°.',
          input: { kind: 'number', suffix: '°', answer: comp ? 90 - a : 180 - (a + 40), width: 76 },
          explain: comp
            ? `<span class="work">\\(90 - ${a} = ${90 - a}\\)</span>`
            : `<span class="work">\\(180 - ${a + 40} = ${180 - a - 40}\\)</span>`
        });
      })();

      // Q9: three angles on a straight line.
      (() => {
        const parts = rng.partition(180, 3, 35);
        out.push({
          prompt: 'Three angles sit on a straight line. Find ' + m('x') + '.',
          tag: 'Challenge',
          diagram: { w: 250, h: 145 },
          draw: d => Dia.angleFan(d, {
            rays: [0, parts[0], parts[0] + parts[1], 180], baseline: true,
            marks: [
              { from: 0, to: 1, label: deg(parts[0]) },
              { from: 1, to: 2, label: deg(parts[1]), r: 44 },
              { from: 2, to: 3, label: 'x', unknown: true }
            ]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: parts[2], width: 76 },
          explain: `<span class="work">\\(180 - ${parts[0]} - ${parts[1]} = ${parts[2]}\\)</span>`
        });
      })();

      // Q10: equal angles round a point.
      (() => {
        const n = rng.pick([4, 5, 6, 8]);
        const each = 360 / n;
        out.push({
          prompt: `${n} equal angles meet at a point. How big is each one?`,
          tag: 'Challenge',
          diagram: { w: 200, h: 175 },
          draw: d => Dia.angleFan(d, {
            lowCentre: false,
            rays: Array.from({ length: n }, (_, i) => i * each),
            marks: [{ from: 0, to: 1, label: '?', unknown: true, r: 26 }]
          }),
          input: { kind: 'number', suffix: '°', answer: each, width: 76 },
          explain: `<span class="work">\\(360 \\div ${n} = ${each}\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 3.2 Angles in triangles ══════════════════════════════════════════════
  Topics.u3e2 = {
    id: 'u3e2', unit: 3,
    title: 'Angles in Triangles',
    blurb: 'The three angles of any triangle add to 180°, and what follows from that.',
    hint: 'The three interior angles always total 180°. In an isosceles triangle the two angles opposite the equal sides are equal. An exterior angle equals the two interior angles it is not next to, added together.',

    examples: [
      {
        title: 'Example 1: the angles add to 180°',
        diagram: { w: 240, h: 170 },
        draw(d, G) {
          const p = G.fit(G.triangleFromAngles(50, 70, 60), 240, 170, 34);
          d.polygon(p);
          d.angleArc(p, 0, { label: '50°' });
          d.angleArc(p, 1, { label: '70°', colour: 'var(--dia-known)' });
          d.angleArc(p, 2, { label: '60°', colour: 'var(--dia-unknown)' });
        },
        steps: [
          'This triangle really is drawn with these three angles.',
          '\\(50 + 70 + 60 = 180\\).',
          'That holds for every triangle, whatever its shape.'
        ]
      },
      {
        title: 'Example 2: finding the third angle',
        diagram: { w: 240, h: 170 },
        draw(d, G) {
          const p = G.fit(G.triangleFromAngles(65, 80, 35), 240, 170, 34);
          d.polygon(p);
          d.angleArc(p, 0, { label: '65°' });
          d.angleArc(p, 1, { label: '80°', colour: 'var(--dia-known)' });
          d.angleArc(p, 2, { label: '?', unknown: true });
        },
        steps: [
          'Add the two you know: \\(65 + 80 = 145\\).',
          'Take that from 180: \\(180 - 145 = 35\\).',
          'Check: \\(65 + 80 + 35 = 180\\). ✓'
        ],
        result: 'Answer: 35°'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      /** Three whole-number angles adding to 180, none too thin to draw. */
      const triAngles = (min) => {
        min = min || 25;
        for (;;) {
          const a = rng.int(min, 180 - 2 * min);
          const b = rng.int(min, 180 - a - min);
          const c = 180 - a - b;
          if (c >= min) return rng.shuffle([a, b, c]);
        }
      };

      // Q1–3: missing angle, drawn to scale.
      for (let i = 0; i < 3; i++) {
        const A = i === 1 ? [90, 0, 0] : null;
        let ang;
        if (i === 1) { const x = rng.int(20, 70); ang = [90, x, 90 - x]; }
        else ang = triAngles(hard ? 20 : 30);
        const hide = rng.int(0, 2);
        out.push({
          prompt: 'Find the missing angle.',
          diagram: { w: 215, h: 160 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(ang[0], ang[1], ang[2]), 215, 160, 32);
            d.polygon(p);
            ang.forEach((a, k) => {
              if (k === hide) d.angleArc(p, k, { label: 'x', unknown: true });
              else d.angleArc(p, k, { label: deg(a), colour: k === 0 ? undefined : 'var(--dia-known)' });
            });
          },
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: ang[hide], width: 76 },
          explain: `<span class="work">\\(180 - ${ang.filter((_, k) => k !== hide).join(' - ')} = ${ang[hide]}\\)</span>`
        });
      }

      // Q4: isosceles.
      (() => {
        const base = rng.int(35, 75);
        const apex = 180 - 2 * base;
        const askApex = rng.chance();
        const ang = [base, base, apex];
        out.push({
          prompt: askApex
            ? 'This triangle is isosceles. Find the angle at the top.'
            : 'This triangle is isosceles. Find each of the equal base angles.',
          diagram: { w: 215, h: 165 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(base, base, apex), 215, 165, 34);
            d.polygon(p);
            d.sideTicks(p, 1, 1); d.sideTicks(p, 2, 1);
            if (askApex) {
              d.angleArc(p, 0, { label: deg(base), colour: 'var(--dia-known)' });
              d.angleArc(p, 1, { label: deg(base), colour: 'var(--dia-known)' });
              d.angleArc(p, 2, { label: 'x', unknown: true });
            } else {
              d.angleArc(p, 0, { label: 'x', unknown: true });
              d.angleArc(p, 1, { label: 'x', unknown: true });
              d.angleArc(p, 2, { label: deg(apex), colour: 'var(--dia-known)' });
            }
          },
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: askApex ? apex : base, width: 76 },
          explain: askApex
            ? `<span class="work">\\(180 - ${base} - ${base} = ${apex}\\)</span>`
            : `<span class="work">The two equal angles share what is left: \\((180 - ${apex}) \\div 2 = ${base}\\)</span>`
        });
      })();

      // Q5: name the triangle.
      (() => {
        const kinds = [
          { name: 'right-angled', make: () => { const x = rng.int(25, 65); return [90, x, 90 - x]; } },
          { name: 'obtuse',       make: () => { const a = rng.int(100, 140); const b = rng.int(20, 180 - a - 20); return [a, b, 180 - a - b]; } },
          { name: 'equilateral',  make: () => [60, 60, 60] },
          { name: 'isosceles',    make: () => { const b = rng.intExcept(35, 75, [60]); return [b, b, 180 - 2 * b]; } }
        ];
        const pick = rng.pick(kinds);
        const ang = pick.make();
        const isRight  = ang.includes(90);
        const isObtuse = ang.some(a => a > 90);
        const equal    = ang.filter((a, i) => ang.indexOf(a) !== i).length;
        const name = ang.every(a => a === 60) ? 'equilateral'
                   : isRight ? 'right-angled'
                   : isObtuse ? 'obtuse'
                   : equal ? 'isosceles' : 'scalene';
        const opts = ['equilateral', 'isosceles', 'right-angled', 'obtuse'];
        if (!opts.includes(name)) opts[3] = name;
        out.push({
          prompt: 'What kind of triangle is this?',
          diagram: { w: 200, h: 155 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(ang[0], ang[1], ang[2]), 200, 155, 32);
            d.polygon(p);
            ang.forEach((a, k) => d.angleArc(p, k, { label: deg(a), size: 12 }));
          },
          input: { kind: 'choice', options: opts, correct: opts.indexOf(name) },
          explain: `<span class="work">Its angles are ${ang.map(deg).join(', ')}.</span>`
        });
      })();

      // Q6: spot the mistake.
      (() => {
        const ang = triAngles(30);
        const [a, b, c] = ang;
        const lines = [
          `The angles of a triangle add to 180°.`,
          m(`x = ${a} + ${b}`),
          m(`x = ${a + b}`),
          m(`\\text{So the third angle is } ${a + b}°.`)
        ];
        out.push({
          prompt: `A triangle has angles ${deg(a)}, ${deg(b)} and ${m('x')}. Somebody worked it out like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 added the known angles instead of subtracting them from 180°. \\(x = 180 - ${a} - ${b} = ${c}\\).</span>`
        });
      })();

      // Q7: exterior angle.
      (() => {
        const ang = triAngles(30);
        const [a, b, c] = ang;
        const ext = 180 - c;
        out.push({
          prompt: `Two angles of a triangle are ${deg(a)} and ${deg(b)}. The exterior angle at the third corner is ${m('x')}. Find ${m('x')}.`,
          diagram: { w: 235, h: 160 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(a, b, c), 235, 160, 40);
            d.polygon(p);
            d.angleArc(p, 0, { label: deg(a) });
            d.angleArc(p, 1, { label: deg(b), colour: 'var(--dia-known)' });
            // Extend the side into the exterior angle at vertex 2.
            const u = G.norm(G.sub(p[2], p[1]));
            const far = G.add(p[2], G.scale(u, 34));
            d.line(p[2], far, { stroke: 'var(--dia-muted)', width: 1.8, dash: '4 3' });
            d.markAngle(p[2], G.dirOf(G.sub(p[0], p[2])), -(180 - c) * Math.sign(
              ((G.dirOf(G.sub(far, p[2])) - G.dirOf(G.sub(p[0], p[2])) + 360) % 360) > 180 ? 1 : -1),
              { r: 20, label: 'x', unknown: true });
          },
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: ext, width: 76 },
          explain: `<span class="work">An exterior angle equals the two opposite interior angles: \\(${a} + ${b} = ${ext}\\). (Or \\(180 - ${c} = ${ext}\\).)</span>`
        });
      })();

      // Q8: vertically opposite.
      (() => {
        const a = rng.int(25, 155);
        const askOpposite = rng.chance();
        out.push({
          prompt: askOpposite
            ? 'Two straight lines cross. Find ' + m('x') + '.'
            : 'Two straight lines cross. Find ' + m('x') + '.',
          diagram: { w: 210, h: 160 },
          draw: d => Dia.angleFan(d, {
            lowCentre: false,
            rays: [0, a, 180, 180 + a],
            marks: askOpposite
              ? [{ from: 0, to: 1, label: deg(a) }, { from: 2, to: 3, label: 'x', unknown: true, r: 34 }]
              : [{ from: 0, to: 1, label: deg(a) }, { from: 1, to: 2, label: 'x', unknown: true, r: 34 }]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: askOpposite ? a : 180 - a, width: 76 },
          explain: askOpposite
            ? `<span class="work">Vertically opposite angles are equal, so \\(x = ${a}\\).</span>`
            : `<span class="work">These two are on a straight line: \\(180 - ${a} = ${180 - a}\\).</span>`
        });
      })();

      // Q9: angles in a given ratio.
      (() => {
        const parts = rng.shuffle([rng.int(1, 3), rng.int(2, 4), rng.int(3, 6)]);
        const tot = parts.reduce((s, p) => s + p, 0);
        if (180 % tot !== 0) {
          // Fall back to a ratio that divides 180 exactly.
          const nice = rng.pick([[1, 2, 3], [2, 3, 4], [1, 1, 4], [1, 3, 5], [2, 2, 5], [1, 2, 2]]);
          const t = nice.reduce((s, p) => s + p, 0);
          const unit = 180 / t;
          const big = Math.max(...nice);
          out.push({
            prompt: `The angles of a triangle are in the ratio ${nice.join(' : ')}. How big is the largest angle?`,
            tag: 'Challenge',
            note: `The ${t} parts together make 180°.`,
            input: { kind: 'number', suffix: '°', answer: unit * big, width: 76 },
            explain: `<span class="work">\\(180 \\div ${t} = ${unit}\\) per part, so the largest is \\(${big} \\times ${unit} = ${unit * big}\\).</span>`
          });
        } else {
          const unit = 180 / tot;
          const big = Math.max(...parts);
          out.push({
            prompt: `The angles of a triangle are in the ratio ${parts.join(' : ')}. How big is the largest angle?`,
            tag: 'Challenge',
            note: `The ${tot} parts together make 180°.`,
            input: { kind: 'number', suffix: '°', answer: unit * big, width: 76 },
            explain: `<span class="work">\\(180 \\div ${tot} = ${unit}\\) per part, so the largest is \\(${big} \\times ${unit} = ${unit * big}\\).</span>`
          });
        }
      })();

      // Q10: two-step, isosceles inside a straight line.
      (() => {
        const base = rng.int(35, 70);
        const apex = 180 - 2 * base;
        out.push({
          prompt: `An isosceles triangle has base angles of ${deg(base)}. The base is extended beyond one corner. ` +
                  `Find the angle between the extension and the sloping side.`,
          tag: 'Challenge',
          diagram: { w: 245, h: 160 },
          draw: (d, G) => {
            const p = G.fit(G.triangleFromAngles(base, base, apex), 245, 160, 42);
            d.polygon(p);
            d.sideTicks(p, 1, 1); d.sideTicks(p, 2, 1);
            d.angleArc(p, 0, { label: deg(base), colour: 'var(--dia-known)' });
            d.angleArc(p, 1, { label: deg(base), colour: 'var(--dia-known)' });
            const u = G.norm(G.sub(p[1], p[0]));
            const far = G.add(p[1], G.scale(u, 36));
            d.line(p[1], far, { stroke: 'var(--dia-muted)', width: 1.8, dash: '4 3' });
            const a1 = G.dirOf(G.sub(far, p[1]));
            const a2 = G.dirOf(G.sub(p[2], p[1]));
            let span = ((a2 - a1) % 360 + 360) % 360; if (span > 180) span -= 360;
            d.markAngle(p[1], a1, span, { r: 19, label: 'x', unknown: true });
          },
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: 180 - base, width: 76 },
          explain: `<span class="work">The base angle and \\(x\\) sit on a straight line: \\(180 - ${base} = ${180 - base}\\).</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 3.3 Parallel line angles ═════════════════════════════════════════════
  Topics.u3e3 = {
    id: 'u3e3', unit: 3,
    title: 'Parallel Line Angles',
    blurb: 'Corresponding, alternate and co-interior angles on a transversal.',
    hint: 'Corresponding angles (F shape) are equal. Alternate angles (Z shape) are equal. Co-interior angles (C shape) add to 180°. All three only work when the lines really are parallel.',

    examples: [
      {
        title: 'Example 1: corresponding angles are equal',
        diagram: { w: 260, h: 175, caption: 'The same corner at each crossing: the F shape' },
        draw(d) {
          Dia.transversal(d, 62, {
            mark: [{ at: '1BR', label: '62°' }, { at: '2BR', label: '62°', colour: 'var(--dia-known)' }]
          });
        },
        steps: [
          'Both marked angles sit in the same position at their crossing.',
          'When the lines are parallel, corresponding angles are equal.',
          'So the second angle is also 62°.'
        ]
      },
      {
        title: 'Example 2: co-interior angles add to 180°',
        diagram: { w: 260, h: 175, caption: 'Between the lines, on the same side: the C shape' },
        draw(d) {
          Dia.transversal(d, 70, {
            mark: [{ at: '1BR', label: '70°' }, { at: '2TL', label: '110°', colour: 'var(--dia-known)' }]
          });
        },
        steps: [
          'These two are both between the parallel lines and on the same side of the transversal.',
          'Co-interior angles add to 180°.',
          '\\(180 - 70 = 110\\).'
        ],
        result: 'Answer: 110°'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const RELATIONS = [
        { name: 'corresponding', pairs: [['1TL', '2TL'], ['1TR', '2TR'], ['1BL', '2BL'], ['1BR', '2BR']], equal: true,
          why: 'Corresponding angles are equal.' },
        { name: 'alternate',     pairs: [['1BL', '2TR'], ['1BR', '2TL']], equal: true,
          why: 'Alternate angles are equal.' },
        { name: 'co-interior',   pairs: [['1BR', '2TR'], ['1BL', '2TL']], equal: false,
          why: 'Co-interior angles add to 180°.' }
      ];

      const angleAt = (a, pos) => {
        // The transversal makes angle `a` with the lines. Around each crossing
        // the four angles are a, 180-a, a, 180-a going round.
        const quad = pos.slice(1);
        return (quad === 'TR' || quad === 'BL') ? a : 180 - a;
      };

      // Q1–2: name the relationship.
      for (let i = 0; i < 2; i++) {
        const rel = RELATIONS[i % RELATIONS.length];
        const rel2 = rng.pick(RELATIONS);
        const use = i === 0 ? rel : rel2;
        const [p1, p2] = rng.pick(use.pairs);
        const a = rng.int(40, 75) + (rng.chance() ? 0 : 35);
        out.push({
          prompt: 'What is the relationship between the two marked angles?',
          diagram: { w: 250, h: 170 },
          draw: d => Dia.transversal(d, a, {
            mark: [{ at: p1, label: 'a' }, { at: p2, label: 'b', colour: 'var(--dia-known)' }]
          }),
          input: {
            kind: 'choice',
            options: ['corresponding', 'alternate', 'co-interior', 'vertically opposite'],
            correct: ['corresponding', 'alternate', 'co-interior', 'vertically opposite'].indexOf(use.name)
          },
          explain: `<span class="work">${use.why}</span>`
        });
      }

      // Q3–5: find the angle.
      for (let i = 0; i < 3; i++) {
        const rel = RELATIONS[i % 3];
        const [p1, p2] = rng.pick(rel.pairs);
        const a = rng.int(35, 80) + (rng.chance() ? 0 : 30);
        const known = angleAt(a, p1);
        const want  = rel.equal ? known : 180 - known;
        out.push({
          prompt: 'Find ' + m('x') + '.',
          diagram: { w: 250, h: 170 },
          draw: d => Dia.transversal(d, a, {
            mark: [{ at: p1, label: deg(known) }, { at: p2, label: 'x', unknown: true }]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: want, width: 76 },
          explain: `<span class="work">${rel.why} ${rel.equal ? `So \\(x = ${known}\\).` : `So \\(x = 180 - ${known} = ${want}\\).`}</span>`
        });
      }

      // Q6: spot the mistake — treated co-interior as equal.
      (() => {
        const a = rng.int(50, 120);
        const lines = [
          'These angles are co-interior.',
          'Co-interior angles are equal.',
          m(`x = ${a}`),
          `So ${m('x')} is ${deg(a)}.`
        ];
        out.push({
          prompt: 'Somebody worked out ' + m('x') + ' like this.',
          diagram: { w: 235, h: 165 },
          draw: d => Dia.transversal(d, a, {
            mark: [{ at: '1BR', label: deg(a) }, { at: '2TR', label: 'x', unknown: true }]
          }),
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Co-interior angles add to 180°, they are not equal. \\(x = 180 - ${a} = ${180 - a}\\).</span>`
        });
      })();

      // Q7: match the name to the shape it makes.
      (() => {
        const rows = [
          { n: 'corresponding', d: 'makes an F shape; the angles are equal' },
          { n: 'alternate',     d: 'makes a Z shape; the angles are equal' },
          { n: 'co-interior',   d: 'makes a C shape; the angles add to 180°' },
          { n: 'vertically opposite', d: 'formed where two lines cross; the angles are equal' }
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each name to what it means.',
          input: {
            kind: 'match',
            left: rows.map(r => r.n),
            right: order.map(i => rows[i].d),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: ''
        });
      })();

      // Q8–9: two-step.
      for (let i = 0; i < 2; i++) {
        const a = rng.int(40, 80) + (i ? 30 : 0);
        const known = angleAt(a, '1BR');
        out.push({
          prompt: 'Find ' + m('x') + '. You will need two steps.',
          tag: 'Challenge',
          diagram: { w: 250, h: 170 },
          draw: d => Dia.transversal(d, a, {
            mark: [{ at: '1TR', label: deg(180 - known) }, { at: '2BR', label: 'x', unknown: true }]
          }),
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: 180 - known, width: 76 },
          explain: `<span class="work">The marked angles are corresponding, so they are equal: \\(x = ${180 - known}\\).</span>`
        });
      }

      // Q10: are the lines parallel?
      (() => {
        const a = rng.int(50, 120);
        const parallel = rng.chance();
        const other = parallel ? a : a + rng.pick([-15, -10, 10, 15]);
        out.push({
          prompt: `A transversal crosses two lines. The corresponding angles measure ${deg(a)} and ${deg(other)}. ` +
                  'Are the two lines parallel?',
          tag: 'Challenge',
          input: {
            kind: 'choice',
            options: ['Yes, they must be parallel', 'No, they cannot be parallel'],
            correct: parallel ? 0 : 1
          },
          explain: parallel
            ? '<span class="work">Equal corresponding angles mean the lines are parallel.</span>'
            : `<span class="work">Corresponding angles are only equal when the lines are parallel, and ${deg(a)} ≠ ${deg(other)}.</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 3.4 Angles in polygons (new) ═════════════════════════════════════════
  Topics.u3e4 = {
    id: 'u3e4', unit: 3,
    title: 'Angles in Polygons',
    blurb: 'The interior angles of an n-sided polygon add to 180(n − 2).',
    hint: 'Split the polygon into triangles from one corner: an n-sided shape gives n − 2 triangles, each worth 180°. For a regular polygon, divide the total by n to get each angle. Exterior angles always add to 360°, whatever the shape.',

    examples: [
      {
        title: 'Example 1: why the rule is 180(n − 2)',
        diagram: { w: 230, h: 165, caption: '5 sides &rarr; 3 triangles &rarr; \\(3 \\times 180 = 540°\\)' },
        draw(d, G) {
          const p = G.fit(G.regularPolygon(5), 230, 165, 22);
          d.polygon(p);
          // Diagonals from the first vertex split it into three triangles.
          d.line(p[0], p[2], { stroke: 'var(--dia-accent)', width: 1.6, dash: '4 3' });
          d.line(p[0], p[3], { stroke: 'var(--dia-accent)', width: 1.6, dash: '4 3' });
        },
        steps: [
          'Pick one corner and join it to every other corner.',
          'A pentagon splits into 3 triangles. In general, an \\(n\\)-sided polygon splits into \\(n - 2\\).',
          'Each triangle contributes 180°, so the total is \\(180(n - 2)\\).'
        ],
        result: 'Pentagon: \\(180(5 - 2) = 540°\\)'
      },
      {
        title: 'Example 2: one angle of a regular hexagon',
        diagram: { w: 210, h: 170 },
        draw(d, G) {
          const p = G.fit(G.regularPolygon(6), 210, 170, 30);
          d.polygon(p);
          d.angleArc(p, 0, { label: '120°', r: 18, size: 11.5 });
        },
        steps: [
          'Total: \\(180(6 - 2) = 720°\\).',
          'A regular hexagon has 6 equal angles.',
          '\\(720 \\div 6 = 120\\).'
        ],
        result: 'Answer: 120°'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';
      const SIDES = hard ? [5, 6, 7, 8, 9, 10, 12] : [4, 5, 6, 7, 8];

      // Q1: sum of interior angles.
      (() => {
        const n = rng.pick(SIDES);
        out.push({
          prompt: `What do the interior angles of ${Fmt.an(Fmt.polyName(n))} (${n} sides) add up to?`,
          diagram: { w: 175, h: 150 },
          draw: (d, G) => {
            const p = G.fit(G.regularPolygon(n, { rotate: rng.int(0, 30) }), 175, 150, 18);
            d.polygon(p);
          },
          input: { kind: 'number', suffix: '°', answer: 180 * (n - 2), width: 84 },
          explain: `<span class="work">\\(180(${n} - 2) = 180 \\times ${n - 2} = ${180 * (n - 2)}\\)</span>`
        });
      })();

      // Q2: which formula?
      (() => {
        const opts = rng.shuffle([
          { html: m('180(n - 2)'), right: true },
          { html: m('180n - 2'),   right: false },
          { html: m('360(n - 2)'), right: false },
          { html: m('180(n + 2)'), right: false }
        ]);
        out.push({
          prompt: 'Which formula gives the sum of the interior angles of a polygon with ' + m('n') + ' sides?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: '<span class="work">The shape splits into \\(n - 2\\) triangles, each worth 180°.</span>'
        });
      })();

      // Q3–4: missing angle in an irregular polygon, built to have exact angles.
      for (let i = 0; i < 2; i++) {
        const n = rng.pick(hard ? [5, 6, 7] : [4, 5]);
        const total = 180 * (n - 2);
        // Whole-number angles, none too sharp or too flat to draw clearly.
        let angles = null;
        for (let t = 0; t < 400 && !angles; t++) {
          const a = rng.partition(total - 50 * n, n, 0).map(v => v + 50);
          if (a.every(v => v >= 50 && v <= 165)) angles = a;
        }
        if (!angles) angles = new Array(n).fill(total / n);
        const pts = Geo.polygonFromAngles(angles, rng);
        if (!pts) { i--; continue; }
        const hide = rng.int(0, n - 1);
        out.push({
          prompt: `Find the missing angle in this ${Fmt.polyName(n)}.`,
          diagram: { w: 250, h: 200 },
          draw: (d, G) => {
            const p = G.fit(pts, 250, 200, 44);
            d.polygon(p);
            // Labels are read back off the finished shape, never assumed.
            const measured = G.interiorAngles(p);
            measured.forEach((a, k) => {
              if (k === hide) d.angleArc(p, k, { label: 'x', unknown: true, size: 12, gap: 11 });
              else d.angleArc(p, k, { label: deg(r0(a)), size: 11.5, gap: 11, colour: 'var(--dia-known)' });
            });
          },
          input: { kind: 'number', prefix: m('x') + ' =', suffix: '°', answer: angles[hide], width: 78 },
          explain: `<span class="work">The angles total \\(180(${n} - 2) = ${total}\\). Subtract the ones shown: \\(${total} - ${angles.filter((_, k) => k !== hide).join(' - ')} = ${angles[hide]}\\).</span>`
        });
      }

      // Q5: one angle of a regular polygon.
      (() => {
        const n = rng.pick([5, 6, 8, 9, 10, 12]);
        const each = 180 * (n - 2) / n;
        out.push({
          prompt: `How big is each interior angle of a <strong>regular</strong> ${Fmt.polyName(n)}?`,
          diagram: { w: 175, h: 155 },
          draw: (d, G) => {
            const p = G.fit(G.regularPolygon(n), 175, 155, 20);
            d.polygon(p);
            d.angleArc(p, 0, { label: '?', unknown: true, r: 14, size: 11 });
          },
          input: { kind: 'number', suffix: '°', answer: each, tol: 0.01, decimal: !Number.isInteger(each), width: 84 },
          explain: `<span class="work">\\(180(${n} - 2) = ${180 * (n - 2)}\\), then \\(${180 * (n - 2)} \\div ${n} = ${Fmt.dp(each, 2)}\\)</span>`
        });
      })();

      // Q6: find n from the angle sum.
      (() => {
        const n = rng.pick([5, 6, 7, 8, 9, 10, 11, 12]);
        out.push({
          prompt: `The interior angles of a polygon add to ${deg(180 * (n - 2))}. How many sides does it have?`,
          note: 'Solve ' + m(`180(n - 2) = ${180 * (n - 2)}`) + ' for ' + m('n') + '.',
          input: { kind: 'number', prefix: m('n') + ' =', answer: n, width: 76 },
          explain: `<span class="work">\\(${180 * (n - 2)} \\div 180 = ${n - 2}\\), so \\(n - 2 = ${n - 2}\\) and \\(n = ${n}\\).</span>`
        });
      })();

      // Q7: exterior angle of a regular polygon.
      (() => {
        const n = rng.pick([5, 6, 8, 9, 10, 12]);
        out.push({
          prompt: `How big is each <strong>exterior</strong> angle of a regular ${Fmt.polyName(n)}?`,
          note: 'The exterior angles of any polygon add to 360°.',
          diagram: { w: 190, h: 165 },
          draw: (d, G) => {
            const p = G.fit(G.regularPolygon(n), 190, 165, 34);
            d.polygon(p);
            const u = G.norm(G.sub(p[0], p[n - 1]));
            const far = G.add(p[0], G.scale(u, 26));
            d.line(p[0], far, { stroke: 'var(--dia-muted)', width: 1.6, dash: '4 3' });
            const a1 = G.dirOf(G.sub(far, p[0]));
            const a2 = G.dirOf(G.sub(p[1], p[0]));
            let span = ((a2 - a1) % 360 + 360) % 360; if (span > 180) span -= 360;
            d.markAngle(p[0], a1, span, { r: 15, label: '?', unknown: true, size: 12 });
          },
          input: { kind: 'number', suffix: '°', answer: 360 / n, tol: 0.01, decimal: !Number.isInteger(360 / n), width: 84 },
          explain: `<span class="work">\\(360 \\div ${n} = ${Fmt.dp(360 / n, 2)}\\)</span>`
        });
      })();

      // Q8: spot the mistake — 180n instead of 180(n-2).
      (() => {
        const n = rng.pick([5, 6, 7, 8]);
        const lines = [
          `The shape has ${n} sides.`,
          m(`\\text{Sum} = 180 \\times ${n}`),
          m(`\\text{Sum} = ${180 * n}°`),
          `Each angle of the regular ${Fmt.polyName(n)} is ${m(`${180 * n} \\div ${n} = 180`)}°.`
        ];
        out.push({
          prompt: `Somebody found the angle sum of ${Fmt.an(Fmt.polyName(n))} like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 forgot the \\(-2\\). It should be \\(180(${n} - 2) = ${180 * (n - 2)}°\\), making each angle \\(${Fmt.dp(180 * (n - 2) / n, 2)}°\\).</span>`
        });
      })();

      // Q9: find n from one interior angle.
      (() => {
        const n = rng.pick([6, 8, 9, 10, 12]);
        const each = 180 * (n - 2) / n;
        out.push({
          prompt: `Each interior angle of a regular polygon is ${deg(each)}. How many sides does it have?`,
          tag: 'Challenge',
          note: 'Try the exterior angle: it is ' + m(`180 - ${each}`) + ', and they add to 360°.',
          input: { kind: 'number', prefix: m('n') + ' =', answer: n, width: 76 },
          explain: `<span class="work">Exterior angle \\(= 180 - ${each} = ${180 - each}\\). Then \\(360 \\div ${180 - each} = ${n}\\).</span>`
        });
      })();

      // Q10: match polygons to their angle sums.
      (() => {
        const ns = rng.sample([4, 5, 6, 7, 8, 9, 10], 4);
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each polygon to the sum of its interior angles.',
          tag: 'Challenge',
          input: {
            kind: 'match',
            left:  ns.map(n => Fmt.polyName(n) + ' (' + n + ' sides)'),
            right: order.map(i => deg(180 * (ns[i] - 2))),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: '<span class="work">Each one is \\(180(n - 2)\\).</span>'
        });
      })();

      return out;
    }
  };

  // ═══ 3.5 Parts of a circle ════════════════════════════════════════════════
  Topics.u3e5 = {
    id: 'u3e5', unit: 3,
    title: 'Parts of a Circle',
    blurb: 'Naming the lines, curves and regions of a circle.',
    hint: 'A chord joins two points on the circle; a diameter is the chord that passes through the centre. An arc is a piece of the circumference. A sector is the pizza slice; a segment is what a chord cuts off.',

    examples: [
      {
        title: 'Example 1: radius and diameter',
        diagram: { w: 190, h: 165, caption: 'A diameter passes through the centre' },
        draw(d) { Dia.circlePart(d, 'diameter'); },
        steps: [
          'The <strong>radius</strong> goes from the centre to the edge.',
          'The <strong>diameter</strong> goes right across, through the centre.',
          'The diameter is always twice the radius.'
        ]
      },
      {
        title: 'Example 2: sector and segment',
        diagram: { w: 190, h: 165, caption: 'A sector is bounded by two radii and an arc' },
        draw(d) { Dia.circlePart(d, 'sector'); },
        steps: [
          'A <strong>sector</strong> is cut by two radii, like a slice of pizza.',
          'A <strong>segment</strong> is cut off by a single straight chord.',
          'Both are regions; an arc is just the curved edge.'
        ]
      }
    ],

    generate(rng, diff) {
      const out = [];
      const NAMES = ['radius', 'diameter', 'chord', 'circumference', 'tangent', 'arc', 'sector', 'segment'];
      const DEFS = {
        radius: 'a straight line from the centre to the edge',
        diameter: 'a straight line right across, through the centre',
        chord: 'a straight line joining two points on the circle',
        circumference: 'the distance all the way round the edge',
        tangent: 'a straight line that touches the circle at exactly one point',
        arc: 'a piece of the curved edge',
        sector: 'a region between two radii and an arc',
        segment: 'a region cut off by a chord'
      };

      // Q1–5: name the highlighted part.
      const chosen = rng.sample(NAMES, 5);
      chosen.forEach(part => {
        const distractors = rng.sample(NAMES.filter(n => n !== part), 3);
        const opts = rng.shuffle([part, ...distractors]);
        out.push({
          prompt: 'What is the highlighted part called?',
          diagram: { w: 165, h: 150 },
          draw: d => Dia.circlePart(d, part),
          input: { kind: 'choice', options: opts, correct: opts.indexOf(part) },
          explain: `<span class="work">A <strong>${part}</strong> is ${DEFS[part]}.</span>`
        });
      });

      // Q6: match names to definitions.
      (() => {
        const picks = rng.sample(NAMES, 4);
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each name to its meaning.',
          input: {
            kind: 'match',
            left: picks,
            right: order.map(i => DEFS[picks[i]]),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: ''
        });
      })();

      // Q7–8: radius and diameter arithmetic.
      for (let i = 0; i < 2; i++) {
        const r = rng.int(3, 24);
        const fromRadius = i === 0;
        out.push({
          prompt: fromRadius
            ? `A circle has a radius of ${r} cm. What is its diameter?`
            : `A circle has a diameter of ${2 * r} cm. What is its radius?`,
          input: { kind: 'number', suffix: 'cm', answer: fromRadius ? 2 * r : r, width: 76 },
          explain: fromRadius
            ? `<span class="work">\\(2 \\times ${r} = ${2 * r}\\)</span>`
            : `<span class="work">\\(${2 * r} \\div 2 = ${r}\\)</span>`
        });
      }

      // Q9: true or false about a diameter.
      (() => {
        const claims = [
          { text: 'Every diameter is also a chord.',        ok: true,  why: 'A diameter joins two points on the circle, so it is a chord — the longest one.' },
          { text: 'Every chord is also a diameter.',        ok: false, why: 'Only chords that pass through the centre are diameters.' },
          { text: 'A tangent crosses the circle twice.',    ok: false, why: 'A tangent touches at exactly one point.' },
          { text: 'A sector is bounded by two radii.',      ok: true,  why: 'Two radii and the arc between them.' },
          { text: 'An arc is a straight line.',             ok: false, why: 'An arc is part of the curved edge.' }
        ];
        const c = rng.pick(claims);
        out.push({
          prompt: 'True or false? <em>' + c.text + '</em>',
          tag: 'Challenge',
          input: { kind: 'choice', options: ['True', 'False'], correct: c.ok ? 0 : 1 },
          explain: `<span class="work">${c.why}</span>`
        });
      })();

      // Q10: perimeter of a sector in words.
      (() => {
        const opts = rng.shuffle([
          { html: 'two radii and an arc', right: true },
          { html: 'two chords and an arc', right: false },
          { html: 'a chord and an arc',    right: false },
          { html: 'three radii',           right: false }
        ]);
        out.push({
          prompt: 'The edge of a <strong>sector</strong> is made up of what?',
          tag: 'Challenge',
          diagram: { w: 150, h: 135 },
          draw: d => Dia.circlePart(d, 'sector'),
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: '<span class="work">Two straight radii, plus the arc joining their ends.</span>'
        });
      })();

      return out;
    }
  };

  // ═══ 3.6 Nets and scale factors ═══════════════════════════════════════════
  const SOLIDS = {
    cube:            { name: 'cube',                   faces: 6, edges: 12, vertices: 8 },
    cuboid:          { name: 'cuboid',                 faces: 6, edges: 12, vertices: 8 },
    squarePyramid:   { name: 'square-based pyramid',   faces: 5, edges: 8,  vertices: 5 },
    triangularPrism: { name: 'triangular prism',       faces: 5, edges: 9,  vertices: 6 },
    openBox:         { name: 'open box (no lid)',      faces: 5, edges: 12, vertices: 8 }
  };

  Topics.u3e6 = {
    id: 'u3e6', unit: 3,
    title: 'Nets and Scale Factors',
    blurb: 'Folding flat shapes into solids, and what enlargement does to lengths and areas.',
    hint: 'A net is the solid unfolded. Count faces on the net to count faces on the solid. Under a scale factor k every length is multiplied by k, and every area by k².',

    examples: [
      {
        title: 'Example 1: the net of a cube',
        diagram: { w: 210, h: 165, caption: 'Six squares, folding into a cube' },
        draw(d) { Dia.net(d, 'cube'); },
        steps: [
          'Count the squares: six of them, one for each face.',
          'Folding the four in a row makes the sides; the other two become top and bottom.',
          'A cube has 6 faces, 12 edges and 8 vertices.'
        ]
      },
      {
        title: 'Example 2: enlarging by a scale factor of 3',
        steps: [
          'Every length is multiplied by 3: a 4 cm side becomes 12 cm.',
          'Area is length × width, so both are tripled: the area is multiplied by \\(3^2 = 9\\).',
          'A 4 cm by 5 cm rectangle has area 20 cm²; the enlargement is 12 cm by 15 cm, area 180 cm². And \\(20 \\times 9 = 180\\). ✓'
        ]
      }
    ],

    generate(rng, diff) {
      const out = [];
      const kinds = Object.keys(SOLIDS);

      // Q1–3: which solid does this net fold into?
      rng.sample(kinds, 3).forEach(k => {
        const wrong = rng.sample(kinds.filter(x => x !== k), 3).map(x => SOLIDS[x].name);
        const opts = rng.shuffle([SOLIDS[k].name, ...wrong]);
        out.push({
          prompt: 'Which solid does this net fold into?',
          diagram: { w: 180, h: 160 },
          draw: d => Dia.net(d, k),
          input: { kind: 'choice', options: opts, correct: opts.indexOf(SOLIDS[k].name), wide: true },
          explain: `<span class="work">It has ${SOLIDS[k].faces} faces, which makes ${Fmt.an(SOLIDS[k].name)}.</span>`
        });
      });

      // Q4: count faces, edges and vertices.
      (() => {
        const k = rng.pick(kinds);
        const s = SOLIDS[k];
        out.push({
          prompt: `How many faces, edges and vertices does ${Fmt.an(s.name)} have?`,
          diagram: { w: 165, h: 145 },
          draw: d => Dia.net(d, k),
          input: {
            kind: 'fill',
            parts: [
              { text: 'Faces' },    { input: { answer: s.faces, width: 58 } },
              { text: 'Edges' },    { input: { answer: s.edges, width: 58 } },
              { text: 'Vertices' }, { input: { answer: s.vertices, width: 58 } }
            ]
          },
          explain: `<span class="work">${s.faces} faces, ${s.edges} edges, ${s.vertices} vertices. (Check: \\(F + V - E = ${s.faces} + ${s.vertices} - ${s.edges} = 2\\).)</span>`
        });
      })();

      // Q5–6: enlarge a length.
      for (let i = 0; i < 2; i++) {
        const k = rng.int(2, 5), L = rng.int(3, 14);
        const reverse = i === 1;
        out.push({
          prompt: reverse
            ? `A shape is enlarged by a scale factor of ${k}. A side on the enlargement is ${L * k} cm. How long was it originally?`
            : `A shape is enlarged by a scale factor of ${k}. A side of ${L} cm becomes how long?`,
          input: { kind: 'number', suffix: 'cm', answer: reverse ? L : L * k, width: 76 },
          explain: reverse
            ? `<span class="work">\\(${L * k} \\div ${k} = ${L}\\)</span>`
            : `<span class="work">\\(${L} \\times ${k} = ${L * k}\\)</span>`
        });
      }

      // Q7: area under enlargement.
      (() => {
        const k = rng.int(2, 4), A = rng.int(4, 20);
        out.push({
          prompt: `A shape of area ${A} cm² is enlarged by a scale factor of ${k}. What is the new area?`,
          note: 'Area scales by the square of the scale factor.',
          input: { kind: 'number', suffix: 'cm²', answer: A * k * k, width: 84 },
          explain: `<span class="work">\\(${A} \\times ${k}^2 = ${A} \\times ${k * k} = ${A * k * k}\\)</span>`
        });
      })();

      // Q8: spot the mistake — scaled area by k instead of k².
      (() => {
        const k = rng.int(2, 4), A = rng.int(5, 15);
        const lines = [
          `The scale factor is ${k}.`,
          m(`\\text{New area} = ${A} \\times ${k}`),
          m(`\\text{New area} = ${A * k}\\text{ cm}^2`),
          `So the enlarged shape has area ${A * k} cm².`
        ];
        out.push({
          prompt: `Somebody enlarged a shape of area ${A} cm² by a scale factor of ${k} like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 used the scale factor once. Area needs \\(${k}^2 = ${k * k}\\), giving \\(${A} \\times ${k * k} = ${A * k * k}\\) cm².</span>`
        });
      })();

      // Q9: find the scale factor.
      (() => {
        const k = rng.int(2, 6), L = rng.int(2, 9);
        out.push({
          prompt: `A ${L} cm side is enlarged to ${L * k} cm. What is the scale factor?`,
          tag: 'Challenge',
          input: { kind: 'number', answer: k, width: 76 },
          explain: `<span class="work">\\(${L * k} \\div ${L} = ${k}\\)</span>`
        });
      })();

      // Q10: match solids to their face counts.
      (() => {
        // A cube and a cuboid have the same face, edge and vertex counts, so
        // only one of them may appear or the pairing has two right answers.
        const drop = rng.chance() ? 'cube' : 'cuboid';
        const pool = kinds.filter(k => k !== drop);
        const picks = rng.sample(pool, 4);
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each solid to its description.',
          tag: 'Challenge',
          input: {
            kind: 'match',
            left: picks.map(k => SOLIDS[k].name),
            right: order.map(i => `${SOLIDS[picks[i]].faces} faces, ${SOLIDS[picks[i]].edges} edges, ${SOLIDS[picks[i]].vertices} vertices`),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: ''
        });
      })();

      return out;
    }
  };

})();
