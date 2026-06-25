'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import MapSection from '@/components/MapSection';
import LotMap from '@/components/LotMap';
import Gallery from '@/components/Gallery';

// District gallery slides — 9 Yangi Uzbekistan masterplan renders
const GALLERY_SLIDES = [
  { src: '/gallery/1.png' },
  { src: '/gallery/2.png' },
  { src: '/gallery/3.png' },
  { src: '/gallery/4.png' },
  { src: '/gallery/5.png' },
  { src: '/gallery/6.png' },
  { src: '/gallery/7.png' },
  { src: '/gallery/8.png' },
  { src: '/gallery/9.png' },
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

export default function YangiUzbekistanPage() {
  const { t } = useLanguage();
  useScrollAnimation();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-gradient-to-br from-[#1a2744] to-[#1a2a3a] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <span className="green-badge mb-5">{t.yangi.badge}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                {t.yangi.title}
              </h1>
              <p className="text-xl text-[#4a9c4e] font-medium mb-6">{t.yangi.subtitle}</p>
              <p className="text-gray-300 leading-relaxed text-lg">{t.yangi.overview.description}</p>
            </div>
            <div className="relative h-72 lg:h-96 rounded-t-2xl overflow-hidden">
              <Image
                src="/Yangi_O_zbekiston.jpg"
                alt="Yangi O'zbekiston Residential District"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lot Map */}
      <section className="section-padding bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <LotMap
            labels={{
              title: t.yangi.lots.title,
              description: t.yangi.lots.description,
              image: '/yangi_aerial.png',
              imageAlt: "Yangi O'zbekiston masterplan — investment lots",
              lotLabel: t.yangi.lots.lotLabel,
              areaLabel: t.yangi.lots.areaLabel,
              priceLabel: t.yangi.lots.priceLabel,
              auctionButton: t.yangi.lots.auctionButton,
              hint: t.yangi.lots.hint,
              statusLabels: t.yangi.lots.status,
              useLabels: t.yangi.lots.useLabels,
            }}
          />
        </div>
      </section>

      {/* District Gallery */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t.yangi.gallery.title}</h2>
            <p className="section-subheading mx-auto">{t.yangi.gallery.subtitle}</p>
          </div>
          <Gallery slides={GALLERY_SLIDES} interval={5000} alt={t.yangi.gallery.title} />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-[#1a2744]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.yangi.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-on-scroll text-center p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-[#4a9c4e] font-black text-lg">{stat.value}</div>
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
                {t.yangi.overview.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.yangi.overview.description}
              </p>
              <div className="p-6 bg-gradient-to-br from-[#1a2744] to-[#243660] rounded-2xl">
                <div className="text-[#4a9c4e] font-semibold text-sm mb-2">{t.yangi.minuteCityLabel}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{t.yangi.concept.description}</p>
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Yangi_O_zbekiston.jpg"
                  alt="Yangi O'zbekiston"
                  width={600}
                  height={450}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2">
                    {(['104 ha', t.yangi.imageTagApartments, '2030'] as const).map((tag, i) => (
                      <span key={i} className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.yangi.facilities.title}</h2>
            <p className="section-subheading mx-auto">{t.yangi.facilities.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.yangi.facilities.categories.map((cat, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-4 pb-3 border-b border-gray-100">
                  {cat.name}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-500 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4a9c4e] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {(['🏙️', '🎓', '🌳'] as const).map((icon, i) => (
              <div
                key={i}
                className="animate-on-scroll p-8 rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-white border border-[#4a9c4e]/20"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-5">{icon}</div>
                <h3 className="font-bold text-[#1a2744] text-xl mb-3">{t.yangi.highlights[i].title}</h3>
                <p className="text-gray-500 leading-relaxed">{t.yangi.highlights[i].description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Banner */}
      <section className="py-16 bg-gradient-to-br from-[#1a2744] to-[#243660]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {(['$900M', '7,800', '800+', '2030'] as const).map((value, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-4xl md:text-5xl font-black text-[#4a9c4e]">{value}</div>
                <div className="text-gray-300 font-medium mt-2">{t.yangi.banner[i].label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom animate-on-scroll">
          <MapSection
            title={t.yangi.map.title}
            description={t.yangi.map.description}
            googleLabel={t.yangi.map.button}
            yandexLabel={t.yangi.map.yandexButton}
            googleUrl="https://maps.app.goo.gl/tu4cpvgh5meCWsSY7"
            yandexUrl="https://yandex.uz/maps/-/CTAjjYze"
            embedQuery="40.393508,69.248754"
          />
        </div>
      </section>
    </>
  );
}
