'use strict';
// ── Maths Revise · Unit 5 topics ────────────────────────────────────────────
// Translating between English and algebra, in both directions, and then using
// that to set up equations from word problems.
//
// The traps are deliberate and repeated: "5 less than n" is n − 5, not 5 − n;
// "double the sum of n and 3" needs brackets while "3 more than double n"
// does not. Those two distinctions cause most of the errors at this level, so
// the distractors are built around them rather than around random wrong
// numbers.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});
  const S = Fmt.sum, T = Fmt.term, m = Fmt.tex;

  /**
   * A bank of phrase patterns. Each gives the English, the algebra as a
   * string the parser accepts, and how it should be displayed.
   * `v` is the letter, `a` and `b` are small whole numbers.
   */
  const PHRASES = [
    { key: 'moreThan',   en: (v, a) => `${a} more than ${v}`,                  ex: (v, a) => `${v} + ${a}`,        tex: (v, a) => `${v} + ${a}` },
    { key: 'lessThan',   en: (v, a) => `${a} less than ${v}`,                  ex: (v, a) => `${v} - ${a}`,        tex: (v, a) => `${v} - ${a}`, trap: 'order' },
    { key: 'increased',  en: (v, a) => `${v} increased by ${a}`,               ex: (v, a) => `${v} + ${a}`,        tex: (v, a) => `${v} + ${a}` },
    { key: 'decreased',  en: (v, a) => `${v} decreased by ${a}`,               ex: (v, a) => `${v} - ${a}`,        tex: (v, a) => `${v} - ${a}` },
    { key: 'sum',        en: (v, a) => `the sum of ${v} and ${a}`,             ex: (v, a) => `${v} + ${a}`,        tex: (v, a) => `${v} + ${a}` },
    { key: 'times',      en: (v, a) => `${a} times ${v}`,                      ex: (v, a) => `${a}*${v}`,          tex: (v, a) => T(a, v) },
    { key: 'product',    en: (v, a) => `the product of ${a} and ${v}`,         ex: (v, a) => `${a}*${v}`,          tex: (v, a) => T(a, v) },
    { key: 'double',     en: v => `double ${v}`,                               ex: v => `2*${v}`,                  tex: v => T(2, v) },
    { key: 'dividedBy',  en: (v, a) => `${v} divided by ${a}`,                 ex: (v, a) => `${v}/${a}`,          tex: (v, a) => `\\frac{${v}}{${a}}`, trap: 'order' },
    { key: 'half',       en: v => `half of ${v}`,                              ex: v => `${v}/2`,                  tex: v => `\\frac{${v}}{2}` },
    { key: 'timesPlus',  en: (v, a, b) => `${b} more than ${a} times ${v}`,    ex: (v, a, b) => `${a}*${v} + ${b}`, tex: (v, a, b) => S([[a, v], [b, '']]) },
    { key: 'timesMinus', en: (v, a, b) => `${b} less than ${a} times ${v}`,    ex: (v, a, b) => `${a}*${v} - ${b}`, tex: (v, a, b) => S([[a, v], [-b, '']]), trap: 'order' },
    { key: 'sumTimes',   en: (v, a, b) => `${a} times the sum of ${v} and ${b}`, ex: (v, a, b) => `${a}*(${v} + ${b})`, tex: (v, a, b) => `${a}(${v} + ${b})`, trap: 'bracket' },
    { key: 'lessTimes',  en: (v, a, b) => `${a} times ${b} less than ${v}`,    ex: (v, a, b) => `${a}*(${v} - ${b})`, tex: (v, a, b) => `${a}(${v} - ${b})`, trap: 'bracket' }
  ];

  const byKey = k => PHRASES.find(p => p.key === k);

  /** Build one phrase with concrete numbers. */
  function phrase(rng, keys, v) {
    const p = rng.pick(keys.map(byKey));
    const a = rng.int(2, 9);
    const b = rng.int(2, 9);
    return { p, v, a, b, en: p.en(v, a, b), ex: p.ex(v, a, b), tex: p.tex(v, a, b) };
  }

  /** Plausible wrong answers built from the classic misreadings. */
  function distractors(q) {
    const { p, v, a, b } = q;
    const out = [];
    switch (p.key) {
      case 'lessThan':   out.push(`${a} - ${v}`, `${v} + ${a}`, `${T(a, v)}`); break;
      case 'moreThan':
      case 'increased':
      case 'sum':        out.push(`${v} - ${a}`, `${T(a, v)}`, `${a} - ${v}`); break;
      case 'decreased':  out.push(`${a} - ${v}`, `${v} + ${a}`, `${T(a, v)}`); break;
      case 'times':
      case 'product':    out.push(`${v} + ${a}`, `${v} - ${a}`, `\\frac{${v}}{${a}}`); break;
      case 'double':     out.push(`${v} + 2`, `\\frac{${v}}{2}`, `${v} - 2`); break;
      case 'dividedBy':  out.push(`\\frac{${a}}{${v}}`, `${T(a, v)}`, `${v} - ${a}`); break;
      case 'half':       out.push(`2${v}`, `${v} - 2`, `${v} + 2`); break;
      case 'timesPlus':  out.push(S([[a, v], [-b, '']]), `${a}(${v} + ${b})`, S([[b, v], [a, '']])); break;
      case 'timesMinus': out.push(S([[a, v], [b, '']]), `${b} - ${T(a, v)}`, `${a}(${v} - ${b})`); break;
      case 'sumTimes':   out.push(S([[a, v], [b, '']]), `${v} + ${T(a, b)}`, `${a} + ${v} + ${b}`); break;
      case 'lessTimes':  out.push(S([[a, v], [-b, '']]), `${b} - ${T(a, v)}`, `${a}(${b} - ${v})`); break;
      default:           out.push(`${v} + ${a}`, `${v} - ${a}`, `${T(a, v)}`);
    }
    // Never offer a distractor that is actually right.
    return out.filter(d => !Algebra.equal(d.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)'), q.ex));
  }

  // ═══ 5.1 Words to expressions ═════════════════════════════════════════════
  Topics.u5e1 = {
    id: 'u5e1', unit: 5,
    title: 'Words to Expressions',
    blurb: 'Turning a sentence into algebra, with the order the right way round.',
    hint: '"5 less than n" means you start at n and take 5 away: n − 5. "Times the sum of" needs a bracket, because the whole sum gets multiplied. Reading the phrase back to yourself afterwards is the quickest check.',

    examples: [
      {
        title: 'Example 1: "7 less than n"',
        steps: [
          'Start with what you have: \\(n\\).',
          '"Less than" means take away, so take 7 off it.',
          'The answer is \\(n - 7\\), <strong>not</strong> \\(7 - n\\). The order matters: \\(7 - n\\) would be "n less than 7".'
        ],
        result: 'Answer: \\(n - 7\\)'
      },
      {
        title: 'Example 2: "3 times the sum of n and 4"',
        diagram: { w: 240, h: 118, caption: '\\(3(n + 4) = 3n + 12\\)' },
        draw(d) {
          Dia.areaModel(d, '3', [
            { label: 'n', product: '3n', width: 2 },
            { label: '4', product: '12', width: 1.4 }
          ]);
        },
        steps: [
          'The sum of \\(n\\) and 4 is \\(n + 4\\).',
          'All of it is multiplied by 3, so it needs a bracket: \\(3(n + 4)\\).',
          'Without the bracket, \\(3n + 4\\) would only multiply the \\(n\\).'
        ],
        result: 'Answer: \\(3(n + 4)\\)'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';
      const LETTERS = ['n', 'x', 'y', 'p', 't', 'k'];
      const SIMPLE = ['moreThan', 'lessThan', 'increased', 'decreased', 'sum', 'times', 'product', 'double', 'dividedBy', 'half'];
      const TWO    = ['timesPlus', 'timesMinus', 'sumTimes', 'lessTimes'];

      // Q1–3: choose the matching expression.
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(LETTERS);
        const q = phrase(rng, i < 2 ? SIMPLE : (hard ? TWO : SIMPLE), v);
        const wrong = rng.sample(distractors(q), Math.min(3, distractors(q).length));
        const opts = rng.shuffle([{ html: m(q.tex), right: true }, ...wrong.map(w => ({ html: m(w), right: false }))]);
        out.push({
          prompt: `Which expression means <strong>“${q.en}”</strong>?`,
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">\\(${q.tex}\\)</span>`
        });
      }

      // Q4–6: type the expression.
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(LETTERS);
        const q = phrase(rng, i === 2 || hard ? TWO : SIMPLE, v);
        out.push({
          prompt: `Write <strong>“${q.en}”</strong> as an expression.`,
          note: i === 0 ? 'Type it as you would write it, for example <code>2n + 5</code> or <code>3(n - 1)</code>.' : null,
          input: { kind: 'expr', answer: q.ex, display: m(q.tex), placeholder: 'e.g. 2' + v + ' + 5' },
          explain: `<span class="work">\\(${q.tex}\\)</span>`
        });
      }

      // Q7: spot the mistake — reversed a subtraction.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(3, 9);
        const lines = [
          `The phrase is “${a} less than ${v}”.`,
          `“Less than” means subtract, so write the ${a} first.`,
          m(`${a} - ${v}`),
          `So the expression is ${m(`${a} - ${v}`)}.`
        ];
        out.push({
          prompt: `Somebody turned “${a} less than ${v}” into algebra like this.`,
          input: { kind: 'spot', lines, wrong: 1 },
          explain: `<span class="work">Line 2 is where it goes wrong. You start at \\(${v}\\) and take ${a} away, so it is \\(${v} - ${a}\\). \\(${a} - ${v}\\) would mean “\\(${v}\\) less than ${a}”.</span>`
        });
      })();

      // Q8: match phrases to expressions.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6), b = rng.int(2, 8);
        const rows = [
          { en: `${b} more than ${a} times ${v}`,           tex: S([[a, v], [b, '']]) },
          { en: `${a} times the sum of ${v} and ${b}`,       tex: `${a}(${v} + ${b})` },
          { en: `${b} less than ${a} times ${v}`,            tex: S([[a, v], [-b, '']]) },
          { en: `${a} times ${v}, then ${b} taken off`,      tex: S([[a, v], [-b, '']]) }
        ];
        // The last two mean the same thing, so replace one of them.
        rows[3] = { en: `${a} more than ${v}`, tex: S([[1, v], [a, '']]) };
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each phrase to its expression.',
          input: {
            kind: 'match',
            left: rows.map(r => r.en),
            right: order.map(i => m(rows[i].tex)),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: '<span class="work">Watch which ones need a bracket.</span>'
        });
      })();

      // Q9: bracket or no bracket?
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6), b = rng.int(2, 9);
        const needsBracket = rng.chance();
        const en = needsBracket
          ? `${a} times the sum of ${v} and ${b}`
          : `${b} more than ${a} times ${v}`;
        const opts = rng.shuffle([
          { html: m(`${a}(${v} + ${b})`), right: needsBracket },
          { html: m(S([[a, v], [b, '']])), right: !needsBracket }
        ]);
        out.push({
          prompt: `Does <strong>“${en}”</strong> need a bracket?`,
          tag: 'Challenge',
          note: 'A bracket means the whole thing inside gets multiplied.',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: needsBracket
            ? `<span class="work">The sum happens first, so it goes in a bracket: \\(${a}(${v} + ${b})\\).</span>`
            : `<span class="work">Only the \\(${v}\\) is multiplied here, so no bracket: \\(${S([[a, v], [b, '']])}\\).</span>`
        });
      })();

      // Q10: a short real-world phrase.
      (() => {
        const v = 'n';
        const a = rng.int(2, 8), b = rng.int(2, 15);
        const kind = rng.pick([
          { en: `A taxi charges $${b} to start, plus $${a} for every kilometre. Write the cost of a journey of ${m(v)} kilometres.`, ex: `${a}*${v} + ${b}`, tex: S([[a, v], [b, '']]) },
          { en: `A pack holds ${a} pens. Write the number of pens in ${m(v)} packs, after ${b} are given away.`,                    ex: `${a}*${v} - ${b}`, tex: S([[a, v], [-b, '']]) },
          { en: `${m(v)} sweets are shared equally between ${a} people. Write how many each person gets.`,                          ex: `${v}/${a}`,        tex: `\\frac{${v}}{${a}}` },
          { en: `A rectangle is ${m(v)} cm wide and ${b} cm longer than it is wide. Write its length.`,                             ex: `${v} + ${b}`,      tex: `${v} + ${b}` }
        ]);
        out.push({
          prompt: kind.en,
          tag: 'Challenge',
          input: { kind: 'expr', answer: kind.ex, display: m(kind.tex), placeholder: 'e.g. 3n + 4' },
          explain: `<span class="work">\\(${kind.tex}\\)</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 5.2 Expressions to words ═════════════════════════════════════════════
  Topics.u5e2 = {
    id: 'u5e2', unit: 5,
    title: 'Expressions to Words',
    blurb: 'Reading algebra back as a sentence, and spotting when two readings differ.',
    hint: 'Read the expression from the outside in. In 3(n + 2) the bracket happens first, so it is "3 times the sum of n and 2". In 3n + 2 the multiplying happens first, so it is "2 more than 3 times n".',

    examples: [
      {
        title: 'Example: \\(2n - 5\\) and \\(2(n - 5)\\) are different',
        steps: [
          '\\(2n - 5\\): double \\(n\\) first, then take 5 away. In words, "5 less than double \\(n\\)".',
          '\\(2(n - 5)\\): take 5 away first, then double the result. In words, "double the amount 5 less than \\(n\\)".',
          'Try \\(n = 10\\): the first gives \\(15\\), the second gives \\(10\\). Substituting a number is the fastest way to tell two readings apart.'
        ],
        result: 'The bracket changes which operation happens first.'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const LETTERS = ['n', 'x', 'y', 'p', 't'];

      // Q1–3: which sentence means this expression?
      for (let i = 0; i < 3; i++) {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6), b = rng.int(2, 9);
        const forms = [
          { tex: S([[a, v], [b, '']]),  en: `${b} more than ${a} times ${v}` },
          { tex: S([[a, v], [-b, '']]), en: `${b} less than ${a} times ${v}` },
          { tex: `${a}(${v} + ${b})`,   en: `${a} times the sum of ${v} and ${b}` },
          { tex: `${a}(${v} - ${b})`,   en: `${a} times the amount ${b} less than ${v}` },
          { tex: `\\frac{${v}}{${a}}`,  en: `${v} shared equally into ${a} parts` }
        ];
        const right = forms[i % forms.length];
        const wrong = rng.sample(forms.filter(f => f.en !== right.en), 3);
        const opts = rng.shuffle([{ html: right.en, right: true }, ...wrong.map(w => ({ html: w.en, right: false }))]);
        out.push({
          prompt: 'Which sentence means ' + m(right.tex) + '?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">${right.en}.</span>`
        });
      }

      // Q4: substitute to tell two expressions apart.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 5), b = rng.int(2, 8);
        const n = rng.int(3, 12);
        out.push({
          prompt: `With ${m(`${v} = ${n}`)}, work out both expressions.`,
          note: 'This is how you check that a bracket really does change the answer.',
          input: {
            kind: 'fill',
            parts: [
              { text: m(S([[a, v], [-b, '']])) + ' =' }, { input: { answer: a * n - b, width: 62 } },
              { text: '&nbsp;&nbsp;' + m(`${a}(${v} - ${b})`) + ' =' }, { input: { answer: a * (n - b), width: 62 } }
            ]
          },
          explain: `<span class="work">\\(${a} \\times ${n} - ${b} = ${a * n - b}\\), but \\(${a}(${n} - ${b}) = ${a} \\times ${n - b} = ${a * (n - b)}\\).</span>`
        });
      })();

      // Q5: spot the mistake in a reading.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6), b = rng.int(2, 9);
        const lines = [
          `The expression is ${m(`${a}(${v} + ${b})`)}.`,
          `The bracket means add ${b} to ${v} first.`,
          `Then multiply only the ${v} by ${a}.`,
          `So in words: “${b} more than ${a} times ${v}”.`
        ];
        out.push({
          prompt: 'Somebody read ' + m(`${a}(${v} + ${b})`) + ' aloud like this.',
          input: { kind: 'spot', lines, wrong: 2 },
          explain: `<span class="work">Line 3 is wrong: the ${a} multiplies the <em>whole</em> bracket. In words it is “${a} times the sum of ${v} and ${b}”, which expands to \\(${S([[a, v], [a * b, '']])}\\).</span>`
        });
      })();

      // Q6: match expressions to sentences.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 5), b = rng.int(2, 8);
        const rows = [
          { tex: S([[a, v], [b, '']]),  en: `${b} more than ${a} times ${v}` },
          { tex: `${a}(${v} + ${b})`,   en: `${a} times the sum of ${v} and ${b}` },
          { tex: S([[1, v], [a * b, '']]), en: `${a * b} more than ${v}` },
          { tex: `\\frac{${v} + ${b}}{${a}}`, en: `${b} more than ${v}, then shared into ${a} parts` }
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Match each expression to its meaning.',
          input: {
            kind: 'match',
            left: rows.map(r => m(r.tex)),
            right: order.map(i => rows[i].en),
            tags: ['A', 'B', 'C', 'D'],
            answer: [0, 1, 2, 3].map(i => order.indexOf(i))
          },
          explain: ''
        });
      })();

      // Q7–8: are these two the same?
      for (let i = 0; i < 2; i++) {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6), b = rng.int(2, 8);
        const same = rng.chance();
        const left  = `${a}(${v} + ${b})`;
        const right = same ? S([[a, v], [a * b, '']]) : S([[a, v], [b, '']]);
        out.push({
          prompt: `Do ${m(left)} and ${m(right)} always give the same answer?`,
          tag: i === 1 ? 'Challenge' : null,
          note: 'Try substituting a number if you are not sure.',
          input: { kind: 'choice', options: ['Yes, always', 'No, they are different'], correct: same ? 0 : 1 },
          explain: same
            ? `<span class="work">Expanding the bracket gives \\(${S([[a, v], [a * b, '']])}\\), which is the same expression.</span>`
            : `<span class="work">Expanding gives \\(${S([[a, v], [a * b, '']])}\\), not \\(${right}\\). With \\(${v} = 1\\) they give ${a * (1 + b)} and ${a + b}.</span>`
        });
      }

      // Q9: write a sentence, checked by choosing the right one.
      (() => {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 6);
        const opts = rng.shuffle([
          { html: `${v} shared equally between ${a} people`, right: true },
          { html: `${a} shared equally between ${v} people`, right: false },
          { html: `${a} times ${v}`,                         right: false },
          { html: `${a} more than ${v}`,                     right: false }
        ]);
        out.push({
          prompt: 'Which sentence describes ' + m(`\\frac{${v}}{${a}}`) + '?',
          tag: 'Challenge',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">The letter is on top, so it is the amount being shared.</span>`
        });
      })();

      // Q10: read a two-step expression in context.
      (() => {
        const a = rng.int(2, 9);
        // The per-item and fixed amounts must differ, or two options read alike.
        const b = rng.intExcept(5, 25, [a]);
        const opts = rng.shuffle([
          { html: `A fixed charge of $${b}, plus $${a} for each item`, right: true },
          { html: `A fixed charge of $${a}, plus $${b} for each item`, right: false },
          { html: `$${a + b} for each item`,                            right: false },
          { html: `$${a} for each item, with $${b} taken off`,          right: false }
        ]);
        out.push({
          prompt: 'The cost in dollars of buying ' + m('n') + ' items is ' + m(S([[a, 'n'], [b, '']])) +
                  '. What does that mean?',
          tag: 'Challenge',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right), wide: true },
          explain: `<span class="work">The \\(${T(a, 'n')}\\) grows with the number of items, so ${a} is the cost each. The ${b} is there whatever you buy.</span>`
        });
      })();

      return out;
    }
  };

  // ═══ 5.3 Word problems to equations ═══════════════════════════════════════
  Topics.u5e3 = {
    id: 'u5e3', unit: 5,
    title: 'Word Problems to Equations',
    blurb: 'Naming the unknown, writing the equation, and only then solving it.',
    hint: 'Start by writing down what the letter stands for, in words. Then write one sentence of algebra that says the same thing as the problem. Solve last, and always read your answer back against the original question.',

    examples: [
      {
        title: 'Example: “I think of a number, double it and add 7. The answer is 23.”',
        diagram: { w: 250, h: 150, caption: '\\(2n + 7 = 23\\)' },
        draw(d) { Dia.balance(d, { lx: 2, lc: 7, rx: 0, rc: 23 }); },
        steps: [
          'Let \\(n\\) be the number I thought of. Write that down first.',
          '"Double it and add 7" is \\(2n + 7\\). "The answer is 23" gives the equals sign.',
          'The equation is \\(2n + 7 = 23\\).',
          'Solve: \\(2n = 16\\), so \\(n = 8\\). Check: \\(2 \\times 8 + 7 = 23\\). ✓'
        ],
        result: 'Answer: the number is 8'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1–2: which equation models the problem?
      for (let i = 0; i < 2; i++) {
        const a = rng.int(2, 6), b = rng.int(3, 15), n = rng.int(2, 12);
        const total = a * n + b;
        const opts = rng.shuffle([
          { html: m(`${T(a, 'n')} + ${b} = ${total}`), right: true },
          { html: m(`${T(a, 'n')} - ${b} = ${total}`), right: false },
          { html: m(`${a} + ${b}n = ${total}`),        right: false },
          { html: m(`${a}(n + ${b}) = ${total}`),      right: false }
        ]);
        out.push({
          prompt: `I think of a number, multiply it by ${a} and then add ${b}. The result is ${total}. ` +
                  'Which equation says that?',
          input: { kind: 'choice', options: opts, correct: opts.findIndex(o => o.right) },
          explain: `<span class="work">Multiply first, then add: \\(${T(a, 'n')} + ${b} = ${total}\\).</span>`
        });
      }

      // Q3–5: solve a worded problem.
      const CONTEXTS = [
        (a, b, n) => ({
          text: `A taxi charges a $${b} flag fall plus $${a} per kilometre. A trip costs $${a * n + b}. How far was it?`,
          unit: 'km', eq: `${T(a, 'd')} + ${b} = ${a * n + b}`, letter: 'd'
        }),
        (a, b, n) => ({
          text: `${a} friends share the cost of a present equally. They each pay $${n}, and the wrapping cost another $${b}. What did the present and wrapping cost together?`,
          unit: '$', eq: `${a} \\times ${n} + ${b}`, letter: null, direct: a * n + b
        }),
        (a, b, n) => ({
          text: `A gym charges $${b} to join plus $${a} a month. Someone has paid $${a * n + b} in total. How many months have they been a member?`,
          unit: 'months', eq: `${T(a, 'm')} + ${b} = ${a * n + b}`, letter: 'm'
        }),
        (a, b, n) => ({
          text: `A rectangle is ${b} cm longer than it is wide, and its perimeter is ${2 * (n + n + b)} cm. How wide is it?`,
          unit: 'cm', eq: `4w + ${2 * b} = ${2 * (n + n + b)}`, letter: 'w'
        })
      ];

      rng.sample([0, 1, 2, 3], 3).forEach(ci => {
        const a = rng.int(2, 8), b = rng.int(2, 20), n = rng.int(2, 14);
        const c = CONTEXTS[ci](a, b, n);
        const answer = c.direct !== undefined ? c.direct : n;
        out.push({
          prompt: c.text,
          note: 'The equation is ' + m(c.eq) + '.',
          input: { kind: 'number', suffix: c.unit === '$' ? null : c.unit, prefix: c.unit === '$' ? '$' : null, answer, width: 84 },
          explain: `<span class="work">Solving \\(${c.eq}\\) gives ${answer}${c.unit === '$' ? '' : ' ' + c.unit}.</span>`
        });
      });

      // Q6: order the modelling steps.
      (() => {
        const a = rng.int(2, 6), b = rng.int(3, 15), n = rng.int(2, 12);
        const total = a * n + b;
        const items = [
          'Say what the letter stands for: let ' + m('n') + ' be the number',
          'Write the equation: ' + m(`${T(a, 'n')} + ${b} = ${total}`),
          'Solve it: ' + m(`n = ${n}`),
          'Read the answer back against the question and check it makes sense'
        ];
        const order = rng.shuffle([0, 1, 2, 3]);
        out.push({
          prompt: 'Put the steps for tackling a word problem into order.',
          input: { kind: 'order', items: order.map(i => items[i]), answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
          explain: '<span class="work">Naming the unknown first is what stops the rest going wrong.</span>'
        });
      })();

      // Q7: spot the mistake — solved for the wrong thing.
      (() => {
        const a = rng.int(2, 6), b = rng.int(3, 12), n = rng.int(3, 12);
        const total = a * n + b;
        const lines = [
          `Let ${m('n')} be the number of tickets.`,
          m(`${T(a, 'n')} + ${b} = ${total}`),
          m(`${T(a, 'n')} = ${total + b}`),
          m(`n = ${Fmt.dp((total + b) / a, 2)}`)
        ];
        out.push({
          prompt: `Tickets cost $${a} each plus a $${b} booking fee, and the total was $${total}. ` +
                  'Somebody worked out the number of tickets like this.',
          input: { kind: 'spot', lines, wrong: 2 },
          explain: `<span class="work">Line 3 added the booking fee instead of taking it off. \\(${T(a, 'n')} = ${total - b}\\), so \\(n = ${n}\\).</span>`
        });
      })();

      // Q8: consecutive numbers.
      (() => {
        const n = rng.int(4, 30);
        const count = rng.pick([2, 3]);
        const total = count === 2 ? 2 * n + 1 : 3 * n + 3;
        out.push({
          prompt: `${count === 2 ? 'Two' : 'Three'} consecutive whole numbers add up to ${total}. What is the smallest one?`,
          tag: 'Challenge',
          note: count === 2
            ? 'If the smallest is ' + m('n') + ', the next is ' + m('n + 1') + '.'
            : 'If the smallest is ' + m('n') + ', the others are ' + m('n + 1') + ' and ' + m('n + 2') + '.',
          input: { kind: 'number', answer: n, width: 78 },
          explain: count === 2
            ? `<span class="work">\\(n + (n+1) = ${total}\\), so \\(2n + 1 = ${total}\\) and \\(n = ${n}\\).</span>`
            : `<span class="work">\\(n + (n+1) + (n+2) = ${total}\\), so \\(3n + 3 = ${total}\\) and \\(n = ${n}\\).</span>`
        });
      })();

      // Q9: two related unknowns.
      (() => {
        const small = rng.int(3, 20), diff2 = rng.int(2, 15);
        const total = 2 * small + diff2;
        out.push({
          prompt: `Two numbers add to ${total}. One is ${diff2} bigger than the other. What is the smaller number?`,
          tag: 'Challenge',
          note: 'Call the smaller one ' + m('n') + '. Then the other is ' + m(`n + ${diff2}`) + '.',
          input: { kind: 'number', answer: small, width: 78 },
          explain: `<span class="work">\\(n + (n + ${diff2}) = ${total}\\), so \\(2n = ${total - diff2}\\) and \\(n = ${small}\\). The other is ${small + diff2}.</span>`
        });
      })();

      // Q10: ages.
      (() => {
        const child = rng.int(6, 18), times = rng.int(2, 4);
        const total = child * (times + 1);
        out.push({
          prompt: `A parent is ${times} times as old as their child. Their ages add to ${total}. How old is the child?`,
          tag: 'Challenge',
          note: 'If the child is ' + m('c') + ', the parent is ' + m(`${times}c`) + '.',
          input: { kind: 'number', suffix: 'years', answer: child, width: 78 },
          explain: `<span class="work">\\(c + ${times}c = ${total}\\), so \\(${times + 1}c = ${total}\\) and \\(c = ${child}\\). The parent is ${child * times}.</span>`
        });
      })();

      return out;
    }
  };

})();
