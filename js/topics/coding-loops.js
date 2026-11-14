'use strict';
// ── Revision · Coding, Loops, Lists and Functions (Years 9–10) ───────────────
// The second coding unit: iteration (while and for), lists, and functions,
// the part of the progress outcomes (PO4 to PO5) that turns short scripts
// into programs, with turtle drawing for the loops. Built like Python Basics:
// a walk-through first (see it run, predict it, change one thing), then a
// Challenge set, every program checked in Skulpt and real Python by
// tools/check-coding.js.
//
// A drawing is marked by the lines the turtle draws (js/python.js records
// them under Check), so any loop that draws the right picture passes.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice;
  const P = Py.block, I = Py.inline, O = Py.output;
  const EXT = 'Extension';

  const py = (q, cases) => { q.py = [].concat(cases); return q; };
  const pf = x => (Number.isInteger(x) ? x + '.0' : String(x));
  const out = (rng, o) => Sci.word(rng, { ...o, exact: true, placeholder: o.placeholder || 'type the output', width: o.width || 240 });
  const lines = arr => arr.join('\n');
  const listRepr = arr => '[' + arr.map(v => (typeof v === 'string' ? `'${v}'` : String(v))).join(', ') + ']';

  function whichError(code, ans, why, o) {
    const opts = (o && o.options) || ['SyntaxError', 'NameError', 'TypeError', 'No error'];
    return {
      prompt: (o && o.prompt) || 'What happens when this program runs?' + P(code),
      tag: o && o.tag, hints: o && o.hints,
      input: { kind: 'choice', options: opts.map(x => ({ html: x === 'No error' ? 'It runs without an error' : x, right: x === ans })), correct: opts.indexOf(ans), wide: false },
      explain: why
    };
  }

  const NAMES = ['Aroha', 'Sam', 'Mere', 'Leo', 'Tama', 'Mia', 'Hemi', 'Ana', 'Jack', 'Priya', 'Tui', 'Noah'];
  const SHAPES = { 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 8: 'octagon' };
  const polygon = (n, side, turn) => `import turtle\nt = turtle.Turtle()\nfor i in range(${n}):\n    t.forward(${side})\n    t.${turn || 'left'}(${360 / n})`;


  // ═══ C5 While Loops ═════════════════════════════════════════════════════════

  Sci.topic({
    id: 'cl5', unit: 'loops', untimed: true,
    title: 'While Loops',
    blurb: 'Repeating while something is true: counting, keeping a total, and asking until the answer is right.',
    hint: 'A while loop repeats its indented lines for as long as its test is True. Something inside the loop must change, or the test never ' +
          'becomes False and the loop never ends. A counter needs three things: a start, a test, and a change.',

    learn: [
      { id: 'while', title: 'while repeats',
        text: P('n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1\nprint("Done")') +
              '<p>The indented lines run again and again while <code>n &lt;= 3</code> is True: it prints 1, 2, 3, then Done.</p>' },
      { id: 'counter', title: 'A counter',
        text: '<p>Three parts, every time:</p><ol class="learn-steps"><li><strong>Start:</strong> <code>n = 1</code></li><li><strong>Test:</strong> <code>while n &lt;= 3:</code></li>' +
              '<li><strong>Change:</strong> <code>n = n + 1</code>, inside the loop</li></ol>' },
      { id: 'forever', title: 'A loop that never ends',
        text: '<p>If nothing inside the loop changes the test, it is True for ever. The page stops such a program after a few seconds.</p>' +
              P('n = 1\nwhile n <= 3:\n    print(n)\n# n never changes!') },
      { id: 'total', title: 'Keeping a total',
        text: P('total = 0\nn = 1\nwhile n <= 4:\n    total = total + n\n    n = n + 1\nprint(total)') +
              '<p>Start the total at 0, add to it inside the loop, print it after. This prints 10.</p>' },
      { id: 'asking', title: 'Asking until',
        text: P('answer = ""\nwhile answer != "yes":\n    answer = input("Ready? ")\nprint("Let\'s go!")') +
              '<p>The loop keeps asking until the user types <code>yes</code>.</p>' },
      { id: 'break', title: 'break', wide: true,
        text: '<p><code>break</code> leaves a loop straight away. With <code>while True:</code> it makes a loop whose test is checked in the middle:</p>' +
              P('total = 0\nwhile True:\n    n = int(input("Number (0 to stop)? "))\n    if n == 0:\n        break\n    total = total + n\nprint(total)') }
    ],

    examples: [
      {
        title: 'Example 1: counting down',
        steps: [P('n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Lift off!")'),
                'n is 3: 3 > 0 is True, so it prints 3 and n becomes 2. Then 2, then 1.',
                'When n is 0, 0 > 0 is False: the loop stops, and Lift off! prints.']
      },
      {
        title: 'Example 2: tracing a loop',
        steps: [P('x = 1\nwhile x < 20:\n    x = x * 3\nprint(x)'),
                'Pass 1: x becomes 3. Pass 2: 9. Pass 3: 27.',
                'Now 27 < 20 is False, so the loop stops and 27 is printed.']
      }
    ],

    slots: [
      // ── The walk-through.
      { name: 'Your first loop', learn: 'while',
        items: [Sci.gen(rng => {
          const k = rng.int(4, 7);
          const code = `n = 1\nwhile n <= ${k}:\n    print(n)\n    n = n + 1`;
          return py(out(rng, { prompt: 'This loop repeats while its test is True. Run it. What is the <strong>last</strong> number it prints?' + Py.tryIt(code), answer: String(k), width: 100,
            hints: ['Press ▶ Run and look at the bottom of the dark box.', `n goes up by 1 each time. When n is ${k + 1}, n <= ${k} is False and the loop stops.`],
            explain: `It prints 1 up to ${k}. After ${k}, n becomes ${k + 1}, the test is False, and the loop stops.` }),
            { code, output: lines(Array.from({ length: k }, (_, i) => i + 1)) });
        })] },

      { name: 'Predict: how many?', learn: 'counter',
        items: [Sci.gen(rng => {
          const a = rng.int(1, 5), b = rng.int(a + 3, a + 8);
          const code = `n = ${a}\nwhile n < ${b}:\n    print(n)\n    n = n + 1`;
          return py(out(rng, { prompt: 'How many numbers does this print?' + P(code), answer: String(b - a), width: 100,
            hints: [`It starts at ${a}. What is the last number for which n < ${b} is True?`, `It prints ${a} up to ${b - 1}: count them.`],
            explain: `It prints ${a} to ${b - 1}: that is ${b - a} numbers. < ${b} stops before ${b}.` }),
            { code, output: lines(Array.from({ length: b - a }, (_, i) => a + i)) });
        })] },

      { name: 'Counting down', learn: 'counter',
        items: [Sci.gen(rng => {
          const k = rng.int(3, 6), step = rng.pick([1, 2]);
          const code = `n = ${k * step}\nwhile n > 0:\n    print(n)\n    n = n - ${step}\nprint("Lift off!")`;
          const seq = Array.from({ length: k }, (_, i) => k * step - i * step);
          return py(out(rng, { prompt: 'Run it. What number is printed just before <code>Lift off!</code>?' + Py.tryIt(code), answer: String(step), width: 100,
            hints: ['Run it and look just above Lift off!.', `n goes down by ${step} each time, and the loop stops once n > 0 is False.`],
            explain: `The numbers are ${seq.join(', ')}. Then n is 0, 0 > 0 is False, and the loop stops.` }),
            { code, output: lines([...seq, 'Lift off!']) });
        })] },

      { name: 'Steps of more than 1', learn: 'counter',
        items: [Sci.gen(rng => {
          const s = rng.pick([2, 3, 5]), stop = s * rng.int(3, 5) + 1;
          const code = `n = 0\nwhile n < ${stop}:\n    print(n, end=" ")\n    n = n + ${s}`;
          const seq = []; for (let n = 0; n < stop; n += s) seq.push(n);
          return py(out(rng, { prompt: 'This prints all on one line. What does it print?' + P(code), answer: seq.join(' '), width: 200,
            hints: [`It starts at 0 and adds ${s} each time.`, `Keep going while n < ${stop}.`],
            explain: `0, then add ${s} each time while n is under ${stop}: ${seq.join(', ')}.` }), { code, output: seq.join(' ') + ' ' });
        })] },

      { name: 'A loop that never ends', learn: 'forever',
        items: [rng => {
          const code = 'n = 0\nwhile n < 5:\n    m = n * 2\nprint("Done")';
          return py(C(rng, { prompt: 'Run this program. It never prints Done, and the page has to stop it. Why?' + Py.tryIt(code),
            right: 'n never changes, so n < 5 is always True', wrong: ['m is never printed', '5 is too big a number for a loop', 'print("Done") is not indented'],
            hints: ['Press ▶ Run and wait a few seconds.', 'What would have to happen for n < 5 to become False?'],
            explain: 'Nothing inside the loop changes n, so the test is True for ever. Adding n = n + 1 inside the loop fixes it.' }),
            { code, error: 'Stopped' });
        }] },

      { name: 'Fix the endless loop', learn: 'forever',
        items: [rng => ({
          prompt: 'This program should print 1 to 5, but it never stops. Fix it, then ✓ Check.',
          input: { kind: 'code', key: 'cl5-fix', starter: 'n = 1\nwhile n <= 5:\n    print(n)', model: 'n = 1\nwhile n <= 5:\n    print(n)\n    n = n + 1',
                   tests: [{ expect: '1\n2\n3\n4\n5' }] },
          hints: ['Press ▶ Run: it prints 1 over and over. Why does n never reach 6?', 'Add n = n + 1 inside the loop, indented under the print.'],
          explain: 'The counter has to change inside the loop:' + P('n = 1\nwhile n <= 5:\n    print(n)\n    n = n + 1')
        })] },

      { name: 'Keep asking', learn: 'asking',
        items: [rng => {
          const code = 'answer = ""\nwhile answer != "yes":\n    answer = input("Are we there yet? ")\nprint("Finally!")';
          return py(out(rng, { prompt: 'Run it, and answer a few times. What do you have to type to finish the loop?' + Py.tryIt(code), answer: 'yes', width: 120,
            hints: ['Press ▶ Run and type an answer when it asks. Try a few.', 'Read the while line: it keeps going while answer != "yes".'],
            explain: '!= means "is not equal to". The loop repeats while the answer is not yes, so typing yes ends it.' }),
            { code, inputs: ['no', 'nearly', 'yes'], output: 'Finally!' });
        }] },

      { name: 'Keeping a total', learn: 'total',
        items: [Sci.gen(rng => {
          const k = rng.int(3, 6);
          const code = `total = 0\nn = 1\nwhile n <= ${k}:\n    total = total + n\n    n = n + 1\nprint(total)`;
          const sum = k * (k + 1) / 2;
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: String(sum), width: 100,
            hints: ['Each pass adds n to total, then n goes up by 1.', `total ends up as 1 + 2 + … + ${k}.`],
            explain: `It adds 1 + 2 + … + ${k} = ${sum}, then prints the total once the loop is over.` }), { code, output: String(sum) });
        })] },

      { name: 'Change the loop', learn: 'counter',
        items: [rng => ({
          prompt: 'This program prints 1 to 5. Change it so it prints 1 to <strong>10</strong>. Run it to try, then ✓ Check.',
          input: { kind: 'code', key: 'cl5-ten', starter: 'n = 1\nwhile n <= 5:\n    print(n)\n    n = n + 1', model: 'n = 1\nwhile n <= 10:\n    print(n)\n    n = n + 1',
                   tests: [{ expect: lines(Array.from({ length: 10 }, (_, i) => i + 1)) }] },
          hints: ['Which part of the loop decides where it stops?', 'Change the 5 in the while line to 10.'],
          explain: 'Only the test changes:' + P('n = 1\nwhile n <= 10:\n    print(n)\n    n = n + 1')
        })] },

      { name: 'Make it: countdown', learn: 'counter',
        items: [rng => ({
          prompt: 'Write a program that asks for a starting number, counts down to 1 (one number per line), then prints <code>Blast off!</code>. For 3:' + O('3\n2\n1\nBlast off!'),
          input: { kind: 'code', key: 'cl5-countdown', starter: '# Ask for a number, count down, then Blast off!\n',
                   model: 'n = int(input("Start? "))\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Blast off!")',
                   tests: [{ inputs: ['3'], expect: '3\n2\n1\nBlast off!' }, { inputs: ['5'], expect: '5\n4\n3\n2\n1\nBlast off!' }, { inputs: ['1'], expect: '1\nBlast off!' }] },
          hints: ['Start with n = int(input(…)). The loop keeps going while n > 0.', 'Inside the loop: print n, then n = n - 1. Blast off! goes after the loop, not indented.'],
          explain: 'One way to do it:' + P('n = int(input("Start? "))\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Blast off!")')
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Trace the loop', learn: 'counter',
        items: [Sci.gen(rng => {
          const m = rng.pick([2, 3]), stop = m === 2 ? rng.int(17, 31) : rng.int(28, 80);
          const vals = []; let x = 1; while (x < stop) { x *= m; vals.push(x); }
          const code = `x = 1\nwhile x < ${stop}:\n    x = x * ${m}\nprint(x)`;
          return py(out(rng, { prompt: 'How many times does the loop run, and what is printed? Type both, separated by a space (for example <code>3 27</code>).' + P(code),
            answer: `${vals.length} ${x}`, width: 120,
            explain: `x goes ${vals.join(', ')}: that is ${vals.length} passes. Then ${x} < ${stop} is False, and ${x} is printed.` }),
            { code, output: String(x) });
        })] },

      { challenge: 'only', name: 'Off by one', learn: 'counter',
        items: [Sci.gen(rng => {
          const k = rng.int(5, 9);
          const right = `n = 1\nwhile n <= ${k}:\n    print(n)\n    n = n + 1`;
          const wrong = [`n = 1\nwhile n < ${k}:\n    print(n)\n    n = n + 1`, `n = 0\nwhile n <= ${k}:\n    print(n)\n    n = n + 1`, `n = 1\nwhile n <= ${k}:\n    n = n + 1\n    print(n)`];
          return py(C(rng, { prompt: `Which program prints exactly 1 to ${k}?`, right: P(right), wrong: wrong.map(P),
            explain: `< ${k} stops at ${k - 1}; starting at 0 prints 0 too; adding before printing skips 1 and prints ${k + 1}. Only the first is right.` }),
            { code: right, output: lines(Array.from({ length: k }, (_, i) => i + 1)) });
        })] },

      { challenge: 'only', name: 'Total until zero', learn: 'break',
        items: [Sci.gen(rng => {
          const nums = Array.from({ length: rng.int(3, 4) }, () => rng.int(2, 15));
          const code = 'total = 0\nwhile True:\n    n = int(input("Number? "))\n    if n == 0:\n        break\n    total = total + n\nprint(total)';
          const sum = nums.reduce((s, v) => s + v, 0);
          return py(out(rng, { prompt: `The user types ${nums.map(v => '<strong>' + v + '</strong>').join(', ')}, then <strong>0</strong>. What does this print?` + P(code), answer: String(sum), width: 100,
            explain: `Each number is added until 0 is typed; break leaves the loop: ${nums.join(' + ')} = ${sum}.` }),
            { code, inputs: [...nums.map(String), '0'], output: String(sum) });
        })] },

      { challenge: 'only', name: 'Read the error', learn: 'forever',
        items: [
          ['n = 1\nwhile n < 3\n    n = n + 1', 'SyntaxError', 'The while line is missing its colon.'],
          ['while n < 3:\n    n = n + 1', 'NameError', 'n has no value before the loop tests it.'],
          ['n = "1"\nwhile n < 3:\n    n = n + 1', 'TypeError', 'n is text, and text cannot be compared with the number 3.'],
          ['n = 1\nwhile n < 3:\n    n = n + 1\nprint(n)', 'No error', 'It runs: n becomes 2, then 3, and 3 is printed.', '3']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why), ans === 'No error' ? { code, output } : { code, error: ans })) },

      { challenge: 'only', name: 'Put it in order', learn: 'total',
        items: [Sci.gen(rng => {
          const k = rng.int(3, 6);
          const seq = ['total = 0', 'n = 1', `while n <= ${k}:`, '    total = total + n * n', '    n = n + 1', 'print(total)'];
          let t = 0; for (let n = 1; n <= k; n++) t += n * n;
          return py(Sci.order(rng, `Put these lines in order so the program adds up the squares 1 × 1 + 2 × 2 + … + ${k} × ${k} and prints ${t}. (Set the total before the counter.)`,
            seq.map(l => I(l)), 'Set the total and the counter before the loop, add and count inside it, print after it.'),
            { code: lines(seq), output: String(t) });
        })] },

      { challenge: 'only', name: 'Make it: guess the number', learn: 'asking',
        items: [rng => ({
          prompt: 'The program has <code>secret = 7</code>. Finish it so it keeps asking for a guess, printing <code>Too low</code> or <code>Too high</code>, until the guess is right; then it prints <code>Correct!</code>. The checker uses other secrets too.',
          input: { kind: 'code', key: 'cl5-guess', starter: 'secret = 7\n# Keep asking until the guess is right\n',
                   model: 'secret = 7\nguess = int(input("Guess? "))\nwhile guess != secret:\n    if guess < secret:\n        print("Too low")\n    else:\n        print("Too high")\n    guess = int(input("Guess? "))\nprint("Correct!")',
                   tests: [{ inputs: ['3', '9', '7'], expect: 'Too low\nToo high\nCorrect!' }, { set: { secret: '4' }, inputs: ['4'], expect: 'Correct!' },
                           { set: { secret: '50' }, inputs: ['10', '60', '55', '50'], expect: 'Too low\nToo high\nToo high\nCorrect!' }] },
          hints: ['Ask once before the loop, and loop while guess != secret.', 'Inside the loop: print Too low or Too high, then ask again. Correct! goes after the loop.'],
          explain: 'One way to do it:' + P('secret = 7\nguess = int(input("Guess? "))\nwhile guess != secret:\n    if guess < secret:\n        print("Too low")\n    else:\n        print("Too high")\n    guess = int(input("Guess? "))\nprint("Correct!")')
        })] },

      { challenge: 'only', name: 'Make it: doubling', learn: 'counter',
        items: [rng => ({
          prompt: 'You save $1 on day 0, and your savings double every day. Write a program that asks for a target and prints the first day your savings reach it. For 10 it prints 4 (2, 4, 8, then 16 on day 4).',
          input: { kind: 'code', key: 'cl5-double', starter: '# Ask for a target, then print the first day it is reached\n',
                   model: 'target = int(input("Target? "))\nmoney = 1\nday = 0\nwhile money < target:\n    money = money * 2\n    day = day + 1\nprint(day)',
                   tests: [['10', '4'], ['1', '0'], ['64', '6'], ['100', '7']].map(([t, d]) => ({ inputs: [t], expect: d })) },
          hints: ['Two variables change in the loop: the money and the day.', 'Loop while money < target. A target of 1 is reached on day 0, so the loop never runs.'],
          explain: 'One way to do it:' + P('target = int(input("Target? "))\nmoney = 1\nday = 0\nwhile money < target:\n    money = money * 2\n    day = day + 1\nprint(day)')
        })] }
    ]
  });


  // ═══ C6 For Loops and range ═════════════════════════════════════════════════

  Sci.topic({
    id: 'cl6', unit: 'loops', untimed: true,
    title: 'For Loops and range',
    blurb: 'Repeating a set number of times with for and range, times tables, totals, and drawing with the turtle.',
    hint: 'for i in range(n) repeats n times, with i counting 0, 1, … n − 1. range(a, b) counts from a up to b, not including b; a third ' +
          'number is the step. A turtle draws a regular shape with n sides by moving forward and turning 360 ÷ n degrees, n times.',

    learn: [
      { id: 'for', title: 'for repeats',
        text: P('for i in range(3):\n    print("Kia ora")') + '<p>prints Kia ora 3 times. No counter to start or change: the for loop does it.</p>' },
      { id: 'range', title: 'range',
        text: Sci.table(['Code', 'Gives i'], [[I('range(4)'), '0, 1, 2, 3'], [I('range(2, 6)'), '2, 3, 4, 5'], [I('range(0, 10, 3)'), '0, 3, 6, 9'], [I('range(5, 0, -1)'), '5, 4, 3, 2, 1']]) +
              '<p>range always stops <strong>before</strong> the stop number.</p>' },
      { id: 'use', title: 'Using i',
        text: P('n = 3\nfor i in range(1, 4):\n    print(n, "x", i, "=", n * i)') + '<p>i changes every pass, so each line is different: a times table.</p>' },
      { id: 'turtle', title: 'Drawing with a turtle',
        text: P('import turtle\nt = turtle.Turtle()\nt.forward(100)\nt.left(90)') +
              '<p><code>forward</code> moves and draws; <code>left</code> and <code>right</code> turn, in degrees.</p>' },
      { id: 'shapes', title: 'Regular shapes',
        text: '<p>To draw a shape with <em>n</em> equal sides, repeat <em>n</em> times: go forward, turn <strong>360 ÷ n</strong> degrees (the exterior angle).</p>' +
              Sci.table(['Shape', 'Repeat', 'Turn'], [['triangle', '3', '120°'], ['square', '4', '90°'], ['pentagon', '5', '72°'], ['hexagon', '6', '60°']]) },
      { id: 'nested', title: 'A loop inside a loop', wide: true,
        text: P('for row in range(2):\n    for col in range(3):\n        print(row, col)') +
              '<p>The inner loop runs completely for every pass of the outer one: 2 × 3 = 6 lines.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: what i holds',
        steps: [P('for i in range(1, 4):\n    print(i * 10)'),
                'range(1, 4) gives 1, 2 and 3: it stops before 4.',
                'So the loop prints 10, 20, 30.']
      },
      {
        title: 'Example 2: a square',
        steps: [P('import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)'),
                'Four times: draw a side of 100, turn 90°.',
                '4 × 90° = 360°: the turtle ends where it started, facing the same way.']
      }
    ],

    slots: [
      // ── The walk-through.
      { name: 'Your first for loop', learn: 'for',
        items: [Sci.gen(rng => {
          const k = rng.int(3, 6);
          const code = `for i in range(${k}):\n    print("Kia ora")`;
          return py(out(rng, { prompt: 'Run it. How many times does it print Kia ora?' + Py.tryIt(code), answer: String(k), width: 100,
            hints: ['Press ▶ Run and count the lines.', `range(${k}) makes the loop run ${k} times.`],
            explain: `for i in range(${k}) repeats the indented line ${k} times.` }), { code, output: lines(Array(k).fill('Kia ora')) });
        })] },

      { name: 'What i holds', learn: 'range',
        items: [Sci.gen(rng => {
          const k = rng.int(4, 7);
          const code = `for i in range(${k}):\n    print(i)`;
          return py(out(rng, { prompt: 'Run it. What is the <strong>last</strong> number it prints?' + Py.tryIt(code), answer: String(k - 1), width: 100,
            hints: ['Run it and look at the first and last numbers.', `range(${k}) starts at 0 and stops before ${k}.`],
            explain: `range(${k}) gives 0 up to ${k - 1}: ${k} numbers, starting from 0.` }), { code, output: lines(Array.from({ length: k }, (_, i) => i)) });
        })] },

      { name: 'Predict: range(start, stop)', learn: 'range',
        items: [Sci.gen(rng => {
          const a = rng.int(1, 6), b = rng.int(a + 3, a + 6);
          const code = `for i in range(${a}, ${b}):\n    print(i, end=" ")`;
          const seq = Array.from({ length: b - a }, (_, i) => a + i);
          return py(out(rng, { prompt: 'What does this print, all on one line?' + P(code), answer: seq.join(' '), width: 200,
            hints: [`range(${a}, ${b}) starts at ${a}.`, `It stops before ${b}.`],
            explain: `range(${a}, ${b}) counts ${a} up to ${b - 1}.` }), { code, output: seq.join(' ') + ' ' });
        })] },

      { name: 'Predict: steps', learn: 'range',
        items: [Sci.gen(rng => {
          const s = rng.pick([2, 3, 5]), a = rng.int(0, 3), b = a + s * rng.int(3, 5) + 1;
          const code = `for i in range(${a}, ${b}, ${s}):\n    print(i, end=" ")`;
          const seq = []; for (let i = a; i < b; i += s) seq.push(i);
          return py(out(rng, { prompt: 'The third number in range is the step. What does this print?' + P(code), answer: seq.join(' '), width: 200,
            hints: [`Start at ${a} and add ${s} each time.`, `Stop before reaching ${b}.`],
            explain: `From ${a}, adding ${s}, while under ${b}: ${seq.join(', ')}.` }), { code, output: seq.join(' ') + ' ' });
        })] },

      { name: 'A times table', learn: 'use',
        items: [Sci.gen(rng => {
          const m = rng.int(3, 9);
          const code = `n = ${m}\nfor i in range(1, 6):\n    print(n, "x", i, "=", n * i)`;
          const ans = `${m} x 5 = ${m * 5}`;
          return py(out(rng, { prompt: 'Run it. What is the <strong>last</strong> line it prints?' + Py.tryIt(code), answer: ans, width: 160,
            hints: ['Run it and copy the last line exactly.', 'range(1, 6) stops at 5, so the last line is for i = 5.'],
            explain: `i goes 1 to 5, so the last line is ${m} x 5 = ${m * 5}.` }),
            { code, output: lines(Array.from({ length: 5 }, (_, i) => `${m} x ${i + 1} = ${m * (i + 1)}`)) });
        })] },

      { name: 'Your first drawing', learn: 'turtle',
        items: [rng => {
          const code = polygon(4, 100);
          return C(rng, { prompt: 'This program uses a turtle that draws as it moves. Run it. What does it draw?' + Py.tryIt(code),
            right: 'A square', wrong: ['A triangle', 'A straight line', 'A circle'],
            hints: ['Press ▶ Run and watch the drawing.', 'Four sides, each followed by a 90° turn.'],
            explain: 'Four times: forward 100, turn 90°. Four equal sides with right-angle corners make a square.' });
        }] },

      { name: 'Predict the shape', learn: 'shapes',
        items: [Sci.gen(rng => {
          const n = rng.pick([3, 5, 6, 8]);
          return C(rng, { prompt: 'What shape will this draw?' + P(polygon(n, 80)), right: 'A ' + SHAPES[n],
            wrong: Object.keys(SHAPES).map(Number).filter(k => k !== n).slice(0, 3).map(k => 'A ' + SHAPES[k]),
            hints: ['How many times does the loop run? That is the number of sides.', `${n} turns of ${360 / n}° add up to 360°.`],
            explain: `${n} sides, turning ${360 / n}° each time (${n} × ${360 / n}° = 360°): a ${SHAPES[n]}.` });
        })] },

      { name: 'Change the shape', learn: 'shapes',
        items: [rng => ({
          prompt: 'This program draws a square. Change it so it draws a <strong>triangle</strong> with sides of 100. Run it to see, then ✓ Check.',
          input: { kind: 'code', key: 'cl6-triangle', starter: polygon(4, 100), model: polygon(3, 100), alts: [polygon(3, 100, 'right')], tests: [{ turtle: true }] },
          hints: ['A triangle has 3 sides: change how many times the loop runs.', 'The turns must add up to 360°: 360 ÷ 3 = 120.'],
          explain: 'Three sides, turning 120° each time:' + P(polygon(3, 100))
        })] },

      { name: 'Change the range', learn: 'range',
        items: [rng => ({
          prompt: 'This program prints 1 to 5. Change the range so it prints 1 to <strong>10</strong>. Run it to try, then ✓ Check.',
          input: { kind: 'code', key: 'cl6-range', starter: 'for i in range(1, 6):\n    print(i)', model: 'for i in range(1, 11):\n    print(i)',
                   tests: [{ expect: lines(Array.from({ length: 10 }, (_, i) => i + 1)) }] },
          hints: ['range stops before its second number.', 'To finish at 10, the stop number must be 11.'],
          explain: 'range(1, 11) gives 1 to 10:' + P('for i in range(1, 11):\n    print(i)')
        })] },

      { name: 'Make it: add them up', learn: 'use',
        items: [rng => ({
          prompt: 'Write a program that asks for a whole number <em>n</em>, then uses a for loop to add up 1 + 2 + … + <em>n</em> and prints the total. For 4 it prints 10.',
          input: { kind: 'code', key: 'cl6-total', starter: '# Ask for n, add up 1 to n with a for loop, print the total\n',
                   model: 'n = int(input("n? "))\ntotal = 0\nfor i in range(1, n + 1):\n    total = total + i\nprint(total)',
                   tests: [['4', '10'], ['10', '55'], ['1', '1']].map(([n, t]) => ({ inputs: [n], expect: t })) },
          hints: ['Start a total at 0 before the loop, and add i to it inside the loop.', 'To include n itself, the range must stop at n + 1.'],
          explain: 'One way to do it:' + P('n = int(input("n? "))\ntotal = 0\nfor i in range(1, n + 1):\n    total = total + i\nprint(total)')
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Counting backwards', learn: 'range',
        items: [Sci.gen(rng => {
          const s = rng.pick([2, 3, 4]), a = s * rng.int(4, 6);
          const code = `for i in range(${a}, 0, -${s}):\n    print(i, end=" ")`;
          const seq = []; for (let i = a; i > 0; i -= s) seq.push(i);
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: seq.join(' '), width: 200,
            explain: `A negative step counts down: from ${a}, taking ${s} each time, while still above 0.` }), { code, output: seq.join(' ') + ' ' });
        })] },

      { challenge: 'only', name: 'How many passes?', learn: 'range',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 10), s = rng.pick([2, 3, 4]), b = a + rng.int(10, 25);
          let n = 0; for (let i = a; i < b; i += s) n++;
          const code = `count = 0\nfor i in range(${a}, ${b}, ${s}):\n    count = count + 1\nprint(count)`;
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: String(n), width: 100,
            explain: `count goes up once per pass. range(${a}, ${b}, ${s}) gives ${n} values.` }), { code, output: String(n) });
        })] },

      { challenge: 'only', name: 'Exterior angles', learn: 'shapes',
        items: [Sci.gen(rng => {
          const n = rng.pick([5, 6, 8, 9, 10, 12]);
          return C(rng, { prompt: `To draw a regular shape with ${n} sides, the loop runs ${n} times. How many degrees should the turtle turn each time?`,
            right: String(360 / n), wrong: [String(180 - 360 / n), String(180 * (n - 2)), '90'], wide: false,
            explain: `The turns add up to one full turn, 360°, so each is 360 ÷ ${n} = ${360 / n}°: the exterior angle. ${180 - 360 / n}° is the interior angle.` });
        })] },

      { challenge: 'only', name: 'Read the error', learn: 'range',
        items: [
          ['for i in range(5)\n    print(i)', 'SyntaxError', 'The for line is missing its colon.'],
          ['for i in range("5"):\n    print(i)', 'TypeError', 'range needs a whole number, not the text "5".'],
          ['for i in range(5):\n    print(I)', 'NameError', 'I with a capital is a different name from i.'],
          ['for i in range(3):\n    print(i * 2)', 'No error', 'It prints 0, 2 and 4.', '0\n2\n4']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why), ans === 'No error' ? { code, output } : { code, error: ans })) },

      { challenge: 'only', name: 'Put it in order', learn: 'use',
        items: [Sci.gen(rng => {
          const m = rng.int(3, 9);
          const seq = ['n = int(input("Which table? "))', 'for i in range(1, 4):', '    print(n, "x", i, "=", n * i)', 'print("Done")'];
          return py(Sci.order(rng, `Put these lines in order. When the user types <strong>${m}</strong> it should print:` + O(`${m} x 1 = ${m}\n${m} x 2 = ${2 * m}\n${m} x 3 = ${3 * m}\nDone`),
            seq.map(l => I(l)), 'Ask first, then the loop with its indented line, then Done after the loop.'),
            { code: lines(seq), inputs: [String(m)], output: `${m} x 1 = ${m}\n${m} x 2 = ${2 * m}\n${m} x 3 = ${3 * m}\nDone` });
        })] },

      { challenge: 'only', name: 'Make it: any polygon', learn: 'shapes',
        items: [rng => {
          const model = 'import turtle\nt = turtle.Turtle()\nn = int(input("Sides? "))\nfor i in range(n):\n    t.forward(80)\n    t.left(360 / n)';
          return {
            prompt: 'Write a program that asks how many sides, then draws a regular shape with that many sides, each 80 long. The checker tries 5 and 6 sides.',
            input: { kind: 'code', key: 'cl6-polygon', starter: 'import turtle\nt = turtle.Turtle()\n# Ask for the number of sides, then draw the shape\n',
                     model, alts: [model.replace('t.left', 't.right')], tests: [{ turtle: true, inputs: ['5'] }, { turtle: true, inputs: ['6'] }] },
            hints: ['Ask with int(input(…)), and loop that many times.', 'Turn 360 / n each time.'],
            explain: 'One way to do it:' + P(model)
          };
        }] },

      { challenge: 'only', name: 'Make it: FizzBuzz', learn: 'use',
        items: [rng => {
          const fb = n => Array.from({ length: n }, (_, k) => { const i = k + 1; return i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i); }).join('\n');
          return {
            prompt: 'Write a program that asks for <em>n</em> and prints 1 to <em>n</em>, one per line, but prints <code>Fizz</code> instead of multiples of 3, <code>Buzz</code> instead of multiples of 5, and <code>FizzBuzz</code> for multiples of both.',
            input: { kind: 'code', key: 'cl6-fizzbuzz', starter: '# FizzBuzz\n',
                     model: 'n = int(input("n? "))\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
                     tests: [{ inputs: ['15'], expect: fb(15) }, { inputs: ['5'], expect: fb(5) }] },
            hints: ['A loop from 1 to n, with if, elif and else inside it.', 'Test for multiples of both (i % 15 == 0) first, or it is caught by the Fizz test.'],
            explain: 'One way to do it:' + P('n = int(input("n? "))\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)')
          };
        }] },

      { challenge: 'only', name: 'Extension: loops inside loops', learn: 'nested',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 4), b = rng.int(2, 5);
          const code = `for row in range(${a}):\n    for col in range(${b}):\n        print("*", end="")\n    print()`;
          const ans = lines(Array(a).fill('*'.repeat(b)));
          return py(C(rng, { tag: EXT, prompt: 'What does this print?' + P(code), right: O(ans),
            wrong: [O(lines(Array(b).fill('*'.repeat(a)))), O('*'.repeat(a * b)), O(lines(Array(a * b).fill('*')))].filter(w => w !== O(ans)).slice(0, 3),
            explain: `The inner loop prints ${b} stars on one line; print() then ends the line. The outer loop does that ${a} times.` }), { code, output: ans });
        })] }
    ]
  });


  // ═══ C7 Lists ═══════════════════════════════════════════════════════════════

  Sci.topic({
    id: 'cl7', unit: 'loops', untimed: true,
    title: 'Lists',
    blurb: 'Keeping many values in one variable: positions, adding and changing items, looping through, and adding up.',
    hint: 'A list holds many values in order, in square brackets. Positions start at 0, and [-1] is the last. append() adds to the end; ' +
          'list[i] = value changes one item. for item in list visits each in turn. len, sum, max and min work on a whole list.',

    learn: [
      { id: 'list', title: 'A list',
        text: P('fruits = ["apple", "kiwi", "feijoa"]\nprint(len(fruits))') + '<p>A list keeps several values, in order, in one variable. len() counts them: 3.</p>' },
      { id: 'index', title: 'Positions start at 0',
        text: Sci.table(['Code', 'Gives'], [[I('fruits[0]'), 'apple'], [I('fruits[1]'), 'kiwi'], [I('fruits[2]'), 'feijoa'], [I('fruits[-1]'), 'feijoa (the last)']]) },
      { id: 'change', title: 'Adding and changing',
        text: Sci.table(['Code', 'Does'], [[I('fruits.append("pear")'), 'adds pear to the end'], [I('fruits[0] = "plum"'), 'replaces the first item'],
                [I('fruits.remove("kiwi")'), 'takes kiwi out'], [I('fruits.pop()'), 'removes and gives back the last']]) },
      { id: 'loop', title: 'Looping through a list',
        text: P('for f in ["apple", "kiwi"]:\n    print("I like", f)') + '<p>f takes each item in turn.</p>' },
      { id: 'whole', title: 'Working on a whole list',
        text: Sci.table(['Code', 'Gives'], [[I('sum([3, 5, 2])'), '10'], [I('max([3, 5, 2])'), '5'], [I('min([3, 5, 2])'), '2'], [I('sorted([3, 5, 2])'), '[2, 3, 5]'],
                [I('"kiwi" in fruits'), 'True or False']]) },
      { id: 'slice', title: 'Extension: slices', wide: true,
        text: '<p><code>list[a:b]</code> is a new list from position a up to (not including) b:</p>' + P('nums = [10, 20, 30, 40]\nprint(nums[1:3])') + '<p>prints <code>[20, 30]</code>.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: building a list',
        steps: [P('team = []\nteam.append("Aroha")\nteam.append("Leo")\nprint(team, len(team))'),
                '[] is an empty list. Each append adds one name to the end.',
                "It prints ['Aroha', 'Leo'] 2: Python shows text in a list with single quotes."]
      },
      {
        title: 'Example 2: an average',
        steps: [P('marks = [6, 8, 7]\nprint(sum(marks) / len(marks))'),
                'sum(marks) is 21 and len(marks) is 3.',
                '21 / 3 = 7.0, a float because of /.']
      }
    ],

    slots: [
      // ── The walk-through.
      { name: 'A list', learn: 'list',
        items: [Sci.gen(rng => {
          const items = rng.sample(['apple', 'kiwi', 'feijoa', 'pear', 'plum', 'mango'], rng.int(3, 5));
          const code = `fruits = ${listRepr(items).replace(/'/g, '"')}\nprint(fruits)\nprint(len(fruits))`;
          return py(out(rng, { prompt: 'A list keeps several values in one variable. Run it. What does the <strong>second</strong> line print?' + Py.tryIt(code), answer: String(items.length), width: 100,
            hints: ['Run it: the first line shows the whole list, the second counts it.', 'len() counts the items in the list.'],
            explain: `len(fruits) counts the items: ${items.length}.` }), { code, output: `${listRepr(items)}\n${items.length}` });
        })] },

      { name: 'Positions start at 0', learn: 'index',
        items: [Sci.gen(rng => {
          const items = rng.sample(['red', 'blue', 'gold', 'green', 'black'], 4);
          const code = `colours = ${listRepr(items).replace(/'/g, '"')}\nprint(colours[0])\nprint(colours[2])`;
          return py(out(rng, { prompt: 'Run it. What does <code>colours[2]</code> print?' + Py.tryIt(code), answer: items[2], width: 120,
            hints: ['Run it: the second line of output is colours[2].', 'Positions start at 0, so [2] is the third item.'],
            explain: `[0] is ${items[0]}, [1] is ${items[1]}, [2] is ${items[2]}: counting starts at 0.` }), { code, output: `${items[0]}\n${items[2]}` });
        })] },

      { name: 'Predict: which item?', learn: 'index',
        items: [Sci.gen(rng => {
          const items = rng.sample(['tui', 'kea', 'kiwi', 'weka', 'ruru', 'kaka'], 4);
          const i = rng.pick([1, 3, -1]);
          const code = `birds = ${listRepr(items).replace(/'/g, '"')}\nprint(birds[${i}])`;
          const ans = items[i < 0 ? items.length + i : i];
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, width: 120,
            hints: ['Count the positions from 0.', '[-1] means the last item.'],
            explain: `birds[${i}] is ${ans}.` }), { code, output: ans });
        })] },

      { name: 'Adding to a list', learn: 'change',
        items: [Sci.gen(rng => {
          const [a, b, c] = rng.sample(NAMES, 3);
          const code = `team = ["${a}", "${b}"]\nteam.append("${c}")\nprint(len(team))\nprint(team[-1])`;
          return py(out(rng, { prompt: 'Run it. What does the <strong>last</strong> line print?' + Py.tryIt(code), answer: c, width: 120,
            hints: ['Run it first.', 'append adds to the end, and [-1] is the last item.'],
            explain: `append put ${c} on the end, so the list has 3 names and the last is ${c}.` }), { code, output: `3\n${c}` });
        })] },

      { name: 'Changing an item', learn: 'change',
        items: [Sci.gen(rng => {
          const v = [rng.int(1, 9), rng.int(1, 9), rng.int(1, 9)], i = rng.int(0, 2), nv = rng.int(10, 20);
          const code = `scores = [${v.join(', ')}]\nscores[${i}] = ${nv}\nprint(scores)`;
          const res = v.slice(); res[i] = nv;
          const wrongIdx = i === 2 ? 1 : i + 1; const w1 = v.slice(); w1[wrongIdx] = nv;
          return py(C(rng, { prompt: 'What does this print?' + P(code), right: O(listRepr(res)),
            wrong: [O(listRepr(w1)), O(listRepr([...v, nv])), O(listRepr(v))],
            hints: [`scores[${i}] is position ${i}, counting from 0.`, `That one item is replaced by ${nv}; the others stay.`],
            explain: `Position ${i} (counting from 0) is replaced with ${nv}.` }), { code, output: listRepr(res) });
        })] },

      { name: 'Looping through a list', learn: 'loop',
        items: [Sci.gen(rng => {
          const items = rng.sample(['apple', 'kiwi', 'feijoa', 'pear', 'plum'], 3);
          const code = `for f in ${listRepr(items).replace(/'/g, '"')}:\n    print("I like", f)`;
          return py(out(rng, { prompt: 'Run it. What is the <strong>last</strong> line it prints?' + Py.tryIt(code), answer: `I like ${items[2]}`, width: 160,
            hints: ['Run it first.', 'f takes each item in turn, so the last line uses the last item.'],
            explain: `f is ${items.join(', then ')}: one line each.` }), { code, output: lines(items.map(f => `I like ${f}`)) });
        })] },

      { name: 'sum, max, min', learn: 'whole',
        items: [Sci.gen(rng => {
          const v = Array.from({ length: 4 }, () => rng.int(2, 20));
          const [fn, val] = rng.pick([['sum', v.reduce((s, x) => s + x, 0)], ['max', Math.max(...v)], ['min', Math.min(...v)]]);
          const code = `marks = [${v.join(', ')}]\nprint(${fn}(marks))`;
          return py(out(rng, { prompt: 'Run it. What does it print?' + Py.tryIt(code), answer: String(val), width: 100,
            hints: ['Run it first.', `${fn} works on the whole list at once.`],
            explain: `${fn}(marks) is ${val}.` }), { code, output: String(val) });
        })] },

      { name: 'Is it in the list?', learn: 'whole',
        items: [Sci.gen(rng => {
          const items = rng.sample(['tui', 'kea', 'kiwi', 'weka', 'ruru'], 3), x = rng.pick(['tui', 'kea', 'kiwi', 'weka', 'ruru']);
          const code = `birds = ${listRepr(items).replace(/'/g, '"')}\nprint("${x}" in birds)`;
          const ans = items.includes(x) ? 'True' : 'False';
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, width: 100,
            hints: ['in asks whether the value is somewhere in the list.', `Is ${x} one of ${items.join(', ')}?`],
            explain: `${x} ${items.includes(x) ? 'is' : 'is not'} in the list, so it prints ${ans}.` }), { code, output: ans });
        })] },

      { name: 'Change one thing', learn: 'change',
        items: [rng => {
          const starter = 'fruits = ["apple", "kiwi"]\nfor f in fruits:\n    print(f)';
          return {
            prompt: 'This program prints two fruits. Add <code>feijoa</code> to the end of the list, so it prints three. Run it to try, then ✓ Check.',
            input: { kind: 'code', key: 'cl7-add', starter, model: 'fruits = ["apple", "kiwi", "feijoa"]\nfor f in fruits:\n    print(f)', tests: [{ expect: 'apple\nkiwi\nfeijoa' }] },
            hints: ['Either add it inside the square brackets, with a comma, or use append before the loop.', 'fruits.append("feijoa") on a line before the for adds it to the end.'],
            explain: 'Either way works:' + P('fruits = ["apple", "kiwi", "feijoa"]') + 'or' + P('fruits = ["apple", "kiwi"]\nfruits.append("feijoa")')
          };
        }] },

      { name: 'Make it: the shopping list', learn: 'loop',
        items: [rng => ({
          prompt: 'The program has a list called <code>items</code>. Finish it so it prints each item on its own line, then <code>Total: </code> and the number of items. The checker tries other lists.',
          input: { kind: 'code', key: 'cl7-shop', starter: 'items = ["milk", "bread", "eggs"]\n# Print each item, then the total\n',
                   model: 'items = ["milk", "bread", "eggs"]\nfor item in items:\n    print(item)\nprint("Total:", len(items))',
                   tests: [{ expect: 'milk\nbread\neggs\nTotal: 3' }, { set: { items: '["kumara", "fish"]' }, expect: 'kumara\nfish\nTotal: 2' },
                           { set: { items: '["tea"]' }, expect: 'tea\nTotal: 1' }] },
          hints: ['A for loop prints each item.', 'After the loop, print("Total:", len(items)).'],
          explain: 'One way to do it:' + P('items = ["milk", "bread", "eggs"]\nfor item in items:\n    print(item)\nprint("Total:", len(items))')
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Changes in a row', learn: 'change',
        items: [Sci.gen(rng => {
          const a = rng.int(1, 5), b = rng.int(6, 9), c = rng.int(10, 15);
          const code = `nums = [${a}, ${b}]\nnums.append(${c})\nnums.insert(0, ${c + 1})\nnums.pop()\nnums[1] = ${a + 20}\nprint(nums)`;
          const res = [c + 1, a + 20, b];
          return py(C(rng, { prompt: 'What does this print?' + P(code), right: O(listRepr(res)),
            wrong: [O(listRepr([c + 1, a, b])), O(listRepr([a + 20, b, c])), O(listRepr([c + 1, a + 20, b, c]))],
            explain: `[${a}, ${b}] → append → [${a}, ${b}, ${c}] → insert at 0 → [${c + 1}, ${a}, ${b}, ${c}] → pop removes the last → [${c + 1}, ${a}, ${b}] → [1] = ${a + 20}.` }),
            { code, output: listRepr(res) });
        })] },

      { challenge: 'only', name: 'Read the error', learn: 'index',
        items: [
          ['nums = [4, 7, 9]\nprint(nums[3])', 'IndexError', 'There are three items, at positions 0, 1 and 2: position 3 does not exist.'],
          ['nums = [4, 7, 9]\nprint(nums + 1)', 'TypeError', 'A list and a number cannot be added.'],
          ['nums = [4, 7, 9]\nprint(Nums[0])', 'NameError', 'Nums with a capital is a different name.'],
          ['nums = [4, 7, 9]\nprint(nums[-3])', 'No error', '[-3] counts three from the end: the first item, 4.', '4']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why, { options: ['IndexError', 'NameError', 'TypeError', 'No error'] }),
          ans === 'No error' ? { code, output } : { code, error: ans })) },

      { challenge: 'only', name: 'Average', learn: 'whole',
        items: [Sci.gen(rng => {
          const n = rng.pick([2, 4]), v = Array.from({ length: n }, () => rng.int(2, 20));
          const code = `marks = [${v.join(', ')}]\nprint(sum(marks) / len(marks))`;
          const ans = pf(v.reduce((s, x) => s + x, 0) / n);
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, width: 120,
            explain: `sum is ${v.reduce((s, x) => s + x, 0)}, len is ${n}; / always gives a float.` }), { code, output: ans });
        })] },

      { challenge: 'only', name: 'Count the matches', learn: 'loop',
        items: [Sci.gen(rng => {
          const v = Array.from({ length: 6 }, () => rng.int(5, 30)), k = rng.int(12, 22);
          const code = `temps = [${v.join(', ')}]\ncount = 0\nfor t in temps:\n    if t > ${k}:\n        count = count + 1\nprint(count)`;
          const ans = String(v.filter(t => t > k).length);
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, width: 100,
            explain: `It counts the temperatures above ${k}: ${v.filter(t => t > k).join(', ') || 'none'}.` }), { code, output: ans });
        })] },

      { challenge: 'only', name: 'Find the biggest', learn: 'loop',
        items: [Sci.gen(rng => {
          const v = rng.shuffle([rng.int(1, 9), rng.int(10, 19), rng.int(20, 29), rng.int(30, 39)]);
          const seq = [`nums = [${v.join(', ')}]`, 'best = nums[0]', 'for n in nums:', '    if n > best:', '        best = n', 'print(best)'];
          return py(Sci.order(rng, 'Put these lines in order so the program finds the biggest number without using max(), and prints it.', seq.map(l => I(l)),
            'Start with the first item as the best so far, look at every item, keep any that beats it, print after the loop.'),
            { code: lines(seq), output: String(Math.max(...v)) });
        })] },

      { challenge: 'only', name: 'Make it: average mark', learn: 'whole',
        items: [rng => ({
          prompt: 'The program has a list called <code>marks</code>. Finish it so it prints <code>Average: </code> and the average. The checker tries other lists.',
          input: { kind: 'code', key: 'cl7-average', starter: 'marks = [6, 8, 7]\n# Print the average\n',
                   model: 'marks = [6, 8, 7]\nprint("Average:", sum(marks) / len(marks))',
                   tests: [{ expect: 'Average: 7.0' }, { set: { marks: '[10, 20]' }, expect: 'Average: 15.0' }, { set: { marks: '[1, 2, 3, 4, 5]' }, expect: 'Average: 3.0' }] },
          hints: ['The average is the total divided by how many.', 'sum(marks) / len(marks)'],
          explain: 'One way to do it:' + P('marks = [6, 8, 7]\nprint("Average:", sum(marks) / len(marks))')
        })] },

      { challenge: 'only', name: 'Make it: only the warm days', learn: 'loop',
        items: [rng => ({
          prompt: 'The program has a list of temperatures. Finish it so it prints only those above 20, one per line, in the same order. The checker tries other lists.',
          input: { kind: 'code', key: 'cl7-warm', starter: 'temps = [18, 22, 25, 19, 21]\n# Print only the temperatures above 20\n',
                   model: 'temps = [18, 22, 25, 19, 21]\nfor t in temps:\n    if t > 20:\n        print(t)',
                   tests: [{ expect: '22\n25\n21' }, { set: { temps: '[30, 10, 20, 21]' }, expect: '30\n21' }, { set: { temps: '[5, 6]' }, expect: '' }] },
          hints: ['Loop through the list, and test each temperature.', 'Above 20 means t > 20: exactly 20 is not printed.'],
          explain: 'One way to do it:' + P('temps = [18, 22, 25, 19, 21]\nfor t in temps:\n    if t > 20:\n        print(t)')
        })] },

      { challenge: 'only', name: 'Extension: slices', learn: 'slice',
        items: [Sci.gen(rng => {
          const v = Array.from({ length: 5 }, (_, i) => (i + 1) * 10), a = rng.int(0, 2), b = rng.int(a + 2, 5);
          const code = `nums = [${v.join(', ')}]\nprint(nums[${a}:${b}])`;
          const res = v.slice(a, b);
          return py(C(rng, { tag: EXT, prompt: 'What does this print?' + P(code), right: O(listRepr(res)),
            wrong: [O(listRepr(v.slice(a, b + 1))), O(listRepr(v.slice(a + 1, b + 1))), O(listRepr(v.slice(a + 1, b)))].filter((w, i, arr) => w !== O(listRepr(res)) && arr.indexOf(w) === i),
            explain: `[${a}:${b}] takes positions ${a} up to, not including, ${b}.` }), { code, output: listRepr(res) });
        })] }
    ]
  });


  // ═══ C8 Functions ═══════════════════════════════════════════════════════════

  Sci.topic({
    id: 'cl8', unit: 'loops', untimed: true,
    title: 'Functions',
    blurb: 'Naming a piece of code to reuse it: def, parameters, and return.',
    hint: 'def name(): makes a function; its indented lines run only when it is called, with name(). Values passed in go into its ' +
          'parameters. return sends a value back to where it was called; print only shows it. A function must be defined before it is called.',

    learn: [
      { id: 'def', title: 'def and calling',
        text: P('def greet():\n    print("Kia ora!")\n\ngreet()\ngreet()') +
              '<p><code>def</code> gives a name to some code. Nothing happens until the function is <strong>called</strong>: <code>greet()</code>. This prints Kia ora! twice.</p>' },
      { id: 'param', title: 'Parameters',
        text: P('def greet(name):\n    print("Kia ora", name)\n\ngreet("Aroha")\ngreet("Leo")') + '<p>The value in the brackets of the call goes into <code>name</code>.</p>' },
      { id: 'return', title: 'return',
        text: P('def square(n):\n    return n * n\n\nresult = square(4)\nprint(result + 1)') +
              '<p><code>return</code> sends a value back, to be stored or used: this prints 17.</p>' },
      { id: 'printret', title: 'print or return?',
        text: '<p><code>print</code> only shows a value on the screen. <code>return</code> gives it back to the program. A function with no return gives back <code>None</code>.</p>' +
              P('def double(n):\n    print(n * 2)\n\nx = double(3)\nprint(x)') + '<p>prints 6, then None.</p>' },
      { id: 'order', title: 'Define before you call',
        text: '<p>Python reads from the top down, so a function must be defined above the line that calls it, or it is a <strong>NameError</strong>.</p>' },
      { id: 'scope', title: 'Variables inside a function', wide: true,
        text: '<p>A variable made inside a function belongs to that function: it disappears when the function ends.</p>' +
              P('def f():\n    x = 5\n\nf()\nprint(x)') + '<p>is a <strong>NameError</strong>: x only existed inside f. Return the value instead.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: a function with a parameter',
        steps: [P('def area(w, h):\n    return w * h\n\nprint(area(3, 4))'),
                'The call area(3, 4) puts 3 in w and 4 in h.',
                'return w * h sends back 12, and print shows it.']
      },
      {
        title: 'Example 2: print is not return',
        steps: [P('def double(n):\n    print(n * 2)\n\nx = double(5)'),
                'The function prints 10, but returns nothing.',
                'So x is None. Use return n * 2 to keep the answer.']
      }
    ],

    slots: [
      // ── The walk-through.
      { name: 'Your first function', learn: 'def',
        items: [Sci.gen(rng => {
          const k = rng.int(2, 4);
          const code = `def greet():\n    print("Kia ora!")\n\n${Array(k).fill('greet()').join('\n')}`;
          return py(out(rng, { prompt: 'Run it. How many times does it print Kia ora!?' + Py.tryIt(code), answer: String(k), width: 100,
            hints: ['Run it and count.', 'The def only sets the function up; each greet() line runs it once.'],
            explain: `The function runs once for each call: ${k} calls, ${k} lines.` }), { code, output: lines(Array(k).fill('Kia ora!')) });
        })] },

      { name: 'Defining is not running', learn: 'def',
        items: [rng => {
          const code = 'def greet():\n    print("Kia ora!")';
          return py(C(rng, { prompt: 'What does this program print?' + P(code), right: 'Nothing at all', wrong: [O('Kia ora!'), O('greet'), 'An error'],
            hints: ['Is greet ever called?', 'def only gives the code a name. It runs when there is a greet() line.'],
            explain: 'The function is defined but never called, so the program prints nothing.' }), { code, output: '' });
        }] },

      { name: 'A parameter', learn: 'param',
        items: [Sci.gen(rng => {
          const [a, b] = rng.sample(NAMES, 2);
          const code = `def greet(name):\n    print("Kia ora", name)\n\ngreet("${a}")\ngreet("${b}")`;
          return py(out(rng, { prompt: 'Run it. What is the <strong>second</strong> line it prints?' + Py.tryIt(code), answer: `Kia ora ${b}`, width: 160,
            hints: ['Run it first.', 'Each call puts its value into name.'],
            explain: `The second call puts ${b} into name.` }), { code, output: `Kia ora ${a}\nKia ora ${b}` });
        })] },

      { name: 'Predict: parameters', learn: 'param',
        items: [Sci.gen(rng => {
          const k = rng.int(3, 12), m = rng.int(2, 5);
          const code = `def times(n):\n    print(n * ${m})\n\ntimes(${k})`;
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: String(k * m), width: 100,
            hints: [`The call times(${k}) puts ${k} into n.`, `Then it prints n * ${m}.`],
            explain: `n is ${k}, so it prints ${k} × ${m} = ${k * m}.` }), { code, output: String(k * m) });
        })] },

      { name: 'return gives back', learn: 'return',
        items: [Sci.gen(rng => {
          const k = rng.int(2, 9);
          const code = `def square(n):\n    return n * n\n\nresult = square(${k})\nprint(result + 1)`;
          return py(out(rng, { prompt: 'Run it. What does it print?' + Py.tryIt(code), answer: String(k * k + 1), width: 100,
            hints: ['Run it first.', `square(${k}) returns ${k * k}, which is stored in result.`],
            explain: `square(${k}) gives back ${k * k}; result + 1 is ${k * k + 1}.` }), { code, output: String(k * k + 1) });
        })] },

      { name: 'print or return?', learn: 'printret',
        items: [Sci.gen(rng => {
          const k = rng.int(2, 9);
          const code = `def double(n):\n    print(n * 2)\n\nx = double(${k})\nprint(x)`;
          return py(C(rng, { prompt: 'What does this print?' + P(code), right: O(`${2 * k}\nNone`), wrong: [O(`${2 * k}\n${2 * k}`), O(String(2 * k)), O('None')],
            hints: ['The function prints, but does it return anything?', 'A function with no return gives back None.'],
            explain: `double prints ${2 * k}, but returns nothing, so x is None and the last line prints None.` }), { code, output: `${2 * k}\nNone` });
        })] },

      { name: 'Two parameters', learn: 'param',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 9), b = rng.int(2, 9);
          const code = `def area(w, h):\n    return w * h\n\nprint(area(${a}, ${b}))`;
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: String(a * b), width: 100,
            hints: [`area(${a}, ${b}) puts ${a} in w and ${b} in h.`, 'return w * h sends back their product.'],
            explain: `${a} × ${b} = ${a * b}.` }), { code, output: String(a * b) });
        })] },

      { name: 'Change one thing', learn: 'return',
        items: [rng => ({
          prompt: 'This function works out the area of a rectangle. Change it so it works out the <strong>perimeter</strong>, 2 × (w + h), instead. The checker calls it with other sizes.',
          input: { kind: 'code', key: 'cl8-perimeter', starter: 'def perimeter(w, h):\n    return w * h\n\nprint(perimeter(3, 4))',
                   model: 'def perimeter(w, h):\n    return 2 * (w + h)\n\nprint(perimeter(3, 4))',
                   tests: [{ after: 'print(perimeter(5, 2))', expect: '14' }, { after: 'print(perimeter(10, 10))', expect: '40' }] },
          hints: ['Only the return line needs to change.', 'return 2 * (w + h): the brackets make the + happen first.'],
          explain: 'One way to do it:' + P('def perimeter(w, h):\n    return 2 * (w + h)')
        })] },

      { name: 'Fix it', learn: 'order',
        items: [rng => ({
          prompt: 'This program stops with a NameError. Fix it so it prints <code>Kia ora!</code>, then ✓ Check.',
          input: { kind: 'code', key: 'cl8-fix', starter: 'greet()\n\ndef greet():\n    print("Kia ora!")', model: 'def greet():\n    print("Kia ora!")\n\ngreet()', tests: [{ expect: 'Kia ora!' }] },
          hints: ['Press ▶ Run: which line is the error on?', 'Python reads from the top: move greet() below the function.'],
          explain: 'A function must be defined before it is called:' + P('def greet():\n    print("Kia ora!")\n\ngreet()')
        })] },

      { name: 'Make it: double', learn: 'return',
        items: [rng => ({
          prompt: 'Write a function called <code>double</code> that takes a number and <strong>returns</strong> twice that number. The checker calls <code>double(4)</code> and others, and prints what comes back.',
          input: { kind: 'code', key: 'cl8-double', starter: '# Write the function double here\n',
                   model: 'def double(n):\n    return n * 2', tests: [{ after: 'print(double(4))', expect: '8' }, { after: 'print(double(-3))', expect: '-6' }, { after: 'print(double(0))', expect: '0' }] },
          hints: ['Start with def double(n): and indent the next line.', 'Use return n * 2, not print: the checker needs the value back.'],
          explain: 'One way to do it:' + P('def double(n):\n    return n * 2') + 'With print instead of return, the checker would get None.'
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Calls inside calls', learn: 'return',
        items: [Sci.gen(rng => {
          const k = rng.int(1, 6), m = rng.int(2, 3), c = rng.int(1, 4);
          const f = x => x * m + c;
          const code = `def f(x):\n    return x * ${m} + ${c}\n\nprint(f(f(${k})))`;
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: String(f(f(k))), width: 100,
            explain: `The inside call first: f(${k}) = ${f(k)}. Then f(${f(k)}) = ${f(f(k))}.` }), { code, output: String(f(f(k))) });
        })] },

      { challenge: 'only', name: 'Read the error', learn: 'order',
        items: [
          ['greet()\ndef greet():\n    print("hi")', 'NameError', 'greet is called before it is defined.'],
          ['def area(w, h):\n    return w * h\nprint(area(3))', 'TypeError', 'area needs two values, but the call gives only one.'],
          ['def greet()\n    print("hi")', 'SyntaxError', 'The def line is missing its colon.'],
          ['def add(a, b):\n    return a + b\nprint(add(2, 3))', 'No error', 'It prints 5.', '5']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why), ans === 'No error' ? { code, output } : { code, error: ans })) },

      { challenge: 'only', name: 'Inside or outside?', learn: 'scope',
        items: [rng => {
          const code = 'def setup():\n    level = 1\n\nsetup()\nprint(level)';
          return py(C(rng, { prompt: 'What happens when this runs?' + P(code), right: 'NameError', wrong: [O('1'), O('None'), 'It prints nothing'], wide: false,
            explain: 'level is made inside setup, so it belongs to the function and is gone when it ends. Return the value instead.' }), { code, error: 'NameError' });
        }] },

      { challenge: 'only', name: 'Put it in order', learn: 'return',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 9), b = rng.intExcept(2, 9, [a]);
          const seq = ['def bigger(a, b):', '    if a > b:', '        return a', '    return b', `print(bigger(${a}, ${b}))`];
          return py(Sci.order(rng, `Put these lines in order so the function returns the bigger of two numbers, and the program prints ${Math.max(a, b)}.`, seq.map(l => I(l)),
            'The def comes first; return a is inside the if; return b is the fallback when the if is False; the call comes after the function.'),
            { code: lines(seq), output: String(Math.max(a, b)) });
        })] },

      { challenge: 'only', name: 'Returning early', learn: 'return',
        items: [Sci.gen(rng => {
          const k = rng.pick([rng.int(-9, -1), 0, rng.int(1, 9)]);
          const code = `def sign(n):\n    if n > 0:\n        return "positive"\n    if n < 0:\n        return "negative"\n    return "zero"\n\nprint(sign(${k}))`;
          const ans = k > 0 ? 'positive' : k < 0 ? 'negative' : 'zero';
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, width: 140,
            explain: 'return ends the function straight away, so only one of the three can happen.' }), { code, output: ans });
        })] },

      { challenge: 'only', name: 'Make it: is_even', learn: 'return',
        items: [rng => ({
          prompt: 'Write a function <code>is_even(n)</code> that returns <code>True</code> if n is even and <code>False</code> if it is not. The checker calls it.',
          input: { kind: 'code', key: 'cl8-even', starter: '# Write is_even here\n', model: 'def is_even(n):\n    return n % 2 == 0',
                   tests: [['4', 'True'], ['7', 'False'], ['0', 'True'], ['-2', 'True']].map(([n, e]) => ({ after: `print(is_even(${n}))`, expect: e })) },
          hints: ['n % 2 == 0 is already True or False.', 'So the whole function can be one line: return n % 2 == 0.'],
          explain: 'One way to do it:' + P('def is_even(n):\n    return n % 2 == 0') + 'A comparison is already True or False, so it can be returned directly.'
        })] },

      { challenge: 'only', name: 'Make it: biggest', learn: 'return',
        items: [rng => ({
          prompt: 'Write a function <code>biggest(nums)</code> that returns the biggest number in a list, <strong>without</strong> using max(). The checker calls it with several lists.',
          input: { kind: 'code', key: 'cl8-biggest', starter: '# Write biggest here, without max()\n',
                   model: 'def biggest(nums):\n    best = nums[0]\n    for n in nums:\n        if n > best:\n            best = n\n    return best',
                   tests: [['[3, 9, 2]', '9'], ['[-5, -1, -8]', '-1'], ['[7]', '7'], ['[4, 4, 1]', '4']].map(([l, e]) => ({ after: `print(biggest(${l}))`, expect: e })) },
          hints: ['Keep the best so far: start with the first item.', 'Loop through, replace best when an item beats it, and return best after the loop. Starting with 0 fails for all-negative lists.'],
          explain: 'One way to do it:' + P('def biggest(nums):\n    best = nums[0]\n    for n in nums:\n        if n > best:\n            best = n\n    return best') +
                   'Starting best at 0 would wrongly give 0 for [-5, -1, -8].'
        })] },

      { challenge: 'only', name: 'Extension: default values', learn: 'param',
        items: [Sci.gen(rng => {
          const nm = rng.pick(NAMES), useDefault = rng.chance();
          const code = `def greet(name, word="Kia ora"):\n    print(word, name)\n\ngreet("${nm}"${useDefault ? '' : ', "Hello"'})`;
          const ans = `${useDefault ? 'Kia ora' : 'Hello'} ${nm}`;
          return py(out(rng, { tag: EXT, prompt: 'What does this print?' + P(code), answer: ans, width: 160,
            explain: useDefault ? 'No second value is given, so word uses its default, Kia ora.' : 'The second value, Hello, replaces the default.' }), { code, output: ans });
        })] }
    ]
  });
})();
