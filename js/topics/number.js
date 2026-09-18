'use strict';
// ── Maths Revise · Unit 1 topics ────────────────────────────────────────────
// Decimals and fractions. Answers are checked with a small tolerance where a
// decimal is involved, so a student is never marked wrong by floating point.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});
  const m = Fmt.tex;
  const TOL = 1e-6;

  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  const simplify = (n, d) => { const g = gcd(n, d); return [n / g, d / g]; };
  const texFrac = (n, d) => (d === 1 ? String(n) : `\\frac{${n}}{${d}}`);

  /** Round to `p` decimal places, avoiding the usual floating point crumbs. */
  const round = (v, p) => Math.round(v * 10 ** p) / 10 ** p;

  // ═══ 1.1 Adding and subtracting decimals ══════════════════════════════════
  Topics.u1e1 = {
    id: 'u1e1', unit: 1,
    title: 'Adding & Subtracting Decimals',
    blurb: 'Line up the decimal points, then add or subtract as usual.',
    hint: 'Write the numbers so the decimal points sit in a column, filling any gaps with zeros. Then the columns line up and it is ordinary addition.',

    examples: [
      {
        title: 'Example 1: \\(3.7 + 12.45\\)',
        steps: [
          'Line up the points, padding the shorter number: \\(3.70\\) and \\(12.45\\).',
          'Add the hundredths, then tenths, then whole numbers.',
          'The point in the answer goes straight under the others.'
        ],
        result: 'Answer: \\(16.15\\)'
      },
      {
        title: 'Example 2: \\(8 - 2.65\\)',
        steps: [
          'Write 8 as \\(8.00\\) so both numbers have two decimal places.',
          'Subtract column by column, borrowing where needed.',
          'Check by adding back: \\(5.35 + 2.65 = 8\\). ✓'
        ],
        result: 'Answer: \\(5.35\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';
      const dec = (whole, places) => round(rng.int(whole[0], whole[1]) + rng.int(0, 10 ** places - 1) / 10 ** places, places);

      // Q1–4: straightforward sums and differences.
      for (let i = 0; i < 4; i++) {
        const p1 = rng.int(1, 2), p2 = hard ? rng.int(1, 2) : p1;
        const a = dec([1, 40], p1), b = dec([1, 30], p2);
        const add = i < 2;
        const big = Math.max(a, b), small = Math.min(a, b);
        const ans = round(add ? a + b : big - small, 2);
        out.push({
          prompt: m(add ? `${a} + ${b}` : `${big} - ${small}`),
          note: i === 0 ? 'Line up the decimal points before you start.' : null,
          input: { kind: 'number', prefix: '=', answer: ans, tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${add ? `${a} + ${b}` : `${big} - ${small}`} = ${ans}\\)</span>`
        });
      }

      // Q5: a whole number minus a decimal, the classic trap.
      (() => {
        const w = rng.int(4, 20), b = round(rng.int(1, w - 1) + rng.int(1, 99) / 100, 2);
        out.push({
          prompt: m(`${w} - ${b}`),
          note: 'Write the whole number with two decimal places first.',
          input: { kind: 'number', prefix: '=', answer: round(w - b, 2), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${w}.00 - ${b} = ${round(w - b, 2)}\\)</span>`
        });
      })();

      // Q6: spot the mistake — added without lining up the point.
      (() => {
        const a = round(rng.int(2, 9) + rng.int(1, 9) / 10, 1);
        const b = round(rng.int(10, 40) + rng.int(10, 99) / 100, 2);
        const wrongSum = round(a + b * 10, 2) / 10;   // what you get lining up the right-hand edge
        const lines = [
          m(`${a} + ${b}`),
          `Line up the last digits of each number.`,
          m(`= ${round(Number(String(a).replace('.', '')) / 100 + b, 2)}`),
          `So the answer is about ${round(a + b, 2)}.`
        ];
        out.push({
          prompt: `Somebody added ${m(`${a} + ${b}`)} like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 is the mistake: line up the <em>decimal points</em>, not the last digits. \\(${a}0 + ${b} = ${round(a + b, 2)}\\).</span>`
        });
      })();

      // Q7: put decimals in order.
      (() => {
        const base = rng.int(2, 8);
        const vals = rng.sample([
          round(base + 0.5, 2), round(base + 0.45, 2), round(base + 0.05, 2),
          round(base + 0.4, 2), round(base + 0.54, 2), round(base + 0.09, 2)
        ], 4);
        const sorted = [...vals].sort((a, b) => a - b);
        out.push({
          prompt: 'Put these decimals in order, smallest first.',
          note: 'Compare tenths before hundredths: 0.45 is smaller than 0.5.',
          input: {
            kind: 'order',
            items: vals.map(v => m(String(v))),
            answer: sorted.map(v => vals.indexOf(v))
          },
          explain: `<span class="work">${sorted.join(' &lt; ')}</span>`
        });
      })();

      // Q8: estimate first.
      (() => {
        const a = round(rng.int(10, 40) + rng.int(1, 99) / 100, 2);
        const b = round(rng.int(10, 40) + rng.int(1, 99) / 100, 2);
        const real = round(a + b, 2);
        const opts = rng.shuffle([
          { html: m(String(real)),                right: true },
          { html: m(String(round(real / 10, 3))), right: false },
          { html: m(String(round(real * 10, 1))), right: false },
          { html: m(String(round(real - 1, 2))),  right: false }
        ]);
        out.push({
          prompt: `Roughly, ${m(`${a} + ${b}`)} is about ${Math.round(a) + Math.round(b)}. Which of these is the exact answer?`,
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">Estimating first catches answers that are ten times too big or too small.</span>`
        });
      })();

      // Q9–10: three numbers, or money in context.
      (() => {
        const a = round(rng.int(1, 9) + rng.int(1, 99) / 100, 2);
        const b = round(rng.int(1, 9) + rng.int(1, 99) / 100, 2);
        const c = round(rng.int(1, 9) + rng.int(1, 99) / 100, 2);
        out.push({
          prompt: m(`${a} + ${b} + ${c}`),
          tag: 'Challenge',
          input: { kind: 'number', prefix: '=', answer: round(a + b + c, 2), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${a} + ${b} = ${round(a + b, 2)}\\), then \\(+ ${c} = ${round(a + b + c, 2)}\\)</span>`
        });
      })();

      (() => {
        const paid = rng.pick([10, 20, 50]);
        const items = [round(rng.int(1, 6) + rng.int(1, 99) / 100, 2), round(rng.int(1, 9) + rng.int(1, 99) / 100, 2)];
        const total = round(items[0] + items[1], 2);
        out.push({
          prompt: `Two items cost $${items[0].toFixed(2)} and $${items[1].toFixed(2)}. You pay with $${paid}. How much change do you get?`,
          tag: 'Challenge',
          note: 'Two steps: add the items, then subtract from what you paid.',
          input: { kind: 'number', prefix: '$', answer: round(paid - total, 2), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">Total \\(${items[0]} + ${items[1]} = ${total}\\); change \\(${paid} - ${total} = ${round(paid - total, 2)}\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 1.2 Multiplying and dividing decimals ════════════════════════════════
  Topics.u1e2 = {
    id: 'u1e2', unit: 1,
    title: 'Multiplying & Dividing Decimals',
    blurb: 'Count the decimal places, and know what × 10 and ÷ 100 really do.',
    hint: 'To multiply: ignore the points, multiply the whole numbers, then put back as many decimal places as the two numbers had between them. Multiplying by 10 moves every digit one place to the left.',

    examples: [
      {
        title: 'Example 1: \\(0.4 \\times 0.3\\)',
        steps: [
          'Ignore the points: \\(4 \\times 3 = 12\\).',
          'Count decimal places: one in \\(0.4\\), one in \\(0.3\\), so two altogether.',
          'Put two decimal places back into 12: \\(0.12\\).'
        ],
        result: 'Answer: \\(0.12\\)'
      },
      {
        title: 'Example 2: \\(7.2 \\div 100\\)',
        diagram: { w: 250, h: 100 },
        draw(d) {
          Dia.numberLine(d, 0, 8, [{ at: 7.2, label: '7.2' }, { at: 0.072 * 10, label: '', colour: 'var(--dia-known)' }],
                         { y: 45, step: 1 });
        },
        steps: [
          'Dividing by 100 makes the number 100 times smaller.',
          'Every digit moves two places to the right.',
          '\\(7.2 \\to 0.72 \\to 0.072\\).'
        ],
        result: 'Answer: \\(0.072\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: decimal × whole number.
      for (let i = 0; i < 2; i++) {
        const p = hard ? 2 : 1;
        const a = round(rng.int(1, 9) + rng.int(1, 10 ** p - 1) / 10 ** p, p);
        const b = rng.int(2, 9);
        out.push({
          prompt: m(`${a} \\times ${b}`),
          input: { kind: 'number', prefix: '=', answer: round(a * b, 4), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${Math.round(a * 10 ** p)} \\times ${b} = ${Math.round(a * 10 ** p) * b}\\), then put ${p} decimal place${p > 1 ? 's' : ''} back: \\(${round(a * b, 4)}\\)</span>`
        });
      }

      // Q3–4: decimal × decimal.
      for (let i = 0; i < 2; i++) {
        const a = round(rng.int(1, 9) / 10, 1);
        const b = hard ? round(rng.int(11, 99) / 100, 2) : round(rng.int(1, 9) / 10, 1);
        const pa = 1, pb = hard ? 2 : 1;
        out.push({
          prompt: m(`${a} \\times ${b}`),
          note: i === 0 ? 'Count the decimal places in both numbers, then put them all back at the end.' : null,
          input: { kind: 'number', prefix: '=', answer: round(a * b, 5), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${Math.round(a * 10)} \\times ${Math.round(b * 10 ** pb)} = ${Math.round(a * 10) * Math.round(b * 10 ** pb)}\\), with ${pa + pb} decimal places: \\(${round(a * b, 5)}\\)</span>`
        });
      }

      // Q5–6: multiply or divide by a power of ten.
      for (let i = 0; i < 2; i++) {
        const a = round(rng.int(1, 90) + rng.int(1, 99) / 100, 2);
        const pow = rng.pick([10, 100, 1000]);
        const mult = i === 0;
        out.push({
          prompt: m(`${a} ${mult ? '\\times' : '\\div'} ${pow}`),
          input: { kind: 'number', prefix: '=', answer: round(mult ? a * pow : a / pow, 6), tol: TOL, decimal: true, width: 106 },
          explain: `<span class="work">Every digit moves ${String(pow).length - 1} place${pow > 10 ? 's' : ''} to the ${mult ? 'left' : 'right'}.</span>`
        });
      }

      // Q7: spot the mistake — lost a decimal place.
      (() => {
        const a = round(rng.int(2, 9) / 10, 1), b = round(rng.int(2, 9) / 10, 1);
        const whole = Math.round(a * 10) * Math.round(b * 10);
        const lines = [
          m(`${a} \\times ${b}`),
          m(`${Math.round(a * 10)} \\times ${Math.round(b * 10)} = ${whole}`),
          `There is one decimal place altogether, so put one back.`,
          m(`= ${round(whole / 10, 2)}`)
        ];
        out.push({
          prompt: `Somebody worked out ${m(`${a} \\times ${b}`)} like this.`,
          input: { kind: 'spot', lines, wrong: 2 },
          explain: `<span class="work">Line 3 miscounted: there is one decimal place in each number, so <em>two</em> altogether. The answer is \\(${round(a * b, 2)}\\).</span>`
        });
      })();

      // Q8: divide a decimal by a whole number.
      (() => {
        const b = rng.int(2, 9);
        const q = round(rng.int(1, 9) + rng.int(1, 9) / 10, 1);
        const a = round(q * b, 3);
        out.push({
          prompt: m(`${a} \\div ${b}`),
          input: { kind: 'number', prefix: '=', answer: q, tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${a} \\div ${b} = ${q}\\). Check: \\(${q} \\times ${b} = ${a}\\).</span>`
        });
      })();

      // Q9: which is largest?
      (() => {
        const base = round(rng.int(1, 6) + rng.int(1, 9) / 10, 1);
        const cands = [
          { html: m(`${base} \\times 10`),  v: base * 10 },
          { html: m(`${base} \\div 0.1`),   v: base / 0.1 },
          { html: m(`${base} \\times 0.1`), v: base * 0.1 },
          { html: m(`${base} \\div 10`),    v: base / 10 }
        ];
        // The first two are equal, so keep only one of them.
        const pool = rng.shuffle([cands[rng.chance() ? 0 : 1], cands[2], cands[3],
                                  { html: m(`${base} \\times 2`), v: base * 2 }]);
        const best = pool.reduce((a, b) => (b.v > a.v ? b : a));
        out.push({
          prompt: 'Which of these gives the <strong>largest</strong> answer?',
          tag: 'Challenge',
          note: 'Dividing by a number below 1 makes things bigger.',
          input: { kind: 'choice', options: pool, correct: pool.indexOf(best) },
          explain: `<span class="work">Working them out: ${pool.map(o => round(o.v, 3)).join(', ')}.</span>`
        });
      })();

      // Q10: a short context problem.
      (() => {
        const price = round(rng.int(1, 9) + rng.int(1, 19) * 5 / 100, 2);
        const n = rng.int(3, 12);
        out.push({
          prompt: `One notebook costs $${price.toFixed(2)}. How much do ${n} of them cost?`,
          tag: 'Challenge',
          input: { kind: 'number', prefix: '$', answer: round(price * n, 2), tol: TOL, decimal: true, width: 96 },
          explain: `<span class="work">\\(${price} \\times ${n} = ${round(price * n, 2)}\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 1.3 Adding and subtracting fractions ═════════════════════════════════
  Topics.u1e3 = {
    id: 'u1e3', unit: 1,
    title: 'Adding & Subtracting Fractions',
    blurb: 'Same denominator, add the tops. Different denominators, match them first.',
    hint: 'Fractions can only be added when the denominators match. Find a common denominator, rewrite both fractions, then add or subtract the numerators only. Simplify at the end.',

    examples: [
      {
        title: 'Example 1: \\(\\frac{2}{7} + \\frac{3}{7}\\)',
        steps: [
          'The denominators already match.',
          'Add the numerators only: \\(2 + 3 = 5\\).',
          'The denominator stays as 7.'
        ],
        result: 'Answer: \\(\\frac{5}{7}\\)'
      },
      {
        title: 'Example 2: \\(\\frac{1}{4} + \\frac{2}{3}\\)',
        steps: [
          'The denominators 4 and 3 do not match. A common denominator is \\(4 \\times 3 = 12\\).',
          'Rewrite each: \\(\\frac{1}{4} = \\frac{3}{12}\\) and \\(\\frac{2}{3} = \\frac{8}{12}\\).',
          'Now add: \\(\\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}\\).'
        ],
        result: 'Answer: \\(\\frac{11}{12}\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: same denominator.
      for (let i = 0; i < 2; i++) {
        const d = rng.int(4, 12);
        const a = rng.int(1, d - 2), b = rng.int(1, d - a - 1 || 1);
        const add = i === 0;
        const big = Math.max(a, b), small = Math.min(a, b);
        const [n, dd] = simplify(add ? a + b : big - small, d);
        out.push({
          prompt: m(add ? `\\frac{${a}}{${d}} + \\frac{${b}}{${d}}` : `\\frac{${big}}{${d}} - \\frac{${small}}{${d}}`),
          note: i === 0 ? 'The denominators already match. Give your answer in its simplest form.' : null,
          input: { kind: 'fill', parts: [{ text: '=' }, { frac: { num: { answer: n }, den: { answer: dd } } }] },
          explain: `<span class="work">\\(${add ? `${a} + ${b}` : `${big} - ${small}`} = ${add ? a + b : big - small}\\) over ${d}, which simplifies to \\(${texFrac(n, dd)}\\).</span>`
        });
      }

      // Q3: which denominator to use?
      (() => {
        const d1 = rng.int(2, 8), d2 = rng.intExcept(2, 9, [d1]);
        const L = lcm(d1, d2);
        const opts = rng.shuffle([
          { html: m(String(L)),        right: true },
          { html: m(String(d1 + d2)),  right: false },
          { html: m(String(d1)),       right: false },
          { html: m(String(d1 * d2 + 1)), right: false }
        ].filter((o, i, arr) => arr.findIndex(x => x.html === o.html) === i));
        while (opts.length < 3) opts.push({ html: m(String(L + 1)), right: false });
        out.push({
          prompt: `To work out ${m(`\\frac{1}{${d1}} + \\frac{1}{${d2}}`)}, what is the lowest common denominator?`,
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">The lowest number both ${d1} and ${d2} divide into is ${L}.</span>`
        });
      })();

      // Q4–6: different denominators.
      for (let i = 0; i < 3; i++) {
        const d1 = rng.int(2, 8), d2 = rng.intExcept(2, 9, [d1]);
        const n1 = rng.int(1, d1 - 1), n2 = rng.int(1, d2 - 1);
        const L = lcm(d1, d2);
        const t1 = n1 * (L / d1), t2 = n2 * (L / d2);
        const add = i < 2 || t1 === t2;
        const raw = add ? t1 + t2 : Math.max(t1, t2) - Math.min(t1, t2);
        const [n, dd] = simplify(raw, L);
        const big = t1 >= t2 ? [n1, d1] : [n2, d2];
        const small = t1 >= t2 ? [n2, d2] : [n1, d1];
        out.push({
          prompt: m(add
            ? `\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}`
            : `\\frac{${big[0]}}{${big[1]}} - \\frac{${small[0]}}{${small[1]}}`),
          note: i === 0 ? 'Rewrite both fractions over a common denominator first.' : null,
          input: { kind: 'fill', parts: [{ text: '=' }, { frac: { num: { answer: n }, den: { answer: dd } } }] },
          explain: `<span class="work">Over ${L}: \\(${texFrac(t1, L)}\\) and \\(${texFrac(t2, L)}\\), giving \\(${texFrac(raw, L)} = ${texFrac(n, dd)}\\).</span>`
        });
      }

      // Q7: spot the mistake — added the denominators too.
      (() => {
        const d1 = rng.int(3, 7), d2 = rng.intExcept(3, 8, [d1]);
        const n1 = rng.int(1, d1 - 1), n2 = rng.int(1, d2 - 1);
        const L = lcm(d1, d2);
        const [n, dd] = simplify(n1 * (L / d1) + n2 * (L / d2), L);
        const lines = [
          m(`\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}`),
          'Add the tops, and add the bottoms.',
          m(`= \\frac{${n1 + n2}}{${d1 + d2}}`),
          `So the answer is ${m(texFrac(...simplify(n1 + n2, d1 + d2)))}.`
        ];
        out.push({
          prompt: `Somebody added ${m(`\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}`)} like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Denominators are never added. Rewrite both over ${L} first: the answer is \\(${texFrac(n, dd)}\\).</span>`
        });
      })();

      // Q8: fraction of a whole.
      (() => {
        const d = rng.pick([3, 4, 5, 6, 8, 10]);
        const n = rng.int(1, d - 1);
        const whole = d * rng.int(2, 12);
        out.push({
          prompt: `What is ${m(`\\frac{${n}}{${d}}`)} of ${whole}?`,
          note: 'Divide by the bottom, then multiply by the top.',
          input: { kind: 'number', answer: whole / d * n, width: 84 },
          explain: `<span class="work">\\(${whole} \\div ${d} = ${whole / d}\\), then \\(\\times ${n} = ${whole / d * n}\\)</span>`
        });
      })();

      // Q9: order fractions.
      (() => {
        const picks = rng.sample([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [5, 6], [5, 8]], 4);
        const vals = picks.map(([n, d]) => n / d);
        const order = picks.map((_, i) => i).sort((a, b) => vals[a] - vals[b]);
        out.push({
          prompt: 'Put these fractions in order, smallest first.',
          tag: 'Challenge',
          note: 'Comparing over a common denominator, or as decimals, both work.',
          input: { kind: 'order', items: picks.map(([n, d]) => m(`\\frac{${n}}{${d}}`)), answer: order },
          explain: `<span class="work">As decimals: ${picks.map(([n, d]) => round(n / d, 3)).join(', ')}.</span>`
        });
      })();

      // Q10: mixed number.
      (() => {
        const d = rng.int(3, 8);
        const w = rng.int(1, 4);
        const n1 = rng.int(1, d - 1), n2 = rng.int(1, d - 1);
        const totalN = n1 + n2;
        const wholeOut = w + Math.floor(totalN / d);
        const restN = totalN % d;
        const [rn, rd] = restN ? simplify(restN, d) : [0, 1];
        out.push({
          prompt: m(`${w}\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}}`),
          tag: 'Challenge',
          note: 'Add the fraction parts. If they make more than a whole, carry it over.',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: wholeOut, width: 54 } },
              { frac: { num: { answer: rn }, den: { answer: rd }, width: 50 } }
            ]
          },
          explain: `<span class="work">\\(\\frac{${n1}}{${d}} + \\frac{${n2}}{${d}} = ${texFrac(totalN, d)}\\), so altogether \\(${wholeOut}${restN ? `\\frac{${rn}}{${rd}}` : ''}\\). ${restN ? '' : 'The fraction part comes to a whole number, so type 0 over 1.'}</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 1.4 Multiplying and dividing fractions ═══════════════════════════════
  Topics.u1e4 = {
    id: 'u1e4', unit: 1,
    title: 'Multiplying & Dividing Fractions',
    blurb: 'Multiply straight across. To divide, keep, change, flip.',
    hint: 'Multiplying needs no common denominator: tops times tops, bottoms times bottoms. To divide, keep the first fraction, change ÷ to ×, and flip the second one over.',

    examples: [
      {
        title: 'Example 1: \\(\\frac{2}{3} \\times \\frac{4}{5}\\)',
        steps: [
          'Multiply the numerators: \\(2 \\times 4 = 8\\).',
          'Multiply the denominators: \\(3 \\times 5 = 15\\).',
          'No common factor, so it is already simplest.'
        ],
        result: 'Answer: \\(\\frac{8}{15}\\)'
      },
      {
        title: 'Example 2: \\(\\frac{3}{4} \\div \\frac{2}{5}\\)',
        steps: [
          '<strong>Keep</strong> the first fraction: \\(\\frac{3}{4}\\).',
          '<strong>Change</strong> the divide to a multiply.',
          '<strong>Flip</strong> the second: \\(\\frac{2}{5} \\to \\frac{5}{2}\\).',
          'Now multiply: \\(\\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8}\\).'
        ],
        result: 'Answer: \\(\\frac{15}{8}\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–3: multiply.
      for (let i = 0; i < 3; i++) {
        const d1 = rng.int(2, 9), n1 = rng.int(1, d1 - 1);
        const d2 = rng.int(2, 9), n2 = rng.int(1, d2 - 1);
        const [n, d] = simplify(n1 * n2, d1 * d2);
        out.push({
          prompt: m(`\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}`),
          note: i === 0 ? 'Multiply straight across, then simplify.' : null,
          input: { kind: 'fill', parts: [{ text: '=' }, { frac: { num: { answer: n }, den: { answer: d } } }] },
          explain: `<span class="work">\\(\\frac{${n1} \\times ${n2}}{${d1} \\times ${d2}} = ${texFrac(n1 * n2, d1 * d2)} = ${texFrac(n, d)}\\)</span>`
        });
      }

      // Q4: what does "keep, change, flip" mean?
      (() => {
        const d1 = rng.int(2, 7), n1 = rng.int(1, d1 - 1);
        const d2 = rng.int(2, 7), n2 = rng.int(1, d2 - 1);
        const opts = rng.shuffle([
          { html: m(`\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}}`), right: true },
          { html: m(`\\frac{${d1}}{${n1}} \\times \\frac{${n2}}{${d2}}`), right: false },
          { html: m(`\\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}`), right: false },
          { html: m(`\\frac{${d1}}{${n1}} \\times \\frac{${d2}}{${n2}}`), right: false }
        ]);
        out.push({
          prompt: `Which multiplication is the same as ${m(`\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}`)}?`,
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: '<span class="work">Keep the first, change the sign, flip the second.</span>'
        });
      })();

      // Q5–7: divide.
      for (let i = 0; i < 3; i++) {
        const d1 = rng.int(2, 8), n1 = rng.int(1, d1 - 1);
        const d2 = rng.int(2, 8), n2 = rng.int(1, d2 - 1);
        const [n, d] = simplify(n1 * d2, d1 * n2);
        out.push({
          prompt: m(`\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}`),
          note: i === 0 ? 'Keep, change, flip. The answer may be bigger than 1.' : null,
          input: { kind: 'fill', parts: [{ text: '=' }, { frac: { num: { answer: n }, den: { answer: d } } }] },
          explain: `<span class="work">\\(\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}} = ${texFrac(n1 * d2, d1 * n2)} = ${texFrac(n, d)}\\)</span>`
        });
      }

      // Q8: spot the mistake — flipped the wrong fraction.
      (() => {
        const d1 = rng.int(3, 7), n1 = rng.int(1, d1 - 1);
        const d2 = rng.int(3, 7), n2 = rng.int(1, d2 - 1);
        const [n, d] = simplify(n1 * d2, d1 * n2);
        const lines = [
          m(`\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}`),
          m(`= \\frac{${d1}}{${n1}} \\times \\frac{${n2}}{${d2}}`),
          m(`= ${texFrac(d1 * n2, n1 * d2)}`),
          `So the answer is ${m(texFrac(...simplify(d1 * n2, n1 * d2)))}.`
        ];
        out.push({
          prompt: `Somebody worked out ${m(`\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}}`)} like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 flipped the first fraction instead of the second. It should be \\(\\frac{${n1}}{${d1}} \\times \\frac{${d2}}{${n2}} = ${texFrac(n, d)}\\).</span>`
        });
      })();

      // Q9: fraction times a whole number.
      (() => {
        const d = rng.int(2, 9), n = rng.int(1, d - 1);
        const w = d * rng.int(2, 9);
        out.push({
          prompt: m(`\\frac{${n}}{${d}} \\times ${w}`),
          tag: 'Challenge',
          note: 'A whole number is just that number over 1.',
          input: { kind: 'number', prefix: '=', answer: n * w / d, width: 84 },
          explain: `<span class="work">\\(\\frac{${n} \\times ${w}}{${d}} = ${texFrac(n * w, d)} = ${n * w / d}\\)</span>`
        });
      })();

      // Q10: does dividing make it bigger?
      (() => {
        const d = rng.int(2, 6), n = rng.int(1, d - 1);
        out.push({
          prompt: `Dividing a number by ${m(`\\frac{${n}}{${d}}`)} makes it…`,
          tag: 'Challenge',
          note: 'Flipping gives ' + m(`\\frac{${d}}{${n}}`) + ', which is bigger than 1.',
          input: {
            kind: 'choice',
            options: ['bigger', 'smaller', 'exactly the same'],
            correct: 0
          },
          explain: `<span class="work">Dividing by a fraction below 1 is the same as multiplying by \\(\\frac{${d}}{${n}}\\), which is more than 1, so the result grows.</span>`
        });
      })();

      return out;
    }
  };

})();
