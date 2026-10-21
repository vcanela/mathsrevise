'use strict';
// ── Maths Revise · Question checker ─────────────────────────────────────────
// Because the questions are generated rather than written out, correctness has
// to be tested rather than read. This builds every topic many times over, at
// every difficulty, and checks each question against its own answer key:
// numeric answers are whole numbers, typed answers parse and match, multiple
// choice has exactly one right option, matches are real permutations, and
// every diagram draws without throwing.
//
//   node tools/check-topics.js
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── A DOM stub, just enough for the geometry and diagram code ───────────────
function stubEl() {
  const e = {
    attrs: {}, children: [], textContent: '',
    setAttribute(k, v) {
      if (v === undefined || v === null) throw new Error('attribute ' + k + ' set to ' + v);
      if (typeof v === 'number' && !Number.isFinite(v)) throw new Error('attribute ' + k + ' is ' + v);
      if (typeof v === 'string' && /NaN|undefined/.test(v)) throw new Error('attribute ' + k + ' contains "' + v + '"');
      e.attrs[k] = v;
    },
    appendChild(c) { e.children.push(c); return c; },
    set innerHTML(_) { e.children.length = 0; },
    get innerHTML() { return ''; }
  };
  return e;
}
global.document = { createElementNS: () => stubEl(), createElement: () => stubEl() };
global.window = global;
global.localStorage = {
  _d: {},
  getItem(k) { return k in this._d ? this._d[k] : null; },
  setItem(k, v) { this._d[k] = String(v); }
};

for (const f of ['js/rng.js', 'js/format.js', 'js/algebra.js', 'js/geometry.js',
                 'js/diagrams.js', 'js/game.js', 'js/manifest.js', 'js/science.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
}

const topicFiles = fs.readdirSync(path.join(ROOT, 'js/topics')).filter(f => f.endsWith('.js')).sort();
for (const f of topicFiles) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/topics', f), 'utf8'), { filename: 'topics/' + f });
}

// ── Checks ───────────────────────────────────────────────────────────────────
const problems = [];
let checked = 0;

function fail(where, msg, extra) {
  problems.push(where + ': ' + msg + (extra ? '  [' + extra + ']' : ''));
}

const isInt = v => Number.isInteger(v);
const isPerm = (arr, n) => arr.length === n && [...arr].sort((a, b) => a - b).every((v, i) => v === i);

function checkQuestion(where, q) {
  checked++;
  if (typeof q.prompt !== 'string' || !q.prompt.trim()) return fail(where, 'empty prompt');
  if (/undefined|NaN/.test(q.prompt)) return fail(where, 'prompt contains undefined/NaN', q.prompt.slice(0, 90));
  if (q.note && /undefined|NaN/.test(q.note)) fail(where, 'note contains undefined/NaN');
  if (q.explain && /undefined|NaN/.test(q.explain)) fail(where, 'explain contains undefined/NaN', q.explain.slice(0, 90));

  const inp = q.input;
  if (!inp || !inp.kind) return fail(where, 'no input spec');

  switch (inp.kind) {
    case 'number': {
      if (!Number.isFinite(inp.answer)) fail(where, 'number answer is not finite: ' + inp.answer);
      else if (!isInt(inp.answer) && inp.tol === undefined && !inp.decimal)
        fail(where, 'number answer is not a whole number and no tolerance given: ' + inp.answer);
      break;
    }
    case 'fill': {
      // Both plain boxes and the stacked fraction pair count as answer boxes.
      const boxes = inp.parts.flatMap(p =>
        p.input ? [p.input] : p.frac ? [p.frac.num, p.frac.den] : []);
      if (!boxes.length) fail(where, 'fill with no answer boxes');
      boxes.forEach((b, i) => {
        if (!Number.isFinite(b.answer)) fail(where, `fill box ${i + 1} answer is ${b.answer}`);
        else if (!isInt(b.answer) && b.tol === undefined && !b.decimal)
          fail(where, `fill box ${i + 1} is not a whole number: ${b.answer}`);
      });
      // A fraction answer box pair must be in lowest terms, or two different
      // correct answers exist and only one is accepted.
      inp.parts.filter(p => p.frac).forEach(p => {
        const n = p.frac.num.answer, d = p.frac.den.answer;
        if (!isInt(n) || !isInt(d)) return;
        if (d === 0) return fail(where, 'fraction answer has denominator 0');
        const g = (function gg(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; })(n, d);
        if (n !== 0 && g !== 1) fail(where, `fraction answer ${n}/${d} is not in lowest terms`);
      });
      break;
    }
    case 'choice': {
      if (!Array.isArray(inp.options) || inp.options.length < 2) return fail(where, 'choice needs 2+ options');
      if (!isInt(inp.correct) || inp.correct < 0 || inp.correct >= inp.options.length)
        return fail(where, 'choice correct index out of range: ' + inp.correct);
      const texts = inp.options.map(o => (o.html !== undefined ? o.html : String(o)));
      if (new Set(texts).size !== texts.length) fail(where, 'choice has duplicate options', texts.join(' | '));
      if (texts.some(t => /undefined|NaN/.test(t))) fail(where, 'choice option contains undefined/NaN');
      // If options carry a `right` flag, exactly one must be true and it must
      // be the one `correct` points at.
      if (inp.options.some(o => o && typeof o === 'object' && 'right' in o)) {
        const rights = inp.options.map((o, i) => (o.right ? i : -1)).filter(i => i >= 0);
        if (rights.length !== 1) fail(where, 'choice has ' + rights.length + ' options flagged right');
        else if (rights[0] !== inp.correct) fail(where, 'choice correct index disagrees with the right flag');
      }
      break;
    }
    case 'expr': {
      if (!isInt(inp.wrong) && inp.answer === undefined) return fail(where, 'expr has no answer');
      const p = Algebra.tryParse(String(inp.answer));
      if (!p.ok) return fail(where, 'expr answer does not parse: ' + inp.answer + ' (' + p.error + ')');
      if (inp.mode === 'factorised') {
        // The worked answer shown to the student must itself be accepted.
        const shown = String(inp.display || '').replace(/\\\(|\\\)/g, '');
        const r = Algebra.checkFactorised(shown, inp.answer);
        if (!r.ok) fail(where, 'the model factorised answer is rejected: ' + shown + ' (' + r.why + ')');
      }
      break;
    }
    case 'spot': {
      if (!Array.isArray(inp.lines) || inp.lines.length < 2) return fail(where, 'spot needs 2+ lines');
      if (!isInt(inp.wrong) || inp.wrong < 0 || inp.wrong >= inp.lines.length)
        fail(where, 'spot wrong index out of range: ' + inp.wrong);
      if (inp.lines.some(l => /undefined|NaN/.test(l))) fail(where, 'spot line contains undefined/NaN');
      const uniq = new Set(inp.lines);
      if (uniq.size !== inp.lines.length) fail(where, 'spot has two identical lines');
      break;
    }
    case 'match': {
      if (inp.left.length !== inp.right.length) return fail(where, 'match columns differ in length');
      if (inp.tags.length !== inp.right.length) fail(where, 'match tags do not cover the right column');
      if (!isPerm(inp.answer, inp.left.length)) fail(where, 'match answer is not a permutation: ' + inp.answer);
      if (new Set(inp.right).size !== inp.right.length) fail(where, 'match right column has duplicates', inp.right.join(' | '));
      if (new Set(inp.left).size !== inp.left.length) fail(where, 'match left column has duplicates');
      break;
    }
    case 'order': {
      if (!isPerm(inp.answer, inp.items.length)) fail(where, 'order answer is not a permutation: ' + inp.answer);
      if (new Set(inp.items).size !== inp.items.length) fail(where, 'order has two identical items');
      break;
    }
    case 'sort': {
      if (!Array.isArray(inp.bins) || inp.bins.length < 2) return fail(where, 'sort needs 2+ groups');
      if (!Array.isArray(inp.items) || inp.items.length < 2) return fail(where, 'sort needs 2+ items');
      inp.items.forEach((it, i) => {
        if (!isInt(it.bin) || it.bin < 0 || it.bin >= inp.bins.length) fail(where, `sort item ${i + 1} has no valid group`);
      });
      if (new Set(inp.items.map(it => it.html)).size !== inp.items.length) fail(where, 'sort has two identical items');
      // Every group should be the answer at least once, or a student can
      // never be wrong by choosing it.
      if (!inp.bins.every((_, b) => inp.items.some(it => it.bin === b))) fail(where, 'sort leaves a group with nothing in it');
      break;
    }
    case 'label': {
      if (!Array.isArray(inp.markers) || !inp.markers.length) return fail(where, 'label has no markers');
      inp.markers.forEach((name, i) => {
        if (!inp.options.includes(name)) fail(where, `label ${i + 1} answer "${name}" is not among the options`);
      });
      if (new Set(inp.options).size !== inp.options.length) fail(where, 'label options have duplicates');
      if (new Set(inp.markers).size !== inp.markers.length) fail(where, 'two labels share the same answer');
      break;
    }
    default:
      fail(where, 'unknown input kind: ' + inp.kind);
  }

  // Authored science items lean entirely on their explanation: it is the
  // "Show me how" step and the feedback after a wrong answer.
  if (where.startsWith('s') && !(q.explain && String(q.explain).trim())) fail(where, 'science question has no explanation');

  // Diagrams must draw without throwing and without emitting NaN coordinates.
  if (q.draw) {
    try {
      const svg = stubEl();
      q.draw(Geo.canvas(svg, (q.diagram && q.diagram.w) || 230, (q.diagram && q.diagram.h) || 180), Geo);
    } catch (err) {
      fail(where, 'diagram threw: ' + err.message);
    }
  }
}

function checkExample(where, ex) {
  if (!ex.draw) return;
  try {
    const svg = stubEl();
    ex.draw(Geo.canvas(svg, (ex.diagram && ex.diagram.w) || 250, (ex.diagram && ex.diagram.h) || 190), Geo);
  } catch (err) {
    fail(where, 'example diagram threw: ' + err.message);
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────
const RUNS = Number(process.argv[2]) || 400;
const ids = Object.keys(Topics).sort();
if (!ids.length) { console.error('No topics loaded.'); process.exit(1); }

// Every live exercise needs a topic; every topic must be listed. Exercises
// marked `soon` are allowed to have no topic yet.
const liveIds = Manifest.live().map(e => e.id);
const allIds = Manifest.UNITS.flatMap(u => u.exercises.map(e => e.id));
for (const id of liveIds) if (!Topics[id]) fail('manifest', 'no generator for ' + id);
for (const id of ids) if (!allIds.includes(id)) fail('manifest', Topics[id].id + ' is not listed in the manifest');

for (const id of ids) {
  const topic = Topics[id];
  (topic.examples || []).forEach((ex, i) => checkExample(`${id} example ${i + 1}`, ex));

  let counts = new Set();
  for (const diff of ['core', 'hard', 'expert']) {
    for (let run = 0; run < RUNS; run++) {
      const rng = new RNG(run * 7919 + 13);
      let qs;
      try { qs = topic.generate(rng, diff); }
      catch (err) { fail(`${id}/${diff}/seed${run}`, 'generate threw: ' + err.message); continue; }
      if (!Array.isArray(qs) || !qs.length) { fail(`${id}/${diff}/seed${run}`, 'generate returned nothing'); continue; }
      counts.add(qs.length);
      qs.forEach((q, i) => checkQuestion(`${id}/${diff}/seed${run}/Q${i + 1}`, q));
    }
  }
  if (counts.size > 1) fail(id, 'question count varies between runs: ' + [...counts].join(', '));

  // "Try one like it" regenerates the same topic at the same index, so the
  // index has to mean the same kind of question every time. If a generator
  // ever starts varying what it emits at a position, a student asking for a
  // similar question would silently get an unrelated one.
  for (const diff of ['core', 'expert']) {
    const kinds = [];
    for (let run = 0; run < Math.min(RUNS, 120); run++) {
      let qs;
      try { qs = topic.generate(new RNG(run * 7919 + 13), diff); } catch (_) { continue; }
      (qs || []).forEach((q, i) => {
        (kinds[i] = kinds[i] || new Set()).add(q.input && q.input.kind);
      });
    }
    kinds.forEach((set, i) => {
      if (set.size > 1) {
        fail(`${id}/${diff}/Q${i + 1}`,
             'question type varies by run, so "one like it" would not match: ' + [...set].join(' | '));
      }
    });
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
// One line per distinct problem, with how often it came up. Individual seeds
// are collapsed, since the same bug usually fires on hundreds of them.
const tally = new Map();
for (const p of problems) {
  const key = p.replace(/\/seed\d+\//, '/');
  const rec = tally.get(key) || { n: 0, sample: p };
  rec.n++;
  tally.set(key, rec);
}
console.log(`Checked ${checked} generated questions across ${ids.length} topics (${RUNS} seeds each, 3 difficulties).`);
if (!tally.size) {
  console.log('No problems found.');
  process.exit(0);
}
const rows = [...tally.entries()].sort((a, b) => b[1].n - a[1].n);
console.log(`\n${problems.length} problem(s), ${rows.length} distinct:\n`);
for (const [key, rec] of rows.slice(0, 50)) {
  console.log(`  [${String(rec.n).padStart(5)}×] ${key}`);
}
if (rows.length > 50) console.log(`  … and ${rows.length - 50} more kinds`);
process.exit(1);
