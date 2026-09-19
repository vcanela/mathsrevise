'use strict';
// ── Maths Revise · Site manifest ────────────────────────────────────────────
// The single list of what exists. The home page, the unit pages and the
// breadcrumbs on every exercise all read from here, so exercise counts and
// titles can never drift out of step with the actual files again.
// ─────────────────────────────────────────────────────────────────────────────

const Manifest = (() => {

  const UNITS = [
    {
      n: 1, short: 'Unit 1', name: 'Unit 1: Number & Arithmetic', icon: '½',
      blurb: 'Decimals and fractions: the arithmetic everything else is built on.',
      exercises: [
        { n: 1, id: 'u1e1', title: 'Adding & Subtracting Decimals', tag: 'Lining up the point' },
        { n: 2, id: 'u1e2', title: 'Multiplying & Dividing Decimals', tag: 'Counting decimal places' },
        { n: 3, id: 'u1e3', title: 'Adding & Subtracting Fractions', tag: 'Common denominators' },
        { n: 4, id: 'u1e4', title: 'Multiplying & Dividing Fractions', tag: 'Keep, change, flip' }
      ]
    },
    {
      n: 2, short: 'Unit 2', name: 'Unit 2: Algebra', icon: 'x',
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
      n: 3, short: 'Unit 3', name: 'Unit 3: Geometry', icon: '△',
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
      n: 4, short: 'Unit 4', name: 'Unit 4: Algebra Meets Geometry', icon: '∠',
      blurb: 'Angles and lengths written as expressions. Build the equation, then solve it.',
      exercises: [
        { n: 1, id: 'u4e1', title: 'Build the Angle Equation', tag: 'From a diagram to an equation' },
        { n: 2, id: 'u4e2', title: 'Solve for the Angle', tag: 'Find x, then find the angle' },
        { n: 3, id: 'u4e3', title: 'Perimeter with Letters', tag: 'Sides as expressions' }
      ]
    },
    {
      n: 5, short: 'Unit 5', name: 'Unit 5: Maths in Words', icon: '→',
      blurb: 'Turning English into algebra and algebra back into English.',
      exercises: [
        { n: 1, id: 'u5e1', title: 'Words to Expressions', tag: 'Writing the algebra' },
        { n: 2, id: 'u5e2', title: 'Expressions to Words', tag: 'Reading the algebra aloud' },
        { n: 3, id: 'u5e3', title: 'Word Problems to Equations', tag: 'Set it up, then solve it' }
      ]
    }
  ];

  const unit = n => UNITS.find(u => u.n === Number(n)) || UNITS[0];

  /** Total exercises across the site. */
  const count = () => UNITS.reduce((s, u) => s + u.exercises.length, 0);

  /** Stars earned out of the maximum, for a unit or for everything. */
  function progress(unitNo) {
    const list = unitNo ? unit(unitNo).exercises : UNITS.flatMap(u => u.exercises);
    let stars = 0, started = 0;
    for (const e of list) {
      const rec = MRG.getExercise(e.id);
      stars += rec.stars || 0;
      if ((rec.attempts || 0) > 0) started++;
    }
    return { stars, max: list.length * 3, started, total: list.length };
  }

  return { UNITS, unit, count, progress };
})();
