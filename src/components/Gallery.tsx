'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface GallerySlide {
  /** Image path under /public, e.g. "/gallery/1.jpg" */
  src: string;
  /** Optional caption shown over the bottom of the slide */
  caption?: string;
}

interface GalleryProps {
  slides: GallerySlide[];
  /** Auto-advance interval in ms (default 5000). Set 0 to disable. */
  interval?: number;
  /** Accessible label / alt prefix */
  alt?: string;
}

export default function Gallery({ slides, interval = 5000, alt = 'Gallery' }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (interval <= 0 || paused || count <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [interval, paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl bg-[#111b30] aspect-[16/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.caption || `${alt} ${i + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/70 via-transparent to-transparent" />
          {slide.caption && (
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-lg">
                {slide.caption}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-7 bg-[#4a9c4e]' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
