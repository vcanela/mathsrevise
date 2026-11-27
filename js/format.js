'use strict';
// ── Maths Revise · Formatting helpers ───────────────────────────────────────
// Turning generated numbers into the TeX a student expects to read. The fiddly
// parts are the ones people get wrong by hand: writing x rather than 1x,
// -x rather than -1x, and joining terms with the right sign.
// ─────────────────────────────────────────────────────────────────────────────

const Fmt = (() => {

  /** A single term: coefficient and variable part. coef 1 and -1 lose the 1. */
  function term(coef, v) {
    if (!v) return String(coef);
    if (coef === 0) return '0';
    if (coef === 1)  return v;
    if (coef === -1) return '-' + v;
    return coef + v;
  }

  /**
   * Join terms into an expression with correct signs.
   *   sum([[3,'x'], [-2,'y'], [5,'']])  →  '3x - 2y + 5'
   * Zero terms are dropped; an all-zero list gives '0'.
   */
  function sum(pairs) {
    const live = pairs.filter(([c]) => c !== 0);
    if (!live.length) return '0';
    return live.map(([c, v], i) => {
      const body = term(Math.abs(c), v);
      if (i === 0) return (c < 0 ? '-' : '') + body;
      return (c < 0 ? ' - ' : ' + ') + body;
    }).join('');
  }

  /** Inline maths, ready to drop into a prompt. */
  const tex   = s => '\\(' + s + '\\)';
  const mSum  = pairs => tex(sum(pairs));
  const mTerm = (c, v) => tex(term(c, v));

  /** A number with its sign always shown: '+5', '-3'. */
  const signed = n => (n < 0 ? '−' : '+') + Math.abs(n);

  /** Minus signs that read properly in prose (U+2212, not a hyphen). */
  const num = n => String(n).replace('-', '−');

  /** '3 cm', '12°' and so on. */
  const unit = (n, u) => num(n) + (u || '');

  /** A fraction in TeX, reduced, with whole numbers left plain. */
  function frac(n, d) {
    const g = (function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; })(n, d);
    n /= g; d /= g;
    if (d < 0) { n = -n; d = -d; }
    if (d === 1) return String(n);
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  }

  /** Round for display, dropping a trailing .0 */
  const dp = (v, places) => {
    const s = Number(v).toFixed(places === undefined ? 2 : places);
    return s.replace(/\.?0+$/, '') || '0';
  };

  /** 'a', 'an' chosen for the following word. */
  const an = w => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;

  /** Ordinal words used in polygon names. */
  const POLY = {
    3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon',
    7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon'
  };
  const polyName = n => POLY[n] || (n + '-sided polygon');

  /** Common single-letter variables, avoiding the confusing ones. */
  const VARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  /**
   * The balance step that removes a number from one side of an equation:
   * bothSides(7) is "Subtract 7 from both sides", bothSides(-7) is "Add 7 to both sides".
   * Equations are always solved by doing the same to both sides, never by
   * "moving a term across the equals sign".
   */
  const bothSides = k => k < 0 ? `Add ${num(-k)} to both sides` : `Subtract ${num(k)} from both sides`;

  /**
   * The balance steps that solve a·v + b = c, as prose with inline maths:
   * "Subtract 27 from both sides: \(9x = 153\). Divide both sides by 9: \(x = 17\)."
   * A step is left out when it is not needed (b is 0, or a is 1).
   */
  const solveSteps = (a, b, c, v = 'x') => {
    const out = [];
    if (b !== 0) out.push(`${bothSides(b)}: ${tex(`${term(a, v)} = ${c - b}`)}.`);
    if (a !== 1) out.push(`Divide both sides by ${num(a)}: ${tex(`${v} = ${(c - b) / a}`)}.`);
    return out.join(' ');
  };

  return { term, sum, tex, mSum, mTerm, signed, num, unit, frac, dp, an, polyName, bothSides, solveSteps, VARS };
})();
