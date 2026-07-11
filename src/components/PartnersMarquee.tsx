'use client';

import type { Partner } from '@/components/PartnersOrbit';

/**
 * Horizontal logo ticker that scrolls right → left forever. The list is rendered
 * twice back-to-back and the track is translated by -50%, so the loop is seamless.
 * Hovering the strip pauses it (via CSS) so a logo can be clicked; hovering a
 * single tile enlarges it. Clicking opens the partner's site.
 */
export default function PartnersMarquee({ partners }: { partners: Partner[] }) {
  // Repeat the list until one "half" is wide enough to span the widest screens,
  // then render two identical halves. Translating the track by -50% loops one
  // whole half seamlessly, so there is never an empty gap on the right.
  let half = [...partners];
  while (half.length && half.length < 20) half = [...half, ...partners];
  const loop = [...half, ...half];
  return (
    <div className="partners-marquee relative overflow-hidden">
      {/* soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

      <div className="partners-marquee-track flex items-center gap-6 py-4">
        {loop.map((p, i) => (
          <a
            key={`${p.name}-${i}`}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.name}
            title={p.name}
            className="group shrink-0"
          >
            <div className="flex h-24 w-40 items-center justify-center rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-200/70 transition-transform duration-200 hover:scale-110 hover:shadow-xl hover:ring-[#4a9c4e]/40">
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
                className="items-center justify-center text-center text-xs font-bold leading-tight text-[#1a2744]"
              >
                {p.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
