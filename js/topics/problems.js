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

})();
