'use strict';
// ── Maths Revise · Unit 6 topics ────────────────────────────────────────────
// Problem solving in the style of the University of Otago Problem Challenge
// for intermediate schools. The problems are original; only the style is
// borrowed. Each exercise is a strategy rather than a topic, because what
// makes these hard is choosing how to start, not the arithmetic.
//
// Every answer is found by trying every case in code (a list, a search, a
// table), never by a formula typed in by hand, so a generated puzzle cannot
// quietly have a wrong key. A puzzle that turns out to have no answer, or
// more than one, is thrown away and built again.
//
// The topics are untimed and scored by nudges used: see engine.js.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const Topics = window.Topics || (window.Topics = {});

  const NAMES = ['Aroha', 'Tama', 'Mele', 'Sione', 'Priya', 'Wei', 'Hana', 'Liam', 'Ana', 'Ravi', 'Ella', 'Kahu', 'Mia', 'Noah'];

  /** A small HTML table for worked solutions. */
  const table = (head, rows) =>
    '<table class="data-table">' + (head ? '<tr>' + head.map(x => `<th>${x}</th>`).join('') + '</tr>' : '') +
    rows.map(r => '<tr>' + r.map(x => `<td>${x}</td>`).join('') + '</tr>').join('') + '</table>';

  /** Keep building until `make` returns something; it returns null to reject. */
  function until(make) {
    for (let t = 0; t < 500; t++) {
      const v = make();
      if (v) return v;
    }
    throw new Error('no valid puzzle found');
  }

  const plural = (n, one, many) => n === 1 ? one : (many || one + 's');

  // ═══════════════════════════════════════════════════════════════════════
  // 6.1  Make a List
  // ═══════════════════════════════════════════════════════════════════════
  Topics.u6e1 = {
    id: 'u6e1', unit: 6, untimed: true,
    title: 'Make a List',
    blurb: 'Counting problems where the answer is "how many ways". The trick is a list so orderly that you cannot miss one or count one twice.',
    hint: 'Fix one thing at a time. Start with the smallest possible value of one quantity, find everything that goes with it, then go up by one.',

    learn: [
      {
        id: 'order', title: 'List in order', wide: true,
        text: '<p>Choose one quantity and run it up from its smallest value: 0, 1, 2, … For each value, work out what the rest must be. Write every row down, including the ones that fail.</p>' +
              '<p>A list in order tells you when you have finished, because you reach a value that is too big. A list made by guessing never does.</p>'
      },
      {
        id: 'twice', title: 'Do not count the same thing twice',
        text: '<p>Ask whether order matters. Aroha shaking hands with Tama is the same handshake as Tama with Aroha. 1 + 2 + 9 is the same sum as 9 + 2 + 1.</p>' +
              '<p>A neat way to avoid doubles is to always write things smallest first, so each one has only one way to appear.</p>'
      },
      {
        id: 'triangle', title: 'When three lengths make a triangle',
        text: '<p>Three sticks only close up into a triangle if the two shorter ones together are <em>longer</em> than the longest one.</p>' +
              '<p>3, 4, 5 works: 3 + 4 = 7, more than 5. But 2, 3, 6 does not: 2 + 3 = 5, which cannot reach across 6. And 2, 3, 5 lies flat.</p>'
      },
      {
        id: 'build', title: 'Build from smaller cases',
        text: '<p>When there are too many cases to list, count how many ways there are to reach each <em>step</em> on the way.</p>' +
              '<p>On a grid where you can only go right or up, every corner is reached from the corner to its left or the one below it. So its number of routes is the sum of theirs. Start with 1 along the bottom and left edges and fill in the rest.</p>'
      }
    ],

    examples: [
      {
        title: 'Example: how many ways can you pay $17 with $5 notes and $2 coins?',
        steps: [
          'List by the number of $5 notes, from 0 upwards. The rest must be made of $2 coins.',
          '0 notes: $17 left. 17 is odd, so $2 coins cannot make it. ✗',
          '1 note: $12 left, which is 6 coins. ✓',
          '2 notes: $7 left. Odd. ✗',
          '3 notes: $2 left, which is 1 coin. ✓',
          '4 notes would be $20, too much, so the list is finished.'
        ],
        result: 'Answer: 2 ways'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: paying an exact amount with two kinds of note or coin.
      out.push(until(() => {
        const ctx = rng.pick([
          { a: 5, b: 2, big: '$5 notes', small: '$2 coins', unit: '$', thing: 'a game' },
          { a: 10, b: 2, big: '$10 notes', small: '$2 coins', unit: '$', thing: 'a jacket' },
          { a: 5, b: 3, big: '5c stamps', small: '3c stamps', unit: 'c', thing: 'postage' },
          { a: 7, b: 3, big: '7c stamps', small: '3c stamps', unit: 'c', thing: 'postage' }
        ]);
        const T = rng.int(hard ? 30 : 15, hard ? 70 : 40);
        const rows = [];
        const ways = [];
        for (let x = 0; x * ctx.a <= T; x++) {
          const rest = T - x * ctx.a;
          const ok = rest % ctx.b === 0;
          if (ok) ways.push([x, rest / ctx.b]);
          rows.push([x, money(rest, ctx.unit), ok ? `${rest / ctx.b} ✓` : '✗']);
        }
        if (ways.length < 2 || ways.length > 6) return null;
        const name = rng.pick(NAMES);
        const isStamp = ctx.unit === 'c';
        return {
          prompt: isStamp
            ? `${name} needs exactly ${money(T, 'c')} of ${ctx.thing}, using only ${ctx.big} and ${ctx.small}. ` +
              `${name} does not have to use both kinds. How many different ways can it be done?`
            : `${name} pays exactly ${money(T, '$')} for ${ctx.thing} using only ${ctx.big} and ${ctx.small}. ` +
              `${name} does not have to use both kinds. How many different ways can it be done?`,
          learn: 'order',
          hints: [
            `Pick one kind, say the ${ctx.big}, and try 0 of them, then 1, then 2, and so on.`,
            `For each number of ${ctx.big}, what amount is left? Can the ${ctx.small} make exactly that?`,
            `Stop when the ${ctx.big} alone come to more than ${money(T, ctx.unit)}. Count the rows that work.`
          ],
          input: { kind: 'number', suffix: 'ways', answer: ways.length, width: 70 },
          explain: `List by the number of ${ctx.big}:` +
            table([ctx.big, 'Left over', ctx.small], rows) +
            `${ways.length} rows work, so there are ${ways.length} ways.`
        };
      }));

      // Q2: isosceles triangles with a given perimeter.
      out.push(until(() => {
        const P = rng.int(hard ? 20 : 11, hard ? 34 : 21);
        const rows = [];
        let count = 0;
        for (let a = 1; 2 * a < P; a++) {
          const b = P - 2 * a;
          const ok = a + a > b;
          if (ok) count++;
          rows.push([`${a}, ${a}, ${b}`, `${a} + ${a} = ${2 * a}`, ok ? (a === b ? '✓ equilateral' : '✓') : `✗ cannot reach ${b}`]);
        }
        if (count < 2) return null;
        return {
          prompt: `An isosceles triangle has two sides the same length. How many different isosceles triangles have a perimeter of ${P} cm, ` +
                  `with every side a whole number of centimetres? (An equilateral triangle counts as isosceles.)`,
          learn: 'triangle',
          hints: [
            'Call the length of each equal side a. What does that leave for the third side?',
            `Try a = 1, 2, 3, … in order. The third side is ${P} − 2a.`,
            'Three lengths only make a triangle if the two equal sides together are longer than the third. Check every row.'
          ],
          input: { kind: 'number', suffix: plural(count, 'triangle'), answer: count, width: 70 },
          explain: 'List by the length of the equal sides, and test each one:' +
            table(['Sides', 'Equal sides add to', 'Triangle?'], rows) +
            `${count} of them close up into a triangle.`
        };
      }));

      // Q3: handshakes, or every team playing every other team once.
      out.push(until(() => {
        const n = rng.int(hard ? 7 : 5, hard ? 14 : 10);
        const total = n * (n - 1) / 2;
        const ctx = rng.pick([
          { who: 'people at a meeting', act: 'shakes hands with every other person exactly once', what: 'handshakes' },
          { who: 'teams in a netball competition', act: 'plays every other team exactly once', what: 'games' }
        ]);
        const reverse = hard && rng.chance(0.5);
        const terms = [];
        for (let k = n - 1; k >= 1; k--) terms.push(k);
        return {
          prompt: reverse
            ? `Each of the ${ctx.who} ${ctx.act}. There are ${total} ${ctx.what} in all. How many ${ctx.who.split(' ')[0]} are there?`
            : `There are ${n} ${ctx.who}. Each one ${ctx.act}. How many ${ctx.what} are there in all?`,
          learn: 'twice',
          hints: [
            'Line them up. The first one meets everybody else. How many is that?',
            'The second one has already met the first, so only count the ones still to come.',
            reverse
              ? `Add ${n > 8 ? '1 + 2 + 3 + …' : '1, then 2, then 3, …'} until you reach the total. The number of people is one more than the last number you added.`
              : 'Add those counts up. Each pair is counted once, because you only ever count forwards.'
          ],
          input: reverse
            ? { kind: 'number', answer: n, width: 70 }
            : { kind: 'number', suffix: ctx.what, answer: total, width: 70 },
          explain: `The first has ${n - 1} to meet, the next has ${n - 2} new ones, and so on down to 1:<br>` +
            `${terms.join(' + ')} = ${total}.` +
            (reverse ? ` So ${total} ${ctx.what} means ${n}.` : '') +
            `<br><span class="work">Another way: each of ${n} meets ${n - 1} others, giving ${n} × ${n - 1} = ${n * (n - 1)}. That counts every pair twice, so halve it: ${total}.</span>`
        };
      }));

      // Q4: three-digit numbers from a set of digit cards.
      out.push(until(() => {
        const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const digits = rng.sample(hard ? pool : pool.slice(1), 4).sort((x, y) => x - y);
        const conds = [
          { text: 'even', test: v => v % 2 === 0 },
          { text: 'odd', test: v => v % 2 === 1 },
          (() => { const m = rng.pick([300, 400, 500, 600]); return { text: `greater than ${m}`, test: v => v > m }; })()
        ];
        const cond = rng.pick(conds);
        const found = [];
        for (const a of digits) for (const b of digits) for (const c of digits) {
          if (a === b || b === c || a === c || a === 0) continue;
          const v = 100 * a + 10 * b + c;
          if (cond.test(v)) found.push(v);
        }
        if (found.length < 3 || found.length > 14) return null;
        found.sort((x, y) => x - y);
        const groups = digits.filter(d => d !== 0).map(d => {
          const g = found.filter(v => Math.floor(v / 100) === d);
          return `Starting with ${d}: ${g.length ? g.join(', ') : 'none'}`;
        });
        return {
          prompt: `You have four digit cards: ${digits.join(', ')}. Using three different cards, how many three-digit numbers can you make that are ${cond.text}?`,
          learn: 'order',
          hints: [
            'Organise by the first digit. Take each card in turn as the hundreds digit.',
            cond.text === 'even' || cond.text === 'odd'
              ? `Being ${cond.text} only depends on the last digit. Which cards can go last?`
              : 'Which first digits are already big enough? Which are too small whatever comes next?',
            digits.includes(0) ? 'A three-digit number cannot start with 0.' : 'List the numbers for each first digit, in order, before you count.'
          ],
          input: { kind: 'number', suffix: 'numbers', answer: found.length, width: 70 },
          explain: groups.join('<br>') + `<br>That is ${found.length} numbers.`
        };
      }));

      // Q5: routes across a grid, sometimes with a closed corner.
      out.push(until(() => {
        const w = rng.int(2, hard ? 4 : 3), hgt = rng.int(2, 3);
        const blocked = hard && rng.chance(0.6)
          ? [rng.int(1, w - 1), rng.int(1, hgt - 1)]
          : null;
        if (blocked && (w < 2 || hgt < 2)) return null;
        const ways = [];
        for (let x = 0; x <= w; x++) {
          ways[x] = [];
          for (let y = 0; y <= hgt; y++) {
            if (blocked && x === blocked[0] && y === blocked[1]) ways[x][y] = 0;
            else if (x === 0 && y === 0) ways[x][y] = 1;
            else ways[x][y] = (x ? ways[x - 1][y] : 0) + (y ? ways[x][y - 1] : 0);
          }
        }
        const answer = ways[w][hgt];
        if (answer < 3) return null;
        const rows = [];
        for (let y = hgt; y >= 0; y--) rows.push(Array.from({ length: w + 1 }, (_, x) =>
          blocked && x === blocked[0] && y === blocked[1] ? '✕' : ways[x][y]));
        const cell = 46, pad = 24;
        return {
          prompt: `A path runs along the lines of this grid, from A to B. You may only move <strong>right</strong> or <strong>up</strong>. ` +
                  (blocked ? 'The corner marked ✕ is closed, so no route can pass through it. ' : '') +
                  'How many different routes are there?',
          learn: 'build',
          diagram: { w: w * cell + 2 * pad, h: hgt * cell + 2 * pad },
          draw(d) {
            const at = (x, y) => [pad + x * cell, pad + (hgt - y) * cell];
            for (let x = 0; x <= w; x++) d.line(at(x, 0), at(x, hgt), { width: 1.6 });
            for (let y = 0; y <= hgt; y++) d.line(at(0, y), at(w, y), { width: 1.6 });
            d.dot(at(0, 0), { r: 5, fill: 'var(--brand)' });
            d.dot(at(w, hgt), { r: 5, fill: 'var(--brand)' });
            d.text([at(0, 0)[0] - 12, at(0, 0)[1] + 14], 'A', { size: 13 });
            d.text([at(w, hgt)[0] + 12, at(w, hgt)[1] - 12], 'B', { size: 13 });
            if (blocked) {
              const [cx, cy] = at(blocked[0], blocked[1]);
              d.circle([cx, cy], 8, { fill: 'var(--surface)', stroke: 'var(--dia-accent)', width: 2 });
              d.line([cx - 4, cy - 4], [cx + 4, cy + 4], { stroke: 'var(--dia-accent)', width: 2 });
              d.line([cx - 4, cy + 4], [cx + 4, cy - 4], { stroke: 'var(--dia-accent)', width: 2 });
            }
          },
          hints: [
            'Tracing routes one by one gets confusing fast. Instead, count how many ways there are to reach each corner.',
            'Every corner along the bottom edge or up the left edge can only be reached one way: write 1 there' + (blocked ? ', unless the closed corner is in the way' : '') + '.',
            'Any other corner is reached from the left or from below, so its number is the sum of those two.' + (blocked ? ' The closed corner gets 0.' : '')
          ],
          input: { kind: 'number', suffix: 'routes', answer, width: 70 },
          explain: 'Write the number of ways to reach each corner, adding the corner to the left and the corner below. A is the bottom left:' +
            table(null, rows) +
            `The number at B is ${answer}.`
        };
      }));

      // Q6: the largest score that cannot be made.
      out.push(until(() => {
        const [a, b] = rng.pick(hard ? [[3, 7], [4, 5], [3, 8], [4, 7], [5, 6], [5, 7]] : [[3, 5], [3, 4], [2, 5], [3, 7], [4, 5]]);
        const top = a * b + a;
        const can = [true];
        for (let t = 1; t <= top; t++) can[t] = (t >= a && can[t - a]) || (t >= b && can[t - b]);
        let largest = 0;
        for (let t = 1; t <= top; t++) if (!can[t]) largest = t;
        const sport = rng.pick([
          { game: 'Gridball', small: 'a try', big: 'a goal' },
          { game: 'Hoopla', small: 'a ring on a short peg', big: 'a ring on a tall peg' }
        ]);
        const cannot = [], made = [];
        for (let t = 1; t <= largest + a; t++) (can[t] ? made : cannot).push(t);
        // An example worth giving: past the smaller score, but not the answer.
        const mid = cannot.filter(t => t > a && t < largest);
        const example = mid.length ? rng.pick(mid) : cannot[0];
        return {
          prompt: `In ${sport.game} you score ${a} points for ${sport.small} and ${b} points for ${sport.big}. Some totals are impossible: ` +
                  `for example, you cannot score exactly ${example}. ` +
                  'What is the largest total that cannot be scored?',
          learn: 'order',
          hints: [
            'Go through the totals 1, 2, 3, … and decide for each one whether it can be made.',
            `Once you can make some total, you can also make it + ${a}, just by scoring ${sport.small} more.`,
            `So as soon as you find ${a} totals in a row that can all be made, every total after them can be made too.`
          ],
          input: { kind: 'number', suffix: 'points', answer: largest, width: 70 },
          explain: `Cannot be made: ${cannot.join(', ')}.<br>Can be made: ${made.join(', ')}, …<br>` +
            `${largest + 1} to ${largest + a} are ${a} in a row, so adding ${a} again and again reaches every bigger total. ` +
            `The largest impossible total is ${largest}.`
        };
      }));

      // Q7: rectangles with a given area or perimeter.
      out.push(until(() => {
        const byArea = rng.chance(0.5);
        const rows = [];
        let count = 0;
        if (byArea) {
          const A = rng.pick(hard ? [36, 48, 60, 64, 72, 84, 90, 96, 100] : [12, 16, 18, 20, 24, 28, 30, 32, 36]);
          for (let s = 1; s * s <= A; s++) if (A % s === 0) { count++; rows.push([s, A / s]); }
          if (count < 3) return null;
          return {
            prompt: `A rectangle has an area of ${A} cm², and its sides are whole numbers of centimetres. How many different rectangles are possible? ` +
                    '(A square counts. Turning a rectangle round does not make a new one.)',
            learn: 'twice',
            hints: [
              'The short side times the long side must make the area. Start with a short side of 1.',
              'Go up one at a time: 1, 2, 3, … Keep the ones that divide the area exactly.',
              'Stop when the short side would be longer than the long side. After that you are just turning old rectangles round.'
            ],
            input: { kind: 'number', suffix: 'rectangles', answer: count, width: 70 },
            explain: `List the short side in order:` + table(['Short side', 'Long side'], rows) + `That is ${count} rectangles.`
          };
        }
        const P = 2 * rng.int(hard ? 11 : 6, hard ? 20 : 11);
        for (let s = 1; 2 * s <= P / 2; s++) { count++; rows.push([s, P / 2 - s]); }
        return {
          prompt: `A rectangle has a perimeter of ${P} cm, and its sides are whole numbers of centimetres. How many different rectangles are possible? ` +
                  '(A square counts. Turning a rectangle round does not make a new one.)',
          learn: 'twice',
          hints: [
            `The perimeter goes round two short sides and two long sides, so one short side and one long side add to half of ${P}.`,
            `Try a short side of 1, 2, 3, … The long side is ${P / 2} minus it.`,
            'Stop when the short side would be longer than the long side.'
          ],
          input: { kind: 'number', suffix: 'rectangles', answer: count, width: 70 },
          explain: `One short and one long side add to ${P / 2}:` + table(['Short side', 'Long side'], rows) + `That is ${count} rectangles.`
        };
      }));

      // Q8: writing a number as a sum of three different whole numbers.
      out.push(until(() => {
        const N = rng.int(hard ? 12 : 9, hard ? 16 : 13);
        const sums = [];
        for (let a = 1; a <= N; a++) for (let b = a + 1; b <= N; b++) {
          const c = N - a - b;
          if (c > b) sums.push(`${a} + ${b} + ${c}`);
        }
        const others = N === 9 ? '' : ` One way is ${sums[sums.length - 1]}.`;
        return {
          prompt: `In how many ways can ${N} be written as the sum of three <em>different</em> whole numbers, each at least 1? ` +
                  `The order does not matter, so 1 + 2 + ${N - 3} and ${N - 3} + 2 + 1 are the same way.${others}`,
          learn: 'twice',
          hints: [
            'Always write the numbers smallest first. Then each way can only appear once.',
            'Start with the smallest number as 1, and list every way that works. Then smallest number 2, and so on.',
            'With the smallest number fixed, make the middle one as small as it can be, then step it up until it would pass the largest.'
          ],
          input: { kind: 'number', suffix: 'ways', answer: sums.length, width: 70 },
          explain: 'Smallest first, in order:<br>' + sums.join('<br>') + `<br>That is ${sums.length} ways.`
        };
      }));

      return out;
    }
  };

  /** $12 or 37c. */
  function money(v, unit) { return unit === '$' ? '$' + v : v + 'c'; }

  // ═══════════════════════════════════════════════════════════════════════
  // 6.2  Two Unknowns, No Algebra
  // ═══════════════════════════════════════════════════════════════════════
  Topics.u6e2 = {
    id: 'u6e2', unit: 6, untimed: true,
    title: 'Two Unknowns, No Algebra',
    blurb: 'Two things you do not know, and two facts about them. Algebra works, but a clever look usually works faster.',
    hint: 'Pretend everything is the same kind, see how far wrong that is, and work out how much each swap fixes.',

    learn: [
      {
        id: 'assume', title: 'Assume they are all the same', wide: true,
        text: '<p>12 bikes and trikes, 31 wheels. Pretend all 12 are bikes: that is only 24 wheels, 7 short.</p>' +
              '<p>Swapping a bike for a trike adds 1 wheel. So 7 swaps are needed: 7 trikes and 5 bikes. Check: 5 × 2 + 7 × 3 = 10 + 21 = 31. ✓</p>' +
              '<p>The pattern is always: how far off is the guess, and how much does one swap change it?</p>'
      },
      {
        id: 'combine', title: 'Add or subtract whole facts',
        text: '<p>If two ▲ and one ● make 17, and one ▲ and two ● make 16, add the two facts: three ▲ and three ● make 33.</p>' +
              '<p>So one ▲ and one ● make 11. Compare that with the first fact, which has one ▲ more: ▲ = 17 − 11 = 6, and ● = 5.</p>'
      },
      {
        id: 'same', title: 'Look for what does not change',
        text: '<p>When things are passed from one person to another, the <em>total</em> stays the same. When one thing is swapped for another, the <em>count</em> stays the same.</p>' +
              '<p>Finding the quantity that does not change is often the whole problem.</p>'
      },
      {
        id: 'factors', title: 'Use factors',
        text: '<p>If you know what some whole numbers multiply to, they must be factors of it. Split the product into primes first: 140 = 2 × 2 × 5 × 7.</p>' +
              '<p>Then a fact such as "one of them is a teenager" leaves only a few options to test.</p>'
      },
      {
        id: 'check', title: 'Check the answer against every fact', wide: true,
        text: '<p>A book and a pen cost $26. The book costs $20 more than the pen. The quick answer, $6 for the pen, is wrong: the book would then be $26 and the total $32.</p>' +
              '<p>Put your answer back into <em>every</em> sentence of the problem. It takes ten seconds and catches most mistakes.</p>'
      }
    ],

    examples: [
      {
        title: 'Example: 12 bikes and trikes have 31 wheels altogether. How many trikes?',
        steps: [
          'Assume all 12 are bikes: 12 × 2 = 24 wheels.',
          'There are really 31, which is 7 more.',
          'Each trike has 1 more wheel than a bike, so there must be 7 trikes.',
          'Check: 7 trikes and 5 bikes make 21 + 10 = 31 wheels. ✓'
        ],
        result: 'Answer: 7 trikes'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: bikes and trikes (or cars and motorbikes).
      out.push(until(() => {
        const ctx = rng.pick([
          { a: 'bicycle', b: 'tricycle', na: 2, nb: 3, part: 'wheels', place: 'A bike shop' },
          { a: 'motorbike', b: 'car', na: 2, nb: 4, part: 'wheels', place: 'A car park' },
          { a: 'three-legged stool', b: 'four-legged chair', na: 3, nb: 4, part: 'legs', place: 'A classroom' }
        ]);
        const n = rng.int(hard ? 15 : 8, hard ? 40 : 20);
        const nb = rng.int(1, n - 1);
        const total = ctx.na * (n - nb) + ctx.nb * nb;
        const askB = rng.chance(0.6);
        const step = ctx.nb - ctx.na;
        const answer = askB ? nb : n - nb;
        return {
          prompt: `${ctx.place} has ${n} ${ctx.a}s and ${ctx.b}s, with ${total} ${ctx.part} altogether. How many ${askB ? ctx.b : ctx.a}s are there?`,
          learn: 'assume',
          hints: [
            `Pretend all ${n} are ${ctx.a}s. How many ${ctx.part} would that be?`,
            `How many ${ctx.part} short of ${total} is that?`,
            `Swapping one ${ctx.a} for a ${ctx.b} adds ${step} ${plural(step, ctx.part.replace(/s$/, ''), ctx.part)}. How many swaps fill the gap?`
          ],
          input: { kind: 'number', suffix: (askB ? ctx.b : ctx.a) + 's', answer, width: 70 },
          explain: `If all ${n} were ${ctx.a}s: ${n} × ${ctx.na} = ${n * ctx.na} ${ctx.part}. That is ${total - n * ctx.na} short.<br>` +
            `Each ${ctx.b} adds ${step}, so there are ${total - n * ctx.na} ÷ ${step} = ${nb} ${ctx.b}s and ${n - nb} ${ctx.a}s.<br>` +
            `<span class="work">Check: ${n - nb} × ${ctx.na} + ${nb} × ${ctx.nb} = ${total}. ✓</span>`
        };
      }));

      // Q2: heads and legs.
      out.push(until(() => {
        const [two, four] = rng.pick([['chickens', 'sheep'], ['ducks', 'goats'], ['hens', 'cows'], ['weka', 'pigs']]);
        const n = rng.int(hard ? 20 : 10, hard ? 50 : 25);
        const f = rng.int(1, n - 1);
        const legs = 2 * (n - f) + 4 * f;
        const askFour = rng.chance(0.5);
        const answer = askFour ? f : n - f;
        return {
          prompt: `A farm has only ${two} and ${four}. Between them they have ${n} heads and ${legs} legs. How many ${askFour ? four : two} are there?`,
          learn: 'assume',
          hints: [
            'Every animal has one head, so there are ' + n + ' animals. Pretend they all have 2 legs.',
            `How many legs is that, and how many are left over?`,
            `Each animal with 4 legs uses up 2 of the left-over legs.`
          ],
          input: { kind: 'number', suffix: askFour ? four : two, answer, width: 70 },
          explain: `If all ${n} had 2 legs: ${2 * n} legs. There are ${legs - 2 * n} extra.<br>` +
            `Each of the ${four} has 2 extra legs, so there are ${legs - 2 * n} ÷ 2 = ${f} ${four} and ${n - f} ${two}.<br>` +
            `<span class="work">Check: ${n - f} × 2 + ${f} × 4 = ${legs}. ✓</span>`
        };
      }));

      // Q3: ages from their product, with one teenager.
      out.push(until(() => {
        const teen = rng.int(13, 19);
        const x = rng.int(hard ? 2 : 1, 12), y = rng.int(hard ? 2 : 1, 12);
        const P = teen * x * y;
        const teens = new Set();
        const rows = [];
        for (let t = 13; t <= 19; t++) {
          if (P % t) { rows.push([t, '—', 'not a factor']); continue; }
          const q = P / t;
          const pairs = [];
          for (let p = 1; p <= 12; p++) if (q % p === 0 && q / p >= p && q / p <= 12) pairs.push(`${p} × ${q / p}`);
          if (pairs.length) teens.add(t);
          rows.push([t, q, pairs.length ? pairs.join(', ') + ' ✓' : 'no two ages under 13']);
        }
        if (teens.size !== 1) return null;
        const fam = rng.pick(['Fong', 'Tupou', 'Patel', 'Ngata', 'Smith', 'Kim']);
        return {
          prompt: `There are three children in the ${fam} family. Exactly one of them is a teenager (13 to 19), and the other two are younger than 13. ` +
                  `Their ages, in whole years, multiply to ${P}. How old is the teenager?`,
          learn: 'factors',
          hints: [
            `The teenager's age must divide ${P} exactly. Which of 13, 14, 15, 16, 17, 18, 19 do?`,
            `For each one that does, divide it out. What is left is the product of the two younger ages.`,
            'Can that be split into two whole numbers that are both under 13? Only one teenage age will work.'
          ],
          input: { kind: 'number', suffix: 'years old', answer: teen, width: 70 },
          explain: 'Test each teenage age:' + table(['Teen', `${P} ÷ teen`, 'Two younger ages'], rows) +
            `Only ${teen} works.`
        };
      }));

      // Q4: a pile of coins of two values.
      out.push(until(() => {
        const [lo, hi] = rng.pick([[20, 50], [10, 50], [10, 20], [100, 200]]);
        const name = c => c >= 100 ? `$${c / 100}` : `${c}c`;
        const n = rng.int(hard ? 15 : 8, hard ? 30 : 16);
        const k = rng.int(1, n - 1);
        const total = lo * (n - k) + hi * k;
        const who = rng.pick(NAMES);
        const fmt = v => v % 100 === 0 ? `$${v / 100}` : `$${(v / 100).toFixed(2)}`;
        return {
          prompt: `${who} has ${n} coins, all ${name(lo)} and ${name(hi)} coins, worth ${fmt(total)} altogether. How many ${name(hi)} coins are there?`,
          learn: 'assume',
          hints: [
            `Pretend all ${n} coins are ${name(lo)}. What would they be worth?`,
            `How far short of ${fmt(total)} is that?`,
            `Swapping one ${name(lo)} coin for a ${name(hi)} coin adds ${name(hi - lo)}. How many swaps make up the difference?`
          ],
          input: { kind: 'number', suffix: `${name(hi)} coins`, answer: k, width: 70 },
          explain: `All ${name(lo)}: ${n} × ${name(lo)} = ${fmt(n * lo)}, which is ${fmt(total - n * lo)} short.<br>` +
            `Each swap adds ${name(hi - lo)}, so ${fmt(total - n * lo)} ÷ ${name(hi - lo)} = ${k} coins are ${name(hi)}.<br>` +
            `<span class="work">Check: ${n - k} × ${name(lo)} + ${k} × ${name(hi)} = ${fmt(total)}. ✓</span>`
        };
      }));

      // Q5: the bat-and-ball trap.
      out.push(until(() => {
        const cheap = rng.int(2, hard ? 25 : 12);
        const gap = rng.int(hard ? 15 : 8, hard ? 60 : 30);
        const T = 2 * cheap + gap;
        const [big, small] = rng.pick([['book', 'pen'], ['skateboard', 'helmet'], ['pair of boots', 'pair of socks'], ['school bag', 'lunchbox']]);
        return {
          prompt: `A ${big} and a ${small} cost $${T} together. The ${big} costs $${gap} more than the ${small}. How much does the ${small} cost?`,
          learn: 'check',
          hints: [
            `Many people answer $${T - gap}. Check it: if the ${small} were $${T - gap}, what would the ${big} cost, and what would the total be?`,
            `Take away the extra $${gap} first. What is left is two equal prices.`,
            `$${T} − $${gap} = $${T - gap}, and that is shared equally between the two.`
          ],
          input: { kind: 'number', prefix: '$', answer: cheap, width: 70 },
          explain: `Take off the $${gap} difference: $${T} − $${gap} = $${T - gap}. That is two ${small}s' worth, so the ${small} is $${cheap} and the ${big} is $${cheap + gap}.<br>` +
            `<span class="work">Check: $${cheap} + $${cheap + gap} = $${T}, and the difference is $${gap}. ✓ (The tempting $${T - gap} would make the total $${2 * (T - gap) + gap}.)</span>`
        };
      }));

      // Q6: two symbols, two facts.
      out.push(until(() => {
        const t = rng.int(2, hard ? 20 : 12), c = rng.int(2, hard ? 20 : 12);
        if (t === c) return null;
        const [ka, kb] = hard ? rng.pick([[2, 1], [3, 1], [3, 2]]) : [2, 1];
        const p = ka * t + kb * c, q = kb * t + ka * c;
        const many = (k, s) => k === 1 ? `one ${s}` : `${['', '', 'two', 'three'][k]} ${s}s`;
        const sum = (p + q) / (ka + kb);
        const askCircle = rng.chance(0.5);
        return {
          prompt: `In these weighings, every ▲ weighs the same and every ● weighs the same.<br>` +
                  `${many(ka, '▲').replace(/^./, s => s.toUpperCase())} and ${many(kb, '●')} weigh ${p} g.<br>` +
                  `${many(kb, '▲').replace(/^./, s => s.toUpperCase())} and ${many(ka, '●')} weigh ${q} g.<br>` +
                  `How much does one ${askCircle ? '●' : '▲'} weigh?`,
          learn: 'combine',
          hints: [
            'Put everything from both weighings on the scale together. How many ▲ and how many ● is that, and what do they weigh?',
            `There are now the same number of ▲ as ●, so you can find what one ▲ and one ● weigh together.`,
            `Now compare the two weighings with each other. Which one is heavier, and what does that tell you about ▲ and ●?`
          ],
          input: { kind: 'number', suffix: 'g', answer: askCircle ? c : t, width: 70 },
          explain: `Together: ${ka + kb} ▲ and ${ka + kb} ● weigh ${p} + ${q} = ${p + q} g, so one ▲ and one ● weigh ${p + q} ÷ ${ka + kb} = ${sum} g.<br>` +
            `The first weighing has ${ka - kb} more ▲ and ${ka - kb} fewer ● than the second, and ` +
            (p > q
              ? `is ${p - q} g heavier, so each ▲ is ${(p - q) / (ka - kb)} g heavier than a ●.`
              : `is ${q - p} g lighter, so each ▲ is ${(q - p) / (ka - kb)} g lighter than a ●.`) +
            `<br>Two numbers that add to ${sum} and differ by ${Math.abs(t - c)}: ▲ = ${t} g and ● = ${c} g.<br>` +
            `<span class="work">Check: ${ka} × ${t} + ${kb} × ${c} = ${p}, and ${kb} × ${t} + ${ka} × ${c} = ${q}. ✓</span>`
        };
      }));

      // Q7: a quiz with marks taken off for wrong answers.
      out.push(until(() => {
        const N = rng.int(hard ? 15 : 10, hard ? 30 : 20);
        const r = rng.int(3, 5), w = rng.int(1, 2);
        const k = rng.int(Math.ceil(N / 2), N - 1);
        const S = k * r - (N - k) * w;
        if (S <= 0) return null;
        const who = rng.pick(NAMES);
        return {
          prompt: `A quiz has ${N} questions. A right answer earns ${r} points and a wrong answer loses ${w} ${plural(w, 'point')}. ` +
                  `${who} answered every question and scored ${S}. How many did ${who} get right?`,
          learn: 'assume',
          hints: [
            `Pretend every answer was right. What would the score be?`,
            `How many points short of that is ${S}?`,
            `Changing one answer from right to wrong loses the ${r} points and also takes off ${w}. That is ${r + w} points per wrong answer.`
          ],
          input: { kind: 'number', suffix: 'right', answer: k, width: 70 },
          explain: `All right would be ${N} × ${r} = ${N * r}. The score is ${N * r - S} less.<br>` +
            `Each wrong answer costs ${r} + ${w} = ${r + w}, so there were ${N * r - S} ÷ ${r + w} = ${N - k} wrong and ${k} right.<br>` +
            `<span class="work">Check: ${k} × ${r} − ${N - k} × ${w} = ${S}. ✓</span>`
        };
      }));

      // Q8: passing things over until it is fair.
      out.push(until(() => {
        const k = rng.int(2, hard ? 5 : 3);
        const b = rng.int(2, hard ? 20 : 12);
        if ((b * (k - 1)) % 2) return null;
        const g = b * (k - 1) / 2;
        const [x, y] = rng.sample(NAMES, 2);
        const thing = rng.pick(['stickers', 'marbles', 'cards', 'shells']);
        const times = k === 2 ? 'twice' : `${['', '', '', 'three', 'four', 'five'][k]} times`;
        const total = (k + 1) * b;
        return {
          prompt: `${x} has ${times} as many ${thing} as ${y}. After ${x} gives ${y} ${g} ${thing}, they have the same number. How many ${thing} did ${y} have at the start?`,
          learn: 'same',
          hints: [
            `Giving ${thing} away does not change the total. Think about the gap between them instead.`,
            `When ${x} gives ${g} away, ${x} goes down by ${g} and ${y} goes up by ${g}. By how much does the gap shrink?`,
            `So the gap at the start was ${2 * g}. ${x} had ${times} as many, so the gap is ${k - 1} lots of what ${y} had.`
          ],
          input: { kind: 'number', suffix: thing, answer: b, width: 70 },
          explain: `Each ${thing.replace(/s$/, '')} passed over closes the gap by 2, so the gap was ${g} × 2 = ${2 * g}.<br>` +
            `${x} had ${k} lots and ${y} had 1 lot, a gap of ${k - 1} ${plural(k - 1, 'lot')}. So one lot is ${2 * g} ÷ ${k - 1} = ${b}.<br>` +
            `<span class="work">Check: ${x} ${k * b}, ${y} ${b}. After the gift, ${k * b - g} and ${b + g}. ✓ (Total ${total} throughout.)</span>`
        };
      }));

      return out;
    }
  };


  const frac = (a, b) => `\\(\\tfrac{${a}}{${b}}\\)`;
  const digitSum = v => String(v).split('').reduce((s, d) => s + Number(d), 0);
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a / gcd(a, b) * b;
  const andList = xs => xs.length > 1 ? xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1] : String(xs[0]);
  const ORD = ['', 'once', 'twice', 'three times', 'four times', 'five times', 'six times', 'seven times'];

  // ═══════════════════════════════════════════════════════════════════════
  // 6.3  Digits and Numbers
  // ═══════════════════════════════════════════════════════════════════════
  Topics.u6e3 = {
    id: 'u6e3', unit: 6, untimed: true,
    title: 'Digits and Numbers',
    blurb: 'Puzzles about how numbers are written: digits, place value, remainders and patterns that repeat.',
    hint: 'Think about what each place is worth. Then try small cases, or list a few, until you see the pattern.',

    learn: [
      {
        id: 'place', title: 'Front digits matter most', wide: true,
        text: '<p>In a three-digit number the first digit is worth hundreds and the last only ones. So to make a number <em>small</em>, keep the front digits small and push the big digits to the back. To make it <em>large</em>, do the opposite.</p>' +
              '<p>Fill the places from the front. For each place, ask: what is the smallest (or largest) digit I can put here and still finish the number?</p>'
      },
      {
        id: 'byplace', title: 'Count one place at a time',
        text: '<p>To count how many times a digit appears from 1 to 100, count it in the ones place first (7, 17, 27, …), then in the tens place (70 to 79). Add the two.</p>' +
              '<p>77 has two 7s, and this method counts it twice, which is right.</p>'
      },
      {
        id: 'remainder', title: 'List one condition, test the rest',
        text: '<p>"Leaves 2 over in 3s and 1 over in 4s" has two conditions. List the numbers that meet the one with the biggest divisor (5, 9, 13, 17, …), then test each against the others.</p>'
      },
      {
        id: 'cycle', title: 'Last digits repeat',
        text: '<p>The last digits of 3, 9, 27, 81, 243, … go 3, 9, 7, 1, 3, 9, 7, 1, … The last digit of a product depends only on the last digits being multiplied, so the pattern repeats forever.</p>' +
              '<p>Find how long the cycle is, then use the remainder to see where in the cycle a big power lands.</p>'
      },
      {
        id: 'estimate', title: 'Estimate, then adjust', wide: true,
        text: '<p>Two consecutive numbers multiply to 812. Since \\(28 \\times 28 = 784\\) and \\(29 \\times 29 = 841\\), the numbers must be near 28 or 29. Try \\(28 \\times 29 = 812\\). ✓</p>' +
              '<p>A good estimate turns a long search into one or two checks.</p>'
      }
    ],

    examples: [
      {
        title: 'Example: what is the smallest three-digit number whose digits add to 13?',
        steps: [
          'To be small, the hundreds digit should be as small as possible.',
          'Could it be 1? Then the tens and ones must add to 12, which is possible (3 and 9). So the hundreds digit is 1.',
          'Now the tens digit should be as small as possible. The ones digit can be at most 9, so the tens digit must be at least 12 − 9 = 3.',
          'That leaves 9 for the ones.'
        ],
        result: 'Answer: 139'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: smallest or largest number with a given digit sum.
      out.push(until(() => {
        const distinct = hard;
        const lo = distinct ? 1000 : 100, hi = distinct ? 9999 : 999;
        const S = rng.int(distinct ? 12 : 8, distinct ? 30 : 25);
        const largest = !distinct && rng.chance(0.4);
        const ok = v => digitSum(v) === S && (!distinct || new Set(String(v)).size === String(v).length);
        let ans = null;
        if (largest) { for (let v = hi; v >= lo; v--) if (ok(v)) { ans = v; break; } }
        else { for (let v = lo; v <= hi; v++) if (ok(v)) { ans = v; break; } }
        if (ans === null) return null;
        const kind = distinct ? 'four-digit number with all its digits different' : 'three-digit number';
        return {
          prompt: `What is the ${largest ? 'largest' : 'smallest'} ${kind} whose digits add to ${S}?`,
          learn: 'place',
          hints: [
            largest ? 'To be large, the first digit should be as big as possible.' : 'To be small, the first digit should be as small as possible.',
            largest
              ? 'Give the first digit the most it can have (at most 9), then do the same for the next digit, and so on.'
              : `Each later digit can be at most ${distinct ? '9, then 8, then 7, since they must differ' : '9'}. So how small can the first digit be and still reach ${S}?`,
            largest ? 'Whatever is left goes in the last places.' : 'Then make the next digit as small as possible in the same way. The big digits end up at the back.'
          ],
          input: { kind: 'number', answer: ans, width: 90 },
          explain: (largest
            ? 'Fill the places from the front, giving each digit as much as it can have.'
            : 'Fill the places from the front, giving each digit the smallest value that still leaves enough for the digits after it' + (distinct ? ', which must all be different' : '') + '.') +
            `<br>${String(ans).split('').join(' + ')} = ${S}, so the answer is ${ans}.`
        };
      }));

      // Q2: digits needed to number the pages of a book.
      out.push(until(() => {
        const reverse = hard && rng.chance(0.6);
        const N = rng.int(reverse ? 110 : 40, reverse ? 400 : 250);
        let D = 0;
        for (let p = 1; p <= N; p++) D += String(p).length;
        const one = Math.min(N, 9), two = Math.max(0, Math.min(N, 99) - 9), three = Math.max(0, N - 99);
        const parts = [`Pages 1 to ${one}: ${one} × 1 = ${one}`];
        if (two) parts.push(`Pages 10 to ${Math.min(N, 99)}: ${two} × 2 = ${2 * two}`);
        if (three) parts.push(`Pages 100 to ${N}: ${three} × 3 = ${3 * three}`);
        return {
          prompt: reverse
            ? `The pages of a book are numbered 1, 2, 3, … It takes ${D} digits altogether to number every page. What is the number on the last page?`
            : `The pages of a book are numbered from 1 to ${N}. How many digits are printed altogether? (Page 25 uses two digits.)`,
          learn: 'byplace',
          hints: [
            'Split the pages into groups: the one-digit page numbers, the two-digit ones and the three-digit ones.',
            'Pages 1 to 9 use 9 digits. Pages 10 to 99 are 90 pages with 2 digits each.',
            reverse ? `Take those away from ${D}. Every page after 99 uses 3 digits, so how many such pages are there?` : 'Work out how many pages are in the last group, and how many digits each one uses.'
          ],
          input: reverse ? { kind: 'number', answer: N, width: 80 } : { kind: 'number', suffix: 'digits', answer: D, width: 80 },
          explain: parts.join('<br>') + `<br>Total: ${D} digits.` +
            (reverse ? `<br><span class="work">Working back: ${D} − 189 = ${D - 189} digits on three-digit pages, which is ${three} pages, so the last is 99 + ${three} = ${N}.</span>` : '')
        };
      }));

      // Q3: how often a digit is written from 1 to N.
      out.push(until(() => {
        const N = rng.pick(hard ? [100, 120, 150, 199, 200, 250] : [50, 60, 80, 99, 100]);
        const d = rng.int(1, 9);
        const places = [0, 0, 0];
        for (let v = 1; v <= N; v++) String(v).split('').reverse().forEach((c, i) => { if (Number(c) === d) places[i]++; });
        const total = places[0] + places[1] + places[2];
        if (total < 3) return null;
        const name = ['ones', 'tens', 'hundreds'];
        return {
          prompt: `You write out every whole number from 1 to ${N}. How many times do you write the digit ${d}?`,
          learn: 'byplace',
          hints: [
            `Count the ${d}s in the ones place first: ${d}, 1${d}, 2${d}, …`,
            `Then count the ${d}s in the tens place${N >= 100 ? ', and then the hundreds place' : ''}.`,
            `A number like ${d}${d} has two ${d}s. Counting place by place gets that right automatically.`
          ],
          input: { kind: 'number', suffix: 'times', answer: total, width: 70 },
          explain: places.map((c, i) => c ? `In the ${name[i]} place: ${c}` : null).filter(Boolean).join('<br>') +
            `<br>Total: ${total}.`
        };
      }));

      // Q4: a two-digit number and its reverse.
      out.push(until(() => {
        const a = rng.int(1, 8), b = rng.int(a + 1, 9);
        const n = 10 * a + b, rev = 10 * b + a;
        const bigger = rng.chance(0.5);
        const s = a + b, dlt = rev - n;
        const num = bigger ? n : rev;
        // Check by search that only one number fits.
        const fits = [];
        for (let v = 10; v <= 99; v++) {
          const r = 10 * (v % 10) + Math.floor(v / 10);
          if (digitSum(v) === s && (bigger ? r - v : v - r) === dlt && v % 10 !== 0) fits.push(v);
        }
        if (fits.length !== 1 || fits[0] !== num) return null;
        return {
          prompt: `A two-digit number has digits that add to ${s}. When its digits are swapped round, the new number is ${dlt} ${bigger ? 'more' : 'less'} than the original. What is the original number?`,
          learn: 'place',
          hints: [
            'Try an example: 25 reversed is 52, which is 27 more. 14 reversed is 41, also 27 more. What do 25 and 14 have in common?',
            'Swapping the digits changes the number by 9 times the gap between the digits.',
            `So the digits differ by ${dlt} ÷ 9 = ${dlt / 9}, and they add to ${s}.`
          ],
          input: { kind: 'number', answer: num, width: 70 },
          explain: `Swapping the digits changes a number by 9 × (the gap between its digits), so the gap is ${dlt} ÷ 9 = ${dlt / 9}.<br>` +
            `Two digits that add to ${s} and differ by ${dlt / 9}: ${a} and ${b}. The number ${bigger ? 'gets bigger' : 'gets smaller'}, so the original is ${num}.<br>` +
            `<span class="work">Check: ${num} reversed is ${bigger ? rev : n}, a difference of ${dlt}. ✓</span>`
        };
      }));

      // Q5: remainders.
      out.push(until(() => {
        const mods = rng.pick(hard ? [[3, 4, 5], [2, 3, 5], [3, 5, 7], [4, 5, 6], [3, 4, 7], [2, 5, 7]] : [[2, 3], [3, 4], [3, 5], [4, 5], [2, 5], [4, 6]]);
        const mode = rng.pick(hard ? ['one', 'short', 'any'] : ['one', 'short', 'any']);
        const rems = mods.map(m => mode === 'one' ? 1 : mode === 'short' ? m - 1 : rng.int(1, m - 1));
        const M = Math.max(...mods);
        const fitsAll = t => mods.every((m, i) => t % m === rems[i]);
        let ans = null;
        for (let t = M + 1; t < 2000; t++) if (fitsAll(t)) { ans = t; break; }
        if (ans === null || ans > 200) return null;
        const thing = rng.pick(['eggs', 'marbles', 'beads', 'counters']);
        const big = mods.indexOf(M);
        const list = [];
        for (let t = rems[big]; t <= ans; t += M) if (t > M) list.push(t === ans ? `<strong>${t}</strong>` : t);
        return {
          prompt: `There are more than ${M} ${thing} in a box. ` +
            mods.map((m, i) => `Counted out in ${m}s, there ${rems[i] === 1 ? 'is 1' : 'are ' + rems[i]} left over.`).join(' ') +
            ` What is the smallest number of ${thing} there could be?`,
          learn: 'remainder',
          hints: [
            `Start with the biggest group size, ${M}. Which numbers leave ${rems[big]} over when counted in ${M}s?`,
            `List them: ${rems[big] + M}, ${rems[big] + 2 * M}, ${rems[big] + 3 * M}, … and test each against the other condition${mods.length > 2 ? 's' : ''}.`,
            mode === 'one' ? 'Every condition leaves 1 over. What if you took that 1 away?' : mode === 'short' ? 'Every condition is 1 short of a full group. What if there were one more?' : 'Keep going down the list: the first one that passes every test is the answer.'
          ],
          input: { kind: 'number', suffix: thing, answer: ans, width: 70 },
          explain: `Numbers that leave ${rems[big]} over in ${M}s: ${list.join(', ')}.<br>Testing each against the other condition${mods.length > 2 ? 's' : ''}, the first that works is ${ans}.` +
            (mode === 'one' ? `<br><span class="work">Shortcut: one fewer, ${ans - 1}, divides exactly by ${andList(mods)}.</span>` : '') +
            (mode === 'short' ? `<br><span class="work">Shortcut: one more, ${ans + 1}, divides exactly by ${andList(mods)}.</span>` : '')
        };
      }));

      // Q6: consecutive numbers from their product.
      out.push(until(() => {
        const three = hard && rng.chance(0.5);
        const n = rng.int(three ? 6 : 8, three ? 20 : 45);
        const P = three ? n * (n + 1) * (n + 2) : n * (n + 1);
        const root = three ? Math.cbrt(P) : Math.sqrt(P);
        const g = Math.floor(root);
        return {
          prompt: three
            ? `Three consecutive whole numbers multiply to ${P}. What is the smallest of them?`
            : `Two consecutive whole numbers multiply to ${P}. What is the larger of them?`,
          learn: 'estimate',
          hints: [
            three ? 'Three numbers close together multiply to about the cube of the middle one.' : 'Two numbers next to each other multiply to a bit more than the smaller one squared.',
            three ? `Which number cubed is close to ${P}? Try 10 × 10 × 10 = 1000 as a start.` : `Which number squared is close to ${P}? Try 20 × 20 = 400 or 30 × 30 = 900 as a start.`,
            'Check the numbers either side of your estimate. The last digit of the product can help you choose.'
          ],
          input: { kind: 'number', answer: three ? n : n + 1, width: 70 },
          explain: `${three ? `${g}³ = ${g ** 3}` : `${g}² = ${g * g}`}, so the numbers are near ${g}.<br>` +
            (three ? `Try ${n} × ${n + 1} × ${n + 2} = ${P}. ✓ The smallest is ${n}.` : `Try ${n} × ${n + 1} = ${P}. ✓ The larger is ${n + 1}.`)
        };
      }));

      // Q7: the last digit of a big power.
      out.push(until(() => {
        const base = rng.pick(hard ? [2, 3, 7, 8, 4, 9] : [2, 3, 7]);
        const e = rng.int(hard ? 40 : 15, hard ? 200 : 60);
        const cyc = [];
        let d = base % 10;
        while (!cyc.includes(d)) { cyc.push(d); d = (d * base) % 10; }
        let last = 1;
        for (let i = 0; i < e; i++) last = (last * base) % 10;
        const L = cyc.length, r = e % L;
        return {
          prompt: `What is the last digit of \\(${base}^{${e}}\\)? (That is ${base} multiplied by itself ${e} times.)`,
          learn: 'cycle',
          hints: [
            `Work out the last digit of \\(${base}^1, ${base}^2, ${base}^3, ${base}^4, …\\) You only need to keep the last digit each time.`,
            `The last digits repeat in a cycle. How long is it?`,
            `Divide ${e} by the length of the cycle. The remainder tells you where in the cycle you land${r === 0 ? ' (a remainder of 0 means the end of a cycle)' : ''}.`
          ],
          input: { kind: 'number', answer: last, width: 60 },
          explain: `Last digits of powers of ${base}: ${cyc.join(', ')}, then they repeat. The cycle is ${L} long.<br>` +
            `${e} ÷ ${L} = ${Math.floor(e / L)} remainder ${r}, so \\(${base}^{${e}}\\) lands on ${r === 0 ? `the end of a cycle, position ${L}` : `position ${r}`}: the last digit is ${last}.`
        };
      }));

      // Q8: the next palindrome on a car's odometer.
      out.push(until(() => {
        const pal = v => { const s = String(v); return s === s.split('').reverse().join(''); };
        let start;
        if (hard) start = rng.int(10000, 98000);
        else { const a = rng.int(1, 9), b = rng.int(0, 9), c = rng.int(0, 9); start = Number(`${a}${b}${c}${b}${a}`); }
        if (hard && pal(start)) return null;
        let next = start + 1;
        while (!pal(next)) next++;
        if (next > 99999) return null;
        return {
          prompt: hard
            ? `A car's odometer reads ${start} km. How many more kilometres until it next shows a palindrome (a number that reads the same backwards, like 12321)?`
            : `A car's odometer reads ${start} km, which is a palindrome: it reads the same backwards. How many more kilometres until it next shows a palindrome?`,
          learn: 'place',
          hints: [
            'A five-digit palindrome looks like abcba. The first two digits decide the last two.',
            hard ? 'Keep the first two digits if you can, and find the smallest middle digit that makes the number bigger than the reading.'
                 : 'To change as little as possible, change the middle digit. What happens if the middle digit is already 9?',
            'Write the next palindrome down, then subtract.'
          ],
          input: { kind: 'number', suffix: 'km', answer: next - start, width: 80 },
          explain: `The next palindrome after ${start} is ${next}.<br>${next} − ${start} = ${next - start} km.` +
            (!hard && String(start)[2] === '9' ? '<br><span class="work">The middle digit was already 9, so it rolls over to 0 and the digits either side go up by one.</span>' : '')
        };
      }));

      return out;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6.4  What Stays the Same
  // ═══════════════════════════════════════════════════════════════════════
  Topics.u6e4 = {
    id: 'u6e4', unit: 6, untimed: true,
    title: 'What Stays the Same',
    blurb: 'Something changes, and something does not. Find the part that stays fixed, and the problem usually falls open.',
    hint: 'Ask what does not change: a number of things, a total, a gap, a distance. Work with that.',

    learn: [
      {
        id: 'fixed', title: 'Find the part that does not change', wide: true,
        text: '<p>One tenth of the cars in a car park are yellow. A yellow car arrives and now one ninth are yellow. The cars that are <em>not</em> yellow have not changed.</p>' +
              '<p>Before: 9 tenths of the cars are not yellow. After: 8 ninths are not yellow. Write each fact about the part that stayed fixed, and compare.</p>'
      },
      {
        id: 'backwards', title: 'Work backwards',
        text: '<p>If you know the end and every step, start at the end and undo each step in reverse order.</p>' +
              '<p>"Spent half" is undone by doubling. "Spent $5" is undone by adding $5.</p>'
      },
      {
        id: 'gap', title: 'Age gaps never change',
        text: '<p>Everybody gets one year older each year, so the <em>difference</em> between two ages is the same forever.</p>' +
              '<p>If a parent is 4 times as old as a child, the gap is 3 times the child\'s age. That same gap will be there in 10 years.</p>'
      },
      {
        id: 'totals', title: 'Averages hide totals',
        text: '<p>An average of 70 over 4 tests means 280 marks in total. Turn each average back into a total, and the change in total is the new mark.</p>'
      },
      {
        id: 'speed', title: 'Average speed is not the average of the speeds', wide: true,
        text: '<p>Average speed is <em>total distance ÷ total time</em>. If you drive 60 km at 30 km/h and come back at 60 km/h, the trip takes 2 h + 1 h = 3 h for 120 km: 40 km/h, not 45.</p>' +
              '<p>You spend longer at the slow speed, so it counts for more.</p>'
      }
    ],

    examples: [
      {
        title: 'Example: one tenth of the cars are yellow. A yellow car arrives, and now one ninth are yellow. How many cars are there now?',
        steps: [
          'The number of cars that are not yellow has not changed.',
          'Before, the yellow cars were 1 out of every 10, so there were 9 non-yellow cars for each yellow one.',
          'After, there are 8 non-yellow cars for each yellow one.',
          'One more yellow car changed "9 for each" into "8 for each". Try 8 yellow cars before: 72 non-yellow, 80 cars. After: 9 yellow, 72 non-yellow: 72 = 8 × 9. ✓'
        ],
        result: 'Answer: 81 cars'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: the yellow cars.
      out.push(until(() => {
        const m = rng.int(4, hard ? 12 : 8);
        const n = rng.int(2, m - 1);
        const k = rng.int(1, hard ? 4 : 2);
        const arrive = !hard || rng.chance(0.5);
        // Search for the starting number of yellow cars.
        const ys = [];
        for (let y = 1; y <= 300; y++) {
          const T = m * y;
          if (arrive && (y + k) * n === T + k) ys.push(y);
          if (!arrive && y * n === T - k) ys.push(y);
        }
        if (ys.length !== 1) return null;
        const y = ys[0], T = m * y, now = arrive ? T + k : T - k;
        if (now > 400) return null;
        return {
          prompt: `In a car park, exactly ${frac(1, m)} of the cars are yellow. ` +
            (arrive ? `Then ${k === 1 ? 'another yellow car arrives' : `${k} more yellow cars arrive`}`
                    : `Then ${k === 1 ? 'one car leaves, and it is not yellow' : `${k} cars leave, and none of them is yellow`}`) +
            `, and now exactly ${frac(1, n)} of the cars are yellow. How many cars are in the car park now?`,
          learn: 'fixed',
          hints: [
            arrive ? 'Which cars have not changed in number?' : 'The yellow cars have not changed in number. Call it y.',
            arrive ? `Before, for every yellow car there were ${m - 1} others. After, for every yellow car there are ${n - 1} others.`
                   : `Before, there were ${m} cars for each yellow one. After, there are ${n} cars for each yellow one.`,
            'Try a number of yellow cars and see whether both facts fit. Make a table.'
          ],
          input: { kind: 'number', suffix: 'cars', answer: now, width: 80 },
          explain: arrive
            ? `The non-yellow cars do not change. Before: ${y} yellow and ${T - y} others (${m - 1} for each yellow). After: ${y + k} yellow and still ${T - y} others, which is ${n - 1} × ${y + k}. ✓<br>So there are now ${y + k} + ${T - y} = ${now} cars.`
            : `The yellow cars do not change: call it y. Before there were ${m}y cars, after ${n}y, so ${k} = ${m - n}y and y = ${y}.<br>Before: ${T} cars. Now: ${n} × ${y} = ${now} cars.`
        };
      }));

      // Q2: working backwards through money spent and received.
      out.push(until(() => {
        const name = rng.pick(NAMES);
        const steps = hard ? 4 : 3;
        const OPS = [
          { txt: () => 'spent half of the money', f: x => x % 2 ? null : x / 2, undo: 'double it', g: x => 2 * x, frac: true },
          { txt: () => 'spent a third of the money', f: x => x % 3 ? null : 2 * x / 3, undo: 'two thirds were left, so halve it and multiply by 3', g: x => 3 * x / 2, frac: true },
          { txt: c => `spent $${c}`, f: (x, c) => x - c > 0 ? x - c : null, undo: c => `add $${c}`, g: (x, c) => x + c },
          { txt: c => `was given $${c}`, f: (x, c) => x + c, undo: c => `take away $${c}`, g: (x, c) => x - c }
        ];
        const plan = [];
        for (let i = 0; i < steps; i++) plan.push({ op: rng.pick(OPS), c: rng.int(2, 12) * (rng.chance(0.5) ? 1 : 2) });
        if (!plan.some(p => p.op.frac)) return null;
        const start = rng.int(hard ? 30 : 12, hard ? 240 : 100);
        let x = start;
        const trail = [x];
        for (const p of plan) { x = p.op.f(x, p.c); if (x === null || x <= 0) return null; trail.push(x); }
        const end = x;
        const back = [];
        for (let i = plan.length - 1; i >= 0; i--) {
          const p = plan[i];
          const how = typeof p.op.undo === 'function' ? p.op.undo(p.c) : p.op.undo;
          back.push(`Before "${p.op.txt(p.c)}": ${how}, $${trail[i + 1]} → $${trail[i]}`);
        }
        const story = plan.map(p => p.op.txt(p.c));
        return {
          prompt: `${name} had some money. First ${name} ${story[0]}, then ${story.slice(1, -1).map(s => s + ', then ').join('')}${story[story.length - 1]}. ` +
                  `${name} ended up with $${end}. How much did ${name} start with?`,
          learn: 'backwards',
          hints: [
            `Start at the end, with $${end}, and go backwards through the story.`,
            'Undo each step: spending is undone by adding back, and spending half is undone by doubling.',
            'Undo the steps in reverse order: the last thing that happened is the first thing you undo.'
          ],
          input: { kind: 'number', prefix: '$', answer: start, width: 80 },
          explain: `Start from $${end} and undo each step, last first:<br>` + back.join('<br>') +
            `<br><span class="work">Check forwards: ${trail.map(v => '$' + v).join(' → ')}. ✓</span>`
        };
      }));

      // Q3: ages, using the gap that never changes.
      out.push(until(() => {
        const a = rng.int(3, 12), k = rng.int(3, hard ? 7 : 5), j = rng.int(2, k - 1);
        if ((a * (k - j)) % (j - 1)) return null;
        const y = a * (k - j) / (j - 1);
        if (y < 1 || y > 30 || k * a > 60 || k * a < 20) return null;
        const name = rng.pick(NAMES);
        const rel = rng.pick(['mum', 'dad', 'aunt', 'uncle', 'grandmother']);
        return {
          prompt: `${name}'s ${rel} is ${ORD[k]} as old as ${name}. ${y === 1 ? 'Next year' : `In ${y} years' time`}, the ${rel} will be ${ORD[j]} as old as ${name}. How old is ${name} now?`,
          learn: 'gap',
          hints: [
            'The difference between their ages never changes. Think about the gap.',
            `Now, the ${rel} is ${k} times ${name}'s age, so the gap is ${k - 1} times ${name}'s age.`,
            `In ${y} years the gap will be ${j - 1 === 1 ? `the same as ${name}'s age then` : `${j - 1} times ${name}'s age then`}. Try some ages and see which fits both.`
          ],
          input: { kind: 'number', suffix: 'years old', answer: a, width: 70 },
          explain: `Now: ${name} is ${a} and the ${rel} is ${k * a}, a gap of ${(k - 1) * a}.<br>` +
            `In ${y} years: ${a + y} and ${k * a + y}. The gap is still ${(k - 1) * a}, and ${k * a + y} = ${j} × ${a + y}. ✓<br>` +
            `<span class="work">Without guessing: ${k - 1} × now-age = ${j - 1} × later-age, and later-age is ${y} more.</span>`
        };
      }));

      // Q4: a tank at two fractions of full.
      out.push(until(() => {
        const [p, q] = rng.pick([[2, 3], [3, 4], [4, 5], [2, 5], [3, 5], [4, 6], [2, 4], [3, 6]]);
        const L = lcm(p, q);
        const C = L * 5 * rng.int(hard ? 2 : 1, hard ? 12 : 6);
        const D = C / p - C / q;
        // Search the capacity, to be sure.
        const caps = [];
        for (let c = 1; c <= 5000; c++) if (c % p === 0 && c % q === 0 && c / p - c / q === D) caps.push(c);
        if (caps.length !== 1) return null;
        return {
          prompt: `When a water tank is ${frac(1, p)} full, it holds ${D} litres more than when it is ${frac(1, q)} full. How many litres does the tank hold when it is full?`,
          learn: 'fixed',
          hints: [
            `What fraction of the tank is the difference between ${frac(1, p)} and ${frac(1, q)}?`,
            `Write both with the same denominator: ${frac(L / p, L)} and ${frac(L / q, L)}.`,
            `So ${frac(L / p - L / q, L)} of the tank is ${D} litres. How much is ${frac(1, L)}?`
          ],
          input: { kind: 'number', suffix: 'litres', answer: C, width: 80 },
          explain: `${frac(1, p)} − ${frac(1, q)} = ${frac(L / p, L)} − ${frac(L / q, L)} = ${frac(L / p - L / q, L)} of the tank, which is ${D} L.<br>` +
            `So ${frac(1, L)} is ${D / (L / p - L / q)} L, and the full tank is ${L} × ${D / (L / p - L / q)} = ${C} L.<br>` +
            `<span class="work">Check: ${C / p} − ${C / q} = ${D}. ✓</span>`
        };
      }));

      // Q5: an average that changes.
      out.push(until(() => {
        const n = rng.int(3, hard ? 8 : 5);
        const A = rng.int(55, 85);
        const extra = hard && rng.chance(0.5) ? 2 : 1;
        const B = A + rng.pick([-4, -3, -2, 2, 3, 4, 5]);
        const sum = (n + extra) * B - n * A;
        if (sum % extra) return null;
        const x = sum / extra;
        if (x < 10 || x > 100 || x === B) return null;
        const name = rng.pick(NAMES);
        return {
          prompt: `${name}'s average mark over ${n} tests is ${A}. After ${extra === 1 ? 'one more test' : 'two more tests, with the same mark in each,'} the average is ${B}. ` +
                  `What mark did ${name} get${extra === 1 ? ' in the new test' : ' in each new test'}?`,
          learn: 'totals',
          hints: [
            'An average is a total shared out evenly. Turn each average back into a total.',
            `${n} tests averaging ${A} means ${n} × ${A} marks in total.`,
            `After ${n + extra} tests averaging ${B}, what is the total? The difference is ${extra === 1 ? 'the new mark' : 'what the two new tests scored together'}.`
          ],
          input: { kind: 'number', suffix: 'marks', answer: x, width: 70 },
          explain: `Before: ${n} × ${A} = ${n * A} marks. After: ${n + extra} × ${B} = ${(n + extra) * B} marks.<br>` +
            `The new test${extra === 1 ? ' scored' : 's scored'} ${(n + extra) * B} − ${n * A} = ${sum}` + (extra === 2 ? `, so each one was ${x}.` : '.')
        };
      }));

      // Q6: diluting or strengthening a drink.
      out.push(until(() => {
        const V = rng.pick([6, 8, 10, 12, 15, 16, 18, 20, 24, 30]);
        const p = rng.int(3, 6);
        if (V % p) return null;
        const c = V / p;
        const water = !hard || rng.chance(0.5);
        const r = water ? rng.int(p + 1, p + 4) : rng.int(2, p - 1);
        const xs = [];
        for (let x = 1; x <= 200; x++) {
          if (water && c * r === V + x) xs.push(x);
          if (!water && (c + x) * r === V + x) xs.push(x);
        }
        if (xs.length !== 1) return null;
        const x = xs[0];
        return {
          prompt: `A container holds ${V} litres of drink, and ${frac(1, p)} of it is cordial (the rest is water). ` +
                  `How many litres of ${water ? 'water' : 'cordial'} must be added so that ${frac(1, r)} of the drink is cordial?`,
          learn: 'fixed',
          hints: [
            water ? 'Adding water does not change the amount of cordial. How many litres of cordial are there?' : 'Adding cordial does not change the amount of water. How many litres of water are there?',
            water ? `If that cordial is to be ${frac(1, r)} of the drink, how big must the whole drink be?` : `If cordial is to be ${frac(1, r)} of the drink, the water is ${frac(r - 1, r)} of it. How big must the whole drink be?`,
            `Compare that with the ${V} litres you started with.`
          ],
          input: { kind: 'number', suffix: 'litres', answer: x, width: 70 },
          explain: water
            ? `The cordial stays at ${frac(1, p)} × ${V} = ${c} L. For that to be ${frac(1, r)} of the drink, the drink must be ${c} × ${r} = ${c * r} L. So add ${c * r} − ${V} = ${x} L of water.`
            : `The water stays at ${V} − ${c} = ${V - c} L. For the water to be ${frac(r - 1, r)} of the drink, the drink must be ${V + x} L. So add ${V + x} − ${V} = ${x} L of cordial.<br>` +
              `<span class="work">Check: ${c + x} L of cordial in ${V + x} L is ${frac(1, r)}. ✓</span>`
        };
      }));

      // Q7: a swap shop chain.
      out.push(until(() => {
        const a = rng.int(2, 6), b = rng.int(2, 6), c = rng.int(2, 6), d = rng.int(2, 6);
        if (a === b || c === d) return null;
        const F = rng.int(4, hard ? 40 : 24);
        if ((F * c) % d) return null;
        const stones = F * c / d;
        if ((stones * a) % b) return null;
        const shells = stones * a / b;
        if (shells > 200) return null;
        const [s1, s2, s3] = rng.pick([['shells', 'stones', 'feathers'], ['stickers', 'badges', 'cards'], ['buttons', 'beads', 'ribbons']]);
        return {
          prompt: `At a swap table, ${a} ${s1} can be swapped for ${b} ${s2}, and ${c} ${s2} can be swapped for ${d} ${s3}. ` +
                  `How many ${s1} would you need to swap for ${F} ${s3}?`,
          learn: 'fixed',
          hints: [
            `Go one step at a time: first work out how many ${s2} ${F} ${s3} are worth.`,
            `${d} ${s3} are worth ${c} ${s2}. How many lots of ${d} are there in ${F}?`,
            `Then turn those ${s2} into ${s1}: every ${b} ${s2} are worth ${a} ${s1}.`
          ],
          input: { kind: 'number', suffix: s1, answer: shells, width: 70 },
          explain: `${F} ${s3} is ${F} ÷ ${d} = ${F / d} lots of ${d}, worth ${F / d} × ${c} = ${stones} ${s2}.<br>` +
            `${stones} ${s2} is ${stones} ÷ ${b} = ${stones / b} lots of ${b}, worth ${stones / b} × ${a} = ${shells} ${s1}.`
        };
      }));

      // Q8: the average speed trap.
      out.push(until(() => {
        const [v1, v2] = rng.pick([[30, 60], [40, 60], [60, 90], [50, 75], [60, 120], [45, 90], [20, 30], [80, 120]]);
        const avg = 2 * v1 * v2 / (v1 + v2);
        const D = lcm(v1, v2) * rng.int(1, 2);
        const [go, back] = rng.chance(0.5) ? [v1, v2] : [v2, v1];
        const name = rng.pick(NAMES);
        const town = rng.pick(['the beach', 'the lake', 'Taupō', 'the mountain']);
        return {
          prompt: `${name} drives ${D} km to ${town} at ${go} km/h, and comes straight back along the same road at ${back} km/h. What is the average speed for the whole round trip?`,
          learn: 'speed',
          hints: [
            `The tempting answer is ${(v1 + v2) / 2} km/h. Is it right? More time is spent at the slower speed.`,
            'Work out how long each half of the trip takes.',
            'Average speed is the total distance divided by the total time.'
          ],
          input: { kind: 'number', suffix: 'km/h', answer: avg, width: 70 },
          explain: `There: ${D} ÷ ${go} = ${D / go} h. Back: ${D} ÷ ${back} = ${D / back} h. Total: ${2 * D} km in ${D / go + D / back} h.<br>` +
            `Average speed = ${2 * D} ÷ ${D / go + D / back} = ${avg} km/h, not ${(v1 + v2) / 2}.`
        };
      }));

      return out;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6.5  Logic and Grids
  // ═══════════════════════════════════════════════════════════════════════

  /** Every arrangement of `arr`. */
  function perms(arr) {
    if (arr.length <= 1) return [arr.slice()];
    return arr.flatMap((x, i) => perms([...arr.slice(0, i), ...arr.slice(i + 1)]).map(p => [x, ...p]));
  }

  /** A grid as an HTML table. `cell(r, c)` gives the HTML, `cls(r, c)` a class. */
  function gridHTML(rows, cols, cell, cls, extra) {
    let s = `<table class="pgrid${extra ? ' ' + extra : ''}">`;
    for (let r = 0; r < rows; r++) {
      s += '<tr>';
      for (let c = 0; c < cols; c++) {
        const k = cls ? cls(r, c) : '';
        s += `<td${k ? ` class="${k}"` : ''}>${cell(r, c)}</td>`;
      }
      s += '</tr>';
    }
    return s + '</table>';
  }

  // The A, B, C arrow puzzle: every 4 × 4 grid with one A, B, C and blank in
  // each row and column (576 of them), and what each of the 16 arrows sees.
  let LETTER_GRIDS = null;
  function letterGrids() {
    if (LETTER_GRIDS) return LETTER_GRIDS;
    const rowsP = perms(['A', 'B', 'C', '*']);
    const out = [];
    const build = (g) => {
      if (g.length === 4) { out.push(g.slice()); return; }
      for (const r of rowsP) {
        if (g.every(prev => prev.every((x, c) => x !== r[c]))) { g.push(r); build(g); g.pop(); }
      }
    };
    build([]);
    const first = seq => seq.find(x => x !== '*');
    LETTER_GRIDS = out.map(g => {
      const col = c => g.map(r => r[c]);
      const clues = [];
      for (let c = 0; c < 4; c++) clues.push(first(col(c)));                    // top, looking down
      for (let c = 0; c < 4; c++) clues.push(first(col(c).reverse()));          // bottom, looking up
      for (let r = 0; r < 4; r++) clues.push(first(g[r]));                       // left, looking right
      for (let r = 0; r < 4; r++) clues.push(first(g[r].slice().reverse()));     // right, looking left
      return { g, clues };
    });
    return LETTER_GRIDS;
  }

  /** Keep `chosen` clues; drop any that are not needed for a unique answer. */
  function minimise(rng, chosen, unique) {
    for (const k of rng.shuffle(chosen.slice())) {
      const without = chosen.filter(x => x !== k);
      if (unique(without)) chosen = without;
    }
    return chosen;
  }

  // 4 × 4 sudoku: count solutions, stopping at two.
  function sudokuCount(g) {
    const i = g.indexOf(0);
    if (i < 0) return 1;
    const r = Math.floor(i / 4), c = i % 4;
    let n = 0;
    for (let v = 1; v <= 4 && n < 2; v++) {
      let ok = true;
      for (let k = 0; k < 4 && ok; k++) {
        if (g[r * 4 + k] === v || g[k * 4 + c] === v) ok = false;
        const br = r - r % 2 + (k >> 1), bc = c - c % 2 + (k & 1);
        if (g[br * 4 + bc] === v) ok = false;
      }
      if (ok) { g[i] = v; n += sudokuCount(g); g[i] = 0; }
    }
    return n;
  }

  const LO_SHU = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
  const MAGIC = (() => {
    const out = [];
    let g = LO_SHU;
    const rot = m => m[0].map((_, c) => m.map(r => r[c]).reverse());
    for (let i = 0; i < 4; i++) { out.push(g); out.push(g.map(r => r.slice().reverse())); g = rot(g); }
    return out;
  })();

  const SYM = ['♥︎', '♦︎', '✱'];

  Topics.u6e5 = {
    id: 'u6e5', unit: 6, untimed: true,
    title: 'Logic and Grids',
    blurb: 'Puzzles solved by reasoning from clues: grids, truth-tellers, orders and squares.',
    hint: 'Start with the clue that tells you the most. Write down what you know for certain, and what each new fact rules out.',

    learn: [
      {
        id: 'compare', title: 'Compare two lines',
        text: '<p>In a grid of symbols with totals, look for a line made of one symbol, or two lines that differ by just one symbol. Either gives you a value straight away.</p>' +
              '<p>If nothing like that exists, guess one value and work out the rest from it. A wrong guess soon breaks a total.</p>'
      },
      {
        id: 'cases', title: 'Try every case',
        text: '<p>With three people who each either always tell the truth or always lie, there are only 8 possibilities. List them all and cross out each one where someone\'s statement does not match what they are.</p>' +
              '<p>A liar\'s statement must be false. A truth-teller\'s must be true.</p>'
      },
      {
        id: 'table', title: 'Use a ✓ and ✗ table',
        text: '<p>Put people down the side and things along the top. Each clue lets you write a ✗. When a row or column has only one gap left, that gap is a ✓, and everything else in its column or row becomes ✗.</p>'
      },
      {
        id: 'line', title: 'Put things in a line',
        text: '<p>For clues like "taller than" or "older than", draw a line from tallest to shortest and place people as the clues allow. Put the person mentioned most often down first.</p>'
      },
      {
        id: 'magic', title: 'Magic square facts',
        text: '<p>In a 3 × 3 magic square using 1 to 9, all nine numbers add to 45, so each of the three rows adds to 15. That is the magic total.</p>' +
              '<p>The centre is always 5: it is the only number that sits in the middle of four lines that each add to 15.</p>'
      },
      {
        id: 'once', title: 'Once in every row, column and box',
        text: '<p>In a 4 × 4 sudoku each row, column and 2 × 2 box holds 1, 2, 3 and 4 once each. Look for a row, column or box with three numbers in already: the fourth is whatever is missing.</p>'
      }
    ],

    examples: [
      {
        title: 'Example: Ana says "Ben is a liar." Ben says "We are both truth-tellers." Who is telling the truth?',
        steps: [
          'Try Ben as a truth-teller. Then both are truth-tellers, so Ana is too. But Ana says Ben is a liar, which would be false. ✗',
          'So Ben is a liar, and Ben\'s statement is false, which fits.',
          'Ana says Ben is a liar. That is true, so Ana is a truth-teller.'
        ],
        result: 'Answer: Ana tells the truth, Ben lies'
      }
    ],

    generate(rng, diff) {
      const out = [];
      const hard = diff !== 'core';

      // Q1: symbols in a grid with row and column totals.
      out.push(until(() => {
        const vals = rng.sample(Array.from({ length: hard ? 15 : 9 }, (_, i) => i + 1), 3);
        const grid = [];
        for (let i = 0; i < 9; i++) grid.push(rng.int(0, 2));
        if ([0, 1, 2].some(s => grid.filter(x => x === s).length < 2)) return null;
        const lines = [];
        for (let r = 0; r < 3; r++) lines.push({ name: `Row ${r + 1}`, cells: [0, 1, 2].map(c => grid[r * 3 + c]) });
        for (let c = 0; c < 3; c++) lines.push({ name: `Column ${c + 1}`, cells: [0, 1, 2].map(r => grid[r * 3 + c]) });
        lines.forEach(l => { l.total = l.cells.reduce((s, x) => s + vals[x], 0); l.count = [0, 1, 2].map(s => l.cells.filter(x => x === s).length); });
        // Exactly one solution in whole numbers from 1 to 20.
        let sols = 0;
        for (let a = 1; a <= 20; a++) for (let b = 1; b <= 20; b++) for (let c = 1; c <= 20; c++) {
          const v = [a, b, c];
          if (lines.every(l => l.cells.reduce((s, x) => s + v[x], 0) === l.total)) sols++;
        }
        if (sols !== 1) return null;
        // Solve from a starting set of known values, one line at a time.
        const propagate = known => {
          const k = known.slice(), steps = [];
          for (let round = 0; round < 6; round++) {
            let moved = false;
            for (const l of lines) {
              const unk = [0, 1, 2].filter(s => l.count[s] && k[s] === null);
              if (unk.length !== 1) continue;
              const s = unk[0];
              const rest = l.total - [0, 1, 2].reduce((t, x) => t + (k[x] === null ? 0 : l.count[x] * k[x]), 0);
              if (rest % l.count[s] || rest / l.count[s] < 1) return { fail: `${l.name} would need ${SYM[s]} = ${rest}${l.count[s] > 1 ? '÷' + l.count[s] : ''}`, steps };
              k[s] = rest / l.count[s];
              steps.push(`${l.name} gives ${SYM[s]} = ${k[s]}`);
              moved = true;
            }
            if (!moved) break;
          }
          if (k.some(x => x === null)) return { stuck: true, steps };
          const bad = lines.find(l => l.cells.reduce((t, x) => t + k[x], 0) !== l.total);
          if (bad) return { fail: `${bad.name} would add to ${bad.cells.reduce((t, x) => t + k[x], 0)}, not ${bad.total}`, steps, k };
          return { k, steps };
        };
        const direct = propagate([null, null, null]);
        let explain;
        if (direct.k) {
          explain = direct.steps.join('<br>') + '.';
        } else {
          const s0 = [0, 1, 2].find(s => { const kk = [null, null, null]; kk[s] = vals[s]; return propagate(kk).k; });
          if (s0 === undefined || vals[s0] > 9) return null;
          const rows = [];
          for (let v = 1; v <= vals[s0]; v++) {
            const kk = [null, null, null]; kk[s0] = v;
            const r = propagate(kk);
            if (r.k && v !== vals[s0]) return null;
            rows.push(`Try ${SYM[s0]} = ${v}: ` + (r.k ? r.steps.join(', ') + '. Every line checks. ✓' : (r.steps.length ? r.steps.join(', ') + ', but ' : '') + (r.fail || 'stuck') + '. ✗'));
          }
          explain = `No line has just one kind of symbol, so guess ${SYM[s0]} and work out the rest:<br>` + rows.join('<br>');
        }
        const ask = rng.int(0, 2);
        const table = gridHTML(4, 4, (r, c) => r < 3 && c < 3 ? SYM[grid[r * 3 + c]] : r < 3 ? lines[r].total : c < 3 ? lines[3 + c].total : '',
                               (r, c) => r === 3 || c === 3 ? 'out' : '', 'symbols');
        return {
          prompt: `Each symbol stands for a whole number. The numbers at the ends of the rows and columns are their totals. What is ${SYM[ask]} worth?` + table,
          learn: 'compare',
          hints: [
            'Look for a row or column with only one kind of symbol in it, or one with a symbol you already know.',
            'Compare two lines that share most of their symbols. The difference in their totals comes from the symbols that differ.',
            'If you are still stuck, guess one symbol (start at 1) and use the lines to work out the others. A wrong guess will make some line add up wrongly.'
          ],
          input: { kind: 'number', answer: vals[ask], width: 70 },
          explain: explain + `<br>So ${SYM[0]} = ${vals[0]}, ${SYM[1]} = ${vals[1]}, ${SYM[2]} = ${vals[2]}.`
        };
      }));

      // Q2: the A, B, C grid seen from the arrows.
      out.push(until(() => {
        const all = letterGrids();
        const target = rng.pick(all);
        const order = rng.shuffle(Array.from({ length: 16 }, (_, i) => i));
        let pool = all, chosen = [];
        for (const k of order) {
          if (pool.length === 1) break;
          const next = pool.filter(s => s.clues[k] === target.clues[k]);
          if (next.length < pool.length) { chosen.push(k); pool = next; }
        }
        // Some grids share all sixteen clues with another, so no set of
        // clues can tell them apart.
        if (pool.length !== 1) return null;
        const unique = ks => all.filter(s => ks.every(k => s.clues[k] === target.clues[k])).length === 1;
        chosen = minimise(rng, chosen, unique);
        if (chosen.length > (hard ? 7 : 8)) return null;
        const has = k => chosen.includes(k) ? target.clues[k] : '';
        const table = gridHTML(6, 6, (r, c) => {
          if ((r === 0 || r === 5) && (c === 0 || c === 5)) return '';
          if (r === 0) return has(c - 1) ? `${has(c - 1)}<br>↓` : '';
          if (r === 5) return has(4 + c - 1) ? `↑<br>${has(4 + c - 1)}` : '';
          if (c === 0) return has(8 + r - 1) ? `${has(8 + r - 1)} →` : '';
          if (c === 5) return has(12 + r - 1) ? `← ${has(12 + r - 1)}` : '';
          return '';
        }, (r, c) => r === 0 || r === 5 || c === 0 || c === 5 ? 'out' : '', 'letters');
        const row = rng.int(0, 3);
        const ans = target.g[row].join('');
        const which = ['first', 'second', 'third', 'last'][row];
        return {
          prompt: 'Put one A, one B and one C in every row and every column of the grid, leaving one square in each row and column empty. ' +
                  'Each letter outside the grid is the <em>first</em> letter you meet looking in along its arrow (empty squares are skipped).' + table +
                  `What is the ${which} row, from left to right? Use * for the empty square (for example A*BC).`,
          learn: 'compare',
          hints: [
            'A clue does not say the letter is in the first square: the first square might be empty, and then the letter is in the second.',
            'The letters seen from the two ends of a row (or column) are its first and last letters, so the third letter must sit between them.',
            'Fill in what is certain, then use "one of each in every column" to finish. Pencil in possibilities and cross them out.'
          ],
          input: { kind: 'word', answer: [ans, ans.replace('*', '.'), ans.replace('*', '-'), ans.replace('*', '_')], placeholder: 'e.g. A*BC', width: 110 },
          explain: 'The finished grid:' + gridHTML(4, 4, (r, c) => target.g[r][c] === '*' ? '' : target.g[r][c], (r) => r === row ? 'ask' : '', 'letters') +
            `The ${which} row is ${ans}. Check each clue by looking in along its arrow.`
        };
      }));

      // Q3: who owns which pet.
      out.push(until(() => {
        const n = hard ? 4 : 3;
        const people = rng.sample(NAMES, n);
        const things = rng.sample(['cat', 'dog', 'rabbit', 'goldfish', 'parrot', 'lizard'], n);
        const sol = rng.shuffle(Array.from({ length: n }, (_, i) => i));      // person i owns thing sol[i]
        const all = perms(Array.from({ length: n }, (_, i) => i));
        const cands = [];
        for (let p = 0; p < n; p++) for (let t = 0; t < n; t++) if (sol[p] !== t) cands.push({ text: `${people[p]} does not own the ${things[t]}.`, ok: s => s[p] !== t, p, t, neg: true });
        for (let t = 0; t < n; t++) {
          const owner = sol.indexOf(t);
          const other = rng.pick([...Array(n).keys()].filter(p => p !== owner));
          const pair = rng.shuffle([owner, other]);
          cands.push({ text: `The ${things[t]} belongs to either ${people[pair[0]]} or ${people[pair[1]]}.`, ok: s => s[owner] === t || s[other] === t, p: other, t, neg: true });
        }
        const order = rng.shuffle(cands);
        let pool = all, chosen = [];
        for (const cl of order) {
          if (pool.length === 1) break;
          const next = pool.filter(cl.ok);
          if (next.length < pool.length) { chosen.push(cl); pool = next; }
        }
        if (pool.length !== 1) return null;
        chosen = minimise(rng, chosen, cs => all.filter(s => cs.every(cl => cl.ok(s))).length === 1);
        // Ask about a pet whose own clues are not enough, so the answer needs
        // the other clues too.
        const hardPets = [...Array(n).keys()].filter(t => {
          const own = chosen.filter(cl => cl.t === t);
          return new Set(all.filter(s => own.every(cl => cl.ok(s))).map(s => s.indexOf(t))).size > 1;
        });
        if (!hardPets.length) return null;
        const ask = rng.pick(hardPets);
        const owner = sol.indexOf(ask);
        const crosses = new Set(chosen.filter(cl => cl.neg && !cl.text.includes('either')).map(cl => cl.p + ',' + cl.t));
        const table = '<table class="data-table"><tr><th></th>' + things.map(t => `<th>${t}</th>`).join('') + '</tr>' +
          people.map((pp, p) => `<tr><th>${pp}</th>` + things.map((_, t) => `<td>${sol[p] === t ? '✓' : crosses.has(p + ',' + t) ? '✗' : '·'}</td>`).join('') + '</tr>').join('') + '</table>';
        return {
          prompt: `${people.slice(0, -1).join(', ')} and ${people[n - 1]} each own exactly one pet: a ${things.slice(0, -1).join(', a ')} and a ${things[n - 1]}, one each.<br>` +
                  chosen.map(cl => cl.text).join('<br>') + `<br>Who owns the ${things[ask]}?`,
          learn: 'table',
          hints: [
            'Draw a table with the people down the side and the pets along the top.',
            'Put a ✗ for everything a clue rules out. "The cat belongs to either Ana or Ben" puts a ✗ under the cat for everyone else.',
            'When a row or a column has only one gap left, that gap must be a ✓. Then cross out the rest of its row and column.'
          ],
          input: { kind: 'choice', options: people, correct: owner },
          explain: 'The finished table (✗ from the clues directly, · found by elimination):' + table +
            `The ${things[ask]} belongs to ${people[owner]}.`
        };
      }));

      // Q4: truth-tellers and liars.
      out.push(until(() => {
        const people = rng.sample(NAMES, 3);
        const kinds = ['a truth-teller', 'a liar'];
        const STATE = [
          (s, x) => ({ text: `“${people[x]} is a liar.”`, f: t => !t[x] }),
          (s, x) => ({ text: `“${people[x]} tells the truth.”`, f: t => t[x] }),
          (s, x, y) => ({ text: `“${people[x]} and ${people[y]} are the same kind.”`, f: t => t[x] === t[y] }),
          (s, x, y) => ({ text: `“${people[x]} and ${people[y]} are different kinds.”`, f: t => t[x] !== t[y] }),
          () => ({ text: '“Exactly one of us is a liar.”', f: t => t.filter(v => !v).length === 1 }),
          () => ({ text: '“At least two of us are liars.”', f: t => t.filter(v => !v).length >= 2 }),
          () => ({ text: '“We are all liars.”', f: t => t.every(v => !v) })
        ];
        const says = [0, 1, 2].map(s => {
          const others = [0, 1, 2].filter(p => p !== s);
          const [x, y] = rng.shuffle(others);
          return rng.pick(STATE)(s, x, y);
        });
        if (new Set(says.map(x => x.text)).size < 3) return null;
        const cases = [];
        for (let m = 0; m < 8; m++) cases.push([0, 1, 2].map(i => !!(m & (4 >> i))));
        const fits = cases.filter(t => says.every((st, i) => st.f(t) === t[i]));
        if (fits.length !== 1) return null;
        const sol = fits[0];
        if (sol.every(v => v) || sol.every(v => !v)) return null;
        const rows = cases.map(t => {
          const badIdx = says.findIndex((st, i) => st.f(t) !== t[i]);
          return [...t.map(v => v ? 'T' : 'L'),
            badIdx < 0 ? '✓ fits' : `✗ ${people[badIdx]}'s statement would be ${says[badIdx].f(t) ? 'true' : 'false'}`];
        });
        return {
          prompt: 'On an island, everyone is either a truth-teller, who always tells the truth, or a liar, who always lies.<br>' +
                  says.map((st, i) => `${people[i]} says ${st.text}`).join('<br>') + '<br>Sort each person.',
          learn: 'cases',
          hints: [
            'There are only 8 ways to make each of the three a truth-teller (T) or a liar (L). You could test them all.',
            'Pick one person and suppose they tell the truth. What does their statement force about the others?',
            'A case fails if anyone\'s statement is true when they are a liar, or false when they are a truth-teller.'
          ],
          input: { kind: 'sort', bins: ['Truth-teller', 'Liar'], items: people.map((p, i) => ({ html: p, bin: sol[i] ? 0 : 1 })), cue: 'Choose for each person, then check.' },
          explain: 'Test all 8 cases (T = truth-teller, L = liar):' + table([...people, 'Result'], rows) +
            `Only one case fits: ${people.map((p, i) => `${p} is ${kinds[sol[i] ? 0 : 1]}`).join(', ')}.`
        };
      }));

      // Q5: a magic square with some numbers given.
      out.push(until(() => {
        const sq = rng.pick(MAGIC);
        const cells = rng.shuffle(Array.from({ length: 9 }, (_, i) => i));
        const k = hard ? 2 : 3;
        const given = cells.slice(0, k);
        const ask = cells[k];
        if (!hard && given.includes(4) && rng.chance(0.5)) return null;
        const fits = MAGIC.filter(m => given.every(i => m[Math.floor(i / 3)][i % 3] === sq[Math.floor(i / 3)][i % 3]));
        if (fits.length !== 1) return null;
        const at = i => sq[Math.floor(i / 3)][i % 3];
        return {
          prompt: 'Put the numbers 1 to 9 in this grid, once each, so that every row, every column and both diagonals add to the same total. What number goes in the square marked ?' +
                  gridHTML(3, 3, (r, c) => given.includes(r * 3 + c) ? at(r * 3 + c) : r * 3 + c === ask ? '?' : '', (r, c) => r * 3 + c === ask ? 'ask' : ''),
          learn: 'magic',
          hints: [
            '1 + 2 + … + 9 = 45, and the three rows share that equally. What must each line add to?',
            'Which number must go in the centre?',
            'Now look for a line with two numbers in it. The third is whatever makes the total.'
          ],
          input: { kind: 'number', answer: at(ask), width: 60 },
          explain: 'Each line adds to 45 ÷ 3 = 15, and the centre is 5. Filling in lines with two numbers known gives:' +
            gridHTML(3, 3, (r, c) => sq[r][c], (r, c) => r * 3 + c === ask ? 'ask' : '') + `The missing number is ${at(ask)}.`
        };
      }));

      // Q6: a number pyramid with a missing bottom number.
      out.push(until(() => {
        const n = hard ? 4 : 3;
        const base = Array.from({ length: n }, () => rng.int(1, hard ? 12 : 15));
        const rows = [base];
        while (rows[rows.length - 1].length > 1) {
          const r = rows[rows.length - 1];
          rows.push(r.slice(1).map((v, i) => v + r[i]));
        }
        const top = rows[rows.length - 1][0];
        const miss = rng.int(0, n - 1);
        const weight = n === 3 ? [1, 2, 1][miss] : [1, 3, 3, 1][miss];
        if (weight === 1 && rng.chance(0.6)) return null;
        const zero = base.slice(); zero[miss] = 0;
        let t0 = zero.slice();
        while (t0.length > 1) t0 = t0.slice(1).map((v, i) => v + t0[i]);
        const pyr = rows.slice().reverse().map((r, ri) =>
          '<div class="pyr-row">' + r.map((v, i) => {
            const show = ri === 0 ? top : ri === rows.length - 1 ? (i === miss ? '?' : v) : '';
            return `<span class="pyr-cell${ri === rows.length - 1 && i === miss ? ' ask' : ''}">${show}</span>`;
          }).join('') + '</div>').join('');
        return {
          prompt: `In this number pyramid, each block is the sum of the two blocks directly below it. What number goes in the block marked ?` +
                  `<div class="pyramid">${pyr}</div>`,
          learn: 'compare',
          hints: [
            'Try a value for ? and fill in the pyramid. Is the top too big or too small?',
            `Every time ? goes up by 1, how much does the top go up by? Try it and see.`,
            `Put ? = 0 first. The top would be ${t0[0]}. Each 1 added to ? adds ${weight} to the top.`
          ],
          input: { kind: 'number', answer: base[miss], width: 60 },
          explain: `With ? = 0 the top would be ${t0[0]}. The ? block is counted ${weight === 1 ? 'once' : weight + ' times'} on the way to the top, so each 1 added to it adds ${weight}.<br>` +
            `The top must be ${top}, which is ${top - t0[0]} more, so ? = ${top - t0[0]} ÷ ${weight} = ${base[miss]}.`
        };
      }));

      // Q7: putting people in order of height.
      out.push(until(() => {
        const n = hard ? 5 : 4;
        const people = rng.sample(NAMES, n);
        const order = rng.shuffle(Array.from({ length: n }, (_, i) => i));   // order[0] tallest
        const rank = p => order.indexOf(p);
        const cands = [];
        for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
          const [hi, lo] = rank(a) < rank(b) ? [a, b] : [b, a];
          cands.push(rng.chance(0.5)
            ? { text: `${people[hi]} is taller than ${people[lo]}.`, ok: s => s.indexOf(hi) < s.indexOf(lo) }
            : { text: `${people[lo]} is shorter than ${people[hi]}.`, ok: s => s.indexOf(hi) < s.indexOf(lo) });
        }
        const all = perms(Array.from({ length: n }, (_, i) => i));
        let pool = all, chosen = [];
        for (const cl of rng.shuffle(cands)) {
          if (pool.length === 1) break;
          const next = pool.filter(cl.ok);
          if (next.length < pool.length) { chosen.push(cl); pool = next; }
        }
        if (pool.length !== 1) return null;
        chosen = minimise(rng, chosen, cs => all.filter(s => cs.every(cl => cl.ok(s))).length === 1);
        const pos = rng.int(0, n - 1);
        const posName = ['the tallest', 'second tallest', 'third tallest', 'fourth tallest', 'the shortest'];
        const label = pos === n - 1 ? 'the shortest' : posName[pos];
        return {
          prompt: `${people.slice(0, -1).join(', ')} and ${people[n - 1]} all have different heights.<br>` + rng.shuffle(chosen).map(c => c.text).join('<br>') +
                  `<br>Who is ${label}?`,
          learn: 'line',
          hints: [
            'Draw a vertical line with tall at the top and short at the bottom.',
            'Start with the person who appears in the most clues, and place everyone else relative to them.',
            'Keep going until every clue is satisfied and there is only one way to arrange them.'
          ],
          input: { kind: 'choice', options: people, correct: order[pos] },
          explain: `From tallest to shortest: ${order.map(p => people[p]).join(', ')}.<br>So ${people[order[pos]]} is ${label}.`
        };
      }));

      // Q8: a 4 × 4 sudoku.
      out.push(until(() => {
        let g = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]];
        const digits = rng.shuffle([1, 2, 3, 4]);
        g = g.map(r => r.map(v => digits[v - 1]));
        const swapRows = (a, b) => { [g[a], g[b]] = [g[b], g[a]]; };
        if (rng.chance(0.5)) swapRows(0, 1);
        if (rng.chance(0.5)) swapRows(2, 3);
        if (rng.chance(0.5)) { swapRows(0, 2); swapRows(1, 3); }
        if (rng.chance(0.5)) g = g[0].map((_, c) => g.map(r => r[c]));
        if (rng.chance(0.5)) g = g.map(r => [r[1], r[0], r[3], r[2]]);
        const full = g.flat();
        const puzzle = full.slice();
        const keep = hard ? 5 : 8;
        for (const i of rng.shuffle(Array.from({ length: 16 }, (_, k) => k))) {
          if (puzzle.filter(Boolean).length <= keep) break;
          const v = puzzle[i];
          puzzle[i] = 0;
          if (sudokuCount(puzzle.slice()) !== 1) puzzle[i] = v;
        }
        const blanks = puzzle.map((v, i) => v ? -1 : i).filter(i => i >= 0);
        const ask = rng.pick(blanks);
        return {
          prompt: 'Fill the grid so that every row, every column and every 2 × 2 box contains 1, 2, 3 and 4 once each. What number goes in the square marked ?' +
                  gridHTML(4, 4, (r, c) => puzzle[r * 4 + c] || (r * 4 + c === ask ? '?' : ''), (r, c) => r * 4 + c === ask ? 'ask' : '', 'sudoku'),
          learn: 'once',
          hints: [
            'Look for a row, column or box that already has three numbers in it.',
            'For the marked square, list which numbers are already in its row, its column and its box.',
            'If that does not settle it, fill in other squares first. Each one you fill gives you more to work with.'
          ],
          input: { kind: 'number', answer: full[ask], width: 60 },
          explain: 'The finished grid:' + gridHTML(4, 4, (r, c) => full[r * 4 + c], (r, c) => r * 4 + c === ask ? 'ask' : '', 'sudoku') +
            `The marked square is ${full[ask]}.`
        };
      }));

      return out;
    }
  };

})();
