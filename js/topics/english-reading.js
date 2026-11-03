'use strict';
// ── Revision · English, Reading (Years 7–8) ─────────────────────────────────
// Phase 3 of English Years 0–10 (2025, in effect from 2026). Each exercise
// follows the knowledge and practices of one element or sub-element.
//
// The site practises what can be checked: word knowledge, grammar,
// punctuation, language features and close reading of short passages written
// for this site. Reading whole texts, writing them, and speaking are left to
// the classroom. Questions tagged Extension reach towards Year 9.
//
// Every example is written to have one defensible answer. Keep it that way
// when adding more: if a second option could be argued for, change it.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice, TF = Sci.tf;
  const EXT = 'Extension';
  const match = Sci.match;


  // ═══ R2 Language features ═══════════════════════════════════════════════
  // Reading › Comprehension › Text form, structure, style, and features
  // (Year 7 knowledge): allusion, repetition, rhetorical questions, hyperbole,
  // listing, cliché, contrast, puns. Year 8 Writing adds anecdote as a
  // rhetorical device. Practices: identifying language features and explaining
  // how they contribute to meaning and influence the audience (Year 7);
  // considering their effectiveness for the text's purpose (Year 8).
  // Extension: appeals to emotion, logic and credibility (Year 9 persuasive
  // texts), and conjunctive adverbs elsewhere.

  const FEATURES = {
    hyperbole: {
      name: 'hyperbole', learn: 'hyperbole', as: 'hyperbole',
      why: 'It is a deliberate exaggeration, not meant to be taken literally.',
      examples: [
        'The queue for the new bubble tea shop stretched all the way to Hamilton.',
        'This homework is going to take me until I am ninety.',
        'Tama’s grin was so wide it nearly ran off the sides of his face.',
        'Our maths teacher has about a thousand rules for using a ruler.',
        'By the time the bus came, we had grown long grey beards.',
        'My little brother complained about the trip roughly four million times.'
      ]
    },
    rhetorical: {
      name: 'rhetorical question', learn: 'rhetorical', as: 'a rhetorical question',
      why: 'It is a question asked for effect, not to get an answer.',
      examples: [
        'If we don’t protect our beaches, who will?',
        'Do we really want our children breathing smoky air?',
        'Isn’t it time we listened to young people?',
        'How many more trees must fall before we act?',
        'Why would anyone buy a plastic bottle when the water fountain is free?',
        'Who doesn’t love a long weekend?'
      ]
    },
    repetition: {
      name: 'repetition', learn: 'repetition', as: 'repetition',
      why: 'The same word or phrase is used again and again for emphasis.',
      examples: [
        'Every day she trained. Every day she failed. Every day she came back.',
        'We will not wait. We will not be silent. We will not give up.',
        'It was cold. It was dark. It was the longest night of the trip.',
        'We drove through rain. We drove through fog. We drove through the night.',
        'Again and again and again, the waves crashed against the sea wall.',
        'Practise, practise, practise: that is the only secret.'
      ]
    },
    listing: {
      name: 'listing', learn: 'listing', as: 'listing',
      why: 'It gives a series of items, one after another.',
      examples: [
        'Into the bag went sunscreen, a towel, two sandwiches, a torch, a map and a spare jersey.',
        'The beach was covered with bottle caps, fishing line, chip packets and broken jandals.',
        'The market sold fresh bread, kūmara, honey, flowers and handmade soap.',
        'By morning, tents, chairs, chilly bins, towels and a kayak lay scattered across the sand.',
        'She packed her gumboots, raincoat, hat, gloves and thermos for the tramp.',
        'The shelves held jars of buttons, beads, shells, seeds and old coins.'
      ]
    },
    contrast: {
      name: 'contrast', learn: 'contrast', as: 'contrast',
      why: 'It places opposite things side by side to highlight the difference.',
      examples: [
        'Outside, the storm roared; inside, the kitchen was warm and still.',
        'The old library was dusty and silent; the new one buzzes with noise and light.',
        'He spoke softly, but his words hit hard.',
        'At the start of the year Ana hid at the back; by the end, she led the debate team.',
        'The city never sleeps; the farm was asleep by eight.',
        'Her brother is loud and messy; she is quiet and neat.'
      ]
    },
    pun: {
      name: 'pun', learn: 'pun', as: 'a pun',
      why: 'It plays on a word with two meanings, or two words that sound alike.',
      examples: [
        'The bakery’s sign read: “We knead your business.”',
        'Why was the maths book sad? It had too many problems.',
        'The scarecrow won a prize for being outstanding in his field.',
        'The café’s coffee is always brew-tiful.',
        'I used to be a banker, but I lost interest.',
        'The fisherman’s new boat was reel-y impressive.'
      ]
    },
    allusion: {
      name: 'allusion', learn: 'allusion', as: 'an allusion',
      why: 'It refers to a well-known story, person or event without explaining it.',
      examples: [
        'Our tiny goalkeeper was David facing their Goliath.',
        'Our team’s Cinderella season ended at midnight in the semi-final.',
        'Like Māui slowing the sun, the coach somehow made the last minute last forever.',
        'Matiu is a real Sherlock Holmes when it comes to finding lost socks.',
        'She guarded her new phone the way Smaug guarded his gold.',
        'Opening the email, he felt like Harry Potter receiving his Hogwarts letter.'
      ]
    },
    cliche: {
      name: 'cliché', learn: 'cliche', as: 'a cliché',
      why: 'It is an overused saying that has lost its freshness.',
      examples: [
        'At the end of the day, it’s all about teamwork.',
        'Every cloud has a silver lining.',
        'Only time will tell if the new skate park is a success.',
        'Losing the game was a blessing in disguise.',
        'After the laptop crashed, we were back to square one.',
        'We reached the station in the nick of time.'
      ]
    }
  };
  const FKEYS = Object.keys(FEATURES);

  Sci.topic({
    id: 'er2', unit: 'reading',
    title: 'Language Features',
    blurb: 'The techniques writers use to shape meaning, and the effect each one has on a reader.',
    hint: 'Name the feature, quote where it is used, then explain its effect: what it makes the reader think, feel or do, ' +
          'and how that serves the writer’s purpose. Hyperbole exaggerates; a rhetorical question expects no answer; ' +
          'an allusion refers to something well known; a pun plays on a double meaning; a cliché is an overused saying.',

    learn: [
      { id: 'hyperbole', title: 'Hyperbole',
        text: '<p>Deliberate <strong>exaggeration</strong>, not meant literally.</p><p><em>“The queue stretched all the way to Hamilton.”</em></p><p>Effect: emphasis, humour or strong feeling.</p>' },
      { id: 'rhetorical', title: 'Rhetorical question',
        text: '<p>A question asked for <strong>effect</strong>, not to get an answer.</p><p><em>“If we don’t protect our beaches, who will?”</em></p><p>Effect: makes the reader think, or quietly agree.</p>' },
      { id: 'repetition', title: 'Repetition',
        text: '<p>Using the <strong>same word or phrase</strong> again and again.</p><p><em>“We will not wait. We will not be silent. We will not give up.”</em></p><p>Effect: rhythm and emphasis; it sticks in the mind.</p>' },
      { id: 'listing', title: 'Listing',
        text: '<p>A <strong>series of items</strong>, one after another.</p><p><em>“Bottle caps, fishing line, chip packets and broken jandals.”</em></p><p>Effect: shows how much there is, or builds up detail.</p>' },
      { id: 'contrast', title: 'Contrast',
        text: '<p>Placing <strong>opposites</strong> side by side.</p><p><em>“Outside, the storm roared; inside, the kitchen was warm and still.”</em></p><p>Effect: each side makes the other stand out more.</p>' },
      { id: 'pun', title: 'Pun',
        text: '<p>A play on a word with <strong>two meanings</strong>, or two words that sound alike.</p><p><em>“We knead your business.”</em> (knead / need)</p><p>Effect: humour; it catches attention.</p>' },
      { id: 'allusion', title: 'Allusion',
        text: '<p>A reference to a <strong>well-known</strong> story, person or event, without explaining it.</p><p><em>“Our tiny goalkeeper was David facing their Goliath.”</em></p><p>Effect: packs in extra meaning for readers who know the reference.</p>' },
      { id: 'cliche', title: 'Cliché',
        text: '<p>An <strong>overused</strong> saying that has lost its freshness.</p><p><em>“At the end of the day …”, “every cloud has a silver lining”</em></p><p>Effect: familiar, but flat. Good writers usually find a fresher way to say it.</p>' },
      { id: 'anecdote', title: 'Anecdote', years: '8',
        text: '<p>A <strong>short personal story</strong> used to make a point, often in persuasive writing.</p><p><em>“When I was nine, I watched my koro pull a plastic bag from a turtle’s mouth.”</em></p><p>Effect: makes an issue feel real and personal.</p>' },
      { id: 'effect', title: 'Explaining an effect', wide: true,
        text: '<ol class="learn-steps"><li><strong>Name</strong> the feature: “The writer uses hyperbole …”</li>' +
              '<li><strong>Quote</strong> it: “… ‘the queue stretched all the way to Hamilton’ …”</li>' +
              '<li><strong>Explain</strong> the effect on the reader: “… to show how long and frustrating the wait felt.”</li></ol>' +
              '<p>The same feature can have different effects in different texts, so always link it to the writer’s <strong>purpose</strong>: to inform, persuade or entertain.</p>' },
      { id: 'appeals', title: 'Extension: three appeals',
        text: '<p>Persuasive writers appeal to the audience in three ways:</p>' +
              Sci.table(['Appeal', 'Uses', 'Example'], [['<strong>Logos</strong>', 'logic and evidence', '“Ninety percent of beach rubbish is plastic.”'],
                ['<strong>Pathos</strong>', 'emotion', '“Imagine a turtle tangled in a bag.”'], ['<strong>Ethos</strong>', 'the speaker’s credibility', '“As a lifeguard for ten years, I …”']]) }
    ],

    examples: [
      {
        title: 'Example 1: naming a feature and explaining its effect',
        steps: [
          'The sentence: <em>“By the time the bus came, we had grown long grey beards.”</em>',
          '<strong>Name:</strong> nobody really grows a beard while waiting for a bus, so this is hyperbole.',
          '<strong>Effect:</strong> the exaggeration shows, with humour, how long and boring the wait felt.'
        ],
        result: 'Name it, quote it, explain its effect'
      },
      {
        title: 'Example 2: telling similar features apart',
        steps: [
          '<em>“Every cloud has a silver lining.”</em> An old, overused saying: a <strong>cliché</strong>.',
          '<em>“We knead your business.”</em> A double meaning (knead / need): a <strong>pun</strong>.',
          '<em>“Our goalkeeper was David facing their Goliath.”</em> A reference to a well-known story: an <strong>allusion</strong>.'
        ]
      }
    ],

    slots: [
      // 1 · Name the feature.
      {
        name: 'Name the feature', learn: 'effect',
        items: [Sci.gen(rng => {
          const k = rng.pick(FKEYS), f = FEATURES[k];
          return C(rng, {
            prompt: `<em>“${rng.pick(f.examples).replace(/^“|”$/g, '')}”</em> Which language feature is used here?`,
            right: f.name, wrong: rng.sample(FKEYS.filter(x => x !== k), 3).map(x => FEATURES[x].name), wide: false,
            learn: f.learn, explain: `This is ${f.as}. ${f.why}`
          });
        })]
      },

      // 2 · Match features to examples.
      {
        name: 'Match the features', learn: 'effect',
        items: [Sci.gen(rng => {
          const four = rng.sample(FKEYS, 4);
          return match(rng, 'Match each language feature to an example of it.',
            four.map(k => [FEATURES[k].name[0].toUpperCase() + FEATURES[k].name.slice(1), rng.pick(FEATURES[k].examples)]),
            'Look for the clue in each: exaggeration (hyperbole), a question for effect (rhetorical question), a repeated word (repetition), ' +
            'a run of items (listing), opposites (contrast), a double meaning (pun), a well-known reference (allusion), an overused saying (cliché).');
        })]
      },

      // 3 · Sort examples into features.
      {
        name: 'Sort the examples', learn: 'effect',
        items: [Sci.gen(rng => {
          const three = rng.sample(FKEYS, 3);
          const items = three.flatMap((k, b) => FEATURES[k].examples.map(text => ({ text, bin: b })));
          return Sci.sort(rng, {
            prompt: 'Which feature does each sentence use?',
            bins: three.map(k => FEATURES[k].name[0].toUpperCase() + FEATURES[k].name.slice(1)),
            items, pick: 6,
            explain: three.map(k => `${FEATURES[k].name[0].toUpperCase() + FEATURES[k].name.slice(1)}: ${FEATURES[k].why.toLowerCase()}`).join(' ')
          });
        })]
      },

      // 4 · Find the feature in a short passage.
      {
        name: 'Find it in a passage', learn: 'effect',
        items: [
          ['hyperbole', 2, ['The bus was late again this morning.', 'We waited at the stop with our bags.', 'By the time it came, we had grown long grey beards.', 'We got to school just before the bell.']],
          ['rhetorical question', 2, ['Our school creek used to be clean.', 'Now it is full of litter after every lunchtime.', 'Is this really how we want our creek to look?', 'The council has offered to help with a clean-up.']],
          ['contrast', 1, ['Mere opened the door to her nan’s house.', 'Outside, the wind howled; inside, everything was warm and quiet.', 'She hung her wet coat by the fire.', 'A pot of soup was waiting on the stove.']],
          ['listing', 1, ['The storm hit the campsite at midnight.', 'By morning, tents, chairs, chilly bins, towels and a kayak lay across the beach.', 'Nobody had been hurt.', 'We spent the day cleaning up.']],
          ['a pun', 1, ['A new café has opened near our school.', 'Its sign says: “Our coffee is always brew-tiful.”', 'Inside, the menu is short.', 'Most students go there for the hot chips.']],
          ['an allusion', 2, ['The final was tied with one minute left.', 'Our smallest player faced their tallest striker.', 'It was David against Goliath.', 'The whistle blew and the crowd went quiet.']],
          ['repetition', 1, ['The trip home took nine hours.', 'We drove through rain. We drove through fog. We drove through the night.', 'Dad sang along to the radio.', 'We finally arrived at two in the morning.']],
          ['a cliché', 1, ['The team had lost every game this season.', 'The coach told them, “At the end of the day, it’s all about trying your best.”', 'The players nodded.', 'Then they went back out to practise.']]
        ].map(([feat, at, lines]) => rng => Sci.spot(rng, {
          prompt: 'Read this short passage.',
          lines, wrong: at,
          cue: `Click the line that uses ${feat}.`,
          find: `uses ${feat}`,
          explain: 'The other lines simply tell what happened, without any special feature.'
        }))
      },

      // 5 · What is the effect?
      {
        name: 'What is the effect?', learn: 'effect',
        items: [
          rng => C(rng, { learn: 'hyperbole',
            prompt: '<em>“The queue for the new bubble tea shop stretched all the way to Hamilton.”</em> What is the main effect of the hyperbole?',
            right: 'It shows how long and frustrating the queue felt.', wrong: ['It tells the reader the exact length of the queue.', 'It compares the queue to a well-known story.', 'It asks the reader to answer a question.'],
            explain: 'Hyperbole is not meant literally; the exaggeration emphasises how the queue felt.' }),
          rng => C(rng, { learn: 'rhetorical',
            prompt: '<em>“If we don’t protect our beaches, who will?”</em> What is the main effect of this rhetorical question?',
            right: 'It makes readers feel responsible, because the obvious answer is “us”.', wrong: ['It asks for information the writer does not know.', 'It exaggerates how big the beaches are.', 'It adds humour with a double meaning.'],
            explain: 'The writer expects no reply. The answer is so obvious that the reader is drawn into agreeing.' }),
          rng => C(rng, { learn: 'repetition',
            prompt: '<em>“We will not wait. We will not be silent. We will not give up.”</em> What is the main effect of the repetition?',
            right: 'It builds a strong, determined rhythm that emphasises the speaker’s commitment.', wrong: ['It lists the items the speaker needs.', 'It makes the speech sound unsure.', 'It shows the speaker forgot what they had said.'],
            explain: 'Repeating “We will not” hammers the message home.' }),
          rng => C(rng, { learn: 'contrast',
            prompt: '<em>“Outside, the storm roared; inside, the kitchen was warm and still.”</em> What is the main effect of the contrast?',
            right: 'It makes the kitchen feel especially safe and calm next to the wild storm.', wrong: ['It shows the kitchen was damaged by the storm.', 'It exaggerates how loud the storm was.', 'It refers to a famous storm.'],
            explain: 'Placing opposites side by side makes each stand out more.' }),
          rng => C(rng, { learn: 'listing',
            prompt: '<em>“The beach was covered with bottle caps, fishing line, chip packets and broken jandals.”</em> What is the main effect of the listing?',
            right: 'It shows how much rubbish there was, making the problem feel big.', wrong: ['It makes the beach sound attractive.', 'It hides the problem from the reader.', 'It asks the reader a question.'],
            explain: 'Item after item builds up a picture of a lot of rubbish.' }),
          rng => C(rng, { learn: 'allusion',
            prompt: '<em>“Our team’s Cinderella season ended at midnight in the semi-final.”</em> What does the allusion suggest?',
            right: 'The team’s surprising success was magical but did not last, like Cinderella’s night at the ball.', wrong: ['The team played its semi-final at midnight.', 'The team had a player called Cinderella.', 'The team was unlucky all season.'],
            explain: 'The reference to the fairy tale packs a whole story into one word.' }),
          rng => C(rng, { learn: 'pun',
            prompt: 'A bakery’s sign says: <em>“We knead your business.”</em> Why does it work as a pun?',
            right: '“Knead” (what you do to dough) sounds like “need”, so it has two meanings at once.', wrong: ['It exaggerates how busy the bakery is.', 'It repeats the word “business”.', 'It refers to a famous baker.'],
            explain: 'The double meaning fits a bakery and makes the sign memorable.' }),
          rng => C(rng, { learn: 'cliche',
            prompt: '<em>“At the end of the day, it’s all about teamwork.”</em> What is the effect of the cliché?',
            right: 'It sounds familiar, but because it is so overused it adds little that is fresh or memorable.', wrong: ['It surprises the reader with a new idea.', 'It gives exact evidence for the point.', 'It creates a double meaning.'],
            explain: 'Clichés are easy to understand but usually weaken writing, because readers have heard them many times.' })
        ]
      },

      // 6 · Features and purpose.
      {
        name: 'Features for a purpose', learn: 'effect',
        items: [
          rng => C(rng, { learn: 'rhetorical',
            prompt: 'A student is writing to persuade classmates to use refillable bottles. Which sentence uses a rhetorical question?',
            right: 'Why would anyone buy a plastic bottle when the water fountain is free?',
            wrong: ['Refillable bottles are cheaper over a year.', 'Plastic bottles, cans, cups and wrappers fill our bins.', 'Our bins overflow with a mountain of plastic every single hour.'],
            explain: 'It is a question asked for effect: the expected answer is “nobody”, which supports the writer’s view.' }),
          rng => C(rng, { learn: 'hyperbole',
            prompt: 'A writer wants to make a story about a long car trip funny. Which sentence uses hyperbole?',
            right: 'My little brother complained about the trip roughly four million times.',
            wrong: ['The trip took nine hours.', 'We stopped in Taupō, Tūrangi and Waiouru.', 'Is there anything worse than a long car trip?'],
            explain: 'The huge, impossible number is hyperbole, used here for humour.' }),
          rng => C(rng, { learn: 'hyperbole',
            prompt: 'Which feature would be <strong>least</strong> suitable in a science report on water quality?',
            right: 'Hyperbole', wrong: ['A list of the tests carried out', 'Precise, technical words', 'Headings for each section'],
            explain: 'A report must be accurate. Deliberate exaggeration would make readers doubt the results.' }),
          rng => C(rng, { learn: 'repetition',
            prompt: 'Which closing line of a speech uses repetition to leave a strong final impression?',
            right: 'Our park. Our future. Our choice.',
            wrong: ['Thank you for listening to my speech today.', 'In conclusion, the park should stay open.', 'The park has trees, a playground and a pond.'],
            explain: 'Repeating “Our” three times gives the ending rhythm and makes it memorable.' }),
          rng => C(rng, { learn: 'contrast',
            prompt: 'Which sentence uses contrast to show how a character has changed?',
            right: 'At the start of the year Ana hid at the back; by the end, she led the debate team.',
            wrong: ['Ana joined the debate team in May.', 'Ana was shy, quiet, nervous and unsure.', 'Was Ana ever going to speak up?'],
            explain: 'Setting “hid at the back” against “led the debate team” shows the change sharply.' }),
          rng => C(rng, { learn: 'pun',
            prompt: 'A café owner wants a memorable sign. Which sign uses a pun?',
            right: 'There’s a latte love in every cup.',
            wrong: ['Fresh coffee, hot chocolate, tea and smoothies.', 'The best coffee in the whole universe.', 'Open seven days.'],
            explain: '“A latte love” sounds like “a lot of love”: a pun.' })
        ]
      },

      // 7 · Spot the misconception.
      {
        name: 'Spot the misconception', learn: 'effect',
        items: [
          rng => Sci.spot(rng, { learn: 'rhetorical', prompt: 'A student analyses a line from a speech.',
            lines: ['The writer asks, “Who wants to breathe dirty air?”', 'This is a rhetorical question.', 'The writer wants readers to write back with their answers.', 'It leads readers to agree that nobody wants dirty air.'],
            wrong: 2, explain: 'A rhetorical question expects no reply. Its effect is to make readers think, or agree.' }),
          rng => Sci.spot(rng, { learn: 'hyperbole', prompt: 'A student analyses a line from a story.',
            lines: ['The narrator says the bag “weighed more than a car”.', 'This is hyperbole.', 'It tells us the bag’s exact weight.', 'It shows how heavy and tiring the bag felt.'],
            wrong: 2, explain: 'Hyperbole is not meant literally. It exaggerates to show a feeling.' }),
          rng => Sci.spot(rng, { learn: 'cliche', prompt: 'A student analyses a saying in a story.',
            lines: ['“Every cloud has a silver lining” appears in the story.', 'This is a pun, because it has two meanings.', 'It is a very common, overused saying.', 'So it is an example of a cliché.'],
            wrong: 1, explain: 'There is no play on words here. It is a cliché: an overused saying.' }),
          rng => Sci.spot(rng, { learn: 'pun', prompt: 'A student analyses a sign.',
            lines: ['The sign says “We knead you” outside a bakery.', '“Knead” sounds like “need”.', 'This makes it an allusion.', 'The double meaning adds humour.'],
            wrong: 2, explain: 'A play on words with a double meaning is a pun. An allusion refers to a well-known story or person.' }),
          rng => Sci.spot(rng, { learn: 'listing', prompt: 'A student analyses a speech.',
            lines: ['The speech mentions “plastic bags, bottles, straws and wrappers”.', 'This is listing.', 'Listing always makes writing boring.', 'Here it shows how many kinds of rubbish there are.'],
            wrong: 2, explain: 'No feature always has the same effect. Here the list builds up how big the problem is.' }),
          rng => Sci.spot(rng, { learn: 'allusion', prompt: 'A student analyses a sports report.',
            lines: ['The report calls the goalkeeper “our David against their Goliath”.', 'This refers to a well-known story.', 'That makes it an allusion.', 'It means the goalkeeper is called David.'],
            wrong: 3, explain: 'The allusion suggests a small underdog facing a giant. It says nothing about the player’s name.' })
        ]
      },

      // 8 · True or false.
      {
        name: 'True or false', learn: 'effect',
        items: [
          rng => TF(rng, { statement: 'Hyperbole is meant to be taken literally.', answer: false, learn: 'hyperbole', explain: 'Hyperbole is deliberate exaggeration, not meant literally.' }),
          rng => TF(rng, { statement: 'A rhetorical question is asked for effect, not to get an answer.', answer: true, learn: 'rhetorical', explain: 'The writer expects no reply.' }),
          rng => TF(rng, { statement: 'An allusion refers to a well-known story, person or event.', answer: true, learn: 'allusion', explain: 'It does so without explaining the reference.' }),
          rng => TF(rng, { statement: 'A cliché is a fresh, original way of saying something.', answer: false, learn: 'cliche', explain: 'A cliché is the opposite: an overused saying.' }),
          rng => TF(rng, { statement: 'Contrast places opposite ideas side by side.', answer: true, learn: 'contrast', explain: 'Each side makes the other stand out more.' }),
          rng => TF(rng, { statement: 'A pun plays on a word with two meanings, or words that sound alike.', answer: true, learn: 'pun', explain: '“We knead your business” plays on knead and need.' }),
          rng => TF(rng, { statement: 'Listing can show how much there is of something.', answer: true, learn: 'listing', explain: 'Item after item builds up quantity or detail.' }),
          rng => TF(rng, { statement: 'Repetition can create rhythm and emphasis.', answer: true, learn: 'repetition', explain: 'Repeating a word or phrase makes it stick.' }),
          rng => TF(rng, { statement: 'A language feature always has exactly the same effect, whatever the text.', answer: false, explain: 'The effect depends on the text, its purpose and its audience.' }),
          rng => TF(rng, { statement: 'An anecdote is a short personal story used to make a point.', answer: true, learn: 'anecdote', explain: 'Persuasive writers use anecdotes to make an issue feel real.' }),
          rng => TF(rng, { statement: 'Writers choose language features to suit their purpose and audience.', answer: true, explain: 'A feature that works in a funny story may not suit a report.' }),
          rng => TF(rng, { statement: 'Hyperbole is always a mistake in good writing.', answer: false, learn: 'hyperbole', explain: 'It can add humour or emphasis, though it does not suit factual reports.' })
        ]
      },

      // 9 · Replace the cliché.
      {
        name: 'Fresher than a cliché', learn: 'cliche',
        items: [
          ['The test was a piece of cake.', 'I finished the test with twenty minutes to spare.', ['The test was as easy as pie.', 'The test was a walk in the park.', 'The test was a breeze.']],
          ['Only time will tell if the new skate park is a success.', 'By summer we will know whether the skate park is busy.', ['Time will tell whether the skate park works.', 'It’s anyone’s guess if the skate park will work.', 'The jury is still out on the skate park.']],
          ['She was as quiet as a mouse.', 'She slipped into the room so softly that nobody looked up.', ['She was as quiet as a church mouse.', 'She was as quiet as the grave.', 'You could have heard a pin drop.']],
          ['After the laptop crashed, we were back to square one.', 'After the laptop crashed, we had to rewrite all three pages.', ['After the laptop crashed, it was back to the drawing board.', 'After the laptop crashed, we started from scratch.', 'After the laptop crashed, we were back where we started.']],
          ['Missing the bus was a blessing in disguise.', 'Missing the bus meant Hemi was home when his sister fell off her bike.', ['Missing the bus turned out to be a silver lining.', 'Missing the bus was a lucky break in disguise.', 'Every cloud has a silver lining, and missing the bus was one.']],
          ['We reached the station in the nick of time.', 'We reached the platform just as the doors began to close.', ['We reached the station just in the nick of time.', 'We reached the station at the eleventh hour.', 'We reached the station without a moment to spare.']]
        ].map(([cliche, fresh, others]) => rng => C(rng, {
          prompt: `<em>“${cliche}”</em> Which version replaces the cliché with something fresher and more precise?`,
          right: fresh, wrong: others,
          explain: 'The fresh version gives a specific detail the reader can picture. The others swap one cliché for another.'
        }))
      },

      // 10 · Extension.
      {
        name: 'Extension: persuasion and beyond', learn: 'appeals',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'A speech says: <em>“Ninety percent of the rubbish on our beaches is plastic.”</em> Which appeal is this mainly using?',
            right: 'Logos: an appeal to logic and evidence', wrong: ['Pathos: an appeal to emotion', 'Ethos: an appeal to the speaker’s credibility', 'A pun'],
            explain: 'A statistic is evidence, so it appeals to logic.' }),
          rng => C(rng, { tag: EXT, prompt: '<em>“As a lifeguard for ten years, I have seen what rips can do.”</em> Which appeal is this mainly using?',
            right: 'Ethos: an appeal to the speaker’s credibility', wrong: ['Logos: an appeal to logic and evidence', 'Pathos: an appeal to emotion', 'A cliché'],
            explain: 'The speaker shows why we should trust them on this topic.' }),
          rng => C(rng, { tag: EXT, prompt: '<em>“Imagine a baby turtle, tangled in a plastic bag, slowly losing its fight.”</em> Which appeal is this mainly using?',
            right: 'Pathos: an appeal to emotion', wrong: ['Logos: an appeal to logic and evidence', 'Ethos: an appeal to the speaker’s credibility', 'An allusion'],
            explain: 'The image is designed to make the audience feel sad and want to act.' }),
          rng => C(rng, { tag: EXT, learn: 'anecdote', prompt: 'Why might a persuasive speaker open with an anecdote?',
            right: 'A short real story makes the issue personal and memorable.', wrong: ['It proves the argument with statistics.', 'It avoids taking a position.', 'It makes the speech shorter.'],
            explain: 'An anecdote draws the audience in before the reasons and evidence.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence combines hyperbole <strong>and</strong> contrast?',
            right: 'The classroom was a furnace; the library next door was the South Pole.', wrong: ['The classroom was a furnace.', 'The classroom was hot; the library was cool.', 'The classroom was very warm today.'],
            explain: '“Furnace” and “South Pole” exaggerate (hyperbole), and they are set against each other (contrast).' }),
          rng => C(rng, { tag: EXT, prompt: 'A persuasive writer wants a claim to sound as certain as possible. Which version does that?',
            right: 'This plan will cut litter.', wrong: ['This plan might cut litter.', 'This plan could cut litter.', 'This plan may possibly cut litter.'],
            explain: 'Words such as might, could and may soften a claim. “Will” sounds certain, which makes it more persuasive, but it must be backed by evidence.' })
        ]
      }
    ]
  });



  // ═══ R1 Word roots and origins ════════════════════════════════════════════
  // Reading › Comprehension › Vocabulary (Years 7–8): many English words come
  // from Anglo-Saxon, Latin and Greek; Greek and Latin roots and affixes (tele-,
  // bio-, auto-, pre-, sub-) help with unfamiliar words; strategies include
  // context, morphemes, word origins, glossaries and dictionaries; glossaries
  // and online dictionaries support kupu Māori in New Zealand texts.
  // Extension: everyday Anglo-Saxon words beside formal Latin ones.

  const ROOTS = [
    ['tele', 'far', 'Greek', 'telescope, telephone'], ['bio', 'life', 'Greek', 'biology, biography'], ['auto', 'self', 'Greek', 'autograph, automatic'],
    ['graph', 'write, draw', 'Greek', 'autograph, paragraph'], ['micro', 'small', 'Greek', 'microscope, microphone'], ['phon', 'sound', 'Greek', 'telephone, symphony'],
    ['geo', 'earth', 'Greek', 'geography, geology'], ['chron', 'time', 'Greek', 'chronological, synchronise'], ['therm', 'heat', 'Greek', 'thermometer, thermal'],
    ['scope', 'look at', 'Greek', 'microscope, periscope'], ['port', 'carry', 'Latin', 'transport, portable'], ['dict', 'say', 'Latin', 'predict, dictionary'],
    ['aqua', 'water', 'Latin', 'aquarium, aquatic'], ['struct', 'build', 'Latin', 'construct, structure'], ['rupt', 'break', 'Latin', 'erupt, interrupt'],
    ['vis', 'see', 'Latin', 'visible, vision'], ['aud', 'hear', 'Latin', 'audible, audience'], ['script', 'write', 'Latin', 'script, manuscript'],
    ['ject', 'throw', 'Latin', 'eject, project'], ['tract', 'pull', 'Latin', 'tractor, attract']
  ];
  const PREFIXES = [['pre-', 'before'], ['sub-', 'under'], ['inter-', 'between'], ['anti-', 'against'], ['trans-', 'across'], ['super-', 'above, beyond'],
                    ['mis-', 'wrongly'], ['re-', 'again'], ['semi-', 'half'], ['multi-', 'many'], ['uni-', 'one'], ['circum-', 'around']];
  const BUILT = [
    ['telescope', 'tele (far) + scope (look at)', 'an instrument for looking at faraway things', ['an instrument for hearing quiet sounds', 'a machine that writes by itself', 'a small picture of the Earth']],
    ['biography', 'bio (life) + graph (write)', 'a written account of someone’s life', ['a drawing of a plant', 'the study of rocks', 'a list of living things']],
    ['microscope', 'micro (small) + scope (look at)', 'an instrument for looking at very small things', ['a small telephone', 'a tiny written note', 'a machine for measuring heat']],
    ['submarine', 'sub (under) + marine (sea)', 'a vessel that travels under the sea', ['a fish that lives in rivers', 'a boat above the clouds', 'a sea that has dried up']],
    ['transport', 'trans (across) + port (carry)', 'to carry from one place to another', ['to stay in one place', 'to break into pieces', 'to speak loudly']],
    ['predict', 'pre (before) + dict (say)', 'to say what will happen before it happens', ['to speak after an event', 'to break a promise', 'to hear a sound']],
    ['thermometer', 'therm (heat) + meter (measure)', 'an instrument that measures temperature', ['a device that measures distance', 'a machine that writes', 'a book of words']],
    ['interrupt', 'inter (between) + rupt (break)', 'to break into the middle of something', ['to build something new', 'to carry across a river', 'to look closely']],
    ['audible', 'aud (hear) + ible (able to be)', 'able to be heard', ['able to be seen', 'able to be carried', 'unable to be broken']],
    ['chronological', 'chron (time) + logical', 'arranged in time order', ['arranged by size', 'arranged by colour', 'arranged at random']]
  ];
  const CONTEXT = [
    ['After the arduous climb, the trampers collapsed at the hut.', 'arduous', 'difficult and tiring', ['short and easy', 'cold and wet', 'quiet and peaceful']],
    ['The tiny, frail chick could barely lift its head.', 'frail', 'weak and delicate', ['loud and noisy', 'fat and healthy', 'brightly coloured']],
    ['Mere was elated when she heard she had won the scholarship.', 'elated', 'extremely happy', ['confused', 'disappointed', 'tired']],
    ['The river was so murky that we could not see the bottom.', 'murky', 'dark and cloudy', ['clear and shallow', 'fast and cold', 'warm and still']],
    ['The children were boisterous after the long morning inside.', 'boisterous', 'noisy and full of energy', ['sleepy and quiet', 'sad and lonely', 'careful and slow']],
    ['The old tōtara was colossal; five people could not reach around it.', 'colossal', 'extremely large', ['very old', 'quite small', 'easily broken']],
    ['He gave a terse reply and walked off without another word.', 'terse', 'short and unfriendly', ['long and detailed', 'warm and kind', 'loud and cheerful']],
    ['The ancient waka was fragile, so nobody was allowed to touch it.', 'fragile', 'easily broken', ['very heavy', 'brightly painted', 'recently made']]
  ];
  const KUPU = [['whānau', 'family'], ['kai', 'food'], ['mahi', 'work'], ['aroha', 'love, compassion'], ['whenua', 'land'], ['awa', 'river'],
                ['maunga', 'mountain'], ['moana', 'sea, ocean'], ['tamariki', 'children'], ['kaitiaki', 'guardian'], ['ako', 'learn, teach'], ['kōrero', 'talk, conversation']];

  Sci.topic({
    id: 'er1', unit: 'reading',
    title: 'Word Roots and Origins',
    blurb: 'Working out unfamiliar words from their parts, their history and their context.',
    hint: 'Break the word into parts. Greek and Latin roots carry meaning (tele = far, scope = look at, port = carry, dict = say), and prefixes change it ' +
          '(pre = before, sub = under, inter = between). Then check against the context of the sentence.',

    learn: [
      { id: 'roots', title: 'Greek and Latin roots', wide: true,
        text: Sci.table(['Root', 'Means', 'From', 'In'], ROOTS.slice(0, 12).map(([r, m, o, e]) => [`<strong>${r}</strong>`, m, o, e])) },
      { id: 'roots2', title: 'More roots', wide: true,
        text: Sci.table(['Root', 'Means', 'From', 'In'], ROOTS.slice(12).map(([r, m, o, e]) => [`<strong>${r}</strong>`, m, o, e])) },
      { id: 'prefixes', title: 'Prefixes',
        text: Sci.table(['Prefix', 'Means'], PREFIXES.map(([p, m]) => [`<strong>${p}</strong>`, m])) },
      { id: 'build', title: 'Working out a word',
        text: '<ol class="learn-steps"><li>Split it into parts: <em>tele + scope</em></li><li>Use what each part means: far + look at</li><li>Put it together: an instrument for looking at faraway things</li><li>Check it makes sense in the sentence</li></ol>' },
      { id: 'context', title: 'Using context',
        text: '<p>The words around an unfamiliar word often give clues.</p><p><em>After the <strong>arduous</strong> climb, the trampers collapsed.</em></p><p>They collapsed, so the climb must have been difficult and tiring.</p>' },
      { id: 'origins', title: 'Where English words come from',
        text: '<ul><li><strong>Anglo-Saxon</strong> (Old English): short everyday words like <em>house, eat, good, sun</em></li>' +
              '<li><strong>Latin</strong>: many longer, formal and academic words like <em>construct, visible, audience</em></li>' +
              '<li><strong>Greek</strong>: many science and technical words like <em>biology, thermometer, microscope</em></li></ul>' },
      { id: 'kupu', title: 'Kupu Māori in New Zealand texts',
        text: '<p>Many New Zealand texts use kupu Māori. A text’s <strong>glossary</strong> or an online dictionary helps with meaning and pronunciation.</p>' +
              Sci.table(['Kupu', 'Meaning'], KUPU.slice(0, 8)) },
      { id: 'register', title: 'Extension: everyday or formal?',
        text: '<p>English often has an everyday Anglo-Saxon word and a formal Latin one for the same idea:</p>' +
              Sci.table(['Everyday (Anglo-Saxon)', 'Formal (Latin)'], [['begin', 'commence'], ['ask', 'enquire'], ['help', 'assist'], ['end', 'terminate']]) +
              '<p>Formal writing often uses the Latin word; friendly writing the Anglo-Saxon one.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: working out “transport”',
        steps: ['Split it: <strong>trans</strong> + <strong>port</strong>.', 'Trans means across; port means carry.', 'So <em>transport</em> means to carry across, from one place to another.']
      },
      {
        title: 'Example 2: a word family',
        steps: ['<em>Visible, vision, visual, revise</em> all contain <strong>vis</strong>, meaning see.', 'Knowing one root unlocks a whole family of words.']
      }
    ],

    slots: [
      { name: 'Match roots to meanings', learn: 'roots',
        items: [Sci.gen(rng => {
          const four = rng.sample(ROOTS, 4);
          return Sci.match(rng, 'Match each root to its meaning.', four.map(([r, m]) => [r, m]),
            four.map(([r, m, , e]) => `${r} = ${m} (${e})`).join('; ') + '.');
        })] },
      { name: 'Prefix meanings', learn: 'prefixes',
        items: [Sci.gen(rng => {
          const [p, m] = rng.pick(PREFIXES);
          return C(rng, { prompt: `What does the prefix <strong>${p}</strong> mean?`, right: m,
            wrong: rng.sample(PREFIXES.filter(x => x[0] !== p).map(x => x[1]), 3), wide: false,
            explain: `${p} means “${m}”.` });
        })] },
      { name: 'Work out the meaning', learn: 'build',
        items: [Sci.gen(rng => {
          const [w, parts, right, wrong] = rng.pick(BUILT);
          return C(rng, { prompt: `<strong>${w}</strong> comes from <em>${parts}</em>. What does it mean?`, right, wrong,
            explain: `Put the parts together: ${parts} gives “${right}”.` });
        })] },
      { name: 'Same root', learn: 'roots2',
        items: [Sci.gen(rng => {
          const [r, m, , e] = rng.pick(ROOTS);
          const fam = e.split(', ')[0];
          const others = rng.sample(ROOTS.filter(x => x[0] !== r), 3).map(x => x[3].split(', ')[1]);
          return C(rng, { prompt: `Which word shares a root with <strong>${fam}</strong>, meaning “${m}”?`,
            right: e.split(', ')[1], wrong: others, wide: false,
            explain: `Both contain <strong>${r}</strong>, meaning ${m}: ${e}.` });
        })] },
      { name: 'Greek or Latin?', learn: 'origins',
        items: [rng => Sci.sort(rng, { prompt: 'Does each root come from Greek or Latin?', bins: ['Greek', 'Latin'],
          items: ROOTS.map(([r, m, o]) => ({ text: `${r} (${m})`, bin: o === 'Greek' ? 0 : 1 })), pick: 6,
          explain: 'Many science words use Greek roots (bio, geo, therm, micro); many everyday academic words use Latin roots (port, dict, vis, aud).' })] },
      { name: 'Meaning from context', learn: 'context',
        items: CONTEXT.map(([s, w, right, wrong]) => rng => C(rng, {
          prompt: `<em>${s.replace(w, `<strong>${w}</strong>`)}</em> What does <strong>${w}</strong> most likely mean?`, right, wrong,
          explain: 'The rest of the sentence gives the clue.' })) },
      { name: 'Build the word', learn: 'build',
        items: [Sci.gen(rng => {
          const [clue, ans, how] = rng.pick([
            ['able to be seen', 'visible', 'vis (see) + ible'], ['able to be heard', 'audible', 'aud (hear) + ible'],
            ['an instrument for measuring heat', 'thermometer', 'therm (heat) + meter (measure)'], ['the story of your own life, written by you', 'autobiography', 'auto (self) + bio (life) + graphy (writing)'],
            ['to carry across', 'transport', 'trans (across) + port'], ['to say beforehand', 'predict', 'pre (before) + dict (say)'],
            ['a tank for keeping water animals', 'aquarium', 'aqua (water) + rium (place)'], ['to pull towards', 'attract', 'at (towards) + tract (pull)']
          ]);
          return Sci.word(rng, { prompt: `Write the word that means <em>${clue}</em>.`, note: `Its parts: ${how}.`, answer: ans, explain: `<strong>${ans}</strong>: ${how}.` });
        })] },
      { name: 'Kupu Māori', learn: 'kupu',
        items: [Sci.gen(rng => {
          const four = rng.sample(KUPU, 4);
          return Sci.match(rng, 'Match each kupu Māori to its meaning.', four, 'A text glossary or an online dictionary such as Te Aka helps with the meaning and pronunciation of kupu Māori.');
        })] },
      { name: 'True or false', learn: 'origins',
        items: [
          rng => TF(rng, { statement: 'Many English words come from Latin and Greek.', answer: true, explain: 'Along with Anglo-Saxon, they are major sources of English vocabulary.' }),
          rng => TF(rng, { statement: 'Knowing the root “port” (carry) can help you understand “portable”.', answer: true, learn: 'roots2', explain: 'Portable: able to be carried.' }),
          rng => TF(rng, { statement: 'The context of a sentence never helps with an unfamiliar word.', answer: false, learn: 'context', explain: 'Surrounding words often give strong clues.' }),
          rng => TF(rng, { statement: '“Sub-” means “above”.', answer: false, learn: 'prefixes', explain: 'Sub- means under: submarine, subway.' }),
          rng => TF(rng, { statement: 'A glossary in a New Zealand text can help with the meaning of kupu Māori.', answer: true, learn: 'kupu', explain: 'So can an online dictionary.' }),
          rng => TF(rng, { statement: '“Geo” means earth, as in geography.', answer: true, learn: 'roots', explain: 'Geo = earth; graph = write: writing about the earth.' })
        ] },
      { name: 'Extension: everyday or formal?', learn: 'register',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which word is the formal, Latin-based partner of <strong>begin</strong>?', right: 'commence', wrong: ['start', 'go', 'kick off'], explain: '“Commence” comes from Latin; “begin” from Old English.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word is the everyday, Anglo-Saxon partner of <strong>assist</strong>?', right: 'help', wrong: ['facilitate', 'support', 'aid'], explain: 'Short everyday words often come from Old English.' }),
          rng => C(rng, { tag: EXT, prompt: 'A formal letter says: <em>Please enquire at reception.</em> What is the everyday version?', right: 'Please ask at reception.', wrong: ['Please commence at reception.', 'Please terminate at reception.', 'Please assist at reception.'], explain: '“Enquire” is the formal Latin-based word for “ask”.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why do science words often use Greek roots?', right: 'Scholars built new technical words from Greek parts.', wrong: ['Greek is easier to spell.', 'All English words are Greek.', 'Greek words are shorter.'], explain: 'Words like thermometer and microscope were made from Greek parts to name new things.' }),
          rng => C(rng, { tag: EXT, prompt: '“Chronic” shares a root with “chronological”. What might a chronic illness be?', right: 'One that lasts a long time', wrong: ['One that is very painful', 'One that is caught from animals', 'One that affects the skin'], explain: 'Chron = time: a chronic illness continues over a long time.' }),
          rng => C(rng, { tag: EXT, prompt: 'What does <strong>circumnavigate</strong> mean?', right: 'To sail all the way around', wrong: ['To sail under', 'To sail across once', 'To sail backwards'], explain: 'Circum = around; navigate = sail or steer.' })
        ] }
    ]
  });


  // ═══ R3 Text forms, purpose and audience ═══════════════════════════════════
  // Reading › Comprehension › Text form, structure, style, and features
  // (Years 7–8): the same topic in different forms; characterisation, setting
  // and plot; structural parts; features shaped by purpose and audience;
  // visual features (angles, shots, framing, contrast, symbolism, emanata);
  // texts that blend forms or purposes (Year 8); context shapes texts.
  // Extension: tropes (Year 9 Text Studies).

  Sci.topic({
    id: 'er3', unit: 'reading',
    title: 'Text Forms, Purpose and Audience',
    blurb: 'Why a text takes the form it does, and what its parts and features are doing.',
    hint: 'Ask what the text is for (inform, persuade, entertain) and who it is for. The form follows: a speech uses rhetorical questions and “we”; ' +
          'a news report a headline and the five Ws; a poem stanzas and imagery; a narrative characters, setting and plot.',

    learn: [
      { id: 'forms', title: 'Forms and their features', wide: true,
        text: Sci.table(['Form', 'Typical features'], [
          ['Speech', 'addresses the audience, rhetorical questions, inclusive “we”'], ['News article', 'headline, who/what/when/where/why first, quotes'],
          ['Poem', 'lines and stanzas, imagery, rhythm'], ['Narrative', 'characters, setting, plot, dialogue'],
          ['Instructions', 'numbered steps, commands (“Mix the flour”)'], ['Letter to the editor', 'a position, reasons, a sign-off']]) },
      { id: 'elements', title: 'Characterisation, setting, plot',
        text: '<ul><li><strong>Characterisation:</strong> how a writer shows what a character is like (actions, speech, thoughts)</li>' +
              '<li><strong>Setting:</strong> where and when</li><li><strong>Plot:</strong> the sequence of events</li></ul>' },
      { id: 'parts', title: 'Structural parts',
        text: Sci.table(['Form', 'Parts'], [['Novel', 'chapters'], ['Poem', 'stanzas (verses)'], ['Play or film', 'scenes, acts'], ['Report', 'sections with headings']]) +
              '<p>Each part contributes to the meaning of the whole.</p>' },
      { id: 'audience', title: 'Audience',
        text: '<p>The same information is written differently for different readers: simple words and short sentences for young children; technical words for experts; formal language for officials.</p>' },
      { id: 'visual', title: 'Visual features',
        text: Sci.table(['Feature', 'Effect'], [['Low-angle shot', 'makes the subject look powerful'], ['High-angle shot', 'makes the subject look small or weak'],
          ['Close-up', 'shows emotion and detail'], ['Framing', 'what is included or left out'], ['Symbolism', 'an object stands for an idea'],
          ['Emanata', 'lines or marks in comics showing emotion or movement']]) },
      { id: 'blend', title: 'Blended forms (Year 8)',
        text: '<p>Texts can combine forms or purposes: a <strong>poem that persuades</strong>, a <strong>historical novel</strong> (a story built on real events), a <strong>biography</strong> told like a story.</p>' },
      { id: 'tropes', title: 'Extension: tropes',
        text: '<p>A <strong>trope</strong> is a recurring feature of stories that readers recognise: the wise mentor, the chosen one, the journey home, good versus evil.</p>' +
              '<p>Writers use tropes to set expectations, then sometimes break them to surprise us.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: one topic, three forms',
        steps: ['<strong>Article:</strong> <em>Kākāpō numbers have more than tripled since the 1990s.</em> (to inform)',
                '<strong>Speech:</strong> <em>Will we be the generation that saved the kākāpō?</em> (to persuade)',
                '<strong>Poem:</strong> <em>Green as moss, heavy as night, / you wander where no wings take flight.</em> (to entertain and move)']
      },
      {
        title: 'Example 2: reading a visual feature',
        steps: ['A film shows the villain from a low angle, looming over the camera.', 'Low angles make a subject look powerful and threatening.',
                'The shot tells us how to feel about the character before anyone speaks.']
      }
    ],

    slots: [
      { name: 'Which form?', learn: 'forms',
        items: [
          ['Ladies and gentlemen, have you ever wondered what our town would look like without its river?', 'A speech'],
          ['FLOODWATERS RISE: Residents evacuated as river breaks its banks on Tuesday night', 'A news article'],
          ['1. Preheat the oven to 180 °C. 2. Mix the flour and butter.', 'Instructions'],
          ['The wind combs the tussock / and the mountain holds its breath', 'A poem'],
          ['Dear Editor, I am writing to object to the proposed closure of our library.', 'A letter to the editor'],
          ['Aroha pushed open the door of the old shed. Something inside was breathing.', 'A narrative']
        ].map(([extract, right]) => rng => C(rng, { prompt: `What form is this extract from? <em>${extract}</em>`, right,
          wrong: rng.sample(['A speech', 'A news article', 'Instructions', 'A poem', 'A letter to the editor', 'A narrative'].filter(x => x !== right), 3), wide: false,
          explain: 'Each form has features you can spot: an audience being addressed, a headline, numbered steps, line breaks, a sign-off, a story opening.' })) },
      { name: 'Features and forms', learn: 'forms',
        items: [Sci.gen(rng => {
          const rows = rng.sample([['Speech', 'Inclusive “we” and rhetorical questions'], ['News article', 'A headline and the five Ws'], ['Poem', 'Lines, stanzas and imagery'],
                                   ['Narrative', 'Characters, setting and plot'], ['Instructions', 'Numbered steps and commands'], ['Letter to the editor', 'A position, reasons and a sign-off']], 4);
          return Sci.match(rng, 'Match each form to its typical features.', rows, 'Form follows purpose: each set of features helps the text do its job.');
        })] },
      { name: 'Characterisation, setting or plot?', learn: 'elements',
        items: [rng => Sci.sort(rng, { prompt: 'Is each sentence mainly about characterisation, setting or plot?', bins: ['Characterisation', 'Setting', 'Plot'],
          items: [
            { text: 'Hemi always gave away his lunch, even when he was hungry.', bin: 0 }, { text: 'Mere bit her nails whenever she lied.', bin: 0 }, { text: '“I’m not scared,” Ana said, her voice shaking.', bin: 0 },
            { text: 'The lighthouse stood alone on a rocky point, battered by winter storms.', bin: 1 }, { text: 'It was 1953, and the town had no electricity yet.', bin: 1 }, { text: 'Mist hung over the swamp at dawn.', bin: 1 },
            { text: 'Then the bridge collapsed, cutting them off.', bin: 2 }, { text: 'After the storm, they set out to find the missing boat.', bin: 2 }, { text: 'Finally, the letter arrived.', bin: 2 }
          ], pick: 6,
          explain: 'Characterisation shows what someone is like; setting is where and when; plot is what happens.' })] },
      { name: 'Structural parts', learn: 'parts',
        items: [Sci.gen(rng => {
          const rows = rng.sample([['Novel', 'Chapters'], ['Poem', 'Stanzas'], ['Play', 'Acts and scenes'], ['Report', 'Sections with headings'], ['Speech', 'An opening, points and a conclusion']], 4);
          return Sci.match(rng, 'Match each form to the parts it is organised into.', rows, 'Structural parts help readers follow how the meaning builds.');
        })] },
      { name: 'Written for whom?', learn: 'audience',
        items: [
          ['Which version suits five-year-olds?', 'The kākāpō is a big green parrot. It cannot fly!', ['The kākāpō is a nocturnal, flightless psittaciform endemic to Aotearoa.', 'Population data indicate a recovery trajectory.', 'Kākāpō conservation requires predator management.']],
          ['Which version suits a scientific report?', 'Water samples were collected at three sites and tested for nitrate levels.', ['We got some water and it was gross.', 'The water was super dirty, eh.', 'Water is wet and sometimes dirty.']],
          ['Which version suits a sign for tourists?', 'Please keep to the track to protect nesting birds.', ['Nesting avifauna require minimal disturbance.', 'Stay on the track or else!', 'Birds nest here, which is a fact.']],
          ['Which version suits a club newsletter for members?', 'Great news: our team made the regional final! Come and cheer us on Saturday.', ['The team qualified.', 'A qualification event occurred.', 'Results are attached.']],
          ['Which version suits a formal invitation?', 'You are warmly invited to the opening of our new library on Friday 12 March.', ['Come to the library thing on Friday.', 'Library opening, Friday, be there.', 'Yo, new library, Friday!']],
          ['Which version suits a children’s quiz?', 'Which bird is New Zealand’s heaviest parrot?', ['Identify the heaviest extant psittacine in New Zealand.', 'State the mass of an adult kākāpō in kilograms.', 'Discuss the taxonomy of New Zealand parrots.']]
        ].map(([prompt, right, wrong]) => rng => C(rng, { prompt, right, wrong, explain: 'Writers choose words, sentence length and tone to suit their audience.' })) },
      { name: 'Visual features', learn: 'visual',
        items: [Sci.gen(rng => {
          const rows = rng.sample([['Low-angle shot', 'Makes the subject look powerful'], ['High-angle shot', 'Makes the subject look small or weak'], ['Close-up', 'Shows emotion and detail'],
                                   ['Framing', 'Decides what is included or left out'], ['Symbolism', 'An object stands for an idea'], ['Emanata', 'Marks in comics showing emotion or movement']], 4);
          return Sci.match(rng, 'Match each visual feature to its effect.', rows, 'Visual features shape how the audience reads an image, just as language features shape how they read words.');
        })] },
      { name: 'Year 8: blended forms', learn: 'blend',
        items: [
          rng => C(rng, { tag: 'Year 8', prompt: 'A novel follows a fictional girl through the real 1931 Napier earthquake. What blended form is this?', right: 'A historical novel', wrong: ['A biography', 'A news report', 'An instruction manual'], explain: 'It blends a made-up story with real historical events.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'A poem urges readers to stop dropping litter on the beach. What does it blend?', right: 'Poetry with a persuasive purpose', wrong: ['A report with a recipe', 'A play with a map', 'Nothing: all poems persuade'], explain: 'The form is poetry, but the purpose is to persuade.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'A book tells the true life of a famous athlete, using scenes and dialogue like a story. What is it?', right: 'A biography written in a narrative style', wrong: ['A fantasy novel', 'A dictionary', 'A news headline'], explain: 'It blends factual content with narrative techniques.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'A comic explains how volcanoes work, with characters asking questions. What does it blend?', right: 'An informative purpose with a comic form', wrong: ['A speech and a poem', 'A recipe and a letter', 'Two narratives'], explain: 'The content informs; the form entertains.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'An advert tells a short story about a family road trip in a new car. What is its main purpose?', right: 'To persuade', wrong: ['To inform', 'To instruct', 'To report news'], explain: 'It uses narrative to persuade people to buy the car.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'Why might a writer tell factual information as a story?', right: 'A story can make the facts more engaging and memorable.', wrong: ['Stories are always more accurate.', 'Facts cannot be written any other way.', 'To hide the facts.'], explain: 'Blending forms can help a text reach its audience.' })
        ] },
      { name: 'Same topic, different form', learn: 'forms',
        items: [
          ['The writer wants to persuade the council to save the local stream.', 'A speech at a council meeting', ['A recipe', 'A short story about a dragon', 'A shopping list']],
          ['The writer wants to share the facts about kākāpō with students.', 'An information report', ['A limerick', 'A letter of complaint', 'A comic strip about superheroes']],
          ['The writer wants readers to feel the beauty of the bush at dawn.', 'A poem', ['An instruction manual', 'A bus timetable', 'A news headline']],
          ['The writer wants to tell people what happened at a game on Saturday.', 'A match report', ['A poem about autumn', 'A recipe', 'A dictionary entry']],
          ['The writer wants readers to cook a hāngī safely.', 'Instructions', ['A sonnet', 'A persuasive speech', 'A myth']],
          ['The writer wants to entertain young children at bedtime.', 'A picture book story', ['A science report', 'A legal contract', 'A weather forecast']]
        ].map(([goal, right, wrong]) => rng => C(rng, { prompt: `${goal} Which form suits this best?`, right, wrong, explain: 'The purpose and audience decide the best form.' })) },
      { name: 'True or false', learn: 'forms',
        items: [
          rng => TF(rng, { statement: 'Texts on the same topic can be written in different forms.', answer: true, explain: 'An article, a poem and a speech can all be about kākāpō.' }),
          rng => TF(rng, { statement: 'A text’s purpose and audience shape its features.', answer: true, learn: 'audience', explain: 'They decide the words, structure and layout.' }),
          rng => TF(rng, { statement: 'Setting means the sequence of events in a story.', answer: false, learn: 'elements', explain: 'That is plot. Setting is where and when.' }),
          rng => TF(rng, { statement: 'A close-up shot can show a character’s emotion.', answer: true, learn: 'visual', explain: 'It brings the audience near the face.' }),
          rng => TF(rng, { statement: 'A text can have more than one purpose.', answer: true, learn: 'blend', explain: 'An advert might entertain in order to persuade.' }),
          rng => TF(rng, { statement: 'The time and place a text was written in has no effect on it.', answer: false, explain: 'Social, historical and cultural context influence what a text says and how.' })
        ] },
      { name: 'Extension: tropes', learn: 'tropes',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'An old, wise character guides a young hero and then disappears. Which trope is this?', right: 'The wise mentor', wrong: ['The unreliable narrator', 'The happy ending', 'The red herring'], explain: 'The mentor appears in countless stories, from myths to films.' }),
          rng => C(rng, { tag: EXT, prompt: 'An ordinary teenager discovers they alone can save the world. Which trope is this?', right: 'The chosen one', wrong: ['The wise mentor', 'The comic sidekick', 'The locked room'], explain: 'A familiar pattern in fantasy and adventure stories.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why do writers use tropes?', right: 'They set up expectations that readers recognise.', wrong: ['They are required in every story.', 'They make stories shorter.', 'They replace characters.'], explain: 'Writers can meet those expectations, or break them to surprise readers.' }),
          rng => C(rng, { tag: EXT, prompt: 'A story sets up the wise mentor, who then turns out to be the villain. What is the writer doing?', right: 'Subverting a trope to surprise the reader', wrong: ['Making a spelling mistake', 'Writing instructions', 'Using a cliché'], explain: 'Breaking a familiar pattern creates surprise.' }),
          rng => C(rng, { tag: EXT, prompt: 'A hero leaves home, faces trials, and returns changed. Which trope is this?', right: 'The journey (quest)', wrong: ['The love triangle', 'The ticking clock', 'The twin swap'], explain: 'The journey is one of the oldest story patterns.' }),
          rng => C(rng, { tag: EXT, prompt: 'Many cultures have stories of a trickster who outwits more powerful beings, such as Māui. What is this?', right: 'A trope found across cultures', wrong: ['A modern invention', 'A type of poem', 'A news genre'], explain: 'Tropes recur across times and cultures.' })
        ] }
    ]
  });

  // ═══ R4 Reading closely ════════════════════════════════════════════════════
  // Reading › Comprehension › Comprehension strategies (Years 7–8): monitor
  // understanding (annotating, rereading, reading ahead, questioning,
  // visualising); make inferences about settings, characters, themes and
  // ideas and justify them with explicit and implicit evidence; summarise key
  // ideas and themes; draw conclusions about the author’s purpose, message or
  // viewpoint. Passages are original, written for this site.
  // Extension: synthesising across two texts (Year 8 and beyond).

  // Each passage has a question of every kind, so a slot can draw any
  // passage and ask the same kind of question about it.
  const PASSAGES = [
    {
      title: 'Before the tide', kind: 'story',
      text: '<p>Koro was already on the rocks when Aroha arrived, his line out over the water. The sun had not cleared the hill yet, and the sea was the colour of pewter.</p>' +
            '<p>“You’re late,” he said, without turning. But he was smiling.</p>' +
            '<p>She watched him thread the bait. His fingers, which had once tied knots faster than she could follow, fumbled the hook twice. On the third try he gave up and held it out to her without a word.</p>' +
            '<p>Aroha took it. Her hands were steady. She baited the hook and passed it back, and neither of them said anything about it.</p>' +
            '<p>They fished until the tide turned. When they walked home, she carried the bucket.</p>',
      main: ['Aroha realises her koro is getting older, and begins quietly to look after him.', ['Aroha catches a lot of fish on a sunny morning.', 'Koro teaches Aroha to tie fishing knots.', 'Aroha is late and Koro is angry with her.']],
      infer: ['What can you infer about Koro from his hands fumbling the hook?', 'He is ageing, and finding small tasks harder than before.', ['He has never fished before.', 'He is angry with Aroha for being late.', 'The hook is broken.']],
      evidence: ['Which detail best shows that Aroha is taking on a caring role?', '“When they walked home, she carried the bucket.”', ['“The sea was the colour of pewter.”', '“You’re late,” he said, without turning.', '“They fished until the tide turned.”']],
      theme: ['Growing up and caring for those who once cared for us', ['The dangers of fishing at dawn', 'The importance of being on time', 'How to catch fish']],
      vocab: ['pewter', 'a dull grey metal', ['a bright blue stone', 'a kind of fish', 'a fishing net']],
      purpose: ['Why does the writer have neither character “say anything about it”?', 'To show that they both understand the change without needing to name it.', ['Because they are angry with each other.', 'Because fishing must be done in silence.', 'Because Koro cannot hear.']]
    },
    {
      title: 'The top platform', kind: 'story',
      text: '<p>The high ropes course looked easy from the ground. From the top platform, it looked like a very good way to die.</p>' +
            '<p>Liam gripped the pole. Below, the rest of the class were small, upturned faces. Someone shouted his name. His legs had stopped belonging to him.</p>' +
            '<p>“You don’t have to,” said the instructor quietly. “Plenty of people climb down.”</p>' +
            '<p>Liam thought about climbing down. It would be easy. Nobody would really mind.</p>' +
            '<p>He thought about it for a long time. Then he clipped on, looked at the far platform instead of the ground, and stepped out onto the wire.</p>',
      main: ['Liam is frightened at the top of the ropes course but chooses to keep going.', ['Liam falls from the high ropes course.', 'The instructor forces Liam to cross the wire.', 'Liam’s class refuses to watch him.']],
      infer: ['What does “His legs had stopped belonging to him” suggest?', 'He is so scared that he feels he cannot control his legs.', ['He has hurt his legs.', 'He is wearing someone else’s shoes.', 'He is very tired from climbing.']],
      evidence: ['Which line shows that crossing the wire was not compulsory?', '“You don’t have to,” said the instructor quietly.', ['“The high ropes course looked easy from the ground.”', '“Below, the rest of the class were small, upturned faces.”', '“Someone shouted his name.”']],
      theme: ['Courage means acting despite fear, not feeling no fear', ['Ropes courses are dangerous', 'Teachers should not let students climb', 'Heights are fun for everyone']],
      vocab: ['upturned', 'turned upwards', ['upset', 'turned upside down', 'unhappy']],
      purpose: ['Why does the writer say the course “looked like a very good way to die”?', 'To show, with humorous exaggeration, how much more frightening it feels from the top.', ['To warn readers that ropes courses kill people.', 'To prove the course is unsafe.', 'To describe the weather.']]
    },
    {
      title: 'Mrs Patel’s torch', kind: 'story',
      text: '<p>The power had been out for two hours when someone knocked. Mum opened the door, and there was Mrs Patel from next door, rain streaming off her coat, holding a torch and a thermos.</p>' +
            '<p>“I thought you might not have a torch,” she said. “And the soup was getting cold anyway.”</p>' +
            '<p>We had lived next to Mrs Patel for three years. Before that night, I could not have told you her first name.</p>' +
            '<p>By the time the lights came back, we knew it was Priya, that she had grown up in Fiji, and that her soup was the best thing I had ever eaten in the dark.</p>',
      main: ['A storm brings a family and their neighbour together for the first time.', ['A family runs out of food during a storm.', 'Mrs Patel complains about the noise.', 'The family moves to Fiji.']],
      infer: ['What can you infer about the family before the storm?', 'They had not really got to know their neighbour.', ['They were close friends with Mrs Patel.', 'They had no electricity at all.', 'They did not like soup.']],
      evidence: ['Which line best supports the idea that the family had not known Mrs Patel well?', '“Before that night, I could not have told you her first name.”', ['“The power had been out for two hours.”', '“Rain streaming off her coat”', '“The soup was getting cold anyway.”']],
      theme: ['Small acts of kindness can build community', ['Storms are dangerous', 'Soup is better than other food', 'Everyone should own a torch']],
      vocab: ['thermos', 'a container that keeps drinks hot or cold', ['a kind of soup', 'a raincoat', 'a type of torch']],
      purpose: ['Why might Mrs Patel say “the soup was getting cold anyway”?', 'To make her kindness seem casual, so the family does not feel they owe her.', ['To complain that her soup was ruined.', 'Because she did not want the soup.', 'To ask the family to heat it up.']]
    },
    {
      title: 'Bringing back the kākāpō', kind: 'report',
      text: '<p>The kākāpō is a flightless, nocturnal parrot found only in Aotearoa New Zealand. It is the heaviest parrot in the world, and one of the rarest.</p>' +
            '<p>Introduced predators such as stoats, cats and rats almost wiped it out. By the 1990s, fewer than 60 birds were left.</p>' +
            '<p>Since then, conservation workers have moved kākāpō to predator-free islands and fenced sanctuaries. Each bird has a name and wears a small transmitter, so rangers can track its health. Kākāpō breed only in years when rimu trees produce plenty of fruit, so rangers sometimes give the birds extra food to help.</p>' +
            '<p>The work has paid off. Today there are more than 200 kākāpō, though the species is still critically endangered.</p>',
      main: ['Careful conservation work has helped the endangered kākāpō recover, though it is still at risk.', ['Kākāpō are the best fliers among parrots.', 'Rats and stoats are useful for conservation.', 'Kākāpō are no longer endangered.']],
      infer: ['Why are kākāpō kept in places without predators?', 'Because introduced predators nearly wiped them out.', ['Because kākāpō prefer the sea air.', 'Because those places have more rimu trees than anywhere else.', 'Because they can fly between islands.']],
      evidence: ['Which sentence best supports the claim that the conservation work has succeeded?', '“Today there are more than 200 kākāpō.”', ['“The kākāpō is a flightless, nocturnal parrot.”', '“It is the heaviest parrot in the world.”', '“Each bird has a name.”']],
      theme: ['Human effort can help to save a species', ['Parrots make good pets', 'Islands are dangerous for birds', 'Rimu trees are the most important trees']],
      vocab: ['nocturnal', 'active at night', ['unable to fly', 'very heavy', 'found only in one place']],
      purpose: ['What is the writer’s main purpose?', 'To inform readers about the kākāpō and its recovery', ['To persuade readers to buy a parrot', 'To entertain with a made-up story', 'To give instructions for catching rats']]
    },
    {
      title: 'Our town needs a skate park', kind: 'opinion',
      text: '<p>Every afternoon, young people in our town skate in the supermarket car park. Every afternoon, they are moved on. Where are they supposed to go?</p>' +
            '<p>A skate park would give them a safe place to be active and to meet friends. Towns that have built one, such as our neighbours twenty minutes up the road, now have a place that is busy from after school until dark.</p>' +
            '<p>Some people worry that a skate park would attract trouble. But a park that is busy, well lit and close to the sports field is far safer than a car park full of moving cars.</p>' +
            '<p>Our young people are asking for somewhere to belong. Let’s give it to them.</p>',
      main: ['The town should build a skate park to give young people a safe place to go.', ['Skating in car parks is the best option.', 'Skate parks always attract trouble.', 'The supermarket should close earlier.']],
      infer: ['What can you infer about the writer’s view of the young skaters?', 'The writer is sympathetic to them and wants them treated fairly.', ['The writer finds them annoying.', 'The writer is a professional skater.', 'The writer has never met a young person.']],
      evidence: ['Which sentence answers an opposing view?', '“But a park that is busy, well lit and close to the sports field is far safer than a car park full of moving cars.”', ['“Every afternoon, they are moved on.”', '“Where are they supposed to go?”', '“Let’s give it to them.”']],
      theme: ['Young people need places where they belong', ['Car parks are fun', 'Supermarkets are dangerous', 'Sport is a waste of time']],
      vocab: ['moved on', 'told to leave', ['given a lift', 'promoted', 'allowed to stay']],
      purpose: ['What is the writer’s main purpose?', 'To persuade readers to support a skate park', ['To inform readers how to skate', 'To entertain with a story about skating', 'To report the news of an accident']]
    },
    {
      title: 'Nan’s garden (a poem)', kind: 'poem',
      text: '<p class="poem">Nan’s garden does not do rows.<br>Silverbeet leans on the fence like an old friend,<br>tomatoes sprawl wherever they like,<br>and the kūmara hide, as they always have,<br>until she calls them up.</p>' +
            '<p class="poem">She says the garden knows her.<br>I think it is the other way round:<br>forty summers of kneeling<br>have taught her every breath of the soil.</p>' +
            '<p class="poem">When I am old, I want to know<br>one place as well as that.</p>',
      main: ['The speaker admires how deeply Nan knows her garden, and wants to know a place that well.', ['Nan’s garden is messy and needs weeding.', 'The speaker wants Nan to plant in rows.', 'Kūmara are hard to grow.']],
      infer: ['What does “forty summers of kneeling” suggest?', 'Nan has worked in this garden for most of her life.', ['Nan has bad knees.', 'Nan only gardens in summer.', 'Nan is forty years old.']],
      evidence: ['Which line best shows that the garden is not neat?', '“Nan’s garden does not do rows.”', ['“She says the garden knows her.”', '“When I am old, I want to know”', '“until she calls them up.”']],
      theme: ['A deep connection to a place, built over a lifetime', ['Gardening is hard work', 'Vegetables are healthy', 'Old people should rest']],
      vocab: ['sprawl', 'spread out untidily', ['grow very tall', 'turn red', 'stand in straight lines']],
      purpose: ['Why does the poet describe the silverbeet as leaning “like an old friend”?', 'To make the garden feel relaxed, familiar and alive.', ['To show the silverbeet is dying.', 'To explain how to plant silverbeet.', 'To show the fence is broken.']]
    }
  ];
  const show = p => `<div class="passage"><p class="passage-title"><strong>${p.title}</strong></p>${p.text}</div>`;

  Sci.topic({
    id: 'er4', unit: 'reading',
    title: 'Reading Closely',
    blurb: 'Short passages to read carefully: the main idea, what is hinted at, and the evidence for it.',
    hint: 'Read the passage twice. The main idea is what the whole passage is about. An inference is what the writer suggests without saying it outright; ' +
          'back it with evidence from the text. A theme is the bigger idea behind the story. Use the words around a new word to work out its meaning.',

    learn: [
      { id: 'main', title: 'Main idea',
        text: '<p>The <strong>main idea</strong> is what the whole passage is about, not just one detail.</p><p>Test: would the writer agree that your sentence sums up the passage?</p>' },
      { id: 'infer', title: 'Making inferences',
        text: '<p>An <strong>inference</strong> is a conclusion drawn from clues the writer gives but does not state.</p>' +
              '<p><em>His fingers fumbled the hook twice.</em> → he is finding small tasks harder, perhaps because he is ageing.</p>' },
      { id: 'evidence', title: 'Using evidence',
        text: '<p>Support every inference with <strong>evidence</strong>: a quote or detail from the text.</p>' +
              '<p><strong>Explicit</strong> evidence states it directly; <strong>implicit</strong> evidence hints at it. Choose the detail that supports your point most directly.</p>' },
      { id: 'theme', title: 'Theme',
        text: '<p>A <strong>theme</strong> is the deeper idea or message that many people can relate to: courage, kindness, belonging, growing up.</p>' +
              '<p>It is bigger than the plot: not “Liam crosses a wire” but “courage means acting despite fear”.</p>' },
      { id: 'vocab', title: 'Words in context',
        text: '<p>Use the words around an unfamiliar word as clues, then check that your meaning makes sense in the sentence.</p>' },
      { id: 'purpose', title: 'Purpose and viewpoint',
        text: '<p>Ask: <strong>why</strong> did the writer include this, or write it this way? What do they want the reader to think or feel?</p>' +
              '<p>Purpose can be to inform, persuade or entertain, or to move the reader.</p>' },
      { id: 'strategies', title: 'When you get stuck',
        text: '<ul><li><strong>Reread</strong> the confusing part slowly</li><li><strong>Read ahead</strong>: the next sentence may explain</li><li><strong>Ask questions</strong>: who, what, why?</li>' +
              '<li><strong>Visualise</strong>: picture the scene</li><li><strong>Annotate</strong>: underline key words, note questions</li><li><strong>Look it up</strong> in a glossary or dictionary</li></ul>' },
      { id: 'synth', title: 'Extension: across texts',
        text: '<p>Reading two texts together lets you <strong>compare</strong> (how are they alike or different?) and <strong>synthesise</strong> (what do they show together?).</p>' }
    ],

    examples: [
      {
        title: 'Example 1: from clue to inference',
        steps: ['Clue: <em>His fingers, which had once tied knots faster than she could follow, fumbled the hook twice.</em>',
                'What it suggests: something has changed; small tasks are now hard for him.', 'Inference: Koro is getting older. Evidence: the contrast between “once” and “fumbled”.']
      },
      {
        title: 'Example 2: plot or theme?',
        steps: ['Plot: <em>Liam is scared at the top of the ropes course, then crosses the wire.</em>',
                'Theme: <em>courage means acting despite fear.</em>', 'The theme is the idea a reader could apply to their own life.']
      }
    ],

    slots: [
      { name: 'Main idea', learn: 'main',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + 'What is the main idea of this passage?', right: p.main[0], wrong: p.main[1],
          explain: 'The main idea sums up the whole passage, not one detail.' })) },
      { name: 'Inference', learn: 'infer',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + p.infer[0], right: p.infer[1], wrong: p.infer[2],
          explain: 'The writer does not say this outright, but the details point to it.' })) },
      { name: 'Evidence', learn: 'evidence',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + p.evidence[0], right: p.evidence[1], wrong: p.evidence[2],
          explain: 'This detail supports the idea most directly.' })) },
      { name: 'Theme', learn: 'theme',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + 'Which is the best statement of a theme?', right: p.theme[0], wrong: p.theme[1],
          explain: 'A theme is the bigger idea behind the passage, something readers could relate to their own lives.' })) },
      { name: 'Words in context', learn: 'vocab',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + `As used in the passage, what does <strong>${p.vocab[0]}</strong> mean?`, right: p.vocab[1], wrong: p.vocab[2], wide: false,
          explain: 'The words around it give the clue.' })) },
      { name: 'Purpose and viewpoint', learn: 'purpose',
        items: PASSAGES.map(p => rng => C(rng, { prompt: show(p) + p.purpose[0], right: p.purpose[1], wrong: p.purpose[2],
          explain: 'Ask why the writer made this choice, and what they want the reader to think or feel.' })) },
      { name: 'Stated or inferred?', learn: 'infer',
        items: [rng => Sci.sort(rng, { prompt: 'In <em>Before the tide</em> (Aroha and Koro fishing), is each idea stated directly or inferred?', bins: ['Stated', 'Inferred'],
          items: [
            { text: 'Koro was already fishing when Aroha arrived.', bin: 0 }, { text: 'They fished until the tide turned.', bin: 0 },
            { text: 'Aroha carried the bucket home.', bin: 0 }, { text: 'Koro fumbled the hook twice.', bin: 0 },
            { text: 'Koro is getting older.', bin: 1 }, { text: 'Aroha is starting to look after Koro.', bin: 1 },
            { text: 'Koro is not really annoyed that Aroha was late.', bin: 1 }, { text: 'They both notice the change but choose not to mention it.', bin: 1 }
          ], pick: 6,
          explain: 'Stated ideas are written in the text. Inferred ideas are what the details suggest.' })] },
      { name: 'When reading gets hard', learn: 'strategies',
        items: [
          rng => C(rng, { prompt: 'You read a paragraph and realise you took nothing in. What is the best first step?', right: 'Reread it slowly, asking what each sentence adds.', wrong: ['Skip to the end.', 'Give up on the text.', 'Read it faster.'], explain: 'Rereading is the simplest way to repair understanding.' }),
          rng => C(rng, { prompt: 'You meet an unfamiliar word. Which strategy should you try first?', right: 'Use the words around it as clues.', wrong: ['Ignore it and every sentence after it.', 'Guess randomly.', 'Stop reading.'], explain: 'Context often gives the meaning; a dictionary can confirm it.' }),
          rng => C(rng, { prompt: 'A description of a setting is hard to follow. What can help?', right: 'Visualise: picture the scene in your mind.', wrong: ['Count the words.', 'Read only the dialogue.', 'Skip all description.'], explain: 'Picturing the scene makes description easier to follow.' }),
          rng => C(rng, { prompt: 'A passage refers to something you do not understand yet. What might help?', right: 'Read ahead: the next sentences may explain it.', wrong: ['Stop at the first confusing point.', 'Read the passage backwards.', 'Assume it does not matter.'], explain: 'Writers often explain an idea just after introducing it.' }),
          rng => C(rng, { prompt: 'Why might you annotate a text while reading it?', right: 'To mark key ideas and questions so you can come back to them.', wrong: ['To make the text longer.', 'Because it is required in every book.', 'To hide the words you do not know.'], explain: 'Annotating keeps your thinking active.' }),
          rng => C(rng, { prompt: 'Which question helps you find the author’s purpose?', right: 'Why did the writer include this detail?', wrong: ['How many pages is the book?', 'What colour is the cover?', 'Who printed the book?'], explain: 'Asking why points you to purpose and viewpoint.' })
        ] },
      { name: 'True or false', learn: 'infer',
        items: [
          rng => TF(rng, { statement: 'An inference is something the text states directly.', answer: false, learn: 'infer', explain: 'An inference is drawn from clues, not stated outright.' }),
          rng => TF(rng, { statement: 'Good inferences are supported by evidence from the text.', answer: true, learn: 'evidence', explain: 'Without evidence, an inference is just a guess.' }),
          rng => TF(rng, { statement: 'The theme of a story is the same as its plot.', answer: false, learn: 'theme', explain: 'The plot is what happens; the theme is the deeper idea.' }),
          rng => TF(rng, { statement: 'The main idea sums up the whole passage.', answer: true, learn: 'main', explain: 'Not just one detail.' }),
          rng => TF(rng, { statement: 'Rereading a confusing part is a useful comprehension strategy.', answer: true, learn: 'strategies', explain: 'It is often the first thing to try.' }),
          rng => TF(rng, { statement: 'Writers always state their message plainly.', answer: false, learn: 'purpose', explain: 'Many leave the reader to infer it from details.' })
        ] },
      { name: 'Extension: across two texts', learn: 'synth',
        items: [
          rng => C(rng, { tag: EXT, prompt: '<em>Before the tide</em> and <em>Nan’s garden</em> both involve a grandparent. What idea do they share?', right: 'Respect for an older person’s lifetime of skill and knowledge', wrong: ['The dangers of the sea', 'How to grow vegetables', 'The importance of being on time'], explain: 'Both texts show a younger person noticing and valuing what an elder knows.' }),
          rng => C(rng, { tag: EXT, prompt: '<em>The top platform</em> and <em>Mrs Patel’s torch</em> are both about a small act. How do they differ?', right: 'One is about personal courage; the other about kindness to others.', wrong: ['Both are about fishing.', 'One is a poem and the other a report.', 'There is no difference.'], explain: 'Comparing shows each text’s focus more clearly.' }),
          rng => C(rng, { tag: EXT, prompt: 'The kākāpō report and the skate park opinion piece both use facts. How do they use them differently?', right: 'The report uses facts to inform; the opinion piece uses them to persuade.', wrong: ['Both use facts only to entertain.', 'Neither uses any facts.', 'The report persuades and the opinion piece informs.'], explain: 'The same kind of evidence can serve different purposes.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which pair of passages share a theme of belonging?', right: '<em>Our town needs a skate park</em> and <em>Mrs Patel’s torch</em>', wrong: ['<em>Bringing back the kākāpō</em> and <em>The top platform</em>', '<em>Nan’s garden</em> and <em>Bringing back the kākāpō</em>', '<em>The top platform</em> and <em>Before the tide</em>'], explain: 'One argues young people need somewhere to belong; the other shows neighbours becoming a community.' }),
          rng => C(rng, { tag: EXT, prompt: 'What does it mean to synthesise ideas from two texts?', right: 'To combine what both show into a new, bigger understanding', wrong: ['To copy one text into the other', 'To find the longest text', 'To count the words in both'], explain: 'Synthesis goes beyond comparing: it builds a new idea from both.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which statement synthesises <em>Before the tide</em> and <em>Nan’s garden</em>?', right: 'Both suggest that knowledge passes between generations through shared time, not just words.', wrong: ['Before the tide is about fishing; Nan’s garden is about gardening.', 'Both have a grandparent.', 'Nan’s garden is a poem.'], explain: 'A synthesis states a bigger idea that both texts support; the others only list features.' })
        ] }
    ]
  });

  // ═══ R5 Media and digital texts ════════════════════════════════════════════
  // Reading › Critical Analysis › Context and purpose; Writing › Writing to
  // inform (trustworthiness, checking sources, Creative Commons) (Years 7–8):
  // media texts present people, ideas and events from perspectives shaped by
  // purpose, audience and platform; digital texts use navigation, hyperlinks
  // and embedded media; check who made a text, its evidence and sources;
  // Year 8: signs of bias, comparing how texts present the same issue.
  // Extension: misinformation, disinformation and malinformation (Year 9).

  Sci.topic({
    id: 'er5', unit: 'reading',
    title: 'Media and Digital Texts',
    blurb: 'Who made it, why, and whether to trust it: reading news, ads, posts and websites with care.',
    hint: 'Ask four questions: Who made this? Why (to inform, persuade, entertain, sell)? What evidence does it give? Can I check it somewhere else? ' +
          'Watch for one-sided information, emotional wording without evidence, and missing sources.',

    learn: [
      { id: 'trust', title: 'Can I trust it?',
        text: '<ol class="learn-steps"><li><strong>Who</strong> made it? Are they an expert, a business, an anonymous account?</li><li><strong>Why</strong>? To inform, persuade, entertain or sell?</li>' +
              '<li><strong>Evidence</strong>: does it give facts, sources, data?</li><li><strong>Check</strong>: do other reliable sources say the same?</li></ol>' },
      { id: 'purpose', title: 'Media and their purposes',
        text: Sci.table(['Text', 'Usual purpose'], [['News report', 'to inform about events'], ['Opinion column', 'to persuade'], ['Advertisement', 'to persuade people to buy or do something'],
          ['Social media post', 'to share, entertain or persuade'], ['Documentary', 'to inform, often with a viewpoint']]) },
      { id: 'bias', title: 'Signs of bias',
        text: '<ul><li>Only one side of an issue is given</li><li>Loaded or emotional words with no evidence</li><li>Facts that would weaken the argument are left out</li><li>The creator gains from you believing it</li></ul>' },
      { id: 'perspective', title: 'Same event, different angle',
        text: '<p>Two outlets can report the same event differently: what they put first, the words they choose, the photos, and who they quote.</p>' +
              '<p><em>Council approves new motorway</em> vs <em>Council bulldozes wetland for motorway</em></p>' },
      { id: 'digital', title: 'Digital features',
        text: Sci.table(['Feature', 'Job'], [['Navigation menu', 'helps users find their way around a site'], ['Hyperlink', 'connects to another page or source'],
          ['Embedded video', 'shows rather than tells'], ['Caption', 'explains what an image shows'], ['Headline', 'grabs attention and sums up the story']]) },
      { id: 'cite', title: 'Using others’ work',
        text: '<p>Always <strong>cite your sources</strong>: say where information came from.</p>' +
              '<p><strong>Creative Commons</strong> content can be used if you name the creator and follow its rules. Otherwise, ask permission.</p>' },
      { id: 'mdm', title: 'Extension: three kinds of false information',
        text: Sci.table(['Term', 'Meaning'], [['Misinformation', 'false information shared by mistake'], ['Disinformation', 'false information shared deliberately to mislead'],
          ['Malinformation', 'true information shared to cause harm']]) }
    ],

    examples: [
      {
        title: 'Example 1: checking a claim',
        steps: ['A post says: <em>Drinking cold water causes colds!</em> It has thousands of shares.', 'Who made it? An anonymous account. Evidence? None. Other sources? Health websites do not agree.',
                'Shares are not evidence. Treat the claim as unreliable.']
      },
      {
        title: 'Example 2: two headlines, one event',
        steps: ['<em>Students march for climate action</em> focuses on the students’ cause.', '<em>Students skip school to protest</em> focuses on missed school.',
                'Both may be true; each shows the event from a different perspective.']
      }
    ],

    slots: [
      { name: 'Most trustworthy source', learn: 'trust',
        items: [
          ['You need facts about kākāpō numbers. Which source is most trustworthy?', 'The Department of Conservation website', ['An anonymous social media post', 'A comment under a video', 'An advert for a toy parrot']],
          ['You want to know if a new medicine is safe. Which source is most trustworthy?', 'Information from a health authority, with research cited', ['A celebrity’s post', 'The medicine company’s advert', 'A forum post with no name']],
          ['You need the weather for tomorrow’s trip. Which source is most trustworthy?', 'The MetService forecast', ['A friend’s guess', 'A post from last month', 'An app that shows only ads']],
          ['You are researching the history of your town. Which source is most trustworthy?', 'The local museum or library archive', ['A meme about the town', 'An anonymous blog with no sources', 'A shop’s advertisement']],
          ['You want to compare phones. Which source is least likely to be biased?', 'An independent consumer testing organisation', ['One phone maker’s website', 'A paid influencer’s video', 'A shop pushing its own brand']],
          ['You need to check a viral claim. What is the best way?', 'See whether several reliable sources report the same thing', ['Count how many times it was shared', 'Trust it if it has a photo', 'Ask whether it sounds exciting']]
        ].map(([prompt, right, wrong]) => rng => C(rng, { prompt, right, wrong, explain: 'Trustworthy sources are expert, accountable, and back their claims with evidence that others can check.' })) },
      { name: 'Questions to ask', learn: 'trust',
        items: [
          rng => C(rng, { prompt: 'Which question best checks whether a website is reliable?', right: 'Who created this, and what evidence do they give?', wrong: ['Does it have nice colours?', 'Is it the first result?', 'Is it long?'], explain: 'Authorship and evidence are the key checks.' }),
          rng => C(rng, { prompt: 'A video makes a big claim but gives no sources. What should you do?', right: 'Check the claim against other reliable sources.', wrong: ['Believe it, because it is a video.', 'Share it straight away.', 'Ignore all videos forever.'], explain: 'Claims without sources need checking before you trust them.' }),
          rng => C(rng, { prompt: 'Why does it matter when a text was published?', right: 'Information can go out of date.', wrong: ['Older texts are always wrong.', 'Newer texts are always right.', 'It never matters.'], explain: 'Facts such as population numbers or records change over time.' }),
          rng => C(rng, { prompt: 'A site selling sunscreen says sunscreen is the most important health product. Why be careful?', right: 'The creator profits if you believe it.', wrong: ['Sunscreen is dangerous.', 'Websites cannot sell things.', 'Health information is never online.'], explain: 'Consider whether the creator gains from your belief.' }),
          rng => C(rng, { prompt: 'Which detail makes an article more trustworthy?', right: 'It names its sources and quotes experts.', wrong: ['It uses lots of capital letters.', 'It has many emojis.', 'It says “everyone knows this”.'], explain: 'Named sources let readers check the information.' }),
          rng => C(rng, { prompt: 'Lots of people have shared a post. Does that make it true?', right: 'No: popularity is not evidence.', wrong: ['Yes, if over a thousand people shared it.', 'Yes, if your friends shared it.', 'Yes, if it was shared today.'], explain: 'False information can spread faster than true information.' })
        ] },
      { name: 'Fact or opinion?', learn: 'bias',
        items: [rng => Sci.sort(rng, { prompt: 'Is each statement a fact (it can be checked) or an opinion?', bins: ['Fact', 'Opinion'],
          items: [
            { text: 'Wellington is the capital of New Zealand.', bin: 0 }, { text: 'The kākāpō is a flightless parrot.', bin: 0 },
            { text: 'Water boils at 100 °C at sea level.', bin: 0 }, { text: 'The match finished 24–18.', bin: 0 }, { text: 'The library opens at 9 am.', bin: 0 },
            { text: 'Rugby is the best sport in the world.', bin: 1 }, { text: 'This is the most delicious pie ever made.', bin: 1 },
            { text: 'Homework is a waste of time.', bin: 1 }, { text: 'Winter is the most beautiful season.', bin: 1 }, { text: 'That film was boring.', bin: 1 }
          ], pick: 6,
          explain: 'A fact can be checked and proven. An opinion expresses what someone thinks or feels.' })] },
      { name: 'Year 8: spot the bias', learn: 'bias',
        items: [
          rng => C(rng, { tag: 'Year 8', prompt: 'Which sentence shows signs of bias?', right: 'Only selfish, lazy drivers oppose the new cycleway.', wrong: ['The council will vote on the cycleway on Monday.', 'The cycleway will cost $2 million.', 'Some drivers and cyclists have raised concerns.'], explain: 'Loaded words (selfish, lazy) attack one side without evidence.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'A report on a new mine quotes only the mining company. What is missing?', right: 'Other perspectives, such as locals or environmental scientists', wrong: ['A headline', 'Any numbers', 'Paragraphs'], explain: 'One-sided sourcing is a sign of bias.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'Which headline is most neutral?', right: 'Council votes 7–5 to close local pool', wrong: ['Heartless council shuts beloved pool', 'Council finally ditches money-wasting pool', 'Pool disaster: council betrays families'], explain: 'It reports the fact without loaded words.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'An article about a sports drink is written by the company that makes it. What should a reader consider?', right: 'The writer may be biased, because they profit from sales.', wrong: ['The article must be completely accurate.', 'Sports drinks cannot be written about.', 'Nothing: all articles are neutral.'], explain: 'Who benefits shapes what is said.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'Which technique might a biased text use?', right: 'Leaving out facts that weaken its argument', wrong: ['Citing a range of experts', 'Including opposing views fairly', 'Giving clear sources'], explain: 'Omission is a common sign of bias.' }),
          rng => C(rng, { tag: 'Year 8', prompt: 'Which word in this sentence shows bias? <em>The so-called experts claimed the bridge was safe.</em>', right: '“so-called”', wrong: ['“bridge”', '“safe”', '“the”'], explain: '“So-called” suggests the experts are not real experts, without giving evidence.' })
        ] },
      { name: 'Two angles on one event', learn: 'perspective',
        items: [
          ['<em>Students march for climate action</em> and <em>Students skip school to protest</em>', 'They describe the same event from different perspectives.', ['They describe different events.', 'One must be false.', 'They have the same focus.']],
          ['<em>Council approves new motorway</em> and <em>Council bulldozes wetland for motorway</em>', 'The second focuses on the environmental cost.', ['The first focuses on the wetland.', 'They report different decisions.', 'Neither mentions the council.']],
          ['<em>Record crowds at summer festival</em> and <em>Festival leaves streets littered</em>', 'They choose different aspects of the same festival to highlight.', ['They are about different towns.', 'Both are opinions.', 'One is an advert.']],
          ['<em>New housing to ease shortage</em> and <em>Farmland lost to housing</em>', 'Each frames the same development as mainly good or mainly bad.', ['They are about different developments.', 'Both are neutral.', 'Neither is about housing.']],
          ['<em>Team crushes rivals 40–3</em> and <em>Visitors outplayed in heavy defeat</em>', 'Each is written from the point of view of a different team’s supporters.', ['The scores are different.', 'Only one is about rugby.', 'Both are about the losing team.']],
          ['<em>Shop owner defends late opening</em> and <em>Neighbours fed up with late-night noise</em>', 'Each gives voice to a different side of the dispute.', ['Both quote the same person.', 'They are about different shops.', 'Neither mentions noise.']]
        ].map(([pair, right, wrong]) => rng => C(rng, { prompt: `What do these headlines show? ${pair}`, right, wrong,
          explain: 'The same event can be represented in different ways depending on the creator’s purpose and audience.' })) },
      { name: 'Media purposes', learn: 'purpose',
        items: [rng => Sci.sort(rng, { prompt: 'What is the main purpose of each media text?', bins: ['To inform', 'To persuade', 'To entertain'],
          items: [
            { text: 'A news report on a road closure', bin: 0 }, { text: 'A weather forecast', bin: 0 }, { text: 'A museum’s guide to its exhibits', bin: 0 },
            { text: 'An advert for running shoes', bin: 1 }, { text: 'An opinion column arguing for free school lunches', bin: 1 }, { text: 'A campaign poster for class captain', bin: 1 },
            { text: 'A comedy sketch on YouTube', bin: 2 }, { text: 'A cartoon about a talking kiwi', bin: 2 }, { text: 'A podcast telling ghost stories', bin: 2 }
          ], pick: 6,
          explain: 'Ask what the creator mainly wants: for you to know something, do or believe something, or enjoy something.' })] },
      { name: 'Digital features', learn: 'digital',
        items: [Sci.gen(rng => {
          const rows = rng.sample([['Navigation menu', 'Helps users find their way around a site'], ['Hyperlink', 'Connects to another page or source'],
                                   ['Embedded video', 'Shows rather than tells'], ['Caption', 'Explains what an image shows'], ['Headline', 'Grabs attention and sums up the story']], 4);
          return Sci.match(rng, 'Match each feature to its job.', rows, 'Digital texts combine features to guide the user and shape how messages are received.');
        })] },
      { name: 'Using others’ work', learn: 'cite',
        items: [
          rng => C(rng, { prompt: 'You use a photo from a Creative Commons site in your project. What should you do?', right: 'Name the creator and follow the licence rules.', wrong: ['Nothing: it is free.', 'Say you took it.', 'Crop out the creator’s name.'], explain: 'Creative Commons content can be used if you credit the creator and follow its rules.' }),
          rng => C(rng, { prompt: 'Why should you cite your sources in a report?', right: 'So readers know where information came from and can check it.', wrong: ['To make the report longer.', 'Because teachers like lists.', 'To hide your own ideas.'], explain: 'Citing shows where information came from and helps readers judge it.' }),
          rng => C(rng, { prompt: 'You want to share a friend’s photo on a class page. What should you do first?', right: 'Ask their permission.', wrong: ['Post it and tell them later.', 'Edit it so they cannot tell.', 'Nothing: photos are public.'], explain: 'Ask permission before sharing someone else’s content.' }),
          rng => C(rng, { prompt: 'Which is a correct way to show where a fact came from?', right: '(Department of Conservation, 2024)', wrong: ['(the internet)', '(I read it somewhere)', '(Google)'], explain: 'A citation names the specific source and date.' }),
          rng => C(rng, { prompt: 'Copying a paragraph from a website and presenting it as your own is called…', right: 'plagiarism', wrong: ['citation', 'paraphrasing', 'research'], explain: 'Use your own words and cite the source.' }),
          rng => C(rng, { prompt: 'What does it mean to paraphrase a source?', right: 'To restate its ideas in your own words, and still cite it', wrong: ['To copy it exactly without quotation marks', 'To delete it', 'To translate it into numbers'], explain: 'A paraphrase is your wording of someone else’s idea, so it still needs a citation.' })
        ] },
      { name: 'True or false', learn: 'trust',
        items: [
          rng => TF(rng, { statement: 'A post shared thousands of times must be true.', answer: false, explain: 'Popularity is not evidence.' }),
          rng => TF(rng, { statement: 'The same event can be presented differently by different media.', answer: true, learn: 'perspective', explain: 'Purpose, audience and platform shape how it is represented.' }),
          rng => TF(rng, { statement: 'An advertisement’s main purpose is usually to persuade.', answer: true, learn: 'purpose', explain: 'It wants you to buy or do something.' }),
          rng => TF(rng, { statement: 'Checking a claim against other reliable sources is good practice.', answer: true, explain: 'It confirms whether information is valid.' }),
          rng => TF(rng, { statement: 'Creative Commons means you can use content without crediting anyone.', answer: false, learn: 'cite', explain: 'You must credit the creator and follow the licence.' }),
          rng => TF(rng, { statement: 'A hyperlink connects one page to another.', answer: true, learn: 'digital', explain: 'It lets readers follow sources or related content.' })
        ] },
      { name: 'Extension: false information', learn: 'mdm',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Your aunt shares a false health tip, believing it is true. What is this?', right: 'Misinformation', wrong: ['Disinformation', 'Malinformation', 'A citation'], explain: 'False information shared by mistake.' }),
          rng => C(rng, { tag: EXT, prompt: 'A fake account spreads a made-up story to make people distrust an election. What is this?', right: 'Disinformation', wrong: ['Misinformation', 'Malinformation', 'Satire'], explain: 'False information shared deliberately to mislead.' }),
          rng => C(rng, { tag: EXT, prompt: 'Someone posts another person’s real home address to get them harassed. What is this?', right: 'Malinformation', wrong: ['Misinformation', 'Disinformation', 'A news report'], explain: 'True information shared to cause harm.' }),
          rng => C(rng, { tag: EXT, prompt: 'What is the key difference between misinformation and disinformation?', right: 'Intent: disinformation is deliberately misleading; misinformation is a mistake.', wrong: ['Length', 'Whether it has pictures', 'Whether it is online'], explain: 'Both are false; the difference is the purpose behind sharing.' }),
          rng => C(rng, { tag: EXT, prompt: 'A headline says “You won’t BELIEVE what this kid found!” What is it most likely?', right: 'Clickbait designed to get clicks', wrong: ['A peer-reviewed study', 'A government report', 'A dictionary entry'], explain: 'Exaggerated, vague headlines aim to make you click rather than inform.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why might false information spread faster than true information online?', right: 'It is often more surprising or emotional, so people share it quickly.', wrong: ['True information is not allowed online.', 'False information is always shorter.', 'Computers prefer false information.'], explain: 'Strong emotions make people share before checking.' })
        ] }
    ]
  });

})();
