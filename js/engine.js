'use strict';
// ── Maths Revise · Exercise engine ──────────────────────────────────────────
// Renders a whole exercise page from a topic definition: the header, the
// worked examples, the question cards, the scoring and the results panel.
// Everything that used to be copied into all twelve exercise files lives here.
//
// A topic supplies content only:
//
//   Exercise.run({
//     id: 'u2e1', unit: 2,
//     title: 'Collecting Like Terms',
//     blurb: 'Group the terms that share a letter.',
//     learn:    [ { id, title, text, draw, diagram:{w,h,caption} } ],   (optional)
//     examples: [ { title, steps:[…], draw } ],
//     hint: 'Only combine terms with the same letter.',
//     generate(rng, difficulty) { return [ …question objects… ]; }
//   });
//
// A question object:
//   { prompt, note, tag, draw, diagram:{w,h}, input:{…}, explain, learn }
//
// `learn` names the "Learn it" card that answers the question; "Stuck?" then
// links to it.
//
// Input kinds: number, fill, choice, expr, spot, match, order.
// ─────────────────────────────────────────────────────────────────────────────

const Exercise = (() => {

  const h = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    for (const k in (attrs || {})) {
      const v = attrs[k];
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class')      e.className = v;
      else if (k === 'html')  e.innerHTML = v;
      else if (k === 'text')  e.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid === null || kid === undefined || kid === false) continue;
      e.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid);
    }
    return e;
  };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /**
   * Load a different practice set. A plain reload would not do: today's
   * session is seeded from the date, so it would hand back the same five
   * questions. Asking for a new `r` is what makes it different.
   */
  function freshSet() {
    const u = new URL(location.href);
    u.searchParams.set('r', String(Math.floor(Math.random() * 1e6)));
    location.href = u.pathname + u.search;
  }

  // ── Input renderers ───────────────────────────────────────────────────────
  // Each returns { node, filled(), check() → {ok, correctHTML}, lock(), focus() }
  const Inputs = {};

  function numberBox(spec) {
    return h('input', {
      type: 'text', inputmode: spec.decimal ? 'decimal' : 'numeric',
      class: 'ans-box', placeholder: spec.placeholder || '?',
      style: spec.width ? `width:${spec.width}px` : null,
      'aria-label': spec.label || 'answer'
    });
  }

  /** Compare a typed number with the expected one, allowing 1/2 and -3 forms. */
  function numEq(typed, want, tol) {
    const t = String(typed).trim().replace(/[−–—]/g, '-').replace(/\s+/g, '');
    if (t === '') return false;
    let v;
    if (/^-?\d+\/\d+$/.test(t)) { const [a, b] = t.split('/'); v = Number(a) / Number(b); }
    else if (/^-?(\d+\.?\d*|\.\d+)$/.test(t)) v = Number(t);
    else return false;
    return Math.abs(v - want) <= (tol === undefined ? 1e-9 : tol);
  }

  /** fill — a row of static text and answer boxes. The general-purpose type. */
  Inputs.fill = spec => {
    const boxes = [];
    const row = h('div', { class: 'ans-row' });
    for (const part of spec.parts) {
      if (part.text !== undefined) {
        row.appendChild(h('span', { class: 'ans-text' + (part.dim ? ' dim' : ''), html: part.text }));
      } else if (part.input) {
        const b = numberBox(part.input);
        boxes.push({ el: b, spec: part.input });
        row.appendChild(b);
      } else if (part.frac) {
        // A stacked fraction: numerator box above denominator box.
        const top = numberBox({ ...part.frac.num, width: part.frac.width || 56, label: 'numerator' });
        const bot = numberBox({ ...part.frac.den, width: part.frac.width || 56, label: 'denominator' });
        boxes.push({ el: top, spec: part.frac.num });
        boxes.push({ el: bot, spec: part.frac.den });
        row.appendChild(h('span', { class: 'frac-input' }, top, h('span', { class: 'frac-bar' }), bot));
      }
    }
    return {
      node: row,
      inputs: boxes.map(b => b.el),
      filled: () => boxes.every(b => b.el.value.trim() !== ''),
      focus:  () => boxes[0] && boxes[0].el.focus(),
      lock:   () => boxes.forEach(b => { b.el.disabled = true; }),
      check() {
        let ok = true;
        for (const b of boxes) {
          const good = numEq(b.el.value, b.spec.answer, b.spec.tol);
          b.el.classList.add(good ? 'ok' : 'bad');
          if (!good) ok = false;
        }
        const want = boxes.map(b => Fmt.num(b.spec.answer)).join(', ');
        return { ok, correctHTML: 'Answer: ' + want };
      }
    };
  };

  /** number — sugar for a single box with optional prefix and suffix. */
  Inputs.number = spec => Inputs.fill({
    parts: [
      spec.prefix ? { text: spec.prefix } : null,
      { input: { answer: spec.answer, tol: spec.tol, width: spec.width || 74, decimal: spec.decimal, placeholder: spec.placeholder } },
      spec.suffix ? { text: spec.suffix } : null
    ].filter(Boolean)
  });

  /** choice — multiple choice, one correct option. */
  Inputs.choice = spec => {
    let picked = null;
    const btns = [];
    const wrap = h('div', { class: 'choice-grid' + (spec.wide ? ' wide' : '') });
    spec.options.forEach((opt, i) => {
      const b = h('button', {
        type: 'button', class: 'choice', html: opt.html !== undefined ? opt.html : esc(opt),
        onclick() {
          if (b.disabled) return;
          picked = i;
          btns.forEach(x => x.classList.remove('picked'));
          b.classList.add('picked');
          if (spec.instant !== false) wrap.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true }));
        }
      });
      btns.push(b);
      wrap.appendChild(b);
    });
    return {
      node: wrap,
      filled: () => picked !== null,
      focus:  () => btns[0] && btns[0].focus(),
      lock:   () => btns.forEach(b => { b.disabled = true; }),
      check() {
        const ok = picked === spec.correct;
        btns.forEach((b, i) => {
          if (i === spec.correct) b.classList.add('ok');
          else if (i === picked)  b.classList.add('bad');
        });
        const right = spec.options[spec.correct];
        return { ok, correctHTML: 'Answer: ' + (right.html !== undefined ? right.html : esc(right)) };
      }
    };
  };

  /** expr — a typed algebraic expression, compared by value not by spelling. */
  Inputs.expr = spec => {
    const box = h('input', {
      type: 'text', class: 'ans-box wide', autocapitalize: 'off', autocomplete: 'off',
      spellcheck: 'false', placeholder: spec.placeholder || 'type your expression',
      'aria-label': 'answer'
    });
    const row = h('div', { class: 'ans-row' },
      spec.prefix ? h('span', { class: 'ans-text', html: spec.prefix }) : null, box);
    return {
      node: row,
      inputs: [box],
      filled: () => box.value.trim() !== '',
      focus:  () => box.focus(),
      lock:   () => { box.disabled = true; },
      check() {
        let ok, why = null;
        if (spec.mode === 'factorised') {
          const r = Algebra.checkFactorised(box.value, spec.answer);
          ok = r.ok; why = r.why;
        } else {
          const p = Algebra.tryParse(box.value);
          ok  = p.ok && Algebra.equal(p.expr, spec.answer);
          why = p.ok ? null : p.error;
        }
        box.classList.add(ok ? 'ok' : 'bad');
        const shown = spec.display || '\\(' + Algebra.parse(String(spec.answer)).tex() + '\\)';
        return { ok, correctHTML: 'Answer: ' + shown + (why && !ok ? ` <span class="why">(${esc(why)})</span>` : '') };
      }
    };
  };

  /** spot — a worked solution with one wrong line; click the mistake. */
  Inputs.spot = spec => {
    let picked = null;
    const rows = [];
    const wrap = h('ol', { class: 'spot-list' });
    spec.lines.forEach((ln, i) => {
      const li = h('li', {
        class: 'spot-line', html: ln,
        onclick() {
          if (li.classList.contains('locked')) return;
          picked = i;
          rows.forEach(x => x.classList.remove('picked'));
          li.classList.add('picked');
          wrap.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true }));
        }
      });
      rows.push(li);
      wrap.appendChild(li);
    });
    return {
      node: h('div', {}, h('p', { class: 'spot-cue', text: spec.cue || 'Click the first line that is wrong.' }), wrap),
      filled: () => picked !== null,
      focus:  () => {},
      lock:   () => rows.forEach(r => r.classList.add('locked')),
      check() {
        const ok = picked === spec.wrong;
        rows[spec.wrong].classList.add('bad-line');
        if (!ok && picked !== null) rows[picked].classList.add('miss-line');
        return { ok, correctHTML: 'Line ' + (spec.wrong + 1) + ' is where it goes wrong.' };
      }
    };
  };

  /** match — pair each item on the left with one on the right. */
  Inputs.match = spec => {
    const n = spec.left.length;
    const chosen = new Array(n).fill(null);
    let activeLeft = null;
    const leftBtns = [], rightBtns = [];

    const paint = () => {
      leftBtns.forEach((b, i) => {
        b.classList.toggle('active', activeLeft === i);
        const tag = b.querySelector('.pair-tag');
        tag.textContent = chosen[i] === null ? '' : spec.tags[chosen[i]];
        tag.classList.toggle('set', chosen[i] !== null);
      });
      rightBtns.forEach((b, j) => b.classList.toggle('used', chosen.includes(j)));
    };

    spec.left.forEach((item, i) => {
      leftBtns.push(h('button', {
        type: 'button', class: 'match-item',
        onclick() {
          if (leftBtns[i].disabled) return;
          activeLeft = activeLeft === i ? null : i;
          if (chosen[i] !== null) chosen[i] = null;
          paint();
        }
      }, h('span', { class: 'pair-tag' }), h('span', { html: item })));
    });

    spec.right.forEach((item, j) => {
      rightBtns.push(h('button', {
        type: 'button', class: 'match-item right',
        onclick() {
          if (rightBtns[j].disabled) return;
          if (activeLeft === null) return;
          for (let k = 0; k < n; k++) if (chosen[k] === j) chosen[k] = null;
          chosen[activeLeft] = j;
          activeLeft = null;
          paint();
          if (chosen.every(c => c !== null)) {
            rightBtns[j].dispatchEvent(new CustomEvent('ans-submit', { bubbles: true }));
          }
        }
      }, h('span', { class: 'pair-tag set', text: spec.tags[j] }), h('span', { html: item })));
    });

    const node = h('div', {},
      h('p', { class: 'spot-cue', text: spec.cue || 'Click an item, then its partner in the other list.' }),
      h('div', { class: 'match-grid' },
        h('div', { class: 'match-col' }, leftBtns),
        h('div', { class: 'match-col' }, rightBtns)));
    paint();

    return {
      node,
      filled: () => chosen.every(c => c !== null),
      focus:  () => {},
      lock:   () => [...leftBtns, ...rightBtns].forEach(b => { b.disabled = true; }),
      check() {
        let ok = true;
        leftBtns.forEach((b, i) => {
          const good = chosen[i] === spec.answer[i];
          b.classList.add(good ? 'ok' : 'bad');
          if (!good) ok = false;
        });
        const key = spec.left.map((_, i) => spec.tags[spec.answer[i]]).join(', ');
        return { ok, correctHTML: 'Correct pairing, top to bottom: ' + key };
      }
    };
  };

  /** order — click the steps into the right sequence. */
  Inputs.order = spec => {
    const placed = [];
    const btns = [];
    const slotRow = h('div', { class: 'order-slots' });
    const pool    = h('div', { class: 'order-pool' });

    const paint = () => {
      slotRow.innerHTML = '';
      placed.forEach((idx, pos) => {
        slotRow.appendChild(h('div', { class: 'order-slot', 'data-n': pos + 1 },
          h('span', { html: spec.items[idx] })));
      });
      for (let k = placed.length; k < spec.items.length; k++) {
        slotRow.appendChild(h('div', { class: 'order-slot empty', 'data-n': k + 1 }));
      }
      btns.forEach((b, i) => { b.classList.toggle('used', placed.includes(i)); });
      // The slots are rebuilt from the raw item markup each time, so any maths
      // in them has to be typeset again.
      MJ.typeset([slotRow]);
    };

    spec.items.forEach((item, i) => {
      btns.push(h('button', {
        type: 'button', class: 'order-chip', html: item,
        onclick() {
          if (btns[i].disabled) return;
          const at = placed.indexOf(i);
          if (at >= 0) placed.splice(at, 1);
          else placed.push(i);
          paint();
          if (placed.length === spec.items.length) {
            pool.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true }));
          }
        }
      }));
    });
    btns.forEach(b => pool.appendChild(b));

    const node = h('div', {},
      h('p', { class: 'spot-cue', text: spec.cue || 'Click the steps in order. Click again to take one back.' }),
      slotRow, pool);
    paint();

    return {
      node,
      filled: () => placed.length === spec.items.length,
      focus:  () => {},
      lock:   () => btns.forEach(b => { b.disabled = true; }),
      check() {
        const ok = placed.every((v, i) => v === spec.answer[i]);
        [...slotRow.children].forEach((s, i) => {
          if (placed[i] === spec.answer[i]) s.classList.add('ok'); else s.classList.add('bad');
        });
        return { ok, correctHTML: ok ? '' : 'Correct order: ' + spec.answer.map(i => spec.items[i]).join(' → ') };
      }
    };
  };

  /**
   * Another question of the same kind: same topic, same position in that
   * topic's set, fresh numbers. The position is what carries the meaning —
   * question 4 of Collecting Like Terms is always "two letters, coefficients
   * only" — so regenerating at the same index gives a genuine twin rather
   * than just something from the same topic.
   */
  function similarTo(q, difficulty) {
    const topic = q.origin && window.Topics && window.Topics[q.origin.topicId];
    if (!topic) return null;
    try {
      // A science slot draws from a pool of authored items, so a fresh draw
      // can occasionally land on the very question the student just saw. Try
      // a few times for a different one before settling.
      let twin = null;
      for (let t = 0; t < 8; t++) {
        const fresh = topic.generate(new RNG((Math.random() * 2 ** 32) >>> 0), difficulty);
        twin = fresh[q.origin.index];
        if (!twin || twin.prompt !== q.prompt) break;
      }
      if (!twin) return null;
      // Carry the provenance across so the new card behaves like its parent.
      return { ...twin, origin: q.origin, source: q.source };
    } catch (err) {
      console.error('could not build a similar question', err);
      return null;
    }
  }

  /**
   * sort — put each item into one of a few groups. Each item has a small set
   * of buttons, one per group, which works the same with a mouse or a thumb.
   * There is an explicit Check button: with several items, a student often
   * wants to look back over their sorting before committing to it.
   */
  Inputs.sort = spec => {
    const chosen = new Array(spec.items.length).fill(null);
    const rows = [];
    const allBtns = [];
    const list = h('div', { class: 'sort-list' });

    spec.items.forEach((item, i) => {
      const btns = spec.bins.map((bin, b) => {
        const btn = h('button', {
          type: 'button', class: 'sort-btn', text: bin,
          onclick() {
            if (btn.disabled) return;
            chosen[i] = b;
            btns.forEach((x, k) => x.classList.toggle('picked', k === b));
            row.classList.add('placed');
          }
        });
        allBtns.push(btn);
        return btn;
      });
      const row = h('div', { class: 'sort-row' },
        h('span', { class: 'sort-item', html: item.html }),
        h('span', { class: 'sort-bins' }, btns));
      rows.push(row);
      list.appendChild(row);
    });

    const check = h('button', { type: 'button', class: 'qsubmit sort-check', html: '&#10003; Check' });
    check.addEventListener('click', () =>
      check.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true })));

    return {
      node: h('div', {}, h('p', { class: 'spot-cue', text: spec.cue || 'Choose a group for each one, then check.' }),
                list, h('div', { class: 'sort-foot' }, check)),
      filled: () => chosen.every(c => c !== null),
      focus:  () => {},
      lock:   () => { allBtns.forEach(b => { b.disabled = true; }); check.disabled = true; },
      check() {
        let ok = true;
        const misses = [];
        spec.items.forEach((item, i) => {
          const good = chosen[i] === item.bin;
          rows[i].classList.add(good ? 'ok' : 'bad');
          if (!good) { ok = false; misses.push(`${item.html} → <em>${esc(spec.bins[item.bin])}</em>`); }
        });
        return { ok, correctHTML: ok ? '' : 'These belong elsewhere: ' + misses.join('; ') };
      }
    };
  };

  /**
   * label — numbered markers on a diagram, each named from a drop-down. The
   * diagram itself draws the numbers; this renders one row per number.
   */
  Inputs.label = spec => {
    const selects = spec.markers.map((_, i) => h('select', {
      class: 'label-select', 'aria-label': 'Name for label ' + (i + 1)
    },
      h('option', { value: '', text: 'choose…' }),
      spec.options.map(o => h('option', { value: o, text: o }))));
    const rows = selects.map((sel, i) => h('label', { class: 'label-row' },
      h('span', { class: 'label-num', text: i + 1 }), sel));

    const check = h('button', { type: 'button', class: 'qsubmit sort-check', html: '&#10003; Check' });
    check.addEventListener('click', () =>
      check.dispatchEvent(new CustomEvent('ans-submit', { bubbles: true })));

    return {
      node: h('div', {}, h('div', { class: 'label-list' }, rows), h('div', { class: 'sort-foot' }, check)),
      filled: () => selects.every(s => s.value !== ''),
      focus:  () => selects[0] && selects[0].focus(),
      lock:   () => { selects.forEach(s => { s.disabled = true; }); check.disabled = true; },
      check() {
        let ok = true;
        selects.forEach((s, i) => {
          const good = s.value === spec.markers[i];
          rows[i].classList.add(good ? 'ok' : 'bad');
          if (!good) ok = false;
        });
        return { ok, correctHTML: 'Answer: ' + spec.markers.map((n, i) => `${i + 1} ${esc(n)}`).join(', ') };
      }
    };
  };

  // ── One question card ─────────────────────────────────────────────────────
  // `n` is the label shown in the margin: "3" for an original question, "3a"
  // for the follow-up a student asked for after getting 3 wrong.
  function buildCard(state, q, n, depth) {
    depth = depth || 0;
    const card = h('article', { class: 'qcard' + (depth ? ' qcard-follow' : ''), id: 'q' + n });

    const bar  = h('div', { class: 'tbar-fill' });
    const wrap = h('div', { class: 'tbar', style: state.level.timerVisible ? '' : 'display:none' }, bar);
    card.appendChild(wrap);

    const head = h('div', { class: 'qhead' },
      h('span', { class: 'qnum' + (depth ? ' qnum-follow' : ''), text: n }),
      depth ? h('span', { class: 'follow-flag', text: 'One like it' }) : null,
      h('div', { class: 'qtext', html: q.prompt }),
      // In a mixed session, say which exercise the question came from and link
      // to it, so a student who keeps missing one kind can go and drill it.
      q.source
        ? h('a', {
            class: 'qsource', href: state.base + q.source.href,
            title: 'Practise this on its own: ' + q.source.title
          }, q.source.label)
        : null,
      q.tag ? h('span', { class: 'qtag', text: q.tag }) : null);
    card.appendChild(head);

    if (q.note) card.appendChild(h('p', { class: 'qnote', html: q.note }));

    let body = card;
    if (q.draw) {
      const dw = (q.diagram && q.diagram.w) || 230;
      const dh = (q.diagram && q.diagram.h) || 180;
      const svg = document.createElementNS(Geo.NS, 'svg');
      svg.setAttribute('class', 'qdiagram');
      // Captions live in HTML rather than inside the SVG, so a long one wraps
      // instead of running off the edge of the drawing.
      const dia = h('figure', { class: 'qdia-wrap', style: `width:min(100%, ${dw}px)` }, svg,
        q.diagram && q.diagram.caption
          ? h('figcaption', { class: 'dia-caption', html: q.diagram.caption })
          : null);
      body = h('div', { class: 'qbody with-diagram' });
      card.appendChild(body);
      body.appendChild(dia);
      try { q.draw(Geo.canvas(svg, dw, dh), Geo); }
      catch (err) { console.error('diagram failed on question ' + n, err); }
    }

    const input = Inputs[q.input.kind](q.input);
    const answerArea = h('div', { class: 'qanswer' });
    const submit = h('button', { type: 'button', class: 'qsubmit', title: 'Check this answer', html: '&#10003;' });

    if (q.input.kind === 'fill' || q.input.kind === 'number' || q.input.kind === 'expr') {
      input.node.appendChild(submit);
      answerArea.appendChild(input.node);
    } else {
      answerArea.appendChild(input.node);
    }

    const fb = h('p', { class: 'qfeedback' });
    answerArea.appendChild(fb);

    // ── Help, in two steps, then one to try unaided ───────────────────────
    // Understanding an explanation is recognition, not recall: watching
    // someone else solve it strengthens nothing. The step that matters is the
    // one they do themselves straight afterwards, so every route through here
    // ends at "Try one like it".
    const helpRow = h('div', { class: 'qhelp' });
    const helpBody = h('div', { class: 'qhelp-body', style: 'display:none' });
    let helpLevel = 0;                       // 0 none, 1 nudge, 2 full working

    const stuckBtn = h('button', {
      type: 'button', class: 'help-btn',
      onclick() { takeHelp(); }
    }, 'Stuck?');

    const twinBtn = h('button', {
      type: 'button', class: 'help-btn twin-btn', style: 'display:none',
      onclick() { spawnTwin(); }
    }, 'Try one like it');

    helpRow.appendChild(stuckBtn);
    helpRow.appendChild(twinBtn);
    answerArea.appendChild(helpBody);
    answerArea.appendChild(helpRow);
    body.appendChild(answerArea);

    function takeHelp() {
      if (state.done.has(n) && helpLevel >= 2) return;
      helpLevel++;
      helpBody.style.display = '';

      if (helpLevel === 1) {
        // The rule, with no numbers in it. Enough for a student who knows the
        // topic but cannot find the first move. In a mixed session this comes
        // from the question's own topic, not the page.
        const topic = q.origin && window.Topics && window.Topics[q.origin.topicId];
        const nudge = (topic && topic.hint) || state.hint ||
                      'Look back at the worked examples at the top of the page.';
        helpBody.innerHTML = '<p class="help-step"><strong>Where to start</strong>' + nudge + '</p>';
        const link = learnLink(q);
        if (link) helpBody.appendChild(h('p', { class: 'help-step help-learn' }, link));
        stuckBtn.textContent = 'Show me how';
      } else {
        helpBody.innerHTML +=
          '<p class="help-step"><strong>How it is done</strong>' +
          (q.explain || 'Work through it a line at a time.') + '</p>';
        stuckBtn.style.display = 'none';
        // Taking the full working settles this question: it scores nothing,
        // but nothing is lost either. The marks are available on the twin.
        if (!state.done.has(n)) {
          timer.stop();
          state.done.add(n);
          input.lock();
          submit.disabled = true;
          card.classList.add('answered', 'was-helped');
          fb.className = 'qfeedback';
          fb.innerHTML = '<strong>Answered with help</strong>' +
            'No marks for this one, and none lost. Try the next one to earn them.';
          state.onAnswered();
        }
        offerTwin();
      }
      MJ.typeset([helpBody, fb]);
    }

    function offerTwin() {
      if (depth >= state.maxDepth) {
        twinBtn.style.display = 'none';
        return;
      }
      twinBtn.style.display = '';
    }

    function spawnTwin() {
      const twin = similarTo(q, state.difficulty);
      if (!twin) {
        twinBtn.disabled = true;
        twinBtn.textContent = 'No similar question available';
        return;
      }
      twinBtn.style.display = 'none';
      state.addFollowUp(card, twin, n, depth + 1);
    }

    const timer = new QuestionTimer(bar, state.level.timerSecs);

    const start = () => { if (!state.done.has(n) && !timer.hasStarted()) timer.start(); };
    (input.inputs || []).forEach(el => {
      el.addEventListener('focus', start);
      el.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') { ev.preventDefault(); submitCard(); }
      });
    });
    card.addEventListener('pointerdown', start, { once: true });
    card.addEventListener('ans-submit', submitCard);
    submit.addEventListener('click', submitCard);

    function submitCard() {
      if (state.done.has(n)) return;
      if (!input.filled()) { card.classList.add('nudge'); setTimeout(() => card.classList.remove('nudge'), 400); return; }
      const elapsed = timer.stop();
      state.done.add(n);

      const res = input.check();
      input.lock();
      submit.disabled = true;
      card.classList.add('answered', res.ok ? 'was-right' : 'was-wrong');

      // A follow-up is a second chance, so getting it wrong costs nothing.
      // Charging for it would make "try one like it" something to avoid.
      let pts = MRG.scoreQuestion(res.ok, elapsed);
      if (depth > 0) pts = Math.max(0, pts);
      state.score += pts;

      fb.className = 'qfeedback ' + (res.ok ? 'good' : 'bad');
      fb.innerHTML = res.ok
        ? '<strong>Correct</strong>' + (q.explain ? q.explain : '')
        : '<strong>Not quite</strong>' + res.correctHTML + (q.explain ? '<br>' + q.explain : '');

      stuckBtn.style.display = 'none';
      // Getting it wrong is the same moment as asking for help, and until now
      // it was a dead end: read the working, move on to an unrelated topic.
      if (!res.ok) offerTwin();

      floatPoints(card, pts);
      MJ.typeset([fb]);
      state.onAnswered();
    }

    return { card, focus: input.focus, label: n };
  }

  function floatPoints(card, pts) {
    const pop = h('span', {
      class: 'pts ' + (pts > 0 ? 'pos' : pts < 0 ? 'neg' : 'zero'),
      text: (pts > 0 ? '+' : '') + pts
    });
    card.appendChild(pop);
    setTimeout(() => pop.remove(), 1500);
  }

  // ── Page furniture ────────────────────────────────────────────────────────
  function xpHeader() {
    const info = MRG.getLevelInfo();
    const next = info.next ? `${info.xpToNext} XP to <strong>${info.next.name}</strong>` : '<strong>Top level</strong>';
    return h('div', { class: 'xpbar' },
      h('span', { class: 'xp-rank', text: info.current.name }),
      h('div', { class: 'xp-track' }, h('div', { class: 'xp-fill', style: `width:${info.pct.toFixed(1)}%` })),
      h('span', { class: 'xp-text', html: `${info.xp} XP &middot; ${next}` }));
  }

  function toolbar(cfg) {
    const set = Seed.setNumber();
    const mkLink = n => {
      const u = new URL(location.href);
      if (n === null) u.searchParams.delete('set'); else u.searchParams.set('set', n);
      return u.pathname + u.search;
    };
    const picker = h('select', {
      class: 'set-picker', 'aria-label': 'Question set',
      onchange(ev) { location.href = mkLink(ev.target.value === 'free' ? null : Number(ev.target.value)); }
    },
      h('option', { value: 'free', text: 'Free practice (new every time)', selected: set === null }),
      [1, 2, 3, 4, 5, 6].map(n => h('option', { value: n, text: 'Set ' + n, selected: set === n })));

    // A practice session has no set picker: its questions are chosen for the
    // student, and today's set is already fixed by the date.
    if (cfg.practice) {
      return h('div', { class: 'toolbar' },
        h('button', { type: 'button', class: 'tool-btn', onclick: freshSet },
          '↻ Shuffle this set'),
        h('span', { class: 'tool-note', text: 'Chosen from the topics you have seen least recently.' }));
    }

    return h('div', { class: 'toolbar' },
      h('button', { type: 'button', class: 'tool-btn primary', onclick: () => location.reload() },
        '↻ New questions'),
      picker,
      set !== null ? h('span', { class: 'tool-note', text: 'Everyone gets the same questions in set ' + set + '.' })
                   : null);
  }

  // ── Learn it: the short reading section at the top of a page ──────────────
  // Idea cards, each a heading, a sentence or two and usually a diagram. It
  // starts closed, so a confident student goes straight to the questions;
  // "Stuck?" opens it at the card that answers the question.

  const page = { base: '', id: null, openLearn: null };

  function learnBlock(cfg) {
    if (!cfg.learn || !cfg.learn.length) return null;
    const key = 'mrg_learn_open_' + cfg.id;
    const wrap = h('section', { class: 'examples learn', id: 'learn' });
    const body = h('div', { class: 'learn-body', style: 'display:none' });
    const toggle = h('button', {
      type: 'button', class: 'examples-toggle', 'aria-expanded': 'false',
      onclick() {
        setOpen(body.style.display === 'none');
        try { localStorage.setItem(key, body.style.display === 'none' ? '0' : '1'); } catch (_) {}
      }
    }, 'Learn it', h('span', { class: 'learn-count', text: cfg.learn.length + ' key ideas' }));
    wrap.appendChild(toggle);
    wrap.appendChild(body);

    const grid = h('div', { class: 'learn-grid' });
    body.appendChild(grid);
    for (const c of cfg.learn) {
      const card = h('article', { class: 'learn-card' + (c.wide ? ' wide' : ''), id: 'learn-' + c.id });
      if (c.draw) {
        const svg = document.createElementNS(Geo.NS, 'svg');
        svg.setAttribute('class', 'qdiagram');
        const w = (c.diagram && c.diagram.w) || 240;
        card.appendChild(h('figure', { class: 'learn-fig', style: `max-width:${w}px` }, svg,
          c.diagram && c.diagram.caption ? h('figcaption', { class: 'dia-caption', html: c.diagram.caption }) : null));
        try { c.draw(Geo.canvas(svg, w, (c.diagram && c.diagram.h) || 150), Geo); }
        catch (err) { console.error('learn diagram failed', err); }
      }
      card.appendChild(h('h3', { html: c.title }));
      card.appendChild(h('div', { class: 'learn-text', html: c.text }));
      grid.appendChild(card);
    }

    let typeset = false;
    function setOpen(on) {
      body.style.display = on ? '' : 'none';
      toggle.classList.toggle('open', on);
      toggle.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on && !typeset) { typeset = true; MJ.typeset([body]); }
    }
    let saved = null;
    try { saved = localStorage.getItem(key); } catch (_) {}
    if (saved === '1') setOpen(true);

    page.openLearn = id => {
      setOpen(true);
      const card = document.getElementById('learn-' + id);
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.remove('flash');
      void card.offsetWidth;                 // restart the highlight
      card.classList.add('flash');
    };
    // Arriving from a link in a mixed session: open at that card.
    const m = /^#learn-(.+)$/.exec(location.hash);
    if (m) setTimeout(() => page.openLearn(decodeURIComponent(m[1])), 120);
    return wrap;
  }

  /** A "Read more" link to the card that answers `q`, or null. */
  function learnLink(q) {
    const topicId = (q.origin && q.origin.topicId) || page.id;
    const topic = window.Topics && window.Topics[topicId];
    const card = q.learn && topic && topic.learn && topic.learn.find(c => c.id === q.learn);
    if (!card) return null;
    const label = 'Read about it: ' + card.title;
    if (topicId === page.id && page.openLearn) {
      return h('a', { class: 'learn-link', href: '#learn-' + card.id,
                      onclick(ev) { ev.preventDefault(); page.openLearn(card.id); } }, label);
    }
    // In a mixed session the card lives on the topic's own page.
    const ex = typeof Manifest !== 'undefined' && Manifest.exercise(topicId);
    if (!ex || !ex.href) return null;
    return h('a', { class: 'learn-link', href: page.base + ex.href + '#learn-' + card.id,
                    target: '_blank', rel: 'noopener' }, label + ' ↗');
  }

  function examplesBlock(cfg) {
    if (!cfg.examples || !cfg.examples.length) return null;
    const wrap = h('section', { class: 'examples' });
    const open = localStorage.getItem('mrg_ex_open_' + cfg.id) !== '0';
    const body = h('div', { class: 'examples-body', style: open ? '' : 'display:none' });
    const toggle = h('button', {
      type: 'button', class: 'examples-toggle' + (open ? ' open' : ''),
      onclick() {
        const now = body.style.display === 'none';
        body.style.display = now ? '' : 'none';
        toggle.classList.toggle('open', now);
        localStorage.setItem('mrg_ex_open_' + cfg.id, now ? '1' : '0');
      }
    }, 'Worked examples');
    wrap.appendChild(toggle);
    wrap.appendChild(body);

    for (const ex of cfg.examples) {
      const box = h('div', { class: 'example' });
      if (ex.title) box.appendChild(h('h3', { html: ex.title }));
      const inner = h('div', { class: ex.draw ? 'example-inner with-diagram' : 'example-inner' });
      if (ex.draw) {
        const svg = document.createElementNS(Geo.NS, 'svg');
        svg.setAttribute('class', 'qdiagram');
        const exW = (ex.diagram && ex.diagram.w) || 250;
        inner.appendChild(h('figure', { class: 'qdia-wrap', style: `width:min(100%, ${exW}px)` }, svg,
          ex.diagram && ex.diagram.caption
            ? h('figcaption', { class: 'dia-caption', html: ex.diagram.caption })
            : null));
        try { ex.draw(Geo.canvas(svg, exW, (ex.diagram && ex.diagram.h) || 190), Geo); }
        catch (err) { console.error('example diagram failed', err); }
      }
      const steps = h('div', { class: 'example-steps' });
      (ex.steps || []).forEach((s, i) => {
        steps.appendChild(h('p', { class: 'step' },
          h('span', { class: 'step-n', text: i + 1 }),
          h('span', { html: s })));
      });
      if (ex.result) steps.appendChild(h('p', { class: 'step-result', html: ex.result }));
      inner.appendChild(steps);
      box.appendChild(inner);
      body.appendChild(box);
    }
    if (cfg.hint) body.appendChild(h('div', { class: 'hint', html: '<strong>Remember:</strong> ' + cfg.hint }));
    return wrap;
  }

  function levelUpModal() {
    const name = h('strong');
    const desc = h('p', { class: 'lvl-desc' });
    const box = h('div', { class: 'lvl-box' },
      h('div', { class: 'lvl-emoji', text: '✨' }),
      h('h2', { text: 'Level up' }),
      h('p', {}, 'You are now a ', name, '.'),
      desc,
      h('button', { type: 'button', class: 'tool-btn primary', onclick() { modal.classList.remove('show'); } }, 'Continue'));
    const modal = h('div', { class: 'lvl-modal' }, box);
    modal.addEventListener('click', ev => { if (ev.target === modal) modal.classList.remove('show'); });
    return {
      node: modal,
      show(lvl) {
        const notes = {
          2: 'Timers are on now, and a wrong answer costs 3 points.',
          3: 'The countdown is tighter: 15 seconds for full marks.',
          4: 'Expert questions unlocked across every exercise.'
        };
        name.textContent = lvl.name;
        desc.textContent = notes[lvl.level] || '';
        modal.classList.add('show');
      }
    };
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  function run(cfg) {
    // A practice session is not inside a unit, and its page sits at the site
    // root rather than two levels down.
    const practice = !!cfg.practice;
    const base  = cfg.base === undefined ? '../../' : cfg.base;
    const unit  = practice ? null : Manifest.unit(cfg.unit);
    const level = MRG.getCurrentLevel();
    const rng   = Seed.rng(cfg.id);
    const difficulty = level.level >= 4 ? 'expert' : level.level >= 3 ? 'hard' : 'core';

    let questions;
    try {
      questions = cfg.questions || cfg.generate(rng, difficulty);
    } catch (err) {
      console.error('question generation failed', err);
      document.body.appendChild(h('p', { class: 'fatal', text: 'Could not build the questions: ' + err.message }));
      return;
    }
    if (!questions || !questions.length) {
      document.body.appendChild(h('p', { class: 'fatal', text: 'No questions could be built.' }));
      return;
    }
    // Follow-up questions add cards as the student asks for them, so the
    // number on the page grows. The score ceiling stays pegged to the original
    // set: a follow-up is a chance to win back marks already forfeited, not a
    // way to push the total higher.
    // Each question remembers where it came from, which is what makes "one
    // like it" possible: same topic, same index, fresh numbers.
    questions.forEach((q, i) => {
      if (!q.origin) q.origin = { topicId: cfg.id, index: i };
    });

    const originalTotal = questions.length;
    const maxScore = originalTotal * 15;

    const state = {
      level, done: new Set(), score: 0, base, difficulty,
      hint: cfg.hint, maxDepth: 2,
      onAnswered: () => {}, addFollowUp: () => {}
    };

    // ── Page chrome ──
    document.title = cfg.title + ' · Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    root.appendChild(h('header', { class: 'page-head' },
      practice ? h('span', { class: 'eyebrow', text: cfg.eyebrow || 'Daily practice' }) : null,
      h('h1', { text: cfg.title }),
      h('p', { text: cfg.blurb || (unit ? unit.name : '') })));

    root.appendChild(practice
      ? h('nav', { class: 'crumbs' },
          h('a', { href: base + 'index.html', text: 'Home' }),
          h('span', { text: '/' }),
          h('span', { class: 'here', text: cfg.title }))
      : h('nav', { class: 'crumbs' },
          h('a', { href: base + 'index.html', text: 'Home' }),
          h('span', { text: '/' }),
          h('a', { href: base + unit.page, text: unit.name }),
          h('span', { text: '/' }),
          h('span', { class: 'here', text: cfg.title })));

    const main = h('main');
    root.appendChild(main);

    main.appendChild(xpHeader());
    page.base = base; page.id = cfg.id;
    const learn = learnBlock(cfg);
    if (learn) main.appendChild(learn);
    const ex = examplesBlock(cfg);
    if (ex) main.appendChild(ex);

    main.appendChild(h('div', { class: 'section-head' },
      h('h2', { text: practice ? 'Mixed questions' : 'Your turn' }),
      h('span', { class: 'qcount', text: originalTotal + ' questions' })));
    main.appendChild(toolbar(cfg));
    if (practice && cfg.topics && cfg.topics.length) {
      main.appendChild(h('p', { class: 'practice-drawn' },
        'Drawn from ',
        cfg.topics.map((t, i) => [
          i ? ', ' : '',
          h('a', { href: base + t.href, title: Practice.reason(t) },
            `${t.label} ${t.title}`)
        ]).flat()));
    }

    if (difficulty === 'expert') {
      main.appendChild(h('div', { class: 'mode-flag', text: 'Expert mode: these questions are the hard set.' }));
    }

    const progress = h('div', { class: 'progress' },
      h('div', { class: 'progress-fill' }),
      h('span', { class: 'progress-text' }));
    main.appendChild(progress);

    const list = h('div', { class: 'qlist' });
    main.appendChild(list);

    const cards = questions.map((q, i) => buildCard(state, q, i + 1, 0));
    cards.forEach(c => list.appendChild(c.card));

    // A student asking for "one like it" inserts a new card directly beneath
    // the one they were stuck on, labelled 3a, 3b and so on, so the record of
    // where they needed help stays visible.
    state.addFollowUp = (afterCard, twinQ, parentLabel, depth) => {
      const root = String(parentLabel).replace(/[a-z]+$/, '');
      const label = root + 'abcdef'[Math.min(depth, 6) - 1];
      const built = buildCard(state, twinQ, label, depth);
      afterCard.insertAdjacentElement('afterend', built.card);
      cards.splice(cards.indexOf(cards.find(c => c.card === afterCard)) + 1, 0, built);
      // The session is no longer over, if it had been.
      state.finished = false;
      results.style.display = 'none';
      MJ.typeset([built.card]);
      built.card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => built.focus(), 320);
      paintProgress();
    };

    const results = h('section', { class: 'results', style: 'display:none' });
    main.appendChild(results);

    main.appendChild(practice
      ? h('a', { class: 'back-link', href: base + 'index.html' }, '← Back to all units')
      : h('a', { class: 'back-link', href: base + unit.page },
          '← Back to ' + unit.name));

    root.appendChild(h('footer', { class: 'page-foot',
      text: 'Revision · ' + (unit ? unit.name : cfg.footer || 'Daily practice') }));

    const modal = levelUpModal();
    root.appendChild(modal.node);

    // ── Progress and finishing ──
    function paintProgress() {
      const n = state.done.size;
      progress.querySelector('.progress-fill').style.width = (n / cards.length * 100) + '%';
      progress.querySelector('.progress-text').textContent =
        `${n} of ${cards.length} answered · ${Math.max(0, state.score)} pts`;
    }
    paintProgress();

    state.onAnswered = () => {
      paintProgress();
      if (state.done.size === cards.length) setTimeout(finish, 450);
    };

    function finish() {
      const score = Math.max(0, state.score);

      // Answering a follow-up can complete the session a second time. Only an
      // improvement is banked, so the panel can be re-rendered as often as
      // needed without awarding the same work twice.
      if (!state.finished || score > state.bankedScore) {
        state.lastResult = practice
          ? MRG.finishPractice(score, maxScore, cfg.topicIds)
          : MRG.finishExercise(cfg.id, score, maxScore);
        state.bankedScore = score;
        state.finished = true;
      }
      const result = state.lastResult;

      const wrong  = cards.filter(c => c.card.classList.contains('was-wrong')).map(c => c.label);
      const helped = cards.filter(c => c.card.classList.contains('was-helped')).map(c => c.label);
      const right  = cards.filter(c => c.card.classList.contains('was-right')).length;

      results.innerHTML = '';

      if (practice) {
        results.appendChild(h('div', { class: 'results-tick', text: '✓' }));
        results.appendChild(h('p', { class: 'results-score',
          text: result.firstToday ? "That is today's practice done"
                                  : `${right} of ${cards.length} right` }));
        if (result.firstToday) {
          results.appendChild(h('p', { class: 'results-note',
            text: `${right} of ${cards.length} right.` }));
        }
      } else {
        const stars = '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars);
        results.appendChild(h('div', { class: 'results-stars', text: stars }));
        results.appendChild(h('p', { class: 'results-score', text: `${score} / ${maxScore} points` }));
      }

      if (result.xpGained > 0) {
        results.appendChild(h('p', { class: 'results-xp',
          html: `+${result.xpGained} XP &rarr; ${result.newTotal} XP total` }));
      } else if (!practice && result.stars === 0) {
        results.appendChild(h('p', { class: 'results-note',
          html: `No XP yet. Reach one star (${Math.ceil(maxScore * 0.47)} pts) to earn some.` }));
      } else if (!practice) {
        results.appendChild(h('p', { class: 'results-note',
          text: 'No new XP: you have already matched your best here.' }));
      }

      // The week's progress, which is the thing we actually want them to come
      // back for. Never framed as something lost.
      const wk = result.week;
      if (wk) {
        results.appendChild(h('p', { class: 'results-week' },
          result.firstToday ? '' : 'Already counted for today. ',
          wk.met
            ? h('strong', { text: `${wk.done} days this week — target met.` })
            : h('strong', { text: `${wk.done} of ${wk.target} days this week.` })));
      }

      // Say plainly that turning up again tomorrow beats doing more now. The
      // per-day XP cap already works this way; without saying so, nobody knows.
      if (practice && result.firstToday) {
        results.appendChild(h('p', { class: 'results-note',
          text: 'Coming back tomorrow counts for more than doing extra now.' }));
      }

      if (wrong.length) {
        results.appendChild(h('p', { class: 'results-note' },
          'Worth another look: ',
          wrong.map((n, i) => [i ? ', ' : '', h('a', { href: '#q' + n, text: 'Q' + n })]).flat()));
      }
      if (helped.length) {
        results.appendChild(h('p', { class: 'results-note' },
          'Taken with help: ',
          helped.map((n, i) => [i ? ', ' : '', h('a', { href: '#q' + n, text: 'Q' + n })]).flat(),
          '. Worth coming back to these.'));
      }

      // After the daily mix the main action is to stop. Going again is still
      // there, but quietly, as the secondary button.
      results.appendChild(h('div', { class: 'results-btns' },
        practice
          ? h('a', { class: 'tool-btn primary', href: base + 'index.html' }, 'Done for today')
          : h('button', { type: 'button', class: 'tool-btn primary', onclick: () => location.reload() },
              'Try a new set'),
        practice
          ? h('button', { type: 'button', class: 'tool-btn', onclick: freshSet },
              'Five more')
          : h('a', { class: 'tool-btn', href: base + unit.page }, 'Back to ' + unit.short)));
      results.style.display = '';
      results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      const bar = document.querySelector('.xpbar');
      bar.replaceWith(xpHeader());
      if (result.leveledUp) setTimeout(() => modal.show(result.newLevel), 600);
    }

    MJ.typeset();
  }

  return { run, Inputs, h, esc };
})();
