'use strict';
// ── Revision · Timed paper checker ──────────────────────────────────────────
// Builds a few thousand timed papers, for every length, difficulty and choice
// of units, and checks each one is the paper it claims to be: the right
// sections and marks, every question answerable, parts that come from the
// chosen units, and the same paper again from the same seed.
//
//   node tools/check-paper.js
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function stubEl() {
  const e = { attrs: {}, children: [], setAttribute(k, v) { e.attrs[k] = v; }, appendChild(c) { e.children.push(c); return c; },
    set innerHTML(_) {}, get innerHTML() { return ''; } };
  return e;
}
global.document = { createElementNS: () => stubEl(), createElement: () => stubEl() };
global.window = global;
global.localStorage = { getItem: () => null, setItem() {} };

for (const f of ['js/rng.js', 'js/format.js', 'js/algebra.js', 'js/geometry.js', 'js/diagrams.js', 'js/game.js', 'js/manifest.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
}
for (const u of Manifest.units('maths')) {
  for (const f of u.topicFiles) vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/topics', f + '.js'), 'utf8'), { filename: f });
}
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/paper.js'), 'utf8'), { filename: 'js/paper.js' });

const problems = new Map();
const fail = (where, msg) => { const r = problems.get(msg) || { n: 0, where }; r.n++; problems.set(msg, r); };

const unitSets = [[1, 2, 3, 4, 5], [1], [2], [3], [4], [5], [1, 2], [3, 4, 5], [2, 5]];
const unitOf = id => Manifest.exercise(id).unit.key;
let built = 0;

for (const length of Object.keys(Paper.LENGTHS)) {
  const len = Paper.LENGTHS[length];
  for (const difficulty of ['core', 'hard', 'expert']) {
    for (const units of unitSets) {
      for (let seed = 1; seed <= 60; seed++) {
        const where = `${length}/${difficulty}/units ${units.join(',')}/seed ${seed}`;
        let items;
        try { items = Paper.build(new RNG(seed), { length, units, difficulty }); }
        catch (err) { fail(where, 'build threw: ' + err.message); continue; }
        built++;

        const want = [...Array(len.a).fill('A'), ...Array(len.b).fill('B'), 'C'];
        if (items.map(it => it.section).join('') !== want.join('')) fail(where, 'sections are wrong: ' + items.map(it => it.section).join(''));
        const marks = items.reduce((s, it) => s + it.marks, 0);
        if (marks !== Paper.totalMarks(len)) fail(where, `marks total ${marks}, expected ${Paper.totalMarks(len)}`);
        items.forEach(it => {
          if (it.n !== items.indexOf(it) + 1) fail(where, 'question numbers out of order');
          if (it.section === 'B') {
            if (it.parts.length !== 3) fail(where, 'a section B question does not have three parts');
            if (new Set(it.parts.map(p => p.topic)).size !== 1) fail(where, 'section B parts come from different topics');
            const idx = it.parts.map(p => p.index);
            if (!(idx[0] < idx[1] && idx[1] < idx[2])) fail(where, 'section B parts do not rise through the set: ' + idx.join(','));
          } else if (it.parts.length !== 1) fail(where, `section ${it.section} question has ${it.parts.length} parts`);
          it.parts.forEach(p => {
            if (!p.q || !p.q.prompt || !p.q.input || !p.q.input.kind) fail(where, 'a part has no question or no input');
            if (p.q && p.q.input && p.q.input.kind === 'write') fail(where, 'a free-writing question got into a paper');
            const u = unitOf(p.topic);
            if (it.section === 'C' ? u !== 6 : !units.includes(u)) fail(where, `section ${it.section} part from unit ${u}`);
          });
        });
        // The same seed must give the same paper, or a class link would hand
        // students different questions.
        const again = Paper.build(new RNG(seed), { length, units, difficulty });
        const sig = list => list.flatMap(it => it.parts.map(p => p.topic + ':' + p.index + ':' + p.q.prompt)).join('|');
        if (sig(again) !== sig(items)) fail(where, 'the same seed built a different paper');
      }
    }
  }
}

// Budgets: every question's budget is its marks times the pace, and the paper
// time covers them all.
for (const [lk, len] of Object.entries(Paper.LENGTHS)) {
  for (const [pk, pace] of Object.entries(Paper.PACES)) {
    const mins = Paper.totalMinutes(len, pace);
    if (mins < Paper.totalMarks(len) * pace.perMark - 1e-9) fail(`${lk}/${pk}`, 'paper time is shorter than the budgets');
    console.log(`  ${len.name.padEnd(5)} ${pace.name.padEnd(8)} ${Paper.totalMarks(len)} marks in ${mins} min`);
  }
}

console.log(`Built ${built} papers.`);
if (!problems.size) { console.log('No problems found.'); process.exit(0); }
for (const [msg, r] of problems) console.log(`  ${r.n}× ${msg}   (e.g. ${r.where})`);
process.exit(1);
