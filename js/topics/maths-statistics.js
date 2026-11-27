'use strict';
// ── Revision · Data and Claims (Years 9–10 maths) ───────────────────────────
// The first look-ahead maths unit: Phase 4 (Years 9–10) statistics from the
// Mathematics and Statistics Years 0–10 learning area, November 2026, pages
// 43–44. It is the ground NCEA Level 1 stands on:
//   S1 Summarising Data   Year 9 statistics  →  NCEA 1.1 (explore data)
//   S2 Judging Claims     Year 10 statistics →  NCEA 1.3 (interpret information)
//
// Quartiles are found by splitting the ordered data into a lower and an upper
// half. Every data set here has an even number of values, so the halves are
// unambiguous and every common school method gives the same quartiles.
//
// Each exercise has a normal set and a Challenge set (?set=challenge).
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice;
  const INK = 'var(--dia-ink)', MUTED = 'var(--dia-muted)', ACC = 'var(--dia-accent)';
  const num = x => String(+(+x).toFixed(2));

  // ── Data helpers ──────────────────────────────────────────────────────────
  const sorted = a => a.slice().sort((x, y) => x - y);
  const median = a => {
    const s = sorted(a), n = s.length, h = n >> 1;
    return n % 2 ? s[h] : (s[h - 1] + s[h]) / 2;
  };
  /** Five-number summary of an even-sized data set: [min, Q1, median, Q3, max]. */
  const five = a => {
    const s = sorted(a), h = s.length / 2;
    return [s[0], median(s.slice(0, h)), median(s), median(s.slice(h)), s[s.length - 1]];
  };
  const mean = a => a.reduce((t, v) => t + v, 0) / a.length;

  /** `n` whole numbers between lo and hi with no repeats, in the order collected. */
  function dataSet(rng, n, lo, hi) {
    const seen = new Set();
    while (seen.size < n) seen.add(rng.int(lo, hi));
    return rng.shuffle([...seen]);
  }

  /** Things students might measure, with sensible whole-number ranges. */
  const CONTEXTS = [
    { lead: 'Reaction times of Year 9 students, in milliseconds', unit: 'ms', lo: 180, hi: 340 },
    { lead: 'Minutes Year 10 students spent on their phones yesterday', unit: 'min', lo: 15, hi: 240 },
    { lead: 'Heights of kōwhai seedlings in a school nursery, in cm', unit: 'cm', lo: 12, hi: 60 },
    { lead: 'Cooking times of hāngī at a marae, in minutes', unit: 'min', lo: 150, hi: 240 },
    { lead: 'Distances a Year 9 class travel to school, in km', unit: 'km', lo: 1, hi: 25 },
    { lead: 'Scores out of 50 in a Year 9 spelling test', unit: '', lo: 12, hi: 50 },
    { lead: 'Masses of snapper caught on a fishing trip off Raglan, in grams', unit: 'g', lo: 300, hi: 1800 }
  ];

  // ── Diagrams ──────────────────────────────────────────────────────────────
  /** A number line axis from lo to hi, ticks every `minor`, labels every `major`. */
  function axis(d, x0, x1, y, lo, hi, minor, major, unit) {
    const X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
    d.line([x0, y], [x1, y], { stroke: INK, width: 1.4 });
    for (let v = lo; v <= hi + 1e-9; v += minor) {
      const big = Math.abs((v - lo) / major - Math.round((v - lo) / major)) < 1e-6;
      d.line([X(v), y], [X(v), y + (big ? 7 : 4)], { stroke: INK, width: 1 });
      if (big) d.text([X(v), y + 17], num(v), { size: 10.5, bold: false });
    }
    if (unit) d.text([x1, y + 31], unit, { size: 10, anchor: 'end', fill: MUTED, bold: false });
    return X;
  }

  /**
   * Box plots on one shared scale.
   * o: { lo, hi, minor, major, unit, plots: [{ label, five: [min, q1, med, q3, max] }] }
   */
  function boxPlot(d, o) {
    const x0 = 18, x1 = d.w - 18, yAxis = d.h - 38;
    const X = axis(d, x0, x1, yAxis, o.lo, o.hi, o.minor, o.major, o.unit);
    const rowH = (yAxis - 12) / o.plots.length;
    o.plots.forEach((p, i) => {
      const yc = 12 + rowH * i + rowH / 2 + (o.plots.length > 1 ? 6 : 0), bh = Math.min(26, rowH * 0.45);
      const [mn, q1, md, q3, mx] = p.five.map(X);
      d.line([mn, yc], [q1, yc], { stroke: INK, width: 1.6 });
      d.line([q3, yc], [mx, yc], { stroke: INK, width: 1.6 });
      d.line([mn, yc - bh / 3], [mn, yc + bh / 3], { stroke: INK, width: 1.6 });
      d.line([mx, yc - bh / 3], [mx, yc + bh / 3], { stroke: INK, width: 1.6 });
      d.add('rect', { x: q1.toFixed(2), y: (yc - bh / 2).toFixed(2), width: (q3 - q1).toFixed(2), height: bh.toFixed(2),
                      fill: 'var(--brand)', 'fill-opacity': 0.16, stroke: INK, 'stroke-width': 1.6 });
      d.line([md, yc - bh / 2], [md, yc + bh / 2], { stroke: ACC, width: 2.4 });
      if (p.label) d.text([x0, yc - bh / 2 - 9], p.label, { size: 11, anchor: 'start' });
    });
  }

  /**
   * A bar graph drawn to scale on its own axis, which may not start at zero.
   * o: { bars: [{ label, value }], lo, hi, step, unit }
   */
  function barChart(d, o) {
    const x0 = 46, x1 = d.w - 12, yTop = 26, yBot = d.h - 30;
    const Y = v => yBot - (v - o.lo) / (o.hi - o.lo) * (yBot - yTop);
    d.line([x0, yTop - 4], [x0, yBot], { stroke: INK, width: 1.4 });
    d.line([x0, yBot], [x1, yBot], { stroke: INK, width: 1.4 });
    for (let v = o.lo; v <= o.hi + 1e-9; v += o.step) {
      d.line([x0 - 5, Y(v)], [x0, Y(v)], { stroke: INK, width: 1 });
      d.line([x0, Y(v)], [x1, Y(v)], { stroke: 'var(--rule-soft)', width: 1 });
      d.text([x0 - 8, Y(v)], num(v), { size: 10.5, anchor: 'end', bold: false });
    }
    const slot = (x1 - x0) / o.bars.length, bw = Math.min(56, slot * 0.55);
    o.bars.forEach((b, i) => {
      const cx = x0 + slot * (i + 0.5);
      d.add('rect', { x: (cx - bw / 2).toFixed(2), y: Y(b.value).toFixed(2), width: bw.toFixed(2), height: (yBot - Y(b.value)).toFixed(2),
                      fill: 'var(--brand)', 'fill-opacity': 0.5, stroke: 'var(--brand-ink)', 'stroke-width': 1.2 });
      d.text([cx, yBot + 14], b.label, { size: 11 });
    });
    if (o.unit) d.text([4, 8], o.unit, { size: 10, anchor: 'start', fill: MUTED, bold: false });
  }

  /** A data set written out, in the order collected. */
  const list = a => a.join(',&nbsp; ');

  // ── Shared generators ─────────────────────────────────────────────────────
  /** A context and an even-sized data set (10 or 12 values) for it. */
  function sample(rng, sizes) {
    const c = rng.pick(CONTEXTS);
    const n = rng.pick(sizes || [10, 12]);
    return { c, n, data: dataSet(rng, n, c.lo, c.hi) };
  }

  /** A five-number summary on a 5-unit grid, for reading off a box plot. */
  function gridFive(rng, lo, hi) {
    const vals = new Set();
    while (vals.size < 5) vals.add(lo + 5 * rng.int(0, (hi - lo) / 5));
    return [...vals].sort((a, b) => a - b);
  }

  // ═══ S1 Summarising data ══════════════════════════════════════════════════
  // Year 9 knowledge (Statistics, p. 43): statistical questions and their four
  // kinds; primary and secondary data; observational studies; distributions
  // and visualisations. Year 9 practices: the five-number summary, IQR, and
  // reasoning about mean or median. The Challenge set adds the Year 10
  // 75%-to-50% comparison rule.

  const KINDS = {
    summary: 'Summary', comparison: 'Comparison', relationship: 'Relationship', time: 'Time series'
  };
  const QUESTIONS = [
    ['What are the typical reaction times of Year 9 students at our school?', 'summary'],
    ['How many hours of sleep do Year 10 students at our school usually get on a school night?', 'summary'],
    ['What is the typical length of the snapper caught at Raglan this summer?', 'summary'],
    ['Do Year 11 students at our school tend to have faster reaction times than Year 9 students?', 'comparison'],
    ['Do students who walk to school tend to sleep longer than students who are driven?', 'comparison'],
    ['Do kōwhai seedlings grown in shade tend to be shorter than those grown in sun?', 'comparison'],
    ['Is there a relationship between arm span and height for Year 9 students?', 'relationship'],
    ['Is there a relationship between hours of practice and the number of goals scored in a netball season?', 'relationship'],
    ['How has the number of visitors to Aoraki/Mount Cook changed each month from 2015 to 2025?', 'time'],
    ['How has the daily maximum temperature in Ōtautahi changed over the last 30 days?', 'time']
  ];

  const DISPLAYS = [
    ['the reaction times of 40 Year 9 students', 'A dot plot or box plot', ['A time-series graph', 'A scatter plot', 'A two-way table'],
     'One numerical variable for one group: a dot plot shows every value, a box plot the spread and centre.'],
    ['the reaction times of Year 9 and Year 11 students, to compare them', 'Two box plots on the same scale', ['A pie chart for each year', 'A scatter plot', 'A time-series graph'],
     'Comparing one numerical variable across two groups: box plots (or dot plots) on one shared scale.'],
    ['the arm span and height of 30 students, to look for a relationship', 'A scatter plot', ['Two box plots', 'A bar graph', 'A time-series graph'],
     'Two paired numerical variables: a scatter plot shows whether one tends to increase with the other.'],
    ['the number of visitors to a museum each month for three years', 'A time-series graph', ['A box plot', 'A scatter plot', 'A two-way table'],
     'A variable measured over time: a time-series graph, with time along the horizontal axis.'],
    ['students’ favourite sport', 'A bar graph', ['A box plot', 'A scatter plot', 'A time-series graph'],
     'A categorical variable: a bar graph shows how often each category was chosen.'],
    ['whether students walk to school, split into Year 9 and Year 10', 'A two-way table', ['A box plot', 'A scatter plot', 'A time-series graph'],
     'Two categorical variables: a two-way table counts each combination.']
  ];

  Sci.topic({
    id: 'ms1', unit: 'statistics',
    title: 'Summarising Data',
    blurb: 'Asking a statistical question, then summarising the answer: the five-number summary, the interquartile range and the box plot.',
    hint: 'Put the data in order first. The median is the middle; the lower quartile (Q1) is the median of the lower half and the upper quartile (Q3) the median of the upper half. ' +
          'IQR = Q3 − Q1: the spread of the middle half of the data.',

    learn: [
      { id: 'questions', title: 'Statistical questions',
        text: '<p>A statistical question names the <strong>variable</strong>, the <strong>group</strong> it is about, and what you want to find out. There are four kinds:</p>' +
              Sci.table(['Kind', 'Asks about', 'Example'], [
                ['Summary', 'one variable for one group', 'What are typical reaction times of Year 9 students?'],
                ['Comparison', 'one variable across two groups', 'Do Year 11 students tend to react faster than Year 9 students?'],
                ['Relationship', 'two paired variables', 'Is there a relationship between arm span and height?'],
                ['Time series', 'one variable over time', 'How has rainfall changed month by month?']]) },
      { id: 'data', title: 'Where data comes from',
        text: '<p><strong>Primary</strong> data you collect yourself. <strong>Secondary</strong> data was collected by someone else, such as Stats NZ or MetService.</p>' +
              '<p>In an <strong>observational study</strong> you record what happens without changing or controlling it: timing students’ reactions as they are, not after giving them coffee.</p>' },
      { id: 'five', title: 'The five-number summary',
        text: '<p>Put the data in order, then find:</p><ul><li>the <strong>minimum</strong></li>' +
              '<li>the <strong>lower quartile, Q1</strong>: the median of the lower half</li>' +
              '<li>the <strong>median, Q2</strong>: the middle value, or the mean of the two middle values</li>' +
              '<li>the <strong>upper quartile, Q3</strong>: the median of the upper half</li><li>the <strong>maximum</strong>.</li></ul>' +
              '<p>With 10 values: the median is halfway between the 5th and 6th; Q1 is the 3rd value and Q3 the 8th.</p>' },
      { id: 'iqr', title: 'Range and interquartile range',
        text: '<p><strong>Range</strong> = maximum − minimum: the spread of all the data.</p>' +
              '<p><strong>Interquartile range</strong>, IQR = Q3 − Q1: the spread of the middle 50%. One very large or very small value hardly changes it, so it is often the better measure of spread.</p>' },
      { id: 'box', title: 'Box plots', wide: true,
        diagram: { w: 360, h: 110, caption: 'Each section holds about a quarter of the data. The line in the box is the median.' },
        draw(d) { boxPlot(d, { lo: 150, hi: 350, minor: 10, major: 50, unit: 'reaction time (ms)', plots: [{ five: [180, 220, 245, 280, 340] }] }); },
        text: '<p>A box plot draws the five-number summary. The box runs from Q1 to Q3, so it holds the middle half of the data. The whiskers reach the minimum and maximum.</p>' },
      { id: 'centre', title: 'Mean or median?',
        text: '<p>The <strong>mean</strong> uses every value, so a few very large or small values pull it towards them.</p>' +
              '<p>The <strong>median</strong> only depends on the middle, so it is the better “typical value” when the data is lopsided (skewed) or has unusual values, such as house prices or incomes. ' +
              'When the data is roughly symmetric with no unusual values, mean and median are close and either works.</p>' },
      { id: 'displays', title: 'Choosing a display',
        text: Sci.table(['Data', 'Display'], [
          ['one numerical variable', 'dot plot, box plot, histogram'], ['one numerical variable, two groups', 'box plots or dot plots on one scale'],
          ['two paired numerical variables', 'scatter plot'], ['a variable over time', 'time-series graph'],
          ['a categorical variable', 'bar graph, frequency table'], ['two categorical variables', 'two-way table']]) +
          '<p>A good display shows the variable, who the data came from, and the units.</p>' },
      { id: 'describe', title: 'Describing in context',
        text: '<p>Say what the numbers mean for the people or things measured, with units:</p>' +
              '<ul><li><strong>Centre</strong>: “The median reaction time was 245 ms.”</li>' +
              '<li><strong>Spread</strong>: “The middle 50% of reaction times were between 220 ms and 280 ms.”</li>' +
              '<li><strong>Unusual values</strong>: “One student took 340 ms, much slower than the rest.”</li></ul>' },
      { id: 'compare', title: 'Comparing two groups',
        text: '<p>To compare groups A and B from samples, draw their box plots on the same scale. ' +
              'If B’s median is above A’s upper quartile (more than half of B is above three quarters of A), you can claim that B <em>tends to be</em> larger than A back in the population.</p>' +
              '<p>If the boxes overlap more than that, the difference might just be chance from sampling: you cannot make the claim.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: a five-number summary',
        steps: ['Reaction times (ms): 260, 215, 300, 230, 245, 280, 190, 240, 275, 250.',
                'In order: 190, 215, <strong>230</strong>, 240, <strong>245, 250</strong>, 260, <strong>275</strong>, 280, 300.',
                'Median = (245 + 250) ÷ 2 = 247.5. Q1 = 230 (3rd value). Q3 = 275 (8th value).',
                'IQR = 275 − 230 = 45 ms.'],
        result: '190, 230, 247.5, 275, 300 ms; IQR 45 ms'
      },
      {
        title: 'Example 2: mean or median?',
        steps: ['Weekly pocket money: $10, $12, $15, $15, $18, $20, $200.',
                'The mean is $290 ÷ 7 ≈ $41, more than every value except one.',
                'The median is $15, which describes most of the group well.'],
        result: 'The median: one unusual value drags the mean up'
      }
    ],

    slots: [
      { name: 'Median', learn: 'five',
        items: [Sci.gen(rng => {
          const { c, data } = sample(rng);
          const md = median(data), s = sorted(data), h = s.length / 2;
          return { prompt: `${c.lead}: ${list(data)}. What is the median?`,
                   input: { kind: 'number', answer: md, tol: 0.01, decimal: true, suffix: c.unit, width: 80 },
                   explain: `In order: ${s.join(', ')}. ${s.length} values, so the median is halfway between the ${h}th and ${h + 1}th: (${s[h - 1]} + ${s[h]}) ÷ 2 = ${num(md)}.` };
        })] },

      { name: 'Quartiles', learn: 'five',
        items: [Sci.gen(rng => {
          const { c, data } = sample(rng, [10]);
          const f = five(data), s = sorted(data);
          const upper = rng.chance();
          return { prompt: `${c.lead}: ${list(data)}. What is the ${upper ? 'upper quartile, Q3' : 'lower quartile, Q1'}?`,
                   input: { kind: 'number', answer: upper ? f[3] : f[1], tol: 0.01, decimal: true, suffix: c.unit, width: 80 },
                   explain: `In order: ${s.join(', ')}. The ${upper ? 'upper' : 'lower'} half is ${(upper ? s.slice(5) : s.slice(0, 5)).join(', ')}; its middle value is ${upper ? f[3] : f[1]}.` };
        })] },

      { name: 'Interquartile range', learn: 'iqr',
        items: [Sci.gen(rng => {
          const { c, data } = sample(rng, [10]);
          const f = five(data), s = sorted(data);
          return { prompt: `${c.lead}: ${list(data)}. What is the interquartile range?`,
                   input: { kind: 'number', answer: f[3] - f[1], tol: 0.01, decimal: true, suffix: c.unit, width: 80 },
                   explain: `In order: ${s.join(', ')}. Q1 = ${f[1]}, Q3 = ${f[3]}, so IQR = ${f[3]} − ${f[1]} = ${num(f[3] - f[1])}.` };
        })] },

      { name: 'Reading a box plot', learn: 'box',
        items: [Sci.gen(rng => {
          const f = gridFive(rng, 20, 100);
          const asks = [
            ['the median', f[2], `The line inside the box is at ${f[2]}.`],
            ['the lower quartile', f[1], `The left edge of the box is at ${f[1]}.`],
            ['the upper quartile', f[3], `The right edge of the box is at ${f[3]}.`],
            ['the interquartile range', f[3] - f[1], `The box runs from ${f[1]} to ${f[3]}: ${f[3]} − ${f[1]} = ${f[3] - f[1]}.`],
            ['the range', f[4] - f[0], `The whiskers run from ${f[0]} to ${f[4]}: ${f[4]} − ${f[0]} = ${f[4] - f[0]}.`]
          ];
          const [what, ans, why] = rng.pick(asks);
          return { prompt: `The box plot shows a Year 9 class’s scores in a maths test, out of 100. What is ${what}?`,
                   diagram: { w: 360, h: 100 },
                   draw: d => boxPlot(d, { lo: 10, hi: 100, minor: 5, major: 10, unit: 'score', plots: [{ five: f }] }),
                   input: { kind: 'number', answer: ans, width: 70 }, explain: why };
        })] },

      { name: 'What kind of question?', learn: 'questions',
        items: QUESTIONS.map(([q, k]) => rng => C(rng, {
          prompt: `What kind of statistical question is this? <em>${q}</em>`,
          right: KINDS[k], options: Object.values(KINDS), wide: false,
          explain: { summary: 'One variable, one group: a summary question.', comparison: 'The same variable for two groups: a comparison question.',
                     relationship: 'Two paired variables: a relationship question.', time: 'One variable measured over time: a time-series question.' }[k] })) },

      { name: 'Primary or secondary?', learn: 'data',
        items: [
          rng => C(rng, { prompt: 'A student times 30 classmates on a reaction test. What kind of data is this for the student?', right: 'Primary data', options: ['Primary data', 'Secondary data'], wide: false,
                          explain: 'They collected it themselves: primary data.' }),
          rng => C(rng, { prompt: 'A student downloads rainfall records for Hokitika from the MetService website. What kind of data is this for the student?', right: 'Secondary data', options: ['Primary data', 'Secondary data'], wide: false,
                          explain: 'Someone else collected it: secondary data.' }),
          rng => C(rng, { prompt: 'A class counts the birds visiting their school garden at lunchtime, without feeding or disturbing them. What kind of study is this?', right: 'An observational study',
                          wrong: ['An experiment', 'A census of all birds in New Zealand', 'Secondary data'], explain: 'They record what happens without changing it: an observational study.' }),
          rng => C(rng, { prompt: 'Which statistical question is written well?', right: 'Do Year 11 students at our school tend to have faster reaction times than Year 9 students at our school?',
                          wrong: ['Are reaction times fast?', 'Is Year 11 better?', 'What is my reaction time?'], explain: 'It names the variable (reaction time), the groups (Year 9 and Year 11 at our school) and the intent (compare).' })
        ] },

      { name: 'Choosing a display', learn: 'displays',
        items: DISPLAYS.map(([data, r, w, why]) => rng => C(rng, { prompt: `Which display suits ${data}?`, right: r, wrong: w, explain: why })) },

      { name: 'Mean or median?', learn: 'centre',
        items: [Sci.gen(rng => {
          const base = rng.pick([[12, 14, 15, 15, 17, 18, 20], [8, 10, 10, 11, 12, 13, 14], [20, 22, 23, 25, 25, 26, 28]]);
          const big = rng.pick([90, 120, 150, 200]);
          const data = rng.shuffle(base.slice(0, 6).concat([big]));
          const mn = mean(data), md = median(data);
          return C(rng, { prompt: `Weekly pocket money, in dollars, for seven students: ${list(data)}. Which is the better typical value?`,
            right: `The median, $${num(md)}: the $${big} pulls the mean up`,
            wrong: [`The mean, $${num(+mn.toFixed(2))}: it uses every value`, `The maximum, $${big}`, `The mean and median are the same here`],
            explain: `The mean is $${num(+mn.toFixed(2))}, higher than six of the seven values. The median, $${num(md)}, describes most of the group.` });
        })] },

      { name: 'Unusual values', learn: 'iqr',
        items: [
          rng => C(rng, { prompt: 'One very large value is added to a data set. Which measure of spread changes the most?', right: 'The range', options: ['The range', 'The interquartile range'], wide: false,
                          explain: 'The range uses the maximum, so it jumps. The IQR only uses the middle half, so it hardly moves.' }),
          rng => C(rng, { prompt: 'One very large value is added to a data set. Which measure of centre changes the most?', right: 'The mean', options: ['The mean', 'The median'], wide: false,
                          explain: 'The mean adds in every value, so one large value pulls it up. The median just shifts by at most half a place.' }),
          rng => C(rng, { prompt: 'About what fraction of the data lies inside the box of a box plot?', right: 'Half', options: ['A quarter', 'Half', 'Three quarters', 'All of it'], wide: false,
                          explain: 'The box runs from Q1 to Q3: the middle 50%.' })
        ] },

      { name: 'Describing in context', learn: 'describe',
        items: [Sci.gen(rng => {
          const f = gridFive(rng, 20, 100);
          return C(rng, { prompt: 'The box plot shows a Year 9 class’s test scores, out of 100. Which description is correct?',
            diagram: { w: 360, h: 100 },
            draw: d => boxPlot(d, { lo: 10, hi: 100, minor: 5, major: 10, unit: 'score', plots: [{ five: f }] }),
            right: `The middle 50% of students scored between ${f[1]} and ${f[3]}`,
            wrong: [`Half the students scored ${f[3]} or more`, `The typical score was ${f[4]}`, `A quarter of the students scored between ${f[1]} and ${f[3]}`],
            explain: `The box, from Q1 = ${f[1]} to Q3 = ${f[3]}, holds the middle half. A quarter scored ${f[3]} or more; the median, ${f[2]}, is the typical score.` });
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Can we make the claim?', learn: 'compare',
        items: [Sci.gen(rng => {
          const a = gridFive(rng, 15, 60);
          const yes = rng.chance();
          // B shifted up: past A's Q3 for a claim, inside A's box for none.
          const target = yes ? a[3] + 5 * rng.int(1, 3) : a[2] + 5 * rng.int(0, Math.max(0, (a[3] - a[2]) / 5 - 1));
          const shift = target - a[2];
          const b = a.map(v => v + shift);
          const hi = Math.max(80, Math.ceil(b[4] / 10) * 10);
          const g = rng.pick([
            { names: ['Year 9', 'Year 11'], what: 'scores in a memory test for random samples of Year 9 and Year 11 students', claim: 'Year 11 students tend to score higher than Year 9 students' },
            { names: ['Shade', 'Sun'], what: 'heights, in cm, of random samples of seedlings grown in shade and in sun', claim: 'seedlings grown in sun tend to be taller than those grown in shade' },
            { names: ['Driven', 'Walk'], what: 'daily step counts, in hundreds, for random samples of students who are driven to school and who walk', claim: 'students who walk tend to take more steps than students who are driven' }]);
          const names = g.names;
          return C(rng, { prompt: `Box plots of ${g.what}. Can you claim that ${g.claim}, back in the population?`,
            diagram: { w: 360, h: 150 },
            draw: d => boxPlot(d, { lo: 10, hi, minor: 5, major: 10, plots: [{ label: names[0], five: a }, { label: names[1], five: b }] }),
            right: yes ? `Yes: the ${names[1]} median (${b[2]}) is above the ${names[0]} upper quartile (${a[3]})`
                       : `No: the ${names[1]} median (${b[2]}) is not above the ${names[0]} upper quartile (${a[3]})`,
            wrong: yes ? [`No: the boxes overlap`, `No: you can never compare samples`]
                       : [`Yes: the ${names[1]} median is ${b[2] > a[2] ? 'higher' : 'no lower'}`, `Yes: the ${names[1]} maximum is higher`],
            explain: `The rule: if more than half of one group is above three quarters of the other (its median beyond the other’s Q3), claim it tends to be larger. ` +
                     (yes ? `${b[2]} > ${a[3]}, so you can.` : `${b[2]} ≤ ${a[3]}, so the difference might be sampling chance.`) });
        })] },

      { challenge: 'only', name: 'Quartiles of 14 values', learn: 'five',
        items: [Sci.gen(rng => {
          const { c, data } = sample(rng, [14]);
          const f = five(data), s = sorted(data);
          return { prompt: `${c.lead}: ${list(data)}. What is the interquartile range?`,
                   input: { kind: 'number', answer: f[3] - f[1], tol: 0.01, decimal: true, suffix: c.unit, width: 80 },
                   explain: `In order: ${s.join(', ')}. Each half has 7 values: Q1 is the 4th (${f[1]}) and Q3 the 11th (${f[3]}). IQR = ${num(f[3] - f[1])}.` };
        })] },

      { challenge: 'only', name: 'The missing value', learn: 'five',
        items: [Sci.gen(rng => {
          // Eight values in order: three below lo, lo, x, hi, two above. The
          // median is halfway between the 4th (lo) and the 5th (x).
          const lo = rng.int(25, 40), x = lo + rng.int(2, 7), hi = x + rng.int(2, 6);
          const known = [...dataSet(rng, 3, 10, lo - 1), lo, hi, ...dataSet(rng, 2, hi + 1, 75)];
          const md = (lo + x) / 2;
          return { prompt: `Seven numbers: ${list(rng.shuffle(known))}. An eighth number, <em>x</em>, is between ${lo} and ${hi}. The median of all eight is ${num(md)}. What is <em>x</em>?`,
                   input: { kind: 'number', answer: x, width: 70 },
                   explain: `In order, x is the 5th value, next to ${lo}. ` + Fmt.tex(`\\dfrac{${lo} + x}{2} = ${md}`) + `. Multiply both sides by 2: ${lo} + x = ${num(2 * md)}. Subtract ${lo} from both sides: x = ${x}.` };
        })] },

      { challenge: 'only', name: 'Range and IQR together', learn: 'iqr',
        items: [Sci.gen(rng => {
          const f = gridFive(rng, 20, 100);
          return C(rng, { prompt: `A data set has range ${f[4] - f[0]} and interquartile range ${f[3] - f[1]}. What does that tell you?`,
            right: `The middle half spans ${f[3] - f[1]}; the outer quarters together span ${f[4] - f[0] - (f[3] - f[1])}`,
            wrong: ['Half the values are in the range', `The median is ${(f[4] - f[0]) / 2}`, 'Nothing: range and IQR measure different data'],
            explain: `Range = whole spread; IQR = spread of the middle 50%. The two whiskers make up the other ${f[4] - f[0] - (f[3] - f[1])}.` });
        })] }
    ]
  });

  // ═══ S2 Judging claims ════════════════════════════════════════════════════
  // Year 10 knowledge (Statistics, p. 43–44): samples and the census; random
  // sampling and bias; sample sizes for reliable inference; critically
  // assessing visualisations; interpolation and extrapolation; uncertainty in
  // claims. The practice behind NCEA 1.3: judging claims in the media.

  const BIASED = [
    ['A gym owner asks 20 people leaving the gym how many days a week they exercise, to find out how active New Zealanders are.',
     'People leaving a gym exercise more than most', 'People who go to gyms are not typical of all New Zealanders'],
    ['A radio station asks listeners to text in whether they support a new motorway.',
     'Only listeners who care enough to text will answer', 'People choose themselves, so strong opinions are over-represented'],
    ['To find out how Year 9 students get to school, a teacher surveys the students who arrive first in the morning.',
     'Early arrivals may be driven more often than others', 'The sample is not chosen randomly'],
    ['A website pops up a survey asking “How much do you love our app?” to people already using it.',
     'Only users of the app are asked', 'Users who dislike the app have probably left'],
    ['A school surveys only the students in the library at lunchtime about how much they read for fun.',
     'Students in the library probably read more than most', 'The sample is not chosen randomly']
  ];
  const FAIR = [
    'Number every student on the school roll and use a random number generator to choose 40',
    'Put every student’s name in a hat and draw out 40 names',
    'Use a spreadsheet to shuffle the class lists for the whole school and take the first 40'
  ];
  const UNFAIR = [
    'Ask the first 40 students through the gate', 'Ask 40 of your friends', 'Ask for 40 volunteers at assembly',
    'Ask the 40 students in the library at lunchtime', 'Ask the students in one Year 9 class'
  ];

  const MISLEADING = [
    ['The vertical axis starts well above zero, so small differences look huge', 'axis'],
    ['The time period shown has been chosen to hide the rest of the trend', 'cherry'],
    ['The pictures are scaled in two directions, so a doubled value looks four times as big', 'area'],
    ['The gaps on the axis are not evenly spaced', 'uneven'],
    ['There are no units or labels, so you cannot tell what is measured', 'labels']
  ];

  Sci.topic({
    id: 'ms2', unit: 'statistics',
    title: 'Judging Claims',
    blurb: 'Is the claim supported? Samples and bias, how big a sample needs to be, and graphs that mislead.',
    hint: 'Ask three things of any claim: Who was asked (is the sample random, or biased)? How many (at least 30 for measurements, about 1000 for opinions)? ' +
          'And does the graph show the data fairly (does the axis start at zero; is the scale even)?',

    learn: [
      { id: 'sample', title: 'Population and sample',
        text: '<p>The <strong>population</strong> is the whole group you want to know about: all Year 9 students in New Zealand. A <strong>census</strong> collects data from all of it.</p>' +
              '<p>Usually that is impossible, so you take a <strong>sample</strong> and use it to make an inference about the population.</p>' },
      { id: 'random', title: 'Random samples and bias',
        text: '<p>In a <strong>simple random sample</strong>, every member of the population has the same chance of being chosen: numbering everyone and using a random number generator.</p>' +
              '<p>A sample that is not random is <strong>biased</strong>: some kinds of people are more likely to be in it. Asking your friends, people at a gym, or volunteers who text in all give biased samples, and misleading statistics.</p>' },
      { id: 'size', title: 'How big a sample?',
        text: '<p>Different samples from the same population give different results: <strong>sampling variation</strong>. Bigger samples vary less.</p>' +
              '<p>For a reliable inference about a population you need at least <strong>30</strong> for a numerical variable (heights, times), and about <strong>1000</strong> for a categorical one (yes/no, favourite brand).</p>' },
      { id: 'graphs', title: 'Graphs that mislead',
        text: '<ul><li>A vertical axis that does not start at zero makes small differences look large.</li>' +
              '<li>An uneven scale stretches some parts of the graph.</li>' +
              '<li>Pictures scaled in height <em>and</em> width make a doubled value look four times as big.</li>' +
              '<li>A carefully chosen time period can hide the overall trend.</li>' +
              '<li>Missing labels and units hide what is being measured.</li></ul>' },
      { id: 'truncated', title: 'Reading a truncated axis', wide: true,
        diagram: { w: 300, h: 170, caption: 'Sales rose from 40 to 50: a 25% increase. The axis starts at 35, so the second bar looks three times as tall.' },
        draw(d) { barChart(d, { lo: 35, hi: 50, step: 5, unit: 'sales', bars: [{ label: '2024', value: 40 }, { label: '2025', value: 50 }] }); },
        text: '<p>Always read the axis before the bars. Compare the actual values, not the heights.</p>' },
      { id: 'predict', title: 'Interpolation and extrapolation',
        text: '<p>A trend line on a scatter plot can make predictions. <strong>Interpolation</strong> predicts inside the range of the data you have, and is fairly reliable. ' +
              '<strong>Extrapolation</strong> predicts outside that range, and may be badly wrong: the trend might not continue.</p>' },
      { id: 'claims', title: 'Claims with uncertainty',
        text: '<p>A sample only tells you what <em>tends</em> to be true, with some uncertainty. A careful claim says so: “Year 11 students at our school tend to react faster than Year 9 students”, not “Year 11s are faster”.</p>' +
              '<p>“9 out of 10” sounds strong, but if only 10 people were asked, one different answer changes it by 10%.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: is the claim reliable?',
        steps: ['An advert says 9 out of 10 students prefer Brand X, from 10 students surveyed outside a gym.',
                'Sample size: 10 is far too small for a categorical variable; about 1000 are needed.',
                'Bias: students outside a gym are not typical, and were not chosen at random.',
                'Variation: another sample of 10 could easily give 6 or 7 out of 10.'],
        result: 'Not reliable: too small, biased, and the result would vary'
      },
      {
        title: 'Example 2: a truncated axis',
        steps: ['A graph shows 40 and 50, with the axis starting at 35.', 'The bars are 5 and 15 units tall: the second looks 3 times as big.',
                'The real increase is 10 out of 40: ' + Fmt.tex('\\dfrac{10}{40} = 0.25') + ', a 25% increase.'],
        result: 'Looks like 3 times as much; really 25% more'
      }
    ],

    slots: [
      { name: 'Population or sample?', learn: 'sample',
        items: [
          rng => C(rng, { prompt: 'A student wants to know how many hours Year 9 students in New Zealand sleep. They ask 40 Year 9 students. What is the population?', right: 'All Year 9 students in New Zealand',
                          wrong: ['The 40 students asked', 'All students at their school', 'Everyone in New Zealand'], explain: 'The population is the whole group the question is about; the 40 are the sample.' }),
          rng => C(rng, { prompt: 'Every five years, Stats NZ tries to collect information from every person in New Zealand. What is this called?', right: 'A census',
                          wrong: ['A sample', 'An experiment', 'A biased survey'], explain: 'Data from the whole population is a census.' }),
          rng => C(rng, { prompt: 'Why do most investigations use a sample, not the whole population?', right: 'Collecting data from everyone is usually too slow, costly or impossible',
                          wrong: ['Samples are always more accurate', 'Populations cannot be measured', 'Samples never vary'], explain: 'A well-chosen sample is much cheaper and faster, and good enough to make an inference.' })
        ] },

      { name: 'Spot the bias', learn: 'random',
        items: BIASED.map(([s, r, alt]) => rng => C(rng, { prompt: `${s} Why is this sample biased?`, right: rng.chance() ? r : alt,
          wrong: ['The sample is too random', 'Surveys are always biased', 'Nothing: everyone had a chance to answer'], explain: `${r}. ${alt}.` })) },

      { name: 'Choosing a random sample', learn: 'random',
        items: [Sci.gen(rng => C(rng, { prompt: 'You want a random sample of 40 students from your school. Which method gives one?',
          right: rng.pick(FAIR), wrong: rng.shuffle(UNFAIR.slice()).slice(0, 3),
          explain: 'In a random sample every student has the same chance of being chosen. Friends, volunteers and whoever is nearest are not random.' }))] },

      { name: 'Big enough?', learn: 'size',
        items: [
          rng => C(rng, { prompt: 'To estimate the typical height of Year 10 students in New Zealand, about how many should you measure, at least?', right: '30', options: ['5', '10', '30', 'Every one'], wide: false,
                          explain: 'Height is numerical: at least 30, chosen at random, for a reliable inference.' }),
          rng => C(rng, { prompt: 'A poll asks whether people support a new law (yes or no). About how big should a reliable sample be?', right: 'About 1000', options: ['About 30', 'About 100', 'About 1000'], wide: false,
                          explain: 'For a categorical variable like yes/no, you need about 1000.' }),
          rng => C(rng, { prompt: 'Two classes each take a random sample of 10 students and get quite different mean heights. Why?', right: 'Small samples vary a lot from one sample to the next',
                          wrong: ['One class must have made a mistake', 'Heights change every day', 'Random samples are always wrong'], explain: 'Sampling variation: small samples give results that jump around. Larger samples vary less.' })
        ] },

      { name: 'How tall does it look?', learn: 'truncated',
        items: [Sci.gen(rng => {
          const [A, B, lo] = rng.pick([[40, 50, 35], [40, 50, 30], [60, 75, 55], [80, 100, 70], [50, 60, 45], [20, 25, 15]]);
          const looks = (B - lo) / (A - lo);
          return { prompt: `A company’s graph of its sales. How many times as tall is the 2025 bar as the 2024 bar?`,
                   diagram: { w: 300, h: 170 }, draw: d => barChart(d, { lo, hi: B + 5 - (B % 5), step: 5, unit: 'sales', bars: [{ label: '2024', value: A }, { label: '2025', value: B }] }),
                   input: { kind: 'number', answer: looks, tol: 0.01, decimal: true, suffix: 'times', width: 70 },
                   explain: `The axis starts at ${lo}. The bars are ${A - lo} and ${B - lo} units tall: ${B - lo} ÷ ${A - lo} = ${num(looks)} times. The real sales only rose from ${A} to ${B}.` };
        })] },

      { name: 'The real increase', learn: 'truncated',
        items: [Sci.gen(rng => {
          const [A, B, lo] = rng.pick([[40, 50, 35], [40, 50, 30], [60, 75, 55], [80, 100, 70], [50, 60, 45], [20, 25, 15]]);
          const pct = (B - A) / A * 100;
          return { prompt: 'A company’s graph of its sales. By what percentage did sales actually increase from 2024 to 2025?',
                   diagram: { w: 300, h: 170 }, draw: d => barChart(d, { lo, hi: B + 5 - (B % 5), step: 5, unit: 'sales', bars: [{ label: '2024', value: A }, { label: '2025', value: B }] }),
                   input: { kind: 'number', answer: pct, tol: 0.05, decimal: true, suffix: '%', width: 70 },
                   explain: `Read the values, not the heights: from ${A} to ${B}, an increase of ${B - A}. ${B - A} ÷ ${A} × 100 = ${num(pct)}%.` };
        })] },

      { name: 'What makes it misleading?', learn: 'graphs',
        items: [
          rng => C(rng, { prompt: 'A bar graph of two brands’ sales, 98 and 102, has its vertical axis running from 96 to 103. Brand B’s bar looks three times as tall. What is misleading?',
                          right: MISLEADING[0][0], wrong: [MISLEADING[1][0], MISLEADING[2][0], MISLEADING[4][0]], explain: 'The axis is truncated. Starting at 96 turns a 4% difference into one bar three times as tall.' }),
          rng => C(rng, { prompt: 'A graph shows house prices only for the three months they rose, leaving out the two years before when they fell. What is misleading?',
                          right: MISLEADING[1][0], wrong: [MISLEADING[0][0], MISLEADING[2][0], MISLEADING[3][0]], explain: 'Choosing the time period can hide the overall trend.' }),
          rng => C(rng, { prompt: 'An infographic shows milk production with a cow picture; the picture for this year is twice as tall and twice as wide as last year’s. What is misleading?',
                          right: MISLEADING[2][0], wrong: [MISLEADING[0][0], MISLEADING[1][0], MISLEADING[4][0]], explain: 'Twice as tall and twice as wide is four times the area, so the eye sees four times as much.' }),
          rng => C(rng, { prompt: 'A time-series graph has years 2000, 2010, 2015, 2020, 2021, 2022 equally spaced along the axis. What is misleading?',
                          right: MISLEADING[3][0], wrong: [MISLEADING[0][0], MISLEADING[2][0], MISLEADING[4][0]], explain: 'Ten-year gaps and one-year gaps take the same space, so the recent years are stretched out.' })
        ] },

      { name: 'Interpolate or extrapolate?', learn: 'predict',
        items: [Sci.gen(rng => {
          const lo = rng.pick([140, 150]), hi = lo + 40, inside = rng.chance();
          const x = inside ? lo + 5 * rng.int(1, 7) : rng.pick([hi + 30, lo - 40]);
          return C(rng, { prompt: `A scatter plot of arm span against height uses students with heights from ${lo} cm to ${hi} cm. A trend line is used to predict the arm span of someone ${x} cm tall. Which is this?`,
            right: inside ? 'Interpolation: fairly reliable' : 'Extrapolation: may be unreliable',
            options: ['Interpolation: fairly reliable', 'Extrapolation: may be unreliable'], wide: false,
            explain: inside ? `${x} cm is inside the data’s range (${lo} to ${hi}), so it is interpolation.` : `${x} cm is outside the data’s range (${lo} to ${hi}), so it is extrapolation: the trend might not continue.` });
        })] },

      { name: 'A careful claim', learn: 'claims',
        items: [
          rng => C(rng, { prompt: 'Random samples of 40 Year 9 and 40 Year 11 students at a school: the Year 11 median reaction time is well below the Year 9 lower quartile. Which claim is best?',
                          right: 'Year 11 students at this school tend to have faster reaction times than Year 9 students',
                          wrong: ['Every Year 11 student is faster than every Year 9 student', 'Year 11 students everywhere in the world are faster', 'Reaction time is caused by age alone'],
                          explain: 'A sample supports a claim about what tends to happen in the population it came from, not about every person or everyone everywhere.' }),
          rng => C(rng, { prompt: 'An advert says “9 out of 10 students prefer Brand X”. Ten students were asked outside a gym. Which is the strongest criticism?',
                          right: 'Only 10 students, not chosen at random: the result could be very different with another sample',
                          wrong: ['9 out of 10 is not a percentage', 'Students cannot have preferences', 'The advert should have said 90%'],
                          explain: 'Small sample (about 1000 are needed for an opinion), biased (outside a gym), and so the result would vary a lot.' }),
          rng => C(rng, { prompt: 'A survey of 1200 randomly chosen voters finds 52% support a policy. A reporter writes “Most New Zealanders support the policy”. Is that reasonable?',
                          right: 'Partly: it is close to 50%, so another sample might find under half',
                          wrong: ['Yes, certainly: 52% is more than half', 'No: 1200 is far too few', 'No: polls are always biased'],
                          explain: 'The sample is large and random, but 52% is close enough to 50% that sampling variation matters. A careful claim says “about half”.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Area pictures', learn: 'graphs',
        items: [Sci.gen(rng => {
          const k = rng.pick([2, 3, 1.5]);
          return { prompt: `A graphic shows exports as sheep. This year’s value is ${num(k)} times last year’s, so the sheep is drawn ${num(k)} times as tall <em>and</em> ${num(k)} times as wide. How many times as much area does it cover?`,
                   input: { kind: 'number', answer: k * k, tol: 0.01, decimal: true, suffix: 'times', width: 70 },
                   explain: `Area scales by ${num(k)} × ${num(k)} = ${num(k * k)}. The eye reads area, so it looks like ${num(k * k)} times as much, not ${num(k)}.` };
        })] },

      { challenge: 'only', name: 'Make it look bigger', learn: 'truncated',
        items: [Sci.gen(rng => {
          const [A, B, r] = rng.pick([[40, 50, 3], [60, 70, 3], [80, 90, 2], [30, 36, 4], [50, 55, 2]]);
          // (B − lo) / (A − lo) = r  →  lo = (rA − B) / (r − 1)
          const lo = (r * A - B) / (r - 1);
          return { prompt: `Sales rose from ${A} to ${B}. At what value should a dishonest graph start its vertical axis so the second bar looks ${r} times as tall as the first?`,
                   input: { kind: 'number', answer: lo, width: 70 },
                   explain: `Bar heights are ${B} − s and ${A} − s. Set ${B} − s = ${r}(${A} − s) and expand: ${B} − s = ${r * A} − ${r}s. Add ${r}s to both sides and subtract ${B} from both sides: ${r - 1 === 1 ? '' : r - 1}s = ${r * A - B}.${r - 1 === 1 ? '' : ` Divide both sides by ${r - 1}: s = ${lo}.`}` };
        })] },

      { challenge: 'only', name: 'Weighing up a claim', learn: 'claims',
        items: [
          rng => C(rng, { prompt: 'A council says “Traffic on our new road has fallen 30% since March”. The data runs from March (school holidays ended) to July. What else would you want to know?',
                          right: 'Traffic in the same months of earlier years, since it changes with the seasons and school terms',
                          wrong: ['The colour of the road', 'Nothing: 30% is a clear fall', 'Only the traffic in March'],
                          explain: 'A time series varies with the season. Comparing with the same months in other years separates the trend from the seasonal pattern.' }),
          rng => C(rng, { prompt: 'Two random samples of 30 students give median sleep times of 8.1 h and 8.3 h on school nights. Which conclusion fits best?',
                          right: 'The difference is small enough to be sampling variation; it does not show a real difference',
                          wrong: ['The second group sleeps more, definitely', 'The samples must be biased', '30 is too many students'],
                          explain: 'Different samples always differ a little. A 0.2 h difference in medians is the kind of change you would expect from chance.' }),
          rng => C(rng, { prompt: 'A trend line from students aged 12 to 15 shows height rising 6 cm a year. Someone uses it to predict the height of a 40-year-old. What is wrong?',
                          right: 'It is extrapolation far outside the data: people stop growing', wrong: ['Nothing: the trend line is correct', 'It should rise 6 cm a month', 'Interpolation is never allowed'],
                          explain: 'Extrapolation assumes the trend keeps going. Growth stops in the late teens, so the prediction would be well over 2 m.' })
        ] }
    ]
  });
})();
