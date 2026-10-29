'use strict';
// ── Review keys ─────────────────────────────────────────────────────────────
// A stable fingerprint for every authored science item and Learn it card, so
// the review page can mark what is new since the last approved review.
//
// Authored items are fingerprinted by their content (prompt, options, lines),
// drawn with a fixed seed so shuffling cannot change the key. Generated items
// have different content every time, so they are fingerprinted by their code.
//
// Used by tools/review-baseline.js (to take a snapshot) and by
// tools/review-science.html (to compare against it).
// ─────────────────────────────────────────────────────────────────────────────

const ReviewKey = (() => {
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36);
  }

  function item(topicId, fn) {
    if (fn.generated) return 'G|' + topicId + '|' + hash(fn.toString());
    const q = fn(new RNG(12345), 'core');
    const i = q.input || {};
    const parts = [q.prompt, q.note || '', q.explain || ''];
    for (const list of [i.options, i.bank || i.items, i.lines, i.left, i.right, i.markers]) {
      if (list) parts.push(list.map(x => JSON.stringify(x)).sort().join('~'));
    }
    return 'A|' + topicId + '|' + hash(parts.join('|'));
  }

  function card(topicId, c) { return 'L|' + topicId + '|' + hash(c.title + '|' + c.text); }

  return { item, card, hash };
})();

if (typeof module !== 'undefined') module.exports = ReviewKey;
