'use strict';
// ── Maths Revise · MathJax loader ───────────────────────────────────────────
// Configures MathJax and pulls it in, so each page needs one script tag
// instead of a block of inline configuration.
//
// MJ.typeset(nodes) is safe to call at any time. Calls made before MathJax has
// finished downloading are remembered and run once it is ready, which matters
// because the engine renders its questions long before a CDN script arrives.
// ─────────────────────────────────────────────────────────────────────────────

const MJ = (() => {
  let ready   = false;
  let pending = [];          // nodes waiting for MathJax; null means "whole page"

  function run(nodes) {
    return window.MathJax.typesetPromise(nodes).catch(() => {});
  }

  window.MathJax = {
    tex: {
      inlineMath:  [['\\(', '\\)']],
      displayMath: [['\\[', '\\]']]
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      enableMenu: false
    },
    chtml: { scale: 1.02 },
    startup: {
      typeset: false,
      pageReady() {
        ready = true;
        const queued = pending;
        pending = [];
        if (queued.length === 0) return Promise.resolve();
        // If anything asked for a full-page pass, one pass covers everything.
        if (queued.some(n => n === null)) return run();
        return run(queued.flat());
      }
    }
  };

  const s = document.createElement('script');
  s.src   = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
  s.async = true;
  document.head.appendChild(s);

  return {
    /** Typeset the given elements, or the whole page when called with nothing. */
    typeset(nodes) {
      if (ready) return run(nodes);
      pending.push(nodes || null);
      return Promise.resolve();
    },
    get isReady() { return ready; }
  };
})();
