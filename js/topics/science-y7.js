'use strict';
// ── Revision · Year 7 science ───────────────────────────────────────────────
// Phase 3 (Years 7–8) of the Science Years 0–10 learning area, August 2026.
// Each exercise follows one Year 7 knowledge heading, and draws its practice
// questions from the matching Year 7 practices column.
//
// Content is deliberately kept to what the knowledge statements say. Where
// the curriculum stops short of a formula or a term, so do the questions.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const m = Fmt.tex;
  const C = Sci.choice, TF = Sci.tf;

  // ═══ 7.1 Particles and states of matter ═══════════════════════════════════
  // Knowledge: Particle model and states of matter (p. 19).
  // Practices: test how thermal energy affects changes of state; use particle
  // models to explain; everyday problems caused by changes of state.

  const STATE_TEXT = {
    solid:  'Particles held close together in a fixed arrangement, vibrating in place',
    liquid: 'Particles close together but able to slide past each other',
    gas:    'Particles far apart, moving quickly in all directions'
  };
  const STATE_PROPS = {
    solid:  'Keeps its own shape',
    liquid: 'Takes the shape of its container, but keeps its volume',
    gas:    'Spreads out to fill the whole container'
  };

  const CH = SciDia.CHANGES;    // melting, freezing, evaporation, condensation, sublimation, deposition

  // Everyday changes of state, each with the change it shows.
  const EVERYDAY = [
    { text: 'An ice block left on the bench turns into a puddle.', change: 'melting' },
    { text: 'Butter softens and runs in a warm frying pan.', change: 'melting' },
    { text: 'Water in an ice-cube tray turns solid in the freezer.', change: 'freezing' },
    { text: 'Melted candle wax drips down and goes hard.', change: 'freezing' },
    { text: 'A puddle on the footpath dries up on a sunny day.', change: 'evaporation' },
    { text: 'Wet washing on the line dries in the wind.', change: 'evaporation' },
    { text: 'Drops of water form on the outside of a cold drink bottle.', change: 'condensation' },
    { text: 'The bathroom mirror fogs up during a hot shower.', change: 'condensation' },
    { text: 'Dry ice (solid carbon dioxide) turns straight into a gas without melting.', change: 'sublimation' },
    { text: 'A solid air-freshener block slowly gets smaller without ever going runny.', change: 'sublimation' },
    { text: 'Frost forms on a car windscreen on a clear, freezing night.', change: 'deposition' }
  ];

  const ADDED = ['melting', 'evaporation', 'sublimation'];

  Sci.topic({
    id: 's7e1', unit: 'y7',
    title: 'Particles and States of Matter',
    blurb: 'Everything is made of particles. How they are arranged, spaced and moving makes a solid, a liquid or a gas.',
    hint: 'Think about the particles: how close together they are, how they are arranged, and how they move. ' +
          'Adding thermal energy makes particles move faster; removing it slows them down. ' +
          'The particles themselves never change size or type, and the mass stays the same.',

    learn: [
      {
        id: 'states', title: 'Solid, liquid and gas', wide: true,
        diagram: { w: 360, h: 128 },
        draw(d) {
          const rng = new RNG(11);
          const gap = 16, margin = 4, bw = (d.w - 2 * margin - 2 * gap) / 3;
          ['solid', 'liquid', 'gas'].forEach((s, i) => {
            const box = { x: margin + i * (bw + gap), y: 4, w: bw, h: 100 };
            SciDia.particles(d, s, rng, { box, r: 6, cols: 5, rows: 3, count: s === 'liquid' ? 15 : 7, minGap: 26 });
            d.text([box.x + bw / 2, 118], s[0].toUpperCase() + s.slice(1), { size: 12 });
          });
        },
        text: '<p>Everything is made of <strong>particles</strong>, far too small to see.</p>' +
              '<ul><li><strong>Solid:</strong> close together in a fixed arrangement, vibrating in place. Keeps its shape.</li>' +
              '<li><strong>Liquid:</strong> close together, but sliding past each other. Flows and takes the shape of its container.</li>' +
              '<li><strong>Gas:</strong> far apart, moving fast in all directions, with weak attractions. Fills its container. The gaps between the particles are empty.</li></ul>'
      },
      {
        id: 'same', title: 'The particles never change',
        text: '<p>In every state, the particles are the <strong>same size</strong> and the <strong>same type</strong>.</p>' +
              '<p>Only their <strong>arrangement</strong>, <strong>spacing</strong> and <strong>movement</strong> change. Even in a solid they are moving: vibrating on the spot.</p>'
      },
      {
        id: 'changes', title: 'Six changes of state',
        diagram: { w: 300, h: 210 },
        draw(d) { SciDia.stateCycle(d, CH); },
        text: '<p>Solid ↔ liquid: <strong>melting</strong>, <strong>freezing</strong>. Liquid ↔ gas: <strong>evaporation</strong>, <strong>condensation</strong>. ' +
              'Solid ↔ gas, skipping the liquid: <strong>sublimation</strong>, <strong>deposition</strong>.</p>'
      },
      {
        id: 'energy', title: 'Adding or removing thermal energy',
        text: '<p><strong>Add</strong> thermal energy and the particles move faster, until they overcome some of the attractions: melting, evaporation, sublimation.</p>' +
              '<p><strong>Remove</strong> it and they slow down, and the attractions pull them together: freezing, condensation, deposition.</p>'
      },
      {
        id: 'everyday', title: 'Changes of state around you',
        text: Sci.table(['What you see', 'Change'], [
          ['A puddle dries up', 'evaporation'], ['A mirror fogs in the shower', 'condensation'],
          ['An ice block turns to a puddle', 'melting'], ['Candle wax drips and goes hard', 'freezing'],
          ['Frost on a windscreen', 'deposition'], ['Dry ice turns straight to gas', 'sublimation']])
      },
      {
        id: 'mass', title: 'Mass stays the same',
        text: '<p>100 g of ice melts into <strong>100 g</strong> of water. Nothing is added or taken away; the same particles are just rearranged.</p>' +
              '<p>Evaporated water still exists, spread through the air as water vapour.</p>'
      },
      {
        id: 'expand', title: 'Expanding when heated',
        text: '<p>Heated particles move more and push a little further apart, so the material gets slightly bigger. The particles themselves do not grow.</p>' +
              '<p>That is why long bridges have small gaps called expansion joints.</p>'
      },
      {
        id: 'water', title: 'Water is unusual',
        text: '<p>Most substances are denser as a solid. Water is the exception: freezing locks its particles into an arrangement with gaps, which takes up <strong>more</strong> space.</p>' +
              '<p>So ice floats, and a full glass bottle can crack in the freezer.</p>'
      },
      {
        id: 'fair', title: 'A fair test',
        text: '<ul><li><strong>Independent variable:</strong> the one thing you change on purpose.</li>' +
              '<li><strong>Dependent variable:</strong> what you measure.</li>' +
              '<li><strong>Controlled variables:</strong> everything else, kept the same.</li></ul>'
      }
    ],

    examples: [
      {
        title: 'Example 1: the same particles, three arrangements',
        diagram: { w: 360, h: 128, caption: 'Solid, liquid and gas. The particles are the same size in all three.' },
        draw(d) {
          const rng = new RNG(11);
          // Three boxes sized from the frame, so they always fit across it.
          const gap = 16, margin = 4;
          const bw = (d.w - 2 * margin - 2 * gap) / 3;
          const states = ['solid', 'liquid', 'gas'];
          states.forEach((s, i) => {
            const box = { x: margin + i * (bw + gap), y: 4, w: bw, h: 100 };
            SciDia.particles(d, s, rng, { box, r: 6, cols: 5, rows: 3, count: s === 'liquid' ? 15 : 7, minGap: 26 });
            d.text([box.x + bw / 2, 118], s[0].toUpperCase() + s.slice(1), { size: 12 });
          });
        },
        steps: [
          '<strong>Solid:</strong> particles held close together by attractive forces, in a fixed arrangement. They vibrate but stay in place, so a solid keeps its shape.',
          '<strong>Liquid:</strong> still close together and attracting each other, but able to slide past one another, so a liquid flows and takes the shape of its container.',
          '<strong>Gas:</strong> particles far apart with only weak attractions, moving quickly in all directions, so a gas spreads out to fill its container.'
        ],
        result: 'Only the arrangement, spacing and movement change. The particles themselves do not.'
      },
      {
        title: 'Example 2: changes of state',
        diagram: { w: 330, h: 230, caption: 'The six changes of state' },
        draw(d) { SciDia.stateCycle(d, CH); },
        steps: [
          'Adding thermal energy makes particles move faster, until they can overcome some of the attractive forces: <strong>melting</strong>, <strong>evaporation</strong>, <strong>sublimation</strong>.',
          'Removing thermal energy slows the particles down, so the attractive forces pull them together again: <strong>freezing</strong>, <strong>condensation</strong>, <strong>deposition</strong>.',
          'Sublimation goes straight from solid to gas, and deposition straight from gas to solid.',
          'Mass is conserved: 100 g of ice melts into 100 g of water.'
        ]
      }
    ],

    slots: [
      // 1 · Read the state off a particle diagram.
      {
        name: 'Which state is shown?', learn: 'states',
        items: ['solid', 'liquid', 'gas'].map(state => rng => {
          const pr = new RNG(rng.int(1, 1e9));
          // Always offered in the natural order: solid, liquid, gas.
          const order = ['solid', 'liquid', 'gas'];
          return {
            prompt: 'This diagram shows the particles in a substance. Which state is it in?',
            diagram: { w: 190, h: 140 },
            draw: d => SciDia.particles(d, state, pr, { count: state === 'liquid' ? 24 : 9 }),
            input: {
              kind: 'choice',
              options: order.map(o => ({ html: o[0].toUpperCase() + o.slice(1), right: o === state })),
              correct: order.indexOf(state)
            },
            explain: `The diagram shows: ${STATE_TEXT[state].toLowerCase()}.`
          };
        })
      },

      // 2 · Match each state to its particle picture or property.
      {
        name: 'Match the state to its description', learn: 'states',
        // Each row shows either how the particles behave or how the state
        // behaves, chosen afresh each time, so the three rows rarely repeat.
        items: [Sci.gen(rng => {
          const left = ['Solid', 'Liquid', 'Gas'];
          const order = rng.shuffle([0, 1, 2]);
          const keys = ['solid', 'liquid', 'gas'];
          const desc = Object.fromEntries(keys.map(k => [k, (rng.chance() ? STATE_TEXT : STATE_PROPS)[k]]));
          return {
            prompt: 'Match each state to its description.',
            input: {
              kind: 'match', left,
              right: order.map(i => desc[keys[i]]),
              tags: ['A', 'B', 'C'],
              answer: [0, 1, 2].map(i => order.indexOf(i))
            },
            explain: 'Solid: fixed and vibrating, so it keeps its shape. Liquid: close but sliding, so it flows. Gas: far apart and fast, so it fills its container.'
          };
        })]
      },

      // 3 · Label the six changes of state.
      {
        name: 'Label the changes of state', learn: 'changes',
        items: [rng => {
          const perm = rng.shuffle([0, 1, 2, 3, 4, 5]);
          const labels = CH.map((_, c) => String(perm.indexOf(c) + 1));
          return Sci.label(rng, {
            prompt: 'Name each change of state, 1 to 6.',
            diagram: { w: 310, h: 220 },
            draw: d => SciDia.stateCycle(d, labels),
            markers: perm.map(c => CH[c]),
            options: CH,
            explain: 'Solid to liquid is melting and back is freezing; liquid to gas is evaporation and back is condensation; ' +
                     'solid straight to gas is sublimation and back is deposition.'
          });
        }]
      },

      // 4 · Name the change in an everyday situation.
      {
        name: 'Name the everyday change', learn: 'everyday',
        items: EVERYDAY.map(ev => rng => C(rng, {
          prompt: ev.text + ' Which change of state is this?',
          right: ev.change,
          wrong: rng.sample(CH.filter(c => c !== ev.change), 3),
          wide: false,
          explain: {
            melting: 'Solid to liquid: thermal energy is added and the particles break free of their fixed arrangement.',
            freezing: 'Liquid to solid: thermal energy is removed and the particles settle into a fixed arrangement.',
            evaporation: 'Liquid to gas: the fastest particles escape from the surface into the air as water vapour.',
            condensation: 'Gas to liquid: water vapour in the air loses thermal energy on the cold surface and becomes liquid.',
            sublimation: 'Solid straight to gas, with no liquid in between.',
            deposition: 'Gas straight to solid: water vapour in the air turns directly into ice crystals.'
          }[ev.change]
        }))
      },

      // 5 · Is thermal energy added or removed?
      {
        name: 'Thermal energy added or removed?', learn: 'energy',
        items: [rng => Sci.sort(rng, {
          prompt: 'For each change, is thermal energy added or removed?',
          bins: ['Added', 'Removed'],
          items: [
            ...CH.map(c => ({ text: c[0].toUpperCase() + c.slice(1), bin: ADDED.includes(c) ? 0 : 1 })),
            ...EVERYDAY.map(ev => ({ text: ev.text.replace(/\.$/, ''), bin: ADDED.includes(ev.change) ? 0 : 1 }))
          ],
          pick: 6,
          explain: 'Melting, evaporation and sublimation need thermal energy added. Freezing, condensation and deposition happen when it is removed.'
        })]
      },

      // 6 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'same',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student explains why a metal rod gets longer when heated.',
            lines: [
              'A metal rod gets slightly longer when it is heated.',
              'Heating gives the rod’s particles more thermal energy.',
              'Each particle gets bigger, so the rod gets longer.',
              'When the rod cools, the particles shrink back to their normal size.'
            ],
            wrong: 2,
            explain: 'The particles stay exactly the same size. They move faster and push slightly further apart, so the rod as a whole gets longer.'
          }),
          rng => {
            const g = rng.pick([150, 200, 250, 300, 350]);
            return Sci.spot(rng, { learn: 'mass',
              prompt: `A student predicts what happens when ${g} g of ice melts in a sealed container.`,
              lines: [
                `${g} g of ice is sealed in a container and left to melt.`,
                'The ice changes from a solid to a liquid.',
                'Liquid water is lighter than ice, so some of the mass is lost.',
                `The water will have a mass of less than ${g} g.`
              ],
              wrong: 2,
              explain: `Mass is conserved during a change of state. The same particles are there, just arranged differently, so the water has a mass of ${g} g.`
            });
          },
          rng => Sci.spot(rng, { learn: 'states',
            prompt: 'A student describes the particles in a solid.',
            lines: [
              'In a solid, the particles are held close together.',
              'Attractive forces hold them in a fixed arrangement.',
              'So the particles in a solid cannot move at all.',
              'This is why a solid keeps its shape.'
            ],
            wrong: 2,
            explain: 'The particles in a solid are always moving: they vibrate on the spot. The attractive forces stop them leaving their places, not from moving.'
          }),
          rng => Sci.spot(rng, { learn: 'mass',
            prompt: 'A student explains how a puddle dries up.',
            lines: [
              'A puddle dries up on a warm, sunny day.',
              'Thermal energy makes some of the water particles move faster.',
              'The fastest ones escape from the surface into the air.',
              'Once they are in the air, those water particles no longer exist.'
            ],
            wrong: 3,
            explain: 'The particles still exist: they are spread out in the air as water vapour, a gas. Nothing is destroyed in a change of state.'
          }),
          rng => Sci.spot(rng, { learn: 'states',
            prompt: 'A student describes the particles in a gas.',
            lines: [
              'In a gas, the particles are far apart.',
              'They move quickly in all directions.',
              'The spaces between the particles are filled with air.',
              'This is why a gas can be squashed into a smaller space.'
            ],
            wrong: 2,
            explain: 'The spaces between gas particles are empty. Air is itself a gas, made of particles, so it cannot be what fills the gaps.'
          })
        ]
      },

      // 7 · True or false.
      {
        name: 'True or false', learn: 'states',
        items: [
          rng => TF(rng, { learn: 'water', statement: 'Ice floats on water because solid water is less dense than liquid water.', answer: true,
            explain: 'When water freezes, its particles form a fixed arrangement with gaps, which takes up more space, so ice is less dense.' }),
          rng => TF(rng, { learn: 'water', statement: 'Most materials are denser as a solid than as a liquid.', answer: true,
            explain: 'For most substances, such as wax and iron, the particles pack more closely as a solid. Water is the unusual exception.' }),
          rng => TF(rng, { learn: 'same', statement: 'When water freezes, its particles get bigger.', answer: false,
            explain: 'The particles stay the same size. They lock into an arrangement with gaps between them, which is why ice takes up more space.' }),
          rng => TF(rng, { statement: 'The particles in a liquid are far apart, like the particles in a gas.', answer: false,
            explain: 'Liquid particles are close together, held by attractive forces. Only in a gas are they far apart.' }),
          rng => TF(rng, { statement: 'The particles in a gas have only weak attractions between them.', answer: true,
            explain: 'The attractions are weak and the particles are far apart, which is why a gas spreads out to fill its container.' }),
          rng => TF(rng, { learn: 'energy', statement: 'Heating a substance makes its particles move faster.', answer: true,
            explain: 'Adding thermal energy speeds the particles up, until they can overcome the attractive forces holding them together.' }),
          rng => TF(rng, { learn: 'same', statement: 'During a change of state, the particles turn into a different type of particle.', answer: false,
            explain: 'A change of state alters how the particles are arranged and how far apart they are, but not their size, shape or type.' }),
          rng => TF(rng, { learn: 'changes', statement: 'Water vapour can turn straight into ice without becoming a liquid first.', answer: true,
            explain: 'That is deposition, gas straight to solid, which is how frost forms.' }),
          rng => TF(rng, { statement: 'Everything around us is made of particles too small to see, even with an ordinary microscope.', answer: true,
            explain: 'All matter is made of sub-microscopic particles.' }),
          rng => TF(rng, { statement: "Particles in a liquid can slide past each other.", answer: true, learn: 'states',
            explain: "That is why a liquid flows and takes the shape of its container." }),
          rng => TF(rng, { statement: "A gas keeps its own shape.", answer: false, learn: 'states',
            explain: "A gas spreads out to fill its whole container, because its particles are far apart and moving fast." }),
          rng => TF(rng, { statement: "Evaporation is a change from liquid to gas.", answer: true, learn: 'changes',
            explain: "Liquid to gas is evaporation; gas back to liquid is condensation." }),
          rng => TF(rng, { statement: "Condensation needs thermal energy to be added.", answer: false, learn: 'energy',
            explain: "Condensation happens when thermal energy is removed, so the particles slow down and come together." }),
          rng => TF(rng, { statement: "When a solid melts, its particles become softer.", answer: false, learn: 'same',
            explain: "The particles do not change at all. They break free of their fixed arrangement and slide past each other." }),
          rng => TF(rng, { statement: "Frost forming straight from water vapour is an example of sublimation.", answer: false, learn: 'changes',
            explain: "Gas straight to solid is deposition. Sublimation is the other way: solid straight to gas." }),
          rng => TF(rng, { statement: "When a puddle evaporates, its water is spread through the air as water vapour.", answer: true, learn: 'mass',
            explain: "Nothing is destroyed. The water particles are still there, as a gas." }),
          rng => TF(rng, { statement: "A tight metal lid on a glass jar can be loosened by warming it, because the metal expands.", answer: true, learn: 'expand',
            explain: "Warming makes the metal’s particles move more and push slightly further apart, so the lid gets a little bigger." })
        ]
      },

      // 8 · Mass is conserved.
      {
        name: 'Mass during a change of state', learn: 'mass',
        items: [
          Sci.gen((rng, diff) => {
            const g = rng.int(6, 48) * 5;
            const what = rng.pick([
              { start: 'ice', end: 'water', change: 'melts' },
              { start: 'candle wax', end: 'liquid wax', change: 'melts' },
              { start: 'water', end: 'ice', change: 'freezes' },
              { start: 'chocolate', end: 'melted chocolate', change: 'melts' }
            ]);
            return {
              prompt: `${Sci.name(rng)} seals ${g} g of ${what.start} in a container. It ${what.change} completely. ` +
                      `What is the mass of the ${what.end}?`,
              input: { kind: 'number', answer: g, suffix: 'g', width: 84 },
              explain: `Mass is conserved during a change of state: the same particles are still there, so it is still ${g} g.`
            };
          }),
          Sci.gen(rng => {
            const beaker = rng.int(20, 40) * 5, ice = rng.int(8, 40) * 5;
            const total = beaker + ice;
            return {
              prompt: `A sealed container of ice sits on a balance, which reads ${total} g. ` +
                      'The ice melts completely. What does the balance read now?',
              input: { kind: 'number', answer: total, suffix: 'g', width: 84 },
              explain: `Nothing has been added or taken away, only rearranged, so the reading stays at ${total} g.`
            };
          })
        ]
      },

      // 9 · Explain the everyday problem.
      {
        name: 'Explain the everyday problem', learn: 'water',
        items: [
          rng => C(rng, {
            prompt: 'A glass bottle filled to the top with water cracks in the freezer. Which is the best explanation?',
            right: 'Water expands as it freezes, because its particles lock into a fixed arrangement with gaps that takes up more space.',
            wrong: [
              'The cold makes the glass shrink and squeeze the water until the bottle cracks.',
              'Freezing adds more particles to the water, so there is more of it.',
              'The ice particles are bigger than water particles, so they need more room.'
            ],
            explain: 'Unlike most substances, water takes up more space as a solid, so a full bottle has nowhere for the extra volume to go.'
          }),
          rng => C(rng, { learn: 'everyday',
            prompt: 'On a cold morning, the inside of a car’s windows is covered in tiny drops of water. Which is the best explanation?',
            right: 'Water vapour in the air inside the car loses thermal energy on the cold glass and condenses into liquid.',
            wrong: [
              'Rain has soaked through tiny holes in the glass overnight.',
              'The glass is so cold that it has started to melt.',
              'The cold glass turns air particles into water particles.'
            ],
            explain: 'This is condensation. The water was already in the air as a gas; the cold glass takes thermal energy from it.'
          }),
          rng => C(rng, { learn: 'energy',
            prompt: 'Why can a wet road become icy on a clear, cold night?',
            right: 'The water on the road loses thermal energy to the cold air until its particles settle into a fixed arrangement: it freezes.',
            wrong: [
              'The road gives thermal energy to the water, and that turns it solid.',
              'The water particles shrink in the cold and stick to the road.',
              'The water evaporates and leaves ice behind.'
            ],
            explain: 'Freezing happens when thermal energy is removed, not added.'
          }),
          rng => C(rng, { learn: 'expand',
            prompt: 'Long bridges have small gaps in them called expansion joints. What are they for?',
            right: 'In hot weather the bridge’s materials expand, and the gaps give them room to get longer without cracking.',
            wrong: [
              'The gaps let the bridge cool down faster in summer.',
              'In hot weather the particles in the bridge get bigger and need somewhere to go.',
              'The gaps make the bridge lighter so that it does not sink.'
            ],
            explain: 'Materials expand when their thermal energy increases, because their particles move more and push further apart. The particles do not grow.'
          })
        ]
      },

      // 10 · Plan a fair test.
      {
        name: 'Variables in an investigation', learn: 'fair',
        items: (() => {
          const scenarios = [
            {
              setup: '{n} puts identical ice cubes into cups of water at different temperatures, and times how long each one takes to melt.',
              iv: 'The temperature of the water', dv: 'The time taken for the ice to melt',
              cv: ['The size of the ice cubes', 'The volume of water in each cup']
            },
            {
              setup: '{n} heats identical cans of ice using different numbers of tea-light candles, and times how long the ice takes to melt.',
              iv: 'The number of candles', dv: 'The time taken for the ice to melt',
              cv: ['The mass of ice in each can', 'The type of can']
            },
            {
              setup: '{n} leaves the same volume of water in identical dishes in three places, and measures how much water is left after a day.',
              iv: 'Where the dish is left', dv: 'How much water is left after a day',
              cv: ['The volume of water at the start', 'The size and shape of the dishes']
            },
            {
              setup: '{n} puts identical squares of chocolate on plates in places of different temperature, and times how long each takes to melt.',
              iv: 'The temperature of the place', dv: 'The time taken for the chocolate to melt',
              cv: ['The size of the chocolate squares', 'The type of chocolate']
            }
          ];
          const out = [];
          for (const sc of scenarios) {
            out.push(rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' What is the <strong>independent</strong> variable (the one that is changed on purpose)?',
              right: sc.iv, wrong: [sc.dv, ...sc.cv],
              explain: `The independent variable is the one factor changed on purpose: ${sc.iv.toLowerCase()}.`
            }));
            out.push(rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' What is the <strong>dependent</strong> variable (the one that is measured)?',
              right: sc.dv, wrong: [sc.iv, ...sc.cv],
              explain: `The dependent variable is what gets measured to see the effect: ${sc.dv.toLowerCase()}.`
            }));
            out.push(rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' Which of these must be kept the same to make it a fair test?',
              right: rng.pick(sc.cv), wrong: [sc.iv, sc.dv, 'Nothing, as long as you are careful'],
              explain: 'Controlled variables are kept the same, so that only the independent variable can be causing any difference.'
            }));
          }
          return out;
        })()
      }
    ]
  });


  // ═══ 7.3 Speed ════════════════════════════════════════════════════════════
  // Knowledge: Speed (pp. 19–20). Speed = distance ÷ time, in m/s or km/h;
  // constant or changing; comparing measured speeds; kinetic energy is
  // associated with motion.
  // Practices: measuring distance and time; calculating speed; accuracy and
  // reliability of measurements (repeats and averages, clock or stopwatch);
  // representing motion using graphs.

  /** Moving things at believable speeds, in m/s. */
  const MOVERS = [
    { who: n => `${n} walks`, lo: 1.0, hi: 1.8, step: 0.1, t: [40, 300] },
    { who: n => `${n} runs`, lo: 3.0, hi: 6.0, step: 0.5, t: [10, 80] },
    { who: n => `${n} cycles`, lo: 4.0, hi: 8.0, step: 0.5, t: [20, 120] },
    { who: () => 'A remote-control car drives', lo: 0.5, hi: 3.0, step: 0.5, t: [4, 30] },
    { who: n => `${n} skateboards`, lo: 2.0, hi: 5.0, step: 0.5, t: [8, 60] }
  ];

  /** Pick a value in [lo, hi] on a step, rounded so it prints cleanly. */
  const stepped = (rng, lo, hi, step) => +(lo + step * rng.int(0, Math.round((hi - lo) / step))).toFixed(2);

  const VEHICLES = [
    { what: 'A bus', lo: 30, hi: 60 }, { what: 'A car', lo: 50, hi: 100 },
    { what: 'A train', lo: 60, hi: 120 }, { what: 'A ferry', lo: 20, hi: 40 },
    { what: 'A truck', lo: 40, hi: 90 }
  ];

  Sci.topic({
    id: 's7e3', unit: 'y7',
    title: 'Speed',
    blurb: 'How fast something moves: the distance it travels in each unit of time.',
    hint: 'Speed is the distance travelled in each second (or each hour). Divide the distance by the time: ' +
          'speed = distance ÷ time. On a distance–time graph, a steeper line means faster, and a flat line means not moving.',

    learn: [
      {
        id: 'formula', title: 'Calculating speed',
        text: '<p>Speed is the distance travelled in each unit of time:</p>' +
              '<p style="text-align:center">' + m('\\text{speed} = \\text{distance} \\div \\text{time}') + '</p>' +
              '<p>300 m in 60 s: ' + m('300 \\div 60 = 5') + ' m/s. Divide, never multiply, and always distance on top.</p>'
      },
      {
        id: 'units', title: 'Units of speed',
        text: '<p>The unit is a distance unit <strong>per</strong> time unit.</p>' +
              Sci.table(['Distance in', 'Time in', 'Speed in'], [['metres', 'seconds', 'm/s'], ['kilometres', 'hours', 'km/h']]) +
              '<p>5 m/s means <strong>5 metres every second</strong>.</p>'
      },
      {
        id: 'compare', title: 'Who is faster?',
        text: '<p>Over the <strong>same distance</strong>, the shorter time is the faster speed.</p>' +
              '<p>In the <strong>same time</strong>, the longer distance is the faster speed.</p>'
      },
      {
        id: 'graph', title: 'Distance–time graphs',
        diagram: { w: 280, h: 200 },
        draw(d) {
          SciDia.graph(d, {
            xMax: 10, yMax: 40, xStep: 2, yStep: 10, xLabel: 'Time (s)', yLabel: 'Distance (m)',
            series: [{ points: [[0, 0], [10, 40]], label: 'A' }, { points: [[0, 0], [4, 8], [6, 8], [10, 16]], label: 'B' }]
          });
        },
        text: '<ul><li><strong>Steeper</strong> line: faster. A is faster than B.</li>' +
              '<li><strong>Flat</strong> line: stopped. B stops from 4 s to 6 s.</li>' +
              '<li>Straight sloping line: <strong>steady</strong> speed.</li></ul>' +
              '<p>Read any point to find a speed: A goes 40 m in 10 s, so 4 m/s.</p>'
      },
      {
        id: 'constant', title: 'Constant or changing speed',
        text: '<p><strong>Constant:</strong> the same distance every second, such as a car on cruise control or a conveyor belt.</p>' +
              '<p><strong>Changing:</strong> starting, stopping, falling, or being thrown upwards.</p>'
      },
      {
        id: 'kinetic', title: 'Kinetic energy',
        text: '<p><strong>Kinetic energy</strong> is the energy of motion. A rolling skateboard has it; a parked car does not.</p>'
      },
      {
        id: 'reliable', title: 'Accurate and reliable timing',
        text: '<ul><li>Measure <strong>distance</strong> and <strong>time</strong>.</li>' +
              '<li>Use a <strong>stopwatch</strong> for short times, since it shows parts of a second.</li>' +
              '<li><strong>Repeat</strong> and <strong>average</strong>: add the times and divide by how many. Then use the average time.</li>' +
              '<li>If you know a result was measured wrongly, repeat it and leave it out.</li></ul>'
      }
    ],

    examples: [
      {
        title: 'Example 1: calculating a speed',
        steps: [
          'A cyclist travels 300 m in 60 s.',
          'Speed is distance divided by time: ' + m('\\text{speed} = \\dfrac{\\text{distance}}{\\text{time}} = \\dfrac{300}{60}') + '.',
          m('300 \\div 60 = 5') + '. The distance was in metres and the time in seconds, so the unit is metres per second.'
        ],
        result: 'Answer: 5 m/s, which means 5 metres every second'
      },
      {
        title: 'Example 2: reading a distance–time graph',
        diagram: { w: 300, h: 210, caption: 'A is steeper than B, so A is faster. Between 4 s and 6 s, B is not moving.' },
        draw(d) {
          SciDia.graph(d, {
            xMax: 10, yMax: 40, xStep: 2, yStep: 10, xLabel: 'Time (s)', yLabel: 'Distance (m)',
            series: [
              { points: [[0, 0], [10, 40]], label: 'A' },
              { points: [[0, 0], [4, 8], [6, 8], [10, 16]], label: 'B' }
            ]
          });
        },
        steps: [
          'A steeper line covers more distance in each second, so it means a faster speed.',
          'A flat line means the distance is not changing: the object has stopped.',
          'To find A’s speed, read any point on its line: after 10 s it has gone 40 m, and ' + m('40 \\div 10 = 4') + '.'
        ],
        result: 'A moves at 4 m/s'
      }
    ],

    slots: [
      // 1 · Calculate a speed in m/s.
      {
        name: 'Calculate speed in m/s', learn: 'formula',
        items: [Sci.gen((rng, diff) => {
          const mv = rng.pick(MOVERS);
          const v = stepped(rng, mv.lo, mv.hi, diff === 'core' ? Math.max(mv.step, 0.5) : mv.step);
          const t = rng.int(mv.t[0], mv.t[1]);
          const dist = +(v * t).toFixed(1);
          return {
            prompt: `${mv.who(Sci.name(rng))} ${Fmt.num(dist)} m in ${t} s. What is the speed?`,
            input: { kind: 'number', answer: v, tol: 0.01, decimal: true, suffix: 'm/s', width: 84 },
            explain: `${m(`\\text{speed} = ${dist} \\div ${t} = ${v}`)} m/s`
          };
        })]
      },

      // 2 · Calculate a speed in km/h.
      {
        name: 'Calculate speed in km/h', learn: 'units',
        items: [Sci.gen((rng, diff) => {
          const veh = rng.pick(VEHICLES);
          const v = rng.int(veh.lo / 5, veh.hi / 5) * 5;
          const t = diff === 'core' ? rng.int(1, 4) : rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
          const dist = v * t;
          const tWords = t === 1 ? '1 hour' : t === 0.5 ? 'half an hour' : `${Fmt.num(t)} hours`;
          return {
            prompt: `${veh.what} travels ${dist} km in ${tWords}. What is its average speed?`,
            input: { kind: 'number', answer: v, suffix: 'km/h', width: 84 },
            explain: `${m(`${dist} \\div ${t} = ${v}`)}. Kilometres divided by hours gives km/h.`
          };
        })]
      },

      // 3 · What speed means.
      {
        name: 'What speed means', learn: 'units',
        items: [
          rng => C(rng, {
            prompt: 'Which of these is a unit of speed?',
            right: rng.pick(['m/s', 'km/h']), wrong: ['m', 's', 'kg'], wide: false,
            explain: 'A unit of speed is a distance unit per time unit, such as metres per second (m/s) or kilometres per hour (km/h).'
          }),
          rng => {
            const v = rng.int(2, 9);
            return C(rng, {
              prompt: `A speed of ${v} m/s means the object…`,
              right: `travels ${v} metres every second`,
              wrong: [`takes ${v} seconds to travel each metre`, `travels ${v} metres altogether`, `has been moving for ${v} seconds`],
              explain: `Speed is distance per unit of time: ${v} m/s is ${v} metres in each second.`
            });
          },
          rng => C(rng, { learn: 'formula',
            prompt: 'Which calculation gives a speed?',
            right: m('\\text{distance} \\div \\text{time}'),
            wrong: [m('\\text{distance} \\times \\text{time}'), m('\\text{time} \\div \\text{distance}'), m('\\text{distance} + \\text{time}')],
            wide: false,
            explain: 'Speed is calculated by dividing the distance travelled by the time taken.'
          }),
          rng => C(rng, { learn: 'kinetic',
            prompt: 'Which of these has kinetic energy?',
            right: rng.pick(['A skateboard rolling down a path', 'A kicked rugby ball in flight', 'A bus driving along the road']),
            wrong: ['A book resting on a shelf', 'A parked car', 'A rock sitting on the beach'],
            explain: 'Kinetic energy is the energy associated with motion. Only the moving object has it.'
          }),
          rng => {
            const a = Sci.name(rng);
            let b = Sci.name(rng); while (b === a) b = Sci.name(rng);
            const quick = rng.int(11, 16), slow = quick + rng.int(1, 4), dist = rng.pick([60, 80, 100]);
            // Either runner can be the faster one, so the answer is not always the first name.
            const aFaster = rng.chance();
            const ta = aFaster ? quick : slow, tb = aFaster ? slow : quick;
            const winner = aFaster ? a : b;
            return {
              prompt: `${a} and ${b} both run ${dist} m. ${a} takes ${ta} s and ${b} takes ${tb} s. Who is faster?`,
              input: {
                kind: 'choice',
                options: [{ html: a, right: aFaster }, { html: b, right: !aFaster },
                          { html: 'They have the same speed', right: false }],
                correct: aFaster ? 0 : 1
              },
              explain: `Over the same distance, the shorter time means the faster speed: ${winner} took less time.`,
              learn: 'compare'
            };
          }
        ]
      },

      // 4 · Read a speed off a distance–time graph.
      {
        name: 'Speed from a graph', learn: 'graph',
        items: [Sci.gen((rng, diff) => {
          const v = diff === 'core' ? rng.int(1, 5) : rng.pick([0.5, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]);
          const T = 10;
          const what = rng.pick(['a remote-control car', 'a toy train', 'a robot vacuum', 'a cyclist']);
          return {
            prompt: `The graph shows ${what} moving at a steady speed. What is its speed?`,
            diagram: { w: 270, h: 200 },
            draw: d => SciDia.graph(d, {
              xMax: T, yMax: v * T, xStep: 2, yStep: v * 2,
              xLabel: 'Time (s)', yLabel: 'Distance (m)',
              series: [{ points: [[0, 0], [T, v * T]] }]
            }),
            input: { kind: 'number', answer: v, tol: 0.01, decimal: true, suffix: 'm/s', width: 84 },
            explain: `Read any point: after ${T} s it has travelled ${Fmt.num(v * T)} m, and ${m(`${Fmt.num(v * T)} \\div ${T} = ${v}`)} m/s.`
          };
        })]
      },

      // 5 · Compare two motions on one graph.
      {
        name: 'Faster or slower on a graph', learn: 'graph',
        items: [Sci.gen(rng => {
          let va = rng.int(1, 5), vb = rng.int(1, 5);
          while (vb === va) vb = rng.int(1, 5);
          const askFaster = rng.chance();
          const top = Math.max(va, vb) * 10;
          const winner = askFaster ? (va > vb ? 'A' : 'B') : (va < vb ? 'A' : 'B');
          return {
            prompt: `Objects A and B move at steady speeds. Which one is ${askFaster ? '<strong>faster</strong>' : '<strong>slower</strong>'}?`,
            diagram: { w: 270, h: 200 },
            draw: d => SciDia.graph(d, {
              xMax: 10, yMax: top, xStep: 2,
              xLabel: 'Time (s)', yLabel: 'Distance (m)',
              series: [{ points: [[0, 0], [10, va * 10]], label: 'A' }, { points: [[0, 0], [10, vb * 10]], label: 'B' }]
            }),
            input: {
              kind: 'choice',
              options: [{ html: 'A', right: winner === 'A' }, { html: 'B', right: winner === 'B' },
                        { html: 'They have the same speed', right: false }],
              correct: winner === 'A' ? 0 : 1
            },
            explain: `The steeper line covers more distance each second. A goes ${va * 10} m in 10 s and B goes ${vb * 10} m, so ${winner} is ${askFaster ? 'faster' : 'slower'}.`
          };
        })]
      },

      // 6 · What a section of a graph shows.
      {
        name: 'Reading a journey graph', learn: 'graph',
        items: [Sci.gen(rng => {
          const v1 = rng.int(2, 4), t1 = rng.pick([4, 6]);
          const rest = rng.pick([2, 4]);
          const v2 = rng.int(1, 4);
          const t3 = 16 - t1 - rest;
          const d1 = v1 * t1, d3 = d1 + v2 * t3;
          const pts = [[0, 0], [t1, d1], [t1 + rest, d1], [16, d3]];
          const section = rng.int(0, 2);
          const spans = [[0, t1], [t1, t1 + rest], [t1 + rest, 16]];
          const stopped = section === 1;
          const opts = [
            { html: 'Stopped: not moving', right: stopped },
            { html: 'Moving at a steady speed', right: !stopped },
            { html: 'Speeding up', right: false },
            { html: 'Moving back towards the start', right: false }
          ];
          return {
            prompt: `The graph shows a walk. What is the walker doing during the shaded part, from ${spans[section][0]} s to ${spans[section][1]} s?`,
            diagram: { w: 280, h: 205 },
            draw: d => SciDia.graph(d, {
              xMax: 16, yMax: d3, xStep: 2,
              xLabel: 'Time (s)', yLabel: 'Distance (m)',
              highlight: spans[section],
              series: [{ points: pts }]
            }),
            input: { kind: 'choice', options: opts, correct: stopped ? 0 : 1, wide: true },
            explain: stopped
              ? 'The line is flat: the distance is not changing, so the walker has stopped.'
              : 'The line is straight and sloping upwards: the distance increases by the same amount each second, which is a steady speed.'
          };
        })]
      },

      // 7 · Repeat trials and average.
      {
        name: 'Averaging repeat trials', learn: 'reliable',
        items: [Sci.gen(rng => {
          // Choose a speed and a mean time that give a clean distance, then
          // spread three trials around the mean so they average to it exactly.
          let v, t, dist;
          do {
            v = rng.pick([0.5, 0.8, 1, 1.2, 1.5, 2, 2.5]);
            t = rng.pick([2, 2.5, 4, 5, 6, 8]);
            dist = +(v * t).toFixed(2);
          } while (!Number.isInteger(dist * 2));
          const a = rng.pick([-3, -2, -1, 1, 2, 3]) / 10, b = rng.pick([-2, -1, 1, 2]) / 10;
          const trials = [t + a, t + b, t - a - b].map(x => +x.toFixed(1));
          const who = Sci.name(rng);
          return {
            prompt: `${who} times a toy car over ${Fmt.num(dist)} m, three times:` +
                    Sci.table(['Trial 1', 'Trial 2', 'Trial 3'], [trials.map(x => x.toFixed(1) + ' s')]),
            note: 'Average the three times first, then use the average to work out the speed.',
            input: {
              kind: 'fill',
              parts: [
                { text: 'Average time' }, { input: { answer: t, tol: 0.01, decimal: true, width: 70 } }, { text: 's' },
                { text: '&nbsp;&nbsp;Speed' }, { input: { answer: v, tol: 0.01, decimal: true, width: 70 } }, { text: 'm/s' }
              ]
            },
            explain: `Average: ${m(`(${trials.join(' + ')}) \\div 3 = ${t}`)} s. ` +
                     `Speed: ${m(`${Fmt.num(dist)} \\div ${t} = ${v}`)} m/s.`
          };
        })]
      },

      // 8 · Spot the mistake in a calculation.
      {
        name: 'Spot the mistake', learn: 'formula',
        items: [
          Sci.gen(rng => {
            const t = rng.int(2, 8), v = rng.int(2, 6), dist = v * t;
            return Sci.spot(rng, {
              prompt: `A toy car travels ${dist} m in ${t} s. A student works out its speed.`,
              lines: [
                m('\\text{speed} = \\text{distance} \\div \\text{time}'),
                m(`\\text{speed} = ${t} \\div ${dist}`),
                m(`\\text{speed} = ${Fmt.dp(t / dist, 2)}`),
                `So the speed is ${Fmt.dp(t / dist, 2)} m/s.`
              ],
              wrong: 1,
              explain: `Line 2 divides the time by the distance. It should be ${m(`${dist} \\div ${t} = ${v}`)} m/s.`
            });
          }),
          Sci.gen(rng => {
            const t = rng.int(20, 60), v = rng.int(2, 6), dist = v * t;
            return Sci.spot(rng, {
              prompt: `A runner covers ${dist} m in ${t} s. A student works out the speed.`,
              lines: [
                `Distance = ${dist} m and time = ${t} s.`,
                m(`\\text{speed} = ${dist} \\times ${t}`),
                m(`\\text{speed} = ${dist * t}`),
                `So the speed is ${dist * t} m/s.`
              ],
              wrong: 1,
              explain: `Line 2 multiplies. Speed is distance divided by time: ${m(`${dist} \\div ${t} = ${v}`)} m/s.`
            });
          }),
          Sci.gen(rng => {
            const h = rng.int(2, 4), v = rng.int(8, 20) * 5, dist = v * h;
            return Sci.spot(rng, { learn: 'units',
              prompt: `A car travels ${dist} km in ${h} hours. A student works out its average speed.`,
              lines: [
                m('\\text{speed} = \\text{distance} \\div \\text{time}'),
                m(`\\text{speed} = ${dist} \\div ${h}`),
                m(`\\text{speed} = ${v}`),
                `So the speed is ${v} m/s.`
              ],
              wrong: 3,
              explain: `The number is right but the unit is not. Kilometres divided by hours gives km/h, so the speed is ${v} km/h.`
            });
          })
        ]
      },

      // 9 · Constant or changing speed.
      {
        name: 'Constant or changing speed?', learn: 'constant',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each one moving at a constant speed, or is its speed changing?',
          bins: ['Constant', 'Changing'],
          items: [
            { text: 'A car on cruise control along a straight, flat motorway', bin: 0 },
            { text: 'A suitcase riding along an airport conveyor belt', bin: 0 },
            { text: 'A person standing still on a moving escalator', bin: 0 },
            { text: 'A plane in the middle of a long flight, cruising high above the clouds', bin: 0 },
            { text: 'A ball rolling across grass until it stops', bin: 1 },
            { text: 'A sprinter in the first few seconds after the starting signal', bin: 1 },
            { text: 'A car slowing down for a red light', bin: 1 },
            { text: 'An apple falling from a tree', bin: 1 },
            { text: 'A bus pulling away from a bus stop', bin: 1 },
            { text: 'A netball thrown straight up into the air', bin: 1 }
          ],
          pick: 6,
          explain: 'Speed is constant when the same distance is covered every second. Starting, stopping, falling and being thrown upwards all change the speed.'
        })]
      },

      // 10 · Accuracy and reliability.
      {
        name: 'Accurate and reliable measurements', learn: 'reliable',
        items: [
          rng => C(rng, {
            prompt: 'Why do scientists repeat a timing several times and take the average?',
            right: 'Every timing has small errors, and averaging several makes the result more reliable.',
            wrong: ['So that the experiment takes longer.', 'Because the first timing is always wrong.', 'To make the speed come out bigger.'],
            explain: 'Small errors, like reacting a little late on the stopwatch, go both ways. Averaging several trials evens them out.'
          }),
          rng => C(rng, {
            prompt: 'Which is the best way to time a 20 m sprint?',
            right: 'A stopwatch, which measures fractions of a second',
            wrong: ['A wall clock with only a second hand', 'Counting the seconds out loud', 'A kitchen timer that rings each minute'],
            explain: 'A short sprint takes only a few seconds, so the timer needs to measure parts of a second. A clock with a second hand cannot.'
          }),
          rng => {
            const base = rng.int(40, 60) / 10;
            const t1 = base, t2 = +(base + 0.1).toFixed(1), out = +(base + rng.int(18, 30) / 10).toFixed(1);
            return C(rng, {
              prompt: `In three trials a toy car took ${t1.toFixed(1)} s, ${t2.toFixed(1)} s and ${out.toFixed(1)} s. ` +
                      'The third time, the stopwatch was started late. What should happen to that result?',
              right: `Repeat that trial, and leave ${out.toFixed(1)} s out of the average`,
              wrong: ['Include it in the average anyway', `Use only ${out.toFixed(1)} s, because it is the biggest`, 'Give up on the experiment'],
              explain: 'A result you know was measured wrongly should not go into the average, or it drags the average away from the true value.'
            });
          },
          rng => C(rng, {
            prompt: 'To work out how fast someone walks, you time them. What else do you need to measure?',
            right: 'The distance they walk',
            wrong: ['Their mass', 'Their height', 'The air temperature'],
            explain: 'Speed is distance divided by time, so you need both.'
          })
        ]
      }
    ]
  });

  // ═══ 7.2 Thermal energy and insulation ════════════════════════════════════
  // Knowledge: Material properties and thermal energy (p. 19). Kinetic energy;
  // temperature as average kinetic energy of particles; thermal energy;
  // conduction, convection and radiation; conduction without the material
  // moving; thermal conductivity; insulators have low conductivity.
  // Practices: fair test of thermal conductivity for an application; choosing
  // insulating materials for food, shelter, clothing.

  const TRANSFERS = [
    { text: 'The metal handle of a pot on the stove gets hot.', way: 'conduction' },
    { text: 'A metal spoon left in a bowl of hot soup warms up all the way to its end.', way: 'conduction' },
    { text: 'Your hand warms up when you hold a hot mug.', way: 'conduction' },
    { text: 'Warm air from a heater rises and spreads around the room.', way: 'convection' },
    { text: 'Hot water rises from the bottom of a pot on the stove, and cooler water sinks to take its place.', way: 'convection' },
    { text: 'You feel the warmth of a campfire on your face from across the fire.', way: 'radiation' },
    { text: 'Thermal energy from the Sun reaches the Earth across empty space.', way: 'radiation' }
  ];
  const WAY_EXPLAIN = {
    conduction: 'Conduction: thermal energy passes through the material from particle to particle, without the material itself moving.',
    convection: 'Convection: the warm liquid or gas itself moves, carrying thermal energy with it.',
    radiation: 'Radiation: thermal energy travels as radiation, which needs no material at all and can cross empty space.'
  };

  const CONDUCTORS = [
    { text: 'Copper', bin: 0 }, { text: 'Aluminium', bin: 0 }, { text: 'Steel', bin: 0 }, { text: 'Iron', bin: 0 },
    { text: 'Wool', bin: 1 }, { text: 'Polystyrene foam', bin: 1 }, { text: 'Plastic', bin: 1 },
    { text: 'Wood', bin: 1 }, { text: 'Rubber', bin: 1 }, { text: 'Cork', bin: 1 }, { text: 'Feathers', bin: 1 }
  ];

  const INSULATION = [
    { name: 'polystyrene foam', k: 0.028 }, { name: 'wool', k: 0.035 }, { name: 'bubble wrap', k: 0.045 },
    { name: 'cotton cloth', k: 0.06 }, { name: 'aluminium foil', k: 0.08 }, { name: 'nothing (a bare cup)', k: 0.095 }
  ];

  Sci.topic({
    id: 's7e2', unit: 'y7',
    title: 'Thermal Energy and Insulation',
    blurb: 'How thermal energy moves, and how insulating materials slow it down.',
    hint: 'Temperature tells you how fast the particles are moving on average. Thermal energy moves by conduction ' +
          '(particle to particle through a material), convection (a warm liquid or gas moves) and radiation (no material needed). ' +
          'A good insulator has a low thermal conductivity, so it passes thermal energy on slowly.',

    learn: [
      {
        id: 'temp', title: 'Temperature',
        diagram: { w: 260, h: 130 },
        draw(d) { SciDia.particleSpeed(d); },
        text: '<p><strong>Temperature</strong> measures the <strong>average kinetic energy</strong> of the particles: how fast they move, on average. Hotter particles move faster; they do not get bigger.</p>'
      },
      {
        id: 'thermal', title: 'Thermal energy is not temperature',
        text: '<p><strong>Thermal energy</strong> is the energy of the motion and interactions of <strong>all</strong> the particles, so it also depends on how much substance there is.</p>' +
              '<p>A warm bath has more thermal energy than a cup of boiling water: it is cooler, but has far more particles.</p>'
      },
      {
        id: 'conduction', title: 'Conduction',
        diagram: { w: 240, h: 110 },
        draw(d) { SciDia.heatTransfer(d, 'conduction'); },
        text: '<p>Thermal energy passes <strong>through a material</strong>, particle to particle. The material itself does not move. A spoon in hot soup warms up this way.</p>'
      },
      {
        id: 'convection', title: 'Convection',
        diagram: { w: 240, h: 140 },
        draw(d) { SciDia.heatTransfer(d, 'convection'); },
        text: '<p>A warm <strong>liquid or gas moves</strong>, carrying thermal energy with it. Warm air from a heater rises and spreads round the room.</p>'
      },
      {
        id: 'radiation', title: 'Radiation',
        diagram: { w: 240, h: 130 },
        draw(d) { SciDia.heatTransfer(d, 'radiation'); },
        text: '<p>Needs <strong>no material</strong>, so it can cross empty space. This is how the Sun warms the Earth, and how you feel a campfire from across it.</p>'
      },
      {
        id: 'direction', title: 'Hot to cold',
        text: '<p>Thermal energy always moves from the <strong>warmer</strong> thing to the <strong>colder</strong> thing, until they reach the same temperature.</p>' +
              '<p>"Cold" never moves anywhere: a cold drink warms up because energy flows <em>in</em>.</p>'
      },
      {
        id: 'conductors', title: 'Conductors and insulators',
        text: Sci.table(['Good conductors', 'Insulators'], [['Copper', 'Wool'], ['Aluminium', 'Polystyrene foam'], ['Steel, iron', 'Wood, plastic, cork'], ['', 'Trapped air, feathers']]) +
              '<p>Insulators have a <strong>low thermal conductivity</strong>: energy passes through them slowly. Many work by trapping air. They make no heat of their own.</p>'
      },
      {
        id: 'choosing', title: 'The right material for the job',
        text: '<ul><li>Pan base: a <strong>metal</strong>, to pass energy to the food fast.</li>' +
              '<li>Pan handle: <strong>wood</strong> or plastic, to stay cool.</li>' +
              '<li>Chilly bin: <strong>foam</strong>, to keep energy out.</li>' +
              '<li>Tramping: <strong>layers</strong> of merino, trapping air.</li>' +
              '<li>Hāngī: a layer of <strong>earth</strong> keeps energy in the pit.</li></ul>'
      },
      {
        id: 'graph', title: 'Comparing insulators',
        diagram: { w: 280, h: 200 },
        draw(d) {
          const curve = k => Array.from({ length: 11 }, (_, i) => [i * 2, +(20 + 60 * Math.exp(-k * i * 2)).toFixed(1)]);
          SciDia.graph(d, {
            xMax: 20, yMax: 80, xStep: 4, yStep: 20, xLabel: 'Time (min)', yLabel: 'Temperature (°C)',
            series: [{ points: curve(0.03), label: 'A' }, { points: curve(0.095), label: 'B' }]
          });
        },
        text: '<p>The best insulator cools <strong>slowest</strong>, so its line stays <strong>highest</strong>: A here.</p>' +
              '<p>How much it cooled = starting temperature − later temperature.</p>'
      },
      {
        id: 'fair', title: 'A fair test of insulators',
        text: '<ul><li><strong>Change:</strong> the wrapping material.</li>' +
              '<li><strong>Measure:</strong> the temperature after a set time.</li>' +
              '<li><strong>Keep the same:</strong> starting temperature, volume of water, thickness of wrapping.</li></ul>'
      }
    ],

    examples: [
      {
        title: 'Example 1: conduction through a metal spoon',
        steps: [
          'The end of the spoon in the hot soup gets thermal energy, so its particles vibrate faster.',
          'They jostle their neighbours, which then vibrate faster too, and so on along the spoon.',
          'The particles stay in place: thermal energy passes along, but the metal itself does not move. That is conduction.',
          'Metals have a high thermal conductivity, so the handle soon gets hot. A wooden spoon has a low one, so its handle stays cool.'
        ]
      },
      {
        title: 'Example 2: comparing insulators',
        diagram: { w: 300, h: 210, caption: 'Three cups of hot water, wrapped in different materials' },
        draw(d) {
          const curve = k => Array.from({ length: 11 }, (_, i) => [i * 2, +(20 + 60 * Math.exp(-k * i * 2)).toFixed(1)]);
          SciDia.graph(d, {
            xMax: 20, yMax: 80, xStep: 4, yStep: 20, xLabel: 'Time (min)', yLabel: 'Temperature (°C)',
            series: [{ points: curve(0.03), label: 'A' }, { points: curve(0.06), label: 'B' }, { points: curve(0.095), label: 'C' }]
          });
        },
        steps: [
          'All three cups started at 80 °C in a 20 °C room.',
          'Cup A, wrapped in foam, cooled most slowly: its line stays highest.',
          'Cup C, with nothing round it, cooled fastest.',
          'The slower a cup cools, the better its wrapping is as an insulator.'
        ],
        result: 'Foam is the best insulator of the three'
      }
    ],

    slots: [
      // 1 · Which kind of transfer?
      {
        name: 'Conduction, convection or radiation?', learn: 'conduction',
        items: TRANSFERS.map(t => rng => C(rng, {
          prompt: t.text + ' How is thermal energy being transferred?',
          right: t.way, wrong: ['conduction', 'convection', 'radiation'].filter(w => w !== t.way),
          keepOrder: false, wide: false,
          explain: WAY_EXPLAIN[t.way], learn: t.way
        }))
      },

      // 2 · Good or poor thermal conductor.
      {
        name: 'Conductor or insulator?', learn: 'conductors',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each material a good conductor of thermal energy, or an insulator?',
          bins: ['Good conductor', 'Insulator'],
          items: CONDUCTORS,
          pick: 6,
          explain: 'Metals are good thermal conductors. Insulators, such as wool, foam, wood and plastic, have a low thermal conductivity; many work by trapping air.'
        })]
      },

      // 3 · Temperature and thermal energy are different.
      {
        name: 'Temperature and thermal energy', learn: 'thermal',
        items: [
          rng => TF(rng, { statement: 'A bath of warm water has more thermal energy than a cup of boiling water.', answer: true,
            explain: 'The boiling water is hotter, so its particles move faster on average. But the bath has vastly more particles, so in total it has more thermal energy.' }),
          rng => TF(rng, { learn: 'temp', statement: 'Temperature is a measure of the average kinetic energy of the particles in a substance.', answer: true,
            explain: 'That is exactly what temperature measures: how fast the particles are moving, on average.' }),
          rng => TF(rng, { statement: 'Temperature and thermal energy are two words for the same thing.', answer: false,
            explain: 'Temperature is the average kinetic energy of the particles. Thermal energy is the energy of all their motion and interactions together, so it also depends on how much substance there is.' }),
          rng => TF(rng, { statement: 'Kinetic energy is the energy an object has because it is moving.', answer: true,
            explain: 'Kinetic energy is the energy associated with motion.' }),
          rng => TF(rng, { statement: 'A spark from a sparkler is hotter than a pot of boiling water, so it has more thermal energy.', answer: false,
            explain: 'The spark is at a higher temperature, but it is a tiny speck of material. The pot of water has far more particles and far more thermal energy.' })
        ]
      },

      // 4 · Read the best insulator off cooling curves.
      {
        name: 'Best insulator from a graph', learn: 'graph',
        items: [Sci.gen(rng => {
          const three = rng.sample(INSULATION, 3);
          const letters = ['A', 'B', 'C'];
          const askBest = rng.chance();
          const target = askBest ? three.reduce((a, b) => (b.k < a.k ? b : a)) : three.reduce((a, b) => (b.k > a.k ? b : a));
          const curve = k => Array.from({ length: 11 }, (_, i) => [i * 2, +(20 + 60 * Math.exp(-k * i * 2)).toFixed(1)]);
          const legend = three.map((m, i) => `cup ${letters[i]} in ${m.name}`).join(', ');
          return {
            prompt: `${Sci.name(rng)} wraps three cups of hot water: ${legend}. Which material is the ` +
                    `<strong>${askBest ? 'best' : 'worst'}</strong> insulator?`,
            diagram: { w: 290, h: 210 },
            draw: d => SciDia.graph(d, {
              xMax: 20, yMax: 80, xStep: 4, yStep: 20, xLabel: 'Time (min)', yLabel: 'Temperature (°C)',
              series: three.map((m, i) => ({ points: curve(m.k), label: letters[i] }))
            }),
            input: {
              kind: 'choice',
              options: three.map(m => ({ html: m.name, right: m === target })),
              correct: three.indexOf(target), wide: true
            },
            explain: askBest
              ? `The best insulator lets thermal energy out most slowly, so its cup cools slowest and its line stays highest: ${target.name}.`
              : `The worst insulator lets thermal energy out fastest, so its cup cools quickest and its line drops lowest: ${target.name}.`
          };
        })]
      },

      // 5 · Temperature drop from a table.
      {
        name: 'Reading a cooling table', learn: 'graph',
        items: [Sci.gen(rng => {
          const start = rng.int(70, 90);
          const drops = [rng.int(8, 14), rng.int(5, 9), rng.int(3, 6), rng.int(2, 4)];
          const temps = [start];
          drops.forEach(dr => temps.push(temps[temps.length - 1] - dr));
          const until = rng.pick([2, 3, 4]);
          return {
            prompt: 'A cup of hot water cools on the bench:' +
                    Sci.table(['Time (min)', ...temps.map((_, i) => i * 5)], [['Temperature (°C)', ...temps]]) +
                    `By how many degrees did it cool in the first ${until * 5} minutes?`,
            input: { kind: 'number', answer: start - temps[until], suffix: '°C', width: 74 },
            explain: `It started at ${start} °C and was ${temps[until]} °C after ${until * 5} minutes: ${m(`${start} - ${temps[until]} = ${start - temps[until]}`)}.`
          };
        })]
      },

      // 6 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'conduction',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student explains why the handle of a metal pan gets hot.',
            lines: [
              'The bottom of the pan is heated by the stove.',
              'The metal particles there gain thermal energy and vibrate faster.',
              'These hot particles travel along the handle towards your hand.',
              'So thermal energy reaches the handle by conduction.'
            ],
            wrong: 2,
            explain: 'In conduction the particles stay in place. Each one passes energy to its neighbours, so the energy travels along the handle, but the metal itself does not move.'
          }),
          rng => Sci.spot(rng, { learn: 'conductors',
            prompt: 'A student explains why a wool jumper keeps you warm.',
            lines: [
              'Your body is warmer than the cold air around you.',
              'Thermal energy moves from your warm body to the colder air.',
              'Wool produces its own heat, which warms you up.',
              'So you stay warmer with a jumper on.'
            ],
            wrong: 2,
            explain: 'Wool makes no heat of its own. It is a good insulator (it traps air), so it slows down the thermal energy leaving your body.'
          }),
          rng => Sci.spot(rng, { learn: 'direction',
            prompt: 'A student explains why a cold drink warms up on a hot day.',
            lines: [
              'The drink is colder than the air around it.',
              'Thermal energy moves from the warm air into the drink.',
              'At the same time, cold moves out of the drink into the air.',
              'The drink warms up until it is the same temperature as the air.'
            ],
            wrong: 2,
            explain: '"Cold" does not move anywhere. Only thermal energy moves, always from the warmer thing to the colder thing.'
          })
        ]
      },

      // 7 · Choose a material for the job.
      {
        name: 'Choosing a material', learn: 'choosing',
        items: [
          rng => C(rng, {
            prompt: 'Which material is best for lining a chilly bin to keep food cold?',
            right: 'Polystyrene foam', wrong: ['Aluminium', 'Steel', 'Copper'],
            explain: 'Foam is an insulator with a low thermal conductivity, so it slows thermal energy getting in from outside.'
          }),
          rng => C(rng, {
            prompt: 'Which is the best material for the base of a frying pan?',
            right: 'Copper or aluminium', wrong: ['Wood', 'Plastic', 'Wool'],
            explain: 'The base must pass thermal energy quickly from the stove to the food, so it needs a good conductor such as a metal.'
          }),
          rng => C(rng, {
            prompt: 'Why do trampers wear several thin layers of merino wool instead of one thin cotton shirt?',
            right: 'Wool and the air trapped between the layers are good insulators, so less thermal energy escapes.',
            wrong: ['The layers make extra heat as you walk.', 'Cotton is a good insulator, so it lets the cold in.', 'Merino is a good conductor, so it spreads warmth around.'],
            explain: 'Trapped air has a very low thermal conductivity. Layers of wool trap plenty of it, slowing the loss of thermal energy.'
          }),
          rng => C(rng, {
            prompt: 'In a hāngī, the hot stones and food are covered with wet sacks and then a layer of earth. What does the earth do?',
            right: 'It acts as an insulator, keeping thermal energy in so the food keeps cooking.',
            wrong: ['It produces extra heat as it settles.', 'It conducts thermal energy away from the food quickly.', 'It lets cold air in to stop the food burning.'],
            explain: 'The soil layer slows thermal energy escaping from the pit, so the stones stay hot long enough to cook the food.'
          }),
          rng => C(rng, {
            prompt: 'Which would be best for the handle of a pot?',
            right: 'Wood', wrong: ['Copper', 'Steel', 'Aluminium'],
            explain: 'A handle should stay cool to hold, so it needs an insulator. Wood conducts thermal energy far more slowly than any metal.'
          }),
          Sci.gen(rng => {
            // One material from one group among three from the other.
            const wantInsulator = rng.chance();
            const right = rng.pick(CONDUCTORS.filter(x => x.bin === (wantInsulator ? 1 : 0))).text;
            const wrong = rng.sample(CONDUCTORS.filter(x => x.bin === (wantInsulator ? 0 : 1)), 3).map(x => x.text);
            return C(rng, {
              prompt: wantInsulator ? 'Which of these is a good thermal <strong>insulator</strong>?' : 'Which of these is a good <strong>conductor</strong> of thermal energy?',
              right, wrong, wide: false, learn: 'conductors',
              explain: wantInsulator
                ? `${right} has a low thermal conductivity. The others are metals, which are good conductors.`
                : `${right} is a metal, and metals are good thermal conductors. The others are insulators.`
            });
          })
        ]
      },

      // 8 · Particles and temperature.
      {
        name: 'Particles and temperature', learn: 'temp',
        items: [
          rng => C(rng, {
            prompt: 'When a pot of water is heated, what happens to its particles?',
            right: 'They move faster, so the average kinetic energy and the temperature go up.',
            wrong: ['They get bigger, so the temperature goes up.', 'They move slower, so there is room for more energy.', 'Nothing happens to them; only the pot changes.'],
            explain: 'Adding thermal energy speeds the particles up. Temperature measures their average kinetic energy.'
          }),
          rng => C(rng, {
            prompt: 'Two cups of water are at 20 °C and 60 °C. What is different about the particles in the hotter one?',
            right: 'On average, they are moving faster.',
            wrong: ['They are bigger.', 'There are more of them in the same volume.', 'They have stopped moving.'],
            explain: 'A higher temperature means a higher average kinetic energy: the particles move faster on average.'
          }),
          rng => C(rng, { learn: 'thermal',
            prompt: 'What does thermal energy describe?',
            right: 'The energy of the motion and interactions of all the particles in a substance',
            wrong: ['How hot the surface of an object feels', 'The speed of the fastest particle', 'The size of the particles'],
            explain: 'Thermal energy is the energy associated with the motion and interactions of the particles.'
          })
        ]
      },

      // 9 · Fair test.
      {
        name: 'Planning a fair test', learn: 'fair',
        items: (() => {
          const sc = {
            setup: 'To find the best material for a lunchbox cover, {n} wraps identical cans of hot water in different materials and measures the temperature after 20 minutes.',
            iv: 'The material used to wrap the can', dv: 'The temperature after 20 minutes',
            cv: ['The starting temperature of the water', 'The volume of water in each can', 'The thickness of each wrapping']
          };
          return [
            rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' What is the <strong>independent</strong> variable?',
              right: sc.iv, wrong: [sc.dv, ...rng.sample(sc.cv, 2)],
              explain: 'The independent variable is the one thing changed on purpose: the wrapping material.'
            }),
            rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' What is the <strong>dependent</strong> variable?',
              right: sc.dv, wrong: [sc.iv, ...rng.sample(sc.cv, 2)],
              explain: 'The dependent variable is what is measured to see the effect: the temperature after 20 minutes.'
            }),
            rng => C(rng, {
              prompt: sc.setup.replace('{n}', Sci.name(rng)) + ' Which of these must be kept the same?',
              right: rng.pick(sc.cv), wrong: [sc.iv, sc.dv, 'Nothing, because the materials are different anyway'],
              explain: 'Everything except the wrapping material must stay the same, or the test is not fair.'
            }),
            rng => C(rng, {
              prompt: 'Why should every can start with water at the same temperature?',
              right: 'Otherwise a can might end up hotter just because it started hotter, not because of its wrapping.',
              wrong: ['So the cans all weigh the same.', 'Because hot water changes colour.', 'It does not matter, as long as you measure carefully.'],
              explain: 'Keeping the starting temperature the same means any difference at the end is caused by the material.'
            })
          ];
        })()
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'conduction',
        items: [
          rng => TF(rng, { statement: 'In conduction, the material itself moves to carry the thermal energy.', answer: false,
            explain: 'Conduction passes energy between particles that stay in place. It is in convection that the liquid or gas moves.' }),
          rng => TF(rng, { learn: 'conductors', statement: 'Insulating materials have a low thermal conductivity.', answer: true,
            explain: 'A low thermal conductivity means thermal energy passes through slowly, which is what makes a good insulator.' }),
          rng => TF(rng, { learn: 'radiation', statement: 'Thermal energy from the Sun reaches Earth by radiation.', answer: true,
            explain: 'There is almost nothing between the Sun and Earth, so it cannot be conduction or convection.' }),
          rng => TF(rng, { learn: 'conductors', statement: 'Metals are generally good conductors of thermal energy.', answer: true,
            explain: 'That is why pots and pans are made of metal, and their handles often are not.' }),
          rng => TF(rng, { learn: 'conductors', statement: 'Trapped air is a poor conductor of thermal energy.', answer: true,
            explain: 'Air has a very low thermal conductivity, which is why so many insulators work by trapping it.' }),
          rng => TF(rng, { statement: "Convection can happen in a solid.", answer: false, learn: 'convection',
            explain: "Convection needs the material itself to move, so it happens only in liquids and gases." }),
          rng => TF(rng, { statement: "Radiation needs a material to travel through.", answer: false, learn: 'radiation',
            explain: "Radiation needs no material, which is how energy from the Sun crosses empty space." }),
          rng => TF(rng, { statement: "Warm air rises above cooler air in a room.", answer: true, learn: 'convection',
            explain: "That rising warm air carries thermal energy round the room: convection." }),
          rng => TF(rng, { statement: "A wooden spoon is a poorer conductor of thermal energy than a metal spoon.", answer: true, learn: 'conductors',
            explain: "Wood has a much lower thermal conductivity than metal, so its handle stays cool." }),
          rng => TF(rng, { statement: "A good insulator produces its own heat.", answer: false, learn: 'conductors',
            explain: "An insulator makes no heat. It slows down the movement of thermal energy." }),
          rng => TF(rng, { statement: "Thermal energy moves from a colder object to a hotter one.", answer: false, learn: 'direction',
            explain: "Thermal energy always moves from the hotter object to the colder one." }),
          rng => TF(rng, { statement: "A hot drink left on the bench ends up at the same temperature as the room.", answer: true, learn: 'direction',
            explain: "Thermal energy flows out of the drink until they are at the same temperature." }),
          rng => TF(rng, { statement: "Feathers and wool insulate well partly because they trap air.", answer: true, learn: 'conductors',
            explain: "Trapped air has a very low thermal conductivity." }),
          rng => TF(rng, { statement: "Two cups of water at the same temperature always have the same thermal energy.", answer: false, learn: 'thermal',
            explain: "Thermal energy also depends on how much substance there is. A bigger cup at the same temperature has more." }),
          rng => TF(rng, { statement: "A higher temperature means the particles are moving faster on average.", answer: true, learn: 'temp',
            explain: "Temperature measures the average kinetic energy of the particles." }),
          rng => TF(rng, { statement: "In conduction, energy passes from particle to particle.", answer: true, learn: 'conduction',
            explain: "The particles stay in place and pass energy to their neighbours." })
        ]
      }
    ]
  });


  // ═══ 7.4 The Earth, Moon and Sun ══════════════════════════════════════════
  // Knowledge: The Earth, Moon, Sun system (p. 20). The Moon as a satellite;
  // its 29.5-day cycle of phases; why the shape appears to change; the Moon
  // rising and setting at different times; Maramataka; lunar and solar
  // eclipses.
  // Practices: analysing lunar data; models of the lunar cycle; using a lunar
  // calendar to predict a good time for a task.
  //
  // Maramataka is kept at the level of the knowledge statements: the names
  // and order of the nights differ between iwi, so no particular version is
  // quizzed. Moon pictures are drawn as seen from New Zealand.

  const PHASE_DESC = {
    'new Moon': 'The sunlit half faces away from Earth, so we can hardly see the Moon.',
    'full Moon': 'The whole sunlit half faces Earth.',
    'first quarter': 'Half of the disc is lit, and the lit part is growing each night.',
    'last quarter': 'Half of the disc is lit, and the lit part is shrinking each night.',
    'waxing crescent': 'A thin sliver is lit, and it is growing each night.',
    'waning crescent': 'A thin sliver is lit, and it is shrinking each night.',
    'waxing gibbous': 'More than half is lit, and it is growing towards full.',
    'waning gibbous': 'More than half is lit, and it is shrinking after full.'
  };

  Sci.topic({
    id: 's7e4', unit: 'y7',
    title: 'The Earth, Moon and Sun',
    blurb: 'Why the Moon seems to change shape, how long its cycle takes, and what causes an eclipse.',
    hint: 'Half of the Moon is always lit by the Sun. As the Moon orbits Earth, we see different amounts of that lit half: ' +
          'that is the cycle of phases, about 29.5 days long. An eclipse happens when the Sun, Earth and Moon line up.',

    learn: [
      {
        id: 'moon', title: 'The Moon',
        text: '<p>The Moon is Earth’s <strong>natural satellite</strong>: a roughly spherical body that orbits the Earth.</p>' +
              '<p>It makes no light of its own. We see it because it <strong>reflects sunlight</strong>.</p>'
      },
      {
        id: 'why', title: 'Why the shape seems to change',
        diagram: { w: 260, h: 170, caption: 'Seen from far above. Not to scale.' },
        draw(d) { SciDia.moonOrbit(d); },
        text: '<p>The Sun always lights <strong>half</strong> of the Moon. As the Moon orbits, we see different amounts of that lit half.</p>' +
              '<p><strong>New Moon:</strong> between Earth and Sun; the lit half faces away. <strong>Full Moon:</strong> on the far side of Earth; the lit half faces us. It is not Earth’s shadow.</p>'
      },
      {
        id: 'phases', title: 'The phases, from New Zealand', wide: true,
        diagram: { w: 424, h: 96 },
        draw(d) {
          SciDia.PHASES.forEach((p, i) => {
            const x = 26 + i * 52.5;
            SciDia.moon(d, [x, 32], 20, p.angle);
            p.name.split(' ').forEach((w, k) => d.text([x, 66 + k * 12], w, { size: 9.5, fill: 'var(--dia-muted)', bold: false }));
          });
        },
        text: '<p>After new Moon the lit part grows (<strong>waxing</strong>): crescent, first quarter, gibbous, full. Then it shrinks (<strong>waning</strong>) back to new.</p>' +
              '<p>In New Zealand a waxing Moon is lit on the <strong>left</strong>; a waning Moon on the right.</p>'
      },
      {
        id: 'cycle', title: 'How long it takes',
        text: '<p>One full cycle of phases takes about <strong>29.5 days</strong>, from one full Moon to the next.</p>' +
              '<p>The four main phases are about a week apart: ' + m('29.5 \\div 4 \\approx 7.4') + ' days.</p>'
      },
      {
        id: 'rise', title: 'Moonrise',
        text: '<p>Because the Moon moves along its orbit, it rises at a different time each day: on average about <strong>50 minutes later</strong> each day.</p>'
      },
      {
        id: 'lunar', title: 'Lunar eclipse',
        diagram: { w: 300, h: 110 },
        draw(d) { SciDia.eclipse(d, 'lunar'); },
        text: '<p><strong>Earth in the middle.</strong> The Moon passes into Earth’s shadow, so sunlight cannot reach it.</p>'
      },
      {
        id: 'solar', title: 'Solar eclipse',
        diagram: { w: 300, h: 110 },
        draw(d) { SciDia.eclipse(d, 'solar'); },
        text: '<p><strong>Moon in the middle.</strong> It passes between Earth and the Sun and blocks the Sun from view for some places. It happens in the daytime.</p>'
      },
      {
        id: 'mara', title: 'Maramataka',
        text: '<p>The <strong>Māori lunar calendar</strong>, built from the Moon’s phases and key stars. It guides daily and seasonal activities such as fishing, planting and harvesting.</p>' +
              '<p>It differs between regions and iwi. In many, the rising of Matariki, or Puanga, marks the new year.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: the phases, as seen from New Zealand',
        diagram: { w: 424, h: 96, caption: 'In New Zealand a waxing Moon is lit on the left. In the Northern Hemisphere it is lit on the right.' },
        draw(d) {
          SciDia.PHASES.forEach((p, i) => {
            const x = 26 + i * 52.5;
            SciDia.moon(d, [x, 32], 20, p.angle);
            const words = p.name.split(' ');
            words.forEach((w, k) => d.text([x, 66 + k * 12], w, { size: 9.5, fill: 'var(--dia-muted)', bold: false }));
          });
        },
        steps: [
          'The Sun always lights half of the Moon. What changes is how much of that lit half faces us.',
          'At new Moon the lit half faces away. As the Moon moves round its orbit we see more of it each night (waxing), up to full Moon.',
          'Then we see less each night (waning), back to new Moon.',
          'The whole cycle takes about 29.5 days, and the quarter phases are about a week apart.'
        ]
      },
      {
        title: 'Example 2: a lunar eclipse',
        diagram: { w: 300, h: 110, caption: 'Not to scale: the real distances are far larger.' },
        draw(d) { SciDia.eclipse(d, 'lunar'); },
        steps: [
          'The Earth is between the Sun and the Moon.',
          'The Moon passes directly into the Earth’s shadow, so sunlight cannot reach it.',
          'In a solar eclipse it is the other way round: the Moon is between the Earth and the Sun, and blocks the Sun from view.'
        ]
      }
    ],

    slots: [
      // 1 · Name the phase from its picture.
      {
        name: 'Name the phase', learn: 'phases',
        items: SciDia.PHASES.filter(p => p.name !== 'new Moon').map(p => rng => C(rng, {
          prompt: 'This is how the Moon looks one night in New Zealand. Which phase is it?',
          diagram: { w: 120, h: 110 },
          draw: d => SciDia.moon(d, [60, 55], 40, p.angle),
          right: p.name,
          wrong: rng.sample(SciDia.PHASES.filter(q => q.name !== p.name && q.name !== 'new Moon').map(q => q.name), 3),
          wide: false,
          explain: {
            'waxing crescent': 'A thin sliver lit on the left: in New Zealand that is a waxing crescent, growing towards first quarter.',
            'first quarter': 'The left half is lit: first quarter, about a week after new Moon.',
            'waxing gibbous': 'More than half lit, on the left side: waxing gibbous, nearly full.',
            'full Moon': 'The whole disc is lit: the whole sunlit half faces Earth.',
            'waning gibbous': 'More than half lit, on the right side: waning gibbous, just after full Moon.',
            'last quarter': 'The right half is lit: last quarter, about a week after full Moon.',
            'waning crescent': 'A thin sliver lit on the right: a waning crescent, nearly back to new Moon.'
          }[p.name]
        }))
      },

      // 2 · Put the phases in order.
      {
        name: 'Order of the phases', learn: 'phases',
        // Four phases in a row, starting anywhere in the cycle of eight.
        items: [Sci.gen(rng => {
          const names = SciDia.PHASES.map(p => p.name);
          const from = rng.int(0, 7);
          const seq = [1, 2, 3, 4].map(k => names[(from + k) % 8]);
          const order = rng.shuffle([0, 1, 2, 3]);
          return {
            prompt: `Starting just after ${names[from].startsWith('new') || names[from].startsWith('full') ? 'a ' : 'the '}${names[from]}, put these phases in the order they appear.`,
            input: { kind: 'order', items: order.map(i => seq[i]), answer: [0, 1, 2, 3].map(i => order.indexOf(i)),
                     cue: 'Click them in order. Click one again to take it back.' },
            explain: 'The cycle runs new Moon, waxing crescent, first quarter, waxing gibbous, full Moon, waning gibbous, last quarter, waning crescent, and back to new Moon. ' +
                     `After ${names[from]}: ${seq.join(', ')}.`
          };
        })]
      },

      // 3 · Why the Moon appears to change shape.
      {
        name: 'Why the phases happen', learn: 'why',
        items: [
          rng => C(rng, {
            prompt: 'Why does the Moon appear to change shape during the month?',
            right: 'As the Moon orbits Earth, we see different amounts of its sunlit half.',
            wrong: ['The Earth’s shadow covers different amounts of the Moon.', 'Clouds block different parts of the Moon.', 'The Moon actually changes shape as it orbits.'],
            explain: 'Half of the Moon is always lit by the Sun. Its position in its orbit decides how much of that lit half faces us.'
          }),
          rng => C(rng, {
            prompt: 'At full Moon, where is the Moon compared with the Earth and the Sun?',
            right: 'On the far side of the Earth from the Sun, so its whole lit half faces us',
            wrong: ['Between the Earth and the Sun', 'Right next to the Sun in the sky', 'Inside the Earth’s shadow every time'],
            explain: 'At full Moon the Sun lights the side of the Moon that faces us. (A lunar eclipse only happens when the line-up is exact, which is not every month.)'
          }),
          rng => C(rng, { learn: 'moon',
            prompt: 'What is the Moon?',
            right: 'A roughly spherical natural satellite that orbits the Earth',
            wrong: ['A star that orbits the Sun', 'A planet that orbits the Earth', 'A flat disc that reflects sunlight'],
            explain: 'The Moon is Earth’s natural satellite: a roughly spherical body in orbit around us.'
          })
        ]
      },

      // 4 · Using the length of the cycle.
      {
        name: 'Using the lunar cycle', learn: 'cycle',
        items: [
          Sci.gen(rng => {
            const day = rng.int(1, 6);
            const month = rng.pick(['March', 'May', 'August', 'October']);
            return {
              prompt: `There is a full Moon on ${day} ${month}. About how many days later will the next full Moon be?`,
              input: { kind: 'number', answer: 29.5, tol: 0.6, decimal: true, suffix: 'days', width: 74 },
              explain: 'One complete cycle of phases takes about 29.5 days, so the next full Moon is 29 or 30 days later.'
            };
          }),
          Sci.gen(rng => {
            const from = rng.pick(['new Moon', 'first quarter', 'full Moon', 'last quarter']);
            const next = { 'new Moon': 'first quarter', 'first quarter': 'full Moon', 'full Moon': 'last quarter', 'last quarter': 'new Moon' }[from];
            return {
              prompt: `About how many days are there between ${from} and ${next}?`,
              note: 'The four main phases split the 29.5-day cycle into four.',
              input: { kind: 'number', answer: 7.4, tol: 0.65, decimal: true, suffix: 'days', width: 74 },
              explain: `${m('29.5 \\div 4 \\approx 7.4')}, so about a week: 7 or 8 days.`
            };
          })
        ]
      },

      // 5 · Solar or lunar eclipse?
      {
        name: 'Solar or lunar eclipse?', learn: 'lunar',
        items: ['lunar', 'solar'].map(type => rng => ({
          prompt: 'The diagram shows the Sun, Earth and Moon lined up. What kind of eclipse is this?',
          diagram: { w: 300, h: 110, caption: 'Not to scale.' },
          draw: d => SciDia.eclipse(d, type),
          input: {
            kind: 'choice',
            options: [{ html: 'A solar eclipse', right: type === 'solar' }, { html: 'A lunar eclipse', right: type === 'lunar' },
                      { html: 'Not an eclipse', right: false }],
            correct: type === 'solar' ? 0 : 1
          },
          learn: type,
          explain: type === 'lunar'
            ? 'The Earth is in the middle, and the Moon is in the Earth’s shadow: a lunar eclipse.'
            : 'The Moon is in the middle, blocking the Sun from part of the Earth: a solar eclipse.'
        }))
      },

      // 6 · Moonrise data.
      {
        name: 'Moonrise data', learn: 'rise',
        items: [Sci.gen(rng => {
          const avg = rng.int(46, 54);
          const gaps = rng.shuffle([avg - 2, avg + 1, avg + 1]);
          let t = rng.int(17, 19) * 60 + rng.int(0, 5) * 10;
          const times = [t];
          gaps.forEach(g => { t += g; times.push(t); });
          const fmt = x => `${Math.floor(x / 60) % 24}:${String(x % 60).padStart(2, '0')}`;
          return {
            prompt: 'Moonrise times over four nights:' +
                    Sci.table(['Night', '1', '2', '3', '4'], [['Moonrise', ...times.map(fmt)]]) +
                    'On average, how many minutes later does the Moon rise each night?',
            input: { kind: 'number', answer: avg, tol: 0.6, suffix: 'min', width: 74 },
            explain: `From night 1 to night 4 is ${avg * 3} minutes over 3 nights: ${m(`${avg * 3} \\div 3 = ${avg}`)}. ` +
                     'The Moon rises later each night because it moves along its orbit.'
          };
        })]
      },

      // 7 · Maramataka.
      {
        name: 'Maramataka', learn: 'mara',
        items: [
          rng => C(rng, {
            prompt: 'What is the Maramataka?',
            right: 'The Māori lunar calendar, which uses the Moon’s phases and key stars to divide the year into days and months',
            wrong: ['A calendar based only on the position of the Sun', 'A weather forecast for the coming week', 'A map of the stars used for navigation at sea'],
            explain: 'Maramataka is the Māori lunar calendar, built from observing the Moon’s phases and key stars.'
          }),
          rng => C(rng, {
            prompt: 'How is the Maramataka used?',
            right: 'To guide daily practices and seasonal activities, such as fishing and planting, using the Moon’s phases and changes in the environment',
            wrong: ['To set the date of school holidays', 'To work out the exact time of sunrise', 'To predict earthquakes'],
            explain: 'Maramataka uses environmental changes and the Moon’s phases to guide activities like fishing, planting and harvesting.'
          }),
          rng => TF(rng, { statement: 'The Maramataka is exactly the same in every region of New Zealand.', answer: false,
            explain: 'Maramataka guides activities for specific regions, and its details differ between iwi and places.' }),
          rng => TF(rng, { statement: 'In many maramataka, the rising of Matariki, or of Puanga in some regions, marks the start of the new year.', answer: true,
            explain: 'Key stars help divide the year. Which star marks the new year depends on the region.' })
        ]
      },

      // 8 · True or false.
      {
        name: 'True or false', learn: 'why',
        items: [
          rng => TF(rng, { learn: 'moon', statement: 'The Moon makes its own light, like the Sun.', answer: false,
            explain: 'The Moon gives out no light of its own. We see it because it reflects sunlight.' }),
          rng => TF(rng, { learn: 'lunar', statement: 'A lunar eclipse happens when the Moon passes directly into the Earth’s shadow.', answer: true,
            explain: 'With the Earth exactly between the Sun and the Moon, the Earth’s shadow falls on the Moon.' }),
          rng => TF(rng, { learn: 'solar', statement: 'A solar eclipse happens when the Moon passes directly between the Earth and the Sun.', answer: true,
            explain: 'The Moon blocks the Sun from view for people in its shadow.' }),
          rng => TF(rng, { learn: 'rise', statement: 'The Moon rises at the same time every night.', answer: false,
            explain: 'Because the Moon moves along its orbit, it rises at a different time each day: generally later.' }),
          rng => TF(rng, { learn: 'cycle', statement: 'A full cycle of the Moon’s phases takes about 29.5 days.', answer: true,
            explain: 'That is the length of the lunar cycle, from one new Moon to the next.' }),
          rng => TF(rng, { statement: 'Half of the Moon is lit by the Sun at all times.', answer: true,
            explain: 'The Sun always lights the half facing it. The phases are about how much of that half we can see.' }),
          rng => TF(rng, { statement: "The Moon orbits the Earth.", answer: true, learn: 'moon',
            explain: "The Moon is Earth’s natural satellite." }),
          rng => TF(rng, { statement: "The Moon is a star.", answer: false, learn: 'moon',
            explain: "The Moon is a natural satellite. It makes no light of its own; it reflects sunlight." }),
          rng => TF(rng, { statement: "At new Moon, the Moon is between the Earth and the Sun.", answer: true, learn: 'why',
            explain: "Its sunlit half faces away from us, so we can hardly see it." }),
          rng => TF(rng, { statement: "At full Moon, the Moon’s sunlit half faces away from Earth.", answer: false, learn: 'why',
            explain: "At full Moon the whole sunlit half faces Earth." }),
          rng => TF(rng, { statement: "In New Zealand, a waxing crescent Moon is lit on the left.", answer: true, learn: 'phases',
            explain: "In the Southern Hemisphere a waxing Moon is lit on the left." }),
          rng => TF(rng, { statement: "Waning means the lit part we see is getting bigger each night.", answer: false, learn: 'phases',
            explain: "Waning means shrinking. Waxing means growing." }),
          rng => TF(rng, { statement: "First quarter and last quarter are about two weeks apart.", answer: true, learn: 'cycle',
            explain: "They are half a cycle apart: about 29.5 ÷ 2, or roughly 15 days." }),
          rng => TF(rng, { statement: "A lunar eclipse can only be seen in the daytime.", answer: false, learn: 'lunar',
            explain: "A lunar eclipse is seen at night, when the Moon is up and passes into Earth’s shadow." }),
          rng => TF(rng, { statement: "During a solar eclipse, the Moon blocks the Sun from view.", answer: true, learn: 'solar',
            explain: "The Moon passes between the Earth and the Sun." }),
          rng => TF(rng, { statement: "Maramataka uses the Moon’s phases to help guide activities such as fishing and planting.", answer: true, learn: 'mara',
            explain: "It uses the Moon’s phases and changes in the environment to guide daily and seasonal activities." })
        ]
      },

      // 9 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'why',
        items: [
          rng => Sci.spot(rng, {
            prompt: 'A student explains the phases of the Moon.',
            lines: [
              'The Moon orbits the Earth about once a month.',
              'The Moon does not make its own light; it reflects sunlight.',
              'The Earth’s shadow covers part of the Moon, making the crescent shape.',
              'At full Moon the shadow has moved off completely.'
            ],
            wrong: 2,
            explain: 'The Earth’s shadow only falls on the Moon during a lunar eclipse. The phases come from seeing different amounts of the Moon’s sunlit half.'
          }),
          rng => Sci.spot(rng, { learn: 'solar',
            prompt: 'A student explains a solar eclipse.',
            lines: [
              'In a solar eclipse, the Sun, Moon and Earth line up.',
              'The Earth is in the middle, between the Sun and the Moon.',
              'This blocks the Sun from view for some people on Earth.',
              'It can only happen during the day.'
            ],
            wrong: 1,
            explain: 'In a solar eclipse the Moon is in the middle, between the Earth and the Sun. With the Earth in the middle, it would be a lunar eclipse.'
          })
        ]
      },

      // 10 · Match each phase to what is happening.
      {
        name: 'Match the phases', learn: 'why',
        // Four of the eight phases each time.
        items: [Sci.gen(rng => {
          const names = rng.sample(Object.keys(PHASE_DESC), 4);
          const order = rng.shuffle([0, 1, 2, 3]);
          return {
            prompt: 'Match each phase to what is happening.',
            input: {
              kind: 'match', left: names, right: order.map(i => PHASE_DESC[names[i]]),
              tags: ['A', 'B', 'C', 'D'], answer: [0, 1, 2, 3].map(i => order.indexOf(i))
            },
            explain: 'The phase depends on how much of the Moon’s sunlit half faces Earth, and whether that amount is growing or shrinking.'
          };
        })]
      }
    ]
  });


  // ═══ 7.5 Survival adaptations ═════════════════════════════════════════════
  // Knowledge: Survival Adaptations (p. 21). Adaptations for resources,
  // hazards and reproduction; structural, behavioural and physiological;
  // suited to environments; variation; no guarantee of survival; environment
  // affects how well an adaptation works; Lamarck.
  // Practices: compare adaptations from different environments; advantages
  // and limits in different conditions; explain how adaptations increase
  // survival and reproduction.

  const ADAPT = [
    { text: 'A kiwi has nostrils at the tip of its long beak, to smell food under the ground', type: 0, purpose: 0 },
    { text: 'A kererū can open its beak very wide, to swallow large fruit whole', type: 0, purpose: 0 },
    { text: 'A kākā has a strong hooked beak, for tearing bark to reach grubs', type: 0, purpose: 0 },
    { text: 'A tūī has a brush-tipped tongue, for collecting nectar from flowers', type: 0, purpose: 0 },
    { text: 'A green gecko’s colour matches the leaves it lives among', type: 0, purpose: 1 },
    { text: 'A kina is covered in sharp spines', type: 0, purpose: 1 },
    { text: 'Ducks have webbed feet for swimming', type: 0, purpose: null },
    { text: 'Penguins huddle together in a tight group in freezing weather', type: 1, purpose: 1 },
    { text: 'A ruru hunts at night, when its prey is active', type: 1, purpose: 0 },
    { text: 'A tree wētā raises its spiny back legs when it is threatened', type: 1, purpose: 1 },
    { text: 'Bar-tailed godwits (kuaka) fly to Alaska each year to breed', type: 1, purpose: 2 },
    { text: 'A male bird sings loudly in spring to attract a mate', type: 1, purpose: 2 },
    { text: 'Penguin parents take turns keeping their egg warm', type: 1, purpose: 2 },
    { text: 'A mountain stone wētā can survive being frozen solid in winter', type: 2, purpose: 1 },
    { text: 'Some Antarctic fish make a natural antifreeze in their blood', type: 2, purpose: 1 },
    { text: 'Some plants make bitter-tasting chemicals in their leaves', type: 2, purpose: 1 },
    { text: 'People sweat to cool down on a hot day', type: 2, purpose: 1 }
  ];
  const TYPES = ['Structural', 'Behavioural', 'Physiological'];

  Sci.topic({
    id: 's7e5', unit: 'y7',
    title: 'Survival Adaptations',
    blurb: 'Features, behaviours and body processes that help living things survive and reproduce where they live.',
    hint: 'An adaptation can be structural (a body feature), behavioural (something the organism does) or physiological ' +
          '(a process inside its body). Adaptations help with getting resources, avoiding hazards, or reproducing. ' +
          'They raise the chance of surviving, but do not guarantee it.',

    learn: [
      {
        id: 'what', title: 'What an adaptation is for',
        text: '<p>An <strong>adaptation</strong> helps an organism survive and reproduce where it lives. It helps with one of three things:</p>' +
              Sci.table(['Helps with', 'Example'], [['Getting resources', 'A tūī’s brush-tipped tongue collects nectar'],
                ['Avoiding danger', 'A kina’s spines put off predators'], ['Reproducing', 'A bird sings in spring to attract a mate']])
      },
      {
        id: 'kinds', title: 'Three kinds of adaptation', wide: true,
        text: Sci.table(['Kind', 'Meaning', 'Example'], [
                ['<strong>Structural</strong>', 'A body feature', 'A kiwi’s nostrils at the tip of its beak'],
                ['<strong>Behavioural</strong>', 'Something it does', 'Penguins huddling in a storm'],
                ['<strong>Physiological</strong>', 'A process inside the body', 'A stone wētā surviving being frozen']])
      },
      {
        id: 'beaks', title: 'Beaks suit food', wide: true,
        text: Sci.table(['Bird', 'Beak', 'Food'], [
                ['Kiwi', 'Long, nostrils at the tip', 'Worms underground'], ['Kererū', 'Very wide gape', 'Large fruit, whole'],
                ['Kākā', 'Strong and hooked', 'Grubs under bark'], ['Kārearea', 'Sharp and hooked', 'Meat'],
                ['Tūī', 'Curved, brush-tipped tongue', 'Nectar']])
      },
      {
        id: 'variation', title: 'Individuals vary',
        text: '<p>Organisms of the same species are not identical. Some variations suit the environment better.</p>' +
              '<p>On dark rocks, darker-shelled snails are harder for birds to spot, so more of them survive.</p>'
      },
      {
        id: 'chance', title: 'A better chance, not a guarantee',
        text: '<p>An adaptation <strong>increases the chance</strong> of surviving and reproducing. It does not guarantee it.</p>' +
              '<p>How well it works <strong>depends on the environment</strong>: a green gecko is hidden among leaves but stands out on a bare branch, and thick fur that helps in the cold can cause overheating in the heat.</p>'
      },
      {
        id: 'environments', title: 'Suited to the place',
        text: '<ul><li>Windy coasts: small, tough leaves tear less and lose less water.</li>' +
              '<li>Wading birds: long legs reach food in deeper water.</li>' +
              '<li>Freezing storms: huddling penguins each lose less thermal energy.</li></ul>'
      },
      {
        id: 'lamarck', title: 'Lamarck’s idea',
        text: '<p>Jean-Baptiste Lamarck proposed that traits gained during a lifetime are passed to offspring: a giraffe stretching its neck would have longer-necked young.</p>' +
              '<p>This idea has been <strong>contested</strong>. Stretching does not change what is passed on.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: three kinds of adaptation',
        steps: [
          '<strong>Structural:</strong> a physical feature. A kiwi’s nostrils are at the tip of its long beak, so it can smell worms underground.',
          '<strong>Behavioural:</strong> something the organism does. Penguins huddle together to keep warm in freezing wind.',
          '<strong>Physiological:</strong> a process inside the body. A mountain stone wētā can survive being frozen solid.'
        ]
      },
      {
        title: 'Example 2: an adaptation depends on where you live',
        steps: [
          'A green gecko is hard to spot among green leaves. That camouflage helps it avoid being eaten.',
          'On a brown, bare branch the same green colour stands out.',
          'So an adaptation that works well in one habitat can work less well in another. It increases the chance of survival; it does not guarantee it.'
        ]
      }
    ],

    slots: [
      // 1 · Structural, behavioural or physiological.
      {
        name: 'What kind of adaptation?', learn: 'kinds',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each adaptation structural, behavioural or physiological?',
          bins: TYPES,
          items: ADAPT.map(a => ({ text: a.text, bin: a.type })),
          pick: 6,
          explain: 'Structural: a body feature. Behavioural: something the organism does. Physiological: a process inside its body.'
        })]
      },

      // 2 · What is the adaptation for?
      {
        name: 'What is it for?', learn: 'what',
        items: [rng => Sci.sort(rng, {
          prompt: 'What does each adaptation mainly help with?',
          bins: ['Getting resources', 'Avoiding danger', 'Reproducing'],
          items: [
            // Only adaptations with one clear purpose; webbed feet, say, could be argued either way.
            ...ADAPT.filter(a => a.purpose !== null).map(a => ({ text: a.text, bin: a.purpose })),
            { text: 'Dandelion seeds have fluffy parachutes that carry them on the wind', bin: 2 },
            { text: 'Pōhutukawa flowers are bright red, which attracts birds that carry their pollen', bin: 2 },
            { text: 'Some plants grow very long roots to reach water deep underground', bin: 0 }
          ],
          pick: 6,
          explain: 'Adaptations help an organism get resources (food, water), avoid hazards (predators, cold), or reproduce (find mates, spread seeds, care for young).'
        })]
      },

      // 3 · Match the beak to the food.
      {
        name: 'Beaks and food', learn: 'beaks',
        items: [rng => {
          const rows = [
            ['Kiwi', 'Long beak with nostrils at the tip, for finding worms underground'],
            ['Kererū', 'Very wide gape, for swallowing large fruit whole'],
            ['Kākā', 'Strong hooked beak, for tearing into wood to find grubs'],
            ['Kārearea (NZ falcon)', 'Sharp hooked beak, for tearing meat'],
            ['Tūī', 'Curved beak and brush-tipped tongue, for drinking nectar']
          ];
          const four = rng.sample(rows, 4);
          const order = rng.shuffle([0, 1, 2, 3]);
          return {
            prompt: 'Match each bird to the beak that suits its food.',
            input: { kind: 'match', left: four.map(r => r[0]), right: order.map(i => four[i][1]),
                     tags: ['A', 'B', 'C', 'D'], answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
            explain: 'Beak shapes are structural adaptations for obtaining food.'
          };
        }]
      },

      // 4 · Variation within a species.
      {
        name: 'Variation', learn: 'variation',
        items: [
          rng => C(rng, {
            prompt: 'Why might two tūī of the same species not be equally good at surviving?',
            right: 'Individuals of a species vary, and some variations suit the environment better than others.',
            wrong: ['All individuals of a species are identical, so they must be equally good.', 'Only the oldest bird of a species can have adaptations.', 'Birds choose which adaptations they want.'],
            explain: 'Organisms of the same species show variation in their traits. Some variations make an individual better suited to its environment.'
          }),
          rng => C(rng, {
            prompt: 'A population of snails includes some with darker shells and some with lighter shells. They live on dark rocks. Which snails are most likely to survive?',
            right: 'The darker ones, because they are harder for birds to spot',
            wrong: ['The lighter ones, because they are easier to see', 'All of them equally, because they are the same species', 'None of them, because snails have no adaptations'],
            explain: 'Variation means some individuals are better suited: on dark rock, darker shells are better camouflaged.'
          })
        ]
      },

      // 5 · An adaptation is not a guarantee.
      {
        name: 'Adaptations and survival', learn: 'chance',
        items: [
          rng => TF(rng, { statement: 'Having a good adaptation guarantees that an animal will survive.', answer: false,
            explain: 'An adaptation increases the likelihood of surviving and reproducing. It does not guarantee it.' }),
          rng => TF(rng, { statement: 'An adaptation can increase the chance of surviving and reproducing.', answer: true,
            explain: 'That is what makes it an adaptation: it helps the organism survive and reproduce in its environment.' }),
          rng => TF(rng, { statement: 'Camouflage that works well in one habitat may work less well in another.', answer: true,
            explain: 'Environmental conditions affect how effective an adaptation is.' }),
          rng => TF(rng, { learn: 'variation', statement: 'Organisms of the same species can differ in their adaptations.', answer: true,
            explain: 'Individuals show variation in their traits, including their adaptations.' }),
          rng => TF(rng, { statement: "A kiwi’s long beak with nostrils at the tip is a structural adaptation.", answer: true, learn: 'kinds',
            explain: "It is a body feature, so it is structural." }),
          rng => TF(rng, { statement: "Penguins huddling together is a physiological adaptation.", answer: false, learn: 'kinds',
            explain: "Huddling is something penguins do, so it is behavioural." }),
          rng => TF(rng, { statement: "Sweating to cool down is a physiological adaptation.", answer: true, learn: 'kinds',
            explain: "It is a process inside the body, so it is physiological." }),
          rng => TF(rng, { statement: "A behavioural adaptation is something an organism does.", answer: true, learn: 'kinds',
            explain: "For example, a ruru hunting at night." }),
          rng => TF(rng, { statement: "Adaptations can help an organism reproduce, not just survive.", answer: true, learn: 'what',
            explain: "Bird song that attracts a mate is an adaptation for reproducing." }),
          rng => TF(rng, { statement: "Individuals of the same species are always identical.", answer: false, learn: 'variation',
            explain: "Individuals vary, and some variations suit the environment better than others." }),
          rng => TF(rng, { statement: "An adaptation that helps in a cold place could be a disadvantage in a hot place.", answer: true, learn: 'chance',
            explain: "Thick fur keeps an animal warm in the cold but can make it overheat in the heat." }),
          rng => TF(rng, { statement: "Lamarck’s idea that traits acquired during a lifetime are passed on is accepted science today.", answer: false, learn: 'lamarck',
            explain: "Lamarck’s idea has been contested. Traits gained during a lifetime are not passed on." }),
          rng => TF(rng, { statement: "Bright red pōhutukawa flowers attract birds that carry their pollen.", answer: true, learn: 'what',
            explain: "This is an adaptation for reproducing." }),
          rng => TF(rng, { statement: "Camouflage can help an animal avoid being seen by predators.", answer: true, learn: 'what',
            explain: "A green gecko among green leaves is hard to spot." })
        ]
      },

      // 6 · The environment changes how well it works.
      {
        name: 'When the environment changes', learn: 'chance',
        items: [
          rng => C(rng, {
            prompt: 'A pale-coloured moth is well camouflaged on pale lichen-covered trees. The lichen dies and the bark underneath is dark. What is most likely?',
            right: 'The pale moths become easier for birds to see, so fewer survive.',
            wrong: ['The pale moths decide to become darker.', 'Nothing changes, because camouflage works everywhere.', 'The birds stop eating moths.'],
            explain: 'An adaptation that worked in one environment may not work as well when the environment changes.'
          }),
          rng => C(rng, {
            prompt: 'Thick fur keeps an animal warm in a cold place. What could be a disadvantage of thick fur?',
            right: 'In hot weather the animal could overheat.',
            wrong: ['It has no disadvantages at all.', 'It makes the animal colder.', 'It stops the animal from eating.'],
            explain: 'Adaptations have advantages and limitations, which depend on the conditions.'
          })
        ]
      },

      // 7 · Lamarck.
      {
        name: 'Lamarck’s idea', learn: 'lamarck',
        items: [
          rng => C(rng, {
            prompt: 'A student says: "A giraffe’s neck gets longer during its life from stretching up to reach leaves, and it passes this longer neck on to its young." Whose idea is this?',
            right: 'Lamarck’s, and it has been contested',
            wrong: ['Darwin’s, and it is accepted science', 'Robert Hooke’s, from looking at cells', 'It is how all scientists explain it today'],
            explain:'This is Lamarck’s idea, that traits gained during a lifetime are passed on. It has been contested: stretching does not change what is passed to offspring.'
          }),
          rng => C(rng, {
            prompt: 'What did Jean-Baptiste Lamarck propose?',
            right: 'That traits acquired during an organism’s lifetime could be inherited by its offspring',
            wrong: ['That cells are the basic unit of life', 'That the Earth orbits the Sun', 'That all organisms are made of particles'],
            explain: 'Lamarck proposed that acquired traits are inherited. The idea was later contested.'
          })
        ]
      },

      // 8 · Explain how an adaptation helps.
      {
        name: 'How does it help?', learn: 'what',
        items: [
          rng => C(rng, { learn: 'environments',
            prompt: 'How does huddling help penguins survive a freezing storm?',
            right: 'Each penguin loses less thermal energy, because much of its body is sheltered by others.',
            wrong: ['Huddling makes the penguins produce food.', 'The penguins in the middle get colder so the outside ones get warmer.', 'It makes them harder for predators to find.'],
            explain: 'Huddling is a behavioural adaptation that reduces the loss of thermal energy, helping each penguin survive the cold.'
          }),
          rng => C(rng, {
            prompt: 'How do the spines on a kina help it survive?',
            right: 'They make it hard for predators to eat.',
            wrong: ['They help it swim faster.', 'They collect sunlight to make food.', 'They keep it warm.'],
            explain: 'Spines are a structural adaptation for avoiding being eaten.'
          }),
          rng => C(rng, {
            prompt: 'How does a kererū’s very wide gape help it?',
            right: 'It can swallow large fruits whole that smaller-mouthed birds cannot eat.',
            wrong: ['It lets it drink nectar.', 'It keeps it warm.', 'It scares away predators.'],
            explain: 'A wide gape is a structural adaptation for obtaining food: kererū can eat fruits too big for most other birds.'
          })
        ]
      },

      // 9 · Adaptations from different environments.
      {
        name: 'Comparing environments', learn: 'environments',
        items: [
          rng => C(rng, {
            prompt: 'Plants growing on exposed, windy coasts often have small, tough leaves. Which is the best explanation?',
            right: 'Small, tough leaves are less likely to be torn by the wind and lose less water.',
            wrong: ['Small leaves catch more sunlight.', 'The wind makes the leaves shrink during the plant’s life.', 'Tough leaves are tastier to animals.'],
            explain: 'Leaf structure is a structural adaptation suited to the conditions where the plant lives.'
          }),
          rng => C(rng, {
            prompt: 'Birds that wade in water often have long legs. Which is the best explanation?',
            right: 'Long legs let them stand in deeper water to find food while keeping their bodies dry.',
            wrong: ['Their legs got longer from standing in water.', 'Long legs help them fly faster.', 'Long legs keep them warm.'],
            explain: 'Long legs are a structural adaptation suited to feeding in water.'
          })
        ]
      },

      // 10 · Name the kind of adaptation (one at a time).
      {
        name: 'Which kind is this?', learn: 'kinds',
        items: ADAPT.map(a => rng => ({
          prompt: a.text + '. What kind of adaptation is this?',
          input: {
            kind: 'choice',
            options: TYPES.map((t, i) => ({ html: t, right: i === a.type })),
            correct: a.type
          },
          explain: ['It is a physical feature of the body, so it is structural.',
                    'It is something the organism does, so it is behavioural.',
                    'It is a process inside the body, so it is physiological.'][a.type]
        }))
      }
    ]
  });


  // ═══ 7.6 Cells ════════════════════════════════════════════════════════════
  // Knowledge: Cells (pp. 21–22). The microscope and Hooke, van Leeuwenhoek;
  // cells as the fundamental unit, with organelles that carry out functions;
  // specialised cells; cells to tissues to organs to systems;
  // microorganisms.
  // Practices: finding patterns in cell structures; labelling diagrams of
  // different types of cells.

  const FUNCTION = {
    'nucleus': 'Controls the cell’s activities',
    'cell membrane': 'Controls what enters and leaves the cell',
    'cytoplasm': 'Jelly-like substance where many of the cell’s chemical reactions happen',
    'cell wall': 'A tough layer that supports and strengthens a plant cell',
    'vacuole': 'Stores water and dissolved substances, and helps keep a plant cell firm',
    'chloroplast': 'Where photosynthesis happens, making food using light'
  };

  Sci.topic({
    id: 's7e6', unit: 'y7',
    title: 'Cells',
    blurb: 'The building blocks of living things, the parts inside them, and how they build up into whole organisms.',
    hint: 'Every living thing is made of cells. Plant and animal cells both have a nucleus, cytoplasm and a cell membrane; ' +
          'plant cells also have a cell wall, chloroplasts and a large vacuole. Cells build up into tissues, organs, systems and organisms.',

    learn: [
      {
        id: 'cell', title: 'Cells',
        text: '<p>Every living thing is made of <strong>cells</strong>, the basic unit of life. Most are far too small to see without a microscope.</p>' +
              '<p>The structures inside a cell that do its jobs are called <strong>organelles</strong>.</p>'
      },
      {
        id: 'plant', title: 'A plant cell', wide: true,
        diagram: { w: 424, h: 200 },
        draw(d) { SciDia.cell(d, 'plant', Object.fromEntries(SciDia.PLANT_PARTS.map(p => [p, p]))); },
        text: '<p>A tough <strong>cell wall</strong> outside the membrane, green <strong>chloroplasts</strong>, and a large <strong>vacuole</strong> filling the middle.</p>'
      },
      {
        id: 'animal', title: 'An animal cell', wide: true,
        diagram: { w: 424, h: 200 },
        draw(d) { SciDia.cell(d, 'animal', Object.fromEntries(SciDia.ANIMAL_PARTS.map(p => [p, p]))); },
        text: '<p>Just a <strong>membrane</strong> on the outside, so no fixed shape. No cell wall, no chloroplasts, no large vacuole.</p>'
      },
      {
        id: 'compare', title: 'Plant and animal cells compared',
        text: Sci.table(['Part', 'Plant', 'Animal'], [['Nucleus', '✓', '✓'], ['Cytoplasm', '✓', '✓'], ['Cell membrane', '✓', '✓'],
                ['Cell wall', '✓', ''], ['Chloroplasts', '✓', ''], ['Large vacuole', '✓', '']]) +
              '<p>Plant cells that get no light, such as in an onion bulb, have no chloroplasts.</p>'
      },
      {
        id: 'jobs', title: 'What each part does',
        text: Sci.table(['Part', 'Job'], Object.entries(FUNCTION).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), v]))
      },
      {
        id: 'levels', title: 'From cells to organisms',
        text: '<ol class="learn-steps"><li><strong>Cells</strong> of the same kind group into</li><li><strong>tissues</strong>, which make up</li>' +
              '<li><strong>organs</strong>, which work together in</li><li><strong>organ systems</strong>, which make up the</li><li><strong>organism</strong>.</li></ol>'
      },
      {
        id: 'special', title: 'Specialised cells', wide: true,
        text: '<p>Cells in one organism differ, each shaped for its job.</p>' +
              Sci.table(['Cell', 'Feature', 'Job'], [['Sperm', 'Long tail', 'Swims to an egg'], ['Nerve', 'Long and thin', 'Carries signals'],
                ['Root hair', 'Long extension', 'Absorbs water'], ['Potato', 'Full of starch', 'Stores food']])
      },
      {
        id: 'micro', title: 'One cell or many',
        text: '<p><strong>Microorganisms</strong> are a single cell: bacteria, yeast, some algae.</p>' +
              '<p>Most organisms you can see are made of many cells: a mushroom, kelp, a wētā, you.</p>'
      },
      {
        id: 'history', title: 'Discovering cells',
        text: '<p>Cells were only found once the <strong>microscope</strong> was invented.</p>' +
              '<p><strong>Robert Hooke</strong> saw tiny compartments in cork and named them cells. <strong>Antonie van Leeuwenhoek</strong> built powerful microscopes and was among the first to see microorganisms.</p>'
      }
    ],

    examples: [
      {
        title: 'Example 1: a plant cell',
        diagram: { w: 424, h: 200, caption: 'A leaf cell. The large vacuole pushes everything else to the edges.' },
        draw(d) { SciDia.cell(d, 'plant', Object.fromEntries(SciDia.PLANT_PARTS.map(p => [p, p]))); },
        steps: [
          'Like all cells, it has a <strong>nucleus</strong>, <strong>cytoplasm</strong> and a <strong>cell membrane</strong>.',
          'Plant cells also have a <strong>cell wall</strong> for support, <strong>chloroplasts</strong> for photosynthesis, and a large <strong>vacuole</strong>.',
          'The structures inside a cell that carry out its functions are called organelles.'
        ]
      },
      {
        title: 'Example 2: an animal cell',
        diagram: { w: 424, h: 200, caption: 'A cheek cell. No cell wall, so no fixed shape.' },
        draw(d) { SciDia.cell(d, 'animal', Object.fromEntries(SciDia.ANIMAL_PARTS.map(p => [p, p]))); },
        steps: [
          'An animal cell has a nucleus, cytoplasm and a cell membrane.',
          'It has no cell wall, no chloroplasts and no large vacuole.',
          'Without a cell wall, it has no fixed shape.'
        ]
      }
    ],

    slots: [
      // 1 · Label a plant cell.
      {
        name: 'Label a plant cell', learn: 'plant',
        items: [rng => {
          const order = rng.shuffle(SciDia.PLANT_PARTS);
          const labels = Object.fromEntries(order.map((p, i) => [p, String(i + 1)]));
          return Sci.label(rng, {
            prompt: 'Name each part of this plant cell.',
            diagram: { w: 300, h: 200 },
            draw: d => SciDia.cell(d, 'plant', labels),
            markers: order, options: SciDia.PLANT_PARTS,
            explain: 'The cell wall is the thick outer layer; the membrane is just inside it; the large vacuole fills the middle; chloroplasts are the small green bodies; the nucleus sits in the cytoplasm.'
          });
        }]
      },

      // 2 · Label an animal cell.
      {
        name: 'Label an animal cell', learn: 'animal',
        items: [rng => {
          const order = rng.shuffle(SciDia.ANIMAL_PARTS);
          const labels = Object.fromEntries(order.map((p, i) => [p, String(i + 1)]));
          return Sci.label(rng, {
            prompt: 'Name each part of this animal cell.',
            diagram: { w: 300, h: 200 },
            draw: d => SciDia.cell(d, 'animal', labels),
            markers: order, options: [...SciDia.ANIMAL_PARTS, 'cell wall', 'chloroplast'],
            explain: 'The membrane is the outer boundary, the cytoplasm fills the cell, and the nucleus is the large body inside. An animal cell has no cell wall or chloroplasts.'
          });
        }]
      },

      // 3 · Plant cells only, or both?
      {
        name: 'Plant cells only, or both?', learn: 'compare',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each part found only in plant cells, or in both plant and animal cells?',
          bins: ['Plant cells only', 'Both'],
          items: [
            { text: 'Cell wall', bin: 0 }, { text: 'Chloroplasts', bin: 0 }, { text: 'A large permanent vacuole', bin: 0 },
            { text: 'Nucleus', bin: 1 }, { text: 'Cell membrane', bin: 1 }, { text: 'Cytoplasm', bin: 1 }
          ],
          pick: 4,
          explain: 'Both have a nucleus, cytoplasm and a cell membrane. Only plant cells have a cell wall, chloroplasts and a large vacuole.'
        })]
      },

      // 4 · What does each part do?
      {
        name: 'What each part does', learn: 'jobs',
        items: [rng => {
          const four = rng.sample(Object.keys(FUNCTION), 4);
          const order = rng.shuffle([0, 1, 2, 3]);
          return {
            prompt: 'Match each part of a cell to its job.',
            input: { kind: 'match', left: four, right: order.map(i => FUNCTION[four[i]]),
                     tags: ['A', 'B', 'C', 'D'], answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
            explain: 'Each organelle carries out a particular function for the cell.'
          };
        }]
      },

      // 5 · From cells to organisms.
      {
        name: 'From cells to organisms', learn: 'levels',
        // Four of the five levels, smallest first or largest first.
        items: [Sci.gen(rng => {
          const all = ['Cell', 'Tissue', 'Organ', 'Organ system', 'Organism'];
          const drop = rng.int(0, 4);
          const up = rng.chance();
          let seq = all.filter((_, k) => k !== drop);
          if (!up) seq = seq.reverse();
          const order = rng.shuffle([0, 1, 2, 3]);
          return {
            prompt: `Put these in order, from ${up ? 'smallest to largest' : 'largest to smallest'}.`,
            input: { kind: 'order', items: order.map(i => seq[i]), answer: [0, 1, 2, 3].map(i => order.indexOf(i)) },
            explain: 'Cells group into tissues, tissues into organs, organs into systems, and systems make up the organism.'
          };
        })]
      },

      // 6 · Specialised cells.
      {
        name: 'Specialised cells', learn: 'special',
        items: [
          rng => C(rng, {
            prompt: 'A sperm cell has a long tail. What is it specialised for?',
            right: 'Movement: swimming to reach an egg', wrong: ['Storing food', 'Making food using light', 'Carrying oxygen'],
            explain: 'The tail lets the sperm cell swim, a specialisation for movement.'
          }),
          rng => C(rng, {
            prompt: 'Cells in a potato are packed with starch. What are they specialised for?',
            right: 'Storage of food', wrong: ['Movement', 'Carrying messages', 'Photosynthesis'],
            explain: 'Potato cells store food, as starch, for the plant to use later.'
          }),
          rng => C(rng, {
            prompt: 'A nerve cell is very long and thin. What is it specialised for?',
            right: 'Carrying signals around the body', wrong: ['Storing water', 'Photosynthesis', 'Making the body move by itself'],
            explain: 'Its length lets it carry signals over long distances in the body.'
          }),
          rng => C(rng, {
            prompt: 'Root hair cells have a long thin extension into the soil. What does this help with?',
            right: 'Absorbing water from the soil', wrong: ['Photosynthesis', 'Anchoring the leaves', 'Making seeds'],
            explain: 'The extension gives a large surface for taking in water from the soil.'
          })
        ]
      },

      // 7 · History of cells.
      {
        name: 'Discovering cells', learn: 'history',
        items: [
          rng => C(rng, {
            prompt: 'Who first observed and named cells, looking at thin slices of cork through a microscope?',
            right: 'Robert Hooke', wrong: ['Antonie van Leeuwenhoek', 'Charles Darwin', 'Jean-Baptiste Lamarck'],
            explain: 'Robert Hooke described the tiny compartments he saw in cork and called them cells.'
          }),
          rng => C(rng, {
            prompt: 'What did Antonie van Leeuwenhoek do?',
            right: 'Built powerful microscopes and was among the first to see microorganisms',
            wrong: ['Invented the telescope', 'Proposed the theory of natural selection', 'First named the parts of a flower'],
            explain: 'Van Leeuwenhoek’s microscopes let him see living single-celled organisms for the first time, building on Hooke’s work.'
          }),
          rng => C(rng, {
            prompt: 'Why did the invention of the microscope lead to major advances in biology?',
            right: 'It let scientists see cells, which are too small to see with the naked eye.',
            wrong: ['It made cells bigger.', 'It let scientists see inside the Earth.', 'It proved that animals do not have cells.'],
            explain: 'Cells are too small to see unaided, so the microscope opened up a whole new level of living things.'
          })
        ]
      },

      // 8 · Single-celled or multicellular?
      {
        name: 'Single-celled or many cells?', learn: 'micro',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each organism single-celled or made of many cells?',
          bins: ['Single-celled', 'Many cells'],
          items: [
            { text: 'Bacteria', bin: 0 }, { text: 'Yeast (a fungus)', bin: 0 }, { text: 'Some pond algae', bin: 0 },
            { text: 'A mushroom', bin: 1 }, { text: 'Kelp (a large seaweed)', bin: 1 }, { text: 'A human', bin: 1 },
            { text: 'A pōhutukawa tree', bin: 1 }, { text: 'A wētā', bin: 1 }
          ],
          pick: 6,
          explain: 'Microorganisms are single-celled: bacteria, and some fungi and algae. Mushrooms and kelp are a fungus and an alga too, but made of many cells.'
        })]
      },

      // 9 · Patterns in cell structures.
      {
        name: 'Patterns in cells', learn: 'compare',
        items: [
          rng => C(rng, {
            prompt: 'Cells from a leaf contain chloroplasts, but cells from an onion bulb do not. Which is the best explanation?',
            right: 'The bulb grows underground in the dark, so its cells do not photosynthesise.',
            wrong: ['Onions are not plants.', 'Onion cells are too small for chloroplasts.', 'The chloroplasts fall out when the onion is cut.'],
            explain: 'Chloroplasts are where photosynthesis happens, which needs light. Cells that get no light have no need for them.'
          }),
          rng => C(rng, {
            prompt: 'Under a microscope, a sample of cells all have cell walls and a large vacuole. What kind of organism did they come from?',
            right: 'A plant', wrong: ['An animal', 'A human', 'A wētā'],
            explain: 'Cell walls and a large permanent vacuole are features of plant cells.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'cell',
        items: [
          rng => TF(rng, { statement: 'Cells are the basic unit that all living things are made of.', answer: true,
            explain: 'Cells are the fundamental unit of organisms.' }),
          rng => TF(rng, { learn: 'compare', statement: 'Animal cells have a cell wall.', answer: false,
            explain: 'Only plant cells (and fungi and bacteria) have a cell wall. Animal cells have just a membrane.' }),
          rng => TF(rng, { learn: 'special', statement: 'All the cells in a multicellular organism are exactly the same.', answer: false,
            explain: 'Cells are specialised for different functions, so they differ in shape and contents.' }),
          rng => TF(rng, { learn: 'micro', statement: 'Bacteria are single-celled organisms.', answer: true,
            explain: 'Bacteria are microorganisms: each one is a single cell.' }),
          rng => TF(rng, { statement: 'The structures inside a cell that carry out functions are called organelles.', answer: true,
            explain: 'The nucleus, chloroplasts and vacuole are examples of organelles.' }),
          rng => TF(rng, { statement: "Plant cells have chloroplasts, where photosynthesis happens.", answer: true, learn: 'jobs',
            explain: "Chloroplasts use light to make food." }),
          rng => TF(rng, { statement: "The nucleus controls the cell’s activities.", answer: true, learn: 'jobs',
            explain: "It is the control centre of the cell." }),
          rng => TF(rng, { statement: "The cell wall controls what enters and leaves the cell.", answer: false, learn: 'jobs',
            explain: "That is the cell membrane. The cell wall supports and strengthens a plant cell." }),
          rng => TF(rng, { statement: "Animal cells have a cell membrane.", answer: true, learn: 'compare',
            explain: "Both plant and animal cells have a nucleus, cytoplasm and a cell membrane." }),
          rng => TF(rng, { statement: "Onion bulb cells contain chloroplasts.", answer: false, learn: 'compare',
            explain: "The bulb grows in the dark, so its cells have no chloroplasts." }),
          rng => TF(rng, { statement: "A tissue is a group of similar cells working together.", answer: true, learn: 'levels',
            explain: "Cells of the same kind group together to form a tissue." }),
          rng => TF(rng, { statement: "An organ is made of several tissues.", answer: true, learn: 'levels',
            explain: "Tissues make up organs, which work together in organ systems." }),
          rng => TF(rng, { statement: "A nerve cell is long and thin, which suits carrying signals.", answer: true, learn: 'special',
            explain: "Its length lets it carry signals over long distances in the body." }),
          rng => TF(rng, { statement: "Robert Hooke named cells after looking at thin slices of cork.", answer: true, learn: 'history',
            explain: "He saw tiny compartments and called them cells." }),
          rng => TF(rng, { statement: "Most cells can easily be seen without a microscope.", answer: false, learn: 'cell',
            explain: "Most cells are far too small to see without a microscope." }),
          rng => TF(rng, { statement: "Yeast is a single-celled organism.", answer: true, learn: 'micro',
            explain: "Yeast is a fungus made of a single cell." })
        ]
      }
    ]
  });


  // ═══ 7.7 Organisms in an ecosystem ════════════════════════════════════════
  // Knowledge: Organisms in an ecosystem (p. 22). Population; community;
  // ecosystem, with biotic and abiotic components.
  // Practices: pattern seeking from food webs, abundance of organism roles;
  // interdependence in a local ecosystem.

  // Two New Zealand food webs. Arrows run from food to eater.
  const WEBS = {
    forest: {
      title: 'a New Zealand forest',
      nodes: {
        tawa:   { label: 'Tawa', x: 0.24, y: 0.88, role: 'producer' },
        mahoe:  { label: 'Māhoe', x: 0.70, y: 0.88, role: 'producer' },
        kereru: { label: 'Kererū', x: 0.12, y: 0.52 },
        rat:    { label: 'Ship rat', x: 0.44, y: 0.52 },
        weta:   { label: 'Tree wētā', x: 0.80, y: 0.52 },
        stoat:  { label: 'Stoat', x: 0.26, y: 0.13 },
        ruru:   { label: 'Ruru', x: 0.70, y: 0.13 }
      },
      links: [['tawa', 'kereru'], ['tawa', 'rat'], ['mahoe', 'weta'], ['weta', 'rat'], ['weta', 'ruru'],
              ['rat', 'stoat'], ['rat', 'ruru'], ['kereru', 'stoat']]
    },
    shore: {
      title: 'a rocky shore',
      nodes: {
        seaweed: { label: 'Seaweed', x: 0.22, y: 0.9, role: 'producer' },
        plankton: { label: 'Phytoplankton', x: 0.72, y: 0.9, role: 'producer' },
        limpet:  { label: 'Limpet', x: 0.08, y: 0.58 },
        kina:    { label: 'Kina', x: 0.32, y: 0.58 },
        mussel:  { label: 'Mussel', x: 0.6, y: 0.58 },
        barnacle: { label: 'Barnacle', x: 0.87, y: 0.58 },
        whelk:   { label: 'Whelk', x: 0.72, y: 0.3 },
        crab:    { label: 'Crab', x: 0.92, y: 0.3 },
        snapper: { label: 'Snapper', x: 0.38, y: 0.1 },
        oyster:  { label: 'Oystercatcher', x: 0.17, y: 0.22 }
      },
      links: [['seaweed', 'limpet'], ['seaweed', 'kina'], ['plankton', 'mussel'], ['plankton', 'barnacle'],
              ['mussel', 'whelk'], ['barnacle', 'whelk'], ['mussel', 'oyster'], ['limpet', 'oyster'],
              ['barnacle', 'crab'], ['kina', 'snapper'], ['crab', 'snapper']]
    }
  };
  const eats = (w, id) => w.links.filter(([, e]) => e === id).map(([f]) => f);
  const eatenBy = (w, id) => w.links.filter(([f]) => f === id).map(([, e]) => e);
  const lab = (w, id) => w.nodes[id].label;
  const webDiagram = w => ({ diagram: { w: 340, h: 230, caption: 'Arrows point from the food to the organism that eats it.' },
                             draw: d => SciDia.web(d, w) });

  Sci.topic({
    id: 's7e7', unit: 'y7',
    title: 'Organisms in an Ecosystem',
    blurb: 'Populations, communities and ecosystems, and reading the food webs that connect them.',
    hint: 'A population is one kind of organism in one place; a community is all the populations living there together; ' +
          'an ecosystem is the community plus its non-living surroundings. In a food web, each arrow points from the food to the eater.',

    learn: [
      {
        id: 'levels', title: 'Population, community, ecosystem',
        diagram: { w: 260, h: 150 },
        draw(d) { SciDia.nested(d, ['Ecosystem', 'Community', 'Population']); },
        text: '<ul><li><strong>Population:</strong> one kind of organism in one place, such as all the kererū in a patch of bush.</li>' +
              '<li><strong>Community:</strong> all the populations living there together.</li>' +
              '<li><strong>Ecosystem:</strong> the community plus its non-living surroundings.</li></ul>'
      },
      {
        id: 'biotic', title: 'Biotic and abiotic',
        text: Sci.table(['Biotic (living)', 'Abiotic (non-living)'], [['Plants, such as tree ferns', 'Sunlight'], ['Animals, such as wētā', 'Water, rainfall'],
                ['Fungi', 'Temperature, wind'], ['Bacteria', 'Rocks, soil, air']])
      },
      {
        id: 'web', title: 'Reading a food web', wide: true,
        ...webDiagram(WEBS.forest),
        text: '<p>Each arrow points from the <strong>food</strong> to the organism that <strong>eats</strong> it: the way energy moves.</p>' +
              '<p>What does it eat? Follow the arrows <strong>into</strong> it. What eats it? Follow the arrows <strong>out of</strong> it. Ship rats eat tawa fruit and tree wētā, and are eaten by stoats and ruru.</p>'
      },
      {
        id: 'producers', title: 'Producers and consumers',
        text: '<p><strong>Producers</strong> make their own food using sunlight. No arrows point into them, and every food web starts with them.</p>' +
              '<p><strong>Consumers</strong> eat other organisms: every one that has an arrow pointing in.</p>'
      },
      {
        id: 'abundance', title: 'Fewer at the top',
        text: '<p>Only part of the energy passes on at each step up a food web, so each level supports fewer organisms. There are far more producers than top predators.</p>'
      },
      {
        id: 'removed', title: 'If one disappears',
        text: '<p>Remove a predator, and the animals it ate usually <strong>increase</strong>, since fewer are being eaten.</p>' +
              '<p>Real ecosystems are tangled, so think about every arrow in and out.</p>'
      },
      {
        id: 'depend', title: 'Depending on each other',
        text: '<p>Organisms are <strong>interdependent</strong>:</p>' +
              '<ul><li>Tūī and korimako carry pollen for native flowers, and feed on their nectar.</li>' +
              '<li>Kererū swallow tawa fruit and spread its seeds.</li>' +
              '<li>Tree wētā shelter in holes in tree trunks.</li></ul>'
      }
    ],

    examples: [
      {
        title: 'Example 1: population, community, ecosystem',
        steps: [
          '<strong>Population:</strong> all the kererū living in one patch of forest.',
          '<strong>Community:</strong> all the populations in that forest together: kererū, tawa, wētā, fungi, and so on.',
          '<strong>Ecosystem:</strong> the community interacting with the biotic (living) and abiotic (non-living) parts of its environment: water, soil, air, light.'
        ]
      },
      {
        title: 'Example 2: reading a food web',
        ...webDiagram(WEBS.forest),
        steps: [
          'Each arrow points from the food to the organism that eats it, which is the way energy moves.',
          'Tawa and māhoe are the producers: nothing points into them.',
          'Ship rats eat tawa fruit and tree wētā, and are eaten by stoats and ruru.',
          'Every organism depends on others: that is interdependence.'
        ]
      }
    ],

    slots: [
      // 1 · Match the terms.
      {
        name: 'Population, community, ecosystem', learn: 'levels',
        items: [rng => {
          const rows = [
            ['Population', 'A group of the same type of organism living in the same place at the same time'],
            ['Community', 'All the different populations living in the same place and interacting'],
            ['Ecosystem', 'A community interacting with the living and non-living parts of its environment']
          ];
          const order = rng.shuffle([0, 1, 2]);
          return {
            prompt: 'Match each term to its meaning.',
            input: { kind: 'match', left: rows.map(r => r[0]), right: order.map(i => rows[i][1]),
                     tags: ['A', 'B', 'C'], answer: [0, 1, 2].map(i => order.indexOf(i)) },
            explain: 'Each term includes the one before it: a community is made of populations, and an ecosystem includes the community.'
          };
        }, Sci.gen(rng => {
          // The same terms, matched to examples from the "Which term fits?" bank.
          const ex = [
            rng.pick(['All the tuatara living on Takapourewa (Stephens Island)', 'All the kina on one reef']),
            rng.pick(['Every plant, animal and fungus living in a patch of bush', 'All the seaweeds, crabs, fish and snails in a rock pool']),
            rng.pick(['A rock pool: its seaweeds, crabs and snails, together with the water, rocks and sunlight', 'A wetland, including its plants and birds, the water, the mud and the weather'])
          ];
          const order = rng.shuffle([0, 1, 2]);
          return {
            prompt: 'Match each term to an example.',
            input: { kind: 'match', left: ['Population', 'Community', 'Ecosystem'], right: order.map(i => ex[i]),
                     tags: ['A', 'B', 'C'], answer: [0, 1, 2].map(i => order.indexOf(i)) },
            explain: 'One kind of organism is a population; many kinds living together are a community; add the non-living surroundings and it is an ecosystem.'
          };
        })]
      },

      // 2 · Which is it?
      {
        name: 'Which term fits?', learn: 'levels',
        items: [
          ['All the tuatara living on Takapourewa (Stephens Island)', 0],
          ['All the kina on one reef', 0],
          ['Every plant, animal and fungus living in a patch of bush', 1],
          ['All the seaweeds, crabs, fish and snails in a rock pool', 1],
          ['A rock pool: its seaweeds, crabs and snails, together with the water, rocks and sunlight', 2],
          ['A wetland, including its plants and birds, the water, the mud and the weather', 2]
        ].map(([text, k]) => rng => ({
          prompt: `<em>${text}.</em> Is this a population, a community or an ecosystem?`,
          input: { kind: 'choice', options: ['Population', 'Community', 'Ecosystem'].map((o, i) => ({ html: o, right: i === k })), correct: k },
          explain: ['One type of organism in one place: a population.',
                    'Many types of organisms living together: a community.',
                    'Living things together with their non-living surroundings: an ecosystem.'][k]
        }))
      },

      // 3 · Biotic or abiotic.
      {
        name: 'Biotic or abiotic?', learn: 'biotic',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each part of a forest ecosystem biotic (living) or abiotic (non-living)?',
          bins: ['Biotic', 'Abiotic'],
          items: [
            { text: 'Kererū', bin: 0 }, { text: 'Fungi growing on a log', bin: 0 }, { text: 'Bacteria in the soil', bin: 0 },
            { text: 'A tree fern', bin: 0 }, { text: 'Tree wētā', bin: 0 },
            { text: 'Rainfall', bin: 1 }, { text: 'Temperature', bin: 1 }, { text: 'Sunlight', bin: 1 },
            { text: 'Wind', bin: 1 }, { text: 'Rocks', bin: 1 }
          ],
          pick: 6,
          explain: 'Biotic components are living organisms. Abiotic components are the non-living parts: water, air, land, light, temperature.'
        })]
      },

      // 4 · What does it eat?
      {
        name: 'What does it eat?', learn: 'web',
        items: Object.values(WEBS).map(w => rng => {
          const eaters = Object.keys(w.nodes).filter(id => eats(w, id).length > 0);
          const id = rng.pick(eaters);
          const food = rng.pick(eats(w, id));
          const notFood = Object.keys(w.nodes).filter(x => x !== id && !eats(w, id).includes(x));
          return C(rng, {
            prompt: `In this food web from ${w.title}, which of these does the <strong>${lab(w, id).toLowerCase()}</strong> eat?`,
            ...webDiagram(w),
            right: lab(w, food), wrong: rng.sample(notFood, 3).map(x => lab(w, x)), wide: false,
            explain: `Follow the arrows that point into ${lab(w, id).toLowerCase()}: it eats ${eats(w, id).map(x => lab(w, x).toLowerCase()).join(' and ')}.`
          });
        })
      },

      // 5 · What eats it?
      {
        name: 'What eats it?', learn: 'web',
        items: Object.values(WEBS).map(w => rng => {
          const prey = Object.keys(w.nodes).filter(id => eatenBy(w, id).length > 0);
          const id = rng.pick(prey);
          const eater = rng.pick(eatenBy(w, id));
          const notEater = Object.keys(w.nodes).filter(x => x !== id && !eatenBy(w, id).includes(x));
          return C(rng, {
            prompt: `In this food web from ${w.title}, which of these eats the <strong>${lab(w, id).toLowerCase()}</strong>?`,
            ...webDiagram(w),
            right: lab(w, eater), wrong: rng.sample(notEater, 3).map(x => lab(w, x)), wide: false,
            explain: `Follow the arrows that leave ${lab(w, id).toLowerCase()}: it is eaten by ${eatenBy(w, id).map(x => lab(w, x).toLowerCase()).join(' and ')}.`
          });
        })
      },

      // 6 · Count the producers.
      {
        name: 'Counting producers and consumers', learn: 'producers',
        items: Object.values(WEBS).map(w => rng => {
          const askProducers = rng.chance();
          const producers = Object.values(w.nodes).filter(n => n.role === 'producer').length;
          const consumers = Object.keys(w.nodes).length - producers;
          return {
            prompt: `How many <strong>${askProducers ? 'producers' : 'consumers'}</strong> are in this food web from ${w.title}?`,
            ...webDiagram(w),
            input: { kind: 'number', answer: askProducers ? producers : consumers, width: 70 },
            explain: askProducers
              ? `Producers make their own food, so no arrows point into them: there are ${producers}.`
              : `Every organism that eats something is a consumer: there are ${consumers}.`
          };
        })
      },

      // 7 · What happens if one is removed?
      {
        name: 'If one were removed', learn: 'removed',
        items: Object.values(WEBS).map(w => rng => {
          // Remove a predator and ask about an animal it eats: freed from one of
          // its predators, that population would most likely grow. Producers
          // are never asked about. Removing kererū, for instance, would not
          // help tawa, because kererū are what spread tawa seeds; the simple
          // food-web answer would be wrong there.
          const preyOf = id => eats(w, id).filter(x => w.nodes[x].role !== 'producer');
          const candidates = Object.keys(w.nodes).filter(id => preyOf(id).length > 0);
          const gone = rng.pick(candidates);
          const affected = rng.pick(preyOf(gone));
          return {
            prompt: `In ${w.title}, all the ${lab(w, gone).toLowerCase()}s are removed. What would most likely happen to the number of ${lab(w, affected).toLowerCase()}?`,
            ...webDiagram(w),
            input: {
              kind: 'choice',
              options: [{ html: 'It would increase', right: true }, { html: 'It would decrease', right: false }, { html: 'It would stay exactly the same', right: false }],
              correct: 0
            },
            explain: `The ${lab(w, gone).toLowerCase()} eats ${lab(w, affected).toLowerCase()}. With one of its consumers gone, more ${lab(w, affected).toLowerCase()} survive, so its numbers would most likely rise.`
          };
        })
      },

      // 8 · Patterns in abundance.
      {
        name: 'Patterns in food webs', learn: 'abundance',
        items: [
          rng => C(rng, {
            prompt: 'In most ecosystems there are far more producers than top predators. Which is the best explanation?',
            right: 'Each step up the food web passes on only part of the energy, so there is enough to support fewer and fewer organisms.',
            wrong: ['Predators are too large to fit in an ecosystem.', 'Producers reproduce only once in their lives.', 'Top predators do not need food.'],
            explain: 'Energy is lost at each step, so the higher up a food web, the fewer organisms it can support.'
          }),
          rng => C(rng, { learn: 'producers',
            prompt: 'Why does every food web start with producers?',
            right: 'Producers make their own food using sunlight, and every other organism depends on that food.',
            wrong: ['Producers are the biggest organisms.', 'Producers eat everything else.', 'It is just a convention for drawing food webs.'],
            explain: 'Producers bring energy into the ecosystem; consumers get theirs, directly or indirectly, from producers.'
          })
        ]
      },

      // 9 · Interdependence.
      {
        name: 'Depending on each other', learn: 'depend',
        items: [
          rng => C(rng, {
            prompt: 'Many native plants rely on birds such as tūī and bellbirds (korimako) to carry their pollen. What would most likely happen to these plants if the birds disappeared?',
            right: 'Fewer of their flowers would be pollinated, so fewer seeds would form.',
            wrong: ['Nothing, because plants do not need animals.', 'The plants would grow faster.', 'The plants would start producing their own pollinators.'],
            explain: 'This is interdependence: the plants depend on the birds for pollination, and the birds depend on the plants for nectar.'
          }),
          rng => C(rng, {
            prompt: 'Kererū eat the large fruit of trees such as tawa and drop the seeds elsewhere. Why does this matter for the forest?',
            right: 'It spreads tawa seeds to new places where young trees can grow.',
            wrong: ['It stops tawa from growing at all.', 'It means tawa no longer needs sunlight.', 'It does not matter to the forest.'],
            explain: 'Kererū are among the few birds big enough to swallow tawa fruit, so the trees depend on them to spread their seeds.'
          }),
          rng => C(rng, {
            prompt: 'Which shows an animal depending on a plant for shelter?',
            right: 'Tree wētā living in holes in tree trunks', wrong: ['A kina eating seaweed', 'A stoat eating a rat', 'Rain falling on a forest'],
            explain: 'Animals depend on plants for food, but also for shelter, as tree wētā do.'
          })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'levels',
        items: [
          rng => TF(rng, { statement: 'A community is made up of many different populations.', answer: true,
            explain: 'A community is all the populations living in the same place and interacting.' }),
          rng => TF(rng, { learn: 'biotic', statement: 'Sunlight and water are biotic parts of an ecosystem.', answer: false,
            explain: 'Biotic means living. Sunlight and water are abiotic: non-living.' }),
          rng => TF(rng, { learn: 'web', statement: 'In a food web, the arrows point from the food to the organism that eats it.', answer: true,
            explain: 'The arrows show the direction energy moves: from food to eater.' }),
          rng => TF(rng, { statement: 'A population can contain several different species.', answer: false,
            explain: 'A population is one type of organism. Several species living together form a community.' }),
          rng => TF(rng, { statement: "All the kererū in one forest form a population.", answer: true, learn: 'levels',
            explain: "A population is one kind of organism in one place." }),
          rng => TF(rng, { statement: "An ecosystem includes both living and non-living things.", answer: true, learn: 'levels',
            explain: "It is the community together with its non-living surroundings." }),
          rng => TF(rng, { statement: "A community includes the rocks and water in an area.", answer: false, learn: 'levels',
            explain: "A community is only the living populations. Adding the non-living parts makes an ecosystem." }),
          rng => TF(rng, { statement: "Temperature is an abiotic factor.", answer: true, learn: 'biotic',
            explain: "Abiotic means non-living: temperature, light, water, wind." }),
          rng => TF(rng, { statement: "Fungi are abiotic.", answer: false, learn: 'biotic',
            explain: "Fungi are living organisms, so they are biotic." }),
          rng => TF(rng, { statement: "Producers make their own food using sunlight.", answer: true, learn: 'producers',
            explain: "Every food web starts with them." }),
          rng => TF(rng, { statement: "Every food web starts with a consumer.", answer: false, learn: 'producers',
            explain: "Every food web starts with producers, which make their own food." }),
          rng => TF(rng, { statement: "An arrow in a food web shows the direction energy moves.", answer: true, learn: 'web',
            explain: "It points from the food to the organism that eats it." }),
          rng => TF(rng, { statement: "There are usually more top predators than producers in an ecosystem.", answer: false, learn: 'abundance',
            explain: "Only part of the energy passes on at each step, so there are far fewer top predators." }),
          rng => TF(rng, { statement: "All the energy in one organism passes on to the organism that eats it.", answer: false, learn: 'abundance',
            explain: "Only part of it passes on at each step up a food web." }),
          rng => TF(rng, { statement: "Tūī and some native flowering plants depend on each other.", answer: true, learn: 'depend',
            explain: "The birds get nectar; the plants get their pollen carried." }),
          rng => TF(rng, { statement: "If a predator is removed, the animals it ate usually become less common.", answer: false, learn: 'removed',
            explain: "With fewer of them being eaten, they usually become more common." })
        ]
      }
    ]
  });

})();
