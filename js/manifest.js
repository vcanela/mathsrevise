'use strict';
// ── Revision · Site manifest ────────────────────────────────────────────────
// The single list of what exists. The home page, the unit pages, the daily
// mix and the breadcrumbs on every exercise all read from here, so counts,
// titles and links can never drift out of step with the actual files.
//
// Two subjects share one engine. Each unit says which subject it belongs to
// and where its pages live. Maths keeps its original URLs (units/unit-2.html,
// exercises/unit-2/exercise-4.html) so links already handed out still work.
// Science lives under science/, one page per subject (science/physics.html,
// science/physics/speed.html); the old year-based addresses forward there.
// ─────────────────────────────────────────────────────────────────────────────

const Manifest = (() => {

  const SUBJECTS = [
    { id: 'maths',   name: 'Maths',   blurb: 'Number, algebra, geometry, and where they meet.' },
    { id: 'science', name: 'Science', blurb: 'Years 7 and 8, following the 2027 NZ Curriculum, grouped by subject.' },
    { id: 'english', name: 'English', blurb: 'Years 7 and 8, following the 2026 NZ Curriculum: the words, grammar and reading skills behind your class work, with Year 9 challenges when you want more.' },
    { id: 'coding',  name: 'Coding',  blurb: 'Python from scratch for Years 9 and 10: reading, running, fixing and writing programs, following the NZ digital technologies progress outcomes.' }
  ];

  // `key` identifies a unit everywhere (topic files, URLs, progress). Maths
  // keys are the old unit numbers, so nothing stored or linked so far moves.
  const UNITS = [
    // ── Maths ───────────────────────────────────────────────────────────────
    {
      key: 1, subject: 'maths', label: '1', short: 'Unit 1', name: 'Unit 1: Number & Arithmetic', icon: '½',
      topicFile: 'number',
      blurb: 'Decimals and fractions: the arithmetic everything else is built on.',
      exercises: [
        { n: 1, id: 'u1e1', title: 'Adding & Subtracting Decimals', tag: 'Lining up the point' },
        { n: 2, id: 'u1e2', title: 'Multiplying & Dividing Decimals', tag: 'Counting decimal places' },
        { n: 3, id: 'u1e3', title: 'Adding & Subtracting Fractions', tag: 'Common denominators' },
        { n: 4, id: 'u1e4', title: 'Multiplying & Dividing Fractions', tag: 'Keep, change, flip' }
      ]
    },
    {
      key: 2, subject: 'maths', label: '2', short: 'Unit 2', name: 'Unit 2: Algebra', icon: 'x',
      topicFile: 'algebra',
      blurb: 'Writing, simplifying and solving with letters standing in for numbers.',
      exercises: [
        { n: 1, id: 'u2e1', title: 'Collecting Like Terms', tag: 'Simplifying expressions' },
        { n: 2, id: 'u2e2', title: 'Expanding Brackets', tag: 'Multiplying out' },
        { n: 3, id: 'u2e3', title: 'Factorising', tag: 'Taking the common factor out' },
        { n: 4, id: 'u2e4', title: 'Solving ax + b = c', tag: 'Undoing one step at a time' },
        { n: 5, id: 'u2e5', title: 'Unknowns on Both Sides', tag: 'ax + b = cx + d' }
      ]
    },
    {
      key: 3, subject: 'maths', label: '3', short: 'Unit 3', name: 'Unit 3: Geometry', icon: '△',
      topicFile: 'geometry',
      blurb: 'Angles, polygons, circles and solids. Every diagram is drawn to scale.',
      exercises: [
        { n: 1, id: 'u3e1', title: 'Angle Types and Rules', tag: 'Naming and combining angles' },
        { n: 2, id: 'u3e2', title: 'Angles in Triangles', tag: 'The 180° rule' },
        { n: 3, id: 'u3e3', title: 'Parallel Line Angles', tag: 'Corresponding, alternate, co-interior' },
        { n: 4, id: 'u3e4', title: 'Angles in Polygons', tag: 'The 180(n − 2) rule' },
        { n: 5, id: 'u3e5', title: 'Parts of a Circle', tag: 'Naming the pieces' },
        { n: 6, id: 'u3e6', title: 'Nets and Scale Factors', tag: 'Solids and enlargement' }
      ]
    },
    {
      key: 4, subject: 'maths', label: '4', short: 'Unit 4', name: 'Unit 4: Algebra Meets Geometry', icon: '∠',
      topicFile: 'combined',
      blurb: 'Angles and lengths written as expressions. Build the equation, then solve it.',
      exercises: [
        { n: 1, id: 'u4e1', title: 'Build the Angle Equation', tag: 'From a diagram to an equation' },
        { n: 2, id: 'u4e2', title: 'Solve for the Angle', tag: 'Find x, then find the angle' },
        { n: 3, id: 'u4e3', title: 'Perimeter with Letters', tag: 'Sides as expressions' }
      ]
    },
    {
      key: 5, subject: 'maths', label: '5', short: 'Unit 5', name: 'Unit 5: Maths in Words', icon: '→',
      topicFile: 'words',
      blurb: 'Turning English into algebra and algebra back into English.',
      exercises: [
        { n: 1, id: 'u5e1', title: 'Words to Expressions', tag: 'Writing the algebra' },
        { n: 2, id: 'u5e2', title: 'Expressions to Words', tag: 'Reading the algebra aloud' },
        { n: 3, id: 'u5e3', title: 'Word Problems to Equations', tag: 'Set it up, then solve it' }
      ]
    },
    {
      // Non-routine problems in the style of the Otago Problem Challenge,
      // grouped by strategy rather than topic. They take minutes, not
      // seconds, so they are untimed and stay out of the daily mix.
      key: 6, subject: 'maths', label: '6', short: 'Unit 6', name: 'Unit 6: Problem Solving', icon: '?',
      topicFile: 'problems', mix: false,
      blurb: 'Puzzles that need a plan before a calculation. Take your time, and ask for a nudge if you are stuck.',
      exercises: [
        { n: 1, id: 'u6e1', title: 'Make a List', tag: 'Count every case, miss none' },
        { n: 2, id: 'u6e2', title: 'Two Unknowns, No Algebra', tag: 'Assume, check, adjust' },
        { n: 3, id: 'u6e3', title: 'Digits and Numbers', tag: 'Think about place value' },
        { n: 4, id: 'u6e4', title: 'What Stays the Same', tag: 'Find the quantity that does not change' },
        { n: 5, id: 'u6e5', title: 'Logic and Grids', tag: 'Reason from the clues' }
      ]
    },

    // ── Science ─────────────────────────────────────────────────────────────
    // Topics follow the knowledge headings of Phase 3 (Years 7–8) in the
    // Science Years 0–10 learning area, August 2026, grouped by subject rather
    // than by year, since schools sequence the years differently. Within a
    // subject, topics sit under their curriculum sub-strand, the Year 7 topic
    // before the Year 8 one it leads into. Codes (7.1, 8.3) keep the year the
    // knowledge belongs to. Year 8 Materials has two headings (Mixtures;
    // Concentration and solubility) and is split to match.
    {
      key: 'chemistry', subject: 'science', short: 'Chemistry', name: 'Chemistry', icon: 'C',
      blurb: 'Particles and states of matter, mixtures and solutions.',
      exercises: [
        { id: 's7e1', slug: 'particles', title: 'Particles and States of Matter', tag: 'Solids, liquids, gases and changes of state', strand: 'Materials' },
        { id: 's8e1', slug: 'mixtures', title: 'Mixtures and Separating Them', tag: 'Sieving, filtering, evaporating, chromatography', strand: 'Materials' },
        { id: 's8e2', slug: 'solutions', title: 'Solutions and Concentration', tag: 'Dissolving, concentration, saturation', strand: 'Materials' }
      ]
    },
    {
      key: 'physics', subject: 'science', short: 'Physics', name: 'Physics', icon: 'P',
      blurb: 'Thermal energy, light, speed and forces.',
      exercises: [
        { id: 's7e2', slug: 'thermal-energy', title: 'Thermal Energy and Insulation', tag: 'Temperature, conduction, convection, radiation', strand: 'Matter, interactions and energy' },
        { id: 's8e3', slug: 'light', title: 'Behaviour of Light', tag: 'Seeing, reflection, refraction', strand: 'Matter, interactions and energy' },
        { id: 's7e3', slug: 'speed', title: 'Speed', tag: 'Distance, time and graphs', strand: 'Motion and forces' },
        { id: 's8e4', slug: 'forces', title: 'Balanced and Unbalanced Forces', tag: 'Net force, motion, seesaws', strand: 'Motion and forces' }
      ]
    },
    {
      key: 'earth-space', subject: 'science', short: 'Earth and Space', name: 'Earth and Space', icon: 'E',
      blurb: 'The Earth, Moon and Sun, and the rocks and soils of the Earth’s surface.',
      exercises: [
        { id: 's7e4', slug: 'earth-moon-sun', title: 'The Earth, Moon and Sun', tag: 'Phases, eclipses, Maramataka', strand: 'Earth and space' },
        { id: 's8e5', slug: 'earth-surface', title: 'The Surface of the Earth', tag: 'Layers, rocks, fossils, soils', strand: 'Earth and space' }
      ]
    },
    {
      key: 'biology', subject: 'science', short: 'Biology', name: 'Biology', icon: 'B',
      blurb: 'Adaptations and evolution, cells and reproduction, and ecosystems.',
      exercises: [
        { id: 's7e5', slug: 'adaptations', title: 'Survival Adaptations', tag: 'Structural, behavioural, physiological', strand: 'Organism diversity' },
        { id: 's8e6', slug: 'evolution', title: 'Evolution', tag: 'Variation, natural selection, extinction', strand: 'Organism diversity' },
        { id: 's7e6', slug: 'cells', title: 'Cells', tag: 'Plant and animal cells, organelles', strand: 'Life processes' },
        { id: 's8e7', slug: 'reproduction', title: 'Reproduction and Development', tag: 'Plants, animals and fungi', strand: 'Life processes' },
        { id: 's7e7', slug: 'ecosystems', title: 'Organisms in an Ecosystem', tag: 'Populations, communities, food webs', strand: 'Ecosystems' },
        { id: 's8e8', slug: 'relationships', title: 'Relationships in an Ecosystem', tag: 'Producers, decomposers, mutualism', strand: 'Ecosystems' }
      ]
    },

    // Phase 4 (Years 9–10), in units of their own so a Year 7 student opening
    // Chemistry does not land on ionic bonding. Codes keep the year (9.1, 10.2).
    {
      key: 'atoms-reactions', subject: 'science', short: 'Atoms and Reactions', name: 'Atoms and Reactions', icon: 'A',
      topicFiles: ['science-y9', 'science-y10'],
      challengeName: 'Challenge set', challengeTag: 'Challenge',
      challengeNote: 'Challenge questions: the same ideas, taken to a high standard.',
      blurb: 'Atoms, the periodic table, bonding and chemical reactions.',
      exercises: [
        { id: 's9e1', slug: 'atoms-periodic-table', title: 'Atoms and the Periodic Table', tag: 'Protons, neutrons, electrons, shells, groups', strand: 'Matter', challenge: true },
        { id: 's9e2', slug: 'acids-bases', title: 'Acids, Bases and Gas Tests', tag: 'pH, indicators, identifying gases', strand: 'Chemical change', challenge: true },
        { id: 's10e1', slug: 'bonding-equations', title: 'Bonding, Formulas and Equations', tag: 'Ions, covalent bonds, balancing', strand: 'Matter', challenge: true },
        { id: 's10e2', slug: 'reaction-types', title: 'Types of Reaction', tag: 'Combination, combustion, decomposition, neutralisation', strand: 'Chemical change', challenge: true }
      ]
    },
    {
      key: 'electricity-forces', subject: 'science', short: 'Electricity, Waves and Forces', name: 'Electricity, Waves and Forces', icon: 'Ω',
      topicFiles: ['science-y9', 'science-y10'],
      challengeName: 'Challenge set', challengeTag: 'Challenge',
      challengeNote: 'Challenge questions: the same ideas, taken to a high standard.',
      blurb: 'Circuits, motion and acceleration, pressure, and waves.',
      exercises: [
        { id: 's9e3', slug: 'circuits', title: 'Electric Circuits', tag: 'Current, voltage, series and parallel', strand: 'Matter, interactions and energy', challenge: true },
        { id: 's10e3', slug: 'waves', title: 'Waves, Sound and Light', tag: 'Frequency, wavelength, the EM spectrum', strand: 'Matter, interactions and energy', challenge: true },
        { id: 's9e4', slug: 'motion-forces', title: 'Motion and Forces', tag: 'Net force, balanced forces, position–time graphs', strand: 'Motion and forces', challenge: true },
        { id: 's9e5', slug: 'pressure', title: 'Pressure', tag: 'Force on an area, P = F ÷ A', strand: 'Motion and forces', challenge: true },
        { id: 's10e4', slug: 'force-mass-acceleration', title: 'Force, Mass and Acceleration', tag: 'F = ma, inertia, force pairs', strand: 'Motion and forces', challenge: true },
        { id: 's10e5', slug: 'fluids-buoyancy', title: 'Fluids and Buoyancy', tag: 'Pressure in fluids, hydraulics, floating', strand: 'Motion and forces', challenge: true }
      ]
    },

    // ── English ─────────────────────────────────────────────────────────────
    // Phase 3 (Years 7–8) of English Years 0–10 (2025, in effect 2026), by
    // strand. The site practises the knowledge and close-reading skills that
    // can be checked; reading whole texts, writing them, and speaking stay in
    // the classroom. Some questions are tagged Extension and reach towards
    // Year 9. Codes: R reading, W writing, O oral language.
    {
      key: 'reading', subject: 'english', short: 'Reading', name: 'Reading', icon: 'R',
      blurb: 'Word origins, language features, text forms, close reading and media texts.',
      exercises: [
        { id: 'er1', code: 'R1', slug: 'word-roots', title: 'Word Roots and Origins', tag: 'Greek and Latin roots and affixes', years: '7–8', challenge: true },
        { id: 'er2', code: 'R2', slug: 'language-features', title: 'Language Features', tag: 'Hyperbole, allusion, puns and more', years: '7–8', challenge: true },
        { id: 'er3', code: 'R3', slug: 'text-forms', title: 'Text Forms, Purpose and Audience', tag: 'Why a text is shaped the way it is', years: '7–8', challenge: true },
        { id: 'er4', code: 'R4', slug: 'reading-closely', title: 'Reading Closely', tag: 'Inference, theme and evidence', years: '7–8', challenge: true },
        { id: 'er5', code: 'R5', slug: 'media-texts', title: 'Media and Digital Texts', tag: 'Trust, perspective and representation', years: '7–8', challenge: true }
      ]
    },
    {
      key: 'writing', subject: 'english', short: 'Writing', name: 'Writing', icon: 'W',
      blurb: 'Spelling, grammar, punctuation, word choice and structure.',
      exercises: [
        { id: 'ew6', code: 'W6', slug: 'tricky-spellings', title: 'Tricky Spellings', tag: 'Vowels, consonants, silent letters', years: '7–8', challenge: true },
        { id: 'ew7', code: 'W7', slug: 'prefixes-suffixes', title: 'Prefixes, Suffixes and Homophones', tag: 'Building and spelling words', years: '7–8', challenge: true },
        { id: 'ew8', code: 'W8', slug: 'clauses', title: 'Clauses and Complex Sentences', tag: 'Relative clauses and adverbial phrases', years: '7–8', challenge: true },
        { id: 'ew9', code: 'W9', slug: 'words-at-work', title: 'Words at Work', tag: 'Abstract nouns, participles, gerunds', years: '7–8', challenge: true },
        { id: 'ew10', code: 'W10', slug: 'active-passive', title: 'Active and Passive Voice', tag: 'Who does the action', years: '7–8', challenge: true },
        { id: 'ew11', code: 'W11', slug: 'colons-semicolons', title: 'Colons, Semicolons and Comma Splices', tag: 'Joining and introducing', years: '7–8', challenge: true },
        { id: 'ew12', code: 'W12', slug: 'choosing-words', title: 'Choosing Words', tag: 'Shades of meaning and tone', years: '7–8', challenge: true },
        { id: 'ew13', code: 'W13', slug: 'structuring-writing', title: 'Structuring Writing', tag: 'Persuade, inform, entertain', years: '7–8', challenge: true },
        { id: 'ew15', code: 'W15', slug: 'literary-essay', title: 'The Literary Essay', tag: 'Thesis, evidence and analysis', year: 9 },
        { id: 'ew16', code: 'W16', slug: 'evidence-persuasion', title: 'Evidence and Persuasion', tag: 'Prove it, explain it, answer the worry', years: '7–8', challenge: true },
        { id: 'ew17', code: 'W17', slug: 'show-dont-tell', title: 'Show, Don’t Tell', tag: 'Verbs, senses and detail', years: '7–8', challenge: true }
      ]
    },
    {
      key: 'oral', subject: 'english', short: 'Oral Language', name: 'Oral Language', icon: 'O',
      blurb: 'The language of discussion, argument and presenting.',
      exercises: [
        { id: 'eo14', code: 'O14', slug: 'discussion', title: 'Language for Discussion and Argument', tag: 'Modal language, questions, respectful disagreement', years: '7–8', challenge: true }
      ]
    },

    // ── Coding ──────────────────────────────────────────────────────────────
    // Python for Years 9–10, run in the page by Skulpt. The progress outcomes
    // for computational thinking (PO4 to PO5) ask for inputs, outputs,
    // sequence, selection with comparative and logical operators, variables
    // of different data types, iteration, and organised testing and debugging.
    {
      key: 'basics', subject: 'coding', short: 'Python Basics', name: 'Python Basics', icon: '›',
      challengeName: 'Challenge set', challengeTag: 'Challenge',
      challengeNote: 'Challenge questions: the same ideas, taken to a high standard.',
      blurb: 'Printing, strings, variables, types, input and decisions: the first programs.',
      exercises: [
        { id: 'cb1', code: 'C1', slug: 'output-strings', title: 'Output and Strings', tag: 'print, quotes, joining and reading errors', years: '9–10', challenge: true },
        { id: 'cb2', code: 'C2', slug: 'variables-types', title: 'Variables and Types', tag: 'Storing values, int, float, str, bool, f-strings', years: '9–10', challenge: true },
        { id: 'cb3', code: 'C3', slug: 'input-calculation', title: 'Input and Calculation', tag: 'Asking the user, converting what they type, operators', years: '9–10', challenge: true },
        { id: 'cb4', code: 'C4', slug: 'decisions', title: 'Decisions', tag: 'if, elif, else, and, or, not', years: '9–10', challenge: true }
      ]
    },
    {
      key: 'loops', subject: 'coding', short: 'Loops, Lists and Functions', name: 'Loops, Lists and Functions', icon: '↻',
      challengeName: 'Challenge set', challengeTag: 'Challenge',
      challengeNote: 'Challenge questions: the same ideas, taken to a high standard.',
      blurb: 'Repeating, collecting and reusing: programs that do real work.',
      exercises: [
        { id: 'cl5', code: 'C5', slug: 'while-loops', title: 'While Loops', tag: 'Repeat until something changes', years: '9–10', challenge: true },
        { id: 'cl6', code: 'C6', slug: 'for-range', title: 'For Loops and range', tag: 'Counting, tables and turtle patterns', years: '9–10', challenge: true },
        { id: 'cl7', code: 'C7', slug: 'lists', title: 'Lists', tag: 'Collections, indexing, searching', years: '9–10', challenge: true },
        { id: 'cl8', code: 'C8', slug: 'functions', title: 'Functions', tag: 'def, parameters and return', years: '9–10', challenge: true }
      ]
    }
  ];

  // ── Paths ─────────────────────────────────────────────────────────────────
  // Every URL in the site is built here, relative to the site root.
  for (const u of UNITS) {
    if (u.subject === 'maths') {
      u.page = `units/unit-${u.key}.html`;
      u.dir  = `exercises/unit-${u.key}`;
      u.topicFiles = [u.topicFile];
      for (const ex of u.exercises) {
        ex.href  = `${u.dir}/exercise-${ex.n}.html`;
        ex.label = `${u.key}.${ex.n}`;
      }
    } else if (u.subject === 'coding') {
      u.page = `coding/${u.key}.html`;
      u.dir  = `coding/${u.key}`;
      u.topicFiles = ['coding-' + u.key];
      for (const ex of u.exercises) {
        ex.label = ex.code;
        ex.href  = `${u.dir}/${ex.slug}.html`;
      }
    } else if (u.subject === 'english') {
      u.page = `english/${u.key}.html`;
      u.dir  = `english/${u.key}`;
      u.topicFiles = ['english-' + u.key];
      for (const ex of u.exercises) {
        ex.label = ex.code;
        ex.href  = `${u.dir}/${ex.slug}.html`;
      }
    } else {
      u.page = `science/${u.key}.html`;
      u.dir  = `science/${u.key}`;
      // A subject draws on both years, so its pages load both topic files.
      u.topicFiles = u.topicFiles || ['science-y7', 'science-y8'];
      for (const ex of u.exercises) {
        const [, year, n] = /^s(\d+)e(\d+)$/.exec(ex.id);
        ex.year  = Number(year);
        ex.label = `${year}.${n}`;
        ex.href  = `${u.dir}/${ex.slug}.html`;
        // Where it used to live, when science was grouped by year. The build
        // leaves a page there that forwards to the new address.
        if (year <= 8) ex.old = `science/year-${year}/exercise-${n}.html`;
      }
    }
    for (const ex of u.exercises) ex.unit = u;
  }

  /** A unit by its key: 1–6 for maths; 'chemistry', 'physics', 'earth-space' or 'biology'
   *  for science; 'reading', 'writing' or 'oral' for English. */
  const unit = key => UNITS.find(u => String(u.key) === String(key)) || UNITS[0];

  /** The units of one subject, or all of them. */
  const units = subject => (subject ? UNITS.filter(u => u.subject === subject) : UNITS);

  const subject = id => SUBJECTS.find(s => s.id === id) || SUBJECTS[0];

  /** The exercises that actually exist yet, optionally for one subject. */
  const live = subjectId => units(subjectId).flatMap(u => u.exercises.filter(e => !e.soon));

  /** What a unit calls its harder set: English says "Year 9 challenge", coding "Challenge set". */
  const challenge = u => ({
    name: (u && u.challengeName) || 'Year 9 challenge',
    tag: (u && u.challengeTag) || 'Year 9',
    note: (u && u.challengeNote) || 'Year 9 questions: harder than the usual sets. Learn it has the new ideas.'
  });

  /** An exercise by its id, with its unit attached. */
  const exercise = id => UNITS.flatMap(u => u.exercises).find(e => e.id === id) || null;

  /** Total live exercises, for one subject or the whole site. */
  const count = subjectId => live(subjectId).length;

  /** Stars earned out of the maximum, for a unit, a subject, or everything. */
  function progress(scope) {
    let list;
    if (scope === undefined || scope === null) list = live();
    else if (SUBJECTS.some(s => s.id === scope)) list = live(scope);
    else list = unit(scope).exercises.filter(e => !e.soon);
    let stars = 0, started = 0;
    for (const e of list) {
      const rec = MRG.getExercise(e.id);
      stars += rec.stars || 0;
      if ((rec.attempts || 0) > 0) started++;
    }
    return { stars, max: list.length * 3, started, total: list.length };
  }

  return { SUBJECTS, UNITS, unit, units, subject, live, exercise, count, progress, challenge };
})();
