'use strict';
// ── Revision · Maths in Context (Years 9–10 maths) ──────────────────────────
// The third look-ahead maths unit, towards NCEA 1.2: using mathematical
// methods on problems from life in Aotearoa New Zealand or the Pacific. The
// standard is an internal, so the site trains its parts: chaining several
// processes, giving answers with units, putting the steps in a logical order
// (Merit), and naming assumptions, limitations and predictions (Excellence).
//   P1 Money and Rates     Years 9–10 number: percentages, GST, ratio, rates,
//                          currency, simple and compound interest (p. 40)
//   P2 Multi-Step Problems processes from number and measurement chained
//                          together, with assumptions and predictions
// Exchange rates and prices are set in each question, not live.
// Each exercise has a normal set and a Challenge set (?set=challenge).
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice;
  const num = x => String(+(+x).toFixed(2));
  const money = x => '$' + (+x).toFixed(2);
  const r2 = x => Math.round(x * 100) / 100;
  const r1 = x => Math.round(x * 10) / 10;
  const CENTS = { tol: 0.011, decimal: true, prefix: '$', width: 90 };
  const cash = (answer, extra) => Object.assign({ kind: 'number', answer: r2(answer) }, CENTS, extra || {});

  // ═══ P1 Money and rates ═══════════════════════════════════════════════════

  const ITEMS = [['pair of rugby boots', 120, 260], ['school laptop', 450, 1100], ['bike', 300, 900], ['kayak', 600, 1500],
                 ['set of waka ama paddles', 180, 420], ['tent', 150, 480], ['phone', 280, 950]];
  const CURRENCIES = [
    { name: 'Fijian dollars', code: 'FJD', where: 'Fiji', rate: [1.28, 1.36] },
    { name: 'Samoan tālā', code: 'WST', where: 'Samoa', rate: [1.55, 1.68] },
    { name: 'Tongan paʻanga', code: 'TOP', where: 'Tonga', rate: [1.36, 1.45] },
    { name: 'Australian dollars', code: 'AUD', where: 'Australia', rate: [0.88, 0.94] }
  ];
  const rateOf = (rng, c) => +(c.rate[0] + (c.rate[1] - c.rate[0]) * rng.int(0, 8) / 8).toFixed(3);

  Sci.topic({
    id: 'mc1', unit: 'contexts',
    title: 'Money and Rates',
    blurb: 'Percentages, GST, ratios, best buys, exchange rates and interest: the number skills behind everyday decisions with money.',
    hint: 'Turn a percentage into a multiplier: add 15% GST, × 1.15; take 20% off, × 0.8. To undo a percentage, divide by the same multiplier. ' +
          'Unit price = price ÷ amount. Simple interest = principal × rate × time.',

    learn: [
      { id: 'multiplier', title: 'Percentages as multipliers',
        text: '<p>A 20% increase gives 120% of the original: multiply by <strong>1.2</strong>. A 20% decrease leaves 80%: multiply by <strong>0.8</strong>.</p>' +
              '<p>So a $150 jacket with 30% off costs ' + m('150 \\times 0.7 = 105') + ' dollars.</p>' },
      { id: 'gst', title: 'GST',
        text: '<p>New Zealand adds 15% <strong>goods and services tax</strong> to most prices. To add it, multiply by 1.15.</p>' +
              '<p>To find the price <em>before</em> GST from a GST-inclusive price, divide by 1.15. Do not just take 15% off: ' +
              '$115 includes $15 of GST on $100, but 15% of $115 is $17.25.</p>' },
      { id: 'change', title: 'Percentage change',
        text: '<p style="text-align:center">' + m('\\text{percentage change} = \\dfrac{\\text{change}}{\\text{original}} \\times 100') + '</p>' +
              '<p>From 50 to 75: the change is 25, and ' + m('\\dfrac{25}{50} \\times 100 = 50\\%') + '. Always divide by the <em>original</em>.</p>' },
      { id: 'ratio', title: 'Sharing in a ratio',
        text: '<p>To share $600 in the ratio 2 : 3, add the parts: 5. One part is ' + m('\\dfrac{600}{5} = 120') + '. So the shares are $240 and $360.</p>' },
      { id: 'unit', title: 'Best buys',
        text: '<p>Compare <strong>unit prices</strong>: price ÷ amount. 2 L for $4.20 is $2.10 per litre; 3 L for $5.70 is $1.90 per litre, the better buy.</p>' +
              '<p>From a price per kilogram: 400 g at $12.50 per kg costs ' + m('0.4 \\times 12.50 = 5') + ' dollars.</p>' },
      { id: 'currency', title: 'Exchange rates',
        text: '<p>If 1 NZD = 1.32 FJD, multiply to change New Zealand dollars into Fijian dollars, and divide to change back:</p>' +
              '<ul><li>NZ$200 → ' + m('200 \\times 1.32 = 264') + ' FJD</li><li>FJ$66 → ' + m('\\dfrac{66}{1.32} = 50') + ' NZD</li></ul>' +
              '<p>The Cook Islands, Niue and Tokelau use the New Zealand dollar.</p>' },
      { id: 'simple', title: 'Simple interest',
        text: '<p>Interest on the original amount only:</p><p style="text-align:center">' + m('I = P \\times r \\times t') + '</p>' +
              '<p>$800 at 4% a year for 3 years: ' + m('800 \\times 0.04 \\times 3 = 96') + ' dollars of interest.</p>' },
      { id: 'compound', title: 'Compound interest, month by month',
        text: '<p>Each month the interest is added on, and next month’s interest is worked out on the new total.</p>' +
              '<p>$100 at 2.5% a month: after 1 month $102.50; after 2, ' + m('102.50 \\times 1.025 = 105.06') + '; after 3, $107.69.</p>' },
      { id: 'reverse', title: 'Finding the original',
        text: '<p>If 20% of an amount is $30, then 1% is $1.50 and 100% is $150.</p>' +
              '<p>If a price after 25% off is $90, it is 75% of the original: ' + m('0.75 \\times \\text{original} = 90') + '. Divide both sides by 0.75: ' + m('\\text{original} = \\dfrac{90}{0.75} = 120') + ' dollars.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: GST and a discount',
        steps: ['A kayak is $640 before GST, then 25% off in a sale.', 'With GST: ' + m('640 \\times 1.15 = 736') + ' dollars.', 'Sale price: ' + m('736 \\times 0.75 = 552') + ' dollars.'],
        result: '$552'
      },
      {
        title: 'Example 2: spending money in Samoa',
        steps: ['1 NZD = 1.62 WST. A student changes NZ$350 to tālā.', m('350 \\times 1.62 = 567') + ' WST.', 'They bring back 81 WST: ' + m('\\dfrac{81}{1.62} = 50') + ' NZD.'],
        result: '567 WST; NZ$50 back'
      }
    ],

    slots: [
      { name: 'Adding GST', learn: 'gst',
        items: [Sci.gen(rng => {
          const [what, lo, hi] = rng.pick(ITEMS), p = 5 * rng.int(lo / 5, hi / 5);
          return { prompt: `A ${what} costs $${p} before GST. What is the price with 15% GST?`, input: cash(p * 1.15),
                   explain: m(`${p} \\times 1.15 = ${num(p * 1.15)}`) + ` dollars.` };
        })] },

      { name: 'Taking GST out', learn: 'gst',
        items: [Sci.gen(rng => {
          const [what, lo, hi] = rng.pick(ITEMS), base = 5 * rng.int(lo / 5, hi / 5), incl = r2(base * 1.15);
          return { prompt: `A ${what} costs ${money(incl)} including GST. What was its price before GST?`, input: cash(base),
                   explain: m(`1.15 \\times \\text{price} = ${incl}`) + '. Divide both sides by 1.15: ' + m(`\\text{price} = \\dfrac{${incl}}{1.15} = ${base}`) + ` dollars. (Taking 15% off ${money(incl)} would give ${money(incl * 0.85)}: wrong, because the 15% was of the smaller price.)` };
        })] },

      { name: 'Discounts and mark-ups', learn: 'multiplier',
        items: [Sci.gen(rng => {
          const [what, lo, hi] = rng.pick(ITEMS), p = 5 * rng.int(lo / 5, hi / 5), pc = rng.pick([10, 15, 20, 25, 30, 40]), up = rng.chance(0.3);
          const k = up ? 1 + pc / 100 : 1 - pc / 100;
          return { prompt: up ? `A shop buys a ${what} for $${p} and marks it up by ${pc}%. What is the selling price?` : `A ${what} usually costs $${p}. It is ${pc}% off. What is the sale price?`,
                   input: cash(p * k), explain: m(`${p} \\times ${num(k)} = ${num(p * k)}`) + ` dollars: ${up ? 'an increase' : 'a decrease'} of ${pc}% leaves ${num(k * 100)}%.` };
        })] },

      { name: 'Percentage change', learn: 'change',
        items: [Sci.gen(rng => {
          const [a, b, ctx] = rng.pick([[40, 50, 'The price of a dozen eggs rose from $%a to $%b.'], [80, 100, 'Visitors to a marae open day rose from %a to %b.'],
                                       [250, 200, 'A school’s power bill fell from $%a to $%b a month.'], [60, 75, 'A rugby club’s membership rose from %a to %b.'],
                                       [120, 90, 'A family’s weekly petrol cost fell from $%a to $%b.'], [25, 30, 'The bus fare rose from $%a to $%b for ten trips.']]);
          const pc = (b - a) / a * 100;
          return { prompt: ctx.replace('%a', a).replace('%b', b) + ' What is the percentage change? (Use a negative number for a decrease.)',
                   input: { kind: 'number', answer: pc, tol: 0.01, decimal: true, suffix: '%', width: 70 },
                   explain: `Change: ${b} − ${a} = ${b - a}. ` + m(`\\dfrac{${b - a}}{${a}} \\times 100 = ${num(pc)}`) + '%. Divide by the original, ' + a + '.' };
        })] },

      { name: 'Sharing in a ratio', learn: 'ratio',
        items: [Sci.gen(rng => {
          const [x, y] = rng.pick([[2, 3], [3, 5], [1, 4], [2, 5], [3, 4], [4, 5]]), unit = rng.int(4, 30) * 10, total = (x + y) * unit;
          const ctx = rng.pick([`A whānau shares $${total} of fundraising between kapa haka uniforms and travel in the ratio ${x} : ${y}.`,
                                `Two classes share $${total} of prize money in the ratio ${x} : ${y}, by the number of entries.`,
                                `A kai stall’s $${total} profit is split between the school and a food bank in the ratio ${x} : ${y}.`]);
          return { prompt: ctx + ' How much is the smaller share?', input: cash(x * unit),
                   explain: `${x} + ${y} = ${x + y} parts. One part: ${total} ÷ ${x + y} = ${unit}. Smaller share: ${x} × ${unit} = $${x * unit}.` };
        })] },

      { name: 'Best buy', learn: 'unit',
        items: [Sci.gen(rng => {
          const [what, u, a, b] = rng.pick([['milk', 'L', 2, 3], ['rice', 'kg', 1, 5], ['kūmara', 'kg', 1.5, 4], ['juice', 'L', 1.5, 3], ['flour', 'kg', 1.5, 5]]);
          const pa = r2(a * rng.int(180, 320) / 100), pb = r2(b * rng.int(180, 320) / 100);
          const ua = pa / a, ub = pb / b;
          if (Math.abs(ua - ub) < 0.03) return C(rng, { prompt: `${what}: ${a} ${u} for ${money(pa)}, or ${b} ${u} for ${money(r2(b * ua))}. Which is the better buy?`,
            right: 'They cost the same per ' + u, options: [`${a} ${u}`, `${b} ${u}`, 'They cost the same per ' + u], wide: false, explain: `Both are ${money(ua)} per ${u}.` });
          return C(rng, { prompt: `${what[0].toUpperCase() + what.slice(1)}: ${a} ${u} for ${money(pa)}, or ${b} ${u} for ${money(pb)}. Which is the better buy?`,
            right: ua < ub ? `${a} ${u}` : `${b} ${u}`, options: [`${a} ${u}`, `${b} ${u}`, 'They cost the same per ' + u], wide: false,
            explain: `Unit prices: ${money(pa)} ÷ ${a} = ${money(ua)} per ${u}; ${money(pb)} ÷ ${b} = ${money(ub)} per ${u}.` });
        })] },

      { name: 'Exchange rates', learn: 'currency',
        items: [Sci.gen(rng => {
          const c = rng.pick(CURRENCIES), rate = rateOf(rng, c), out = rng.chance();
          if (out) {
            const nz = rng.int(10, 60) * 10;
            return { prompt: `1 NZD = ${rate} ${c.code}. A student going to ${c.where} changes NZ$${nz} into ${c.name}. How much do they get?`,
                     input: { kind: 'number', answer: r2(nz * rate), tol: 0.011, decimal: true, suffix: c.code, width: 90 },
                     explain: m(`${nz} \\times ${rate} = ${num(nz * rate)}`) + ` ${c.code}. Changing out of NZ dollars, multiply.` };
          }
          const back = rng.int(5, 40) * 5;
          return { prompt: `1 NZD = ${rate} ${c.code}. Back from ${c.where}, a student changes ${back} ${c.code} into New Zealand dollars. How much do they get, to the nearest cent?`,
                   input: cash(back / rate), explain: m(`\\dfrac{${back}}{${rate}} = ${(back / rate).toFixed(4)}`) + ` ≈ ${money(back / rate)}. Changing back into NZ dollars, divide.` };
        })] },

      { name: 'Simple interest', learn: 'simple',
        items: [Sci.gen(rng => {
          const P = rng.int(5, 40) * 100, r = rng.pick([2, 2.5, 3, 4, 4.5, 5]), t = rng.int(2, 5);
          return { prompt: `${money(P)} is saved at ${r}% simple interest a year for ${t} years. How much interest does it earn?`, input: cash(P * r / 100 * t),
                   explain: m(`I = ${P} \\times ${r / 100} \\times ${t} = ${num(P * r / 100 * t)}`) + ' dollars.' };
        })] },

      { name: 'Compound interest', learn: 'compound',
        items: [Sci.gen(rng => {
          const P = rng.int(2, 20) * 50, r = rng.pick([1, 1.5, 2, 2.5, 3]), n = rng.pick([2, 3]);
          let v = P; const steps = [];
          for (let i = 1; i <= n; i++) { v = v * (1 + r / 100); steps.push(`month ${i}: ${money(v)}`); }
          return { prompt: `${money(P)} is invested at ${r}% interest a month, compounded monthly. How much is there after ${n} months?`, input: cash(v),
                   explain: `Multiply by ${num(1 + r / 100)} each month: ${steps.join('; ')}.` };
        })] },

      { name: 'Find the mistake', learn: 'gst',
        items: [
          Sci.gen(rng => {
            const base = rng.int(8, 40) * 10, incl = r2(base * 1.15);
            return Sci.spot(rng, { prompt: `A student finds the price before GST of something costing ${money(incl)} with GST. Which line is wrong?`,
              lines: [`GST is 15% of the price before GST`, `So the GST here is 15% of ${money(incl)}, which is ${money(incl * 0.15)}`, `Price before GST = ${money(incl)} − ${money(incl * 0.15)} = ${money(incl * 0.85)}`], wrong: 1,
              explain: `The 15% was added to the price before GST, not taken from ${money(incl)}. Divide instead: ${money(incl)} ÷ 1.15 = ${money(base)}.` });
          }),
          Sci.gen(rng => {
            const a = rng.pick([40, 50, 80]), b = a + rng.pick([10, 20]);
            return Sci.spot(rng, { prompt: `A price rose from $${a} to $${b}. A student works out the percentage increase. Which line is wrong?`,
              lines: [`Change = ${b} − ${a} = ${b - a}`, `Percentage = ${b - a} ÷ ${b} × 100`, `= ${num((b - a) / b * 100)}%`], wrong: 1,
              explain: `Divide by the original, ${a}: ${b - a} ÷ ${a} × 100 = ${num((b - a) / a * 100)}%.` });
          })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'The original price', learn: 'reverse',
        items: [Sci.gen(rng => {
          const pc = rng.pick([15, 20, 25, 30, 40]), orig = rng.int(8, 60) * 10, now = r2(orig * (1 - pc / 100));
          return { prompt: `After ${pc}% off, a jacket costs ${money(now)}. What was the original price?`, input: cash(orig),
                   explain: `${money(now)} is ${100 - pc}% of the original: ` + m(`${1 - pc / 100} \\times \\text{original} = ${now}`) + `. Divide both sides by ${1 - pc / 100}: ` + m(`\\text{original} = \\dfrac{${now}}{${1 - pc / 100}} = ${orig}`) + ' dollars.' };
        })] },

      { challenge: 'only', name: 'Which deal?', learn: 'simple',
        items: [Sci.gen(rng => {
          const price = rng.int(6, 15) * 100, dep = rng.pick([50, 100]), weeks = rng.pick([26, 52]), wk = Math.ceil((price * 1.1 - dep) / weeks);
          const total = dep + wk * weeks, extra = total - price;
          return C(rng, { prompt: `An e-bike costs $${price} cash, or $${dep} deposit and then $${wk} a week for ${weeks} weeks. How much more does the weekly plan cost?`,
            right: money(extra), wrong: [money(wk * weeks - price), money(extra + dep), money(total)], wide: false,
            explain: `Weekly plan: $${dep} + ${weeks} × $${wk} = $${total}. That is $${total} − $${price} = ${money(extra)} more than cash.` });
        })] },

      { challenge: 'only', name: 'Fees and assumptions', learn: 'currency',
        items: [
          rng => C(rng, { prompt: 'A student calculates how many Fijian dollars they will get for NZ$500 using the rate in the newspaper. Why might they get less at the airport?',
            right: 'Exchange counters often use a worse rate and charge a fee', wrong: ['Fijian dollars are worth less on Tuesdays', 'The calculation should divide instead', 'Airports must use the newspaper rate'],
            explain: 'The calculation assumes the published rate and no fee. Stating that assumption, and its effect, is what Excellence asks for.' }),
          rng => C(rng, { prompt: 'A family is going to Rarotonga in the Cook Islands with NZ$1500. How many Cook Islands dollars should they change it into?',
            right: 'None needed: the Cook Islands use the New Zealand dollar', wrong: ['Multiply by the exchange rate', 'Divide by the exchange rate', 'Take off 15% GST first'],
            explain: 'The Cook Islands, Niue and Tokelau use the New Zealand dollar: check the context before calculating.' })
        ] },

      { challenge: 'only', name: 'Compound or simple?', learn: 'compound',
        items: [Sci.gen(rng => {
          const P = rng.int(4, 20) * 100, r = rng.pick([1, 2, 3]), n = 3;
          const simple = P * r / 100 * n, comp = P * ((1 + r / 100) ** n - 1);
          return { prompt: `${money(P)} at ${r}% a month for ${n} months. How much more interest does compound interest earn than simple interest?`,
                   input: cash(comp - simple),
                   explain: `Simple: ${P} × ${r / 100} × ${n} = ${money(simple)}. Compound: ${money(P * (1 + r / 100) ** n)} − ${money(P)} = ${money(comp)}. Difference ${money(comp - simple)}: interest earned on interest.` };
        })] }
    ]
  });

  // ═══ P2 Multi-step problems ═══════════════════════════════════════════════
  // NCEA 1.2 asks for at least four processes from two or more of number,
  // algebra, measurement, and geometry and space. Each problem here chains
  // several, and its explanation numbers them, so students see the links.

  const steps = list => '<ol>' + list.map(x => `<li>${x}</li>`).join('') + '</ol>';
  const hm = h => { const H = Math.floor(h + 1e-9), mins = Math.round((h - H) * 60); return mins === 60 ? `${H + 1} h 0 min` : `${H} h ${mins} min`; };

  Sci.topic({
    id: 'mc2', unit: 'contexts',
    title: 'Multi-Step Problems',
    blurb: 'Problems from Aotearoa and the Pacific that need several steps: plan the steps, keep the units, and say what you assumed.',
    hint: 'Write down what you know, with units. Plan the steps before calculating: which quantity do you need first? ' +
          'Keep full values until the end, then round sensibly for the context (you cannot buy 3.4 tins of paint).',

    learn: [
      { id: 'plan', title: 'Plan, then calculate',
        text: '<ol><li>What is the question asking for, and in what units?</li><li>What do you know?</li><li>Which steps link them, in what order?</li>' +
              '<li>Calculate, keeping full values.</li><li>Answer in context, with units, rounded sensibly.</li></ol>' },
      { id: 'sdt', title: 'Speed, distance, time',
        text: '<p style="text-align:center">' + m('\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}}') + '</p>' +
              '<p>So distance = speed × time, and time = distance ÷ speed. A time of 2.4 h is 2 h and ' + m('0.4 \\times 60 = 24') + ' min.</p>' },
      { id: 'rates', title: 'Chaining rates',
        text: '<p>Rates link quantities: L per km, $ per L, m² per L. Multiply along the chain and the units cancel:</p>' +
              '<p>' + m('92 \\text{ km} \\times 1.8 \\text{ L/km} \\times \\$2.40/\\text{L} = \\$397.44') + '</p>' },
      { id: 'rain', title: 'Rain on a roof',
        text: '<p>1 mm of rain falling on 1 m² is 1 litre of water. So a 120 m² roof in 25 mm of rain collects ' + m('120 \\times 25 = 3000') + ' L.</p>' },
      { id: 'round', title: 'Rounding in context',
        text: '<p>Round to suit the situation, not always to the nearest whole number:</p>' +
              '<ul><li>Tins of paint, bags of concrete, buses: round <strong>up</strong>; you cannot buy part of one.</li>' +
              '<li>How many whole posts fit, or how many full boxes you can fill: round <strong>down</strong>.</li><li>Money: to the cent.</li></ul>' },
      { id: 'assume', title: 'Assumptions and limitations',
        text: '<p>Every model leaves things out. Say what you assumed and how it affects the answer:</p>' +
              '<ul><li>The ferry keeps a constant 30 km/h (it slows leaving harbour, so the trip takes longer).</li>' +
              '<li>Every litre of rain reaches the tank (some splashes or evaporates, so less is collected).</li></ul>' },
      { id: 'predict', title: 'Generalising and predicting',
        text: '<p>Once a method works, change one quantity and ask what happens: if the speed rises, the time falls. ' +
              'A formula, such as cost = 4.32 × distance, predicts the answer for any distance.</p>' }
    ],

    examples: [
      {
        title: 'Example: a Cook Strait crossing',
        steps: ['A ferry crosses 92 km at an average 30 km/h, using 1.8 L of fuel per km at $2.40 per L.',
                'Time: ' + m('\\dfrac{92}{30} = 3.067') + ' h, which is 3 h 4 min.',
                'Fuel: ' + m('92 \\times 1.8 = 165.6') + ' L. Cost: ' + m('165.6 \\times 2.40 = 397.44') + ' dollars.',
                'Assumed: a constant speed, and the same fuel use per km all the way.'],
        result: '3 h 4 min; $397.44'
      }
    ],

    slots: [
      { name: 'A ferry crossing', learn: 'sdt',
        items: [Sci.gen(rng => {
          const dkm = rng.pick([92, 96, 88]), v = rng.pick([30, 32, 35, 40]), t = dkm / v;
          return { prompt: `A Cook Strait ferry crosses ${dkm} km at an average speed of ${v} km/h. How long does the crossing take, in minutes, to the nearest minute?`,
                   input: { kind: 'number', answer: Math.round(t * 60), tol: 0.6, suffix: 'min', width: 70 },
                   explain: steps([m(`t = \\dfrac{${dkm}}{${v}} = ${t.toFixed(3)}`) + ' h', m(`${t.toFixed(3)} \\times 60 = ${(t * 60).toFixed(1)}`) + ` min ≈ ${Math.round(t * 60)} min (${hm(t)}).`]) };
        })] },

      { name: 'Fuel cost', learn: 'rates',
        items: [Sci.gen(rng => {
          const [trip, km] = rng.pick([['Auckland to Taupō', 280], ['Christchurch to Queenstown', 480], ['Wellington to Napier', 320], ['Dunedin to Invercargill', 205], ['Hamilton to Tauranga', 110]]);
          const per100 = rng.pick([6.5, 7, 7.5, 8, 9]), price = rng.pick([2.59, 2.69, 2.79, 2.89]);
          const L = km * per100 / 100, cost = L * price;
          return { prompt: `A car uses ${per100} L of petrol per 100 km. Petrol costs $${price} per litre. What does the fuel cost for the ${km} km drive from ${trip}?`, input: cash(cost),
                   explain: steps([`Litres: ${km} ÷ 100 × ${per100} = ${num(L)} L`, `Cost: ${num(L)} × $${price} = ${money(cost)}`]) };
        })] },

      { name: 'Painting a wall', learn: 'round',
        items: [Sci.gen(rng => {
          const W = rng.pick([8, 10, 12, 14]), H = rng.pick([2.4, 3, 3.6]), door = rng.pick([1.8, 2, 2.2]);
          const cover = rng.pick([12, 14, 16]), coats = 2, tin = rng.pick([2, 4]);
          const area = W * H - door, litres = area * coats / cover, tins = Math.ceil(litres / tin - 1e-9);
          return { prompt: `The front wall of a wharekai is ${W} m long and ${H} m high, with a door of area ${door} m². It needs ${coats} coats. Paint covers ${cover} m² per litre and comes in ${tin} L tins. How many tins are needed?`,
                   input: { kind: 'number', answer: tins, suffix: 'tins', width: 60 },
                   explain: steps([`Area: ${W} × ${H} − ${door} = ${num(area)} m²`, `Two coats: ${num(area * coats)} m²`, `Paint: ${num(area * coats)} ÷ ${cover} = ${num(litres)} L`,
                                   `Tins: ${num(litres)} ÷ ${tin} = ${num(litres / tin)}, so round up to ${tins}`]) };
        })] },

      { name: 'Rainwater', learn: 'rain',
        items: [Sci.gen(rng => {
          const roof = rng.pick([80, 100, 120, 150]), mm = rng.pick([12, 20, 25, 35]), r = rng.pick([1, 1.2, 1.5]);
          const L = roof * mm, tankL = Math.PI * r * r * 2 * 1000, pct = L / tankL * 100;
          return { prompt: `${mm} mm of rain falls on a ${roof} m² roof. All of it runs into a cylindrical tank of radius ${r} m and height 2 m. What percentage of the tank does it fill, to the nearest whole percent?`,
                   input: { kind: 'number', answer: Math.round(pct), tol: 0.6, suffix: '%', width: 60 },
                   explain: steps([`Rain: ${roof} × ${mm} = ${L} L`, `Tank: ` + m(`\\pi \\times ${r}^2 \\times 2 = ${(tankL / 1000).toFixed(3)}`) + ` m³ = ${Math.round(tankL)} L`,
                                   `${L} ÷ ${Math.round(tankL)} × 100 ≈ ${Math.round(pct)}%`]) };
        })] },

      { name: 'Fencing and planting', learn: 'round',
        items: [Sci.gen(rng => {
          const L = rng.int(8, 20) * 2, W = rng.int(4, 10) * 2, gap = rng.pick([1, 2]), price = rng.pick([18, 24, 32]);
          const per = 2 * (L + W), posts = Math.floor(per / gap);
          return { prompt: `A rectangular māra kai (food garden) is ${L} m by ${W} m. Harakeke is planted every ${gap} m around the edge, starting at a corner. Each plant costs $${price}. What do the plants cost?`,
                   input: cash(posts * price),
                   explain: steps([`Perimeter: 2 × (${L} + ${W}) = ${per} m`, `Plants: ${per} ÷ ${gap} = ${posts}. Round a closed loop there are as many plants as gaps: the last gap ends at the first plant`,
                                   `Cost: ${posts} × $${price} = $${posts * price}`]) };
        })] },

      { name: 'Concrete', learn: 'rates',
        items: [Sci.gen(rng => {
          const len = rng.pick([6, 8, 10, 12]), wid = rng.pick([0.9, 1.2, 1.5]), dep = rng.pick([0.1, 0.075]);
          const bag = rng.pick([0.01, 0.0125]), V = len * wid * dep, bags = Math.ceil(V / bag - 1e-9);
          return { prompt: `A path ${len} m long, ${wid} m wide and ${dep * 1000} mm deep is made of concrete. One bag makes ${bag} m³. How many bags are needed?`,
                   input: { kind: 'number', answer: bags, suffix: 'bags', width: 60 },
                   explain: steps([`Depth in metres: ${dep * 1000} mm = ${dep} m`, `Volume: ${len} × ${wid} × ${dep} = ${num(V)} m³`, `Bags: ${num(V)} ÷ ${bag} = ${num(V / bag)}, so round up to ${bags}`]) };
        })] },

      { name: 'Put the steps in order', learn: 'plan',
        items: [
          rng => Sci.order(rng, 'A class plans a waka ama trip: how much will the bus cost per student? Put the steps in order.', [
            'Find the distance there and back from a map', 'Work out the hours of bus hire from the distance and the bus’s average speed',
            'Multiply the hours by the hourly hire rate', 'Divide the total cost by the number of students, and round up to the next 10 cents'
          ], 'Each step uses the result of the one before: distance → time → cost → cost per student.'),
          rng => Sci.order(rng, 'Find how many tins of paint a classroom needs. Put the steps in order.', [
            'Measure the length and height of each wall', 'Find the total wall area and subtract the windows and door',
            'Multiply by the number of coats and divide by the coverage per litre', 'Divide by the tin size and round up'
          ], 'Area first, then paint, then tins, rounding up only at the end.')
        ] },

      { name: 'What did you assume?', learn: 'assume',
        items: [
          rng => C(rng, { prompt: 'A student calculates a ferry crossing time as distance ÷ average speed. Which assumption did they make?',
            right: 'The ferry travels at that speed for the whole crossing', wrong: ['The ferry carries no cars', 'The weather is sunny', 'The distance is in miles'],
            explain: 'In reality it is slower leaving and entering harbour, so the real time is likely longer.' }),
          rng => C(rng, { prompt: 'A student calculates how much rainwater a roof collects as roof area × rainfall. Which is a limitation of this answer?',
            right: 'Some water splashes off, evaporates or overflows, so the tank gets less', wrong: ['Rain is measured in litres', 'Roofs are always flat', 'It works only in Auckland'],
            explain: 'The model assumes every drop reaches the tank. The real amount will be lower.' }),
          rng => C(rng, { prompt: 'A student finds the paint needed for a wall from its area. Which assumption could make them buy too little?',
            right: 'That the coverage on the tin is reached; rough or porous surfaces soak up more', wrong: ['That the wall is a rectangle', 'That paint is sold in litres', 'That two coats are needed'],
            explain: 'Coverage figures are for smooth surfaces. Rough weatherboards need more paint: a reason to round up and allow extra.' })
        ] },

      { name: 'Units in the answer', learn: 'rates',
        items: [
          rng => C(rng, { prompt: 'Distance in km is divided by speed in km/h. What unit is the answer in?', right: 'hours', options: ['hours', 'km', 'km/h', 'minutes'], wide: false,
            explain: m('\\dfrac{\\text{km}}{\\text{km/h}} = \\text{h}') + ': the km cancel.' }),
          rng => C(rng, { prompt: 'Litres per km is multiplied by km, then by dollars per litre. What unit is the answer in?', right: 'dollars', options: ['dollars', 'litres', 'km', 'dollars per km'], wide: false,
            explain: 'L/km × km = L, then L × $/L = $.' }),
          rng => C(rng, { prompt: 'Rainfall in mm is multiplied by roof area in m². What unit is the answer in?', right: 'litres', options: ['litres', 'mm²', 'm³', 'mm'], wide: false,
            explain: '1 mm over 1 m² is 1 L, so mm × m² gives litres.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Predict the change', learn: 'predict',
        items: [Sci.gen(rng => {
          const dkm = rng.pick([92, 96]), v1 = rng.pick([30, 32]), v2 = v1 + rng.pick([4, 6, 8]);
          const saved = (dkm / v1 - dkm / v2) * 60;
          return { prompt: `A ferry crosses ${dkm} km at ${v1} km/h. A new ferry averages ${v2} km/h. How many minutes does it save, to the nearest minute?`,
                   input: { kind: 'number', answer: Math.round(saved), tol: 0.6, suffix: 'min', width: 60 },
                   explain: steps([`Old: ${dkm} ÷ ${v1} = ${(dkm / v1).toFixed(3)} h`, `New: ${dkm} ÷ ${v2} = ${(dkm / v2).toFixed(3)} h`, `Saved: ${((dkm / v1 - dkm / v2)).toFixed(3)} h × 60 ≈ ${Math.round(saved)} min`]) };
        })] },

      { challenge: 'only', name: 'A formula for any trip', learn: 'predict',
        items: [Sci.gen(rng => {
          const per100 = rng.pick([6, 7, 8]), price = rng.pick([2.5, 3]), k = per100 / 100 * price;
          return C(rng, { prompt: `A car uses ${per100} L per 100 km and petrol costs $${price.toFixed(2)} per L. Which formula gives the fuel cost C, in dollars, for a trip of d km?`,
            right: m(`C = ${num(k)}d`), wrong: [m(`C = ${num(per100 * price)}d`), m(`C = ${num(per100 / price)}d`), m(`C = d + ${num(k)}`)],
            explain: `Each km uses ${per100 / 100} L costing $${price.toFixed(2)} each: ${per100 / 100} × ${price} = $${num(k)} per km. So ` + m(`C = ${num(k)}d`) + '.' });
        })] },

      { challenge: 'only', name: 'Flying to Rarotonga', learn: 'sdt',
        items: [Sci.gen(rng => {
          const dkm = 3010, v = rng.pick([780, 820, 860]), dep = rng.pick([9, 10, 13]), t = dkm / v;
          // Rarotonga is 23 hours behind New Zealand in summer (22 in winter); the question says which.
          const hh = (((dep + t - 23) % 24) + 24) % 24;
          return { prompt: `A flight from Auckland to Rarotonga covers ${dkm} km at ${v} km/h. It leaves at ${dep}:00 on Saturday, New Zealand time. Rarotonga’s clocks are 23 hours behind. At what hour (24-hour clock, to the nearest hour) does it land in Rarotonga time?`,
                   input: { kind: 'number', answer: Math.round(hh) % 24, tol: 0.01, suffix: ':00', width: 60 },
                   explain: steps([`Flight time: ${dkm} ÷ ${v} = ${t.toFixed(2)} h (${hm(t)})`, `Lands at ${(dep + t).toFixed(2)} h NZ time on Saturday`, `23 hours earlier: about ${Math.round(hh) % 24}:00 on Friday, Rarotonga time. It lands the day before it left!`]) };
        })] },

      { challenge: 'only', name: 'Is the answer reasonable?', learn: 'assume',
        items: [
          rng => C(rng, { prompt: 'A student finds that a 100 m² roof in 20 mm of rain collects 2 000 000 L. What is the most likely mistake?',
            right: 'They converted mm to m wrongly: it should be 2000 L', wrong: ['Nothing: it is reasonable', 'They should have used the tank’s height', 'Rain is measured in cm'],
            explain: '100 × 20 = 2000 L, about ten bathtubs. Two million litres would fill an Olympic pool: an estimate exposes the slip.' }),
          rng => C(rng, { prompt: 'A student estimates a family’s 600 km road trip will cost $9000 in petrol. How could they check this quickly?',
            right: 'Estimate: about 8 L per 100 km is 48 L, at about $3 a litre is about $150', wrong: ['Use more decimal places', 'Ask how long the trip takes', 'Add GST'],
            explain: 'A rough estimate shows the answer is out by a factor of about 60: probably a units slip.' })
        ] }
    ]
  });
})();
