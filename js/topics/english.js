'use strict';
// ── Revision · English (Years 7–8) ──────────────────────────────────────────
// Phase 3 of English Years 0–10 (2025, in effect from 2026). Exercises follow
// the knowledge and practices of one element or sub-element, by strand.
//
// The site practises what can be checked: word knowledge, grammar,
// punctuation, language features and close reading of short passages written
// for this site. Reading whole texts, writing them, and speaking are left to
// the classroom. Questions tagged Extension reach towards Year 9.
//
// Every example sentence is written to show one feature only, so that no
// question has two defensible answers. Keep it that way when adding more.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice, TF = Sci.tf;
  const EXT = 'Extension';

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


  // ═══ W11 Colons, semicolons and comma splices ═════════════════════════════
  // Writing › Composition › Sentence structures, grammar, and punctuation
  // (Years 7–8): a colon separates a list after a complete sentence, or
  // introduces an explanation; a semicolon separates two closely related
  // independent clauses, avoiding a run-on sentence or a comma splice.
  // Practices: using colons for lists and explanations; using semicolons to
  // separate two independent clauses.
  // Extension: semicolons with conjunctive adverbs (however, therefore), and
  // semicolons separating list items that already contain commas.

  // Pairs of closely related independent clauses. Each pair joins correctly
  // with a semicolon or as two sentences, and neither half explains the other,
  // so a colon is never the expected answer.
  const PAIRS = [
    ['The first half was slow', 'the second half was thrilling'],
    ['Mere loves netball', 'her brother prefers rugby'],
    ['The library was quiet', 'the playground was not'],
    ['The lights went down', 'the audience fell silent'],
    ['Tama finished his homework early', 'he spent the evening drawing'],
    ['The power went out', 'we finished dinner by candlelight'],
    ['It rained all morning', 'the field was too muddy for the game'],
    ['The café was full', 'we bought our lunch from the dairy'],
    ['Ana’s speech was short', 'it was the best of the day'],
    ['Our kapa haka group practised all term', 'the performance was worth it'],
    ['The tide went out', 'the rock pools appeared'],
    ['The bus was late', 'we missed the start of the film']
  ];
  const cap = s => s[0].toUpperCase() + s.slice(1);

  Sci.topic({
    id: 'ew11', unit: 'writing',
    title: 'Colons, Semicolons and Comma Splices',
    blurb: 'Two punctuation marks that join and introduce, and the mistake they help you avoid.',
    hint: 'A colon comes after a complete sentence and introduces what follows: a list, or an explanation. A semicolon joins two complete ' +
          'sentences that are closely related; both sides must be able to stand alone. Two sentences joined by only a comma make a comma splice.',

    learn: [
      { id: 'clause', title: 'Complete sentences (independent clauses)',
        text: '<p>An <strong>independent clause</strong> has a subject and a verb and makes sense on its own: <em>“The bus was late.”</em></p>' +
              '<p>A <strong>dependent clause</strong> cannot stand alone: <em>“because the bus was late”</em>.</p>' },
      { id: 'colon-list', title: 'Colon before a list',
        text: '<p>After a <strong>complete sentence</strong>, a colon introduces a list.</p>' +
              '<p>✓ <em>The recipe needs three things: flour, sugar and eggs.</em></p><p>✗ <em>The recipe needs: flour, sugar and eggs.</em> (“The recipe needs” is not complete.)</p>' },
      { id: 'colon-explain', title: 'Colon before an explanation',
        text: '<p>A colon can introduce an <strong>explanation or example</strong> of what came before.</p>' +
              '<p><em>There was only one thing left to do: finish the project.</em></p><p>Think of the colon as saying “here it is”.</p>' },
      { id: 'semicolon', title: 'Semicolon between two sentences',
        text: '<p>A semicolon joins two <strong>closely related</strong> complete sentences.</p>' +
              '<p><em>The first half was slow; the second half was thrilling.</em></p><p>Test: both sides must make sense as sentences on their own.</p>' },
      { id: 'splice', title: 'Comma splice',
        text: '<p>Two sentences joined with <strong>only a comma</strong>: a mistake.</p><p>✗ <em>The bus was late, we missed the film.</em></p>' +
              '<p>Fix it with a full stop, a semicolon, or a comma plus a joining word:</p>' +
              '<ul><li><em>The bus was late. We missed the film.</em></li><li><em>The bus was late; we missed the film.</em></li><li><em>The bus was late, so we missed the film.</em></li></ul>' },
      { id: 'runon', title: 'Run-on sentence',
        text: '<p>Two sentences jammed together with <strong>no punctuation</strong> at all.</p><p>✗ <em>The bus was late we missed the film.</em></p><p>The same fixes work as for a comma splice.</p>' },
      { id: 'choose', title: 'Colon or semicolon?',
        text: Sci.table(['Use a', 'When'], [['<strong>Colon</strong>', 'a complete sentence introduces a list or an explanation'],
                ['<strong>Semicolon</strong>', 'two complete sentences, closely related, sit side by side']]) },
      { id: 'adverbs', title: 'Extension: however, therefore',
        text: '<p>Words such as <strong>however</strong>, <strong>therefore</strong> and <strong>nevertheless</strong> cannot join two sentences with just a comma.</p>' +
              '<p>✓ <em>The bus was late; however, we arrived on time.</em></p><p>✗ <em>The bus was late, however, we arrived on time.</em></p>' },
      { id: 'semilist', title: 'Extension: semicolons in a list',
        text: '<p>When the items in a list already contain commas, semicolons separate the items so the list stays clear.</p>' +
              '<p><em>The prizes went to Ana, Year 7; Tom, Year 8; and Mei, Year 9.</em></p>' }
    ],

    examples: [
      {
        title: 'Example 1: fixing a comma splice',
        steps: [
          '<em>The power went out, we finished dinner by candlelight.</em> Both halves are complete sentences, joined only by a comma: a comma splice.',
          'Fix 1, a full stop: <em>The power went out. We finished dinner by candlelight.</em>',
          'Fix 2, a semicolon: <em>The power went out; we finished dinner by candlelight.</em>',
          'Fix 3, a joining word: <em>The power went out, so we finished dinner by candlelight.</em>'
        ]
      },
      {
        title: 'Example 2: colon or semicolon?',
        steps: [
          '<em>We packed everything we needed ▢ tents, sleeping bags, food and water.</em> A complete sentence, then a list: a <strong>colon</strong>.',
          '<em>Mere loves netball ▢ her brother prefers rugby.</em> Two complete, related sentences: a <strong>semicolon</strong>.',
          '<em>There was only one thing left to do ▢ finish the project.</em> An explanation of what came before, and the second part is not a full sentence: a <strong>colon</strong>.'
        ]
      }
    ],

    slots: [
      // 1 · Correct or not?
      {
        name: 'Correct or not?', learn: 'choose',
        items: [
          ['The kete held three things: a pounamu pendant, a letter and a photograph.', true, 'colon-list', 'A complete sentence comes before the colon, then the list.'],
          ['There was only one thing left to do: finish the project.', true, 'colon-explain', 'The colon introduces an explanation of the “one thing”.'],
          ['The first half was slow; the second half was thrilling.', true, 'semicolon', 'Two complete, related sentences joined by a semicolon.'],
          ['We packed everything we needed: tents, sleeping bags, food and water.', true, 'colon-list', 'A complete sentence, then a list.'],
          ['The power went out; we finished dinner by candlelight.', true, 'semicolon', 'Both sides are complete sentences.'],
          ['The kete held: a pendant, a letter and a photograph.', false, 'colon-list', '“The kete held” is not a complete sentence, so it cannot come before a colon. Write “The kete held three things: …”, or leave out the colon.'],
          ['Mere loves netball, her brother prefers rugby.', false, 'splice', 'Two sentences joined only by a comma: a comma splice. Use a semicolon or a full stop.'],
          ['We packed; tents, sleeping bags and food.', false, 'semicolon', 'A semicolon does not introduce a list. “We packed everything we needed: …” would work.'],
          ['Our favourite foods are: pizza, sushi and kūmara chips.', false, 'colon-list', '“Our favourite foods are” is not complete. Leave out the colon.'],
          ['There was only one thing left to do; finish the project.', false, 'semicolon', '“Finish the project” is not a complete sentence, so a semicolon cannot go before it. A colon introduces the explanation.']
        ].map(([s, ok, card, why]) => rng => ({
          prompt: `Is the punctuation in this sentence correct?<br><em>${s}</em>`,
          input: { kind: 'choice', options: [{ html: 'Correct', right: ok }, { html: 'Not correct', right: !ok }], correct: ok ? 0 : 1 },
          explain: why, learn: card
        }))
      },

      // 2 · Fix the comma splice.
      {
        name: 'Fix the comma splice', learn: 'splice',
        items: [Sci.gen(rng => {
          const [a, b] = rng.pick(PAIRS);
          const fixed = rng.chance() ? `${a}; ${b}.` : `${a}. ${cap(b)}.`;
          return C(rng, {
            prompt: `<em>${a}, ${b}.</em> This is a comma splice. Which version fixes it?`,
            right: fixed, wrong: [`${a}, ${b}.`, `${a} ${b}.`, `${a}, ${cap(b)}.`], wide: true,
            explain: 'Two complete sentences need more than a comma: a full stop, a semicolon, or a comma with a joining word such as “so” or “but”. ' +
                     'Leaving out the punctuation makes a run-on sentence, and a capital letter after a comma is still a comma splice.'
          });
        })]
      },

      // 3 · Spot the comma splice.
      {
        name: 'Spot the comma splice', learn: 'splice',
        items: [Sci.gen(rng => {
          const four = rng.sample(PAIRS, 4);
          const at = rng.int(0, 3);
          const joins = rng.shuffle(['semi', 'stop', 'so', 'semi']);
          const lines = four.map(([a, b], i) => {
            if (i === at) return `${a}, ${b}.`;
            const j = joins[i];
            return j === 'semi' ? `${a}; ${b}.` : j === 'stop' ? `${a}. ${cap(b)}.` : `${a}, so ${b}.`;
          });
          return Sci.spot(rng, {
            prompt: 'One of these has a comma splice.',
            lines, wrong: at, cue: 'Click the line with a comma splice.', find: 'is the comma splice',
            explain: 'It joins two complete sentences with only a comma. The others use a semicolon, a full stop, or a comma with a joining word.'
          });
        })]
      },

      // 4 · Colon or semicolon?
      {
        name: 'Colon or semicolon?', learn: 'choose',
        items: [
          ['We packed everything we needed', 'tents, sleeping bags, food and water.', 'colon', 'colon-list'],
          ['The kete held three treasures', 'a pendant, a letter and a photograph.', 'colon', 'colon-list'],
          ['There was only one thing left to do', 'finish the project.', 'colon', 'colon-explain'],
          ['The coach gave us one piece of advice', 'never stop running.', 'colon', 'colon-explain'],
          ['Our class has three pets', 'a goldfish, a stick insect and a very old axolotl.', 'colon', 'colon-list'],
          ['Mere loves netball', 'her brother prefers rugby.', 'semicolon', 'semicolon'],
          ['The first half was slow', 'the second half was thrilling.', 'semicolon', 'semicolon'],
          ['The library was quiet', 'the playground was not.', 'semicolon', 'semicolon'],
          ['The lights went down', 'the audience fell silent.', 'semicolon', 'semicolon']
        ].map(([a, b, mark, card]) => rng => ({
          prompt: `Which punctuation mark belongs in the gap?<br><em>${a} ▢ ${b}</em>`,
          input: { kind: 'choice', options: [{ html: 'Colon ( : )', right: mark === 'colon' }, { html: 'Semicolon ( ; )', right: mark === 'semicolon' }],
                   correct: mark === 'colon' ? 0 : 1 },
          explain: mark === 'colon'
            ? 'A complete sentence introduces what follows, and what follows is not a complete sentence: a colon.'
            : 'Both sides are complete sentences, closely related: a semicolon.',
          learn: card
        }))
      },

      // 5 · What is the punctuation doing?
      {
        name: 'What is it doing?', learn: 'choose',
        items: [rng => Sci.sort(rng, {
          prompt: 'What is the colon or semicolon doing in each sentence?',
          bins: ['Colon: introduces a list', 'Colon: introduces an explanation', 'Semicolon: joins two sentences'],
          items: [
            { text: 'The kete held three things: a pendant, a letter and a photograph.', bin: 0 },
            { text: 'We needed three tools: a spade, a rake and a bucket.', bin: 0 },
            { text: 'The shop sold everything: bread, milk, stamps and bait.', bin: 0 },
            { text: 'There was only one thing left to do: finish the project.', bin: 1 },
            { text: 'I knew why she was late: the bus had broken down.', bin: 1 },
            { text: 'The answer was simple: ask for help.', bin: 1 },
            { text: 'The first half was slow; the second half was thrilling.', bin: 2 },
            { text: 'Mere loves netball; her brother prefers rugby.', bin: 2 },
            { text: 'The lights went down; the audience fell silent.', bin: 2 }
          ],
          pick: 6,
          explain: 'A colon says “here it is”: a list, or an explanation. A semicolon sits between two complete, related sentences.'
        })]
      },

      // 6 · Complete sentence or not?
      {
        name: 'Complete sentence or not?', learn: 'clause',
        items: [rng => Sci.sort(rng, {
          prompt: 'Could each one stand on its own as a complete sentence?',
          bins: ['Complete sentence', 'Not complete'],
          items: [
            { text: 'The bus was late', bin: 0 }, { text: 'She ran', bin: 0 }, { text: 'Our team won the final', bin: 0 },
            { text: 'It rained all morning', bin: 0 }, { text: 'The audience fell silent', bin: 0 }, { text: 'Tama laughed', bin: 0 },
            { text: 'Because the bus was late', bin: 1 }, { text: 'When the lights went down', bin: 1 }, { text: 'Running down the hill', bin: 1 },
            { text: 'After the long trip home', bin: 1 }, { text: 'Which was the best of the day', bin: 1 }, { text: 'The recipe needs', bin: 1 }
          ],
          pick: 6,
          explain: 'A complete sentence has a subject and a verb and makes sense on its own. Only complete sentences can sit on both sides of a semicolon, or before a colon.'
        })]
      },

      // 7 · Spot the mistake in a paragraph.
      {
        name: 'Spot the mistake', learn: 'choose',
        items: [
          [['Our class went to the museum on Friday.', 'We saw three exhibits: moa bones, a waka and a wētā cave.', 'The waka was the highlight, it was carved from a single tōtara.', 'Everyone wanted to go back.'], 2, 'splice', 'Line 3 joins two sentences with only a comma: a comma splice. Use a semicolon or a full stop.'],
          [['The storm arrived just after lunch.', 'Our teacher gave us one instruction: stay away from the windows.', 'Rain hammered the roof; the lights flickered.', 'By three o’clock, we needed: torches, blankets and snacks.'], 3, 'colon-list', '“We needed” is not a complete sentence, so it cannot come before a colon.'],
          [['The netball final was close.', 'Our team led at half-time; the other team fought back.', 'With one minute left, the score was tied.', 'Hana took the last shot; and scored.'], 3, 'semicolon', '“And scored” is not a complete sentence, so a semicolon cannot go before it.'],
          [['Planting day began early.', 'We had three jobs: digging, planting and watering.', 'Some of us worked by the stream, others worked on the hill.', 'By lunchtime, two hundred harakeke were in the ground.'], 2, 'splice', 'Line 3 is a comma splice. A semicolon would join the two sentences correctly.'],
          [['The recipe was simple.', 'It needed only: flour, water and salt.', 'We mixed the dough; it was sticky at first.', 'After an hour, the bread was ready.'], 1, 'colon-list', '“It needed only” is not complete. Write “It needed only three things: …”, or drop the colon.'],
          [['Tama practised his speech every night.', 'He knew one thing for sure: he would not read from his notes.', 'On the day his voice shook, he kept going anyway.', 'The class clapped loudly.'], 2, 'splice', 'Line 3 is a comma splice. Try “His voice shook, but he kept going anyway.”']
        ].map(([lines, wrong, card, why]) => rng => Sci.spot(rng, {
          prompt: 'One line in this paragraph has a punctuation mistake.',
          lines, wrong, learn: card, cue: 'Click the line with the mistake.', explain: why
        }))
      },

      // 8 · True or false.
      {
        name: 'True or false', learn: 'choose',
        items: [
          rng => TF(rng, { statement: 'A colon can introduce a list after a complete sentence.', answer: true, learn: 'colon-list', explain: 'For example: “We needed three tools: a spade, a rake and a bucket.”' }),
          rng => TF(rng, { statement: 'A colon can introduce an explanation or an example.', answer: true, learn: 'colon-explain', explain: '“There was only one thing left to do: finish the project.”' }),
          rng => TF(rng, { statement: 'A semicolon joins two closely related complete sentences.', answer: true, learn: 'semicolon', explain: 'Both sides must be able to stand alone.' }),
          rng => TF(rng, { statement: 'A comma splice is a correct way to join two sentences.', answer: false, learn: 'splice', explain: 'It is a mistake: two sentences joined by only a comma.' }),
          rng => TF(rng, { statement: 'The words on each side of a semicolon should both make sense as sentences.', answer: true, learn: 'semicolon', explain: 'That is the test for using a semicolon.' }),
          rng => TF(rng, { statement: 'You should put a colon straight after “are” or “include” before a list.', answer: false, learn: 'colon-list', explain: '“Our foods include: …” is wrong, because what comes before the colon is not a complete sentence.' }),
          rng => TF(rng, { statement: 'A run-on sentence joins two sentences with no punctuation at all.', answer: true, learn: 'runon', explain: 'For example: “The bus was late we missed the film.”' }),
          rng => TF(rng, { statement: 'A semicolon is used to introduce a list after a complete sentence.', answer: false, learn: 'choose', explain: 'That is the job of a colon.' }),
          rng => TF(rng, { statement: 'Replacing the comma with a full stop is one way to fix a comma splice.', answer: true, learn: 'splice', explain: 'It makes two separate sentences.' }),
          rng => TF(rng, { statement: 'Adding a joining word such as “and”, “but” or “so” after the comma is another way to fix a comma splice.', answer: true, learn: 'splice', explain: '“The bus was late, so we missed the film.”' }),
          rng => TF(rng, { statement: 'An independent clause cannot make sense on its own.', answer: false, learn: 'clause', explain: 'It can: that is what makes it independent.' }),
          rng => TF(rng, { statement: '“Because the bus was late” is a complete sentence.', answer: false, learn: 'clause', explain: 'It leaves us waiting for what happened, so it is a dependent clause.' })
        ]
      },

      // 9 · Choose the correct sentence.
      {
        name: 'Choose the correct sentence', learn: 'choose',
        items: [Sci.gen(rng => {
          const [a, b] = rng.pick(PAIRS);
          const list = rng.pick([
            ['We needed three tools', 'a spade, a rake and a bucket'], ['The shop sold everything', 'bread, milk, stamps and bait'],
            ['Our class has three pets', 'a goldfish, a stick insect and an axolotl'], ['Pack the essentials', 'water, a hat and sunscreen']
          ]);
          const kind = rng.int(0, 1);
          const right = kind === 0 ? `${a}; ${b}.` : `${list[0]}: ${list[1]}.`;
          const wrong = kind === 0
            ? [`${a}, ${b}.`, `${a} ${b}.`, `${a}; ${cap(b)}.`]
            : [`${list[0]}; ${list[1]}.`, `${list[0].replace(/ (three|everything|the essentials)( .*)?$/, '')}: ${list[1]}.`, `${list[0]} ${list[1]}.`];
          return C(rng, {
            prompt: 'Which sentence is punctuated correctly?',
            right, wrong, wide: true, learn: kind === 0 ? 'semicolon' : 'colon-list',
            explain: kind === 0
              ? 'Two complete, related sentences joined by a semicolon. A comma alone is a comma splice, no punctuation is a run-on, and the word after a semicolon takes no capital letter.'
              : 'A complete sentence, then a colon, then the list. A semicolon cannot introduce a list, and what comes before a colon must be complete.'
          });
        })]
      },

      // 10 · Extension.
      {
        name: 'Extension: trickier joins', learn: 'adverbs',
        items: [
          rng => C(rng, { tag: EXT, prompt: '<em>It rained all day, we stayed inside.</em> Which is <strong>not</strong> a correct fix?',
            right: 'It rained all day, therefore we stayed inside.', wrong: ['It rained all day. We stayed inside.', 'It rained all day; we stayed inside.', 'It rained all day, so we stayed inside.'],
            explain: '“Therefore” cannot join two sentences with just a comma. It needs a semicolon before it: “It rained all day; therefore, we stayed inside.”' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is punctuated correctly?',
            right: 'The bus was late; however, we arrived on time.', wrong: ['The bus was late, however, we arrived on time.', 'The bus was late however we arrived on time.', 'The bus was late: however; we arrived on time.'],
            explain: '“However” joining two sentences needs a semicolon before it and a comma after it.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is punctuated correctly?',
            right: 'The film was long; nevertheless, everyone stayed until the end.', wrong: ['The film was long, nevertheless, everyone stayed until the end.', 'The film was long nevertheless everyone stayed until the end.', 'The film was long: nevertheless everyone; stayed until the end.'],
            explain: 'Like however and therefore, “nevertheless” needs a semicolon before it when it joins two sentences.' }),
          rng => C(rng, { tag: EXT, learn: 'semilist', prompt: 'Which is the clearest way to punctuate this list?',
            right: 'The tour visited Napier, in Hawke’s Bay; Nelson, in Tasman; and Dunedin, in Otago.',
            wrong: ['The tour visited Napier, in Hawke’s Bay, Nelson, in Tasman, and Dunedin, in Otago.', 'The tour visited: Napier, in Hawke’s Bay, Nelson, in Tasman and Dunedin, in Otago.', 'The tour visited Napier; in Hawke’s Bay, Nelson; in Tasman, and Dunedin; in Otago.'],
            explain: 'Each item already contains a comma, so semicolons separate the items and keep the list clear.' }),
          rng => C(rng, { tag: EXT, learn: 'semilist', prompt: 'Why are semicolons used in this list? <em>The prizes went to Ana, Year 7; Tom, Year 8; and Mei, Year 9.</em>',
            right: 'Each item already contains a comma, so semicolons separate the items clearly.', wrong: ['Semicolons always separate items in a list.', 'The items are complete sentences.', 'Semicolons introduce lists.'],
            explain: 'Without them, a reader could not tell where each item ends.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which joining words need a semicolon before them when they join two complete sentences?',
            right: '“however” and “therefore”', wrong: ['“and” and “but”', '“so” and “or”', '“because” and “when”'],
            explain: '“And”, “but”, “so” and “or” can follow a comma. “However” and “therefore” cannot; “because” and “when” start dependent clauses.' })
        ]
      }
    ]
  });

})();
