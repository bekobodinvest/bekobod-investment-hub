'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import MapSection from '@/components/MapSection';
import SezZonesPublic from '@/components/SezZonesPublic';
import Gallery from '@/components/Gallery';
import { SEZ_ZONES } from '@/data/sezZones';
import { SEZ_LOTS } from '@/data/sezLots';

const technoparkGallery = [
  '/technopark-gallery/01.webp',
  '/technopark-gallery/02.webp',
  '/technopark-gallery/03.webp',
  '/technopark-gallery/04.webp',
  '/technopark-gallery/05.webp',
  '/technopark-gallery/06.webp',
  '/technopark-gallery/07.webp',
  '/technopark-gallery/08.webp',
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const sectorIcons = [
  '⚙️', '💊', '🔧', '🏗️', '📦', '🌾', '⚡', '🧵',
];

// Bekobod SEZ district gallery — industrial park renders
const GALLERY_SLIDES = [
  { src: '/gallery-sez/1.png' },
  { src: '/gallery-sez/2.jpg' },
  { src: '/gallery-sez/3.png' },
  { src: '/gallery-sez/4.png' },
];

// Overview image carousel: SEZ aerial render ↔ freight railway locomotive.
const overviewSlides = [
  { src: '/Bekobod_SEZ.png', alt: 'Bekobod SEZ Overview' },
  { src: '/railway-locomotive.jpg', alt: "O'zbekiston temir yo'llari freight locomotive" },
];

export default function SEZPage() {
  const { t } = useLanguage();
  const router = useRouter();
  useScrollAnimation();

  // Lot count + area per sector, indexed to match t.sez.sectors.items order (= SEZ_ZONES order).
  const sectorStats = useMemo(() => {
    return SEZ_ZONES.map((z) => {
      const lots = SEZ_LOTS.filter((l) => l.zone === z.id);
      return { count: lots.length, ga: lots.reduce((s, l) => s + l.areaGa, 0) };
    });
  }, []);

  // Land on the clusters map when arriving via /sez#clusters (e.g. "back" from a cluster page).
  useEffect(() => {
    if (window.location.hash !== '#clusters') return;
    const el = document.getElementById('clusters');
    if (!el) return;
    const raf = requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, []);

  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setGalleryIndex((i) => (i + 1) % technoparkGallery.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  const [overviewIndex, setOverviewIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setOverviewIndex((i) => (i + 1) % overviewSlides.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-gradient-to-br from-[#1a2744] to-[#243660] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-custom relative z-10 pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <span className="green-badge mb-5">{t.sez.badge}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                {t.sez.title}
              </h1>
              <p className="text-xl text-[#4a9c4e] font-medium mb-6">{t.sez.subtitle}</p>
              <p className="text-gray-300 leading-relaxed text-lg">{t.sez.overview.description}</p>
            </div>
            <div className="relative h-72 lg:h-96 rounded-t-2xl overflow-hidden">
              <Image
                src="/Bekobod_SEZ.png"
                alt="Bekobod SEZ"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 bg-[#1a2744]">
        <div className="container-custom">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {t.sez.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-on-scroll text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-[#4a9c4e] font-black text-lg lg:text-xl">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="accent-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
                {t.sez.overview.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">{t.sez.overview.description}</p>

              <p className="text-gray-600 leading-relaxed text-lg text-justify mt-5">
                <span className="font-semibold text-[#1a2744]">{t.sez.overview.railwayTitle}. </span>
                {t.sez.overview.railway}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {(['📍', '🏭', '💰', '👥'] as const).map((icon, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="text-xs text-gray-400">{t.sez.overviewStats[i].label}</div>
                      <div className="font-bold text-[#1a2744]">{t.sez.overviewStats[i].value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-[#111b30]">
                {overviewSlides.map((slide, i) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-1000 ${
                      i === overviewIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-[#4a9c4e] text-white text-xs font-bold px-3 py-1.5 rounded-lg">397 ha</div>
                    <div className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm">120 {t.sez.imageTags.lots}</div>
                    <div className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm">8 {t.sez.imageTags.sectors}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {overviewSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => setOverviewIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === overviewIndex ? 'w-6 bg-[#4a9c4e]' : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Clusters — sectors + aerial zone map (merged) */}
      <section id="clusters" className="section-padding bg-gray-50 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.sez.clustersMap.title}</h2>
            <p className="section-subheading mx-auto mt-4">{t.sez.clustersMap.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.sez.sectors.items.map((sector, i) => (
              <button
                key={i}
                type="button"
                onClick={() => SEZ_ZONES[i] && router.push(`/sez/cluster/${SEZ_ZONES[i].id}`)}
                className="animate-on-scroll card p-6 border border-gray-100 group hover:border-[#4a9c4e]/30 text-left w-full cursor-pointer transition-shadow hover:shadow-lg"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-4xl mb-4">{sectorIcons[i]}</div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2 group-hover:text-[#4a9c4e] transition-colors">
                  {sector.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sector.description}</p>
                {sectorStats[i] && (
                  <p className="mt-3 text-xs font-medium text-gray-400">
                    {sectorStats[i].count} {t.sez.clustersMap.lotsLabel} · {sectorStats[i].ga.toFixed(1)} {t.sez.clustersMap.areaUnit}
                  </p>
                )}
              </button>
            ))}
          </div>

          <div className="animate-on-scroll mt-12">
            <SezZonesPublic />
          </div>
        </div>
      </section>

      {/* Technopark */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#1a2744] via-[#243660] to-[#1a3a2a] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 bg-[#4a9c4e]/20 border border-[#4a9c4e]/30 text-[#4a9c4e] text-sm font-semibold px-4 py-2 rounded-full mb-6 self-start">
                  ⭐ {t.sez.technopark.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  {t.sez.technopark.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  {t.sez.technopark.description}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {t.sez.technopark.descriptionSecond.before}
                  <a
                    href="https://tp-bekobod.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a9c4e] hover:underline font-semibold"
                  >
                    {t.sez.technopark.descriptionSecond.linkText}
                  </a>
                  {t.sez.technopark.descriptionSecond.after}
                </p>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {t.sez.technopark.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[#4a9c4e] font-black text-xl">{stat.value}</div>
                      <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative lg:h-auto h-64 bg-[#111b30] overflow-hidden">
                {technoparkGallery.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Bekobod Technopark ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-1000 ${
                      i === galleryIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111b30]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-end gap-4">
                  <div className="flex gap-1.5">
                    {technoparkGallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => setGalleryIndex(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === galleryIndex ? 'w-6 bg-[#4a9c4e]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* District Gallery */}
      <section className="section-padding bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t.sez.gallery.title}</h2>
            <p className="section-subheading mx-auto">{t.sez.gallery.subtitle}</p>
          </div>
          <Gallery slides={GALLERY_SLIDES} interval={5000} alt={t.sez.gallery.title} />
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom animate-on-scroll">
          <MapSection
            title={t.sez.map.title}
            description={t.sez.map.description}
            googleLabel={t.sez.map.button}
            yandexLabel={t.sez.map.yandexButton}
            googleUrl="https://maps.app.goo.gl/djKD81wt3TnbBFmz6"
            yandexUrl="https://yandex.uz/maps/-/CTAjj0ld"
            embedQuery="40.292359,69.219809"
          />
        </div>
      </section>
    </>
  );
}
