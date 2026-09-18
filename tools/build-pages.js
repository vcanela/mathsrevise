'use strict';
// ── Maths Revise · Page scaffolder ──────────────────────────────────────────
// Writes index.html, the unit pages and every exercise page from the manifest.
// These are plain static files, committed to the repo and served as they are;
// this script is a one-off convenience for keeping 20-odd near-identical
// shells in step, not a build step the site depends on.
//
//   node tools/build-pages.js
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// Read the manifest without a browser.
global.MRG = { getExercise: () => ({}) };
vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/manifest.js'), 'utf8'));

/** Which topic file holds each unit's generators. */
const TOPIC_FILE = { 1: 'number', 2: 'algebra', 3: 'geometry', 4: 'combined', 5: 'words' };

const CORE = ['rng', 'format', 'algebra', 'geometry', 'diagrams', 'game', 'manifest', 'timer', 'engine'];

/**
 * A short hash of every script and stylesheet, stamped onto the asset links.
 * Browsers cache these files hard, so without it a student who has opened the
 * site before can be left running last term's JavaScript for hours after an
 * update. The stamp changes only when the assets actually change.
 */
const VERSION = (() => {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha1');
  const files = [path.join(ROOT, 'css/style.css')];
  const walk = dir => {
    for (const f of fs.readdirSync(dir).sort()) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (f.endsWith('.js')) files.push(full);
    }
  };
  walk(path.join(ROOT, 'js'));
  for (const f of files) hash.update(fs.readFileSync(f));
  return hash.digest('hex').slice(0, 8);
})();

function shell({ title, up, scripts, boot }) {
  const s = scripts.map(src => `  <script src="${up}js/${src}.js?v=${VERSION}"></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="${up}css/style.css?v=${VERSION}" />
  <script src="${up}js/mathjax.js?v=${VERSION}"></script>
</head>
<body>
  <div id="app">
    <noscript>
      <p style="padding:2rem;text-align:center">
        This page builds its questions in the browser, so JavaScript needs to be switched on.
      </p>
    </noscript>
  </div>

${s}
  <script>${boot}</script>
</body>
</html>
`;
}

const written = [];
function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const before = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  if (before === content) { written.push('  unchanged  ' + rel); return; }
  fs.writeFileSync(full, content);
  written.push((before === null ? '  created    ' : '  updated    ') + rel);
}

// ── Home ─────────────────────────────────────────────────────────────────────
write('index.html', shell({
  title: 'Maths Revision',
  up: '',
  scripts: ['game', 'manifest', 'engine', 'nav'],
  boot: 'Nav.renderHome();'
}));

// ── Unit pages ───────────────────────────────────────────────────────────────
for (const u of Manifest.UNITS) {
  write(`units/unit-${u.n}.html`, shell({
    title: `${u.name} · Maths Revision`,
    up: '../',
    scripts: ['game', 'manifest', 'engine', 'nav'],
    boot: `Nav.renderUnit(${u.n});`
  }));
}

// ── Exercise pages ───────────────────────────────────────────────────────────
for (const u of Manifest.UNITS) {
  for (const ex of u.exercises) {
    write(`exercises/unit-${u.n}/exercise-${ex.n}.html`, shell({
      title: `${ex.title} · Maths Revision`,
      up: '../../',
      scripts: [...CORE, 'topics/' + TOPIC_FILE[u.n]],
      boot: `Exercise.run(Topics.${ex.id});`
    }));
  }
}

// ── Remove exercise pages the manifest no longer lists ───────────────────────
const expected = new Set(Manifest.UNITS.flatMap(u =>
  u.exercises.map(ex => path.join('exercises', 'unit-' + u.n, 'exercise-' + ex.n + '.html'))));
for (const dir of fs.readdirSync(path.join(ROOT, 'exercises'))) {
  const dirPath = path.join(ROOT, 'exercises', dir);
  if (!fs.statSync(dirPath).isDirectory()) continue;
  for (const f of fs.readdirSync(dirPath)) {
    const rel = path.join('exercises', dir, f);
    if (!expected.has(rel)) {
      fs.unlinkSync(path.join(ROOT, rel));
      written.push('  removed    ' + rel);
    }
  }
}

console.log(written.join('\n'));
console.log(`\n${Manifest.UNITS.length} units, ${Manifest.count()} exercises, asset version ${VERSION}.`);
