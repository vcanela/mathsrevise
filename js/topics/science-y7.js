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
        name: 'Which state is shown?',
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
        name: 'Match the state to its description',
        items: [STATE_TEXT, STATE_PROPS].map(table => rng => {
          const left = ['Solid', 'Liquid', 'Gas'];
          const order = rng.shuffle([0, 1, 2]);
          const keys = ['solid', 'liquid', 'gas'];
          return {
            prompt: table === STATE_TEXT
              ? 'Match each state to how its particles behave.'
              : 'Match each state to how it behaves.',
            input: {
              kind: 'match', left,
              right: order.map(i => table[keys[i]]),
              tags: ['A', 'B', 'C'],
              answer: [0, 1, 2].map(i => order.indexOf(i))
            },
            explain: table === STATE_TEXT
              ? 'Solid: fixed and vibrating. Liquid: close but sliding. Gas: far apart and fast.'
              : 'Each property comes from the particles: fixed particles keep a shape, sliding ones flow, spread-out ones fill the space.'
          };
        })
      },

      // 3 · Label the six changes of state.
      {
        name: 'Label the changes of state',
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
        name: 'Name the everyday change',
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
        name: 'Thermal energy added or removed?',
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
        name: 'Spot the misconception',
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
            return Sci.spot(rng, {
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
          rng => Sci.spot(rng, {
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
          rng => Sci.spot(rng, {
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
          rng => Sci.spot(rng, {
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
        name: 'True or false',
        items: [
          rng => TF(rng, { statement: 'Ice floats on water because solid water is less dense than liquid water.', answer: true,
            explain: 'When water freezes, its particles form a fixed arrangement with gaps, which takes up more space, so ice is less dense.' }),
          rng => TF(rng, { statement: 'Most materials are denser as a solid than as a liquid.', answer: true,
            explain: 'For most substances, such as wax and iron, the particles pack more closely as a solid. Water is the unusual exception.' }),
          rng => TF(rng, { statement: 'When water freezes, its particles get bigger.', answer: false,
            explain: 'The particles stay the same size. They lock into an arrangement with gaps between them, which is why ice takes up more space.' }),
          rng => TF(rng, { statement: 'The particles in a liquid are far apart, like the particles in a gas.', answer: false,
            explain: 'Liquid particles are close together, held by attractive forces. Only in a gas are they far apart.' }),
          rng => TF(rng, { statement: 'The particles in a gas have only weak attractions between them.', answer: true,
            explain: 'The attractions are weak and the particles are far apart, which is why a gas spreads out to fill its container.' }),
          rng => TF(rng, { statement: 'Heating a substance makes its particles move faster.', answer: true,
            explain: 'Adding thermal energy speeds the particles up, until they can overcome the attractive forces holding them together.' }),
          rng => TF(rng, { statement: 'During a change of state, the particles turn into a different type of particle.', answer: false,
            explain: 'A change of state alters how the particles are arranged and how far apart they are, but not their size, shape or type.' }),
          rng => TF(rng, { statement: 'Water vapour can turn straight into ice without becoming a liquid first.', answer: true,
            explain: 'That is deposition, gas straight to solid, which is how frost forms.' }),
          rng => TF(rng, { statement: 'Everything around us is made of particles too small to see, even with an ordinary microscope.', answer: true,
            explain: 'All matter is made of sub-microscopic particles.' })
        ]
      },

      // 8 · Mass is conserved.
      {
        name: 'Mass during a change of state',
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
        name: 'Explain the everyday problem',
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
          rng => C(rng, {
            prompt: 'On a cold morning, the inside of a car’s windows is covered in tiny drops of water. Which is the best explanation?',
            right: 'Water vapour in the air inside the car loses thermal energy on the cold glass and condenses into liquid.',
            wrong: [
              'Rain has soaked through tiny holes in the glass overnight.',
              'The glass is so cold that it has started to melt.',
              'The cold glass turns air particles into water particles.'
            ],
            explain: 'This is condensation. The water was already in the air as a gas; the cold glass takes thermal energy from it.'
          }),
          rng => C(rng, {
            prompt: 'Why can a wet road become icy on a clear, cold night?',
            right: 'The water on the road loses thermal energy to the cold air until its particles settle into a fixed arrangement: it freezes.',
            wrong: [
              'The road gives thermal energy to the water, and that turns it solid.',
              'The water particles shrink in the cold and stick to the road.',
              'The water evaporates and leaves ice behind.'
            ],
            explain: 'Freezing happens when thermal energy is removed, not added.'
          }),
          rng => C(rng, {
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
        name: 'Variables in an investigation',
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
        name: 'Calculate speed in m/s',
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
        name: 'Calculate speed in km/h',
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
        name: 'What speed means',
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
          rng => C(rng, {
            prompt: 'Which calculation gives a speed?',
            right: m('\\text{distance} \\div \\text{time}'),
            wrong: [m('\\text{distance} \\times \\text{time}'), m('\\text{time} \\div \\text{distance}'), m('\\text{distance} + \\text{time}')],
            wide: false,
            explain: 'Speed is calculated by dividing the distance travelled by the time taken.'
          }),
          rng => C(rng, {
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
              explain: `Over the same distance, the shorter time means the faster speed: ${winner} took less time.`
            };
          }
        ]
      },

      // 4 · Read a speed off a distance–time graph.
      {
        name: 'Speed from a graph',
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
        name: 'Faster or slower on a graph',
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
        name: 'Reading a journey graph',
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
        name: 'Averaging repeat trials',
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
        name: 'Spot the mistake',
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
            return Sci.spot(rng, {
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
        name: 'Constant or changing speed?',
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
        name: 'Accurate and reliable measurements',
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

})();
