'use client';

import { useEffect, useRef } from 'react';

export type Partner = {
  name: string;
  href: string;
  logo: string; // path under /public
};

type Variant = 'flat' | 'perspective';

/**
 * Partners arranged around a ring that rotates continuously.
 * - Idle: slow constant spin.
 * - Move the mouse to the right of centre → the ring spins right; to the left →
 *   it spins left. The further from centre, the faster.
 * - Hovering an icon enlarges it; clicking opens the partner's site.
 *
 * `variant="perspective"` tilts the ring into an ellipse and fades/shrinks the
 * icons by depth, so the far side recedes "into the distance" — used floating in
 * the empty corner of the hero map. `variant="flat"` is a plain upright circle
 * with a centre badge, used as a standalone section.
 *
 * The angle is driven imperatively via refs + rAF so React never re-renders per
 * frame. Icons are positioned (and, in perspective mode, depth-scaled) on the
 * OUTER <a>; the hover zoom lives on an INNER tile so the two never fight.
 */
export default function PartnersOrbit({
  partners,
  variant = 'flat',
}: {
  partners: Partner[];
  variant?: Variant;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const angle = useRef(0); // current ring rotation, degrees
  const vel = useRef(0.12); // current angular velocity, deg/frame
  const targetVel = useRef(0.12); // velocity we ease toward

  const IDLE = 0.12; // gentle drift when the mouse is away
  const MAX = 1.4; // top speed at the container edge
  const perspective = variant === 'perspective';

  useEffect(() => {
    const n = partners.length;
    if (n === 0) return;
    let raf = 0;

    const step = () => {
      vel.current += (targetVel.current - vel.current) * 0.08;
      angle.current += vel.current;

      const el = containerRef.current;
      const w = el?.clientWidth ?? 300;
      const h = el?.clientHeight ?? 300;

      // circle for flat, flattened ellipse for perspective
      const rx = perspective ? w * 0.38 : (Math.min(w, h) / 2) * 0.72;
      const ry = perspective ? h * 0.36 : (Math.min(w, h) / 2) * 0.72;

      for (let i = 0; i < n; i++) {
        const node = iconRefs.current[i];
        if (!node) continue;
        const a = ((angle.current + (360 / n) * i) * Math.PI) / 180;
        const x = rx * Math.cos(a);
        const y = ry * Math.sin(a);

        if (perspective) {
          const depth = (Math.sin(a) + 1) / 2; // 0 = far/back, 1 = near/front
          const scale = 0.28 + 1.32 * depth; // far ~0.28×, near ~1.6× — deep recede
          node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
          node.style.opacity = String(0.32 + 0.68 * depth);
          node.style.zIndex = String(Math.round(depth * 100));
        } else {
          node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [partners.length, perspective]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    targetVel.current = Math.max(-1, Math.min(1, dx)) * MAX;
  };

  const handleLeave = () => {
    targetVel.current = IDLE;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={
        perspective
          ? 'relative mx-auto aspect-[6/5] w-full select-none [perspective:900px]'
          : 'relative mx-auto aspect-square w-full max-w-[440px] select-none'
      }
    >
      {!perspective && (
        <>
          {/* soft dashed guide ring */}
          <div className="pointer-events-none absolute inset-[14%] rounded-full border border-dashed border-[#4a9c4e]/25" />
          {/* centre badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2744] to-[#243660] shadow-xl md:h-28 md:w-28">
            <svg className="h-9 w-9 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm7-4a3 3 0 10-3-3m-11 3a3 3 0 11-3-3" />
            </svg>
          </div>
        </>
      )}

      {partners.map((p, i) => (
        <a
          key={p.name}
          ref={(el) => {
            iconRefs.current[i] = el;
          }}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.name}
          title={p.name}
          className="group absolute left-1/2 top-1/2 block"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Inner tile carries the hover zoom, kept separate from the parent's
              JS-driven translate/scale so the two transforms never fight. */}
          <div
            className={`flex items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-200/70 transition-transform duration-200 group-hover:z-10 group-hover:scale-[1.4] group-hover:shadow-2xl group-hover:ring-[#4a9c4e]/50 ${
              perspective ? 'h-[4.5rem] w-[4.5rem] p-2.5' : 'h-20 w-20 p-3 md:h-24 md:w-24'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.logo}
              alt={p.name}
              className="max-h-full max-w-full object-contain grayscale-[35%] transition-[filter] duration-200 group-hover:grayscale-0"
              draggable={false}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = 'none';
                const fb = img.nextElementSibling as HTMLElement | null;
                if (fb) fb.style.display = 'flex';
              }}
            />
            <span
              style={{ display: 'none' }}
              className="items-center justify-center text-center text-[10px] font-bold leading-tight text-[#1a2744]"
            >
              {p.name}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
