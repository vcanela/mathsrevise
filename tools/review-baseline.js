'use strict';
// ── Revision · Review snapshot ──────────────────────────────────────────────
// Records a fingerprint of every science item and Learn it card as it stands
// now. Run it after a batch of new content has been reviewed and approved;
// tools/review-science.html then marks anything added since as "new".
//
//   node tools/review-baseline.js
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


const ReviewKey = require('./review-key.js');
const keys = [];
for (const id of Object.keys(Topics).sort()) {
  const t = Topics[id];
  if (!t.slots) continue;
  for (const slot of t.slots) for (const fn of slot.items) keys.push(ReviewKey.item(id, fn));
  for (const c of t.learn || []) keys.push(ReviewKey.card(id, c));
}
const file = path.join(__dirname, 'review-baseline.json');
fs.writeFileSync(file, JSON.stringify({ taken: new Date().toISOString().slice(0, 10), keys: [...new Set(keys)].sort() }, null, 0) + '\n');
console.log(`Snapshot of ${new Set(keys).size} science items and cards written to tools/review-baseline.json.`);
