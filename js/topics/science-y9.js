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
            right: par ? 'In parallel' : 'In series', options: ['In series', 'In parallel'], wide: false,
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


  // ═══ 9.2 Acids, bases and gas tests ═══════════════════════════════════════
  // Knowledge: Acids and bases; Identification tests for common substances
  // (Chemical change, Year 9, p. 25).
  // Practices: choose how to determine pH; indicators, including natural
  // ones; connect pH with uses; safety with corrosive substances; use
  // standard tests; draw conclusions from properties.

  const PH_ITEMS = [
    ['stomach acid', 1], ['lemon juice', 2], ['vinegar', 3], ['orange juice', 4], ['black coffee', 5], ['milk', 6],
    ['pure water', 7], ['blood', 7], ['baking soda solution', 9], ['toothpaste', 9], ['soapy water', 10],
    ['ammonia cleaner', 11], ['oven cleaner', 13], ['drain cleaner', 14]
  ];
  /** What universal indicator looks like across the scale, as words. */
  const UI_WORD = pH => (pH <= 2 ? 'red' : pH <= 4 ? 'orange' : pH <= 6 ? 'yellow' : pH === 7 ? 'green' : pH <= 10 ? 'blue' : 'purple');
  const kindOf = pH => (pH < 7 ? 'acidic' : pH === 7 ? 'neutral' : 'alkaline');
  const GAS_TESTS = [
    ['hydrogen', 'A lit splint held at the mouth of the tube goes out with a squeaky pop'],
    ['oxygen', 'A glowing splint relights'],
    ['carbon dioxide', 'Bubbled through limewater, it turns the limewater milky'],
    ['water', 'It turns blue cobalt chloride paper pink']
  ];

  Sci.topic({
    id: 's9e2', unit: 'atoms-reactions',
    title: 'Acids, Bases and Gas Tests',
    blurb: 'Acids and bases, the pH scale and indicators, and the tests that identify hydrogen, oxygen, carbon dioxide and water.',
    hint: 'pH below 7 is acidic, 7 is neutral, above 7 is alkaline; the lower the pH, the more acidic. Litmus turns red in acid and blue in alkali. ' +
          'Gas tests: hydrogen pops, oxygen relights a glowing splint, carbon dioxide turns limewater milky, water turns cobalt chloride paper pink.',

    learn: [
      { id: 'props', title: 'Acids and bases',
        text: Sci.table(['', 'Acids', 'Bases'], [['Taste (never test this!)', 'sour', 'bitter'], ['Feel', '', 'slippery'], ['Safety', 'can be corrosive', 'can be corrosive'],
                ['Examples', 'hydrochloric, sulfuric, nitric acid', 'metal oxides, hydroxides, carbonates, bicarbonates, ammonia']]) +
              '<p>Acids and bases have opposite properties. A base that dissolves in water is an <strong>alkali</strong>.</p>' },
      { id: 'ph', title: 'The pH scale', wide: true, diagram: { w: 330, h: 80 },
        draw(d) { SciDia.phScale(d); },
        text: '<p>pH measures how acidic or alkaline a solution is. Below 7 is acidic, 7 is neutral, above 7 is alkaline. <strong>Lower pH means more acidic.</strong></p>' },
      { id: 'indicators', title: 'Indicators',
        text: '<ul><li><strong>Litmus</strong>: red in acid, blue in alkali. It tells acid from alkali, but not how strong.</li>' +
              '<li><strong>Universal indicator</strong> shows a colour for each pH: red, orange, yellow, green (7), blue, purple.</li>' +
              '<li>Natural indicators work too: red cabbage juice is red in acid, purple near neutral, green to yellow in alkali.</li>' +
              '<li>A <strong>pH meter</strong> gives a number, more precisely than a colour.</li></ul>' },
      { id: 'everyday', title: 'pH in everyday life',
        text: Sci.table(['Substance', 'pH'], [['stomach acid', '1'], ['lemon juice', '2'], ['vinegar', '3'], ['pure water', '7'], ['baking soda solution', '9'], ['soapy water', '10'], ['drain cleaner', '14']]) +
              '<p>Antacids are weak bases that cancel extra stomach acid; gardeners spread lime (a base) on soil that is too acidic.</p>' },
      { id: 'gases', title: 'Testing for gases and water',
        text: Sci.table(['Substance', 'Test', 'Result'], [['hydrogen', 'lit splint', 'squeaky pop'], ['oxygen', 'glowing splint', 'relights'],
                ['carbon dioxide', 'limewater', 'turns milky'], ['water', 'blue cobalt chloride paper', 'turns pink']]) +
              '<p>Hydrogen, oxygen and carbon dioxide are all colourless and odourless, so they can only be told apart by testing.</p>' },
      { id: 'safety', title: 'Working safely',
        text: '<ul><li>Wear safety glasses; acids and alkalis can both be corrosive.</li><li>Use the most dilute solution that does the job.</li>' +
              '<li>Spilled on skin: wash with plenty of running water and tell the teacher.</li><li>At home, keep cleaners in their labelled bottles, out of children’s reach.</li></ul>' }
    ],

    examples: [
      {
        title: 'Example 1: reading pH',
        diagram: { w: 330, h: 100 }, draw(d) { SciDia.phScale(d, { marks: [{ pH: 3, label: 'vinegar' }, { pH: 10, label: 'soap' }] }); },
        steps: ['Vinegar has pH 3: below 7, so acidic. Universal indicator turns orange.', 'Soapy water has pH 10: above 7, so alkaline. Universal indicator turns blue.'],
        result: 'Vinegar is acidic, soapy water alkaline'
      },
      {
        title: 'Example 2: identifying a gas',
        steps: ['Marble chips fizz in acid. Is the gas hydrogen, oxygen or carbon dioxide? It looks the same as any of them.',
                'Bubble it through limewater: the limewater turns milky.', 'Only carbon dioxide does that.'],
        result: 'The gas is carbon dioxide'
      }
    ],

    slots: [
      { name: 'Acidic or alkaline?', learn: 'everyday',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these into acidic and alkaline.', bins: ['Acidic', 'Alkaline'], pick: 6,
          items: PH_ITEMS.filter(([, p]) => p !== 7).map(([text, p]) => ({ text, bin: p < 7 ? 0 : 1 })),
          explain: 'Stomach acid, lemon juice, vinegar, orange juice, coffee and milk are acidic (pH below 7). Baking soda, toothpaste, soap and the cleaners are alkaline.'
        })] },

      { name: 'Reading pH', learn: 'ph',
        items: [Sci.gen(rng => {
          const pH = rng.int(0, 14);
          return C(rng, { prompt: `A solution has a pH of ${pH}. It is…`, right: kindOf(pH), options: ['acidic', 'neutral', 'alkaline'], wide: false,
            explain: pH === 7 ? 'pH 7 is neutral.' : `pH ${pH} is ${pH < 7 ? 'below' : 'above'} 7, so it is ${kindOf(pH)}.` });
        })] },

      { name: 'Most acidic, most alkaline', learn: 'ph',
        items: [Sci.gen(rng => {
          // Four substances with four different pH values.
          const four = [];
          for (const x of rng.shuffle(PH_ITEMS)) if (four.length < 4 && !four.some(y => y[1] === x[1])) four.push(x);
          const acid = rng.chance();
          const best = four.reduce((b, x) => ((acid ? x[1] < b[1] : x[1] > b[1]) ? x : b));
          return C(rng, { prompt: `Which of these is the most <strong>${acid ? 'acidic' : 'alkaline'}</strong>?` + Sci.table(['Substance', 'pH'], four.map(([n, p]) => [n, String(p)])),
            right: best[0], wrong: four.filter(x => x !== best).map(x => x[0]), wide: false,
            explain: acid ? `The lowest pH is the most acidic: ${best[0]}, pH ${best[1]}.` : `The highest pH is the most alkaline: ${best[0]}, pH ${best[1]}.` });
        })] },

      { name: 'Universal indicator', learn: 'indicators',
        items: [Sci.gen(rng => {
          const pH = rng.pick([1, 3, 5, 7, 9, 12]);
          const col = UI_WORD(pH);
          const opts = ['strongly acidic (pH 0–2)', 'weakly acidic (pH 3–6)', 'neutral (pH 7)', 'alkaline (pH 8 or more)'];
          const right = pH <= 2 ? opts[0] : pH <= 6 ? opts[1] : pH === 7 ? opts[2] : opts[3];
          return C(rng, { prompt: `Universal indicator turns <strong>${col}</strong> in a solution. Use the scale: the solution is…`,
            diagram: { w: 330, h: 80 }, draw: d => SciDia.phScale(d), right, options: opts,
            explain: `${col[0].toUpperCase() + col.slice(1)} is around pH ${pH <= 2 ? '0 to 2' : pH <= 4 ? '3 to 4' : pH <= 6 ? '5 to 6' : pH === 7 ? '7' : pH <= 10 ? '8 to 10' : '11 to 14'}.` });
        })] },

      { name: 'Litmus', learn: 'indicators',
        items: [
          rng => C(rng, { prompt: 'Blue litmus paper is dipped in lemon juice. It…', right: 'turns red', wrong: ['stays blue', 'turns green', 'turns purple'], wide: false,
                          explain: 'Lemon juice is acidic, and litmus is red in acid.' }),
          rng => C(rng, { prompt: 'Red litmus paper is dipped in a solution of drain cleaner. It…', right: 'turns blue', wrong: ['stays red', 'turns yellow', 'turns orange'], wide: false,
                          explain: 'Drain cleaner is alkaline, and litmus is blue in alkali.' }),
          rng => C(rng, { prompt: 'Red litmus and blue litmus are both dipped in pure water. What happens?', right: 'Neither changes colour', wrong: ['Both turn red', 'Both turn blue', 'They swap colours'],
                          explain: 'Pure water is neutral, so litmus does not change.' }),
          rng => C(rng, { prompt: 'Two acids both turn blue litmus red. What can litmus <strong>not</strong> tell you?', right: 'Which acid is stronger', wrong: ['That they are acids', 'That they are not alkalis', 'That they are not neutral'],
                          explain: 'Litmus only tells acid from alkali. Universal indicator or a pH meter shows how acidic.' })
        ] },

      { name: 'Properties of acids and bases', learn: 'props',
        items: [
          rng => C(rng, { prompt: 'Which of these is a common <strong>acid</strong>?', right: rng.pick(['hydrochloric acid', 'sulfuric acid', 'nitric acid']), wrong: ['sodium hydroxide', 'ammonia', 'calcium carbonate'], wide: false,
                          explain: 'Hydrochloric, sulfuric and nitric acids are common acids. The others are bases.' }),
          rng => C(rng, { prompt: 'Which of these is a <strong>base</strong>?', right: rng.pick(['sodium hydroxide', 'calcium carbonate', 'magnesium oxide', 'ammonia']), wrong: ['hydrochloric acid', 'vinegar', 'lemon juice'], wide: false,
                          explain: 'Metal oxides, hydroxides, carbonates and bicarbonates, and ammonia, are bases.' }),
          rng => C(rng, { prompt: 'What is an alkali?', right: 'A base that dissolves in water', wrong: ['An acid that dissolves in water', 'Any substance with pH 7', 'A gas given off by acids'],
                          explain: 'Bases that dissolve in water are called alkalis.' }),
          rng => C(rng, { prompt: 'Which property do some acids and some bases share?', right: 'They can be corrosive', wrong: ['They taste sour', 'They feel slippery', 'They turn litmus blue'],
                          explain: 'Both can be corrosive. Sour taste is typical of acids, a bitter taste and slippery feel of bases.' }),
          rng => C(rng, { prompt: 'Soap feels slippery and tastes bitter. It is probably…', right: 'a base', wrong: ['an acid', 'neutral', 'a gas'], wide: false,
                          explain: 'A slippery feel and bitter taste are properties of bases.' })
        ] },

      { name: 'Gas tests', learn: 'gases',
        items: [rng => {
          const rows = rng.sample(GAS_TESTS, 3);
          return Sci.match(rng, 'Match each substance to the test that identifies it.', rows.map(([g, t]) => [g, t]),
            'Hydrogen pops; oxygen relights a glowing splint; carbon dioxide turns limewater milky; water turns cobalt chloride paper pink.', { learn: 'gases' });
        }] },

      { name: 'Identify the gas', learn: 'gases',
        items: GAS_TESTS.map(([g, t]) => rng => C(rng, { prompt: `A colourless gas is collected and tested. ${t}. What is it?`,
          right: g, wrong: GAS_TESTS.map(x => x[0]).filter(x => x !== g), wide: false,
          explain: `${t}: that is the test for ${g}.` })) },

      { name: 'pH at work', learn: 'everyday',
        items: [
          rng => C(rng, { prompt: 'Why does an antacid tablet help with indigestion caused by too much stomach acid?', right: 'It is a weak base that cancels out some of the acid',
            wrong: ['It is an acid that adds to the stomach acid', 'It is neutral, so it dilutes the acid', 'It turns the acid into a gas'],
            explain: 'Antacids are mild bases: they react with excess acid and raise the pH.' }),
          rng => C(rng, { prompt: 'A farmer finds the soil is too acidic for the crop. What should they spread on it?', right: 'Lime, a base', wrong: ['Vinegar, an acid', 'More water only', 'Lemon juice'],
            explain: 'Lime is a base: it neutralises some of the acid and raises the soil’s pH.' }),
          rng => C(rng, { prompt: 'Why do oven and drain cleaners need warning labels, even though they are not acids?', right: 'Strong alkalis are corrosive too', wrong: ['All cleaners are acids', 'They are neutral', 'They give off oxygen'],
            explain: 'Strong bases (pH 13 to 14) are as corrosive as strong acids.' })
        ] },

      { name: 'Working safely', learn: 'safety',
        items: [
          rng => C(rng, { prompt: 'Dilute acid splashes onto your hand. What should you do first?', right: 'Wash it with plenty of running water and tell the teacher',
            wrong: ['Wipe it off with a paper towel and carry on', 'Add some alkali to neutralise it', 'Wait to see whether it stings'],
            explain: 'Running water dilutes and removes it quickly. Adding another chemical can make things worse.' }),
          rng => C(rng, { prompt: 'Why should you wear safety glasses when using acids and alkalis?', right: 'Both can be corrosive, and eyes are easily damaged', wrong: ['Only to protect against heat', 'Because the solutions are bright colours', 'They are only needed for acids'],
            explain: 'Strong acids and strong alkalis can both damage eyes.' }),
          rng => C(rng, { prompt: 'Which is the safest choice for an investigation that works with either?', right: 'A dilute solution', wrong: ['A concentrated solution', 'The strongest acid available', 'An unlabelled bottle'], wide: false,
            explain: 'Use the most dilute solution that does the job: it is less corrosive.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Choosing a method', learn: 'indicators',
        items: [
          rng => C(rng, { prompt: 'You need to know whether a pool’s water is pH 7.2 or 7.6. What is the best method?', right: 'A pH meter', wrong: ['Litmus paper', 'Universal indicator', 'Red cabbage juice'], wide: false,
            explain: 'Only a pH meter gives a precise number; indicator colours cannot separate 7.2 from 7.6.' }),
          rng => C(rng, { prompt: 'You only need to know whether a cleaning product is acidic or alkaline. What is enough?', right: 'Litmus paper', wrong: ['A pH meter calibrated to 0.01', 'A thermometer', 'A glowing splint'], wide: false,
            explain: 'Litmus tells acid from alkali, which is all you need here.' }),
          rng => C(rng, { prompt: 'A solution is deeply coloured purple, so an indicator colour would be hard to see. What should you use?', right: 'A pH meter', wrong: ['Universal indicator', 'Litmus paper', 'Red cabbage juice'], wide: false,
            explain: 'A coloured solution hides indicator colours; a meter reads pH electrically.' })
        ] },

      { challenge: 'only', name: 'A natural indicator', learn: 'indicators',
        items: [Sci.gen(rng => {
          const table = [['red', 'acidic (pH 1–3)'], ['purple', 'about neutral (pH 6–7)'], ['blue-green', 'alkaline (pH 8–11)'], ['yellow', 'strongly alkaline (pH 12–14)']];
          const k = rng.int(0, 3);
          const sub = [['lemon juice', 'tap water', 'baking soda solution', 'drain cleaner'], ['vinegar', 'milk', 'soapy water', 'oven cleaner']][rng.int(0, 1)];
          return C(rng, { prompt: 'Red cabbage juice was added to some known solutions:' + Sci.table(['pH', 'Colour'], [['2', 'red'], ['7', 'purple'], ['10', 'blue-green'], ['13', 'yellow']]) +
                           `It turns <strong>${table[k][0]}</strong> in an unknown solution. The unknown is most likely…`,
            right: sub[k], wrong: sub.filter((_, i) => i !== k), wide: false,
            explain: `${table[k][0]} matches ${table[k][1]}, which fits ${sub[k]}.` });
        })] },

      { challenge: 'only', name: 'Drawing conclusions', learn: 'gases',
        items: [
          rng => C(rng, { prompt: 'A gas is tested: a glowing splint does <strong>not</strong> relight, a lit splint goes out without a pop, and limewater turns milky. What is it?',
            right: 'carbon dioxide', wrong: ['oxygen', 'hydrogen', 'water vapour'], wide: false,
            explain: 'Only one test is positive: limewater, which identifies carbon dioxide. (It also puts out flames.)' }),
          rng => C(rng, { prompt: 'Magnesium ribbon fizzes in hydrochloric acid. A lit splint at the mouth of the tube gives a squeaky pop. What can you conclude?',
            right: 'The gas is hydrogen', wrong: ['The gas is oxygen', 'The gas is carbon dioxide', 'No gas was made'], wide: false,
            explain: 'The squeaky pop is the test for hydrogen. Metals such as magnesium give hydrogen with acids.' }),
          rng => C(rng, { prompt: 'A clear liquid from a reaction turns blue cobalt chloride paper pink. What does this show?',
            right: 'It contains water', wrong: ['It is pure water', 'It is an acid', 'It is an alkali'], wide: false,
            explain: 'Cobalt chloride shows water is present, not that the liquid is pure water.' })
        ] },

      { challenge: 'only', name: 'Changing the pH', learn: 'ph',
        items: [
          rng => C(rng, { prompt: 'An acid of pH 2 is diluted a lot with water. Its pH…', right: 'rises towards 7, but stays below it', wrong: ['falls below 2', 'rises above 7', 'stays exactly 2'],
            explain: 'Water makes the acid less concentrated, so less acidic: the pH moves up towards 7. Water alone cannot make it alkaline.' }),
          rng => C(rng, { prompt: 'Alkali is slowly added to an acid containing universal indicator. What colour change do you see?', right: 'Red, then orange and yellow, then green',
            wrong: ['Green, then red', 'Purple, then blue, then green', 'No change until the end, then red'],
            explain: 'The pH rises as the acid is used up, so the colour moves along the scale from red towards green (neutral).' }),
          rng => C(rng, { prompt: 'Which solution is more acidic: pH 3 or pH 5?', right: 'pH 3', wrong: ['pH 5', 'They are equally acidic', 'You cannot tell from pH'], wide: false,
            explain: 'Lower pH means more acidic.' })
        ] },

      { challenge: 'only', name: 'Safety in context', learn: 'safety',
        items: [
          rng => C(rng, { prompt: 'Why should cleaning products never be mixed, or poured into old drink bottles?',
            right: 'They can react dangerously, and someone could drink them by mistake', wrong: ['It makes them stronger cleaners', 'Plastic bottles are acidic', 'There is no real risk'],
            explain: 'Mixing can release harmful gases, and an unlabelled drink bottle invites accidental poisoning.' }),
          rng => C(rng, { prompt: 'In a workplace, what tells workers how to handle a corrosive substance safely?', right: 'Its label and safety data sheet', wrong: ['Its colour', 'Its smell', 'How old the bottle is'],
            explain: 'Hazard labels and safety data sheets give the risks and the protective equipment needed.' })
        ] }
    ]
  });


  // ═══ 9.4 Motion and forces ════════════════════════════════════════════════
  // Knowledge: Motion and forces (Motion and forces, Year 9, pp. 26–27).
  // Practices: variables for a motion experiment; position–time graphs;
  // net force from free-body diagrams; reliability of results.

  /** Points along a curve, for a speeding-up or slowing-down section of an x–t graph. */
  const curve = (t0, t1, x0, x1, speedingUp) => Array.from({ length: 21 }, (_, i) => {
    const f = i / 20;
    return [t0 + (t1 - t0) * f, x0 + (x1 - x0) * (speedingUp ? f * f : 1 - (1 - f) * (1 - f))];
  });
  const XT = { xLabel: 'Time (s)', yLabel: 'Position (m)' };

  Sci.topic({
    id: 's9e4', unit: 'electricity-forces',
    title: 'Motion and Forces',
    blurb: 'Net force, balanced and unbalanced forces, and what position–time graphs say about motion.',
    hint: 'Add forces in the same direction; subtract forces in opposite directions. Zero net force: the object stays still or keeps a constant speed ' +
          'in a straight line. Unbalanced: its motion changes. On a position–time graph: flat is stopped, straight is constant speed, steeper is faster, curved is changing speed.',

    learn: [
      { id: 'newton', title: 'Forces',
        text: '<p>A force is a push or a pull, measured in <strong>newtons (N)</strong>, named for Isaac Newton, who developed the laws of motion.</p>' },
      { id: 'net', title: 'Net force', diagram: { w: 260, h: 110 },
        draw(d) { SciDia.forceDiagram(d, { left: 30, right: 80 }); },
        text: '<p>The <strong>net force</strong> is all the forces combined. Opposite directions subtract: 80 − 30 = <strong>50 N to the right</strong>. Same direction adds.</p>' },
      { id: 'balanced', title: 'Balanced forces',
        text: '<p>When the net force is <strong>zero</strong>, an object at rest stays at rest, and a moving object keeps moving at a <strong>constant speed in a straight line</strong>.</p>' },
      { id: 'unbalanced', title: 'Unbalanced forces',
        text: '<p>When the net force is not zero, the motion changes: the object speeds up, slows down or changes direction. A larger unbalanced force changes it more in the same time: a trolley pushed harder speeds up more quickly.</p>' },
      { id: 'xt', title: 'Position–time graphs', wide: true, diagram: { w: 300, h: 190 },
        draw(d) { SciDia.graph(d, { xMax: 10, yMax: 40, xStep: 2, yStep: 10, ...XT,
          series: [{ points: [[0, 0], [2, 10], [4, 20]] }, { points: [[4, 20], [6, 20]], dots: false }, { points: curve(6, 10, 20, 40, true), dots: false }] }); },
        text: '<ul><li><strong>Straight sloping line</strong>: constant speed. Steeper is faster.</li><li><strong>Flat line</strong>: stationary.</li>' +
              '<li><strong>Curve</strong>: changing speed; getting steeper means speeding up.</li></ul><p>Here: steady 5 m/s, stopped from 4 s to 6 s, then speeding up.</p>' },
      { id: 'variables', title: 'A good motion experiment',
        text: '<ul><li><strong>Independent</strong> variable: what you change (the height of a ramp).</li><li><strong>Dependent</strong>: what you measure (the time to roll down).</li>' +
              '<li><strong>Controlled</strong>: what you keep the same (the trolley, the ramp’s length and surface).</li><li>Repeat and average to make results more reliable.</li></ul>' }
    ],

    examples: [
      {
        title: 'Example 1: net force',
        diagram: { w: 260, h: 150 }, draw(d) { SciDia.forceDiagram(d, { left: 120, right: 200, up: 50, down: 50 }); },
        steps: ['Up and down: 50 N each way, so they balance.', 'Left and right: 200 − 120 = 80 N, towards the larger force.'],
        result: 'Net force: 80 N to the right, so the box speeds up to the right'
      },
      {
        title: 'Example 2: reading a position–time graph',
        diagram: { w: 300, h: 190 },
        draw(d) { SciDia.graph(d, { xMax: 10, yMax: 30, xStep: 2, yStep: 10, ...XT, series: [{ points: [[0, 0], [4, 20], [7, 20], [10, 30]] }] }); },
        steps: ['0 to 4 s: a straight line, rising 20 m in 4 s: a constant 5 m/s.', '4 to 7 s: flat, so stationary.', '7 to 10 s: straight, but less steep: 10 m in 3 s, slower than before.'],
        result: 'Steady, stopped, then steady but slower'
      }
    ],

    slots: [
      { name: 'Calculate the net force', learn: 'net',
        items: [Sci.gen((rng, diff) => {
          const a = rng.int(2, 20) * 10, b = rng.intExcept(2, 20, [a / 10]) * 10;
          const vert = diff !== 'core';
          const v = rng.int(3, 12) * 10;
          const forces = { left: a, right: b, ...(vert ? { up: v, down: v } : {}) };
          return { prompt: 'What is the size of the net force on the box?', diagram: { w: 260, h: vert ? 160 : 110 }, draw: d => SciDia.forceDiagram(d, forces),
                   input: { kind: 'number', answer: Math.abs(a - b), suffix: 'N', width: 70 },
                   explain: (vert ? 'Up and down balance. ' : '') + `Opposite forces subtract: ${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)} N, towards the ${a > b ? 'left' : 'right'}.` };
        })] },

      { name: 'Which way?', learn: 'net',
        items: [Sci.gen(rng => {
          const k = rng.int(0, 2), a = rng.int(2, 15) * 10;
          const b = k === 2 ? a : rng.intExcept(2, 15, [a / 10]) * 10;
          const forces = { left: a, right: b };
          const right = a === b ? 'There is no net force: they balance' : a > b ? 'To the left' : 'To the right';
          return C(rng, { prompt: 'Which way does the net force act?', diagram: { w: 260, h: 110 }, draw: d => SciDia.forceDiagram(d, forces),
            right, wrong: ['To the left', 'To the right', 'There is no net force: they balance', 'Upwards'].filter(x => x !== right).slice(0, 3), wide: false,
            explain: a === b ? `Both are ${a} N, so the net force is zero.` : `The larger force is ${Math.max(a, b)} N to the ${a > b ? 'left' : 'right'}, so the net force is that way.` });
        })] },

      { name: 'Balanced or unbalanced?', learn: 'balanced',
        items: [
          ...[['A car drives along a straight motorway at a steady 100 km/h.', true], ['A book rests on a table.', true], ['A skydiver falls at a constant speed.', true],
              ['A trolley speeds up after being pushed.', false], ['A cyclist brakes and slows down.', false], ['A netball is thrown and starts moving.', false]]
            .map(([s, bal]) => rng => C(rng, { learn: bal ? 'balanced' : 'unbalanced', prompt: s + ' Are the forces on it balanced?',
              right: bal ? 'Balanced: the net force is zero' : 'Unbalanced: there is a net force', options: ['Balanced: the net force is zero', 'Unbalanced: there is a net force'],
              explain: bal ? 'Staying still, or moving at a constant speed in a straight line, means the net force is zero.' : 'Its speed is changing, so there must be a net force.' }))
        ] },

      { name: 'What happens next?', learn: 'balanced',
        items: [
          rng => C(rng, { prompt: 'A hockey puck slides across smooth ice. Imagine no friction at all: no net force acts on it. What does it do?', right: 'Keeps moving at the same speed in a straight line',
            wrong: ['Slows down and stops', 'Speeds up', 'Curves to one side'], explain: 'Zero net force on a moving object: it keeps a constant speed in a straight line.' }),
          rng => C(rng, { prompt: 'A parked car has no net force on it. What does it do?', right: 'Stays at rest', wrong: ['Starts rolling slowly', 'Speeds up', 'Moves at a constant speed'], wide: false,
            explain: 'An object at rest with zero net force stays at rest.' }),
          rng => C(rng, { learn: 'unbalanced', prompt: 'A moving cyclist stops pedalling. Friction and air resistance give a net force backwards. What happens?', right: 'The cyclist slows down',
            wrong: ['The cyclist keeps a constant speed', 'The cyclist speeds up', 'The cyclist stops instantly'], explain: 'A net force against the motion slows it down.' }),
          rng => C(rng, { learn: 'unbalanced', prompt: 'A rowing crew pulls harder, so the forward force is bigger than the drag. What happens?', right: 'The boat speeds up',
            wrong: ['The boat keeps a constant speed', 'The boat slows down', 'The boat stops'], wide: false, explain: 'A net force forwards makes it speed up.' })
        ] },

      { name: 'Bigger forces, bigger changes', learn: 'unbalanced',
        items: [
          rng => C(rng, { learn: 'newton', prompt: 'In what unit is force measured?', right: 'newtons (N)', wrong: ['kilograms (kg)', 'metres per second (m/s)', 'joules (J)'], wide: false,
                          explain: 'Force is measured in newtons, named after Isaac Newton, who developed the laws of motion.' }),
          rng => C(rng, { prompt: 'Two identical trolleys are pushed for the same time. Trolley A gets a 10 N push, trolley B a 20 N push. Which speeds up more quickly?', right: 'Trolley B',
            wrong: ['Trolley A', 'They speed up equally', 'Neither: pushing does not change speed'], wide: false, explain: 'A larger unbalanced force causes a larger change in motion in the same time.' }),
          rng => C(rng, { prompt: 'A footballer kicks a ball softly, then much harder. Why does the hard kick send it off faster?', right: 'A larger force changes its motion more',
            wrong: ['The ball is lighter the second time', 'A soft kick does not apply a force', 'Air resistance disappears'], explain: 'A bigger unbalanced force makes a bigger change in speed over the same short time.' })
        ] },

      { name: 'What the graph shows', learn: 'xt',
        items: [Sci.gen(rng => {
          const k = rng.int(0, 3);
          const series = [[{ points: [[0, 15], [10, 15]] }], [{ points: [[0, 0], [10, 30]] }], [{ points: curve(0, 10, 0, 30, true), dots: false }], [{ points: curve(0, 10, 0, 30, false), dots: false }]][k];
          const opts = ['It is stationary', 'It moves at a constant speed', 'It is speeding up', 'It is slowing down'];
          return C(rng, { prompt: 'What is the object doing?', diagram: { w: 280, h: 180 }, draw: d => SciDia.graph(d, { xMax: 10, yMax: 30, xStep: 2, yStep: 10, ...XT, series }),
            right: opts[k], options: opts,
            explain: ['A flat line: its position is not changing.', 'A straight sloping line: the same distance every second.', 'The curve gets steeper: it covers more distance each second.', 'The curve gets flatter: it covers less distance each second.'][k] });
        })] },

      { name: 'Which is faster?', learn: 'xt',
        items: [Sci.gen(rng => {
          const a = rng.int(2, 4) * 10, b = rng.intExcept(1, 4, [a / 10]) * 10;
          return C(rng, { prompt: 'Two runners, A and B. Which is faster?', diagram: { w: 280, h: 180 },
            draw: d => SciDia.graph(d, { xMax: 10, yMax: 40, xStep: 2, yStep: 10, ...XT, series: [{ points: [[0, 0], [10, a]], label: 'A' }, { points: [[0, 0], [10, b]], label: 'B' }] }),
            right: a > b ? 'A' : 'B', wrong: [a > b ? 'B' : 'A', 'Neither: they have the same speed'], wide: false,
            explain: `${a > b ? 'A' : 'B'}’s line is steeper: it goes ${Math.max(a, b)} m in 10 s, against ${Math.min(a, b)} m.` });
        })] },

      { name: 'When was it stopped?', learn: 'xt',
        items: [Sci.gen(rng => {
          const t1 = rng.int(1, 4) * 2, t2 = t1 + rng.pick([2, 4]);
          const x1 = rng.int(1, 3) * 10;
          const pts = [[0, 0], [t1, x1], [t2, x1], [Math.min(t2 + 4, 14), Math.min(x1 + 10 * rng.int(1, 2), 40)]];
          const right = `From ${t1} s to ${t2} s`;
          const wrong = [`From 0 s to ${t1} s`, `From ${t2} s to ${pts[3][0]} s`, `At ${t1} s only`];
          return C(rng, { prompt: 'During which time was the object stationary?', diagram: { w: 300, h: 180 },
            draw: d => SciDia.graph(d, { xMax: 14, yMax: 40, xStep: 2, yStep: 10, ...XT, series: [{ points: pts }] }), right, wrong, wide: false,
            explain: `The line is flat from ${t1} s to ${t2} s: the position stays at ${x1} m.` });
        })] },

      { name: 'Speed from the graph', learn: 'xt',
        items: [Sci.gen(rng => {
          const v = rng.int(1, 5), t = rng.pick([4, 5, 8, 10]), x = v * t;
          return { prompt: 'What is the object’s speed?', diagram: { w: 280, h: 180 },
                   draw: d => SciDia.graph(d, { xMax: 10, yMax: Math.max(10, Math.ceil(x / 10) * 10), xStep: 2, ...XT, series: [{ points: [[0, 0], [t, x]] }] }),
                   input: { kind: 'number', answer: v, suffix: 'm/s', width: 70 },
                   explain: `It moves ${x} m in ${t} s: speed = distance ÷ time = ${x} ÷ ${t} = ${v} m/s.` };
        })] },

      { name: 'Planning the experiment', learn: 'variables',
        items: [
          rng => C(rng, { prompt: 'Sam rolls a trolley down a ramp at different heights and times how long it takes. What is the <strong>independent</strong> variable?', right: 'The height of the ramp',
            wrong: ['The time taken', 'The mass of the trolley', 'The length of the ramp'], wide: false, explain: 'The independent variable is the one Sam changes on purpose.' }),
          rng => C(rng, { prompt: 'Sam rolls a trolley down a ramp at different heights and times how long it takes. What is the <strong>dependent</strong> variable?', right: 'The time taken',
            wrong: ['The height of the ramp', 'The trolley', 'The stopwatch'], wide: false, explain: 'The dependent variable is the one Sam measures.' }),
          rng => C(rng, { prompt: 'Sam rolls a trolley down a ramp at different heights. Which must stay the same for a fair test?', right: 'The trolley and the ramp’s length and surface',
            wrong: ['The height of the ramp', 'The time taken', 'Nothing'], explain: 'Everything except the height is controlled, so only the height can cause the difference.' }),
          rng => C(rng, { prompt: 'Why should Sam time each height three times and average?', right: 'To make the results more reliable', wrong: ['To make the trolley faster', 'Because one result is always wrong', 'To change the independent variable'],
            explain: 'Repeats reduce the effect of random errors, such as reaction time with a stopwatch.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Find the missing force', learn: 'balanced',
        items: [Sci.gen(rng => {
          const a = rng.int(3, 15) * 10, b = rng.int(1, 8) * 10;
          return { prompt: `A sled moves at a constant speed in a straight line. It is pulled forward with a force F, against friction of ${a} N and air resistance of ${b} N. What is F?`,
                   input: { kind: 'number', answer: a + b, suffix: 'N', width: 70 },
                   explain: `Constant speed in a straight line means the net force is zero, so the forward pull balances both backward forces: ${a} + ${b} = ${a + b} N.` };
        })] },

      { challenge: 'only', name: 'Several forces', learn: 'net',
        items: [Sci.gen(rng => {
          const drive = rng.int(15, 40) * 100, fr = rng.int(2, 6) * 100, air = rng.int(3, 9) * 100;
          const net = drive - fr - air;
          return { prompt: `A car’s engine gives a driving force of ${drive} N. Friction is ${fr} N and air resistance ${air} N, both backwards. What is the net force?`,
                   input: { kind: 'number', answer: net, suffix: 'N', width: 80 },
                   explain: `The backward forces add: ${fr} + ${air} = ${fr + air} N. Net: ${drive} − ${fr + air} = ${net} N forwards, so the car speeds up.` };
        })] },

      { challenge: 'only', name: 'Telling the story', learn: 'xt',
        items: [
          rng => C(rng, { prompt: 'Mere walks to the dairy at a steady speed, waits inside, then walks home at the same speed. Which position–time graph fits?',
            right: 'Straight up, flat, then straight back down to zero', wrong: ['Straight up, flat, then straight up again', 'A curve up, then a curve down', 'Flat, then straight up'],
            explain: 'Moving away: position rises steadily. Waiting: flat. Walking home: position falls steadily back to the start.' }),
          rng => C(rng, { prompt: 'A car pulls away from traffic lights, getting faster and faster. What shape is its position–time graph?',
            right: 'A curve that gets steeper', wrong: ['A straight sloping line', 'A flat line', 'A curve that gets flatter'],
            explain: 'Speeding up means more distance each second, so the slope increases.' }),
          rng => C(rng, { prompt: 'A ball rolls along the floor and gradually comes to rest. What shape is its position–time graph?',
            right: 'A curve that gets flatter, ending flat', wrong: ['A curve that gets steeper', 'A straight line', 'A line going down to zero'],
            explain: 'Slowing down: less distance each second, so the slope decreases until the line is flat.' })
        ] },

      { challenge: 'only', name: 'Reliable results', learn: 'variables',
        items: [
          rng => C(rng, { prompt: 'Timing a 2-second roll with a hand stopwatch gives quite different results each time. Which change would improve accuracy most?',
            right: 'Use light gates connected to a timer', wrong: ['Use a bigger stopwatch', 'Time it only once', 'Round each time to the nearest second'],
            explain: 'Reaction time is a big error compared with 2 s. Light gates remove it.' }),
          rng => C(rng, { prompt: 'Three times for one height are 2.1 s, 2.2 s and 3.9 s. What should Sam do with 3.9 s?',
            right: 'Treat it as an outlier: check it, repeat that run, and leave it out of the average if it was a mistake', wrong: ['Include it, because every result counts the same', 'Change the other two to match it', 'Use it as the answer, because it is the largest'],
            explain: 'A result far from the others suggests a mistake. Repeating it shows whether it is real.' }),
          rng => C(rng, { prompt: 'Why is a longer ramp easier to time accurately than a very short one?',
            right: 'The time is longer, so reaction-time errors are a smaller part of it', wrong: ['The trolley goes slower on long ramps', 'Short ramps are always unfair tests', 'Long ramps have no friction'],
            explain: 'A fixed error of about 0.2 s matters much less in 5 s than in 1 s.' })
        ] },

      { challenge: 'only', name: 'No force needed to keep going', learn: 'balanced',
        items: [
          rng => C(rng, { prompt: 'A space probe far from any planet turns its engines off. What happens to it?', right: 'It keeps moving at a constant speed in a straight line',
            wrong: ['It slows down and stops', 'It falls back to Earth', 'It speeds up'], explain: 'With no net force, nothing changes its motion. On Earth, friction is what usually slows things.' }),
          rng => C(rng, { prompt: 'Why does a car need its engine running just to keep a constant speed on a flat road?', right: 'To balance friction and air resistance, so the net force is zero',
            wrong: ['Because moving objects need a net force to keep moving', 'To make the car speed up', 'Because the road is pulling it backwards with gravity'],
            explain: 'The engine’s force balances the resistive forces. Constant speed needs zero net force, not a forward net force.' })
        ] }
    ]
  });


  // ═══ 9.5 Pressure ═════════════════════════════════════════════════════════
  // Knowledge: Pressure (Motion and forces, Year 9, p. 27).
  // Practices: calculate pressure, force and area; justify everyday designs
  // by contact area; accuracy of measurements.

  const P_SHAPES = [
    { what: 'a crate', lo: 200, hi: 1200 }, { what: 'a fridge', lo: 400, hi: 1000 }, { what: 'a statue', lo: 1000, hi: 6000 }, { what: 'a stack of books', lo: 50, hi: 300 }
  ];

  Sci.topic({
    id: 's9e5', unit: 'electricity-forces',
    title: 'Pressure',
    blurb: 'How much force acts on each square metre: why knives are sharp and snowshoes are wide.',
    hint: 'Pressure = force ÷ area. With force in newtons and area in m², pressure is in pascals (Pa), which is N/m². The same force on a smaller area gives a greater pressure. ' +
          'Rearranged: force = pressure × area, and area = force ÷ pressure.',

    learn: [
      { id: 'pressure', title: 'Pressure',
        text: '<p>Pressure is the force acting at right angles to a surface, divided by the area it acts on:</p>' +
              '<p style="text-align:center">' + m('\\text{pressure} = \\dfrac{\\text{force}}{\\text{area}}') + '</p>' +
              '<p>Force in newtons (N), area in square metres (m²): pressure in <strong>pascals (Pa)</strong>. 1 Pa = 1 N/m².</p>' },
      { id: 'area', title: 'Small area, big pressure',
        text: '<p>For the same force, a <strong>smaller</strong> area gives a <strong>greater</strong> pressure, and a larger area a lower one.</p>' +
              '<ul><li>High pressure: an axe blade, a knife edge, a drawing pin’s point.</li><li>Low pressure: a hammer face, snowshoes, wide tractor tyres.</li></ul>' },
      { id: 'rearrange', title: 'Finding force or area',
        text: '<p>' + m('\\text{force} = \\text{pressure} \\times \\text{area}') + '</p><p>' + m('\\text{area} = \\text{force} \\div \\text{pressure}') + '</p>' },
      { id: 'units', title: 'Other units',
        text: '<p>For small areas, N/cm² is handy: 120 N on 4 cm² is 30 N/cm². Keep the units together: newtons and cm² give N/cm²; newtons and m² give Pa.</p>' },
      { id: 'accuracy', title: 'Measuring well',
        text: '<p>Measure force with a newton meter (spring balance) and lengths with a ruler, then calculate the area. Small lengths need careful measuring: a 1 mm error on a 1 cm edge is 10%.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: calculating pressure',
        steps: ['A crate weighs 600 N and rests on a base of 0.5 m².', m('\\text{pressure} = \\dfrac{600}{0.5} = 1200') + ' Pa.'],
        result: '1200 Pa'
      },
      {
        title: 'Example 2: same force, different area',
        steps: ['A 700 N person stands in boots with 0.05 m² of sole: ' + m('700 \\div 0.05 = 14\\,000') + ' Pa.',
                'On snowshoes with 0.35 m²: ' + m('700 \\div 0.35 = 2000') + ' Pa.', 'Seven times the area, one seventh of the pressure: they sink in less.'],
        result: 'Snowshoes spread the force over a larger area'
      }
    ],

    slots: [
      { name: 'Calculate pressure', learn: 'pressure',
        items: [Sci.gen((rng, diff) => {
          const s = rng.pick(P_SHAPES);
          const A = diff === 'core' ? rng.pick([1, 2, 4, 5]) : rng.pick([0.5, 0.2, 0.25, 2, 4]);
          const P = rng.int(2, 30) * 50;
          const F = +(P * A).toFixed(2);
          return { prompt: `${s.what[0].toUpperCase() + s.what.slice(1)} pushes down with a force of ${Fmt.num(F)} N on an area of ${Fmt.num(A)} m². What pressure does it exert?`,
                   input: { kind: 'number', answer: P, suffix: 'Pa', width: 90 },
                   explain: m(`\\text{pressure} = ${F} \\div ${A} = ${P}`) + ' Pa' };
        })] },

      { name: 'Pressure in N/cm²', learn: 'units',
        items: [Sci.gen(rng => {
          const A = rng.int(2, 12), P = rng.int(2, 25);
          return { prompt: `A force of ${A * P} N acts on an area of ${A} cm². What is the pressure?`,
                   input: { kind: 'number', answer: P, suffix: 'N/cm²', width: 70 },
                   explain: `${A * P} ÷ ${A} = ${P} N/cm².` };
        })] },

      { name: 'Calculate force', learn: 'rearrange',
        items: [Sci.gen(rng => {
          const A = rng.pick([0.5, 2, 3, 4, 10]), P = rng.int(2, 20) * 100;
          return { prompt: `Air pushes on a window of area ${Fmt.num(A)} m² with a pressure of ${P} Pa. What force does it exert on the window?`,
                   input: { kind: 'number', answer: +(P * A).toFixed(2), suffix: 'N', width: 90 },
                   explain: m(`\\text{force} = \\text{pressure} \\times \\text{area} = ${P} \\times ${A} = ${Fmt.num(+(P * A).toFixed(2))}`) + ' N' };
        })] },

      { name: 'Calculate area', learn: 'rearrange',
        items: [Sci.gen(rng => {
          const A = rng.pick([2, 4, 5, 10]), P = rng.int(2, 9) * 100;
          return { prompt: `A load of ${A * P} N exerts a pressure of ${P} Pa on the ground. Over what area is it spread?`,
                   input: { kind: 'number', answer: A, suffix: 'm²', width: 70 },
                   explain: m(`\\text{area} = \\text{force} \\div \\text{pressure} = ${A * P} \\div ${P} = ${A}`) + ' m²' };
        })] },

      { name: 'Which gives more pressure?', learn: 'area',
        items: [Sci.gen(rng => {
          const F = rng.int(2, 9) * 100, a = rng.pick([0.1, 0.2, 0.5]), b = rng.pick([1, 2, 4]);
          const first = rng.chance();
          const [A1, A2] = first ? [a, b] : [b, a];
          return C(rng, { prompt: `The same ${F} N box is placed on surface X (contact area ${A1} m²) and on surface Y (contact area ${A2} m²). Where is the pressure greater?`,
            right: A1 < A2 ? 'On X' : 'On Y', wrong: [A1 < A2 ? 'On Y' : 'On X', 'It is the same: the force is the same'], wide: false,
            explain: `Same force, smaller area, greater pressure: ${A1 < A2 ? 'X' : 'Y'} has the smaller area.` });
        })] },

      { name: 'Pressure in everyday life', learn: 'area',
        items: [
          ['Why is a knife sharpened to a thin edge?', 'The small area gives a high pressure, so it cuts easily', ['The thin edge makes it lighter', 'A thin edge spreads the force out', 'It reduces the force needed to lift it']],
          ['Why do snowshoes stop you sinking into soft snow?', 'They spread your weight over a larger area, lowering the pressure', ['They make you lighter', 'They increase the pressure on the snow', 'They melt the snow underneath']],
          ['Why do tractors that work in soft paddocks have very wide tyres?', 'A larger area gives a lower pressure, so they sink less', ['Wide tyres make the tractor lighter', 'Wide tyres increase the pressure for grip', 'Wide tyres go faster']],
          ['Why does a drawing pin have a sharp point and a wide flat head?', 'The point gives a high pressure on the board; the head gives a low pressure on your thumb', ['Both ends give the same pressure', 'The head increases the pressure on your thumb', 'The point is to make it lighter']],
          ['Why is an axe blade thin while a hammer face is broad?', 'The axe needs high pressure to split wood; the hammer spreads its force to push without cutting', ['Hammers are heavier', 'Axes need low pressure', 'They are shaped that way only for looks']]
        ].map(([q, r, w]) => rng => C(rng, { prompt: q, right: r, wrong: w, explain: 'Pressure = force ÷ area: a small area concentrates a force, a large area spreads it out.' })) },

      { name: 'Units', learn: 'pressure',
        items: [
          rng => C(rng, { prompt: 'What is the unit of pressure, when force is in newtons and area in m²?', right: 'pascal (Pa)', wrong: ['newton (N)', 'joule (J)', 'metre (m)'], wide: false,
                          explain: 'Pressure is measured in pascals: 1 Pa = 1 N/m².' }),
          rng => C(rng, { prompt: '1 pascal is the same as…', right: '1 newton on each square metre', wrong: ['1 newton on each metre', '1 metre for each newton', '1 kilogram on each square metre'],
                          explain: '1 Pa = 1 N/m².' }),
          rng => C(rng, { prompt: 'Which calculation gives a pressure?', right: m('\\text{force} \\div \\text{area}'), wrong: [m('\\text{force} \\times \\text{area}'), m('\\text{area} \\div \\text{force}'), m('\\text{force} + \\text{area}')], wide: false,
                          explain: 'Pressure is force divided by area.' })
        ] },

      { name: 'A block on its faces', learn: 'pressure',
        items: [Sci.gen(rng => {
          const dims = rng.pick([[0.1, 0.2, 0.5], [0.2, 0.4, 0.5], [0.1, 0.4, 0.5], [0.2, 0.25, 0.5]]);
          const W = rng.pick([100, 200, 400, 500]);
          const faces = [[dims[0], dims[1]], [dims[0], dims[2]], [dims[1], dims[2]]];
          const k = rng.int(0, 2), A = +(faces[k][0] * faces[k][1]).toFixed(4), P = +(W / A).toFixed(2);
          return { prompt: `A concrete block weighs ${W} N. It measures ${dims.join(' m × ')} m. It rests on its ${faces[k][0]} m × ${faces[k][1]} m face. What pressure does it exert?`,
                   input: { kind: 'number', answer: P, tol: 0.5, suffix: 'Pa', width: 90 },
                   explain: `Area = ${faces[k][0]} × ${faces[k][1]} = ${Fmt.num(A)} m². Pressure = ${W} ÷ ${Fmt.num(A)} = ${Fmt.num(P)} Pa.` };
        })] },

      { name: 'Measuring accurately', learn: 'accuracy',
        items: [
          rng => C(rng, { prompt: 'To find the pressure a shoe exerts, which measurements do you need?', right: 'The weight (in newtons) and the area of the sole touching the ground',
            wrong: ['The weight and the height of the shoe', 'The length of the shoe only', 'The mass in grams only'], explain: 'Pressure needs a force and the area it acts on.' }),
          rng => C(rng, { prompt: 'The sole of a shoe is an awkward shape. How could you measure its area more accurately?', right: 'Trace it onto 1 cm grid paper and count the squares, including part-squares',
            wrong: ['Measure only its length', 'Guess by looking', 'Weigh the shoe'], explain: 'Counting grid squares handles an irregular shape; smaller squares make it more accurate.' }),
          rng => C(rng, { prompt: 'Why is it harder to measure the area of a pin’s point accurately than the area of a table top?', right: 'A tiny measuring error is a large fraction of a tiny length',
            wrong: ['Pins are made of metal', 'Tables are flat', 'Small areas have no pressure'], explain: 'A 0.1 mm error hardly matters on a metre, but is huge on a 0.2 mm point.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'One foot or two', learn: 'area',
        items: [Sci.gen(rng => {
          const W = rng.int(4, 9) * 100, a = rng.pick([0.02, 0.025]);
          return { prompt: `A ${W} N person stands on two feet, each with ${a} m² of sole touching the ground. What is the pressure when they stand on <strong>one</strong> foot?`,
                   input: { kind: 'number', answer: +(W / a).toFixed(2), suffix: 'Pa', width: 100 },
                   explain: `On one foot the whole ${W} N acts on ${a} m²: ${W} ÷ ${a} = ${Fmt.num(+(W / a).toFixed(2))} Pa, twice the pressure on two feet.` };
        })] },

      { challenge: 'only', name: 'cm² to m²', learn: 'units',
        items: [Sci.gen(rng => {
          const cm2 = rng.pick([20, 25, 40, 50, 80, 100, 200]), F = rng.int(1, 9) * 10;
          const A = cm2 / 10000;
          return { prompt: `A force of ${F} N acts on ${cm2} cm². What is the pressure in <strong>pascals</strong>? (1 m² = 10 000 cm².)`,
                   input: { kind: 'number', answer: +(F / A).toFixed(2), suffix: 'Pa', width: 100 },
                   explain: `${cm2} cm² = ${cm2} ÷ 10 000 = ${A} m². Pressure = ${F} ÷ ${A} = ${Fmt.num(+(F / A).toFixed(2))} Pa.` };
        })] },

      { challenge: 'only', name: 'How many times more?', learn: 'area',
        items: [Sci.gen(rng => {
          const big = rng.pick([0.3, 0.4, 0.6]), small = rng.pick([0.02, 0.03, 0.05]);
          const ratio = +(big / small).toFixed(2);
          return { prompt: `A skier’s boots touch the snow over ${small} m²; their two skis over ${big} m². How many times greater is the pressure in boots than on skis?`,
                   input: { kind: 'number', answer: ratio, tol: 0.01, width: 70 },
                   explain: `Same force, so the pressure is inversely proportional to the area: ${big} ÷ ${small} = ${Fmt.num(ratio)} times.` };
        })] },

      { challenge: 'only', name: 'Design for a pressure', learn: 'rearrange',
        items: [Sci.gen(rng => {
          const W = rng.int(6, 12) * 100, Pmax = rng.pick([2000, 2500, 4000, 5000]);
          return { prompt: `Soft snow can bear a pressure of ${Pmax} Pa without a person sinking. A ${W} N hiker wears two snowshoes. What is the smallest total area the snowshoes need?`,
                   input: { kind: 'number', answer: +(W / Pmax).toFixed(4), tol: 0.0005, decimal: true, suffix: 'm²', width: 80 },
                   explain: `area = force ÷ pressure = ${W} ÷ ${Pmax} = ${Fmt.num(+(W / Pmax).toFixed(4))} m² (in total, across both shoes).` };
        })] },

      { challenge: 'only', name: 'Justify the design', learn: 'area',
        items: [
          rng => C(rng, { prompt: 'Why is it easier to cross soft snow on two skis than on a single narrow ski?', right: 'Two skis give a larger contact area, so a lower pressure for the same weight',
            wrong: ['Two skis make you lighter', 'One ski gives a lower pressure', 'Snow pushes back harder on two skis'], explain: 'The weight is the same; doubling the area halves the pressure.' }),
          rng => C(rng, { prompt: 'A heavy truck has many wheels. Why?', right: 'To spread its weight over a larger area, so the road is under less pressure',
            wrong: ['To make it go faster', 'To increase the pressure for grip', 'Because each wheel carries no weight'], explain: 'More tyres in contact means more area, so less pressure on the road.' }),
          rng => C(rng, { prompt: 'Why can a narrow stiletto heel damage a wooden floor that a heavy elephant could walk on without leaving marks?', right: 'The heel’s tiny area gives an enormous pressure',
            wrong: ['A person weighs more than an elephant', 'Elephants step more gently', 'Wood is harder for elephants'], explain: 'A small force on a tiny area can give a far greater pressure than a large force on a large area.' })
        ] },

      { challenge: 'only', name: 'Spot the mistake', learn: 'pressure',
        items: [Sci.gen(rng => {
          const F = rng.int(2, 9) * 100, A = rng.pick([2, 4, 5]);
          return Sci.spot(rng, {
            prompt: `Tama works out the pressure of a ${F} N crate on ${A} m². Which line is wrong?`,
            lines: [`Pressure = force ÷ area`, `Force = ${F} N, area = ${A} m²`, `Pressure = ${F} × ${A}`, `Pressure = ${F * A} Pa`],
            wrong: 2,
            explain: `Tama multiplied instead of dividing. Pressure = ${F} ÷ ${A} = ${F / A} Pa.`
          });
        })] }
    ]
  });
})();
