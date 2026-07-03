'use client';

import { useEffect, useRef } from 'react';

const HOVER_TARGETS =
  'a, button, [role="button"], polygon, .cursor-hover';
const TEXT_TARGETS = 'input, textarea, select';
const SPOTLIGHT_TARGETS = '.card, .stat-card, .spotlight-card';

/**
 * Cursor companion: a small dot that sticks to the pointer, a ring that
 * trails it with easing, and a soft ambient glow (visible on dark sections
 * via mix-blend-mode: screen). Also drives the card spotlight CSS vars.
 * Desktop pointers only; disabled for touch and prefers-reduced-motion.
 */
export default function CursorGlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!fine || reduced || !root || !dot || !ring || !glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;   // dot
    let rx = mx, ry = my;   // ring
    let gx = mx, gy = my;   // glow
    let raf = 0;
    let seen = false;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const frame = () => {
      dx = lerp(dx, mx, 0.4);
      dy = lerp(dy, my, 0.4);
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      gx = lerp(gx, mx, 0.08);
      gy = lerp(gy, my, 0.08);
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        dx = rx = gx = mx;
        dy = ry = gy = my;
        root.classList.add('cursor-fx-on');
      }

      const t = e.target as Element | null;
      if (t) {
        root.classList.toggle('cursor-fx-hover', !!t.closest(HOVER_TARGETS));
        root.classList.toggle('cursor-fx-text', !!t.closest(TEXT_TARGETS));

        const card = t.closest<HTMLElement>(SPOTLIGHT_TARGETS);
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        }
      }
    };

    const onDown = () => root.classList.add('cursor-fx-down');
    const onUp = () => root.classList.remove('cursor-fx-down');
    const onLeave = () => root.classList.remove('cursor-fx-on');
    const onEnter = () => { if (seen) root.classList.add('cursor-fx-on'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-fx" aria-hidden="true">
      <div ref={glowRef} className="cursor-fx-pos cursor-fx-glow-pos">
        <div className="cursor-glow" />
      </div>
      <div ref={ringRef} className="cursor-fx-pos cursor-fx-ring-pos">
        <div className="cursor-ring" />
      </div>
      <div ref={dotRef} className="cursor-fx-pos cursor-fx-dot-pos">
        <div className="cursor-dot" />
      </div>
    </div>
  );
}
