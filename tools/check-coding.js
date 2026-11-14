'use strict';
// ── Revision · Coding checker ───────────────────────────────────────────────
// A "predict the output" question with the wrong answer is worse than none,
// so every program a coding question shows is run twice: in Skulpt, the
// Python the page runs, and in real Python (python3 on this machine). Both
// must agree with the answer the question expects, or the check fails.
//
// For a "write a program" question: the model program must pass every test
// in both, and the starter program must not pass (or the task asks nothing).
//
//   node tools/check-coding.js [seeds]
//
// Skulpt is fetched once from the same pinned CDN address the pages use, its
// checksum confirmed, and kept in tools/.cache (not committed).
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const vm = require('vm');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SEEDS = Number(process.argv[2]) || 150;

const SKULPT = {
  'skulpt.min.js': { url: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js', sha256: '1a319d8eedf314dba5af2444313e3cf2ac072a335df0f5100277e8f49b64eae9' },
  'skulpt-stdlib.js': { url: 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js', sha256: 'e3ecccbc17c6164d19ed3c5561aaaeb752c38c8efa2d88b62b5fb7a7e1b086a7' }
};
const CACHE = path.join(__dirname, '.cache', 'skulpt-1.2.0');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) { reject(new Error(url + ' → ' + res.statusCode)); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function loadSkulpt() {
  fs.mkdirSync(CACHE, { recursive: true });
  for (const [name, { url, sha256 }] of Object.entries(SKULPT)) {
    const file = path.join(CACHE, name);
    if (!fs.existsSync(file)) fs.writeFileSync(file, await fetch(url));
    const sum = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    if (sum !== sha256) throw new Error(`${name} checksum mismatch: delete ${CACHE} and run again`);
  }
  require(path.join(CACHE, 'skulpt.min.js'));
  require(path.join(CACHE, 'skulpt-stdlib.js'));
}

// ── A browser-free page, as in check-topics.js ──────────────────────────────
function stubEl() {
  const e = { attrs: {}, children: [], setAttribute(k, v) { e.attrs[k] = v; }, appendChild(c) { e.children.push(c); return c; },
    set innerHTML(_) {}, get innerHTML() { return ''; } };
  return e;
}
global.document = { createElementNS: () => stubEl(), createElement: () => stubEl() };
global.window = global;
global.localStorage = { getItem: () => null, setItem() {} };

// ── Real Python ─────────────────────────────────────────────────────────────
const CPYTHON = `
import sys, json, io, contextlib, traceback
cases = json.load(sys.stdin)
results = []
for c in cases:
    buf = io.StringIO()
    answers = list(c.get('inputs') or [])
    def fake_input(prompt=''):
        return answers.pop(0) if answers else ''
    env = {'__name__': '__main__', 'input': fake_input}
    err, line = None, None
    try:
        code = compile(c['code'], '<stdin>', 'exec')
        with contextlib.redirect_stdout(buf):
            exec(code, env)
    except SyntaxError as e:
        err, line = type(e).__name__, e.lineno
    except Exception as e:
        err = type(e).__name__
        frames = [f for f in traceback.extract_tb(e.__traceback__) if f.filename == '<stdin>']
        line = frames[-1].lineno if frames else None
    results.append({'out': buf.getvalue(), 'error': err, 'line': line})
print(json.dumps(results))
`;

function runCPython(cases) {
  const r = spawnSync('python3', ['-I', '-c', CPYTHON], { input: JSON.stringify(cases), maxBuffer: 1 << 28, timeout: 300000 });
  if (r.status !== 0) throw new Error('python3 failed: ' + String(r.stderr).slice(0, 500));
  return JSON.parse(String(r.stdout));
}

// SyntaxError subclasses (IndentationError, TabError) count as SyntaxError.
const sameError = (got, want) => got === want || (want === 'SyntaxError' && /^(IndentationError|TabError)$/.test(got));

(async () => {
  await loadSkulpt();
  for (const f of ['js/rng.js', 'js/format.js', 'js/geometry.js', 'js/diagrams.js', 'js/game.js', 'js/manifest.js', 'js/science.js', 'js/python.js']) {
    vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
  }
  const files = fs.readdirSync(path.join(ROOT, 'js/topics')).filter(f => /^coding-.*\.js$/.test(f));
  for (const f of files) vm.runInThisContext(fs.readFileSync(path.join(ROOT, 'js/topics', f), 'utf8'), { filename: f });

  const ids = Manifest.live('coding').map(e => e.id);
  const problems = new Map();
  const fail = (where, msg) => { const r = problems.get(msg) || { n: 0, where }; r.n++; problems.set(msg, r); };

  // Collect each distinct program once, with every place it is used.
  const shown = new Map();         // code → { output|error, line, where }
  const tasks = [];                // { where, spec }
  let questions = 0;
  for (const id of ids) {
    const topic = Topics[id];
    if (!topic) { fail(id, 'no topic for ' + id); continue; }
    // The main set and, where there is one, the Challenge set.
    for (const mode of topic.hasChallenge ? [false, true] : [false]) {
    Sci.challenge = mode;
    for (let seed = 1; seed <= SEEDS; seed++) {
      let qs;
      try { qs = topic.generate(new RNG(seed * 7919 + 13), 'core'); } catch (e) { fail(`${id}/seed ${seed}`, 'generate threw: ' + e.message); continue; }
      qs.forEach((q, i) => {
        questions++;
        const where = `${id}${mode ? ' challenge' : ''} Q${i + 1} (${q.slot})`;
        if (q.input.kind === 'code') {
          const s = q.input;
          if (!s.model || !s.tests || !s.tests.length) fail(where, 'code question needs a model and tests');
          else tasks.push({ where, spec: s });
          return;
        }
        for (const c of q.py || []) {
          const key = c.code + '\u0000' + JSON.stringify(c.inputs || []);
          const prev = shown.get(key);
          if (prev && (prev.output !== c.output || prev.error !== c.error)) fail(where, 'the same program expects two different results: ' + JSON.stringify(key));
          shown.set(key, { ...c, where });
        }
      });
    }
    }
    Sci.challenge = false;
  }

  // ── Programs shown in questions ──
  const programs = [...shown.values()];
  const sk = [];
  for (const c of programs) sk.push(await Py.run(c.code, { inputs: c.inputs || [] }));
  const cp = runCPython(programs.map(c => ({ code: c.code, inputs: c.inputs || [] })));
  programs.forEach((c, i) => {
    const s = sk[i], p = cp[i];
    const label = `${c.where}: ${JSON.stringify(c.code)}`;
    if (c.error) {
      if (!s.error || !sameError(s.error.name, c.error)) fail(label, `Skulpt gives ${s.error ? s.error.name : 'no error'}, expected ${c.error}`);
      if (!p.error || !sameError(p.error, c.error)) fail(label, `Python gives ${p.error || 'no error'}, expected ${c.error}`);
      if (c.line && s.error && s.error.line !== c.line) fail(label, `Skulpt reports line ${s.error.line}, expected line ${c.line}`);
    } else {
      const want = Py.norm(c.output);
      if (s.error) fail(label, `Skulpt raises ${s.error.name}: ${s.error.text}`);
      else if (Py.norm(s.out) !== want) fail(label, `Skulpt prints ${JSON.stringify(s.out)}, expected ${JSON.stringify(c.output)}`);
      if (p.error) fail(label, `Python raises ${p.error}`);
      else if (Py.norm(p.out) !== want) fail(label, `Python prints ${JSON.stringify(p.out)}, expected ${JSON.stringify(c.output)}`);
    }
  });

  // ── Write-a-program questions ──
  const seen = new Set();
  const cpCases = [], cpWho = [];
  for (const t of tasks) {
    const sig = JSON.stringify([t.spec.model, t.spec.tests, t.spec.starter]);
    if (seen.has(sig)) continue;
    seen.add(sig);
    const model = await Py.test(t.spec.model, t.spec.tests);
    if (!model.pass) fail(t.where, 'Skulpt: the model fails its own test: ' + JSON.stringify(model.failed.got || model.failed.error));
    const starter = await Py.test(t.spec.starter || '', t.spec.tests);
    if (starter.pass) fail(t.where, 'the starter program already passes, so the task asks nothing');
    for (const test of t.spec.tests) {
      cpCases.push({ code: Py.withValues(t.spec.model, test.set), inputs: test.inputs || [] });
      cpWho.push({ where: t.where, expect: test.expect });
    }
  }
  runCPython(cpCases).forEach((r, i) => {
    const w = cpWho[i];
    if (r.error) fail(w.where, 'Python: the model raises ' + r.error);
    else if (Py.norm(r.out) !== Py.norm(w.expect)) fail(w.where, `Python: the model prints ${JSON.stringify(r.out)}, expected ${JSON.stringify(w.expect)}`);
  });

  console.log(`Checked ${questions} questions (${SEEDS} seeds): ${programs.length} distinct programs and ${seen.size} programming tasks, each in Skulpt and Python ${spawnSync('python3', ['--version']).stdout.toString().trim().replace('Python ', '')}.`);
  if (!problems.size) { console.log('No problems found.'); process.exit(0); }
  for (const [msg, r] of problems) console.log(`  ${r.n}× ${msg}\n      e.g. ${r.where}`);
  process.exit(1);
})().catch(e => { console.error(e); process.exit(1); });
