'use strict';
// ── Revision · Year 10 science ──────────────────────────────────────────────
// Phase 4 (Years 9–10) of the Science Years 0–10 learning area, August 2026.
// Each exercise follows one Year 10 knowledge heading and its practices.
// Questions stay inside the knowledge statements: no wave equation (v = fλ)
// and no moles, since the curriculum does not ask for them at this level.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice;
  const EXT = 'Extension';
  const num = x => Fmt.num(+(+x).toFixed(4));

  // ── Chemistry helpers ─────────────────────────────────────────────────────
  /** A formula with its numbers as subscripts: H2SO4 → H₂SO₄, Ca(NO3)2 → Ca(NO₃)₂. A leading coefficient stays full size. */
  const chem = f => f.replace(/([A-Za-z)])(\d+)/g, '$1<sub>$2</sub>');
  /** Atoms of each element in a formula, brackets included. */
  function atoms(f) {
    const stack = [{}];
    const re = /([A-Z][a-z]?|\(|\))(\d*)/g;
    let t;
    while ((t = re.exec(f))) {
      const [, tok, n] = t, k = n ? Number(n) : 1;
      if (tok === '(') stack.push({});
      else if (tok === ')') { const inner = stack.pop(), top = stack[stack.length - 1]; for (const e in inner) top[e] = (top[e] || 0) + inner[e] * k; }
      else { const top = stack[stack.length - 1]; top[tok] = (top[tok] || 0) + k; }
    }
    return stack[0];
  }
  const NAMES = { H: 'hydrogen', C: 'carbon', N: 'nitrogen', O: 'oxygen', Na: 'sodium', Mg: 'magnesium', Al: 'aluminium', S: 'sulfur', Cl: 'chlorine', K: 'potassium', Ca: 'calcium', Fe: 'iron', Cu: 'copper', Zn: 'zinc', Li: 'lithium', F: 'fluorine' };

  // Ions: simple ones from the periodic table, and the polyatomic ones the curriculum names.
  const CATIONS = [['Li', 'lithium', 1], ['Na', 'sodium', 1], ['K', 'potassium', 1], ['Mg', 'magnesium', 2], ['Ca', 'calcium', 2], ['Al', 'aluminium', 3]];
  const ANIONS = [['F', 'fluoride', 1], ['Cl', 'chloride', 1], ['O', 'oxide', 2], ['S', 'sulfide', 2], ['N', 'nitride', 3]];
  const POLY = [['OH', 'hydroxide', 1], ['NO3', 'nitrate', 1], ['CO3', 'carbonate', 2], ['SO4', 'sulfate', 2]];
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /** The neutral formula of an ionic compound: charges cancel. */
  function ionic(cat, an, poly) {
    const l = cat[2] * an[2] / gcd(cat[2], an[2]);
    const nc = l / cat[2], na = l / an[2];
    const part = (sym, n, multi) => (n === 1 ? sym : multi ? `(${sym})${n}` : sym + n);
    return part(cat[0], nc, false) + part(an[0], na, poly);
  }
  const ionText = (sym, q, sign) => chem(sym) + '<sup>' + (q > 1 ? q : '') + sign + '</sup>';

  /** A balancing question: boxes for every coefficient, formulas between them. */
  function balance(eq, prompt, explainNote) {
    const parts = [];
    const add = (list, coefs) => list.forEach((f, i) => {
      if (i) parts.push({ text: '+' });
      parts.push({ input: { answer: coefs[i], width: 44 } });
      parts.push({ text: chem(f) });
    });
    add(eq.r, eq.c.slice(0, eq.r.length));
    parts.push({ text: '→' });
    add(eq.p, eq.c.slice(eq.r.length));
    const show = list => list.map((f, i) => (eq.c[list === eq.r ? i : eq.r.length + i] > 1 ? eq.c[list === eq.r ? i : eq.r.length + i] : '') + chem(f)).join(' + ');
    return { prompt: (prompt || 'Balance the equation.') + ' Write 1 where only one is needed.',
             input: { kind: 'fill', parts },
             explain: `${show(eq.r)} → ${show(eq.p)}. ` + (explainNote || 'Count each element on both sides: they now match, so no atoms are gained or lost.') };
  }
  const EQ = s => {   // '2H2 + O2 -> 2H2O'
    const [l, r] = s.split('->').map(x => x.trim().split(' + '));
    const split = t => { const mt = /^(\d*)(.+)$/.exec(t); return [mt[1] ? Number(mt[1]) : 1, mt[2]]; };
    const L = l.map(split), R = r.map(split);
    return { r: L.map(x => x[1]), p: R.map(x => x[1]), c: [...L, ...R].map(x => x[0]) };
  };


  // ═══ 10.1 Bonding, formulas and equations ═════════════════════════════════
  // Knowledge: Chemical bonding (Matter, Year 10, p. 24).
  // Practices: write word and symbol equations; represent substances and
  // reactions with accepted conventions; test whether mass is conserved.

  const FORMULAS = ['H2O', 'CO2', 'NH3', 'CH4', 'H2SO4', 'C6H12O6', 'CaCO3', 'Al2O3', 'NaNO3', 'C2H5OH', 'HNO3', 'Na2CO3', 'MgCl2', 'SO2'];
  const BRACKETED = ['Ca(NO3)2', 'Mg(OH)2', 'Al2(SO4)3', '(NH4)2SO4', 'Ca(OH)2', 'Fe2(SO4)3'];
  const EASY_EQ = ['2H2 + O2 -> 2H2O', '2Mg + O2 -> 2MgO', 'N2 + 3H2 -> 2NH3', '2Na + Cl2 -> 2NaCl', '2Ca + O2 -> 2CaO', 'H2 + Cl2 -> 2HCl', '4Li + O2 -> 2Li2O', 'Zn + 2HCl -> ZnCl2 + H2', 'CH4 + 2O2 -> CO2 + 2H2O'].map(EQ);
  const HARD_EQ = ['4Al + 3O2 -> 2Al2O3', '4Fe + 3O2 -> 2Fe2O3', '2Al + 3Cl2 -> 2AlCl3', '2Na + 2H2O -> 2NaOH + H2', 'C3H8 + 5O2 -> 3CO2 + 4H2O', '2C2H6 + 7O2 -> 4CO2 + 6H2O'].map(EQ);

  Sci.topic({
    id: 's10e1', unit: 'atoms-reactions',
    title: 'Bonding, Formulas and Equations',
    blurb: 'How atoms join: ions and ionic bonds, shared electrons and covalent bonds, formulas and names, and balanced equations.',
    hint: 'Metals lose electrons to form positive ions; non-metals gain them to form negative ions. An ionic formula balances the charges: Al³⁺ and O²⁻ give Al₂O₃. ' +
          'Non-metals share electrons in covalent bonds. In a formula, a small number counts the atom before it (or the bracket). A balanced equation has the same atoms on both sides.',

    learn: [
      { id: 'molecules', title: 'Molecules and formulas',
        text: '<p>A <strong>molecule</strong> is two or more atoms bonded together: an element (' + chem('H2') + ', ' + chem('N2') + ') or a compound (' + chem('H2O') + ', ' + chem('SO2') + ', ' + chem('H2SO4') + ').</p>' +
              '<p>A formula shows which atoms and how many: ' + chem('H2SO4') + ' has 2 hydrogen, 1 sulfur and 4 oxygen atoms. A number after a bracket multiplies everything inside: ' + chem('Ca(NO3)2') + ' has 2 nitrogen and 6 oxygen.</p>' },
      { id: 'ions', title: 'Ions',
        text: '<p>When electrons are transferred, <strong>metals</strong> lose them and form positive ions (<strong>cations</strong>); <strong>non-metals</strong> gain them and form negative ions (<strong>anions</strong>).</p>' +
              Sci.table(['Group', '1', '2', '13', '15', '16', '17'], [['Ion charge', '1+', '2+', '3+', '3−', '2−', '1−']]) +
              '<p>Na (2, 8, 1) loses 1 electron: ' + ionText('Na', 1, '+') + '. O (2, 6) gains 2: ' + ionText('O', 2, '−') + '. Both now have full outer shells.</p>' },
      { id: 'ionic', title: 'Ionic compounds',
        text: '<p>Opposite ions attract: an <strong>ionic bond</strong>. The ions combine so the charges cancel:</p>' +
              '<ul><li>' + ionText('Na', 1, '+') + ' and ' + ionText('Cl', 1, '−') + ': ' + chem('NaCl') + '</li><li>' + ionText('Mg', 2, '+') + ' and ' + ionText('Cl', 1, '−') + ': ' + chem('MgCl2') + '</li>' +
              '<li>' + ionText('Al', 3, '+') + ' and ' + ionText('O', 2, '−') + ': ' + chem('Al2O3') + ' (6+ and 6−)</li></ul>' +
              '<p>Named metal first, then the non-metal ending in <em>-ide</em>: sodium chloride, magnesium oxide.</p>' },
      { id: 'poly', title: 'Polyatomic ions',
        text: '<p>Some ions are groups of atoms with one charge:</p>' +
              Sci.table(['Ion', 'Formula'], POLY.map(([f, n, q]) => [n, ionText(f, q, '−')])) +
              '<p>Brackets keep the group together: calcium nitrate is ' + chem('Ca(NO3)2') + '.</p>' },
      { id: 'covalent', title: 'Covalent bonds',
        text: '<p>Non-metal atoms can reach a full outer shell by <strong>sharing</strong> electrons: a <strong>covalent bond</strong>. Covalent compounds are molecules, not ions; the molecular formula gives the actual atoms (' + chem('H2O') + ', ' + chem('CO2') + ').</p>' +
              '<p>Prefixes show the numbers: carbon <strong>mon</strong>oxide (CO), carbon <strong>di</strong>oxide (' + chem('CO2') + '), sulfur <strong>tri</strong>oxide (' + chem('SO3') + ').</p>' },
      { id: 'equations', title: 'Equations',
        text: '<p>Word equation: sodium hydroxide + hydrochloric acid → sodium chloride + water.</p>' +
              '<p>Symbol equation: ' + chem('NaOH') + ' + HCl → NaCl + ' + chem('H2O') + '.</p>' +
              '<p>To <strong>balance</strong> one, put numbers in front of formulas (never change the formulas) until each element has the same number of atoms on both sides.</p>' },
      { id: 'mass', title: 'Conservation of mass',
        text: '<p>No atoms are gained or lost in a reaction, so the total mass of the products equals the total mass of the reactants. If mass seems to change, a gas has escaped or been taken in.</p>' },
      { id: 'macdiarmid', title: 'Alan MacDiarmid',
        text: '<p>New Zealand chemist Alan MacDiarmid shared the 2000 Nobel Prize in Chemistry for showing that some plastics can be made to conduct electricity, applying his knowledge of chemical bonding. Conducting plastics are now used in electronics.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: an ionic formula',
        steps: ['Aluminium is in group 13: ' + ionText('Al', 3, '+') + '. Oxygen is in group 16: ' + ionText('O', 2, '−') + '.',
                'The smallest total both charges divide into is 6: two Al³⁺ (6+) and three O²⁻ (6−).', 'Named metal first, then -ide.'],
        result: 'Aluminium oxide, ' + chem('Al2O3')
      },
      {
        title: 'Example 2: balancing an equation',
        steps: [chem('H2') + ' + ' + chem('O2') + ' → ' + chem('H2O') + ': 2 O on the left, only 1 on the right.',
                'Put 2 in front of the water: 2' + chem('H2O') + '. Now 2 O each side, but 4 H on the right.',
                'Put 2 in front of the hydrogen: 2' + chem('H2') + '. Now 4 H and 2 O on each side.'],
        result: '2' + chem('H2') + ' + ' + chem('O2') + ' → 2' + chem('H2O')
      }
    ],

    slots: [
      { name: 'Counting atoms', learn: 'molecules',
        items: [Sci.gen((rng, diff) => {
          const f = rng.pick(diff === 'expert' ? [...FORMULAS, ...BRACKETED] : FORMULAS);
          const a = atoms(f), els = Object.keys(a);
          const total = rng.chance(0.4);
          const e = rng.pick(els);
          const ans = total ? Object.values(a).reduce((s, v) => s + v, 0) : a[e];
          return { prompt: total ? `How many atoms altogether are in one ${chem(f)}?` : `How many <strong>${NAMES[e] || e}</strong> atoms are in one ${chem(f)}?`,
                   input: { kind: 'number', answer: ans, width: 70 },
                   explain: els.map(x => `${a[x]} ${NAMES[x] || x}`).join(', ') + (total ? `: ${ans} atoms in all.` : '.') };
        })] },

      { name: 'Element or compound?', learn: 'molecules',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these substances.', bins: ['Element', 'Compound'], pick: 6,
          items: [...['H2', 'O2', 'N2', 'Cl2', 'Ar', 'Fe', 'O3'].map(f => ({ text: chem(f), bin: 0 })),
                  ...['H2O', 'CO2', 'NaCl', 'CH4', 'NH3', 'MgO', 'SO2'].map(f => ({ text: chem(f), bin: 1 }))],
          explain: 'An element has only one kind of atom, even when its atoms are bonded in a molecule (H₂, O₃). A compound has atoms of different elements bonded together.'
        })] },

      { name: 'Ion charges', learn: 'ions',
        items: [Sci.gen(rng => {
          const pool = [...CATIONS.map(c => [...c, '+']), ...ANIONS.map(a => [...a, '−'])];
          const [sym, , q, sign] = rng.pick(pool);
          const elName = NAMES[sym];
          const right = ionText(sym, q, sign);
          const other = sign === '+' ? '−' : '+';
          const wrong = [ionText(sym, q, other), ...[1, 2, 3].filter(x => x !== q).map(x => ionText(sym, x, sign))];
          return C(rng, { prompt: `What ion does ${elName} form?`, right, wrong, wide: false,
            explain: sign === '+' ? `${elName[0].toUpperCase() + elName.slice(1)} is a metal and loses ${q} electron${q > 1 ? 's' : ''} to leave a full outer shell: ${right}.`
                                  : `${elName[0].toUpperCase() + elName.slice(1)} is a non-metal and gains ${q} electron${q > 1 ? 's' : ''} to fill its outer shell: ${right}.` });
        })] },

      { name: 'Cations and anions', learn: 'ions',
        items: [
          rng => C(rng, { prompt: 'When a metal atom forms an ion, it…', right: 'loses electrons and becomes positive', wrong: ['gains electrons and becomes negative', 'loses protons and becomes negative', 'gains protons and becomes positive'],
                          explain: 'Metals lose their few outer electrons, leaving more protons than electrons: a positive ion (cation).' }),
          rng => C(rng, { prompt: 'What is an anion?', right: 'A negative ion', wrong: ['A positive ion', 'A neutral atom', 'A molecule of two atoms'], wide: false,
                          explain: 'Anions are negative ions, formed when non-metals gain electrons.' }),
          rng => C(rng, { prompt: 'What holds the ions together in sodium chloride?', right: 'The attraction between oppositely charged ions', wrong: ['Shared pairs of electrons', 'Magnetism', 'Gravity between the atoms'],
                          explain: 'Na⁺ and Cl⁻ attract: an ionic bond.' }),
          rng => C(rng, { prompt: 'Why does an ionic compound such as MgO have no overall charge?', right: 'The positive and negative charges cancel out', wrong: ['Ions have no charge', 'The electrons are shared equally', 'Magnesium has no charge'],
                          explain: 'Mg²⁺ and O²⁻: 2+ and 2− cancel. Ionic compounds always combine in a ratio that makes them neutral.' })
        ] },

      { name: 'Ionic formulas', learn: 'ionic',
        items: [Sci.gen(rng => {
          const cat = rng.pick(CATIONS), an = rng.pick(ANIONS);
          const right = ionic(cat, an);
          const cands = [cat[0] + an[0], cat[0] + (cat[2] > 1 ? cat[2] : '') + an[0] + (an[2] > 1 ? an[2] : ''), cat[0] + (an[2] > 1 ? an[2] : '') + an[0] + (cat[2] > 1 ? cat[2] : ''),
                         cat[0] + '2' + an[0], cat[0] + an[0] + '2', cat[0] + an[0] + '3', cat[0] + '2' + an[0] + '3', cat[0] + '3' + an[0] + '2', cat[0] + '4' + an[0]];
          // 'NaN' would read as a glitch, not a formula, so it is never offered.
          const wrong = [...new Set(cands)].filter(f => f !== right && !/^NaN/.test(f)).slice(0, 3).map(chem);
          return C(rng, { prompt: `What is the formula of ${cat[1]} ${an[1]}? (Ions: ${ionText(cat[0], cat[2], '+')} and ${ionText(an[0], an[2], '−')}.)`,
            right: chem(right), wrong, wide: false,
            explain: `The charges must cancel: ${right === cat[0] + an[0] ? 'one of each' : `the formula ${chem(right)} has ${atoms(right)[cat[0]] * cat[2]}+ and ${atoms(right)[an[0]] * an[2]}−`}.` });
        })] },

      { name: 'Naming compounds', learn: 'ionic',
        items: [Sci.gen(rng => {
          const cat = rng.pick(CATIONS), an = rng.pick(ANIONS);
          const f = ionic(cat, an);
          const right = `${cat[1]} ${an[1]}`;
          const elementName = NAMES[an[0]];
          const wrong = [`${cat[1]} ${elementName}`, `${an[1]} ${cat[1]}`, `${cat[1]} ${rng.pick(ANIONS.filter(x => x !== an))[1]}`];
          return C(rng, { prompt: `What is the name of ${chem(f)}?`, right, wrong, wide: false,
            explain: `The metal is named first; the non-metal’s name ends in -ide: ${elementName} becomes ${an[1]}.` });
        })] },

      { name: 'Ionic or covalent?', learn: 'covalent',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these compounds by the kind of bonding.', bins: ['Ionic (metal and non-metal)', 'Covalent (non-metals only)'], pick: 6,
          items: [...['NaCl', 'MgO', 'CaCl2', 'K2O', 'LiF', 'Al2O3'].map(f => ({ text: chem(f), bin: 0 })), ...['H2O', 'CO2', 'CH4', 'NH3', 'SO2', 'HCl'].map(f => ({ text: chem(f), bin: 1 }))],
          explain: 'A metal with a non-metal usually forms ionic bonds; non-metals together share electrons in covalent bonds.'
        })] },

      { name: 'Covalent names', learn: 'covalent',
        items: [['CO', 'carbon monoxide'], ['CO2', 'carbon dioxide'], ['SO2', 'sulfur dioxide'], ['SO3', 'sulfur trioxide'], ['CCl4', 'carbon tetrachloride'], ['NO2', 'nitrogen dioxide']]
          .map(([f, n], i, all) => rng => C(rng, { prompt: `What is the name of ${chem(f)}?`, right: n, wrong: rng.sample(all.filter(x => x[1] !== n), 3).map(x => x[1]), wide: false,
            explain: 'The prefix counts the atoms: mono 1, di 2, tri 3, tetra 4.' })) },

      { name: 'Balance the equation', learn: 'equations',
        items: [Sci.gen((rng, diff) => balance(rng.pick(diff === 'core' ? EASY_EQ.slice(0, 7) : EASY_EQ)))] },

      { name: 'Conservation of mass', learn: 'mass',
        items: [Sci.gen(rng => {
          const k = rng.int(0, 1);
          const a = +(rng.int(12, 60) / 10).toFixed(1), b = +(rng.int(8, 40) / 10).toFixed(1), tot = +(a + b).toFixed(1);
          // Magnesium and oxygen combine in the ratio 24 : 16 by mass, so the numbers are real ones.
          const kg = rng.int(2, 10), mg = +(0.6 * kg).toFixed(1), ox = +(0.4 * kg).toFixed(1);
          if (k === 0) return { prompt: `${mg} g of magnesium reacts completely with ${ox} g of oxygen. What mass of magnesium oxide is made?`,
            input: { kind: 'number', answer: kg, tol: 0.001, decimal: true, suffix: 'g', width: 70 }, explain: `No atoms are lost: ${mg} + ${ox} = ${kg} g.` };
          return { prompt: `In a sealed flask, ${tot} g of reactants react. One product has a mass of ${a} g; there is one other product. What is its mass?`,
            input: { kind: 'number', answer: b, tol: 0.001, decimal: true, suffix: 'g', width: 70 }, explain: `The total mass stays ${tot} g: ${tot} − ${a} = ${b} g.` };
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Polyatomic formulas', learn: 'poly',
        items: [Sci.gen(rng => {
          const cat = rng.pick(CATIONS.filter(c => c[0] !== 'Li')), an = rng.pick(POLY);
          const right = ionic(cat, an, true);
          const bare = right.replace(/[()]/g, '');
          const cands = [bare, cat[0] + an[0], cat[0] + `(${an[0]})${cat[2] + 1}`, cat[0] + '2' + an[0], cat[0] + `(${an[0]})2`, cat[0] + `(${an[0]})3`];
          const wrong = [...new Set(cands)].filter(f => f !== right && f.replace(/[()]/g, '') !== bare).slice(0, 3).map(chem);
          while (wrong.length < 3) wrong.push(chem(cat[0] + `(${an[0]})${wrong.length + 4}`));
          return C(rng, { prompt: `What is the formula of ${cat[1]} ${an[1]}? (Ions: ${ionText(cat[0], cat[2], '+')} and ${ionText(an[0], an[2], '−')}.)`, right: chem(right), wrong, wide: false,
            explain: `The charges must cancel; brackets keep the ${an[1]} ion together when more than one is needed: ${chem(right)}.` });
        })] },

      { challenge: 'only', name: 'Counting with brackets', learn: 'molecules',
        items: [Sci.gen(rng => {
          const f = rng.pick(BRACKETED), a = atoms(f), e = rng.pick(Object.keys(a));
          return { prompt: `How many <strong>${NAMES[e] || e}</strong> atoms are in one ${chem(f)}?`, input: { kind: 'number', answer: a[e], width: 70 },
                   explain: 'The number after a bracket multiplies everything inside it. ' + Object.keys(a).map(x => `${a[x]} ${NAMES[x] || x}`).join(', ') + '.' };
        })] },

      { challenge: 'only', name: 'Word to symbol', learn: 'equations',
        items: [
          ['sodium hydroxide + hydrochloric acid → sodium chloride + water', 'NaOH + HCl → NaCl + H2O', ['NaOH + HCl → NaCl2 + H2O', 'NaH + HCl → NaCl + H2O', 'NaOH + Cl → NaCl + H2O']],
          ['carbon + oxygen → carbon dioxide', 'C + O2 → CO2', ['C + O → CO2', 'C + O2 → CO', 'Ca + O2 → CaO2']],
          ['magnesium + hydrochloric acid → magnesium chloride + hydrogen', 'Mg + 2HCl → MgCl2 + H2', ['Mg + HCl → MgCl + H', 'Mg + 2HCl → MgCl + H2', 'Mn + 2HCl → MnCl2 + H2']],
          ['calcium carbonate → calcium oxide + carbon dioxide', 'CaCO3 → CaO + CO2', ['CaCO3 → CaO2 + CO', 'CaCO3 → Ca + CO3', 'CCO3 → CO + CO2']]
        ].map(([w, r, ws]) => rng => C(rng, { prompt: `Which symbol equation matches?<br><em>${w}</em>`, right: chem(r), wrong: ws.map(chem), wide: false,
          explain: `${chem(r)}: each name becomes its formula, and the equation is balanced.` })) },

      { challenge: 'only', name: 'Balance the harder ones', learn: 'equations',
        items: [Sci.gen(rng => balance(rng.pick(HARD_EQ)))] },

      { challenge: 'only', name: 'Where did the mass go?', learn: 'mass',
        items: [
          rng => C(rng, { prompt: 'A log burns in a fireplace and leaves a small pile of ash. Mass seems to disappear. Why?', right: 'Most of the products are gases (carbon dioxide and water vapour) that escape',
            wrong: ['Atoms are destroyed by burning', 'Fire has negative mass', 'The ash is lighter than it looks'], explain: 'Atoms are not lost: they leave as gases. In a sealed container the mass would not change.' }),
          rng => C(rng, { prompt: 'Steel wool is heated in air and its mass <strong>increases</strong>. Why?', right: 'Oxygen from the air combines with the iron',
            wrong: ['Heat has mass', 'The iron atoms get bigger', 'The balance is wrong'], explain: 'The iron oxide formed includes oxygen atoms taken from the air, so the solid gets heavier.' }),
          rng => C(rng, { prompt: 'How could you test the claim that mass is constant in a reaction that gives off a gas?', right: 'Do it in a sealed container and weigh it before and after',
            wrong: ['Do it in an open beaker and weigh it', 'Weigh only the products', 'Measure the temperature'], explain: 'Sealing it keeps the gas in, so everything is weighed.' })
        ] },

      { challenge: 'only', name: 'Electrons in bonds', learn: 'ions',
        items: [
          rng => C(rng, { prompt: 'Magnesium (2, 8, 2) reacts with oxygen (2, 6). What happens to the electrons?', right: 'Magnesium gives 2 electrons to oxygen',
            wrong: ['Oxygen gives 2 electrons to magnesium', 'They share 2 electrons', 'Magnesium gives 6 electrons to oxygen'],
            explain: 'Magnesium loses 2 (leaving 2, 8) and oxygen gains 2 (making 2, 8): Mg²⁺ and O²⁻.' }),
          rng => C(rng, { prompt: 'Two chlorine atoms (2, 8, 7) bond to make ' + chem('Cl2') + '. How?', right: 'They share a pair of electrons, so each has a full outer shell',
            wrong: ['One gives an electron to the other', 'They both lose 7 electrons', 'They do not need to bond'],
            explain: 'Both are non-metals needing one more electron. Sharing one pair gives each 8 in its outer shell: a covalent bond.' }),
          rng => C(rng, { prompt: 'Why do noble gases almost never form compounds?', right: 'Their outer shells are already full', wrong: ['They have no electrons', 'They are metals', 'They are too heavy'], wide: false,
            explain: 'Bonding is about reaching a full outer shell. Noble gases already have one.' })
        ] },

      { challenge: 'only', name: 'Alan MacDiarmid', learn: 'macdiarmid',
        items: [rng => C(rng, { prompt: 'What did New Zealand chemist Alan MacDiarmid share a Nobel Prize for?', right: 'Showing that some plastics can conduct electricity',
          wrong: ['Discovering the nucleus', 'Inventing the periodic table', 'Splitting the atom'],
          explain: 'His work on conducting polymers applied bonding chemistry to make plastics that conduct. Rutherford, another New Zealander, discovered the nucleus.' })] }
    ]
  });


  // ═══ 10.2 Types of reaction ═══════════════════════════════════════════════
  // Knowledge: Combination, combustion, decomposition, neutralisation
  // (Chemical change, Year 10, p. 25).
  // Practices: predict products and classify reactions; everyday examples;
  // balanced equations; identify products with tests; controlled testing.

  const ACIDS = [['hydrochloric acid', 'chloride', 'HCl'], ['sulfuric acid', 'sulfate', 'H2SO4'], ['nitric acid', 'nitrate', 'HNO3']];
  const BASE_METALS = ['sodium', 'potassium', 'magnesium', 'calcium', 'copper', 'zinc'];
  const RXN_EQ = ['CH4 + 2O2 -> CO2 + 2H2O', '2Mg + O2 -> 2MgO', '2H2O2 -> 2H2O + O2', '2NaOH + H2SO4 -> Na2SO4 + 2H2O', 'CaCO3 + 2HCl -> CaCl2 + H2O + CO2',
                  'Mg(OH)2 + 2HCl -> MgCl2 + 2H2O', '2KOH + H2SO4 -> K2SO4 + 2H2O'].map(EQ);
  const RXN_HARD = ['C3H8 + 5O2 -> 3CO2 + 4H2O', '4Al + 3O2 -> 2Al2O3', 'Ca(OH)2 + 2HCl -> CaCl2 + 2H2O', 'CaCO3 + 2HNO3 -> Ca(NO3)2 + H2O + CO2', '2C2H6 + 7O2 -> 4CO2 + 6H2O'].map(EQ);
  const TYPES = ['combination', 'combustion', 'decomposition', 'neutralisation'];
  /** Clear examples of each type, as word equations. */
  const CLASSIFY = [
    ['iron + sulfur → iron sulfide', 0], ['hydrogen + chlorine → hydrogen chloride', 0], ['sodium + chlorine → sodium chloride', 0],
    ['methane + oxygen → carbon dioxide + water', 1], ['propane + oxygen → carbon dioxide + water', 1], ['ethanol + oxygen → carbon dioxide + water', 1],
    ['calcium carbonate → calcium oxide + carbon dioxide', 2], ['copper carbonate → copper oxide + carbon dioxide', 2], ['hydrogen peroxide → water + oxygen', 2],
    ['hydrochloric acid + sodium hydroxide → sodium chloride + water', 3], ['sulfuric acid + magnesium oxide → magnesium sulfate + water', 3], ['nitric acid + potassium hydroxide → potassium nitrate + water', 3]
  ];

  Sci.topic({
    id: 's10e2', unit: 'atoms-reactions',
    title: 'Types of Reaction',
    blurb: 'Combination, combustion, decomposition and neutralisation: recognising them, predicting their products and writing their equations.',
    hint: 'Combination: two or more substances make one. Combustion: a fuel reacts with oxygen (complete: carbon dioxide and water). Decomposition: one compound breaks into simpler ones ' +
          '(metal carbonate → metal oxide + carbon dioxide). Neutralisation: acid + base → salt + water (+ carbon dioxide with a carbonate). Hydrochloric acid makes chlorides, sulfuric sulfates, nitric nitrates.',

    learn: [
      { id: 'combination', title: 'Combination',
        text: '<p>Two or more substances react to form a <strong>single</strong> product: iron + sulfur → iron sulfide.</p>' +
              '<p>A metal and a non-metal typically form an ionic compound; non-metals together typically form a covalent one.</p>' },
      { id: 'combustion', title: 'Combustion',
        text: '<p>A fuel such as a hydrocarbon reacts with oxygen, transferring energy to the surroundings as thermal energy and often light.</p>' +
              '<ul><li><strong>Complete</strong> (plenty of oxygen): carbon dioxide and water.</li><li><strong>Incomplete</strong> (not enough oxygen): water, with soot (carbon), carbon monoxide and carbon dioxide.</li>' +
              '<li>Metals can burn too: magnesium + oxygen → magnesium oxide, with a brilliant white flame.</li></ul>' },
      { id: 'decomposition', title: 'Decomposition',
        text: '<p>A compound breaks down into two or more simpler substances. <strong>Thermal</strong> decomposition is caused by heating:</p>' +
              '<p>metal carbonate → metal oxide + carbon dioxide<br>calcium carbonate → calcium oxide + carbon dioxide</p>' },
      { id: 'neutralisation', title: 'Neutralisation',
        text: '<ul><li>acid + metal hydroxide → salt + water</li><li>acid + metal oxide → salt + water</li><li>acid + metal carbonate → salt + water + carbon dioxide</li></ul>' +
              Sci.table(['Acid', 'Its salts'], ACIDS.map(([a, s]) => [a, s + 's'])) +
              '<p>hydrochloric acid + sodium hydroxide → sodium chloride + water</p>' },
      { id: 'tests', title: 'Identifying products',
        text: '<p>Use the tests from Year 9: limewater turns milky (carbon dioxide), a glowing splint relights (oxygen), a squeaky pop (hydrogen), cobalt chloride paper turns pink (water). Universal indicator shows when an acid has been neutralised.</p>' },
      { id: 'everyday', title: 'Reactions around us',
        text: '<ul><li>Gas cooking, car engines: combustion.</li><li>Baking soda making a cake rise when heated: decomposition.</li><li>Antacids, lime on acidic soil: neutralisation.</li>' +
              '<li>Iron slowly combining with oxygen to form iron oxide (rust): combination.</li></ul>' }
    ],

    examples: [
      {
        title: 'Example 1: naming the salt',
        steps: ['sulfuric acid + magnesium oxide → ?', 'An acid with a metal oxide: neutralisation, giving a salt and water.', 'The salt takes the metal’s name and the acid’s ending: sulfuric → sulfate.'],
        result: 'magnesium sulfate + water'
      },
      {
        title: 'Example 2: balancing a combustion equation',
        steps: [chem('CH4') + ' + ' + chem('O2') + ' → ' + chem('CO2') + ' + ' + chem('H2O'), 'Carbon: 1 each side. Hydrogen: 4 on the left, so 2' + chem('H2O') + '.',
                'Oxygen on the right: 2 + 2 = 4, so 2' + chem('O2') + '.'],
        result: chem('CH4') + ' + 2' + chem('O2') + ' → ' + chem('CO2') + ' + 2' + chem('H2O')
      }
    ],

    slots: [
      { name: 'Classify the reaction', learn: 'combination',
        items: [Sci.gen(rng => {
          const [eq, t] = rng.pick(CLASSIFY);
          return C(rng, { prompt: `What type of reaction is this?<br><em>${eq}</em>`, right: TYPES[t], options: TYPES, wide: false, learn: TYPES[t],
            explain: ['Two substances make a single product: combination.', 'A fuel reacting with oxygen, making carbon dioxide and water: combustion.',
                      'One compound breaks into simpler substances: decomposition.', 'An acid and a base make a salt and water: neutralisation.'][t] });
        })] },

      { name: 'Complete combustion', learn: 'combustion',
        items: [Sci.gen(rng => {
          const fuel = rng.pick(['methane (natural gas)', 'propane (barbecue gas)', 'petrol', 'candle wax', 'ethanol']);
          return C(rng, { prompt: `${fuel[0].toUpperCase() + fuel.slice(1)} burns completely in plenty of oxygen. What are the products?`,
            right: 'carbon dioxide and water', wrong: ['carbon monoxide and soot', 'hydrogen and oxygen', 'carbon dioxide only'], wide: false,
            explain: 'Complete combustion of a fuel containing carbon and hydrogen gives carbon dioxide and water.' });
        })] },

      { name: 'Complete or incomplete?', learn: 'combustion',
        items: [
          rng => C(rng, { prompt: 'A Bunsen burner with its air hole closed burns with a yellow, sooty flame. Why?', right: 'Not enough oxygen: incomplete combustion makes soot',
            wrong: ['Too much oxygen', 'The gas has run out', 'The flame is hotter'], explain: 'With too little oxygen, some carbon is left as soot, which glows yellow.' }),
          rng => C(rng, { prompt: 'Why must gas heaters be used in a well-ventilated room?', right: 'Without enough oxygen, incomplete combustion makes poisonous carbon monoxide',
            wrong: ['The heater needs to cool down', 'Carbon dioxide is poisonous in small amounts', 'So the flame burns yellow'], explain: 'Carbon monoxide is colourless, odourless and poisonous, so you cannot tell it is there.' }),
          rng => C(rng, { prompt: 'Which products show that combustion was <strong>incomplete</strong>?', right: 'Soot and carbon monoxide', wrong: ['Carbon dioxide and water only', 'Oxygen and hydrogen', 'Only water'], wide: false,
            explain: 'Complete combustion gives only carbon dioxide and water.' })
        ] },

      { name: 'Thermal decomposition', learn: 'decomposition',
        items: [Sci.gen(rng => {
          const metal = rng.pick(['calcium', 'copper', 'magnesium', 'zinc']);
          return C(rng, { prompt: `${metal[0].toUpperCase() + metal.slice(1)} carbonate is heated strongly. What does it decompose into?`,
            right: `${metal} oxide + carbon dioxide`, wrong: [`${metal} + carbon dioxide`, `${metal} oxide + oxygen`, `${metal} hydroxide + water`], wide: false,
            explain: 'Metal carbonates generally decompose into a metal oxide and carbon dioxide.' });
        })] },

      { name: 'Name the salt', learn: 'neutralisation',
        items: [Sci.gen(rng => {
          const [acid, ending] = rng.pick(ACIDS), metal = rng.pick(BASE_METALS), base = rng.pick(['hydroxide', 'oxide']);
          const right = `${metal} ${ending}`;
          return C(rng, { prompt: `${acid[0].toUpperCase() + acid.slice(1)} reacts with ${metal} ${base}. What salt is made?`,
            right, wrong: ACIDS.map(a => `${metal} ${a[1]}`).filter(x => x !== right).concat([`${metal} ${base}`]), wide: false,
            explain: `The salt takes the metal’s name and the acid’s ending: ${acid.split(' ')[0]} → ${ending}. Water is made too.` });
        })] },

      { name: 'Complete the word equation', learn: 'neutralisation',
        items: [Sci.gen(rng => {
          const [acid, ending] = rng.pick(ACIDS), metal = rng.pick(BASE_METALS), base = rng.pick(['hydroxide', 'oxide', 'carbonate']);
          const carb = base === 'carbonate';
          const right = `${metal} ${ending} + water` + (carb ? ' + carbon dioxide' : '');
          const wrong = carb ? [`${metal} ${ending} + water`, `${metal} ${ending} + hydrogen`, `${metal} oxide + water + carbon dioxide`]
                             : [`${metal} ${ending} + water + carbon dioxide`, `${metal} ${ending} + hydrogen`, `${metal} + water`];
          return C(rng, { prompt: `${acid} + ${metal} ${base} → ?`, right, wrong, wide: false,
            explain: carb ? 'An acid and a metal carbonate give a salt, water and carbon dioxide.' : `An acid and a metal ${base} give a salt and water.` });
        })] },

      { name: 'Which gas?', learn: 'tests',
        items: [
          rng => C(rng, { prompt: 'Marble chips (calcium carbonate) fizz in acid. The gas turns limewater milky. What is it?', right: 'carbon dioxide', wrong: ['oxygen', 'hydrogen', 'carbon monoxide'], wide: false,
                          explain: 'An acid with a carbonate gives carbon dioxide, which turns limewater milky.' }),
          rng => C(rng, { prompt: 'Hydrogen peroxide decomposes and the gas relights a glowing splint. What is it?', right: 'oxygen', wrong: ['hydrogen', 'carbon dioxide', 'water vapour'], wide: false,
                          explain: 'hydrogen peroxide → water + oxygen; oxygen relights a glowing splint.' }),
          rng => C(rng, { prompt: 'A cold beaker held over a burning candle mists up, and the liquid turns cobalt chloride paper pink. What has been made?', right: 'water', wrong: ['carbon dioxide', 'oxygen', 'wax vapour'], wide: false,
                          explain: 'Combustion of the wax makes water, which condenses on the cold beaker.' })
        ] },

      { name: 'Reactions around us', learn: 'everyday',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these everyday reactions by type.', bins: ['Combustion', 'Decomposition', 'Neutralisation'], pick: 6,
          items: [{ text: 'cooking on a gas hob', bin: 0 }, { text: 'a car engine burning petrol', bin: 0 }, { text: 'a candle burning', bin: 0 },
                  { text: 'baking soda giving off gas in a hot oven', bin: 1 }, { text: 'limestone heated in a kiln to make lime', bin: 1 }, { text: 'hydrogen peroxide bleach slowly releasing oxygen', bin: 1 },
                  { text: 'taking an antacid for indigestion', bin: 2 }, { text: 'spreading lime on acidic soil', bin: 2 }, { text: 'treating acidic lake water with limestone', bin: 2 }],
          explain: 'Burning fuels is combustion; heating carbonates or breaking down peroxide is decomposition; a base cancelling an acid is neutralisation.'
        })] },

      { name: 'Balance the equation', learn: 'combustion',
        items: [Sci.gen(rng => balance(rng.pick(RXN_EQ)))] },

      { name: 'Predict the products', learn: 'combination',
        items: [
          rng => C(rng, { prompt: 'Magnesium burns in oxygen. What is the product?', right: 'magnesium oxide', wrong: ['magnesium carbonate', 'magnesium hydroxide', 'magnesium and water'], wide: false,
                          explain: 'Two substances combine to make one: magnesium oxide. (Burning a metal is also a combustion reaction.)' }),
          rng => C(rng, { prompt: 'Sodium reacts with chlorine. What is the product?', right: 'sodium chloride', wrong: ['sodium chlorate', 'sodium and chlorine gas', 'sodium hydroxide'], wide: false,
                          explain: 'A metal and a non-metal combine into an ionic compound: sodium chloride.' }),
          rng => C(rng, { prompt: 'Copper carbonate (green) is heated and turns black. What is the black solid?', right: 'copper oxide', wrong: ['copper', 'carbon', 'copper hydroxide'], wide: false,
                          explain: 'Thermal decomposition: copper carbonate → copper oxide (black) + carbon dioxide.' })
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Balance the harder ones', learn: 'combustion',
        items: [Sci.gen(rng => balance(rng.pick(RXN_HARD)))] },

      { challenge: 'only', name: 'Evidence to type', learn: 'tests',
        items: [
          rng => C(rng, { prompt: 'A white powder is heated. Its mass decreases, and the gas given off turns limewater milky. What has most likely happened?',
            right: 'Thermal decomposition of a metal carbonate', wrong: ['Combustion of a fuel', 'Neutralisation', 'Combination with oxygen'],
            explain: 'Losing mass and giving off carbon dioxide on heating is how a carbonate decomposes.' }),
          rng => C(rng, { prompt: 'A grey metal is heated in air. It glows, and its mass increases. What type of reaction is this?', right: 'Combustion of a metal (combining with oxygen)',
            wrong: ['Decomposition', 'Neutralisation', 'No reaction: just heating'], explain: 'Mass gained from oxygen: the metal combines with oxygen to form its oxide.' }),
          rng => C(rng, { prompt: 'Alkali is added to an acid until universal indicator turns green, and the beaker warms slightly. What has happened?', right: 'Neutralisation: a salt and water have formed',
            wrong: ['Combustion', 'Decomposition', 'The indicator has decomposed'], explain: 'Green means pH 7: the acid has been neutralised.' })
        ] },

      { challenge: 'only', name: 'Mass in decomposition', learn: 'decomposition',
        items: [Sci.gen(rng => {
          const x = rng.pick([5, 10, 20, 25, 50]), oxide = +(x * 0.56).toFixed(1), co2 = +(x * 0.44).toFixed(1);
          return { prompt: `${x} g of calcium carbonate is heated until it has all decomposed. ${oxide} g of calcium oxide is left. What mass of carbon dioxide was given off?`,
                   input: { kind: 'number', answer: co2, tol: 0.001, decimal: true, suffix: 'g', width: 70 },
                   explain: `Mass is conserved: ${x} − ${oxide} = ${co2} g of carbon dioxide escaped as a gas.` };
        })] },

      { challenge: 'only', name: 'Planning a test', learn: 'tests',
        items: [
          rng => C(rng, { prompt: 'How could you show that a reaction between an acid and a base is neutralisation?', right: 'Measure the pH before and after: it moves to 7',
            wrong: ['Check that it gets hotter', 'Test for oxygen', 'Weigh the beaker'], explain: 'A neutralised solution reaches pH 7, which an indicator or pH meter shows.' }),
          rng => C(rng, { prompt: 'To compare which of three fuels gives most energy, which must be kept the same?', right: 'The mass of fuel burned and the volume of water heated',
            wrong: ['The type of fuel', 'The temperature rise', 'Nothing'], explain: 'The fuel is the independent variable; the temperature rise is measured; everything else is controlled.' }),
          rng => C(rng, { prompt: 'In a decomposition investigation, why heat each carbonate for the same time with the same flame?', right: 'So only the type of carbonate changes',
            wrong: ['To make it go faster', 'To change the dependent variable', 'Because limewater needs it'], explain: 'Controlling the heating keeps the test fair.' })
        ] },

      { challenge: 'only', name: 'Combustion and safety', learn: 'combustion',
        items: [
          rng => C(rng, { prompt: 'Why is carbon monoxide especially dangerous?', right: 'It is poisonous, and has no colour or smell to warn you', wrong: ['It is very explosive', 'It makes flames yellow', 'It is heavier than water'],
                          explain: 'You cannot see or smell it, which is why carbon monoxide alarms are used.' }),
          rng => C(rng, { prompt: 'A gas appliance’s flame turns from blue to yellow. What should be done?', right: 'Have it checked: it is not getting enough air, so it may be making carbon monoxide',
            wrong: ['Nothing: yellow flames are hotter', 'Close the windows to keep heat in', 'Turn the gas up'], explain: 'A yellow flame is a sign of incomplete combustion.' })
        ] }
    ]
  });


  // ═══ 10.3 Waves, sound and light ══════════════════════════════════════════
  // Knowledge: Waves and energy transfer through waves (Matter, interactions
  // and energy, Year 10, p. 26).
  // Practices: investigate waves and matter; compare models of waves; organise
  // the electromagnetic spectrum by use; judge claims about waves.

  const EM = ['radio waves', 'microwaves', 'infrared', 'visible light', 'ultraviolet', 'X-rays', 'gamma rays'];
  const EM_USE = [['radio waves', 'broadcasting radio and TV'], ['microwaves', 'heating food and carrying mobile phone signals'], ['infrared', 'TV remote controls and thermal cameras'],
                  ['visible light', 'seeing, and signals in optical fibres'], ['ultraviolet', 'sterilising water and detecting forged banknotes'], ['X-rays', 'images of broken bones'],
                  ['gamma rays', 'killing cancer cells']];

  Sci.topic({
    id: 's10e3', unit: 'electricity-forces',
    title: 'Waves, Sound and Light',
    blurb: 'How waves carry energy without carrying matter: sound, the electromagnetic spectrum, light and colour.',
    hint: 'Frequency is oscillations per second (Hz); wavelength is the distance between repeating points; amplitude is the size of the oscillation. ' +
          'Transverse waves oscillate across the direction of travel, longitudinal along it. Sound is a longitudinal mechanical wave and needs a medium; ' +
          'electromagnetic waves need none and all travel at the same speed in a vacuum. Pitch comes from frequency, loudness from amplitude.',

    learn: [
      { id: 'waves', title: 'What a wave is',
        text: '<p>An <strong>oscillation</strong> is a repeated back-and-forth motion about a fixed position. A <strong>wave</strong> is oscillations that transfer energy through matter or a field, without carrying the matter along overall.</p>' +
              '<p>When a material absorbs a wave, its particles move more: its thermal energy rises.</p>' },
      { id: 'measure', title: 'Describing a wave', diagram: { w: 300, h: 130 },
        draw(d) { SciDia.wave(d, { cycles: 2, markers: ['wavelength', 'amplitude'] }); },
        text: '<ul><li>1: <strong>wavelength</strong>, the distance between repeating points (crest to crest).</li><li>2: <strong>amplitude</strong>, the size of the oscillation from the middle.</li>' +
              '<li><strong>Frequency</strong>: how many oscillations each second, in hertz (Hz).</li></ul>' },
      { id: 'types', title: 'Transverse and longitudinal', diagram: { w: 300, h: 80, caption: 'A longitudinal wave: compressions and rarefactions.' },
        draw(d) { SciDia.longitudinal(d, { cycles: 3 }); },
        text: '<p><strong>Transverse</strong>: oscillations at right angles to the direction of travel (a rope shaken side to side; light).</p>' +
              '<p><strong>Longitudinal</strong>: oscillations along the direction of travel, making compressions and rarefactions (a slinky pushed and pulled; sound).</p>' },
      { id: 'sound', title: 'Sound',
        text: '<ul><li>A longitudinal <strong>mechanical</strong> wave, made by vibrations; it needs a medium.</li><li>Higher frequency, higher <strong>pitch</strong>. Bigger amplitude, louder: volume is measured in <strong>decibels (dB)</strong>.</li>' +
              '<li>Fastest in stiff materials: generally solids, then liquids, slowest in gases. It cannot travel through a vacuum.</li></ul>' },
      { id: 'em', title: 'The electromagnetic spectrum', wide: true,
        text: '<p>Electromagnetic waves are oscillations of electric and magnetic fields. They need no medium, and all travel at the same speed in a vacuum.</p>' +
              '<p>Longest wavelength, lowest frequency → shortest wavelength, highest frequency:</p><p><strong>' + EM.join(' → ') + '</strong></p>' },
      { id: 'light', title: 'Light',
        text: '<p>Light is a transverse electromagnetic wave. Meeting a material, it can be <strong>absorbed</strong>, <strong>reflected</strong>, <strong>transmitted</strong> or <strong>scattered</strong>, and it <strong>refracts</strong> (changes direction) passing from one medium into another.</p>' },
      { id: 'colour', title: 'Colour',
        text: '<p>Wavelength (and frequency) decides colour. White light contains all visible wavelengths. An object’s colour is the light it reflects or transmits: a red apple reflects red and absorbs the rest; white reflects all; black absorbs all.</p>' },
      { id: 'callaghan', title: 'Sir Paul Callaghan',
        text: '<p>New Zealand physicist Sir Paul Callaghan used electromagnetic radiation and magnetic fields to study materials, work that advanced techniques used in medicine, such as MRI.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: frequency',
        steps: ['A buoy bobs up and down 12 times in 4 seconds as waves pass.', 'Frequency is oscillations per second: 12 ÷ 4 = 3.'],
        result: '3 Hz'
      },
      {
        title: 'Example 2: pitch and loudness',
        diagram: { w: 300, h: 150 }, draw(d) { SciDia.twoWaves(d, { a: { cycles: 2, amp: 20 }, b: { cycles: 5, amp: 20 } }); },
        steps: ['Same amplitude, so the same loudness.', 'B has more waves in the same time: a higher frequency, so a higher pitch.'],
        result: 'B sounds higher; they are equally loud'
      }
    ],

    slots: [
      { name: 'Label a wave', learn: 'measure',
        items: [Sci.gen(rng => {
          const markers = rng.shuffle(['wavelength', 'amplitude', 'crest', 'trough']);
          return Sci.label(rng, { prompt: 'Name each numbered feature of the wave.', diagram: { w: 300, h: 140 }, draw: d => SciDia.wave(d, { cycles: 2, markers }),
            markers, options: ['wavelength', 'amplitude', 'crest', 'trough', 'frequency'],
            explain: 'Wavelength: crest to crest. Amplitude: from the middle to a crest. The crest is the top, the trough the bottom. Frequency cannot be seen in a single picture.' });
        })] },

      { name: 'Frequency, wavelength, amplitude', learn: 'measure',
        items: [
          rng => C(rng, { prompt: 'What does a frequency of 50 Hz mean?', right: '50 oscillations every second', wrong: ['The wave is 50 m long', 'The wave travels 50 m every second', 'The wave lasts 50 seconds'],
                          explain: 'Hertz means oscillations per second.' }),
          rng => C(rng, { prompt: 'What is the wavelength of a wave?', right: 'The distance between repeating points, such as crest to crest', wrong: ['The height from crest to trough', 'How many waves pass each second', 'How fast the wave travels'],
                          explain: 'Wavelength is a distance along the wave.' }),
          rng => C(rng, { prompt: 'What is the amplitude of a wave?', right: 'The size of the oscillation, from the middle to a crest', wrong: ['The distance from crest to crest', 'The number of waves per second', 'The length of the whole wave'],
                          explain: 'Amplitude is measured from the rest position, not from crest to trough.' }),
          rng => C(rng, { prompt: 'What is the unit of frequency?', right: 'hertz (Hz)', wrong: ['metre (m)', 'decibel (dB)', 'newton (N)'], wide: false, explain: 'Frequency is in hertz.' })
        ] },

      { name: 'Calculating frequency', learn: 'measure',
        items: [Sci.gen(rng => {
          const f = rng.int(2, 8), t = rng.int(2, 6);
          const what = rng.pick([['A buoy bobs up and down', 'times'], ['A guitar string is filmed and vibrates', 'times'], ['Crests pass a pier post', 'times']]);
          return { prompt: `${what[0]} ${f * t} ${what[1]} in ${t} seconds. What is the frequency?`, input: { kind: 'number', answer: f, suffix: 'Hz', width: 70 },
                   explain: `Frequency = oscillations ÷ time = ${f * t} ÷ ${t} = ${f} Hz.` };
        })] },

      { name: 'Transverse or longitudinal?', learn: 'types',
        items: [
          ...[['Sound travelling through air', 'longitudinal'], ['Light from the Sun', 'transverse'], ['A slinky pushed and pulled along its length', 'longitudinal'],
              ['A rope shaken from side to side', 'transverse'], ['Radio waves', 'transverse']].map(([s, t]) => rng => C(rng, { prompt: `${s}: what kind of wave is this?`,
                right: t === 'transverse' ? 'Transverse' : 'Longitudinal', options: ['Transverse', 'Longitudinal'],
                explain: t === 'transverse' ? 'The oscillation is at right angles to the direction the wave travels.' : 'The oscillation is along the direction the wave travels, in compressions and rarefactions.' })),
          rng => C(rng, { prompt: 'What kind of wave is drawn here?', diagram: { w: 300, h: 80 }, draw: d => SciDia.longitudinal(d, { cycles: 3 }),
            right: 'Longitudinal', options: ['Transverse', 'Longitudinal'], explain: 'Bunched-up compressions and spread-out rarefactions: the oscillation is along the direction of travel.' })
        ] },

      { name: 'Needs a medium?', learn: 'em',
        items: [rng => Sci.sort(rng, {
          prompt: 'Sort these waves.', bins: ['Mechanical (needs a medium)', 'Electromagnetic (no medium needed)'], pick: 6,
          items: [...['sound', 'ripples on a pond', 'an earthquake wave through rock', 'a wave along a rope', 'ultrasound in a scan'].map(text => ({ text, bin: 0 })),
                  ...['light', 'radio waves', 'X-rays', 'microwaves', 'infrared from a heater'].map(text => ({ text, bin: 1 }))],
          explain: 'Mechanical waves are oscillations of particles, so they need matter. Electromagnetic waves are oscillating fields and cross empty space.'
        })] },

      { name: 'Pitch and loudness', learn: 'sound',
        items: [Sci.gen(rng => {
          const askPitch = rng.chance();
          const lo = rng.pick([2, 3]), small = rng.pick([10, 12]);
          let a = askPitch ? { cycles: lo, amp: 20 } : { cycles: 3, amp: small };
          let b = askPitch ? { cycles: lo * 2, amp: 20 } : { cycles: 3, amp: 30 };
          if (rng.chance()) [a, b] = [b, a];
          const higher = askPitch ? (a.cycles > b.cycles ? 'A' : 'B') : (a.amp > b.amp ? 'A' : 'B');
          return C(rng, { prompt: `These sound waves are drawn over the same time. Which sounds ${askPitch ? 'higher pitched' : 'louder'}?`,
            diagram: { w: 300, h: 150 }, draw: d => SciDia.twoWaves(d, { a, b }), right: higher, wrong: [higher === 'A' ? 'B' : 'A', 'They are the same'], wide: false,
            explain: askPitch ? `${higher} has more oscillations in the same time: a higher frequency, so a higher pitch.` : `${higher} has the bigger amplitude, so it is louder.` });
        })] },

      { name: 'Sound in different materials', learn: 'sound',
        items: [
          rng => C(rng, { prompt: 'Through which does sound generally travel fastest?', right: 'steel', wrong: ['water', 'air', 'a vacuum'], wide: false,
                          explain: 'Sound is fastest in stiff materials: solids, then liquids, then gases. It cannot cross a vacuum.' }),
          rng => C(rng, { prompt: 'Why can astronauts on a spacewalk not hear each other directly, even close together?', right: 'Space is a vacuum, and sound needs a medium',
            wrong: ['Sound is too slow in space', 'Their helmets reflect sound', 'Space is too cold for sound'], explain: 'Sound is a mechanical wave: with no particles to oscillate, it cannot travel. They use radio, an electromagnetic wave.' }),
          rng => C(rng, { prompt: 'With your ear to a long metal fence, you hear a tap at the far end before the sound arrives through the air. Why?', right: 'Sound travels faster through the metal than through air',
            wrong: ['Metal makes sound louder only', 'Air blocks sound completely', 'Light carries the sound'], explain: 'Solids carry sound faster than gases.' }),
          rng => C(rng, { prompt: 'Which sound is the loudest?', right: '110 dB', wrong: ['60 dB', '30 dB', '85 dB'], wide: false, explain: 'Volume is measured in decibels: more decibels, louder.' })
        ] },

      { name: 'The electromagnetic spectrum', learn: 'em',
        items: [Sci.gen(rng => {
          const start = rng.int(0, 2), seq = EM.slice(start, start + 5);
          return Sci.order(rng, 'Put these in order, from the <strong>longest</strong> wavelength to the shortest.', seq,
            'Radio waves have the longest wavelength and lowest frequency; gamma rays the shortest wavelength and highest frequency: ' + EM.join(', ') + '.', { learn: 'em' });
        })] },

      { name: 'Uses of electromagnetic waves', learn: 'em',
        items: [Sci.gen(rng => {
          const rows = rng.sample(EM_USE, 4);
          return Sci.match(rng, 'Match each electromagnetic wave to a use.', rows, 'Each part of the spectrum is used for what its wavelength suits.', { learn: 'em' });
        })] },

      { name: 'Light and colour', learn: 'colour',
        items: [
          rng => C(rng, { prompt: 'Why does a red apple look red in white light?', right: 'It reflects red light and absorbs the other colours', wrong: ['It absorbs red light', 'It makes red light', 'It transmits all colours'],
                          explain: 'We see the wavelengths an object reflects.' }),
          rng => C(rng, { prompt: 'A white T-shirt and a black T-shirt hang in the sun. Which warms up more, and why?', right: 'The black one: it absorbs all wavelengths of light',
            wrong: ['The white one: it reflects all wavelengths', 'They warm equally', 'The black one: it reflects heat'], explain: 'Absorbed light energy raises the thermal energy of the material.' }),
          rng => C(rng, { prompt: 'A prism splits white light into a spectrum of colours. What does this show?', right: 'White light contains all the visible wavelengths',
            wrong: ['The prism adds colour to the light', 'Light is a longitudinal wave', 'Glass absorbs white light'], explain: 'Each wavelength refracts by a slightly different amount, so the colours separate.' }),
          rng => C(rng, { prompt: 'A green leaf is lit only by red light. What colour does it look?', right: 'Dark, almost black', wrong: ['Green', 'Red', 'White'], wide: false,
                          explain: 'It reflects green, but there is no green light to reflect; the red is absorbed.' })
        ] },

      { name: 'What happens to light', learn: 'light',
        items: [
          ...[['Light passes straight through a clear window.', 'transmitted'], ['A mirror sends light back so you see your face.', 'reflected'],
              ['A black road surface gets hot in the sun.', 'absorbed'], ['A straw looks bent where it enters a glass of water.', 'refracted'],
              ['Sunlight bounces off air particles in all directions, making the sky blue.', 'scattered']]
            .map(([s, r]) => rng => C(rng, { prompt: `${s} The light is mostly…`, right: r, wrong: ['transmitted', 'reflected', 'absorbed', 'refracted', 'scattered'].filter(x => x !== r).slice(0, 3), wide: false,
              explain: { transmitted: 'Transmitted: it passes through.', reflected: 'Reflected: it bounces back.', absorbed: 'Absorbed: its energy goes into the material, which warms up.',
                         refracted: 'Refracted: it changes direction passing from water into air.', scattered: 'Scattered: sent off in many directions by small particles.' }[r] }))
        ] },

      // ── Challenge set.
      { challenge: 'only', name: 'Wavelength from a diagram', learn: 'measure',
        items: [Sci.gen(rng => {
          const n = rng.int(2, 4), L = n * rng.pick([0.5, 1, 1.5, 2, 3]);
          return { prompt: `A rope wave is photographed. Along ${num(L)} m of rope there are exactly ${n} complete waves. What is the wavelength?`,
                   diagram: { w: 300, h: 110 }, draw: d => SciDia.wave(d, { cycles: n }),
                   input: { kind: 'number', answer: +(L / n).toFixed(4), tol: 0.001, decimal: true, suffix: 'm', width: 70 },
                   explain: `${n} wavelengths fit in ${num(L)} m, so one is ${num(L)} ÷ ${n} = ${num(L / n)} m.` };
        })] },

      { challenge: 'only', name: 'Same speed, different waves', learn: 'em',
        items: [
          rng => C(rng, { prompt: 'All electromagnetic waves travel at the same speed in a vacuum. Gamma rays have a much higher frequency than radio waves. What follows?', right: 'Gamma rays have a much shorter wavelength',
            wrong: ['Gamma rays travel faster', 'Gamma rays have a longer wavelength', 'Radio waves carry no energy'], explain: 'At the same speed, more waves per second means each wave is shorter.' }),
          rng => C(rng, { prompt: 'Light from the Sun and radio waves from a distant spacecraft travel through space. Which arrives first, if they set off together from the same place?', right: 'They arrive together',
            wrong: ['The light', 'The radio waves', 'Neither: they cannot cross space'], wide: false, explain: 'All electromagnetic waves travel at the same speed in a vacuum.' })
        ] },

      { challenge: 'only', name: 'Judging a claim', learn: 'em',
        items: [
          rng => C(rng, { prompt: 'A website claims: “Microwave ovens make food radioactive.” What is the best response?', right: 'It is false: microwaves heat food by making its water molecules move faster, and leave nothing radioactive behind',
            wrong: ['It is true, because microwaves are electromagnetic waves', 'It must be true if it is on a website', 'It is true only for frozen food'],
            explain: 'Microwaves transfer energy that raises the food’s thermal energy. Checking claims against how the waves actually interact with matter, and against reliable sources, exposes the error.' }),
          rng => C(rng, { prompt: 'Which source would give the most reliable information about the safety of mobile phone signals?', right: 'A health agency’s summary of many independent studies',
            wrong: ['A video by someone selling “radiation shields”', 'A single online comment', 'An advertisement for a phone'], explain: 'Look for evidence from many studies and sources without something to sell.' }),
          rng => C(rng, { prompt: 'Why is sunscreen advice about ultraviolet well supported?', right: 'Ultraviolet carries enough energy to damage skin cells, and studies link sunburn to skin cancer',
            wrong: ['All electromagnetic waves are equally harmful', 'Ultraviolet is a sound wave', 'Only visible light reaches the ground'], explain: 'The claim fits both the science of the wave and the evidence.' })
        ] },

      { challenge: 'only', name: 'Models of waves', learn: 'waves',
        items: [
          rng => C(rng, { prompt: 'A row of falling dominoes is used as a model of a wave. What does it show well?', right: 'Energy passing along while each domino stays roughly in place',
            wrong: ['A wave repeating its oscillation many times', 'How waves reflect', 'The frequency of a wave'], explain: 'Each domino only tips over: energy travels, matter does not. But dominoes do not spring back, so it shows only one pulse.' }),
          rng => C(rng, { prompt: 'Why is a slinky a better model for sound than a rope?', right: 'It can be pushed and pulled to make compressions, like a longitudinal wave',
            wrong: ['It is made of metal', 'It is longer', 'It can only make transverse waves'], explain: 'Sound is longitudinal; a slinky pushed along its length models compressions and rarefactions.' }),
          rng => C(rng, { prompt: 'A seagull sits on the sea as waves pass. What does it do?', right: 'Bobs up and down, staying in about the same place',
            wrong: ['Is carried along with the waves', 'Stays perfectly still', 'Moves backwards'], explain: 'Waves transfer energy, not matter: the water (and the gull) oscillates in place.' })
        ] },

      { challenge: 'only', name: 'Colour filters', learn: 'colour',
        items: [
          rng => C(rng, { prompt: 'White light shines through a red filter. What comes out?', right: 'Only red light', wrong: ['White light', 'All colours except red', 'No light'], wide: false,
                          explain: 'The filter transmits red and absorbs the other wavelengths.' }),
          rng => C(rng, { prompt: 'Red light from a filter falls on a blue book. How does the book look?', right: 'Black', wrong: ['Blue', 'Red', 'Purple'], wide: false,
                          explain: 'The blue book absorbs red and there is no blue light to reflect.' })
        ] },

      { challenge: 'only', name: 'Sir Paul Callaghan', learn: 'callaghan',
        items: [rng => C(rng, { prompt: 'Sir Paul Callaghan’s research used electromagnetic radiation and magnetic fields to study materials. Which medical technique did this kind of work help advance?',
          right: 'MRI scanning', wrong: ['X-ray photographs', 'Ultrasound', 'Blood tests'], wide: false,
          explain: 'MRI uses strong magnetic fields and radio waves to image soft tissue.' })] }
    ]
  });


  // ═══ 10.4 Force, mass and acceleration ════════════════════════════════════
  // Knowledge: Forces and acceleration (Motion and forces, Year 10, pp. 26–27).
  // Practices: calculate force, mass and acceleration; Newton’s laws to
  // predict motion; fair tests (air resistance); accuracy of equipment.

  Sci.topic({
    id: 's10e4', unit: 'electricity-forces',
    title: 'Force, Mass and Acceleration',
    blurb: 'F = ma: how net force and mass decide acceleration, inertia, and why forces come in pairs.',
    hint: 'Acceleration is the rate of change of velocity (speed or direction), in m/s². F = ma: net force (N) = mass (kg) × acceleration (m/s²); a = F ÷ m and m = F ÷ a. ' +
          'Use the NET force. More mass, less acceleration for the same force. Every force has an equal and opposite partner acting on the other object.',

    learn: [
      { id: 'accel', title: 'Acceleration',
        text: '<p><strong>Acceleration</strong> is the rate at which velocity changes: speeding up, slowing down, or changing direction. Measured in <strong>m/s²</strong>.</p>' +
              '<p>' + m('a = \\dfrac{\\text{change in speed}}{\\text{time}}') + ': from 0 to 12 m/s in 4 s is 3 m/s², gaining 3 m/s every second.</p>' },
      { id: 'fma', title: 'F = ma',
        text: '<p style="text-align:center">' + m('F = m \\times a') + '</p>' +
              '<p>Net force in newtons, mass in kilograms, acceleration in m/s². Rearranged: ' + m('a = F \\div m') + ' and ' + m('m = F \\div a') + '.</p>' },
      { id: 'mass', title: 'More mass, less acceleration',
        text: '<p>For the same mass, a larger net force gives a larger acceleration. For the same net force, a larger mass accelerates less: an empty trolley speeds up more easily than a full one.</p>' },
      { id: 'inertia', title: 'Inertia',
        text: '<p>Objects resist changes in their motion. This is <strong>inertia</strong>, and it depends on mass: a loaded truck is harder to start and to stop than a car.</p>' +
              '<p>When a bus brakes, passengers keep moving forwards: seatbelts supply the force to stop them.</p>' },
      { id: 'pairs', title: 'Action–reaction pairs',
        text: '<p>In every interaction, each object pushes or pulls on the other with a force <strong>equal in size and opposite in direction</strong>. The two forces act on <strong>different objects</strong>, so they never cancel each other.</p>' +
              '<p>A swimmer pushes the water backwards; the water pushes the swimmer forwards.</p>' },
      { id: 'fbd', title: 'Free-body diagrams', diagram: { w: 260, h: 150 },
        draw(d) { SciDia.forceDiagram(d, { left: 200, right: 800, up: 600, down: 600 }, { label: '60 kg' }); },
        text: '<p>Find the net force first: 800 − 200 = 600 N. Then ' + m('a = 600 \\div 60 = 10') + ' m/s².</p>' }
    ],

    examples: [
      {
        title: 'Example 1: acceleration from F = ma',
        steps: ['A 1200 kg car has a net force of 3600 N forwards.', m('a = F \\div m = 3600 \\div 1200 = 3') + ' m/s².'],
        result: '3 m/s² forwards'
      },
      {
        title: 'Example 2: net force first',
        diagram: { w: 260, h: 160 }, draw(d) { SciDia.forceDiagram(d, { up: 15000, down: 10000 }, { label: '1000 kg' }); },
        steps: ['A 1000 kg rocket: thrust 15 000 N up, weight 10 000 N down.', 'Net force: 15 000 − 10 000 = 5000 N up.', m('a = 5000 \\div 1000 = 5') + ' m/s².'],
        result: '5 m/s² upwards'
      }
    ],

    slots: [
      { name: 'Calculate force', learn: 'fma',
        items: [Sci.gen((rng, diff) => {
          const mass = diff === 'core' ? rng.int(2, 20) : rng.pick([0.5, 1.5, 60, 75, 800, 1200]), a = diff === 'core' ? rng.int(1, 6) : rng.pick([0.5, 1.5, 2, 3, 4]);
          const F = +(mass * a).toFixed(2);
          return { prompt: `What net force gives a ${num(mass)} kg object an acceleration of ${num(a)} m/s²?`, input: { kind: 'number', answer: F, tol: 0.001, decimal: true, suffix: 'N', width: 80 },
                   explain: m(`F = ma = ${mass} \\times ${a} = ${num(F)}`) + ' N' };
        })] },

      { name: 'Calculate acceleration', learn: 'fma',
        items: [Sci.gen(rng => {
          const mass = rng.pick([2, 4, 5, 10, 20, 50, 800, 1000]), a = rng.int(1, 8);
          return { prompt: `A net force of ${mass * a} N acts on a ${mass} kg object. What is its acceleration?`, input: { kind: 'number', answer: a, suffix: 'm/s²', width: 70 },
                   explain: m(`a = F \\div m = ${mass * a} \\div ${mass} = ${a}`) + ' m/s²' };
        })] },

      { name: 'Calculate mass', learn: 'fma',
        items: [Sci.gen(rng => {
          const mass = rng.pick([3, 5, 8, 12, 40, 60, 250]), a = rng.int(2, 6);
          return { prompt: `A net force of ${mass * a} N gives a trolley an acceleration of ${a} m/s². What is its mass?`, input: { kind: 'number', answer: mass, suffix: 'kg', width: 70 },
                   explain: m(`m = F \\div a = ${mass * a} \\div ${a} = ${mass}`) + ' kg' };
        })] },

      { name: 'Net force, then acceleration', learn: 'fbd',
        items: [Sci.gen(rng => {
          const mass = rng.pick([2, 4, 5, 10, 20, 50]), a = rng.int(1, 5), back = rng.int(1, 6) * 10;
          const fwd = mass * a + back;
          return { prompt: `The box has a mass of ${mass} kg. What is its acceleration?`, diagram: { w: 260, h: 110 },
                   draw: d => SciDia.forceDiagram(d, { left: back, right: fwd }, { label: mass + ' kg' }),
                   input: { kind: 'number', answer: a, suffix: 'm/s²', width: 70 },
                   explain: `Net force = ${fwd} − ${back} = ${fwd - back} N. Then a = ${fwd - back} ÷ ${mass} = ${a} m/s².` };
        })] },

      { name: 'Acceleration from a change in speed', learn: 'accel',
        items: [Sci.gen(rng => {
          const a = rng.int(1, 6), t = rng.int(2, 8), v0 = rng.pick([0, 0, 2, 4, 5]);
          const v1 = v0 + a * t;
          return { prompt: `A cyclist speeds up from ${v0} m/s to ${v1} m/s in ${t} s. What is the acceleration?`, input: { kind: 'number', answer: a, suffix: 'm/s²', width: 70 },
                   explain: `Change in speed = ${v1} − ${v0} = ${v1 - v0} m/s, over ${t} s: ${v1 - v0} ÷ ${t} = ${a} m/s².` };
        })] },

      { name: 'What acceleration means', learn: 'accel',
        items: [
          rng => C(rng, { prompt: 'A car accelerates at 2 m/s². What does that mean?', right: 'Its speed increases by 2 m/s every second', wrong: ['It travels 2 m every second', 'Its speed is 2 m/s', 'It takes 2 s to stop'],
                          explain: 'm/s² means metres per second, every second.' }),
          rng => C(rng, { prompt: 'A car drives round a roundabout at a steady 30 km/h. Is it accelerating?', right: 'Yes: its direction is changing', wrong: ['No: its speed is constant', 'Only if it speeds up', 'No: cars cannot accelerate on bends'],
                          explain: 'Acceleration is any change in velocity, which includes direction.' }),
          rng => C(rng, { prompt: 'What is the unit of acceleration?', right: 'm/s²', wrong: ['m/s', 'N', 'kg'], wide: false, explain: 'Acceleration is in metres per second squared.' })
        ] },

      { name: 'Same force, different mass', learn: 'mass',
        items: [
          rng => C(rng, { prompt: 'The same push is given to an empty shopping trolley and a full one. Which accelerates more?', right: 'The empty one', wrong: ['The full one', 'They accelerate equally', 'Neither moves'], wide: false,
                          explain: 'Same force, smaller mass: larger acceleration.' }),
          rng => C(rng, { prompt: 'A truck and a small car have engines giving the same net force. Which accelerates faster from the lights?', right: 'The small car', wrong: ['The truck', 'They are equal', 'It depends only on the driver'], wide: false,
                          explain: 'The truck’s greater mass means less acceleration for the same force.' }),
          rng => C(rng, { prompt: 'A 2 kg and a 4 kg trolley are pushed with the same net force. How do their accelerations compare?', right: 'The 2 kg trolley’s is twice as big', wrong: ['The 4 kg trolley’s is twice as big', 'They are equal', 'The 2 kg trolley’s is half as big'],
                          explain: 'a = F ÷ m: half the mass, double the acceleration.' })
        ] },

      { name: 'Inertia', learn: 'inertia',
        items: [
          rng => C(rng, { prompt: 'A bus brakes suddenly. Why do standing passengers lurch forward?', right: 'Their inertia keeps them moving forward while the bus slows', wrong: ['The bus pushes them forward', 'The brakes pull them forward', 'Gravity pulls them forward'],
                          explain: 'Nothing has yet acted to slow the passengers, so they keep moving.' }),
          rng => C(rng, { prompt: 'Why is a loaded truck harder to stop than an empty one at the same speed?', right: 'It has more mass, so more inertia', wrong: ['Its brakes are weaker', 'It has less inertia', 'It is going faster'],
                          explain: 'Inertia depends on mass: the more mass, the more it resists changes in motion.' }),
          rng => C(rng, { prompt: 'Why do cars have headrests?', right: 'In a rear-end crash the car is pushed forward, and the head’s inertia would leave it behind', wrong: ['To make the seats taller', 'To stop people falling asleep', 'To push the head forward in a crash'],
                          explain: 'The headrest pushes the head forward along with the body.' })
        ] },

      { name: 'Force pairs', learn: 'pairs',
        items: [
          rng => C(rng, { prompt: 'A swimmer pushes water backwards with their hands. What is the reaction force?', right: 'The water pushes the swimmer forwards', wrong: ['The water pushes the swimmer backwards', 'Gravity pulls the swimmer down', 'There is none'],
                          explain: 'Equal and opposite, acting on the other object.' }),
          rng => C(rng, { prompt: 'You push on a wall with a force of 80 N. How hard does the wall push on you?', right: '80 N, away from the wall', wrong: ['0 N: walls do not push', '160 N', '40 N'], wide: false,
                          explain: 'Action and reaction are equal in size and opposite in direction.' }),
          rng => C(rng, { prompt: 'How does a rocket accelerate in space, with nothing to push against?', right: 'It pushes hot gas backwards, and the gas pushes the rocket forwards', wrong: ['It pushes against the air', 'Gravity pulls it forwards', 'It cannot accelerate in space'],
                          explain: 'The force pair is between the rocket and its exhaust gas.' })
        ] },

      { name: 'Bigger force, bigger acceleration', learn: 'fma',
        items: [Sci.gen(rng => {
          const mass = rng.pick([2, 5, 10]), f1 = rng.int(1, 4) * 10, k = rng.pick([2, 3]);
          return C(rng, { prompt: `A ${mass} kg trolley is pushed with ${f1} N, then with ${f1 * k} N (no friction). How does the second acceleration compare with the first?`,
            right: `${k} times as big`, wrong: ['The same', `${k === 2 ? 3 : 2} times as big`, `${k} times smaller`], wide: false,
            explain: `For the same mass, acceleration is proportional to net force: ${k} times the force, ${k} times the acceleration (${f1 / mass} and ${f1 * k / mass} m/s²).` });
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Vertical forces', learn: 'fbd',
        items: [Sci.gen(rng => {
          const mass = rng.pick([500, 1000, 2000]), a = rng.int(2, 8), W = mass * 10, T = W + mass * a;
          return { prompt: `A ${mass} kg rocket has a weight of ${W} N and an engine thrust of ${T} N. What is its acceleration?`, diagram: { w: 260, h: 160 },
                   draw: d => SciDia.forceDiagram(d, { up: T, down: W }, { label: mass + ' kg' }), input: { kind: 'number', answer: a, suffix: 'm/s²', width: 70 },
                   explain: `Net force = ${T} − ${W} = ${T - W} N up. a = ${T - W} ÷ ${mass} = ${a} m/s².` };
        })] },

      { challenge: 'only', name: 'Find the driving force', learn: 'fma',
        items: [Sci.gen(rng => {
          const mass = rng.pick([800, 1000, 1200, 1500]), a = rng.pick([1, 1.5, 2, 2.5]), fr = rng.int(3, 9) * 100;
          const D = mass * a + fr;
          return { prompt: `A ${mass} kg car accelerates at ${a} m/s². Friction and air resistance total ${fr} N. What driving force does the engine provide?`,
                   input: { kind: 'number', answer: D, suffix: 'N', width: 90 },
                   explain: `The net force needed is ma = ${mass} × ${a} = ${mass * a} N. The engine must also overcome ${fr} N: ${mass * a} + ${fr} = ${D} N.` };
        })] },

      { challenge: 'only', name: 'Pairs or not?', learn: 'pairs',
        items: [
          rng => C(rng, { prompt: 'A book rests on a table. Its weight (Earth pulling it down) and the table pushing it up are equal and opposite. Are they an action–reaction pair?',
            right: 'No: both act on the book; they balance, but they are not a pair', wrong: ['Yes: they are equal and opposite', 'Yes: they both involve the table', 'No: they are not equal'],
            explain: 'A pair acts on two different objects. The partner of the book’s weight is the book pulling the Earth up.' }),
          rng => C(rng, { prompt: 'If action and reaction are always equal and opposite, why can a horse pull a cart forward?', right: 'The pair acts on different objects, so they do not cancel; the cart moves because the forces on the cart are unbalanced',
            wrong: ['The horse’s pull is bigger than the cart’s pull back', 'Action–reaction pairs only apply when things are still', 'The cart has no inertia'],
            explain: 'To find whether the cart accelerates, add the forces on the cart alone.' })
        ] },

      { challenge: 'only', name: 'Force and acceleration data', learn: 'mass',
        items: [Sci.gen(rng => {
          const mass = rng.pick([0.5, 1, 2]);
          const pts = [1, 2, 3, 4, 5].map(F => [F, F / mass]);
          return C(rng, { prompt: `A trolley’s acceleration was measured for different net forces. What does the graph show?`, diagram: { w: 280, h: 180 },
            draw: d => SciDia.graph(d, { xMax: 5, yMax: 5 / mass, xStep: 1, xLabel: 'Net force (N)', yLabel: 'Acceleration (m/s²)', series: [{ points: [[0, 0], ...pts] }] }),
            right: 'Acceleration is proportional to net force: doubling the force doubles the acceleration', wrong: ['Acceleration does not depend on force', 'More force gives less acceleration', 'Acceleration doubles each time the force goes up by 1 N'],
            explain: `A straight line through the origin means proportional. Here a = F ÷ ${mass}, so the trolley’s mass is ${mass} kg.` });
        })] },

      { challenge: 'only', name: 'A fair test of air resistance', learn: 'mass',
        items: [
          rng => C(rng, { prompt: 'Aroha drops paper parachutes of different areas and times their fall. What should she keep the same?', right: 'The mass hanging under the parachute and the drop height',
            wrong: ['The area of the parachute', 'The fall time', 'Nothing'], explain: 'Area is the independent variable, fall time the dependent; mass and height are controlled.' }),
          rng => C(rng, { prompt: 'Larger parachutes take longer to fall. What can Aroha conclude?', right: 'A larger area gives more air resistance, so a smaller net downward force and less acceleration',
            wrong: ['Larger parachutes are heavier', 'Air resistance does not depend on area', 'Gravity is weaker on large objects'], explain: 'Air resistance opposes the weight, so the net force is smaller.' }),
          rng => C(rng, { prompt: 'Each drop takes about 1.5 s. Which would most improve the accuracy of the timing?', right: 'Film the drops with a timer in view and read the times from the video',
            wrong: ['Use a stopwatch and time each drop once', 'Drop from a lower height', 'Round to the nearest second'], explain: 'Reaction time is a big part of 1.5 s; video removes it. Repeats help too.' })
        ] },

      { challenge: 'only', name: 'Spot the mistake', learn: 'fma',
        items: [Sci.gen(rng => {
          const g = rng.pick([500, 800, 1000]), a = rng.int(2, 5);
          return Sci.spot(rng, {
            prompt: `Leo works out the force needed to give a ${g} g ball an acceleration of ${a} m/s². Which line is wrong?`,
            lines: ['F = m × a', `m = ${g} kg`, `F = ${g} × ${a}`, `F = ${g * a} N`], wrong: 1,
            explain: `The mass must be in kilograms: ${g} g = ${g / 1000} kg. F = ${g / 1000} × ${a} = ${num(g / 1000 * a)} N.`
          });
        })] }
    ]
  });


  // ═══ 10.5 Fluids and buoyancy ═════════════════════════════════════════════
  // Knowledge: Pressure in fluids; Buoyancy (Motion and forces, Year 10, p. 27).
  // Practices: fair tests (buoyancy); conclusions; accuracy and reliability.

  Sci.topic({
    id: 's10e5', unit: 'electricity-forces',
    title: 'Fluids and Buoyancy',
    blurb: 'Pressure in liquids and gases, hydraulics, and why things float or sink.',
    hint: 'Pressure in a fluid acts in all directions and increases with depth. Air pressure comes from the weight of the atmosphere. Enclosed fluids pass pressure on, ' +
          'so a small force on a small piston gives a large force on a large piston. A fluid pushes up on an immersed object: it floats when that buoyant force equals its weight and sinks when it is less.',

    learn: [
      { id: 'fluid', title: 'Pressure in fluids',
        text: '<p>In solids, liquids and gases, pressure acts on surfaces and within the material. <strong>Atmospheric pressure</strong> comes from the weight of the air above us.</p>' +
              '<p>In liquids and gases, pressure acts <strong>in all directions</strong>: water pushes outwards on the sides of a glass, not just down on the bottom.</p>' },
      { id: 'depth', title: 'Deeper, more pressure', diagram: { w: 240, h: 150 },
        draw(d) { SciDia.tank(d, [{ x: 0.2, depth: 0.1, label: 'A' }, { x: 0.6, depth: 0.5, label: 'B' }, { x: 0.3, depth: 0.95, label: 'C' }]); },
        text: '<p>Pressure in a liquid increases with depth: more liquid above is pushing down. C has the greatest pressure, A the least.</p>' },
      { id: 'hydraulics', title: 'Hydraulics',
        text: '<p>An enclosed liquid passes pressure on to everywhere in it. Push a small piston, and the same pressure acts on a large piston, giving a larger force:</p>' +
              '<p style="text-align:center">' + m('\\dfrac{F_1}{A_1} = \\dfrac{F_2}{A_2}') + '</p><p>Hydraulic brakes and car jacks work this way.</p>' },
      { id: 'advantage', title: 'Mechanical advantage',
        text: '<p>' + m('\\text{mechanical advantage} = \\dfrac{\\text{output force}}{\\text{input force}}') + '</p><p>A jack turning 100 N into 2000 N has a mechanical advantage of 20: a small force can move a large load.</p>' },
      { id: 'buoyancy', title: 'Buoyancy', diagram: { w: 200, h: 150 },
        draw(d) { SciDia.forceDiagram(d, { up: 30, down: 30 }, { label: 'boat' }); },
        text: '<p>A fluid exerts an upward <strong>buoyant force</strong> on an object partly or fully immersed in it.</p>' +
              '<ul><li>Buoyant force = weight: it <strong>floats</strong>.</li><li>Buoyant force less than weight: it <strong>sinks</strong>.</li></ul>' },
      { id: 'dense', title: 'Denser fluids push harder',
        text: '<p>For the same volume of fluid pushed aside, a denser fluid gives a bigger buoyant force. A ship floats a little higher in salty sea water than in a fresh-water river.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: measuring a buoyant force',
        steps: ['A stone hangs from a spring balance: it reads 12 N in air.', 'Lowered into water, it reads 7 N: the water is pushing up.', 'Buoyant force = 12 − 7 = 5 N.'],
        result: '5 N upwards'
      },
      {
        title: 'Example 2: a hydraulic jack',
        steps: ['100 N pushes on a 2 cm² piston: pressure = 100 ÷ 2 = 50 N/cm².', 'The same pressure acts on a 40 cm² piston: force = 50 × 40 = 2000 N.', 'Mechanical advantage = 2000 ÷ 100 = 20.'],
        result: '2000 N on the large piston'
      }
    ],

    slots: [
      { name: 'Pressure and depth', learn: 'depth',
        items: [Sci.gen(rng => {
          const ds = rng.shuffle([0.1, 0.45, 0.9]), xs = rng.shuffle([0.15, 0.5, 0.8]);
          const L = ['P', 'Q', 'R'];
          const marks = L.map((l, i) => ({ x: xs[i], depth: ds[i], label: l }));
          const most = rng.chance();
          const pick = marks.reduce((b, mk) => ((most ? mk.depth > b.depth : mk.depth < b.depth) ? mk : b));
          return C(rng, { prompt: `At which point is the water pressure ${most ? 'greatest' : 'least'}?`, diagram: { w: 240, h: 150 }, draw: d => SciDia.tank(d, marks),
            right: pick.label, wrong: L.filter(l => l !== pick.label).concat(['It is the same everywhere']), wide: false,
            explain: `Pressure increases with depth, so it is ${most ? 'greatest at the deepest point' : 'least at the shallowest point'}, ${pick.label}. Sideways position makes no difference.` });
        })] },

      { name: 'All directions', learn: 'fluid',
        items: [
          rng => C(rng, { prompt: 'Holes are made at the same depth on the front, side and back of a bottle of water. What happens?', right: 'Water spurts out of every hole equally',
            wrong: ['Water comes only out of the front', 'Water comes only out of the bottom', 'No water comes out of the sides'], explain: 'Pressure in a liquid acts in all directions.' }),
          rng => C(rng, { prompt: 'Holes are made at three heights down the side of a bottle of water. Which jet reaches furthest?', right: 'The lowest one', wrong: ['The highest one', 'They are all the same', 'The middle one'], wide: false,
                          explain: 'Deeper water is under more pressure.' }),
          rng => C(rng, { prompt: 'Why is a dam built much thicker at the bottom than the top?', right: 'Water pressure is greatest at the bottom, where the water is deepest',
            wrong: ['To save concrete at the top', 'The top holds back more water', 'Pressure is the same at all depths'], explain: 'Pressure increases with depth, so the bottom must resist the most.' })
        ] },

      { name: 'Air pressure', learn: 'fluid',
        items: [
          rng => C(rng, { prompt: 'What causes atmospheric pressure?', right: 'The weight of the air in the atmosphere above', wrong: ['The Sun heating the air', 'Wind blowing', 'The Earth spinning'],
                          explain: 'The air above has weight, which presses down and in all directions.' }),
          rng => C(rng, { prompt: 'Why is air pressure lower at the top of Aoraki / Mount Cook than at sea level?', right: 'There is less air above pushing down', wrong: ['It is colder', 'It is closer to the Sun', 'There is more air above'],
                          explain: 'Less atmosphere above, less weight, lower pressure.' }),
          rng => C(rng, { prompt: 'A sealed bag of chips puffs up when taken up a mountain. Why?', right: 'The air pressure outside is lower, so the air inside pushes the bag outwards',
            wrong: ['The chips expand in the cold', 'Air leaks into the bag', 'Gravity is weaker'], explain: 'The pressure inside stays the same while the pressure outside falls.' })
        ] },

      { name: 'Float or sink?', learn: 'buoyancy',
        items: [Sci.gen(rng => {
          const W = rng.int(2, 9) * 10, B = rng.chance() ? W : W - rng.int(1, 3) * 5;
          const floats = B >= W;
          return C(rng, { prompt: `An object in water has a weight of ${W} N and the water exerts a buoyant force of ${B} N${floats ? ', with the object resting at the surface' : ''}. What happens?`,
            diagram: { w: 200, h: 150 }, draw: d => SciDia.forceDiagram(d, { up: B, down: W }),
            right: floats ? 'It floats' : 'It sinks', wrong: [floats ? 'It sinks' : 'It floats', 'It rises out of the water'], wide: false,
            explain: floats ? 'The buoyant force equals the weight, so it floats.' : `The buoyant force (${B} N) is less than the weight (${W} N), so it sinks.` });
        })] },

      { name: 'Buoyant force on a floating object', learn: 'buoyancy',
        items: [Sci.gen(rng => {
          const W = rng.pick([50, 120, 800, 5000, 20000]);
          const what = rng.pick(['A kayak with its paddler', 'A floating log', 'A moored boat', 'A plastic duck']);
          return { prompt: `${what} weighs ${W} N and floats. What is the buoyant force on it?`, input: { kind: 'number', answer: W, suffix: 'N', width: 90 },
                   explain: 'A floating object has a buoyant force equal to its weight.' };
        })] },

      { name: 'Measuring buoyancy', learn: 'buoyancy',
        items: [Sci.gen(rng => {
          const air = rng.int(6, 20), b = rng.int(1, air - 2);
          return { prompt: `A rock weighs ${air} N on a spring balance. Fully under water, the balance reads ${air - b} N. What is the buoyant force?`, input: { kind: 'number', answer: b, suffix: 'N', width: 70 },
                   explain: `The water supports part of the weight: ${air} − ${air - b} = ${b} N upwards.` };
        })] },

      { name: 'Denser fluids', learn: 'dense',
        items: [
          rng => C(rng, { prompt: 'A ship sails from a river into the sea. What happens to how it floats?', right: 'It floats a little higher, because sea water is denser', wrong: ['It sinks lower', 'Nothing changes', 'It sinks completely'],
                          explain: 'Denser water gives more buoyant force for the same volume pushed aside, so less of the ship needs to be under water.' }),
          rng => C(rng, { prompt: 'An egg sinks in tap water but floats when plenty of salt is dissolved in it. Why?', right: 'Salt water is denser, so it gives a bigger buoyant force',
            wrong: ['The salt makes the egg lighter', 'The salt makes the egg denser', 'Salt water has no pressure'], explain: 'The egg’s weight is unchanged; the buoyant force has increased.' }),
          rng => C(rng, { prompt: 'The same sealed bottle is pushed fully under water, then fully under cooking oil (less dense). Where is the buoyant force bigger?', right: 'In the water', wrong: ['In the oil', 'The same in both', 'There is none in oil'], wide: false,
                          explain: 'It pushes aside the same volume each time; the denser fluid pushes up harder.' })
        ] },

      { name: 'Hydraulics', learn: 'hydraulics',
        items: [
          rng => C(rng, { prompt: 'How do a car’s hydraulic brakes work?', right: 'The pedal pushes on liquid in sealed pipes, which passes the pressure to pistons at the wheels',
            wrong: ['The pedal pulls a rope to each wheel', 'Air rushes out of the tyres', 'The liquid freezes and stops the wheels'], explain: 'An enclosed fluid transfers pressure, and larger pistons at the wheels multiply the force.' }),
          rng => C(rng, { prompt: 'In a hydraulic system, the input piston is small and the output piston large. How does the output force compare?', right: 'It is larger', wrong: ['It is smaller', 'It is the same', 'There is no output force'], wide: false,
                          explain: 'Same pressure on a larger area gives a larger force.' }),
          rng => C(rng, { prompt: 'Why are liquids, not gases, used in hydraulic brakes?', right: 'Liquids barely compress, so the push is passed on directly', wrong: ['Liquids are lighter', 'Gases cannot exert pressure', 'Liquids are cheaper than air'],
                          explain: 'A gas would squash, so the pedal would sink without the force reaching the wheels.' })
        ] },

      { name: 'Mechanical advantage', learn: 'advantage',
        items: [Sci.gen(rng => {
          const inF = rng.int(1, 6) * 50, ma = rng.pick([4, 5, 8, 10, 20]);
          const k = rng.int(0, 1);
          if (k === 0) return { prompt: `A hydraulic jack turns an input force of ${inF} N into an output force of ${inF * ma} N. What is its mechanical advantage?`,
            input: { kind: 'number', answer: ma, width: 70 }, explain: `Mechanical advantage = output ÷ input = ${inF * ma} ÷ ${inF} = ${ma}.` };
          return { prompt: `A hydraulic lift has a mechanical advantage of ${ma}. What output force does an input of ${inF} N give?`,
            input: { kind: 'number', answer: inF * ma, suffix: 'N', width: 90 }, explain: `Output = ${ma} × ${inF} = ${inF * ma} N.` };
        })] },

      { name: 'Pistons', learn: 'hydraulics',
        items: [Sci.gen(rng => {
          const a1 = rng.pick([1, 2, 4, 5]), k = rng.pick([5, 10, 20]), a2 = a1 * k, F1 = rng.int(2, 10) * 10;
          return { prompt: `A force of ${F1} N pushes on a ${a1} cm² piston. The output piston has an area of ${a2} cm². What force does it exert?`,
                   input: { kind: 'number', answer: F1 * k, suffix: 'N', width: 90 },
                   explain: `Pressure = ${F1} ÷ ${a1} = ${num(F1 / a1)} N/cm², the same on both pistons. Output force = ${num(F1 / a1)} × ${a2} = ${F1 * k} N.` };
        })] },

      // ── Challenge set.
      { challenge: 'only', name: 'Input force needed', learn: 'hydraulics',
        items: [Sci.gen(rng => {
          const a1 = rng.pick([2, 4, 5]), k = rng.pick([10, 20, 25, 50]), F2 = rng.int(4, 20) * 1000;
          const F1 = F2 / k;
          return { prompt: `A hydraulic car lift must exert ${F2} N on its ${a1 * k} cm² output piston. The input piston is ${a1} cm². What input force is needed?`,
                   input: { kind: 'number', answer: F1, tol: 0.01, decimal: true, suffix: 'N', width: 90 },
                   explain: `The areas are in the ratio ${a1 * k} : ${a1} = ${k} : 1, so the input force is ${F2} ÷ ${k} = ${num(F1)} N.` };
        })] },

      { challenge: 'only', name: 'Pressure under water', learn: 'depth',
        items: [Sci.gen(rng => {
          const d = rng.int(3, 30), atm = 100;
          return { prompt: `At the surface of the sea, the pressure is about ${atm} kPa. Each metre deeper adds about 10 kPa. What is the pressure on a diver ${d} m down?`,
                   input: { kind: 'number', answer: atm + 10 * d, suffix: 'kPa', width: 80 },
                   explain: `${d} m adds ${10 * d} kPa: ${atm} + ${10 * d} = ${atm + 10 * d} kPa. The water above adds to the air above.` };
        })] },

      { challenge: 'only', name: 'Submarines and life jackets', learn: 'buoyancy',
        items: [
          rng => C(rng, { prompt: 'A submarine floods its tanks with sea water to dive. Why does this work?', right: 'Its weight increases until it is more than the buoyant force',
            wrong: ['The water reduces its volume', 'Sea water makes the buoyant force bigger', 'It becomes lighter'], explain: 'Its outside volume, and so the buoyant force, stays the same; adding water increases its weight.' }),
          rng => C(rng, { prompt: 'How does a submarine rise again?', right: 'It blows the water out with compressed air, reducing its weight', wrong: ['It adds more water', 'It switches its engines off', 'It makes itself smaller'],
                          explain: 'With less weight, the buoyant force is bigger than the weight, and it rises.' }),
          rng => C(rng, { prompt: 'Why does a life jacket help a person float?', right: 'It adds a lot of volume with very little weight, so more water is pushed aside and the buoyant force grows',
            wrong: ['It makes the water denser', 'It makes the person heavier', 'It pushes the water down'], explain: 'Buoyant force depends on the volume of fluid displaced.' })
        ] },

      { challenge: 'only', name: 'A fair test of buoyancy', learn: 'dense',
        items: [
          rng => C(rng, { prompt: 'Mia investigates how the amount of salt dissolved in water affects the buoyant force on a sealed tube. What is the independent variable?', right: 'The mass of salt dissolved',
            wrong: ['The buoyant force', 'The size of the tube', 'The temperature'], wide: false, explain: 'She changes the amount of salt on purpose.' }),
          rng => C(rng, { prompt: 'Mia measures the buoyant force with a spring balance. What must stay the same between tests?', right: 'The tube, how far it is pushed under, and the volume of water',
            wrong: ['The mass of salt', 'The buoyant force', 'Nothing'], explain: 'The volume displaced must be the same, or it will change the buoyant force too.' }),
          rng => C(rng, { prompt: 'Her spring balance reads to the nearest 1 N, but the buoyant forces are only 1.2 N to 1.6 N. What should she do?', right: 'Use a more sensitive balance that reads to 0.1 N',
            wrong: ['Round every result to 1 N', 'Use a bigger balance reading to 10 N', 'Test only once'], explain: 'The differences are smaller than the scale can show, so the equipment needs to be more precise.' })
        ] },

      { challenge: 'only', name: 'Explaining with pressure', learn: 'fluid',
        items: [
          rng => C(rng, { prompt: 'Why do your ears sometimes “pop” when a plane descends?', right: 'Air pressure outside rises, and the pressure in your middle ear has to adjust to match',
            wrong: ['The plane gets colder', 'Sound waves get louder', 'Gravity increases'], explain: 'A pressure difference across the eardrum pushes it; the pop is air moving to even it out.' }),
          rng => C(rng, { prompt: 'How does drinking through a straw work?', right: 'You lower the air pressure in the straw, and atmospheric pressure pushes the drink up',
            wrong: ['You pull the liquid up with suction force', 'The straw attracts the liquid', 'The drink is lighter than air'], explain: 'It is the air pressure on the drink’s surface that pushes it up.' })
        ] }
    ]
  });
})();
