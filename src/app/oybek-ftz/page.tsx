'use client';

import { useEffect } from 'react';
import Image from 'next/image';
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

const facilityIcons = ['🏨', '⛽', '🚗', '🔧', '🔌', '🅿️'];

export default function OybekFTZPage() {
  const { t } = useLanguage();
  useScrollAnimation();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-gradient-to-br from-[#1a2744] to-[#1a3530] relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="pb-16">
              <span className="green-badge mb-5">{t.oybek.badge}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                {t.oybek.title}
              </h1>
              <p className="text-xl text-[#4a9c4e] font-medium mb-6">{t.oybek.subtitle}</p>
              <p className="text-gray-300 leading-relaxed text-lg">{t.oybek.overview.description}</p>
            </div>
            <div className="relative h-72 lg:h-96 rounded-t-2xl overflow-hidden">
              <Image
                src="/Oybek_posti.png"
                alt="Oybek Free Trade Zone"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-[#1a2744]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.oybek.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-on-scroll text-center p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-[#4a9c4e] font-black text-xl">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Image */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Oybek_posti.png"
                  alt="Oybek Border Post"
                  width={600}
                  height={450}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-lg">
                    🇺🇿 Uzbekistan — 🇹🇯 Tajikistan Border
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll order-1 lg:order-2">
              <div className="accent-line mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
                {t.oybek.overview.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.oybek.overview.description}
              </p>
              <p className="text-gray-600 leading-relaxed">{t.oybek.location.description}</p>

              <div className="mt-8 p-5 bg-[#e8f5e9] rounded-xl border border-[#4a9c4e]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4a9c4e] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-[#1a2744] text-sm">{t.oybek.location.title}</div>
                    <div className="text-gray-600 text-sm mt-1">{t.oybek.location.description}</div>
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
            <h2 className="section-heading">{t.oybek.facilities.title}</h2>
            <p className="section-subheading mx-auto">{t.oybek.facilities.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.oybek.facilities.items.map((facility, i) => (
              <div
                key={i}
                className="animate-on-scroll card p-7 border border-gray-100 group hover:border-[#4a9c4e]/30"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-4xl mb-4">{facilityIcons[i]}</div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2 group-hover:text-[#4a9c4e] transition-colors">
                  {facility.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Banner */}
      <section className="py-16 bg-gradient-to-r from-[#4a9c4e] to-[#3a7d3e]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {(['$20M', '$5M', '200+'] as const).map((value, i) => (
              <div key={i} className="animate-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-5xl font-black text-white mb-2">{value}</div>
                <div className="text-white/90 font-semibold">{t.oybek.banner[i].label}</div>
                <div className="text-white/60 text-sm mt-1">{t.oybek.banner[i].sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-white">
        <div className="container-custom animate-on-scroll">
          <MapSection
            title={t.oybek.map.title}
            description={t.oybek.map.description}
            googleLabel={t.oybek.map.button}
            yandexLabel={t.oybek.map.yandexButton}
            googleUrl="https://maps.app.goo.gl/ApWW1c4iSoGaMyam7"
            yandexUrl="https://yandex.uz/maps/-/CTAjjU5-"
            embedQuery="40.546190,69.206146"
          />
        </div>
      </section>
    </>
  );
}
