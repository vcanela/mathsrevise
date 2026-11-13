'use strict';
// ── Revision · Coding, Python Basics (Years 9–10) ────────────────────────────
// Python from scratch, run in the page by Skulpt (js/python.js). Pitched at
// the computational thinking progress outcomes for Years 9–10 (PO4 to PO5):
// programs with inputs, outputs, sequence, selection with comparative and
// logical operators, variables of different data types, and iteration, with
// an organised approach to testing and debugging.
//
// Each exercise follows PRIMM (Predict, Run, Investigate, Modify, Make):
// predict what a program prints, read its error, spot the line that breaks,
// put scrambled lines in order, trace its variables, then change a program
// and write one, checked by running it against tests.
//
// Every question that shows a program carries it in `q.py`, with the output
// or error it must produce. tools/check-coding.js runs each one through both
// Skulpt and real Python and fails if either disagrees with the answer, so a
// "predict the output" question can never be marked against the wrong output.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice, TF = Sci.tf;
  const P = Py.block, I = Py.inline, O = Py.output;
  const EXT = 'Extension';

  /** Attach the program(s) a question shows, with what each must print or raise. */
  const py = (q, cases) => { q.py = [].concat(cases); return q; };
  /** How Python prints a float: a whole number keeps its ".0". */
  const pf = x => (Number.isInteger(x) ? x + '.0' : String(x));
  /** Typed output, matched exactly (capitals and spaces count). */
  const out = (rng, o) => Sci.word(rng, { ...o, exact: true, placeholder: o.placeholder || 'type the output', width: o.width || 240 });

  const ERRORS = ['SyntaxError', 'NameError', 'TypeError', 'No error'];
  /** "Which error?" with the options always in the same order. */
  function whichError(code, ans, why, o) {
    const opts = (o && o.options) || ERRORS;
    return {
      prompt: (o && o.prompt) || 'What happens when this program runs?' + P(code),
      tag: o && o.tag,
      input: { kind: 'choice', options: opts.map(x => ({ html: x === 'No error' ? 'It runs without an error' : x, right: x === ans })), correct: opts.indexOf(ans), wide: false },
      explain: why
    };
  }

  const NAMES = ['Aroha', 'Sam', 'Mere', 'Leo', 'Tama', 'Mia', 'Hemi', 'Ana', 'Jack', 'Priya', 'Tui', 'Noah'];

  // ═══ C1 Output and Strings ══════════════════════════════════════════════════

  Sci.topic({
    id: 'cb1', unit: 'basics',
    title: 'Output and Strings',
    blurb: 'print(), text in quotes, joining and repeating, and what Python’s error messages are telling you.',
    hint: 'print() shows what is in its brackets, then starts a new line. Text goes in quote marks. A comma between items adds a space ' +
          'and can mix text and numbers; + joins text to text with no space; * repeats text. An error names what went wrong and the line it happened on.',

    learn: [
      { id: 'print', title: 'print()',
        text: '<p><code>print()</code> shows whatever is in its brackets, then moves to a new line.</p>' + P('print("Kia ora")\nprint(7 + 3)') +
              '<p>Text (a <strong>string</strong>) goes inside quote marks. A number does not.</p>' },
      { id: 'quotes', title: 'Quotes inside text',
        text: '<p>Either kind of quote mark works, as long as both ends match. To show one kind, wrap the text in the other:</p>' +
              P('print("It\'s my turn")\nprint(\'She said "hi"\')') + '<p>Or put a backslash before it: <code>\\"</code>.</p>' },
      { id: 'join', title: 'Comma, plus, times',
        text: Sci.table(['Code', 'Prints'], [[I('print("Kia", "ora")'), 'Kia ora'], [I('print("Kia" + "ora")'), 'Kiaora'],
                [I('print("Age:", 14)'), 'Age: 14'], [I('print("ha" * 3)'), 'hahaha']]) +
              '<p>A comma adds a space and mixes text and numbers. <code>+</code> joins text to text only.</p>' },
      { id: 'index', title: 'Inside a string',
        text: Sci.table(['Code', 'Gives'], [[I('len("rugby")'), '5'], [I('"rugby"[0]'), 'r (counting starts at 0)'],
                [I('"rugby"[-1]'), 'y (the last letter)'], [I('"rugby"[1:3]'), 'ug'], [I('"rugby".upper()'), 'RUGBY']]) },
      { id: 'errors', title: 'Reading an error', wide: true,
        text: '<p>An error message names what went wrong and the line it happened on. Read it from the bottom up.</p>' +
              Sci.table(['Error', 'Usually means', 'Example'], [
                ['<strong>SyntaxError</strong>', 'Python cannot read the line: a missing quote, bracket or colon', I('print("hi)')],
                ['<strong>NameError</strong>', 'a name Python does not know: a typo, a capital letter, or text without quotes', I('Print("hi")')],
                ['<strong>TypeError</strong>', 'types that do not go together, such as text + a number', I('print("Age: " + 14)')]]) },
      { id: 'sepend', title: 'Extension: sep and end',
        text: '<p><code>sep</code> sets what goes <em>between</em> items; <code>end</code> sets what goes at the end instead of a new line.</p>' +
              P('print("a", "b", sep="-")\nprint("c", end="!")') + '<p>prints <code>a-b</code>, then <code>c!</code> with no new line.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: a comma or a plus?',
        steps: [I('print("Kia", "ora")') + ' prints <code>Kia ora</code>: the comma adds a space.',
                I('print("Kia" + "ora")') + ' prints <code>Kiaora</code>: + joins with nothing between.',
                I('print("Age:", 14)') + ' works, but ' + I('print("Age: " + 14)') + ' is a TypeError: + cannot join text to a number.']
      },
      {
        title: 'Example 2: reading an error',
        steps: [P('Print("Hello")'),
                'Python says <strong>NameError</strong> on line 1: it does not know the name <code>Print</code>.',
                'Python cares about capitals: the command is <code>print</code>, all lower case.']
      }
    ],

    slots: [
      // 1 · Predict: a comma or a plus.
      { name: 'What does it print?', learn: 'join',
        items: [Sci.gen(rng => {
          const [a, b] = rng.pick([['Kia', 'ora'], ['Good', 'morning'], ['Hello', 'world'], ['Team', 'Blue'], ['Level', 'up'], ['Game', 'over']]);
          const n = rng.int(2, 99);
          const forms = [
            [`print("${a}", "${b}")`, `${a} ${b}`, 'A comma between items prints a space between them.'],
            [`print("${a}" + "${b}")`, `${a}${b}`, '+ joins the two strings with nothing between them.'],
            [`print("${a}" + " " + "${b}")`, `${a} ${b}`, 'The space is its own string, joined in the middle.'],
            [`print("${a}", ${n})`, `${a} ${n}`, 'A comma can mix text and a number, with a space between.']
          ];
          const [code, ans, why] = rng.pick(forms);
          return py(out(rng, { prompt: 'What does this print? Type it exactly.' + P(code), answer: ans, explain: why }), { code, output: ans });
        })] },

      // 2 · Predict: joining and repeating.
      { name: 'Joining and repeating', learn: 'join',
        items: [Sci.gen(rng => {
          const s = rng.pick(['ha', 'Go', 'na', 'ab', 'yo']), k = rng.int(2, 4);
          const a = rng.int(1, 9), b = rng.int(1, 9);
          const forms = [
            [`print("${s}" * ${k})`, s.repeat(k), `* repeats the string ${k} times.`],
            [`print("${a}" + "${b}")`, `${a}${b}`, 'In quotes, these are text, not numbers: + joins them side by side.'],
            [`print(${a} + ${b})`, String(a + b), 'Without quotes these are numbers, so + adds them.'],
            [`print("${s}" * ${k} + "!")`, s.repeat(k) + '!', '* happens first, then + adds the "!" on the end.']
          ];
          const [code, ans, why] = rng.pick(forms);
          return py(out(rng, { prompt: 'What does this print? Type it exactly.' + P(code), answer: ans, explain: why }), { code, output: ans });
        })] },

      // 3 · Predict: lines of output.
      { name: 'Lines of output', learn: 'sepend',
        items: [Sci.gen(rng => {
          const [a, b, c] = rng.sample(['Red', 'Blue', 'Gold', 'Green', 'Black', 'White'], 3);
          const gap = rng.pick([' ', '']);
          const code = `print("${a}", end="${gap}")\nprint("${b}")\nprint("${c}")`;
          const right = `${a}${gap}${b}\n${c}`;
          const wrong = [`${a}\n${b}\n${c}`, `${a}${gap}${b}${gap}${c}`, `${a}${gap === ' ' ? '' : ' '}${b}\n${c}`];
          return py(C(rng, { prompt: 'Which shows what this program prints?' + P(code), right: O(right), wrong: wrong.map(O),
            explain: `<code>end="${gap}"</code> replaces the usual new line after <em>${a}</em>, so <em>${b}</em> follows on the same line. The next print starts a new line as normal.` }),
            { code, output: right });
        })] },

      // 4 · Read the error.
      { name: 'Read the error', learn: 'errors',
        items: [
          ['print("Kia ora)', 'SyntaxError', 'The closing quote mark is missing, so Python cannot tell where the text ends.'],
          ['print("Hello"', 'SyntaxError', 'The closing bracket is missing.'],
          ["print('It's late')", 'SyntaxError', 'The apostrophe ends the string early. Use double quotes around text that contains an apostrophe.'],
          ['print(hello)', 'NameError', 'Without quotes, hello is a name, and Python has no variable called hello. Text needs quote marks.'],
          ['Print("Hello")', 'NameError', 'Python cares about capitals: Print is not the same as print.'],
          ['prnt("Hello")', 'NameError', 'A typo: Python does not know any command called prnt.'],
          ['print("Age: " + 14)', 'TypeError', '+ cannot join text to a number. Use a comma, or str(14).'],
          ['print("Level " + 9 + "!")', 'TypeError', '"Level " is text and 9 is a number, so + cannot join them.'],
          ['print("Age:", 14)', 'No error', 'A comma can mix text and numbers. It prints Age: 14.', 'Age: 14'],
          ['print("5" + "5")', 'No error', 'Both are text, so + joins them: it prints 55.', '55'],
          ['print(\'She said "hi"\')', 'No error', 'Single quotes around the text let it contain double quotes.', 'She said "hi"'],
          ['print("Go" * 3)', 'No error', '* repeats text: it prints GoGoGo.', 'GoGoGo']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why), ans === 'No error' ? { code, output } : { code, error: ans })) },

      // 5 · Spot the line that breaks.
      { name: 'Spot the bug', learn: 'errors',
        items: [Sci.gen(rng => {
          const name = rng.pick(NAMES), row = rng.pick('ABCDEF'), seat = rng.int(2, 30);
          const lines = [`print("Ticket for", "${name}")`, `print("Seat:", "${row}${seat}")`, 'print("Doors open at 7 pm")', 'print("Enjoy the show!")'];
          const at = rng.int(0, 3);
          // A missing bracket is only noticed on the next line, so its error
          // points one line too low: worth knowing, and said in the working.
          const [broken, err, why, later] = rng.pick([
            [l => l.replace(/"\)$/, ')'), 'SyntaxError', 'the closing quote mark is missing', false],
            [l => l.replace(/^print/, 'Print'), 'NameError', 'Print has a capital P, and Python only knows print', false],
            [l => l.replace(/\)$/, ''), 'SyntaxError', 'the closing bracket is missing', true]
          ]);
          const shown = lines.slice();
          shown[at] = broken(lines[at]);
          return py(Sci.spot(rng, {
            prompt: 'This program prints a ticket, but one line stops it from running. Which line?',
            lines: shown.map(l => I(l)), wrong: at, find: true, cue: 'Click the line with the mistake.',
            explain: `On line ${at + 1}, ${why}: <strong>${err}</strong>. The fixed line is ${I(lines[at])}.` +
              (later ? ' Python only notices a missing bracket when the next line starts, so its error message points one line lower than the mistake. When an error makes no sense, look at the line above.' : '')
          }), later ? { code: shown.join('\n'), error: err } : { code: shown.join('\n'), error: err, line: at + 1 });
        })] },

      // 6 · Parsons: put the lines in order.
      { name: 'Put it in order', learn: 'print',
        items: [Sci.gen(rng => {
          const [shop, item1, item2] = rng.pick([['Corner Dairy', 'Pie', 'Milk'], ['School Canteen', 'Wrap', 'Juice'], ['Surf Shop', 'Wax', 'Leash']]);
          const p1 = rng.int(2, 9), p2 = rng.int(2, 9);
          const seq = [`print("${shop}")`, `print("${item1}", ${p1})`, `print("${item2}", ${p2})`, `print("Total:", ${p1} + ${p2})`];
          const target = `${shop}\n${item1} ${p1}\n${item2} ${p2}\nTotal: ${p1 + p2}`;
          return py(Sci.order(rng, 'Put these lines in order so the program prints this receipt.' + O(target), seq.map(l => I(l)),
            'Each print() makes one line of output, in the order the lines run: top to bottom.'), { code: seq.join('\n'), output: target });
        })] },

      // 7 · Quotes inside text.
      { name: 'Quotes inside text', learn: 'quotes',
        items: [
          ["It's my turn", 'print("It\'s my turn")', ["print('It's my turn')", "print(It's my turn)", 'print("It\'s my turn)']],
          ['She said "Kia ora"', 'print(\'She said "Kia ora"\')', ['print("She said "Kia ora"")', 'print(She said "Kia ora")', 'print(\'She said "Kia ora")']],
          ['"Stop!" he yelled', 'print(\'"Stop!" he yelled\')', ['print(""Stop!" he yelled")', 'print("Stop!" he yelled)', 'print(\'"Stop!" he yelled"']],
          ["Don't say \"never\"", 'print("Don\'t say \\"never\\"")', ['print("Don\'t say "never"")', 'print(\'Don\'t say "never"\')', 'print(Don\'t say "never")']]
        ].map(([target, right, wrong]) => rng => py(C(rng, {
          prompt: `Which line prints exactly this?` + O(target), right: I(right), wrong: wrong.map(w => I(w)),
          explain: 'Wrap the text in the kind of quote mark it does not contain, or put a backslash before a quote mark inside it.' }),
          { code: right, output: target })) },

      // 8 · Inside a string.
      { name: 'Inside a string', learn: 'index',
        items: [Sci.gen(rng => {
          const w = rng.pick(['python', 'kowhai', 'planet', 'silver', 'guitar', 'school', 'rocket']);
          const forms = [
            [`print(len("${w}"))`, String(w.length), 'len() counts the characters.'],
            [`print("${w}"[0])`, w[0], 'Positions start at 0, so [0] is the first letter.'],
            [`print("${w}"[-1])`, w[w.length - 1], '[-1] counts from the end: the last letter.'],
            [`print("${w}".upper())`, w.toUpperCase(), '.upper() gives the string in capitals.'],
            [`print("${w}"[1:4])`, w.slice(1, 4), '[1:4] takes positions 1, 2 and 3: it stops before 4.']
          ];
          const [code, ans, why] = rng.pick(forms);
          return py(out(rng, { prompt: 'What does this print?' + P(code), answer: ans, explain: why }), { code, output: ans });
        })] },

      // 9 · Make: print exactly this.
      { name: 'Make it: print exactly this', learn: 'print',
        items: [Sci.gen(rng => {
          const name = rng.pick(NAMES), team = rng.pick(['Blue', 'Gold', 'Green']), n = rng.int(3, 12);
          const target = `Player: ${name}\nTeam: ${team}\nNumber: ${n}`;
          const model = `print("Player: ${name}")\nprint("Team: ${team}")\nprint("Number: ${n}")`;
          return {
            prompt: 'Write a program that prints exactly this, on three lines.' + O(target),
            input: { kind: 'code', key: 'cb1-make', starter: '# Write your program below\n', model, tests: [{ expect: target }] },
            hints: ['Each line of output needs its own print().', 'Copy the text exactly, inside quote marks: capitals, spaces and the colons all count.'],
            explain: 'One way to do it:' + P(model) + 'A comma also works: <code>print("Number:", ' + n + ')</code> prints the same line.'
          };
        })] },

      // 10 · Modify: change a working program.
      { name: 'Change it', learn: 'join',
        items: [Sci.gen(rng => {
          const from = rng.pick(['Sam', 'Ana']), to = rng.pick(['Mere', 'Leo', 'Priya']), k = rng.int(2, 4);
          const starter = `name = "${from}"\nprint("Kia ora " + name)`;
          const model = `name = "${to}"\nprint("Kia ora " + name + "!" * ${k})`;
          const target = `Kia ora ${to}${'!'.repeat(k)}`;
          return {
            prompt: `This program prints <code>Kia ora ${from}</code>. Change it so it prints exactly this:` + O(target) +
                    `Use <code>*</code> for the exclamation marks rather than typing them.`,
            input: { kind: 'code', key: 'cb1-change', starter, model, tests: [{ expect: target }] },
            hints: ['Two changes: the name in the first line, and something added on the end of the print.', `${I('"!" * ' + k)} makes ${k} exclamation marks; join it on with +.`],
            explain: 'One way to do it:' + P(model)
          };
        })] },

      // 11 · Extension: sep and end.
      { name: 'Extension: sep and end', learn: 'sepend',
        items: [Sci.gen(rng => {
          const [a, b, c] = rng.sample(['x', 'y', 'z', '1', '2', '3'], 3);
          const sep = rng.pick(['-', '', ', ', '...']);
          const code = `print("${a}", "${b}", "${c}", sep="${sep}")`;
          const ans = [a, b, c].join(sep);
          return py(out(rng, { tag: EXT, prompt: 'What does this print?' + P(code), answer: ans,
            explain: `<code>sep="${sep}"</code> goes between the items instead of the usual space.` }), { code, output: ans });
        })] }
    ]
  });


  // ═══ C2 Variables and Types ═════════════════════════════════════════════════

  Sci.topic({
    id: 'cb2', unit: 'basics',
    title: 'Variables and Types',
    blurb: 'Storing values in variables, the four basic types, dividing, converting, and f-strings.',
    hint: 'A variable is a name for a value: x = 5 stores 5 under the name x, working out the right side first. Lines run top to bottom, so a later ' +
          'change does not reach back. Types matter: 5 is an int, 5.0 a float, "5" a str, True a bool. int(), float() and str() convert between them.',

    learn: [
      { id: 'store', title: 'A variable stores a value',
        text: P('score = 5\nscore = score + 2\nprint(score)') +
              '<p><code>=</code> means “store”, not “equals”. Python works out the right side first, then stores it under the name on the left. This prints 7.</p>' },
      { id: 'reassign', title: 'Order matters',
        text: P('a = 3\nb = a + 1\na = 10\nprint(b)') +
              '<p>This prints 4. <code>b</code> was worked out when its line ran; changing <code>a</code> later does not change <code>b</code>.</p>' },
      { id: 'types', title: 'Four types',
        text: Sci.table(['Type', 'Holds', 'Examples'], [['<strong>int</strong>', 'whole numbers', '7, -3, 0'], ['<strong>float</strong>', 'decimals', '7.0, 0.5'],
                ['<strong>str</strong>', 'text, in quotes', '"7", "hi"'], ['<strong>bool</strong>', 'true or false', 'True, False']]) +
              '<p><code>type(x)</code> tells you which one a value is.</p>' },
      { id: 'divide', title: 'Three kinds of divide',
        text: Sci.table(['Code', 'Gives'], [[I('7 / 2'), '3.5 (always a float)'], [I('8 / 2'), '4.0'], [I('7 // 2'), '3 (whole number part)'], [I('7 % 2'), '1 (the remainder)']]) },
      { id: 'convert', title: 'Converting types',
        text: Sci.table(['Code', 'Gives'], [[I('int("12") + 3'), '15'], [I('str(5) + "5"'), '55'], [I('float("2.5") * 2'), '5.0'], [I('int("3.5")'), 'ValueError']]) +
              '<p>Converting text that does not look like the type gives a <strong>ValueError</strong>.</p>' },
      { id: 'fstring', title: 'f-strings',
        text: '<p>An <strong>f</strong> before the quotes lets you put values straight into text, in curly brackets:</p>' +
              P('name = "Aroha"\nage = 14\nprint(f"{name} is {age}, nearly {age + 1}")') + '<p>prints <code>Aroha is 14, nearly 15</code>.</p>' },
      { id: 'names', title: 'Allowed names', wide: true,
        text: '<p>A variable name uses letters, digits and underscores, and cannot start with a digit or contain a space. It cannot be one of Python’s own words, such as ' +
              '<code>if</code>, <code>for</code> or <code>class</code>. Capitals matter: <code>Score</code> and <code>score</code> are different names.</p>' +
              '<p>Allowed: <code>score</code>, <code>total_2</code>, <code>_count</code>, <code>firstName</code>. Not allowed: <code>2nd</code>, <code>my score</code>, <code>first-name</code>, <code>class</code>.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: storing and changing',
        steps: [P('score = 5\nscore = score + 2\nprint(score)'),
                'The right side is worked out first: <code>score + 2</code> is 7.',
                'Then 7 is stored back in <code>score</code>, so the program prints 7.']
      },
      {
        title: 'Example 2: text or number?',
        steps: [P('age = "14"\nprint(age + 1)'),
                'The quotes make <code>"14"</code> text (a str), so <code>age + 1</code> is a <strong>TypeError</strong>.',
                'Convert it first: ' + I('print(int(age) + 1)') + ' prints 15.']
      }
    ],

    slots: [
      // 1 · Predict: reassigning.
      { name: 'What does it print?', learn: 'reassign',
        items: [Sci.gen(rng => {
          const p = rng.int(2, 9), q = rng.int(2, 9), r = rng.intExcept(2, 20, [p]);
          const code = `a = ${p}\nb = a + ${q}\na = ${r}\nprint(a, b)`;
          const ans = `${r} ${p + q}`;
          return py(out(rng, { prompt: 'What does this print? Type it exactly.' + P(code), answer: ans,
            explain: `<code>b</code> was worked out on line 2, when <code>a</code> was ${p}: so b is ${p + q}. Changing <code>a</code> on line 3 does not change <code>b</code>.` }),
            { code, output: ans });
        })] },

      // 2 · Trace the variables.
      { name: 'Trace the program', learn: 'store',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 9), b = rng.int(1, 9), c = rng.int(2, 4);
          const x1 = a, y2 = a + b, x3 = y2 * c, y4 = x3 - y2;
          const lines = [`x = ${a}`, `y = x + ${b}`, `x = y * ${c}`, 'y = x - y'];
          const traced = lines.flatMap((l, i) => [l, `print(${i % 2 ? 'y' : 'x'})`]).join('\n');
          return py({
            prompt: 'Trace this program. What is stored after each line?' + P(lines.join('\n')),
            input: { kind: 'fill', parts: [
              { text: 'After line 1, x =' }, { input: { answer: x1, width: 60 } },
              { text: 'line 2, y =' }, { input: { answer: y2, width: 60 } },
              { text: 'line 3, x =' }, { input: { answer: x3, width: 60 } },
              { text: 'line 4, y =' }, { input: { answer: y4, width: 60 } }] },
            explain: `x = ${a}; y = ${a} + ${b} = ${y2}; x = ${y2} × ${c} = ${x3}; y = ${x3} − ${y2} = ${y4}. Each line uses the values as they are at that moment.`
          }, { code: traced, output: [x1, y2, x3, y4].join('\n') });
        })] },

      // 3 · Which type?
      { name: 'Which type?', learn: 'types',
        items: [rng => {
          const bank = [['7', 0], ['-3', 0], ['100', 0], ['7.0', 1], ['0.5', 1], ['-2.25', 1], ['"7"', 2], ['"hello"', 2], ['"3.5"', 2], ['"True"', 2],
                        ['True', 3], ['False', 3]];
          const BINS = ['int', 'float', 'str', 'bool'];
          const q = Sci.sort(rng, { prompt: 'What type is each value?', bins: BINS, items: bank.map(([v, b]) => ({ text: I(v), bin: b })), pick: 6,
            explain: 'Quotes make anything a str, even "7" or "True". A decimal point makes a float. True and False, with capitals and no quotes, are bools.' });
          return py(q, bank.map(([v, b]) => ({ code: `print(type(${v}).__name__)`, output: BINS[b] })));
        }] },

      // 4 · Dividing.
      { name: 'Dividing', learn: 'divide',
        items: [Sci.gen(rng => {
          // Dividing by 2, 4 or 8 gives a decimal that binary stores exactly:
          // Skulpt and real Python print others differently (41 / 5).
          const b = rng.pick([2, 4, 8]), a = rng.int(b + 1, 9 * b);
          const forms = [
            [`print(${a} / ${b})`, pf(a / b), '/ always gives a float, even when it divides exactly.'],
            [`print(${a} // ${b})`, String(Math.floor(a / b)), '// keeps only the whole-number part.'],
            [`print(${a} % ${b})`, String(a % b), '% gives the remainder after dividing.']
          ];
          const [code, ans, why] = rng.pick(forms);
          return py(out(rng, { prompt: 'What does this print? Type it exactly.' + P(code), answer: ans, explain: why, width: 160 }), { code, output: ans });
        })] },

      // 5 · Converting types.
      { name: 'Converting', learn: 'convert',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 9), b = rng.int(10, 40), k = rng.int(2, 4), h = rng.int(1, 9);
          const forms = [
            [`print(str(${a}) + "${a}")`, `${a}${a}`, [String(2 * a), `${a} ${a}`, 'TypeError'], 'str() turns the number into text, so + joins two pieces of text.'],
            [`print(int("${b}") + ${a})`, String(b + a), [`${b}${a}`, `${b} ${a}`, 'TypeError'], 'int() turns the text into a number, so + adds.'],
            [`print(float("${h}.5") * 2)`, pf((h + 0.5) * 2), [String(2 * h + 1), `${h}.5${h}.5`, 'TypeError'], 'float() makes a decimal number; doubling it gives a float.'],
            [`print(int("${h}.5"))`, 'ValueError', [String(h), `${h}.5`, String(h + 1)], 'int() cannot convert text with a decimal point: that is a ValueError.'],
            [`print("${a}" * ${k})`, String(a).repeat(k), [String(a * k), Array(k).fill(a).join(' '), 'TypeError'], 'The 7 is text here, so * repeats it.']
          ];
          const [code, right, wrong, why] = rng.pick(forms);
          return py(C(rng, { prompt: 'What does this print?' + P(code), right: right === 'ValueError' ? 'ValueError' : O(right),
            wrong: wrong.map(w => /Error$/.test(w) ? w : O(w)), wide: false, explain: why.replace('The 7', `The ${a}`) }),
            right === 'ValueError' ? { code, error: 'ValueError' } : { code, output: right });
        })] },

      // 6 · Read the error.
      { name: 'Read the error', learn: 'convert',
        items: [
          ['score = 10\nprint(Score)', 'NameError', 'Score with a capital S is a different name from score, and it was never given a value.'],
          ['print(age)\nage = 14', 'NameError', 'Lines run top to bottom: age has no value yet when line 1 runs.'],
          ['age = 14\nprint("Age: " + age)', 'TypeError', 'age is an int, so + cannot join it to text. Use str(age), or a comma.'],
          ['n = "5"\nprint(n + 1)', 'TypeError', 'n is the text "5", so + cannot add the number 1 to it. Use int(n).'],
          ['1st_place = "Aroha"', 'SyntaxError', 'A variable name cannot start with a digit.'],
          ['my score = 10', 'SyntaxError', 'A variable name cannot contain a space. Use my_score.'],
          ['n = int("ten")', 'ValueError', 'int() can only convert text that looks like a whole number.'],
          ['x = int("2.5")', 'ValueError', 'int() cannot convert text with a decimal point. float("2.5") can.'],
          ['age = 14\nprint("Age: " + str(age))', 'No error', 'str(age) turns 14 into text, so + can join it. It prints Age: 14.', 'Age: 14'],
          ['n = "5"\nprint(int(n) + 1)', 'No error', 'int(n) turns "5" into the number 5, so it prints 6.', '6']
        ].map(([code, ans, why, output]) => rng => py(whichError(code, ans, why, { options: ['SyntaxError', 'NameError', 'TypeError', 'ValueError', 'No error'] }),
          ans === 'No error' ? { code, output } : { code, error: ans })) },

      // 7 · Allowed names.
      { name: 'Allowed names?', learn: 'names',
        items: [rng => {
          const bank = [['score', 0], ['total_2', 0], ['_count', 0], ['firstName', 0], ['Year9', 0], ['max_speed', 0],
                        ['2nd', 1], ['my score', 1], ['first-name', 1], ['class', 1], ['9year', 1], ['for', 1]];
          const q = Sci.sort(rng, { prompt: 'Can each of these be used as a variable name?', bins: ['Allowed', 'Not allowed'],
            items: bank.map(([v, b]) => ({ text: I(v), bin: b })), pick: 6,
            explain: 'Letters, digits and underscores only, not starting with a digit, no spaces or hyphens, and not one of Python’s own words such as class or for.' });
          return py(q, bank.map(([v, b]) => (b ? { code: `${v} = 1`, error: 'SyntaxError' } : { code: `${v} = 1\nprint(${v})`, output: '1' })));
        }] },

      // 8 · f-strings.
      { name: 'f-strings', learn: 'fstring',
        items: [Sci.gen(rng => {
          const name = rng.pick(NAMES), age = rng.int(12, 15), k = rng.int(2, 5);
          const code = `name = "${name}"\nage = ${age}\nprint(f"{name} will be {age + ${k}} in ${k} years")`;
          const ans = `${name} will be ${age + k} in ${k} years`;
          return py(out(rng, { prompt: 'What does this print? Type it exactly.' + P(code), answer: ans, width: 320,
            explain: 'Inside an f-string, whatever is in curly brackets is worked out and put into the text.' }), { code, output: ans });
        })] },

      // 9 · Parsons: swap two values.
      { name: 'Swap two values', learn: 'reassign',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 9), b = rng.intExcept(2, 9, [a]);
          const seq = ['temp = a', 'a = b', 'b = temp', 'print(a, b)'];
          return py(Sci.order(rng, `The program starts with ${I(`a = ${a}`)} and ${I(`b = ${b}`)}. Put these lines in order so it swaps them and prints <code>${b} ${a}</code>.`,
            seq.map(l => I(l)), 'Keep a copy of a in temp first, or it is lost when a is changed. Then a takes b, and b takes the copy.'),
            { code: `a = ${a}\nb = ${b}\n` + seq.join('\n'), output: `${b} ${a}` });
        })] },

      // 10 · Make: speed.
      { name: 'Make it: speed', learn: 'divide',
        items: [Sci.gen(rng => {
          const [d, t] = rng.pick([[120, 1.5], [90, 2], [150, 3], [60, 0.5]]);
          const starter = `distance = ${d}\ntime = ${t}\n# Print the speed, worked out from distance and time\n`;
          const model = `distance = ${d}\ntime = ${t}\nspeed = distance / time\nprint("Speed:", speed, "km/h")`;
          const tests = [[d, t], [100, 4], [45, 1.5]].map(([dd, tt]) => ({ set: { distance: String(dd), time: String(tt) }, expect: `Speed: ${pf(dd / tt)} km/h` }));
          return {
            prompt: `A car travels <code>distance</code> kilometres in <code>time</code> hours. Finish the program so it prints the speed like this:` +
                    O(tests[0].expect) + 'Work it out from the variables, so it would still be right if they changed.',
            input: { kind: 'code', key: 'cb2-speed', starter, model, tests },
            hints: ['Speed is distance divided by time: <code>distance / time</code>.', 'A comma between the parts of print() puts the spaces in for you.'],
            explain: 'One way to do it:' + P(model) + 'The checker also tries other distances and times, so typing the number in will not pass.'
          };
        })] },

      // 11 · Make: temperature.
      { name: 'Make it: temperature', learn: 'fstring',
        items: [Sci.gen(rng => {
          const c = rng.pick([25, 30, 15]);
          const starter = `celsius = ${c}\n# Print the temperature in Fahrenheit\n`;
          const model = `celsius = ${c}\nfahrenheit = celsius * 9 / 5 + 32\nprint(f"{celsius} C is {fahrenheit} F")`;
          const tests = [c, 0, 100, -40].map(cc => ({ set: { celsius: String(cc) }, expect: `${cc} C is ${pf(cc * 9 / 5 + 32)} F` }));
          return {
            prompt: 'To change Celsius to Fahrenheit, multiply by 9, divide by 5, then add 32. Finish the program so it prints, for example:' + O(tests[0].expect),
            input: { kind: 'code', key: 'cb2-temp', starter, model, tests },
            hints: ['Store the answer in a new variable: <code>fahrenheit = celsius * 9 / 5 + 32</code>.', 'An f-string puts both values into one line of text: <code>f"{celsius} C is …"</code>.'],
            explain: 'One way to do it:' + P(model) + 'Because / always gives a float, Fahrenheit prints with a decimal point.'
          };
        })] },

      // 12 · Extension: hours and minutes.
      { name: 'Extension: hours and minutes', learn: 'divide',
        items: [Sci.gen(rng => {
          const m = rng.int(61, 299);
          const code = `minutes = ${m}\nprint(minutes // 60, "h", minutes % 60, "min")`;
          const ans = `${Math.floor(m / 60)} h ${m % 60} min`;
          return py(out(rng, { tag: EXT, prompt: 'What does this print?' + P(code), answer: ans,
            explain: '// 60 counts the whole hours; % 60 is the minutes left over.' }), { code, output: ans });
        })] }
    ]
  });
})();
