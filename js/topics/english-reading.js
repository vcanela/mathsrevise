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
  // Year 9 challenge (Phase 4 Text Studies, features of text): sound devices,
  // lineation, irony, symbol and motif, tone and mood, features working
  // together, and evaluating their effect in a written analysis.

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
                ['<strong>Pathos</strong>', 'emotion', '“Imagine a turtle tangled in a bag.”'], ['<strong>Ethos</strong>', 'the speaker’s credibility', '“As a lifeguard for ten years, I …”']]) },
      { id: 'sound', title: 'Sound devices', years: '9', wide: true,
        text: Sci.table(['Device', 'Repeats or imitates', 'Example'], [
                ['<strong>Alliteration</strong>', 'the same first consonant sound', '“big, bold banners”'],
                ['<strong>Assonance</strong>', 'the same vowel sound inside words', '“alone, the old boat floated home”'],
                ['<strong>Sibilance</strong>', 's and sh sounds', '“the sea sighed and shushed”'],
                ['<strong>Onomatopoeia</strong>', 'the sound it names', '“crackle”, “thud”, “hiss”']]) +
              '<p>Sound shapes mood: soft s sounds can soothe, or sound sinister; hard b, k and t sounds feel harsh or energetic.</p>' },
      { id: 'irony', title: 'Three kinds of irony', years: '9', wide: true,
        text: Sci.table(['Kind', 'What happens', 'Example'], [
                ['<strong>Dramatic</strong>', 'the audience knows something a character does not', 'Romeo thinks Juliet is dead; we know she is asleep.'],
                ['<strong>Situational</strong>', 'the outcome is the opposite of what we expect', 'A fire station burns down.'],
                ['<strong>Verbal</strong>', 'someone says the opposite of what they mean', '“Lovely weather,” in a downpour.']]) },
      { id: 'lineation', title: 'Line breaks in poetry', years: '9',
        text: '<p>An <strong>end-stopped</strong> line finishes with punctuation, so the reader pauses.</p>' +
              '<p><strong>Enjambment</strong>: the sentence runs on over the line break, pulling the reader forward.</p>' +
              '<p>A <strong>caesura</strong> is a pause in the middle of a line, made by punctuation: <em>“I knocked. No answer. Again.”</em></p>' +
              '<p>Poets use all three to control pace and emphasis.</p>' },
      { id: 'symbol', title: 'Symbol, motif and pathetic fallacy', years: '9', wide: true,
        text: '<p>A <strong>symbol</strong> is an object, colour or image that stands for a bigger idea: a seedling after a fire can stand for hope.</p>' +
              '<p>A <strong>motif</strong> is an image or idea that keeps returning through a text, gathering meaning each time.</p>' +
              '<p><strong>Pathetic fallacy</strong>: weather or nature that mirrors the characters’ feelings, such as a storm breaking as an argument starts.</p>' },
      { id: 'tone', title: 'Tone and mood', years: '9',
        text: '<p><strong>Tone</strong> is the writer’s or speaker’s attitude: how the text sounds. <em>Sarcastic, nostalgic, formal, urgent.</em></p>' +
              '<p><strong>Mood</strong> is the feeling the text creates in the reader. <em>Tense, eerie, joyful, calm.</em></p>' +
              '<p>Choose precise words: “nostalgic” says much more than “happy”.</p>' },
      { id: 'analyse', title: 'Analysing at Year 9', years: '9', wide: true,
        text: '<ol class="learn-steps"><li><strong>Technique:</strong> name it precisely.</li>' +
              '<li><strong>Evidence:</strong> quote briefly.</li>' +
              '<li><strong>Effect:</strong> explain how it works on the reader: the sound, the pace, the picture it creates.</li>' +
              '<li><strong>Purpose:</strong> say why the writer wanted that effect, and link it to the message or theme.</li></ol>' +
              '<p>Features often <strong>work together</strong>: short sentences and a sudden sound word can build and then break tension. Say how they combine.</p>' +
              '<p>To <strong>evaluate</strong>, judge how well a feature works for this audience and purpose, and say why.</p>' +
              '<p><em>“The repetition of ‘Our’ in ‘Our park. Our future. Our choice.’ builds a chant-like rhythm that unites the audience, persuading them the park is theirs to defend.”</em></p>' }
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
        name: 'Extension: persuasion and beyond', learn: 'appeals', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Sound devices.
      {
        name: 'Year 9: sound devices', learn: 'sound', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>“The silent snake slid slowly through the grass, hissing softly.”</em> Which sound device creates the hissing effect?',
            right: 'Sibilance', wrong: ['Assonance', 'Caesura', 'Enjambment'],
            explain: 'The repeated s sounds (silent, snake, slid, slowly, hissing, softly) imitate a hiss. Sibilance is the name for repeated s and sh sounds.' }),
          rng => C(rng, { prompt: '<em>“Alone, the old boat floated slowly home.”</em> Which sound device is used?',
            right: 'Assonance', wrong: ['Sibilance', 'Onomatopoeia', 'Alliteration'],
            explain: 'The long “o” vowel sound repeats inside the words: alone, old, boat, floated, slowly, home. It slows the line and makes it feel lonely.' }),
          rng => C(rng, { prompt: '<em>“The fire crackled, the kettle whistled, and the door banged shut.”</em> Which sound device is used?',
            right: 'Onomatopoeia', wrong: ['Assonance', 'Caesura', 'Enjambment'],
            explain: '“Crackled”, “whistled” and “banged” sound like the noises they name.' }),
          rng => C(rng, { prompt: '<em>“Big, bold, bright and brilliant: the best bike is back.”</em> Which sound device is used?',
            right: 'Alliteration', wrong: ['Assonance', 'Sibilance', 'Onomatopoeia'],
            explain: 'The same first consonant sound, b, starts word after word. It makes the slogan punchy and easy to remember.' }),
          rng => C(rng, { prompt: '<em>“The sea sighed and shushed against the sand.”</em> What is the main effect of the sibilance?',
            right: 'The soft s and sh sounds imitate gentle waves, creating a calm, soothing mood.',
            wrong: ['The hard sounds make the sea feel violent and dangerous.', 'It repeats vowel sounds to slow the line down.', 'It shows the sea is speaking to the narrator.'],
            explain: 'Sibilance is soft and breathy here, like waves on sand. (Repeating vowel sounds would be assonance.)' }),
          rng => C(rng, { prompt: '<em>“Crack! The bat struck the ball, and it thudded into the fence.”</em> Why does the writer use onomatopoeia here?',
            right: 'The reader can almost hear the action, so the moment feels vivid and immediate.',
            wrong: ['It slows the moment down so it feels calm.', 'It tells the reader exactly how far the ball went.', 'It shows the narrator is being sarcastic.'],
            explain: 'Sound words put the reader inside the moment.' })
        ]
      },

      // 12 · Line breaks in poetry.
      {
        name: 'Year 9: line breaks', learn: 'lineation', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<p class="poem"><em>The tide came in across the stones<br>and took the castle we had built<br>before the sun went down.</em></p>Each sentence runs on over the line break, with no punctuation at the end of lines 1 and 2. What is this called?',
            right: 'Enjambment', wrong: ['Caesura', 'End-stopped lines', 'Assonance'],
            explain: 'When a sentence carries on past the end of a line, it is enjambment.' }),
          rng => C(rng, { prompt: '<p class="poem"><em>I knocked. No answer. Again.<br>The hallway held its breath.</em></p>The full stops in line 1 make pauses in the middle of the line. What is a pause like this called?',
            right: 'Caesura', wrong: ['Enjambment', 'Onomatopoeia', 'A motif'],
            explain: 'A caesura is a pause within a line, usually made by punctuation.' }),
          rng => C(rng, { prompt: '<p class="poem"><em>The bell rang loud and long.<br>The yard fell still.<br>We waited.</em></p>Every line finishes with a full stop. What are lines like these called?',
            right: 'End-stopped lines', wrong: ['Enjambment', 'Caesura', 'Sibilance'],
            explain: 'A line that ends with punctuation, so the reader pauses, is end-stopped.' }),
          rng => C(rng, { prompt: '<p class="poem"><em>and still I ran, and ran, and ran<br>until the road ran out<br>beneath my feet</em></p>What is the main effect of the enjambment?',
            right: 'The lines spill into each other, pushing the reader on without stopping, like the runner.',
            wrong: ['Each line ends in a firm pause, slowing the reader down.', 'It shows that the poem rhymes.', 'It makes the runner sound calm and relaxed.'],
            explain: 'With no stopping point at the line ends, the reader is carried along, matching the breathless running.' }),
          rng => C(rng, { prompt: '<p class="poem"><em>He turned. Stopped. Listened.<br>Something moved in the dark.</em></p>What is the main effect of the caesuras in line 1?',
            right: 'The pauses slow the pace and build tension, as if we are holding our breath with him.',
            wrong: ['They speed the line up so it feels cheerful.', 'They show that the poem is about running.', 'They join the two lines into one sentence.'],
            explain: 'Each full stop forces a pause, so the moment stretches out and the tension grows.' }),
          rng => C(rng, { prompt: 'A poet wants the reader to rush breathlessly through a description of a flood. Which technique would help most?',
            right: 'Enjambment, so each line spills into the next', wrong: ['End-stopped lines, each ending with a full stop', 'A caesura in every line', 'A long pause at the end of each line'],
            explain: 'Enjambment removes the stopping points at line ends. The other choices all add pauses, which slow the reader down.' })
        ]
      },

      // 13 · Irony.
      {
        name: 'Year 9: irony', learn: 'irony', challenge: 'only',
        items: [
          ['The town’s new fire station burned down a week after it opened.', 'Situational irony', 'A fire station is the last building we expect to burn: the outcome is the opposite of what we expect.'],
          ['Stepping out into the pouring rain, Mere smiled and said, “Perfect beach weather.”', 'Verbal irony', 'Mere says the opposite of what she means.'],
          ['In <em>Romeo and Juliet</em>, the audience knows Juliet has only taken a sleeping potion, but Romeo believes she is dead.', 'Dramatic irony', 'The audience knows something the character does not.'],
          ['At a pantomime, the children shout “He’s behind you!” because they can see the villain and the hero cannot.', 'Dramatic irony', 'The audience can see what the character cannot.'],
          ['The school’s “Keep Our Grounds Tidy” poster competition left the hall covered in paper scraps.', 'Situational irony', 'A tidiness competition made a mess: the opposite of what was intended.'],
          ['After the team lost 40–0, the coach said, “Well, that went brilliantly.”', 'Verbal irony', 'The coach means the opposite of “brilliantly”.']
        ].map(([s, right, why]) => rng => C(rng, {
          prompt: `${s}<br>Which kind of irony is this?`,
          right, wrong: ['Dramatic irony', 'Situational irony', 'Verbal irony', 'Hyperbole'].filter(x => x !== right).slice(0, 3),
          explain: why
        })).concat([
          rng => C(rng, { prompt: 'Why do writers use dramatic irony?',
            right: 'The audience knows more than the character, which builds tension as they wait for the truth to come out.',
            wrong: ['It lets the character say the opposite of what they mean.', 'It surprises the audience with an ending nobody expected.', 'It describes the weather to match a character’s mood.'],
            explain: 'The gap between what we know and what the character knows creates suspense. The other options describe verbal irony, situational irony and pathetic fallacy.' })
        ])
      },

      // 14 · Symbol and motif.
      {
        name: 'Year 9: symbol and motif', learn: 'symbol', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'In a short story, Ana wears her late grandmother’s pounamu pendant and holds it whenever she is afraid. What does the pendant most likely symbolise?',
            right: 'Her connection to her grandmother, and the strength she draws from it', wrong: ['How wealthy Ana’s family is', 'The fashion of the time', 'That Ana feels cold'],
            explain: 'She reaches for it when afraid, so it stands for comfort and strength from her grandmother.' }),
          rng => C(rng, { prompt: 'A story ends with a green seedling pushing up through the ash of a burnt forest. What does the seedling most likely symbolise?',
            right: 'Hope and a new beginning', wrong: ['Danger that is still to come', 'The end of the forest forever', 'How lonely the narrator feels'],
            explain: 'New life rising from destruction is a classic symbol of hope.' }),
          rng => C(rng, { prompt: 'In a novel, a locked gate appears again and again: when Sam is sent away, when he is refused a job, and when his friends leave him out. What is this repeated image called?',
            right: 'A motif', wrong: ['Situational irony', 'Onomatopoeia', 'A caesura'],
            explain: 'An image that keeps returning, here building the idea of Sam being shut out, is a motif.' }),
          rng => C(rng, { prompt: '<em>“As the two brothers argued, the sky darkened and thunder rolled over the hills.”</em> Which technique is this?',
            right: 'Pathetic fallacy: the weather mirrors the characters’ feelings',
            wrong: ['Dramatic irony: the reader knows more than the brothers', 'Onomatopoeia: the words sound like thunder', 'Hyperbole: the storm is exaggerated'],
            explain: 'The storm matches the anger between the brothers.' }),
          rng => C(rng, { prompt: 'What is the difference between a symbol and a motif?',
            right: 'A symbol stands for a bigger idea; a motif is an image or idea that keeps returning through a text.',
            wrong: ['A symbol is always a colour; a motif is always an animal.', 'A symbol appears many times; a motif appears only once.', 'They mean exactly the same thing.'],
            explain: 'A motif can be a repeated symbol, but what makes it a motif is that it returns.' })
        ]
      },

      // 15 · Tone and mood.
      {
        name: 'Year 9: tone and mood', learn: 'tone', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>“Oh good, another meeting about meetings. Just what my week needed.”</em> Which word best describes the tone?',
            right: 'Sarcastic', wrong: ['Nostalgic', 'Celebratory', 'Ominous'],
            explain: 'The speaker says the opposite of what they feel, mockingly.' }),
          rng => C(rng, { prompt: '<em>“I still remember Sunday mornings in Nan’s kitchen: the radio murmuring, flour on everything, and the smell of rēwena bread.”</em> Which word best describes the tone?',
            right: 'Nostalgic', wrong: ['Sarcastic', 'Urgent', 'Ominous'],
            explain: 'The writer looks back fondly at a happy time that has passed.' }),
          rng => C(rng, { prompt: '<em>“The house had been empty for years. Tonight, a light was on in the attic.”</em> What mood does this create?',
            right: 'Eerie and unsettling', wrong: ['Joyful and relaxed', 'Warm and nostalgic', 'Mocking and sarcastic'],
            explain: 'A light in a house that should be empty makes the reader uneasy.' }),
          rng => C(rng, { prompt: '<em>“Act now. Every day we wait, another hectare of bush is lost.”</em> Which word best describes the tone?',
            right: 'Urgent', wrong: ['Nostalgic', 'Light-hearted', 'Sarcastic'],
            explain: 'The command “Act now” and the daily loss press the reader to act immediately.' }),
          rng => C(rng, { prompt: '<em>“Students are reminded that the library closes at 3 pm on Fridays.”</em> Which best describes the tone?',
            right: 'Formal and neutral', wrong: ['Angry and urgent', 'Sarcastic and mocking', 'Warm and nostalgic'],
            explain: 'It states information plainly, with no emotion.' }),
          rng => C(rng, { prompt: 'What is the difference between tone and mood?',
            right: 'Tone is the writer’s attitude; mood is the feeling the text creates in the reader.',
            wrong: ['Tone is the feeling in the reader; mood is the writer’s attitude.', 'Tone is only found in speeches; mood is only found in stories.', 'They mean exactly the same thing.'],
            explain: 'A writer can take a calm tone while creating a tense mood in the reader.' })
        ]
      },

      // 16 · Features working together, and judging effectiveness.
      {
        name: 'Year 9: features working together', learn: 'analyse', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>“The bush was silent. No birds. No wind. Then, somewhere behind us, a branch snapped.”</em> How do the features work together here?',
            right: 'Short, clipped sentences build a tense silence, so the sudden “snapped” jolts the reader.',
            wrong: ['Long, flowing sentences make the bush feel calm and peaceful.', 'A list of animals shows how busy the bush is.', 'Repeating “snapped” makes the sound fade away slowly.'],
            explain: 'The pace and the sound word combine: the quiet build-up makes the sudden noise more startling.' }),
          rng => C(rng, { prompt: '<em>“Every year we lose more. More forest. More birds. More of what makes this place home. If not now, when?”</em> How do the features work together here?',
            right: 'Repeating “More” builds a sense of growing loss, and the rhetorical question turns it into a call to act now.',
            wrong: ['A list of statistics proves the claim, and the question asks the audience for information.', 'Hyperbole makes the problem seem funny, and the question softens the message.', 'Contrast between forest and birds shows they are opposites.'],
            explain: 'The repetition builds the problem up; the question demands a response.' }),
          rng => C(rng, { prompt: '<em>“Outside, the city roared with traffic and sirens; inside the tiny flat, Mum hummed softly over the stove.”</em> How do the features work together here?',
            right: 'Contrast and sound words set the harsh city noise against gentle humming, so the flat feels like a safe refuge.',
            wrong: ['Onomatopoeia shows Mum is annoyed by the noise.', 'The semicolon shows the city and the flat are the same.', 'Hyperbole shows the flat is noisier than the city.'],
            explain: '“Roared” and “hummed softly” are opposite sounds, and the contrast makes the flat feel safe.' }),
          rng => C(rng, { prompt: 'A café’s slogan reads: <em>“Fresh. Fast. Fantastic. Why settle for less?”</em> How do the features work together?',
            right: 'Alliteration makes the three words catchy, and the rhetorical question suggests other cafés are second best.',
            wrong: ['Assonance slows the slogan down, and the question asks customers for feedback.', 'Onomatopoeia imitates the sound of coffee, and the question is a pun.', 'The slogan uses dramatic irony to surprise customers.'],
            explain: 'Three punchy f words stick in the mind; the question implies the answer “I shouldn’t”.' }),
          rng => C(rng, { prompt: 'A speech to Year 7 students about joining a beach clean-up opens with: <em>“According to a recent report, marine debris accumulation rates have increased substantially.”</em> Why is this opening likely to be <strong>less effective</strong> for this audience?',
            right: 'The formal, technical language may lose a young audience; a vivid image or anecdote would engage them more.',
            wrong: ['Evidence is never persuasive in a speech.', 'It uses too much hyperbole.', 'It is too emotional for a speech.'],
            explain: 'Evaluating means judging a feature against the audience and purpose. Evidence is useful, but this wording does not suit eleven-year-olds.' })
        ]
      },

      // 17 · The strongest analysis.
      {
        name: 'Year 9: the strongest analysis', learn: 'analyse', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A speech ends: <em>“Our park. Our future. Our choice.”</em> Which is the strongest analysis?',
            right: 'The repetition of “Our” builds a chant-like rhythm that unites the audience, persuading them the park belongs to them and is worth defending.',
            wrong: ['The writer uses repetition.', 'The writer repeats “Our” three times, which is a good technique.', 'This makes the reader want to keep reading.'],
            explain: 'The strongest answer names the technique, quotes it, explains its effect and links it to the writer’s purpose.' }),
          rng => C(rng, { prompt: 'A story says: <em>“The classroom was a furnace.”</em> Which is the strongest analysis?',
            right: 'The metaphor “the classroom was a furnace” makes the reader feel how stifling the room is, which explains why the students cannot concentrate.',
            wrong: ['The writer uses a metaphor to make the writing more interesting.', 'The classroom was very hot because it was summer.', 'This is a metaphor because it compares two things.'],
            explain: 'The others only name the feature, retell the story, or define the term. The strongest explains the effect and links it to the story.' }),
          rng => C(rng, { prompt: 'A poem says: <em>“The sea sighed and shushed against the sand.”</em> Which is the strongest analysis?',
            right: 'Sibilance in “sighed and shushed” imitates the soft sound of waves, creating a calm mood that reflects the speaker’s peace at the beach.',
            wrong: ['There is sibilance, which is when a writer uses s sounds.', 'The sea is at the beach and it makes a sound.', 'This line is good because it uses lots of techniques.'],
            explain: 'Technique, evidence, effect and purpose are all there in the strongest answer.' }),
          rng => C(rng, { prompt: 'A student writes: <em>“The writer uses a rhetorical question, ‘If not us, then who?’”</em> What should come next to make this a strong analysis?',
            right: 'An explanation of its effect on the reader and how it serves the writer’s purpose', wrong: ['Another example of a rhetorical question', 'A definition of a rhetorical question', 'A summary of the whole text'],
            explain: 'The student has named and quoted. The marks are in explaining the effect and the purpose.' }),
          rng => C(rng, { prompt: 'Which sentence <strong>evaluates</strong> a feature, rather than just identifying it?',
            right: 'The anecdote about the turtle is the most effective feature, because it turns a distant statistic into a story the audience can picture.',
            wrong: ['The writer uses an anecdote about a turtle.', 'There is an anecdote in paragraph two.', 'An anecdote is a short personal story.'],
            explain: 'Evaluating means judging how well something works, and saying why.' })
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
              '<p>Formal writing often uses the Latin word; friendly writing the Anglo-Saxon one.</p>' },
      { id: 'roots9', title: 'Harder Greek and Latin roots', years: '9', wide: true,
        text: '<p>Many harder words, especially in science and social studies, are built from these roots.</p>' +
              Sci.table(['Root', 'Means', 'From', 'In'], [
                ['<strong>bene</strong>', 'good, well', 'Latin', 'benefit, benevolent'],
                ['<strong>mal</strong>', 'bad, badly', 'Latin', 'malfunction, malnutrition'],
                ['<strong>omni</strong>', 'all', 'Latin', 'omnivore, omnipresent'],
                ['<strong>vor</strong>', 'eat', 'Latin', 'carnivore, herbivore'],
                ['<strong>cred</strong>', 'believe', 'Latin', 'credible, incredible'],
                ['<strong>mort</strong>', 'death', 'Latin', 'mortal, immortal'],
                ['<strong>demo</strong>', 'people', 'Greek', 'democracy, demographic'],
                ['<strong>-cracy</strong>', 'rule, power', 'Greek', 'democracy, autocracy'],
                ['<strong>-phobia</strong>', 'fear', 'Greek', 'arachnophobia, acrophobia'],
                ['<strong>-logy</strong>', 'study of', 'Greek', 'zoology, psychology'],
                ['<strong>path</strong>', 'feeling; disease', 'Greek', 'sympathy, pathology'],
                ['<strong>phil</strong>', 'love', 'Greek', 'philosophy, philanthropist'],
                ['<strong>anthrop</strong>', 'human', 'Greek', 'anthropology, philanthropist'],
                ['<strong>hydro</strong>', 'water', 'Greek', 'hydrant, dehydrated'],
                ['<strong>photo</strong>', 'light', 'Greek', 'photograph, photosynthesis']]) },
      { id: 'subjectwords', title: 'Roots unlock subject words', years: '9', wide: true,
        text: '<p>Science and social studies are full of long words built from roots. Break them up and they explain themselves.</p>' +
              Sci.table(['Word', 'Parts', 'Meaning'], [
                ['photosynthesis', 'photo (light) + synthesis (putting together)', 'plants using light to make food'],
                ['herbivore', 'herb (plant) + vor (eat)', 'an animal that eats only plants'],
                ['democracy', 'demo (people) + cracy (rule)', 'rule by the people, through voting'],
                ['pathology', 'path (disease) + logy (study of)', 'the study of disease'],
                ['hydroelectric', 'hydro (water) + electric', 'electricity generated from moving water']]) },
      { id: 'wordclass', title: 'Suffixes change word class', years: '9', wide: true,
        text: '<p>A suffix often changes a word’s <strong>class</strong>: the job it does in a sentence.</p>' +
              Sci.table(['Suffixes', 'Usually make', 'Examples'], [
                ['-tion, -ness, -ment, -ity, -er, -or', 'a <strong>noun</strong> (a thing, idea or person)', 'creation, kindness, movement, ability, builder'],
                ['-ify, -ise, -en', 'a <strong>verb</strong> (an action)', 'simplify, organise, strengthen'],
                ['-ous, -ful, -less, -able, -ive', 'an <strong>adjective</strong> (describes a noun)', 'dangerous, careful, fearless, readable, expensive'],
                ['-ly', 'an <strong>adverb</strong> (describes a verb)', 'carefully, quickly']]) +
              '<p>A <strong>word family</strong> shares a root: <em>create</em> (verb), <em>creation</em> (noun), <em>creative</em> (adjective), <em>creatively</em> (adverb). Pick the member that fits the job in your sentence.</p>' },
      { id: 'antonyms', title: 'Antonyms and negative prefixes', years: '9', wide: true,
        text: '<p><strong>Synonyms</strong> have similar meanings (<em>empty, vacant</em>). <strong>Antonyms</strong> are opposites (<em>generous, mean</em>).</p>' +
              '<p>Many antonyms are made with a negative prefix: <strong>un-, in-, im-, il-, ir-, dis-, non-</strong>. <em>honest → dishonest, legal → illegal.</em></p>' +
              '<p>Watch out: <em>invaluable</em> means so valuable it cannot be measured, and <em>inflammable</em> means the same as <em>flammable</em> (easily set on fire). Neither is an opposite.</p>' },
      { id: 'idioms', title: 'Idiomatic expressions', years: '9', wide: true,
        text: '<p>An <strong>idiom</strong> is a fixed phrase whose meaning cannot be worked out from its separate words. Read it as a whole, using the context.</p>' +
              Sci.table(['Idiom', 'Means'], [
                ['spill the beans', 'reveal a secret'], ['under the weather', 'unwell'],
                ['bite the bullet', 'face something unpleasant you cannot avoid'], ['cut to the chase', 'get to the main point'],
                ['she’ll be right (NZ and Australia)', 'it will be fine']]) },
      { id: 'borrowed', title: 'Words borrowed into English', years: '9', wide: true,
        text: '<p>English has borrowed words from many languages, often naming things that arrived with them.</p>' +
              Sci.table(['From', 'Borrowed words'], [
                ['French', 'ballet, café, restaurant'], ['Italian', 'piano, spaghetti'], ['Spanish', 'mosquito, canyon'],
                ['German', 'kindergarten'], ['Arabic', 'algebra'], ['Hindi', 'shampoo'], ['Japanese', 'tsunami, karaoke'], ['Old Norse', 'sky, egg']]) +
              '<p>New Zealand English has borrowed many words from <strong>te reo Māori</strong>: <em>kia ora, whānau, kai, haka, kūmara, mana</em>.</p>' +
              '<p>Borrowing goes both ways: te reo Māori took <em>hipi</em> (sheep) and <em>miraka</em> (milk) from English.</p>' }
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
      { name: 'Extension: everyday or formal?', learn: 'register', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which word is the formal, Latin-based partner of <strong>begin</strong>?', right: 'commence', wrong: ['start', 'go', 'kick off'], explain: '“Commence” comes from Latin; “begin” from Old English.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word is the everyday, Anglo-Saxon partner of <strong>assist</strong>?', right: 'help', wrong: ['facilitate', 'support', 'aid'], explain: 'Short everyday words often come from Old English.' }),
          rng => C(rng, { tag: EXT, prompt: 'A formal letter says: <em>Please enquire at reception.</em> What is the everyday version?', right: 'Please ask at reception.', wrong: ['Please commence at reception.', 'Please terminate at reception.', 'Please assist at reception.'], explain: '“Enquire” is the formal Latin-based word for “ask”.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why do science words often use Greek roots?', right: 'Scholars built new technical words from Greek parts.', wrong: ['Greek is easier to spell.', 'All English words are Greek.', 'Greek words are shorter.'], explain: 'Words like thermometer and microscope were made from Greek parts to name new things.' }),
          rng => C(rng, { tag: EXT, prompt: '“Chronic” shares a root with “chronological”. What might a chronic illness be?', right: 'One that lasts a long time', wrong: ['One that is very painful', 'One that is caught from animals', 'One that affects the skin'], explain: 'Chron = time: a chronic illness continues over a long time.' }),
          rng => C(rng, { tag: EXT, prompt: 'What does <strong>circumnavigate</strong> mean?', right: 'To sail all the way around', wrong: ['To sail under', 'To sail across once', 'To sail backwards'], explain: 'Circum = around; navigate = sail or steer.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Harder roots.
      { name: 'Year 9: harder roots', learn: 'roots9', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<strong>bene</strong> means good or well. A <strong>benevolent</strong> ruler is most likely …',
            right: 'kind, and wanting to do good for others', wrong: ['cruel, and wanting to harm others', 'easily frightened', 'extremely wealthy'],
            explain: 'Bene (well) + vol (wish): wishing others well. A ruler who wants to harm people would be <em>malevolent</em>, with mal (bad).' }),
          rng => C(rng, { prompt: 'The report said many of the children were suffering from <strong>malnutrition</strong>. What does this mean?',
            right: 'Poor nutrition: not getting enough of the right food', wrong: ['A fear of food', 'Eating a balanced, healthy diet', 'Too much exercise'],
            explain: 'Mal (bad, badly) + nutrition (nourishment): badly nourished. A balanced diet is the opposite.' }),
          rng => C(rng, { prompt: 'Using <strong>auto</strong> (self) and <strong>-cracy</strong> (rule, power), what is an <strong>autocracy</strong>?',
            right: 'A country ruled by one person with total power', wrong: ['A country ruled by the people through voting', 'A country with no government at all', 'A country run by machines'],
            explain: 'Auto (self) + cracy (rule): one person rules by themselves. Rule by the people is a democracy.' }),
          rng => C(rng, { prompt: '<strong>acro</strong> means height or top. What is <strong>acrophobia</strong>?',
            right: 'An extreme fear of heights', wrong: ['The study of mountains', 'A love of climbing', 'A disease caught at high altitude'],
            explain: 'Acro (height) + phobia (fear). The study of something would end in -logy; a love of something would use phil.' }),
          rng => C(rng, { prompt: '<strong>Empathy</strong> contains the root <strong>path</strong> (feeling). What is empathy?',
            right: 'The ability to share and understand another person’s feelings', wrong: ['The study of diseases', 'A dislike of other people', 'A feeling of tiredness'],
            explain: 'Em (in) + path (feeling): feeling what someone else feels. The study of disease is <em>pathology</em>, which uses the other meaning of path.' }),
          rng => C(rng, { prompt: 'A local <strong>philanthropist</strong> paid for the new marae kitchen. What is a philanthropist?',
            right: 'Someone who gives money or time to help other people', wrong: ['Someone who studies ancient humans', 'Someone who is afraid of crowds', 'Someone who builds kitchens for a living'],
            explain: 'Phil (love) + anthrop (human): someone who loves humankind, and shows it by giving. Someone who studies humans is an <em>anthropologist</em>.' }),
          rng => C(rng, { prompt: 'In the legend, the hero’s sword made him <strong>immortal</strong>. What does this mean?',
            right: 'He could not die', wrong: ['He could not be seen', 'He could not be believed', 'He could not be beaten in a fight'],
            explain: 'Im (not) + mort (death): not subject to death. “Could not be believed” would be <em>incredible</em>, from cred.' })
        ] },

      // 12 · Roots in science and social studies.
      { name: 'Year 9: subject words', learn: 'subjectwords', challenge: 'only',
        items: [
          rng => Sci.match(rng, 'Science words: match each word to its meaning.', [
            ['herbivore', 'An animal that eats only plants'], ['omnivore', 'An animal that eats plants and animals'],
            ['photosynthesis', 'Plants using light to make food'], ['dehydrated', 'Having lost too much water']],
            'Herb (plant) + vor (eat); omni (all) + vor (eat); photo (light) + synthesis (putting together); de (remove) + hydro (water).'),
          rng => Sci.match(rng, 'Social studies words: match each word to its meaning.', [
            ['democracy', 'Rule by the people, through voting'], ['autocracy', 'Rule by one person with total power'],
            ['demographics', 'Data about the people in a population'], ['anthropology', 'The study of humans and their cultures']],
            'Demo (people) + cracy (rule); auto (self) + cracy (rule); demo (people) + graph (write); anthrop (human) + logy (study of).'),
          rng => Sci.match(rng, 'Match each word to its meaning.', [
            ['pathologist', 'A scientist who studies disease'], ['hydroelectric', 'Making electricity from moving water'],
            ['geothermal', 'Using heat from inside the Earth'], ['zoology', 'The study of animals']],
            'Path (disease) + logy (study of) + ist (person); hydro (water) + electric; geo (earth) + therm (heat); zoo (animal) + logy (study of).'),
          rng => Sci.match(rng, 'Match each word to its meaning.', [
            ['credible', 'Able to be believed'], ['mortality rate', 'How often people die in a population'],
            ['malfunction', 'Failure to work properly'], ['benefactor', 'Someone who gives help or money']],
            'Cred (believe) + ible (able to be); mort (death); mal (badly) + function (work); bene (good) + fact (do) + or (person).')
        ] },

      // 13 · Suffixes and word class.
      { name: 'Year 9: suffixes and word class', learn: 'wordclass', challenge: 'only',
        items: [
          ['creation', 'happiness', 'movement', 'simplify', 'strengthen', 'modernise', 'dangerous', 'careful', 'comfortable'],
          ['pollution', 'kindness', 'agreement', 'purify', 'widen', 'organise', 'poisonous', 'fearless', 'expensive'],
          ['curiosity', 'darkness', 'enjoyment', 'classify', 'shorten', 'criticise', 'famous', 'powerful', 'readable'],
          ['ability', 'weakness', 'payment', 'justify', 'sharpen', 'apologise', 'nervous', 'thoughtful', 'attractive']
        ].map(words => rng => Sci.sort(rng, {
          prompt: 'Use the suffix to sort each word by its word class.', bins: ['Noun', 'Verb', 'Adjective'],
          items: words.map((text, i) => ({ text, bin: Math.floor(i / 3) })), pick: 6,
          explain: 'Nouns: -tion, -ness, -ment, -ity. Verbs: -ify, -ise, -en. Adjectives: -ous, -ful, -less, -able, -ive.'
        })) },

      // 14 · Word families in context.
      { name: 'Year 9: word families', learn: 'wordclass', challenge: 'only',
        items: [
          ['The ▢ of the new bridge took two years.', 'construction', ['construct', 'constructive', 'constructively'],
            'After “The” and before “of”, the sentence needs a noun: <strong>construction</strong> (-tion).'],
          ['Kiri gave a very ▢ answer in the debate.', 'persuasive', ['persuade', 'persuasion', 'persuasively'],
            'The gap describes the noun “answer”, so it needs an adjective: <strong>persuasive</strong> (-ive).'],
          ['The rangers hope to ▢ the wetland by planting harakeke.', 'restore', ['restoration', 'restorative', 'restorer'],
            'After “to”, the sentence needs a verb: <strong>restore</strong>.'],
          ['Tama worked ▢ all afternoon on his speech.', 'carefully', ['careful', 'carefulness', 'cared'],
            'The gap describes how he worked (a verb), so it needs an adverb: <strong>carefully</strong> (-ly).'],
          ['The council will ▢ the rules so they are easier to follow.', 'simplify', ['simple', 'simplicity', 'simply'],
            'After “will”, the sentence needs a verb: <strong>simplify</strong> (-ify).'],
          ['There was a buzz of ▢ in the crowd before the final.', 'excitement', ['excite', 'exciting', 'excitedly'],
            'After “of”, the sentence needs a noun: <strong>excitement</strong> (-ment).'],
          ['Her ▢ to keep going after the injury impressed everyone.', 'determination', ['determine', 'determined', 'determinedly'],
            'After “Her”, the sentence needs a noun: <strong>determination</strong> (-tion).']
        ].map(([s, right, wrong, why]) => rng => C(rng, {
          prompt: `Which word completes the sentence? <em>${s}</em>`, right, wrong, wide: false, explain: why })) },

      // 15 · Antonyms.
      { name: 'Year 9: antonyms', learn: 'antonyms', challenge: 'only',
        items: [
          [['generous / mean', 'ancient / modern', 'famous / well-known', 'expand / contract'], 2,
            '<em>Famous</em> and <em>well-known</em> are synonyms: they mean nearly the same thing.'],
          [['visible / invisible', 'valuable / invaluable', 'legal / illegal', 'honest / dishonest'], 1,
            '<em>Invaluable</em> means so valuable it cannot be measured, so it is not the opposite of <em>valuable</em>. The opposite is <em>worthless</em>.'],
          [['flammable / inflammable', 'possible / impossible', 'agree / disagree', 'mature / immature'], 0,
            '<em>Inflammable</em> means the same as <em>flammable</em>: easily set on fire. The opposite is <em>non-flammable</em>.'],
          [['benefit / harm', 'optimist / pessimist', 'scarce / plentiful', 'reluctant / unwilling'], 3,
            '<em>Reluctant</em> and <em>unwilling</em> are synonyms. The prefix un- does not make them opposites.'],
          [['accept / reject', 'vacant / empty', 'arrive / depart', 'include / exclude'], 1,
            '<em>Vacant</em> and <em>empty</em> are synonyms.']
        ].map(([lines, at, why]) => rng => Sci.spot(rng, {
          prompt: 'Three of these pairs are antonyms (opposites).', lines, wrong: at,
          cue: 'Click the pair that are not antonyms.', find: 'are not antonyms', explain: why })) },

      // 16 · Idiomatic expressions.
      { name: 'Year 9: idioms', learn: 'idioms', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which best describes an <strong>idiom</strong>?',
            right: 'A fixed phrase whose meaning is different from the meanings of its separate words',
            wrong: ['A word borrowed from another language', 'A comparison using “like” or “as”', 'A deliberate exaggeration'],
            explain: 'You cannot work out “spill the beans” from spill and beans. The others describe a loanword, a simile and hyperbole.' }),
          rng => C(rng, { prompt: '<em>After weeks of keeping quiet, Tama finally spilled the beans about the surprise party.</em> What did Tama do?',
            right: 'He told people the secret', wrong: ['He dropped food at the party', 'He cancelled the party', 'He cooked for the party'],
            explain: '“Spill the beans” means reveal a secret. Read literally, it makes no sense in this sentence.' }),
          rng => C(rng, { prompt: '<em>Mere has been under the weather all week, so she missed netball training.</em> What does this mean?',
            right: 'She has been feeling unwell', wrong: ['She was caught in the rain', 'She has been very busy', 'She dislikes training outside'],
            explain: '“Under the weather” means slightly ill.' }),
          rng => C(rng, { prompt: '<em>Liam decided to bite the bullet and tell his coach he was leaving the team.</em> What does this mean?',
            right: 'He made himself do something unpleasant that he could not avoid', wrong: ['He lost his temper with the coach', 'He changed his mind about leaving', 'He hurt himself at practice'],
            explain: '“Bite the bullet” means face a difficult or unpleasant task bravely.' }),
          rng => C(rng, { prompt: '<em>After his final warning, Sione promised to turn over a new leaf.</em> What did he promise?',
            right: 'To change his behaviour for the better', wrong: ['To start gardening', 'To read a new book', 'To leave the school'],
            explain: '“Turn over a new leaf” means make a fresh start and behave better. The “leaf” is an old word for a page.' }),
          rng => C(rng, { prompt: '<em>“We only have ten minutes,” said Priya. “Let’s cut to the chase.”</em> What does Priya want?',
            right: 'To get straight to the main point', wrong: ['To run faster', 'To end the meeting at once', 'To skip the main point'],
            explain: '“Cut to the chase” means skip the less important details and get to what matters.' }),
          rng => C(rng, { prompt: '<em>“Don’t stress about the leaky tent,” said Dad. “She’ll be right.”</em> What does Dad mean?',
            right: 'It will be fine', wrong: ['The tent belongs to a woman', 'Someone else will fix the tent', 'They should go home'],
            explain: '“She’ll be right” is a New Zealand and Australian idiom for “it will be fine”. It is sometimes used of people who are too relaxed about a real problem.' })
        ] },

      // 17 · Borrowed words.
      { name: 'Year 9: borrowed words', learn: 'borrowed', challenge: 'only',
        items: [
          rng => Sci.match(rng, 'Match each word to the language English borrowed it from.', [
            ['ballet', 'French'], ['piano', 'Italian'], ['tsunami', 'Japanese'], ['kūmara', 'Te reo Māori']],
            'Words often arrive with the thing they name: an art form from France, an instrument from Italy, a natural event named in Japan, and a food crop grown in Aotearoa.'),
          rng => Sci.match(rng, 'Match each word to the language English borrowed it from.', [
            ['shampoo', 'Hindi'], ['mosquito', 'Spanish'], ['kindergarten', 'German'], ['haka', 'Te reo Māori']],
            'Shampoo came from Hindi, mosquito from Spanish (“little fly”), kindergarten from German (“children’s garden”), and haka from te reo Māori.'),
          rng => Sci.match(rng, 'Match each word to the language English borrowed it from.', [
            ['algebra', 'Arabic'], ['karaoke', 'Japanese'], ['café', 'French'], ['whānau', 'Te reo Māori']],
            'Algebra came from Arabic, karaoke from Japanese, café from French, and whānau into New Zealand English from te reo Māori.'),
          rng => Sci.match(rng, 'Match each word to the language English borrowed it from.', [
            ['sky', 'Old Norse'], ['spaghetti', 'Italian'], ['canyon', 'Spanish'], ['mana', 'Te reo Māori']],
            'Sky came from the Old Norse of Viking settlers in England, spaghetti from Italian, canyon from Spanish, and mana into New Zealand English from te reo Māori.')
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
              '<p>Writers use tropes to set expectations, then sometimes break them to surprise us.</p>' },
      { id: 'perspective', title: 'Narrative perspective', years: '9', wide: true,
        text: '<p>Ask: whose eyes are we seeing through, and how much do they know?</p>' +
              Sci.table(['Perspective', 'Clue', 'Effect'], [
                ['<strong>First person</strong>', '“I”, “we”: a character tells the story', 'Close to the narrator’s thoughts, but we only know what they know, and they may be <strong>unreliable</strong>.'],
                ['<strong>Second person</strong>', '“you”', 'Puts the reader inside the story. Unusual and very immediate.'],
                ['<strong>Third person limited</strong>', '“he”, “she”, “they”; inside one character’s head', 'Close to one character, with a little distance. We learn things as they do.'],
                ['<strong>Third person omniscient</strong>', '“he”, “she”, “they”; inside many heads', 'An all-knowing narrator who can move between characters and reveal what each thinks.']]) },
      { id: 'drama', title: 'Drama: reading a script', years: '9', wide: true,
        text: '<p>A play is written to be <strong>performed</strong>.</p>' +
              '<ul><li><strong>Dialogue:</strong> the characters’ words, the main way we learn what they are like.</li>' +
              '<li><strong>Stage directions:</strong> in italics or brackets, and not spoken. They set the scene and show movement, tone and silence: <em>(She turns away.)</em></li>' +
              '<li><strong>Conflict:</strong> <em>external</em> (between characters, or a character and the world) or <em>internal</em> (inside one character’s mind).</li>' +
              '<li><strong>Tension</strong> builds while a conflict stays unresolved.</li></ul>' },
      { id: 'film', title: 'Film: camera shots', years: '9', wide: true,
        text: Sci.table(['Shot', 'What we see', 'Often suggests'], [
                ['<strong>Establishing shot</strong>', 'a wide view at the start of a scene', 'where and when the scene takes place'],
                ['<strong>Long (wide) shot</strong>', 'a whole figure in its surroundings', 'the setting, or how small or alone someone is'],
                ['<strong>Close-up</strong>', 'a face, or one object, filling the frame', 'emotion, or importance'],
                ['<strong>Extreme close-up</strong>', 'one small detail: an eye, a key', 'intense focus or tension'],
                ['<strong>Point-of-view shot</strong>', 'what a character sees, through their eyes', 'puts us in the character’s place'],
                ['<strong>Low angle</strong>', 'the camera looks up', 'power or threat'],
                ['<strong>High angle</strong>', 'the camera looks down', 'weakness or vulnerability'],
                ['<strong>Tracking shot</strong>', 'the camera moves along with the subject', 'movement and energy; we travel with them']]) },
      { id: 'shortstory', title: 'The short story', years: '9', wide: true,
        text: '<p>A short story has little space, so its structure is <strong>compressed</strong>:</p>' +
              '<ul><li>it often starts in the middle of the action;</li><li>few characters, one main setting, one main conflict, a short span of time;</li>' +
              '<li>every detail has to count;</li><li><strong>pacing</strong>: it slows down the moment that matters and summarises the rest;</li>' +
              '<li>it often ends with an <strong>epiphany</strong> (a sudden realisation) or an <strong>open ending</strong> that leaves the reader thinking.</li></ul>' },
      { id: 'discursive', title: 'Discursive or persuasive; adapting forms', years: '9', wide: true,
        text: Sci.table(['', 'Persuasive', 'Discursive'], [
                ['Aim', 'argues for one position', 'explores an issue from several sides'],
                ['Clues', '“we must”, commands, rhetorical questions, one side only', '“some argue … while others …”, “on the other hand”, balanced language'],
                ['Ending', 'a call to act or agree', 'a balanced view, or leaves the reader to decide']]) +
              '<p>Writers <strong>select</strong> a form for their purpose and audience, and often <strong>adapt</strong> it: a story told as text messages, a speech written as a poem, a pūrākau retold as a short story.</p>' },
      { id: 'tradition', title: 'Context and literary tradition', years: '9', wide: true,
        text: '<p><strong>Context</strong>: the historical, cultural and social setting a text comes from. Texts often reflect the values of their time, and a reader’s own background shapes how they interpret a text.</p>' +
              '<p>A <strong>literary tradition</strong> is a body of works, styles and conventions that grows up within a culture or period. New Zealand has its own, reflecting our people and places and connecting with traditions around the world. Katherine Mansfield and Patricia Grace are well-known New Zealand short story writers.</p>' +
              '<p><strong>Pūrākau</strong> are traditional Māori narratives, passed down through generations, often orally, that carry knowledge, values and whakapapa. Different iwi may hold different versions. Writers who draw on pūrākau research them carefully and acknowledge where they come from.</p>' }
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
      { name: 'Extension: tropes', learn: 'tropes', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'An old, wise character guides a young hero and then disappears. Which trope is this?', right: 'The wise mentor', wrong: ['The unreliable narrator', 'The happy ending', 'The red herring'], explain: 'The mentor appears in countless stories, from myths to films.' }),
          rng => C(rng, { tag: EXT, prompt: 'An ordinary teenager discovers they alone can save the world. Which trope is this?', right: 'The chosen one', wrong: ['The wise mentor', 'The comic sidekick', 'The locked room'], explain: 'A familiar pattern in fantasy and adventure stories.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why do writers use tropes?', right: 'They set up expectations that readers recognise.', wrong: ['They are required in every story.', 'They make stories shorter.', 'They replace characters.'], explain: 'Writers can meet those expectations, or break them to surprise readers.' }),
          rng => C(rng, { tag: EXT, prompt: 'A story sets up the wise mentor, who then turns out to be the villain. What is the writer doing?', right: 'Subverting a trope to surprise the reader', wrong: ['Making a spelling mistake', 'Writing instructions', 'Using a cliché'], explain: 'Breaking a familiar pattern creates surprise.' }),
          rng => C(rng, { tag: EXT, prompt: 'A hero leaves home, faces trials, and returns changed. Which trope is this?', right: 'The journey (quest)', wrong: ['The love triangle', 'The ticking clock', 'The twin swap'], explain: 'The journey is one of the oldest story patterns.' }),
          rng => C(rng, { tag: EXT, prompt: 'Many cultures have stories of a trickster who outwits more powerful beings, such as Māui. What is this?', right: 'A trope found across cultures', wrong: ['A modern invention', 'A type of poem', 'A news genre'], explain: 'Tropes recur across times and cultures.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Narrative perspective.
      { name: 'Year 9: narrative perspective', learn: 'perspective', challenge: 'only',
        items: [
          ...[
            ['I knew the moment I saw the envelope that something was wrong. My hands would not stop shaking.', 'First person',
              'The narrator is a character telling their own story: “I knew”, “my hands”.'],
            ['You step out onto the ice. It creaks beneath your boots. You hold your breath and take another step.', 'Second person',
              'The story is told to “you”, putting the reader in the main character’s place.'],
            ['Ana watched the bus pull away. She wondered whether Tama had seen her wave, and decided she did not care.', 'Third person limited',
              'The narrator uses “she”, and we see inside only Ana’s head. We do not learn what Tama thinks.'],
            ['Hemi was sure he would win. Behind him, Losa was quietly planning to pass him on the final bend, and their coach was already worrying that neither of them had warmed up.', 'Third person omniscient',
              'The narrator moves inside three heads (Hemi, Losa and the coach), so it is all-knowing.']
          ].map(([s, right, why]) => rng => C(rng, {
            prompt: `<em>“${s}”</em> Which narrative perspective is used?`, right, wide: false,
            wrong: ['First person', 'Second person', 'Third person limited', 'Third person omniscient'].filter(x => x !== right),
            explain: why })),
          rng => C(rng, { prompt: 'A mystery is told in the first person by a narrator who may be hiding something. What does this perspective allow the writer to do?',
            right: 'Mislead the reader, because we only know what the narrator chooses to tell us', wrong: ['Show every character’s secret thoughts', 'Prove the narrator is telling the truth', 'Tell the story without a main character'],
            explain: 'A first-person narrator can be unreliable. Showing every character’s thoughts needs an omniscient narrator.' }),
          rng => C(rng, { prompt: 'A writer is telling the story of a whole town during a flood, following many families. Why might they choose a third person omniscient narrator?',
            right: 'It can move between many characters and reveal what each is thinking', wrong: ['It keeps the reader inside one character’s head', 'It makes the reader the main character', 'It hides what every character is thinking'],
            explain: 'An all-knowing narrator suits a story with many viewpoints. Staying inside one head would be third person limited.' }),
          rng => C(rng, { prompt: 'Why might a writer use second person (“you”) in a choose-your-own-adventure story?',
            right: 'It puts the reader in the main character’s place, so they feel directly involved', wrong: ['It lets the writer reveal every character’s thoughts', 'It makes the story sound more formal', 'It shows that the narrator is lying'],
            explain: '“You” makes the reader the one making the choices, which is the point of the form.' })
        ] },

      // 12 · Drama.
      { name: 'Year 9: drama', learn: 'drama', challenge: 'only',
        items: [
          rng => Sci.spot(rng, {
            prompt: '<p><strong>MERE:</strong> Where were you last night?<br><em>(TAMA looks away and fiddles with his phone.)</em><br><strong>TAMA:</strong> Nowhere. Just out.</p>A student analyses this extract.',
            lines: ['The words in brackets are a stage direction.', 'The audience hears Tama say the stage direction aloud.', 'Tama looking away suggests he is hiding something.', 'This builds conflict between Mere and Tama.'],
            wrong: 1, explain: 'Stage directions are not spoken. The audience sees them acted out: here, Tama’s guilty body language.' }),
          rng => Sci.spot(rng, {
            prompt: '<p><em>(A kitchen, late at night. A single lamp is on. DAD sits at the table, staring at a pile of bills.)</em><br><strong>SIONE:</strong> <em>(entering)</em> Dad? You’re still up?<br><strong>DAD:</strong> <em>(quickly turning the bills over)</em> Just finishing the crossword.</p>A student analyses this extract.',
            lines: ['The opening stage direction sets the scene: the time, the place and the lighting.', 'Dad turning the bills over shows he is hiding his money worries from Sione.', 'So Dad’s line about the crossword is the plain truth.', 'The audience knows more than Sione here, which builds tension.'],
            wrong: 2, explain: 'The stage direction shows Dad hiding the bills, so his line is a cover story, not the truth.' }),
          rng => Sci.spot(rng, {
            prompt: '<p><strong>KIRI:</strong> <em>(alone, holding the team list)</em> If I tell Coach that Aroha cheated, we lose the final. If I don’t …<br><em>(She screws up the list, then smooths it out again.)</em></p>A student analyses this extract.',
            lines: ['Kiri is alone on stage, sharing her thoughts with the audience.', 'Her struggle is inside her own mind: an internal conflict.', 'Screwing up the list and smoothing it out shows her changing her mind back and forth.', 'Because nobody else is on stage, this scene has no conflict.'],
            wrong: 3, explain: 'Conflict does not need two people. Kiri’s struggle with her own choice is an internal conflict.' }),
          rng => Sci.spot(rng, {
            prompt: '<p><strong>GRAN:</strong> Sit. Eat. You’re too thin.<br><strong>LIAM:</strong> Gran, I’ve just had lunch.<br><strong>GRAN:</strong> <em>(already filling a second plate)</em> That wasn’t lunch. That was a snack.</p>A student analyses this extract.',
            lines: ['Gran speaks in long, formal sentences, which shows she is shy.', 'The stage direction shows she ignores what Liam says.', 'Her bossy care for Liam is warm, and adds humour.', 'In a play, dialogue and stage directions do the work that description does in a novel.'],
            wrong: 0, explain: 'Gran’s lines are short commands (“Sit. Eat.”), which show she is used to being in charge, not shy.' }),
          rng => Sci.spot(rng, {
            prompt: '<p><strong>ANA:</strong> You promised you’d be there.<br><strong>JACK:</strong> I know.<br><em>(A long silence. Neither of them moves.)</em><br><strong>ANA:</strong> Say something.</p>A student analyses this extract.',
            lines: ['Ana is angry that Jack broke a promise.', 'Jack’s short reply avoids explaining himself.', 'The silence in the stage direction means nothing is happening, so it does not matter.', 'Ana’s “Say something” shows the silence has become unbearable for her.'],
            wrong: 2, explain: 'A silence on stage is full of meaning. It holds the tension, which Ana’s line then breaks.' })
        ] },

      // 13 · Camera shots.
      { name: 'Year 9: camera shots', learn: 'film', challenge: 'only',
        items: [
          rng => Sci.match(rng, 'Match each moment in a film to the shot being used.', [
            ['The film opens high above a small coastal town at dawn, showing the harbour, streets and hills.', 'Establishing shot'],
            ['The screen is filled by a single eye, its pupil widening.', 'Extreme close-up'],
            ['The camera looks up at the bully from below, so he towers over the screen.', 'Low-angle shot'],
            ['We see the dark hallway exactly as the frightened girl sees it.', 'Point-of-view shot']],
            'The establishing shot shows where we are; the extreme close-up isolates one detail; the low angle makes the bully powerful; the point-of-view shot puts us in the girl’s place.'),
          rng => Sci.match(rng, 'Match each moment in a film to the shot being used.', [
            ['The camera looks down on a small boy alone in a huge, empty hall.', 'High-angle shot'],
            ['The camera holds on Mere’s face as tears start to form.', 'Close-up'],
            ['A tiny figure crosses a vast snowy plain, with the whole landscape around him.', 'Long (wide) shot'],
            ['The camera moves alongside the runner, keeping pace with her.', 'Tracking shot']],
            'Looking down makes the boy seem vulnerable; the close-up shows emotion; the long shot shows how small he is in the landscape; the tracking shot travels with the runner.'),
          rng => Sci.match(rng, 'Match each moment in a film to the shot being used.', [
            ['The first shot shows the whole city skyline at night, before we cut inside one apartment.', 'Establishing shot'],
            ['The camera looks down on the beaten team slumped on the bench.', 'High-angle shot'],
            ['We see the exam paper shaking, as if looking down through the student’s own eyes.', 'Point-of-view shot'],
            ['The camera holds on the coach’s face, catching a small, proud smile.', 'Close-up']],
            'The skyline sets the scene; looking down shows defeat; seeing through the student’s eyes is point of view; holding on a face shows emotion.'),
          rng => Sci.match(rng, 'Match each moment in a film to the shot being used.', [
            ['The camera looks up at the statue, making it seem huge and powerful.', 'Low-angle shot'],
            ['The screen fills with a fingertip hovering over a red button.', 'Extreme close-up'],
            ['The camera glides along the coast road, moving with the car.', 'Tracking shot'],
            ['The whole climber is visible, small against a huge cliff face.', 'Long (wide) shot']],
            'Looking up gives power; one tiny detail filling the screen builds tension; moving with the car is tracking; a whole figure in a large space is a long shot.')
        ] },

      // 14 · The short story.
      { name: 'Year 9: the short story', learn: 'shortstory', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A short story opens: <em>“The second time the waka tipped over, Tavita stopped laughing.”</em> Why might a short story begin in the middle of the action like this?',
            right: 'With few words to spend, it hooks the reader at once and skips a long introduction', wrong: ['Short stories are not allowed to have introductions', 'To make the story as long as possible', 'To show that the events happened in the future'],
            explain: 'Compression: a short story cannot afford a slow build-up, so it often starts late in the action.' }),
          rng => C(rng, { prompt: 'Which is most typical of a short story, compared with a novel?',
            right: 'A few characters, one main conflict and a short span of time', wrong: ['Many subplots across several generations', 'A large cast of main characters', 'Dozens of chapters, each with a new setting'],
            explain: 'A short story focuses tightly. The other options describe the room a novel has.' }),
          rng => C(rng, { prompt: 'At the end of a short story, Hana suddenly realises that her brother’s teasing was his way of looking after her. What is a sudden realisation like this called?',
            right: 'An epiphany', wrong: ['A stage direction', 'An establishing shot', 'A subplot'],
            explain: 'An epiphany is a moment of sudden understanding. Many short stories build towards one.' }),
          rng => C(rng, { prompt: 'A short story ends before we find out whether Sione accepts a job overseas. Why might the writer choose this open ending?',
            right: 'It leaves readers to weigh up the choice themselves, so the story’s question stays with them', wrong: ['It tells the reader exactly what happened next', 'It turns the short story into a novel', 'It shows the writer had no ideas left'],
            explain: 'An open ending hands the final decision to the reader, which keeps them thinking.' }),
          rng => C(rng, { prompt: 'A short story spends a whole page on the ten seconds when a dog runs onto the road, then covers the next three years in one sentence. What is the writer doing?',
            right: 'Controlling the pace: slowing down the moment that matters and summarising the rest', wrong: ['Giving every event equal space', 'Making a mistake with the timeline', 'Using second-person narration'],
            explain: 'Pacing tells the reader what matters. Slowing down a key moment makes it feel huge.' }),
          rng => C(rng, { prompt: 'Why does every detail matter so much in a short story?',
            right: 'The form is so short that each detail must build character, setting or the main idea', wrong: ['Short stories must describe everything in full', 'Readers of short stories skip most details', 'Details are only there to make the story longer'],
            explain: 'There is no room for padding, so writers choose details that do several jobs at once.' })
        ] },

      // 15 · Discursive or persuasive.
      { name: 'Year 9: discursive or persuasive?', learn: 'discursive', challenge: 'only',
        items: [
          [['Some families say uniforms save money; others find them expensive to buy new.', 'Opinions on uniforms differ, and both sides raise fair points.', 'Supporters argue uniforms build belonging, while critics say they limit self-expression.'],
           ['Uniforms must go, and they must go now.', 'Every student deserves to dress as themselves, so scrap the uniform.', 'Who could possibly defend forcing teenagers into itchy blazers?']],
          [['A four-day school week could give students more rest, but it might also make each day longer.', 'Teachers are divided on the idea, for a range of reasons.', 'Before deciding, it is worth weighing the benefits against the costs.'],
           ['A four-day week is the obvious answer, and anyone who disagrees has not thought it through.', 'Imagine a free Friday to rest and explore. We need this change.', 'The evidence is clear: the five-day week is broken.']],
          [['Phones can distract students, yet they can also be useful learning tools.', 'There are strong arguments on both sides of the phone debate.', 'Some schools ban phones, while others teach students to manage them.'],
           ['Ban phones in class. Our learning depends on it.', 'Every minute on a phone is a minute stolen from learning.', 'Surely no one believes phones belong in a classroom?']],
          [['Dog owners want space to exercise their pets, while others worry about nesting birds.', 'Councils around New Zealand have taken different approaches to dogs on beaches.', 'Each option has costs: for dog owners, for families and for wildlife.'],
           ['Keep dogs off our beaches, or watch our dotterels disappear.', 'Dogs belong on beaches, and these rules are a disgrace.', 'Any council that cares about wildlife must ban dogs this summer.']]
        ].map(([disc, pers]) => rng => Sci.sort(rng, {
          prompt: 'Is each sentence from a discursive text or a persuasive text?', bins: ['Discursive', 'Persuasive'],
          items: disc.map(text => ({ text, bin: 0 })).concat(pers.map(text => ({ text, bin: 1 }))), pick: 6,
          explain: 'Discursive sentences weigh up more than one side (“some say … others …”). Persuasive sentences push one side, with commands, certainty and rhetorical questions.'
        })) },

      // 16 · Context, tradition and pūrākau.
      { name: 'Year 9: context and tradition', learn: 'tradition', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which best describes <strong>pūrākau</strong>?',
            right: 'Traditional Māori narratives, passed down through generations, that carry knowledge and values', wrong: ['Modern fantasy novels written for children', 'News reports about Māori events', 'Poems that must rhyme'],
            explain: 'Pūrākau have been passed down, often orally, for generations. They carry knowledge, values and whakapapa.' }),
          rng => C(rng, { prompt: 'A writer wants to retell a pūrākau in a short story. Which approach is most respectful?',
            right: 'Research it carefully, acknowledge where it comes from, and seek guidance where possible', wrong: ['Change key details to make it funnier, without checking', 'Present the story as their own invention', 'Combine several versions and call it the one true version'],
            explain: 'Pūrākau are taonga, and different iwi may hold different versions. Careful research and acknowledgement respect that.' }),
          rng => C(rng, { prompt: 'A New Zealand short story draws on a pūrākau about Māui, but sets it in a modern city with a teenage main character. What is the writer doing?',
            right: 'Connecting a Māori storytelling tradition with the short story form to explore life today', wrong: ['Copying the pūrākau word for word', 'Writing a news report about Māui', 'Removing any New Zealand context'],
            explain: 'Writers often draw on more than one literary tradition to enrich meaning.' }),
          rng => C(rng, { prompt: 'A children’s book from the 1950s shows only boys playing sport and only girls helping in the kitchen. What is the best explanation?',
            right: 'It reflects the social expectations of the time it was written', wrong: ['It was a printing error', 'Girls did not play sport at all in the 1950s', 'The writer was describing a single real family'],
            explain: 'Texts often reflect the values of their time. Reading with context in mind helps us notice who and what is included or left out.' }),
          rng => C(rng, { prompt: 'Why can knowing when and where a text was written help a reader?',
            right: 'The context can explain the text’s ideas, attitudes and purpose', wrong: ['It tells the reader the one correct meaning', 'It shows whether the spelling is correct', 'It means the reader no longer needs to read the text'],
            explain: 'Context gives deeper insight, but readers still need evidence from the text itself.' }),
          rng => C(rng, { prompt: 'Two students read the same poem about leaving home. One has just moved from another country; the other has never moved. They interpret it differently. What best explains this?',
            right: 'A reader’s own background and experiences shape how they interpret a text', wrong: ['One of them must have misread every line', 'The poem has no meaning at all', 'Poems can only ever have one meaning'],
            explain: 'Different readers bring different experiences. Strong interpretations are still backed by evidence from the text.' }),
          rng => C(rng, { prompt: 'Which best describes a <strong>literary tradition</strong>, such as New Zealand’s?',
            right: 'A body of works, styles and conventions that has grown up within a culture over time', wrong: ['A rule about what writers in a country are allowed to write', 'A list of books every student must read', 'Any book printed in that country'],
            explain: 'A tradition grows from many writers’ works and shapes how new texts are written and read.' })
        ] },

      // 17 · True or false.
      { name: 'Year 9: true or false', learn: 'discursive', challenge: 'only',
        items: [
          rng => TF(rng, { statement: 'A third person omniscient narrator can reveal the thoughts of more than one character.', answer: true, learn: 'perspective',
            explain: 'Omniscient means all-knowing: the narrator can move between characters’ minds.' }),
          rng => TF(rng, { statement: 'A first-person narrator always tells the reader the whole truth.', answer: false, learn: 'perspective',
            explain: 'A first-person narrator can be unreliable: mistaken, or hiding something.' }),
          rng => TF(rng, { statement: 'In a play, stage directions are usually spoken aloud by the actors.', answer: false, learn: 'drama',
            explain: 'Stage directions are acted out or used to set the scene, not spoken.' }),
          rng => TF(rng, { statement: 'A discursive text explores several viewpoints rather than pushing one position.', answer: true,
            explain: 'That is the difference from a persuasive text, which argues for one side.' }),
          rng => TF(rng, { statement: 'An establishing shot usually comes at the start of a scene to show where it takes place.', answer: true, learn: 'film',
            explain: 'It orients the audience before the action begins.' }),
          rng => TF(rng, { statement: 'Writers sometimes adapt a familiar form, such as telling a story through text messages, to suit their purpose.', answer: true,
            explain: 'Forms are selected and adapted: the text-message form can make a story feel immediate and private.' }),
          rng => TF(rng, { statement: 'A short story usually has room for many subplots and a large cast of main characters.', answer: false, learn: 'shortstory',
            explain: 'A short story is compressed: few characters and one main conflict.' })
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
  const byTitle = t => PASSAGES.find(p => p.title.startsWith(t));
  /** Passages a question refers to, folded behind toggles so the question stays visible. */
  const fold = (...titles) => titles.map(t => { const p = byTitle(t);
    return `<details class="passage-again"><summary>Read “${p.title}”</summary>${show(p)}</details>`; }).join('');
  /** A passage question, tagged so a passage already shown folds away. */
  const onPassage = (p, q) => Object.assign(q, { passage: p.title });

  // Year 9 challenge passages: one story and one imagined historical editorial.
  // They sit outside PASSAGES so the six linked slots above never draw them.
  // Every challenge question tags its passage with onPassage, so the engine
  // prints it in full the first time and folds it on later cards.
  const DAIRY = {
    title: 'The last day at Lal’s Dairy', kind: 'story',
    text: '<p>On the last morning, Dad let me turn the sign to OPEN myself. Neither of us mentioned that it would be the last time.</p>' +
          '<p>The new supermarket had opened on the main road in March. It had forty checkouts, free parking and a bakery you could smell from the car park. Our dairy had one counter, a bell above the door, and Dad.</p>' +
          '<p>People still came in that day. Mrs Hōhaia bought her paper, as she had every morning for nineteen years, and stayed to talk about her grandson’s rugby. Two boys from the intermediate counted out coins for a bag of mixed lollies, and Dad, as always, pretended not to notice they were twenty cents short. Old Mr Brennan asked if we would get his magazine in next month. Dad said, “We’ll see,” and smiled at the floor.</p>' +
          '<p>At six, Dad swept the floor, though nobody would walk on it again. He wiped the counter. He straightened the rack of birthday cards so that they faced the door.</p>' +
          '<p>Then he handed me the sign. I turned it over. CLOSED looked smaller than OPEN, somehow, though the letters were the same size.</p>' +
          '<p>The bell rang once as we left, the way it always had. Dad stood in the doorway a moment, listening, as if it might ring again.</p>'
  };
  const COLLEGE = {
    title: 'A school fit for the future', kind: 'editorial',
    text: '<p><em>An imagined editorial from a small-town New Zealand newspaper in 1958, written for this site.</em></p>' +
          '<p>Tomorrow the doors of Riverbend College open, and our town takes a great step into the modern age.</p>' +
          '<p>The new buildings are a credit to the Department of Education. The boys’ wing has a fully equipped engineering workshop and a woodwork room, where our lads will learn the skills of the trades and professions they will one day enter. The girls’ wing boasts a modern kitchen and a sewing room, so that our young ladies will be well prepared for the homes they will one day run.</p>' +
          '<p>The headmaster, Mr G. Fairweather, has assured parents that standards will be high. Uniforms will be worn correctly at all times, and pupils will be expected to speak good English in the classroom and the playground alike.</p>' +
          '<p>Several Māori families in the district have asked whether the college will teach the Māori language. Mr Fairweather has replied that the timetable is already full, and that English is the language of opportunity.</p>' +
          '<p>This newspaper has no doubt that Riverbend College will produce fine young citizens, and every parent in the district can be proud.</p>' +
          '<p>The college has been built for one purpose: to prepare the young people of this town for the world as it will be.</p>'
  };
  /** A challenge question on one of the two passages above: printed once, folded after. */
  const onY9 = (p, q) => onPassage(p, Object.assign(q, { prompt: show(p) + q.prompt }));

  Sci.topic({
    id: 'er4', unit: 'reading',
    title: 'Reading Closely',
    // The six passage questions share one or two passages per set, grouped.
    together: { slots: [0, 1, 2, 3, 4, 5], max: 2 },
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
        text: '<p>Reading two texts together lets you <strong>compare</strong> (how are they alike or different?) and <strong>synthesise</strong> (what do they show together?).</p>' },
      { id: 'craft', title: 'Purpose from the writer’s choices', years: '9', wide: true,
        text: '<p>A writer’s <strong>purpose</strong> shows in the choices they make. Look at four things and ask <em>why this?</em></p>' +
              Sci.table(['Look at', 'Ask', 'Example'], [
                ['<strong>Content</strong>', 'What has the writer chosen to include?', 'A neighbour arriving with soup in a storm shows kindness without the writer having to name it.'],
                ['<strong>Structure</strong>', 'How does it begin and end? What sits next to what?', 'A story that begins and ends on the same beach invites readers to notice how the character has changed.'],
                ['<strong>Language</strong>', 'Which words were chosen over plainer ones?', '“The park <em>boasts</em> a new playground” praises; “has a new playground” just informs.'],
                ['<strong>Style</strong>', 'Is it formal, chatty, spare, grand?', 'A confident, formal editorial sounds like the voice of authority.']]) +
              '<p>Then draw a conclusion: “The writer wants readers to feel / think … because …”</p>' },
      { id: 'portray', title: 'Perspectives and portrayals', years: '9', wide: true,
        text: '<p>A <strong>perspective</strong> is the point of view a text comes from.</p>' +
              '<p>It can be <strong>explicit</strong> (stated outright: <em>“We believe the council has made a mistake.”</em>) or <strong>implicit</strong> (shown through choices: who tells the story, which words describe people, whose side we see first).</p>' +
              '<p>A <strong>portrayal</strong> is how a group of people is shown: as heroes or troublemakers, as individuals with names, or as a faceless crowd. Ask: would that group recognise themselves?</p>' },
      { id: 'omit', title: 'Who is in, who is left out', years: '9',
        text: '<p>Notice whose voices a text <strong>quotes</strong>, whose it only <strong>describes</strong>, and who is <strong>missing</strong>.</p>' +
              '<p>Leaving people out has an effect: one view can seem like the only view, and a group with no voice is easy to ignore.</p>' +
              '<p><em>A story about a new road quotes the mayor and the builder, but nobody who lives on the street.</em> → readers hear only the people in favour, and the residents’ concerns stay invisible.</p>' },
      { id: 'values', title: 'A text and its time', years: '9',
        text: '<p>Every text is written in a time and place with its own common <strong>values</strong> (beliefs about what is normal or right).</p>' +
              '<p>A text can <strong>reflect</strong> those values (simply show them), <strong>reinforce</strong> them (present them as natural, or praise them), or <strong>challenge</strong> them (question them).</p>' +
              '<p>Meanings shift over time: a line that sounded hopeful when it was written can read as ironic decades later, because today’s readers know what happened next.</p>' },
      { id: 'interpret', title: 'Judging interpretations', years: '9',
        text: '<p>Readers can interpret the same text differently, because of their own background, experience and time.</p>' +
              '<p>But not every reading is equally good. The best-supported interpretation:</p>' +
              '<ul><li>can point to specific words in the text</li><li>fits the whole text, not just one line</li><li>is not contradicted by anything in the text</li></ul>' },
      { id: 'strongest', title: 'Choosing the strongest evidence', years: '9',
        text: '<p>Strong evidence supports the claim <strong>directly</strong> and <strong>specifically</strong>. A quote that is only about the same topic is weak.</p>' +
              '<p>Claim: <em>Liam is terrified at the top of the ropes course.</em></p>' +
              '<p>Weak: <em>“The high ropes course looked easy from the ground.”</em> (about the course, not his fear)<br>Strong: <em>“His legs had stopped belonging to him.”</em></p>' }
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
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + 'What is the main idea of this passage?', right: p.main[0], wrong: p.main[1],
          explain: 'The main idea sums up the whole passage, not one detail.' }))) },
      { name: 'Inference', learn: 'infer',
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + p.infer[0], right: p.infer[1], wrong: p.infer[2],
          explain: 'The writer does not say this outright, but the details point to it.' }))) },
      { name: 'Evidence', learn: 'evidence',
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + p.evidence[0], right: p.evidence[1], wrong: p.evidence[2],
          explain: 'This detail supports the idea most directly.' }))) },
      { name: 'Theme', learn: 'theme',
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + 'Which is the best statement of a theme?', right: p.theme[0], wrong: p.theme[1],
          explain: 'A theme is the bigger idea behind the passage, something readers could relate to their own lives.' }))) },
      { name: 'Words in context', learn: 'vocab',
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + `As used in the passage, what does <strong>${p.vocab[0]}</strong> mean?`, right: p.vocab[1], wrong: p.vocab[2], wide: false,
          explain: 'The words around it give the clue.' }))) },
      { name: 'Purpose and viewpoint', learn: 'purpose',
        items: PASSAGES.map(p => rng => onPassage(p, C(rng, { prompt: show(p) + p.purpose[0], right: p.purpose[1], wrong: p.purpose[2],
          explain: 'Ask why the writer made this choice, and what they want the reader to think or feel.' }))) },
      { name: 'Stated or inferred?', learn: 'infer',
        items: [rng => onPassage(byTitle('Before the tide'), Sci.sort(rng, { prompt: show(byTitle('Before the tide')) + 'Is each idea stated directly in the passage, or inferred?', bins: ['Stated', 'Inferred'],
          items: [
            { text: 'Koro was already fishing when Aroha arrived.', bin: 0 }, { text: 'They fished until the tide turned.', bin: 0 },
            { text: 'Aroha carried the bucket home.', bin: 0 }, { text: 'Koro fumbled the hook twice.', bin: 0 },
            { text: 'Koro is getting older.', bin: 1 }, { text: 'Aroha is starting to look after Koro.', bin: 1 },
            { text: 'Koro is not really annoyed that Aroha was late.', bin: 1 }, { text: 'They both notice the change but choose not to mention it.', bin: 1 }
          ], pick: 6,
          explain: 'Stated ideas are written in the text. Inferred ideas are what the details suggest.' }))] },
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
      { name: 'Extension: across two texts', learn: 'synth', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: fold('Before the tide', 'Nan’s garden') + '<em>Before the tide</em> and <em>Nan’s garden</em> both involve a grandparent. What idea do they share?', right: 'Respect for an older person’s lifetime of skill and knowledge', wrong: ['The dangers of the sea', 'How to grow vegetables', 'The importance of being on time'], explain: 'Both texts show a younger person noticing and valuing what an elder knows.' }),
          rng => C(rng, { tag: EXT, prompt: fold('The top platform', 'Mrs Patel') + '<em>The top platform</em> and <em>Mrs Patel’s torch</em> are both about a small act. How do they differ?', right: 'One is about personal courage; the other about kindness to others.', wrong: ['Both are about fishing.', 'One is a poem and the other a report.', 'There is no difference.'], explain: 'Comparing shows each text’s focus more clearly.' }),
          rng => C(rng, { tag: EXT, prompt: fold('Bringing back', 'Our town') + 'The kākāpō report and the skate park opinion piece both use facts. How do they use them differently?', right: 'The report uses facts to inform; the opinion piece uses them to persuade.', wrong: ['Both use facts only to entertain.', 'Neither uses any facts.', 'The report persuades and the opinion piece informs.'], explain: 'The same kind of evidence can serve different purposes.' }),
          rng => C(rng, { tag: EXT, prompt: fold('Our town', 'Mrs Patel') + 'What theme do <em>Our town needs a skate park</em> and <em>Mrs Patel’s torch</em> share?', right: 'Belonging: people need a place and a community to be part of', wrong: ['The dangers of storms', 'The cost of building things', 'Learning to fish'], explain: 'One argues young people need somewhere to belong; the other shows neighbours becoming a community.' }),
          rng => C(rng, { tag: EXT, prompt: 'What does it mean to synthesise ideas from two texts?', right: 'To combine what both show into a new, bigger understanding', wrong: ['To copy one text into the other', 'To find the longest text', 'To count the words in both'], explain: 'Synthesis goes beyond comparing: it builds a new idea from both.' }),
          rng => C(rng, { tag: EXT, prompt: fold('Before the tide', 'Nan’s garden') + 'Which statement synthesises <em>Before the tide</em> and <em>Nan’s garden</em>?', right: 'Both suggest that knowledge passes between generations through shared time, not just words.', wrong: ['Before the tide is about fishing; Nan’s garden is about gardening.', 'Both have a grandparent.', 'Nan’s garden is a poem.'], explain: 'A synthesis states a bigger idea that both texts support; the others only list features.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.
      // Each item is on one of two Year 9 passages (DAIRY, COLLEGE); the first
      // card to use a passage prints it, later ones fold it away.

      // 11 · The writer’s purpose, from content, structure, language and style.
      {
        name: 'Year 9: the writer’s purpose', learn: 'craft', challenge: 'only',
        items: [
          rng => onY9(DAIRY, C(rng, { prompt: 'The story opens with the narrator turning the sign to OPEN and ends with them turning it to CLOSED. Why might the writer have structured it this way?',
            right: 'The matching opening and ending frame the last day, so the final turn of the sign marks a loss the reader feels.',
            wrong: ['To show that the dairy kept its normal opening hours that day.', 'To explain how the sign worked.', 'To show that the narrator was now in charge of the shop.'],
            explain: 'Structure carries meaning: the sign that starts the day also ends the dairy’s life. The other options describe what happens without asking why the writer placed it at the start and the end.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'The writer lists the supermarket’s “forty checkouts, free parking and a bakery”, then the dairy’s “one counter, a bell above the door, and Dad”. What is the main purpose of this contrast?',
            right: 'To suggest the dairy cannot compete on size, but offers something personal the supermarket lacks.',
            wrong: ['To persuade readers that supermarkets are better in every way.', 'To show that Dad also worked at the supermarket.', 'To give readers directions to both shops.'],
            explain: 'Listing Dad alongside the counter and the bell makes him part of the shop. The supermarket wins on size; the dairy’s value is the person behind the counter.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'Why does the writer include the detail that Dad “pretended not to notice” the boys were twenty cents short?',
            right: 'To show his quiet kindness: personal care that a big supermarket checkout would not offer.',
            wrong: ['To show that Dad was bad at counting money.', 'To suggest the boys were stealing from the dairy.', 'To explain that the dairy closed because it lost money on lollies.'],
            explain: '“Pretended” tells us he did notice, and chose to let it go. “As always” shows this kindness was a habit.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'What is the writer’s main purpose in this editorial?',
            right: 'To celebrate the new college and encourage the town’s parents to feel proud of it',
            wrong: ['To report neutrally on both sides of a debate about the college', 'To criticise the headmaster’s decisions', 'To give pupils instructions for their first day'],
            explain: 'Praise runs all the way through (“a great step”, “a credit to”, “fine young citizens”), and it ends by telling parents they “can be proud”. It is not neutral: the families’ side is never put.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'The editorial uses phrases such as “a great step into the modern age”, “a credit to” and “boasts”. What does this language show about the writer’s purpose?',
            right: 'The writer wants readers to see the college in an entirely positive light.',
            wrong: ['The writer is warning readers about the college’s problems.', 'The writer is trying to sound neutral and balanced.', 'The writer is describing the buildings in technical detail.'],
            explain: 'These are words of praise. A neutral writer would say the wing “has” a kitchen, not that it “boasts” one.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'The editorial ends with a one-sentence paragraph: “The college has been built for one purpose …”. Why end this way?',
            right: 'A short, confident final paragraph leaves readers with a strong sense that the college is right for the future.',
            wrong: ['To introduce a new topic for the next editorial.', 'To admit the writer is unsure what the college is for.', 'To list the subjects the college will teach.'],
            explain: 'A short final paragraph stands out. Its certain tone (“one purpose”) sends readers away convinced.' }))
        ]
      },

      // 12 · Perspectives and portrayals of groups.
      {
        name: 'Year 9: perspectives and portrayals', learn: 'portray', challenge: 'only',
        items: [
          rng => onY9(DAIRY, C(rng, { prompt: 'From whose perspective is the story told, and how does that shape the reader’s sympathy?',
            right: 'From the dairy owner’s child, so readers feel the closure as a personal loss for the family.',
            wrong: ['From the supermarket manager, so readers celebrate the new store.', 'From Mrs Hōhaia, so readers mainly learn about her grandson.', 'From a neutral outsider who gives every side equally.'],
            explain: 'The narrator says “Dad” and “our dairy”, so we see everything from inside the family. That is why the story feels like a loss.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'How does the story portray the dairy’s customers?',
            right: 'As regulars with names and lives, who treat the dairy as part of their community',
            wrong: ['As strangers who rarely visit', 'As rude people who argue with Dad', 'As shoppers who care only about low prices'],
            explain: 'Mrs Hōhaia, the two boys and Mr Brennan each get a small, human detail: rugby, lollies, a magazine. They are people, not just customers.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'How is the supermarket portrayed?',
            right: 'Only through its size and features, with no named people, so it feels big and impersonal.',
            wrong: ['As a friendly place full of named characters', 'As the hero of the story', 'It is not mentioned at all.'],
            explain: 'We learn about checkouts, parking and a bakery, but meet no one. Compare the dairy, where everyone has a name.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'How does the editorial portray girls?',
            right: 'As future homemakers, preparing to run homes rather than to enter trades or professions',
            wrong: ['As future engineers and professionals', 'As the pupils the college cares about most', 'It does not mention girls at all.'],
            explain: 'Boys will enter “trades and professions”; girls will run “the homes they will one day run”. The editorial treats this as natural.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Which sentence states the newspaper’s perspective <strong>explicitly</strong>, rather than implying it?',
            right: '“This newspaper has no doubt that Riverbend College will produce fine young citizens.”',
            wrong: ['“The boys’ wing has a fully equipped engineering workshop and a woodwork room.”', '“Uniforms will be worn correctly at all times.”', '“The headmaster, Mr G. Fairweather, has assured parents that standards will be high.”'],
            explain: 'The newspaper names itself and states its view outright. The others report facts or someone else’s words; any perspective in them is implied.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'The editorial calls the boys “<strong>our</strong> lads” and the girls “<strong>our</strong> young ladies”. What does “our” suggest about the writer’s perspective?',
            right: 'The writer speaks as part of the town, inviting readers to see the pupils as belonging to the whole community.',
            wrong: ['The writer is an outsider who disapproves of the town.', 'The pupils work for the newspaper.', 'The writer is speaking directly to the pupils.'],
            explain: '“Our” puts the writer and reader on the same side, as proud members of one community.' }))
        ]
      },

      // 13 · Who is included and who is left out.
      {
        name: 'Year 9: who is left out', learn: 'omit', challenge: 'only',
        items: [
          rng => onY9(COLLEGE, C(rng, { prompt: 'Several Māori families asked whether the college would teach the Māori language. Whose voice does the editorial include on this question?',
            right: 'Only the headmaster’s: the families’ request is mentioned, but none of them is quoted.',
            wrong: ['Only the families’: the headmaster does not reply.', 'Both equally, with the reasons of each side.', 'Neither: the request is not mentioned.'],
            explain: 'We learn what the headmaster replied and why. We never hear the families’ reasons.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'What is the effect of reporting the headmaster’s reply, but not the families’ reasons for asking?',
            right: 'The matter seems settled and minor, so readers are not invited to think about why the families asked.',
            wrong: ['Readers learn the families’ reasons in full.', 'It makes the editorial balanced.', 'It shows the newspaper supports the families’ request.'],
            explain: 'Leaving a group’s voice out makes the official view look like the only sensible one.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Which of these does the editorial leave out?',
            right: 'Any suggestion that girls might train for trades or professions',
            wrong: ['What the boys’ wing contains', 'What the headmaster expects of uniforms', 'When the college opens'],
            explain: 'Trades and professions are mentioned only for boys. The other three are all in the editorial.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'The story never shows anyone from the supermarket: no staff and no shoppers. What is the effect of leaving them out?',
            right: 'The supermarket stays faceless, so the reader’s sympathy rests entirely with the dairy and its regulars.',
            wrong: ['It proves the supermarket has no staff.', 'It makes the story balanced between the two shops.', 'It shows that the supermarket is closing too.'],
            explain: 'People we never meet are hard to care about. Everyone with a name in the story belongs to the dairy’s world.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'The narrator never says outright why the dairy is closing. What is the effect of leaving this unsaid?',
            right: 'Readers work it out from the details about the new supermarket, so the cause is clear without the narrator complaining.',
            wrong: ['Readers have no way of knowing why it closes.', 'It shows the dairy is closing only for repairs.', 'It suggests that Dad is retiring because he is ill.'],
            explain: 'The supermarket opening “in March” sits right before the last day, so readers infer the link. The quiet telling makes the story sadder, not angrier.' }))
        ]
      },

      // 14 · How a text reflects, reinforces or challenges the values of its time.
      {
        name: 'Year 9: a text and its time', learn: 'values', challenge: 'only',
        items: [
          rng => onY9(COLLEGE, C(rng, { prompt: 'Many people in 1958 believed boys and girls should prepare for different roles in life. What does the editorial do with this belief?',
            right: 'It reinforces it, presenting separate futures as natural and worth celebrating.',
            wrong: ['It challenges it, arguing that girls should learn engineering.', 'It avoids the subject of boys and girls entirely.', 'It mocks the belief as old-fashioned.'],
            explain: 'The editorial does more than show the belief: it praises the separate wings, which strengthens the belief.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'The headmaster says that “English is the language of opportunity.” Which belief of its time does this reflect?',
            right: 'That getting on in life meant speaking English, with little room for te reo Māori at school',
            wrong: ['That every pupil should learn several languages', 'That te reo Māori should be taught in every school', 'That schools should not teach any languages'],
            explain: 'The reply treats English as the only language that matters for success, which is why the request is turned down. Pupils are even expected to speak English in the playground.' })),
          rng => onY9(COLLEGE, C(rng, { learn: 'interpret', prompt: 'Why might a reader today read the final line, “for the world as it will be”, differently from a reader in 1958?',
            right: 'Today’s reader knows the world changed (women now work in every field, and te reo Māori is taught in many schools), so the line now reads as ironic.',
            wrong: ['The line means exactly the same to every reader in every time.', 'Readers today cannot understand old newspapers.', 'In 1958 nobody read editorials.'],
            explain: 'Meanings shift over time. The writer’s confident prediction turned out to be wrong, and readers today can see that.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Which detail would a 1958 reader most likely have seen as ordinary, but a reader today is likely to question?',
            right: 'Girls learning cooking and sewing so they can run homes, while boys train for trades and professions',
            wrong: ['The college opening on a set day', 'A newspaper writing about a local event', 'The town having a new school building'],
            explain: 'Assumptions about gender roles have changed a great deal since 1958. The other details would seem ordinary in either time.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'Which common value does the story challenge?',
            right: 'That bigger, cheaper and more convenient is always better',
            wrong: ['That neighbours should look after one another', 'That small acts of kindness matter', 'That it is worth knowing the people in your community'],
            explain: 'The supermarket has every practical advantage, yet the story makes us feel what is lost. The other three are values the story supports.' }))
        ]
      },

      // 15 · Which interpretations are supported by the text.
      {
        name: 'Year 9: which readings hold up?', learn: 'interpret', challenge: 'only',
        items: [
          rng => onY9(DAIRY, Sci.sort(rng, { prompt: 'Which interpretations of Dad are supported by the story?', bins: ['Supported', 'Not supported'],
            items: [
              { text: 'Dad finds it hard to let the dairy go.', bin: 0 }, { text: 'Dad takes pride in the shop, even on its last day.', bin: 0 },
              { text: 'Dad is kind to his customers.', bin: 0 }, { text: 'Dad keeps his sadness to himself.', bin: 0 },
              { text: 'Dad is relieved that the long hours are over.', bin: 1 }, { text: 'Dad is angry with his customers for leaving.', bin: 1 },
              { text: 'Dad plans to open a bigger shop.', bin: 1 }, { text: 'Dad no longer cares about the dairy.', bin: 1 }
            ], pick: 6,
            explain: 'Supported readings point to words: sweeping a floor “nobody would walk on”, “smiled at the floor”, “pretended not to notice”, listening at the door. Nothing in the story suggests relief, anger or new plans.' })),
          rng => onY9(DAIRY, Sci.sort(rng, { prompt: 'Which readings of these details are supported by the story?', bins: ['Supported', 'Not supported'],
            items: [
              { text: '“CLOSED looked smaller than OPEN” shows the narrator’s feelings changing what they see.', bin: 0 },
              { text: 'The bell ringing “the way it always had” links the last moment to years of routine.', bin: 0 },
              { text: 'Mrs Hōhaia’s “nineteen years” show how long the dairy has been part of people’s lives.', bin: 0 },
              { text: 'Straightening the cards to face the door shows Dad still caring for the shop as if customers will come.', bin: 0 },
              { text: '“CLOSED looked smaller than OPEN” means the sign was badly printed.', bin: 1 },
              { text: 'The bell rings at the end because a customer walks in.', bin: 1 },
              { text: 'The supermarket’s bakery shows the narrator wants to work there.', bin: 1 },
              { text: 'Mr Brennan’s magazine shows he is moving away next month.', bin: 1 }
            ], pick: 6,
            explain: 'The text says the letters “were the same size”, so the smaller look is a feeling. The bell rings as they leave, not for a customer. Nothing links the narrator to a job at the supermarket or Mr Brennan to moving.' })),
          rng => onY9(COLLEGE, Sci.sort(rng, { prompt: 'Which readings of the editorial are supported by the text?', bins: ['Supported', 'Not supported'],
            items: [
              { text: 'The writer assumes boys and girls will have different futures.', bin: 0 },
              { text: 'The writer trusts the headmaster’s judgement.', bin: 0 },
              { text: 'The writer treats the families’ request as already answered.', bin: 0 },
              { text: 'The writer wants parents to feel proud of the college.', bin: 0 },
              { text: 'The writer thinks girls should study engineering.', bin: 1 },
              { text: 'The writer quotes the Māori families to explain their reasons.', bin: 1 },
              { text: 'The writer is worried that standards will be low.', bin: 1 },
              { text: 'The writer criticises the Department of Education.', bin: 1 }
            ], pick: 6,
            explain: 'The supported readings match the text: separate wings, the headmaster’s reply reported without question, “every parent … can be proud”. The others contradict it: the Department gets praise (“a credit to”), and standards “will be high”.' })),
          rng => onY9(COLLEGE, Sci.sort(rng, { prompt: 'A modern reader makes these claims about the editorial. Which are supported by its words?', bins: ['Supported', 'Not supported'],
            items: [
              { text: 'Te reo Māori had no place on this college’s timetable.', bin: 0 },
              { text: 'The editorial presents different futures for boys and girls as normal.', bin: 0 },
              { text: 'The editorial gives the headmaster’s view but not the families’.', bin: 0 },
              { text: 'Pupils were expected to speak English even in the playground.', bin: 0 },
              { text: 'The editorial says Māori pupils could not enrol.', bin: 1 },
              { text: 'The editorial shows that every family in the town agreed with the headmaster.', bin: 1 },
              { text: 'The editorial says the college had no kitchen.', bin: 1 },
              { text: 'The editorial was written to criticise the college.', bin: 1 }
            ], pick: 6,
            explain: 'A reader’s own time can sharpen what they notice, but a claim still needs words in the text. Nothing says Māori pupils were refused; some families clearly did not get what they asked for; the girls’ wing has a kitchen; and the tone is all praise.' }))
        ]
      },

      // 16 · Choosing the strongest evidence.
      {
        name: 'Year 9: the strongest evidence', learn: 'strongest', challenge: 'only',
        items: [
          rng => onY9(DAIRY, C(rng, { prompt: 'Claim: <em>the dairy was part of its customers’ daily lives.</em> Which quotation is the strongest evidence?',
            right: '“Mrs Hōhaia bought her paper, as she had every morning for nineteen years, and stayed to talk about her grandson’s rugby.”',
            wrong: ['“The new supermarket had opened on the main road in March.”', '“He wiped the counter.”', '“Then he handed me the sign.”'],
            explain: '“Every morning for nineteen years” is daily routine, stated directly, and staying to talk shows it mattered. The others are not about customers at all.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'Claim: <em>Dad finds it hard to accept that the dairy is closing.</em> Which quotation is the strongest evidence?',
            right: '“Dad stood in the doorway a moment, listening, as if it might ring again.”',
            wrong: ['“Our dairy had one counter, a bell above the door, and Dad.”', '“Two boys from the intermediate counted out coins for a bag of mixed lollies.”', '“It had forty checkouts, free parking and a bakery you could smell from the car park.”'],
            explain: 'Lingering and listening for the bell shows he is not ready to leave. The others describe the shops or customers, not Dad’s feelings about closing.' })),
          rng => onY9(DAIRY, C(rng, { prompt: 'Claim: <em>both the narrator and Dad know it is the last day, but neither says so.</em> Which quotation is the strongest evidence?',
            right: '“Neither of us mentioned that it would be the last time.”',
            wrong: ['“People still came in that day.”', '“He straightened the rack of birthday cards so that they faced the door.”', '“The bell rang once as we left, the way it always had.”'],
            explain: 'This sentence states the claim almost exactly: they both know, and neither says it.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Claim: <em>the editorial expects girls’ futures to be in the home.</em> Which quotation is the strongest evidence?',
            right: '“… so that our young ladies will be well prepared for the homes they will one day run.”',
            wrong: ['“The headmaster, Mr G. Fairweather, has assured parents that standards will be high.”', '“Uniforms will be worn correctly at all times.”', '“Tomorrow the doors of Riverbend College open …”'],
            explain: 'It names girls and homes directly. The others say nothing about girls’ futures.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Claim: <em>the college was not willing to teach te reo Māori.</em> Which quotation is the strongest evidence?',
            right: '“Mr Fairweather has replied that the timetable is already full, and that English is the language of opportunity.”',
            wrong: ['“The new buildings are a credit to the Department of Education.”', '“This newspaper has no doubt that Riverbend College will produce fine young citizens.”', '“Uniforms will be worn correctly at all times.”'],
            explain: 'This is the college’s direct answer to the request, and it turns it down. The others are about buildings, the newspaper’s opinion and uniforms.' })),
          rng => onY9(COLLEGE, C(rng, { prompt: 'Two students argue that the editorial is one-sided. Which reason is the stronger support for their claim?',
            right: 'It reports the headmaster’s reply, but gives no reasons from the families who made the request.',
            wrong: ['It is quite short for a newspaper article.', 'It was written a long time ago.', 'It mentions the Department of Education.'],
            explain: 'One-sided means only one view is given. The strongest support points to the missing side. Length, age and mentioning a department do not make a text one-sided.' }))
        ]
      },

      // 17 · Details and what they suggest.
      {
        name: 'Year 9: details and what they suggest', learn: 'craft', challenge: 'only',
        items: [
          rng => onY9(DAIRY, match(rng, 'Match each detail to what it suggests.', [
            ['“one counter, a bell above the door, and Dad”', 'Dad is as much a part of the dairy as its fittings.'],
            ['“every morning for nineteen years”', 'The dairy is part of a customer’s routine.'],
            ['“Dad said, ‘We’ll see,’ and smiled at the floor”', 'Dad hides his sadness behind politeness.'],
            ['“CLOSED looked smaller than OPEN”', 'The narrator’s grief shapes how things look.']
          ], 'Each detail is small, but each one carries feeling. Close reading asks what a detail suggests, not just what it says.')),
          rng => onY9(DAIRY, match(rng, 'Match each detail to what it suggests.', [
            ['“pretended not to notice”', 'Dad’s quiet generosity'],
            ['“though nobody would walk on it again”', 'Care for the shop beyond any practical need'],
            ['“forty checkouts, free parking”', 'The supermarket’s size and convenience'],
            ['“as if it might ring again”', 'A hope that the dairy’s life is not quite over']
          ], 'The writer lets details do the work instead of telling us how the characters feel.')),
          rng => onY9(COLLEGE, match(rng, 'Match each phrase to what it suggests.', [
            ['“a great step into the modern age”', 'The college means progress for the town.'],
            ['“our lads”', 'The pupils belong to the whole community.'],
            ['“the homes they will one day run”', 'Girls are expected to become homemakers.'],
            ['“the language of opportunity”', 'English is seen as the key to success.']
          ], 'Word choices reveal the values behind a text, even when they are not stated as opinions.')),
          rng => onY9(COLLEGE, match(rng, 'Match each phrase to what it suggests.', [
            ['“a credit to the Department of Education”', 'Praise for the officials who built it'],
            ['“the timetable is already full”', 'A practical-sounding reason for saying no'],
            ['“in the classroom and the playground alike”', 'English is expected everywhere at school, not just in lessons.'],
            ['“every parent in the district can be proud”', 'Readers are invited to share the newspaper’s view.']
          ], 'Each phrase steers the reader towards approving of the college.'))
        ]
      }
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
          ['Malinformation', 'true information shared to cause harm']]) },
      { id: 'mdmcases', title: 'Mis, dis or mal? Harder cases', years: '9', wide: true,
        text: '<p>Ask two questions: <strong>Is it true?</strong> and <strong>What did the person sharing it intend?</strong></p>' +
              Sci.table(['The information is …', 'Shared …', 'So it is'], [
                ['false', 'believing it is true', '<strong>misinformation</strong>'],
                ['false', 'knowing it is false, to mislead', '<strong>disinformation</strong>'],
                ['true', 'to cause harm (often private details)', '<strong>malinformation</strong>']]) +
              '<p>The same false story can be <em>disinformation</em> when someone invents it, and <em>misinformation</em> when people who believe it pass it on.</p>' +
              '<p>Clearly labelled satire is a joke, not disinformation. It becomes misinformation when someone shares it believing it is real.</p>' },
      { id: 'context', title: 'Missing or twisted context', years: '9', wide: true,
        text: '<p>Real material can mislead when its <strong>context</strong> is removed or changed:</p>' +
              Sci.table(['Trick', 'Example'], [
                ['Old photo, new story', 'A photo of a 2019 snowstorm shared as “today”'],
                ['Cropping', 'Cutting the rubbish bins out of a photo of a “spotless” beach'],
                ['Quote out of context', 'Quoting “the pool should close” from “Some say the pool should close. I disagree.”'],
                ['False caption', 'A real video labelled as a different event']]) +
              '<p>Check: a <strong>reverse image search</strong> shows where and when a picture first appeared; find the <strong>full quote</strong> or the original video.</p>' },
      { id: 'lateral', title: 'Reading laterally', years: '9', wide: true,
        text: '<p>Fact-checkers do not just read <em>down</em> a page. They read <strong>laterally</strong>: they open new tabs to find out what others say about the source.</p>' +
              '<ul><li><strong>Author</strong>: who are they, and do they know this field?</li><li><strong>Date</strong>: is it current?</li>' +
              '<li><strong>Evidence</strong>: can you follow its sources?</li><li><strong>Purpose</strong>: who runs it, and who gains if you believe it?</li></ul>' +
              '<p>A site’s own “About us” page tells you how it <em>wants</em> to be seen. A professional look is not evidence.</p>' },
      { id: 'framing', title: 'Headlines, framing and positioning', years: '9', wide: true,
        text: '<p><strong>Clickbait</strong> holds back the key fact to make you click: <em>“You won’t believe what she found …”</em></p>' +
              '<p><strong>Framing</strong> is choosing words, order and numbers to steer the reader:</p>' +
              '<ul><li>Active or passive: <em>“Driver hits cyclist”</em> names who did it; <em>“Cyclist hit”</em> hides it.</li>' +
              '<li>Same fact, different frame: <em>“80% of trains on time”</em> or <em>“1 in 5 trains late”</em>.</li>' +
              '<li>Loaded labels: <em>“youth”</em> or <em>“yobbos”</em>.</li></ul>' +
              '<p>Together these <strong>position the audience</strong>: they invite readers to see an issue from one side, often without noticing.</p>' },
      { id: 'hooks', title: 'Emotional hooks', years: '9',
        text: '<p>False and misleading posts often aim at feelings, so you share before you think:</p>' +
              '<ul><li><strong>Urgency</strong>: “Share before it’s deleted!”</li><li><strong>Fear</strong>: “The hidden danger in your kitchen”</li>' +
              '<li><strong>Outrage</strong>: “This should make you furious”</li><li><strong>Bandwagon</strong>: “Everyone is sharing this”</li>' +
              '<li><strong>Us and them</strong>: “They don’t want people like us to know”</li></ul>' +
              '<p>A strong feeling is a signal to pause and check.</p>' },
      { id: 'ethics', title: 'Using media ethically', years: '9',
        text: '<ul><li><strong>Intellectual property</strong>: songs, photos, videos and writing belong to their creators. Crediting is not the same as permission: use licensed material (such as Creative Commons) or ask.</li>' +
              '<li><strong>Quote accurately</strong>: keep a quote’s meaning and its context.</li>' +
              '<li><strong>Represent people fairly</strong>: give the strongest version of a view you disagree with, and include the voices of those affected.</li>' +
              '<li><strong>Think before posting</strong> about real people.</li></ul>' }
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
      { name: 'Extension: false information', learn: 'mdm', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Your aunt shares a false health tip, believing it is true. What is this?', right: 'Misinformation', wrong: ['Disinformation', 'Malinformation', 'A citation'], explain: 'False information shared by mistake.' }),
          rng => C(rng, { tag: EXT, prompt: 'A fake account spreads a made-up story to make people distrust an election. What is this?', right: 'Disinformation', wrong: ['Misinformation', 'Malinformation', 'Satire'], explain: 'False information shared deliberately to mislead.' }),
          rng => C(rng, { tag: EXT, prompt: 'Someone posts another person’s real home address to get them harassed. What is this?', right: 'Malinformation', wrong: ['Misinformation', 'Disinformation', 'A news report'], explain: 'True information shared to cause harm.' }),
          rng => C(rng, { tag: EXT, prompt: 'What is the key difference between misinformation and disinformation?', right: 'Intent: disinformation is deliberately misleading; misinformation is a mistake.', wrong: ['Length', 'Whether it has pictures', 'Whether it is online'], explain: 'Both are false; the difference is the purpose behind sharing.' }),
          rng => C(rng, { tag: EXT, prompt: 'A headline says “You won’t BELIEVE what this kid found!” What is it most likely?', right: 'Clickbait designed to get clicks', wrong: ['A peer-reviewed study', 'A government report', 'A dictionary entry'], explain: 'Exaggerated, vague headlines aim to make you click rather than inform.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why might false information spread faster than true information online?', right: 'It is often more surprising or emotional, so people share it quickly.', wrong: ['True information is not allowed online.', 'False information is always shorter.', 'Computers prefer false information.'], explain: 'Strong emotions make people share before checking.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Mis, dis or mal: harder cases.
      {
        name: 'Year 9: mis, dis or mal?', learn: 'mdmcases', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A comedy website, clearly labelled as satire, posts a made-up story that Parliament will be painted pink. Your cousin shares it as real news. What is your cousin spreading?',
            right: 'Misinformation', wrong: ['Disinformation', 'Malinformation', 'Accurate news'],
            explain: 'The story is false, but your cousin believes it. Labelled satire is a joke, not an attempt to mislead; it becomes misinformation when someone shares it as true.' }),
          rng => C(rng, { prompt: 'A company writes fake five-star reviews of its own product and posts them under made-up names. What is this?',
            right: 'Disinformation', wrong: ['Misinformation', 'Malinformation', 'Satire'],
            explain: 'The reviews are false and were created on purpose to mislead buyers.' }),
          rng => C(rng, { prompt: 'Someone posts screenshots of a classmate’s real, private messages to embarrass them. What is this?',
            right: 'Malinformation', wrong: ['Misinformation', 'Disinformation', 'Satire'],
            explain: 'The messages are genuine, so this is not false information. Sharing true, private information to cause harm is malinformation.' }),
          rng => C(rng, { prompt: 'Someone makes a fake “School closed tomorrow” notice as a prank, knowing it is false. Hundreds of parents share it because they believe it. Which describes <strong>the parents’</strong> sharing?',
            right: 'Misinformation', wrong: ['Disinformation', 'Malinformation', 'Satire'],
            explain: 'The prankster created disinformation. The parents believed it, so when they passed it on it was misinformation. The same false story can be both, depending on who shares it.' }),
          rng => C(rng, { prompt: 'A news site reports a wrong figure by mistake, then publishes a correction the next day. Which is the best description?',
            right: 'The error was misinformation; publishing a correction is a sign of an accountable source.',
            wrong: ['The error was disinformation, because any false figure must be deliberate.', 'It was malinformation, because the figure caused confusion.', 'The correction proves the site cannot be trusted at all.'],
            explain: 'A mistake is not a lie. Reliable outlets make errors too; what marks them out is that they admit and fix them.' }),
          rng => C(rng, { prompt: 'A post contains a false claim. Which fact would most help you decide whether it is misinformation or disinformation?',
            right: 'Whether the person who posted it knew it was false',
            wrong: ['How many likes the post has', 'Whether the post includes a photo', 'How long the post is'],
            explain: 'Both are false. The difference is intent: disinformation is deliberate, misinformation is a mistake.' })
        ]
      },

      // 12 · Missing or manipulated context.
      {
        name: 'Year 9: missing context', learn: 'context', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A photo of a flooded street goes viral captioned “Auckland this morning”. A reverse image search finds the same photo in a 2017 news story from another country. What is the problem?',
            right: 'A real photo is being reused out of context: it shows a different time and place.',
            wrong: ['The photo has been digitally created from nothing.', 'The photo proves the Auckland flood is worse than reported.', 'There is no problem, because the photo is real.'],
            explain: 'The photo is genuine, but the caption is false. Real images can mislead when they are attached to the wrong story.' }),
          rng => C(rng, { prompt: 'A post shows a speaker in front of a few empty chairs, captioned “Nobody came.” The uncropped photo shows the rest of the hall full. What technique has been used?',
            right: 'Cropping the image to remove context and change its meaning',
            wrong: ['Using an old photo for a new event', 'Quoting the speaker out of context', 'Satire that is clearly labelled'],
            explain: 'Nothing in the picture is fake; what was cut out changes the story it tells.' }),
          rng => C(rng, { prompt: 'A councillor said: <em>“Some people say we should close the library. I think that would be a terrible mistake.”</em> A post quotes her as saying: <em>“we should close the library.”</em> What has happened?',
            right: 'The quote has been taken out of context, reversing her meaning.',
            wrong: ['The post has quoted her fairly, because she did say those words.', 'The councillor has changed her mind.', 'The post has paraphrased her accurately.'],
            explain: 'The words were said, but she was describing a view she disagrees with. Cutting the context turns her argument upside down.' }),
          rng => C(rng, { prompt: 'A real video of a cheering crowd is shared with the caption “Fans celebrate the coach being sacked”. It is actually from a concert two years ago. What is the problem?',
            right: 'A genuine video has been given a false caption.',
            wrong: ['The video has been digitally faked.', 'The video is malinformation, because it is true.', 'There is no problem, because the crowd really did cheer.'],
            explain: 'The footage is real, but the caption invents what it shows. The caption is where the false information is.' }),
          rng => C(rng, { prompt: 'You see a dramatic photo with a caption saying it was taken today. What is the best first step to check its context?',
            right: 'Do a reverse image search to find where and when it first appeared.',
            wrong: ['Zoom in to see whether it is sharp.', 'Count how many times it has been shared.', 'Check whether a friend has shared it too.'],
            explain: 'A reverse image search can show an older or different original. Sharpness and shares say nothing about when or where it was taken.' })
        ]
      },

      // 13 · Judging a source’s credibility.
      {
        name: 'Year 9: judging credibility', learn: 'lateral', challenge: 'only',
        items: [
          rng => Sci.sort(rng, { prompt: 'You are judging a website about the health effects of energy drinks. Does each finding raise or lower its credibility?', bins: ['Raises credibility', 'Lowers credibility'],
            items: [
              { text: 'Other reliable sources describe it as an independent health charity.', bin: 0 }, { text: 'Articles name their authors and the authors’ qualifications.', bin: 0 },
              { text: 'Each claim links to research you can follow.', bin: 0 }, { text: 'Pages show when they were last updated.', bin: 0 },
              { text: 'The site is owned by an energy drink company.', bin: 1 }, { text: 'No author or date appears anywhere.', bin: 1 },
              { text: 'The only evidence is customer testimonials.', bin: 1 }, { text: 'Its “About us” page praises it, but no other site mentions it.', bin: 1 }
            ], pick: 6,
            explain: 'Check author, date, evidence and purpose, and what others say about the source. A company judging its own product has a reason to be biased.' }),
          rng => Sci.sort(rng, { prompt: 'An account posts a startling claim about a new school rule. Does each finding raise or lower its credibility?', bins: ['Raises credibility', 'Lowers credibility'],
            items: [
              { text: 'The post links to the official announcement.', bin: 0 }, { text: 'Several established news outlets report the same thing.', bin: 0 },
              { text: 'The account belongs to a named education reporter.', bin: 0 }, { text: 'The post gives a date and details you can check.', bin: 0 },
              { text: 'The account was created last week and has no other posts.', bin: 1 }, { text: 'The post says “Share before they delete this!”', bin: 1 },
              { text: 'It is a screenshot with no source or date.', bin: 1 }, { text: 'The account name copies a news outlet’s with one letter changed.', bin: 1 }
            ], pick: 6,
            explain: 'Credible posts can be traced to a source. New, anonymous or copycat accounts and pressure to share are warning signs.' }),
          rng => Sci.sort(rng, { prompt: 'You are judging a video about why the moa died out. Does each finding raise or lower its credibility?', bins: ['Raises credibility', 'Lowers credibility'],
            items: [
              { text: 'The presenter is an archaeologist who cites published studies.', bin: 0 }, { text: 'The description lists sources you can check.', bin: 0 },
              { text: 'Museum and university websites say the same thing.', bin: 0 }, { text: 'The presenter makes clear which parts are evidence and which are opinion.', bin: 0 },
              { text: 'It claims scientists are hiding “the real truth”.', bin: 1 }, { text: 'It gives no sources at all.', bin: 1 },
              { text: 'It relies on one unnamed “expert”.', bin: 1 }, { text: 'The thumbnail is a shocking image that has nothing to do with moa.', bin: 1 }
            ], pick: 6,
            explain: 'Expertise, checkable sources and agreement with other reliable sources raise credibility. Conspiracy claims, missing sources and misleading thumbnails lower it.' }),
          rng => Sci.sort(rng, { prompt: 'You read laterally about a news website: you leave it and search for what others say. Does each finding raise or lower its credibility?', bins: ['Raises credibility', 'Lowers credibility'],
            items: [
              { text: 'Fact-checking organisations rate its reporting as generally accurate.', bin: 0 }, { text: 'It publishes corrections when it gets things wrong.', bin: 0 },
              { text: 'Its reporters are named and other outlets cite their work.', bin: 0 }, { text: 'It has a long, well-documented history of reporting.', bin: 0 },
              { text: 'It turns out to be run by a company selling the products it reviews.', bin: 1 }, { text: 'Fact-checkers have found many of its stories false.', bin: 1 },
              { text: 'Its editor and address cannot be found anywhere.', bin: 1 }, { text: 'Other sites describe it as a source of made-up stories.', bin: 1 }
            ], pick: 6,
            explain: 'Lateral reading tests a source against what independent sources say about it, rather than how it describes itself.' })
        ]
      },

      // 14 · Headlines, framing and positioning the audience.
      {
        name: 'Year 9: framing and positioning', learn: 'framing', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which headline is clickbait?',
            right: '“She opened the box, and what happened next will shock you”',
            wrong: ['“Rescue dog reunited with owner after three weeks”', '“Rates to rise 6% next year”', '“Kererū numbers up in Wellington survey”'],
            explain: 'Clickbait holds back the key fact to make you click. The others tell you what the story is about.' }),
          rng => C(rng, { prompt: 'Two headlines report the same event: <em>“Police officer injures protester”</em> and <em>“Protester injured as police clear street”</em>. How does the second frame the event?',
            right: 'Its passive wording does not say who caused the injury, so the police seem less responsible.',
            wrong: ['It blames the protester for the injury.', 'It gives more detail about who caused the injury.', 'It has exactly the same effect as the first.'],
            explain: '“Officer injures protester” names who did it. “Protester injured” leaves the cause out, which softens it.' }),
          rng => C(rng, { prompt: 'Two headlines report the same test results: <em>“Nine in ten students pass maths test”</em> and <em>“One in ten students fail maths test”</em>. What does this show?',
            right: 'The same fact can be framed positively or negatively to shape the reader’s reaction.',
            wrong: ['One of the headlines must be false.', 'The two headlines report different results.', 'Only the first headline is accurate.'],
            explain: 'Both are true. Choosing which part to put first steers how readers feel about the results.' }),
          rng => C(rng, { prompt: 'Two people are charged over the same burglary. One headline calls the 16-year-old a “teen thug”; another calls the 40-year-old a “local man”. What does the difference in wording do?',
            right: 'It positions readers to judge the teenager more harshly, although the charge is the same.',
            wrong: ['It shows the teenager’s crime was worse.', 'It keeps both headlines neutral.', 'It uses legal terms that a court has decided.'],
            explain: '“Thug” is a loaded label; “local man” is neutral. This kind of wording can feed a negative portrayal of young people.' }),
          rng => C(rng, { prompt: 'A news story about a factory closing opens with a worker in tears, and gives the company’s reasons only in the last paragraph. How does this structure position readers?',
            right: 'It invites readers to sympathise with the workers before they meet the company’s view.',
            wrong: ['It makes readers favour the company.', 'It is neutral, because both sides appear somewhere.', 'It gives readers the company’s reasons first.'],
            explain: 'What comes first shapes how we read the rest. Many readers never reach the last paragraph.' }),
          rng => C(rng, { prompt: 'What does it mean to say a media text <strong>positions</strong> its audience?',
            right: 'It invites readers to see an issue from a particular point of view, often without their noticing.',
            wrong: ['It tells readers where to sit.', 'It lists the facts in order of importance.', 'It gives every side exactly equal space.'],
            explain: 'Word choice, order, images and who is quoted all nudge readers towards a view.' })
        ]
      },

      // 15 · Emotional hooks that push sharing.
      {
        name: 'Year 9: emotional hooks', learn: 'hooks', challenge: 'only',
        items: [Sci.gen(rng => {
          const rows = rng.sample([
            ['Urgency', ['“Share NOW before this gets taken down!”', '“Only hours left to warn your friends. Pass it on!”']],
            ['Fear', ['“The hidden danger in your child’s lunchbox”', '“This common household item could be poisoning your family”']],
            ['Outrage', ['“This disgusting decision should make every parent furious.”', '“Shameful! An insult to every hard-working family.”']],
            ['Bandwagon', ['“Everyone is sharing this. Don’t be the last to know.”', '“Two million people can’t be wrong. Join them.”']],
            ['Us and them', ['“They don’t want people like us to find out.”', '“The elites are hiding this from ordinary Kiwis.”']],
            ['Curiosity gap', ['“She opened the letter, and what she read will surprise you.”', '“Doctors were stunned by what this man did next.”']]
          ], 4).map(([hook, ex]) => [rng.pick(ex), hook]);
          return Sci.match(rng, 'Match each line from a post to the emotional hook it uses.', rows,
            'Each hook aims to make you feel before you think. A strong feeling is a signal to pause and check before sharing.');
        })]
      },

      // 16 · Using media ethically.
      {
        name: 'Year 9: ethical use', learn: 'ethics', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Dr Kemp said: <em>“Most of the evidence points to warming, though some details are still debated.”</em> You want to use her words in a speech. Which is ethical?',
            right: 'Quote the whole sentence and name Dr Kemp.',
            wrong: ['Quote only “some details are still debated” to suggest she doubts warming.', 'Use the sentence as your own words.', 'Change it to “The evidence proves everything about warming,” said Dr Kemp.'],
            explain: 'Quoting accurately means keeping the meaning and naming the source. The others twist her meaning, take her words without credit, or invent a quote.' }),
          rng => C(rng, { prompt: 'You make a video about a local stream and post it publicly online, using a famous band’s song as background music without permission. What is the main problem?',
            right: 'The song is the band’s intellectual property, so you need permission or a licence to use it.',
            wrong: ['There is no problem as long as you name the band in the description.', 'Videos about nature are not allowed to have music.', 'There is no problem because the video is about a stream.'],
            explain: 'Crediting is not the same as permission. Use music licensed for reuse, or ask.' }),
          rng => C(rng, { prompt: 'A report on a proposed marine reserve quotes a fishing company, a scientist and the council. Who else does a fair report most need to include?',
            right: 'People directly affected, such as local hapū and people who fish there',
            wrong: ['More people who agree with the fishing company', 'Celebrities with large followings', 'Nobody: three voices are always enough'],
            explain: 'Representing an issue fairly means including the voices of those it affects most, not just officials or the loudest group.' }),
          rng => C(rng, { prompt: 'You disagree with an opinion piece and write a reply. What is the fair way to represent the writer’s view?',
            right: 'Summarise their strongest argument accurately, then explain why you disagree.',
            wrong: ['Quote only their weakest sentence.', 'Describe the writer as ignorant.', 'Leave out their reasons entirely.'],
            explain: 'Answering a weaker, twisted version of someone’s view is unfair and also unconvincing. Engage with what they actually argued.' }),
          rng => C(rng, { prompt: 'A meme puts a made-up, mocking caption on a real photo of an ordinary person. Why is sharing it unethical, even “as a joke”?',
            right: 'It misrepresents a real person and can harm them, without their consent.',
            wrong: ['All memes are against the law.', 'Photos of people can never be shared.', 'It is only unethical if it gets a lot of shares.'],
            explain: 'A real person can be hurt by words they never said. One share already spreads it.' })
        ]
      },

      // 17 · Spot the flaw in the checking.
      {
        name: 'Year 9: spot the flaw', learn: 'lateral', challenge: 'only',
        items: [
          rng => Sci.spot(rng, { learn: 'context', prompt: 'A student checks a viral photo.',
            lines: ['A post shows a shark in a flooded street, captioned “Christchurch today”.', 'I did a reverse image search.', 'The same photo appears on a site from five years ago, about a different storm.', 'The photo looks real, so the caption must be true as well.'],
            wrong: 3, explain: 'A real-looking photo can still be attached to a false caption. The search showed it is from a different storm, so the caption is false.' }),
          rng => Sci.spot(rng, { learn: 'lateral', prompt: 'A student checks a health website.',
            lines: ['An article claims a new diet cures asthma.', 'The website looks professional, with a doctor’s photo on every page.', 'So the website must be trustworthy.', 'I could still check what other sources say about it.'],
            wrong: 2, explain: 'A professional look is not evidence. Reading laterally means checking what independent sources say before trusting it.' }),
          rng => Sci.spot(rng, { learn: 'mdmcases', prompt: 'A student classifies a post.',
            lines: ['My uncle shared a post saying a bridge had collapsed.', 'The post turned out to be false.', 'My uncle believed it was true when he shared it.', 'So my uncle was spreading disinformation.'],
            wrong: 3, explain: 'He believed it, so he was spreading misinformation. Disinformation is shared knowing it is false.' }),
          rng => Sci.spot(rng, { learn: 'framing', prompt: 'A student compares two headlines.',
            lines: ['Headline A: “Council wastes $2 million on cycleway”.', 'Headline B: “Council spends $2 million on cycleway”.', 'Both headlines report the same amount.', 'So both headlines are equally neutral.'],
            wrong: 3, explain: '“Wastes” is a loaded word that tells readers what to think. The facts match, but the framing does not.' }),
          rng => Sci.spot(rng, { learn: 'hooks', prompt: 'A student decides whether to share a post.',
            lines: ['A post says: “Share this before it’s deleted! They don’t want you to know!”', 'It gives no source for its claim.', 'The urgent wording makes me want to share it straight away.', 'Because it feels so urgent, it is probably important and true.'],
            wrong: 3, explain: 'Urgency is an emotional hook, not evidence. Noticing the urge to share is the moment to stop and check.' })
        ]
      }
    ]
  });

})();
