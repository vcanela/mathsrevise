'use strict';
// ── Maths Revise · Unit 2 topics ────────────────────────────────────────────
// Collecting like terms, expanding, factorising, and solving linear equations.
// Every generator returns ten question objects for the engine to render.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});
  const T = Fmt.term, S = Fmt.sum, m = Fmt.tex;

  /** Two distinct letters for a question. */
  const twoVars = rng => rng.sample(['a', 'b', 'c', 'd', 'g', 'h', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y'], 2);

  // ═══ 2.1 Collecting like terms ════════════════════════════════════════════
  Topics.u2e1 = {
    id: 'u2e1', unit: 2,
    title: 'Collecting Like Terms',
    blurb: 'Simplify an expression by grouping the terms that share a letter.',
    hint: 'Only terms with exactly the same letter can be combined. Plain numbers combine with plain numbers. The sign in front of a term travels with it.',

    examples: [
      {
        title: 'Example 1: \\(3a + 2b + 2a + b\\)',
        diagram: { w: 260, h: 96, caption: 'Five \\(a\\)-tiles and three \\(b\\)-tiles' },
        draw(d) {
          Dia.tiles(d, [
            { label: 'a', count: 5 }, { label: 'b', count: 3 }
          ], { y: 30 });
        },
        steps: [
          'Find the like terms: the \\(a\\) terms are \\(3a\\) and \\(2a\\); the \\(b\\) terms are \\(2b\\) and \\(b\\).',
          'Add each group separately: \\(3a + 2a = 5a\\) and \\(2b + b = 3b\\).',
          'Write the groups back together.'
        ],
        result: 'Answer: \\(5a + 3b\\)'
      },
      {
        title: 'Example 2: \\(7p - 3q - 2p + 5q\\)',
        steps: [
          'Keep the sign with the term it sits in front of: \\(+7p\\), \\(-3q\\), \\(-2p\\), \\(+5q\\).',
          'Group them: \\((7p - 2p) + (-3q + 5q)\\).',
          'Work out each group: \\(7p - 2p = 5p\\) and \\(-3q + 5q = 2q\\).'
        ],
        result: 'Answer: \\(5p + 2q\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';
      const range = hard ? [-9, 9] : [1, 9];

      const pickCoefs = (n, allowNeg) => {
        const c = [];
        for (let i = 0; i < n; i++) c.push(allowNeg ? rng.nonZero(range[0], range[1]) : rng.int(1, 9));
        return c;
      };

      // Q1–2: one letter only.
      for (let i = 0; i < 2; i++) {
        const [v] = twoVars(rng);
        const parts = pickCoefs(hard ? 4 : 3, i === 1 || hard);
        const total = parts.reduce((s, c) => s + c, 0);
        if (total === 0) parts[0] += 1;
        const sumNow = parts.reduce((s, c) => s + c, 0);
        out.push({
          prompt: 'Simplify ' + m(S(parts.map(c => [c, v]))),
          input: { kind: 'fill', parts: [{ text: '=' }, { input: { answer: sumNow, width: 68 } }, { text: m(v) }] },
          explain: `<span class="work">${parts.map(c => Fmt.signed(c)).join(' ')} = ${Fmt.num(sumNow)}</span>`
        });
      }

      // Q3–4: two letters, coefficients only.
      for (let i = 0; i < 2; i++) {
        const [u, v] = twoVars(rng);
        const cu = pickCoefs(2, hard), cv = pickCoefs(2, hard || i === 1);
        const su = cu.reduce((a, b) => a + b, 0) || 1;
        const sv = cv.reduce((a, b) => a + b, 0) || 1;
        const order = rng.shuffle([[cu[0], u], [cv[0], v], [cu[1], u], [cv[1], v]]);
        out.push({
          prompt: 'Simplify ' + m(S(order)),
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: su, width: 62 } }, { text: m(u) },
              { text: '+' },  { input: { answer: sv, width: 62 } }, { text: m(v) }
            ]
          },
          note: (su < 0 || sv < 0 || order.some(([c]) => c < 0))
            ? 'Type a negative coefficient as <code>-3</code>. Leave the + sign as it is.' : null,
          explain: `<span class="work">\\(${u}\\): ${cu.map(Fmt.signed).join(' ')} = ${Fmt.num(su)}; \\(${v}\\): ${cv.map(Fmt.signed).join(' ')} = ${Fmt.num(sv)}</span>`
        });
      }

      // Q5: which are like terms?
      (() => {
        const [u, v] = twoVars(rng);
        const a = rng.int(2, 8), b = rng.int(2, 8), c = rng.int(2, 8);
        const opts = rng.shuffle([
          { html: m(`${T(a, u)} \\text{ and } ${T(b, u)}`), right: true },
          { html: m(`${T(a, u)} \\text{ and } ${T(b, v)}`), right: false },
          { html: m(`${T(a, u)} \\text{ and } ${c}`), right: false },
          { html: m(`${T(a, u + '^2')} \\text{ and } ${T(b, u)}`), right: false }
        ]);
        out.push({
          prompt: 'Which pair are <strong>like terms</strong>?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">Like terms need exactly the same letter, to the same power.</span>`
        });
      })();

      // Q6: spot the mistake.
      (() => {
        const [u, v] = twoVars(rng);
        const a = rng.int(4, 9), b = rng.int(2, a - 1), c = rng.int(2, 7), e = rng.int(2, 7);
        const lines = [
          m(`${T(a, u)} - ${T(c, v)} - ${T(b, u)} + ${T(e, v)}`),
          m(`= (${T(a, u)} - ${T(b, u)}) + (-${T(c, v)} + ${T(e, v)})`),
          m(`= ${T(a - b, u)} + ${T(c + e, v)}`),
          m(`\\text{Answer: } ${S([[a - b, u], [c + e, v]])}`)
        ];
        out.push({
          prompt: 'Somebody simplified ' + m(S([[a, u], [-c, v], [-b, u], [e, v]])) + ' like this.',
          input: { kind: 'spot', lines, wrong: 2, cue: 'Click the first line that is wrong.' },
          explain: `<span class="work">Line 3 added the \\(${v}\\) terms instead of working out \\(-${c} + ${e} = ${Fmt.num(e - c)}\\). The answer is \\(${S([[a - b, u], [e - c, v]])}\\).</span>`
        });
      })();

      // Q7: type the simplified expression.
      (() => {
        const [u, v] = twoVars(rng);
        const cu = [rng.int(2, 9), rng.nonZero(-7, 7)];
        const cv = [rng.int(2, 9), rng.nonZero(-7, 7)];
        if (cu[0] + cu[1] === 0) cu[1] += 2;
        if (cv[0] + cv[1] === 0) cv[1] += 3;
        const ansU = cu[0] + cu[1], ansV = cv[0] + cv[1];
        const order = rng.shuffle([[cu[0], u], [cv[0], v], [cu[1], u], [cv[1], v]]);
        const answer = S([[ansU, u], [ansV, v]]);
        out.push({
          prompt: 'Simplify ' + m(S(order)) + ' and type the whole answer.',
          note: 'Type it as you would write it, for example <code>4x - 3y</code>.',
          input: { kind: 'expr', answer, prefix: '=', placeholder: 'e.g. 4' + u + ' - 3' + v },
          explain: `<span class="work">\\(${u}\\): ${cu.map(Fmt.signed).join(' ')} = ${Fmt.num(ansU)}; \\(${v}\\): ${cv.map(Fmt.signed).join(' ')} = ${Fmt.num(ansV)}, giving \\(${answer}\\)</span>`
        });
      })();

      // Q8: three groups including a constant.
      (() => {
        const [u, v] = twoVars(rng);
        const cu = [rng.int(2, 8), rng.nonZero(-6, 6)];
        const cv = [rng.int(2, 8), rng.nonZero(-6, 6)];
        const k  = [rng.int(1, 9), rng.nonZero(-8, 8)];
        const su = cu[0] + cu[1] || 1, sv = cv[0] + cv[1] || 1, sk = k[0] + k[1];
        const order = rng.shuffle([[cu[0], u], [k[0], ''], [cv[0], v], [cu[1], u], [cv[1], v], [k[1], '']]);
        out.push({
          prompt: 'Simplify ' + m(S(order)),
          tag: 'Challenge',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: su, width: 58 } }, { text: m(u) },
              { text: '+' },  { input: { answer: sv, width: 58 } }, { text: m(v) },
              { text: '+' },  { input: { answer: sk, width: 58 } }
            ]
          },
          note: 'The last box is the plain number.',
          explain: `<span class="work">\\(${S([[su, u], [sv, v], [sk, '']])}\\)</span>`
        });
      })();

      // Q9: match each expression to its simplified form.
      (() => {
        const v = rng.pick(['x', 'y', 'n', 't']);
        const rows = rng.sample([
          { a: [3, 4, -2], }, { a: [5, -1, 2] }, { a: [6, -4, 1] }, { a: [2, 2, 3] }, { a: [8, -3, -2] }
        ], 4).map(r => {
          const total = r.a.reduce((s, c) => s + c, 0);
          return { from: m(S(r.a.map(c => [c, v]))), to: m(T(total, v)), total };
        });
        // Distinct answers only, so the pairing is unambiguous.
        const seen = new Set();
        const uniq = rows.filter(r => (seen.has(r.total) ? false : (seen.add(r.total), true)));
        const left = uniq.map(r => r.from);
        const order = rng.shuffle(uniq.map((_, i) => i));
        const right = order.map(i => uniq[i].to);
        const answer = left.map((_, i) => order.indexOf(i));
        out.push({
          prompt: 'Match each expression to its simplified form.',
          input: { kind: 'match', left, right, tags: ['A', 'B', 'C', 'D'].slice(0, right.length), answer },
          explain: ''
        });
      })();

      // Q10: expert-leaning, five terms and two letters.
      (() => {
        const [u, v] = twoVars(rng);
        const cu = [rng.int(3, 10), rng.nonZero(-8, 8), rng.nonZero(-5, 5)];
        const cv = [rng.int(3, 10), rng.nonZero(-8, 8)];
        let su = cu.reduce((a, b) => a + b, 0); if (su === 0) { cu[0] += 2; su += 2; }
        let sv = cv.reduce((a, b) => a + b, 0); if (sv === 0) { cv[0] += 3; sv += 3; }
        const order = rng.shuffle([...cu.map(c => [c, u]), ...cv.map(c => [c, v])]);
        out.push({
          prompt: 'Simplify ' + m(S(order)),
          tag: 'Challenge',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: su, width: 58 } }, { text: m(u) },
              { text: '+' },  { input: { answer: sv, width: 58 } }, { text: m(v) }
            ]
          },
          explain: `<span class="work">\\(${u}\\): ${cu.map(Fmt.signed).join(' ')} = ${Fmt.num(su)}; \\(${v}\\): ${cv.map(Fmt.signed).join(' ')} = ${Fmt.num(sv)}</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 2.2 Expanding brackets ═══════════════════════════════════════════════
  Topics.u2e2 = {
    id: 'u2e2', unit: 2,
    title: 'Expanding Brackets',
    blurb: 'Multiply everything inside the bracket by the term outside it.',
    hint: 'The term outside multiplies every term inside, not just the first. If the outside term is negative, every sign inside flips.',

    examples: [
      {
        title: 'Example 1: \\(4(x + 3)\\)',
        diagram: { w: 250, h: 120, caption: 'The whole rectangle: \\(4x + 12\\)' },
        draw(d) {
          Dia.areaModel(d, '4', [
            { label: 'x', product: '4x', width: 2 },
            { label: '3', product: '12', width: 1.4 }
          ]);
        },
        steps: [
          'The rectangle is 4 tall, and \\(x + 3\\) wide.',
          'Split it: one piece is \\(4 \\times x = 4x\\), the other is \\(4 \\times 3 = 12\\).',
          'The two pieces together are the whole area.'
        ],
        result: 'Answer: \\(4(x + 3) = 4x + 12\\)'
      },
      {
        title: 'Example 2: \\(-3(2y - 5)\\)',
        steps: [
          'Multiply the first term: \\(-3 \\times 2y = -6y\\).',
          'Multiply the second term, signs included: \\(-3 \\times (-5) = +15\\).',
          'A negative outside the bracket flips both signs inside.'
        ],
        result: 'Answer: \\(-6y + 15\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: fill in the two products.
      for (let i = 0; i < 2; i++) {
        const v = rng.pick(['x', 'y', 'n', 'a', 'm']);
        const k = rng.int(2, 9), b = rng.int(1, 9), c = i === 1 || hard ? rng.nonZero(-9, 9) : rng.int(1, 9);
        out.push({
          prompt: 'Expand ' + m(`${k}(${S([[b, v], [c, '']])})`),
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: k * b, width: 62 } }, { text: m(v) },
              { text: '+' },  { input: { answer: k * c, width: 62 } }
            ]
          },
          explain: `<span class="work">\\(${k}\\times ${T(b, v)} = ${T(k * b, v)}\\) and \\(${k}\\times(${Fmt.num(c)}) = ${Fmt.num(k * c)}\\)</span>`
        });
      }

      // Q3: negative outside the bracket.
      (() => {
        const v = rng.pick(['x', 'y', 'p', 't']);
        const k = -rng.int(2, 7), b = rng.int(2, 8), c = rng.nonZero(-9, 9);
        out.push({
          prompt: 'Expand ' + m(`${k}(${S([[b, v], [c, '']])})`),
          note: 'Watch the signs: a negative outside changes both of them.',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: k * b, width: 62 } }, { text: m(v) },
              { text: '+' },  { input: { answer: k * c, width: 62 } }
            ]
          },
          explain: `<span class="work">\\(${S([[k * b, v], [k * c, '']])}\\)</span>`
        });
      })();

      // Q4: type the expansion.
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const k = rng.int(3, 9), b = rng.int(2, 7), c = rng.nonZero(-9, 9);
        const answer = S([[k * b, v], [k * c, '']]);
        out.push({
          prompt: 'Expand ' + m(`${k}(${S([[b, v], [c, '']])})`) + ' and type the answer.',
          input: { kind: 'expr', answer, prefix: '=', placeholder: 'e.g. 6' + v + ' + 15' },
          explain: `<span class="work">\\(${answer}\\)</span>`
        });
      })();

      // Q5: which expansion is right?
      (() => {
        const v = rng.pick(['x', 'y', 'm']);
        const k = rng.int(3, 8), b = rng.int(2, 6), c = rng.int(2, 9);
        const right = S([[k * b, v], [-k * c, '']]);
        const opts = rng.shuffle([
          { html: m(right), right: true },
          { html: m(S([[k * b, v], [-c, '']])),      right: false },   // forgot to multiply the number
          { html: m(S([[k * b, v], [k * c, '']])),   right: false },   // sign slip
          { html: m(S([[b, v], [-k * c, '']])),      right: false }    // forgot to multiply the letter
        ]);
        out.push({
          prompt: 'Which is the correct expansion of ' + m(`${k}(${S([[b, v], [-c, '']])})`) + '?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">Both terms inside get multiplied by ${k}.</span>`
        });
      })();

      // Q6: spot the mistake — the classic "only multiplied the first term".
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const k = rng.int(3, 8), b = rng.int(2, 6), c = rng.int(2, 9);
        const lines = [
          m(`${k}(${S([[b, v], [c, '']])})`),
          m(`= ${k}\\times ${T(b, v)} + ${k}\\times ${c}`),
          m(`= ${T(k * b, v)} + ${c}`),
          m(`\\text{Answer: } ${S([[k * b, v], [c, '']])}`)
        ];
        out.push({
          prompt: 'Somebody expanded ' + m(`${k}(${S([[b, v], [c, '']])})`) + ' like this.',
          input: { kind: 'spot', lines, wrong: 2 },
          explain: `<span class="work">Line 3 dropped the multiplication on the second term: \\(${k}\\times ${c} = ${k * c}\\), so the answer is \\(${S([[k * b, v], [k * c, '']])}\\).</span>`
        });
      })();

      // Q7–8: expand two brackets and collect.
      for (let i = 0; i < 2; i++) {
        const v = rng.pick(['x', 'y', 'n', 'a']);
        const k1 = rng.int(2, 6), b1 = rng.int(1, 5), c1 = rng.int(1, 8);
        const k2 = i === 1 ? -rng.int(2, 5) : rng.int(2, 6);
        const b2 = rng.int(1, 5), c2 = rng.nonZero(-8, 8);
        const av = k1 * b1 + k2 * b2, ac = k1 * c1 + k2 * c2;
        out.push({
          prompt: 'Expand and simplify ' + m(`${k1}(${S([[b1, v], [c1, '']])}) ${k2 < 0 ? '-' : '+'} ${Math.abs(k2)}(${S([[b2, v], [c2, '']])})`),
          tag: i === 1 ? 'Challenge' : null,
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: av, width: 62 } }, { text: m(v) },
              { text: '+' },  { input: { answer: ac, width: 62 } }
            ]
          },
          explain: `<span class="work">\\(${S([[k1 * b1, v], [k1 * c1, '']])}\\) and \\(${S([[k2 * b2, v], [k2 * c2, '']])}\\), then collect: \\(${S([[av, v], [ac, '']])}\\)</span>`
        });
      }

      // Q9: subtracting a whole bracket.
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const a = rng.int(5, 12), b = rng.int(1, 9);
        const k = rng.int(2, 5), c = rng.int(1, 5), e = rng.int(1, 8);
        const av = a - k * c, ac = b - k * e;
        out.push({
          prompt: 'Expand and simplify ' + m(`${S([[a, v], [b, '']])} - ${k}(${S([[c, v], [e, '']])})`),
          tag: 'Challenge',
          note: 'Subtracting a bracket flips every sign inside it.',
          input: { kind: 'expr', answer: S([[av, v], [ac, '']]), prefix: '=', placeholder: 'e.g. 2' + v + ' - 7' },
          explain: `<span class="work">\\(-${k}(${S([[c, v], [e, '']])}) = ${S([[-k * c, v], [-k * e, '']])}\\), so the answer is \\(${S([[av, v], [ac, '']])}\\).</span>`
        });
      })();

      // Q10: a letter outside the bracket.
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const k = rng.int(2, 6), b = rng.int(2, 7), c = rng.nonZero(-8, 8);
        out.push({
          prompt: 'Expand ' + m(`${T(k, v)}(${S([[b, v], [c, '']])})`),
          tag: 'Challenge',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: k * b, width: 58 } }, { text: m(v + '^2') },
              { text: '+' },  { input: { answer: k * c, width: 58 } }, { text: m(v) }
            ]
          },
          explain: `<span class="work">\\(${T(k, v)}\\times ${T(b, v)} = ${T(k * b, v + '^2')}\\) and \\(${T(k, v)}\\times(${Fmt.num(c)}) = ${T(k * c, v)}\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 2.3 Factorising ══════════════════════════════════════════════════════
  Topics.u2e3 = {
    id: 'u2e3', unit: 2,
    title: 'Factorising',
    blurb: 'Expanding in reverse: pull the highest common factor outside a bracket.',
    hint: 'Find the largest number that divides every term, and any letter that appears in every term. Take all of it out at once, or the answer is only half factorised.',

    examples: [
      {
        title: 'Example 1: \\(6x + 15\\)',
        steps: [
          'What divides both 6 and 15? The highest common factor is 3.',
          'Divide each term by 3: \\(6x \\div 3 = 2x\\) and \\(15 \\div 3 = 5\\).',
          'Write the 3 outside and the results inside: \\(3(2x + 5)\\).',
          'Check by expanding: \\(3 \\times 2x = 6x\\), \\(3 \\times 5 = 15\\). ✓'
        ],
        result: 'Answer: \\(3(2x + 5)\\)'
      },
      {
        title: 'Example 2: \\(8n^2 - 12n\\)',
        steps: [
          'The numbers 8 and 12 share a factor of 4.',
          'Both terms also contain an \\(n\\), so \\(n\\) comes out too. The common factor is \\(4n\\).',
          '\\(8n^2 \\div 4n = 2n\\) and \\(-12n \\div 4n = -3\\).'
        ],
        result: 'Answer: \\(4n(2n - 3)\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';
      const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };

      // Q1–3: fill in HCF and bracket contents.
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(['x', 'y', 'n', 'a', 'm']);
        const k = rng.int(2, 9);
        const b = rng.int(2, 9), c = i === 2 || hard ? rng.nonZero(-9, 9) : rng.int(1, 9);
        if (gcd(b, c) !== 1) { b === c ? null : null; }
        const bb = b / gcd(b, c), cc = c / gcd(b, c);
        const K = k * gcd(b, c);
        out.push({
          prompt: 'Factorise ' + m(S([[K * bb, v], [K * cc, '']])),
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: K, width: 58 } }, { text: '(' },
              { input: { answer: bb, width: 54 } }, { text: m(v) }, { text: '+' },
              { input: { answer: cc, width: 54 } }, { text: ')' }
            ]
          },
          note: i === 0 ? 'The first box is the highest common factor.' : null,
          explain: `<span class="work">HCF is ${K}: \\(${K}(${S([[bb, v], [cc, '']])})\\)</span>`
        });
      }

      // Q4: which is fully factorised?
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const k = rng.int(2, 5) * 2, b = rng.int(1, 4), c = rng.int(1, 6);
        const expr = S([[2 * k * b, v], [2 * k * c, '']]);
        const opts = rng.shuffle([
          { html: m(`${2 * k}(${S([[b, v], [c, '']])})`), right: true },
          { html: m(`${k}(${S([[2 * b, v], [2 * c, '']])})`), right: false },
          { html: m(`2(${S([[k * b, v], [k * c, '']])})`),    right: false },
          { html: m(expr),                                     right: false }
        ]);
        out.push({
          prompt: 'Which is ' + m(expr) + ' <strong>fully</strong> factorised?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">Fully factorised means nothing is left to take out of the bracket.</span>`
        });
      })();

      // Q5: spot the mistake — half-factorised.
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const b = rng.int(1, 4), c = rng.int(1, 5);
        const expr = S([[12 * b, v], [12 * c, '']]);
        const lines = [
          m(expr),
          m(`= 2(${S([[6 * b, v], [6 * c, '']])})`),
          m(`= 2(${S([[6 * b, v], [6 * c, '']])}) \\quad \\text{done}`),
          m(`\\text{Answer: } 2(${S([[6 * b, v], [6 * c, '']])})`)
        ];
        out.push({
          prompt: 'Somebody factorised ' + m(expr) + ' like this.',
          input: { kind: 'spot', lines, wrong: 2, cue: 'Click the first line where the work should not have stopped.' },
          explain: `<span class="work">There is still a factor of 6 inside the bracket. Fully factorised: \\(12(${S([[b, v], [c, '']])})\\).</span>`
        });
      })();

      // Q6–7: a letter in the common factor.
      for (let i = 0; i < 2; i++) {
        const v = rng.pick(['x', 'y', 'n', 't']);
        const k = rng.int(2, 7);
        const b = rng.int(2, 6), c = i === 1 ? -rng.int(1, 7) : rng.int(1, 7);
        out.push({
          prompt: 'Factorise ' + m(S([[k * b, v + '^2'], [k * c, v]])),
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: k, width: 52 } }, { text: m(v) }, { text: '(' },
              { input: { answer: b, width: 52 } }, { text: m(v) }, { text: '+' },
              { input: { answer: c, width: 52 } }, { text: ')' }
            ]
          },
          note: i === 0 ? 'Both terms contain a ' + m(v) + ', so it comes outside too.' : null,
          explain: `<span class="work">\\(${T(k, v)}(${S([[b, v], [c, '']])})\\)</span>`
        });
      }

      // Q8–9: type the factorised form.
      for (let i = 0; i < 2; i++) {
        const v = rng.pick(['x', 'y', 'n', 'p']);
        const K = rng.pick([4, 6, 8, 9, 10, 12, 14, 15]);
        let b = rng.int(2, 7), c = rng.nonZero(-8, 8);
        while (gcd(b, c) !== 1) c = rng.nonZero(-8, 8);
        const target = S([[K * b, v], [K * c, '']]);
        out.push({
          prompt: 'Factorise ' + m(target) + ' completely.',
          tag: i === 1 ? 'Challenge' : null,
          note: i === 0 ? 'Type it with a bracket, for example <code>3(2x + 5)</code>.' : null,
          input: {
            kind: 'expr', mode: 'factorised', answer: target, prefix: '=',
            display: m(`${K}(${S([[b, v], [c, '']])})`), placeholder: 'e.g. 3(2' + v + ' + 5)'
          },
          explain: `<span class="work">HCF is ${K}.</span>`
        });
      }

      // Q10: three terms.
      (() => {
        const v = rng.pick(['x', 'y', 'n']);
        const K = rng.pick([2, 3, 4, 5, 6]);
        const a = rng.int(2, 6), b = rng.nonZero(-7, 7), c = rng.int(1, 7);
        out.push({
          prompt: 'Factorise ' + m(S([[K * a, v + '^2'], [K * b, v], [K * c, '']])),
          tag: 'Challenge',
          input: {
            kind: 'fill',
            parts: [
              { text: '=' }, { input: { answer: K, width: 52 } }, { text: '(' },
              { input: { answer: a, width: 50 } }, { text: m(v + '^2') }, { text: '+' },
              { input: { answer: b, width: 50 } }, { text: m(v) }, { text: '+' },
              { input: { answer: c, width: 50 } }, { text: ')' }
            ]
          },
          note: 'Only a number comes out here: the last term has no ' + m(v) + '.',
          explain: `<span class="work">\\(${K}(${S([[a, v + '^2'], [b, v], [c, '']])})\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 2.4 Solving ax + b = c ═══════════════════════════════════════════════
  Topics.u2e4 = {
    id: 'u2e4', unit: 2,
    title: 'Solving ax + b = c',
    blurb: 'Undo the equation one step at a time, doing the same to both sides.',
    hint: 'Undo in reverse order: get rid of the added or subtracted number first, then divide by the coefficient. Whatever you do to one side, do to the other.',

    examples: [
      {
        title: 'Example 1: \\(2x + 3 = 11\\)',
        diagram: { w: 260, h: 150, caption: 'Both pans weigh the same: \\(2x + 3 = 11\\)' },
        draw(d) { Dia.balance(d, { lx: 2, lc: 3, rx: 0, rc: 11 }); },
        steps: [
          'The scales balance, so both sides weigh the same.',
          'Take 3 away from <em>both</em> sides: \\(2x = 8\\). The scales still balance.',
          'Two \\(x\\) boxes weigh 8, so one weighs 4. Divide both sides by 2.',
          'Check: \\(2 \\times 4 + 3 = 11\\). ✓'
        ],
        result: 'Answer: \\(x = 4\\)'
      },
      {
        title: 'Example 2: \\(5n - 7 = 23\\)',
        steps: [
          'The 7 is being subtracted, so undo it by adding 7 to both sides: \\(5n = 30\\).',
          'The \\(n\\) is multiplied by 5, so undo it by dividing both sides by 5.',
          '\\(n = 6\\). Check: \\(5 \\times 6 - 7 = 23\\). ✓'
        ],
        result: 'Answer: \\(n = 6\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: put the solving steps in order.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const a = rng.int(2, 6), x = rng.int(2, 9), b = rng.int(2, 12);
        const c = a * x + b;
        const items = [
          m(`${T(a, v)} + ${b} = ${c}`),
          m(`${T(a, v)} = ${c - b}`),
          m(`${v} = ${x}`),
          `Check: ${m(`${a}\\times ${x} + ${b} = ${c}`)} ✓`
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Put the steps for solving ' + m(`${T(a, v)} + ${b} = ${c}`) + ' into order.',
          input: {
            kind: 'order',
            items: order.map(i => items[i]),
            answer: [0, 1, 2, 3].map(i => order.indexOf(i)),
            cue: 'Click the steps in the order you would write them. Click one again to take it back.'
          },
          explain: `<span class="work">Subtract ${b}, then divide by ${a}, then check.</span>`
        });
      })();

      // Q2: which move first?
      (() => {
        const v = rng.pick(['x', 'n', 'p']);
        const a = rng.int(3, 8), x = rng.int(2, 9);
        // b must differ from a, or two of the distractors read the same.
        const b = rng.intExcept(3, 14, [a]);
        const c = a * x + b;
        const opts = rng.shuffle([
          { html: `Subtract ${b} from both sides`, right: true },
          { html: `Divide both sides by ${a}`,     right: false },
          { html: `Add ${b} to both sides`,        right: false },
          { html: `Subtract ${a} from both sides`, right: false }
        ]);
        out.push({
          prompt: 'To solve ' + m(`${T(a, v)} + ${b} = ${c}`) + ', what is the sensible <strong>first</strong> move?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">Undo the adding before the multiplying, so the ${T(a, v)} is left on its own.</span>`
        });
      })();

      // Q3–5: straightforward solves, with a balance picture on the first.
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(['x', 'n', 'y', 'm', 't']);
        const a = rng.int(2, 9);
        const x = hard ? rng.nonZero(-9, 12) : rng.int(2, 12);
        const b = hard ? rng.nonZero(-15, 15) : rng.int(1, 15) * (i === 2 ? -1 : 1);
        const c = a * x + b;
        const showBalance = i === 0 && a * x + b > 0 && a <= 4 && Math.abs(b) <= 8 && x > 0 && c <= 22;
        out.push({
          prompt: 'Solve ' + m(`${S([[a, v], [b, '']])} = ${c}`),
          diagram: showBalance ? { w: 240, h: 140 } : undefined,
          draw: showBalance
            ? d => Dia.balance(d, { lx: a, lc: b, rx: 0, rc: c })
            : undefined,
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">${b < 0 ? 'Add ' + Math.abs(b) : 'Subtract ' + b} from both sides: \\(${T(a, v)} = ${c - b}\\). Divide by ${a}: \\(${v} = ${Fmt.num(x)}\\).</span>`
        });
      }

      // Q6: spot the mistake — moved the term the wrong way.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const a = rng.int(2, 6), x = rng.int(2, 9), b = rng.int(3, 12);
        const c = a * x + b;
        const lines = [
          m(`${T(a, v)} + ${b} = ${c}`),
          m(`${T(a, v)} = ${c} + ${b}`),
          m(`${T(a, v)} = ${c + b}`),
          m(`${v} = ${Fmt.dp((c + b) / a, 2)}`)
        ];
        out.push({
          prompt: 'Somebody solved ' + m(`${T(a, v)} + ${b} = ${c}`) + ' like this.',
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 added ${b} to the right instead of subtracting it. Moving \\(+${b}\\) across the equals sign makes it \\(-${b}\\), giving \\(${T(a, v)} = ${c - b}\\) and \\(${v} = ${x}\\).</span>`
        });
      })();

      // Q7: fraction form, x/a + b = c.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const a = rng.int(2, 6), x = a * rng.int(2, 8), b = rng.nonZero(-10, 10);
        const c = x / a + b;
        out.push({
          prompt: 'Solve ' + m(`\\frac{${v}}{${a}} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${c}`),
          note: 'Here ' + m(v) + ' is divided by ' + a + ', so the last step multiplies.',
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">${b < 0 ? 'Add ' + Math.abs(b) : 'Subtract ' + b}: \\(\\frac{${v}}{${a}} = ${c - b}\\). Multiply both sides by ${a}: \\(${v} = ${x}\\).</span>`
        });
      })();

      // Q8: bracket on the left.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const k = rng.int(2, 6), x = rng.int(2, 9), b = rng.nonZero(-8, 8);
        const c = k * (x + b);
        out.push({
          prompt: 'Solve ' + m(`${k}(${S([[1, v], [b, '']])}) = ${c}`),
          tag: 'Challenge',
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">Divide both sides by ${k}: \\(${S([[1, v], [b, '']])} = ${c / k}\\), so \\(${v} = ${x}\\). Expanding first works too.</span>`
        });
      })();

      // Q9: negative coefficient.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const a = -rng.int(2, 7), x = rng.nonZero(-8, 9), b = rng.nonZero(-12, 12);
        const c = a * x + b;
        out.push({
          prompt: 'Solve ' + m(`${S([[a, v], [b, '']])} = ${c}`),
          tag: 'Challenge',
          note: 'Dividing by a negative number flips the sign of the answer.',
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">\\(${T(a, v)} = ${Fmt.num(c - b)}\\), then divide by ${a}: \\(${v} = ${Fmt.num(x)}\\).</span>`
        });
      })();

      // Q10: substitute back to check understanding.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const a = rng.int(2, 7), x = rng.int(2, 9), b = rng.nonZero(-10, 10);
        const c = a * x + b;
        const wrongX = x + rng.pick([-2, -1, 1, 2]);
        out.push({
          prompt: 'Is ' + m(`${v} = ${wrongX}`) + ' a solution of ' + m(`${S([[a, v], [b, '']])} = ${c}`) + '?',
          tag: 'Challenge',
          note: 'Substitute and see what the left side comes to.',
          input: {
            kind: 'choice',
            options: [
              { html: 'Yes, it works' },
              { html: 'No, the left side comes to something else' }
            ],
            correct: 1
          },
          explain: `<span class="work">Substituting: \\(${a}\\times ${Fmt.num(wrongX)} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${Fmt.num(a * wrongX + b)}\\), not ${Fmt.num(c)}. The solution is \\(${v} = ${x}\\).</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 2.5 Unknowns on both sides ═══════════════════════════════════════════
  Topics.u2e5 = {
    id: 'u2e5', unit: 2,
    title: 'Unknowns on Both Sides',
    blurb: 'Equations like ax + b = cx + d: gather the letters on one side first.',
    hint: 'Move the smaller group of letters across, so the coefficient you are left with is positive. A term changes sign when it crosses the equals sign.',

    examples: [
      {
        title: 'Example 1: \\(5x + 2 = 3x + 10\\)',
        diagram: { w: 280, h: 160, caption: '\\(x\\) boxes on both pans: \\(5x + 2 = 3x + 10\\)' },
        draw(d) { Dia.balance(d, { lx: 5, lc: 2, rx: 3, rc: 10 }); },
        steps: [
          'Both pans hold \\(x\\) boxes. Take 3 boxes off <em>each</em> side: \\(2x + 2 = 10\\).',
          'Now it is an ordinary one-sided equation. Take 2 off both sides: \\(2x = 8\\).',
          'Divide both sides by 2: \\(x = 4\\).',
          'Check both sides: \\(5(4) + 2 = 22\\) and \\(3(4) + 10 = 22\\). ✓'
        ],
        result: 'Answer: \\(x = 4\\)'
      },
      {
        title: 'Example 2: \\(4n - 3 = 9 - 2n\\)',
        steps: [
          'The \\(n\\) terms are \\(4n\\) and \\(-2n\\). Add \\(2n\\) to both sides so neither side has a negative: \\(6n - 3 = 9\\).',
          'Add 3 to both sides: \\(6n = 12\\).',
          'Divide by 6: \\(n = 2\\).'
        ],
        result: 'Answer: \\(n = 2\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      /** An equation ax + b = cx + d with a chosen whole-number solution. */
      const build = (x, aLo, aHi) => {
        let a = rng.int(aLo, aHi), c = rng.int(1, aHi - 1);
        while (a === c) c = rng.int(1, aHi - 1);
        const b = hard ? rng.nonZero(-12, 12) : rng.int(1, 12);
        const d = (a - c) * x + b;
        return { a, b, c, d };
      };

      // Q1: order the steps.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const x = rng.int(2, 7);
        const { a, b, c, d } = build(x, 4, 8);
        const items = [
          m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`),
          `Take ${m(T(c, v))} from both sides: ${m(`${S([[a - c, v], [b, '']])} = ${d}`)}`,
          `${b < 0 ? 'Add ' + Math.abs(b) : 'Take ' + b + ' away'}: ${m(`${T(a - c, v)} = ${d - b}`)}`,
          `Divide by ${a - c}: ${m(`${v} = ${x}`)}`
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Put these steps into the order you would write them.',
          input: {
            kind: 'order',
            items: order.map(i => items[i]),
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: `<span class="work">Letters together first, then numbers, then divide.</span>`
        });
      })();

      // Q2: which side should the letters go to?
      (() => {
        const v = rng.pick(['x', 'n']);
        const x = rng.int(2, 8);
        const small = rng.int(2, 4), big = small + rng.int(2, 5);
        const b = rng.int(2, 10), d = (big - small) * x + b;
        const opts = rng.shuffle([
          { html: `Subtract ${m(T(small, v))} from both sides`, right: true },
          { html: `Subtract ${m(T(big, v))} from both sides`,   right: false },
          { html: `Add ${m(T(big, v))} to both sides`,          right: false },
          { html: `Divide both sides by ${m(v)}`,               right: false }
        ]);
        out.push({
          prompt: 'For ' + m(`${S([[big, v], [b, '']])} = ${S([[small, v], [d, '']])}`) +
                  ', which move leaves a <strong>positive</strong> number of ' + m(v) + '?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">Move the smaller group of letters. Taking ${T(small, v)} off both sides leaves ${T(big - small, v)} on the left.</span>`
        });
      })();

      // Q3–5: solve.
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(['x', 'n', 'y', 'm', 't']);
        const x = hard ? rng.nonZero(-8, 10) : rng.int(2, 10);
        const { a, b, c, d } = build(x, 4, 9);
        const showBalance = i === 0 && x > 0 && b > 0 && d > 0 && a <= 6 && c <= 4 && b <= 6 && d <= 14;
        out.push({
          prompt: 'Solve ' + m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`),
          diagram: showBalance ? { w: 270, h: 145 } : undefined,
          draw: showBalance ? dd => Dia.balance(dd, { lx: a, lc: b, rx: c, rc: d }) : undefined,
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">Take ${T(c, v)} from both sides: \\(${S([[a - c, v], [b, '']])} = ${Fmt.num(d)}\\). Then \\(${T(a - c, v)} = ${Fmt.num(d - b)}\\), so \\(${v} = ${Fmt.num(x)}\\).</span>`
        });
      }

      // Q6: spot the mistake — sign error crossing the equals sign.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const x = rng.int(2, 8);
        const c = rng.int(2, 4), a = c + rng.int(2, 5);
        const b = rng.int(2, 10), d = (a - c) * x + b;
        const lines = [
          m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`),
          m(`${S([[a + c, v], [b, '']])} = ${d}`),
          m(`${T(a + c, v)} = ${d - b}`),
          m(`${v} = ${Fmt.dp((d - b) / (a + c), 2)}`)
        ];
        out.push({
          prompt: 'Somebody solved ' + m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`) + ' like this.',
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 added ${T(c, v)} to the left instead of subtracting it. Taking ${T(c, v)} off both sides gives \\(${S([[a - c, v], [b, '']])} = ${d}\\), and \\(${v} = ${x}\\).</span>`
        });
      })();

      // Q7: letters on the right are larger.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const x = rng.int(2, 9);
        const a = rng.int(1, 4), c = a + rng.int(2, 5);
        const d = rng.nonZero(-10, 10);
        const b = (c - a) * x + d;
        out.push({
          prompt: 'Solve ' + m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`),
          note: 'The bigger group of letters is on the right this time.',
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">Take ${T(a, v)} from both sides: \\(${Fmt.num(b)} = ${S([[c - a, v], [d, '']])}\\), so \\(${T(c - a, v)} = ${Fmt.num(b - d)}\\) and \\(${v} = ${x}\\).</span>`
        });
      })();

      // Q8: a negative coefficient on one side.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const x = rng.int(2, 8);
        const a = rng.int(3, 7), c = -rng.int(1, 4);
        const b = rng.nonZero(-9, 9);
        const d = (a - c) * x + b;
        out.push({
          prompt: 'Solve ' + m(`${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}`),
          tag: 'Challenge',
          input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
          explain: `<span class="work">Adding ${T(-c, v)} to both sides gives \\(${S([[a - c, v], [b, '']])} = ${Fmt.num(d)}\\), so \\(${v} = ${x}\\).</span>`
        });
      })();

      // Q9: brackets on both sides.
      (() => {
        const v = rng.pick(['x', 'n', 'y']);
        const x = rng.int(2, 8);
        const k1 = rng.int(2, 5), p = rng.nonZero(-6, 6);
        let k2 = rng.int(1, 4); while (k2 === k1) k2 = rng.int(1, 4);
        const q = ((k1 - k2) * x + k1 * p) / k2;
        // Choose p so q lands on a whole number.
        const qq = Math.round(q);
        const pp = (k2 * qq - (k1 - k2) * x) / k1;
        if (!Number.isInteger(pp) || pp === 0) {
          const p2 = rng.nonZero(-5, 5);
          const rhsTotal = k1 * (x + p2);
          out.push({
            prompt: 'Solve ' + m(`${k1}(${S([[1, v], [p2, '']])}) = ${rhsTotal}`),
            tag: 'Challenge',
            input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
            explain: `<span class="work">Divide by ${k1}: \\(${S([[1, v], [p2, '']])} = ${rhsTotal / k1}\\), so \\(${v} = ${x}\\).</span>`
          });
        } else {
          out.push({
            prompt: 'Solve ' + m(`${k1}(${S([[1, v], [pp, '']])}) = ${k2}(${S([[1, v], [qq, '']])})`),
            tag: 'Challenge',
            note: 'Expand both brackets first.',
            input: { kind: 'number', prefix: m(v) + ' =', answer: x, width: 78 },
            explain: `<span class="work">Expanding: \\(${S([[k1, v], [k1 * pp, '']])} = ${S([[k2, v], [k2 * qq, '']])}\\), which gives \\(${v} = ${x}\\).</span>`
          });
        }
      })();

      // Q10: write the equation from a statement, then solve.
      (() => {
        const v = 'n';
        const x = rng.int(3, 12);
        const a = rng.int(3, 6), c = rng.int(1, a - 1);
        const b = rng.int(2, 9);
        const d = (a - c) * x + b;
        out.push({
          prompt: `I think of a number, multiply it by ${a} and add ${b}. ` +
                  `I get the same answer as multiplying the number by ${c} and adding ${d}. ` +
                  'What is the number?',
          tag: 'Challenge',
          note: 'Write the equation first: ' + m(`${T(a, v)} + ${b} = ${T(c, v)} + ${d}`),
          input: { kind: 'number', prefix: 'The number is', answer: x, width: 78 },
          explain: `<span class="work">\\(${S([[a, v], [b, '']])} = ${S([[c, v], [d, '']])}\\) gives \\(${T(a - c, v)} = ${d - b}\\), so \\(${v} = ${x}\\).</span>`
        });
      })();

      return out;
    }
  };

})();
