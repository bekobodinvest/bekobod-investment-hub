'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedCounter from '@/components/AnimatedCounter';

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function AnimatedStatCard({
  num,
  prefix = '',
  suffix = '',
  label,
  delay = 0,
}: {
  num: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-on-scroll stat-card border border-gray-100"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-black text-[#4a9c4e] mb-2">
        <AnimatedCounter target={num} prefix={prefix} suffix={suffix} duration={1800} />
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function ProjectCard({
  href,
  image,
  badge,
  title,
  subtitle,
  description,
  stats,
  learnMore,
  delay = 0,
}: {
  href: string;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  stats: readonly { readonly value: string; readonly label: string }[];
  learnMore: string;
  delay?: number;
}) {
  return (
    <Link
      href={href}
      className="animate-on-scroll card group block hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="navy-badge text-xs">{badge}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs font-semibold text-[#4a9c4e] uppercase tracking-wider mb-1">
          {subtitle}
        </div>
        <h3 className="text-xl font-bold text-[#1a2744] mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-t border-b border-gray-100">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-[#1a2744] text-sm">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 text-[#4a9c4e] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
          {learnMore}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  useScrollAnimation();

  const reasons = t.home.why.reasons;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Fullscreen video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />

        {/* Clickable zone overlays — positioned over map labels */}
        {/* BEKOBOD MAXSUS SANOAT ZONASI — bottom-left */}
        <Link
          href="/sez"
          aria-label="Bekobod Maxsus Sanoat Zonasi"
          className="absolute z-10 rounded-xl border border-transparent cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:shadow-[0_0_16px_rgba(0,212,255,0.25),inset_0_0_12px_rgba(0,212,255,0.05)]"
          style={{ left: '7%', bottom: '14%', width: '26%', height: '20%' }}
        />
        {/* YANGI O'ZBEKISTON MASSIVI — center-right */}
        <Link
          href="/yangi-uzbekistan"
          aria-label="Yangi O'zbekiston Massivi"
          className="absolute z-10 rounded-xl border border-transparent cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:shadow-[0_0_16px_rgba(0,212,255,0.25),inset_0_0_12px_rgba(0,212,255,0.05)]"
          style={{ left: '65%', top: '43%', width: '30%', height: '22%' }}
        />
        {/* OYBEK ERKIN SAVDO MARKAZI — top-center */}
        <Link
          href="/oybek-ftz"
          aria-label="Oybek Erkin Savdo Markazi"
          className="absolute z-10 rounded-xl border border-transparent cursor-pointer transition-all duration-300 hover:border-[#22c55e] hover:shadow-[0_0_16px_rgba(34,197,94,0.25),inset_0_0_12px_rgba(34,197,94,0.05)]"
          style={{ left: '33%', top: '20%', width: '22%', height: '16%' }}
        />
      </section>

      {/* KEY STATS */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10 animate-on-scroll">
            <h2 className="text-2xl font-bold text-[#1a2744]">{t.home.stats.title}</h2>
            <div className="accent-line mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatedStatCard num={520} prefix="$" suffix="M+" label={t.home.stats.investmentLabel} delay={0} />
            <AnimatedStatCard num={5800} suffix="+" label={t.home.stats.jobsLabel} delay={150} />
            <AnimatedStatCard num={535} suffix={t.home.stats.areaSuffix} label={t.home.stats.areaLabel} delay={300} />
            <AnimatedStatCard num={10} suffix={t.home.stats.taxYearsSuffix} label={t.home.stats.taxYearsLabel} delay={450} />
          </div>
        </div>
      </section>

      {/* 3 INVESTMENT DIRECTIONS */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <span className="green-badge mb-4">{t.home.hero.badge}</span>
            <h2 className="section-heading mt-3">{t.home.directions.title}</h2>
            <p className="section-subheading mx-auto">{t.home.directions.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <ProjectCard
              href="/sez"
              image="/Bekobod_SEZ.png"
              badge={t.home.directions.sez.stats[2].value}
              title={t.home.directions.sez.title}
              subtitle={t.home.directions.sez.subtitle}
              description={t.home.directions.sez.description}
              stats={t.home.directions.sez.stats}
              learnMore={t.home.directions.learnMore}
              delay={0}
            />
            <ProjectCard
              href="/oybek-ftz"
              image="/Oybek_posti.png"
              badge={t.home.directions.oybek.stats[2].value}
              title={t.home.directions.oybek.title}
              subtitle={t.home.directions.oybek.subtitle}
              description={t.home.directions.oybek.description}
              stats={t.home.directions.oybek.stats}
              learnMore={t.home.directions.learnMore}
              delay={100}
            />
            <ProjectCard
              href="/yangi-uzbekistan"
              image="/Yangi_O_zbekiston.jpg"
              badge={t.home.directions.yangi.stats[2].value}
              title={t.home.directions.yangi.title}
              subtitle={t.home.directions.yangi.subtitle}
              description={t.home.directions.yangi.description}
              stats={t.home.directions.yangi.stats}
              learnMore={t.home.directions.learnMore}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* WHY BEKOBOD */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 animate-on-scroll">
            <h2 className="section-heading">{t.home.why.title}</h2>
            <p className="section-subheading mx-auto">{t.home.why.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={i}
                className="animate-on-scroll p-6 rounded-2xl border border-gray-100 hover:border-[#4a9c4e]/30 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4">
                  {[
                    <svg key={0} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    <svg key={1} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    <svg key={2} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                    <svg key={3} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                    <svg key={4} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
                    <svg key={5} className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
                  ][i]}
                </div>
                <h3 className="font-bold text-[#1a2744] text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTOR QUOTE */}
      <section className="py-20 bg-gradient-to-br from-[#1a2744] to-[#243660]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <svg className="w-12 h-12 text-[#4a9c4e] mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
              {t.contact.director.message}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#4a9c4e]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-bold">{t.contact.director.name}</div>
                <div className="text-[#4a9c4e] text-sm">{t.contact.director.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#e8f5e9] to-white rounded-3xl p-10 md:p-16 text-center border border-[#4a9c4e]/20 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a2744] mb-4">
              {t.home.cta.title}
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              {t.home.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://e-auksion.uz/lots?group=6&index=1&page=1&address=&lt=0&at=0&order=0&q=&hashtag=&region=2&area=19"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.home.cta.button}
              </a>
              <Link href="/contact" className="btn-outline">
                {t.home.cta.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
