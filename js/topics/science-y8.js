'use strict';
// ── Revision · Year 8 science ───────────────────────────────────────────────
// Phase 3 (Years 7–8) of the Science Years 0–10 learning area, August 2026.
// Each exercise follows one Year 8 knowledge heading, and draws its practice
// questions from the matching Year 8 practices column. Materials has two
// headings (Mixtures; Concentration and solubility), so it is two exercises.
//
// Content is kept to what the knowledge statements say. Where the curriculum
// stops short of a formula or a term, so do the questions.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice, TF = Sci.tf;

  /** An order question: `seq` is the right sequence. */
  const order = (rng, prompt, seq, explain, cue) => {
    const ord = rng.shuffle(seq.map((_, i) => i));
    return {
      prompt,
      input: { kind: 'order', items: ord.map(i => seq[i]), answer: seq.map((_, i) => ord.indexOf(i)),
               cue: cue || 'Click them in order. Click one again to take it back.' },
      explain
    };
  };

  /** `k` of the items in `list`, keeping their order. */
  const some = (rng, list, k) => {
    const keep = new Set(rng.sample(list.map((_, i) => i), k));
    return list.filter((_, i) => keep.has(i));
  };

  /** Pick from a bank of { text, bin }: one from bin `b`, three from the rest. */
  const oneOf = (rng, bank, b) => ({
    right: rng.pick(bank.filter(x => x.bin === b)).text,
    wrong: rng.sample(bank.filter(x => x.bin !== b), 3).map(x => x.text)
  });

  /** A match question from rows of [left, right]. */
  const match = (rng, prompt, rows, explain) => {
    const ord = rng.shuffle(rows.map((_, i) => i));
    return {
      prompt,
      input: { kind: 'match', left: rows.map(r => r[0]), right: ord.map(i => rows[i][1]),
               tags: ['A', 'B', 'C', 'D', 'E'].slice(0, rows.length), answer: rows.map((_, i) => ord.indexOf(i)) },
      explain
    };
  };

  // ═══ 8.1 Mixtures and separating them ═════════════════════════════════════
  // Knowledge: Mixtures (p. 19). Physical combinations, not chemically joined,
  // each keeping its properties; same or different states; separated by
  // settling and decanting, sieving, filtration or evaporation.
  // Practices: plan a separation; chromatography; evaluate how effective a
  // separation method was.

  const METHODS = [
    { mix: 'Sand mixed with water', method: 'Filtration', learn: 'filter', why: 'The sand is insoluble, so filter paper lets the water through and traps the sand grains.' },
    { mix: 'Salt dissolved in water, when you want to keep the salt', method: 'Evaporation', learn: 'evaporate', why: 'The salt is dissolved, so it passes through a filter. Evaporating the water leaves the salt behind.' },
    { mix: 'Gravel mixed with fine sand', method: 'Sieving', learn: 'sieve', why: 'The gravel pieces are bigger than the holes in a sieve; the sand falls through.' },
    { mix: 'Muddy water, left to stand so the mud sinks', method: 'Settling and decanting', learn: 'decant', why: 'The denser mud settles to the bottom, and the clearer water can be poured off the top.' },
    { mix: 'Dried peas mixed with rice', method: 'Sieving', learn: 'sieve', why: 'The peas are much bigger than the grains of rice, so a sieve with the right holes separates them.' },
    { mix: 'Iron filings mixed with sand', method: 'Using a magnet', learn: 'magnet', why: 'Iron is magnetic and sand is not, so a magnet pulls the iron out.' }
  ];
  const ALL_METHODS = ['Filtration', 'Evaporation', 'Sieving', 'Settling and decanting', 'Using a magnet'];

  Sci.topic({
    id: 's8e1', unit: 'y8',
    title: 'Mixtures and Separating Them',
    blurb: 'Substances mixed but not chemically joined, and the ways to get them apart again.',
    hint: 'In a mixture, the substances are not chemically joined, so each keeps its own properties. Separate them using a ' +
          'difference between them: particle size (sieving, filtration), density (settling and decanting), whether it dissolves ' +
          '(evaporation leaves the dissolved solid behind) or whether it is magnetic.',

    learn: [
      {
        id: 'mixture', title: 'Mixtures',
        diagram: { w: 240, h: 140 },
        draw(d) { SciDia.pureVsMixture(d); },
        text: '<p>A <strong>mixture</strong> is two or more substances physically combined. They are <strong>not chemically joined</strong>, so each keeps its own properties: iron mixed with sand is still magnetic.</p>' +
              '<p>A <strong>pure substance</strong> is just one substance, such as distilled water or copper.</p>'
      },
      {
        id: 'states', title: 'Any states can mix',
        text: '<p>The substances in a mixture can be in the same state or different states.</p>' +
              Sci.table(['Mixture', 'States'], [['Air', 'gas + gas'], ['Fizzy drink', 'gas in a liquid'], ['Muddy water', 'solid in a liquid'], ['Sand and salt', 'solid + solid']])
      },
      {
        id: 'choose', title: 'Choosing a method',
        text: '<p>Every separation uses a <strong>difference</strong> between the substances.</p>' +
              Sci.table(['Difference', 'Method'], [['Particle size', 'Sieving, filtration'], ['Density', 'Settling and decanting'], ['Dissolves or not', 'Dissolve, filter, then evaporate'], ['Magnetic or not', 'A magnet']])
      },
      {
        id: 'sieve', title: 'Sieving',
        diagram: { w: 240, h: 145 },
        draw(d) { SciDia.sieve(d); },
        text: '<p>Separates solids with <strong>different particle sizes</strong>. Big pieces stay in the sieve; small ones fall through. Gravel from sand; peas from rice.</p>'
      },
      {
        id: 'filter', title: 'Filtration',
        diagram: { w: 240, h: 155 },
        draw(d) { SciDia.filtration(d); },
        text: '<p>Separates an <strong>insoluble solid</strong> from a liquid. The liquid passes through filter paper (the <strong>filtrate</strong>); the solid is trapped (the <strong>residue</strong>).</p>' +
              '<p>A <strong>dissolved</strong> substance passes straight through.</p>'
      },
      {
        id: 'decant', title: 'Settling and decanting',
        diagram: { w: 260, h: 150 },
        draw(d) { SciDia.decant(d); },
        text: '<p>A <strong>denser</strong> solid sinks to the bottom. Then the liquid is poured carefully off the top. Mud from muddy water.</p>'
      },
      {
        id: 'evaporate', title: 'Evaporation',
        diagram: { w: 240, h: 150 },
        draw(d) { SciDia.evaporation(d); },
        text: '<p>Gets a <strong>dissolved solid</strong> back from a solution. Warm it gently in an <strong>evaporating dish</strong>: the water evaporates and the solid is left as crystals.</p>'
      },
      {
        id: 'magnet', title: 'Using a magnet',
        diagram: { w: 240, h: 150 },
        draw(d) { SciDia.magnet(d); },
        text: '<p>Pulls a <strong>magnetic</strong> substance, such as iron, out of a mixture. Sand, salt and sulfur are not magnetic, so they stay behind.</p>'
      },
      {
        id: 'plan', title: 'Planning a separation',
        text: '<p>Use one difference at a time. Salt from <strong>rock salt</strong> (salt mixed with sand):</p>' +
              '<ol class="learn-steps"><li>Crush it</li><li>Stir into warm water: the salt dissolves</li><li>Filter: the sand stays behind</li><li>Evaporate: the salt is left</li></ol>' +
              '<p>With iron in the mix too, take it out with a magnet first.</p>'
      },
      {
        id: 'chroma', title: 'Chromatography',
        diagram: { w: 240, h: 180 },
        draw(d) { SciDia.chromatogram(d, [{ label: 'A', rf: 0.3 }, { label: 'B', rf: 0.75 }, { label: 'C', rf: 0.5 }], [{ label: 'X', contains: [0, 1] }]); },
        text: '<p>Separates the <strong>dyes</strong> in an ink. The solvent soaks up the paper and carries each dye a different distance. A spot level with a known dye is that dye, so ink X contains A and B.</p>'
      },
      {
        id: 'effective', title: 'How well did it work?',
        text: '<p>Weigh the substance before mixing and after separating.</p>' +
              '<p><strong>Lost = start − recovered.</strong> Some is always lost: solution soaks into the filter paper and sand, and crystals can spit out of the dish.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: getting salt out of rock salt',
        steps: [
          'Rock salt is a mixture of salt and sand. Crush it into small pieces.',
          'Stir it into warm water. The salt dissolves; the sand does not.',
          '<strong>Filter</strong> it. The sand is trapped in the filter paper; the salt solution passes through.',
          '<strong>Evaporate</strong> the water from the solution. Salt crystals are left behind.'
        ],
        result: 'Each step uses a difference: dissolving, then particle size, then evaporation'
      },
      {
        title: 'Example 2: reading a chromatogram',
        diagram: { w: 300, h: 210, caption: 'Ink X has a spot at the same height as A and at the same height as C.' },
        draw(d) {
          SciDia.chromatogram(d, [{ label: 'A', rf: 0.25 }, { label: 'B', rf: 0.55 }, { label: 'C', rf: 0.8 }, { label: 'D', rf: 0.4 }],
                              [{ label: 'X', contains: [0, 2] }]);
        },
        steps: [
          'Each dye travels up the paper a particular distance, depending on how soluble it is in the solvent and how strongly it is attracted to the paper.',
          'Ink X splits into two spots.',
          'They line up with dyes A and C, so ink X is a mixture of A and C.'
        ],
        result: 'Ink X contains dyes A and C'
      }
    ],

    slots: [
      // 1 · Mixture or pure substance?
      {
        name: 'Mixture or pure substance?', learn: 'mixture',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each one a mixture or a pure substance?',
          bins: ['Mixture', 'Pure substance'],
          items: [
            { text: 'Sea water', bin: 0 }, { text: 'Air', bin: 0 }, { text: 'Muddy water', bin: 0 },
            { text: 'Iron filings and sand', bin: 0 }, { text: 'Orange juice', bin: 0 },
            { text: 'Distilled water', bin: 1 }, { text: 'Copper', bin: 1 }, { text: 'Sugar', bin: 1 },
            { text: 'Oxygen', bin: 1 }, { text: 'Salt (sodium chloride)', bin: 1 }
          ],
          pick: 6,
          explain: 'A mixture has two or more substances physically combined. A pure substance is just one substance.'
        })]
      },

      // 2 · Best separation method.
      {
        name: 'Choosing a separation method', learn: 'choose',
        items: METHODS.map(x => rng => C(rng, {
          prompt: `<em>${x.mix}.</em> Which method separates this best?`,
          right: x.method, wrong: rng.sample(ALL_METHODS.filter(a => a !== x.method), 3), wide: false,
          explain: x.why, learn: x.learn
        }))
      },

      // 3 · Order the steps.
      {
        name: 'Planning a separation', learn: 'plan',
        items: [
          rng => order(rng, 'Put the steps for getting clean salt from rock salt (salt mixed with sand) in order.',
            ['Crush the rock salt', 'Stir it into warm water so the salt dissolves', 'Filter to remove the sand', 'Evaporate the water to leave the salt'],
            'Dissolve first, so the salt can pass through the filter while the sand is trapped; then evaporate to get the salt back.'),
          rng => order(rng, 'A mixture contains iron filings, sand and salt. Put the steps for separating all three in order.',
            ['Use a magnet to pull out the iron filings', 'Add water and stir to dissolve the salt', 'Filter to collect the sand', 'Evaporate the water to collect the salt'],
            'Take out the magnetic iron first. Then dissolving lets the salt pass through the filter, the sand stays behind, and evaporation recovers the salt.')
        ]
      },

      // 4 · What property does each method use?
      {
        name: 'How each method works', learn: 'choose',
        items: [Sci.gen(rng => match(rng, 'Match each separation method to the difference it uses.', some(rng, [
          ['Sieving', 'Different particle sizes: bigger pieces stay in the sieve'],
          ['Filtration', 'An insoluble solid is trapped, while the liquid passes through'],
          ['Settling and decanting', 'Different densities: the denser solid sinks'],
          ['Evaporation', 'A dissolved solid is left behind when the liquid turns to gas'],
          ['Using a magnet', 'One substance is magnetic and the others are not']
        ], 4), 'Every separation uses some difference between the substances in the mixture.'))]
      },

      // 5 · Read a chromatogram.
      {
        name: 'Reading a chromatogram', learn: 'chroma',
        items: [Sci.gen(rng => {
          // Four reference dyes at well-separated heights, and an ink made of
          // two (or three) of them.
          let rfs;
          do { rfs = [0, 1, 2, 3].map(() => rng.int(15, 88) / 100); }
          while (rfs.some((a, i) => rfs.some((b, j) => i < j && Math.abs(a - b) < 0.13)));
          const dyes = ['A', 'B', 'C', 'D'].map((label, i) => ({ label, rf: rfs[i] }));
          const k = rng.chance(0.7) ? 2 : 3;
          const contains = rng.sample([0, 1, 2, 3], k).sort();
          const name = list => list.map(i => dyes[i].label).join(list.length > 2 ? ', ' : ' and ').replace(/, (\w)$/, ' and $1');
          const right = name(contains);
          const wrongs = new Set();
          while (wrongs.size < 3) {
            const alt = rng.sample([0, 1, 2, 3], rng.int(1, 3)).sort();
            const t = name(alt);
            if (t !== right) wrongs.add(t);
          }
          return C(rng, {
            prompt: 'Ink X was tested against four dyes, A to D. Which dyes does ink X contain?',
            diagram: { w: 300, h: 210 },
            draw: d => SciDia.chromatogram(d, dyes, [{ label: 'X', contains }]),
            right, wrong: [...wrongs], wide: false,
            explain: `Each spot from ink X lines up with a dye that travelled the same distance: ${right}.`
          });
        })]
      },

      // 6 · States in a mixture.
      {
        name: 'States in a mixture', learn: 'states',
        items: [
          rng => C(rng, {
            prompt: 'Which mixture is made of substances in <strong>different</strong> states?',
            right: 'A fizzy drink: a gas dissolved in a liquid', wrong: ['Air: a mixture of gases', 'Sand mixed with salt', 'Water mixed with juice'],
            explain: 'Mixtures can contain the same or different states. In a fizzy drink, carbon dioxide gas is mixed into a liquid.'
          }),
          rng => C(rng, {
            prompt: 'Which mixture is made of substances all in the <strong>same</strong> state?',
            right: 'Air, which is a mixture of gases', wrong: ['Salt water', 'Muddy water', 'A fizzy drink'],
            explain: 'Air is a mixture of gases such as nitrogen and oxygen, all in the same state.'
          })
        ]
      },

      // 7 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'mixture',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student describes a mixture of iron filings and sulfur powder.',
            lines: [
              'Iron filings and sulfur powder are stirred together.',
              'The two substances are now mixed.',
              'The iron has turned into a new substance, so it is no longer magnetic.',
              'You cannot get the iron back out.'
            ],
            wrong: 2,
            explain: 'In a mixture the substances are not chemically joined, so each keeps its properties. The iron is still magnetic, and a magnet will pull it out.'
          }),
          rng => Sci.spot(rng, {
            prompt: 'A student explains how filtering works.',
            lines: [
              'Muddy water is poured into filter paper in a funnel.',
              'The water passes through the tiny holes in the paper.',
              'Any salt dissolved in the water is trapped by the paper too.',
              'The mud particles are too big to pass through, so they stay behind.'
            ],
            wrong: 2,
            explain: 'A dissolved substance is spread through the water as particles far too small to be caught, so it passes straight through. Evaporation is needed to get it back.',
            learn: 'filter'
          })
        ]
      },

      // 8 · True or false.
      {
        name: 'True or false', learn: 'mixture',
        items: [
          rng => TF(rng, { statement: 'The substances in a mixture are chemically joined together.', answer: false,
            explain: 'A mixture is a physical combination. The substances are not chemically joined, which is why they can be separated.' }),
          rng => TF(rng, { statement: 'Each substance in a mixture keeps its own properties.', answer: true,
            explain: 'Because they are not chemically joined, iron in a mixture is still magnetic, salt is still salty, and so on.' }),
          rng => TF(rng, { statement: 'Filtration can separate dissolved salt from water.', answer: false,
            explain: 'Dissolved salt passes through filter paper. Evaporation is needed instead.', learn: 'filter' }),
          rng => TF(rng, { statement: 'Mixtures can be separated using differences such as particle size or density.', answer: true,
            explain: 'Sieving and filtration use particle size; settling and decanting use density.', learn: 'choose' }),
          rng => TF(rng, { statement: "Air is a mixture.", answer: true, learn: 'states',
            explain: "Air is a mixture of gases, such as nitrogen and oxygen." }),
          rng => TF(rng, { statement: "Distilled water is a mixture.", answer: false, learn: 'mixture',
            explain: "Distilled water is a pure substance: just water." }),
          rng => TF(rng, { statement: "Sieving separates solids with different particle sizes.", answer: true, learn: 'sieve',
            explain: "Big pieces stay in the sieve; small ones fall through." }),
          rng => TF(rng, { statement: "Sieving can separate salt that has dissolved in water.", answer: false, learn: 'sieve',
            explain: "Dissolved salt passes through any sieve. Evaporation is needed." }),
          rng => TF(rng, { statement: "A magnet can separate salt from sand.", answer: false, learn: 'magnet',
            explain: "Neither salt nor sand is magnetic. A magnet separates iron from a mixture." }),
          rng => TF(rng, { statement: "Decanting means carefully pouring a liquid off a solid that has settled.", answer: true, learn: 'decant',
            explain: "The denser solid settles first, then the liquid is poured off." }),
          rng => TF(rng, { statement: "In filtration, the solid trapped in the filter paper is called the filtrate.", answer: false, learn: 'filter',
            explain: "The trapped solid is the residue. The liquid that passes through is the filtrate." }),
          rng => TF(rng, { statement: "Evaporation removes the salt from salt water and leaves the water behind.", answer: false, learn: 'evaporate',
            explain: "It is the other way round: the water evaporates and the salt is left behind." }),
          rng => TF(rng, { statement: "Salt can be separated from rock salt by dissolving, filtering and then evaporating.", answer: true, learn: 'plan',
            explain: "Dissolving lets the salt pass through the filter; evaporating gets it back." }),
          rng => TF(rng, { statement: "In chromatography, a spot level with a known dye shows that dye is in the ink.", answer: true, learn: 'chroma',
            explain: "Each dye travels its own distance up the paper." }),
          rng => TF(rng, { statement: "A mixture can contain substances in different states.", answer: true, learn: 'states',
            explain: "A fizzy drink is a gas mixed into a liquid." }),
          rng => TF(rng, { statement: "When salt is separated from sand, some salt is usually lost.", answer: true, learn: 'effective',
            explain: "Some solution soaks into the filter paper and sand, and crystals can spit out of the dish." })
        ]
      },

      // 9 · How effective was the method?
      {
        name: 'How well did it work?', learn: 'effective',
        items: [Sci.gen(rng => {
          const start = rng.int(15, 40);
          const got = start - rng.int(2, 6);
          return {
            prompt: `${Sci.name(rng)} mixes ${start} g of salt with sand, then separates it again by dissolving, filtering and evaporating. ` +
                    `${got} g of salt is recovered. How much salt was lost?`,
            note: 'Then think about where it might have gone.',
            input: { kind: 'number', answer: start - got, suffix: 'g', width: 74 },
            explain: `${m(`${start} - ${got} = ${start - got}`)} g. Some salt solution stays soaked into the filter paper and the sand, and some can spit out of the dish while it evaporates.`
          };
        })]
      },

      // 10 · Choosing equipment.
      {
        name: 'Choosing equipment', learn: 'filter',
        items: [
          rng => C(rng, {
            prompt: 'Which equipment would you use to evaporate the water from a salt solution?',
            right: 'An evaporating dish over a gentle heat', wrong: ['A sieve', 'Filter paper in a funnel', 'A magnet'],
            explain: 'The solution is warmed in a shallow evaporating dish until the water has evaporated, leaving the salt.', learn: 'evaporate'
          }),
          rng => C(rng, {
            prompt: 'Which equipment separates sand from water?',
            right: 'Filter paper in a funnel', wrong: ['An evaporating dish', 'A thermometer', 'A magnet'],
            explain: 'Filter paper traps the insoluble sand while the water passes through.'
          }),
          rng => C(rng, {
            prompt: 'Which equipment separates the coloured dyes in a felt-tip pen ink?',
            right: 'Chromatography paper standing in a solvent', wrong: ['A sieve', 'A magnet', 'Filter paper in a funnel'],
            explain: 'Chromatography separates the dyes as the solvent carries them different distances up the paper.', learn: 'chroma'
          })
        ]
      }
    ]
  });


  // ═══ 8.2 Solutions and concentration ══════════════════════════════════════
  // Knowledge: Concentration and solubility (p. 19). Solute, solvent and
  // solution; concentration; saturated solutions; suspensions; chromatography
  // separating by solubility and affinity for the stationary phase.
  // Practices: making solutions of different concentrations and observing
  // differences (e.g. colour).

  const PAIRS = [
    { solute: 'Salt', solvent: 'Water', solution: 'Salt water' },
    { solute: 'Sugar', solvent: 'Tea', solution: 'Sweet tea' },
    { solute: 'Drink powder', solvent: 'Water', solution: 'The drink' },
    { solute: 'Copper sulfate crystals', solvent: 'Water', solution: 'Blue copper sulfate solution' }
  ];

  Sci.topic({
    id: 's8e2', unit: 'y8',
    title: 'Solutions and Concentration',
    blurb: 'Dissolving, how much has dissolved, and what happens when no more will.',
    hint: 'The solute dissolves in the solvent to make a solution. Concentration is how much solute there is in a certain volume ' +
          'of solvent. A saturated solution holds as much solute as it can at that temperature; any more stays as a solid. ' +
          'In a suspension the solid does not dissolve at all.',

    learn: [
      {
        id: 'words', title: 'Solute, solvent, solution',
        diagram: { w: 160, h: 140 },
        draw(d) { SciDia.solution(d, 'solution'); },
        text: '<p>Salt dissolves in water. The salt is the <strong>solute</strong>; the water is the <strong>solvent</strong>; salt water is the <strong>solution</strong>.</p>' +
              '<p>A solution is a mixture. The solute has not disappeared: its particles are spread evenly through the solvent.</p>'
      },
      {
        id: 'suspension', title: 'Suspensions',
        diagram: { w: 160, h: 140 },
        draw(d) { SciDia.solution(d, 'suspension'); },
        text: '<p>An <strong>insoluble</strong> solid, such as flour or sand, only spreads through the liquid. It does not dissolve, and it <strong>settles</strong> if left to stand. "Shake well before use" means a suspension.</p>'
      },
      {
        id: 'conc', title: 'Concentration',
        diagram: { w: 240, h: 140 },
        draw(d) { SciDia.concentration(d); },
        text: '<p><strong>Concentration</strong> is how much solute there is in a certain volume of solvent. A more concentrated coloured solution looks <strong>darker</strong>.</p>'
      },
      {
        id: 'compare', title: 'Comparing concentrations',
        text: '<p>Compare the <strong>same volume</strong>, such as per 100 mL.</p>' +
              '<p>A: 10 g in 100 mL. B: 30 g in 200 mL, which is 15 g in every 100 mL. So B is more concentrated.</p>'
      },
      {
        id: 'change', title: 'Changing a concentration',
        text: Sci.table(['Do this', 'Concentration'], [['Dissolve more solute', 'goes up'], ['Evaporate some solvent', 'goes up'],
                ['Add water (double the volume)', 'goes down (halves)'], ['Pour some away', 'stays the same']])
      },
      {
        id: 'saturated', title: 'Saturated solutions',
        diagram: { w: 160, h: 140 },
        draw(d) { SciDia.solution(d, 'saturated'); },
        text: '<p>A <strong>saturated</strong> solution holds as much solute as it can at that temperature. Any extra stays as a solid.</p>' +
              '<p>If 20 g dissolves in 100 mL, then 40 g dissolves in 200 mL. How much dissolves depends on temperature.</p>'
      },
      {
        id: 'dissolve', title: 'Dissolving is not melting',
        text: '<p><strong>Melting</strong> is one substance turning from solid to liquid when heated. <strong>Dissolving</strong> is a solute’s particles spreading through a solvent.</p>' +
              '<p>Nothing is lost: 200 g of water plus 20 g of salt makes 220 g of solution.</p>'
      },
      {
        id: 'chroma', title: 'How chromatography works',
        text: '<p>Each dye travels a different distance up the paper, depending on <strong>how soluble</strong> it is in the solvent and <strong>how strongly</strong> it is attracted to the paper.</p>' +
              '<p>The start line is drawn in <strong>pencil</strong>, which does not dissolve and run.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: solute, solvent, solution',
        steps: [
          'Stir salt into water. The salt is the <strong>solute</strong>: the substance that dissolves.',
          'The water is the <strong>solvent</strong>: the liquid it dissolves in.',
          'The salt water is the <strong>solution</strong>, a kind of mixture. The salt has not disappeared: its particles are spread through the water.'
        ]
      },
      {
        title: 'Example 2: comparing concentrations',
        steps: [
          'Glass A has 10 g of drink powder in 100 mL of water. Glass B has 30 g in 200 mL.',
          'Compare the same volume. B has 30 g in 200 mL, which is 15 g in every 100 mL.',
          'A has 10 g in 100 mL. So B is more concentrated, and its colour will be darker.'
        ],
        result: 'Glass B is more concentrated'
      }
    ],

    slots: [
      // 1 · Solute, solvent, solution.
      {
        name: 'Solute, solvent, solution', learn: 'words',
        items: PAIRS.map(p => rng => match(rng, `${p.solute} is dissolved in ${p.solvent.toLowerCase()}. Match each word to what it is here.`, [
          ['Solute', p.solute],
          ['Solvent', p.solvent],
          ['Solution', p.solution]
        ], `The solute (${p.solute.toLowerCase()}) dissolves in the solvent (${p.solvent.toLowerCase()}) to make the solution.`))
      },

      // 2 · Solution or suspension?
      {
        name: 'Solution or suspension?', learn: 'suspension',
        items: [rng => Sci.sort(rng, {
          prompt: 'Does each one make a solution or a suspension?',
          bins: ['Solution', 'Suspension'],
          items: [
            { text: 'Salt stirred into water', bin: 0 }, { text: 'Sugar stirred into water', bin: 0 },
            { text: 'Drink powder stirred into water', bin: 0 }, { text: 'Copper sulfate stirred into water', bin: 0 },
            { text: 'Flour stirred into water', bin: 1 }, { text: 'Sand stirred into water', bin: 1 },
            { text: 'Chalk dust stirred into water', bin: 1 }, { text: 'Garden soil stirred into water', bin: 1 }
          ],
          pick: 6,
          explain: 'A soluble substance dissolves to form a solution. An insoluble solid only spreads through the liquid as a suspension, and settles out over time.'
        })]
      },

      // 3 · Which is more concentrated?
      {
        name: 'Comparing concentrations', learn: 'compare',
        items: [Sci.gen(rng => {
          const vA = rng.pick([100, 200, 250, 500]), vB = rng.pick([100, 200, 250, 500]);
          let cA = rng.int(2, 12) * 2, cB = rng.int(2, 12) * 2;          // grams per 100 mL
          const same = rng.chance(0.2);
          if (same) cB = cA; else while (cB === cA) cB = rng.int(2, 12) * 2;
          const gA = cA * vA / 100, gB = cB * vB / 100;
          const right = same ? 'They are equally concentrated' : (cA > cB ? 'Jug A' : 'Jug B');
          return {
            prompt: `Jug A has ${gA} g of drink powder in ${vA} mL of water. Jug B has ${gB} g in ${vB} mL. Which is more concentrated?`,
            note: 'Compare how much powder there is in the same volume of water.',
            input: {
              kind: 'choice',
              options: ['Jug A', 'Jug B', 'They are equally concentrated'].map(o => ({ html: o, right: o === right })),
              correct: ['Jug A', 'Jug B', 'They are equally concentrated'].indexOf(right)
            },
            explain: `In every 100 mL: A has ${cA} g and B has ${cB} g. ${same ? 'They are the same.' : right + ' has more, so it is more concentrated.'}`
          };
        })]
      },

      // 4 · Saturated solutions.
      {
        name: 'Saturated solutions', learn: 'saturated',
        items: [
          Sci.gen(rng => {
            const max = rng.int(6, 20) * 2, extra = rng.int(3, 15);
            return {
              prompt: `At 20 °C, at most ${max} g of a powder will dissolve in 100 mL of water. ` +
                      `${Sci.name(rng)} stirs ${max + extra} g into 100 mL of water at 20 °C. How much stays undissolved?`,
              input: { kind: 'number', answer: extra, suffix: 'g', width: 74 },
              explain: `Only ${max} g can dissolve, so the solution is saturated and the other ${m(`${max + extra} - ${max} = ${extra}`)} g stays as a solid.`
            };
          }),
          Sci.gen(rng => {
            const max = rng.int(5, 15) * 2, vol = rng.pick([200, 300]);
            const can = max * vol / 100;
            return {
              prompt: `At 20 °C, at most ${max} g of a powder will dissolve in 100 mL of water. ` +
                      `What is the most that will dissolve in ${vol} mL of water at the same temperature?`,
              input: { kind: 'number', answer: can, suffix: 'g', width: 74 },
              explain: `${vol} mL is ${vol / 100} times as much water, so ${m(`${max} \\times ${vol / 100} = ${can}`)} g.`
            };
          })
        ]
      },

      // 5 · Making a solution stronger or weaker.
      {
        name: 'Changing a concentration', learn: 'change',
        items: [
          rng => C(rng, {
            prompt: 'How could you make a salt solution <strong>more</strong> concentrated?',
            right: 'Dissolve more salt in it, or evaporate some of the water',
            wrong: ['Add more water', 'Pour half of it away', 'Stir it more slowly'],
            explain: 'Concentration is the amount of solute in a volume of solvent: more solute, or less solvent, raises it. Pouring some away leaves the rest just as concentrated.'
          }),
          rng => C(rng, {
            prompt: 'Water is added to a jug of juice until its volume doubles. What happens to the concentration?',
            right: 'It halves', wrong: ['It doubles', 'It stays the same', 'It drops to zero'],
            explain: 'The same amount of solute is now spread through twice the volume, so there is half as much in each millilitre.'
          }),
          rng => C(rng, {
            prompt: 'Half of a jug of salt solution is poured away. What happens to the concentration of what is left?',
            right: 'It stays the same', wrong: ['It halves', 'It doubles', 'It becomes saturated'],
            explain: 'Both the salt and the water are halved together, so the amount of salt in each millilitre does not change.'
          })
        ]
      },

      // 6 · True or false.
      {
        name: 'True or false', learn: 'words',
        items: [
          rng => TF(rng, { learn: 'suspension', statement: 'In a suspension, the solid particles settle to the bottom if it is left to stand.', answer: true,
            explain: 'The particles are insoluble and only dispersed through the liquid, so they gradually settle.' }),
          rng => TF(rng, { learn: 'saturated', statement: 'A saturated solution can still dissolve more of the same solute at the same temperature.', answer: false,
            explain: 'Saturated means it already holds the maximum amount at that temperature. Any extra stays as a solid.' }),
          rng => TF(rng, { statement: 'A solution is a kind of mixture.', answer: true,
            explain: 'The solute and solvent are mixed, not chemically joined, so a solution is a mixture.' }),
          rng => TF(rng, { learn: 'dissolve', statement: 'When sugar dissolves in water, the sugar no longer exists.', answer: false,
            explain: 'Its particles are spread through the water. You can taste it, and you can get it back by evaporating the water.' }),
          rng => TF(rng, { statement: "In salt water, water is the solvent.", answer: true, learn: 'words',
            explain: "The water is the solvent; the salt is the solute." }),
          rng => TF(rng, { statement: "In salt water, salt is the solvent.", answer: false, learn: 'words',
            explain: "Salt is the solute: the substance that dissolves. Water is the solvent." }),
          rng => TF(rng, { statement: "Flour stirred into water makes a solution.", answer: false, learn: 'suspension',
            explain: "Flour does not dissolve. It makes a suspension, which settles." }),
          rng => TF(rng, { statement: "A more concentrated coloured solution usually looks darker.", answer: true, learn: 'conc',
            explain: "More solute in the same volume gives a stronger colour." }),
          rng => TF(rng, { statement: "Adding more water to a solution makes it more concentrated.", answer: false, learn: 'change',
            explain: "Adding water makes it less concentrated: the same solute is spread through more water." }),
          rng => TF(rng, { statement: "Evaporating some of the solvent makes a solution more concentrated.", answer: true, learn: 'change',
            explain: "The same amount of solute is now in less solvent." }),
          rng => TF(rng, { statement: "10 g of solute in 100 mL has the same concentration as 20 g in 200 mL.", answer: true, learn: 'compare',
            explain: "Both are 10 g in every 100 mL." }),
          rng => TF(rng, { statement: "Pouring half of a solution away halves its concentration.", answer: false, learn: 'change',
            explain: "The solute and solvent are halved together, so the concentration stays the same." }),
          rng => TF(rng, { statement: "How much solute will dissolve can depend on the temperature.", answer: true, learn: 'saturated',
            explain: "A saturated solution holds the most it can at that temperature." }),
          rng => TF(rng, { statement: "Dissolving and melting are the same thing.", answer: false, learn: 'dissolve',
            explain: "Melting is one substance turning from solid to liquid. Dissolving is a solute spreading through a solvent." }),
          rng => TF(rng, { statement: "Mass is conserved when a solute dissolves.", answer: true, learn: 'dissolve',
            explain: "200 g of water plus 20 g of salt makes 220 g of solution." }),
          rng => TF(rng, { statement: "In chromatography, the start line should be drawn in ink.", answer: false, learn: 'chroma',
            explain: "It is drawn in pencil, which does not dissolve and run up the paper." })
        ]
      },

      // 7 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'dissolve',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student describes dissolving sugar in a cup of tea.',
            lines: [
              'Sugar is stirred into the hot tea.',
              'The sugar crystals get smaller and disappear from view.',
              'The sugar has melted, like ice melting into water.',
              'The tea now tastes sweet.'
            ],
            wrong: 2,
            explain: 'Dissolving is not melting. Melting is one substance changing from solid to liquid when heated; dissolving is a solute’s particles spreading through a solvent.'
          }),
          rng => Sci.spot(rng, {
            prompt: 'A student weighs some salt and water before and after dissolving.',
            lines: [
              'A beaker of water has a mass of 200 g.',
              '20 g of salt is added and stirred until it dissolves.',
              'The salt has disappeared, so the beaker’s mass is still 200 g.',
              'The solution tastes salty.'
            ],
            wrong: 2,
            explain: 'The salt is still there, spread through the water, so the mass is 220 g. Nothing is destroyed by dissolving.'
          })
        ]
      },

      // 8 · Colour and concentration.
      {
        name: 'Colour and concentration', learn: 'conc',
        items: [Sci.gen(rng => {
          const vols = [100, 200, 250];
          const cs = rng.sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3).map(c => c * 2);   // grams per 100 mL, all different
          const rows = ['A', 'B', 'C'].map((label, i) => {
            const v = rng.pick(vols), c = cs[i];
            return { label, v, g: c * v / 100, c };
          });
          const best = rows.reduce((a, b) => (b.c > a.c ? b : a));
          return {
            prompt: 'Three beakers of a blue solution:' +
                    Sci.table(['Beaker', 'Solute (g)', 'Water (mL)'], rows.map(r => [r.label, r.g, r.v])) +
                    'Which will be the darkest blue?',
            input: {
              kind: 'choice',
              options: rows.map(r => ({ html: 'Beaker ' + r.label, right: r === best })),
              correct: rows.indexOf(best)
            },
            explain: `The most concentrated solution is the darkest. Per 100 mL: ${rows.map(r => `${r.label} ${r.c} g`).join(', ')}. So beaker ${best.label}.`
          };
        })]
      },

      // 9 · Chromatography.
      {
        name: 'How chromatography works', learn: 'chroma',
        items: [
          rng => C(rng, {
            prompt: 'Why do the dyes in an ink travel different distances up chromatography paper?',
            right: 'They differ in how soluble they are in the solvent and how strongly they are attracted to the paper.',
            wrong: ['The heavier dyes are pulled up faster.', 'The paper absorbs some colours and destroys them.', 'Each dye is a different temperature.'],
            explain: 'A dye that dissolves well in the solvent and clings weakly to the paper travels furthest.'
          }),
          rng => C(rng, {
            prompt: 'In chromatography, why is the start line drawn in pencil rather than ink?',
            right: 'Pencil does not dissolve in the solvent, so it will not run up the paper and confuse the result.',
            wrong: ['Pencil is easier to rub out.', 'Ink would make the paper too heavy.', 'Pencil makes the dyes travel faster.'],
            explain: 'Ink would itself separate into dyes and spoil the result; graphite does not dissolve.'
          })
        ]
      },

      // 10 · Solutions in everyday life.
      {
        name: 'Everyday solutions', learn: 'saturated',
        items: [
          rng => C(rng, {
            prompt: 'Why does a glass of very sweet, cold iced tea often have sugar left at the bottom?',
            right: 'The cold tea became saturated, so the extra sugar could not dissolve.',
            wrong: ['The sugar melted and sank.', 'Cold water cannot dissolve any sugar.', 'The sugar turned back into a solid after dissolving.'],
            explain: 'How much solute dissolves depends on temperature. Once the solution is saturated, the rest stays solid.'
          }),
          rng => C(rng, { learn: 'suspension',
            prompt: 'A bottle of medicine says "shake well before use". What does this suggest?',
            right: 'It is a suspension, and the solid settles out when it stands.',
            wrong: ['It is a saturated solution.', 'Shaking makes the medicine stronger.', 'The medicine evaporates if not shaken.'],
            explain: 'The solid in a suspension settles, so it must be spread through the liquid again before each dose.'
          })
        ]
      }
    ]
  });


  // ═══ 8.3 Behaviour of light ═══════════════════════════════════════════════
  // Knowledge: Behaviour of light (p. 19). Light sources and reflected light;
  // the path source → object → eye; Ibn al-Haytham and Plato; the path for a
  // reflection; refraction between media.
  // Practices: investigating reflection and refraction by changing conditions
  // (mirrors, angles); drawing the path of light with scientific conventions.

  const SOURCES = [
    { text: 'The Sun', bin: 0 }, { text: 'A candle flame', bin: 0 }, { text: 'A glowing light bulb', bin: 0 },
    { text: 'Lightning', bin: 0 }, { text: 'Glow-worms (titiwai) in a cave', bin: 0 }, { text: 'A star', bin: 0 },
    { text: 'The Moon', bin: 1 }, { text: 'A mirror', bin: 1 }, { text: 'A book', bin: 1 },
    { text: 'The planet Venus', bin: 1 }, { text: 'Your face', bin: 1 }, { text: 'A road sign', bin: 1 }
  ];

  Sci.topic({
    id: 's8e3', unit: 'y8',
    title: 'Behaviour of Light',
    blurb: 'How we see things, and how light changes direction at a mirror or a boundary.',
    hint: 'Everything we see either gives out light or reflects it. To see something, light must travel from a source to the ' +
          'object and then into our eyes. At a mirror, light leaves at the same angle to the normal as it arrived. ' +
          'Light changes direction (refracts) when it passes from one material into another.',

    learn: [
      {
        id: 'sources', title: 'Sources and reflectors',
        text: '<p>Everything we see either <strong>gives out</strong> light or <strong>reflects</strong> it.</p>' +
              Sci.table(['Light sources', 'Only reflect light'], [['The Sun, stars', 'The Moon, planets'], ['Flames, light bulbs', 'Mirrors, books'],
                ['Lightning, glow-worms', 'Faces, road signs']])
      },
      {
        id: 'seeing', title: 'How we see',
        diagram: { w: 240, h: 140 },
        draw(d) { SciDia.seeing(d); },
        text: '<p>Light travels from a <strong>source</strong> to an <strong>object</strong>, reflects, and travels into the <strong>eye</strong>. Light from a source itself can go straight to the eye.</p>' +
              '<p>With no light at all, nothing reaches the eye, so you see nothing however long you wait.</p>'
      },
      {
        id: 'ideas', title: 'Two ideas about sight',
        text: '<p><strong>Plato</strong>’s understanding was that the eyes send out rays towards what we see.</p>' +
              '<p><strong>Ibn al-Haytham</strong>, about a thousand years ago, contested this: light travels from objects into the eye.</p>'
      },
      {
        id: 'reflection', title: 'Reflection in a mirror',
        diagram: { w: 280, h: 190 },
        draw(d) { SciDia.mirror(d, 35, { reflected: true }); },
        text: '<p>Angles are measured from the <strong>normal</strong>, a line at right angles to the mirror. Light leaves at the <strong>same angle</strong> as it arrived.</p>' +
              '<p>To see yourself: source → your face → mirror → your eyes.</p>'
      },
      {
        id: 'refraction', title: 'Refraction',
        diagram: { w: 260, h: 200 },
        draw(d) { SciDia.refraction(d, 50, null); },
        text: '<p>Light <strong>changes direction</strong> when it passes from one material into another. Going from air into water, it bends <strong>towards the normal</strong>.</p>'
      },
      {
        id: 'everyday', title: 'Refraction around us',
        text: '<ul><li>A pencil in water looks bent at the surface.</li><li>A swimming pool looks shallower than it is.</li></ul>' +
              '<p>Both happen because light from under the water changes direction as it leaves the water.</p>'
      },
      {
        id: 'rays', title: 'Drawing and testing',
        text: '<p>Rays are drawn as <strong>straight lines</strong> with an <strong>arrow</strong> showing which way the light travels.</p>' +
              '<p>To investigate a mirror, change the angle the ray hits it (independent variable) and measure the reflected angle.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: how you see a book',
        steps: [
          'A book gives out no light of its own.',
          'Light travels from a source, such as the Sun or a lamp, to the book.',
          'Some of it reflects off the book and travels into your eyes.',
          'Ibn al-Haytham argued for this a thousand years ago, against the older idea, held by Plato, that our eyes send out rays.'
        ],
        result: 'Source → book → eye'
      },
      {
        title: 'Example 2: reflection in a mirror',
        diagram: { w: 300, h: 200, caption: 'The normal is a line drawn at right angles to the mirror.' },
        draw(d) { SciDia.mirror(d, 35, { reflected: true }); },
        steps: [
          'Angles are measured from the normal, not from the mirror.',
          'The ray arrives at 35° to the normal and leaves at 35° on the other side.',
          'Light rays are drawn as straight lines with an arrow showing the direction of travel.'
        ]
      }
    ],

    slots: [
      // 1 · Source or reflector?
      {
        name: 'Light source or reflector?', learn: 'sources',
        items: [rng => Sci.sort(rng, {
          prompt: 'Does each one give out its own light, or only reflect light?',
          bins: ['Light source', 'Reflects light'],
          items: SOURCES,
          pick: 6,
          explain: 'Light sources give out their own light. Everything else, including the Moon and the planets, is seen by the light it reflects.'
        })]
      },

      // 2 · How do we see?
      {
        name: 'How we see things', learn: 'seeing',
        items: [
          rng => C(rng, {
            prompt: 'Which shows the path of light that lets you see a tree on a sunny day?',
            right: 'Sun → tree → eye', wrong: ['Eye → tree', 'Tree → Sun → eye', 'Eye → Sun → tree'],
            explain: 'Light travels from the source to the object, reflects, then travels to the eye.'
          }),
          rng => C(rng, {
            prompt: 'Which shows the path of light when you look at a lit candle?',
            right: 'Candle flame → eye', wrong: ['Eye → candle flame', 'Candle flame → wall → candle flame', 'Eye → candle flame → eye'],
            explain: 'The flame is a light source, so its light can travel straight to your eye.'
          }),
          Sci.gen(rng => {
            const src = rng.chance();
            return C(rng, {
              prompt: src ? 'Which of these gives out its own light?' : 'Which of these can only be seen by the light it reflects?',
              ...oneOf(rng, SOURCES, src ? 0 : 1), wide: false, learn: 'sources',
              explain: src ? 'Only a light source gives out its own light; the others are seen by reflected light.'
                           : 'It gives out no light of its own. The others are light sources.'
            });
          })
        ]
      },

      // 3 · Order the path of light for a reflection.
      {
        name: 'The path of a reflection', learn: 'reflection',
        items: [
          rng => order(rng, 'You see your own face in a mirror in a lit room. Put the path of the light in order.',
            ['The light bulb', 'Your face', 'The mirror', 'Your eyes'],
            'Light travels from the source to your face, reflects to the mirror, and reflects again into your eyes.'),
          rng => order(rng, 'You see a boat reflected in a still lake on a sunny day. Put the path of the light in order.',
            ['The Sun', 'The boat', 'The surface of the lake', 'Your eyes'],
            'The Sun lights the boat; light from the boat reflects off the water into your eyes.')
        ]
      },

      // 4 · Angle of reflection.
      {
        name: 'Angle of reflection', learn: 'reflection',
        items: [Sci.gen(rng => {
          const i = rng.int(4, 13) * 5;
          return {
            prompt: `A ray of light hits a flat mirror at ${i}° to the normal. At what angle to the normal is it reflected?`,
            diagram: { w: 300, h: 200 },
            draw: d => SciDia.mirror(d, i),
            input: { kind: 'number', answer: i, suffix: '°', width: 70 },
            explain: `Light reflects from a flat mirror at the same angle to the normal as it arrives: ${i}°.`
          };
        })]
      },

      // 5 · Which way does it refract?
      {
        name: 'Light entering water', learn: 'refraction',
        items: [Sci.gen(rng => {
          const i = rng.int(9, 12) * 5;          // 45° to 60°, so the three paths are clearly apart
          const letters = rng.shuffle(['A', 'B', 'C']);
          const ord = { towards: letters[0], straight: letters[1], away: letters[2] };
          return {
            prompt: 'A ray of light passes from air into water. Which path does it take in the water?',
            diagram: { w: 300, h: 220, caption: 'The dashed line is the normal.' },
            draw: d => SciDia.refraction(d, i, ord),
            input: {
              kind: 'choice',
              options: ['A', 'B', 'C'].map(l => ({ html: 'Path ' + l, right: l === ord.towards })),
              correct: ['A', 'B', 'C'].indexOf(ord.towards)
            },
            explain: `Light changes direction as it passes into water. Going from air into water, it bends towards the normal: path ${ord.towards}.`
          };
        })]
      },

      // 6 · Plato and Ibn al-Haytham.
      {
        name: 'Ideas about light', learn: 'ideas',
        items: [
          rng => C(rng, {
            prompt: 'What did Ibn al-Haytham argue about how we see?',
            right: 'Light travels from objects into the eye.', wrong: ['The eye sends out rays that touch objects.', 'Light travels instantly from the eye to the Sun.', 'We see by sound waves bouncing off objects.'],
            explain: 'Ibn al-Haytham contested the older idea, associated with Plato, that sight works by the eye sending something out.'
          }),
          rng => TF(rng, { statement: 'Plato’s understanding of sight was that our eyes send out rays towards the things we see.', answer: true,
            explain: 'That idea was later contested by Ibn al-Haytham, who argued that light enters the eye from objects.' })
        ]
      },

      // 7 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'seeing',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student describes going into a cave with no light at all.',
            lines: [
              'At first, the cave looks completely black.',
              'There is no light source anywhere in the cave.',
              'After a few minutes our eyes adjust, so we can see dimly.',
              'This is because eyes can work without any light.'
            ],
            wrong: 2,
            explain: 'With no light at all, nothing reflects light into your eyes, so you see nothing however long you wait. Eyes adjust to dim light, not to no light.'
          }),
          rng => Sci.spot(rng, { learn: 'sources',
            prompt: 'A student explains why we can see the Moon.',
            lines: [
              'The Moon is a natural satellite of Earth.',
              'The Moon glows, giving out its own light.',
              'That light travels to Earth.',
              'It enters our eyes, so we see the Moon.'
            ],
            wrong: 1,
            explain: 'The Moon gives out no light of its own. We see it because it reflects sunlight towards us.'
          })
        ]
      },

      // 8 · Refraction in everyday life.
      {
        name: 'Refraction around us', learn: 'everyday',
        items: [
          rng => C(rng, {
            prompt: 'A straight pencil standing in a glass of water looks bent at the water’s surface. Why?',
            right: 'Light from the part under water changes direction as it passes from water into air.',
            wrong: ['The water really bends the pencil.', 'The glass acts like a mirror.', 'The pencil absorbs the water.'],
            explain: 'This is refraction. The light changes direction at the surface, so the under-water part appears to be in a different place.'
          }),
          rng => C(rng, {
            prompt: 'A swimming pool looks shallower than it really is. Why?',
            right: 'Light from the bottom changes direction as it leaves the water, so the bottom appears closer.',
            wrong: ['The water reflects the sky.', 'Water makes things look smaller.', 'The tiles are painted to look closer.'],
            explain: 'Refraction at the surface changes the light’s direction, so we see the bottom higher up than it really is.'
          })
        ]
      },

      // 9 · Investigating reflection.
      {
        name: 'Investigating light', learn: 'rays',
        items: [
          rng => C(rng, {
            prompt: `${Sci.name(rng)} shines a ray of light at a mirror at different angles and measures the angle of the reflected ray each time. What is the independent variable?`,
            right: 'The angle at which the ray hits the mirror', wrong: ['The angle of the reflected ray', 'The size of the mirror', 'The brightness of the room'],
            explain: 'The independent variable is the one changed on purpose: the angle of the incoming ray.'
          }),
          rng => C(rng, {
            prompt: 'In a ray diagram, what does the arrow on a light ray show?',
            right: 'The direction the light is travelling', wrong: ['How bright the light is', 'The colour of the light', 'Where the eye is looking from'],
            explain: 'By convention, rays are straight lines with an arrow showing the direction the light travels.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'seeing',
        items: [
          rng => TF(rng, { statement: 'Everything we see is either a light source or reflects light.', answer: true,
            explain: 'If an object neither gives out nor reflects light, no light can travel from it to our eyes.' }),
          rng => TF(rng, { learn: 'refraction', statement: 'Light changes direction when it passes from air into water.', answer: true,
            explain: 'That change of direction at a boundary between materials is refraction.' }),
          rng => TF(rng, { statement: 'We see a book because light travels from our eyes to the book.', answer: false,
            explain: 'Light travels from a source to the book and then into our eyes.' }),
          rng => TF(rng, { learn: 'reflection', statement: 'When we see something in a mirror, the light has travelled from a source to the object, then to the mirror, then to our eyes.', answer: true,
            explain: 'That is the path of light for a reflection.' }),
          rng => TF(rng, { statement: "The Moon is a light source.", answer: false, learn: 'sources',
            explain: "The Moon gives out no light of its own. It reflects sunlight." }),
          rng => TF(rng, { statement: "A candle flame is a light source.", answer: true, learn: 'sources',
            explain: "It gives out its own light." }),
          rng => TF(rng, { statement: "In a room with no light at all, you can see a book if you wait long enough.", answer: false, learn: 'seeing',
            explain: "With no light, nothing reflects into your eyes, however long you wait." }),
          rng => TF(rng, { statement: "Ibn al-Haytham argued that light travels from objects into the eye.", answer: true, learn: 'ideas',
            explain: "He contested the older idea that the eye sends out rays." }),
          rng => TF(rng, { statement: "Plato’s understanding was that light enters the eye from objects.", answer: false, learn: 'ideas',
            explain: "Plato’s understanding was that the eyes send out rays. Ibn al-Haytham later argued the opposite." }),
          rng => TF(rng, { statement: "Light leaves a flat mirror at the same angle to the normal as it arrives.", answer: true, learn: 'reflection',
            explain: "The two angles, measured from the normal, are equal." }),
          rng => TF(rng, { statement: "Angles of reflection are measured from the surface of the mirror.", answer: false, learn: 'reflection',
            explain: "They are measured from the normal, a line at right angles to the mirror." }),
          rng => TF(rng, { statement: "The normal is a line at right angles to the mirror.", answer: true, learn: 'reflection',
            explain: "Angles of light rays are measured from it." }),
          rng => TF(rng, { statement: "Light passing from air into water bends towards the normal.", answer: true, learn: 'refraction',
            explain: "It changes direction at the boundary: that is refraction." }),
          rng => TF(rng, { statement: "A swimming pool looks deeper than it really is.", answer: false, learn: 'everyday',
            explain: "Refraction makes it look shallower than it is." }),
          rng => TF(rng, { statement: "A straw in a glass of water can look bent because of refraction.", answer: true, learn: 'everyday',
            explain: "Light from the part under water changes direction as it leaves the water." }),
          rng => TF(rng, { statement: "In a ray diagram, light rays are drawn as straight lines with arrows.", answer: true, learn: 'rays',
            explain: "The arrow shows which way the light travels." })
        ]
      }
    ]
  });


  // ═══ 8.4 Balanced and unbalanced forces ═══════════════════════════════════
  // Knowledge: Balanced and unbalanced forces (pp. 19–20). Balanced forces
  // and zero net force; unbalanced forces change motion (speed, direction or
  // both); more mass needs more force; seesaws, pivots and turning effect.
  // Practices: free body diagrams; fair test of a seesaw; gathering data
  // systematically; everyday unbalanced forces.
  //
  // The curriculum says the turning effect depends on the force and its
  // distance from the pivot, but does not introduce moments. Seesaw questions
  // are reasoned that way: twice as far out, twice the turning effect.

  Sci.topic({
    id: 's8e4', unit: 'y8',
    title: 'Balanced and Unbalanced Forces',
    blurb: 'When forces cancel, motion stays the same. When they do not, it changes.',
    hint: 'Add up the forces in each direction. If they cancel, the net force is zero and the motion does not change. ' +
          'If they do not cancel, the object speeds up, slows down or changes direction. On a seesaw, the turning effect ' +
          'depends on both the weight and how far it is from the pivot.',

    learn: [
      {
        id: 'net', title: 'Net force',
        diagram: { w: 260, h: 130, caption: 'Arrow lengths are in proportion to the forces.' },
        draw(d) { SciDia.forceDiagram(d, { left: 30, right: 50 }); },
        text: '<p>Forces in opposite directions: subtract. ' + m('50 - 30 = 20') + ' N, towards the bigger force (right).</p>'
      },
      {
        id: 'balanced', title: 'Balanced forces',
        diagram: { w: 260, h: 130 },
        draw(d) { SciDia.forceDiagram(d, { left: 40, right: 40 }); },
        text: '<p>Equal and opposite forces cancel: the <strong>net force is zero</strong>, and the motion <strong>does not change</strong>. Something still stays still; something moving keeps the same speed in a straight line.</p>'
      },
      {
        id: 'unbalanced', title: 'Unbalanced forces change motion',
        text: '<p>An unbalanced force makes an object <strong>speed up</strong>, <strong>slow down</strong> or <strong>change direction</strong>, or more than one of these.</p>' +
              '<p>A car going round a corner at a steady speed is changing direction, so the forces on it are unbalanced.</p>'
      },
      {
        id: 'mass', title: 'More mass, more force',
        text: '<p>An object with more mass needs a <strong>larger unbalanced force</strong> for the same change in motion. Push an empty and a full trolley equally hard: the empty one speeds up more.</p>'
      },
      {
        id: 'seesaw', title: 'Seesaws and turning',
        diagram: { w: 300, h: 140 },
        draw(d) { SciDia.seesaw(d, { n: 3, d: 2 }, { n: 2, d: 3 }); },
        text: '<p>A seesaw is a <strong>lever</strong> with a <strong>pivot</strong>. The turning effect depends on the <strong>force</strong> and how <strong>far from the pivot</strong> it acts. Twice as far out, twice the turning effect.</p>'
      },
      {
        id: 'balance', title: 'Balancing a seesaw',
        text: '<p>It balances when weight × distance is the same on both sides.</p>' +
              '<p>30 kg at 2 m balances 20 kg at ' + m('30 \\times 2 \\div 20 = 3') + ' m. The lighter person sits further out.</p>'
      },
      {
        id: 'myths', title: 'Two common mistakes',
        text: '<ul><li>A car at a steady speed does <strong>not</strong> need a bigger forward force. Bigger would make it speed up; at steady speed the forces are balanced.</li>' +
              '<li>Moving things do not “run out of force”. A rolling ball stops because friction is an unbalanced force against it.</li></ul>'
      },
      {
        id: 'fair', title: 'Testing a seesaw fairly',
        text: '<ul><li><strong>Change:</strong> the mass on one side.</li><li><strong>Measure:</strong> the distance needed to balance it.</li>' +
              '<li><strong>Keep the same:</strong> the ruler, the pivot position, the other mass.</li></ul>' +
              '<p>Record results in a <strong>table</strong>, so patterns are easy to see.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: working out a net force',
        diagram: { w: 300, h: 140, caption: 'Arrow lengths are drawn in proportion to the forces.' },
        draw(d) { SciDia.forceDiagram(d, { left: 30, right: 50 }); },
        steps: [
          'A box is pushed 50 N to the right and 30 N to the left.',
          'The forces do not cancel. The net force is ' + m('50 - 30 = 20') + ' N, to the right.',
          'An unbalanced force changes the motion: if the box was still, it starts moving to the right.'
        ],
        result: 'Net force: 20 N to the right'
      },
      {
        title: 'Example 2: balancing a seesaw',
        diagram: { w: 320, h: 150, caption: 'Three blocks 2 m out balance two blocks 3 m out.' },
        draw(d) { SciDia.seesaw(d, { n: 3, d: 2 }, { n: 2, d: 3 }); },
        steps: [
          'The turning effect depends on the weight and on how far it is from the pivot.',
          'A small weight far from the pivot can balance a larger weight close to it.',
          'Here the turning effects are equal on both sides, so the seesaw balances.'
        ]
      }
    ],

    slots: [
      // 1 · Net force.
      {
        name: 'Net force', learn: 'net',
        items: [Sci.gen(rng => {
          let a = rng.int(1, 9) * 10, b = rng.int(1, 9) * 10;
          while (a === b) b = rng.int(1, 9) * 10;
          const what = rng.pick(['a box', 'a trolley', 'a sled', 'a kayak']);
          return {
            prompt: `The diagram shows the forces on ${what}. What is the size of the net force?`,
            diagram: { w: 300, h: 140 },
            draw: d => SciDia.forceDiagram(d, { left: a, right: b }),
            input: { kind: 'number', answer: Math.abs(a - b), suffix: 'N', width: 70 },
            explain: `The forces act in opposite directions, so subtract: ${m(`${Math.max(a, b)} - ${Math.min(a, b)} = ${Math.abs(a - b)}`)} N, towards the ${a > b ? 'left' : 'right'}.`
          };
        })]
      },

      // 2 · What happens to a still object?
      {
        name: 'Will it move?', learn: 'balanced',
        items: [Sci.gen(rng => {
          const balanced = rng.chance(0.35);
          const a = rng.int(2, 8) * 10;
          const b = balanced ? a : rng.pick([a + rng.int(1, 4) * 10, Math.max(10, a - rng.int(1, 4) * 10)]);
          const right = balanced ? 'It stays still' : (b > a ? 'It starts moving to the right' : 'It starts moving to the left');
          const opts = ['It stays still', 'It starts moving to the right', 'It starts moving to the left'];
          return {
            prompt: 'This object is not moving to begin with. These two forces now act on it. What happens?',
            diagram: { w: 300, h: 140 },
            draw: d => SciDia.forceDiagram(d, { left: a, right: b }),
            input: { kind: 'choice', options: opts.map(o => ({ html: o, right: o === right })), correct: opts.indexOf(right), wide: true },
            explain: balanced
              ? 'The forces are equal and opposite, so they cancel: the net force is zero and the motion does not change.'
              : `The forces are unbalanced, with a net force of ${Math.abs(a - b)} N, so the object starts moving in that direction.`
          };
        })]
      },

      // 3 · Balanced or unbalanced?
      {
        name: 'Balanced or unbalanced?', learn: 'unbalanced',
        items: [rng => Sci.sort(rng, {
          prompt: 'Are the forces on each one balanced or unbalanced?',
          bins: ['Balanced', 'Unbalanced'],
          items: [
            { text: 'A book resting on a table', bin: 0 },
            { text: 'A car driving in a straight line at a steady speed', bin: 0 },
            { text: 'A skydiver falling at a steady speed', bin: 0 },
            { text: 'A boat floating still on a calm lake', bin: 0 },
            { text: 'A rugby ball being kicked', bin: 1 },
            { text: 'A bike braking to a stop', bin: 1 },
            { text: 'A rocket speeding up as it launches', bin: 1 },
            { text: 'A car going round a corner at a steady speed', bin: 1 }
          ],
          pick: 6,
          explain: 'If the motion is not changing (still, or steady speed in a straight line), the forces are balanced. Speeding up, slowing down or changing direction all need an unbalanced force.'
        })]
      },

      // 4 · Which way will the seesaw tip?
      {
        name: 'Which way will it tip?', learn: 'seesaw',
        items: [Sci.gen(rng => {
          let L, R;
          const balanced = rng.chance(0.25);
          for (;;) {
            L = { n: rng.int(1, 4), d: rng.int(1, 4) };
            R = { n: rng.int(1, 4), d: rng.int(1, 4) };
            const eq = L.n * L.d === R.n * R.d;
            if (balanced ? eq && (L.n !== R.n) : !eq) break;
          }
          const lt = L.n * L.d, rt = R.n * R.d;
          const right = lt === rt ? 'It stays balanced' : (lt > rt ? 'The left side goes down' : 'The right side goes down');
          const opts = ['The left side goes down', 'The right side goes down', 'It stays balanced'];
          return {
            prompt: 'Identical blocks are placed on a seesaw. When it is let go, what happens?',
            diagram: { w: 320, h: 150 },
            draw: d => SciDia.seesaw(d, L, R),
            input: { kind: 'choice', options: opts.map(o => ({ html: o, right: o === right })), correct: opts.indexOf(right), wide: true },
            explain: `Turning effect depends on weight and distance. Left: ${L.n} block${L.n > 1 ? 's' : ''} at ${L.d} m. Right: ${R.n} block${R.n > 1 ? 's' : ''} at ${R.d} m. ` +
                     (lt === rt ? 'The turning effects match, so it balances.' : `The ${lt > rt ? 'left' : 'right'} side has the bigger turning effect, so it goes down.`)
          };
        })]
      },

      // 5 · Where must the child sit?
      {
        name: 'Balancing a seesaw', learn: 'balance',
        items: [Sci.gen(rng => {
          let big, small, d1, d2;
          do {
            big = rng.int(5, 9) * 5;
            small = rng.int(4, big / 5 - 1) * 5;
            d1 = rng.pick([1, 1.5, 2]);
            d2 = big * d1 / small;
          } while (d2 > 3.5 || !Number.isInteger(d2 * 2));
          const a = Sci.name(rng);
          let b = Sci.name(rng); while (b === a) b = Sci.name(rng);
          return {
            prompt: `${a} (${big} kg) sits ${d1} m from the pivot of a seesaw. How far from the pivot must ${b} (${small} kg) sit on the other side to balance it?`,
            note: 'The lighter person has to sit further out.',
            input: { kind: 'number', answer: d2, tol: 0.01, decimal: true, suffix: 'm', width: 74 },
            explain: `For balance, weight × distance must match on both sides: ${m(`${big} \\times ${d1} = ${small} \\times d`)}, so ${m(`d = ${big * d1} \\div ${small} = ${d2}`)} m.`
          };
        })]
      },

      // 6 · Mass and force.
      {
        name: 'Mass and force', learn: 'mass',
        items: [
          rng => C(rng, {
            prompt: 'An empty supermarket trolley and a fully loaded one are pushed with the same force. Which speeds up more?',
            right: 'The empty trolley', wrong: ['The loaded trolley', 'They speed up equally', 'Neither moves'],
            explain: 'An object with more mass needs a larger unbalanced force to produce the same change in motion.'
          }),
          rng => TF(rng, { statement: 'A heavier object needs a larger unbalanced force to change its motion by the same amount.', answer: true,
            explain: 'Objects with greater mass require larger unbalanced forces to produce the same change in motion.' })
        ]
      },

      // 7 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'myths',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student explains a car moving along a straight road at a steady 50 km/h.',
            lines: [
              'The engine pushes the car forwards.',
              'Air resistance and friction push it backwards.',
              'The forward force must be bigger, or the car would not keep moving.',
              'So the forces on the car are unbalanced.'
            ],
            wrong: 2,
            explain: 'At a steady speed in a straight line, the motion is not changing, so the forces are balanced. A bigger forward force would make the car speed up.'
          }),
          rng => Sci.spot(rng, {
            prompt: 'A student explains a ball rolling to a stop on grass.',
            lines: [
              'The ball is rolling across the grass.',
              'Friction with the grass pushes against its motion.',
              'This is an unbalanced force acting on the ball.',
              'The ball stops because it runs out of force.'
            ],
            wrong: 3,
            explain: 'A moving object does not carry a supply of force that runs out. The unbalanced force of friction slows it down until it stops.'
          })
        ]
      },

      // 8 · Unbalanced forces in everyday life.
      {
        name: 'Forces around us', learn: 'unbalanced',
        items: [
          rng => C(rng, {
            prompt: 'A netball player catches a pass. What does the force from the player\u2019s hands do to the ball?',
            right: 'It slows the ball down and stops it', wrong: ['It speeds the ball up', 'Nothing, because the ball was already moving', 'It makes the ball lighter'],
            explain: 'An unbalanced force changes motion: here it reduces the ball’s speed to zero.'
          }),
          rng => C(rng, {
            prompt: 'A hockey player hits a moving ball sideways. What can the unbalanced force change?',
            right: 'Its speed, its direction, or both', wrong: ['Only its speed', 'Only its mass', 'Nothing, unless the ball was still'],
            explain: 'A change in motion can be a change in speed, a change in direction, or both.'
          })
        ]
      },

      // 9 · A fair test with a seesaw.
      {
        name: 'Planning a seesaw test', learn: 'fair',
        items: [
          rng => C(rng, {
            prompt: `${Sci.name(rng)} tests how far from the pivot a 50 g mass must be placed to balance different masses on the other side. What is the independent variable?`,
            right: 'The mass placed on the other side', wrong: ['The distance needed to balance it', 'The length of the ruler used as a seesaw', 'The position of the pivot'],
            explain: 'The independent variable is the one changed on purpose: the mass on the other side.'
          }),
          rng => C(rng, {
            prompt: 'In a seesaw investigation, why record the results in a table?',
            right: 'To gather the data systematically, so patterns are easy to see', wrong: ['To make the seesaw balance', 'Because tables are more accurate than measuring', 'So no repeats are needed'],
            explain: 'Organising data in a table makes it easier to spot patterns and check for mistakes.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'balanced',
        items: [
          rng => TF(rng, { statement: 'When the forces on an object are balanced, the net force is zero.', answer: true,
            explain: 'Balanced forces cancel each other, so there is no net force.' }),
          rng => TF(rng, { statement: 'When the forces on a moving object are balanced, it must slow down.', answer: false,
            explain: 'Balanced forces mean the motion does not change: it carries on at the same speed in the same direction.' }),
          rng => TF(rng, { learn: 'seesaw', statement: 'A seesaw is a type of lever.', answer: true,
            explain: 'A seesaw is a lever with forces acting on both sides of a pivot.' }),
          rng => TF(rng, { learn: 'seesaw', statement: 'A small push far from the pivot can balance a larger push close to it.', answer: true,
            explain: 'The turning effect depends on both the size of the force and its distance from the pivot.' }),
          rng => TF(rng, { statement: "Forces of 30 N to the left and 30 N to the right are balanced.", answer: true, learn: 'balanced',
            explain: "They are equal and opposite, so the net force is zero." }),
          rng => TF(rng, { statement: "If the net force on an object is zero, it must be standing still.", answer: false, learn: 'balanced',
            explain: "It could also be moving at a steady speed in a straight line." }),
          rng => TF(rng, { statement: "A car going round a corner at a steady speed has unbalanced forces on it.", answer: true, learn: 'unbalanced',
            explain: "Its direction is changing, which needs an unbalanced force." }),
          rng => TF(rng, { statement: "An unbalanced force can change the direction an object moves in.", answer: true, learn: 'unbalanced',
            explain: "It can change speed, direction, or both." }),
          rng => TF(rng, { statement: "Forces of 50 N to the right and 20 N to the left give a net force of 70 N.", answer: false, learn: 'net',
            explain: "Opposite forces subtract: 50 − 20 = 30 N, to the right." }),
          rng => TF(rng, { statement: "A full trolley needs a bigger force than an empty one to speed up by the same amount.", answer: true, learn: 'mass',
            explain: "More mass needs a larger unbalanced force for the same change in motion." }),
          rng => TF(rng, { statement: "Pushing further from the pivot gives a bigger turning effect.", answer: true, learn: 'seesaw',
            explain: "The turning effect depends on the force and its distance from the pivot." }),
          rng => TF(rng, { statement: "A lighter child can balance a heavier child by sitting further from the pivot.", answer: true, learn: 'balance',
            explain: "Weight × distance must match on both sides." }),
          rng => TF(rng, { statement: "Two children of equal weight balance when they sit at equal distances from the pivot.", answer: true, learn: 'balance',
            explain: "Their turning effects are then equal." }),
          rng => TF(rng, { statement: "A rolling ball stops because it runs out of force.", answer: false, learn: 'myths',
            explain: "Friction is an unbalanced force that slows it down until it stops." }),
          rng => TF(rng, { statement: "A car at a steady speed in a straight line needs a bigger forward force than backward force.", answer: false, learn: 'myths',
            explain: "At steady speed the forces are balanced. A bigger forward force would make it speed up." }),
          rng => TF(rng, { statement: "In a fair test, only the independent variable is changed on purpose.", answer: true, learn: 'fair',
            explain: "Everything else is kept the same." })
        ]
      }
    ]
  });


  // ═══ 8.5 The surface of the Earth ═════════════════════════════════════════
  // Knowledge: The surface of the Earth (p. 20). Geosphere; four layers;
  // crust of minerals and rocks; minerals; rocks of one or more minerals;
  // igneous, sedimentary, metamorphic; rock cycle; fossils; soils; uses.
  // Practices: classifying Earth materials; models of rock change; fossils
  // and Earth's past; properties and uses (pounamu, hāngī stones, limestone).

  const ROCKS = [
    { name: 'Granite', type: 0 }, { name: 'Basalt', type: 0 }, { name: 'Pumice', type: 0 }, { name: 'Obsidian', type: 0 },
    { name: 'Sandstone', type: 1 }, { name: 'Limestone', type: 1 }, { name: 'Mudstone', type: 1 }, { name: 'Conglomerate', type: 1 },
    { name: 'Marble', type: 2 }, { name: 'Slate', type: 2 }, { name: 'Schist', type: 2 }, { name: 'Gneiss', type: 2 }
  ];
  const ROCK_TYPES = ['Igneous', 'Sedimentary', 'Metamorphic'];

  Sci.topic({
    id: 's8e5', unit: 'y8',
    title: 'The Surface of the Earth',
    blurb: 'The Earth’s layers, the rocks and minerals of its crust, how rocks change, and how we use them.',
    hint: 'The Earth has four layers: inner core, outer core, mantle and crust. Igneous rock forms from cooled melted rock; ' +
          'sedimentary rock from layers of sediment pressed together; metamorphic rock from rock changed by heat and pressure. ' +
          'We use Earth materials because of their properties.',

    learn: [
      {
        id: 'layers', title: 'The Earth’s layers',
        diagram: { w: 300, h: 190, caption: 'The crust is far thinner than shown.' },
        draw(d) { SciDia.earthLayers(d, Object.fromEntries(SciDia.LAYERS.map(l => [l, l]))); },
        text: '<p>From the outside in: <strong>crust</strong>, <strong>mantle</strong>, <strong>outer core</strong>, <strong>inner core</strong>. The crust is the thinnest layer; the mantle is the thickest.</p>' +
              '<p>The <strong>geosphere</strong> is the solid Earth: its rocks, minerals, soil and landforms.</p>'
      },
      {
        id: 'minerals', title: 'Minerals and rocks',
        text: '<p>A <strong>mineral</strong> is a natural material whose particles form a repeating pattern, giving it a regular crystal shape.</p>' +
              '<p>A <strong>rock</strong> is made of one or more minerals. The types and arrangement of its minerals give a rock its colour, texture and hardness.</p>'
      },
      {
        id: 'types', title: 'Three types of rock', wide: true,
        text: Sci.table(['Type', 'Forms when', 'Examples'], [
                ['<strong>Igneous</strong>', 'melted rock cools and hardens', 'granite, basalt, pumice, obsidian'],
                ['<strong>Sedimentary</strong>', 'layers of sediment are pressed and cemented', 'sandstone, limestone, mudstone, conglomerate'],
                ['<strong>Metamorphic</strong>', 'rock is changed by heat and pressure', 'marble, slate, schist, gneiss']])
      },
      {
        id: 'cycle', title: 'The rock cycle',
        diagram: { w: 300, h: 190, caption: 'One route round. Any type can become any other.' },
        draw(d) { SciDia.cycle(d, ['Igneous', 'Sedimentary', 'Metamorphic'], { edges: ['worn down, pressed', 'heat and pressure', 'melted, cooled'] }); },
        text: '<p>Over very long times, rocks keep changing from one type to another.</p>'
      },
      {
        id: 'identify', title: 'Clues to a rock’s type',
        text: '<ul><li>Layers or fossils: <strong>sedimentary</strong>.</li>' +
              '<li>Interlocking crystals from cooled melted rock: <strong>igneous</strong>. Slow cooling underground gives bigger crystals.</li>' +
              '<li>Full of holes and light enough to float: <strong>pumice</strong>, igneous, from frothy lava.</li></ul>'
      },
      {
        id: 'fossils', title: 'How a fossil forms',
        text: '<ol class="learn-steps"><li>An organism dies</li><li>It is buried in sediment</li><li>Over a long time, minerals replace its material</li><li>The rock wears away and the fossil is exposed</li></ol>' +
              '<p>A fossil has the shape of the organism, but it is now stone.</p>'
      },
      {
        id: 'soil', title: 'What soil is made of',
        text: '<p>Rock particles, <strong>air</strong> and <strong>water</strong>, decaying organisms, and <strong>living</strong> things: fungi, bacteria, earthworms, plant roots.</p>'
      },
      {
        id: 'uses', title: 'Using Earth materials',
        text: Sci.table(['Material', 'Why it is useful'], [
                ['Pounamu', 'very tough; takes an edge and polish'], ['Hāngī stones', 'volcanic rock that holds heat without cracking'],
                ['Limestone', 'spread on farmland; landscaping'], ['Aluminium', 'strong and not very dense'], ['Iron', 'strong; buildings and bridges']])
      }
    ],

    examples: [
      {
        title: 'Example 1: the Earth’s layers',
        diagram: { w: 320, h: 200, caption: 'The cores and mantle are to scale. The crust is far thinner than shown.' },
        draw(d) { SciDia.earthLayers(d, Object.fromEntries(SciDia.LAYERS.map(l => [l, l]))); },
        steps: [
          'The crust is the thin outer layer of rocks and minerals.',
          'Below it is the mantle, then the outer core and the inner core.',
          'The geosphere is the solid physical part of the Earth: all its rocks, minerals, soil and landforms, from the surface to the core.'
        ]
      },
      {
        title: 'Example 2: three kinds of rock',
        steps: [
          '<strong>Igneous:</strong> formed when melted rock cools and hardens. Basalt from the Auckland volcanoes and pumice from Taupō are igneous.',
          '<strong>Sedimentary:</strong> formed from layers of sediment pressed and cemented together over a long time. They can contain fossils.',
          '<strong>Metamorphic:</strong> formed when existing rock is changed by heat and pressure. Otago schist is metamorphic.',
          'Through the rock cycle, any type can slowly change into another.'
        ]
      }
    ],

    slots: [
      // 1 · Label the layers.
      {
        name: 'The Earth’s layers', learn: 'layers',
        items: [rng => {
          const ord = rng.shuffle(SciDia.LAYERS);
          const labels = Object.fromEntries(ord.map((l, i) => [l, String(i + 1)]));
          return Sci.label(rng, {
            prompt: 'Name each layer of the Earth.',
            diagram: { w: 320, h: 200, caption: 'The crust is drawn thicker than it really is.' },
            draw: d => SciDia.earthLayers(d, labels),
            markers: ord, options: SciDia.LAYERS,
            explain: 'From the outside in: crust, mantle, outer core, inner core.'
          });
        }]
      },

      // 2 · Sort rocks by type.
      {
        name: 'Igneous, sedimentary or metamorphic?', learn: 'types',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each rock igneous, sedimentary or metamorphic?',
          bins: ROCK_TYPES,
          items: ROCKS.map(r => ({ text: r.name, bin: r.type })),
          pick: 6,
          explain: 'Igneous: granite, basalt, pumice, obsidian. Sedimentary: sandstone, limestone, mudstone, conglomerate. Metamorphic: marble, slate, schist, gneiss.'
        })]
      },

      // 3 · How each type forms.
      {
        name: 'How rocks form', learn: 'cycle',
        items: [rng => match(rng, 'Match each type of rock to how it forms.', [
          ['Igneous', 'Melted rock cools and hardens'],
          ['Sedimentary', 'Layers of sediment are pressed and cemented together'],
          ['Metamorphic', 'Existing rock is changed by heat and pressure']
        ], 'The rock cycle links all three: each can, over a very long time, become another.'),
        Sci.gen(rng => Object.assign(match(rng, 'Match each type of rock to an example.',
          ROCK_TYPES.map((t, k) => [t, rng.pick(ROCKS.filter(r => r.type === k)).name]),
          'Igneous: granite, basalt, pumice, obsidian. Sedimentary: sandstone, limestone, mudstone, conglomerate. Metamorphic: marble, slate, schist, gneiss.'),
          { learn: 'types' }))]
      },

      // 4 · How a fossil forms.
      {
        name: 'How a fossil forms', learn: 'fossils',
        items: [
          rng => order(rng, 'Put the stages of fossil formation in order.',
            ['An organism dies', 'It is buried in sediment', 'Over a long time, minerals replace the organic material', 'The rock is worn away and the fossil is exposed'],
            'Burial in sediment comes first; over a very long time minerals replace the organism’s material, turning it to stone.')
        ]
      },

      // 5 · Minerals and rocks.
      {
        name: 'Minerals and rocks', learn: 'minerals',
        items: [
          rng => C(rng, {
            prompt: 'What is the difference between a mineral and a rock?',
            right: 'A mineral is a natural material with a repeating pattern; a rock is made of one or more minerals.',
            wrong: ['A rock is always shiny; a mineral never is.', 'Minerals are found only in the mantle.', 'There is no difference.'],
            explain: 'Minerals have repeating patterns that give them their shapes and properties. Rocks are made of one or more minerals combined.'
          }),
          rng => C(rng, {
            prompt: 'Why do minerals often form crystals with flat faces and sharp edges?',
            right: 'Their particles are arranged in a repeating pattern.', wrong: ['They are cut by water.', 'They are made by living things.', 'They are always melted.'],
            explain: 'The repeating arrangement of particles in a mineral gives it a regular crystal shape.'
          }),
          rng => C(rng, {
            prompt: 'What gives rocks their different properties, such as colour, texture and hardness?',
            right: 'The types and arrangement of the minerals they contain', wrong: ['Their age only', 'Their size', 'How far they are from the sea'],
            explain: 'The types and arrangement of minerals, including any crystals or layers, give a rock its properties.'
          })
        ]
      },

      // 6 · Soil.
      {
        name: 'What soil is made of', learn: 'soil',
        items: [
          rng => C(rng, {
            prompt: 'Which of these is <strong>not</strong> normally part of soil?',
            right: 'Magma', wrong: ['Rock particles', 'Decaying organisms', 'Air and water'],
            explain: 'Soil is made of decaying organisms, living organisms, rock particles, air and water. Magma is melted rock deep underground.'
          }),
          rng => C(rng, {
            prompt: 'Which of these in a sample of soil is <strong>living</strong>?',
            right: rng.pick(['Fungi', 'Earthworms', 'Bacteria', 'Plant roots']), wrong: ['Rock particles', 'Air', 'Water'],
            explain: 'Soil contains living organisms (fungi, plants, animals, bacteria) as well as rock particles, air and water, and decaying organic matter.'
          })
        ]
      },

      // 7 · Using Earth materials.
      {
        name: 'Using Earth materials', learn: 'uses',
        items: [rng => match(rng, 'Match each material to why it is useful.', rng.sample([
          ['Pounamu', 'Very tough and takes a sharp edge and polish: used for tools and taonga'],
          ['Hāngī stones', 'Volcanic rock that holds heat without cracking'],
          ['Limestone', 'Crushed and spread on farmland, and used in landscaping'],
          ['Aluminium', 'Strong but not very dense: used in aircraft and bikes'],
          ['Iron', 'Strong and dense: used in buildings and bridges']
        ], 4), 'Earth materials are used because of their properties.')]
      },

      // 8 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'fossils',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student describes a fossilised bone found in sandstone.',
            lines: [
              'The animal died and was buried in sand.',
              'Over time the sand became sandstone.',
              'The fossil is the animal’s original bone, unchanged.',
              'It tells us the animal lived long ago.'
            ],
            wrong: 2,
            explain: 'In a fossil, minerals have replaced the organic material over a long time. It has the shape of the bone, but it is now stone.'
          }),
          rng => Sci.spot(rng, { learn: 'layers',
            prompt: 'A student describes the Earth’s interior.',
            lines: [
              'The crust is the outer layer, made of minerals and rocks.',
              'The crust is the thickest layer of the Earth.',
              'Under the crust is the mantle.',
              'At the centre are the outer and inner core.'
            ],
            wrong: 1,
            explain: 'The crust is the thinnest layer by far. The mantle is the thickest.'
          })
        ]
      },

      // 9 · Classify by observation.
      {
        name: 'Identifying a rock', learn: 'identify',
        items: [
          rng => C(rng, {
            prompt: 'A rock has clear layers and contains fossil shells. What type is it most likely to be?',
            right: 'Sedimentary', wrong: ['Igneous', 'Metamorphic', 'It could not be any type'],
            explain: 'Layers and fossils both come from sediment building up over time.'
          }),
          rng => C(rng, {
            prompt: 'A rock is full of tiny holes and is so light it floats on water. What type is it most likely to be?',
            right: 'Igneous (it is pumice)', wrong: ['Sedimentary', 'Metamorphic', 'A mineral, not a rock'],
            explain: 'Pumice forms when frothy lava cools quickly, trapping gas bubbles. It is igneous.'
          }),
          Sci.gen(rng => {
            const k = rng.int(0, 2);
            const pool = ROCKS.map(r => ({ text: r.name, bin: r.type }));
            return C(rng, {
              prompt: `Which of these rocks is <strong>${ROCK_TYPES[k].toLowerCase()}</strong>?`,
              ...oneOf(rng, pool, k), wide: false, learn: 'types',
              explain: ['Igneous rocks form when melted rock cools: granite, basalt, pumice, obsidian.',
                        'Sedimentary rocks form from layers of sediment: sandstone, limestone, mudstone, conglomerate.',
                        'Metamorphic rocks form when rock is changed by heat and pressure: marble, slate, schist, gneiss.'][k]
            });
          }),
          rng => C(rng, {
            prompt: 'A rock has interlocking crystals that formed as melted rock slowly cooled underground. What type is it?',
            right: 'Igneous', wrong: ['Sedimentary', 'Metamorphic', 'Soil'],
            explain: 'Rock that forms from cooling melted rock is igneous. Slow cooling underground gives larger crystals.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'layers',
        items: [
          rng => TF(rng, { statement: 'The Earth’s interior has four main layers: the inner core, outer core, mantle and crust.', answer: true,
            explain: 'Those are the four main layers, from the centre outwards.' }),
          rng => TF(rng, { learn: 'cycle', statement: 'Rocks never change from one type to another.', answer: false,
            explain: 'The rock cycle describes how rocks continuously change type through geological processes, over very long times.' }),
          rng => TF(rng, { learn: 'fossils', statement: 'Fossils form when organisms are buried in sediment and minerals slowly replace their material.', answer: true,
            explain: 'That is how most fossils form, over long periods of time.' }),
          rng => TF(rng, { learn: 'soil', statement: 'Soil contains living organisms as well as rock particles.', answer: true,
            explain: 'Soil includes fungi, plants, animals and bacteria, along with rock particles, air and water.' }),
          rng => TF(rng, { statement: "The crust is the thickest layer of the Earth.", answer: false, learn: 'layers',
            explain: "The crust is the thinnest layer. The mantle is the thickest." }),
          rng => TF(rng, { statement: "The mantle lies between the crust and the outer core.", answer: true, learn: 'layers',
            explain: "From the outside in: crust, mantle, outer core, inner core." }),
          rng => TF(rng, { statement: "A rock can be made of more than one mineral.", answer: true, learn: 'minerals',
            explain: "Rocks are made of one or more minerals." }),
          rng => TF(rng, { statement: "The particles in a mineral form a repeating pattern.", answer: true, learn: 'minerals',
            explain: "That pattern gives a mineral its regular crystal shape." }),
          rng => TF(rng, { statement: "Granite is a sedimentary rock.", answer: false, learn: 'types',
            explain: "Granite is igneous: it forms when melted rock cools." }),
          rng => TF(rng, { statement: "Marble is a metamorphic rock.", answer: true, learn: 'types',
            explain: "Marble forms when rock is changed by heat and pressure." }),
          rng => TF(rng, { statement: "Sedimentary rocks form when melted rock cools.", answer: false, learn: 'types',
            explain: "That is igneous rock. Sedimentary rock forms from layers of sediment pressed together." }),
          rng => TF(rng, { statement: "Fossils are most often found in sedimentary rock.", answer: true, learn: 'identify',
            explain: "Organisms are buried in layers of sediment, which become sedimentary rock." }),
          rng => TF(rng, { statement: "Pumice is a metamorphic rock.", answer: false, learn: 'identify',
            explain: "Pumice is igneous. It forms when frothy lava cools quickly, trapping gas bubbles." }),
          rng => TF(rng, { statement: "Slow cooling underground gives igneous rock larger crystals.", answer: true, learn: 'identify',
            explain: "The crystals have longer to grow." }),
          rng => TF(rng, { statement: "Soil contains air and water.", answer: true, learn: 'soil',
            explain: "Soil is rock particles, air, water, decaying organisms and living things." }),
          rng => TF(rng, { statement: "Hāngī stones are chosen because they hold heat without cracking.", answer: true, learn: 'uses',
            explain: "They are volcanic rocks with properties suited to the job." })
        ]
      }
    ]
  });


  // ═══ 8.6 Evolution ════════════════════════════════════════════════════════
  // Knowledge: Evolution (p. 21). Fossil evidence; variation; heritability;
  // selection pressures; natural selection; Darwin and Wallace; traits
  // becoming more common; evolution in populations; new species; extinction;
  // common ancestry.
  // Practices: analysing evidence; interpreting fossils; environmental change
  // and extinction.

  Sci.topic({
    id: 's8e6', unit: 'y8',
    title: 'Evolution',
    blurb: 'How populations change over many generations, and the evidence that they have.',
    hint: 'Individuals in a population vary, and some of that variation is inherited. A selection pressure, such as limited food, ' +
          'means individuals with helpful traits are more likely to survive and reproduce, so those traits become more common over ' +
          'many generations. Populations evolve; individuals do not.',

    learn: [
      {
        id: 'variation', title: 'Variation and inheritance',
        text: '<p>Individuals of a species <strong>vary</strong>: male wētā, for example, differ in the size of their heads and jaws.</p>' +
              Sci.table(['Inherited: can be passed on', 'Acquired: cannot'], [['Natural eye and hair colour', 'A scar'], ['Blood group', 'Muscles from training'], ['A wētā’s jaw size', 'A tattoo, a language']])
      },
      {
        id: 'pressure', title: 'Selection pressures',
        text: '<p>A <strong>selection pressure</strong> is a feature of the environment that affects which individuals survive or reproduce: a shortage of food, a new predator, very cold winters.</p>'
      },
      {
        id: 'selection', title: 'Natural selection',
        text: '<ol class="learn-steps"><li>Individuals vary in a heritable trait</li><li>A selection pressure affects survival</li>' +
              '<li>Those with a helpful version are more likely to survive and reproduce</li><li>They pass it to their offspring</li>' +
              '<li>Over many generations, the trait becomes more common</li></ol>' +
              '<p>Nobody chooses their traits: it is not a decision.</p>'
      },
      {
        id: 'moths', title: 'An example: dark moths',
        diagram: { w: 280, h: 200 },
        draw(d) {
          const pts = [[0, 8], [10, 15], [20, 38], [30, 64], [40, 78], [50, 82]];
          SciDia.graph(d, { xMax: 50, yMax: 100, xStep: 10, yStep: 20, xLabel: 'Years after the bark darkened', yLabel: 'Dark moths (%)', series: [{ points: pts }] });
        },
        text: '<p>Soot darkened the tree bark. Birds spotted pale moths more easily, so dark moths survived and reproduced more, and the dark colour became more common.</p>'
      },
      {
        id: 'populations', title: 'Populations evolve',
        text: '<p>Evolution is a change in traits within a <strong>population</strong>, over <strong>many generations</strong>. A single animal does not evolve during its life.</p>'
      },
      {
        id: 'darwin', title: 'Darwin, Wallace and Lamarck',
        text: '<p><strong>Charles Darwin</strong> and <strong>Alfred Russel Wallace</strong> presented their theories of natural selection together.</p>' +
              '<p><strong>Lamarck</strong> had proposed that traits acquired in a lifetime are passed on. That idea is contested: only inherited traits pass on.</p>'
      },
      {
        id: 'evidence', title: 'The evidence',
        text: '<ul><li><strong>Fossils:</strong> some resemble living things (crocodiles); others belong to groups that no longer exist (trilobites). Their features show how they lived.</li>' +
              '<li><strong>Shared features:</strong> every vertebrate has a backbone, pointing to a common ancestor.</li>' +
              '<li><strong>DNA</strong> adds further support.</li></ul>'
      },
      {
        id: 'species', title: 'New species',
        text: '<p>Over long periods, changes build up until a <strong>new species</strong> forms. Kākā, kea and kākāpō descend from a shared parrot ancestor.</p>'
      },
      {
        id: 'extinction', title: 'Extinction',
        text: '<p>Some species cannot survive a change in their environment, such as habitat destruction, and become <strong>extinct</strong>. The moa did not survive the changes after people arrived, including hunting and habitat loss.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: natural selection, step by step',
        steps: [
          'Individuals in a population vary: some moths are darker than others.',
          'Some of that variation is heritable: dark parents tend to have dark offspring.',
          'A selection pressure acts: birds eat the moths they can see most easily.',
          'Where the tree bark is dark, dark moths are more likely to survive and reproduce, passing on their colour.',
          'Over many generations, dark moths become more common in the population.'
        ]
      },
      {
        title: 'Example 2: evidence for evolution',
        steps: [
          'Fossils show that living things have appeared in many forms through Earth’s history. Some, like crocodiles, resemble living organisms; others, like trilobites, belong to groups that no longer exist.',
          'Shared features, such as the backbone of every vertebrate, point to common ancestry.',
          'DNA evidence adds further support. Kākā, kea and kākāpō are different kinds of parrot that descend from a shared ancestor.'
        ]
      }
    ],

    slots: [
      // 1 · Order natural selection.
      {
        name: 'Natural selection in order', learn: 'selection',
        items: [Sci.gen(rng => order(rng, 'Put these steps of natural selection in order.', some(rng, [
          'Individuals in a population vary in a heritable trait',
          'A selection pressure, such as limited food, affects survival',
          'Individuals with a helpful version of the trait are more likely to survive and reproduce',
          'They pass the trait on to their offspring',
          'Over many generations, the trait becomes more common'
        ], 4), 'Variation, then selection, then reproduction and inheritance, repeated over many generations.'))]
      },

      // 2 · Heritable or acquired?
      {
        name: 'Inherited or acquired?', learn: 'variation',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each trait inherited from parents, or acquired during a lifetime?',
          bins: ['Inherited', 'Acquired'],
          items: [
            { text: 'Natural eye colour', bin: 0 }, { text: 'Blood group', bin: 0 },
            { text: 'The size of a male wētā’s head and jaws', bin: 0 }, { text: 'Natural hair colour', bin: 0 },
            { text: 'A scar from an accident', bin: 1 }, { text: 'Big muscles from training at the gym', bin: 1 },
            { text: 'A tattoo', bin: 1 }, { text: 'Being able to speak te reo Māori', bin: 1 }
          ],
          pick: 6,
          explain: 'Heritable traits can be passed to offspring. Traits acquired during a lifetime cannot, which is why Lamarck’s idea was contested.'
        })]
      },

      // 3 · Selection pressures.
      {
        name: 'Selection pressures', learn: 'pressure',
        items: [
          rng => C(rng, {
            prompt: 'What is a selection pressure?',
            right: 'A feature of the environment that affects which individuals survive or reproduce',
            wrong: ['A force that makes organisms grow bigger', 'The pressure of the air on a living thing', 'A choice an animal makes about its mate'],
            explain: 'Selection pressures are features of the environment, such as limited food or predators, that affect survival or reproduction.'
          }),
          rng => C(rng, {
            prompt: 'Which of these is a selection pressure?',
            right: rng.pick(['A shortage of food', 'A new predator arriving', 'Extremely cold winters', 'Strong sun exposure']),
            wrong: ['The colour of the sky', 'The name of the species', 'The number of scientists studying it'],
            explain: 'Selection pressures are features of the environment that affect which individuals survive or reproduce.'
          })
        ]
      },

      // 4 · Reading data on a population.
      {
        name: 'Evidence from a population', learn: 'moths',
        items: [Sci.gen(rng => {
          const years = [0, 10, 20, 30, 40, 50];
          const start = rng.int(5, 15), end = rng.int(70, 90);
          const dark = years.map((y, i) => +(start + (end - start) / (1 + Math.exp(-(i - 2.5) * 1.6))).toFixed(0));
          return {
            prompt: 'In one area, soot from factories darkened the tree bark where a kind of moth rests. The graph shows the percentage of the moths that were the dark form.',
            diagram: { w: 300, h: 210 },
            draw: d => SciDia.graph(d, {
              xMax: 50, yMax: 100, xStep: 10, yStep: 20, xLabel: 'Years after the bark darkened', yLabel: 'Dark moths (%)',
              series: [{ points: years.map((y, i) => [y, dark[i]]) }]
            }),
            input: {
              kind: 'choice', wide: true,
              options: [
                { html: 'Dark moths were better camouflaged, so more survived to reproduce and pass on their colour.', right: true },
                { html: 'The soot dyed the moths’ wings darker during their lives.', right: false },
                { html: 'Each moth decided to become darker to hide.', right: false },
                { html: 'Pale moths stopped laying eggs because the soot made them sick.', right: false }
              ],
              correct: 0
            },
            explain: 'This is natural selection: on dark bark, birds spotted pale moths more easily. Dark moths survived and reproduced more, so the heritable dark colour became more common.'
          };
        })]
      },

      // 5 · Lamarck or Darwin?
      {
        name: 'Darwin, Wallace and Lamarck', learn: 'darwin',
        items: [
          rng => C(rng, {
            prompt: 'Who presented their theories of natural selection together?',
            right: 'Charles Darwin and Alfred Russel Wallace', wrong: ['Robert Hooke and Antonie van Leeuwenhoek', 'Jean-Baptiste Lamarck and Plato', 'Ibn al-Haytham and Charles Darwin'],
            explain: 'Darwin and Wallace, working at the same time, presented their theories of natural selection together.'
          }),
          rng => C(rng, {
            prompt: 'Lamarck suggested that traits an animal develops during its life are passed to its offspring. Why is this idea contested?',
            right: 'Traits acquired during a lifetime, such as bigger muscles, are not inherited.',
            wrong: ['Animals never change during their lives.', 'Offspring never resemble their parents.', 'Darwin proved that traits are not inherited at all.'],
            explain: 'Only heritable traits can be passed on. Thick fur in cold places spread because individuals that inherited thicker fur survived better and had more offspring.'
          })
        ]
      },

      // 6 · Populations, not individuals.
      {
        name: 'Who evolves?', learn: 'populations',
        items: [
          rng => TF(rng, { statement: 'An individual animal can evolve during its lifetime.', answer: false,
            explain: 'Evolution is a change in traits within a population over generations, not a change within one individual.' }),
          rng => C(rng, {
            prompt: 'Evolution describes changes in traits…',
            right: 'within populations, over many generations', wrong: ['within one animal, during its life', 'that happen overnight', 'only in plants'],
            explain: 'Evolution happens to populations, over generations.'
          })
        ]
      },

      // 7 · Evidence for evolution.
      {
        name: 'The evidence', learn: 'evidence',
        items: [
          rng => C(rng, {
            prompt: 'Which of these is evidence that populations and species have changed over time?',
            right: 'Fossils of organisms that no longer exist, such as trilobites', wrong: ['The colour of today’s sky', 'The number of moons of Jupiter', 'How fast water boils'],
            explain: 'Fossils, shared traits and DNA evidence all support the theory that species have changed over time.'
          }),
          rng => C(rng, {
            prompt: 'All vertebrates (fish, frogs, lizards, birds, mammals) have a backbone. What does this shared feature suggest?',
            right: 'They are related through a common ancestor.', wrong: ['They all live in water.', 'They all evolved separately from scratch.', 'They are all the same species.'],
            explain: 'Shared features among vertebrates support the theory that all living organisms are related through common ancestry.'
          }),
          rng => C(rng, {
            prompt: 'A fossil animal has long, thin legs and webbed feet. What environment did it most likely live in?',
            right: 'Shallow water, such as a wetland or shore', wrong: ['A dry desert', 'High in the treetops', 'Deep underground'],
            explain: 'Fossil features let us infer how an organism lived: wading legs and webbed feet suit shallow water.'
          })
        ]
      },

      // 8 · New species.
      {
        name: 'New species', learn: 'species',
        items: [
          rng => C(rng, {
            prompt: 'Kākā, kea and kākāpō are different kinds of New Zealand parrot. What does evolution suggest about them?',
            right: 'Over long periods they developed from a shared ancestor.', wrong: ['They have always been exactly as they are now.', 'Kea evolved from kākā last year.', 'They are unrelated to each other.'],
            explain: 'Over long periods, trait changes accumulate, and new species can form from a shared ancestor.'
          }),
          rng => TF(rng, { statement: 'Over long periods, trait changes can build up until a new species forms.', answer: true,
            explain: 'This is how species such as kākā, kea and kākāpō arose from a shared ancestor.' })
        ]
      },

      // 9 · Extinction.
      {
        name: 'Extinction', learn: 'extinction',
        items: [
          rng => C(rng, {
            prompt: 'Why did the moa become extinct?',
            right: 'It could not survive the environmental changes after people arrived, including hunting and habitat loss.',
            wrong: ['It evolved into the kiwi.', 'It flew away to Australia.', 'It is not extinct; it is just hiding.'],
            explain: 'Some species cannot survive environmental change and become extinct, as the moa did.'
          }),
          rng => C(rng, {
            prompt: 'Which change in the environment is most likely to cause a species to become extinct?',
            right: 'Its habitat being destroyed', wrong: ['A new park being named after it', 'Scientists studying it', 'A sunny day'],
            explain: 'Environmental changes such as habitat destruction or changes in temperature can drive species to extinction.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'variation',
        items: [
          rng => TF(rng, { statement: 'Individuals within a species show variation in their traits.', answer: true,
            explain: 'No two individuals are exactly alike; for example, male wētā differ in head and jaw size.' }),
          rng => TF(rng, { learn: 'selection', statement: 'Natural selection means individuals choose which traits to have.', answer: false,
            explain: 'Natural selection is not a choice. Heritable differences affect which individuals survive and reproduce.' }),
          rng => TF(rng, { learn: 'evidence', statement: 'Some fossils are similar to organisms alive today.', answer: true,
            explain: 'Crocodile fossils, for example, look much like crocodiles living now.' }),
          rng => TF(rng, { learn: 'selection', statement: 'A trait that helps individuals survive and reproduce tends to become more common in a population over many generations.', answer: true,
            explain: 'Those individuals leave more offspring, who inherit the trait.' }),
          rng => TF(rng, { statement: "A scar is an inherited trait.", answer: false, learn: 'variation',
            explain: "A scar is acquired during a lifetime, so it cannot be passed on." }),
          rng => TF(rng, { statement: "Muscles built at the gym can be passed on to offspring.", answer: false, learn: 'variation',
            explain: "They are acquired, not inherited." }),
          rng => TF(rng, { statement: "A shortage of food can be a selection pressure.", answer: true, learn: 'pressure',
            explain: "It affects which individuals survive and reproduce." }),
          rng => TF(rng, { statement: "In natural selection, individuals with helpful traits are more likely to survive and reproduce.", answer: true, learn: 'selection',
            explain: "They pass those traits on, so the traits become more common." }),
          rng => TF(rng, { statement: "Evolution happens over many generations.", answer: true, learn: 'populations',
            explain: "It is a change in a population’s traits over generations." }),
          rng => TF(rng, { statement: "An individual animal evolves as it gets older.", answer: false, learn: 'populations',
            explain: "Populations evolve, over many generations. Individuals do not." }),
          rng => TF(rng, { statement: "Darwin and Wallace both developed theories of natural selection.", answer: true, learn: 'darwin',
            explain: "They presented their theories together." }),
          rng => TF(rng, { statement: "Lamarck proposed the theory of natural selection.", answer: false, learn: 'darwin',
            explain: "Darwin and Wallace did. Lamarck proposed that acquired traits are passed on, an idea since contested." }),
          rng => TF(rng, { statement: "All vertebrates have a backbone, which suggests a shared ancestor.", answer: true, learn: 'evidence',
            explain: "Shared features support common ancestry." }),
          rng => TF(rng, { statement: "Kākā, kea and kākāpō descend from a shared ancestor.", answer: true, learn: 'species',
            explain: "Over long periods, new species formed from that ancestor." }),
          rng => TF(rng, { statement: "The moa is extinct.", answer: true, learn: 'extinction',
            explain: "It did not survive the changes after people arrived." }),
          rng => TF(rng, { statement: "Habitat destruction can cause a species to become extinct.", answer: true, learn: 'extinction',
            explain: "Some species cannot survive changes to their environment." })
        ]
      }
    ]
  });


  // ═══ 8.7 Reproduction and development ═════════════════════════════════════
  // Knowledge: Reproduction and development (pp. 21–22). Sexual and asexual
  // reproduction; gametes and fertilisation; mammal development; puberty;
  // the menstrual cycle and hormones; flowering plants; fungi and spores.
  // Practices: organising information to compare reproduction in flowering
  // plants, animals and fungi.
  //
  // Written plainly and factually, kept strictly to the knowledge statements.
  // The curriculum cross-references Year 8 Health and Physical Education.

  Sci.topic({
    id: 's8e7', unit: 'y8',
    title: 'Reproduction and Development',
    blurb: 'How flowering plants, animals and fungi reproduce, and how a mammal develops.',
    hint: 'Sexual reproduction needs two parents and gives offspring a mix of both parents’ traits. Asexual reproduction needs ' +
          'one parent and gives offspring genetically identical to it. Flowering plants go from pollination to fertilisation, seeds, ' +
          'dispersal and germination. Most fungi reproduce by spores.',

    learn: [
      {
        id: 'two', title: 'Sexual and asexual', wide: true,
        text: Sci.table(['', 'Sexual', 'Asexual'], [['Parents', 'two', 'one'], ['How', 'gametes join at fertilisation', 'the parent makes new individuals directly'],
                ['Offspring', 'a mix of both parents’ traits', 'genetically identical to the parent'],
                ['Examples', 'a kiwi egg; seeds after pollination', 'strawberry runners; a bacterium splitting']]) +
              '<p>All living organisms reproduce.</p>'
      },
      {
        id: 'plants', title: 'A flowering plant', wide: true,
        diagram: { w: 330, h: 200 },
        draw(d) { SciDia.cycle(d, ['Pollination', 'Fertilisation', 'Seed formation', 'Seed dispersal', 'Germination'], { size: 10.5 }); },
        text: '<p><strong>Pollination:</strong> pollen is carried to a flower, by wind, insects or birds such as tūī. <strong>Fertilisation:</strong> a male gamete joins a female gamete. ' +
              'Seeds form and are <strong>dispersed</strong>, for example by kererū. <strong>Germination:</strong> a seed starts to grow.</p>'
      },
      {
        id: 'mammals', title: 'How a mammal develops',
        text: '<ol class="learn-steps"><li>Gametes form: sperm and ovum (egg)</li><li>Fertilisation: they join</li><li>Zygote: the first cell</li>' +
              '<li>Embryo</li><li>Foetus</li><li>Birth</li></ol>'
      },
      {
        id: 'fungi', title: 'Fungi',
        text: '<p>Most fungi reproduce by <strong>spores</strong>, which spread and grow into new fungi.</p>' +
              '<p>A mushroom makes its spores in a structure you can see, such as its gills. Moulds produce spores directly.</p>'
      },
      {
        id: 'hormones', title: 'Hormones',
        text: '<p>A <strong>hormone</strong> is a chemical carried in the <strong>blood</strong> that changes the activity of particular target cells or tissues.</p>' +
              '<p>Hormones regulate sperm production in males and control the menstrual cycle in females.</p>'
      },
      {
        id: 'puberty', title: 'Puberty and the menstrual cycle',
        text: '<p><strong>Puberty</strong> is when a person develops the ability to reproduce.</p>' +
              '<p>In the <strong>menstrual cycle</strong>, hormones control ovulation and the growth of the uterus lining. If fertilisation does not happen, the lining is shed: menstruation.</p>'
      },
      {
        id: 'compare', title: 'Comparing the three',
        text: Sci.table(['Organism', 'Usually reproduces by'], [['Flowering plants', 'seeds, after pollination and fertilisation'],
                ['Animals', 'sperm and egg, then fertilisation'], ['Fungi', 'spores']])
      }
    ],

    examples: [
      {
        title: 'Example 1: sexual and asexual reproduction',
        steps: [
          '<strong>Sexual:</strong> two parents. Each makes a gamete (in animals, sperm and egg), and the two join at fertilisation. The offspring have a mix of both parents’ traits.',
          '<strong>Asexual:</strong> one parent. A strawberry plant sends out runners that grow into new plants, genetically identical to the parent.'
        ]
      },
      {
        title: 'Example 2: a flowering plant',
        steps: [
          '<strong>Pollination:</strong> pollen is carried to another flower, by wind, insects or birds such as tūī.',
          '<strong>Fertilisation:</strong> a male gamete from the pollen joins with a female gamete in the flower.',
          '<strong>Seed formation</strong>, then <strong>seed dispersal</strong>: seeds are carried away, for example by kererū eating the fruit.',
          '<strong>Germination:</strong> the seed starts to grow into a new plant.'
        ]
      }
    ],

    slots: [
      // 1 · Sexual or asexual?
      {
        name: 'Sexual or asexual?', learn: 'two',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each one sexual or asexual reproduction?',
          bins: ['Sexual', 'Asexual'],
          items: [
            { text: 'A kiwi chick hatching from a fertilised egg', bin: 0 },
            { text: 'Seeds forming after a flower is pollinated', bin: 0 },
            { text: 'A frog’s eggs being fertilised by sperm', bin: 0 },
            { text: 'Two dogs having puppies', bin: 0 },
            { text: 'A strawberry plant growing new plants from runners', bin: 1 },
            { text: 'A bacterium splitting into two', bin: 1 },
            { text: 'A new potato plant growing from a tuber', bin: 1 },
            { text: 'A cutting from a plant growing its own roots', bin: 1 }
          ],
          pick: 6,
          explain: 'Sexual reproduction joins gametes from two parents. Asexual reproduction uses one parent, and its offspring are genetically identical to it.'
        })]
      },

      // 2 · Flowering plant stages.
      {
        name: 'A flowering plant’s life', learn: 'plants',
        items: [Sci.gen(rng => order(rng, 'Put these stages of reproduction in a flowering plant in order.',
          some(rng, ['Pollination', 'Fertilisation', 'Seed formation', 'Seed dispersal', 'Germination'], 4),
          'The full order: pollination, fertilisation, seed formation, seed dispersal, germination.'))]
      },

      // 3 · Mammal development.
      {
        name: 'Development of a mammal', learn: 'mammals',
        items: [Sci.gen(rng => order(rng, 'Put these stages in the development of a mammal in order.',
          some(rng, ['Gamete formation (sperm and ovum)', 'Fertilisation', 'Zygote', 'Embryo', 'Foetus', 'Birth'], 4),
          'The full order: gametes form, fertilisation makes a zygote, which develops into an embryo, then a foetus, before birth.'))]
      },

      // 4 · What the offspring are like.
      {
        name: 'What the offspring are like', learn: 'two',
        items: [
          rng => C(rng, {
            prompt: 'What are offspring from <strong>sexual</strong> reproduction like?',
            right: 'They have a mix of both parents’ traits.', wrong: ['They are identical to one parent.', 'They have no traits from either parent.', 'They are always identical to each other.'],
            explain: 'Two parents each contribute, so the offspring show a mix of both parents’ traits.'
          }),
          rng => C(rng, {
            prompt: 'What are offspring from <strong>asexual</strong> reproduction like?',
            right: 'Genetically identical to their single parent', wrong: ['A mix of two parents', 'Completely different from the parent', 'Always bigger than the parent'],
            explain: 'With only one parent, asexual offspring are genetically identical to it.'
          })
        ]
      },

      // 5 · Fungi.
      {
        name: 'How fungi reproduce', learn: 'fungi',
        items: [
          rng => C(rng, {
            prompt: 'How do most fungi reproduce?',
            right: 'By forming spores that spread and then grow into new fungi', wrong: ['By making seeds in flowers', 'By laying eggs', 'By splitting in two like bacteria'],
            explain: 'Most fungi form spores, which disperse and germinate to form new fungi.'
          }),
          rng => TF(rng, { statement: 'Mushrooms produce their spores from structures you can see, while moulds produce spores directly.', answer: true,
            explain: 'Both reproduce by spores; a mushroom makes them in a visible structure such as its gills.' })
        ]
      },

      // 6 · Hormones.
      {
        name: 'Hormones', learn: 'hormones',
        items: [
          rng => C(rng, {
            prompt: 'What is a hormone?',
            right: 'A chemical substance carried by the blood that changes the activity of specific target cells or tissues',
            wrong: ['A type of cell that carries oxygen', 'A muscle that controls growth', 'A nerve that carries signals to the brain'],
            explain: 'Hormones are chemical messengers carried in the blood to particular target cells or tissues.'
          }),
          rng => TF(rng, { statement: 'Sperm production in males is regulated by hormones.', answer: true,
            explain: 'Hormones regulate sperm production, just as they control the menstrual cycle in females.' })
        ]
      },

      // 7 · Puberty and the menstrual cycle.
      {
        name: 'Puberty and the menstrual cycle', learn: 'puberty',
        items: [
          rng => C(rng, {
            prompt: 'What is puberty?',
            right: 'The stage when a person develops the ability to reproduce', wrong: ['The moment of fertilisation', 'The stage just before birth', 'A disease of teenagers'],
            explain: 'Puberty is when organisms develop reproductive ability.'
          }),
          rng => C(rng, {
            prompt: 'In the menstrual cycle, what happens to the lining of the uterus if fertilisation does not occur?',
            right: 'It is shed (menstruation).', wrong: ['It keeps growing until the next year.', 'It turns into an embryo.', 'It moves to the ovary.'],
            explain: 'Hormones control ovulation and the growth and shedding of the uterine lining. Without fertilisation, the lining is shed.'
          })
        ]
      },

      // 8 · Match the plant stages.
      {
        name: 'Plant reproduction words', learn: 'plants',
        items: [Sci.gen(rng => match(rng, 'Match each stage to what happens.', some(rng, [
          ['Pollination', 'Pollen is carried to a flower'],
          ['Fertilisation', 'A male gamete joins with a female gamete'],
          ['Seed formation', 'Seeds develop in the flower after fertilisation'],
          ['Seed dispersal', 'Seeds are carried away from the parent plant'],
          ['Germination', 'A seed starts to grow into a new plant']
        ], 4), 'In order: pollination, fertilisation, seed formation, seed dispersal, germination.'))]
      },

      // 9 · Comparing organisms.
      {
        name: 'Comparing plants, animals and fungi', learn: 'compare',
        items: [
          rng => C(rng, {
            prompt: 'What do flowering plants, animals and fungi all have in common?',
            right: 'They all reproduce.', wrong: ['They all make seeds.', 'They all reproduce by spores.', 'They all have flowers.'],
            explain: 'All living organisms reproduce, though they do it in different ways.'
          }),
          rng => C(rng, {
            prompt: 'Which is a difference between how a flowering plant and a fungus usually reproduce?',
            right: 'The plant makes seeds; most fungi make spores.', wrong: ['The fungus makes seeds; the plant makes spores.', 'Only the plant reproduces.', 'There is no difference.'],
            explain: 'Organising information shows both reproduce, but flowering plants form seeds while most fungi form spores.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'two',
        items: [
          rng => TF(rng, { statement: 'All living organisms reproduce.', answer: true, explain: 'Reproduction is one of the life processes of every organism.' }),
          rng => TF(rng, { statement: 'Asexual reproduction needs two parents.', answer: false, explain: 'Asexual reproduction involves a single parent.' }),
          rng => TF(rng, { learn: 'mammals', statement: 'In animals, sexual reproduction involves sperm and egg formation, then fertilisation.', answer: true,
            explain: 'Animals reproduce sexually through sperm and egg formation, then fertilisation.' }),
          rng => TF(rng, { learn: 'mammals', statement: 'A zygote forms after fertilisation.', answer: true,
            explain: 'The zygote is the first cell formed when the gametes join; it then develops into an embryo.' }),
          rng => TF(rng, { statement: "A strawberry plant growing new plants from runners is asexual reproduction.", answer: true, learn: 'two',
            explain: "There is only one parent." }),
          rng => TF(rng, { statement: "Offspring of asexual reproduction are genetically identical to their parent.", answer: true, learn: 'two',
            explain: "With only one parent, there is no mixing of traits." }),
          rng => TF(rng, { statement: "Sexual reproduction involves only one parent.", answer: false, learn: 'two',
            explain: "Sexual reproduction involves two parents, each making gametes." }),
          rng => TF(rng, { statement: "Pollination happens after fertilisation.", answer: false, learn: 'plants',
            explain: "Pollination comes first: pollen must arrive before fertilisation can happen." }),
          rng => TF(rng, { statement: "Germination is when a seed starts to grow into a new plant.", answer: true, learn: 'plants',
            explain: "It is the last stage, after seeds are dispersed." }),
          rng => TF(rng, { statement: "Birds such as tūī can carry pollen between flowers.", answer: true, learn: 'plants',
            explain: "Pollen is carried by wind, insects or birds." }),
          rng => TF(rng, { statement: "An embryo develops into a foetus.", answer: true, learn: 'mammals',
            explain: "Zygote, embryo, foetus, then birth." }),
          rng => TF(rng, { statement: "The zygote forms before fertilisation.", answer: false, learn: 'mammals',
            explain: "The zygote is the first cell formed by fertilisation." }),
          rng => TF(rng, { statement: "Most fungi reproduce by spores.", answer: true, learn: 'fungi',
            explain: "Spores spread and grow into new fungi." }),
          rng => TF(rng, { statement: "Hormones are carried around the body in the blood.", answer: true, learn: 'hormones',
            explain: "They change the activity of particular target cells or tissues." }),
          rng => TF(rng, { statement: "Puberty is when a person develops the ability to reproduce.", answer: true, learn: 'puberty',
            explain: "Hormones control the changes." }),
          rng => TF(rng, { statement: "Flowering plants usually reproduce by spores.", answer: false, learn: 'compare',
            explain: "Flowering plants make seeds. Most fungi reproduce by spores." })
        ]
      }
    ]
  });


  // ═══ 8.8 Relationships in an ecosystem ════════════════════════════════════
  // Knowledge: Relationships in an ecosystem (p. 22). Producers, consumers,
  // decomposers; matter cycling and energy transfer; predator and prey;
  // mutualism; parasitism; soils and nutrient cycling.
  // Practices: measuring abiotic conditions with quadrats and transects; using
  // recorded data on organisms to see patterns over time.

  const RELATIONS = [
    ['A kārearea (NZ falcon) catches a small bird', 0],
    ['A ruru eats a tree wētā', 0],
    ['A stoat kills a rat', 0],
    ['Bees collect nectar and carry pollen between flowers', 1],
    ['Tūī drink nectar from harakeke (flax) flowers and carry their pollen', 1],
    ['In a lichen, a fungus and an alga live together, each helping the other', 1],
    ['Fleas feed on a dog’s blood', 2],
    ['A tapeworm lives in another animal’s gut, taking its food', 2]
  ];
  const REL_NAMES = ['Predator and prey', 'Mutualism', 'Parasitism'];
  const ROLES = [
    { text: 'A kōwhai tree', bin: 0 }, { text: 'Seaweed', bin: 0 }, { text: 'Grass', bin: 0 }, { text: 'Phytoplankton', bin: 0 },
    { text: 'A kererū', bin: 1 }, { text: 'A rabbit', bin: 1 }, { text: 'A snapper', bin: 1 }, { text: 'A stoat', bin: 1 },
    { text: 'Fungi growing on a fallen log', bin: 2 }, { text: 'Bacteria breaking down a dead leaf', bin: 2 },
    { text: 'Mould on an old orange', bin: 2 }
  ];

  Sci.topic({
    id: 's8e8', unit: 'y8',
    title: 'Relationships in an Ecosystem',
    blurb: 'Producers, consumers and decomposers, and the ways organisms depend on each other.',
    hint: 'Producers make glucose by photosynthesis. Consumers get energy and nutrients by feeding on others. Decomposers break ' +
          'down dead organisms and waste, returning nutrients to the ecosystem. In mutualism both organisms benefit; in parasitism ' +
          'one benefits and the other is harmed.',

    learn: [
      {
        id: 'roles', title: 'Three roles', wide: true,
        text: Sci.table(['Role', 'Gets energy by', 'Examples'], [
                ['<strong>Producer</strong>', 'making glucose by photosynthesis', 'kōwhai, grass, seaweed, phytoplankton'],
                ['<strong>Consumer</strong>', 'feeding on producers or other consumers', 'kererū, rabbit, snapper, stoat'],
                ['<strong>Decomposer</strong>', 'breaking down dead organisms and waste', 'fungi on a log, bacteria, mould']])
      },
      {
        id: 'cycle', title: 'Matter cycles, energy flows',
        diagram: { w: 260, h: 170 },
        draw(d) { SciDia.cycle(d, ['Producers', 'Consumers', 'Decomposers', 'Nutrients in soil']); },
        text: '<p><strong>Matter</strong> goes round and round. <strong>Energy</strong> is transferred through and does not cycle. In a food chain, arrows point from the food to the eater: the direction energy moves.</p>'
      },
      {
        id: 'relations', title: 'Living together', wide: true,
        text: Sci.table(['Relationship', 'Who gains', 'Example'], [
                ['<strong>Predator and prey</strong>', 'one hunts and eats the other', 'kārearea and a small bird'],
                ['<strong>Mutualism</strong>', 'both benefit', 'tūī and harakeke; bees and flowers'],
                ['<strong>Parasitism</strong>', 'one benefits, the other is harmed', 'fleas on a dog']]) +
              '<p>Organisms in an ecosystem are <strong>interdependent</strong>.</p>'
      },
      {
        id: 'decomposers', title: 'Decomposers',
        text: '<p>They break down dead organisms and waste, releasing <strong>nutrients</strong> that producers take up again.</p>' +
              '<p>Without them, dead leaves and logs would pile up and nutrients would not return to the soil.</p>'
      },
      {
        id: 'soil', title: 'Soil and nutrients',
        text: '<p>Soil is decaying organic matter, living organisms, rock particles, air and water. Decomposers in it keep nutrients cycling.</p>'
      },
      {
        id: 'quadrat', title: 'Estimating with quadrats',
        text: '<ol class="learn-steps"><li>Place 1 m² quadrats at random and count in each</li><li>Average: (4 + 6 + 3 + 5 + 7) ÷ 5 = 5 per m²</li>' +
              '<li>Area of the field: 20 m × 50 m = 1000 m²</li><li>Estimate: 5 × 1000 = 5000</li></ol>'
      },
      {
        id: 'patterns', title: 'Where organisms live',
        text: '<p>Conditions affect where organisms are found. Leaf litter gives shelter, moisture and food, so it holds more invertebrates than bare ground.</p>' +
              '<p>Measure <strong>abiotic</strong> conditions, such as temperature and moisture, along a <strong>transect</strong> to explain the pattern.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: three roles in an ecosystem',
        steps: [
          '<strong>Producer:</strong> makes glucose by photosynthesis. A kōwhai tree is a producer.',
          '<strong>Consumer:</strong> gets energy and nutrients by feeding on producers or other consumers. A tūī is a consumer.',
          '<strong>Decomposer:</strong> breaks down dead organisms and waste, releasing nutrients back into the soil. Fungi on a fallen log are decomposers.',
          'Matter cycles round and round; energy is transferred through the ecosystem.'
        ]
      },
      {
        title: 'Example 2: estimating a population with quadrats',
        steps: [
          'A field is 20 m by 50 m, so its area is 1000 m².',
          'Five 1 m² quadrats are placed at random. They contain 4, 6, 3, 5 and 7 daisies.',
          'The average is ' + m('(4 + 6 + 3 + 5 + 7) \\div 5 = 5') + ' daisies per m².',
          'So the field holds about ' + m('5 \\times 1000 = 5000') + ' daisies.'
        ],
        result: 'About 5000 daisies'
      }
    ],

    slots: [
      // 1 · Producer, consumer or decomposer?
      {
        name: 'Producer, consumer or decomposer?', learn: 'roles',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each one a producer, a consumer or a decomposer?',
          bins: ['Producer', 'Consumer', 'Decomposer'],
          items: ROLES,
          pick: 6,
          explain: 'Producers make their own food by photosynthesis; consumers eat other organisms; decomposers break down dead material and waste.'
        })]
      },

      // 2 · Name the relationship.
      {
        name: 'Name the relationship', learn: 'relations',
        items: RELATIONS.map(([text, k]) => rng => ({
          prompt: `<em>${text}.</em> What kind of relationship is this?`,
          input: { kind: 'choice', options: REL_NAMES.map((r, i) => ({ html: r, right: i === k })), correct: k },
          explain: ['One organism hunts and eats the other: predator and prey.',
                    'Both organisms benefit: mutualism.',
                    'One benefits while the other is harmed: parasitism.'][k]
        }))
      },

      // 3 · Match the relationships.
      {
        name: 'Match the relationships', learn: 'relations',
        items: [rng => match(rng, 'Match each relationship to its meaning.', [
          ['Predator', 'An organism that hunts and eats other organisms'],
          ['Prey', 'An organism that is hunted and eaten'],
          ['Mutualism', 'Two organisms both benefit from helping each other'],
          ['Parasitism', 'One organism benefits while the other is harmed']
        ], 'These are some of the ways organisms in an ecosystem are connected.'),
        Sci.gen(rng => match(rng, 'Match each relationship to an example.',
          REL_NAMES.map((nm, k) => [nm, rng.pick(RELATIONS.filter(r => r[1] === k))[0]]),
          'Predator and prey: one hunts and eats the other. Mutualism: both benefit. Parasitism: one benefits and the other is harmed.'))]
      },

      // 4 · What decomposers do.
      {
        name: 'Decomposers', learn: 'decomposers',
        items: [
          rng => C(rng, {
            prompt: 'What do decomposers do in an ecosystem?',
            right: 'Break down dead organisms and waste, releasing nutrients back into the ecosystem',
            wrong: ['Make glucose by photosynthesis', 'Hunt and eat live animals', 'Pollinate flowers'],
            explain: 'Decomposers return nutrients from dead material so producers can use them again.'
          }),
          rng => C(rng, {
            prompt: 'What would most likely happen in a forest with no decomposers?',
            right: 'Dead leaves and logs would pile up, and nutrients would not return to the soil.',
            wrong: ['Plants would grow faster.', 'There would be more sunlight.', 'Nothing would change.'],
            explain: 'Without decomposers, matter is not cycled back into the soil for producers to use.'
          }),
          Sci.gen(rng => C(rng, {
            prompt: 'Which of these is <strong>a decomposer</strong>?',
            ...oneOf(rng, ROLES, 2), wide: false,
            explain: 'It is a decomposer: it breaks down dead material and waste.'
          }))
        ]
      },

      // 5 · Producers.
      {
        name: 'Producers', learn: 'roles',
        items: [
          rng => C(rng, {
            prompt: 'How do producers make glucose?',
            right: 'By photosynthesis', wrong: ['By eating consumers', 'By breaking down dead organisms', 'By absorbing it from the soil'],
            explain: 'A producer makes glucose, a carbohydrate, through photosynthesis.'
          }),
          rng => TF(rng, { statement: 'A consumer gets its energy and nutrients by feeding on producers or other consumers.', answer: true,
            explain: 'Consumers cannot make their own food, so they feed on other organisms.' }),
          Sci.gen(rng => C(rng, {
            prompt: 'Which of these is <strong>a producer</strong>?',
            ...oneOf(rng, ROLES, 0), wide: false,
            explain: 'It is a producer: it makes its own food by photosynthesis.'
          }))
        ]
      },

      // 6 · Energy and matter.
      {
        name: 'Energy and matter', learn: 'cycle',
        items: [
          rng => C(rng, {
            prompt: 'Grass → rabbit → stoat. What does each arrow show?',
            right: 'The direction energy is transferred, from the food to the organism that eats it',
            wrong: ['Which animal is biggest', 'The direction each animal walks', 'Which organism eats the one before it in the wrong order'],
            explain: 'Arrows in a food chain point from the food to the eater: the direction energy moves.'
          }),
          rng => C(rng, {
            prompt: 'Which statement about an ecosystem is correct?',
            right: 'Matter is cycled, while energy is transferred through the system.',
            wrong: ['Energy is recycled forever, but matter is used up.', 'Neither energy nor matter moves.', 'Only animals take part.'],
            explain: 'Nutrients go round again and again through decomposers and producers; energy flows through and does not cycle.'
          })
        ]
      },

      // 7 · Quadrat estimate.
      {
        name: 'Estimating with quadrats', learn: 'quadrat',
        items: [Sci.gen(rng => {
          const avg = rng.int(2, 9);
          const n = 5;
          let counts = Array.from({ length: n }, () => avg);
          for (let k = 0; k < 4; k++) {           // spread the counts but keep the total
            const i = rng.int(0, n - 1), j = rng.int(0, n - 1);
            const shift = rng.int(1, 2);
            if (i !== j && counts[j] - shift >= 0) { counts[i] += shift; counts[j] -= shift; }
          }
          const L = rng.pick([10, 20, 25, 40]), W = rng.pick([10, 20, 50]);
          const area = L * W;
          const plant = rng.pick(['daisies', 'clover plants', 'dandelions']);
          return {
            prompt: `A field is ${L} m by ${W} m. Five 1 m² quadrats are placed at random, and the ${plant} in each are counted:` +
                    Sci.table(['Quadrat', '1', '2', '3', '4', '5'], [['Count', ...counts]]) +
                    `Estimate the number of ${plant} in the whole field.`,
            input: { kind: 'number', answer: avg * area, width: 90 },
            explain: `Average per m²: ${m(`(${counts.join(' + ')}) \\div 5 = ${avg}`)}. Area: ${m(`${L} \\times ${W} = ${area}`)} m². ` +
                     `Estimate: ${m(`${avg} \\times ${area} = ${avg * area}`)}.`
          };
        })]
      },

      // 8 · Soils.
      {
        name: 'Soils and nutrients', learn: 'soil',
        items: [
          rng => C(rng, {
            prompt: 'How does soil support nutrient cycling in an ecosystem?',
            right: 'Decomposers in the soil break down dead material, releasing nutrients that plants take up again.',
            wrong: ['Soil makes new nutrients out of nothing.', 'Soil stops nutrients from moving.', 'Only rocks in the soil matter.'],
            explain: 'Soil is made of decaying organic matter, living organisms, rock particles, air and water, and supports nutrient cycling.'
          }),
          rng => C(rng, {
            prompt: 'Which is <strong>not</strong> part of a healthy soil?',
            right: 'Plastic bags', wrong: ['Decaying organic matter', 'Fungi and bacteria', 'Rock particles'],
            explain: 'Soil contains decaying organic matter, living organisms, rock particles, air and water.'
          })
        ]
      },

      // 9 · Patterns in recorded data.
      {
        name: 'Patterns in data', learn: 'patterns',
        items: [
          rng => C(rng, {
            prompt: 'Students count invertebrates in leaf litter under trees and on bare, exposed ground nearby. They find many more in the leaf litter. Which is the best explanation?',
            right: 'Leaf litter gives shelter, moisture and food, so more invertebrates can live there.',
            wrong: ['Invertebrates dislike trees.', 'The students counted the bare ground too quickly to find any.', 'Exposed ground has more food.'],
            explain: 'Abiotic and biotic conditions, such as moisture, shelter and food, affect where organisms are found.'
          }),
          rng => C(rng, {
            prompt: 'On a sand dune, students record that marram grass and sandhoppers are found in different zones. What should they also measure to explain the pattern?',
            right: 'Abiotic conditions such as temperature, moisture and how far from the sea each zone is',
            wrong: ['The colour of their clipboards', 'How many students are in the group', 'The time the bus arrived'],
            explain: 'Measuring abiotic conditions along a transect helps explain why organisms are found where they are.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'relations',
        items: [
          rng => TF(rng, { statement: 'In parasitism, both organisms benefit.', answer: false,
            explain: 'In parasitism one organism benefits and the other is harmed. When both benefit, it is mutualism.' }),
          rng => TF(rng, { statement: 'Organisms in an ecosystem are interdependent.', answer: true,
            explain: 'They depend on each other for food, pollination, shelter and the cycling of nutrients.' }),
          rng => TF(rng, { learn: 'decomposers', statement: 'Decomposers release nutrients back into the ecosystem.', answer: true,
            explain: 'That is their role: breaking down dead material and waste.' }),
          rng => TF(rng, { learn: 'quadrat', statement: 'A quadrat is used to sample a small area so a larger area can be estimated.', answer: true,
            explain: 'Counting in several quadrats and averaging gives an estimate for the whole area.' }),
          rng => TF(rng, { statement: "Producers make glucose by photosynthesis.", answer: true, learn: 'roles',
            explain: "That is how producers get their energy." }),
          rng => TF(rng, { statement: "A rabbit is a producer.", answer: false, learn: 'roles',
            explain: "A rabbit eats plants, so it is a consumer." }),
          rng => TF(rng, { statement: "Fungi growing on a fallen log are decomposers.", answer: true, learn: 'roles',
            explain: "They break down dead material." }),
          rng => TF(rng, { statement: "Energy is recycled round and round an ecosystem.", answer: false, learn: 'cycle',
            explain: "Matter cycles; energy is transferred through the ecosystem." }),
          rng => TF(rng, { statement: "Matter is cycled in an ecosystem.", answer: true, learn: 'cycle',
            explain: "Nutrients pass from producers to consumers to decomposers and back to the soil." }),
          rng => TF(rng, { statement: "Bees and flowers are an example of mutualism.", answer: true, learn: 'relations',
            explain: "Bees get nectar and the flowers get pollinated: both benefit." }),
          rng => TF(rng, { statement: "Fleas feeding on a dog’s blood is an example of mutualism.", answer: false, learn: 'relations',
            explain: "The fleas benefit and the dog is harmed: parasitism." }),
          rng => TF(rng, { statement: "Without decomposers, nutrients would not return to the soil.", answer: true, learn: 'decomposers',
            explain: "Dead material would pile up instead." }),
          rng => TF(rng, { statement: "Soil contains living organisms.", answer: true, learn: 'soil',
            explain: "Fungi, bacteria and earthworms live in soil." }),
          rng => TF(rng, { statement: "To estimate a population with quadrats, multiply the average count per m² by the area.", answer: true, learn: 'quadrat',
            explain: "An average of 5 per m² in a 1000 m² field gives about 5000." }),
          rng => TF(rng, { statement: "Quadrats should be placed only where the most plants are growing.", answer: false, learn: 'quadrat',
            explain: "They are placed at random, so the sample is fair." }),
          rng => TF(rng, { statement: "Abiotic conditions can affect where organisms are found.", answer: true, learn: 'patterns',
            explain: "Light, temperature and moisture all affect where organisms live." })
        ]
      }
    ]
  });

})();
