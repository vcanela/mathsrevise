'use strict';
// ── Revision · Site manifest ────────────────────────────────────────────────
// The single list of what exists. The home page, the unit pages, the daily
// mix and the breadcrumbs on every exercise all read from here, so counts,
// titles and links can never drift out of step with the actual files.
//
// Two subjects share one engine. Each unit says which subject it belongs to
// and where its pages live. Maths keeps its original URLs (units/unit-2.html,
// exercises/unit-2/exercise-4.html) so links already handed out still work;
// science lives under science/ (science/year-7.html,
// science/year-7/exercise-3.html).
// ─────────────────────────────────────────────────────────────────────────────

const Manifest = (() => {

  const SUBJECTS = [
    { id: 'maths',   name: 'Maths',   blurb: 'Number, algebra, geometry, and where they meet.' },
    { id: 'science', name: 'Science', blurb: 'Years 7 and 8, following the 2027 NZ Curriculum.' }
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

    // ── Science ─────────────────────────────────────────────────────────────
    // Topics follow the knowledge headings of Phase 3 (Years 7–8) in the
    // Science Years 0–10 learning area, August 2026. Year 8 Materials has two
    // headings (Mixtures; Concentration and solubility) and is split to match.
    {
      key: 'y7', subject: 'science', label: '7', short: 'Year 7', name: 'Year 7 Science', icon: '7',
      topicFile: 'science-y7',
      blurb: 'Particles, thermal energy, speed, the Moon, adaptations, cells and ecosystems.',
      exercises: [
        { n: 1, id: 's7e1', title: 'Particles and States of Matter', tag: 'Materials' },
        { n: 2, id: 's7e2', title: 'Thermal Energy and Insulation', tag: 'Matter, interactions and energy' },
        { n: 3, id: 's7e3', title: 'Speed', tag: 'Motion and forces' },
        { n: 4, id: 's7e4', title: 'The Earth, Moon and Sun', tag: 'Earth and space' },
        { n: 5, id: 's7e5', title: 'Survival Adaptations', tag: 'Organism diversity' },
        { n: 6, id: 's7e6', title: 'Cells', tag: 'Life processes' },
        { n: 7, id: 's7e7', title: 'Organisms in an Ecosystem', tag: 'Ecosystems' }
      ]
    },
    {
      key: 'y8', subject: 'science', label: '8', short: 'Year 8', name: 'Year 8 Science', icon: '8',
      topicFile: 'science-y8',
      blurb: 'Mixtures, solutions, light, forces, the Earth’s surface, evolution, reproduction and ecosystems.',
      exercises: [
        { n: 1, id: 's8e1', title: 'Mixtures and Separating Them', tag: 'Materials' },
        { n: 2, id: 's8e2', title: 'Solutions and Concentration', tag: 'Materials' },
        { n: 3, id: 's8e3', title: 'Behaviour of Light', tag: 'Matter, interactions and energy' },
        { n: 4, id: 's8e4', title: 'Balanced and Unbalanced Forces', tag: 'Motion and forces' },
        { n: 5, id: 's8e5', title: 'The Surface of the Earth', tag: 'Earth and space' },
        { n: 6, id: 's8e6', title: 'Evolution', tag: 'Organism diversity' },
        { n: 7, id: 's8e7', title: 'Reproduction and Development', tag: 'Life processes' },
        { n: 8, id: 's8e8', title: 'Relationships in an Ecosystem', tag: 'Ecosystems' }
      ]
    }
  ];

  // ── Paths ─────────────────────────────────────────────────────────────────
  // Every URL in the site is built here, relative to the site root.
  for (const u of UNITS) {
    if (u.subject === 'maths') {
      u.page = `units/unit-${u.key}.html`;
      u.dir  = `exercises/unit-${u.key}`;
    } else {
      const slug = 'year-' + u.label;
      u.page = `science/${slug}.html`;
      u.dir  = `science/${slug}`;
    }
    for (const ex of u.exercises) {
      ex.href  = `${u.dir}/exercise-${ex.n}.html`;
      ex.label = `${u.label}.${ex.n}`;
      ex.unit  = u;
    }
  }

  /** A unit by its key (1–5 for maths, 'y7' or 'y8' for science). */
  const unit = key => UNITS.find(u => String(u.key) === String(key)) || UNITS[0];

  /** The units of one subject, or all of them. */
  const units = subject => (subject ? UNITS.filter(u => u.subject === subject) : UNITS);

  const subject = id => SUBJECTS.find(s => s.id === id) || SUBJECTS[0];

  /** The exercises that actually exist yet, optionally for one subject. */
  const live = subjectId => units(subjectId).flatMap(u => u.exercises.filter(e => !e.soon));

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

  return { SUBJECTS, UNITS, unit, units, subject, live, exercise, count, progress };
})();
