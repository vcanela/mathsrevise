'use strict';
// ── Revision · English, Writing (Years 7–8) ─────────────────────────────────
// Phase 3 of English Years 0–10 (2025, in effect from 2026). Each exercise
// follows the knowledge and practices of one element or sub-element.
//
// The site practises what can be checked: word knowledge, grammar,
// punctuation, language features and close reading of short passages written
// for this site. Reading whole texts and speaking are left to the classroom.
// W16 and W17 end with a short piece of free writing, which the student
// checks against a list and a model. Questions tagged Extension reach
// towards Year 9.
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
              '<li>French: <strong>ch</strong>ef, ma<strong>ch</strong>ine</li><li>Old English: lau<strong>gh</strong>, ni<strong>gh</strong>t, <strong>kn</strong>ee</li></ul>' },
      { id: 'demons', title: 'Commonly misspelt words', years: '9', wide: true,
        text: '<p>Some words trip up even confident writers. Learn the tricky part of each one, and a hook to remember it by.</p>' +
              Sci.table(['Word', 'Tricky part', 'Hook'], [
                ['accommodate', 'double c, double m', 'it is big enough to accommodate two c’s and two m’s'],
                ['necessary', 'one c, double s', 'one collar, two sleeves'],
                ['separate', 'a, not e, after the p', 'there is <strong>a rat</strong> in sep<strong>arat</strong>e'],
                ['definitely', '-ite, not -ate', 'it comes from fin<strong>ite</strong>'],
                ['embarrass', 'double r, double s', 'you go <strong>r</strong>eally <strong>r</strong>ed and <strong>s</strong>mile <strong>s</strong>hyly'],
                ['rhythm', 'no vowel letter except y', '<strong>R</strong>hythm <strong>H</strong>elps <strong>Y</strong>our <strong>T</strong>wo <strong>H</strong>ips <strong>M</strong>ove'],
                ['conscience', 'con + science', 'your conscience knows the science of right and wrong']]) },
      { id: 'borrowed', title: 'Spellings borrowed from French and Greek', years: '9', wide: true,
        text: '<p>Words borrowed from other languages often keep that language’s spelling. If you know where a word came from, you can predict its letters.</p>' +
              Sci.table(['From', 'Pattern', 'Examples'], [
                ['French', '&lt;que&gt; says /k/ at the end', 'unique, antique, technique, boutique'],
                ['French', '&lt;eau&gt; says long o', 'plateau, bureau, chateau'],
                ['French', '&lt;ette&gt; at the end', 'silhouette, cassette, baguette'],
                ['Greek', '&lt;ph&gt; says /f/', 'photograph, dolphin, sphere, phase'],
                ['Greek', '&lt;rh&gt; says /r/', 'rhinoceros, rhombus, rhetoric'],
                ['Greek', '&lt;y&gt; says short i', 'symbol, myth, gym, system']]) +
              '<p>Tip: science and maths words often come from Greek, so an /f/ sound in them is usually spelt ph: <em>phenomenon, hypothesis, photosynthesis</em>.</p>' },
      { id: 'doubling', title: 'Doubling and stress', years: '9', wide: true,
        text: '<p>When a word ends in <strong>one vowel + one consonant</strong> and you add a suffix that starts with a vowel (-ing, -ed, -er, -ence, -able), double the consonant <strong>only if the last syllable is stressed</strong>.</p>' +
              Sci.table(['Where the stress is', 'Double?', 'Examples'], [
                ['on the last syllable: be<strong>GIN</strong>, oc<strong>CUR</strong>, pre<strong>FER</strong>', 'yes', 'beginning, occurred, preferred, forgetting, regrettable'],
                ['earlier in the word: <strong>TAR</strong>get, <strong>VIS</strong>it, <strong>BEN</strong>efit', 'no', 'targeted, visiting, limited, benefited']]) +
              '<p>Listen for the stress moving: pre<strong>FER</strong> → pre<strong>ferr</strong>ed, but <strong>PREF</strong>erence has one r. Re<strong>FER</strong> → referring, but <strong>REF</strong>erence.</p>' +
              '<p>In New Zealand English a final <strong>l</strong> usually doubles whatever the stress: travelled, cancelled, labelled.</p>' },
      { id: 'ance', title: '-ance or -ence? -able after -ation', years: '9',
        text: '<p>These endings sound the same, so look for clues in related words.</p>' +
              '<ul><li><strong>Match the adjective.</strong> -ant goes with -ance: important → importance, relevant → relevance. -ent goes with -ence: confident → confidence, independent → independence.</li>' +
              '<li><strong>Listen to the c or g.</strong> After a soft c or g (saying /s/ or /j/), it is usually -ence: innocence, intelligence. After a hard c or g (/k/ or /g/), it is usually -ance: significance, elegance.</li>' +
              '<li><strong>Look for -ation.</strong> If a related word ends in -ation, the adjective usually ends in -able: toleration → tolerable, application → applicable.</li></ul>' },
      { id: 'spellcheck', title: 'Using a spellchecker wisely', years: '9',
        text: '<p>A spellchecker compares each word with its word list. It is useful, but <strong>you</strong> make the final choice.</p>' +
              '<ul><li>It misses <strong>real-word errors</strong>: a correctly spelt word in the wrong place (<em>form</em> for <em>from</em>, <em>there</em> for <em>their</em>, <em>effect</em> for <em>affect</em>).</li>' +
              '<li>It may flag correct words it does not know: names, places and te reo Māori words such as <em>Whakatāne</em> or <em>kaitiakitanga</em>. Keep them, or add them to its dictionary.</li>' +
              '<li>Set it to <strong>English (New Zealand)</strong>, or it may “correct” colour to color and organise to organize.</li>' +
              '<li>For a badly misspelt word, its first suggestion may be a different word: <em>definately</em> → <em>defiantly</em>. Read the whole list.</li></ul>' }
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
        name: 'Extension: where spellings come from', learn: 'origins', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Commonly misspelt words.
      {
        name: 'Year 9: commonly misspelt', learn: 'demons', challenge: 'only',
        items: [Sci.gen(rng => {
          const x = rng.pick([
            ['accommodate', 'to provide a place to stay', ['accomodate', 'acommodate', 'acomodate'], 'Two c’s and two m’s.', 'demons'],
            ['necessary', 'needed; essential', ['neccessary', 'necessery', 'neccesary'], 'One collar (c), two sleeves (ss).', 'demons'],
            ['separate', 'apart; not joined', ['seperate', 'seperete', 'separete'], 'There is “a rat” in separate.', 'demons'],
            ['definitely', 'certainly; without doubt', ['definately', 'definitly', 'defenitely'], 'It comes from <em>finite</em>, so it ends -itely.', 'demons'],
            ['embarrass', 'to make someone feel awkward', ['embarass', 'embarras', 'embaras'], 'Double r and double s: really red, smile shyly.', 'demons'],
            ['conscience', 'your inner sense of right and wrong', ['concience', 'consience', 'conscence'], 'It is con + science.', 'demons'],
            ['occasion', 'a special event or time', ['ocassion', 'occassion', 'ocasion'], 'Double c, single s.', 'demons'],
            ['committee', 'a group chosen to make decisions', ['commitee', 'comittee', 'committe'], 'Double m, double t, double e.', 'demons'],
            ['privilege', 'a special right or advantage', ['priviledge', 'privelege', 'privilage'], 'No d, and the vowels go i, i, e: priv-i-lege.', 'demons'],
            ['millennium', 'a period of a thousand years', ['millenium', 'milennium', 'milenium'], 'Double l and double n: from Latin <em>mille</em> (thousand) and <em>annus</em> (year).', 'demons'],
            ['unique', 'the only one of its kind', ['uneek', 'unik', 'uniqe'], 'It is from French, so the /k/ at the end is spelt -que.', 'borrowed'],
            ['technique', 'a skilful way of doing something', ['tecnique', 'techneek', 'techneque'], 'From French: ch saying /k/ and -que at the end.', 'borrowed'],
            ['plateau', 'a high, flat area of land', ['plato', 'plateu', 'platteau'], 'From French: the long o at the end is spelt -eau.', 'borrowed'],
            ['silhouette', 'a dark shape seen against a light background', ['silouette', 'silhouet', 'sillhouette'], 'From French: a silent h, and -ette at the end.', 'borrowed']
          ]);
          return C(rng, {
            prompt: `Which is the correct spelling of the word meaning <em>${x[1]}</em>?`,
            right: x[0], wrong: x[2], wide: false, learn: x[4],
            explain: `<strong>${x[0]}</strong>. ${x[3]}`
          });
        })]
      },

      // 12 · Doubling the final consonant: type the word.
      {
        name: 'Year 9: double or not?', learn: 'doubling', challenge: 'only',
        items: [Sci.gen(rng => {
          const [base, suf, out, stress] = rng.pick([
            ['begin', 'ing', 'beginning', 'be<strong>GIN</strong>'], ['occur', 'ed', 'occurred', 'oc<strong>CUR</strong>'],
            ['forget', 'ing', 'forgetting', 'for<strong>GET</strong>'], ['commit', 'ed', 'committed', 'com<strong>MIT</strong>'],
            ['equip', 'ed', 'equipped', 'e<strong>QUIP</strong>'], ['deter', 'ent', 'deterrent', 'de<strong>TER</strong>'],
            ['occur', 'ence', 'occurrence', 'oc<strong>CUR</strong>'], ['target', 'ed', 'targeted', '<strong>TAR</strong>get'],
            ['visit', 'or', 'visitor', '<strong>VIS</strong>it'], ['limit', 'ing', 'limiting', '<strong>LIM</strong>it'],
            ['garden', 'er', 'gardener', '<strong>GAR</strong>den'], ['offer', 'ed', 'offered', '<strong>OF</strong>fer']
          ]);
          const dbl = out.length - base.length - suf.length === 1;
          return Sci.word(rng, {
            prompt: `Add <strong>-${suf}</strong> to <strong>${base}</strong>.`,
            tip: 'Say the word aloud and listen for the stressed syllable.',
            answer: out, placeholder: 'type the new word',
            explain: `<strong>${out}</strong>. The stress is ${stress}, ${dbl ? 'on the last syllable, so the final consonant doubles' : 'not on the last syllable, so the consonant stays single'}.`
          });
        })]
      },

      // 13 · Doubling: sort by the rule.
      {
        name: 'Year 9: doubling and stress', learn: 'doubling', challenge: 'only',
        items: [rng => Sci.sort(rng, {
          prompt: 'When you join each pair, does the final consonant double?',
          bins: ['Double it', 'Keep it single'],
          items: [
            ...['prefer + -ed', 'refer + -ing', 'regret + -able', 'admit + -ance', 'omit + -ed', 'upset + -ing'].map(text => ({ text, bin: 0 })),
            ...['prefer + -ence', 'refer + -ence', 'budget + -ing', 'profit + -able', 'develop + -ed', 'happen + -ing'].map(text => ({ text, bin: 1 }))
          ],
          pick: 6,
          explain: 'Double the consonant only when the stressed syllable is the last one: pre<strong>FERR</strong>ed, re<strong>GRETT</strong>able, ad<strong>MITT</strong>ance. ' +
                   'When the stress is earlier, keep it single: <strong>BUD</strong>geting, <strong>PROF</strong>itable, de<strong>VEL</strong>oped. Watch prefer and refer: the stress moves in <strong>PREF</strong>erence and <strong>REF</strong>erence, so they have one r.'
        })]
      },

      // 14 · -ance or -ence, and -able after -ation.
      {
        name: 'Year 9: -ance, -ence, -able', learn: 'ance', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'The adjective is <strong>independent</strong>. Which noun is spelt correctly?', right: 'independence', wrong: ['independance', 'independense', 'independanse'], wide: false,
            explain: 'Independ<strong>ent</strong> goes with independ<strong>ence</strong>. Matching the adjective tells you the vowel.' }),
          rng => C(rng, { prompt: 'The adjective is <strong>relevant</strong>. Which noun is spelt correctly?', right: 'relevance', wrong: ['relevence', 'relevanse', 'relevense'], wide: false,
            explain: 'Relev<strong>ant</strong> goes with relev<strong>ance</strong>.' }),
          rng => C(rng, { prompt: 'In this word, the c is soft (it says /s/). Which spelling is correct?', right: 'innocence', wrong: ['innocance', 'innocense', 'innocanse'], wide: false,
            explain: 'After a soft c, the ending is usually -ence: innocence, adolescence, magnificence.' }),
          rng => C(rng, { prompt: 'In this word, the c is hard (it says /k/). Which spelling is correct?', right: 'significance', wrong: ['significence', 'significanse', 'significense'], wide: false,
            explain: 'After a hard c, the ending is usually -ance. With -ence, the c would be read as a soft /s/.' }),
          rng => C(rng, { prompt: 'In this word, the g is soft (it says /j/). Which spelling is correct?', right: 'intelligence', wrong: ['intelligance', 'intelligense', 'intelliganse'], wide: false,
            explain: 'After a soft g, the ending is usually -ence: intelligence, emergence, negligence.' }),
          rng => C(rng, { prompt: 'In this word, the g is hard (as in <em>go</em>). Which spelling is correct?', right: 'elegance', wrong: ['elegence', 'eleganse', 'elegense'], wide: false,
            explain: 'After a hard g, the ending is usually -ance: elegance, arrogance, extravagance.' }),
          rng => C(rng, { prompt: 'A related word is <strong>toleration</strong>. Which spelling is correct?', right: 'tolerable', wrong: ['tolerible', 'tollerable', 'tolerabel'], wide: false,
            explain: 'A related word ending in -ation is a clue for -able: toleration → tolerable.' }),
          rng => C(rng, { prompt: 'A related word is <strong>application</strong>. Which spelling is correct?', right: 'applicable', wrong: ['applicible', 'aplicable', 'applicabel'], wide: false,
            explain: 'Application ends in -ation, so the adjective is applic<strong>able</strong>.' })
        ]
      },

      // 15 · Borrowed spellings.
      {
        name: 'Year 9: borrowed spellings', learn: 'borrowed', challenge: 'only',
        items: [Sci.gen(rng => Sci.match(rng, 'Match each borrowed spelling pattern to a word that shows it.',
          rng.sample([
            ['&lt;que&gt; saying /k/ (French)', rng.pick(['antique', 'boutique', 'unique'])],
            ['&lt;eau&gt; saying long o (French)', rng.pick(['plateau', 'bureau'])],
            ['&lt;ette&gt; at the end (French)', rng.pick(['cassette', 'silhouette', 'baguette'])],
            ['&lt;ph&gt; saying /f/ (Greek)', rng.pick(['dolphin', 'sphere', 'phase'])],
            ['&lt;rh&gt; saying /r/ (Greek)', rng.pick(['rhinoceros', 'rhombus', 'rhetoric'])],
            ['&lt;y&gt; saying short i (Greek)', rng.pick(['symbol', 'myth', 'gym'])]
          ], 4),
          'French gives English -que (antique), -eau (plateau) and -ette (cassette). Greek gives ph saying /f/ (dolphin), rh (rhinoceros) and y saying short i (symbol).'))]
      },

      // 16 · Spellcheckers: making informed choices.
      {
        name: 'Year 9: using a spellchecker', learn: 'spellcheck', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A spellchecker found no mistakes in <em>I walked home form school.</em> Why not?',
            right: '“Form” is a real word, so the spellchecker accepts it, even though “from” was meant.', wrong: ['The sentence has no mistakes.', 'Spellcheckers only check the first word of a sentence.', '“Form” is the New Zealand spelling of “from”.'],
            explain: 'Spellcheckers check that each word exists, not that it is the right word. Real-word errors need a human proofreader.' }),
          rng => C(rng, { prompt: 'Your spellchecker underlines <em>colour</em> and suggests <em>color</em>. What is the best choice?',
            right: 'Keep “colour”, and set the spellchecker’s language to English (New Zealand).', wrong: ['Accept “color”, because the spellchecker is always right.', 'Change it to “colur” so it is not underlined.', 'Delete the word and choose a different one.'],
            explain: '“Colour” is the New Zealand spelling. The spellchecker is set to American English, which uses “color”.' }),
          rng => C(rng, { prompt: 'In <em>We drove to Whakatāne for the weekend</em>, the spellchecker underlines <em>Whakatāne</em>. What should you do?',
            right: 'Keep it, because it is spelt correctly; you could add it to the spellchecker’s dictionary.', wrong: ['Accept the first suggestion the spellchecker offers.', 'Remove the macron so the word is not underlined.', 'Replace it with a town the spellchecker knows.'],
            explain: 'Spellcheckers often do not know place names or te reo Māori words. The underline means “not in my list”, not “wrong”.' }),
          rng => C(rng, { prompt: 'You typed <em>definately</em>. The spellchecker’s first suggestion is <em>defiantly</em>. What should you do?',
            right: 'Look further down the list and choose “definitely”, because “defiantly” means something different.', wrong: ['Accept “defiantly”, because it is the first suggestion.', 'Ignore the underline and keep “definately”.', 'Choose any word that removes the underline.'],
            explain: 'Defiantly means “in a rebellious way”. A spellchecker guesses from the letters; you choose from the meaning.' }),
          rng => C(rng, { prompt: 'Which mistake is a spellchecker <strong>least</strong> likely to catch?',
            right: 'Their going to the beach.', wrong: ['They’re going to the baech.', 'They’re goin to the beach.', 'They’re going to the beatch.'],
            explain: '“Their” is a real word, so it passes the spellchecker. It should be “They’re” (they are). The other mistakes are not real words, so they get underlined.' }),
          rng => C(rng, { prompt: 'Which statement about spellcheckers is accurate?',
            right: 'They check that each word is a real word, not that it is the right word.', wrong: ['They catch every spelling mistake.', 'They understand what you meant to say.', 'They always use New Zealand spelling.'],
            explain: 'That is why you still need to proofread for real-word errors such as there/their and form/from.' })
        ]
      },

      // 17 · Real-word errors.
      {
        name: 'Year 9: what the spellchecker missed', learn: 'spellcheck', challenge: 'only',
        items: [
          [['Our class visited the Auckland Museum.', 'We saw a waka taua carved from tōtara.', 'The guide explained it’s history.', 'Everyone asked thoughtful questions.'], 2, '“It’s” means “it is”. The history belonging to the waka is “its history”.'],
          [['The storm hit Gisborne overnight.', 'Strong winds brought down power lines.', 'Many homes were without power for too days.', 'Crews worked hard to restore it.'], 2, 'It should be “two days” (the number). “Too” means “also” or “more than enough”.'],
          [['Hana trained every morning before school.', 'She wanted to break the regional record.', 'On the day, the whether was perfect.', 'She won by a clear second.'], 2, 'It should be “weather” (rain, sun, wind). “Whether” introduces a choice: whether or not.'],
          [['The new rules will effect every student.', 'Phones must be switched off in class.', 'Bags go on the hooks outside.', 'The principal explained the changes at assembly.'], 0, 'It should be “affect”, the verb meaning “influence”. “Effect” is usually a noun: the rules will have an effect.'],
          [['I am writing to complain about the bus service.', 'The bus was late four times last weak.', 'On Friday it did not come at all.', 'I hope you can look into this.'], 1, 'It should be “week” (seven days). “Weak” means “not strong”.'],
          [['We set up camp beside the lake.', 'Dad lit the fire while we collected wood.', 'Later we sat under the stars and told stories.', 'In the morning, we packed up are tents.'], 3, 'It should be “our tents” (belonging to us). “Are” is a verb: we are.']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt: 'A spellchecker found no errors in this paragraph, but one line has a real word used wrongly.',
          lines, wrong, cue: 'Click the line with the wrong word.', explain: why
        }))
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
              '<p>Not every f-word changes: roof → roofs, chief → chiefs, belief → beliefs.</p>' },
      { id: 'wordclass', title: 'Suffixes that change word class', years: '9', wide: true,
        text: '<p>A suffix can turn a word into a different <strong>word class</strong>. The ending is often a clue to the job the word does.</p>' +
              Sci.table(['Makes a', 'Common suffixes', 'Examples'], [
                ['noun', '-ion, -ment, -ance, -ence, -ity, -ness, -ure', 'decision, assessment, maintenance, generosity, failure'],
                ['verb', '-ise, -ify, -en', 'modernise, simplify, strengthen'],
                ['adjective', '-ous, -ive, -able, -ful', 'mysterious, effective, believable, careful'],
                ['adverb', '-ly', 'carefully, rapidly']]) +
              '<p>New Zealand spelling usually uses -ise, not -ize: organise, realise, apologise.</p>' },
      { id: 'nominal', title: 'Nominalisation', years: '9',
        text: '<p><strong>Nominalisation</strong> turns a verb or an adjective into a noun: decide → <strong>decision</strong>, fail → <strong>failure</strong>, deny → <strong>denial</strong>, analyse → <strong>analysis</strong>, able → <strong>ability</strong>.</p>' +
              '<p>Formal and scientific writing uses it a lot. It sounds more objective, packs ideas together, and can leave out who did the action.</p>' +
              '<p><em>We analysed the water and decided to close the beach.</em><br>→ <em>Analysis of the water led to the decision to close the beach.</em></p>' },
      { id: 'assimilated', title: 'Assimilated prefixes and double letters', years: '9', wide: true,
        text: '<p>Many prefixes change their last letter to match the first letter of the root. This is called <strong>assimilation</strong>, and it is why so many words have a double letter near the start.</p>' +
              Sci.table(['Prefix', 'Changes to', 'Examples'], [
                ['in- (not)', 'il-, im-, ir-', 'illegible, immeasurable, irresistible'],
                ['ad- (to, towards)', 'ac-, af-, ap-, at-', 'accommodate, affix, appoint, attract'],
                ['sub- (under)', 'suf-, sup-', 'suffix, suppress, support'],
                ['ob- (against, towards)', 'oc-, op-', 'occur, oppose']]) +
              '<p>Other prefixes just join on, so a double letter appears only when the root starts with the prefix’s last letter: un + necessary = <strong>unnecessary</strong>, mis + spell = <strong>misspell</strong>, in + numerable = <strong>innumerable</strong>. But dis + appear = <strong>disappear</strong>, with one s.</p>' },
      { id: 'suffixrules', title: 'Suffix rules on harder words', years: '9', wide: true,
        text: '<ul><li><strong>Silent e:</strong> drop it before a suffix starting with a vowel (believe → believable, adventure → adventurous); keep it before a consonant (excite → excitement, sincere → sincerely).</li>' +
              '<li><strong>Soft c and g:</strong> keep the e before -able or -ous so the letter stays soft: noticeable, manageable, changeable, advantageous.</li>' +
              '<li><strong>y after a consonant</strong> usually changes to i: necessary → necessarily, beauty → beautiful. After a vowel, y stays: enjoy → enjoyment, employ → employer.</li>' +
              '<li><strong>Learn the exceptions:</strong> argue → argument, true → truly, nine → ninth, whole → wholly.</li></ul>' },
      { id: 'confusables', title: 'Confusable words', years: '9', wide: true,
        text: Sci.table(['Words', 'Meaning', 'Example'], [
                ['<strong>affect</strong> / <strong>effect</strong>', 'affect is usually a verb (to influence); effect is usually a noun (a result)', 'The rain affected the game. The rain had an effect on the game.'],
                ['<strong>discreet</strong> / <strong>discrete</strong>', 'careful not to draw attention / separate and distinct', 'a discreet reminder; three discrete stages'],
                ['<strong>elicit</strong> / <strong>illicit</strong>', 'to draw out a response / illegal or not allowed', 'to elicit an answer; illicit goods'],
                ['<strong>practice</strong> / <strong>practise</strong>', 'noun / verb (in NZ English)', 'Netball practice is on Tuesday. I practise my shooting.'],
                ['<strong>licence</strong> / <strong>license</strong>', 'noun / verb (in NZ English)', 'a driver’s licence; licensed to sell food'],
                ['<strong>advice</strong> / <strong>advise</strong>', 'noun / verb', 'some good advice; I advise you to wait.']]) +
              '<p>Tip for the c/s pairs: <strong>ice</strong> is a noun, so practi<strong>ce</strong>, licen<strong>ce</strong> and advi<strong>ce</strong> are the nouns.</p>' },
      { id: 'precise', title: 'Precise synonyms and antonyms', years: '9', wide: true,
        text: '<p>Many words have more than one meaning, so the right <strong>synonym</strong> (similar word) or <strong>antonym</strong> (opposite) depends on the sentence.</p>' +
              Sci.table(['In this phrase', 'Synonym', 'Antonym'], [['a <em>light</em> pack', 'lightweight', 'heavy'], ['a <em>light</em> green', 'pale', 'dark'],
                ['a <em>fair</em> decision', 'just', 'unfair'], ['a <em>sound</em> argument', 'valid', 'flawed']]) +
              '<p>Synonyms also differ in <strong>formality</strong>: get / obtain, find out / discover, enough / sufficient. Choose the one that suits your audience.</p>' }
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
            tip: yr8 ? 'Watch the consonant.' : 'Watch the vowel in the last syllable.',
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
        name: 'Extension: exceptions and reasons', learn: 'why', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Suffixes that change word class.
      {
        name: 'Year 9: word class from the suffix', learn: 'wordclass', challenge: 'only',
        items: [rng => Sci.sort(rng, {
          prompt: 'Use the suffix to decide the word class of each word.',
          bins: ['Noun', 'Verb', 'Adjective'],
          items: [
            ...['decision', 'denial', 'assessment', 'failure', 'generosity', 'maintenance'].map(text => ({ text, bin: 0 })),
            ...['simplify', 'strengthen', 'modernise', 'widen', 'clarify', 'apologise'].map(text => ({ text, bin: 1 })),
            ...['mysterious', 'effective', 'believable', 'careful', 'dangerous', 'poisonous'].map(text => ({ text, bin: 2 }))
          ],
          pick: 6,
          explain: 'Noun suffixes: -ion, -ment, -ure, -ity, -ance, and -al in denial (though -al can also make adjectives, as in natural). Verb suffixes: -ify, -en, -ise. Adjective suffixes: -ous, -ive, -able, -ful.'
        })]
      },

      // 12 · Nominalisation: form the noun.
      {
        name: 'Year 9: make the noun', learn: 'nominal', challenge: 'only',
        items: [Sci.gen(rng => {
          const [base, s, out, note] = rng.pick([
            ['decide', 'The council will announce its ▢ tomorrow.', 'decision', 'The d changes to s before -ion.'],
            ['deny', 'The minister issued a firm ▢ of the rumour.', 'denial', 'The y changes to i before -al.'],
            ['analyse', 'Careful ▢ of the data showed a clear pattern.', 'analysis', 'Analyse (verb) becomes analysis (noun).'],
            ['persuade', 'Good speeches rely on ▢.', 'persuasion', 'The d changes to s before -ion, as in decide → decision.'],
            ['arrive', 'The ▢ of the ferry was delayed by fog.', 'arrival', 'Drop the silent e before -al.'],
            ['fail', 'The power ▢ lasted three hours.', 'failure', 'Fail + -ure.'],
            ['maintain', 'The track is closed for ▢.', 'maintenance', 'The ai changes to e: maint<strong>e</strong>nance, not “maintainance”.'],
            ['permit', 'You need ▢ to leave early.', 'permission', 'The t changes to ss before -ion.'],
            ['describe', 'Write a short ▢ of the setting.', 'description', 'The b changes to p before -tion.'],
            ['compare', 'The report makes a ▢ between two beaches.', 'comparison', 'The e is dropped and -ison added.'],
            ['able', 'She showed great ▢ in the final.', 'ability', 'An adjective can be nominalised too: able → ability.'],
            ['accurate', 'Check the ▢ of your measurements.', 'accuracy', 'The -ate ending changes to -acy.'],
            ['refuse', 'His ▢ to apologise made things worse.', 'refusal', 'Drop the silent e before -al.']
          ]);
          return Sci.word(rng, {
            prompt: `Write the noun formed from <strong>${base}</strong>: <em>${s}</em>`,
            answer: out, placeholder: 'type the noun',
            explain: `<strong>${out}</strong>. ${note}`
          });
        })]
      },

      // 13 · Nominalisation in formal writing.
      {
        name: 'Year 9: nominalisation in writing', learn: 'nominal', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which sentence uses nominalisation to sound more formal?',
            right: 'The introduction of the new timetable caused confusion.', wrong: ['When they introduced the new timetable, everyone got confused.', 'They brought in a new timetable and we were confused.', 'Everyone got confused about the timetable they brought in.'],
            explain: '“Introduction” is a noun made from the verb “introduce”. It makes the action the subject of the sentence, which sounds formal and objective.' }),
          rng => C(rng, { prompt: '<em>We investigated the pollution and traced it to a drain.</em> Which version uses nominalisation?',
            right: 'Our investigation traced the pollution to a drain.', wrong: ['We investigated, and the pollution came from a drain.', 'The pollution came from a drain, we found.', 'We looked into where the pollution came from.'],
            explain: 'The verb “investigated” becomes the noun “investigation”, which now does the job of the subject.' }),
          rng => C(rng, { prompt: '<em>The decision was made to close the pool.</em> What does this sentence leave out?',
            right: 'Who made the decision', wrong: ['What was decided', 'What will happen to the pool', 'That a choice was made'],
            explain: 'Nominalisation (“the decision”) lets a writer leave out who acted. Readers should notice when that information is missing.' }),
          rng => C(rng, { prompt: 'In <em>The arrival of the kererū surprised everyone</em>, which word is a nominalisation?',
            right: 'arrival', wrong: ['kererū', 'surprised', 'everyone'],
            explain: '“Arrival” is a noun made from the verb “arrive”. “Kererū” is a noun but not made from a verb; “surprised” is the verb.' }),
          rng => C(rng, { prompt: 'Why do science reports often use nominalisation?',
            right: 'It keeps the focus on processes and results rather than on the people doing them.', wrong: ['It makes every sentence shorter and simpler for young readers.', 'It removes the need for any verbs.', 'It makes the writing sound more casual.'],
            explain: '“Evaporation of the water left salt crystals” focuses on the process, which suits a formal, objective report.' }),
          rng => C(rng, { prompt: 'Which noun is spelt correctly?', right: 'maintenance', wrong: ['maintainance', 'maintenence', 'maintainence'], wide: false,
            explain: 'Maintain → maint<strong>e</strong>nance. The ai of the verb changes to e in the noun.' })
        ]
      },

      // 14 · Assimilated prefixes and double letters.
      {
        name: 'Year 9: prefixes and double letters', learn: 'assimilated', challenge: 'only',
        items: [Sci.gen(rng => {
          const [right, wrong, why] = rng.pick([
            ['accommodate', ['acommodate', 'accomodate', 'acomodate'], 'ad- became ac- before c, giving cc; the root also has a double m.'],
            ['illegible', ['ilegible', 'illegable', 'ilegable'], 'in- (not) became il- before l: il + legible.'],
            ['irresistible', ['iresistible', 'irresistable', 'iresistable'], 'in- (not) became ir- before r: ir + resistible.'],
            ['immeasurable', ['imeasurable', 'immeasureable', 'imesurable'], 'in- (not) became im- before m: im + measurable.'],
            ['innumerable', ['inumerable', 'innumerible', 'inumerible'], 'in + numerable: the root starts with n, so there are two.'],
            ['suppress', ['supress', 'suppres', 'supres'], 'sub- (under) became sup- before p: sup + press.'],
            ['occur', ['ocur', 'occurr', 'ocurr'], 'ob- became oc- before c: oc + cur.'],
            ['unnecessary', ['unecessary', 'unneccessary', 'unnecesary'], 'un + necessary: the root starts with n, so there are two.'],
            ['misspell', ['mispell', 'missspell', 'mispel'], 'mis + spell: the root starts with s, so there are two.'],
            ['dissatisfied', ['disatisfied', 'dissattisfied', 'disattisfied'], 'dis + satisfied: the root starts with s, so there are two.'],
            ['disappear', ['dissappear', 'disapear', 'dissapear'], 'dis + appear: appear starts with a, so there is only one s (and appear has its own double p).']
          ]);
          return C(rng, {
            prompt: 'Which spelling is correct?', tip: 'Think about the prefix and the root it joins.',
            right, wrong, wide: false,
            explain: `<strong>${right}</strong>. ${why}`
          });
        })]
      },

      // 15 · Suffix rules on harder words.
      {
        name: 'Year 9: adding suffixes', learn: 'suffixrules', challenge: 'only',
        items: [Sci.gen(rng => {
          const [base, suf, out, why] = rng.pick([
            ['notice', 'able', 'noticeable', 'Keep the e so the c stays soft (/s/).'],
            ['manage', 'able', 'manageable', 'Keep the e so the g stays soft (/j/).'],
            ['change', 'able', 'changeable', 'Keep the e so the g stays soft (/j/).'],
            ['advantage', 'ous', 'advantageous', 'Keep the e so the g stays soft (/j/).'],
            ['believe', 'able', 'believable', 'Drop the silent e before a suffix starting with a vowel.'],
            ['adventure', 'ous', 'adventurous', 'Drop the silent e before a suffix starting with a vowel.'],
            ['sincere', 'ly', 'sincerely', 'Keep the e before a suffix starting with a consonant.'],
            ['excite', 'ment', 'excitement', 'Keep the e before a suffix starting with a consonant.'],
            ['argue', 'ment', 'argument', 'This is an exception: the e is dropped even though -ment starts with a consonant.'],
            ['true', 'ly', 'truly', 'This is an exception: the e is dropped even though -ly starts with a consonant.'],
            ['necessary', 'ly', 'necessarily', 'The y comes after a consonant, so it changes to i.'],
            ['beauty', 'ful', 'beautiful', 'The y comes after a consonant, so it changes to i.'],
            ['employ', 'er', 'employer', 'The y comes after a vowel, so it stays.'],
            ['enjoy', 'ment', 'enjoyment', 'The y comes after a vowel, so it stays.']
          ]);
          return Sci.word(rng, {
            prompt: `Add <strong>-${suf}</strong> to <strong>${base}</strong>.`,
            answer: out, placeholder: 'type the new word',
            explain: `<strong>${out}</strong>. ${why}`
          });
        })]
      },

      // 16 · Confusable words.
      {
        name: 'Year 9: confusable words', learn: 'confusables', challenge: 'only',
        items: [Sci.gen(rng => {
          const [s, right, other, why] = rng.pick([
            ['The cold snap could ▢ the kiwifruit harvest.', 'affect', 'effect', '<em>Affect</em> is the verb: to influence something.'],
            ['The new law had an immediate ▢ on road safety.', 'effect', 'affect', '<em>Effect</em> is the noun: a result. Notice “an” before it.'],
            ['How did the storm ▢ your whānau?', 'affect', 'effect', '<em>Affect</em> is the verb: how did it influence them?'],
            ['One ▢ of the drought was higher food prices.', 'effect', 'affect', '<em>Effect</em> is the noun: one result of the drought.'],
            ['Aroha was ▢ about the surprise party and told no one.', 'discreet', 'discrete', '<em>Discreet</em> means careful not to draw attention.'],
            ['The experiment was divided into three ▢ stages.', 'discrete', 'discreet', '<em>Discrete</em> means separate and distinct.'],
            ['The interviewer’s questions were designed to ▢ honest answers.', 'elicit', 'illicit', 'To <em>elicit</em> is to draw out a response.'],
            ['Customs officers seized ▢ goods at the port.', 'illicit', 'elicit', '<em>Illicit</em> means illegal or not allowed.'],
            ['Rugby ▢ starts at four o’clock.', 'practice', 'practise', 'Here it is a noun (a training session), so in NZ English it is <em>practice</em>.'],
            ['I need to ▢ my speech before Friday.', 'practise', 'practice', 'Here it is a verb (to do something), so in NZ English it is <em>practise</em>.'],
            ['Mum renewed her driver’s ▢.', 'licence', 'license', 'Here it is a noun, so in NZ English it is <em>licence</em>.'],
            ['The council will ▢ the café to sell food.', 'license', 'licence', 'Here it is a verb, so in NZ English it is <em>license</em>.'],
            ['My koro gave me some wise ▢.', 'advice', 'advise', '<em>Advice</em> is the noun.'],
            ['I would ▢ you to bring a raincoat.', 'advise', 'advice', '<em>Advise</em> is the verb.']
          ]);
          return C(rng, {
            prompt: `Which word fits? <em>${s}</em>`,
            right, wrong: [other], wide: false,
            explain: why
          });
        })]
      },

      // 17 · Precise synonyms and antonyms.
      {
        name: 'Year 9: the precise word', learn: 'precise', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which word is the best synonym for <strong>bright</strong> in <em>Aroha is a bright student who learns quickly</em>?',
            right: 'clever', wrong: ['shiny', 'vivid', 'sunny'], wide: false,
            explain: 'Here “bright” is about the mind. Shiny, vivid and sunny are synonyms for other meanings of bright: light and colour.' }),
          rng => C(rng, { prompt: 'Which word is the antonym of <strong>light</strong> in <em>She painted her bedroom a light green</em>?',
            right: 'dark', wrong: ['heavy', 'serious', 'loud'], wide: false,
            explain: 'For a colour, the opposite of light is dark. “Heavy” is the opposite of light only when we mean weight.' }),
          rng => C(rng, { prompt: 'Which word is the antonym of <strong>light</strong> in <em>After we ate the food, the tramping pack felt light</em>?',
            right: 'heavy', wrong: ['dark', 'dim', 'gloomy'], wide: false,
            explain: 'Here “light” is about weight, so the opposite is heavy. Dark, dim and gloomy are opposites of light as in brightness.' }),
          rng => C(rng, { prompt: 'Which word is the best synonym for <strong>fair</strong> in <em>The referee made a fair decision</em>?',
            right: 'just', wrong: ['pale', 'blond', 'sunny'], wide: false,
            explain: 'A fair decision treats everyone equally: it is just. Pale and blond fit fair skin or hair; sunny fits fair weather.' }),
          rng => C(rng, { prompt: 'Which word is the best synonym for <strong>sound</strong> in <em>Her argument was sound</em>?',
            right: 'valid', wrong: ['noisy', 'asleep', 'audible'], wide: false,
            explain: 'A sound argument is reasonable and well supported. Noisy and audible relate to sound as noise; asleep fits “sound asleep”.' }),
          rng => C(rng, { prompt: 'This is for a formal school notice. Which word fits best? <em>Students must ▢ permission before leaving the grounds.</em>',
            right: 'obtain', wrong: ['grab', 'score', 'snag'], wide: false,
            explain: '“Obtain” is a formal synonym for “get”. The others are casual and would sound out of place in a formal notice.' }),
          rng => C(rng, { prompt: 'This is from a formal report. Which word fits best? <em>There was not ▢ evidence to prove the claim.</em>',
            right: 'sufficient', wrong: ['heaps of', 'loads of', 'plenty'], wide: false,
            explain: '“Sufficient” is the formal word for “enough”. “Heaps of” and “loads of” are casual, and “not plenty evidence” is not grammatical.' })
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
              '<p>No commas when the clause tells us <strong>which one</strong>: <em>The student who won will get a prize.</em> Without it, we would not know which student.</p>' },
      { id: 'typesplus', title: 'Sentence types: tricky cases', years: '9', wide: true,
        text: '<p>To name a sentence type, find each <strong>subject with its own verb</strong>: each pair is a clause. Then decide which clauses are main (they could stand alone) and which are dependent.</p>' +
              '<ul><li>Two subjects or two verbs sharing one clause is still <strong>simple</strong>: <em>Mere and Ana ran to the bus and jumped on.</em></li>' +
              '<li>A long sentence full of phrases can still be <strong>simple</strong>: <em>On the first day of the holidays, after a long drive, we arrived at the bach.</em></li>' +
              '<li>A relative clause tucked in the middle still counts as a dependent clause: <em>The bus, which is always late, broke down, so we walked.</em> (compound-complex)</li>' +
              '<li>A semicolon can join two main clauses without a conjunction: <em>The tide was coming in; we moved our towels.</em> (compound)</li></ul>' },
      { id: 'defining', title: 'Defining and non-defining clauses', years: '9', wide: true,
        text: '<p>A <strong>defining</strong> (restrictive) relative clause tells us <strong>which one</strong>, so it has no commas. A <strong>non-defining</strong> clause adds extra information about something already identified, so it sits between commas.</p>' +
              Sci.table(['Sentence', 'What it suggests'], [
                ['My brother <strong>who lives in Wellington</strong> is a nurse.', 'I have more than one brother; I mean the one in Wellington.'],
                ['My brother, <strong>who lives in Wellington</strong>, is a nurse.', 'I have one brother; by the way, he lives in Wellington.']]) +
              '<p><strong>That</strong> is used for defining clauses, so it does not follow a comma. Non-defining clauses use <strong>which</strong> for things and <strong>who</strong> for people.</p>' +
              '<p>A clause about a name is usually non-defining, because the name already tells us which one: <em>Rotorua, which is famous for its geysers, is busy in summer.</em></p>' },
      { id: 'moving', title: 'Moving a dependent clause', years: '9',
        text: '<p>A dependent (subordinate) clause can often go before or after the main clause. When it comes first, a comma usually follows it.</p>' +
              '<p><em>Although the forecast was grim, we set off.</em><br><em>We set off although the forecast was grim.</em></p>' +
              '<p>English tends to save the most important information for the <strong>end</strong> of a sentence (end focus). Put the part you want to stress last. Opening with the dependent clause also sets the scene or builds suspense before the main event.</p>' },
      { id: 'variety', title: 'Varying sentences for effect', years: '9',
        text: '<ul><li>A <strong>short sentence</strong> after long ones creates impact: <em>We had checked the tent, packed the food and studied the map for weeks. Nothing prepared us for the storm.</em></li>' +
              '<li>A <strong>fragment</strong> is punctuated as a sentence but has no main clause. Fiction writers use fragments deliberately for drama, pace, or a character’s thoughts: <em>Silence. Then footsteps on the stairs.</em></li>' +
              '<li>In formal writing (essays, reports, letters), a fragment is usually treated as a mistake: <em>Because the results were unclear.</em> Join it to a main clause.</li></ul>' },
      { id: 'participial', title: 'Participial phrases', years: '9', wide: true,
        text: '<p>A <strong>participial phrase</strong> starts with a participle and describes a noun. It packs an extra action into the sentence without adding a clause.</p>' +
              Sci.table(['Kind', 'Example'], [
                ['present (-ing)', '<em><strong>Clutching her ticket</strong>, Hana ran for the ferry.</em>'],
                ['past (-ed, -en)', '<em>The bridge, <strong>damaged by the flood</strong>, was closed.</em>'],
                ['perfect (having + past participle)', '<em><strong>Having finished the test</strong>, Tama read quietly.</em>']]) +
              '<p>An opening participial phrase is followed by a comma, and it must describe the subject that comes straight after it.</p>' }
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
        name: 'Extension: commas and clauses', learn: 'commas', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Sort sentences into the four types.
      {
        name: 'Year 9: four sentence types', learn: 'typesplus', challenge: 'only',
        items: [rng => Sci.sort(rng, {
          prompt: 'What type is each sentence? Find each subject with its own verb first.',
          bins: ['Simple', 'Compound', 'Complex', 'Compound-complex'],
          items: [
            ...['Mere and Ana ran to the bus and jumped on.', 'On the first day of the holidays, after a long drive, we arrived at the bach.',
                'Clutching her ticket, Hana raced along the wharf.', 'The old dog and the new puppy slept by the fire all afternoon.'].map(text => ({ text, bin: 0 })),
            ...['The ferry was cancelled, so we stayed another night in Picton.', 'Tama wanted pizza, but his sisters wanted fish and chips.',
                'The tide was coming in; we moved our towels higher up the beach.'].map(text => ({ text, bin: 1 })),
            ...['The waka that won the race was crewed by students.', 'If the river rises any higher, the road will close.',
                'Hana, who had trained all winter, won easily.'].map(text => ({ text, bin: 2 })),
            ...['Although the forecast was grim, we set off, and the weather held.', 'The bridge that crosses the river was closed, so we took the long way.',
                'We stayed inside because it was raining, but the power soon went out.', 'Tama laughed when the dog stole the sausage, but Dad was not amused.'].map(text => ({ text, bin: 3 }))
          ],
          pick: 6,
          explain: 'Shared subjects or verbs (Mere and Ana ran … and jumped) and long phrases do not add clauses, so those sentences are simple. ' +
                   'Two main clauses make a compound sentence; a main clause with a dependent clause (if, who, that, because) makes a complex one; both together make a compound-complex sentence.'
        })]
      },

      // 12 · Which type is this?
      {
        name: 'Year 9: name the type', learn: 'typesplus', challenge: 'only',
        items: [
          ['After the long, hot, exhausting walk up the hill, the whole class collapsed under the trees.', 0, 'There is only one subject–verb pair (the whole class collapsed). Everything else is phrases.'],
          ['Mere finished her essay and handed it in early.', 0, 'One subject (Mere) with two verbs (finished, handed) is still one clause.'],
          ['Waiting for the results, Ana and her brother paced up and down.', 0, '“Waiting for the results” is a participial phrase, not a clause, and “Ana and her brother paced” is one clause.'],
          ['The bus was late; nobody was surprised.', 1, 'Two main clauses (the bus was late; nobody was surprised) joined by a semicolon.'],
          ['Whatever happens tomorrow, I will be proud of you.', 2, '“Whatever happens tomorrow” is a dependent clause; “I will be proud of you” is the main clause.'],
          ['The kids who live next door built a hut, and they let us use it.', 3, 'Two main clauses (the kids built a hut; they let us use it) plus a dependent clause (who live next door).'],
          ['The teacher, who had seen everything, said nothing, and the class went quiet.', 3, 'Two main clauses joined by “and”, plus the relative clause “who had seen everything”.']
        ].map(([s, t, why]) => () => {
          const types = ['Simple', 'Compound', 'Complex', 'Compound-complex'];
          return {
            prompt: `What type of sentence is this? <em>${s}</em>`,
            input: { kind: 'choice', options: types.map((o, k) => ({ html: o, right: k === t })), correct: t },
            explain: `${types[t]}. ${why}`
          };
        })
      },

      // 13 · Defining and non-defining clauses.
      {
        name: 'Year 9: commas change the meaning', learn: 'defining', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>My cousin who lives in Ōtautahi is coming to visit.</em> What does the lack of commas suggest?',
            right: 'The writer has more than one cousin, and means the one in Ōtautahi.', wrong: ['The writer has only one cousin.', 'The cousin used to live in Ōtautahi.', 'Nothing: the commas would make no difference.'],
            explain: 'With no commas, the clause is defining: it tells us which cousin. That only makes sense if there are others.' }),
          rng => C(rng, { prompt: '<em>The apples that were bruised went into the chutney.</em> What happened?',
            right: 'Only the bruised apples went into the chutney.', wrong: ['All the apples were bruised, and they all went into the chutney.', 'None of the apples went into the chutney.', 'The bruised apples were thrown away.'],
            explain: '“That were bruised” is a defining clause: it picks out which apples. The others were left out.' }),
          rng => C(rng, { prompt: '<em>The houses, which were built on the cliff, were evacuated.</em> Compare it with the same sentence without commas. Which statement is true?',
            right: 'With commas, all the houses were evacuated; without commas, only the ones on the cliff were.', wrong: ['Without commas, all the houses were evacuated.', 'The commas make no difference to the meaning.', 'With commas, only the houses on the cliff were evacuated.'],
            explain: 'With commas the clause is extra information about all the houses. Without commas it defines which houses: only those on the cliff.' }),
          rng => C(rng, { prompt: 'The writer has two sisters and wants to say which one is a doctor. Which sentence does that?',
            right: 'My sister who lives in Hamilton is a doctor.', wrong: ['My sister, who lives in Hamilton, is a doctor.', 'My sister, that lives in Hamilton, is a doctor.', 'My sister who lives in Hamilton, is a doctor.'],
            explain: 'A defining clause, with no commas, picks out which sister. With a pair of commas it would suggest she is the only sister; “that” never follows a comma; and a single comma between the subject and verb is a mistake.' }),
          rng => C(rng, { prompt: 'Which sentence is punctuated correctly?',
            right: 'Rotorua, which is famous for its geysers, is busy in summer.', wrong: ['Rotorua, that is famous for its geysers, is busy in summer.', 'Rotorua which is famous for its geysers is busy in summer.', 'Rotorua, which is famous for its geysers is busy in summer.'],
            explain: 'There is only one Rotorua, so the clause adds extra information and needs a pair of commas. Non-defining clauses use “which”, not “that”.' }),
          rng => C(rng, { prompt: 'Which sentence uses “that” correctly?',
            right: 'The track that leads to the waterfall is closed.', wrong: ['The Tongariro Crossing, that is very popular, was closed.', 'My mother, that is a teacher, drove us home.', 'The track, that leads to the waterfall, is closed.'],
            explain: '“That” introduces defining clauses, with no commas. Non-defining clauses use “which” for things and “who” for people.' })
        ]
      },

      // 14 · True or false.
      {
        name: 'Year 9: true or false', learn: 'typesplus', challenge: 'only',
        items: [
          rng => TF(rng, { statement: 'A non-defining relative clause is set off with commas.', answer: true, learn: 'defining', explain: 'It adds extra information, so commas mark it off: <em>Rotorua, which is famous for its geysers, is busy in summer.</em>' }),
          rng => TF(rng, { statement: '“That” is the usual word to start a relative clause after a comma.', answer: false, learn: 'defining', explain: '“That” starts defining clauses, which have no commas. After a comma, use “which” or “who”.' }),
          rng => TF(rng, { statement: 'A sentence with two verbs must be a compound sentence.', answer: false, learn: 'typesplus', explain: '<em>Mere finished her essay and handed it in.</em> One subject shares both verbs, so it is a simple sentence.' }),
          rng => TF(rng, { statement: 'A dependent clause can come before or after the main clause.', answer: true, learn: 'moving', explain: '<em>Although it rained, we played.</em> / <em>We played although it rained.</em>' }),
          rng => TF(rng, { statement: 'Sentence fragments are mistakes in every kind of writing.', answer: false, learn: 'variety', explain: 'Fiction writers use fragments deliberately for effect: <em>Silence. Then footsteps.</em> In formal writing they are usually treated as mistakes.' }),
          rng => TF(rng, { statement: 'An opening participial phrase should describe the subject that comes straight after it.', answer: true, learn: 'participial', explain: '<em>Clutching her ticket, Hana ran for the ferry.</em> Hana is the one clutching.' }),
          rng => TF(rng, { statement: 'A compound-complex sentence has at least two main clauses and at least one dependent clause.', answer: true, learn: 'typesplus', explain: '<em>Although it was raining, the game went ahead, and we won.</em>' }),
          rng => TF(rng, { statement: '<em>Having finished the test, Tama read quietly</em> is a complex sentence.', answer: false, learn: 'participial', explain: '“Having finished the test” is a participial phrase, not a clause: it has no subject of its own. The sentence is simple.' })
        ]
      },

      // 15 · Structure for effect.
      {
        name: 'Year 9: structure for effect', learn: 'variety', challenge: 'only',
        items: [
          rng => C(rng, { learn: 'moving', prompt: 'Which version builds suspense by holding back the main event until the end?',
            right: 'As the lights went down and the crowd fell silent, the curtain slowly rose.', wrong: ['The curtain slowly rose as the lights went down and the crowd fell silent.'],
            explain: 'Opening with the dependent clause sets the scene first, so the main event (the curtain rising) arrives last, where it has most weight.' }),
          rng => C(rng, { learn: 'moving', prompt: 'Which sentence is punctuated correctly?',
            right: 'When the siren sounded, everyone left the pool.', wrong: ['When the siren sounded everyone, left the pool.', 'When, the siren sounded everyone left the pool.', 'When the siren, sounded, everyone left the pool.'],
            explain: 'When the dependent clause comes first, the comma goes at the end of it, before the main clause.' }),
          rng => C(rng, { prompt: '<em>The door creaked open. Darkness. Then a voice.</em> Why does the writer use fragments here?',
            right: 'To build tension in short, sharp bursts, like the narrator’s racing thoughts.', wrong: ['Because the writer forgot the verbs.', 'To make the passage sound more formal.', 'Because every story must use fragments.'],
            explain: 'Fragments in fiction slow the reader down and focus attention on single details, which builds tension.' }),
          rng => C(rng, { prompt: '<em>For three days we tramped through bush, crossed swollen rivers and slept in damp huts, always hoping the weather would clear. It didn’t.</em> What is the effect of the last sentence?',
            right: 'Its shortness after a long sentence makes the disappointment hit hard.', wrong: ['It slows the pace and adds description.', 'It adds more detail about the huts.', 'It is a fragment, so it is a mistake.'],
            explain: 'A short sentence after a long one stands out. “It didn’t” is a complete sentence (subject and verb), not a fragment.' }),
          rng => C(rng, { prompt: 'Every sentence in a student’s paragraph is long and complex. What is the best advice?',
            right: 'Vary the lengths: add some short sentences for impact and pace.', wrong: ['Make the sentences even longer.', 'Turn every sentence into a fragment.', 'Remove all the dependent clauses.'],
            explain: 'Variety keeps readers engaged. Short sentences give emphasis; longer ones carry linked ideas.' })
        ]
      },

      // 16 · Fragments in formal writing.
      {
        name: 'Year 9: find the fragment', learn: 'variety', challenge: 'only',
        items: [
          [['Water samples were taken from three streams.', 'The samples were tested for nitrates.', 'Because the levels at one site were very high.', 'Further testing is recommended.'], 2,
            '“Because the levels at one site were very high” is a dependent clause with no main clause. Join it: <em>Further testing is recommended because the levels at one site were very high.</em>'],
          [['Our class surveyed 120 students about lunch.', 'Most wanted more healthy options.', 'Especially fresh fruit and salads.', 'We will share the results with the canteen.'], 2,
            '“Especially fresh fruit and salads” has no subject or verb. Join it: <em>Most wanted more healthy options, especially fresh fruit and salads.</em>'],
          [['The school garden was started in 2019.', 'Students who volunteer at lunchtime.', 'The garden now supplies the food technology room.', 'We hope to expand it next year.'], 1,
            '“Students who volunteer at lunchtime” is a noun with a relative clause, but no main verb. Add one: <em>Students who volunteer at lunchtime look after it.</em>'],
          [['Kākāpō are flightless, nocturnal parrots.', 'Found only in New Zealand.', 'Their numbers fell sharply after people arrived.', 'Today, every bird is carefully monitored.'], 1,
            '“Found only in New Zealand” is a participial phrase with no subject or main verb. Join it: <em>Kākāpō are flightless, nocturnal parrots found only in New Zealand.</em>'],
          [['The trip to Te Papa was a success.', 'Students learned about Te Tiriti o Waitangi.', 'Many asked thoughtful questions.', 'Although the bus left late.'], 3,
            '“Although the bus left late” is a dependent clause on its own. Join it: <em>Although the bus left late, the trip was a success.</em>']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt: 'This is from a formal report. One line is a sentence fragment that should be fixed.',
          lines, wrong, cue: 'Click the fragment.', explain: why
        }))
      },

      // 17 · Participial phrases.
      {
        name: 'Year 9: participial phrases', learn: 'participial', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which words form the participial phrase? <em>Hana, gripping the rail tightly, edged across the swing bridge.</em>',
            right: 'gripping the rail tightly', wrong: ['edged across the swing bridge', 'Hana, gripping', 'the rail tightly, edged'],
            explain: 'The phrase starts with the participle “gripping” and describes Hana. “Edged” is the main verb.' }),
          rng => C(rng, { prompt: '<em>Tama finished his homework. He went outside to play.</em> Which sentence joins these with a participial phrase?',
            right: 'Having finished his homework, Tama went outside to play.', wrong: ['Tama finished his homework, he went outside to play.', 'Having finished his homework, the ball was kicked around outside.', 'Tama finished his homework, and he went outside to play.'],
            explain: '“Having finished his homework” is a participial phrase describing Tama. Of the others, one joins two sentences with only a comma, one says the ball finished the homework, and one is correct but compound, with no participial phrase.' }),
          rng => C(rng, { prompt: 'Which sentence contains a <strong>past</strong> participial phrase?',
            right: 'The bridge, damaged by the flood, was closed for a month.', wrong: ['Running late, we missed the bus.', 'Having crossed the bridge, we stopped for lunch.', 'The bridge was closed because of the flood.'],
            explain: '“Damaged by the flood” starts with a past participle and describes the bridge. “Running late” is a present participial phrase, “Having crossed” is perfect, and the last has none.' }),
          rng => C(rng, { prompt: 'Which sentence is punctuated correctly?',
            right: 'Exhausted by the climb, the trampers rested at the hut.', wrong: ['Exhausted, by the climb the trampers rested at the hut.', 'Exhausted by the climb the trampers, rested at the hut.', 'Exhausted by, the climb the trampers rested at the hut.'],
            explain: 'The comma goes after the whole opening participial phrase, just before the subject it describes.' }),
          rng => C(rng, { prompt: '<em>The crowd poured onto the field, cheering and waving flags.</em> What does the participial phrase add?',
            right: 'Extra actions happening at the same time, without a new clause', wrong: ['The reason the crowd poured onto the field', 'The place where it happened', 'A second main clause'],
            explain: '“Cheering and waving flags” describes what the crowd was doing as it poured on. It has no subject of its own, so it is a phrase, not a clause.' }),
          rng => C(rng, { prompt: 'Which is a <strong>perfect</strong> participial phrase?',
            right: 'Having eaten lunch', wrong: ['Eating lunch', 'Eaten by the dog', 'After lunch'], wide: false,
            explain: 'The perfect form uses “having” + a past participle, and shows one action finished before the next. “Eating lunch” is present, “Eaten by the dog” is past, and “After lunch” is a prepositional phrase.' })
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
              '<p>✗ <em>Running for the bus, my bag fell open.</em> (the bag was not running)</p><p>✓ <em>Running for the bus, I felt my bag fall open.</em></p>' },
      { id: 'perfect', title: 'Choosing past tenses', years: '9', wide: true,
        text: Sci.table(['Tense', 'Form', 'Use it for', 'Example'], [
                ['simple past', 'walked, wrote', 'a finished action at a past time', 'We <strong>visited</strong> Rotorua last year.'],
                ['present perfect', 'has / have + past participle', 'a past action linked to now, with no finished time given', 'I <strong>have visited</strong> Rotorua twice.'],
                ['past perfect', 'had + past participle', 'an action <strong>before</strong> another past moment', 'The bus <strong>had left</strong> when we arrived.']]) +
              '<p>Do not use the present perfect with a finished time: ✗ <em>I have seen it yesterday.</em> ✓ <em>I saw it yesterday.</em></p>' +
              '<p>In a story told in the past, the past perfect signals a step further back (a flashback). Then the story returns to the simple past.</p>' },
      { id: 'agreement', title: 'Subject–verb agreement', years: '9',
        text: '<p>A verb must <strong>agree</strong> with its subject: <em>the dog bark<strong>s</strong></em>, <em>the dogs bark</em>.</p>' +
              '<p>A phrase between the subject and the verb does not change the subject. Find the main noun and ignore the rest:</p>' +
              '<p><em>The <strong>box</strong> of old photos <strong>is</strong> on the shelf.</em> (the box is)<br><em><strong>One</strong> of my cousins <strong>lives</strong> in Whanganui.</em> (one lives)</p>' },
      { id: 'agree-tricky', title: 'Tricky subjects', years: '9', wide: true,
        text: Sci.table(['Subject', 'Verb', 'Example'], [
                ['<em>each, every, everyone, nobody</em>', 'singular', '<em>Each of the players <strong>has</strong> a number.</em>'],
                ['two subjects joined by <em>and</em>', 'plural', '<em>Ana and Tom <strong>are</strong> here.</em>'],
                ['<em>neither … nor</em>, <em>either … or</em>', 'agrees with the <strong>nearer</strong> subject', '<em>Neither the coach nor the players <strong>were</strong> ready.</em>'],
                ['<em>many, several, both, a number of</em>', 'plural', '<em>Many of the shops <strong>are</strong> closed.</em>'],
                ['a <strong>collective noun</strong> (team, class, whānau) acting as one group', 'usually singular', '<em>The class <strong>is</strong> on the bus.</em>']]) },
      { id: 'modal', title: 'Modal verbs', years: '9', wide: true,
        text: '<p><strong>Modal verbs</strong> (can, could, may, might, should, will, would, must) sit before a main verb and show how <strong>certain</strong> or how <strong>necessary</strong> something is.</p>' +
              Sci.table(['', 'Weaker', 'Middle', 'Stronger'], [
                ['Certainty', 'It <strong>might</strong> rain.', 'It <strong>should</strong> rain.', 'It <strong>will</strong> rain.'],
                ['Obligation', 'You <strong>could</strong> bring a hat.', 'You <strong>should</strong> bring a hat.', 'You <strong>must</strong> bring a hat.']]) +
              '<p><em>May</em> can give permission: <em>You <strong>may</strong> leave.</em> <em>Must</em> can also show a confident conclusion from evidence: <em>Her car is here, so she <strong>must</strong> be home.</em></p>' +
              '<p>Careful writers match the modal to the evidence: one small test only shows the result <em>may</em> be true.</p>' },
      { id: 'word-class', title: 'Words that change class', years: '9',
        text: '<p>Many English words belong to more than one <strong>word class</strong>. The job the word does in the sentence decides its class.</p>' +
              '<ul><li><em>I went for a <strong>run</strong>.</em> noun (“a” comes before it)</li><li><em>I <strong>run</strong> every morning.</em> verb (the action)</li>' +
              '<li><em>a <strong>light</strong> bag</em> adjective; <em>turn on the <strong>light</strong></em> noun; <em><strong>light</strong> the candle</em> verb</li></ul>' },
      { id: 'abstract-verb', title: 'Abstract nouns from verbs', years: '9',
        text: '<p>Abstract nouns also come from <strong>verbs</strong>, often with the endings -tion, -sion, -ment, -ance, -ence or -al:</p>' +
              '<p>decide → deci<strong>sion</strong>, argue → argu<strong>ment</strong>, refuse → refus<strong>al</strong>, perform → perform<strong>ance</strong>, explain → explan<strong>ation</strong>.</p>' +
              '<p>Watch the spelling: the final e often drops (argue → argument), and some words change more (explain → explanation).</p>' }
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
            tip: adj === 'kind' ? 'For example: brave → bravery.' : 'For example: kind → kindness.',
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
        name: 'Extension: trickier verbs', learn: 'dangling', challenge: 'also',
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
      },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Past, present perfect or past perfect.
      {
        name: 'Year 9: choosing past tenses', learn: 'perfect', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which verb fits? <em>By the time the ambulance arrived, the lifeguard ▢ the swimmer to shore.</em>',
            right: 'had pulled', wrong: ['has pulled', 'pulls', 'will pull'], wide: false,
            explain: 'The pulling happened before the ambulance arrived, another past moment, so it takes the past perfect: had + past participle.' }),
          rng => C(rng, { prompt: 'Which verb fits? <em>I ▢ my phone yesterday, and I still can’t find it.</em>',
            right: 'lost', wrong: ['have lost', 'had been losing', 'will lose'], wide: false,
            explain: '“Yesterday” is a finished time, so it takes the simple past. The present perfect (have lost) does not go with a finished time.' }),
          rng => C(rng, { prompt: 'Which verb fits? <em>Mere ▢ to Australia three times, so she knows the airport well.</em>',
            right: 'has been', wrong: ['had been', 'was being', 'will be'], wide: false,
            explain: 'Her trips are linked to now (she knows the airport now) and no finished time is given, so the present perfect fits.' }),
          rng => C(rng, { prompt: 'Which verb fits? <em>Our whānau ▢ in Ōtautahi since 2019.</em>',
            right: 'has lived', wrong: ['lived', 'lives', 'had lived'], wide: false,
            explain: '“Since 2019” runs from the past up to now, so it takes the present perfect. “Had lived” would mean they no longer live there at some past moment.' }),
          rng => C(rng, { prompt: 'Which verb fits? <em>When Tama got home, he realised he ▢ his key at school.</em>',
            right: 'had left', wrong: ['has left', 'leaves', 'will leave'], wide: false,
            explain: 'Leaving the key came before getting home and realising, so the earlier action takes the past perfect.' }),
          rng => C(rng, { prompt: 'Which sentence is correct?',
            right: 'I saw that film last weekend.', wrong: ['I have seen that film last weekend.', 'I have saw that film last weekend.', 'I seen that film last weekend.'],
            explain: '“Last weekend” is a finished time, so use the simple past “saw”. “Have seen” cannot take a finished time, and “have saw” and “I seen” use the wrong verb form.' }),
          rng => C(rng, { prompt: 'Which verb fits? <em>Kiri stared at the empty paddock. Only a week earlier, it ▢ full of sheep.</em>',
            right: 'had been', wrong: ['has been', 'is', 'will be'], wide: false,
            explain: 'The story is in the past, and “a week earlier” steps further back, so the past perfect marks the flashback.' })
        ]
      },

      // 12 · Tense errors in a passage.
      {
        name: 'Year 9: tense errors in a passage', learn: 'perfect', challenge: 'only',
        items: [
          [['Last summer we drove to Tauranga.', 'Dad had booked the campsite months earlier.', 'On the first night, it has rained heavily.', 'Luckily, the tent stayed dry.'], 2,
            '“The first night” is a finished past time, so it needs the simple past: “it rained heavily”.'],
          [['Aroha opened the old letter.', 'Her grandmother has written it in 1975.', 'The ink had faded to a pale brown.', 'Aroha read it twice before she spoke.'], 1,
            'The writing happened before Aroha opened it, at a finished time (1975): “Her grandmother had written it in 1975.” The present perfect cannot take a finished time.'],
          [['The match started at two o’clock.', 'Within ten minutes, the other team scored twice.', 'By half-time, we have given up hope.', 'In the second half, though, we fought back.'], 2,
            'Giving up hope happened before another past moment (half-time), so it needs the past perfect: “we had given up hope”.'],
          [['I have lived in Nelson all my life.', 'I have seen the harbour in every season.', 'Last winter I have watched a storm smash the wharf.', 'Even so, I have never wanted to leave.'], 2,
            '“Last winter” is a finished time, so it needs the simple past: “Last winter I watched a storm smash the wharf.”'],
          [['The detective looked around the room.', 'The window was open, and the safe was empty.', 'Clearly, the thief escapes through the window.', 'She picked up the phone and called for backup.'], 2,
            'The escape happened before the detective arrived, so it needs the past perfect: “the thief had escaped through the window”.'],
          [['When we reached the hut, it was getting dark.', 'Someone had left a pile of dry wood by the fire.', 'We are very grateful.', 'Within minutes, the hut was warm.'], 2,
            'The story is in the past, so “We are” slips into the present. It should be “We were very grateful.”']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt: 'One sentence in this paragraph uses the wrong tense.', lines, wrong,
          cue: 'Click the sentence with the tense error.', explain: why
        }))
      },

      // 13 · Agreement across a phrase.
      {
        name: 'Year 9: subject–verb agreement', learn: 'agreement', challenge: 'only',
        items: [
          ['The box of old photos ▢ on the top shelf.', 'is', 'are', 'box', 'of old photos'],
          ['One of my cousins ▢ in Whanganui.', 'lives', 'live', 'One', 'of my cousins'],
          ['The list of winners ▢ on the noticeboard.', 'is', 'are', 'list', 'of winners'],
          ['The students in Room 12 ▢ going on camp.', 'are', 'is', 'students', 'in Room 12'],
          ['The quality of these photos ▢ excellent.', 'is', 'are', 'quality', 'of these photos'],
          ['The leaves on the old pōhutukawa ▢ turning brown.', 'are', 'is', 'leaves', 'on the old pōhutukawa'],
          ['The sound of the waves ▢ me fall asleep.', 'helps', 'help', 'sound', 'of the waves']
        ].map(([s, right, wrong, subj, phrase]) => rng => C(rng, {
          prompt: `Which verb agrees with the subject? <em>${s}</em>`, right, wrong: [wrong], wide: false,
          explain: `The subject is “${subj}”. The phrase “${phrase}” sits between the subject and the verb but does not change it, so the verb is “${right}”.`
        }))
      },

      // 14 · Tricky subjects.
      {
        name: 'Year 9: tricky subjects', learn: 'agree-tricky', challenge: 'only',
        items: [
          rng => Sci.sort(rng, {
            prompt: 'Which verb does each sentence need?', bins: ['is', 'are'],
            items: [
              ...['Each of the players ▢ ready.', 'Everyone in the hall ▢ waiting.', 'Neither the players nor the coach ▢ happy.', 'Either the twins or their mum ▢ coming.',
                  'Nobody in our class ▢ absent.', 'Every one of the eggs ▢ broken.'].map(text => ({ text, bin: 0 })),
              ...['Neither the coach nor the players ▢ happy.', 'Either Mum or the twins ▢ coming.', 'Ana and her brother ▢ in the kapa haka group.', 'Both of the buses ▢ late.',
                  'Many of the students ▢ tired.', 'The coach and the captain ▢ pleased.'].map(text => ({ text, bin: 1 }))
            ],
            pick: 6,
            explain: 'Each, every, everyone and nobody take a singular verb. Two subjects joined by “and”, and words like many and both, take a plural verb. With neither … nor and either … or, the verb agrees with the nearer subject.'
          }),
          rng => Sci.sort(rng, {
            prompt: 'Which verb does each sentence need?', bins: ['has', 'have'],
            items: [
              ...['Each of the girls ▢ a locker.', 'Everybody ▢ finished the test.', 'Neither the twins nor their cousin ▢ a ticket.', 'Every student ▢ a laptop.',
                  'Not one of the shops ▢ any milk left.'].map(text => ({ text, bin: 0 })),
              ...['Neither their cousin nor the twins ▢ tickets.', 'Tama and Hemi ▢ finished the test.', 'All of the girls ▢ lockers.', 'Several of the shops ▢ closed early.',
                  'A number of students ▢ asked for extra time.'].map(text => ({ text, bin: 1 }))
            ],
            pick: 6,
            explain: 'Each, every, everybody and “not one” take a singular verb. Two subjects joined by “and”, and words like all, several and “a number of”, take a plural verb. With neither … nor, the verb agrees with the nearer subject.'
          })
        ]
      },

      // 15 · Modal verbs.
      {
        name: 'Year 9: modal verbs', learn: 'modal', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'The forecast says rain is possible, but not likely. Which sentence matches?',
            right: 'It might rain tomorrow.', wrong: ['It will rain tomorrow.', 'It must rain tomorrow.', 'It is going to rain tomorrow.'],
            explain: '“Might” shows a weak possibility. “Will” and “is going to” sound certain, and “must” sounds like a requirement or a confident conclusion.' }),
          rng => C(rng, { prompt: 'The school rule is that everyone wears a hat at lunchtime in Terms 1 and 4. Which sentence states the rule?',
            right: 'Students must wear a hat at lunchtime.', wrong: ['Students might wear a hat at lunchtime.', 'Students could wear a hat at lunchtime if they like.', 'Students would wear a hat at lunchtime.'],
            explain: '“Must” shows a requirement. “Might” and “could” make it sound optional.' }),
          rng => C(rng, { prompt: 'Which sentence gives <strong>advice</strong>, not a rule?',
            right: 'You should drink water before the race.', wrong: ['You must show your ticket at the gate.', 'Runners must stay inside the cones.', 'All entries must be in by Friday.'],
            explain: '“Should” recommends; “must” requires.' }),
          rng => C(rng, { prompt: 'A student has results from one small test. Which conclusion is worded best?',
            right: 'This result suggests the fertiliser may help plants grow.', wrong: ['This result proves the fertiliser will always help plants grow.', 'This result means the fertiliser must help plants grow.', 'The fertiliser definitely helps plants grow.'],
            explain: 'One small test is limited evidence, so a careful writer uses a cautious modal: “may”. The others claim more certainty than the evidence gives.' }),
          rng => C(rng, { prompt: 'Which modal fits? <em>The lights are on and her car is in the driveway. She ▢ be home.</em> The writer is confident, based on the evidence.',
            right: 'must', wrong: ['might', 'could', 'may'], wide: false,
            explain: 'Here “must” shows a confident conclusion drawn from evidence. “Might”, “could” and “may” show only a possibility.' }),
          rng => C(rng, { prompt: 'Which sentence shows the strongest obligation?',
            right: 'Visitors must sign in at the office.', wrong: ['Visitors should sign in at the office.', 'Visitors may sign in at the office.', 'Visitors could sign in at the office.'],
            explain: '“Must” is a requirement. “Should” is advice, and “may” and “could” make it optional.' }),
          rng => C(rng, { prompt: 'What does “may” show in <em>You may leave when you have finished the test.</em>?',
            right: 'Permission', wrong: ['A requirement', 'Certainty', 'Past time'], wide: false,
            explain: 'The teacher is allowing the students to leave: “may” gives permission here.' })
        ]
      },

      // 16 · Words that change class.
      {
        name: 'Year 9: words that change class', learn: 'word-class', challenge: 'only',
        items: [
          ['Koro went for a long <u>walk</u> on the beach.', 'noun', '“A long” comes before it: it names the activity.'],
          ['We <u>walk</u> to school every day.', 'verb', 'It is the action that “we” do.'],
          ['Please <u>light</u> the candles on the cake.', 'verb', 'It is the action: what should you do to the candles?'],
          ['This backpack is surprisingly <u>light</u>.', 'adjective', 'It describes the backpack, after the linking verb “is”.'],
          ['She ran <u>fast</u> to catch the bus.', 'adverb', 'It tells how she ran, so it describes the verb.'],
          ['Many Muslim families <u>fast</u> during Ramadan.', 'verb', 'It is the action: to go without food.'],
          ['The children cheered as the <u>fast</u> cars raced past.', 'adjective', 'It describes the cars.']
        ].map(([s, right, why]) => rng => C(rng, {
          prompt: `What word class is the underlined word? <em>${s}</em>`, right,
          wrong: ['noun', 'verb', 'adjective', 'adverb'].filter(w => w !== right), wide: false,
          explain: `${why} The same word can belong to different classes; its job in the sentence decides.`
        }))
      },

      // 17 · Abstract nouns from verbs.
      {
        name: 'Year 9: abstract nouns from verbs', learn: 'abstract-verb', challenge: 'only',
        items: [Sci.gen(rng => {
          const [verb, noun] = rng.pick([
            ['decide', 'decision'], ['argue', 'argument'], ['refuse', 'refusal'], ['perform', 'performance'], ['explain', 'explanation'],
            ['arrive', 'arrival'], ['disappoint', 'disappointment'], ['describe', 'description'], ['protect', 'protection'], ['achieve', 'achievement'],
            ['persist', 'persistence'], ['admire', 'admiration'], ['confuse', 'confusion'], ['appear', 'appearance'], ['exist', 'existence'], ['deny', 'denial']
          ]);
          return Sci.word(rng, {
            prompt: `Write the abstract noun that comes from the verb <strong>${verb}</strong>.`,
            tip: 'Common endings: -tion, -sion, -ment, -ance, -ence, -al.',
            answer: noun, placeholder: 'type the noun',
            explain: `${verb} → <strong>${noun}</strong>. It names an idea, not a thing you can touch.`
          });
        })]
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
              '<p>Critical readers ask who did the action when a text does not say.</p>' },
      { id: 'passive-tenses', title: 'The passive in every tense', years: '9', wide: true,
        text: '<p>The passive is a form of <strong>be</strong> in the tense you need, plus the <strong>past participle</strong>.</p>' +
              Sci.table(['Tense', 'Active', 'Passive'], [
                ['present', 'Volunteers check the traps.', 'The traps <strong>are checked</strong>.'],
                ['present continuous', 'Builders are building the hall.', 'The hall <strong>is being built</strong>.'],
                ['past', 'The council closed the road.', 'The road <strong>was closed</strong>.'],
                ['present perfect', 'Someone has stolen my bike.', 'My bike <strong>has been stolen</strong>.'],
                ['past perfect', 'The judges had chosen the winner.', 'The winner <strong>had been chosen</strong>.'],
                ['future', 'They will open the bridge.', 'The bridge <strong>will be opened</strong>.']]) },
      { id: 'formal-passive', title: 'The passive in formal writing', years: '9',
        text: '<p>Science reports and formal writing often use the passive because the <strong>process</strong> matters more than the person. Anyone could repeat <em>The solution was stirred for two minutes</em>.</p>' +
              '<p>Impersonal openings report a view or finding without naming who holds it: <em>It <strong>was found</strong> that …</em>, <em>It <strong>is believed</strong> that …</em></p>' +
              '<p>Formal notices use it to sound polite and impersonal: <em>Parents <strong>are reminded</strong> that …</em></p>' },
      { id: 'cohesion', title: 'Voice and flow', years: '9',
        text: '<p>A paragraph flows when each sentence starts with something the reader already knows and ends with something new. Choosing the voice lets you keep the topic as the <strong>subject</strong>.</p>' +
              '<p><em>The kākāpō is a flightless parrot. <strong>It</strong> was almost wiped out by stoats and rats.</em></p>' +
              '<p>The passive keeps “it” (the kākāpō) at the front, so the paragraph stays about the bird.</p>' },
      { id: 'nominal', title: 'Nominalisation', years: '9',
        text: '<p><strong>Nominalisation</strong> turns a verb or adjective into a noun: <em>decide → decision</em>, <em>close → closure</em>, <em>grow → growth</em>, <em>short → shortage</em>.</p>' +
              '<p><em>The council decided to close the pool.</em> → <em>The <strong>decision</strong> to close the pool …</em></p>' +
              '<p>It makes writing sound formal and packs a lot into a few words. Like the passive, it can leave out <strong>who did the action</strong>.</p>' },
      { id: 'edit-voice', title: 'Editing for voice', years: '9',
        text: '<p>When you edit, ask of each sentence:</p>' +
              '<ul><li>Is the <strong>doer</strong> the point? Use active: <em>Hana scored three tries.</em></li>' +
              '<li>Is the <strong>process</strong> the point, as in a method? Use passive: <em>The water was heated.</em></li>' +
              '<li>Does the voice keep the paragraph’s <strong>topic</strong> as the subject?</li>' +
              '<li>Is someone avoiding <strong>responsibility</strong>? Name them: <em>We sent your parcel to the wrong address.</em></li></ul>' }
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
      { name: 'Extension: reading the passive critically', learn: 'hide', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'A company says: <em>Mistakes were made.</em> What might a critical reader ask?', right: 'Who made the mistakes?', wrong: ['How many words is it?', 'Is it a simple sentence?', 'Is it in the future tense?'], explain: 'The passive leaves out who is responsible.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence takes responsibility most clearly?', right: 'I broke the window.', wrong: ['The window was broken.', 'The window got broken.', 'Somehow, the window broke.'], explain: 'The active voice names the doer: I.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is passive and in the future?', right: 'The bridge will be opened next year.', wrong: ['The bridge was opened last year.', 'They will open the bridge next year.', 'The bridge is opening next year.'], explain: '“Will be opened”: future passive.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence is passive and happening now?', right: 'The new hall is being built.', wrong: ['They are building the new hall.', 'The new hall was built.', 'The new hall will build.'], explain: '“Is being built”: present continuous passive.' }),
          rng => C(rng, { tag: EXT, prompt: 'A headline reads <em>Protesters were arrested</em>. Another reads <em>Police arrested protesters</em>. What changes?', right: 'The first focuses on the protesters; the second on the police’s action.', wrong: ['They report different events.', 'The second is passive.', 'Nothing at all.'], explain: 'Voice shapes where the reader’s attention goes.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence uses “get” to make a passive?', right: 'Hemi got picked for the team.', wrong: ['Hemi picked the team.', 'Hemi got a new bike.', 'Hemi gets up early.'], explain: '“Got picked” works like “was picked”: an informal passive.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Passive, keeping the tense.
      {
        name: 'Year 9: passive in any tense', learn: 'passive-tenses', challenge: 'only',
        items: [
          ['Builders are building the new hall.', 'The new hall is being built.', ['The new hall was built.', 'The new hall has been built.', 'The new hall will be built.'],
            'The active is present continuous (are building), so the passive is “is being built”.'],
          ['The judges had chosen the winner before lunch.', 'The winner had been chosen before lunch.', ['The winner was being chosen before lunch.', 'The winner has been chosen before lunch.', 'The winner had chosen before lunch.'],
            'The active is past perfect (had chosen), so the passive is “had been chosen”. “The winner had chosen” is active: it says the winner did the choosing.'],
          ['Someone has eaten the last biscuit.', 'The last biscuit has been eaten.', ['The last biscuit was eaten.', 'The last biscuit had been eaten.', 'The last biscuit is being eaten.'],
            'The active is present perfect (has eaten), so the passive is “has been eaten”.'],
          ['The council will close the beach tomorrow.', 'The beach will be closed tomorrow.', ['The beach will close tomorrow.', 'The beach has been closed tomorrow.', 'The beach had been closed tomorrow.'],
            'The active is future (will close), so the passive is “will be closed”. “The beach will close” has no form of “be” plus a past participle, so it is not passive.'],
          ['Volunteers check the traps every week.', 'The traps are checked every week.', ['The traps were checked every week.', 'The traps are checking every week.', 'The traps have been checked every week.'],
            'The active is present (check), so the passive is “are checked”. “Are checking” would mean the traps do the checking.'],
          ['Rescuers were helping the trampers when the storm hit.', 'The trampers were being helped when the storm hit.', ['The trampers were helped when the storm hit.', 'The trampers had been helped when the storm hit.', 'The trampers are being helped when the storm hit.'],
            'The active is past continuous (were helping), so the passive is “were being helped”.']
        ].map(([a, right, wrong, why]) => rng => C(rng, {
          prompt: `<em>${a}</em> Which is the passive version, in the <strong>same tense</strong>, leaving out the doer?`, right, wrong,
          explain: why + ' The passive is a form of “be” in the same tense, plus the past participle.'
        }))
      },

      // 12 · Name the tense of a passive.
      {
        name: 'Year 9: name the passive tense', learn: 'passive-tenses', challenge: 'only',
        items: [Sci.gen(rng => {
          const bank = [
            ['present', ['The traps are checked every week.', 'Lunch is served at noon.', 'The gates are locked at night.']],
            ['present continuous', ['The hall is being built.', 'The roads are being repaired.', 'The tickets are being printed.']],
            ['past', ['The road was closed on Monday.', 'The trees were planted in 1990.', 'The letter was posted yesterday.']],
            ['present perfect', ['My bike has been stolen.', 'The results have been announced.', 'The pool has been cleaned.']],
            ['past perfect', ['The winner had been chosen.', 'The food had been eaten before we arrived.', 'The bridge had been washed away.']],
            ['future', ['The bridge will be opened next year.', 'The prizes will be given out on Friday.', 'The track will be resurfaced.']]
          ];
          const rows = rng.sample(bank, 4).map(([tense, list]) => [rng.pick(list), tense]);
          return Sci.match(rng, 'Match each passive sentence to its tense.', rows,
            'Look at the form of “be”: is/are (present), is/are being (present continuous), was/were (past), has/have been (present perfect), had been (past perfect), will be (future).');
        })]
      },

      // 13 · The passive in formal and scientific writing.
      {
        name: 'Year 9: formal and scientific writing', learn: 'formal-passive', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which sentence best suits the method section of a science report?',
            right: 'The solution was stirred for two minutes.', wrong: ['I stirred the solution for two minutes because Ms Patel told me to.', 'We stirred it for a bit.', 'Me and Ana stirred it for ages.'],
            explain: 'The passive keeps the focus on what was done, and the time is precise. The others focus on the people and are vague or informal.' }),
          rng => C(rng, { prompt: 'Why do science reports often use the passive?',
            right: 'It keeps the focus on what was done, so the method can be repeated by anyone.', wrong: ['It makes the report longer, which earns more marks.', 'Scientists are not allowed to know who did the experiment.', 'Passive sentences are always shorter than active ones.'],
            explain: 'In a method the process matters, not the person. Passive sentences are often longer, not shorter.' }),
          rng => C(rng, { prompt: 'Which is the most formal, impersonal way to report a finding?',
            right: 'It was found that the seedlings grew faster in sunlight.', wrong: ['We found out the seedlings grew heaps faster in the sun.', 'I reckon the seedlings liked the sun.', 'Guess what? The seedlings grew faster in sunlight!'],
            explain: '“It was found that …” reports the result without personal words, slang or exclamations.' }),
          rng => C(rng, { prompt: '<em>It is believed that the first waka arrived around 1300.</em> What does “It is believed that” do?',
            right: 'It reports a view without naming who holds it.', wrong: ['It names the historian who holds the view.', 'It shows the writer is completely certain.', 'It puts the sentence in the future tense.'],
            explain: 'This impersonal passive is common in formal writing. It leaves out who believes it, and it signals a view rather than a certainty.' }),
          rng => C(rng, { prompt: 'A school notice says: <em>Parents are reminded that the gate is locked at 9 am.</em> Why the passive?',
            right: 'It sounds formal and polite, and the focus is on the reminder, not on who is giving it.', wrong: ['It hides a mistake the school made.', 'It shows exactly who is reminding parents.', 'It is in the past tense.'],
            explain: 'Formal notices often use the passive to sound impersonal. It is present tense, and nobody is being blamed.' })
        ]
      },

      // 14 · Voice and flow.
      {
        name: 'Year 9: voice and flow', learn: 'cohesion', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>The kākāpō is a large, flightless parrot. ▢</em> Which next sentence keeps the kākāpō as the subject, so the paragraph flows?',
            right: 'It was almost wiped out by stoats and rats.', wrong: ['Stoats and rats almost wiped it out.', 'Stoats and rats are introduced predators.', 'Rangers on Whenua Hou count the eggs.'],
            explain: 'The passive puts “it” (the kākāpō) first, so the paragraph stays about the bird. The others start with stoats, rats or rangers.' }),
          rng => C(rng, { prompt: '<em>Pounamu is a precious stone to Māori. ▢</em> Which next sentence keeps pounamu as the subject?',
            right: 'It is found mainly on the West Coast of Te Waipounamu.', wrong: ['People find it mainly on the West Coast of Te Waipounamu.', 'The West Coast of Te Waipounamu is where people find most of it.', 'Many tourists visit the West Coast every year.'],
            explain: 'The passive “It is found” keeps the stone at the front. The others make people, the coast or tourists the subject.' }),
          rng => C(rng, { prompt: '<em>Our school hall opened in 1965. ▢</em> Which next sentence keeps the hall as the subject?',
            right: 'It was damaged in the 2011 earthquake and rebuilt two years later.', wrong: ['The 2011 earthquake damaged it, and builders rebuilt it two years later.', 'Builders rebuilt it two years after the 2011 earthquake damaged it.', 'Earthquakes are common in Canterbury.'],
            explain: 'The passive lets the hall stay as the subject, so the paragraph keeps its focus.' }),
          rng => C(rng, { prompt: 'Why might a writer switch one sentence into the passive in the middle of a paragraph?',
            right: 'To keep the paragraph’s topic as the subject, so the ideas link smoothly', wrong: ['To make every sentence the same length', 'Because the passive is always more correct', 'To show who did each action'],
            explain: 'Choosing the voice controls what comes first in the sentence. Keeping the same subject helps the paragraph hang together.' }),
          rng => C(rng, { prompt: 'Which order of information usually helps a paragraph flow?',
            right: 'Start each sentence with what the reader already knows, and end with what is new.', wrong: ['Start each sentence with something new, and end with what the reader already knows.', 'Put a different subject at the start of every sentence.', 'Use the passive in every sentence.'],
            explain: 'Known information links back to the previous sentence; new information carries the paragraph forward.' })
        ]
      },

      // 15 · Nominalisation.
      {
        name: 'Year 9: nominalisation', learn: 'nominal', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'What is nominalisation?',
            right: 'Turning a verb or adjective into a noun, such as “decide” into “decision”', wrong: ['Turning an active sentence into a passive one', 'Giving a name to a character', 'Using a person’s name instead of a pronoun'],
            explain: '“Nominal” means to do with nouns. Nominalisation makes an action or quality into a noun.' }),
          rng => C(rng, { prompt: '<em>The council decided to close the pool.</em> Which version uses nominalisation?',
            right: 'The decision to close the pool was announced on Monday.', wrong: ['The pool was closed by the council.', 'The council has decided to close the pool.', 'The council will decide whether to close the pool.'],
            explain: 'The verb “decided” becomes the noun “decision”. The first wrong option is passive, not nominalised; the others only change the tense.' }),
          rng => C(rng, { prompt: '<em>The rapid growth of the town led to a shortage of houses.</em> Which words are nominalisations?',
            right: '“growth” and “shortage”', wrong: ['“rapid” and “town”', '“led” and “houses”', '“town” and “houses”'],
            explain: '“Growth” comes from the verb “grow”, and “shortage” from the adjective “short”. Town and houses are ordinary concrete nouns.' }),
          rng => C(rng, { prompt: '<em>Following the closure of the factory, unemployment rose.</em> What does “closure” leave out?',
            right: 'Who closed the factory', wrong: ['When unemployment rose', 'What rose', 'Which factory it was'],
            explain: 'Turning “close” into “closure” removes the doer, just as a passive can. A critical reader asks: who closed it?' }),
          rng => C(rng, { prompt: 'Why does formal writing often use nominalisation?',
            right: 'It packs actions into nouns, which sounds impersonal and can leave out who did them.', wrong: ['It makes writing more personal and chatty.', 'It makes sentences easier for young children to read.', 'It shows exactly who did each action.'],
            explain: 'Nominalisation makes writing dense and formal. That suits reports, but it can be harder to read.' }),
          rng => C(rng, { prompt: '<em>We tested the water and found it was very polluted.</em> Which rewrite is the most formal?',
            right: 'Testing revealed high levels of pollution in the water.', wrong: ['We tested the water and, wow, it was polluted!', 'The water got tested and it was super polluted.', 'We were shocked when we tested the water.'],
            explain: '“Testing” and “pollution” turn the actions into nouns, giving a formal, impersonal sentence. The others are personal or informal.' })
        ]
      },

      // 16 · Editing for voice.
      {
        name: 'Year 9: editing for voice', learn: 'edit-voice', challenge: 'only',
        items: [
          ['This is from a science method. One sentence does not match the formal, passive style.',
            ['The beaker was filled with 100 mL of water.', 'The water was heated to 60 °C.', 'Then I dropped in the salt and stirred it.', 'The temperature was recorded every minute.'], 2,
            'It switches to “I” and the active voice. In the style of the rest: “The salt was added and the solution was stirred.”'],
          ['This is from a science method. One sentence does not match the formal, passive style.',
            ['Three seedlings were placed on the windowsill.', 'Each seedling was given 20 mL of water a day.', 'The height of each seedling was measured daily.', 'Me and Ana wrote the results in our books.'], 3,
            'It is informal and personal. In the style of the rest: “The results were recorded in a table.”'],
          ['This sports report celebrates Hana. One sentence uses a passive that pushes her into the background.',
            ['Hana Walker had the game of her life on Saturday.', 'She sprinted the length of the field in the first half.', 'Three tries were scored by her in twenty minutes.', 'She left the field to a standing ovation.'], 2,
            'The report is about Hana, so the active is stronger: “She scored three tries in twenty minutes.”'],
          ['This paragraph is about the tuatara. One sentence breaks the flow by switching the subject away from it.',
            ['The tuatara is a reptile found only in Aotearoa.', 'It has lived here for millions of years.', 'Rats and stoats once hunted it almost to extinction.', 'Today it is protected on predator-free islands.'], 2,
            'Every other sentence has the tuatara as its subject. The passive keeps the flow: “It was once hunted almost to extinction by rats and stoats.”'],
          ['This is an apology from a delivery company. One sentence avoids taking responsibility.',
            ['We are sorry that your order arrived late.', 'Your parcel was sent to the wrong address.', 'We will refund your delivery fee.', 'We have changed our process so it will not happen again.'], 1,
            'The passive hides who made the mistake. An honest apology names the doer: “We sent your parcel to the wrong address.”']
        ].map(([prompt, lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt, lines, wrong, cue: 'Click the sentence that needs editing.', explain: why
        }))
      },

      // 17 · True or false.
      {
        name: 'Year 9: true or false', learn: 'passive-tenses', challenge: 'only',
        items: [
          rng => TF(rng, { statement: '“The hall is being built” is in the passive voice.', answer: true, learn: 'passive-tenses', explain: '“Is being” plus the past participle “built”: present continuous passive.' }),
          rng => TF(rng, { statement: '“The winner had been chosen” is in the past perfect passive.', answer: true, learn: 'passive-tenses', explain: '“Had been” plus the past participle “chosen”.' }),
          rng => TF(rng, { statement: '“The bridge will close tomorrow” is a passive sentence.', answer: false, learn: 'passive-tenses', explain: 'There is no form of “be” plus a past participle. The passive would be “The bridge will be closed tomorrow.”' }),
          rng => TF(rng, { statement: 'Nominalisation turns a verb or adjective into a noun.', answer: true, learn: 'nominal', explain: 'decide → decision, grow → growth.' }),
          rng => TF(rng, { statement: 'Choosing the passive can help keep the same subject across a paragraph.', answer: true, learn: 'cohesion', explain: '“The kākāpō is a parrot. It was almost wiped out by stoats.”' }),
          rng => TF(rng, { statement: '“It was found that …” is a common impersonal way to report a result.', answer: true, learn: 'formal-passive', explain: 'It reports the finding without naming who found it.' }),
          rng => TF(rng, { statement: 'Every sentence in a science report must be in the passive voice.', answer: false, learn: 'formal-passive', explain: 'Methods often use the passive, but sentences such as “The results show a clear pattern” are active and perfectly formal.' })
        ]
      }
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
              '<p><strong>Emotive language</strong> chooses words for their emotional effect, often to persuade.</p>' },
      { id: 'synonym-9', title: 'Synonyms, antonyms and repetition', years: '9', wide: true,
        text: '<p>Synonyms differ in more than strength: each suggests a slightly different picture. <em>Look</em> can be <strong>glance</strong> (quick), <strong>stare</strong> (long and fixed), <strong>gaze</strong> (long and dreamy) or <strong>peer</strong> (straining to see).</p>' +
              '<p>To avoid repeating a word, choose a <strong>precise synonym</strong> that fits, not just any one. An <strong>antonym</strong> (opposite) can sharpen a contrast:</p>' +
              '<p>✗ <em>The rain was loud and the wind was loud.</em><br>✓ <em>The rain drummed and the wind howled.</em><br>✓ <em>The first half was dull; the second was thrilling.</em></p>' },
      { id: 'loaded', title: 'Connotation and loaded language', years: '9', wide: true,
        text: '<p>Writers can describe the same fact with words that carry opposite feelings: a small room is <em>intimate</em> or <em>cramped</em>.</p>' +
              '<p><strong>Loaded</strong> (biased) language chooses words for their connotation to push the reader towards a view.</p>' +
              '<p>Neutral: <em>The council <strong>reduced</strong> library funding.</em><br>Loaded: <em>The council <strong>slashed</strong> library funding.</em></p>' +
              '<p>A neutral report avoids loaded words; persuasive writing uses them on purpose.</p>' },
      { id: 'register-9', title: 'Register: levels of formality', years: '9', wide: true,
        text: '<p><strong>Register</strong> is how formal your language is. Choose it for your audience and purpose.</p>' +
              Sci.table(['Informal', 'Neutral', 'Formal'], [['heaps of', 'a lot of', 'a large number of'], ['grab', 'get', 'obtain'], ['kick off', 'start', 'commence'],
                ['help out', 'help', 'assist'], ['sort out', 'fix', 'resolve']]) +
              '<p>Formal writing avoids slang and contractions and often uses longer, more exact words. Too formal can sound stiff in a friendly message.</p>' },
      { id: 'idiom', title: 'Idiomatic expressions', years: '9',
        text: '<p>An <strong>idiom</strong> is a phrase whose meaning cannot be worked out from its words: <em>break the ice</em> (ease the tension), <em>under the weather</em> (unwell), <em>spill the beans</em> (tell a secret).</p>' +
              '<p>Idioms make conversation, stories and chatty writing lively. Avoid them in formal writing, and with readers still learning English, who may read them literally.</p>' },
      { id: 'euphemism-9', title: 'Euphemism: kind or hiding?', years: '9',
        text: '<p>A <strong>euphemism</strong> replaces a harsh or uncomfortable word with a softer one.</p>' +
              '<ul><li>To be <strong>kind</strong>: <em>passed away</em>, <em>put to sleep</em> (a pet).</li>' +
              '<li>To <strong>soften or hide</strong> facts: <em>letting staff go</em> (firing them), <em>a price adjustment</em> (a price rise), <em>pre-loved</em> (second-hand).</li></ul>' +
              '<p>Critical readers translate euphemisms back into plain words.</p>' },
      { id: 'jargon', title: 'Technical words and jargon', years: '9',
        text: '<p><strong>Domain-specific</strong> (technical) words are the exact terms of a subject: <em>photosynthesis</em>, <em>offside</em>, <em>magma</em>. Use them with an audience that knows them, or explain them.</p>' +
              '<p><strong>Jargon</strong> is technical or insider language used where the audience will not understand it, or to sound impressive: <em>We are leveraging synergies.</em></p>' }
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
      { name: 'Extension: what words carry', learn: 'connote-ext', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: '<em>Home</em> and <em>house</em> have the same denotation. What is different?', right: 'Their connotation: “home” suggests warmth and belonging.', wrong: ['Their spelling only.', 'Their denotation.', 'Nothing at all.'], explain: 'Denotation is the literal meaning; connotation is the feeling.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which is a euphemism?', right: 'passed away', wrong: ['died', 'was killed', 'perished'], explain: 'A euphemism softens something hard to say.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which sentence uses emotive language?', right: 'Innocent animals are being cruelly dumped on our streets.', wrong: ['Some animals are left on streets.', 'The council reported 40 stray dogs last year.', 'Stray animals are a problem in some areas.'], explain: '“Innocent” and “cruelly dumped” are chosen to stir feeling.' }),
          rng => C(rng, { tag: EXT, prompt: 'A real estate advert calls a small flat “cosy”. Why?', right: 'It gives a small space a positive connotation.', wrong: ['To describe its exact size.', 'Because cosy means large.', 'To warn buyers.'], explain: 'Word choice can make the same fact sound appealing.' }),
          rng => C(rng, { tag: EXT, prompt: 'A news report calls a group “protesters”; another calls them “troublemakers”. What does the choice show?', right: 'The writers’ different attitudes to the group', wrong: ['That they were different groups', 'That one report is longer', 'Nothing: the words mean the same'], explain: 'Connotation can reveal a writer’s viewpoint.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which word gives a neutral description?', right: 'thin', wrong: ['scrawny', 'skeletal', 'svelte'], explain: '“Thin” is close to neutral; the others carry strong positive or negative feeling.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Shades of meaning.
      {
        name: 'Year 9: shades of meaning', learn: 'synonym-9', challenge: 'only',
        items: [
          ['The security guard ▢ at us until we left the shop; it made us very uncomfortable.', 'stared', ['glanced', 'peeked', 'blinked'],
            '“Stared” is a long, fixed look, which explains the discomfort. A glance or a peek is quick.'],
          ['She ▢ at her watch and kept running.', 'glanced', ['stared', 'gazed', 'studied'],
            '“Glanced” is a quick look, which fits someone who keeps running. The others take time.'],
          ['Grandad ▢ out to sea, lost in his memories.', 'gazed', ['glanced', 'glared', 'peeked'],
            '“Gazed” is a long, dreamy look, which matches being lost in memories. “Glared” is angry; the others are quick.'],
          ['The starving trampers ▢ their dinner in two minutes.', 'devoured', ['nibbled', 'tasted', 'sampled'],
            '“Devoured” means ate quickly and hungrily. The others suggest small, careful bites.'],
          ['Mere ▢ her speech for weeks, so she knew it by heart.', 'rehearsed', ['improvised', 'skimmed', 'glanced at'],
            '“Rehearsed” means practised, which is how she learnt it by heart. “Improvised” means made up on the spot.'],
          ['The old house was ▢: paint peeling, windows broken, garden overgrown.', 'dilapidated', ['historic', 'cosy', 'spotless'],
            '“Dilapidated” means falling apart from neglect, which matches the details. “Historic” only means old and important.']
        ].map(([s, right, wrong, why]) => rng => C(rng, { prompt: `Which word fits best? <em>${s}</em>`, right, wrong, wide: false, explain: why }))
      },

      // 12 · Connotation and loaded language.
      {
        name: 'Year 9: connotation and loaded language', learn: 'loaded', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Two reviews describe the same small café. Which pair of words shows the same fact with opposite connotations?',
            right: '“intimate” and “cramped”', wrong: ['“intimate” and “cosy”', '“cramped” and “crowded”', '“small” and “little”'],
            explain: 'Both mean small, but “intimate” sounds appealing and “cramped” sounds uncomfortable. The other pairs carry the same feeling.' }),
          rng => C(rng, { prompt: 'A politician changed her mind after seeing new evidence. A writer wants readers to <strong>admire</strong> her for it. Which word suits?',
            right: 'open-minded', wrong: ['spineless', 'fickle', 'indecisive'],
            explain: '“Open-minded” praises her willingness to change. The others turn the same fact into a weakness.' }),
          rng => C(rng, { prompt: 'Which word makes the tourists sound like a problem? <em>Every summer, tourists ▢ the small town.</em>',
            right: 'swamp', wrong: ['visit', 'enjoy', 'explore'], wide: false,
            explain: '“Swamp” suggests the town is overwhelmed, as if by a flood. The others are neutral or positive.' }),
          rng => C(rng, { prompt: 'Which headline is the most neutral?',
            right: 'Council reduces library funding', wrong: ['Council slashes library funding', 'Council guts library funding', 'Heartless council axes library funding'],
            explain: '“Reduces” states the fact. “Slashes”, “guts” and “axes” are loaded words that make the cut sound brutal.' }),
          rng => C(rng, { prompt: 'Which sentence uses connotation to make a new building sound <strong>appealing</strong>?',
            right: 'The sleek new library is filled with light.', wrong: ['The stark new library is filled with glare.', 'The new library is made of glass.', 'The new library opened in March.'],
            explain: '“Sleek” and “filled with light” carry positive feelings. “Stark” and “glare” are negative, and the last two are neutral facts.' }),
          rng => C(rng, { prompt: '<em>Fragrance</em>, <em>scent</em> and <em>stench</em> all name a smell. Which is clearly negative?',
            right: 'stench', wrong: ['fragrance', 'scent', 'aroma'], wide: false,
            explain: '“Stench” is a strong, unpleasant smell. “Fragrance” and “aroma” are pleasant, and “scent” is neutral or pleasant.' })
        ]
      },

      // 13 · Register.
      {
        name: 'Year 9: everyday and formal words', learn: 'register-9', challenge: 'only',
        items: [Sci.gen(rng => Sci.match(rng, 'Match each everyday word to its more formal equivalent.',
          rng.sample([
            ['get', 'obtain'], ['ask for', 'request'], ['start', 'commence'], ['help', 'assist'], ['buy', 'purchase'], ['need', 'require'],
            ['enough', 'sufficient'], ['tell', 'inform'], ['end', 'conclude'], ['about (a number)', 'approximately'], ['try', 'attempt']
          ], 4),
          'Formal words suit reports, official letters and speeches to unfamiliar audiences. In a message to a friend, the everyday word is better.'))]
      },

      // 14 · Idiomatic expressions.
      {
        name: 'Year 9: idioms', learn: 'idiom', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>Ana was nervous before her speech, so she told a joke to break the ice.</em> What does “break the ice” mean?',
            right: 'Ease the tension and help people relax', wrong: ['Start an argument', 'Cool the room down', 'Stop talking suddenly'],
            explain: 'An idiom’s meaning is not the meaning of its words. Nothing is broken; the joke makes people relax.' }),
          rng => C(rng, { prompt: '<em>Hemi has been under the weather all week.</em> What does this mean?',
            right: 'He has been feeling unwell.', wrong: ['He has been outside in the rain.', 'He has been worried about the forecast.', 'He has been working as a weather reporter.'],
            explain: '“Under the weather” is an idiom for feeling ill. It has nothing to do with the weather.' }),
          rng => C(rng, { prompt: '<em>Mum let the cat out of the bag about my surprise party.</em> What happened?',
            right: 'Mum accidentally revealed the secret.', wrong: ['Mum let the cat outside.', 'Mum planned the party.', 'Mum cancelled the party.'],
            explain: '“Let the cat out of the bag” means to reveal a secret, usually by accident.' }),
          rng => C(rng, { prompt: 'In which piece of writing would the idiom <em>“it costs an arm and a leg”</em> suit best?',
            right: 'A chatty blog post about saving for a new bike', wrong: ['A formal letter to the bank', 'A science report on bike materials', 'An official council notice'],
            explain: 'Idioms suit relaxed, conversational writing. Formal and technical writing needs plain, exact words: “it is very expensive”.' }),
          rng => C(rng, { prompt: 'A report to the school board says: <em>“The new canteen is a piece of cake to run.”</em> What is the best edit?',
            right: '“The new canteen is simple to run.”', wrong: ['“The new canteen is a walk in the park to run.”', '“The new canteen is easy peasy to run.”', '“The new canteen is a doddle to run.”'],
            explain: 'A formal report needs plain words. The other edits swap one informal idiom or phrase for another.' }),
          rng => C(rng, { prompt: 'Why might idioms confuse a reader who is still learning English?',
            right: 'The meaning of an idiom cannot be worked out from the meanings of its words.', wrong: ['Idioms are usually spelt incorrectly.', 'Idioms are only used in poetry.', 'Idioms are much longer than ordinary sentences.'],
            explain: 'A new learner may read “spill the beans” literally and picture spilt food.' })
        ]
      },

      // 15 · Euphemism.
      {
        name: 'Year 9: euphemism', learn: 'euphemism-9', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A company says it is <em>“letting 50 staff go”</em>. What does this mean in plain words?',
            right: 'It is getting rid of 50 staff.', wrong: ['It is giving 50 staff a holiday.', '50 staff have asked to leave.', 'It is hiring 50 new staff.'],
            explain: '“Letting go” is a euphemism that softens the fact that people are losing their jobs.' }),
          rng => C(rng, { prompt: 'Which euphemism is used mainly to be <strong>kind</strong>, rather than to hide something?',
            right: 'Telling a child their old dog was “put to sleep”', wrong: ['A company calling job cuts “restructuring”', 'A shop calling a price rise an “adjustment”', 'A report calling civilian deaths “collateral damage”'],
            explain: 'The gentle phrase softens sad news for the child. The others soften facts the writer would rather readers did not notice.' }),
          rng => C(rng, { prompt: 'A shop sign says <em>“pre-loved clothing”</em>. What does the euphemism do?',
            right: 'It makes second-hand clothes sound more appealing.', wrong: ['It shows the clothes are brand new.', 'It warns that the clothes are damaged.', 'It gives the exact age of the clothes.'],
            explain: '“Pre-loved” replaces “second-hand” with a warmer word to help sell the clothes.' }),
          rng => C(rng, { prompt: 'A power company announces a <em>“price adjustment”</em>. Which plain sentence states the fact directly?',
            right: 'Prices are going up.', wrong: ['Prices are being adjusted.', 'Prices are changing a little.', 'Prices are being updated.'],
            explain: 'The euphemism hides the direction of the change. The plain version says what customers need to know.' }),
          rng => C(rng, { prompt: 'Why might a critical reader be wary of euphemisms in a company’s statement?',
            right: 'They can soften or hide unpleasant facts.', wrong: ['They are usually spelling mistakes.', 'They make statements more precise.', 'They prove the writer is being completely honest.'],
            explain: 'Euphemisms can be kind, but in official statements they can also make bad news sound harmless.' }),
          rng => C(rng, { prompt: 'In which piece of writing is a euphemism most appropriate?',
            right: 'A sympathy card to a grieving friend', wrong: ['A news report on how many jobs a company cut', 'A safety warning about a dangerous cliff', 'A notice telling parents a school trip is cancelled'],
            explain: 'Gentle words show care in a sympathy card. News, warnings and notices need plain, clear facts.' })
        ]
      },

      // 16 · Technical words and jargon.
      {
        name: 'Year 9: technical words and jargon', learn: 'jargon', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A doctor tells a worried eight-year-old: <em>“You have a minor laceration on your patella.”</em> What is the problem?',
            right: 'The medical terms are jargon for this audience; “a small cut on your kneecap” is clearer.', wrong: ['The sentence is too informal.', 'Doctors should never use medical words.', 'The sentence uses a euphemism.'],
            explain: 'The terms are exact, but this listener will not understand them. Doctors use them with other doctors.' }),
          rng => C(rng, { prompt: 'Which sentence uses subject-specific vocabulary well in a Year 9 science report?',
            right: 'Plants make glucose through photosynthesis.', wrong: ['Plants do a food-making thing with sunlight.', 'Plants cook their food using sun stuff.', 'Plants get hungry and eat light.'],
            explain: 'A science report should use the exact terms of the subject. The others are vague or inaccurate.' }),
          rng => C(rng, { prompt: 'When is a technical term the best choice?',
            right: 'When the audience knows it and it is more precise than an everyday word', wrong: ['Whenever you want to sound clever', 'Only in speeches', 'When the audience is unlikely to know it'],
            explain: 'Technical words are precise, but only useful if the reader understands them, or if you explain them.' }),
          rng => C(rng, { prompt: 'A commentator says: <em>“The ruck was cleared and the halfback fed the backline.”</em> For which audience is this vocabulary right?',
            right: 'Rugby fans watching the game', wrong: ['Young children who have never seen rugby', 'Tourists who do not know the rules', 'Readers of a cooking magazine'],
            explain: 'Rugby fans know these terms, so the commentary is quick and exact. Others would need explanations.' }),
          rng => C(rng, { prompt: 'A company’s letter to customers says: <em>“We are leveraging synergies to optimise your user journey.”</em> What is wrong with it?',
            right: 'It is vague jargon that hides what is actually happening.', wrong: ['It is too informal for customers.', 'It uses precise technical terms that everyone understands.', 'It is written in the passive voice.'],
            explain: 'The words sound impressive but say almost nothing. Plain language would tell customers what is changing.' }),
          rng => C(rng, { prompt: 'You are writing about volcanoes for eight-year-olds and need the word “magma”. What should you do?',
            right: 'Use it, and explain it: hot, melted rock under the ground.', wrong: ['Use it with no explanation.', 'Avoid writing about magma at all.', 'Replace it with “volcano juice”.'],
            explain: 'Explaining a technical term teaches it and keeps the writing exact. Leaving it out or inventing a word loses accuracy.' })
        ]
      },

      // 17 · Editing word choice.
      {
        name: 'Year 9: editing word choice', learn: 'loaded', challenge: 'only',
        items: [
          ['This is a formal letter to the council. One sentence does not suit the register.',
            ['Dear Councillors,', 'I am writing about the lack of lighting in Kōwhai Park.', 'At night, the path is pitch black and totally dodgy.', 'I request that the council install lights before winter.'], 2, 'register-9',
            '“Totally dodgy” is slang, far too informal for a letter to the council. Better: “At night, the path is very dark and unsafe.”'],
          ['One sentence repeats a word so often that it weakens the writing.',
            ['The storm arrived just after midnight.', 'Thunder shook the windows of our house.', 'The rain was loud and the wind was loud and the waves were loud.', 'By morning, the beach was covered in driftwood.'], 2, 'synonym-9',
            'Precise verbs avoid the repetition and say more: “The rain drummed, the wind howled and the waves roared.”'],
          ['This is meant to be a neutral news report. One sentence uses loaded language.',
            ['The council met on Tuesday to discuss the budget.', 'Councillors voted 7–4 to reduce library funding.', 'The greedy councillors gutted the library to save cash.', 'The change takes effect in July.'], 2, 'loaded',
            '“Greedy” and “gutted” push the reader to a view. A neutral report states the facts.'],
          ['This explains recycling to five-year-olds. One sentence uses jargon they will not understand.',
            ['We put old bottles and cans in the yellow bin.', 'A big truck takes them away.', 'At the facility, materials undergo sorting and reprocessing into feedstock.', 'Then they become new things, like drink bottles!'], 2, 'jargon',
            'The technical words do not suit young children. Better: “At a special factory, they are sorted and melted down.”'],
          ['This notice should tell parents clearly what is happening. One sentence hides the facts behind a euphemism.',
            ['Dear parents,', 'From next term, the school pool will be closed for repairs.', 'Some swimming lessons will be subject to rationalisation.', 'We apologise for the inconvenience.'], 2, 'euphemism-9',
            '“Subject to rationalisation” hides the plain fact: some swimming lessons will be cancelled.']
        ].map(([prompt, lines, wrong, card, why]) => rng => Sci.spot(rng, {
          prompt, lines, wrong, learn: card, cue: 'Click the sentence that needs editing.', explain: why
        }))
      }
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
                ['compare and contrast', 'two things side by side'], ['problem and solution', 'proposals and persuasive pieces']]) },
      { id: 'discursive', title: 'Discursive or persuasive?', years: '9', wide: true,
        text: Sci.table(['', 'Discursive', 'Persuasive'], [
                ['<strong>Aim</strong>', 'explores an issue from several viewpoints', 'argues for one position'],
                ['<strong>Opening</strong>', 'an opening statement that frames the question', 'a thesis that states the writer’s position'],
                ['<strong>Body</strong>', 'paragraphs that build on or contrast viewpoints', 'reasons with evidence; the other side is answered'],
                ['<strong>Tone</strong>', 'balanced, measured', 'assertive, often emotive'],
                ['<strong>Ending</strong>', 'a reflective or synthesising conclusion', 'the position restated, often with a call to action']]) +
              '<p>A discursive text can aim to <strong>analyse</strong> (examine evidence from several angles), <strong>reflect</strong> (explore your own thoughts and experiences), ' +
              '<strong>explore</strong> (consider an open question, without needing a final answer) or <strong>speculate</strong> (imagine possible outcomes: “what if …?”).</p>' },
      { id: 'thesis', title: 'Thesis and opening statements', years: '9', wide: true,
        text: '<p>A <strong>thesis</strong> states your position and previews your reasons, in one or two sentences:</p>' +
              '<p><em>School should start at 9.30 am, because teenagers need more sleep and learn better later in the morning.</em></p>' +
              '<p>A discursive <strong>opening statement</strong> frames the issue without taking a side:</p>' +
              '<p><em>Whether school should start later depends on whom you ask: students, parents and bus companies all see it differently.</em></p>' +
              '<p>Weak openings announce (<em>In this essay I will talk about …</em>) or state a bare fact that nobody could discuss.</p>' },
      { id: 'cohesion', title: 'Cohesion: holding a text together', years: '9', wide: true,
        text: '<p><strong>Cohesive devices</strong> link each sentence and paragraph to the last, so the reader never loses the thread.</p>' +
              '<ul><li><strong>Transitions between viewpoints:</strong> <em>Supporters argue … Critics, however, … From a different angle …</em></li>' +
              '<li><strong>Words that point back:</strong> <em>this problem, these concerns, such costs</em></li>' +
              '<li><strong>Linking topic sentences:</strong> the first sentence connects to the paragraph before and states the new idea: <em>Cost is not the only concern; safety matters too.</em></li></ul>' },
      { id: 'rebut', title: 'Anticipating a counterargument', years: '9',
        text: '<p>A strong argument predicts the objection and answers it in four moves:</p>' +
              '<ol class="learn-steps"><li><strong>Name</strong> the opposing view fairly</li><li><strong>Concede</strong> what is true in it: <em>It is true that …</em></li>' +
              '<li><strong>Counter</strong> with a reason or evidence: <em>However, …</em></li><li><strong>Link</strong> back to your thesis</li></ol>' +
              '<p>Answer the strongest form of the objection. Knocking down a weak, twisted version of it convinces nobody.</p>' },
      { id: 'synthesise', title: 'Synthesising conclusions', years: '9',
        text: '<p>To <strong>synthesise</strong> is to draw the threads together into one overall understanding, rather than repeating each point.</p>' +
              '<p>Repeats: <em>Some say cost, some say safety, and some say fun.</em></p>' +
              '<p>Synthesises: <em>Every side, in the end, wants the same thing: a park that is safe enough to use and cheap enough to keep.</em></p>' +
              '<p>A discursive conclusion weighs the views and may leave a question open; a persuasive one restates the thesis in fresh words.</p>' },
      { id: 'plan', title: 'Choosing a planning technique', years: '9', wide: true,
        text: Sci.table(['Technique', 'Best for'], [
                ['<strong>Brainstorm</strong> or mind map', 'generating ideas when you are not yet sure what to say'],
                ['<strong>Outline</strong>', 'ordering the points and paragraphs of an essay or argument'],
                ['<strong>Flow chart</strong>', 'a process, a sequence of causes and effects, or steps with decisions'],
                ['<strong>Storyboard</strong>', 'a narrative or visual text told in scenes, such as a short film or comic']]) +
              '<p>Choose the plan that suits the form and purpose of the writing.</p>' }
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
      { name: 'Extension: organising structures', learn: 'organise', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits an explanation of why the moa became extinct?', right: 'Cause and effect', wrong: ['Compare and contrast', 'Instructions', 'Orientation and resolution'], explain: 'It explains what led to what.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a piece on cats versus dogs as pets?', right: 'Compare and contrast', wrong: ['Cause and effect', 'Chronological', 'Instructions'], explain: 'It sets two things side by side.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a history of your town?', right: 'Chronological', wrong: ['Compare and contrast', 'Problem and solution', 'Cause and effect'], explain: 'Events are told in time order.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which structure best suits a proposal to fix litter at school?', right: 'Problem and solution', wrong: ['Chronological', 'Compare and contrast', 'Orientation and resolution'], explain: 'It describes the problem, then proposes a fix.' }),
          rng => C(rng, { tag: EXT, prompt: 'A writer explores both sides of an issue without arguing for one. What kind of text is this?', right: 'A discussion (discursive text)', wrong: ['A persuasive text', 'A narrative', 'A set of instructions'], explain: 'Discursive texts explore several viewpoints.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which transition best signals a consequence in a formal essay?', right: 'Consequently', wrong: ['Anyway', 'Also', 'Like'], explain: '“Consequently” shows that one thing results from another, in a formal register.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      // 11 · Discursive or persuasive?
      {
        name: 'Year 9: discursive or persuasive?', learn: 'discursive', challenge: 'only',
        items: [rng => Sci.sort(rng, { prompt: 'Does each extract come from a discursive text or a persuasive text?', bins: ['Discursive', 'Persuasive'],
          items: [
            { text: 'Some see a four-day school week as a chance to rest; others worry it would squeeze learning into longer, more tiring days.', bin: 0 },
            { text: 'There is no simple answer to whether social media brings people closer together.', bin: 0 },
            { text: 'What might Aotearoa look like if every car on the road were electric? The possibilities are worth considering.', bin: 0 },
            { text: 'Looking back, I am still not sure whether moving schools was the right choice, but it taught me a lot.', bin: 0 },
            { text: 'Farmers, scientists and city councils each see water quality from a different angle.', bin: 0 },
            { text: 'Both views have merit, and the evidence points in more than one direction.', bin: 0 },
            { text: 'The council must ban single-use plastic bags at the market this year.', bin: 1 },
            { text: 'Every student deserves a later start, and the evidence proves it.', bin: 1 },
            { text: 'Sign the petition today and protect our local beaches.', bin: 1 },
            { text: 'There is only one sensible choice: the skate park must be built.', bin: 1 },
            { text: 'Anyone who cares about kiwi should support trapping in the reserve.', bin: 1 },
            { text: 'Some claim uniforms build pride, but that is a weak excuse for costing families hundreds of dollars.', bin: 1 }
          ], pick: 6,
          explain: 'Discursive extracts weigh several viewpoints, reflect or wonder “what if”, in a balanced tone. Persuasive extracts push one position, dismiss the other side or call the reader to act.' })]
      },

      // 12 · Thesis and opening statements.
      {
        name: 'Year 9: thesis and opening statements', learn: 'thesis', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which is the strongest thesis for a <strong>persuasive</strong> essay on school start times?',
            right: 'School should start at 9.30 am, because teenagers need more sleep and concentrate better later in the morning.',
            wrong: ['In this essay I will talk about school start times.', 'Most schools start at about 8.45 am.', 'School start times are an interesting topic that many people have opinions about.'],
            explain: 'A thesis states a position and previews the reasons. The others announce the topic, state a bare fact, or say nothing arguable.' }),
          rng => C(rng, { prompt: 'Which is the best opening statement for a <strong>discursive</strong> essay on whether teenagers should have part-time jobs?',
            right: 'Part-time jobs can teach teenagers responsibility, but they can also eat into study and sleep; the question is where the balance lies.',
            wrong: ['Teenagers must not be allowed part-time jobs, and here is why.', 'In this essay I am going to write about jobs.', 'Many teenagers work at supermarkets.'],
            explain: 'A discursive opening frames the issue and signals more than one viewpoint. The first takes a side, which suits a persuasive essay; the others announce or state a fact.' }),
          rng => C(rng, { prompt: 'Which is the strongest thesis for a <strong>persuasive</strong> essay about predator-free reserves?',
            right: 'New Zealand should fund more predator-free reserves, because they protect native birds and bring visitors to local communities.',
            wrong: ['Predators such as stoats and rats live in New Zealand.', 'This essay is about predators and birds.', 'Some people like birds and some people do not.'],
            explain: 'It takes a clear position and previews two reasons the essay will develop. The others are a fact, an announcement and a vague observation.' }),
          rng => C(rng, { prompt: 'A thesis statement does two jobs. What are they?',
            right: 'It states the writer’s position and previews the main reasons.',
            wrong: ['It tells a joke and lists every piece of evidence.', 'It summarises the opposing view and agrees with it.', 'It gives the essay’s title and the writer’s name.'],
            explain: 'The thesis tells the reader what you will argue and how. Evidence comes later, in the body paragraphs.' }),
          rng => C(rng, { prompt: 'Why is this a weak thesis? <em>“Fast fashion is a thing that exists.”</em>',
            right: 'It states a fact nobody would argue with, so it gives the essay no position to develop.',
            wrong: ['It is far too long.', 'It takes too strong a position.', 'It should be written as a question.'],
            explain: 'A thesis must be arguable. Compare: “Fast fashion should be taxed, because its true cost is paid by workers and the environment.”' }),
          rng => C(rng, { prompt: 'Which opening suits a <strong>discursive</strong> essay rather than a persuasive one?',
            right: 'Should Wellington build more cycleways? Cyclists, shop owners and drivers give very different answers.',
            wrong: ['Wellington needs more cycleways, and it needs them now.', 'Cycleways are the only sensible way to cut traffic in Wellington.', 'Every reader should email the council today demanding more cycleways.'],
            explain: 'It raises the question and points to several viewpoints without choosing one. The others take a side, as a persuasive text would.' })
        ]
      },

      // 13 · Purposes of discursive texts.
      {
        name: 'Year 9: purposes of discursive texts', learn: 'discursive', challenge: 'only',
        items: [Sci.gen(rng => {
          const pool = [
            ['To analyse', ['This essay examines the evidence for and against a four-day school week, weighing cost, learning and wellbeing.',
                            'Using data from three regions, this essay examines why some rivers have recovered and others have not.']],
            ['To reflect', ['Looking back on my first year at high school, I have come to see friendship differently.',
                            'Learning te reo Māori with my nan has changed how I think about where I belong.']],
            ['To explore', ['Is it ever right to break a rule? This essay turns the question over without promising a final answer.',
                            'What does it mean to be a good citizen? This essay considers several possible answers without settling on one.']],
            ['To speculate', ['What if every car in Aotearoa were electric by 2040? This essay imagines how our towns might change.',
                              'Suppose robots did most jobs by 2070. How might people spend their days?']]
          ];
          return Sci.match(rng, 'Match each discursive opening to its purpose.', pool.map(([purpose, lines]) => [rng.pick(lines), purpose]),
            'Analyse: examine evidence from several angles. Reflect: explore your own thoughts and experiences. Explore: consider an open question. Speculate: imagine possible outcomes.');
        })]
      },

      // 14 · Cohesion and transitions between viewpoints.
      {
        name: 'Year 9: cohesion between viewpoints', learn: 'cohesion', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A discursive essay has just given the supporters’ view of a new motorway. Which sentence best opens the next paragraph, on the opposing view?',
            right: 'Critics, however, see the motorway very differently.',
            wrong: ['Also, the motorway will be very long.', 'In conclusion, the motorway is good.', 'For example, motorways have several lanes.'],
            explain: '“Critics, however” signals a shift to a new viewpoint. The others add, conclude or give an example instead.' }),
          rng => C(rng, { prompt: '<em>Many residents fear the new dam would flood farmland. <strong>These concerns</strong> are shared by several local farmers.</em> What does “These concerns” do?',
            right: 'It points back to the fears in the previous sentence, linking the two sentences.',
            wrong: ['It introduces a brand-new topic.', 'It signals that the essay is ending.', 'It gives an example.'],
            explain: 'Words such as “this”, “these” and “such” refer back to an earlier idea, so the reader follows the thread.' }),
          rng => C(rng, { prompt: 'Which topic sentence best links a paragraph about <strong>cost</strong> to a new paragraph about <strong>safety</strong>?',
            right: 'Cost is not the only concern, however; safety matters just as much.',
            wrong: ['Safety.', 'Here is another paragraph about something else.', 'Cost is a big problem for the project.'],
            explain: 'It looks back to cost and forward to safety in one sentence. The last option stays on cost, and the others give no link at all.' }),
          rng => C(rng, { prompt: 'Which transition best fills the gap? <em>Supporters say the reserve protects kiwi. ▢, some hunters argue it limits their access to the bush.</em>',
            right: 'On the other hand', wrong: ['Therefore', 'For instance', 'Similarly'],
            explain: 'The second sentence gives a contrasting viewpoint. “Therefore” shows a result, “for instance” an example and “similarly” a likeness.' }),
          rng => C(rng, { prompt: 'Which pair of sentences is the most cohesive?',
            right: 'Plastic bags clog waterways. This damage costs councils millions of dollars each year.',
            wrong: ['Plastic bags clog waterways. Councils have budgets.', 'Plastic bags clog waterways. Some bags are blue.', 'Plastic bags clog waterways. Rivers are found in many countries.'],
            explain: '“This damage” points back to the clogged waterways and builds on the idea. The other second sentences drift to unconnected facts.' }),
          rng => C(rng, { prompt: 'A discursive essay has given the views of students and of parents. Which sentence best introduces a third viewpoint?',
            right: 'Seen from a teacher’s perspective, the issue looks different again.',
            wrong: ['As a result, students are right.', 'In conclusion, everyone agrees.', 'For example, parents.'],
            explain: 'It names the new viewpoint and signals that it differs. The others jump to a result or a conclusion, or are not a sentence.' })
        ]
      },

      // 15 · Anticipating and rebutting a counterargument.
      {
        name: 'Year 9: rebutting a counterargument', learn: 'rebut', challenge: 'only',
        items: [
          ['Some people argue that a later school start would clash with after-school sport.', 'It is true that some trainings would finish later.',
           'However, research on teenage sleep suggests that rested players perform better and are injured less.', 'A later start, then, would help our teams rather than harm them.'],
          ['Critics say a skate park would attract litter.', 'Admittedly, any busy public space can collect rubbish.',
           'Yet a park with bins and a volunteer clean-up roster would stay tidier than the empty lot does now.', 'That is one more reason the skate park deserves the council’s support.'],
          ['Opponents claim that a predator-free reserve is too expensive.', 'Trapping does cost money, and results take years.',
           'But the visitors that thriving native birds attract bring money back into the community.', 'The reserve is therefore an investment, not just a cost.'],
          ['Some parents worry that a phone-free school day would leave students unreachable.', 'Their concern for safety is understandable.',
           'However, the school office can pass on any urgent message within minutes.', 'Safety, then, is not a reason to keep phones in pockets.'],
          ['Some argue that people will simply forget their reusable cups.', 'It is true that habits take time to change.',
           'Still, a small discount at the counter has helped many cafés make reusable cups the norm.', 'With the right incentives, a ban on disposable cups is realistic.']
        ].map(seq => rng => Sci.order(rng, 'Put the sentences of this rebuttal paragraph in order.', seq,
          'Name the opposing view, concede what is true in it, counter it with a reason or evidence, then link back to your position.'))
      },

      // 16 · Synthesising conclusions.
      {
        name: 'Year 9: synthesising conclusions', learn: 'synthesise', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A <strong>discursive</strong> essay has weighed the views of students, parents and teachers on homework. Which conclusion synthesises best?',
            right: 'Students, parents and teachers disagree about how much homework helps, but they agree on one thing: what matters is whether it is useful, not how long it takes.',
            wrong: ['Students think one thing, parents think another, and teachers think something else.', 'Homework must be banned immediately. Sign our petition.', 'Another view comes from sports coaches, who say homework clashes with training.'],
            explain: 'It draws the views together into one new insight. The others only repeat, switch to a one-sided call to action, or add a new point.' }),
          rng => C(rng, { prompt: 'Which sentence best concludes a <strong>persuasive</strong> essay arguing for more cycleways?',
            right: 'Safer streets, cleaner air and healthier people: cycleways deliver all three, and the council should start building them now.',
            wrong: ['There are many views on cycleways, and each has merit.', 'In this essay I talked about cycleways.', 'A further reason is that bikes cost less than cars.'],
            explain: 'It gathers the reasons into one strong statement and ends with a call to action. The first is balanced, which suits a discursive essay; the last adds a new reason.' }),
          rng => C(rng, { prompt: 'What is the difference between summarising and synthesising in a conclusion?',
            right: 'Summarising repeats the main points; synthesising draws them together into one overall insight.',
            wrong: ['Summarising is for stories; synthesising is for poems.', 'They mean exactly the same thing.', 'Synthesising adds new evidence that was not in the essay.'],
            explain: 'A synthesis shows how the points fit together. It does not bring in new evidence.' }),
          rng => C(rng, { prompt: 'A discursive essay explored whether social media brings people together. Which ending is the most reflective and synthesising?',
            right: 'Social media can connect us or isolate us; perhaps the real question is not whether we use it, but how.',
            wrong: ['Social media is harmful, and everyone should delete it today.', 'Many people use social media every day.', 'In conclusion, there were good points and bad points.'],
            explain: 'It holds both sides together and reframes the question. The others take a side, state a new fact, or just say that views differ.' }),
          rng => C(rng, { prompt: 'Why might a discursive essay end by leaving a question open?',
            right: 'The issue is complex, and the writer’s aim was to explore it rather than settle it.',
            wrong: ['The writer ran out of time.', 'Every conclusion must end with a question.', 'Discursive texts do not have conclusions.'],
            explain: 'Exploring an open question is one purpose of a discursive text, so an open, reflective ending can fit.' })
        ]
      },

      // 17 · Choosing a planning technique.
      {
        name: 'Year 9: choosing a plan', learn: 'plan', challenge: 'only',
        items: [
          ['Mere has worked out the story for a two-minute short film. She now wants to plan it shot by shot.', 'A storyboard', 'A storyboard shows each scene or shot as a picture with notes.'],
          ['Tama has his ideas for a discursive essay and now needs to put his paragraphs into a logical order.', 'An outline', 'An outline orders the points and paragraphs of an essay.'],
          ['Aroha is writing a guide that helps people decide which bin each piece of rubbish belongs in, with a yes or no question at each step.', 'A flow chart', 'A flow chart shows steps and the decisions that branch between them.'],
          ['Sione has been given an essay topic and has no idea yet what to say about it.', 'A brainstorm or mind map', 'A brainstorm generates ideas; ordering them comes later.'],
          ['Hemi has the events of a comic strip about a cheeky kea worked out, and now needs to plan each panel.', 'A storyboard', 'A storyboard plans a visual narrative panel by panel.']
        ].map(([task, right, why]) => rng => C(rng, { prompt: `${task} Which planning technique suits this best?`, right,
          wrong: ['A storyboard', 'An outline', 'A flow chart', 'A brainstorm or mind map'].filter(t => t !== right),
          explain: why + ' Choose the plan that suits the form and purpose of the writing.' }))
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


  // ═══ W15 The literary essay (Year 9) ══════════════════════════════════════
  // Phase 4 › Language Studies › Crafting Texts › Literary essays (Year 9):
  // an introduction with a clear, concise thesis; body paragraphs that each
  // develop an idea with evidence from the text, analysed to show how it
  // supports the thesis; a conclusion that summarises. Practices: developing a
  // thesis, beginning each paragraph with a topic sentence, using relevant
  // quotations, explaining how evidence supports the argument, exploring the
  // author's purpose and techniques, and the language of literary essays.
  //
  // Two short texts, written for this site, give the essay something to be
  // about. A question on a text prints it in full the first time it appears
  // on the page and folds it away after that.

  const BIKE = {
    title: 'The Bike', kind: 'story',
    text: '<p>Every afternoon for a month, Losa stopped outside Henderson’s Cycles to look at the red bike in the window. It had silver mudguards and a bell that, she imagined, would sound like a small church.</p>' +
          '<p>At home she counted her savings on the bedroom floor: forty-three dollars and twenty cents. The bike cost two hundred and ten.</p>' +
          '<p>On Saturday her brother Sione came home from his first week at the packhouse, smelling of apples and cold air. He did not say much. He never did. He put an envelope on the kitchen table, beside the bills that Mum kept under the sugar tin.</p>' +
          '<p>That night Losa heard Mum crying quietly in the kitchen. It was not the bad kind of crying.</p>' +
          '<p>On Monday, Losa walked past Henderson’s without stopping. The red bike was still there, shining. She looked at it for one second, then kept walking, her hands in her pockets, counting nothing at all.</p>'
  };
  const TIDE = {
    title: 'Low Tide (a poem)', kind: 'poem',
    text: '<p class="poem">My grandfather walks the low-tide line,<br>his bucket swinging, slow as breath.<br>He knows which rocks the pipi hide beneath,<br>which stars mean wind, which clouds mean rain.</p>' +
          '<p class="poem">I follow, stepping in his prints,<br>my feet too small to fill them yet.<br>The sea comes back. It always does.<br>It takes his footprints. Leaves me mine.</p>'
  };
  const showText = p => `<div class="passage"><p class="passage-title"><strong>${p.title}</strong></p>${p.text}</div>`;
  /** A question on one of the texts: the text goes above the prompt, tagged so it folds when shown again. */
  const onText = (p, q) => Object.assign(q, { prompt: showText(p) + q.prompt, passage: p.title });

  Sci.topic({
    id: 'ew15', unit: 'writing',
    title: 'The Literary Essay',
    blurb: 'Building an argument about a text: a thesis, topic sentences, the right evidence, and analysis that explains it.',
    hint: 'A thesis is an arguable claim about what the text shows and how. Each body paragraph opens with a topic sentence that supports the thesis, ' +
          'gives a short quotation, explains how the words create meaning, and links back to the thesis. Write in the present tense, formally, without retelling the plot.',

    learn: [
      { id: 'shape', title: 'The shape of a literary essay', wide: true,
        text: Sci.table(['Part', 'What it does'], [
                ['<strong>Introduction</strong>', 'names the text and writer, gives a little context, and ends with the <strong>thesis</strong>'],
                ['<strong>Body paragraphs</strong>', 'each develops <strong>one idea</strong> that supports the thesis, with evidence and analysis'],
                ['<strong>Conclusion</strong>', 'restates the thesis in fresh words, sums up the main points, and leaves a final insight']]) +
              '<p>A literary essay is an <strong>argument</strong> about a text, not a retelling of it.</p>' },
      { id: 'thesis', title: 'A thesis statement',
        text: '<p>The <strong>thesis</strong> is your main argument, in one or two sentences. It says <strong>what</strong> the text shows and <strong>how</strong> the writer shows it.</p>' +
              '<p>✓ <em>In “The Bike”, the writer uses the red bike as a symbol to show that growing up can mean giving up what you want for the people you love.</em></p>' +
              '<p>✗ a plot summary, a fact, a vague opinion (“a really good story”), or an announcement (“In this essay I will …”).</p>' },
      { id: 'topic', title: 'Topic sentences',
        text: '<p>Each body paragraph opens with a <strong>topic sentence</strong>: the paragraph’s point, linked to the thesis.</p>' +
              '<p>Connectives show how the paragraphs build: <em>Furthermore</em>, <em>In contrast</em>, <em>Most importantly</em>.</p>' +
              '<p><em>“The writer also uses Sione’s silence to show that love can be shown through actions rather than words.”</em></p>' },
      { id: 'quote', title: 'Choosing a quotation',
        text: '<p>Choose evidence that is:</p><ul><li><strong>relevant</strong>: it proves this paragraph’s point;</li>' +
              '<li><strong>short</strong>: a phrase is often better than a whole sentence;</li><li><strong>rich</strong>: it has words or techniques you can say something about.</li></ul>' },
      { id: 'embed', title: 'Embedding a quotation',
        text: '<p>Put the writer’s exact words in quotation marks and build them into your own sentence, so it still reads smoothly.</p>' +
              '<p>✓ <em>Sione comes home “smelling of apples and cold air”, a detail that shows how hard he has worked.</em></p>' +
              '<p>✗ A quotation dropped on its own, with no sentence around it.</p>' },
      { id: 'analyse', title: 'Explaining the evidence', wide: true,
        text: '<ol class="learn-steps"><li><strong>Point:</strong> the topic sentence.</li>' +
              '<li><strong>Evidence:</strong> a short quotation.</li>' +
              '<li><strong>Explain:</strong> zoom in on key words or techniques and say what they suggest and how they affect the reader.</li>' +
              '<li><strong>Link:</strong> show how this supports the thesis and the writer’s purpose.</li></ol>' +
              '<p>The explanation is where the marks are. Saying a quotation “shows” the point is not enough: explain <strong>how</strong> the words show it.</p>' },
      { id: 'style', title: 'The language of a literary essay',
        text: '<ul><li><strong>Present tense</strong> for what happens in the text: “Losa <em>walks</em> past”.</li>' +
              '<li><strong>Formal</strong> and in the <strong>third person</strong>: no slang, no “I think”.</li>' +
              '<li>Refer to the author by <strong>surname</strong> (Mansfield, not Katherine), or as “the writer”.</li>' +
              '<li><strong>Analyse</strong>, don’t retell: assume the reader knows the story.</li></ul>' },
      { id: 'conclusion', title: 'The conclusion',
        text: '<p>A conclusion <strong>restates the thesis</strong> in fresh words, <strong>sums up</strong> the main points, and ends with a final insight about the text or what it says about life.</p>' +
              '<p>It does not bring in new evidence, and it does not simply copy the introduction.</p>' },
      { id: 'purpose', title: 'The writer’s purpose and choices', wide: true,
        text: '<p>Every detail in a good text is a <strong>choice</strong>. Ask why the writer chose it: what does it make us think or feel, and how does it serve the text’s message?</p>' +
              '<p><em>Why does “The Bike” end with Losa “counting nothing at all”? Because it echoes her counting her savings, showing she has let the wish go.</em></p>' }
    ],

    examples: [
      {
        title: 'Example 1: from topic to thesis',
        steps: [
          'Topic: <em>“The Bike” is about Losa and a bike she wants.</em> That is a summary, not an argument.',
          'Ask what the text <strong>shows</strong>: growing up can mean putting your family first.',
          'Ask <strong>how</strong> the writer shows it: the red bike works as a symbol of what Losa wants for herself.',
          'Thesis: <em>In “The Bike”, the writer uses the red bike as a symbol to show that growing up can mean giving up what you want for the people you love.</em>'
        ],
        result: 'What the text shows + how the writer shows it'
      },
      {
        title: 'Example 2: a body paragraph',
        steps: [
          '<strong>Point:</strong> The writer shows Losa’s new maturity through the story’s final image.',
          '<strong>Evidence:</strong> Losa walks on “counting nothing at all”.',
          '<strong>Explain:</strong> the phrase echoes her counting her savings earlier. Counting “nothing” shows she has stopped measuring what she wants and lets the wish go.',
          '<strong>Link:</strong> this quiet ending supports the idea that growing up can mean putting others first.'
        ]
      }
    ],

    slots: [
      // 1 · The strongest thesis.
      {
        name: 'The strongest thesis', learn: 'thesis',
        items: [
          rng => onText(BIKE, C(rng, { prompt: 'Which is the strongest thesis for an essay on “The Bike”?',
            right: 'In “The Bike”, the writer uses the red bike as a symbol to show that growing up can mean giving up what you want for the people you love.',
            wrong: ['“The Bike” is about a girl called Losa who wants a red bike.', '“The Bike” is a really good story with an interesting ending.', 'In “The Bike”, the bike costs two hundred and ten dollars.'],
            explain: 'It argues what the story shows (growing up can mean putting others first) and how (the bike as a symbol). The others summarise, give an opinion with no argument, or state a fact.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Which is the strongest thesis for an essay on “Low Tide”?',
            right: 'In “Low Tide”, the poet uses the image of footprints to show how knowledge and identity pass from one generation to the next.',
            wrong: ['“Low Tide” is a poem about a grandfather and a child at the beach.', '“Low Tide” is about life.', '“Low Tide” uses a simile, repetition and a metaphor.'],
            explain: 'The strongest thesis makes a specific, arguable claim and names how the poet makes it. Listing techniques is not an argument, and “about life” is too vague to prove.' })),
          rng => C(rng, { prompt: 'What makes a thesis statement different from a plot summary?',
            right: 'A thesis makes an arguable claim about what the text means and how; a summary only says what happens.',
            wrong: ['A thesis is longer than a summary.', 'A thesis always begins with “In this essay”.', 'A thesis retells the ending; a summary retells the beginning.'],
            explain: 'A reader could disagree with a thesis, which is why the essay needs evidence to support it.' }),
          rng => C(rng, { prompt: 'A student writes: <em>“In this essay I will talk about the poem ‘Low Tide’.”</em> What is the main problem?',
            right: 'It announces the topic but makes no argument about the poem.', wrong: ['It is too long.', 'It names the poem.', 'It is written in the present tense.'],
            explain: 'A thesis states your argument. Announcing what you will write about does not.' }),
          rng => C(rng, { prompt: 'Which thesis is too <strong>broad</strong> to be proved in a short essay?',
            right: 'Stories show everything about being human.',
            wrong: ['In “The Bike”, Sione’s silence shows that love can be expressed through actions rather than words.', 'In “Low Tide”, the returning sea suggests that time moves on but leaves something behind.', 'In “The Bike”, the final image shows Losa’s new maturity.'],
            explain: 'A good thesis is specific to the text, so it can be supported with evidence from it.' }),
          rng => onText(TIDE, C(rng, { prompt: 'Which thesis is the most <strong>arguable</strong>?',
            right: 'In “Low Tide”, the poet suggests that growing up means learning to make your own way, not just following in someone else’s footsteps.',
            wrong: ['“Low Tide” has two stanzas.', '“Low Tide” mentions pipi.', '“Low Tide” is set at the beach.'],
            explain: 'The others are facts that nobody would dispute. A thesis must be a claim you have to prove.' }))
        ]
      },

      // 2 · Thesis or not?
      {
        name: 'Thesis or not?', learn: 'thesis',
        items: [rng => Sci.sort(rng, {
          prompt: 'Is each sentence a thesis statement, or not?',
          bins: ['Thesis statement', 'Not a thesis'],
          items: [
            { text: 'In “The Bike”, the writer uses contrast to show how Losa’s wishes change.', bin: 0 },
            { text: 'In “Low Tide”, the poet presents the sea as a symbol of time passing.', bin: 0 },
            { text: 'In “The Bike”, small details reveal a family that cares for one another without saying so.', bin: 0 },
            { text: 'In “Low Tide”, the grandfather’s knowledge is shown to be a gift the speaker must grow into.', bin: 0 },
            { text: 'In “The Bike”, the writer suggests that the best choices are sometimes the quietest.', bin: 0 },
            { text: 'In “The Bike”, Losa saves forty-three dollars and twenty cents.', bin: 1 },
            { text: 'In this essay I will write about “Low Tide”.', bin: 1 },
            { text: '“The Bike” is a story about a brother and a sister.', bin: 1 },
            { text: 'Is “Low Tide” a good poem?', bin: 1 },
            { text: '“Low Tide” is my favourite poem.', bin: 1 }
          ],
          pick: 6,
          explain: 'A thesis makes an arguable claim about meaning and how it is created. Facts, summaries, questions, announcements and personal preferences are not theses.'
        })]
      },

      // 3 · Topic sentences.
      {
        name: 'Topic sentences', learn: 'topic',
        items: [
          rng => onText(BIKE, C(rng, { prompt: 'Thesis: <em>In “The Bike”, the writer shows that growing up can mean putting your family first.</em> Which is the best topic sentence for a body paragraph?',
            right: 'The writer first shows Losa’s longing for the bike, so that her later choice to let it go carries real weight.',
            wrong: ['Losa looks at a bike every afternoon.', 'Henderson’s Cycles is a bike shop.', 'I really liked the part about the bike.'],
            explain: 'A topic sentence states the paragraph’s point and links it to the thesis. The others retell, state a fact, or give a personal reaction.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Thesis: <em>In “The Bike”, the writer shows that love can be shown through actions rather than words.</em> Which is the best topic sentence?',
            right: 'Sione’s silence is central to this idea, because his care for the family is shown entirely by what he does.',
            wrong: ['Sione works at a packhouse.', 'Sione comes home on a Saturday.', 'This story has a brother in it.'],
            explain: 'It makes a point about Sione that supports the thesis, rather than retelling a detail.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Thesis: <em>In “Low Tide”, the poet shows how knowledge passes between generations.</em> Which is the best topic sentence?',
            right: 'In the first stanza, the poet presents the grandfather as someone whose knowledge comes from a lifetime of close attention to the sea.',
            wrong: ['The first stanza has four lines.', 'The grandfather carries a bucket.', 'There are pipi in the poem.'],
            explain: 'It makes an arguable point that supports the thesis. The others are facts with no argument.' })),
          rng => C(rng, { prompt: 'Which connective best opens a paragraph that gives a <strong>different side</strong> of the same idea?',
            right: 'In contrast,', wrong: ['Furthermore,', 'In addition,', 'Similarly,'],
            explain: '“In contrast” signals a difference. The others add a similar point.' }),
          rng => C(rng, { prompt: 'Where does the topic sentence usually go?',
            right: 'At the start of the body paragraph', wrong: ['At the end of the essay', 'In the middle of the quotation', 'Only in the introduction'],
            explain: 'Opening with the point tells the reader what the paragraph will prove.' })
        ]
      },

      // 4 · Choosing the best quotation.
      {
        name: 'The best quotation', learn: 'quote',
        items: [
          rng => onText(BIKE, C(rng, { prompt: 'Point: <em>Losa wants the bike very much.</em> Which quotation is the best evidence?',
            right: '“Every afternoon for a month, Losa stopped outside Henderson’s Cycles”', wrong: ['“The bike cost two hundred and ten.”', '“He did not say much.”', '“That night Losa heard Mum crying quietly”'],
            explain: 'Stopping every afternoon for a month shows how strongly she longs for it. The others are not about her wanting the bike.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Point: <em>Sione shows his love through actions, not words.</em> Which quotation is the best evidence?',
            right: '“He did not say much. He never did. He put an envelope on the kitchen table”', wrong: ['“smelling of apples and cold air”', '“The red bike was still there, shining.”', '“forty-three dollars and twenty cents”'],
            explain: 'It sets his silence against his action, which is exactly the point. The apple detail shows hard work, not how he expresses love.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Point: <em>Losa has let the wish go by the end.</em> Which quotation is the best evidence?',
            right: '“counting nothing at all”', wrong: ['“a bell that, she imagined, would sound like a small church”', '“beside the bills that Mum kept under the sugar tin”', '“his first week at the packhouse”'],
            explain: 'The final phrase echoes her counting her savings, now with nothing to count. A short, rich phrase is often the best evidence.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Point: <em>The family is short of money.</em> Which quotation is the best evidence?',
            right: '“the bills that Mum kept under the sugar tin”', wrong: ['“a bell that, she imagined, would sound like a small church”', '“She looked at it for one second”', '“It was not the bad kind of crying.”'],
            explain: 'Bills tucked away under the sugar tin hint at money worries the family keeps out of sight.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Point: <em>The grandfather has deep knowledge of the natural world.</em> Which quotation is the best evidence?',
            right: '“which stars mean wind, which clouds mean rain”', wrong: ['“his bucket swinging”', '“I follow, stepping in his prints”', '“The sea comes back.”'],
            explain: 'It shows him reading the sky to predict the weather, and the repeated “which” builds up how much he knows.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Point: <em>The speaker is not yet ready to take the grandfather’s place.</em> Which quotation is the best evidence?',
            right: '“my feet too small to fill them yet”', wrong: ['“slow as breath”', '“He knows which rocks the pipi hide beneath”', '“My grandfather walks the low-tide line”'],
            explain: '“Too small to fill them” echoes the saying about filling someone’s shoes, and “yet” hints that one day the speaker will.' }))
        ]
      },

      // 5 · Embedding quotations.
      {
        name: 'Embedding a quotation', learn: 'embed',
        items: [
          rng => C(rng, { prompt: 'Which sentence embeds the quotation correctly?',
            right: 'Sione comes home “smelling of apples and cold air”, a detail that shows how hard he has worked.',
            wrong: ['Sione comes home smelling of apples and cold air, a detail that shows how hard he has worked.', '“Smelling of apples and cold air.” Sione has worked hard.', 'Sione comes home. “Smelling of apples and cold air”. A detail that shows hard work.'],
            explain: 'The writer’s exact words are in quotation marks, and the sentence reads smoothly around them. Without marks, the words look like your own; the others drop the quotation in as a fragment.' }),
          rng => C(rng, { prompt: 'Which sentence embeds the quotation correctly?',
            right: 'The grandfather moves “slow as breath”, which suggests he is calm and completely at home on the shore.',
            wrong: ['The grandfather moves. “Slow as breath.” He is calm.', 'The grandfather moves slow as breath which suggests he is calm.', '“slow as breath” the grandfather is calm.'],
            explain: 'Quotation marks show the poet’s words, and the sentence around them is complete and smooth.' }),
          rng => C(rng, { prompt: 'Which is the best way to quote from “The Bike”?',
            right: 'Losa walks past “without stopping”, which shows her decision is firm.',
            wrong: ['Losa walks past without stopping, which shows her decision is firm.', 'On Monday, Losa walked past Henderson’s without stopping. The red bike was still there, shining. This shows her decision.', 'Losa walks past “without stopping, which shows her decision is firm.”'],
            explain: 'A short, exact quotation in quotation marks. The second copies whole sentences without marks, and the third puts the student’s own words inside the quotation marks.' }),
          rng => C(rng, { prompt: 'Why is a short quotation often better than a long one?',
            right: 'It keeps the focus on the key words you are going to analyse.', wrong: ['Long quotations are not allowed.', 'Short quotations do not need quotation marks.', 'It makes the essay shorter, which always earns more marks.'],
            explain: 'If you quote a whole paragraph, the reader cannot tell which words matter. A precise phrase shows exactly what you are analysing.' }),
          rng => C(rng, { prompt: 'What is wrong with this? <em>The poem uses a simile. “His bucket swinging, slow as breath.” This is effective.</em>',
            right: 'The quotation is dropped in on its own, and the comment does not explain the effect.', wrong: ['Similes should never be quoted.', 'The quotation is too short.', 'It should be written in the past tense.'],
            explain: 'Build the quotation into a sentence, then explain how it works: “The simile ‘slow as breath’ suggests the grandfather’s calm, unhurried rhythm.”' })
        ]
      },

      // 6 · Explaining how evidence supports a point.
      {
        name: 'Explaining the evidence', learn: 'analyse',
        items: [
          rng => onText(BIKE, C(rng, { prompt: 'Evidence: <em>“It was not the bad kind of crying.”</em> Which explanation is the strongest?',
            right: 'By telling us what the crying is not, the writer hints that Mum is moved by Sione’s gift rather than upset, leaving the reader to sense her relief and gratitude.',
            wrong: ['This shows that Mum is crying.', 'This is a quotation from the story.', 'Mum is sad because the family has no money.'],
            explain: 'The strongest explanation zooms in on how the words work and what they suggest. The last option misreads the line: it says the crying is not the bad kind.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Evidence: <em>“a bell that, she imagined, would sound like a small church”</em>. Which explanation is the strongest?',
            right: 'The simile links the bike to something special and almost sacred, showing how precious the bike has become in Losa’s imagination.',
            wrong: ['This is a simile because it uses “like”.', 'The bike has a bell.', 'Churches have bells, and so does the bike.'],
            explain: 'Naming the simile is not enough. The strongest answer says what the comparison suggests about Losa’s feelings.' })),
          rng => onText(BIKE, C(rng, { prompt: 'Evidence: <em>“counting nothing at all”</em>. Which explanation is the strongest?',
            right: 'The phrase echoes Losa counting her savings earlier; now she counts “nothing”, which suggests she has stopped measuring what she wants and let the wish go.',
            wrong: ['Losa is not counting anything.', 'This shows Losa cannot count.', 'This is a good ending because it is short.'],
            explain: 'Strong analysis notices how a detail connects to another part of the text, and what that connection means.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Evidence: <em>“It takes his footprints. Leaves me mine.”</em> Which explanation is the strongest?',
            right: 'The sea erases the grandfather’s footprints but leaves the speaker’s, suggesting that time moves on and the speaker must now make their own way.',
            wrong: ['The sea washes away footprints on a beach.', 'These are two short sentences.', 'The speaker is sad that the sea is coming in.'],
            explain: 'The literal event (footprints washed away) carries a bigger meaning about generations and growing up. Saying what happens is not analysis.' })),
          rng => onText(TIDE, C(rng, { prompt: 'Evidence: <em>“The sea comes back. It always does.”</em> Which explanation is the strongest?',
            right: 'The short, certain sentences present the tide as unstoppable, like time itself, which nobody can hold back.',
            wrong: ['The tide comes in twice a day.', 'There is a full stop in the middle of the line.', 'The poet likes the sea.'],
            explain: 'The strongest answer connects the form (short, certain sentences) to the meaning (time cannot be stopped).' })),
          rng => C(rng, { prompt: 'A student writes: <em>“This quotation shows that Losa is mature.”</em> What would make the explanation stronger?',
            right: 'Saying how particular words in the quotation show her maturity, and linking it to the thesis', wrong: ['Adding a second quotation straight after it', 'Retelling what happens next', 'Writing it in capital letters'],
            explain: 'A quotation only “shows” something once you explain how. Zoom in on the words.' })
        ]
      },

      // 7 · Put the paragraph in order.
      {
        name: 'Build the paragraph', learn: 'analyse',
        items: [
          rng => Sci.order(rng, 'Put this body paragraph in order.', [
            'The writer uses Sione’s silence to show that love can be expressed through actions rather than words.',
            'Sione “did not say much” but “put an envelope on the kitchen table”.',
            'Placing his silence next to this generous act lets the action speak for him.',
            'This supports the story’s message that the deepest care is often unspoken.'],
            'Point (topic sentence), evidence (quotation), explanation (how the words work), link (back to the thesis).'),
          rng => Sci.order(rng, 'Put this body paragraph in order.', [
            'The final image of the story shows how much Losa has changed.',
            'She walks past the shop “counting nothing at all”.',
            'This echoes her counting her savings earlier, so “nothing” shows she has let the wish go.',
            'Her quiet change shows that growing up can mean putting others first.'],
            'Point, evidence, explanation, link.'),
          rng => Sci.order(rng, 'Put this body paragraph in order.', [
            'The poet presents the grandfather as someone deeply connected to the shore.',
            'He knows “which stars mean wind, which clouds mean rain”.',
            'The repeated “which” builds a list of hard-won knowledge, as if he can read the sky like a book.',
            'This knowledge is what the speaker hopes to inherit, which is the heart of the poem.'],
            'Point, evidence, explanation, link.'),
          rng => Sci.order(rng, 'Put this essay outline in order.', [
            'Introduction: the text, the writer, and the thesis',
            'Body paragraph 1: the first idea that supports the thesis',
            'Body paragraph 2: a further idea, opened with a connective',
            'Conclusion: the thesis restated and a final insight'],
            'Introduction with thesis, then body paragraphs, then a conclusion.')
        ]
      },

      // 8 · Essay language.
      {
        name: 'Essay language', learn: 'style',
        items: [
          [['The writer presents Losa as a thoughtful girl.', 'She stops outside the shop “every afternoon for a month”.', 'I think this is really cool and I loved it.', 'Her patience makes her final choice more striking.'], 2, 'This is personal and informal. A literary essay stays formal and analyses rather than reacting.'],
          [['In “Low Tide”, the poet explores growing up.', 'The speaker follows the grandfather, “stepping in his prints”.', 'This image showed that the speaker wanted to be like him.', 'The poet links this to the idea of inheritance.'], 2, 'Line 3 slips into the past tense. Write about what happens in a text in the present tense: “This image shows …”.'],
          [['Mansfield’s stories often end without a clear resolution.', 'Katherine leaves her readers to decide what a moment means.', 'This open ending invites more than one reading.', 'It reflects her interest in small, ordinary moments.'], 1, 'Refer to an author by surname: “Mansfield leaves her readers …”, not by first name.'],
          [['The writer uses the bike as a symbol.', 'First Losa looks at the bike, then she counts her money, then her brother comes home, then Mum cries.', 'The bike stands for what Losa wants for herself.', 'Letting it go shows her growing up.'], 1, 'Line 2 retells the plot. Assume the reader knows the story, and analyse instead.'],
          [['The writer presents the family’s money worries indirectly.', 'Mum keeps the bills “under the sugar tin”.', 'This detail is heaps clever because it’s, like, hidden.', 'It suggests worries the family keeps out of sight.'], 2, 'Slang such as “heaps” and “like” does not suit an essay. Try: “This detail is effective because the worries are hidden.”'],
          [['The poem ends with a striking image.', 'The sea “takes his footprints” but “leaves me mine”.', 'The grandfather’s prints vanish while the speaker’s remain.', 'You can tell that the speaker will carry his knowledge forward.'], 3, 'Line 4 uses “you”. Keep to the third person: “This suggests that the speaker will carry his knowledge forward.”']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt: 'One sentence in this paragraph breaks the conventions of a literary essay.',
          lines, wrong, cue: 'Click the sentence that does not suit a literary essay.', explain: why
        }))
      },

      // 9 · Conclusions.
      {
        name: 'The conclusion', learn: 'conclusion',
        items: [
          rng => onText(BIKE, C(rng, { prompt: 'Which is the strongest conclusion for an essay arguing that “The Bike” shows growing up can mean putting your family first?',
            right: 'Through the symbol of the red bike and Sione’s silent gift, the writer shows that growing up is less about getting what we want than about seeing what others need.',
            wrong: ['In conclusion, that is my essay about “The Bike”.', 'In conclusion, Losa wants a bike, Sione gives Mum an envelope, and Losa walks past the shop.', 'Another important point is that the shop is called Henderson’s Cycles.'],
            explain: 'It restates the thesis in fresh words, gathers the main points, and ends with an insight. The others announce, retell, or add a new point.' })),
          rng => C(rng, { prompt: 'Which of these should a conclusion <strong>not</strong> do?',
            right: 'Bring in a new quotation for a new point', wrong: ['Restate the thesis in fresh words', 'Sum up the main points', 'Leave the reader with a final insight'],
            explain: 'New evidence belongs in a body paragraph. The conclusion pulls together what you have already shown.' }),
          rng => C(rng, { prompt: 'Why should a conclusion restate the thesis in <strong>fresh words</strong> rather than copy it?',
            right: 'Copying it word for word sounds repetitive; rephrasing shows how the essay has developed the idea.', wrong: ['Copying the thesis is not allowed in any essay.', 'The conclusion should argue the opposite.', 'Fresh words make the essay longer.'],
            explain: 'By the end, you have proved the thesis, so you can state it with more depth.' }),
          rng => onText(TIDE, C(rng, { prompt: 'Which is the strongest final sentence for an essay on “Low Tide”?',
            right: 'In the end, the poem suggests that we honour those before us not by standing in their footprints, but by learning to make our own.',
            wrong: ['That is why I liked the poem.', 'The poem has two stanzas and eight lines.', 'In conclusion, the poem is about a beach.'],
            explain: 'A strong ending leaves an insight about the text and what it says about life.' })),
          rng => C(rng, { prompt: 'A student’s conclusion begins: <em>“In conclusion, the poem is about a grandfather.”</em> What is the problem?',
            right: 'It summarises the subject instead of restating the argument.', wrong: ['It uses the word “conclusion”.', 'It mentions the grandfather.', 'It is in the present tense.'],
            explain: 'The conclusion should return to the thesis: what the poem shows, and how.' })
        ]
      },

      // 10 · True or false.
      {
        name: 'True or false', learn: 'shape',
        items: [
          rng => TF(rng, { statement: 'The thesis statement usually comes at the end of the introduction.', answer: true, learn: 'thesis', explain: 'The introduction leads up to it, and the body paragraphs then prove it.' }),
          rng => TF(rng, { statement: 'A good literary essay retells the plot in detail.', answer: false, learn: 'style', explain: 'Assume the reader knows the text. Analyse it instead.' }),
          rng => TF(rng, { statement: 'Each body paragraph should develop one main idea that supports the thesis.', answer: true, learn: 'shape', explain: 'One idea per paragraph keeps the argument clear.' }),
          rng => TF(rng, { statement: 'Literary essays are usually written in the present tense when describing what happens in a text.', answer: true, learn: 'style', explain: '“Losa walks past the shop”, not “walked”.' }),
          rng => TF(rng, { statement: 'Naming a technique, such as “this is a simile”, is enough analysis.', answer: false, learn: 'analyse', explain: 'You must explain what the technique suggests and how it affects the reader.' }),
          rng => TF(rng, { statement: 'A quotation should be in quotation marks and built into your own sentence.', answer: true, learn: 'embed', explain: 'That is called embedding the quotation.' }),
          rng => TF(rng, { statement: 'A conclusion is a good place to introduce a brand-new piece of evidence.', answer: false, learn: 'conclusion', explain: 'New evidence belongs in a body paragraph.' }),
          rng => TF(rng, { statement: 'A thesis should be something a reader could disagree with.', answer: true, learn: 'thesis', explain: 'If nobody could disagree, there is nothing to argue.' }),
          rng => TF(rng, { statement: 'In a literary essay, you should refer to the author by their first name.', answer: false, learn: 'style', explain: 'Use their surname, or “the writer”.' }),
          rng => TF(rng, { statement: 'Asking why a writer made a particular choice can help you analyse a text.', answer: true, learn: 'purpose', explain: 'Every detail in a well-crafted text is a choice with a purpose.' })
        ]
      }
    ]
  });

  // ═══ W16 Evidence and persuasion ══════════════════════════════════════════
  // Writing › Composition › Persuasive writing (Years 7–8). W13 teaches the
  // shape of a persuasive text; this exercise works on what fills it: claims
  // backed by specific evidence, explained, and the reader's worries answered.
  // The last question is free writing, checked by the student against a list.
  // Extension: claim only what you can prove.
  // Year 9 challenge: ethos, pathos and logos; how reliable evidence is;
  // answering the strongest objection; explaining evidence; a rebuttal
  // paragraph written in full.

  Sci.topic({
    id: 'ew16', unit: 'writing',
    title: 'Evidence and Persuasion',
    blurb: 'A reason only persuades once it is proved. Back up every claim, explain it, and answer the reader’s worries.',
    hint: 'A claim is what you want the reader to believe; evidence is what makes it believable. Make evidence specific (a number, an example, an expert, ' +
          'your own experience), explain how it proves the point, and answer the reader’s strongest worry instead of ignoring it.',

    learn: [
      { id: 'claim', title: 'Claim and evidence',
        text: '<p>A <strong>claim</strong> is what you want the reader to believe: <em>Gymnastics builds strength.</em></p>' +
              '<p><strong>Evidence</strong> is what makes it believable: <em>After six months, I could do ten chin-ups instead of two.</em></p>' +
              '<p>Repeating the claim in stronger words is not evidence.</p>' },
      { id: 'kinds', title: 'Kinds of evidence',
        text: Sci.table(['Kind', 'Sounds like'], [['fact or number', '22 of 28 students said …'], ['expert', 'Our coach of fifteen years says …'],
                ['experience', 'When I started, I could not …'], ['example', 'For example, the school down the road …']]) },
      { id: 'specific', title: 'Be specific',
        text: '<p>Vague evidence only repeats the point. Specific evidence proves it.</p>' +
              '<p>Vague: <em>You learn lots of life lessons.</em></p>' +
              '<p>Specific: <em>I fell off the beam fifty times before I landed my first cartwheel on it.</em></p>' },
      { id: 'pee', title: 'Point, evidence, explain, link', wide: true,
        text: '<ol class="learn-steps"><li><strong>Point:</strong> one reason, in one sentence</li><li><strong>Evidence:</strong> the specific proof</li>' +
              '<li><strong>Explain:</strong> how the proof supports the point. <em>This shows that …</em> is only a start: say <em>how</em>.</li>' +
              '<li><strong>Link:</strong> tie it back to what you want the reader to do or believe</li></ol>' +
              '<p>Three reasons proved like this persuade more than six reasons listed.</p>' },
      { id: 'other', title: 'Answer the worry',
        text: '<p>Your reader already has doubts. Name the worry fairly, admit what is true in it, then answer it:</p>' +
              '<p><em>Some parents worry that gymnastics is dangerous. It is true that falls happen. However, beginners train on thick mats, with a coach beside them.</em></p>' },
      { id: 'reader', title: 'Know your reader',
        text: '<p>Ask: who will read this, and what do <em>they</em> care about?</p>' +
              '<ul><li>Parents: safety, cost, their child’s happiness</li><li>A principal: supervision, cost, learning</li><li>Friends: fun, who else is going</li></ul>' +
              '<p>Choose reasons and words that suit that reader.</p>' },
      { id: 'overclaim', title: 'Extension: claim only what you can prove',
        text: '<p>Words like <em>always, never, every, everything</em> make a claim impossible to prove, and a reader who finds one exception stops trusting you.</p>' +
              '<p><em>Most, many, often, can</em> make claims you can back up.</p>' },
      { id: 'appeals', title: 'Ethos, pathos and logos', years: '9', wide: true,
        text: Sci.table(['Appeal', 'Persuades through', 'Example'], [
                ['<strong>Ethos</strong>', 'trust in the speaker’s knowledge or character', '<em>As a coach for twenty years, I have seen …</em>'],
                ['<strong>Pathos</strong>', 'the reader’s feelings', '<em>Imagine your child’s face the first time they stick a landing.</em>'],
                ['<strong>Logos</strong>', 'reasons, facts and logic', '<em>A full year of lessons costs less than one school trip.</em>']]) +
              '<p>Strong arguments use all three, but logos carries the weight: feelings and trust without reasons do not last.</p>' },
      { id: 'reliable', title: 'How reliable is the evidence?', years: '9', wide: true,
        text: '<p>Before you use evidence, test it with three questions:</p>' +
              '<ul><li><strong>Who</strong> produced it, and do they know the field?</li><li><strong>How</strong> did they find it out: one story, or many cases measured carefully?</li>' +
              '<li><strong>Do they gain</strong> if you believe it? A seller praising their own product may be biased.</li></ul>' +
              '<p>One case (<em>my cousin broke her arm</em>) cannot show how common something is.</p>' },
      { id: 'strongest', title: 'Answer the strongest objection', years: '9', wide: true,
        text: '<p>Answer the best version of the other side, in words its supporters would accept. Twisting it into something silly and knocking that down is a ' +
              '<strong>straw man</strong>, and it convinces nobody.</p>' +
              '<p>Straw man: <em>People against the skate park want teenagers to sit at home all day.</em></p>' +
              '<p>Fair: <em>Some residents worry that a skate park would be noisy at night.</em></p>' }
    ],

    examples: [
      {
        title: 'Example 1: one reason, proved',
        steps: ['<strong>Point:</strong> <em>Gymnastics builds strength that helps in every other sport.</em>',
                '<strong>Evidence:</strong> <em>After a year of training, I could climb the rope in PE without using my legs.</em>',
                '<strong>Explain:</strong> <em>That strength comes from holding my own body weight on the bars and rings every week.</em>',
                '<strong>Link:</strong> <em>A child who starts in gymnastics is ready for whatever sport comes next.</em>']
      },
      {
        title: 'Example 2: answering the worry',
        steps: ['<strong>Name it:</strong> <em>Some parents worry that gymnastics is dangerous.</em>',
                '<strong>Admit what is true:</strong> <em>It is true that falls happen.</em>',
                '<strong>Answer it:</strong> <em>However, beginners train on thick mats, and a coach spots every new skill.</em>',
                'Taking the worry seriously makes the writer more believable, not less.']
      }
    ],

    slots: [
      { name: 'Claim or evidence?', learn: 'claim',
        items: [rng => Sci.sort(rng, { prompt: 'Is each sentence a claim or evidence?', bins: ['Claim', 'Evidence'],
          items: [
            { text: 'Gymnastics is one of the best sports for young children.', bin: 0 },
            { text: 'Our school should open the pool at lunchtime.', bin: 0 },
            { text: 'Swimming lessons should be free for every child.', bin: 0 },
            { text: 'Learning a musical instrument makes you a better learner.', bin: 0 },
            { text: 'Every school should have a vegetable garden.', bin: 0 },
            { text: 'In our class survey, 22 of 28 students said they would swim at lunch if they could.', bin: 1 },
            { text: 'Last term, our garden club grew 40 kilograms of vegetables for the canteen.', bin: 1 },
            { text: 'After a year of gymnastics, I could hold a handstand for thirty seconds.', bin: 1 },
            { text: 'Our coach, who has taught for fifteen years, says most injuries happen when warm-ups are skipped.', bin: 1 },
            { text: 'A child’s entry to the local pool costs $6, so a family of three pays $18 a visit.', bin: 1 }
          ], pick: 6,
          explain: 'A claim is what the writer wants you to believe. Evidence is a fact, number, example, expert view or experience that makes a claim believable.' })] },

      { name: 'The strongest evidence', learn: 'specific',
        items: [
          ['Gymnastics builds strength.', 'After six months of training, I could do ten chin-ups instead of two.',
           ['Gymnastics is really, really good for you.', 'Lots of people do gymnastics.', 'Gymnastics is my favourite sport.'],
           'It shows a specific, measurable change. The others repeat the opinion, give a fact about popularity that says nothing about strength, or state a preference.'],
          ['The library should open before school.', 'Twenty students already wait outside the library doors every morning before 8.30.',
           ['Libraries are important places.', 'I think the library should definitely open earlier.', 'The library has more than 5,000 books.'],
           'It shows that students would use it. The others are vague, repeat the claim more strongly, or give a fact that does not bear on opening times.'],
          ['Our class should go to camp this year.', 'Last year’s class said camp was where they made friends outside their usual group, and 25 of 27 wanted to go again.',
           ['Camp is awesome.', 'Camps usually have bunk beds.', 'We really, really want to go to camp.'],
           'It gives a specific benefit and a number. The others are an opinion, an irrelevant fact and the claim said louder.'],
          ['Young players should try more than one sport.', 'Our netball coach noticed that players who also did athletics were quicker to the ball.',
           ['Sport is good for you.', 'There are hundreds of sports in the world.', 'I play three sports and I love all of them.'],
           'It is an observation from someone who watches players closely, and it links a second sport to a real improvement. Loving your sports is a feeling, not proof.'],
          ['Phones should stay in bags during class.', 'In the week our class kept phones in bags, our teacher counted half as many interruptions.',
           ['Phones are distracting, and that is a fact.', 'Most phones have cameras.', 'I find phones annoying.'],
           'It measures what changed. Calling something a fact does not make it evidence.'],
          ['Swimming lessons should be part of every school year.', 'In a check last term, 9 of our 28 Year 7 students could not swim 25 metres.',
           ['Swimming is fun in summer.', 'Everyone should learn to swim because it matters.', 'Our local pool has a hydroslide.'],
           'It shows the need with a number. The others are a feeling, the claim repeated and an irrelevant fact.']
        ].map(([claim, right, wrong, why]) => rng => C(rng, { prompt: `Which sentence is the best evidence for this claim? <em>${claim}</em>`, right, wrong, explain: why })) },

      { name: 'Vague or specific?', learn: 'specific',
        items: [
          ['gymnastics teaches you to keep going', 'I fell off the beam more than fifty times before I landed my first cartwheel on it.',
           ['Gymnastics teaches you lots of life lessons.', 'You learn things in gymnastics that help you in life.', 'Gymnastics teaches you stuff like never giving up and that.']],
          ['the playground is unsafe', 'Two students sprained their ankles last month on the cracked asphalt beside the bike shed.',
           ['The playground has some problems.', 'The playground is really not safe at all.', 'Some things about the playground could be better.']],
          ['the club makes new members welcome', 'On my first night, an older gymnast showed me where to put my bag and partnered me for the warm-up.',
           ['The club is a friendly place to be.', 'Everyone at the club is really nice.', 'The club has a great community.']],
          ['canteen food costs too much', 'A sandwich at the canteen costs $7.50, but the same sandwich costs $4 at the dairy across the road.',
           ['Canteen food costs a lot.', 'The canteen is way too expensive.', 'Prices at the canteen are quite high, honestly.']],
          ['reading helps your writing', 'After reading twelve novels last term, I started writing dialogue the way real authors do.',
           ['Reading is good for your writing.', 'Reading helps with lots of things.', 'People who read a lot are better at writing.']],
          ['the bus is unreliable', 'This term, the 7.45 bus has been more than ten minutes late on eight mornings.',
           ['The bus is always late.', 'The bus is unreliable.', 'The bus has a lot of problems with time.']]
        ].map(([point, right, wrong]) => rng => C(rng, { prompt: `A writer wants to show that <strong>${point}</strong>. Which sentence proves it best?`, right, wrong,
          explain: 'Specific details (numbers, names, real moments) give the reader something to believe. The vague versions only say the point again.' })) },

      { name: 'What kind of evidence?', learn: 'kinds',
        items: [Sci.gen(rng => {
          const pool = [
            ['A fact or number', ['Our pool is open 70 hours a week, but students can use it for only 3 of them.', 'Nine out of ten families in our survey said sport fees had gone up this year.']],
            ['An expert’s view', ['Our school nurse says most playground injuries happen on the hard courts.', 'A physiotherapist told our class that stretching after sport reduces soreness.']],
            ['A personal experience', ['When I started gymnastics, I could not touch my toes; now I can do the splits.', 'On my first club night I was nervous, until the coach learned my name.']],
            ['An example', ['For example, the school down the road turned its old tennis court into a garden.', 'Take the Year 8 market day, where students ran stalls and kept a budget.']]
          ];
          return Sci.match(rng, 'Match each piece of evidence to its kind.', pool.map(([kind, lines]) => [rng.pick(lines), kind]),
            'Facts and numbers can be checked; an expert knows the field; personal experience is your own story; an example is one particular case that stands for the point.');
        })] },

      { name: 'Build the paragraph', learn: 'pee',
        items: [
          ['Gymnastics builds strength that helps in every other sport.', 'After a year of training, I could climb the rope in PE without using my legs.',
           'That strength comes from holding my own body weight on the bars and rings every week.', 'A child who starts in gymnastics is ready for whatever sport comes next.'],
          ['Our school should open the pool at lunchtime.', 'In our class survey, 22 of 28 students said they would swim at lunch if they could.',
           'That many swimmers shows the pool would be used, not wasted.', 'Opening it at lunch would turn an empty pool into a busy one.'],
          ['A school garden would help students eat better.', 'At the school down the road, students who worked in the garden began eating its vegetables at lunch.',
           'Growing food makes it familiar, and familiar food is food you are willing to try.', 'Our students deserve the same chance.'],
          ['Walking to school gives students a healthy start to the day.', 'For most of our class, the walk to school takes about fifteen minutes.',
           'Fifteen minutes each way adds up to half an hour of exercise, without a single training session.', 'That is a habit worth encouraging.'],
          ['Learning an instrument teaches you to keep going.', 'It took me three months of daily practice before I could play a whole song on the guitar.',
           'Those months taught me that small, steady practice gets results, and that helps in every subject.', 'Every student deserves the chance to learn one.']
        ].map(seq => rng => Sci.order(rng, 'Put the sentences of this persuasive paragraph in order.', seq,
          'Point, evidence, explain, link: say it, prove it, show how the proof supports it, then tie it back to the argument.')) },

      { name: 'Spot the unsupported claim', learn: 'claim',
        items: [
          [['Gymnastics is a great first sport for young children.', 'In one session, children practise balance on the beam, strength on the bars and flexibility on the floor.',
            'Gymnastics also makes children better at maths.', 'Beginners start with rolls and simple balances, on soft mats.',
            'At our club, coaches add a new skill only once the one before it is safe.'], 2,
           'Every other sentence gives a detail that supports the opening claim. The claim about maths is a big new idea with nothing behind it: prove it or cut it.'],
          [['Our school should open the library at lunchtime.', 'At the moment, it closes at 12.30 every day.',
            'In our survey, 31 students said they had nowhere quiet to read at lunch.', 'A lunchtime library would end bullying at our school.',
            'Two parent volunteers have already offered to help supervise.'], 3,
           'Ending bullying is a huge claim, and nothing in the paragraph supports it. The other sentences are specific facts about the library.'],
          [['Swimming lessons should be part of every school year.', 'In a check last term, 9 of our 28 Year 7 students could not swim 25 metres.',
            'Lessons at the local pool cost the school $4 per student per session.', 'Ten sessions would cost each student $40 for the whole year.',
            'Swimming is the most important skill anyone can ever learn.'], 4,
           '“The most important skill anyone can ever learn” is an overclaim with no evidence. The rest of the paragraph is built on checkable numbers.'],
          [['Our class should look after a class pet.', 'Pets stop students from ever feeling stressed.',
            'Room 12 kept guinea pigs last year, and students took turns feeding them every day.', 'Their teacher says the feeding roster never missed a day.',
            'A guinea pig costs about $40 and lives happily in a classroom cage.'], 1,
           'The paragraph proves that a class can care for a pet reliably. Nothing in it supports the claim about stress, and “ever” makes it impossible to prove.'],
          [['Our town needs a skate park.', 'Right now, skaters use the supermarket car park, where cars come and go.',
            'Last month, a petition for a skate park collected 600 signatures.', 'The council has a spare corner of the sports ground beside the courts.',
            'A skate park would make our town famous.'], 4,
           'Fame is a new claim with no evidence. The other sentences give the need, the support and a place to build it.']
        ].map(([lines, wrong, why]) => rng => Sci.spot(rng, {
          prompt: 'One sentence in this paragraph makes a claim that nothing backs up. Which one?',
          lines, wrong, find: true, cue: 'Click the claim with no evidence behind it.', explain: why })) },

      { name: 'Answer the worry', learn: 'other',
        items: [Sci.gen(rng => {
          const pool = [
            ['Gymnastics looks dangerous.', 'Beginners train on thick mats, and a coach spots every new skill.'],
            ['School camp costs too much.', 'The school fundraises every year and helps families who need it.'],
            ['Club training takes up too many evenings.', 'Beginner classes run for one hour, once a week.'],
            ['A school garden would be too much work.', 'A roster across all classes needs only twenty minutes a week from each.'],
            ['Walking to school alone is not safe.', 'Children can walk in groups along a route with crossing patrols.'],
            ['Learning an instrument is too expensive.', 'The school lends instruments to beginners for free.']
          ];
          return Sci.match(rng, 'Match each worry to the answer that deals with it.', rng.sample(pool, 4),
            'A good answer takes the worry seriously and gives a specific fact that shrinks it.');
        })] },

      { name: 'Know your reader', learn: 'reader',
        items: [
          ['You are persuading <strong>parents</strong> to enrol their child in a gymnastics club.',
           'Your child will be coached in small groups, on safe equipment, by qualified coaches.',
           ['Gymnastics is so fun, you have to try it, bro.', 'Parents never understand how cool gymnastics is.', 'Gymnastics has the best flips of any sport.'],
           'Parents care about safety and good teaching, and the sentence speaks to both in a respectful tone.'],
          ['You are persuading your <strong>principal</strong> to open the pool at lunchtime.',
           'Opening the pool at lunch would need one supervising teacher, and two have already volunteered.',
           ['The pool is sitting there doing nothing, which is honestly ridiculous.', 'Everyone wants the pool open, so just open it.', 'Swimming at lunch would be epic.'],
           'A principal’s first question is who would supervise. The sentence answers it, politely.'],
          ['You are persuading <strong>classmates</strong> to join the kapa haka group.',
           'Practice is on Thursdays at lunch, and you will learn your first waiata in week one.',
           ['Group performance is associated with improved wellbeing in adolescents.', 'Parents, please support your children to join.', 'The board of trustees values cultural participation.'],
           'Classmates want to know when it is and what they will do. The others are written for researchers, parents or the board.'],
          ['You are persuading the <strong>town council</strong> to build a skate park.',
           'A skate park would give young people a safe place to skate, away from the supermarket car park.',
           ['Skating is sick and everyone knows it.', 'If you don’t build it, you’re just old and boring.', 'I want somewhere to do kickflips.'],
           'A council cares about safety and the whole town, and expects a respectful tone.'],
          ['You are persuading <strong>Year 4 students</strong> to join a lunchtime reading club.',
           'Every week we read a funny book together, and there are snacks!',
           ['Literacy outcomes improve markedly with regular sustained reading.', 'Teachers should ensure that students attend.', 'Reading clubs are associated with achievement gains.'],
           'Younger children respond to fun, in simple words. The others are written for adults.']
        ].map(([task, right, wrong, why]) => rng => C(rng, { prompt: `${task} Which sentence suits this reader best?`, right, wrong,
          explain: why + ' Persuasion works when it speaks to what this reader cares about, in language that suits them.' })) },

      { name: 'True or false', learn: 'claim',
        items: [
          rng => TF(rng, { statement: 'Evidence is the part of an argument that makes a claim believable.', answer: true, learn: 'claim', explain: 'Without it, a claim is only an opinion.' }),
          rng => TF(rng, { statement: 'Repeating your claim in stronger words counts as evidence.', answer: false, learn: 'claim', explain: '“It is really, really good” is still only the claim.' }),
          rng => TF(rng, { statement: 'Your own experience can be evidence, if it is specific.', answer: true, learn: 'kinds', explain: 'A real moment, a number or a change you noticed can prove a point.' }),
          rng => TF(rng, { statement: 'A strong persuasive piece never mentions what the other side thinks.', answer: false, learn: 'other', explain: 'Answering the reader’s worries makes the argument stronger.' }),
          rng => TF(rng, { statement: 'After giving evidence, you should explain how it supports your point.', answer: true, learn: 'pee', explain: 'Evidence does not always speak for itself; the explanation connects it to the point.' }),
          rng => TF(rng, { statement: 'The more reasons you list, the more persuasive your writing is.', answer: false, learn: 'pee', explain: 'Three reasons, each proved and explained, beat six bare ones.' })
        ] },

      { name: 'Extension: claim only what you can prove', learn: 'overclaim', challenge: 'also',
        items: [
          ['Gymnastics builds strength in the arms, legs and core.', ['Gymnastics gives you everything you could ever need.', 'Gymnastics is the best sport in the entire world.', 'Every child who does gymnastics becomes a champion.']],
          ['Most students in our survey wanted a longer lunch.', ['Every single student wants a longer lunch.', 'A longer lunch would solve all of the school’s problems.', 'Nobody has ever liked short lunches.']],
          ['Regular swimming can improve your fitness.', ['Swimming will keep you healthy forever.', 'Swimming is always better than any other exercise.', 'Everyone who swims is fit.']],
          ['Many players find that a second sport improves their balance.', ['Playing two sports guarantees you will turn professional.', 'Nobody who plays only one sport ever improves.', 'A second sport fixes every weakness.']],
          ['Learning an instrument can help you concentrate.', ['Learning an instrument makes you a genius.', 'Musicians never lose concentration.', 'Every musician gets top marks at school.']]
        ].map(([right, wrong]) => rng => C(rng, { tag: EXT, prompt: 'Which claim could a writer actually back up?', right, wrong,
          explain: 'Words such as always, never, every, everything and nobody make a claim impossible to prove. Can, many and most make claims you can support, and a careful claim makes you more believable.' })) },

      { name: 'Write it: prove one reason', learn: 'pee',
        items: [
          rng => Sci.write(rng, {
            key: 'w16-reason', title: 'W16 Write it: one reason, for parents', minWords: 50,
            prompt: '<strong>Write a persuasive paragraph for parents.</strong> Give <em>one</em> reason why children should take up gymnastics, or another sport you know well. Use point, evidence, explain, link.',
            hints: ['Pick the reason you can prove best. Your own experience counts as evidence if it is specific: a number, a moment, a change you noticed.',
                    'Write four sentences: the point, the evidence, how the evidence proves the point, and a link back to the parent’s decision.'],
            checklist: ['My first sentence states one clear reason.', 'I give <strong>specific</strong> evidence: a number, an example, an expert or my own experience.',
                        'I explain <em>how</em> the evidence proves the point.', 'My last sentence links back to the parent’s decision.',
                        'Every sentence ends with a full stop, not a comma.'],
            model: '<p>Gymnastics teaches children to keep trying when something is hard. When I began on the beam, I fell off more than fifty times before I landed my first cartwheel on it. ' +
                   'Each fall taught me to adjust a little, and my coaches cheered the attempts as loudly as the successes. A child who learns that lesson in the gym carries it into the classroom, ' +
                   'which makes gymnastics worth far more than the cost of a leotard.</p>',
            explain: 'Read your paragraph aloud once. Wherever you run out of breath, or the sense runs on, you probably need a full stop.' }),
          rng => Sci.write(rng, {
            key: 'w16-worry', title: 'W16 Write it: answering a worry', minWords: 50,
            prompt: '<strong>Write a paragraph that answers a parent’s worry</strong> about a sport or activity you know well: that it is dangerous, too expensive, or takes too much time. Name the worry fairly, then answer it.',
            hints: ['Start by naming the worry the way a sensible parent would put it: “Some parents worry that …”.',
                    'Admit what is true in the worry, then answer it with something specific: how the risk is managed, what it really costs, how long it really takes.'],
            checklist: ['I name the worry fairly, without mocking it.', 'I admit what is true in it.', 'I answer it with a specific fact, example or experience.',
                        'My last sentence links back to why the activity is still worth it.', 'Every sentence ends with a full stop, not a comma.'],
            model: '<p>Some parents worry that gymnastics is dangerous, and it is true that falls happen. However, beginners train on thick mats, and a coach stands beside them for every new skill. ' +
                   'Skills are learned in small steps, so a child learns to roll long before they learn to flip. In three years at my club, the worst injury I have seen was a sprained wrist, which healed in a fortnight. ' +
                   'With that much care, gymnastics is safer than most parents expect.</p>',
            explain: 'Check that you answered the worry with a fact, not with “it’s fine, trust me”.' }),
          rng => Sci.write(rng, {
            key: 'w16-principal', title: 'W16 Write it: a proposal to the principal', minWords: 50,
            prompt: '<strong>Write a persuasive paragraph to your principal.</strong> Give one reason the school should offer a new lunchtime activity of your choice: a club, a sport or a space. Use point, evidence, explain, link.',
            hints: ['Think about what a principal worries about: supervision, cost and safety. Your evidence should help with at least one of these.',
                    'A small survey of your class, or something you have seen happen at lunch, makes good evidence.'],
            checklist: ['My first sentence states one clear reason.', 'I give <strong>specific</strong> evidence, such as a number or something I have seen.',
                        'I explain how the evidence proves the point.', 'My tone is polite and suits a principal.', 'Every sentence ends with a full stop, not a comma.'],
            model: '<p>The school should open the gym at lunchtime for a climbing club. At the moment, more than thirty students sit on the steps outside the gym every lunchtime with nothing to do. ' +
                   'When Room 9 ran a trial climbing session last term, twenty of them came, and the duty teacher reported no behaviour problems at all. ' +
                   'A climbing club would turn bored students into busy ones, and it would cost the school only one teacher’s lunchtime a week.</p>',
            explain: 'Check your tone: would you be comfortable reading this aloud in the principal’s office?' }),
          rng => Sci.write(rng, {
            key: 'w16-friend', title: 'W16 Write it: two reasons, for a friend', minWords: 80, rows: 10,
            prompt: '<strong>Write two paragraphs for a friend</strong> who is choosing a sport: convince them to try yours. Give two reasons, one per paragraph, each with specific evidence.',
            hints: ['Choose the two reasons your friend would care about most, and the evidence for each, before you start writing.',
                    'Start the second paragraph with a word that signals a new reason: “Second”, “Also” or “Best of all”.'],
            checklist: ['I write two paragraphs, one reason in each.', 'Each reason has <strong>specific</strong> evidence.', 'I explain how each piece of evidence proves the reason.',
                        'My tone suits a friend.', 'I finish by telling my friend what to do.'],
            model: '<p>You should try touch rugby with me this summer. First, it is easy to start: there is no tackling, so all you need is a pair of shoes, and our Thursday team still has two spots. ' +
                   'In my first game I scored a try, even though I had never played before.</p>' +
                   '<p>Second, it gets you fit without feeling like training. We run for forty minutes a game, but because you are chasing the ball, you barely notice. ' +
                   'By the end of last season I could run the school cross-country without stopping. Come along on Thursday and see for yourself.</p>',
            explain: 'Check that each paragraph does one job: one reason, proved.' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      {
        name: 'Year 9: ethos, pathos, logos', learn: 'appeals', challenge: 'only',
        items: [rng => Sci.sort(rng, { prompt: 'Which appeal does each sentence mainly use?', bins: ['Ethos', 'Pathos', 'Logos'],
          items: [
            { text: 'As a coach for twenty years, I have seen what early training can do.', bin: 0 },
            { text: 'Speaking as a surf lifeguard, I can tell you that floating saves lives.', bin: 0 },
            { text: 'Our school nurse, who treats every playground injury, supports this change.', bin: 0 },
            { text: 'Imagine your child’s face the first time they stick a landing.', bin: 1 },
            { text: 'No child should feel left out because their family cannot afford the fees.', bin: 1 },
            { text: 'Picture the empty pool glittering in the sun while students swelter on the field.', bin: 1 },
            { text: 'The pool is open seventy hours a week, but students can use only three of them.', bin: 2 },
            { text: 'Lessons cost $4 a session, so a full year costs less than one school trip.', bin: 2 },
            { text: 'Fewer cars at the gate would mean less traffic, and so fewer near misses.', bin: 2 }
          ], pick: 6,
          explain: 'Ethos builds trust in the speaker; pathos stirs the reader’s feelings; logos gives reasons, facts and logic.' })]
      },

      {
        name: 'Year 9: how reliable is it?', learn: 'reliable', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which evidence is most reliable for the claim that a later school start improves concentration?',
            right: 'A study that compared students’ test results before and after their schools changed start times.',
            wrong: ['A post online from someone who says they feel sleepy in the mornings.', 'An energy drink advert that says students are always tired.', 'A friend who says “everyone knows” teenagers are sleepy.'],
            explain: 'The study measures many students carefully, and its authors gain nothing from the answer. The others are one person, a biased seller and a rumour.' }),
          rng => C(rng, { prompt: 'Why is this weak evidence? <em>“My cousin did gymnastics and broke her arm, so gymnastics is too dangerous.”</em>',
            right: 'One case cannot show how common injuries are across all gymnasts.',
            wrong: ['It is too short.', 'It uses an example.', 'It mentions a relative.'],
            explain: 'A single story can be true and still mislead. To judge how dangerous a sport is, you need many cases, counted.' }),
          rng => C(rng, { prompt: 'A website that sells trampolines says trampolining is the safest sport. Why should a reader be cautious?',
            right: 'The seller gains if readers believe it, so the claim may be biased.',
            wrong: ['Websites are never correct.', 'Trampolining is not a real sport.', 'The claim is too short to be true.'],
            explain: 'Ask whether the source gains from the claim. That does not prove it false, but it is a reason to look for an independent source.' }),
          rng => C(rng, { prompt: 'Which evidence would best support the claim that the town needs a skate park?',
            right: 'Council records of how many complaints about skaters in the supermarket car park were made this year.',
            wrong: ['A skater’s opinion that skating is the best sport.', 'A photo of a skate park in another country.', 'A list of famous skaters.'],
            explain: 'Official records show the size of the problem a skate park would solve. The others show enthusiasm, not need.' }),
          rng => C(rng, { prompt: 'Which questions best test whether evidence is reliable?',
            right: 'Who produced it, how did they find it out, and do they gain from it?',
            wrong: ['Is it written in a nice font?', 'Does it agree with what I already think?', 'Was it the first result in my search?'],
            explain: 'Who, how and who gains: these test the source, not how convenient the evidence is.' })
        ]
      },

      {
        name: 'Year 9: the strongest objection', learn: 'strongest', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'A writer argues for a later school start. Which version of the opposing view should they answer?',
            right: 'A later start would push after-school sport and part-time jobs later into the evening.',
            wrong: ['Opponents just want students to suffer.', 'Some people hate change for no reason.', 'Critics have obviously never been teenagers.'],
            explain: 'It is the fairest and strongest form of the objection. The others insult opponents, so answering them proves nothing.' }),
          rng => C(rng, { prompt: 'Which sentence is a <strong>straw man</strong>?',
            right: 'People who oppose the skate park think young people should sit at home all day.',
            wrong: ['Some residents worry that the skate park would be noisy at night.', 'It is true that a skate park would cost money to build.', 'Critics point out that the proposed site floods in winter.'],
            explain: 'It twists the other side into something nobody actually believes. The others state real concerns fairly.' }),
          rng => C(rng, { prompt: 'A writer argues that children should start gymnastics young. Which objection is the strongest one to answer?',
            right: 'Heavy training at a young age can cause overuse injuries if it is not managed carefully.',
            wrong: ['Leotards come in ugly colours.', 'Some people just do not like gymnastics.', 'Gymnastics is not on TV very often.'],
            explain: 'It is a serious concern a careful parent might raise. Answering it, for example by describing how beginner training is limited, builds trust.' }),
          rng => C(rng, { prompt: 'What makes a rebuttal convincing?',
            right: 'It concedes what is true in the objection, then answers it with evidence.',
            wrong: ['It ignores the objection and repeats the thesis more loudly.', 'It attacks the people who disagree.', 'It says the objection is not worth discussing.'],
            explain: 'Conceding shows you are fair; evidence shows you are right.' })
        ]
      },

      {
        name: 'Year 9: explaining the evidence', learn: 'pee', challenge: 'only',
        items: [
          ['Gymnastics teaches persistence.', 'I fell off the beam more than fifty times before I landed a cartwheel on it.',
           'Each fall was a small failure to recover from, so the skill was built out of fifty decisions to keep going.',
           ['This shows that gymnastics teaches persistence.', 'The beam is only ten centimetres wide.', 'Falling off the beam hurts.']],
          ['The library should open at lunch.', 'In our survey, 31 students said they had nowhere quiet to read at lunch.',
           'Thirty-one students is more than a full class, so a lunchtime library would be used, not wasted.',
           ['This proves that the library should open.', 'Surveys are a kind of research.', 'Libraries are quiet places.']],
          ['Walking to school builds fitness.', 'For most of our class, the walk to school takes about fifteen minutes each way.',
           'Thirty minutes a day, five days a week, adds up to two and a half hours of exercise without a single training session.',
           ['So walking is good for you.', 'Fifteen minutes is a quarter of an hour.', 'Some students ride bikes instead.']],
          ['Swimming lessons are affordable.', 'Lessons at the local pool cost $4 per student per session.',
           'Ten sessions would cost $40 a student, less than a single school trip, so the cost is no barrier.',
           ['That is why lessons are affordable.', 'Four dollars is a lot for some people.', 'Swimming pools are expensive to heat.']]
        ].map(([point, ev, right, wrong]) => rng => C(rng, {
          prompt: `<strong>Point:</strong> <em>${point}</em> <strong>Evidence:</strong> <em>${ev}</em> Which sentence best explains how the evidence proves the point?`, right, wrong,
          explain: '“This shows that …” followed by the point only repeats it. A real explanation says <em>how</em> the evidence leads to the point.' }))
      },

      {
        name: 'Year 9: write a rebuttal', learn: 'strongest', challenge: 'only',
        items: [
          rng => Sci.write(rng, {
            key: 'w16-y9-rebut', title: 'W16 Year 9 Write it: rebutting the strongest objection', minWords: 70, rows: 9,
            prompt: '<strong>Choose an issue you care about.</strong> Write a paragraph that answers the <em>strongest</em> objection to your view: name it fairly, concede what is true, counter it with evidence, and link back to your position.',
            hints: ['Write down the objection a sensible opponent would make. If you could answer it in one breath, it is probably not the strongest one.',
                    'Use the four moves: name it, concede (“It is true that …”), counter (“However, …”) and link (“So, …”).'],
            checklist: ['I answer the <strong>strongest</strong> objection, not a weak or twisted one.', 'I state it in words its supporters would accept.',
                        'I concede what is true in it.', 'I counter it with specific evidence, and explain how the evidence answers it.', 'My last sentence links back to my position.'],
            model: '<p>The strongest objection to a later school start is that it would push after-school sport and part-time jobs later into the evening. ' +
                   'It is true that winter trainings could finish after dark, and that some students rely on work after school. ' +
                   'However, a school that moves its start by thirty minutes can move its whole day by the same amount, so trainings would shift by half an hour, not more. ' +
                   'Players who sleep enough also tend to learn skills faster and recover better. A later start, then, would not cost students their sport or their jobs; it would help them do both well.</p>',
            explain: 'Read the objection as your opponent would. Would they say you described their view fairly?' })
        ]
      }
    ]
  });


  // ═══ W17 Show, don't tell ═════════════════════════════════════════════════
  // Writing › Composition › Descriptive writing (Years 7–8): precise verbs,
  // sensory detail, fitting comparisons, cutting empty words, and slowing a
  // movement down so the reader can see it. W12 chooses between words; this
  // exercise builds whole descriptions. The last question is free writing.
  // Extension: sentence length and pace.
  // Year 9 challenge: naming devices, what an image suggests, the telling
  // detail, keeping an image consistent, and an extended metaphor written
  // in full.

  Sci.topic({
    id: 'ew17', unit: 'writing',
    title: 'Show, Don’t Tell',
    blurb: 'Description that lets the reader see, hear and feel the moment, instead of being told about it.',
    hint: 'Telling names a feeling or quality; showing gives the details that prove it. Use strong verbs, details from several senses, comparisons that fit, ' +
          'and cut empty words such as amazing, very and kind of. Slow a movement down, one stage at a time.',

    learn: [
      { id: 'show', title: 'Show, don’t tell', wide: true,
        text: '<p><strong>Telling</strong> names the feeling or quality. <strong>Showing</strong> gives the details, and lets the reader work it out.</p>' +
              Sci.table(['Telling', 'Showing'], [['Ana was nervous.', 'Ana retied her laces three times and could not keep still on the line.'],
                ['The gym was noisy.', 'Coaches shouted over the thud of landings and the squeak of shoes.'],
                ['The giant is amazing.', 'At the top, she passes through a handstand, still for a heartbeat, above the bar.']]) },
      { id: 'verbs', title: 'Strong verbs',
        text: '<p>One precise verb beats a weak verb with an adverb.</p>' +
              Sci.table(['Weak', 'Strong'], [['ran quickly', 'sprinted, raced'], ['went round', 'swung, whipped, circled'], ['fell down', 'crashed, collapsed, slumped'], ['said loudly', 'shouted, bellowed']]) },
      { id: 'senses', title: 'Use the senses',
        text: '<p>Sight is only one sense. Add what the reader would:</p><ul><li><strong>hear:</strong> the thud of a landing</li><li><strong>touch:</strong> chalk rough on the palms</li>' +
              '<li><strong>smell:</strong> chlorine and wet towels</li><li><strong>feel in the body:</strong> the stomach dropping at the top of a swing</li></ul>' },
      { id: 'empty', title: 'Cut the empty words',
        text: '<p><em>Amazing, very, really, nice, good, kind of, stuff, things</em> take up space and tell the reader nothing.</p>' +
              '<p>Replace them with a detail: not <em>really amazing</em>, but what made it so.</p>' },
      { id: 'simile', title: 'Comparisons that fit',
        text: '<p>A <strong>simile</strong> compares using <em>like</em> or <em>as</em>; a <strong>metaphor</strong> says one thing <em>is</em> another.</p>' +
              '<p>A comparison works when both things share the quality you mean: a body <em>straight as a ruler</em>.</p>' },
      { id: 'slow', title: 'Slow it down',
        text: '<p>A fast movement needs slow writing. Break it into stages, one sentence each, and carry the reader through with time words: <em>then, as, at the top, just before</em>.</p>' },
      { id: 'pace', title: 'Extension: sentence length and pace',
        text: '<p><strong>Short sentences</strong> speed the reader up and build tension. <em>She stepped up. Breathed. Went.</em></p>' +
              '<p><strong>Long, flowing sentences</strong> slow the reader down, or carry a smooth movement from start to finish.</p>' },
      { id: 'imagery', title: 'Naming the devices', years: '9', wide: true,
        text: Sci.table(['Device', 'What it does', 'Example'], [
                ['<strong>Simile</strong>', 'compares using like or as', '<em>She spun like a top.</em>'],
                ['<strong>Metaphor</strong>', 'says one thing is another', '<em>The beam was a tightrope over a canyon.</em>'],
                ['<strong>Personification</strong>', 'gives a thing human actions or feelings', '<em>The bar groaned beneath her.</em>'],
                ['<strong>Onomatopoeia</strong>', 'a word that sounds like its meaning', '<em>Thud. Clatter. Thwack.</em>'],
                ['<strong>Alliteration</strong>', 'repeats the first sound of nearby words', '<em>Swift, strong strokes</em>']]) +
              '<p>Naming the device is only the start: say what it <em>suggests</em>, and why the writer chose it.</p>' },
      { id: 'detail', title: 'The telling detail', years: '9', wide: true,
        text: '<p>One small, specific, surprising detail can suggest more than a paragraph of description.</p>' +
              '<p>Instead of <em>the team was sad after the loss</em>: <em>Nobody turned the music on in the van home.</em></p>' +
              '<p>Ask: what would only someone who was really there notice?</p>' },
      { id: 'extended', title: 'Keeping an image consistent', years: '9', wide: true,
        text: '<p>An <strong>extended metaphor</strong> carries one image through a whole passage: if the race is a storm, the start is a gust, the crowd is thunder, and the finish is the calm after.</p>' +
              '<p>A <strong>mixed metaphor</strong> jumps between images that clash, <em>a well-oiled machine that blossomed</em>, and the picture falls apart.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: from telling to showing',
        steps: ['<strong>Tell:</strong> <em>The diver was scared.</em>',
                '<strong>Ask:</strong> what would you see, hear or feel if you were watching her?',
                '<strong>Show:</strong> <em>At the end of the ten-metre board, Mere curled her toes over the edge and looked anywhere but down.</em>']
      },
      {
        title: 'Example 2: slowing down a giant',
        steps: ['<strong>Too fast:</strong> <em>She went round the bar.</em>',
                '<strong>Stage by stage:</strong> <em>She kicks her legs back, then drives them forward. Her body stretches long as it sweeps beneath the bar. ' +
                'At the top, she passes through a handstand, still for a heartbeat, before she drops into the next swing.</em>',
                'Strong verbs (kicks, drives, sweeps) and time words (then, at the top, before) carry the reader through the movement.']
      }
    ],

    slots: [
      { name: 'Show or tell?', learn: 'show',
        items: [rng => Sci.sort(rng, { prompt: 'Does each sentence tell or show?', bins: ['Telling', 'Showing'],
          items: [
            { text: 'Ana was nervous before the race.', bin: 0 },
            { text: 'The gym was very noisy.', bin: 0 },
            { text: 'Tama was exhausted after training.', bin: 0 },
            { text: 'The water was really cold.', bin: 0 },
            { text: 'Mia was proud of her routine.', bin: 0 },
            { text: 'The crowd was excited.', bin: 0 },
            { text: 'Ana retied her laces three times and could not keep still on the line.', bin: 1 },
            { text: 'Coaches shouted over the thud of landings and the squeak of shoes on the sprung floor.', bin: 1 },
            { text: 'Tama dropped his bag at the door and lay flat on the hallway carpet.', bin: 1 },
            { text: 'The first step into the water stole my breath and turned my toes numb.', bin: 1 },
            { text: 'Mia saluted the judges with a grin she could not hide.', bin: 1 },
            { text: 'The stand roared and stamped as the runners turned for home.', bin: 1 }
          ], pick: 6,
          explain: 'Telling names the feeling or quality (nervous, noisy, proud). Showing gives the actions and details that let the reader work it out.' })] },

      { name: 'The stronger verb', learn: 'verbs',
        items: [Sci.gen(rng => {
          const [s, right] = rng.pick([
            ['The sprinter ▢ out of the blocks.', 'exploded'],
            ['The gymnast ▢ around the high bar.', 'whipped'],
            ['The diver ▢ into the pool with barely a splash.', 'sliced'],
            ['The ball ▢ off the rim and out of the court.', 'ricocheted'],
            ['After the final whistle, the team ▢ onto the grass.', 'collapsed'],
            ['The runner ▢ across the finish line, barely able to stand.', 'staggered'],
            ['The skateboarder ▢ down the ramp.', 'hurtled'],
            ['The trampoline ▢ her high into the air.', 'flung']
          ]);
          return C(rng, { prompt: `Which verb paints the clearest picture? <em>${s}</em>`, right, wrong: ['went', 'moved', 'got'], wide: false,
            explain: `“${right}” shows exactly how it happened. Weak verbs such as “went”, “moved” and “got” leave the reader to guess.` });
        })] },

      { name: 'Which sense?', learn: 'senses',
        items: [Sci.gen(rng => {
          const pool = [
            ['Sight', ['Chalk dust drifted in the light above the bars.', 'The scoreboard flashed red as the clock ran down.']],
            ['Sound', ['The springboard boomed under her feet.', 'Spikes clattered on the concrete as the runners walked out.']],
            ['Touch', ['The bar was rough with chalk under my palms.', 'Cold, wet sand squeezed between my toes.']],
            ['Smell', ['The changing room smelt of chlorine and wet towels.', 'The air was thick with the smell of cut grass.']],
            ['Feeling in the body', ['My stomach dropped as I hung upside down at the top of the swing.', 'My heart hammered against my ribs on the start line.']]
          ];
          return Sci.match(rng, 'Match each detail to the sense it uses.', rng.sample(pool, 4).map(([sense, lines]) => [rng.pick(lines), sense]),
            'Details from several senses, including what the body feels, put the reader inside the moment.');
        })] },

      { name: 'Cut the empty words', learn: 'empty',
        items: [
          ['The giant is a really amazing skill that is kind of hard.', 'The giant looks effortless, but it takes months to learn.',
           ['The giant is a very, very amazing skill.', 'The giant is an amazing and really hard skill, kind of.', 'The giant is really amazing.']],
          ['The view from the top was very nice and really good.', 'From the top, we could see three bays and snow on the far ranges.',
           ['The view from the top was really, really nice.', 'The view was very nice and good and amazing.', 'The view from the top was kind of nice.']],
          ['The race was really hard and I was very tired.', 'By the last lap, my legs burned and every breath scraped my throat.',
           ['The race was very, very hard and I was really tired.', 'The race was hard. I was tired. It was hard.', 'The race was kind of really hard.']],
          ['The food at camp was good and stuff.', 'At camp we ate sausages charred on the barbecue and drank hot chocolate by the fire.',
           ['The food at camp was really good and stuff.', 'The food was good, things like that.', 'Camp food was nice and good.']],
          ['Our new gym is very big and really cool.', 'Our new gym has a sprung floor, a foam pit and a ceiling high enough for the rings.',
           ['Our new gym is really, really big and very cool.', 'Our new gym is big and cool and stuff.', 'Our gym is very new and big.']]
        ].map(([draft, right, wrong]) => rng => C(rng, { prompt: `<em>${draft}</em> Which revision cuts the empty words and says the most?`, right, wrong,
          explain: 'Words such as very, really, amazing, nice, kind of and stuff tell the reader nothing. The best revision replaces them with details the reader can see or feel.' })) },

      { name: 'The simile that fits', learn: 'simile',
        items: [
          ['At the top of the giant, her body was as straight ▢.', 'as a ruler', ['as a wet noodle', 'as a pile of laundry', 'as a sleepy cat'], 'a ruler and her body are both perfectly straight'],
          ['The swimmer cut through the water ▢.', 'like a blade', ['like a brick', 'like a beach ball', 'like a sleeping seal'], 'a blade cuts cleanly, as the swimmer does'],
          ['The roar of the crowd rolled around the stadium ▢.', 'like thunder', ['like a whisper', 'like a feather', 'like a tiptoe'], 'thunder is loud and rolls, like the roar'],
          ['Before the race, my legs were shaking ▢.', 'like jelly on a plate', ['like a rock', 'like a statue', 'like a steel post'], 'jelly wobbles, like nervous legs'],
          ['The trampoline flung me upward ▢.', 'like a stone from a slingshot', ['like a stone dropped in a pond', 'like a leaf settling on the ground', 'like a snail on a wall'], 'a slingshot launches fast and high'],
          ['After the loss, the changing room was as quiet ▢.', 'as a library', ['as a fireworks display', 'as a rock concert', 'as a playground at lunch'], 'a library is known for its silence']
        ].map(([s, right, wrong, why]) => rng => C(rng, { prompt: `Which comparison fits best? <em>${s}</em>`, right, wrong, wide: false,
          explain: `A comparison works when both things share the quality you mean: ${why}.` })) },

      { name: 'Slow it down', learn: 'slow',
        items: [
          ['She swings her legs back to build momentum.', 'Her body stretches long as it sweeps beneath the bar.',
           'Rising up the far side, she pulls her hips towards the bar.', 'At the top, she passes through a handstand above the bar.'],
          ['She walks to the end of the board and stops.', 'Her arms swing up as she springs into the air.',
           'At the peak, she folds in half to touch her toes.', 'She straightens and slices into the water.'],
          ['On “marks”, he settles his feet against the blocks.', 'On “set”, he lifts his hips and holds still.',
           'At the gun, he drives off both blocks.', 'His first strides are short and low, then he rises to full speed.'],
          ['She runs a curved path towards the bar.', 'She plants her outside foot and drives her knee upward.',
           'Turning her back to the bar, she arches over it.', 'She tucks her chin and lands on her shoulders in the mat.'],
          ['He raises his arms and steps forward into a lunge.', 'His first hand reaches for the mat, then his second.',
           'His legs pass over the top, straight and wide.', 'He lands one foot, then the other, and rises to stand tall.']
        ].map(seq => rng => Sci.order(rng, 'Put the stages of this movement in order.', seq,
          'Describing a movement in stages, with strong verbs and time words, lets the reader see it happen.')) },

      { name: 'The most vivid version', learn: 'show',
        items: [
          ['landing a vault', 'Her feet hit the mat together and stuck, and the gym erupted.', ['She did the vault and it was good.', 'The vault was landed by her well.', 'She landed and it was really amazing.']],
          ['the start of a swimming race', 'The hooter blared, and eight swimmers stretched out over the water.', ['The race started and everyone went.', 'Then the swimming race began.', 'It was the start and it was exciting.']],
          ['a cold morning at training', 'Our breath hung in clouds as we jogged laps of the frosty field.', ['It was really cold at training.', 'Training was cold that morning.', 'The morning was very cold and not warm.']],
          ['scoring the winning goal', 'The ball skimmed off my boot, curled past the keeper’s fingertips and rippled the net.', ['I scored and we won.', 'The goal was scored by me.', 'I kicked it and it was a really good goal.']],
          ['falling off the beam', 'My foot slid off the edge, and the mat rushed up to meet me.', ['I fell off the beam.', 'I fell off, which was bad.', 'Falling happened to me on the beam.']]
        ].map(([moment, right, wrong]) => rng => C(rng, { prompt: `Which sentence brings <strong>${moment}</strong> most vividly to life?`, right, wrong,
          explain: 'Vivid writing uses precise verbs and concrete details, so the reader sees the moment instead of being told about it.' })) },

      { name: 'Show the feeling', learn: 'show',
        items: [
          ['nervous', 'Sam', 'Sam wiped his palms on his shorts for the third time and stared at the beam.'],
          ['proud', 'Aroha', 'Aroha held her medal up to the light and could not stop grinning.'],
          ['exhausted', 'Leo', 'Leo dragged himself up the stairs, one heavy step at a time.'],
          ['disappointed', 'Jess', 'Jess stared at the scoreboard, then slowly unpinned her number.'],
          ['excited', 'The twins', 'The twins bounced on their toes, talking over each other, while they waited for the doors to open.']
        ].map(([feel, who, right]) => rng => {
          const was = who === 'The twins' ? 'were' : 'was';
          return C(rng, { prompt: `Which sentence <strong>shows</strong> that ${who === 'The twins' ? 'the twins are' : who + ' is'} ${feel}, without naming the feeling?`, right,
            wrong: [`${who} ${was} really ${feel}.`, `${who} ${was} very, very ${feel} that day.`, `${who} felt ${feel}, and it showed.`],
            explain: 'Showing gives the actions and details that let the reader work out the feeling. The other sentences simply name it.' });
        }) },

      { name: 'True or false', learn: 'show',
        items: [
          rng => TF(rng, { statement: 'Showing means naming the feeling clearly so the reader cannot miss it.', answer: false, learn: 'show', explain: 'That is telling. Showing gives details and lets the reader work the feeling out.' }),
          rng => TF(rng, { statement: 'A strong verb can replace a weak verb and an adverb, as “sprinted” replaces “ran quickly”.', answer: true, learn: 'verbs', explain: 'One precise word does the work of two vague ones.' }),
          rng => TF(rng, { statement: 'Words such as “amazing” and “very” make description more precise.', answer: false, learn: 'empty', explain: 'They are empty: they tell the reader that something is impressive without saying how.' }),
          rng => TF(rng, { statement: 'Good description can use sounds, smells and feelings in the body, not only sight.', answer: true, learn: 'senses', explain: 'Several senses put the reader inside the moment.' }),
          rng => TF(rng, { statement: 'A simile works best when the two things share the quality you mean.', answer: true, learn: 'simile', explain: '“Straight as a ruler” works because rulers are straight.' }),
          rng => TF(rng, { statement: 'A fast movement is best described in one quick sentence.', answer: false, learn: 'slow', explain: 'Slow it down: one stage per sentence lets the reader see what happens.' })
        ] },

      { name: 'Extension: sentence length and pace', learn: 'pace', challenge: 'also',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'Which version builds the most tension?',
            right: 'She chalked her hands. Stepped up. Breathed. Went.',
            wrong: ['She chalked her hands and stepped up and breathed and then she went.', 'After chalking her hands and stepping up, she breathed, and then she went for it.', 'She chalked up, which she always did, and after a breath she stepped up and went.'],
            explain: 'Short sentences, even fragments, make the reader pause at every step, which builds tension.' }),
          rng => C(rng, { tag: EXT, prompt: 'Why might a writer describe a long swim in one long, flowing sentence?',
            right: 'Its rhythm can mirror the smooth, unbroken movement through the water.',
            wrong: ['Long sentences are always better than short ones.', 'It makes the swim feel jerky and sudden.', 'Short sentences are not allowed in description.'],
            explain: 'Sentence length is a choice: a flowing sentence can feel like flowing movement.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which version uses a short sentence for the greatest impact?',
            right: 'For three weeks I fell off the beam every single day. Then, one Tuesday, I didn’t.',
            wrong: ['Beam. Falling. Weeks. Tuesday.', 'For three weeks I fell off the beam, and then one Tuesday I didn’t, which was good.', 'I fell off the beam for three weeks, then one Tuesday I stayed on it, which surprised me.'],
            explain: 'The long first sentence builds up the struggle; the short second one lands the change. The fragments lose the meaning, and the others bury the moment.' }),
          rng => C(rng, { tag: EXT, prompt: 'A writer uses six short sentences in a row to describe a calm, lazy afternoon. What is the likely effect?',
            right: 'The writing feels choppy and tense, which fights against the calm mood.',
            wrong: ['The scene feels more peaceful.', 'The reader slows down and relaxes.', 'Sentence length has no effect on mood.'],
            explain: 'Short sentences speed the reader up. A calm scene suits longer, flowing sentences.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which version best slows down the moment at the top of a giant?',
            right: 'For one long heartbeat she hung upside down above the bar, perfectly still, while the whole gym seemed to hold its breath.',
            wrong: ['She went over the top.', 'Top. Over. Down.', 'At the top she was upside down and then she came down.'],
            explain: 'A longer sentence, with detail, stretches the moment out, as time seems to stretch for the gymnast.' })
        ] },

      { name: 'Write it: describe a moment', learn: 'slow',
        items: [
          rng => Sci.write(rng, {
            key: 'w17-skill', title: 'W17 Write it: my favourite skill', minWords: 60, rows: 9,
            prompt: '<strong>Describe your favourite skill</strong> from a sport or activity you know well, for a reader who has never seen it. Slow it down: one stage at a time, with strong verbs and at least two senses.',
            hints: ['Before you write, list the stages of the skill in order: three or four of them.',
                    'For each stage, choose one strong verb and one detail you would see, hear or feel. Then add a comparison for the moment that is hardest to picture.'],
            checklist: ['I describe the skill in stages, in order.', 'I use strong verbs instead of “went”, “did” or “moved”.', 'I use at least two senses, or a feeling in the body.',
                        'I cut empty words such as “amazing”, “very” and “kind of”.', 'I use at least one comparison that fits.'],
            model: '<p>A giant begins with a hang. I grip the high bar, chalk biting into my palms, and kick my legs back to build a swing. ' +
                   'On the way down, my body stretches long and straight, and the air rushes past my ears as I sweep beneath the bar. ' +
                   'Rising up the far side, I squeeze my hips towards it, and for one heartbeat I pass through a handstand, upside down above the bar, ' +
                   'before I drop into the next circle like a pendulum that never stops.</p>',
            explain: 'Read it to someone who has never seen the skill. Could they picture each stage?' }),
          rng => Sci.write(rng, {
            key: 'w17-before', title: 'W17 Write it: the moment before', minWords: 50,
            prompt: '<strong>Describe the moment before</strong> a race, game or performance begins. Show how you feel without naming the feeling.',
            hints: ['Think about what your body does when you are waiting: your hands, your feet, your breathing, your heart.',
                    'Add one sound from the room around you, and end on the moment it all begins.'],
            checklist: ['I never name the feeling (nervous, excited, scared).', 'I show it through actions and the body.', 'I include at least one sound or other sense.',
                        'I use strong verbs and cut empty words.', 'My last sentence is the moment it begins.'],
            model: '<p>The hall goes quiet except for the hum of the lights. I stand at the corner of the floor and press my toes into the carpet, once, twice, three times. ' +
                   'My heart thumps in my ears. Somewhere behind me a chair scrapes, and I flinch. The judge lifts her hand. I breathe out slowly, raise my arms, and the music begins.</p>',
            explain: 'Underline any feeling word you used. Can you replace it with an action?' }),
          rng => Sci.write(rng, {
            key: 'w17-place', title: 'W17 Write it: a place I train', minWords: 50,
            prompt: '<strong>Describe a place where you train or play</strong> (a gym, a pool, a field, a court) so that a reader could picture it with their eyes shut. Use at least three senses.',
            hints: ['Start with the first thing that hits you as you walk in: a smell, a sound, the temperature.',
                    'Move through the space as you would: the door, the middle, your favourite corner. One detail at each stop.'],
            checklist: ['I use at least three senses.', 'Each detail is specific, not “nice” or “big”.', 'I use strong verbs.', 'The reader moves through the place in a clear order.',
                        'Every sentence ends with a full stop, not a comma.'],
            model: '<p>The pool hall hits you before you are through the door: warm, wet air, thick with chlorine. Inside, light ripples across the ceiling in shifting nets of white. ' +
                   'Whistles shriek, and every shout bounces off the tiles and comes back twice as loud. ' +
                   'The lane ropes clack together as a swimmer turns, and the tiles at the edge are slippery and cool under bare feet.</p>',
            explain: 'Count your senses. If one sense does all the work, swap a sight for a sound or a smell.' }),
          rng => Sci.write(rng, {
            key: 'w17-tellshow', title: 'W17 Write it: from telling to showing', minWords: 40,
            prompt: 'Turn this telling sentence into a showing paragraph: <em>“After the match, the team was exhausted but happy.”</em> Do not use the words <em>exhausted</em> or <em>happy</em>.',
            hints: ['What does a tired body do? What does a happy face do? Write one detail for each.',
                    'Choose one person in the team to zoom in on, and one detail of the field or the changing room.'],
            checklist: ['I do not use the words exhausted or happy.', 'I show tiredness through bodies and actions.', 'I show happiness through faces, voices or actions.',
                        'I zoom in on at least one person or object.', 'I use strong verbs and cut empty words.'],
            model: '<p>When the final whistle went, half the team dropped straight onto the grass. Hemi lay on his back, chest heaving, laughing at nothing. ' +
                   'Mud streaked our socks to the knees, and someone’s boot had lost its laces. Nobody could be bothered to stand up, but every one of us was grinning at the sky.</p>',
            explain: 'Give your paragraph to someone else. Can they name both feelings without being told?' })
        ] },

      // ── Year 9 challenge: these positions appear only in the challenge set.

      {
        name: 'Year 9: name the device', learn: 'imagery', challenge: 'only',
        items: [Sci.gen(rng => {
          const pool = [
            ['Simile', ['She spun like a top.', 'The crowd swayed like grass in the wind.']],
            ['Metaphor', ['The beam was a tightrope over a canyon.', 'Her final routine was a firework.']],
            ['Personification', ['The bar groaned as she swung beneath it.', 'The wind shoved the runners back down the straight.']],
            ['Onomatopoeia', ['Thwack! The ball left the bat.', 'The springboard went thud, thud, thud.']],
            ['Alliteration', ['Swift, strong strokes sent her surging ahead.', 'Big, bold bounds carried him over the bar.']]
          ];
          return Sci.match(rng, 'Match each sentence to the device it uses.', rng.sample(pool, 4).map(([device, lines]) => [rng.pick(lines), device]),
            'Simile: like or as. Metaphor: one thing is another. Personification: a thing acts like a person. Onomatopoeia: a word that sounds like its meaning. Alliteration: repeated first sounds.');
        })]
      },

      {
        name: 'Year 9: what the image suggests', learn: 'imagery', challenge: 'only',
        items: [
          rng => C(rng, { prompt: '<em>The beam was a tightrope over a canyon.</em> What does this metaphor suggest?',
            right: 'The beam felt dangerously narrow, and a mistake felt enormous.', wrong: ['The beam was outdoors.', 'The gymnast enjoyed the beam.', 'The beam was made of rope.'],
            explain: 'A tightrope is thin and a canyon is a long drop: together they make the beam feel narrow and the stakes high.' }),
          rng => C(rng, { prompt: '<em>The wind shoved the runners back down the straight.</em> What does the verb “shoved” suggest?',
            right: 'The wind was strong, almost hostile, working against them.', wrong: ['The wind was gentle.', 'The runners were pushing each other.', 'The runners were cheating.'],
            explain: '“Shoved” is rough and deliberate. Personifying the wind turns it into an opponent.' }),
          rng => C(rng, { prompt: '<em>Her final routine was a firework.</em> What does this metaphor suggest?',
            right: 'It was explosive and dazzling, and over quickly, leaving a lasting impression.', wrong: ['It was dangerous and should be banned.', 'It took place at night.', 'It was slow and calm.'],
            explain: 'A firework is bright, sudden and brief, and people remember it after it is gone.' }),
          rng => C(rng, { prompt: '<em>The stadium held its breath.</em> What is the effect of this personification?',
            right: 'It shows the whole crowd falling silent together, in suspense.', wrong: ['It shows that the stadium was empty.', 'It suggests the air was polluted.', 'It shows that the stadium was old.'],
            explain: 'People hold their breath in suspense. Giving that action to the stadium makes thousands of people act as one.' }),
          rng => C(rng, { prompt: '<em>The pool was a sheet of glass.</em> What does this suggest about the water?',
            right: 'It was perfectly still and smooth, not yet disturbed.', wrong: ['It was sharp and dangerous.', 'It was frozen solid.', 'It was full of swimmers.'],
            explain: 'Glass is flat, smooth and clear. The image also hints that the stillness is about to be broken.' })
        ]
      },

      {
        name: 'Year 9: the telling detail', learn: 'detail', challenge: 'only',
        items: [
          ['a gymnast waiting to compete', 'She rubs the old tape on her wrist with her thumb, over and over.', ['She waits for her turn.', 'She is wearing a leotard.', 'She looks at the other gymnasts.']],
          ['an old sports club', 'The honours board stops at 1987, the gold paint flaking off the last name.', ['The club is quite old.', 'There are some old things on the walls.', 'The club has been there a long time.']],
          ['a team after a loss', 'Nobody turns the music on in the van home.', ['The team is sad.', 'The team lost the game.', 'Everyone is disappointed.']],
          ['a coach who cares', 'She learns every child’s name on their first night, and the name of their dog.', ['She is a kind coach.', 'She is good at coaching.', 'She likes the children.']]
        ].map(([scene, right, wrong]) => rng => C(rng, { prompt: `Which detail does the most to bring <strong>${scene}</strong> to life?`, right, wrong,
          explain: 'A telling detail is small, specific and suggestive: it lets the reader feel far more than it states.' }))
      },

      {
        name: 'Year 9: keep the image consistent', learn: 'extended', challenge: 'only',
        items: [
          rng => C(rng, { prompt: 'Which sentence mixes its metaphors?',
            right: 'The team was a well-oiled machine that blossomed into a roaring lion.',
            wrong: ['The team was a well-oiled machine, every part turning in time.', 'The team was a wave, building and then breaking over the defence.', 'The team was one creature with fifteen legs and a single mind.'],
            explain: 'A machine cannot blossom, and a flower does not roar: three clashing images in one sentence. The others keep to one image each.' }),
          rng => C(rng, { prompt: 'A writer begins: <em>The race was a storm.</em> Which sentence continues the image best?',
            right: 'The runners broke from the line in a single gust, and thunder rolled from the stands.',
            wrong: ['The runners were like ants at a picnic.', 'The race was also a long book with many chapters.', 'The runners ran round the track quickly.'],
            explain: 'Gust and thunder belong to the storm, so the image grows. The others switch to new images or drop it altogether.' }),
          rng => C(rng, { prompt: 'Why do careful writers avoid mixed metaphors?',
            right: 'Clashing images confuse the reader instead of sharpening the picture.',
            wrong: ['Metaphors are not allowed in description.', 'Only one metaphor is allowed in a whole text.', 'Mixed metaphors are too short.'],
            explain: 'Each image asks the reader to picture something. Two that clash cancel each other out.' }),
          rng => C(rng, { prompt: 'Which ending keeps the extended metaphor going? <em>Her routine was a story. The opening tumble was a bold first line; the leaps built the middle chapters …</em>',
            right: '… and the dismount was the final full stop.',
            wrong: ['… and the dismount was a rocket taking off.', '… and the dismount was really good.', '… and then she finished the routine.'],
            explain: 'First line, chapters, full stop: every part of the routine stays inside the image of a story.' })
        ]
      },

      {
        name: 'Year 9: write an extended metaphor', learn: 'extended', challenge: 'only',
        items: [
          rng => Sci.write(rng, {
            key: 'w17-y9-metaphor', title: 'W17 Year 9 Write it: an extended metaphor', minWords: 70, rows: 9,
            prompt: '<strong>Describe a moment in sport or performance using one extended metaphor</strong> that runs through the whole paragraph. Choose the image first (a storm, a machine, a story, a dance), then keep every detail inside it.',
            hints: ['Choose an image with many parts. A storm has clouds, gusts, thunder, rain and calm; a machine has gears, engines and fuel.',
                    'Map each stage of your moment onto a part of the image before you write: the start is the first gust, the crowd is the thunder …'],
            checklist: ['I state the image near the start.', 'Every detail stays inside that one image.', 'No second image clashes with it.',
                        'The image suggests something about the moment, not only how it looks.', 'I end on a detail that closes the image.'],
            model: '<p>The final was a storm. It gathered slowly: the crowd thickened in the stands like cloud, and the air pressed low and heavy over the track. ' +
                   'When the gun cracked, the runners broke from their blocks in a single gust. Down the back straight they swept as one front, hard and relentless, until the bend tore them apart. ' +
                   'By the line it had blown itself out: eight runners scattered like leaves, and the stands still rumbling with thunder.</p>',
            explain: 'Highlight every word that belongs to your image. Anything left over may be a crack in the metaphor.' })
        ]
      }
    ]
  });

})();
