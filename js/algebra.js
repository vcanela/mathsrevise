'use strict';
// ── Maths Revise · Algebraic expressions ────────────────────────────────────
// A small exact-arithmetic parser for the expressions students type.
//
// Why this exists: if a question asks for "three more than double n" we must
// accept 2n+3, 3+2n, 2*n+3 and n*2+3 as the same answer, and reject 2(n+3).
// String comparison cannot do that, and floating point misjudges thirds. So
// expressions are parsed into a canonical polynomial with fraction
// coefficients and compared term by term.
//
//   Algebra.equal('2n+3', '3 + 2*n')      → true
//   Algebra.equal('2(x+3)', '2x+6')       → true
//   Algebra.parse('x/2').tex()            → '\frac{1}{2}x'
//   Algebra.isFactorised('3(x+2)')        → true
// ─────────────────────────────────────────────────────────────────────────────

const Algebra = (() => {

  // ── Exact fractions ───────────────────────────────────────────────────────
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

  function fr(n, d) {
    d = d === undefined ? 1 : d;
    if (d === 0) throw new Error('divide by zero');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  }
  const fAdd = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
  const fMul = (a, b) => fr(a.n * b.n, a.d * b.d);
  const fDiv = (a, b) => fr(a.n * b.d, a.d * b.n);
  const fNeg = a => ({ n: -a.n, d: a.d });
  const fZero = a => a.n === 0;
  const fEq = (a, b) => a.n === b.n && a.d === b.d;

  // ── Polynomials: Map<monomialKey, Fraction> ───────────────────────────────
  // Monomial key is the variables in alphabetical order with exponents:
  // '' (constant), 'x', 'x^2', 'x*y'. Built by `monoKey`.
  function monoKey(vars) {
    const names = Object.keys(vars).filter(v => vars[v] !== 0).sort();
    return names.map(v => (vars[v] === 1 ? v : v + '^' + vars[v])).join('*');
  }
  function keyVars(key) {
    const out = {};
    if (!key) return out;
    for (const part of key.split('*')) {
      const [v, e] = part.split('^');
      out[v] = (out[v] || 0) + (e ? parseInt(e, 10) : 1);
    }
    return out;
  }

  function polyConst(f) { const m = new Map(); if (!fZero(f)) m.set('', f); return m; }
  function polyVar(name) { const m = new Map(); m.set(name, fr(1)); return m; }

  function polyAdd(a, b) {
    const m = new Map(a);
    for (const [k, v] of b) {
      const s = m.has(k) ? fAdd(m.get(k), v) : v;
      if (fZero(s)) m.delete(k); else m.set(k, s);
    }
    return m;
  }
  function polyNeg(a) { const m = new Map(); for (const [k, v] of a) m.set(k, fNeg(v)); return m; }
  function polySub(a, b) { return polyAdd(a, polyNeg(b)); }

  function polyMul(a, b) {
    const m = new Map();
    for (const [ka, va] of a) for (const [kb, vb] of b) {
      const vars = keyVars(ka);
      for (const [v, e] of Object.entries(keyVars(kb))) vars[v] = (vars[v] || 0) + e;
      const k = monoKey(vars);
      const s = m.has(k) ? fAdd(m.get(k), fMul(va, vb)) : fMul(va, vb);
      if (fZero(s)) m.delete(k); else m.set(k, s);
    }
    return m;
  }

  function polyDiv(a, b) {
    if (b.size === 0) throw new Error('divide by zero');
    if (b.size !== 1 || !b.has('')) throw new Error('can only divide by a number');
    const c = b.get('');
    const m = new Map();
    for (const [k, v] of a) m.set(k, fDiv(v, c));
    return m;
  }

  function polyPow(a, n) {
    if (n < 0 || !Number.isInteger(n)) throw new Error('bad power');
    let out = polyConst(fr(1));
    for (let i = 0; i < n; i++) out = polyMul(out, a);
    return out;
  }

  function polyEq(a, b) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) { if (!b.has(k) || !fEq(b.get(k), v)) return false; }
    return true;
  }

  // Degree of a polynomial (0 for a constant, 1 for x, 2 for x^2 or xy).
  function polyDegree(p) {
    let d = 0;
    for (const k of p.keys()) {
      let t = 0;
      for (const e of Object.values(keyVars(k))) t += e;
      d = Math.max(d, t);
    }
    return d;
  }

  // Integer content: the HCF of all coefficients (1 if any are non-integer).
  function polyContent(p) {
    let g = 0;
    for (const v of p.values()) {
      if (v.d !== 1) return 1;
      g = gcd(g || v.n, v.n);
    }
    return g || 1;
  }

  // ── Tokeniser ─────────────────────────────────────────────────────────────
  function tokenise(src) {
    const out = [];
    let i = 0;
    const s = String(src).replace(/\s+/g, '')
      .replace(/[×·]/g, '*').replace(/[÷]/g, '/')
      .replace(/[−–—]/g, '-').replace(/[\[\{]/g, '(').replace(/[\]\}]/g, ')');
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        out.push({ t: 'num', v: s.slice(i, j) }); i = j;
      } else if (/[a-zA-Z]/.test(c)) {
        out.push({ t: 'var', v: c }); i++;                 // single-letter variables only
      } else if ('+-*/^()'.includes(c)) {
        out.push({ t: c }); i++;
      } else {
        throw new Error('I do not understand the character "' + c + '"');
      }
    }
    return out;
  }

  // ── Recursive-descent parser ──────────────────────────────────────────────
  //   expr   := term (('+'|'-') term)*
  //   term   := unary (('*'|'/') unary | implicit unary)*
  //   unary  := '-' unary | power
  //   power  := atom ('^' integer)?
  //   atom   := number | variable | '(' expr ')'
  function parseTokens(tok) {
    let p = 0;
    const peek = () => tok[p];
    const eat  = t => { if (tok[p] && tok[p].t === t) { p++; return true; } return false; };

    function atom() {
      const t = peek();
      if (!t) throw new Error('the expression ends too early');
      if (t.t === 'num') {
        p++;
        if (t.v.includes('.')) {
          // Turn a decimal into an exact fraction: 1.25 → 125/100.
          const dec = (t.v.split('.')[1] || '').length;
          return polyConst(fr(Math.round(parseFloat(t.v) * 10 ** dec), 10 ** dec));
        }
        return polyConst(fr(parseInt(t.v, 10)));
      }
      if (t.t === 'var') { p++; return polyVar(t.v); }
      if (t.t === '(') {
        p++;
        const inner = expr();
        if (!eat(')')) throw new Error('a bracket is not closed');
        return inner;
      }
      throw new Error('I did not expect "' + (t.v || t.t) + '" here');
    }

    function power() {
      let base = atom();
      if (eat('^')) {
        const e = peek();
        if (!e || e.t !== 'num') throw new Error('a power must be a whole number');
        p++;
        base = polyPow(base, parseInt(e.v, 10));
      }
      return base;
    }

    function unary() {
      if (eat('-')) return polyNeg(unary());
      if (eat('+')) return unary();
      return power();
    }

    function term() {
      let left = unary();
      for (;;) {
        if (eat('*'))      { left = polyMul(left, unary()); continue; }
        if (eat('/'))      { left = polyDiv(left, unary()); continue; }
        const t = peek();
        // Implicit multiplication: 2x, 3(x+1), (x+1)(x+2), xy.
        if (t && (t.t === 'num' || t.t === 'var' || t.t === '(')) { left = polyMul(left, unary()); continue; }
        return left;
      }
    }

    function expr() {
      let left = term();
      for (;;) {
        if (eat('+')) { left = polyAdd(left, term()); continue; }
        if (eat('-')) { left = polySub(left, term()); continue; }
        return left;
      }
    }

    const out = expr();
    if (p < tok.length) throw new Error('I did not expect "' + (tok[p].v || tok[p].t) + '" here');
    return out;
  }

  // ── TeX output ────────────────────────────────────────────────────────────
  function monoTex(key) {
    if (!key) return '';
    return key.split('*').map(part => {
      const [v, e] = part.split('^');
      return e ? v + '^{' + e + '}' : v;
    }).join('');
  }

  function coefTex(f, isFirst, hasVars) {
    const abs = { n: Math.abs(f.n), d: f.d };
    const sign = f.n < 0 ? '-' : (isFirst ? '' : '+');
    let body;
    if (abs.d === 1) body = (abs.n === 1 && hasVars) ? '' : String(abs.n);
    else body = '\\frac{' + abs.n + '}{' + abs.d + '}';
    return sign + body;
  }

  function polyTex(p) {
    if (p.size === 0) return '0';
    // Highest degree first, then alphabetically, constant last.
    const keys = [...p.keys()].sort((a, b) => {
      const da = a ? Object.values(keyVars(a)).reduce((s, e) => s + e, 0) : 0;
      const db = b ? Object.values(keyVars(b)).reduce((s, e) => s + e, 0) : 0;
      return db - da || a.localeCompare(b);
    });
    return keys.map((k, i) => coefTex(p.get(k), i === 0, !!k) + monoTex(k)).join('');
  }

  // ── Public wrapper ────────────────────────────────────────────────────────
  class Expression {
    constructor(poly, source) { this.poly = poly; this.source = source; }
    tex()             { return polyTex(this.poly); }
    equals(other)     { return polyEq(this.poly, toPoly(other)); }
    degree()          { return polyDegree(this.poly); }
    /** Coefficient of a monomial: coef('x'), coef('') for the constant. */
    coef(key)         { const f = this.poly.get(key || ''); return f ? f.n / f.d : 0; }
    variables()       { const s = new Set(); for (const k of this.poly.keys()) Object.keys(keyVars(k)).forEach(v => s.add(v)); return [...s]; }
    isZero()          { return this.poly.size === 0; }
  }

  function parse(src) { return new Expression(parseTokens(tokenise(src)), String(src)); }

  function toPoly(x) {
    if (x instanceof Expression) return x.poly;
    if (x instanceof Map) return x;
    if (typeof x === 'number') return polyConst(fr(x));
    return parse(x).poly;
  }

  /** True if two expressions are algebraically the same. Never throws. */
  function equal(a, b) {
    try { return polyEq(toPoly(a), toPoly(b)); } catch (_) { return false; }
  }

  /** Parse, returning { ok, expr } or { ok:false, error } for student input. */
  function tryParse(src) {
    if (!String(src).trim()) return { ok: false, error: 'Nothing typed' };
    try { return { ok: true, expr: parse(src) }; }
    catch (e) { return { ok: false, error: e.message }; }
  }

  // ── Factorising checks ────────────────────────────────────────────────────
  // A factorised answer must (a) expand to the target and (b) actually be a
  // product, with nothing left to take outside the bracket. Checking (b) needs
  // the written structure, not just the value, so this inspects the source.
  const FACTOR_RE = /^\s*(-?\d*)\s*([a-zA-Z](?:\^\d+)?)?\s*\(([^()]+)\)\s*$/;

  /** True if `src` is written as k·(…) or k·x·(…) with the bracket reduced. */
  function isFactorised(src) {
    const m = FACTOR_RE.exec(String(src).replace(/[−–—]/g, '-').replace(/\s+/g, ''));
    if (!m) return false;
    const outsideNum = m[1] === '' || m[1] === '-' ? (m[1] === '-' ? -1 : 1) : parseInt(m[1], 10);
    const outsideVar = m[2] || '';
    if (outsideNum === 0) return false;
    let inner;
    try { inner = parse(m[3]).poly; } catch (_) { return false; }
    if (inner.size < 2) return false;                       // 3(x) is not factorising
    if (polyContent(inner) !== 1) return false;             // 2(2x+4) is not finished
    // Nothing common left: no variable appears in every term of the bracket.
    const varSets = [...inner.keys()].map(k => new Set(Object.keys(keyVars(k))));
    for (const v of varSets[0] || []) if (varSets.every(s => s.has(v))) return false;
    if (Math.abs(outsideNum) === 1 && !outsideVar) return false; // 1(3x+6) is not factorising
    return true;
  }

  /** Full factorising check: correct value AND fully taken outside. */
  function checkFactorised(src, target) {
    const t = tryParse(src);
    if (!t.ok) return { ok: false, why: t.error };
    if (!equal(t.expr, target)) return { ok: false, why: 'That does not expand back to the original.' };
    if (!isFactorised(src)) return { ok: false, why: 'Not fully factorised — there is still a common factor to take outside.' };
    return { ok: true };
  }

  return { parse, tryParse, equal, polyTex, isFactorised, checkFactorised, Expression, fr };
})();
