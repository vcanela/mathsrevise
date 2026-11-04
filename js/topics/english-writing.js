'use strict';
// ── Revision · English, Writing (Years 7–8) ─────────────────────────────────
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


  // ═══ W6 Tricky spellings ══════════════════════════════════════════════════
  // Writing › Transcription Skills › Spelling. Year 7: ambiguous vowels (<ei>
  // as long a or long e; ‘ou’ as short u; ‘a’ as /o/ after w and qu);
  // ambiguous consonants (<gh> as /f/; <ch> as /ch/, /sh/ or /k/); less
  // common silent letters (<gn>, <gh>, <ps>, <pn>, <mn>, <rh>, <pt>).
  // Year 8: schwa in unstressed syllables; <or> as /er/ after w.
  // Extension: where the unusual spellings come from.

  // Each word with a short clue, three believable misspellings, and the
  // pattern it shows. Misspellings are what the word sounds like, so the
  // question tests the pattern, not a guess.
  const SPELL = [
    { w: 'ceiling', clue: 'the top surface inside a room', bad: ['cieling', 'seiling', 'ceeling'], p: 'ei-e' },
    { w: 'receive', clue: 'to be given something', bad: ['recieve', 'receeve', 'reseive'], p: 'ei-e' },
    { w: 'seize', clue: 'to grab suddenly', bad: ['sieze', 'seeze', 'seaze'], p: 'ei-e' },
    { w: 'protein', clue: 'a nutrient in meat, eggs and beans', bad: ['protien', 'proteen', 'protean'], p: 'ei-e' },
    { w: 'reign', clue: 'the time a king or queen rules', bad: ['rain', 'raign', 'riegn'], p: 'ei-a' },
    { w: 'eight', clue: 'the number after seven', bad: ['eigth', 'aight', 'ate'], p: 'ei-a' },
    { w: 'weigh', clue: 'to find how heavy something is', bad: ['way', 'wiegh', 'waigh'], p: 'ei-a' },
    { w: 'neighbour', clue: 'a person who lives next door', bad: ['nieghbour', 'naybour', 'neighbore'], p: 'ei-a' },
    { w: 'vein', clue: 'a tube that carries blood back to the heart', bad: ['vain', 'vien', 'vane'], p: 'ei-a' },
    { w: 'enough', clue: 'as much as is needed', bad: ['enuff', 'enouf', 'enogh'], p: 'ou' },
    { w: 'touch', clue: 'to feel with your fingers', bad: ['tuch', 'tutch', 'touche'], p: 'ou' },
    { w: 'young', clue: 'not old', bad: ['yung', 'yong', 'younge'], p: 'ou' },
    { w: 'country', clue: 'a nation, or land outside towns', bad: ['cuntry', 'contry', 'countrey'], p: 'ou' },
    { w: 'cousin', clue: 'the child of your aunt or uncle', bad: ['cusin', 'couzin', 'cousen'], p: 'ou' },
    { w: 'double', clue: 'twice as much', bad: ['dubble', 'duble', 'doubble'], p: 'ou' },
    { w: 'wander', clue: 'to walk about with no clear aim', bad: ['wonder', 'wonda', 'whander'], p: 'wa' },
    { w: 'squash', clue: 'to press flat; also a vegetable', bad: ['squosh', 'skwash', 'squoch'], p: 'wa' },
    { w: 'quality', clue: 'how good something is', bad: ['quolity', 'qualaty', 'kwality'], p: 'wa' },
    { w: 'swallow', clue: 'to make food go down your throat', bad: ['swollow', 'swalow', 'swollo'], p: 'wa' },
    { w: 'laugh', clue: 'the sound you make when something is funny', bad: ['laff', 'larf', 'lauph'], p: 'gh' },
    { w: 'cough', clue: 'a sudden noisy breath out when you are sick', bad: ['coff', 'cogh', 'cauf'], p: 'gh' },
    { w: 'tough', clue: 'strong and hard to break', bad: ['tuff', 'touf', 'tugh'], p: 'gh' },
    { w: 'machine', clue: 'a piece of equipment with moving parts', bad: ['masheen', 'machene', 'mashine'], p: 'ch' },
    { w: 'parachute', clue: 'it slows a fall through the air', bad: ['parashoot', 'parachoot', 'parashute'], p: 'ch' },
    { w: 'chorus', clue: 'the part of a song that repeats', bad: ['korus', 'corus', 'chorous'], p: 'ch' },
    { w: 'character', clue: 'a person in a story', bad: ['caracter', 'charactor', 'karacter'], p: 'ch' },
    { w: 'stomach', clue: 'where food goes after you swallow it', bad: ['stomack', 'stumach', 'stomak'], p: 'ch' },
    { w: 'echo', clue: 'a sound that bounces back', bad: ['eko', 'ecco', 'echoe'], p: 'ch' },
    { w: 'gnome', clue: 'a small garden statue with a pointed hat', bad: ['nome', 'gnoam', 'knome'], p: 'silent' },
    { w: 'design', clue: 'a plan or drawing for something', bad: ['desine', 'disign', 'desighn'], p: 'silent' },
    { w: 'ghost', clue: 'the spirit of a dead person in stories', bad: ['gost', 'goast', 'ghoast'], p: 'silent' },
    { w: 'psychology', clue: 'the study of the mind', bad: ['sychology', 'psycology', 'sicology'], p: 'silent' },
    { w: 'autumn', clue: 'the season after summer', bad: ['autum', 'awtumn', 'autunm'], p: 'silent' },
    { w: 'column', clue: 'a tall pillar, or a vertical list', bad: ['colum', 'collum', 'colunm'], p: 'silent' },
    { w: 'rhythm', clue: 'a regular repeated beat', bad: ['rythm', 'rhythem', 'rithm'], p: 'silent' },
    { w: 'rhyme', clue: 'words that end with the same sound', bad: ['ryhme', 'rime', 'rhime'], p: 'silent' },
    { w: 'receipt', clue: 'a paper showing what you paid', bad: ['reciept', 'receit', 'reseat'], p: 'silent' },
    { w: 'pneumonia', clue: 'a serious lung infection', bad: ['neumonia', 'pnumonia', 'newmonia'], p: 'silent' }
  ];
  const PATTERN = {
    'ei-e': '&lt;ei&gt; can say long e, as in ceiling. (After c, it is usually ei: receive, ceiling.)',
    'ei-a': '&lt;ei&gt; can say long a, as in reign, eight and weigh.',
    'ou': '‘ou’ can say a short u, as in enough, touch and young.',
    'wa': 'After w and qu, the letter a often says /o/, as in was, wander and quality.',
    'gh': '&lt;gh&gt; can say /f/, as in laugh, cough and tough.',
    'ch': '&lt;ch&gt; can say /sh/ (machine, parachute) or /k/ (chorus, character), not just /ch/.',
    'silent': 'Some words keep letters we no longer say: gn, gh, ps, pn, mn, rh, pt.'
  };
  const LEARN_FOR = { 'ei-e': 'ei', 'ei-a': 'ei', ou: 'vowels', wa: 'vowels', gh: 'consonants', ch: 'consonants', silent: 'silent' };

  // Year 8: schwa words with the hidden vowel blanked out.
  const SCHWA = [
    ['sep_rate', 'separate', 'a'], ['choc_late', 'chocolate', 'o'], ['diff_rent', 'different', 'e'], ['fam_ly', 'family', 'i'],
    ['defin_te', 'definite', 'i'], ['lem_n', 'lemon', 'o'], ['penc_l', 'pencil', 'i'], ['doct_r', 'doctor', 'o'],
    ['awkw_rd', 'awkward', 'a'], ['anim_l', 'animal', 'a'], ['mem_ry', 'memory', 'o'], ['wat_r', 'water', 'e']
  ];
  const WOR = [
    ['worse', 'not as good', ['werse', 'wurse', 'wirse']], ['world', 'the Earth and everyone on it', ['werld', 'wurld', 'wirld']],
    ['worth', 'having a value of', ['werth', 'wurth', 'wirth']], ['worm', 'a long, soft creature in soil', ['werm', 'wurm', 'wirm']],
    ['work', 'a job, or effort', ['werk', 'wurk', 'wirk']], ['word', 'a unit of language', ['werd', 'wurd', 'wird']]
  ];

  Sci.topic({
    id: 'ew6', unit: 'writing',
    title: 'Tricky Spellings',
    blurb: 'Spellings that do not follow the usual rules for their sounds, and where they come from.',
    hint: 'Look for the pattern: &lt;ei&gt; can say long a (reign) or long e (ceiling); ‘ou’ can say short u (enough); after w, a can say /o/ (was); ' +
          '&lt;gh&gt; can say /f/ (laugh); &lt;ch&gt; can say /sh/ (machine) or /k/ (chorus); and some words keep a silent letter (gnome, autumn, rhyme).',

    learn: [
      { id: 'ei', title: '&lt;ei&gt;: long a or long e',
        text: Sci.table(['Says', 'Examples'], [['long a', 'reign, eight, weigh, neighbour, vein'], ['long e', 'ceiling, receive, seize, protein']]) +
              '<p>After <strong>c</strong>, the long e sound is usually spelt <strong>ei</strong>: receive, ceiling.</p>' },
      { id: 'vowels', title: 'Other ambiguous vowels',
        text: '<ul><li><strong>ou</strong> as a short u: enough, touch, young, country, cousin, double</li>' +
              '<li><strong>a</strong> as /o/ after <strong>w</strong> and <strong>qu</strong>: was, wander, swallow, squash, quality</li></ul>' },
      { id: 'consonants', title: 'Ambiguous consonants',
        text: Sci.table(['Spelling', 'Sound', 'Examples'], [['gh', '/f/', 'laugh, cough, tough, enough'], ['ch', '/ch/', 'chair, church'],
                ['ch', '/sh/', 'machine, parachute, chef'], ['ch', '/k/', 'chorus, character, stomach, echo']]) },
      { id: 'silent', title: 'Silent letters',
        text: Sci.table(['Letters', 'Say', 'Examples'], [['gn', '/n/', 'gnome, design, sign'], ['gh', '/g/', 'ghost'], ['ps', '/s/', 'psychology'],
                ['pn', '/n/', 'pneumonia'], ['mn', '/m/', 'autumn, column'], ['rh', '/r/', 'rhyme, rhythm'], ['pt', '/t/', 'receipt']]) },
      { id: 'schwa', title: 'The schwa (Year 8)',
        text: '<p>The <strong>schwa</strong> is the quiet “uh” sound in an unstressed syllable. It is the most common vowel sound in English, and it can be spelt with any vowel letter.</p>' +
              '<p>sep<strong>a</strong>rate, choc<strong>o</strong>late, diff<strong>e</strong>rent, fam<strong>i</strong>ly</p>' +
              '<p>Tip: say the word in an exaggerated way (“choc-OH-late”) to remember the letter.</p>' },
      { id: 'wor', title: '&lt;or&gt; after w (Year 8)',
        text: '<p>After <strong>w</strong>, the letters <strong>or</strong> often say /er/: worse, world, work, worm, word, worth.</p>' },
      { id: 'origins', title: 'Extension: why spellings are odd',
        text: '<p>Unusual spellings often come from <strong>older forms of English</strong> or <strong>other languages</strong>. ' +
              'The spelling stayed while the pronunciation changed.</p>' +
              '<ul><li>Greek: <strong>ps</strong>ychology, <strong>pn</strong>eumonia, <strong>rh</strong>ythm, <strong>ch</strong>orus</li>' +
              '<li>French: <strong>ch</strong>ef, ma<strong>ch</strong>ine</li><li>Old English: lau<strong>gh</strong>, ni<strong>gh</strong>t, <strong>kn</strong>ee</li></ul>' }
    ],

    examples: [
      {
        title: 'Example 1: spotting the pattern',
        steps: [
          '<em>machine</em>: the <strong>ch</strong> says /sh/, as in many words from French.',
          '<em>enough</em>: the <strong>ou</strong> says a short u, and the <strong>gh</strong> says /f/.',
          '<em>autumn</em>: the <strong>n</strong> is silent, but it is there.'
        ],
        result: 'Learn tricky words in groups that share a pattern'
      },
      {
        title: 'Example 2: the schwa (Year 8)',
        steps: [
          'Say <em>chocolate</em> at normal speed: the middle vowel is just “uh”.',
          'That quiet “uh” is a schwa, and it could be spelt with any vowel letter.',
          'Say it as it is spelt, “choc-OH-late”, to remember that it is an <strong>o</strong>.'
        ]
      }
    ],

    slots: [
      // 1 · Type the word from a clue.
      {
        name: 'Spell it', learn: 'ei',
        items: [Sci.gen(rng => {
          const x = rng.pick(SPELL);
          return Sci.word(rng, {
            prompt: `Spell the word that means <em>${x.clue}</em>.`,
            note: `It starts with <strong>${x.w[0]}</strong> and has ${x.w.length} letters.`,
            answer: x.w, learn: LEARN_FOR[x.p],
            explain: `<strong>${x.w}</strong>. ${PATTERN[x.p]}`
          });
        })]
      },

      // 2 · Choose the correct spelling.
      {
        name: 'Choose the spelling', learn: 'vowels',
        items: [Sci.gen(rng => {
          const x = rng.pick(SPELL);
          return C(rng, {
            prompt: `Which is the correct spelling of the word meaning <em>${x.clue}</em>?`,
            right: x.w, wrong: x.bad, wide: false, learn: LEARN_FOR[x.p],
            explain: `<strong>${x.w}</strong>. ${PATTERN[x.p]}`
          });
        })]
      },

      // 3 · <ei>: long a or long e?
      {
        name: 'ei: which sound?', learn: 'ei',
        items: [rng => Sci.sort(rng, {
          prompt: 'In each word, does <strong>ei</strong> say long a (as in <em>day</em>) or long e (as in <em>see</em>)?',
          bins: ['Long a', 'Long e'],
          items: [
            ...['reign', 'eight', 'weigh', 'neighbour', 'vein', 'sleigh', 'beige', 'freight'].map(text => ({ text, bin: 0 })),
            ...['ceiling', 'receive', 'seize', 'protein', 'deceive', 'receipt'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: '&lt;ei&gt; can say long a (reign, eight) or long e (ceiling, receive). After c, the long e sound is usually spelt ei.'
        })]
      },

      // 4 · What does <ch> say?
      {
        name: 'ch: which sound?', learn: 'consonants',
        items: [rng => Sci.sort(rng, {
          prompt: 'What sound does <strong>ch</strong> make in each word?',
          bins: ['/ch/ as in chip', '/sh/ as in ship', '/k/ as in kite'],
          items: [
            ...['chair', 'church', 'cheese', 'lunch', 'kitchen'].map(text => ({ text, bin: 0 })),
            ...['machine', 'parachute', 'chef', 'brochure', 'chalet'].map(text => ({ text, bin: 1 })),
            ...['chorus', 'character', 'stomach', 'echo', 'school', 'choir'].map(text => ({ text, bin: 2 }))
          ],
          pick: 6,
          explain: '&lt;ch&gt; says /sh/ in many words from French (machine, chef) and /k/ in many words from Greek (chorus, character).'
        })]
      },

      // 5 · Which letter is silent?
      {
        name: 'The silent letter', learn: 'silent',
        items: [Sci.gen(rng => {
          // Wrong options are letters that are clearly sounded, never a final
          // e or part of a digraph, which a student could fairly call silent.
          const x = rng.pick([['gnome', 'g', ['n', 'm', 'o']], ['design', 'g', ['d', 's', 'n']], ['ghost', 'h', ['g', 's', 't']],
                              ['psychology', 'p', ['s', 'l', 'g']], ['autumn', 'n', ['a', 't', 'm']], ['column', 'n', ['c', 'l', 'm']],
                              ['rhyme', 'h', ['r', 'y', 'm']], ['receipt', 'p', ['r', 'c', 't']], ['pneumonia', 'p', ['n', 'm', 'a']],
                              ['solemn', 'n', ['s', 'l', 'm']], ['foreign', 'g', ['f', 'r', 'n']], ['hymn', 'n', ['h', 'y', 'm']]]);
          return C(rng, {
            prompt: `Which letter is silent in <strong>${x[0]}</strong>?`,
            right: x[1], wrong: x[2], wide: false,
            explain: `In <strong>${x[0]}</strong> the <strong>${x[1]}</strong> is written but not said.`
          });
        })]
      },

      // 6 · Spot the misspelt word.
      {
        name: 'Spot the misspelling', learn: 'vowels',
        items: [Sci.gen(rng => {
          const four = rng.sample(SPELL, 4);
          const at = rng.int(0, 3);
          const bad = rng.pick(four[at].bad);
          return Sci.spot(rng, {
            prompt: 'One of these words is spelt wrongly.',
            lines: four.map((x, i) => (i === at ? bad : x.w)), wrong: at,
            cue: 'Click the misspelt word.', learn: LEARN_FOR[four[at].p],
            explain: `It should be <strong>${four[at].w}</strong>. ${PATTERN[four[at].p]}`
          });
        })]
      },

      // 7 · Explain the pattern.
      {
        name: 'Why is it spelt that way?', learn: 'vowels',
        items: [
          rng => C(rng, { learn: 'vowels', prompt: 'In <strong>was</strong> and <strong>wander</strong>, what sound does the a make?',
            right: '/o/, as in hot', wrong: ['/a/, as in hat', 'long a, as in day', 'it is silent'], explain: 'After w (and qu), a often says /o/.' }),
          rng => C(rng, { learn: 'consonants', prompt: 'In <strong>laugh</strong>, which letters make the /f/ sound?',
            right: 'gh', wrong: ['au', 'l', 'ug'], explain: '&lt;gh&gt; can say /f/: laugh, cough, tough, enough.' }),
          rng => C(rng, { learn: 'vowels', prompt: 'In <strong>young</strong>, what sound do the letters ou make?',
            right: 'A short u, as in sun', wrong: ['/ow/, as in out', 'Long o, as in go', '/oo/, as in soup'], explain: '‘ou’ can say a short u: young, touch, cousin.' }),
          rng => C(rng, { learn: 'ei', prompt: 'Why is <strong>receive</strong> spelt with ei, not ie?',
            right: 'After c, the long e sound is usually spelt ei.', wrong: ['ei always says long a.', 'ie is never used in English.', 'It is a silent-letter word.'],
            explain: 'Think of ceiling, receive, deceive, receipt.' }),
          rng => C(rng, { learn: 'consonants', prompt: 'In <strong>chorus</strong>, what sound does ch make?',
            right: '/k/, as in kite', wrong: ['/ch/, as in chip', '/sh/, as in ship', 'It is silent'], explain: '&lt;ch&gt; says /k/ in many words from Greek: chorus, character, echo.' }),
          rng => C(rng, { learn: 'silent', prompt: 'What do <strong>gnome</strong> and <strong>design</strong> have in common?',
            right: 'A silent g before n', wrong: ['A silent n', '&lt;ch&gt; saying /k/', 'A schwa sound'], explain: '&lt;gn&gt; says /n/: gnome, design, sign, foreign.' })
        ]
      },

      // 8 · The schwa (Year 8).
      {
        name: 'Year 8: the hidden vowel', learn: 'schwa',
        items: [Sci.gen(rng => {
          const [gap, whole, v] = rng.pick(SCHWA);
          return C(rng, {
            prompt: `Which vowel fills the gap? <strong>${gap.replace('_', '▢')}</strong>`,
            right: v, wrong: ['a', 'e', 'i', 'o', 'u'].filter(x => x !== v).slice(0, 3), wide: false, keepOrder: false,
            explain: `<strong>${whole}</strong>. The vowel is a schwa, a quiet “uh”, so you cannot hear which letter it is. Saying it as spelt helps you remember.`
          });
        })]
      },

      // 9 · <or> after w (Year 8).
      {
        name: 'Year 8: w + or', learn: 'wor',
        items: [Sci.gen(rng => {
          const [w, clue, bad] = rng.pick(WOR);
          return C(rng, {
            prompt: `Which is the correct spelling of the word meaning <em>${clue}</em>?`,
            right: w, wrong: bad, wide: false,
            explain: `<strong>${w}</strong>. After w, the letters or often say /er/: worse, world, work, worm, word, worth.`
          });
        })]
      },

      // 10 · Extension: origins.
      {
        name: 'Extension: where spellings come from', learn: 'origins',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Why do many English words have letters we no longer say?',
            right: 'The spelling stayed the same while the pronunciation changed over time, or came from another language.', wrong: ['Printers added extra letters to fill space.', 'The letters are there to make words longer.', 'They are spelling mistakes that became common.'],
            explain: 'Knee, gnome and psychology all keep letters from older English or from Greek.' }),
          rng => C(rng, { tag: EXT, prompt: '<strong>Psychology</strong>, <strong>pneumonia</strong> and <strong>rhythm</strong> come from which language?',
            right: 'Greek', wrong: ['French', 'Old English', 'te reo Māori'], explain: 'Greek gives English ps, pn, rh and ch saying /k/.' }),
          rng => C(rng, { tag: EXT, prompt: 'In which group does <strong>ch</strong> say /sh/ because the words came from French?',
            right: 'chef, machine, parachute', wrong: ['chorus, character, echo', 'chair, church, lunch', 'school, choir, stomach'],
            explain: 'French ch says /sh/. The other groups say /k/ (from Greek) or /ch/.' }),
          rng => C(rng, { tag: EXT, prompt: 'The Greek word <em>pneuma</em> means “breath”. Which word comes from it?',
            right: 'pneumonia, a lung infection', wrong: ['gnome, a garden statue', 'autumn, a season', 'rhyme, a matching sound'],
            explain: 'Pneumonia affects breathing, and keeps the silent p from Greek.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word’s silent letter is sounded in a related word?',
            right: 'autumn (autumnal)', wrong: ['ghost', 'rhyme', 'receipt'],
            explain: 'The n is silent in autumn but heard in autumnal. Related words can help you remember a silent letter: sign, signal; column, columnist.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why might <strong>receipt</strong> have a silent p?',
            right: 'Scholars added it to match the Latin word it came from.', wrong: ['It used to be pronounced “ree-sipt” everywhere.', 'It came from Greek.', 'It is a mistake.'],
            explain: 'The p was added to show the link with Latin <em>recepta</em>, even though it was never said in English.' })
        ]
      }
    ]
  });


  // ═══ W7 Prefixes, suffixes and homophones ════════════════════════════════
  // Writing › Transcription Skills › Spelling. Year 7: two-syllable prefixes
  // keep their spelling (inter-, over-, circum-, contra-, ambi-, ante-,
  // anti-); suffixes -able, -ible, -ure; f or fe changing to v (leaf → leaves);
  // vowel changes before -ation, -ition (exclaim → exclamation).
  // Year 8: advanced homophones; chameleon prefixes (in-, im-, il-, ir- for
  // ‘not’; con-, col-, co-, com-, cor- for ‘with’); consonant and vowel
  // changes before suffixes (mischief → mischievous, explain → explanation).
  // Extension: why prefixes change, and plurals that keep the f.

  const BUILD = [
    ['inter', 'national', 'international'], ['inter', 'related', 'interrelated'], ['over', 'ripe', 'overripe'],
    ['over', 'react', 'overreact'], ['anti', 'clockwise', 'anticlockwise'], ['anti', 'bacterial', 'antibacterial'],
    ['circum', 'navigate', 'circumnavigate'], ['contra', 'diction', 'contradiction'], ['ante', 'room', 'anteroom'],
    ['ambi', 'dextrous', 'ambidextrous'], ['inter', 'rupt', 'interrupt'], ['over', 'run', 'overrun']
  ];
  const PLURAL_V = [['leaf', 'leaves'], ['knife', 'knives'], ['half', 'halves'], ['wolf', 'wolves'], ['calf', 'calves'],
                    ['life', 'lives'], ['shelf', 'shelves'], ['loaf', 'loaves'], ['thief', 'thieves']];
  const VOWEL_CHANGE = [['exclaim', 'exclamation'], ['explain', 'explanation'], ['proclaim', 'proclamation'],
                        ['pronounce', 'pronunciation'], ['repeat', 'repetition'], ['compete', 'competition'],
                        ['define', 'definition'], ['admire', 'admiration']];
  const ABLE = [['comfort', 'comfortable'], ['value', 'valuable'], ['enjoy', 'enjoyable'], ['wash', 'washable'], ['break', 'breakable'], ['rely', 'reliable']];
  const IBLE = ['possible', 'visible', 'terrible', 'horrible', 'sensible', 'edible', 'incredible', 'responsible'];
  const URE = [['creature', 'a living animal', ['creacher', 'creatcher', 'creatur']], ['adventure', 'an exciting journey', ['adventcher', 'adventur', 'adventuer']],
               ['furniture', 'tables, chairs and beds', ['furnicher', 'furnitur', 'furnature']], ['temperature', 'how hot or cold something is', ['temprature', 'temperachure', 'tempereture']],
               ['mixture', 'things combined together', ['mixcher', 'mixtur', 'mixsure']], ['capture', 'to catch', ['capcher', 'captur', 'captchure']]];
  const NOT_PREFIX = [['legal', 'il'], ['logical', 'il'], ['literate', 'il'], ['possible', 'im'], ['patient', 'im'], ['mature', 'im'],
                      ['perfect', 'im'], ['balance', 'im'], ['regular', 'ir'], ['responsible', 'ir'], ['relevant', 'ir'],
                      ['active', 'in'], ['correct', 'in'], ['visible', 'in'], ['accurate', 'in']];
  const WITH_PREFIX = [['nect', 'con', 'connect'], ['lect', 'col', 'collect'], ['operate', 'co', 'cooperate'], ['bine', 'com', 'combine'],
                       ['respond', 'cor', 'correspond'], ['struct', 'con', 'construct'], ['lide', 'col', 'collide'], ['pare', 'com', 'compare'],
                       ['rect', 'cor', 'correct']];
  // Homophone sets: [sentence with ▢, right, all options, why].
  const HOMO = [
    ['The doctor’s ▢ waited quietly.', 'patients', ['patients', 'patience'], '<em>Patients</em> are people being treated; <em>patience</em> is being able to wait calmly.'],
    ['Learning to skateboard takes a lot of ▢.', 'patience', ['patients', 'patience'], '<em>Patience</em> is being able to wait or keep trying calmly.'],
    ['The building ▢ was fenced off.', 'site', ['cite', 'site', 'sight'], 'A <em>site</em> is a place; to <em>cite</em> is to quote a source; <em>sight</em> is seeing.'],
    ['Remember to ▢ your sources.', 'cite', ['cite', 'site', 'sight'], 'To <em>cite</em> is to name where information came from.'],
    ['The sunrise was a beautiful ▢.', 'sight', ['cite', 'site', 'sight'], '<em>Sight</em> is something seen.'],
    ['Please walk down the ▢ to your seat.', 'aisle', ['I’ll', 'aisle', 'isle'], 'An <em>aisle</em> is a passage between rows of seats.'],
    ['▢ meet you at the gate.', 'I’ll', ['I’ll', 'aisle', 'isle'], '<em>I’ll</em> is short for “I will”.'],
    ['They sailed to a tiny ▢ off the coast.', 'isle', ['I’ll', 'aisle', 'isle'], 'An <em>isle</em> is an island.'],
    ['The school ▢ spoke at assembly.', 'principal', ['principal', 'principle'], 'The <em>principal</em> is the head of a school; a <em>principle</em> is a rule or belief.'],
    ['Honesty is an important ▢.', 'principle', ['principal', 'principle'], 'A <em>principle</em> is a rule or belief.'],
    ['The car was ▢ at the lights.', 'stationary', ['stationary', 'stationery'], '<em>Stationary</em> (with an a) means standing still; <em>stationery</em> (with an e) is paper and pens.'],
    ['Pens, paper and envelopes are ▢.', 'stationery', ['stationary', 'stationery'], '<em>Stationery</em> (e, like envelopes) is writing materials.'],
    ['She paid me a kind ▢ about my drawing.', 'compliment', ['compliment', 'complement'], 'A <em>compliment</em> is praise; a <em>complement</em> completes or goes well with something.'],
    ['The sauce is the perfect ▢ to the fish.', 'complement', ['compliment', 'complement'], 'A <em>complement</em> goes well with something and completes it.']
  ];

  Sci.topic({
    id: 'ew7', unit: 'writing',
    title: 'Prefixes, Suffixes and Homophones',
    blurb: 'Building longer words from parts, and choosing between words that sound the same.',
    hint: 'Two-syllable prefixes keep their whole spelling (over + ripe = overripe). Some prefixes change to suit the next letter (il-legal, ' +
          'im-possible, ir-regular). Some words change before a suffix (leaf → leaves, explain → explanation). For homophones, think about meaning.',

    learn: [
      { id: 'prefix', title: 'Two-syllable prefixes',
        text: '<p>Prefixes such as <strong>inter-</strong>, <strong>over-</strong>, <strong>circum-</strong>, <strong>contra-</strong>, <strong>ante-</strong>, <strong>anti-</strong> and <strong>ambi-</strong> keep their full spelling.</p>' +
              '<p>over + ripe = <strong>overr</strong>ipe (two r’s), inter + related = <strong>interr</strong>elated</p>' },
      { id: 'fv', title: 'f or fe to v',
        text: '<p>A few words ending in <strong>f</strong> or <strong>fe</strong> change to <strong>v</strong> before -es:</p>' +
              '<p>leaf → leaves, knife → knives, half → halves, wolf → wolves, shelf → shelves, life → lives</p>' },
      { id: 'vowelchange', title: 'Vowels that change before a suffix',
        text: '<p>Adding <strong>-ation</strong> or <strong>-ition</strong> can change the vowel in the last syllable:</p>' +
              '<p>expl<strong>ai</strong>n → expl<strong>a</strong>nation, rep<strong>ea</strong>t → rep<strong>e</strong>tition, pron<strong>ou</strong>nce → pron<strong>u</strong>nciation</p>' +
              '<p>Year 8: a consonant can change too: mischie<strong>f</strong> → mischie<strong>v</strong>ous.</p>' },
      { id: 'able', title: '-able or -ible?',
        text: '<p>A guide, not a rule: <strong>-able</strong> often follows a whole word (enjoy → enjoyable, wash → washable); <strong>-ible</strong> often follows a part that is not a word on its own (vis → visible, terr → terrible).</p>' +
              '<p>Check tricky ones in a dictionary.</p>' },
      { id: 'ure', title: '-ure',
        text: '<p>The ending often sounds like “cher” but is spelt <strong>-ture</strong>: creature, adventure, furniture, temperature, mixture, capture.</p>' },
      { id: 'chameleon', title: 'Chameleon prefixes (Year 8)',
        text: '<p>Some prefixes change their last letter to make a word easier to say. The meaning stays the same.</p>' +
              Sci.table(['Meaning', 'Forms', 'Examples'], [['not', 'in-, im-, il-, ir-', 'inactive, impossible, illegal, irregular'],
                ['with, together', 'con-, com-, col-, cor-, co-', 'connect, combine, collect, correspond, cooperate']]) +
              '<p>il- before l, ir- before r, im- before m, p or b.</p>' },
      { id: 'homophones', title: 'Homophones',
        text: '<p>Words that <strong>sound the same</strong> but have different meanings and spellings.</p>' +
              Sci.table(['Words', 'Meaning'], [['patients / patience', 'people being treated / calm waiting'], ['cite / site / sight', 'quote / place / seeing'],
                ['I’ll / aisle / isle', 'I will / walkway / island'], ['principal / principle', 'head of school / rule or belief'],
                ['stationary / stationery', 'not moving / pens and paper']]) },
      { id: 'why', title: 'Extension: why prefixes change',
        text: '<p>“Inlegal” and “inpossible” are awkward to say, so over time the n changed to match the next sound: <strong>il</strong>legal, <strong>im</strong>possible. Linguists call this assimilation.</p>' +
              '<p>Not every f-word changes: roof → roofs, chief → chiefs, belief → beliefs.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: keeping the whole prefix',
        steps: [
          'over + ripe: keep both parts whole, <strong>overripe</strong>, with two r’s.',
          'inter + related: <strong>interrelated</strong>, also two r’s.',
          'The double letter is a clue that two parts have joined.'
        ]
      },
      {
        title: 'Example 2: choosing il-, im-, ir- or in-',
        steps: [
          'The opposite of <em>legal</em> starts with l, so use <strong>il</strong>: illegal.',
          '<em>Possible</em> starts with p, so use <strong>im</strong>: impossible.',
          '<em>Regular</em> starts with r, so use <strong>ir</strong>: irregular. Otherwise it is usually <strong>in</strong>: inactive.'
        ]
      }
    ],

    slots: [
      // 1 · Build with a two-syllable prefix.
      {
        name: 'Build the word', learn: 'prefix',
        items: [Sci.gen(rng => {
          const [p, base, whole] = rng.pick(BUILD);
          return Sci.word(rng, {
            prompt: `Join the two parts into one word: <strong>${p}</strong> + <strong>${base}</strong>`,
            answer: whole, placeholder: 'type the new word',
            explain: `<strong>${whole}</strong>. A two-syllable prefix keeps its full spelling${/(.)\1/.test(p.slice(-1) + base[0]) ? ', so the letters meet to make a double' : ''}.`
          });
        })]
      },

      // 2 · f or fe to v.
      {
        name: 'Plurals: f to v', learn: 'fv',
        items: [Sci.gen(rng => {
          const [one, many] = rng.pick(PLURAL_V);
          return Sci.word(rng, {
            prompt: `Write the plural: one <strong>${one}</strong>, two …`,
            answer: many, placeholder: 'type the plural',
            explain: `<strong>${many}</strong>. In a small number of words, f or fe changes to v before -es.`
          });
        })]
      },

      // 3 · Vowel and consonant changes.
      {
        name: 'Adding a suffix', learn: 'vowelchange',
        items: [Sci.gen(rng => {
          const yr8 = rng.chance(0.25);
          const [base, out] = yr8 ? rng.pick([['mischief', 'mischievous'], ['grief', 'grievous']]) : rng.pick(VOWEL_CHANGE);
          const suffix = out.endsWith('ous') ? '-ous' : out.endsWith('ition') ? '-ition' : '-ation';
          return Sci.word(rng, {
            prompt: `Add <strong>${suffix}</strong> to <strong>${base}</strong>.`,
            note: yr8 ? 'Year 8: watch the consonant.' : 'Watch the vowel in the last syllable.',
            answer: out, placeholder: 'type the new word',
            explain: `<strong>${out}</strong>. ${yr8 ? 'The f changes to v before the suffix.' : 'The vowel in the last syllable changes spelling and sound when the suffix is added.'}`
          });
        })]
      },

      // 4 · -able or -ible?
      {
        name: '-able or -ible?', learn: 'able',
        items: [Sci.gen(rng => {
          const able = rng.chance();
          const word = able ? rng.pick(ABLE)[1] : rng.pick(IBLE);
          const stem = word.replace(/(able|ible)$/, '');
          return {
            prompt: `Which ending is correct? <strong>${stem}▢</strong>`,
            input: { kind: 'choice', options: [{ html: '-able', right: able }, { html: '-ible', right: !able }], correct: able ? 0 : 1 },
            explain: `<strong>${word}</strong>. ${able ? '-able often follows a whole word.' : '-ible often follows a part that is not a word on its own.'} Check tricky ones in a dictionary.`
          };
        })]
      },

      // 5 · -ure.
      {
        name: 'The -ure ending', learn: 'ure',
        items: [Sci.gen(rng => {
          const [w, clue, bad] = rng.pick(URE);
          return C(rng, {
            prompt: `Which is the correct spelling of the word meaning <em>${clue}</em>?`,
            right: w, wrong: bad, wide: false,
            explain: `<strong>${w}</strong>. The ending sounds like “cher”, but it is spelt -ture.`
          });
        })]
      },

      // 6 · Homophones in context.
      {
        name: 'Homophones', learn: 'homophones',
        items: [Sci.gen(rng => {
          const [s, right, opts, why] = rng.pick(HOMO);
          return {
            prompt: `Which word fits? <em>${s}</em>`,
            input: { kind: 'choice', options: opts.map(o => ({ html: o, right: o === right })), correct: opts.indexOf(right) },
            explain: why
          };
        })]
      },

      // 7 · Chameleon prefixes for ‘not’ (Year 8).
      {
        name: 'Year 8: not', learn: 'chameleon',
        items: [Sci.gen(rng => {
          const [w, p] = rng.pick(NOT_PREFIX);
          const opts = ['in', 'im', 'il', 'ir'];
          return {
            prompt: `Which prefix makes the opposite of <strong>${w}</strong>?`,
            input: { kind: 'choice', options: opts.map(o => ({ html: o + '-', right: o === p })), correct: opts.indexOf(p) },
            explain: `<strong>${p}${w}</strong>. ${p === 'il' ? 'il- before l.' : p === 'ir' ? 'ir- before r.' : p === 'im' ? 'im- before m, p or b.' : 'in- is the usual form.'}`
          };
        })]
      },

      // 8 · Chameleon prefixes for ‘with’ (Year 8).
      {
        name: 'Year 8: with, together', learn: 'chameleon',
        items: [Sci.gen(rng => {
          const [rest, p, whole] = rng.pick(WITH_PREFIX);
          const opts = ['con', 'com', 'col', 'cor'];
          if (p === 'co') opts[0] = 'co';
          return {
            prompt: `Which prefix completes the word? <strong>▢${rest}</strong>`,
            note: 'All of these mean “with” or “together”.',
            input: { kind: 'choice', options: opts.map(o => ({ html: o + '-', right: o === p })), correct: opts.indexOf(p) },
            explain: `<strong>${whole}</strong>. The prefix changes form to fit the next sound, but its meaning stays “with” or “together”.`
          };
        })]
      },

      // 9 · Spot the misspelling.
      {
        name: 'Spot the misspelling', learn: 'prefix',
        items: [Sci.gen(rng => {
          const pool = [
            ['overripe', 'overipe'], ['interrupt', 'interupt'], ['illegal', 'ilegal'], ['irregular', 'iregular'], ['shelves', 'shelfs'],
            ['explanation', 'explaination'], ['pronunciation', 'pronounciation'], ['visible', 'visable'], ['comfortable', 'comfortible'],
            ['creature', 'creacher'], ['collect', 'colect'], ['knives', 'knifes']
          ];
          const four = rng.sample(pool, 4);
          const at = rng.int(0, 3);
          return Sci.spot(rng, {
            prompt: 'One of these words is spelt wrongly.',
            lines: four.map(([good, bad], i) => (i === at ? bad : good)), wrong: at, cue: 'Click the misspelt word.',
            explain: `It should be <strong>${four[at][0]}</strong>.`
          });
        })]
      },

      // 10 · Extension.
      {
        name: 'Extension: exceptions and reasons', learn: 'why',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which plural is spelt correctly?', right: 'roofs', wrong: ['rooves', 'roovs', 'roofes'],
            explain: 'Not every word ending in f changes to v: roof → roofs, chief → chiefs, belief → beliefs.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which plural is spelt correctly?', right: 'beliefs', wrong: ['believes', 'beliefes', 'beleifs'],
            explain: '“Beliefs” is the noun plural. “Believes” is a verb: she believes.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why did “in” + “possible” become <strong>impossible</strong>?',
            right: '“Inpossible” is awkward to say, so the n changed to m to match the p.', wrong: ['im- means something different from in-.', 'It is a spelling mistake that stuck.', 'It comes from Greek.'],
            explain: 'The prefix changes to suit the next sound. The meaning, “not”, stays the same.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word uses a prefix meaning “not”?', right: 'illiterate', wrong: ['illustrate', 'illuminate', 'illness'],
            explain: 'Il-literate means “not literate”. The others just begin with the letters ill.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which pair are both correct?', right: 'courage → courageous, outrage → outrageous', wrong: ['courage → couragous, outrage → outragous', 'courage → courageus, outrage → outrageus', 'courage → couraggeous, outrage → outraggeous'],
            explain: 'The e stays after g so that it keeps its soft /j/ sound before -ous.' }),
          rng => C(rng, { tag: EXT, prompt: '<em>Ambi-</em> means “both”. What does <strong>ambidextrous</strong> mean?',
            right: 'Able to use both hands equally well', wrong: ['Unable to use either hand', 'Very clumsy', 'Right-handed'],
            explain: 'Ambi (both) + dexter (right hand, skilful).' })
        ]
      }
    ]
  });


  // ═══ W8 Clauses and complex sentences ═════════════════════════════════════
  // Writing › Composition › Sentence structures, grammar, and punctuation.
  // Year 7: complex sentences with relative (adjective) clauses, introduced
  // by who, whom, whose, which, that, where, when, why; adverbial phrases
  // (how, when, where, to what extent); complex sentences that combine
  // phrases and clauses. Year 8: compound-complex sentences.
  // Extension: commas around relative clauses that add extra information.

  const REL = [
    ['The girl who won the race is my cousin.', 'who won the race', ['The girl who', 'is my cousin', 'won the race is my cousin']],
    ['The kererū that landed on the fence was enormous.', 'that landed on the fence', ['The kererū that', 'was enormous', 'landed on the fence was enormous']],
    ['Our koro, whose garden is famous, grows the best kūmara.', 'whose garden is famous', ['Our koro', 'grows the best kūmara', 'garden is famous, grows']],
    ['This is the beach where we found the shell.', 'where we found the shell', ['This is the beach', 'This is', 'the beach where']],
    ['I remember the day when we moved to Napier.', 'when we moved to Napier', ['I remember the day', 'I remember', 'the day when']],
    ['The book, which I borrowed from the library, was overdue.', 'which I borrowed from the library', ['The book', 'was overdue', 'from the library, was overdue']],
    ['The tree that fell in the storm blocked the road.', 'that fell in the storm', ['The tree that', 'blocked the road', 'in the storm blocked the road']],
    ['My aunt, who lives in Nelson, is a nurse.', 'who lives in Nelson', ['My aunt', 'is a nurse', 'lives in Nelson, is a nurse']]
  ];
  const RELGAP = [
    ['The boy ▢ bike was stolen called the police.', 'whose'], ['This is the marae ▢ my grandmother grew up.', 'where'],
    ['I will never forget the night ▢ the power went out.', 'when'], ['The scientist ▢ discovered the fossil visited our school.', 'who'],
    ['The waka, ▢ was carved from tōtara, rested on the sand.', 'which'], ['The family ▢ dog barked all night came to apologise.', 'whose'],
    ['Summer is the season ▢ we go camping.', 'when'], ['The café ▢ we first met has closed.', 'where'],
    ['The nurse ▢ looked after me was very kind.', 'who'], ['Our school hall, ▢ was built in 1950, needs a new roof.', 'which']
  ];
  const TYPES = ['Simple', 'Compound', 'Complex', 'Compound-complex'];
  const SENT = [
    ['The bus was late.', 0], ['Mere and Ana walked to school together.', 0], ['After lunch, we played touch on the field.', 0], ['The dog barked loudly at the postie.', 0],
    ['The bus was late, so we walked.', 1], ['Mere likes netball, but Ana prefers football.', 1], ['We could stay inside, or we could go to the beach.', 1], ['The rain stopped, and the sun came out.', 1],
    ['Because the bus was late, we walked.', 2], ['The girl who won the race is my cousin.', 2], ['When the bell rang, everyone ran outside.', 2], ['We stayed inside until the storm passed.', 2],
    ['When the bell rang, we ran outside, but the rain soon drove us back.', 3], ['The bus, which is always late, broke down, so we walked.', 3], ['I wanted to swim because it was hot, but the beach was closed.', 3]
  ];
  const ADVERBIAL = [
    ['<u>After lunch</u>, we walked to the river.', 'When'], ['We walked <u>to the river</u> after lunch.', 'Where'],
    ['She sang <u>with great confidence</u>.', 'How'], ['By the end, he was <u>almost completely</u> soaked.', 'To what extent'],
    ['The kids raced <u>across the field</u>.', 'Where'], ['<u>In the morning</u>, the tide was high.', 'When'],
    ['Tama finished the puzzle <u>in a hurry</u>.', 'How'], ['The water was <u>far too</u> cold for swimming.', 'To what extent'],
    ['<u>Every Saturday</u>, our whānau goes to the market.', 'When'], ['The fantail flitted <u>between the branches</u>.', 'Where']
  ];

  Sci.topic({
    id: 'ew8', unit: 'writing',
    title: 'Clauses and Complex Sentences',
    blurb: 'Building sentences from clauses and phrases, so ideas link together.',
    hint: 'A clause has a subject and a verb; a phrase does not. A relative clause adds detail about a noun and starts with who, whose, which, that, where, when or why. ' +
          'Simple: one main clause. Compound: two main clauses joined by and, but, so or or. Complex: a main clause plus a dependent clause. Compound-complex: both.',

    learn: [
      { id: 'clause', title: 'Clause or phrase?',
        text: '<p>A <strong>clause</strong> has a subject and a verb: <em>the dog barked</em>, <em>when the bell rang</em>.</p>' +
              '<p>A <strong>phrase</strong> does not: <em>in the morning</em>, <em>under the old bridge</em>.</p>' },
      { id: 'relative', title: 'Relative clauses',
        text: '<p>A <strong>relative</strong> (or adjective) clause adds detail about a noun. It begins with a relative pronoun (<strong>who, whom, whose, which, that</strong>) or a relative adverb (<strong>where, when, why</strong>).</p>' +
              '<p><em>The girl <strong>who won the race</strong> is my cousin.</em></p>' +
              Sci.table(['Use', 'For'], [['who', 'people'], ['whose', 'belonging to'], ['which, that', 'things and animals'], ['where', 'places'], ['when', 'times'], ['why', 'reasons']]) },
      { id: 'types', title: 'Four sentence types', wide: true,
        text: Sci.table(['Type', 'Made of', 'Example'], [
                ['<strong>Simple</strong>', 'one main clause', 'The bus was late.'],
                ['<strong>Compound</strong>', 'two main clauses joined by and, but, so or or', 'The bus was late, so we walked.'],
                ['<strong>Complex</strong>', 'a main clause and a dependent clause', 'Because the bus was late, we walked.'],
                ['<strong>Compound-complex</strong> (Year 8)', 'two main clauses and a dependent clause', 'When the bell rang, we ran outside, but the rain drove us back.']]) },
      { id: 'adverbial', title: 'Adverbial phrases',
        text: '<p>An <strong>adverbial phrase</strong> tells us more about an action:</p>' +
              Sci.table(['Tells', 'Example'], [['when', '<em>after lunch</em>, <em>in the morning</em>'], ['where', '<em>to the river</em>, <em>across the field</em>'],
                ['how', '<em>with great confidence</em>, <em>in a hurry</em>'], ['to what extent', '<em>almost completely</em>, <em>far too</em>']]) },
      { id: 'commas', title: 'Extension: commas or not?',
        text: '<p>Commas go round a relative clause that adds <strong>extra</strong> information, which could be removed: <em>My aunt, who lives in Nelson, is a nurse.</em></p>' +
              '<p>No commas when the clause tells us <strong>which one</strong>: <em>The student who won will get a prize.</em> Without it, we would not know which student.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: joining with a relative clause',
        steps: [
          'Two sentences: <em>We visited Rotorua. Rotorua is famous for its geysers.</em>',
          'Replace the repeated noun with a relative pronoun: <em>which is famous for its geysers</em>.',
          'Join: <em>We visited Rotorua, which is famous for its geysers.</em>'
        ],
        result: 'One sentence, ideas linked'
      },
      {
        title: 'Example 2: naming the sentence type',
        steps: [
          '<em>When the bell rang, we ran outside, but the rain drove us back.</em>',
          'Main clauses: <em>we ran outside</em> and <em>the rain drove us back</em>, joined by “but”.',
          'Dependent clause: <em>When the bell rang</em>. Two main clauses and a dependent one make it compound-complex.'
        ]
      }
    ],

    slots: [
      {
        name: 'Find the relative clause', learn: 'relative',
        items: REL.map(([s, right, wrong]) => rng => C(rng, {
          prompt: `Which words form the relative clause? <em>${s}</em>`,
          right, wrong,
          explain: `<em>${right}</em> adds detail about the noun before it, and starts with a relative word.`
        }))
      },
      {
        name: 'Choose the relative word', learn: 'relative',
        items: [Sci.gen(rng => {
          const [s, right] = rng.pick(RELGAP);
          const opts = ['who', 'whose', 'which', 'where', 'when'];
          return {
            prompt: `Which word fills the gap? <em>${s}</em>`,
            input: { kind: 'choice', options: opts.map(o => ({ html: o, right: o === right })), correct: opts.indexOf(right) },
            explain: { who: 'Who is for people.', whose: 'Whose shows belonging: the bike belonging to the boy.', which: 'Which is for things.',
                       where: 'Where is for places.', when: 'When is for times.' }[right]
          };
        })]
      },
      {
        name: 'Join two sentences', learn: 'relative',
        items: [
          ['Tama has a dog. The dog loves swimming.', 'Tama has a dog that loves swimming.', ['Tama has a dog who it loves swimming.', 'Tama has a dog, loves swimming.', 'Tama has a dog whose loves swimming.']],
          ['We visited Rotorua. Rotorua is famous for its geysers.', 'We visited Rotorua, which is famous for its geysers.', ['We visited Rotorua, who is famous for its geysers.', 'We visited Rotorua, it is famous for its geysers.', 'We visited Rotorua, where is famous for its geysers.']],
          ['I met a girl. Her father is a pilot.', 'I met a girl whose father is a pilot.', ['I met a girl who her father is a pilot.', 'I met a girl who’s father is a pilot.', 'I met a girl, her father is a pilot.']],
          ['This is the park. We played cricket in the park.', 'This is the park where we played cricket.', ['This is the park which we played cricket.', 'This is the park, we played cricket.', 'This is the park when we played cricket.']],
          ['The power went out on Tuesday. The storm arrived on Tuesday.', 'The power went out on Tuesday, when the storm arrived.', ['The power went out on Tuesday, where the storm arrived.', 'The power went out on Tuesday, which the storm arrived.', 'The power went out on Tuesday, the storm arrived.']],
          ['The coach praised the players. The players had trained hard.', 'The coach praised the players who had trained hard.', ['The coach praised the players whose had trained hard.', 'The coach praised the players, they had trained hard.', 'The coach praised the players where had trained hard.']]
        ].map(([two, right, wrong]) => rng => C(rng, {
          prompt: `<em>${two}</em> Which sentence joins these correctly with a relative clause?`,
          right, wrong,
          explain: 'The relative word replaces the repeated noun (or its pronoun) and matches it: who for people, whose for belonging, which or that for things, where for places, when for times.'
        }))
      },
      {
        name: 'Sentence types', learn: 'types',
        items: [rng => Sci.sort(rng, {
          prompt: 'What type is each sentence?',
          bins: TYPES, items: SENT.map(([text, bin]) => ({ text, bin })), pick: 6,
          explain: 'Count the main clauses (two means compound) and look for a dependent clause starting with because, when, who and so on (that makes it complex). Both together: compound-complex.'
        })]
      },
      {
        name: 'Adverbial phrases', learn: 'adverbial',
        items: [Sci.gen(rng => {
          const [s, right] = rng.pick(ADVERBIAL);
          const opts = ['How', 'When', 'Where', 'To what extent'];
          return {
            prompt: `What does the underlined phrase tell us? <em>${s}</em>`,
            input: { kind: 'choice', options: opts.map(o => ({ html: o, right: o === right })), correct: opts.indexOf(right) },
            explain: `It tells us ${right.toLowerCase()}.`
          };
        })]
      },
      {
        name: 'Clause or phrase?', learn: 'clause',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each one a clause (it has a subject and a verb) or a phrase?',
          bins: ['Clause', 'Phrase'],
          items: [
            ...['the dog barked', 'when the bell rang', 'because she was tired', 'which I borrowed', 'the tide went out', 'who won the race'].map(text => ({ text, bin: 0 })),
            ...['in the morning', 'under the old bridge', 'with a loud bang', 'the tall pōhutukawa', 'after the long trip', 'across the field'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: 'A clause has a subject doing a verb (the dog / barked). A phrase is a group of words without that pair.'
        })]
      },
      {
        name: 'Which type is it?', learn: 'types',
        items: [Sci.gen(rng => {
          const t = rng.int(0, 3);
          const right = rng.pick(SENT.filter(x => x[1] === t))[0];
          const wrong = [0, 1, 2, 3].filter(k => k !== t).map(k => rng.pick(SENT.filter(x => x[1] === k))[0]);
          return C(rng, {
            prompt: `Which sentence is <strong>${TYPES[t].toLowerCase()}</strong>?`,
            right, wrong, tag: t === 3 ? 'Year 8' : undefined,
            explain: ['Simple: one main clause.', 'Compound: two main clauses joined by and, but, so or or.',
                      'Complex: one main clause and a dependent clause.', 'Compound-complex: two main clauses and at least one dependent clause.'][t]
          });
        })]
      },
      {
        name: 'True or false', learn: 'types',
        items: [
          rng => TF(rng, { statement: 'A relative clause gives more information about a noun.', answer: true, learn: 'relative', explain: '“The girl who won the race” tells us which girl.' }),
          rng => TF(rng, { statement: '“Whose” is used to show belonging.', answer: true, learn: 'relative', explain: '“The boy whose bike was stolen”: the bike belongs to the boy.' }),
          rng => TF(rng, { statement: 'A phrase must have a subject and a verb.', answer: false, learn: 'clause', explain: 'That describes a clause. A phrase has no subject–verb pair.' }),
          rng => TF(rng, { statement: 'A compound sentence joins two main clauses.', answer: true, learn: 'types', explain: 'Usually with and, but, so or or.' }),
          rng => TF(rng, { statement: '“Because the bus was late” can stand alone as a sentence.', answer: false, learn: 'clause', explain: 'It is a dependent clause; it needs a main clause.' }),
          rng => TF(rng, { statement: 'An adverbial phrase can tell us when, where or how something happened.', answer: true, learn: 'adverbial', explain: 'And to what extent: “almost completely”.' }),
          rng => TF(rng, { statement: '“Which” is the right relative word for people.', answer: false, learn: 'relative', explain: 'Use who for people; which for things.' }),
          rng => TF(rng, { statement: 'A complex sentence contains a main clause and at least one dependent clause.', answer: true, learn: 'types', explain: '“When the bell rang, everyone ran outside.”' })
        ]
      },
      {
        name: 'Add detail', learn: 'relative',
        items: [
          ['The waka was huge.', 'The waka, which was carved from a single tōtara, was huge.', ['The waka was huge and old.', 'The huge waka was carved.', 'In the morning, the waka was huge.']],
          ['The scientist spoke to our class.', 'The scientist who studies kākāpō spoke to our class.', ['The scientist spoke to our class yesterday.', 'The friendly scientist spoke to our class.', 'The scientist spoke, and our class listened.']],
          ['We swam at the beach.', 'We swam at the beach where my parents met.', ['We swam at the beach all afternoon.', 'We swam happily at the beach.', 'We swam at the beach, and then we ate.']],
          ['My cousin is coming to stay.', 'My cousin, whose family lives in Samoa, is coming to stay.', ['My cousin is coming to stay next week.', 'My older cousin is coming to stay.', 'My cousin is coming to stay, so we cleaned.']],
          ['The bridge was closed.', 'The bridge that crosses the river was closed.', ['The bridge was closed for repairs.', 'The old bridge was closed.', 'The bridge was closed, but the road was open.']],
          ['I remember that winter.', 'I remember the winter when it snowed in Auckland.', ['I remember that winter clearly.', 'I remember that cold winter.', 'I remember that winter, and so does my sister.']]
        ].map(([base, right, wrong]) => rng => C(rng, {
          prompt: `<em>${base}</em> Which version adds a <strong>relative clause</strong>?`,
          right, wrong,
          explain: 'The relative clause adds detail about a noun and starts with who, whose, which, that, where or when. The others add a phrase, an adjective, or a second main clause.'
        }))
      },
      {
        name: 'Extension: commas and clauses', learn: 'commas',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is punctuated correctly?', right: 'My aunt, who lives in Nelson, is a nurse.',
            wrong: ['My aunt who lives in Nelson, is a nurse.', 'My aunt, who lives in Nelson is a nurse.', 'My aunt who, lives in Nelson, is a nurse.'],
            explain: 'The clause adds extra information about one aunt, so it takes a comma at each end.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why are there no commas in <em>The student who won will get a prize</em>?',
            right: 'The clause tells us which student; without it, the sentence would not make sense.', wrong: ['Commas are never used with who.', 'The sentence is too short for commas.', 'It is a compound sentence.'],
            explain: 'A clause that identifies which one is not set off with commas.' }),
          rng => C(rng, { tag: EXT, prompt: 'How do the commas change the meaning? <em>The students, who finished early, went home.</em>',
            right: 'All the students finished early and went home.', wrong: ['Only some of the students went home.', 'Nobody went home.', 'The commas make no difference.'],
            explain: 'With commas, the clause is extra information about all the students. Without commas, only those who finished early went home.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence uses “whom” correctly?', right: 'The player whom the coach chose was nervous.',
            wrong: ['The player whom scored the try was nervous.', 'Whom is at the door?', 'The coach, whom chose the team, was nervous.'],
            explain: '“Whom” is the object: the coach chose him or her. Use “who” when it does the action: the player who scored.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which is a compound-complex sentence?', right: 'Although it was raining, the game went ahead, and we won.',
            wrong: ['Although it was raining, the game went ahead.', 'It was raining, and the game went ahead.', 'The game went ahead in the rain.'],
            explain: 'Two main clauses (the game went ahead; we won) plus a dependent clause (although it was raining).' }),
          rng => C(rng, { tag: EXT, prompt: 'A writer wants to show that one event caused another. Which sentence does this most clearly?',
            right: 'Because the river flooded, the road was closed.', wrong: ['The river flooded. The road was closed.', 'The river flooded, and the road was closed.', 'The river, the road, and the flood.'],
            explain: '“Because” makes the cause-and-effect link explicit; the others leave the reader to infer it.' })
        ]
      }
    ]
  });


  // ═══ W9 Words at work ═════════════════════════════════════════════════════
  // Writing › Composition › Sentence structures, grammar, and punctuation.
  // Year 7: abstract nouns; verb tenses. Year 8: indirect objects, predicate
  // nouns, predicate adjectives, participles, gerunds.
  // Extension: dangling participles and the past perfect.

  const ABSTRACT = [['brave', 'bravery'], ['kind', 'kindness'], ['free', 'freedom'], ['honest', 'honesty'], ['curious', 'curiosity'],
                    ['happy', 'happiness'], ['wise', 'wisdom'], ['friend', 'friendship'], ['proud', 'pride'], ['strong', 'strength'],
                    ['generous', 'generosity'], ['loyal', 'loyalty'], ['child', 'childhood'], ['patient', 'patience']];
  const INDIRECT = [
    ['Mere gave <strong>her brother</strong> a book.', 'her brother', ['a book', 'Mere', 'gave']],
    ['Koro told <strong>us</strong> a story.', 'us', ['a story', 'Koro', 'told']],
    ['The coach threw <strong>Ana</strong> the ball.', 'Ana', ['the ball', 'The coach', 'threw']],
    ['Dad made <strong>the whānau</strong> a hāngī.', 'the whānau', ['a hāngī', 'Dad', 'made']],
    ['I sent <strong>my aunt</strong> a postcard.', 'my aunt', ['a postcard', 'I', 'sent']],
    ['The teacher handed <strong>each student</strong> a worksheet.', 'each student', ['a worksheet', 'The teacher', 'handed']]
  ];
  const PARTICIPLE = [
    ['The broken window let in the cold.', 'broken', ['window', 'cold', 'let']], ['We watched the laughing children.', 'laughing', ['watched', 'children', 'We']],
    ['The frozen lake sparkled.', 'frozen', ['lake', 'sparkled', 'The']], ['A barking dog woke us.', 'barking', ['dog', 'woke', 'us']],
    ['She found the stolen bike.', 'stolen', ['found', 'bike', 'She']], ['The exhausted runners sat down.', 'exhausted', ['runners', 'sat', 'down']],
    ['The rising tide covered the rocks.', 'rising', ['tide', 'covered', 'rocks']]
  ];

  Sci.topic({
    id: 'ew9', unit: 'writing',
    title: 'Words at Work',
    blurb: 'Nouns for ideas, verbs in the right time, and words that do more than one job.',
    hint: 'An abstract noun names an idea or feeling you cannot touch (courage). Keep verb tenses consistent. Year 8: the indirect object receives something (gave HER a book); ' +
          'after a linking verb, a predicate noun renames the subject and a predicate adjective describes it; a participle is a verb form used as an adjective; a gerund is an -ing verb used as a noun.',

    learn: [
      { id: 'abstract', title: 'Abstract nouns',
        text: '<p><strong>Abstract</strong> nouns name ideas, feelings and qualities you cannot see or touch: <em>courage, freedom, kindness</em>.</p>' +
              '<p><strong>Concrete</strong> nouns name things you can sense: <em>table, rain, kererū</em>.</p>' +
              '<p>Many come from adjectives: brave → brav<strong>ery</strong>, kind → kind<strong>ness</strong>, free → free<strong>dom</strong>.</p>' },
      { id: 'tense', title: 'Verb tenses',
        text: Sci.table(['Time', 'Example'], [['past', 'We <strong>went</strong> to the beach.'], ['present', 'We <strong>go</strong> to the beach.'],
                ['future', 'We <strong>will go</strong> to the beach.'], ['happening now', 'We <strong>are going</strong> to the beach.']]) +
              '<p>Stay in the same tense unless the time really changes.</p>' },
      { id: 'indirect', title: 'Indirect objects (Year 8)',
        text: '<p>The <strong>indirect object</strong> receives the benefit of the action. It usually comes between the verb and the direct object.</p>' +
              '<p><em>Mere gave <strong>her brother</strong> a book.</em> (gave a book to whom? her brother)</p>' },
      { id: 'predicate', title: 'Predicate nouns and adjectives (Year 8)',
        text: '<p>After a <strong>linking verb</strong> (is, was, became, seems, felt):</p>' +
              '<ul><li>a <strong>predicate noun</strong> renames the subject: <em>Ana is <strong>captain</strong>.</em></li>' +
              '<li>a <strong>predicate adjective</strong> describes it: <em>The soup was <strong>salty</strong>.</em></li></ul>' },
      { id: 'participle', title: 'Participles and gerunds (Year 8)',
        text: '<p>A <strong>participle</strong> is a verb form (-ing, -ed, -en) acting as an adjective: <em>the <strong>broken</strong> window, a <strong>barking</strong> dog</em>.</p>' +
              '<p>A <strong>gerund</strong> is an -ing verb acting as a noun: <em><strong>Swimming</strong> is fun. I love <strong>reading</strong>.</em></p>' },
      { id: 'dangling', title: 'Extension: dangling participles',
        text: '<p>A participle phrase at the start must describe the subject that follows.</p>' +
              '<p>✗ <em>Running for the bus, my bag fell open.</em> (the bag was not running)</p><p>✓ <em>Running for the bus, I felt my bag fall open.</em></p>' }
    ],

    examples: [
      {
        title: 'Example 1: from adjective to abstract noun',
        steps: ['<em>brave</em> + -ery → <strong>bravery</strong>', '<em>kind</em> + -ness → <strong>kindness</strong>', '<em>free</em> + -dom → <strong>freedom</strong>',
                'Each names a quality you cannot touch.']
      },
      {
        title: 'Example 2: gerund or participle? (Year 8)',
        steps: ['<em><strong>Swimming</strong> is my favourite sport.</em> It names an activity, so it is a noun: a gerund.',
                '<em>The <strong>swimming</strong> dog chased the ball.</em> It describes the dog, so it is an adjective: a participle.']
      }
    ],

    slots: [
      {
        name: 'Abstract or concrete?', learn: 'abstract',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each noun abstract (an idea or feeling) or concrete (something you can sense)?',
          bins: ['Abstract', 'Concrete'],
          items: [
            ...['courage', 'freedom', 'happiness', 'honesty', 'friendship', 'fear', 'curiosity', 'justice'].map(text => ({ text, bin: 0 })),
            ...['table', 'rain', 'kererū', 'river', 'teacher', 'sandwich', 'phone', 'mountain'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: 'Abstract nouns name ideas, feelings and qualities. Concrete nouns name things you can see, hear, touch, taste or smell.'
        })]
      },
      {
        name: 'Make an abstract noun', learn: 'abstract',
        items: [Sci.gen(rng => {
          const [adj, noun] = rng.pick(ABSTRACT);
          return Sci.word(rng, {
            prompt: `Write the abstract noun that comes from <strong>${adj}</strong>.`,
            note: adj === 'kind' ? 'For example: brave → bravery.' : 'For example: kind → kindness.',
            answer: noun, placeholder: 'type the noun',
            explain: `<strong>${noun}</strong> is the abstract noun formed from <em>${adj}</em>. It names an idea you cannot touch.`
          });
        })]
      },
      {
        name: 'Keep the tense', learn: 'tense',
        items: [
          ['Yesterday we ▢ to the beach.', 'went', ['go', 'will go', 'are going']],
          ['Tomorrow our class ▢ the museum.', 'will visit', ['visited', 'visits', 'has visited']],
          ['Right now, the Year 8s ▢ a science test.', 'are sitting', ['sat', 'will sit', 'had sat']],
          ['Last winter, it ▢ every single day.', 'rained', ['rains', 'will rain', 'is raining']],
          ['Every morning, Koro ▢ the paper.', 'reads', ['read', 'will have read', 'had read']],
          ['Next year my sister ▢ high school.', 'will start', ['started', 'starts', 'had started']]
        ].map(([s, right, wrong]) => rng => C(rng, {
          prompt: `Which verb fits the time? <em>${s}</em>`, right, wrong, wide: false,
          explain: 'The time words (yesterday, tomorrow, right now, every morning) tell you which tense to use.'
        }))
      },
      {
        name: 'Spot the tense slip', learn: 'tense',
        items: [
          [['Last Saturday we went to the river.', 'We swam until lunchtime.', 'Then Dad lights the barbecue.', 'We ate sausages in the sun.'], 2, '“lights” should be “lit”: the story is in the past.'],
          [['The storm hit at midnight.', 'Trees crashed onto the road.', 'In the morning, everyone helps to clear them.', 'By lunch, the road was open.'], 2, '“helps” should be “helped”.'],
          [['Every week our class reads a novel.', 'We discuss it on Fridays.', 'Then everyone wrote a short review.', 'The best reviews go on the wall.'], 2, '“wrote” should be “writes”: the rest is in the present.'],
          [['Mere opened the door slowly.', 'The room was dark.', 'Something moves in the corner.', 'She reached for the light switch.'], 2, '“moves” should be “moved”.'],
          [['Next week we will visit the museum.', 'We will see the moa skeleton.', 'Afterwards we had lunch in the park.', 'Then we will catch the bus home.'], 2, '“had” should be “will have”: the plan is in the future.'],
          [['Tama trains every afternoon.', 'He runs five kilometres.', 'Then he stretched for ten minutes.', 'He eats a big dinner afterwards.'], 2, '“stretched” should be “stretches”.']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, { prompt: 'One line slips into the wrong tense.', lines, wrong, cue: 'Click the line with the tense mistake.', explain: why }))
      },
      {
        name: 'Year 8: the indirect object', learn: 'indirect',
        items: INDIRECT.map(([s, right, wrong]) => rng => C(rng, {
          prompt: `What is the indirect object? <em>${s.replace(/<\/?strong>/g, '')}</em>`, right, wrong, wide: false,
          explain: `<em>${right}</em> receives the benefit: it answers “to whom?” or “for whom?”.`
        }))
      },
      {
        name: 'Year 8: predicate noun or adjective?', learn: 'predicate',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is the underlined word a predicate noun or a predicate adjective?',
          bins: ['Predicate noun', 'Predicate adjective'],
          items: [
            ...['Ana is <u>captain</u>.', 'My uncle became a <u>pilot</u>.', 'Hemi is a talented <u>artist</u>.', 'That tree is a <u>kauri</u>.', 'Her mum was the <u>winner</u>.'].map(text => ({ text, bin: 0 })),
            ...['The soup was <u>salty</u>.', 'The water felt <u>cold</u>.', 'The kittens seem <u>hungry</u>.', 'The night grew <u>dark</u>.', 'The crowd was <u>noisy</u>.'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: 'After a linking verb, a noun renames the subject (Ana = captain); an adjective describes it (the soup was salty).'
        })]
      },
      {
        name: 'Year 8: find the participle', learn: 'participle',
        items: PARTICIPLE.map(([s, right, wrong]) => rng => C(rng, {
          prompt: `Which word is a participle acting as an adjective? <em>${s}</em>`, right, wrong, wide: false,
          explain: `<em>${right}</em> is a verb form describing a noun.`
        }))
      },
      {
        name: 'Year 8: gerund or participle?', learn: 'participle',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is the underlined -ing word a gerund (a noun) or a participle (an adjective)?',
          bins: ['Gerund', 'Participle'],
          items: [
            ...['<u>Swimming</u> is my favourite sport.', 'I love <u>reading</u>.', 'Her <u>singing</u> filled the hall.', '<u>Running</u> keeps him fit.', 'We enjoyed <u>camping</u>.'].map(text => ({ text, bin: 0 })),
            ...['A <u>singing</u> bird woke me.', 'The <u>running</u> water was cold.', 'We saw a <u>sleeping</u> cat.', 'The <u>falling</u> leaves covered the path.', 'The <u>swimming</u> dog chased the ball.'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: 'A gerund names an activity and works as a noun. A participle describes a noun, like an adjective.'
        })]
      },
      {
        name: 'True or false', learn: 'abstract',
        items: [
          rng => TF(rng, { statement: '“Courage” is an abstract noun.', answer: true, learn: 'abstract', explain: 'It names a quality you cannot touch.' }),
          rng => TF(rng, { statement: '“Mountain” is an abstract noun.', answer: false, learn: 'abstract', explain: 'You can see and touch a mountain: it is concrete.' }),
          rng => TF(rng, { statement: 'A story told in the past tense should usually stay in the past tense.', answer: true, learn: 'tense', explain: 'Switching without reason confuses the reader.' }),
          rng => TF(rng, { statement: 'In “Koro told us a story”, “us” is the indirect object.', answer: true, learn: 'indirect', explain: 'Koro told a story to us.' }),
          rng => TF(rng, { statement: 'A gerund is an -ing verb used as a noun.', answer: true, learn: 'participle', explain: '“Swimming is fun.”' }),
          rng => TF(rng, { statement: 'In “The broken window”, “broken” is a participle.', answer: true, learn: 'participle', explain: 'It is a verb form describing the window.' }),
          rng => TF(rng, { statement: 'In “The soup was salty”, “salty” is a predicate noun.', answer: false, learn: 'predicate', explain: 'It describes the soup, so it is a predicate adjective.' }),
          rng => TF(rng, { statement: 'A predicate noun renames the subject after a linking verb.', answer: true, learn: 'predicate', explain: '“Ana is captain”: captain renames Ana.' })
        ]
      },
      {
        name: 'Extension: trickier verbs', learn: 'dangling',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which sentence has a dangling participle?', right: 'Running for the bus, my bag fell open.',
            wrong: ['Running for the bus, I felt my bag fall open.', 'My bag fell open as I ran for the bus.', 'While I was running for the bus, my bag fell open.'],
            explain: 'It says the bag was running. The opening phrase must describe the subject that follows.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence has a dangling participle?', right: 'Covered in mud, Mum hosed down the dog.',
            wrong: ['Covered in mud, the dog was hosed down by Mum.', 'Mum hosed down the dog, which was covered in mud.', 'The dog, covered in mud, was hosed down.'],
            explain: 'It says Mum was covered in mud. The participle phrase should sit next to “the dog”.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which verb fits? <em>By the time we arrived, the film ▢.</em>', right: 'had started', wrong: ['starts', 'will start', 'is starting'],
            explain: 'The past perfect (had started) shows something finished before another past event.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which verb fits? <em>She ▢ the book before she saw the film.</em>', right: 'had read', wrong: ['reads', 'will read', 'has been reading'],
            explain: 'Reading the book came before seeing the film, so the earlier action takes the past perfect.' }),
          rng => C(rng, { tag: EXT, prompt: 'In <em>I enjoy cooking for my whānau</em>, what job does “cooking” do?', right: 'It is a gerund, the object of “enjoy”.',
            wrong: ['It is a participle describing “I”.', 'It is the main verb.', 'It is an abstract noun formed with -ness.'],
            explain: 'What do I enjoy? Cooking. It names an activity, so it works as a noun.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which abstract noun names the quality of being <strong>generous</strong>?', right: 'generosity', wrong: ['generousness', 'generation', 'generousity'],
            explain: '“Generosity” drops the u of generous before -ity, like curious → curiosity.' })
        ]
      }
    ]
  });


  // ═══ W10 Active and passive voice ═════════════════════════════════════════
  // Writing › Composition › Sentence structures, grammar, and punctuation
  // (Years 7–8). Active voice is direct and shows who acts; passive voice
  // focuses on the action or the receiver, and is useful when the doer is
  // unknown or less important. Practice: distinguishing them and choosing.
  // Extension: passives that hide responsibility, and passives in other tenses.

  const AP = [
    ['The dog chased the cat.', 0], ['Mere scored the winning goal.', 0], ['The wind broke the window.', 0], ['Our class planted twenty trees.', 0],
    ['The chef cooked a delicious meal.', 0], ['Tama wrote the speech.', 0],
    ['The cat was chased by the dog.', 1], ['The winning goal was scored by Mere.', 1], ['The window was broken.', 1], ['Twenty trees were planted by our class.', 1],
    ['The museum was opened in 1998.', 1], ['My bike has been stolen.', 1]
  ];
  const BY = [
    ['The window was broken by the wind.', 'the wind', ['the window', 'broken', 'nobody']], ['The cake was eaten by the twins.', 'the twins', ['the cake', 'eaten', 'nobody']],
    ['The speech was written by Tama.', 'Tama', ['the speech', 'written', 'nobody']], ['The game was won by the Year 7s.', 'the Year 7s', ['the game', 'won', 'nobody']],
    ['The letter was delivered by a drone.', 'a drone', ['the letter', 'delivered', 'nobody']], ['The waka was paddled by twelve rowers.', 'twelve rowers', ['the waka', 'paddled', 'nobody']]
  ];
  const TOPASSIVE = [
    ['The dog chased the cat.', 'The cat was chased by the dog.', ['The dog was chased by the cat.', 'The cat chased the dog.', 'The cat is chasing the dog.']],
    ['Mere scored the goal.', 'The goal was scored by Mere.', ['Mere was scored by the goal.', 'The goal scored Mere.', 'Mere is scoring the goal.']],
    ['The storm damaged the bridge.', 'The bridge was damaged by the storm.', ['The storm was damaged by the bridge.', 'The bridge damaged the storm.', 'The bridge is damaging the storm.']],
    ['Our class painted the mural.', 'The mural was painted by our class.', ['Our class was painted by the mural.', 'The mural painted our class.', 'The mural is painting.']],
    ['A kārearea caught the sparrow.', 'The sparrow was caught by a kārearea.', ['A kārearea was caught by the sparrow.', 'The sparrow caught a kārearea.', 'The sparrow is catching.']],
    ['The principal announced the winners.', 'The winners were announced by the principal.', ['The principal was announced by the winners.', 'The winners announced the principal.', 'The winners are announcing.']]
  ];
  const TOACTIVE = [
    ['The cake was baked by Nana.', 'Nana baked the cake.', ['The cake baked Nana.', 'Nana was baked by the cake.', 'The cake was baked.']],
    ['The ball was kicked by Hemi.', 'Hemi kicked the ball.', ['The ball kicked Hemi.', 'Hemi was kicked by the ball.', 'The ball was kicked.']],
    ['The song was sung by the choir.', 'The choir sang the song.', ['The song sang the choir.', 'The choir was sung by the song.', 'The song was sung.']],
    ['The fence was repaired by Dad.', 'Dad repaired the fence.', ['The fence repaired Dad.', 'Dad was repaired by the fence.', 'The fence was repaired.']],
    ['The map was drawn by Ana.', 'Ana drew the map.', ['The map drew Ana.', 'Ana was drawn by the map.', 'The map was drawn.']],
    ['The race was won by a girl from Gisborne.', 'A girl from Gisborne won the race.', ['The race won a girl from Gisborne.', 'A girl from Gisborne was won by the race.', 'The race was won.']]
  ];

  Sci.topic({
    id: 'ew10', unit: 'writing',
    title: 'Active and Passive Voice',
    blurb: 'Who does the action, and when it is better not to say.',
    hint: 'Active: the subject does the action (The dog chased the cat). Passive: the subject receives the action, using a form of “be” plus a past participle ' +
          '(The cat was chased by the dog). Active is more direct; passive is useful when the doer is unknown or less important.',

    learn: [
      { id: 'active', title: 'Active voice',
        text: '<p>The subject <strong>does</strong> the action.</p><p><em><strong>The dog</strong> chased the cat.</em></p><p>Active writing is direct and clear about who did what.</p>' },
      { id: 'passive', title: 'Passive voice',
        text: '<p>The subject <strong>receives</strong> the action. Look for a form of <strong>be</strong> (was, were, is, has been) plus a past participle.</p>' +
              '<p><em><strong>The cat</strong> was chased by the dog.</em></p><p>The doer may come after “by”, or be left out: <em>The window was broken.</em></p>' },
      { id: 'when', title: 'When passive helps',
        text: '<ul><li>The doer is <strong>unknown</strong>: <em>My bike has been stolen.</em></li>' +
              '<li>The doer is <strong>not important</strong>: <em>The museum was opened in 1998.</em></li>' +
              '<li>The focus is the <strong>action</strong>, as in science methods: <em>The water was heated for five minutes.</em></li></ul>' },
      { id: 'switch', title: 'Switching voice',
        text: Sci.table(['Active', 'Passive'], [['Mere scored the goal.', 'The goal was scored by Mere.'], ['The storm damaged the bridge.', 'The bridge was damaged by the storm.']]) +
              '<p>The object of the active sentence becomes the subject of the passive one.</p>' },
      { id: 'hide', title: 'Extension: passive that hides',
        text: '<p>Passive voice can leave out <strong>who is responsible</strong>: <em>Mistakes were made.</em> (By whom?)</p>' +
              '<p>Critical readers ask who did the action when a text does not say.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: active to passive',
        steps: ['Active: <em>Our class planted twenty trees.</em>', 'Move the object to the front: <em>Twenty trees …</em>',
                'Add a form of “be” and the past participle: <em>… were planted …</em>', 'Add the doer with “by”, if needed: <em>Twenty trees were planted by our class.</em>']
      },
      {
        title: 'Example 2: choosing the voice',
        steps: ['A news report: <em>The bridge was closed on Monday.</em> Who closed it matters less than the closure: passive suits.',
                'A sports report: <em>Mere scored the winning goal.</em> The player is the point: active suits.']
      }
    ],

    slots: [
      { name: 'Active or passive?', learn: 'passive',
        items: [rng => Sci.sort(rng, { prompt: 'Is each sentence active or passive?', bins: ['Active', 'Passive'],
          items: AP.map(([text, bin]) => ({ text, bin })), pick: 6,
          explain: 'In the passive, the subject receives the action, with a form of “be” plus a past participle (was chased, were planted, has been stolen).' })] },
      { name: 'Who did it?', learn: 'passive',
        items: BY.map(([s, right, wrong]) => rng => C(rng, { prompt: `<em>${s}</em> Who or what did the action?`, right, wrong, wide: false,
          explain: `In a passive sentence the doer comes after “by”: ${right}.` })) },
      { name: 'Make it passive', learn: 'switch',
        items: TOPASSIVE.map(([a, right, wrong]) => rng => C(rng, { prompt: `<em>${a}</em> Which is the same idea in the passive voice?`, right, wrong,
          explain: 'The object becomes the subject, and the verb becomes a form of “be” plus a past participle.' })) },
      { name: 'Make it active', learn: 'switch',
        items: TOACTIVE.map(([p, right, wrong]) => rng => C(rng, { prompt: `<em>${p}</em> Which is the same idea in the active voice?`, right, wrong,
          explain: 'The doer (after “by”) becomes the subject, and does the action directly.' })) },
      { name: 'Why passive?', learn: 'when',
        items: [
          ['My bike has been stolen.', 'The writer does not know who took it.'],
          ['The museum was opened in 1998.', 'Who opened it matters less than when it opened.'],
          ['The water was heated for five minutes.', 'In a method, the action matters more than who did it.'],
          ['The new road will be finished next year.', 'The focus is on the road, not the builders.'],
          ['The patient was rushed to hospital.', 'The focus is on the patient.'],
          ['Our school was founded in 1912.', 'The founders are not the point of the sentence.']
        ].map(([s, right]) => rng => C(rng, { prompt: `Why might a writer choose the passive here? <em>${s}</em>`,
          right, wrong: ['To make the sentence more direct.', 'Because passive is always more correct.', 'To show exactly who did the action.'],
          explain: 'Passive voice puts the focus on the action or what receives it, and is useful when the doer is unknown or unimportant.' })) },
      { name: 'Which is more direct?', learn: 'active',
        items: TOACTIVE.map(([p, act]) => rng => C(rng, { prompt: 'Which version is more direct about who did the action?', right: act, wrong: [p, p.replace(/ by .*\./, '.')].concat(['Nobody knows.']).slice(0, 2),
          explain: 'Active voice names the doer first and makes it clear who did what.' })) },
      { name: 'Find the passive', learn: 'passive',
        items: [
          [['Hemi kicked off the game.', 'The ball sailed high into the air.', 'It was caught by the fullback.', 'She ran it back up the field.'], 2],
          [['The storm arrived at midnight.', 'Rain hammered the roof.', 'Several trees were blown over.', 'We stayed inside until morning.'], 2],
          [['Our class visited the museum.', 'We saw a moa skeleton.', 'The museum was built in 1930.', 'We had lunch in the gardens.'], 2],
          [['Mere entered the competition.', 'Her poem was chosen by the judges.', 'She read it on the radio.', 'Her family was very proud.'], 1],
          [['The volunteers met at dawn.', 'They counted the birds on the island.', 'Every nest was checked.', 'The results surprised everyone.'], 2],
          [['The festival began on Friday.', 'Food stalls lined the street.', 'Prizes were given to the best dancers.', 'Everyone stayed late.'], 2]
        ].map(([lines, at]) => rng => Sci.spot(rng, { prompt: 'One sentence in this paragraph is passive.', lines, wrong: at,
          cue: 'Click the passive sentence.', find: 'is passive', explain: 'It uses a form of “be” with a past participle, and the subject receives the action.' })) },
      { name: 'True or false', learn: 'passive',
        items: [
          rng => TF(rng, { statement: 'In the active voice, the subject does the action.', answer: true, learn: 'active', explain: '“The dog chased the cat.”' }),
          rng => TF(rng, { statement: 'A passive sentence always says who did the action.', answer: false, learn: 'passive', explain: 'The doer can be left out: “The window was broken.”' }),
          rng => TF(rng, { statement: 'Passive voice is useful when the doer is unknown.', answer: true, learn: 'when', explain: '“My bike has been stolen.”' }),
          rng => TF(rng, { statement: 'Active voice is usually more direct than passive voice.', answer: true, learn: 'active', explain: 'It names the doer first.' }),
          rng => TF(rng, { statement: '“The cake was eaten by the twins” is in the active voice.', answer: false, learn: 'passive', explain: 'The subject (the cake) receives the action: it is passive.' }),
          rng => TF(rng, { statement: 'Passive voice is always wrong.', answer: false, learn: 'when', explain: 'It is a choice, useful in methods, news and when the doer is unknown.' })
        ] },
      { name: 'Science writing', learn: 'when',
        items: [
          rng => C(rng, { prompt: 'A science method says: <em>The beaker was filled with 100 mL of water.</em> Why is it passive?', right: 'The action matters, not who did it.', wrong: ['Scientists are not allowed to say “I”.', 'Passive is easier to read.', 'It hides a mistake.'], explain: 'Methods focus on what was done, so that anyone could repeat it.' }),
          rng => C(rng, { prompt: 'Which sentence would suit a science method?', right: 'The leaves were weighed every two days.', wrong: ['I weighed the leaves when I felt like it.', 'Ana and me weighed some leaves.', 'Weighing leaves is boring.'], explain: 'It is precise and focuses on the action.' }),
          rng => C(rng, { prompt: 'Which is the passive version? <em>We heated the water for five minutes.</em>', right: 'The water was heated for five minutes.', wrong: ['The water heated us for five minutes.', 'We were heated for five minutes.', 'Heating the water for five minutes.'], explain: 'The object (the water) becomes the subject.' }),
          rng => C(rng, { prompt: 'A news report says: <em>Three people were rescued from the river.</em> What is the focus?', right: 'The people who were rescued', wrong: ['The rescuers', 'The river', 'The reporter'], explain: 'The passive puts the people rescued first.' }),
          rng => C(rng, { prompt: 'A sports report wants to praise the player. Which is better?', right: 'Ana scored three tries.', wrong: ['Three tries were scored.', 'Three tries were scored by a player.', 'Tries were scored.'], explain: 'The active voice puts Ana at the centre.' }),
          rng => C(rng, { prompt: 'Which sentence is passive?', right: 'The results were recorded in a table.', wrong: ['We recorded the results in a table.', 'The table shows the results.', 'Ana recorded the results.'], explain: '“Were recorded”: a form of be plus a past participle, with the results receiving the action.' })
        ] },
      { name: 'Extension: reading the passive critically', learn: 'hide',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'A company says: <em>Mistakes were made.</em> What might a critical reader ask?', right: 'Who made the mistakes?', wrong: ['How many words is it?', 'Is it a simple sentence?', 'Is it in the future tense?'], explain: 'The passive leaves out who is responsible.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence takes responsibility most clearly?', right: 'I broke the window.', wrong: ['The window was broken.', 'The window got broken.', 'Somehow, the window broke.'], explain: 'The active voice names the doer: I.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is passive and in the future?', right: 'The bridge will be opened next year.', wrong: ['The bridge was opened last year.', 'They will open the bridge next year.', 'The bridge is opening next year.'], explain: '“Will be opened”: future passive.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is passive and happening now?', right: 'The new hall is being built.', wrong: ['They are building the new hall.', 'The new hall was built.', 'The new hall will build.'], explain: '“Is being built”: present continuous passive.' }),
          rng => C(rng, { tag: EXT, prompt: 'A headline reads <em>Protesters were arrested</em>. Another reads <em>Police arrested protesters</em>. What changes?', right: 'The first focuses on the protesters; the second on the police’s action.', wrong: ['They report different events.', 'The second is passive.', 'Nothing at all.'], explain: 'Voice shapes where the reader’s attention goes.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence uses “get” to make a passive?', right: 'Hemi got picked for the team.', wrong: ['Hemi picked the team.', 'Hemi got a new bike.', 'Hemi gets up early.'], explain: '“Got picked” works like “was picked”: an informal passive.' })
        ] }
    ]
  });


  // ═══ W12 Choosing words ═══════════════════════════════════════════════════
  // Writing › Composition › Audience, purpose, and language choice (Years
  // 7–8): synonyms carry shades of meaning, tone and intensity; choosing the
  // most accurate synonym; a thesaurus supports word choice; words and
  // features suit the audience and purpose. Year 8: nuance, personal voice.
  // Extension: denotation and connotation, euphemism, emotive language.

  const SCALES = [
    ['warm', 'hot', 'scorching'], ['cool', 'cold', 'freezing'], ['small', 'tiny', 'microscopic'], ['happy', 'delighted', 'ecstatic'],
    ['annoyed', 'angry', 'furious'], ['like', 'love', 'adore'], ['big', 'huge', 'gigantic'], ['damp', 'wet', 'soaked'],
    ['murmur', 'say', 'shout']
  ];
  const PRECISE = [
    ['The old man ▢ slowly up the steep hill.', 'shuffled', ['sprinted', 'raced', 'zoomed']],
    ['The cat ▢ silently towards the sparrow.', 'crept', ['stomped', 'marched', 'thundered']],
    ['The thief ▢ the bag and ran.', 'snatched', ['borrowed', 'offered', 'admired']],
    ['The baby ▢ when the balloon popped.', 'wailed', ['whispered', 'chuckled', 'sighed']],
    ['Rain ▢ on the tin roof all night.', 'drummed', ['crept', 'tiptoed', 'smiled']],
    ['The exhausted runner ▢ across the finish line.', 'staggered', ['skipped', 'bounced', 'pranced']],
    ['The tūī ▢ from the top of the kōwhai.', 'sang', ['roared', 'growled', 'muttered']]
  ];
  const CONNOTE = [['slim', 'skinny'], ['curious', 'nosy'], ['confident', 'arrogant'], ['thrifty', 'stingy'], ['determined', 'stubborn'],
                   ['relaxed', 'lazy'], ['youthful', 'childish'], ['unique', 'weird'], ['firm', 'harsh']];
  const VAGUE = [
    ['The movie was good.', 'The movie was gripping from start to finish.', ['The movie was nice.', 'The movie was really good.', 'The movie was very, very good.']],
    ['The food was bad.', 'The fish was cold and the chips were soggy.', ['The food was not good.', 'The food was really bad.', 'The food was nasty.']],
    ['It was a nice day.', 'The sun was warm and the sea was glassy-calm.', ['It was a lovely day.', 'It was a really nice day.', 'It was a good day.']],
    ['She went to the shop.', 'She hurried to the dairy before it closed.', ['She went to the shop quickly.', 'She went to a shop.', 'She went to the shop again.']],
    ['The dog was big.', 'The dog’s head reached the kitchen bench.', ['The dog was very big.', 'The dog was large.', 'The dog was really, really big.']],
    ['The game was exciting.', 'The lead changed four times in the last ten minutes.', ['The game was very exciting.', 'The game was super exciting.', 'The game was fun and exciting.']]
  ];

  Sci.topic({
    id: 'ew12', unit: 'writing',
    title: 'Choosing Words',
    blurb: 'Shades of meaning, positive and negative words, and language that suits the audience.',
    hint: 'Synonyms are not identical: they differ in strength (warm, hot, scorching), in feeling (slim or skinny) and in formality. ' +
          'Choose the word that says exactly what you mean, for your audience and purpose. A thesaurus helps, but check the meaning.',

    learn: [
      { id: 'shades', title: 'Shades of meaning',
        text: '<p>Synonyms differ in <strong>intensity</strong>:</p><p>warm → hot → scorching<br>annoyed → angry → furious</p>' +
              '<p>Choose the one that matches exactly what you mean.</p>' },
      { id: 'precise', title: 'Precise words',
        text: '<p>A precise word does the work of several vague ones.</p><p><em>The old man <strong>shuffled</strong> up the hill</em> says more than <em>walked slowly</em>.</p>' +
              '<p>Replace vague words (good, nice, bad, big) with specific detail.</p>' },
      { id: 'connotation', title: 'Positive or negative?',
        text: '<p>Words with similar meanings can carry different <strong>feelings</strong>:</p>' +
              Sci.table(['Positive', 'Negative'], [['slim', 'skinny'], ['curious', 'nosy'], ['confident', 'arrogant'], ['determined', 'stubborn']]) },
      { id: 'register', title: 'Formal or informal',
        text: '<p>Match the language to the <strong>audience</strong>.</p>' +
              Sci.table(['Formal', 'Informal'], [['Good morning, everyone.', 'Hey, what’s up?'], ['I would be grateful for your reply.', 'Cheers for the help!']]) +
              '<p>A letter to the council needs formal language; a message to a friend does not.</p>' },
      { id: 'thesaurus', title: 'Using a thesaurus',
        text: '<p>A <strong>thesaurus</strong> lists synonyms. It is a useful tool, but synonyms are rarely exact swaps.</p>' +
              '<p>Check the meaning and tone of a new word in a dictionary, or by reading it in a sentence, before using it.</p>' },
      { id: 'connote-ext', title: 'Extension: denotation and connotation',
        text: '<p><strong>Denotation</strong>: what a word literally means. <strong>Connotation</strong>: the feelings it carries.</p>' +
              '<p>A <strong>euphemism</strong> is a gentler way to say something hard: “passed away” for “died”.</p>' +
              '<p><strong>Emotive language</strong> chooses words for their emotional effect, often to persuade.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: choosing between synonyms',
        steps: ['<em>The cat ▢ towards the sparrow.</em>', '<em>Walked</em> is vague; <em>stomped</em> would scare the bird away.',
                '<em>Crept</em> shows slow, quiet, careful movement: exactly what a hunting cat does.']
      },
      {
        title: 'Example 2: positive or negative',
        steps: ['<em>Ana is determined.</em> This sounds like praise.', '<em>Ana is stubborn.</em> The same quality sounds like a criticism.',
                'Writers pick the word that matches the feeling they want the reader to have.']
      }
    ],

    slots: [
      { name: 'Weakest to strongest', learn: 'shades',
        items: [Sci.gen(rng => {
          const sc = rng.pick(SCALES);
          return Sci.order(rng, 'Put these words in order, from weakest to strongest.', sc,
            `${sc.join(' → ')}. Each word is a stronger version of the one before.`);
        })] },
      { name: 'The precise word', learn: 'precise',
        items: [Sci.gen(rng => {
          const [s, right, wrong] = rng.pick(PRECISE);
          return C(rng, { prompt: `Which word fits best? <em>${s}</em>`, right, wrong, wide: false,
            explain: `<em>${right}</em> matches what is happening. The others give the wrong picture.` });
        })] },
      { name: 'Positive or negative?', learn: 'connotation',
        items: [rng => Sci.sort(rng, { prompt: 'Does each word sound positive or negative when describing a person?', bins: ['Positive', 'Negative'],
          items: CONNOTE.flatMap(([p, n]) => [{ text: p, bin: 0 }, { text: n, bin: 1 }]), pick: 6,
          explain: 'Pairs such as determined and stubborn mean nearly the same thing, but one sounds like praise and the other like criticism.' })] },
      { name: 'Formal or informal?', learn: 'register',
        items: [rng => Sci.sort(rng, { prompt: 'Is each one formal or informal?', bins: ['Formal', 'Informal'],
          items: [
            ...['Good morning, everyone.', 'I would be grateful for your reply.', 'Please find my application attached.', 'We regret to inform you that the event is cancelled.', 'Thank you for your time.'].map(text => ({ text, bin: 0 })),
            ...['Hey, what’s up?', 'Cheers for the help!', 'Gonna be late, sorry!', 'That was heaps good.', 'See ya later.'].map(text => ({ text, bin: 1 }))
          ], pick: 6,
          explain: 'Formal language is complete, polite and avoids slang. Informal language is relaxed, with contractions and slang.' })] },
      { name: 'Right for the audience', learn: 'register',
        items: [
          ['Which opening suits a letter to the city council?', 'Dear Councillors, I am writing about the closure of our local pool.', ['Hey council, what’s the deal with the pool?', 'Yo, the pool thing is so bad.', 'Guess what? The pool is closed!']],
          ['Which sentence suits a speech to the school board?', 'I would like to propose a longer lunch break for three reasons.', ['Lunch is way too short, eh.', 'Can we just have a longer lunch or what?', 'Lunch is so short it’s not even funny.']],
          ['Which line suits a picture book for five-year-olds?', 'Kiwi was small, but Kiwi was brave.', ['The diminutive kiwi exhibited remarkable courage.', 'Kiwi’s bravery was statistically unusual.', 'Kiwi demonstrated resilience in adverse conditions.']],
          ['Which sentence suits a science report?', 'The temperature rose by 4 °C in ten minutes.', ['The water got super hot really fast.', 'It got heaps warmer, like, quickly.', 'The water was boiling crazy hot.']],
          ['Which message suits a text to a close friend?', 'Running late, save me a seat!', ['I regret to inform you that I shall be delayed.', 'Please be advised of my late arrival.', 'Kindly reserve a seat on my behalf.']],
          ['Which sentence suits a job application?', 'I am reliable and enjoy working with people.', ['I’m pretty chill and stuff.', 'I reckon I’d be heaps good at this.', 'Pick me, I’m awesome!']]
        ].map(([prompt, right, wrong]) => rng => C(rng, { prompt, right, wrong,
          explain: 'Formal situations and unfamiliar audiences need formal language; friends and young children need simple, relaxed language.' })) },
      { name: 'Thesaurus sense', learn: 'thesaurus',
        items: [
          rng => C(rng, { prompt: 'What does a thesaurus list?', right: 'Words with similar meanings (synonyms)', wrong: ['The meaning of every word', 'How to pronounce words', 'Where words come from'], explain: 'A dictionary gives meanings; a thesaurus gives synonyms.' }),
          rng => C(rng, { prompt: 'Why should you check a word you found in a thesaurus before using it?', right: 'Synonyms differ in meaning, strength and tone, so it may not fit.', wrong: ['Thesauruses are often wrong.', 'Long words are always better.', 'You need permission to use new words.'], explain: 'A synonym is rarely an exact swap.' }),
          rng => C(rng, { prompt: 'A thesaurus gives <em>scrawny</em> as a synonym for <em>slim</em>. Which sentence would suit a compliment?', right: 'She looks fit and slim.', wrong: ['She looks fit and scrawny.', 'She looks scrawny and weak.', 'Her scrawny arms were strong.'], explain: '“Scrawny” has a negative connotation, so it does not suit praise.' }),
          rng => C(rng, { prompt: 'A thesaurus suggests <em>stroll</em>, <em>march</em> and <em>stagger</em> for <em>walk</em>. Which suits a soldier on parade?', right: 'march', wrong: ['stroll', 'stagger', 'wander'], explain: 'Each synonym paints a different picture; choose the one that matches.' }),
          rng => C(rng, { prompt: 'A thesaurus gives <em>chilly</em> and <em>frigid</em> for <em>cold</em>. Which suits a polar winter?', right: 'frigid', wrong: ['chilly', 'cool', 'fresh'], explain: '“Frigid” is much stronger than “chilly”.' }),
          rng => C(rng, { prompt: 'Which is the best way to choose between two synonyms?', right: 'Read each in your sentence and check which matches your exact meaning and tone.', wrong: ['Pick the longest one.', 'Pick the first one listed.', 'Pick the one you have never heard of.'], explain: 'Precision and tone matter more than length.' })
        ] },
      { name: 'Replace the vague', learn: 'precise',
        items: VAGUE.map(([base, right, wrong]) => rng => C(rng, { prompt: `<em>${base}</em> Which version is most precise?`, right, wrong,
          explain: 'Precise writing gives specific detail the reader can picture, rather than a stronger vague word.' })) },
      { name: 'True or false', learn: 'shades',
        items: [
          rng => TF(rng, { statement: 'Synonyms always mean exactly the same thing.', answer: false, explain: 'They differ in intensity, feeling and formality.' }),
          rng => TF(rng, { statement: '“Furious” is stronger than “annoyed”.', answer: true, explain: 'annoyed → angry → furious' }),
          rng => TF(rng, { statement: '“Nosy” sounds more positive than “curious”.', answer: false, learn: 'connotation', explain: '“Nosy” is negative; “curious” is positive or neutral.' }),
          rng => TF(rng, { statement: 'Formal language suits a letter to a school principal.', answer: true, learn: 'register', explain: 'The audience and purpose call for it.' }),
          rng => TF(rng, { statement: 'A thesaurus is a useful tool for finding synonyms.', answer: true, learn: 'thesaurus', explain: 'But check each one fits your meaning.' }),
          rng => TF(rng, { statement: 'Replacing “good” with “very good” makes writing more precise.', answer: false, learn: 'precise', explain: 'It is still vague. Specific detail is more precise.' })
        ] },
      { name: 'Words that work against you', learn: 'connotation',
        items: [
          [['Come and try our new café!', 'Our cramped little dining room seats twelve.', 'We serve fresh scones every morning.', 'Open daily from 7 am.'], 1, '“Cramped” makes the café sound uncomfortable. “Cosy” would suit the purpose.'],
          [['Dear Principal,', 'I am writing about our school garden.', 'The garden is a total dump right now.', 'I would like to propose a working bee.'], 2, '“A total dump” is too informal for a letter to the principal.'],
          [['Vote for Tama for class captain!', 'He is stubborn and never gives up.', 'He listens to everyone.', 'He will make our class better.'], 1, '“Stubborn” sounds negative. “Determined” would support the purpose.'],
          [['Our town needs a skate park.', 'Young people have nowhere to go.', 'A skate park would be a boring place to hang out.', 'Please support our petition.'], 2, 'Calling it boring works against the writer’s argument.'],
          [['Welcome to our open day!', 'Our tiny, ancient classrooms are full of history.', 'Students learn in a friendly environment.', 'Come and meet our teachers.'], 1, '“Tiny, ancient” sounds negative. “Historic” would serve the purpose better.'],
          [['Dear Hiring Manager,', 'I am applying for the job at your bookshop.', 'I’m kinda into books and stuff.', 'I am available on weekends.'], 2, 'Slang does not suit a job application.']
        ].map(([lines, at, why]) => rng => Sci.spot(rng, { prompt: 'One line uses words that work against the writer’s purpose.', lines, wrong: at,
          cue: 'Click the line with the poor word choice.', explain: why })) },
      { name: 'Extension: what words carry', learn: 'connote-ext',
        items: [
          rng => C(rng, { tag: EXT, prompt: '<em>Home</em> and <em>house</em> have the same denotation. What is different?', right: 'Their connotation: “home” suggests warmth and belonging.', wrong: ['Their spelling only.', 'Their denotation.', 'Nothing at all.'], explain: 'Denotation is the literal meaning; connotation is the feeling.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which is a euphemism?', right: 'passed away', wrong: ['died', 'was killed', 'perished'], explain: 'A euphemism softens something hard to say.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence uses emotive language?', right: 'Innocent animals are being cruelly dumped on our streets.', wrong: ['Some animals are left on streets.', 'The council reported 40 stray dogs last year.', 'Stray animals are a problem in some areas.'], explain: '“Innocent” and “cruelly dumped” are chosen to stir feeling.' }),
          rng => C(rng, { tag: EXT, prompt: 'A real estate advert calls a small flat “cosy”. Why?', right: 'It gives a small space a positive connotation.', wrong: ['To describe its exact size.', 'Because cosy means large.', 'To warn buyers.'], explain: 'Word choice can make the same fact sound appealing.' }),
          rng => C(rng, { tag: EXT, prompt: 'A news report calls a group “protesters”; another calls them “troublemakers”. What does the choice show?', right: 'The writers’ different attitudes to the group', wrong: ['That they were different groups', 'That one report is longer', 'Nothing: the words mean the same'], explain: 'Connotation can reveal a writer’s viewpoint.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word gives a neutral description?', right: 'thin', wrong: ['scrawny', 'skeletal', 'svelte'], explain: '“Thin” is close to neutral; the others carry strong positive or negative feeling.' })
        ] }
    ]
  });


  // ═══ W13 Structuring writing ══════════════════════════════════════════════
  // Writing › Composition: writing to entertain, inform and persuade; and
  // Writing Processes: planning, drafting, revising (Years 7–8). Structure
  // suits purpose; topic sentences; transitions link ideas; conclusions
  // restate or reflect. Year 8 persuasive writing acknowledges and rebuts the
  // opposing view. Extension: choosing an organising structure.

  const TRANSITIONS = [
    ['Kākāpō cannot fly. ▢, they are excellent climbers.', 'However', 'contrast'],
    ['Many native birds eat nectar. ▢, tūī feed on flax flowers.', 'For example', 'example'],
    ['The river flooded overnight. ▢, the road was closed.', 'As a result', 'result'],
    ['Exercise strengthens the heart. ▢, it improves sleep.', 'In addition', 'addition'],
    ['Kea are curious birds. ▢, kākā investigate anything new.', 'Similarly', 'comparison'],
    ['First, mix the flour and water. ▢, knead the dough.', 'Next', 'sequence'],
    ['The plan is cheap. ▢, it may take years to finish.', 'On the other hand', 'contrast'],
    ['Plastic harms sea life. ▢, we should use less of it.', 'Therefore', 'result']
  ];
  const TJOB = { contrast: 'shows a contrast', example: 'gives an example', result: 'shows a result', addition: 'adds a point', comparison: 'shows a similarity', sequence: 'shows the next step' };

  Sci.topic({
    id: 'ew13', unit: 'writing',
    title: 'Structuring Writing',
    blurb: 'How texts to persuade, inform and entertain are organised, and the words that hold them together.',
    hint: 'Each purpose has its own structure. Persuade: position, reasons with evidence, (Year 8) the other side answered, a strong conclusion. Inform: introduce, ' +
          'explain in paragraphs, conclude. Entertain: orientation, complication, resolution. Start paragraphs with a topic sentence; link ideas with transitions.',

    learn: [
      { id: 'persuade', title: 'Writing to persuade',
        text: '<ol class="learn-steps"><li>State your position</li><li>Reasons, each with evidence</li><li><strong>Year 8:</strong> acknowledge the opposing view and show why yours is stronger</li><li>Restate your position with a strong final statement</li></ol>' },
      { id: 'inform', title: 'Writing to inform',
        text: '<ol class="learn-steps"><li>Introduce the topic (Year 8: preview what is coming)</li><li>One main idea per paragraph, with facts and examples</li><li>Headings and visuals where they help</li><li>A conclusion highlighting the key points</li></ol>' },
      { id: 'entertain', title: 'Writing to entertain',
        text: '<ol class="learn-steps"><li><strong>Orientation:</strong> who, where, when</li><li><strong>Complication:</strong> a problem arises</li><li>Events build</li><li><strong>Resolution:</strong> closure that follows from the story</li></ol>' },
      { id: 'topic', title: 'Topic sentences',
        text: '<p>The first sentence of a paragraph tells the reader its <strong>main idea</strong>. The rest of the paragraph supports it with detail, evidence and examples.</p>' },
      { id: 'transitions', title: 'Transition words',
        text: Sci.table(['Job', 'Transitions'], [['add', 'in addition, also, furthermore'], ['contrast', 'however, on the other hand, in contrast'],
                ['example', 'for example, for instance'], ['result', 'as a result, therefore, consequently'], ['similarity', 'similarly, likewise'], ['sequence', 'first, next, finally']]) },
      { id: 'conclude', title: 'Conclusions',
        text: '<p>A conclusion should <strong>not</strong> add brand-new points.</p><ul><li>Persuasive: restate the position and leave a strong final impression.</li>' +
              '<li>Informative: highlight the most important points.</li><li>Narrative: give a sense of closure.</li></ul>' },
      { id: 'organise', title: 'Extension: organising structures',
        text: Sci.table(['Structure', 'Suits'], [['chronological', 'a history, a recount, instructions'], ['cause and effect', 'explaining why something happens'],
                ['compare and contrast', 'two things side by side'], ['problem and solution', 'proposals and persuasive pieces']]) }
    ],

    examples: [
      {
        title: 'Example 1: a persuasive paragraph',
        steps: ['<strong>Topic sentence:</strong> <em>Our school should have a vegetable garden.</em>',
                '<strong>Reason and evidence:</strong> <em>Students who grow food are more likely to eat vegetables.</em>',
                '<strong>Transition:</strong> <em>In addition, the garden could supply the school canteen.</em>']
      },
      {
        title: 'Example 2: answering the other side (Year 8)',
        steps: ['<em>Some people argue that a garden would take too much time to look after.</em>',
                '<em>However, a roster shared across classes would need only twenty minutes a week from each.</em>',
                'Acknowledging the objection, then answering it, makes the argument stronger.']
      }
    ],

    slots: [
      { name: 'Put the structure in order', learn: 'persuade',
        items: [
          rng => Sci.order(rng, 'Put the parts of a persuasive text in order.', ['State your position', 'Give your first reason, with evidence', 'Give your second reason, with evidence', 'Restate your position with a strong final statement'], 'Position, reasons with evidence, then a conclusion that restates the position.', { learn: 'persuade' }),
          rng => Sci.order(rng, 'Year 8: put the parts of a persuasive text in order.', ['State your position', 'Give your reasons, with evidence', 'Acknowledge the opposing view', 'Show why your position is stronger', 'Restate your position with a strong final statement'], 'Year 8 persuasive writing answers the other side before concluding.', { learn: 'persuade' }),
          rng => Sci.order(rng, 'Put the parts of an informative report in order.', ['Introduce the topic', 'Explain the first main idea', 'Explain the next main idea', 'Highlight the most important points'], 'Introduction, a paragraph per idea, then a conclusion.', { learn: 'inform' }),
          rng => Sci.order(rng, 'Put the parts of a narrative in order.', ['Orientation: introduce the characters and setting', 'Complication: a problem arises', 'Events build as the characters respond', 'Resolution: the problem is resolved'], 'Orientation, complication, building events, resolution.', { learn: 'entertain' }),
          rng => Sci.order(rng, 'Put the parts of a set of instructions in order.', ['Say what will be made or done', 'List the equipment or ingredients', 'Give the steps in order', 'Explain how to check it worked'], 'Goal, materials, steps, then checking.', { learn: 'inform' }),
          rng => Sci.order(rng, 'Put the parts of a letter to the editor in order.', ['Greeting', 'State your view on the issue', 'Reasons and evidence', 'Restate your view and sign off'], 'It follows the persuasive structure inside the letter format.', { learn: 'persuade' })
        ] },
      { name: 'The best topic sentence', learn: 'topic',
        items: [
          ['▢ They help trees spread by carrying seeds far from the parent plant. Tūī and bellbirds pollinate flowers. Without birds, many forests would struggle to survive.', 'Native birds play an important role in our forests.', ['Birds are animals with feathers.', 'I saw a tūī yesterday.', 'Forests are big.']],
          ['▢ Phones distract students during class. Studies show that people take time to refocus after checking a message. A phone-free school day would help everyone concentrate.', 'Phones should be put away during school hours.', ['Phones are expensive.', 'Many people own phones.', 'Some phones are bigger than others.']],
          ['▢ It needs only flour, water and salt. You mix them, knead the dough, and let it rest. It is ready in under an hour.', 'Flatbread is one of the easiest breads to make.', ['Bread is food.', 'Ovens can be dangerous.', 'My nan likes bread.']],
          ['▢ The rain fell for six days. Rivers burst their banks, and roads were washed away. Thousands of people had to leave their homes.', 'The storm caused widespread damage across the region.', ['Rain is wet.', 'Some people like storms.', 'Roads are made of tar.']],
          ['▢ It is free, it keeps you fit, and you can do it almost anywhere. All you need is a pair of shoes.', 'Walking is one of the best ways to stay active.', ['Shoes come in many colours.', 'Some people walk to school.', 'Exercise is a word.']],
          ['▢ Kākāpō are flightless, nocturnal and the heaviest parrots in the world. They even smell sweet, a little like honey.', 'The kākāpō is one of the world’s most unusual birds.', ['Parrots are birds.', 'Night is dark.', 'Honey is sweet.']]
        ].map(([para, right, wrong]) => rng => C(rng, { prompt: `Which topic sentence best opens this paragraph? <em>${para}</em>`, right, wrong,
          explain: 'A topic sentence states the main idea that the rest of the paragraph supports.' })) },
      { name: 'Choose the transition', learn: 'transitions',
        items: [Sci.gen(rng => {
          const [s, right, job] = rng.pick(TRANSITIONS);
          const pool = ['However', 'For example', 'As a result', 'In addition', 'Similarly', 'Next', 'Therefore', 'On the other hand'];
          const sameJob = TRANSITIONS.filter(t => t[2] === job).map(t => t[1]);
          // Leave out near-misses that could also fit the gap.
          const near = { comparison: ['In addition'], addition: ['Similarly'], example: ['In addition'], result: ['Next'] }[job] || [];
          const wrong = rng.sample(pool.filter(p => !sameJob.includes(p) && !near.includes(p)), 3);
          return C(rng, { prompt: `Which transition fits? <em>${s}</em>`, right, wrong, wide: false,
            explain: `The second sentence ${TJOB[job]}, so “${right}” fits.` });
        })] },
      { name: 'Match transitions to jobs', learn: 'transitions',
        items: [Sci.gen(rng => {
          const four = rng.sample(['contrast', 'example', 'result', 'addition', 'comparison', 'sequence'], 4);
          const word = { contrast: 'However', example: 'For example', result: 'As a result', addition: 'In addition', comparison: 'Similarly', sequence: 'Finally' };
          return Sci.match(rng, 'Match each transition to its job.', four.map(j => [word[j], TJOB[j].replace(/^\w/, c => c.toUpperCase())]),
            'Transitions tell the reader how the next idea connects to the last one.');
        })] },
      { name: 'What is the purpose?', learn: 'persuade',
        items: [rng => Sci.sort(rng, { prompt: 'What is the main purpose of each extract?', bins: ['To inform', 'To persuade', 'To entertain'],
          items: [
            { text: 'Kākāpō are nocturnal parrots found only in New Zealand.', bin: 0 },
            { text: 'Step 3: Stir the mixture until it thickens.', bin: 0 },
            { text: 'The library is open from 8.30 am to 4 pm.', bin: 0 },
            { text: 'Vote for a longer lunch break: our health depends on it!', bin: 1 },
            { text: 'Every student deserves a school with clean water fountains.', bin: 1 },
            { text: 'Why pay more? Shop at Kiwi Mart today.', bin: 1 },
            { text: 'The door creaked open, and something moved in the dark.', bin: 2 },
            { text: 'Once upon a time, a taniwha guarded the harbour.', bin: 2 },
            { text: 'Hemi’s socks had a mind of their own, and today they wanted adventure.', bin: 2 }
          ], pick: 6,
          explain: 'Informative texts give facts; persuasive texts push a view; texts to entertain tell a story or amuse.' })] },
      { name: 'The best conclusion', learn: 'conclude',
        items: [
          ['A persuasive text arguing for a school garden', 'A garden would feed us, teach us and bring us together. Let’s start digging.', ['Gardens have plants in them.', 'Also, gardens can have ponds.', 'That is all I have to say about gardens.']],
          ['A report on kākāpō recovery', 'Thanks to predator-free islands and careful monitoring, kākāpō numbers have more than tripled.', ['Kākāpō are green.', 'Another fact is that kākāpō smell sweet.', 'The end.']],
          ['A story about a lost dog who finds its way home', 'As the gate clicked shut behind him, Rua curled up on his old blanket, home at last.', ['Rua was a dog.', 'Suddenly, a new problem appeared.', 'And then I woke up and it was all a dream.']],
          ['A persuasive speech for a skate park', 'Give us a place to skate, and you give us a place to belong. Support the skate park.', ['Skating is a sport.', 'Another reason is that skateboards have wheels.', 'Okay, that’s my speech, I guess.']],
          ['An explanation of how volcanoes erupt', 'In short, pressure from rising magma is what drives an eruption.', ['Volcanoes are mountains.', 'Did you know about earthquakes too?', 'Volcanoes are cool.']],
          ['A recount of a school trip', 'It was a long day, but we came home with full notebooks and plenty of stories.', ['We went on a bus.', 'Then we went to another place.', 'Bye.']]
        ].map(([kind, right, wrong]) => rng => C(rng, { prompt: `Which is the best concluding sentence for <strong>${kind.toLowerCase()}</strong>?`, right, wrong,
          explain: 'A good conclusion ties back to the main idea, without adding new points, and leaves a clear final impression.' })) },
      { name: 'Revise for clarity', learn: 'topic',
        items: [
          ['Our school needs a garden. It would help. Students could learn things. It would be good.', 'Our school needs a garden, because students could learn to grow their own food.', ['Our school needs a garden, it would help, students could learn things.', 'Our school needs a garden. It would be really, really good.', 'A garden. Our school. Needs one.']],
          ['The storm was bad and the trees fell and the power went out and we were scared.', 'The storm brought down trees and cut the power. We were scared.', ['The storm was bad and trees fell and the power went out and we were scared and cold.', 'The storm was bad. Trees fell. Power went out. Scared.', 'The storm was very bad and we were very scared.']],
          ['Kākāpō are birds. Kākāpō are parrots. Kākāpō cannot fly.', 'Kākāpō are parrots that cannot fly.', ['Kākāpō are birds, parrots, cannot fly.', 'Kākāpō, kākāpō, kākāpō: birds, parrots, flightless.', 'They are birds. They are parrots. They cannot fly.']],
          ['In my opinion I think that maybe we should possibly have longer lunches.', 'We should have longer lunches.', ['In my opinion I think we should have longer lunches maybe.', 'I think that in my opinion we should possibly have longer lunches.', 'Maybe possibly longer lunches.']],
          ['The thing is that the stuff in the river is bad for the things that live there.', 'Rubbish in the river harms the fish that live there.', ['The stuff in the river is bad for things.', 'The thing is that the river has stuff.', 'Things live in the river and stuff is bad.']],
          ['Firstly we went to the museum. Firstly we saw the moa. Firstly we had lunch.', 'First we went to the museum. Next we saw the moa. Finally we had lunch.', ['Firstly we went to the museum, firstly the moa, firstly lunch.', 'We went to the museum. We saw the moa. We had lunch.', 'Museum, moa, lunch.']]
        ].map(([draft, right, wrong]) => rng => C(rng, { prompt: `<em>${draft}</em> Which revision is clearest?`, right, wrong,
          explain: 'Good revision cuts vague and repeated words, joins related ideas, and uses precise language.' })) },
      { name: 'True or false', learn: 'conclude',
        items: [
          rng => TF(rng, { statement: 'A conclusion is a good place to add a brand-new argument.', answer: false, learn: 'conclude', explain: 'New points belong in the body; the conclusion ties things together.' }),
          rng => TF(rng, { statement: 'A topic sentence states the main idea of a paragraph.', answer: true, learn: 'topic', explain: 'The rest of the paragraph supports it.' }),
          rng => TF(rng, { statement: '“However” signals a contrast.', answer: true, learn: 'transitions', explain: 'It introduces an idea that pulls the other way.' }),
          rng => TF(rng, { statement: 'A narrative usually begins with an orientation.', answer: true, learn: 'entertain', explain: 'It introduces the characters, setting and situation.' }),
          rng => TF(rng, { statement: 'Persuasive writing should never mention the opposing view.', answer: false, learn: 'persuade', explain: 'In Year 8, acknowledging and answering it makes the argument stronger.' }),
          rng => TF(rng, { statement: 'Informative writing can use headings and diagrams to help the reader.', answer: true, learn: 'inform', explain: 'Visual features organise and explain information.' })
        ] },
      { name: 'Year 8: answering the other side', learn: 'persuade',
        items: [
          ['Some people say a skate park would be too noisy.', 'However, it would be built away from houses, next to the sports field.', ['Skate parks are cool.', 'Noise is a sound.', 'I really want a skate park.']],
          ['Some argue that longer lunches mean less learning time.', 'Yet students who rest properly concentrate better in the afternoon.', ['Lunch is my favourite time.', 'Learning is important.', 'Longer lunches would be longer.']],
          ['Critics say school uniforms are expensive.', 'However, second-hand uniforms can be bought cheaply through the school shop.', ['Uniforms are clothes.', 'Some uniforms are blue.', 'I like my uniform.']],
          ['Some people believe homework is necessary for success.', 'Yet many students already have sport, jobs and family responsibilities after school.', ['Homework is given by teachers.', 'I do my homework at night.', 'Some homework is maths.']],
          ['Opponents claim that a four-day week would reduce learning.', 'However, slightly longer days on the other four days would keep total learning time the same.', ['A week has seven days.', 'Fridays are fun.', 'Four is less than five.']],
          ['Some say plastic bags are convenient.', 'Yet reusable bags are just as easy to carry, and do not end up in the sea.', ['Bags carry things.', 'Plastic is shiny.', 'I have a bag.']]
        ].map(([claim, right, wrong]) => rng => C(rng, { tag: 'Year 8', prompt: `<em>${claim}</em> Which sentence best answers this opposing view?`, right, wrong,
          explain: 'A rebuttal accepts that the view exists, then gives a reason or evidence showing why the writer’s position is stronger.' })) },
      { name: 'Extension: organising structures', learn: 'organise',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits an explanation of why the moa became extinct?', right: 'Cause and effect', wrong: ['Compare and contrast', 'Instructions', 'Orientation and resolution'], explain: 'It explains what led to what.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a piece on cats versus dogs as pets?', right: 'Compare and contrast', wrong: ['Cause and effect', 'Chronological', 'Instructions'], explain: 'It sets two things side by side.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a history of your town?', right: 'Chronological', wrong: ['Compare and contrast', 'Problem and solution', 'Cause and effect'], explain: 'Events are told in time order.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a proposal to fix litter at school?', right: 'Problem and solution', wrong: ['Chronological', 'Compare and contrast', 'Orientation and resolution'], explain: 'It describes the problem, then proposes a fix.' }),
          rng => C(rng, { tag: EXT, prompt: 'A writer explores both sides of an issue without arguing for one. What kind of text is this?', right: 'A discussion (discursive text)', wrong: ['A persuasive text', 'A narrative', 'A set of instructions'], explain: 'Discursive texts explore several viewpoints.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which transition best signals a consequence in a formal essay?', right: 'Consequently', wrong: ['Anyway', 'Also', 'Like'], explain: '“Consequently” shows that one thing results from another, in a formal register.' })
        ] }
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
  // Year 9 challenge (Phase 4 Grammar, punctuation, and vocabulary): hyphens,
  // brackets, dashes, ellipses and the Oxford comma, and choosing punctuation
  // for effect.

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
              '<p><em>The prizes went to Ana, Year 7; Tom, Year 8; and Mei, Year 9.</em></p>' },
      { id: 'hyphen', title: 'Hyphens', years: '9',
        text: '<p>A hyphen (-) <strong>joins</strong> words into one idea.</p>' +
              '<ul><li>Describing words joined <strong>before</strong> a noun: <em>a well-known poet</em>, <em>a twelve-year-old cat</em>, <em>a last-minute change</em>.</li>' +
              '<li>After the noun, usually no hyphens: <em>the poet is well known</em>; <em>my cat is twelve years old</em>.</li>' +
              '<li>To avoid confusion: <em>re-cover</em> a sofa (cover again) is not <em>recover</em> from a cold.</li></ul>' },
      { id: 'brackets', title: 'Brackets (parentheses)', years: '9',
        text: '<p>Brackets hold extra information, like a <strong>quiet aside</strong> the reader could skip.</p>' +
              '<p><em>The tūī (a native honeyeater) sang in the kōwhai.</em></p>' +
              '<p>Test: take out the brackets and what is inside them, and the sentence must still work. A full stop goes outside the bracket when the bracket is part of a sentence: <em>We stayed in Rotorua (my favourite town).</em></p>' },
      { id: 'dash', title: 'Dashes', years: '9',
        text: '<p>A dash (–) is longer than a hyphen and <strong>separates</strong> rather than joins.</p>' +
              '<ul><li>A <strong>pair</strong> of dashes marks an aside, with more emphasis than brackets: <em>The final – a nail-biter from start to finish – ended in a draw.</em></li>' +
              '<li>A <strong>single</strong> dash makes a dramatic pause before what follows: <em>We opened the box and found – nothing.</em></li></ul>' },
      { id: 'ellipsis', title: 'Ellipsis', years: '9', wide: true,
        text: '<p>Three dots ( … ) have two jobs.</p>' +
              '<ul><li>They show words <strong>left out</strong> of a quotation, without changing its meaning: <em>“The kākāpō … is a large, nocturnal parrot.”</em></li>' +
              '<li>In dialogue, they show a voice <strong>trailing off</strong> or hesitating: <em>“I thought you said … never mind.”</em></li></ul>' },
      { id: 'oxford', title: 'The Oxford comma', years: '9', wide: true,
        text: '<p>The <strong>Oxford comma</strong> is a comma before the final “and” in a list. New Zealand writing usually leaves it out, but it is used when it prevents confusion.</p>' +
              '<p><em>I thanked my parents, Ana and Tom.</em> (Are Ana and Tom the parents?)</p><p><em>I thanked my parents, Ana, and Tom.</em> (Four people.)</p>' },
      { id: 'punct-effect', title: 'Choosing punctuation for effect', years: '9', wide: true,
        text: Sci.table(['Mark', 'Effect'], [['<strong>Commas</strong> around an aside', 'neutral: the aside is part of the flow'],
                ['<strong>Brackets</strong>', 'quiet: the aside is played down'], ['<strong>Dashes</strong>', 'loud: the aside or ending is emphasised'],
                ['<strong>Colon</strong>', '“here it is”: a list or an explanation follows'], ['<strong>Ellipsis</strong>', 'a pause, a trailing off, or words left out']]) }
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
        name: 'Extension: trickier joins', learn: 'adverbs', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Hyphens.
      {
        name: 'Year 9: hyphens', learn: 'hyphen', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which sentence uses hyphens correctly?',
            right: 'Our twelve-year-old cat still chases birds.', wrong: ['Our twelve year old cat still chases birds.', 'Our twelve-years-old cat still chases birds.', 'Our twelve-year old cat still chases birds.'],
            explain: '“Twelve-year-old” describes the cat as one idea before the noun, so all three words are joined, and “year” is singular.' }),
          rng => C(rng, { prompt: 'Which sentence uses hyphens correctly?',
            right: 'It was a last-minute change.', wrong: ['It was a last-minute-change.', 'The change came at the last-minute.', 'It was a last minute-change.'],
            explain: '“Last-minute” describes “change”, so it is hyphenated before the noun. After “at the”, “last minute” is a noun phrase and needs no hyphen.' }),
          rng => C(rng, { prompt: 'Which sentence is punctuated correctly?',
            right: 'My cat is twelve years old.', wrong: ['My cat is twelve-years-old.', 'My cat is twelve-year-old.', 'My cat is twelve years-old.'],
            explain: 'After the noun, the age needs no hyphens. Compare “my twelve-year-old cat”, where the words come before the noun.' }),
          rng => C(rng, { prompt: 'The old sofa was torn, so we had to ▢ it with new fabric. Which word fits?',
            right: 're-cover', wrong: ['recover'],
            explain: '“Re-cover” means to cover again. “Recover” means to get better or get something back; the hyphen keeps the meanings apart.' }),
          rng => C(rng, { prompt: 'The club was delighted when its star player agreed to ▢ for another season. Which word fits?',
            right: 're-sign', wrong: ['resign'],
            explain: '“Re-sign” means to sign again. “Resign” means to quit, which is the opposite of what the club wanted.' }),
          rng => C(rng, { prompt: 'A sign at an aquarium reads: <em>“See our man eating shark!”</em> Why does it need a hyphen?',
            right: 'Without “man-eating”, it can mean a man who is eating shark.', wrong: ['Hyphens are needed in every sign.', 'Without a hyphen, “shark” would need a capital letter.', 'It does not need a hyphen; the meaning is already clear.'],
            explain: 'The hyphen joins “man-eating” into one describing word for the shark.' })
        ]
      },

      // 12 · Dashes and brackets.
      {
        name: 'Year 9: dashes and brackets', learn: 'punct-effect', challenge: 'only',
        items: [
          rng => C(rng, { learn: 'brackets', prompt: 'The writer wants the extra information to feel like a <strong>quiet aside</strong> the reader could skip. Which version does that?',
            right: 'My cousin (the one who lives in Gisborne) is coming to stay.', wrong: ['My cousin – the one who lives in Gisborne – is coming to stay.', 'My cousin: the one who lives in Gisborne is coming to stay.', 'My cousin the one who lives in Gisborne is coming to stay.'],
            explain: 'Brackets play the aside down. Dashes would make it stand out; the colon and the missing punctuation are mistakes.' }),
          rng => C(rng, { learn: 'dash', prompt: 'The writer wants the extra information to <strong>stand out</strong>. Which version does that?',
            right: 'The final – a nail-biter from start to finish – ended in a draw.', wrong: ['The final (a nail-biter from start to finish) ended in a draw.', 'The final – a nail-biter from start to finish, ended in a draw.', 'The final a nail-biter from start to finish – ended in a draw.'],
            explain: 'A pair of dashes emphasises the aside. Brackets would play it down, and the last two open the aside but never close it with a matching mark.' }),
          rng => C(rng, { learn: 'dash', prompt: '<em>“We opened the box and found – nothing.”</em> What is the effect of the dash?',
            right: 'It makes a dramatic pause, so the surprise ending lands harder.', wrong: ['It joins two words into one idea.', 'It shows words have been left out of a quotation.', 'It introduces a list.'],
            explain: 'A single dash creates a pause before what follows. Joining words is a hyphen’s job, and missing words are shown with an ellipsis.' }),
          rng => C(rng, { learn: 'brackets', prompt: 'Which sentence uses brackets correctly?',
            right: 'The tūī (a native honeyeater) sang in the kōwhai.', wrong: ['The tūī (a native honeyeater sang) in the kōwhai.', 'The (tūī a native honeyeater) sang in the kōwhai.', 'The tūī (a native honeyeater) (sang) in the kōwhai.'],
            explain: 'Take out the brackets and what is inside them: “The tūī sang in the kōwhai.” Only the correct version still works.' }),
          rng => C(rng, { learn: 'brackets', prompt: 'Which sentence is punctuated correctly?',
            right: 'We stayed in Rotorua (my favourite town).', wrong: ['We stayed in Rotorua (my favourite town.)', 'We stayed in Rotorua. (my favourite town)', 'We stayed in Rotorua (my favourite town'],
            explain: 'The bracket is part of the sentence, so the full stop goes after the closing bracket. Brackets always come in pairs.' }),
          rng => C(rng, { learn: 'dash', prompt: 'What is the difference between a hyphen and a dash?',
            right: 'A hyphen joins words together; a dash separates parts of a sentence.', wrong: ['A hyphen separates parts of a sentence; a dash joins words together.', 'They are the same mark, used in the same ways.', 'A dash is only used in numbers.'],
            explain: '“Well-known” uses a hyphen to join. “We found – nothing” uses a dash to separate.' }),
          rng => C(rng, { prompt: 'Which version builds the most suspense before the reveal?',
            right: 'When I opened the door, I saw – my old teacher.', wrong: ['When I opened the door, I saw my old teacher.', 'When I opened the door, I saw (my old teacher).', 'When I opened the door; I saw my old teacher.'],
            explain: 'The dash creates a pause before the surprise. Brackets would play the reveal down, and the semicolon is incorrect because the first part is not a complete sentence.' }),
          rng => C(rng, { prompt: 'Which version makes the extra detail feel <strong>least</strong> important?',
            right: 'The bus (which was late, as usual) finally arrived.', wrong: ['The bus – which was late, as usual – finally arrived.', 'The bus, which was late, as usual, finally arrived.', 'The bus which was late as usual finally arrived.'],
            explain: 'Brackets play an aside down. Dashes emphasise it, and commas leave it as part of the flow.' })
        ]
      },

      // 13 · Ellipsis.
      {
        name: 'Year 9: ellipsis', learn: 'ellipsis', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Original: <em>“The kākāpō, which cannot fly, is a large, nocturnal parrot found only in New Zealand.”</em> Which shortened quotation is correct and keeps the meaning?',
            right: '“The kākāpō … is a large, nocturnal parrot found only in New Zealand.”',
            wrong: ['“The kākāpō is a large, nocturnal parrot found only in New Zealand.”', '“The kākāpō, which cannot fly, is a large … parrot … in New Zealand.”', '“The kākāpō … cannot … be found … in New Zealand.”'],
            explain: 'The ellipsis shows where words were cut. Leaving out words with no ellipsis hides the cut; the other two drop “only” or twist the meaning.' }),
          rng => C(rng, { prompt: 'Original: <em>“Our school, after months of planning and two failed attempts, finally won the regional debating trophy.”</em> Which shortened quotation is correct and keeps the meaning?',
            right: '“Our school … finally won the regional debating trophy.”',
            wrong: ['“Our school finally won the regional debating trophy.”', '“Our school … two failed attempts … the regional debating trophy.”', '“Our school … failed … the regional debating trophy.”'],
            explain: 'The ellipsis marks the cut, and the meaning stays the same. Cutting words without an ellipsis hides the change; the others make the school sound as if it failed.' }),
          rng => C(rng, { prompt: '<em>“I thought you said … never mind.”</em> What does the ellipsis show here?',
            right: 'The speaker trails off and changes their mind.', wrong: ['Words have been left out of a quotation.', 'The speaker is shouting.', 'A list is about to follow.'],
            explain: 'In dialogue, an ellipsis shows a voice trailing off or hesitating.' }),
          rng => C(rng, { prompt: 'Why must you be careful when shortening a quotation with an ellipsis?',
            right: 'The shortened quotation must not change what the writer meant.', wrong: ['An ellipsis can only be used once in any essay.', 'An ellipsis must always come at the end of a sentence.', 'You must always remove at least half the words.'],
            explain: 'Cutting “not” from “the plan will not work” would reverse the meaning. That misquotes the writer.' }),
          rng => C(rng, { prompt: 'Which is an ellipsis written correctly?',
            right: 'three dots: …', wrong: ['two dots: ..', 'four dashes: ––––', 'a colon and a full stop: :.'],
            explain: 'An ellipsis is always three dots.' })
        ]
      },

      // 14 · The Oxford comma.
      {
        name: 'Year 9: the Oxford comma', learn: 'oxford', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>“I’d like to thank my parents, Aunty Mere and the principal.”</em> Without an Oxford comma, how else could this be read?',
            right: 'As if Aunty Mere and the principal are the speaker’s parents', wrong: ['As if the speaker has no parents', 'As if Aunty Mere is the principal’s parent', 'It can only be read one way.'],
            explain: 'With no comma before “and”, “Aunty Mere and the principal” can look like a description of “my parents”. An Oxford comma, “Aunty Mere, and the principal”, makes it a list of three.' }),
          rng => C(rng, { prompt: 'The writer thanked four people: two parents, Ana and Tom. Which version makes that clear?',
            right: 'I thanked my parents, Ana, and Tom.', wrong: ['I thanked my parents, Ana and Tom.', 'I thanked my parents Ana, and Tom.', 'I thanked, my parents, Ana and Tom.'],
            explain: 'The Oxford comma before “and Tom” makes “my parents”, “Ana” and “Tom” three separate items.' }),
          rng => C(rng, { prompt: '<em>“My favourite sandwiches are cheese, ham, and peanut butter and jam.”</em> Why is the comma before the last “and” useful?',
            right: 'The last item already contains “and”, so the comma shows where it starts.', wrong: ['Every list must have a comma before “and”.', 'It shows that cheese and ham are one sandwich.', 'It turns the list into two sentences.'],
            explain: '“Peanut butter and jam” is one sandwich. The Oxford comma keeps it from blurring into “ham and peanut butter”.' }),
          rng => C(rng, { prompt: 'What is the usual rule for the Oxford comma in New Zealand writing?',
            right: 'It is usually left out, but used when it prevents confusion.', wrong: ['It must always be used.', 'It is never allowed.', 'It is used only in lists of numbers.'],
            explain: 'Clarity decides: add it when a list could be misread.' })
        ]
      },

      // 15 · Choosing punctuation for effect.
      {
        name: 'Year 9: punctuation for effect', learn: 'punct-effect', challenge: 'only',
        items: [Sci.gen(rng => Sci.match(rng, 'Match each punctuation mark to the effect it usually has.',
          rng.sample([
            ['Brackets', 'Plays an aside down, like a quiet comment'],
            ['A pair of dashes', 'Makes an aside stand out'],
            ['A colon', 'Says “here it is”: a list or an explanation follows'],
            ['A semicolon', 'Balances two closely related sentences'],
            ['An ellipsis in dialogue', 'Shows a voice trailing off']
          ], 4),
          'Brackets quieten, dashes emphasise, a colon introduces, a semicolon balances, and an ellipsis trails off.'))
        ]
      },

      // 16 · Spot the mistake.
      {
        name: 'Year 9: spot the mistake', learn: 'punct-effect', challenge: 'only',
        items: [
          [['Our trip to Wellington (the capital) began early.', 'We visited Te Papa, the Beehive, and the Botanic Garden.', 'The cable car was a well-known highlight.', 'By evening – exhausted but happy, we caught the ferry.'], 3, 'dash', 'The dash opens an aside but a comma closes it. Use a matching pair: “By evening – exhausted but happy – we caught the ferry.”'],
          [['The kākāpō is a flightless parrot.', 'Its call (a deep, booming sound) carries for kilometres.', 'A well known conservationist spent years protecting it.', 'Today, every bird has a name.'], 2, 'hyphen', '“Well-known” describes the conservationist and comes before the noun, so it needs a hyphen.'],
          [['The match was tense from the start.', 'Our captain – usually so calm – looked nervous.', 'With one second left, Hana shot and – scored.', 'Everyone cheered (even the other team.)'], 3, 'brackets', 'The bracket is part of the sentence, so the full stop belongs outside it: “(even the other team).”'],
          [['Our class read a short story set in Dunedin.', 'The narrator – a nervous new student – tells it herself.', 'Near the end, she whispers, “I thought you said .. never mind.”', 'Her teacher (Mr Hale) is the only one who notices.'], 2, 'ellipsis', 'An ellipsis is three dots, not two: “I thought you said … never mind.”'],
          [['My grandfather is eighty-two years old.', 'He was born in a small town (near Hokitika).', 'He still swims in the sea every morning.', 'His seventy-year-old-friends cannot keep up.'], 3, 'hyphen', '“Seventy-year-old” is hyphenated, but “friends” is the noun, so it must not be joined on.']
        ].map(([lines, wrong, card, why]) => rng => Sci.spot(rng, {
          prompt: 'One line in this paragraph has a punctuation mistake.',
          lines, wrong, learn: card, cue: 'Click the line with the mistake.', explain: why
        }))
      },

      // 17 · True or false.
      {
        name: 'Year 9: true or false', learn: 'punct-effect', challenge: 'only',
        items: [
          rng => TF(rng, { statement: 'A hyphen and a dash are the same mark.', answer: false, learn: 'dash', explain: 'A hyphen (-) joins words; a dash (–) is longer and separates parts of a sentence.' }),
          rng => TF(rng, { statement: 'If you remove brackets and the words inside them, the sentence should still make sense.', answer: true, learn: 'brackets', explain: 'That is the test for using brackets correctly.' }),
          rng => TF(rng, { statement: 'An ellipsis can show that words have been left out of a quotation.', answer: true, learn: 'ellipsis', explain: 'The meaning of the quotation must not change.' }),
          rng => TF(rng, { statement: 'Dashes make an aside less noticeable than brackets do.', answer: false, learn: 'punct-effect', explain: 'The reverse: dashes draw attention; brackets play the aside down.' }),
          rng => TF(rng, { statement: '“A well-known author” and “the author is well known” are both punctuated correctly.', answer: true, learn: 'hyphen', explain: 'The hyphen is used before the noun, and usually not after it.' }),
          rng => TF(rng, { statement: 'The Oxford comma is the comma before the final “and” in a list.', answer: true, learn: 'oxford', explain: '“Apples, bread, and milk.”' }),
          rng => TF(rng, { statement: 'A single dash can create a dramatic pause before the end of a sentence.', answer: true, learn: 'dash', explain: '“We opened the box and found – nothing.”' }),
          rng => TF(rng, { statement: 'An ellipsis is written with four dots.', answer: false, learn: 'ellipsis', explain: 'Three dots: …' })
        ]
      }
    ]
  });

})();
