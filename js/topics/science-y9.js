'use strict';
// ── Revision · Year 9 science ───────────────────────────────────────────────
// Phase 4 (Years 9–10) of the Science Years 0–10 learning area, August 2026.
// Each exercise follows one Year 9 knowledge heading and draws its practice
// questions from the matching practices column. As in Years 7 and 8, the
// questions stay inside what the knowledge statements say: no V = IR, since
// the curriculum does not ask for it at this level.
//
// Each exercise has a normal set and a Challenge set (?set=challenge).
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice;
  const EXT = 'Extension';
  const num = x => String(+(+x).toFixed(2));

  // ═══ 9.1 Atoms and the periodic table ═════════════════════════════════════
  // Knowledge: The periodic table; Atomic theory (Matter, Year 9, p. 24).
  // Practices: predict properties from position and check against data;
  // pattern seeking between atomic structure and position; standard symbols
  // for atomic structure; strengths and limitations of models; how atomic
  // theory developed; elements in short supply.

  /** The first 20 elements: atomic number, symbol, name, mass number of the commonest atom. */
  const ELEMENTS = [
    [1, 'H', 'hydrogen', 1], [2, 'He', 'helium', 4], [3, 'Li', 'lithium', 7], [4, 'Be', 'beryllium', 9],
    [5, 'B', 'boron', 11], [6, 'C', 'carbon', 12], [7, 'N', 'nitrogen', 14], [8, 'O', 'oxygen', 16],
    [9, 'F', 'fluorine', 19], [10, 'Ne', 'neon', 20], [11, 'Na', 'sodium', 23], [12, 'Mg', 'magnesium', 24],
    [13, 'Al', 'aluminium', 27], [14, 'Si', 'silicon', 28], [15, 'P', 'phosphorus', 31], [16, 'S', 'sulfur', 32],
    [17, 'Cl', 'chlorine', 35], [18, 'Ar', 'argon', 40], [19, 'K', 'potassium', 39], [20, 'Ca', 'calcium', 40]
  ].map(([z, sym, name, A]) => {
    const { g, p } = SciDia.place(z);
    const shells = SciDia.shellsOf(z);
    return { z, sym, name, A, n: A - z, g, p, shells, valence: shells[shells.length - 1] };
  });
  const el = z => ELEMENTS[z - 1];
  const Name = e => e.name[0].toUpperCase() + e.name.slice(1);
  const arr = e => e.shells.join(', ');
  /** Every reasonable way of typing an arrangement: 2,8,1 · 2, 8, 1 · 2 8 1 · 2.8.1 */
  const arrAnswers = e => [',', ', ', ' ', '.', '-', ' , '].map(sep => e.shells.join(sep));
  const nuclide = e => m(`{}^{${e.A}}_{${e.z}}\\text{${e.sym}}`);
  const FAMILY = { 1: 'alkali metals', 2: 'alkaline earth metals', 17: 'halogens', 18: 'noble gases' };
  const METAL = new Set([3, 4, 11, 12, 13, 19, 20]);

  Sci.topic({
    id: 's9e1', unit: 'atoms-reactions',
    title: 'Atoms and the Periodic Table',
    blurb: 'What atoms are made of, how their electrons are arranged, and how the periodic table organises the elements.',
    hint: 'The atomic number is the number of protons, and in a neutral atom the number of electrons too. The mass number is protons plus ' +
          'neutrons, so neutrons = mass number − atomic number. Electrons fill shells of 2, then 8, then 8. The number of shells is the period; ' +
          'the outer (valence) electrons match the group (groups 1 and 2, or the group minus 10 for groups 13 to 18).',

    learn: [
      { id: 'atom', title: 'Atoms and elements',
        text: '<p>An <strong>atom</strong> is the smallest unit of matter that keeps the chemical properties of an element.</p>' +
              '<p>An <strong>element</strong> is a substance made of one type of atom, with a name and a symbol: argon, Ar. ' +
              'There are 118 known elements; 94 occur naturally.</p>' },
      { id: 'particles', title: 'Inside an atom',
        text: Sci.table(['Particle', 'Charge', 'Where', 'Mass'], [['proton', '+ (positive)', 'nucleus', 'about 1'], ['neutron', '0 (none)', 'nucleus', 'about 1'],
                ['electron', '− (negative)', 'shells around the nucleus', 'almost none']]) +
              '<p>Nearly all the mass is in the tiny nucleus.</p>' },
      { id: 'numbers', title: 'Atomic number and mass number',
        text: '<p><strong>Atomic number</strong> = protons. It identifies the element. In a neutral atom, electrons = protons.</p>' +
              '<p><strong>Mass number</strong> = protons + neutrons.</p>' +
              '<p style="text-align:center">' + m('{}^{23}_{11}\\text{Na}') + '&emsp;23 is the mass number, 11 the atomic number: 11 protons, 11 electrons, 23 − 11 = 12 neutrons.</p>' },
      { id: 'bohr', title: 'The Bohr model', diagram: { w: 150, h: 150, caption: 'Sodium: 11p and 12n in the nucleus; electrons 2, 8, 1.' },
        draw(d) { SciDia.bohr(d, { p: 11, n: 12 }); },
        text: '<p>Electrons sit in <strong>shells</strong> (energy levels) around the nucleus. For the first 20 elements they fill <strong>2</strong>, then <strong>8</strong>, then <strong>8</strong>, then the rest.</p>' +
              '<p>Sodium has 11 electrons: <strong>2, 8, 1</strong>. The outermost shell is the <strong>valence shell</strong>.</p>' },
      { id: 'table', title: 'Groups and periods', wide: true, diagram: { w: 330, h: 112, caption: 'Metals are shaded: left and centre. Non-metals are on the right.' },
        draw(d) { SciDia.periodic(d, { groups: true, periods: true, shade: true }); },
        text: '<p>Elements are in order of atomic number. Columns are <strong>groups</strong> (1 to 18); rows are <strong>periods</strong>. ' +
              'Metals, which generally conduct thermal energy and electric charge, are on the left and in the centre; non-metals, which generally do not, are on the right.</p>' },
      { id: 'families', title: 'Families of elements',
        text: '<p>Elements in the same group have similar properties.</p>' +
              Sci.table(['Group', 'Family', 'For example'], [['1', 'alkali metals', 'lithium, sodium, potassium'], ['2', 'alkaline earth metals', 'magnesium, calcium'],
                ['17', 'halogens', 'fluorine, chlorine'], ['18', 'noble gases', 'helium, neon, argon']]) },
      { id: 'pattern', title: 'Structure and position',
        text: '<ul><li>The <strong>period</strong> is the number of shells: sodium (2, 8, 1) has 3 shells, period 3.</li>' +
              '<li>The <strong>valence electrons</strong> match the group: 1 for group 1, 2 for group 2, then 3 to 8 for groups 13 to 18.</li>' +
              '<li>Valence electrons take part in bonding: atoms react by transferring or sharing electrons to get a full outer shell.</li></ul>' },
      { id: 'history', title: 'How the ideas developed',
        text: '<ul><li><strong>Dmitri Mendeleev</strong> (late 1800s) organised the table and left gaps, predicting elements not yet discovered.</li>' +
              '<li><strong>Ernest Rutherford</strong>, from Aotearoa New Zealand, found most of an atom’s mass is in a small, positive core: the nucleus.</li>' +
              '<li><strong>Niels Bohr</strong> placed the electrons in shells around it.</li></ul>' +
              '<p>Atomic theory was built by many scientists, refined as evidence grew and agreed by consensus.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: the particles in an atom',
        steps: [
          'Aluminium is ' + m('{}^{27}_{13}\\text{Al}') + '. The bottom number, 13, is the atomic number; the top, 27, is the mass number.',
          'Protons = atomic number = 13. A neutral atom has as many electrons: 13.',
          'Neutrons = mass number − atomic number = 27 − 13 = 14.'
        ],
        result: '13 protons, 14 neutrons, 13 electrons'
      },
      {
        title: 'Example 2: from electrons to the periodic table',
        diagram: { w: 160, h: 160 }, draw(d) { SciDia.bohr(d, { p: 13, n: 14 }); },
        steps: [
          'Aluminium’s 13 electrons fill the shells in turn: 2 in the first, 8 in the second, 3 left for the third. Its arrangement is 2, 8, 3.',
          'Three shells: aluminium is in period 3.',
          'Three valence electrons: group 13 (groups 13 to 18 have 3 to 8).'
        ],
        result: 'Arrangement 2, 8, 3: period 3, group 13'
      }
    ],

    slots: [
      // 1 · The parts of an atom, labelled on a diagram.
      { name: 'Label the atom', learn: 'particles',
        items: [Sci.gen(rng => {
          const e = el(rng.pick([2, 3, 4]));
          const markers = rng.sample(['proton', 'neutron', 'electron', 'shell', 'nucleus'], 4);
          return Sci.label(rng, {
            prompt: `An atom of ${e.name}, drawn much bigger than it is. Name each numbered part.`,
            diagram: { w: 300, h: 214 }, draw: d => SciDia.atomParts(d, e.z, e.n, markers),
            markers, options: ['proton', 'neutron', 'electron', 'shell', 'nucleus'],
            explain: 'Protons (+) and neutrons sit together in the nucleus at the centre. Electrons are in shells around it.'
          });
        })] },

      // 2 · Charges, places and definitions.
      { name: 'Particles and charges', learn: 'particles',
        items: [
          rng => C(rng, { prompt: 'Which particle has a <strong>positive</strong> charge?', right: 'proton', wrong: ['neutron', 'electron', 'the whole atom'], wide: false,
                          explain: 'Protons are positive, electrons negative, and neutrons have no charge. A whole neutral atom has no overall charge.' }),
          rng => C(rng, { prompt: 'Which particle has <strong>no</strong> charge?', right: 'neutron', wrong: ['proton', 'electron', 'nucleus'], wide: false,
                          explain: 'Neutrons are neutral. The nucleus as a whole is positive, because of its protons.' }),
          rng => C(rng, { prompt: 'Where are the electrons in an atom?', right: 'In shells around the nucleus',
                          wrong: ['Inside the nucleus, with the protons', 'Stuck to the outside of each proton', 'Spread evenly through the nucleus'],
                          explain: 'The nucleus holds the protons and neutrons; the electrons are in shells (energy levels) around it.' }),
          rng => C(rng, { prompt: 'Which particles make up almost all the mass of an atom?', right: 'Protons and neutrons', wrong: ['Electrons', 'Protons and electrons', 'Neutrons and electrons'],
                          explain: 'Protons and neutrons have about the same mass; an electron’s mass is tiny by comparison.' }),
          rng => C(rng, { learn: 'atom', prompt: 'What is an element?', right: 'A substance made of only one type of atom',
                          wrong: ['Any substance found in nature', 'Two or more atoms joined together', 'A substance that conducts electricity'],
                          explain: 'An element is made of one type of atom, with its own name and symbol. Atoms of different elements joined together make a compound.' }),
          rng => C(rng, { learn: 'atom', prompt: 'What is an atom?', right: 'The smallest unit of matter that keeps the chemical properties of an element',
                          wrong: ['A particle with a negative charge', 'The centre of a cell', 'A mixture of two elements'],
                          explain: 'Break an element down to a single atom and it still behaves chemically like that element.' })
        ] },

      // 3 · Atomic number gives protons and electrons.
      { name: 'Atomic number', learn: 'numbers',
        items: [Sci.gen((rng, diff) => {
          const e = el(rng.int(1, diff === 'core' ? 12 : 20));
          const k = rng.int(0, 2);
          if (k === 0) return { prompt: `${Name(e)} has atomic number ${e.z}. How many protons are in a ${e.name} atom?`,
            input: { kind: 'number', answer: e.z, width: 70 }, explain: `The atomic number is the number of protons: ${e.z}.` };
          if (k === 1) return { prompt: `${Name(e)} has atomic number ${e.z}. How many electrons does a neutral ${e.name} atom have?`,
            input: { kind: 'number', answer: e.z, width: 70 }, explain: `A neutral atom has as many electrons as protons, and the atomic number is the number of protons: ${e.z}.` };
          return { prompt: `An atom has ${e.z} proton${e.z > 1 ? 's' : ''}. What is its atomic number?`,
            input: { kind: 'number', answer: e.z, width: 70 }, explain: `The atomic number is the number of protons, ${e.z}: the element is ${e.name}.` };
        })] },

      // 4 · Mass number and neutrons, in words and in symbols.
      { name: 'Mass number and neutrons', learn: 'numbers',
        items: [Sci.gen((rng, diff) => {
          const e = el(rng.int(diff === 'core' ? 2 : 3, 20));
          const k = rng.int(0, diff === 'core' ? 1 : 2);
          if (k === 0) return { prompt: `${Name(e)} has atomic number ${e.z} and mass number ${e.A}. How many neutrons are in its nucleus?`,
            input: { kind: 'number', answer: e.n, width: 70 }, explain: `Neutrons = mass number − atomic number = ${e.A} − ${e.z} = ${e.n}.` };
          if (k === 1) return { prompt: `An atom has ${e.z} protons and ${e.n} neutrons. What is its mass number?`,
            input: { kind: 'number', answer: e.A, width: 70 }, explain: `Mass number = protons + neutrons = ${e.z} + ${e.n} = ${e.A}.` };
          return { prompt: `How many neutrons are in the atom ${nuclide(e)}?`,
            input: { kind: 'number', answer: e.n, width: 70 },
            explain: `The top number is the mass number (${e.A}), the bottom the atomic number (${e.z}): ${e.A} − ${e.z} = ${e.n} neutrons.` };
        })] },

      // 5 · Electron arrangement.
      { name: 'Electron arrangement', learn: 'bohr',
        items: [Sci.gen((rng, diff) => {
          const e = el(rng.int(3, diff === 'core' ? 12 : diff === 'hard' ? 18 : 20));
          return Sci.word(rng, {
            prompt: `${Name(e)} has atomic number ${e.z}. Write its electron arrangement, with commas: for example <strong>2, 8, 1</strong>.`,
            answer: arrAnswers(e), placeholder: 'type the arrangement', width: 190,
            hints: ['How many electrons? The same as the atomic number.', 'Fill the first shell with 2, the next with up to 8, then the next with up to 8.'],
            explain: `${e.z} electrons: ${e.shells.map((k, i) => `${k} in shell ${i + 1}`).join(', ')}. The arrangement is ${arr(e)}.`
          });
        })] },

      // 6 · Reading a Bohr diagram.
      { name: 'Read a Bohr diagram', learn: 'bohr',
        items: [Sci.gen(rng => {
          const e = el(rng.int(3, 20));
          const k = rng.int(0, 3);
          const ask = ['What is the atomic number of this atom?', 'What is the mass number of this atom?',
                       'How many valence (outer-shell) electrons does this atom have?', 'Which period of the periodic table is this element in?'][k];
          const ans = [e.z, e.A, e.valence, e.p][k];
          const why = [`It has ${e.z} protons (${e.z}p), so its atomic number is ${e.z}. Count the electrons to check: ${arr(e)}.`,
                       `Protons + neutrons: ${e.z} + ${e.n} = ${e.A}.`,
                       `The outermost shell holds ${e.valence}. (Arrangement ${arr(e)}.)`,
                       `It has ${e.shells.length} shells, so it is in period ${e.p}.`][k];
          return { prompt: ask, diagram: { w: 170, h: 170 }, draw: d => SciDia.bohr(d, { p: e.z, n: e.n }),
                   input: { kind: 'number', answer: ans, width: 70 }, explain: why };
        })] },

      // 7 · Groups and periods on the table.
      { name: 'Groups and periods', learn: 'table',
        items: [Sci.gen(rng => {
          const tests = [
            { ask: 'Which letter is in <strong>group 18</strong>?', ok: e => e.g === 18, why: 'Group 18 is the last column.' },
            { ask: 'Which letter is in <strong>group 1</strong>?', ok: e => e.g === 1, why: 'Group 1 is the first column.' },
            { ask: 'Which letter is in <strong>period 3</strong>?', ok: e => e.p === 3, why: 'Period 3 is the third row.' },
            { ask: 'Which letter is in <strong>period 2</strong>?', ok: e => e.p === 2, why: 'Period 2 is the second row.' },
            { ask: 'Which letter is a <strong>halogen</strong>?', ok: e => e.g === 17, why: 'The halogens are group 17, next to the noble gases.' },
            { ask: 'Which letter is an <strong>alkali metal</strong>?', ok: e => e.g === 1 && e.z > 1, why: 'The alkali metals are group 1 (but not hydrogen).' }
          ];
          const t = rng.pick(tests);
          const good = ELEMENTS.filter(t.ok), bad = ELEMENTS.filter(e => !t.ok(e));
          const right = rng.pick(good);
          // Three others that fail the test, in different places, so no two letters share a cell or a column with the answer.
          const others = rng.sample(bad.filter(e => e.g !== right.g && e.p !== right.p), 3);
          const four = rng.shuffle([right, ...others]);
          // W to Z: no element in the first four periods has these symbols.
          const letters = ['W', 'X', 'Y', 'Z'];
          const marks = {}; four.forEach((e, i) => { marks[e.z] = letters[i]; });
          const ri = four.indexOf(right);
          return {
            prompt: t.ask, diagram: { w: 380, h: 126 }, draw: d => SciDia.periodic(d, { groups: true, periods: true, symbols: true, marks }),
            input: { kind: 'choice', options: letters.map((L, i) => ({ html: L, right: i === ri })), correct: ri, wide: false },
            explain: `${t.why} ${letters[ri]} is ${right.name} (${right.sym}), group ${right.g}, period ${right.p}.`
          };
        })] },

      // 8 · Families.
      { name: 'Families of elements', learn: 'families',
        items: [
          ...[1, 2, 17, 18].map(g => rng => {
            const eg = ELEMENTS.filter(e => e.g === g && e.z > 1).slice(0, 3).map(e => e.name);
            return C(rng, { prompt: `${eg.join(', ')} are all in group ${g}. What is this family called?`,
              right: FAMILY[g], wrong: Object.values(FAMILY).filter(f => f !== FAMILY[g]), wide: false,
              explain: `Group ${g} elements are the ${FAMILY[g]}.` });
          }),
          rng => C(rng, { learn: 'pattern', prompt: 'Why do elements in the same group have similar chemical properties?',
            right: 'Their atoms have the same number of valence (outer-shell) electrons',
            wrong: ['Their atoms have the same number of protons', 'Their atoms have the same mass', 'They were all discovered at the same time'],
            explain: 'Valence electrons are the ones involved in bonding, and every atom in a group has the same number of them.' })
        ] },

      // 9 · Metals and non-metals, from position.
      { name: 'Metals and non-metals', learn: 'table',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these elements. Metals are on the left and in the centre of the periodic table; non-metals are on the right.',
          bins: ['Metal', 'Non-metal'], pick: 6,
          items: [...['lithium (Li)', 'sodium (Na)', 'magnesium (Mg)', 'aluminium (Al)', 'potassium (K)', 'calcium (Ca)', 'iron (Fe)', 'copper (Cu)', 'zinc (Zn)'].map(text => ({ text, bin: 0 })),
                  ...['carbon (C)', 'nitrogen (N)', 'oxygen (O)', 'fluorine (F)', 'neon (Ne)', 'phosphorus (P)', 'sulfur (S)', 'chlorine (Cl)', 'argon (Ar)'].map(text => ({ text, bin: 1 }))],
          explain: 'Metals (left and centre) generally conduct thermal energy and electric charge; non-metals (right) generally do not.'
        })] },

      // 10 · How we know.
      { name: 'How the ideas developed', learn: 'history',
        items: [
          rng => C(rng, { prompt: 'When Mendeleev organised the periodic table, why did he leave gaps?',
            right: 'For elements not yet discovered, whose properties he could then predict',
            wrong: ['Because he ran out of room on the page', 'For elements that had been destroyed', 'To separate the metals from the non-metals'],
            explain: 'Keeping similar elements in the same column meant leaving gaps. He predicted the properties of the missing elements, and they were later found.' }),
          rng => C(rng, { prompt: 'What did Ernest Rutherford discover about the atom?',
            right: 'Most of its mass is in a small, positively charged core', wrong: ['Electrons are arranged in shells', 'Atoms cannot be split into smaller particles', 'Elements can be arranged in groups'],
            explain: 'Rutherford found the nucleus: tiny, positive, and holding almost all the mass. Bohr then placed the electrons in shells.' }),
          rng => C(rng, { prompt: 'In the Bohr model, how are an atom’s electrons arranged?',
            right: 'In energy levels (shells) around the nucleus', wrong: ['Mixed evenly through a positive ball', 'Inside the nucleus', 'In a single ring, whatever the element'],
            explain: 'Bohr described a positive nucleus with electrons in shells, or energy levels, around it.' }),
          rng => C(rng, { learn: 'atom', prompt: 'How many elements are known, and how many of those occur naturally?',
            right: '118 known; 94 occur naturally', wrong: ['92 known; all occur naturally', '118 known; all occur naturally', '1000 known; 118 occur naturally'],
            explain: '118 elements are known. 94 occur naturally; the rest have only been made by scientists.' }),
          rng => C(rng, { prompt: 'Why has atomic theory changed over time?',
            right: 'New evidence led scientists to refine the models, and they reached agreement', wrong: ['Atoms have changed since the 1800s', 'Each scientist chose the model they liked best', 'Older scientists made up their results'],
            explain: 'Atomic theory has been refined as new evidence appeared, and is accepted through scientific consensus.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Which element?', learn: 'numbers',
        items: [Sci.gen(rng => {
          const e = el(rng.int(3, 20));
          const near = [e.n, e.z - 1, e.z + 1, e.A - e.z - 1, e.z + 2].filter(z => z >= 1 && z <= 20 && z !== e.z);
          const wrong = [...new Set(near)].slice(0, 3).map(z => Name(el(z)));
          while (wrong.length < 3) wrong.push(Name(el(rng.intExcept(1, 20, [e.z, ...wrong.map(w => ELEMENTS.find(x => Name(x) === w).z)]))));
          return C(rng, { prompt: `An atom has mass number ${e.A} and ${e.n} neutrons. Which element is it?`, right: Name(e), wrong, wide: false,
            explain: `Protons = ${e.A} − ${e.n} = ${e.z}. Atomic number ${e.z} is ${e.name}. (The neutron number does not identify an element.)` });
        })] },

      { challenge: 'only', name: 'Arrangement to position', learn: 'pattern',
        items: [Sci.gen(rng => {
          const e = el(rng.int(5, 18));
          const right = `Group ${e.g}, period ${e.p}`;
          const cands = [`Group ${e.valence}, period ${e.p}`, `Group ${e.g}, period ${e.shells.length + 1}`, `Group ${e.p}, period ${e.g}`,
                         `Group ${e.g === 18 ? 17 : e.g + 1}, period ${e.p}`, `Group ${e.g}, period ${e.valence}`];
          const wrong = [...new Set(cands)].filter(w => w !== right).slice(0, 3);
          return C(rng, { prompt: `An atom has the electron arrangement <strong>${arr(e)}</strong>. Where is it in the periodic table?`, right, wrong, wide: false,
            explain: `${e.shells.length} shells: period ${e.p}. ${e.valence} valence electrons: group ${e.g}${e.g >= 13 ? ' (groups 13 to 18 have 3 to 8)' : ''}. It is ${e.name}.` });
        })] },

      { challenge: 'only', name: 'Predict from the table', learn: 'families',
        items: [
          rng => C(rng, { prompt: 'Lithium, sodium and potassium (group 1) are soft metals that react with water, making hydrogen and an alkaline solution. Rubidium is the next element down group 1. Predict how it behaves.',
            right: 'It is a soft metal that also reacts with water, making hydrogen', wrong: ['It is an unreactive gas', 'It is a non-metal that does not conduct electricity', 'It does not react with water, because its atoms are heavier'],
            explain: 'Elements in the same group have similar properties, so rubidium behaves like the other alkali metals. Data confirms it: it reacts with water even more vigorously.' }),
          rng => C(rng, { prompt: 'Helium, neon and argon (group 18) are colourless gases that hardly react. Krypton is the next element down group 18. Predict its properties.',
            right: 'A colourless gas that hardly reacts', wrong: ['A shiny metal that conducts electricity', 'A reactive solid like sodium', 'A coloured liquid that reacts with water'],
            explain: 'Krypton is a noble gas like the others in group 18: colourless and very unreactive.' }),
          rng => C(rng, { prompt: 'Bromine is in group 17, below chlorine. What would you predict about bromine?',
            right: 'It is a non-metal that reacts in similar ways to chlorine', wrong: ['It is a metal that reacts like sodium', 'It is unreactive, like argon', 'It conducts electricity well, like copper'],
            explain: 'Bromine is a halogen, like fluorine and chlorine above it, so it reacts in similar ways.' }),
          rng => C(rng, { prompt: 'An unknown element is shiny and conducts electricity and thermal energy well. Where in the periodic table is it most likely to be?',
            right: 'On the left or in the centre', wrong: ['In group 18', 'On the far right', 'In group 17'],
            explain: 'Those are the properties of a metal, and metals are on the left and in the centre.' })
        ] },

      { challenge: 'only', name: 'Full shells', learn: 'pattern',
        items: [
          rng => C(rng, { prompt: 'Why are the noble gases (group 18) so unreactive?',
            right: 'Their valence shell is already full', wrong: ['They have no electrons', 'Their atoms are too small to react', 'They have no protons in the nucleus'],
            explain: 'Atoms react to reach a full valence shell. Noble gases already have one, so they have nothing to gain by reacting.' }),
          rng => C(rng, { prompt: 'Sodium (2, 8, 1) reacts by losing one electron. Why does losing it make the atom more stable?',
            right: 'What is left has a full outer shell: 2, 8', wrong: ['It gains a proton at the same time', 'Electrons make an atom heavier', 'It then has the same mass as neon'],
            explain: 'Losing the single valence electron leaves the full shells 2, 8, a more stable state.' }),
          rng => C(rng, { prompt: 'Chlorine has the arrangement 2, 8, 7. How is it most likely to react?',
            right: 'By gaining (or sharing) one electron to fill its outer shell', wrong: ['By losing all seven outer electrons', 'By losing a proton', 'It does not react: its shell is full'],
            explain: 'One more electron makes the outer shell 8, which is full. Atoms react by transferring or sharing electrons to reach a full shell.' }),
          rng => C(rng, { prompt: 'Which electrons take part when atoms bond together?',
            right: 'The valence electrons, in the outermost shell', wrong: ['The electrons in the first shell', 'All the electrons equally', 'None: bonding uses protons'],
            explain: 'Only the outermost (valence) electrons are involved in chemical bonding.' })
        ] },

      { challenge: 'only', name: 'Models of the atom', learn: 'history',
        items: [
          rng => C(rng, { prompt: 'Which of these is a <strong>limitation</strong> of a Bohr diagram, not a strength?',
            right: 'It is not to scale: the real nucleus is about 100 000 times smaller than the atom', wrong: ['It shows how many electrons are in each shell', 'It shows the number of protons and neutrons', 'It shows which electrons are valence electrons'],
            explain: 'The other three are what Bohr diagrams are good for. No diagram on a page can show a nucleus that small inside a visible atom.' }),
          rng => C(rng, { prompt: 'Rutherford’s team fired tiny positive particles at thin gold foil. Most went straight through, but a very few bounced back. What did this show?',
            right: 'An atom is mostly empty space, with a tiny, dense, positive nucleus', wrong: ['Atoms are solid balls packed tightly together', 'Electrons are arranged in shells', 'Gold atoms have no charge at all'],
            explain: 'Most particles met nothing; the few that bounced back had hit something small, heavy and positive: the nucleus.' }),
          rng => C(rng, { prompt: 'Why do scientists and teachers still use more than one model of the atom?',
            right: 'Each model explains some things well and others poorly, so the best one depends on the question', wrong: ['Nobody knows which one is right, so any will do', 'The newest model is always too hard to draw', 'Each country uses its own model'],
            explain: 'A Bohr diagram is good for bonding and the periodic table; other models are better for other questions. Knowing a model’s limits is part of using it.' })
        ] },

      { challenge: 'only', name: 'Predicting elements', learn: 'history',
        items: [
          rng => C(rng, { prompt: 'Mendeleev left a gap below silicon and predicted the properties of the missing element. When germanium was discovered in 1886, its properties matched his predictions closely. Why did this matter?',
            right: 'A correct prediction was strong evidence that his way of organising the elements was right', wrong: ['It proved that silicon and germanium are the same element', 'It showed that all elements had now been found', 'It meant the table no longer needed atomic numbers'],
            explain: 'A scientific idea that predicts something not yet observed, and is then confirmed, gains a lot of support.' }),
          rng => C(rng, { prompt: 'Protons and neutrons have about the same mass; an electron has almost none. Why does the mass number count only protons and neutrons?',
            right: 'The electrons add almost nothing to the mass', wrong: ['Electrons are not part of the atom', 'Electrons have a negative mass that cancels out', 'The mass number is only about the charge'],
            explain: 'Nearly all of an atom’s mass is in its nucleus, so counting the protons and neutrons gives its mass number.' })
        ] },

      { challenge: 'only', name: 'Extension: elements in short supply', learn: 'history',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Helium cools the magnets in MRI scanners. Helium released into the air rises and escapes into space. Why is wasting helium (for example in party balloons) a problem?',
            right: 'Once released it is lost from Earth, and the supply underground is limited', wrong: ['Helium is poisonous to breathe', 'Helium makes the ozone layer thinner', 'Helium turns into a different element in the air'],
            explain: 'Helium is collected from natural gas underground, and once it escapes it is gone. Some uses, such as MRI, have no easy substitute.' }),
          rng => C(rng, { tag: EXT, prompt: 'Phone and electric-car batteries use lithium and cobalt, which are hard to mine. Which practice would most help stop them running short?',
            right: 'Recycling old batteries to recover the metals', wrong: ['Throwing old batteries in the landfill', 'Making bigger batteries', 'Charging phones less often'],
            explain: 'Recycling returns the metals to use instead of losing them in landfill, so less has to be mined.' })
        ] }
    ]
  });


  // ═══ 9.3 Electric circuits ════════════════════════════════════════════════
  // Knowledge: Electric charge and energy transfer in circuits (Matter,
  // interactions and energy, Year 9, p. 26).
  // Practices: build and test series and parallel circuits; measure current
  // and voltage; predict how adding or removing components affects current;
  // classify conductors and insulators; how resistance changes current;
  // conventions for reporting; electricity generation in New Zealand.

  const lamp = (label, o) => Object.assign({ type: 'lamp', label }, o || {});
  const ammeter = (label, o) => Object.assign({ type: 'ammeter', label }, o || {});
  const cellOf = (v, o) => Object.assign({ type: v > 2 ? 'battery' : 'cell', label: v + ' V' }, o || {});
  /** A current in amps, as a reading: 0.3 A. */
  const amps = x => num(x) + ' A';
  /** n currents in steps of `step`, between lo and hi. */
  const currents = (rng, n, step, lo, hi) => Array.from({ length: n }, () => +(step * rng.int(Math.round(lo / step), Math.round(hi / step))).toFixed(2));

  /** Devices and how much of each 100 J they turn into the useful form. */
  const DEVICES = [
    { what: 'An LED bulb', useful: 'light', wasted: 'thermal', pct: [30, 50] },
    { what: 'An old filament bulb', useful: 'light', wasted: 'thermal', pct: [5, 10] },
    { what: 'An electric motor', useful: 'kinetic', wasted: 'thermal and sound', pct: [60, 85] },
    { what: 'A phone charger', useful: 'electrical (to the battery)', wasted: 'thermal', pct: [70, 90] },
    { what: 'A loudspeaker', useful: 'sound', wasted: 'thermal', pct: [5, 20] }
  ];

  Sci.topic({
    id: 's9e3', unit: 'electricity-forces',
    title: 'Electric Circuits',
    blurb: 'Charge, current, voltage and resistance; series and parallel circuits; and where the energy goes.',
    hint: 'Current (A) is the rate charge flows; voltage (V) is the difference in electric potential that pushes it; resistance (Ω) limits it. ' +
          'Series: one path, the same current everywhere, and one break stops it all. Parallel: several paths, the same voltage across each, ' +
          'and the branch currents add up to the total.',

    learn: [
      { id: 'charge', title: 'Electric charge',
        text: '<p>Charge can be positive or negative. <strong>Like</strong> charges repel; <strong>unlike</strong> charges attract.</p>' +
              '<p>Charge can build up on a surface (<strong>static</strong> electricity) or move through a material. Around a charged object is an <strong>electric field</strong>: a region where a force acts on other charges.</p>' },
      { id: 'quantities', title: 'Current, voltage, resistance',
        text: Sci.table(['Quantity', 'What it is', 'Unit'], [['current', 'the rate charge moves through a conductor', 'ampere, A'],
                ['voltage', 'the difference in electric potential that makes charge move', 'volt, V'], ['resistance', 'how much a component limits the movement of charge', 'ohm, Ω']]) },
      { id: 'symbols', title: 'Circuit symbols', diagram: { w: 300, h: 130 },
        draw(d) { SciDia.circuit(d, { kind: 'series', loop: [lamp('lamp'), { type: 'resistor', label: 'resistor' }, { type: 'motor', label: 'motor' }],
                                      supply: [{ type: 'switch', label: 'switch' }, cellOf(1.5, { label: 'cell' }), ammeter('ammeter')] }); },
        text: '<p>A circuit needs a <strong>continuous path</strong>. Two or more cells joined make a <strong>battery</strong>.</p>' },
      { id: 'series', title: 'Series circuits', diagram: { w: 280, h: 130 },
        draw(d) { SciDia.circuit(d, { kind: 'series', loop: [lamp('L1'), lamp('L2')], supply: [cellOf(3)] }); },
        text: '<ul><li>One path, so the <strong>current is the same everywhere</strong>.</li><li>Each component added increases the total resistance, so the current falls.</li>' +
              '<li>A single break stops all the current.</li></ul>' },
      { id: 'parallel', title: 'Parallel circuits', diagram: { w: 280, h: 160 },
        draw(d) { SciDia.circuit(d, { kind: 'parallel', branches: [[lamp('L1')], [lamp('L2')]], supply: [cellOf(3)] }); },
        text: '<ul><li>Several paths. The <strong>voltage is the same</strong> across each branch.</li><li>The branch currents <strong>add up</strong> to the total current.</li>' +
              '<li>A break in one branch does not stop the others.</li></ul>' },
      { id: 'meters', title: 'Measuring',
        text: '<ul><li>An <strong>ammeter</strong> measures current. It goes <strong>in</strong> the path, in series.</li>' +
              '<li>A <strong>voltmeter</strong> measures voltage. It goes <strong>across</strong> a component, in parallel with it.</li></ul>' },
      { id: 'materials', title: 'Conductors and resistance',
        text: '<p><strong>Conductors</strong> (metals, graphite) let charge move; <strong>insulators</strong> (plastic, rubber, glass, dry wood) restrict it.</p>' +
              '<p>A <strong>resistor</strong> has increased resistance. More resistance, such as a longer wire, means less current.</p>' },
      { id: 'energy', title: 'Energy in circuits', diagram: { w: 300, h: 150, caption: 'A filament bulb: most of the energy is wasted as thermal energy.' },
        draw(d) { SciDia.sankey(d, { total: 100, useful: 10, wasted: 90, labels: ['100 J electrical', '10 J light', '90 J thermal'] }); },
        text: '<p>Energy, in <strong>joules (J)</strong>, is transferred to components as charge moves. It is conserved, but transfers are never fully efficient: some always becomes thermal energy, lost from the system.</p>' },
      { id: 'generation', title: 'Generating electricity',
        text: '<p><strong>Turbines</strong> turn generators: driven by falling water (hydro), steam (geothermal) or wind. <strong>Solar panels</strong> transfer light energy straight to electrical energy. ' +
              'In Aotearoa New Zealand, more than half of our electricity comes from hydro.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: currents in a parallel circuit',
        diagram: { w: 280, h: 180 },
        draw(d) { SciDia.circuit(d, { kind: 'parallel', branches: [[lamp('L1'), ammeter('0.2 A')], [lamp('L2'), ammeter('0.3 A')]], supply: [ammeter('?', { unknown: true }), cellOf(3)] }); },
        steps: ['Each branch is a separate path; the charge splits between them.', 'The total current is the sum of the branch currents: 0.2 + 0.3 = 0.5 A.'],
        result: 'The main ammeter reads 0.5 A'
      },
      {
        title: 'Example 2: where the energy goes',
        diagram: { w: 300, h: 150 },
        draw(d) { SciDia.sankey(d, { total: 100, useful: 40, wasted: 60, labels: ['100 J electrical', '40 J light', '? J thermal'], unknown: 2 }); },
        steps: ['An LED bulb is given 100 J of electrical energy and gives out 40 J of light.', 'Energy is conserved, so the rest is transferred as thermal energy: 100 − 40 = 60 J.'],
        result: '60 J is wasted as thermal energy'
      }
    ],

    slots: [
      // 1 · Quantities and units.
      { name: 'Current, voltage and resistance', learn: 'quantities',
        items: [
          rng => C(rng, { prompt: 'What is the unit of electric <strong>current</strong>?', right: 'ampere (A)', wrong: ['volt (V)', 'ohm (Ω)', 'joule (J)'], wide: false,
                          explain: 'Current is measured in amperes (amps), A.' }),
          rng => C(rng, { prompt: 'What is the unit of <strong>voltage</strong>?', right: 'volt (V)', wrong: ['ampere (A)', 'ohm (Ω)', 'newton (N)'], wide: false,
                          explain: 'Voltage is measured in volts, V, named after Alessandro Volta.' }),
          rng => C(rng, { prompt: 'What is the unit of <strong>resistance</strong>?', right: 'ohm (Ω)', wrong: ['volt (V)', 'ampere (A)', 'watt (W)'], wide: false,
                          explain: 'Resistance is measured in ohms, Ω.' }),
          rng => C(rng, { prompt: 'What is electric current?', right: 'The rate at which charge moves through a conductor',
                          wrong: ['The amount of energy stored in a battery', 'How much a component slows the charge', 'The push from the battery'],
                          explain: 'Current is the rate of flow of charge. The push is the voltage; slowing it is resistance.' }),
          rng => C(rng, { prompt: 'What does the voltage of a cell do in a circuit?', right: 'It is the difference in electric potential that makes charge move',
                          wrong: ['It limits how much charge can move', 'It is the number of electrons in the wire', 'It measures how fast the electrons travel'],
                          explain: 'Voltage is the difference in electric potential between two points; it is what makes charge move.' }),
          rng => C(rng, { prompt: 'What is resistance?', right: 'How much a material or component limits the movement of charge',
                          wrong: ['The energy given to each charge', 'The rate at which charge moves', 'The charge stored on a surface'],
                          explain: 'Resistance limits current. A resistor is a component with increased resistance.' })
        ] },

      // 2 · Charge and fields.
      { name: 'Electric charge', learn: 'charge',
        items: [
          rng => C(rng, { prompt: 'Two balloons are both rubbed on a wool jersey, so they have the same charge. When hung side by side, they…',
            right: 'push each other away', wrong: ['pull towards each other', 'stick together', 'have no effect on each other'], wide: false,
            explain: 'Like charges repel.' }),
          rng => C(rng, { prompt: 'A rubbed plastic comb picks up tiny pieces of paper. Which statement explains this?',
            right: 'Charge has built up on the comb, and charges attract', wrong: ['The comb has become magnetic', 'The paper is made of metal', 'Rubbing made the comb sticky'],
            explain: 'Charge has built up on the comb’s surface: static electricity. It attracts charges in the paper.' }),
          rng => C(rng, { prompt: 'What is an electric field?', right: 'A region around a charged object where a force acts on other charges',
            wrong: ['A place where electricity is generated', 'The wire inside a circuit', 'An area with no charge at all'],
            explain: 'A charged object has an electric field around it; another charge in that field feels a force.' }),
          rng => C(rng, { prompt: 'A positive charge and a negative charge are brought close together. They…',
            right: 'attract', wrong: ['repel', 'cancel out and disappear', 'do nothing'], wide: false, explain: 'Unlike charges attract.' })
        ] },

      // 3 · Conductors and insulators.
      { name: 'Conductors and insulators', learn: 'materials',
        items: [rng => Sci.sort(rng, {
          prompt: 'You test each material in a simple circuit with a lamp. Sort them: does the lamp light?',
          bins: ['Conductor (lamp lights)', 'Insulator (lamp stays off)'], pick: 6,
          items: [...['copper wire', 'aluminium foil', 'a steel paperclip', 'a brass key', 'graphite pencil lead', 'a silver ring'].map(text => ({ text, bin: 0 })),
                  ...['a plastic ruler', 'a rubber band', 'a glass marble', 'dry wood', 'a cotton thread', 'paper'].map(text => ({ text, bin: 1 }))],
          explain: 'Metals, and graphite, are conductors: they let charge move. Plastic, rubber, glass, dry wood, cotton and paper are insulators.'
        })] },

      // 4 · Series or parallel?
      { name: 'Series or parallel?', learn: 'parallel',
        items: [Sci.gen(rng => {
          const par = rng.chance(), n = rng.int(2, 3);
          const ls = Array.from({ length: n }, (_, i) => lamp('L' + (i + 1)));
          const spec = par ? { kind: 'parallel', branches: ls.map(l => [l]), supply: [cellOf(rng.pick([1.5, 3, 6]))] }
                           : { kind: 'series', loop: ls, supply: [cellOf(rng.pick([1.5, 3, 6]))] };
          return C(rng, { prompt: `How are the ${n} lamps connected?`, diagram: { w: 280, h: par ? 170 : 120 }, draw: d => SciDia.circuit(d, spec),
            right: par ? 'In parallel' : 'In series', wrong: [par ? 'In series' : 'In parallel'], keepOrder: true, wide: false,
            explain: par ? 'Each lamp is on its own branch: there are several paths for the current. That is parallel.'
                         : 'There is only one path, through every lamp in turn. That is series.' });
        })] },

      // 5 · A break.
      { name: 'When a lamp breaks', learn: 'series',
        items: [Sci.gen(rng => {
          const par = rng.chance(), n = rng.int(2, 3), b = rng.int(1, n);
          const ls = Array.from({ length: n }, (_, i) => lamp('L' + (i + 1)));
          const spec = par ? { kind: 'parallel', branches: ls.map(l => [l]), supply: [cellOf(3)] } : { kind: 'series', loop: ls, supply: [cellOf(3)] };
          return C(rng, { prompt: `The filament in lamp L${b} breaks. What happens to the other lamp${n > 2 ? 's' : ''}?`,
            diagram: { w: 280, h: par ? 170 : 120 }, draw: d => SciDia.circuit(d, spec), learn: par ? 'parallel' : 'series',
            right: n > 2 ? (par ? 'They stay lit' : 'They all go out') : (par ? 'It stays lit' : 'It goes out'),
            wrong: n > 2 ? [par ? 'They all go out' : 'They stay lit', 'They get much brighter', 'Only the lamp next to it goes out']
                         : [par ? 'It goes out' : 'It stays lit', 'It gets much brighter', 'It flickers on and off'],
            explain: par ? `This is a parallel circuit: the other branches are still complete paths, so their lamps stay lit.`
                         : `This is a series circuit: the break stops the current in the only path, so every lamp goes out.` });
        })] },

      // 6 · Current is the same all round a series circuit.
      { name: 'Current in a series circuit', learn: 'series',
        items: [Sci.gen((rng, diff) => {
          const I = currents(rng, 1, diff === 'core' ? 0.1 : 0.05, 0.1, 0.8)[0];
          const spec = { kind: 'series', loop: [lamp('L1'), ammeter('A2: ?', { unknown: true }), rng.chance() ? lamp('L2') : { type: 'resistor', label: 'R' }],
                         supply: [ammeter('A1: ' + amps(I)), cellOf(rng.pick([3, 4.5, 6]))] };
          return { prompt: 'Ammeter A1 reads ' + amps(I) + '. What does A2 read?', diagram: { w: 300, h: 130 }, draw: d => SciDia.circuit(d, spec),
                   input: { kind: 'number', answer: I, tol: 0.001, decimal: true, suffix: 'A', width: 70 },
                   explain: `A series circuit has one path, so the current is the same everywhere: ${amps(I)}.` };
        })] },

      // 7 · Branch currents add up.
      { name: 'Current in a parallel circuit', learn: 'parallel',
        items: [Sci.gen((rng, diff) => {
          const step = diff === 'core' ? 0.1 : 0.05;
          const [a, b] = currents(rng, 2, step, 0.1, 0.6);
          const tot = +(a + b).toFixed(2);
          const findBranch = diff !== 'core' && rng.chance();
          const spec = { kind: 'parallel',
            branches: [[lamp('L1'), ammeter(amps(a))], [lamp('L2'), ammeter(findBranch ? '?' : amps(b), { unknown: findBranch })]],
            supply: [ammeter(findBranch ? amps(tot) : '?', { unknown: !findBranch }), cellOf(rng.pick([1.5, 3]))] };
          return { prompt: findBranch ? 'What is the current through lamp L2?' : 'What does the ammeter in the main circuit, next to the supply, read?',
                   diagram: { w: 280, h: 180 }, draw: d => SciDia.circuit(d, spec),
                   input: { kind: 'number', answer: findBranch ? b : tot, tol: 0.001, decimal: true, suffix: 'A', width: 70 },
                   explain: findBranch ? `The branch currents add up to the total, so L2 carries ${num(tot)} − ${num(a)} = ${num(b)} A.`
                                       : `The branch currents add up to the total: ${num(a)} + ${num(b)} = ${num(tot)} A.` };
        })] },

      // 8 · Voltage is the same across parallel branches.
      { name: 'Voltage in a parallel circuit', learn: 'parallel',
        items: [Sci.gen(rng => {
          const V = rng.pick([1.5, 3, 4.5, 6, 9]);
          const askCell = rng.chance();
          const spec = { kind: 'parallel', branches: [[lamp('L1', { volt: askCell ? V + ' V' : '?', voltUnknown: !askCell })], [lamp('L2')]],
                         supply: [cellOf(V, askCell ? { label: '? V', unknown: true } : {})] };
          return { prompt: askCell ? 'The voltmeter across L1 reads ' + V + ' V. What is the voltage of the battery?' : 'What does the voltmeter across lamp L1 read?',
                   diagram: { w: 280, h: 190 }, draw: d => SciDia.circuit(d, spec),
                   input: { kind: 'number', answer: V, tol: 0.001, decimal: true, suffix: 'V', width: 70 },
                   explain: `In a parallel circuit the voltage across each branch is the same as the supply: ${V} V.` };
        })] },

      // 9 · Meters.
      { name: 'Ammeters and voltmeters', learn: 'meters',
        items: [
          rng => C(rng, { prompt: 'How is an ammeter connected to measure the current through a lamp?', right: 'In series, in the same path as the lamp',
            wrong: ['In parallel, across the lamp', 'Anywhere outside the circuit', 'Between the two ends of the battery only'],
            explain: 'The current has to flow through an ammeter, so it goes in series.' }),
          rng => C(rng, { prompt: 'How is a voltmeter connected to measure the voltage across a lamp?', right: 'In parallel, across the lamp',
            wrong: ['In series, in the same path as the lamp', 'Instead of the lamp', 'Only next to the battery'],
            explain: 'A voltmeter compares two points, so it is connected across the component, in parallel.' }),
          Sci.gen(rng => {
            const names = { lamp: 'a lamp', resistor: 'a resistor', motor: 'a motor', switch: 'a switch', ammeter: 'an ammeter', voltmeter: 'a voltmeter' };
            const t = rng.pick(Object.keys(names));
            const others = rng.sample(['lamp', 'resistor', 'motor'].filter(x => x !== t), 2).map(type => ({ type }));
            const loop = rng.shuffle([{ type: t, label: 'X' }, ...others]);
            return C(rng, { learn: 'symbols', prompt: 'What is component X?', diagram: { w: 280, h: 120 },
              draw: d => SciDia.circuit(d, { kind: 'series', loop, supply: [cellOf(3)] }),
              right: names[t], wrong: rng.sample(Object.values(names).filter(v => v !== names[t]), 3), wide: false,
              explain: { lamp: 'A circle with a cross is a lamp.', resistor: 'An empty rectangle is a resistor.', motor: 'A circle with M is a motor.',
                         switch: 'A gap with a hinged line is a switch.', ammeter: 'A circle with A is an ammeter, which measures current.',
                         voltmeter: 'A circle with V is a voltmeter, which measures voltage.' }[t] });
          }),
          rng => C(rng, { prompt: 'Which instrument would you use to measure the current in a circuit?', right: 'An ammeter', wrong: ['A voltmeter', 'A thermometer', 'A stopwatch'], wide: false,
            explain: 'Ammeters measure current in amperes.' }),
          rng => C(rng, { prompt: 'Which instrument would you use to measure the voltage across a resistor?', right: 'A voltmeter', wrong: ['An ammeter', 'A balance', 'A ruler'], wide: false,
            explain: 'Voltmeters measure voltage in volts.' })
        ] },

      // 10 · Predicting changes.
      { name: 'Adding and removing components', learn: 'series',
        items: [
          rng => C(rng, { prompt: 'A series circuit has a cell and one lamp. A second, identical lamp is added in series. What happens to the current?',
            right: 'It decreases, because the total resistance increases', wrong: ['It increases, because there are more lamps', 'It stays the same', 'It stops completely'],
            explain: 'Each component added in series increases the total resistance, so less current flows, and both lamps are dimmer than one on its own.' }),
          rng => C(rng, { learn: 'materials', prompt: 'A lamp is connected with a much longer piece of thin wire. What happens to the current?',
            right: 'It decreases', wrong: ['It increases', 'It stays exactly the same', 'It reverses direction'], wide: false,
            explain: 'A longer wire has more resistance, and more resistance means less current.' }),
          rng => C(rng, { learn: 'materials', prompt: 'A resistor is added in series with a lamp. What happens to the lamp?',
            right: 'It gets dimmer, because less current flows', wrong: ['It gets brighter', 'It stays the same brightness', 'It goes out completely'],
            explain: 'The resistor limits the current, so less current flows through the lamp and it is dimmer.' }),
          rng => C(rng, { learn: 'parallel', prompt: 'A lamp is lit by a cell. A second, identical lamp is added in parallel. How bright is the first lamp now?',
            right: 'As bright as before', wrong: ['Dimmer', 'Brighter', 'It goes out'], wide: false,
            explain: 'Each parallel branch has the full voltage of the cell across it, so the first lamp is unchanged. The cell now supplies more current in total.' })
        ] },

      // 11 · Energy transfer diagrams.
      { name: 'Where the energy goes', learn: 'energy',
        items: [Sci.gen(rng => {
          const dv = rng.pick(DEVICES);
          const total = rng.pick([50, 100, 200, 500]);
          const useful = Math.round(total * rng.int(dv.pct[0], dv.pct[1]) / 100 / 5) * 5 || 5;
          const wasted = total - useful;
          const askWaste = rng.chance();
          const labels = [`${total} J electrical`, askWaste ? `${useful} J ${dv.useful.split(' ')[0]}` : `? J ${dv.useful.split(' ')[0]}`,
                          askWaste ? `? J ${dv.wasted}` : `${wasted} J ${dv.wasted}`];
          return { prompt: `${dv.what} is supplied with ${total} J of electrical energy. ` +
                           (askWaste ? `How much is wasted as ${dv.wasted} energy?` : `How much is transferred usefully, as ${dv.useful} energy?`),
                   diagram: { w: 300, h: 150 }, draw: d => SciDia.sankey(d, { total, useful, wasted, labels, unknown: askWaste ? 2 : 1 }),
                   input: { kind: 'number', answer: askWaste ? wasted : useful, suffix: 'J', width: 80 },
                   explain: `Energy is conserved: what goes in all comes out. ${total} − ${askWaste ? useful : wasted} = ${askWaste ? wasted : useful} J.` };
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Three branches', learn: 'parallel',
        items: [Sci.gen(rng => {
          const [a, b, c] = currents(rng, 3, 0.05, 0.1, 0.5);
          const tot = +(a + b + c).toFixed(2);
          const spec = { kind: 'parallel', branches: [[lamp('L1'), ammeter(amps(a))], [lamp('L2'), ammeter('?', { unknown: true })], [lamp('L3'), ammeter(amps(c))]],
                         supply: [ammeter(amps(tot)), cellOf(3)] };
          return { prompt: 'What is the current through lamp L2?', diagram: { w: 280, h: 220 }, draw: d => SciDia.circuit(d, spec),
                   input: { kind: 'number', answer: b, tol: 0.001, decimal: true, suffix: 'A', width: 70 },
                   explain: `The branches add up to the total: ${num(tot)} − ${num(a)} − ${num(c)} = ${num(b)} A.` };
        })] },

      { challenge: 'only', name: 'Voltage in a series circuit', learn: 'energy',
        items: [Sci.gen(rng => {
          const V = rng.pick([3, 4.5, 6, 9, 12]);
          const v1 = +(0.5 * rng.int(1, V * 2 - 1)).toFixed(1), v2 = +(V - v1).toFixed(1);
          const spec = { kind: 'series', loop: [lamp('L1', { volt: v1 + ' V' }), lamp('L2', { volt: '?', voltUnknown: true })], supply: [cellOf(V)] };
          return { prompt: `The battery gives ${V} V. The voltmeter across L1 reads ${v1} V. What does the voltmeter across L2 read?`,
                   diagram: { w: 300, h: 140 }, draw: d => SciDia.circuit(d, spec),
                   input: { kind: 'number', answer: v2, tol: 0.001, decimal: true, suffix: 'V', width: 70 },
                   explain: `In series, the components share the battery’s voltage: the energy each charge carries is shared between them. ${V} − ${v1} = ${num(v2)} V.` };
        })] },

      { challenge: 'only', name: 'Switches', learn: 'parallel',
        items: [Sci.gen(rng => {
          const three = rng.chance();
          const s1Open = rng.chance(0.7), s2Open = rng.chance(0.25);
          const branches = [[lamp('L1')], [{ type: 'switch', label: 'S1', open: s1Open }, lamp('L2')]];
          if (three) branches.push([lamp('L3')]);
          const spec = { kind: 'parallel', branches, supply: [{ type: 'switch', label: 'S2', open: s2Open }, cellOf(3)] };
          const lit = s2Open ? [] : ['L1', ...(s1Open ? [] : ['L2']), ...(three ? ['L3'] : [])];
          const say = l => (l.length === 0 ? 'None of them' : l.length === (three ? 3 : 2) ? 'All of them' : l.join(' and ') + ' only');
          const all = three ? [[], ['L1', 'L3'], ['L1', 'L2', 'L3'], ['L2'], ['L1']] : [[], ['L1'], ['L1', 'L2'], ['L2']];
          const right = say(lit);
          const wrong = [...new Set(all.map(say))].filter(w => w !== right).slice(0, 3);
          return C(rng, { prompt: `S1 is ${s1Open ? 'open' : 'closed'} and S2 is ${s2Open ? 'open' : 'closed'}. Which lamps are lit?`,
            diagram: { w: 280, h: three ? 220 : 180 }, draw: d => SciDia.circuit(d, spec), right, wrong, wide: false,
            explain: s2Open ? 'S2 is in the main circuit, next to the battery: opening it breaks the path for every branch.'
                            : `S2 is closed, so the main circuit is complete. S1 only controls L2’s branch${s1Open ? ', so L2 is off and the other branches stay lit' : ', and it is closed too'}.` });
        })] },

      { challenge: 'only', name: 'Efficiency', learn: 'energy',
        items: [Sci.gen(rng => {
          const dv = rng.pick(DEVICES);
          const total = rng.pick([20, 40, 50, 200, 400]);
          const pct = rng.int(Math.ceil(dv.pct[0] / 5), Math.floor(dv.pct[1] / 5)) * 5;
          const useful = total * pct / 100;
          return { prompt: `${dv.what} transfers ${num(useful)} J of every ${total} J of electrical energy usefully, as ${dv.useful} energy. What is its efficiency?`,
                   diagram: { w: 300, h: 150 }, draw: d => SciDia.sankey(d, { total, useful, wasted: total - useful, labels: [`${total} J electrical`, `${num(useful)} J ${dv.useful.split(' ')[0]}`, `${num(total - useful)} J ${dv.wasted}`] }),
                   input: { kind: 'number', answer: pct, suffix: '%', width: 70 },
                   explain: `Efficiency = useful energy out ÷ energy in × 100 = ${num(useful)} ÷ ${total} × 100 = ${pct}%. The rest is wasted, mostly as thermal energy.` };
        })] },

      { challenge: 'only', name: 'Planning a fair test', learn: 'materials',
        items: [
          rng => C(rng, { prompt: 'Ana investigates how the length of a wire affects the current through it. What is the <strong>independent</strong> variable (the one she changes)?',
            right: 'The length of the wire', wrong: ['The current', 'The voltage of the cell', 'The thickness of the wire'], wide: false,
            explain: 'The independent variable is the one she changes on purpose: the length.' }),
          rng => C(rng, { prompt: 'Ana investigates how the length of a wire affects the current through it. What is the <strong>dependent</strong> variable (the one she measures)?',
            right: 'The current', wrong: ['The length of the wire', 'The type of metal', 'The room temperature'], wide: false,
            explain: 'She measures the current with an ammeter, to see how it depends on the length.' }),
          rng => C(rng, { prompt: 'Ana investigates how the length of a wire affects the current through it. Which of these must she keep the same for a fair test?',
            right: 'The thickness and metal of the wire, and the cell', wrong: ['The length of the wire', 'The ammeter reading', 'Nothing: only the length matters'],
            explain: 'Only the length should change. Thickness, the metal and the voltage all affect the current too, so they are controlled.' })
        ] },

      { challenge: 'only', name: 'Explaining circuits', learn: 'series',
        items: [
          rng => C(rng, { prompt: 'In an old string of party lights, when one bulb broke, every bulb went out. How were the bulbs connected?',
            right: 'In series', wrong: ['In parallel', 'Each to its own battery', 'It cannot be told'], wide: false,
            explain: 'One break stopped all the current, which happens only when there is a single path: series.' }),
          rng => C(rng, { learn: 'parallel', prompt: 'Why are the lights and sockets in a house wired in parallel?',
            right: 'Each gets the full voltage and can be switched on or off on its own', wrong: ['It uses less wire', 'It makes the current the same everywhere', 'It makes every lamp dimmer, which saves energy'],
            explain: 'In parallel, every branch has the full supply voltage, and a break or a switch in one branch does not affect the others.' }),
          rng => C(rng, { learn: 'parallel', prompt: 'Two identical lamps in parallel are each as bright as one lamp on its own. What is the cost?',
            right: 'The cell supplies twice the current, so it runs flat sooner', wrong: ['There is none: two lamps for the price of one', 'Each lamp gets half the voltage', 'The lamps have to be bigger'],
            explain: 'The branch currents add up, so the cell supplies more current in total and transfers its energy faster.' })
        ] },

      { challenge: 'only', name: 'Generating electricity', learn: 'generation',
        items: [
          rng => C(rng, { prompt: 'Where does most of Aotearoa New Zealand’s electricity come from?',
            right: 'Hydro: water turning turbines in dams', wrong: ['Coal power stations', 'Nuclear power stations', 'Solar panels on houses'], wide: false,
            explain: 'More than half comes from hydro, mostly from the South Island lakes and the Waikato River. Geothermal and wind provide much of the rest.' }),
          rng => C(rng, { prompt: 'How do solar panels differ from hydro, geothermal and wind generation?',
            right: 'They transfer light energy straight to electrical energy, with no turbine', wrong: ['They burn fuel to make steam', 'They need a river nearby', 'They work best at night'],
            explain: 'Hydro, geothermal and wind all spin a turbine that turns a generator; solar panels have no moving parts.' }),
          rng => C(rng, { prompt: 'Which renewable source in New Zealand can generate steadily whatever the weather?',
            right: 'Geothermal', wrong: ['Wind', 'Solar', 'Hydro in a dry year'], wide: false,
            explain: 'Geothermal stations in the central North Island use steam from underground, which does not depend on wind, sun or rainfall.' })
        ] },

      { challenge: 'only', name: 'Static electricity', learn: 'charge',
        items: [
          rng => C(rng, { prompt: 'A balloon is rubbed on hair and gains a negative charge. What has moved?',
            right: 'Electrons, from the hair to the balloon', wrong: ['Protons, from the balloon to the hair', 'Neutrons, from the hair to the balloon', 'Nothing moves; the charge is made by rubbing'],
            explain: 'Only electrons move: protons are held in the nucleus. The balloon gains electrons and becomes negative; the hair is left positive.' }),
          rng => C(rng, { prompt: 'After the rubbing, the balloon is negative and the hair is positive. Why does the hair stand up towards the balloon?',
            right: 'Unlike charges attract', wrong: ['Like charges attract', 'The balloon is magnetic', 'The hair is lighter than the balloon'], wide: false,
            explain: 'The hair (positive) is attracted to the balloon (negative). Each hair also repels the others, all being positive.' })
        ] }
    ]
  });
})();
