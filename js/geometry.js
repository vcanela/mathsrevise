'use strict';
// ── Maths Revise · Geometry drawing ─────────────────────────────────────────
// Every diagram in this resource is built from the real measurements. A
// triangle labelled 35°, 75°, 70° is constructed by the law of sines so the
// drawing genuinely has those angles; the arcs and labels are then measured
// back off the finished shape. Nothing is positioned by hand, so a student who
// estimates from the picture is never misled.
//
//   const pts = Geo.fit(Geo.triangleFromAngles(35, 75, 70), 220, 170);
//   const d   = Geo.canvas(svgEl, 220, 170);
//   d.polygon(pts);
//   d.angleArc(pts, 0, { label: '35°' });
// ─────────────────────────────────────────────────────────────────────────────

const Geo = (() => {
  const NS  = 'http://www.w3.org/2000/svg';
  const RAD = Math.PI / 180;
  const DEG = 180 / Math.PI;

  // ── Vector helpers (all in screen coordinates: x right, y DOWN) ───────────
  const sub   = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const add   = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const scale = (a, k) => [a[0] * k, a[1] * k];
  const len   = a => Math.hypot(a[0], a[1]);
  const norm  = a => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
  const dirOf = a => (Math.atan2(a[1], a[0]) * DEG + 360) % 360;
  const fromDir = (deg, r) => [Math.cos(deg * RAD) * r, Math.sin(deg * RAD) * r];
  const mid   = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

  // ── Shape construction ────────────────────────────────────────────────────

  /**
   * Triangle with exactly these interior angles (degrees, summing to 180).
   * Uses the law of sines, so side lengths are correct relative to each other.
   * Vertex i of the result has interior angle = argument i.
   */
  function triangleFromAngles(A, B, C, opts) {
    opts = opts || {};
    const sum = A + B + C;
    if (Math.abs(sum - 180) > 1e-6) throw new Error('triangle angles must total 180, got ' + sum);
    // Side lengths opposite each angle.
    const a = Math.sin(A * RAD), b = Math.sin(B * RAD), c = Math.sin(C * RAD);
    // Place A at the origin, B along the positive x-axis (maths orientation).
    const pA = [0, 0];
    const pB = [c, 0];
    const pC = [b * Math.cos(A * RAD), b * Math.sin(A * RAD)];
    let pts = [pA, pB, pC];
    if (opts.rotate) pts = rotate(pts, opts.rotate);
    if (opts.flip)   pts = pts.map(p => [-p[0], p[1]]);
    // Flip to screen coordinates (y downwards) at the end.
    return pts.map(p => [p[0], -p[1]]);
  }

  /** Regular n-gon, vertex 0 at the top, going clockwise on screen. */
  function regularPolygon(n, opts) {
    opts = opts || {};
    const start = (opts.rotate || 0) - 90;
    const out = [];
    for (let i = 0; i < n; i++) out.push(fromDir(start + (360 / n) * i, 1));
    return out;
  }

  /**
   * An irregular but convex n-gon. Vertices are placed on a circle at uneven
   * angles, which guarantees convexity, then the interior angles are whatever
   * they turn out to be. Questions read the angles off the finished shape with
   * `interiorAngles`, so the labels can never disagree with the picture.
   */
  function convexPolygon(rng, n, opts) {
    opts = opts || {};
    const spread = opts.spread === undefined ? 0.45 : opts.spread;
    // Uneven gaps around the circle, but never so uneven that a vertex is
    // squashed into its neighbour.
    let gaps = [];
    for (let i = 0; i < n; i++) gaps.push(1 + (rng.next() * 2 - 1) * spread);
    const total = gaps.reduce((s, g) => s + g, 0);
    gaps = gaps.map(g => (g / total) * 360);
    const out = [];
    let ang = (opts.rotate || 0) - 90;
    for (let i = 0; i < n; i++) { out.push(fromDir(ang, 1)); ang += gaps[i]; }
    return out;
  }

  /**
   * A polygon whose interior angles are exactly the ones you ask for.
   *
   * The angles fix the direction of every side, so the only freedom left is
   * the side lengths, and closing the shape is two equations (the x and y
   * displacements must both come back to zero). With n sides we pick n-2
   * lengths at random and solve the remaining 2×2 system for the last two.
   * If that throws up a negative length the shape would cross itself, so we
   * draw fresh random lengths and try again.
   *
   * Returns null if no closed shape was found, which only happens for angle
   * lists that cannot be drawn.
   */
  function polygonFromAngles(angles, rng, tries) {
    const n = angles.length;
    if (n === 3) return triangleFromAngles(angles[0], angles[1], angles[2]);
    const sum = angles.reduce((s, a) => s + a, 0);
    if (Math.abs(sum - angleSum(n)) > 1e-6) throw new Error('angles must total ' + angleSum(n));

    // Direction of each side, turning by the exterior angle at every vertex.
    const dirs = [0];
    for (let i = 1; i < n; i++) dirs.push(dirs[i - 1] + (180 - angles[i]));
    const vec = dirs.map(d => [Math.cos(d * RAD), Math.sin(d * RAD)]);

    for (let attempt = 0; attempt < (tries || 250); attempt++) {
      const s = [];
      for (let i = 0; i < n - 2; i++) s.push(rng ? 0.6 + rng.next() * 0.8 : 1);
      let Rx = 0, Ry = 0;
      for (let i = 0; i < n - 2; i++) { Rx += s[i] * vec[i][0]; Ry += s[i] * vec[i][1]; }
      const [ax, ay] = vec[n - 2], [bx, by] = vec[n - 1];
      const det = ax * by - ay * bx;
      if (Math.abs(det) < 1e-9) continue;                 // last two sides parallel
      const s1 = (-Rx * by + Ry * bx) / det;
      const s2 = (-ax * Ry + ay * Rx) / det;
      if (s1 <= 0.12 || s2 <= 0.12) continue;             // would fold back on itself
      s.push(s1, s2);

      // Keep the shape reasonably chunky: a very long thin polygon fits the
      // viewBox badly and crowds its own angle labels together.
      const longest = Math.max(...s), shortest = Math.min(...s);
      if (shortest / longest < 0.42) continue;

      const pts = [[0, 0]];
      for (let i = 0; i < n - 1; i++) pts.push(add(pts[i], scale(vec[i], s[i])));
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      const bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
      if (Math.max(bw, bh) / Math.max(Math.min(bw, bh), 1e-9) > 1.55) continue;

      // Built in maths orientation; flip to screen coordinates.
      const screen = pts.map(p => [p[0], -p[1]]);
      // Trust nothing: confirm the finished shape really has these angles.
      const got = interiorAngles(screen);
      if (got.every((g, i) => Math.abs(g - angles[i]) < 0.5)) return screen;
    }
    return null;
  }

  /** Quadrilateral / polygon from vertices you supply, in order. */
  function polygon(pts) { return pts.map(p => p.slice()); }

  function rotate(pts, deg) {
    const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD);
    return pts.map(([x, y]) => [x * c - y * s, x * s + y * c]);
  }

  // ── Measurement ───────────────────────────────────────────────────────────

  /**
   * Interior angles of a polygon, in degrees, in vertex order. Handles reflex
   * vertices and either winding direction: the orientation is chosen so the
   * angles total (n-2)·180, which is the only consistent answer.
   */
  function interiorAngles(pts) {
    const n = pts.length;
    const raw = [];
    for (let i = 0; i < n; i++) {
      const V = pts[i], P = pts[(i - 1 + n) % n], N = pts[(i + 1) % n];
      const u = sub(P, V), v = sub(N, V);
      const dot   = u[0] * v[0] + u[1] * v[1];
      const cross = u[0] * v[1] - u[1] * v[0];
      raw.push({ small: Math.abs(Math.atan2(cross, dot) * DEG), cross });
    }
    // Signed area tells us the winding; a vertex is convex when its cross
    // product agrees with it, and reflex when it does not.
    let area2 = 0;
    for (let i = 0; i < n; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % n];
      area2 += x1 * y2 - x2 * y1;
    }
    const wind = Math.sign(area2) || 1;
    return raw.map(r => (Math.sign(r.cross) === wind ? 360 - r.small : r.small));
  }

  /** Side lengths, index i being the side from vertex i to vertex i+1. */
  function sideLengths(pts) {
    return pts.map((p, i) => len(sub(pts[(i + 1) % pts.length], p)));
  }

  /** Sum of interior angles of an n-sided polygon: the 180(n-2) rule. */
  function angleSum(n) { return 180 * (n - 2); }

  // ── Fitting into a viewBox ────────────────────────────────────────────────

  /**
   * Scale and centre a shape to fill a w × h box, leaving `pad` for labels.
   * Aspect ratio is preserved, so the shape is never distorted.
   */
  function fit(pts, w, h, pad) {
    pad = pad === undefined ? 30 : pad;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const sw = Math.max(maxX - minX, 1e-9), sh = Math.max(maxY - minY, 1e-9);
    const k  = Math.min((w - 2 * pad) / sw, (h - 2 * pad) / sh);
    const ox = (w - sw * k) / 2 - minX * k;
    const oy = (h - sh * k) / 2 - minY * k;
    return pts.map(([x, y]) => [x * k + ox, y * k + oy]);
  }

  // ── SVG element helpers ───────────────────────────────────────────────────
  function el(tag, attrs, text) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /** Arc path from angle a1 to a2 about (cx, cy), sweeping `span` degrees. */
  function arcPath(cx, cy, r, a1, span) {
    const p1 = add([cx, cy], fromDir(a1, r));
    const p2 = add([cx, cy], fromDir(a1 + span, r));
    const large = Math.abs(span) > 180 ? 1 : 0;
    const sweep = span >= 0 ? 1 : 0;
    return `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }

  // ── Drawing surface ───────────────────────────────────────────────────────
  // Colours come from CSS custom properties so diagrams follow the page theme,
  // including dark mode, without every call site naming a hex code.
  const INK = 'var(--dia-ink)', ACCENT = 'var(--dia-accent)', KNOWN = 'var(--dia-known)',
        UNKNOWN = 'var(--dia-unknown)', FILL = 'var(--dia-fill)', MUTED = 'var(--dia-muted)';

  function canvas(svgEl, w, h) {
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svgEl.setAttribute('width', w);
    svgEl.setAttribute('height', h);
    svgEl.setAttribute('role', 'img');
    svgEl.innerHTML = '';

    const api = {
      node: svgEl, w, h,

      add(tag, attrs, text) { const e = el(tag, attrs, text); svgEl.appendChild(e); return e; },

      polygon(pts, o) {
        o = o || {};
        return api.add('polygon', {
          points: pts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' '),
          fill: o.fill || FILL,
          stroke: o.stroke || INK,
          'stroke-width': o.width || 2,
          'stroke-linejoin': 'round'
        });
      },

      line(p1, p2, o) {
        o = o || {};
        return api.add('line', {
          x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
          stroke: o.stroke || INK, 'stroke-width': o.width || 2,
          'stroke-linecap': 'round', 'stroke-dasharray': o.dash
        });
      },

      circle(c, r, o) {
        o = o || {};
        return api.add('circle', {
          cx: c[0], cy: c[1], r,
          fill: o.fill || 'none', stroke: o.stroke || INK,
          'stroke-width': o.width === undefined ? 2 : o.width,
          'stroke-dasharray': o.dash
        });
      },

      dot(c, o) {
        o = o || {};
        return api.add('circle', { cx: c[0], cy: c[1], r: o.r || 3, fill: o.fill || INK });
      },

      text(p, str, o) {
        o = o || {};
        return api.add('text', {
          x: p[0], y: p[1],
          fill: o.fill || INK,
          'font-size': o.size || 13,
          'font-family': 'var(--font-sans)',
          'font-weight': o.bold === false ? 400 : 600,
          'text-anchor': o.anchor || 'middle',
          'dominant-baseline': o.baseline || 'middle'
        }, str);
      },

      /**
       * Mark the interior angle at vertex i of a polygon and label it.
       * The arc is measured off the shape, so it always matches the drawing.
       */
      angleArc(pts, i, o) {
        o = o || {};
        const n = pts.length;
        const V = pts[i], P = pts[(i - 1 + n) % n], N = pts[(i + 1) % n];
        const theta = interiorAngles(pts)[i];
        const a1 = dirOf(sub(P, V));
        const a2 = dirOf(sub(N, V));
        // Choose the rotation direction that sweeps the interior angle.
        let span = ((a2 - a1) % 360 + 360) % 360;
        if (Math.abs(span - theta) > 0.5) span = span - 360;
        // Keep the arc inside short sides.
        const shortest = Math.min(len(sub(P, V)), len(sub(N, V)));
        let r = o.r || Math.min(24, shortest * 0.34);
        if (theta < 35) r = Math.min(r, shortest * 0.5);

        const colour = o.colour || (o.unknown ? UNKNOWN : ACCENT);

        if (o.right || Math.abs(theta - 90) < 0.3) {
          // Square corner mark rather than an arc.
          const s = o.markSize || Math.min(13, shortest * 0.22);
          const u = scale(norm(sub(P, V)), s), v = scale(norm(sub(N, V)), s);
          api.add('path', {
            d: `M ${(V[0] + u[0]).toFixed(2)} ${(V[1] + u[1]).toFixed(2)} L ${(V[0] + u[0] + v[0]).toFixed(2)} ${(V[1] + u[1] + v[1]).toFixed(2)} L ${(V[0] + v[0]).toFixed(2)} ${(V[1] + v[1]).toFixed(2)}`,
            fill: 'none', stroke: colour, 'stroke-width': 1.6
          });
          r = s * 1.45;
        } else {
          const arcs = o.ticks || 1;
          for (let k = 0; k < arcs; k++) {
            api.add('path', {
              d: arcPath(V[0], V[1], r + k * 4, a1, span),
              fill: 'none', stroke: colour, 'stroke-width': 1.8
            });
          }
          r += (arcs - 1) * 4;
        }

        if (o.label !== undefined && o.label !== null) {
          const bis = a1 + span / 2;
          const dist = r + (o.gap === undefined ? 13 : o.gap) + (String(o.label).length > 3 ? 4 : 0);
          api.text(add(V, fromDir(bis, dist)), o.label, {
            fill: colour, size: o.size || 13, bold: true
          });
        }
        return api;
      },

      /** Tick marks across side i, showing which sides are equal. */
      sideTicks(pts, i, count, o) {
        o = o || {};
        const A = pts[i], B = pts[(i + 1) % pts.length];
        const m = mid(A, B);
        const d = norm(sub(B, A));
        const perp = [-d[1], d[0]];
        const s = o.size || 6;
        for (let k = 0; k < (count || 1); k++) {
          const off = scale(d, (k - (count - 1) / 2) * 5);
          api.line(add(add(m, off), scale(perp, -s)), add(add(m, off), scale(perp, s)),
                   { stroke: o.colour || KNOWN, width: 1.8 });
        }
        return api;
      },

      /** Label side i, placed just outside the shape. */
      sideLabel(pts, i, str, o) {
        o = o || {};
        const n = pts.length;
        const A = pts[i], B = pts[(i + 1) % n];
        const m = mid(A, B);
        // Push the label away from the polygon's centre.
        const cx = pts.reduce((s, p) => s + p[0], 0) / n;
        const cy = pts.reduce((s, p) => s + p[1], 0) / n;
        const out = norm(sub(m, [cx, cy]));
        return api.text(add(m, scale(out, o.gap || 14)), str,
                        { fill: o.colour || KNOWN, size: o.size || 12.5 });
      },

      /** Label vertex i (A, B, C …), placed just outside the shape. */
      vertexLabel(pts, i, str, o) {
        o = o || {};
        const n = pts.length;
        const cx = pts.reduce((s, p) => s + p[0], 0) / n;
        const cy = pts.reduce((s, p) => s + p[1], 0) / n;
        const out = norm(sub(pts[i], [cx, cy]));
        return api.text(add(pts[i], scale(out, o.gap || 13)), str,
                        { fill: o.colour || MUTED, size: o.size || 12.5 });
      },

      /** Arrowheads on side i, the usual "these lines are parallel" mark. */
      parallelMark(p1, p2, count, o) {
        o = o || {};
        const m = mid(p1, p2);
        const d = norm(sub(p2, p1));
        const perp = [-d[1], d[0]];
        for (let k = 0; k < (count || 1); k++) {
          const c = add(m, scale(d, (k - (count - 1) / 2) * 7));
          api.add('path', {
            d: `M ${add(add(c, scale(d, -4)), scale(perp, -4.5)).map(v => v.toFixed(1)).join(' ')}
                L ${add(c, scale(d, 2)).map(v => v.toFixed(1)).join(' ')}
                L ${add(add(c, scale(d, -4)), scale(perp, 4.5)).map(v => v.toFixed(1)).join(' ')}`,
            fill: 'none', stroke: o.colour || MUTED, 'stroke-width': 1.6,
            'stroke-linecap': 'round', 'stroke-linejoin': 'round'
          });
        }
        return api;
      },

      /** Free-standing angle mark between two directions at a point. */
      markAngle(v, a1, span, o) {
        o = o || {};
        const colour = o.colour || (o.unknown ? UNKNOWN : ACCENT);
        const r = o.r || 24;
        if (Math.abs(Math.abs(span) - 90) < 0.3) {
          const u = fromDir(a1, 13), w2 = fromDir(a1 + span, 13);
          api.add('path', {
            d: `M ${v[0] + u[0]} ${v[1] + u[1]} L ${v[0] + u[0] + w2[0]} ${v[1] + u[1] + w2[1]} L ${v[0] + w2[0]} ${v[1] + w2[1]}`,
            fill: 'none', stroke: colour, 'stroke-width': 1.6
          });
        } else {
          api.add('path', { d: arcPath(v[0], v[1], r, a1, span), fill: 'none', stroke: colour, 'stroke-width': 1.8 });
        }
        if (o.label !== undefined) {
          api.text(add(v, fromDir(a1 + span / 2, r + (o.gap || 14))), o.label,
                   { fill: colour, size: o.size || 13 });
        }
        return api;
      }
    };
    return api;
  }

  // ── Composite diagrams ────────────────────────────────────────────────────

  return {
    NS, RAD, DEG,
    sub, add, scale, len, norm, dirOf, fromDir, mid, rotate,
    triangleFromAngles, regularPolygon, convexPolygon, polygonFromAngles, polygon,
    interiorAngles, sideLengths, angleSum,
    fit, el, arcPath, canvas
  };
})();
