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

const CORE = ['rng', 'format', 'algebra', 'geometry', 'diagrams', 'game', 'manifest', 'timer', 'engine'];
// Science and English pages also need science.js: the helpers that build
// banked questions (Sci), and the science diagrams.
const SCIENCE = ['science'];

/** The scripts an exercise in this unit needs, in load order. */
const scriptsFor = u => [...CORE, ...(u.subject !== 'maths' ? SCIENCE : []), ...u.topicFiles.map(f => 'topics/' + f)];

// The daily mix can draw from any unit, so it loads every topic file.
const ALL_TOPICS = [...new Set(Manifest.UNITS.flatMap(u => u.topicFiles.map(f => 'topics/' + f)))];

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

// version.json tells open pages whether a newer version has been pushed. Its
// date changes only when the version does, so rebuilding unchanged code
// leaves every file untouched.
const BUILT = (() => {
  const file = path.join(ROOT, 'version.json');
  try {
    const old = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (old.version === VERSION && old.built) return old.built;
  } catch (_) {}
  // Local date, not UTC: in New Zealand UTC is still yesterday until midday.
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
})();

function shell({ title, up, scripts, boot }) {
  const s = [...scripts, 'update'].map(src => `  <script src="${up}js/${src}.js?v=${VERSION}"></script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="site-version" content="${VERSION}" data-built="${BUILT}" data-root="${up}" />
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

write('version.json', JSON.stringify({ version: VERSION, built: BUILT }) + '\n');

// ── Home ─────────────────────────────────────────────────────────────────────
write('index.html', shell({
  title: 'Revision',
  up: '',
  scripts: ['game', 'manifest', 'engine', 'habit', 'nav'],
  boot: 'Nav.renderHome();'
}));

// ── Daily practice ───────────────────────────────────────────────────────────
// Needs every topic loaded, since a session draws from across the whole site.
write('practice.html', shell({
  title: "Today's practice · Revision",
  up: '',
  scripts: [...CORE, ...SCIENCE, ...ALL_TOPICS, 'practice'],
  boot: 'Practice.start();'
}));

// ── Unit pages ───────────────────────────────────────────────────────────────
for (const u of Manifest.UNITS) {
  write(u.page, shell({
    title: `${u.name} · Revision`,
    up: '../',
    scripts: ['game', 'manifest', 'engine', 'nav'],
    boot: `Nav.renderUnit(${JSON.stringify(u.key)});`
  }));
}

// ── Exercise pages ───────────────────────────────────────────────────────────
// Exercises marked `soon` have no page yet; their cards show as placeholders.
for (const u of Manifest.UNITS) {
  for (const ex of u.exercises) {
    if (ex.soon) continue;
    write(ex.href, shell({
      title: `${ex.title} · Revision`,
      up: '../../',
      scripts: scriptsFor(u),
      boot: `Exercise.run(Topics.${ex.id});`
    }));
  }
}

// ── Forward the old addresses ────────────────────────────────────────────────
// Science used to be grouped by year. Links to those pages may be saved in
// bookmarks or class pages, so each old address forwards to the new one,
// keeping any ?set=N so a shared set still opens the same questions.
function forward(rel, target) {
  const up = '../'.repeat(rel.split('/').length - 1);
  const to = up + target;
  write(rel, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Moved · Revision</title>
  <meta http-equiv="refresh" content="0; url=${to}" />
  <link rel="canonical" href="${to}" />
  <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
</head>
<body><p style="font-family:sans-serif;padding:2rem">This page has moved: <a href="${to}">continue</a>.</p></body>
</html>
`);
}
const forwarded = [];
for (const ex of Manifest.live('science')) {
  if (!ex.old) continue;
  forward(ex.old, ex.href);
  forwarded.push(ex.old);
}
for (const y of [7, 8]) {
  forward(`science/year-${y}.html`, 'index.html#science');
  forwarded.push(`science/year-${y}.html`);
}

// ── Remove exercise pages the manifest no longer lists ───────────────────────
const expected = new Set([...Manifest.live().map(ex => ex.href), ...forwarded].map(p => path.normalize(p)));
for (const top of ['exercises', 'science', 'english']) {
  const topPath = path.join(ROOT, top);
  if (!fs.existsSync(topPath)) continue;
  for (const dir of fs.readdirSync(topPath)) {
    const dirPath = path.join(topPath, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    for (const f of fs.readdirSync(dirPath)) {
      const rel = path.join(top, dir, f);
      if (f.endsWith('.html') && !expected.has(path.normalize(rel))) {
        fs.unlinkSync(path.join(ROOT, rel));
        written.push('  removed    ' + rel);
      }
    }
  }
}

console.log(written.join('\n'));
console.log(`\n${Manifest.UNITS.length} units, ${Manifest.count('maths')} maths, ${Manifest.count('science')} science and ` +
            `${Manifest.count('english')} English exercises live, asset version ${VERSION}.`);
