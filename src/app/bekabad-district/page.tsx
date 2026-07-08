'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import MapSection from '@/components/MapSection';

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

// Values from the district passport (Jan–Sep 2025). Kept in the component as a
// single source of truth; labels come from translations.
const statValues = ['749.69 km²', '170,200', '1926', '51', '7.4%', '5.5%'];

const economyIcons = ['🏭', '🌾', '🛒'];
const economyValues = [
  { value: '389.8', unit: 'bn UZS', growth: '+5.8%' },
  { value: '4,031.7', unit: 'bn UZS', growth: '+4.0%' },
  { value: '1,103.6', unit: 'bn UZS', growth: '+15.6%' },
];

const laborValues = ['83,600', '66,300', '62,600', '32,400', '23,900'];

const socialIcons = ['🏫', '🧸', '🏥', '🎓', '🏟️', '🏛️'];
const socialValues = ['61', '260', '21', '2', '8', '32'];

const infraIcons = ['🔥', '💧', '🛣️', '⚡', '📡'];
const infraValues = ['93.8%', '79.4%', '1,035 km', '1,673 km', '549 km'];

const businessValues = ['1,117', '254', '1,821'];

export default function BekabadDistrictPage() {
  const { t } = useLanguage();
  const d = t.bekabadDistrict;
  useScrollAnimation();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#1a2744] to-[#1a3530] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="green-badge mb-5">{d.badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {d.title}
            </h1>
            <p className="text-xl text-[#4a9c4e] font-medium mb-6">{d.subtitle}</p>
            <p className="text-gray-300 leading-relaxed text-lg">{d.overview.description}</p>
          </div>
        </div>
      </section>

      {/* Key figures strip */}
      <section className="py-12 bg-[#1a2744]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {d.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-on-scroll text-center p-5 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-[#4a9c4e] font-black text-xl md:text-2xl">{statValues[i]}</div>
                <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.economy.title}</h2>
            <p className="section-subheading mx-auto">{d.economy.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {d.economy.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-8 border border-gray-100 group hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{economyIcons[i]}</div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-3 group-hover:text-[#4a9c4e] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black text-[#1a2744]">{economyValues[i].value}</span>
                  <span className="text-gray-500 text-sm font-medium">{economyValues[i].unit}</span>
                  <span className="ml-auto text-[#4a9c4e] font-bold text-sm">{economyValues[i].growth}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {d.economy.highlights.map((h, i) => (
              <div
                key={i}
                className="animate-on-scroll flex items-center gap-3 p-5 bg-[#e8f5e9] rounded-[2rem] border border-[#4a9c4e]/20"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-9 h-9 rounded-full bg-[#4a9c4e] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#1a2744] text-sm font-medium leading-tight">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labor & Employment */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{d.labor.title}</h2>
            <p className="section-subheading mx-auto">{d.labor.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {d.labor.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 text-center border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-2xl md:text-3xl font-black text-[#1a2744]">{laborValues[i]}</div>
                <div className="text-gray-500 text-xs mt-2 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social infrastructure */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="accent-line mx-auto mb-6" />
            <h2 className="section-heading">{d.social.title}</h2>
            <p className="section-subheading mx-auto">{d.social.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {d.social.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 text-center border border-gray-100 group hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="text-3xl mb-3">{socialIcons[i]}</div>
                <div className="text-2xl font-black text-[#4a9c4e]">{socialValues[i]}</div>
                <div className="text-gray-500 text-xs mt-1 leading-tight">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities & Communications */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{d.infrastructure.title}</h2>
            <p className="section-subheading mx-auto">{d.infrastructure.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {d.infrastructure.items.map((item, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-6 text-center border border-gray-100"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3">{infraIcons[i]}</div>
                <div className="text-xl md:text-2xl font-black text-[#1a2744]">{infraValues[i]}</div>
                <div className="text-gray-500 text-xs mt-2 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Small business banner */}
      <section className="py-16 bg-gradient-to-r from-[#4a9c4e] to-[#3a7d3e]">
        <div className="container-custom">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{d.business.title}</h2>
            <p className="text-white/80">{d.business.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {d.business.items.map((item, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-5xl font-black text-white mb-2">{businessValues[i]}</div>
                <div className="text-white/90 font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-white">
        <div className="container-custom animate-on-scroll">
          <MapSection
            title={d.map.title}
            description={d.map.description}
            googleLabel={d.map.button}
            yandexLabel={d.map.yandexButton}
            googleUrl="https://maps.app.goo.gl/P9fQayt1cdnUjG4w6"
            yandexUrl="https://yandex.uz/maps/-/CTubr0IB"
            embedQuery="40.383995,69.255059"
          />
        </div>
      </section>
    </>
  );
}
