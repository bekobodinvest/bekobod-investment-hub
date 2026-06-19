'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/incentives', label: t.nav.incentives },
    { href: '/contact', label: t.nav.contact },
  ];

  const projects = [
    { href: '/sez', label: t.nav.sez },
    { href: '/oybek-ftz', label: t.nav.oybek },
    { href: '/yangi-uzbekistan', label: t.nav.yangi },
  ];

  return (
    <footer className="bg-[#111b30] text-gray-300">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image
                  src="/Asset_7.png"
                  alt="Bekobod Investment Hub"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-white font-bold text-base">BEKOBOD</div>
                <div className="text-[#4a9c4e] font-semibold text-sm">INVESTMENT HUB</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{t.footer.description}</p>
            <a
              href="https://t.me/Bekobodtumanihokimligi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#4a9c4e] hover:text-white font-medium bg-[#4a9c4e]/10 hover:bg-[#4a9c4e] rounded-lg px-3 py-2 transition-colors group"
            >
              {/* Telegram paper-plane mark */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.665 3.717 2.93 10.554c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.787L23 5.422c.309-1.244-.473-1.812-1.335-1.705z" />
              </svg>
              <span>{t.footer.authority}</span>
              <svg className="w-3.5 h-3.5 ml-auto opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#4a9c4e] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4a9c4e]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              {t.footer.projects}
            </h4>
            <ul className="space-y-3">
              {projects.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#4a9c4e] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4a9c4e]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & E-Auction */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              {t.footer.legal}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-5">{t.footer.legalBasis}</p>
            <a
              href="https://e-auksion.uz/lots?group=6&index=1&page=1&address=&lt=0&at=0&order=0&q=&hashtag=&region=2&area=19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4a9c4e] hover:bg-[#3a7d3e] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg whitespace-nowrap"
            >
              {/* Auction gavel — same as the header CTA */}
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 1.8 L22.2 7.4 L18.6 13.8 L7.4 8.2 Z" />
                <path d="M10.4 6.5 L3.2 12.8 L6.6 15.6 L13.8 9.3 Z" />
                <rect x="2" y="18.4" width="20" height="3.2" rx="0.8" />
              </svg>
              {t.nav.eAuction}
            </a>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bekobod, Tashkent Region, Uzbekistan
              </div>

              {/* Social media icons */}
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="social-icon group"
                >
                  <svg className="w-4 h-4 transition-all duration-300 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span className="sr-only">Instagram</span>
                  {/* Instagram gradient overlay on hover */}
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }} />
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="social-icon group"
                  style={{ '--brand': '#1877F2' } as React.CSSProperties}
                >
                  <svg className="w-4 h-4 transition-colors duration-300 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>

                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="social-icon group"
                  style={{ '--brand': '#FF0050' } as React.CSSProperties}
                >
                  <svg className="w-4 h-4 transition-colors duration-300 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span className="sr-only">TikTok</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="social-icon group"
                  style={{ '--brand': '#0A66C2' } as React.CSSProperties}
                >
                  <svg className="w-4 h-4 transition-colors duration-300 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>

                {/* Telegram */}
                <a
                  href="#"
                  aria-label="Telegram"
                  className="social-icon group"
                  style={{ '--brand': '#229ED9' } as React.CSSProperties}
                >
                  <svg className="w-4 h-4 transition-colors duration-300 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span className="sr-only">Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bekobod Investment Hub. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#4a9c4e] animate-pulse" />
            Bekobod Investitsiya Boshqaruv Kompaniyasi
          </div>
        </div>
      </div>
    </footer>
  );
}
