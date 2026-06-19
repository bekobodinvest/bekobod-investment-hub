'use client';

interface MapSectionProps {
  title: string;
  description: string;
  googleLabel: string;
  yandexLabel: string;
  googleUrl: string;
  yandexUrl: string;
  /** lat,lng — used to embed the live Google Map preview on the left side */
  embedQuery: string;
}

export default function MapSection({
  title,
  description,
  googleLabel,
  yandexLabel,
  googleUrl,
  yandexUrl,
  embedQuery,
}: MapSectionProps) {
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    embedQuery
  )}&z=15&hl=en&output=embed`;

  return (
    <div className="bg-gradient-to-br from-[#1a2744] to-[#243660] rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Live Google Map embed */}
        <div className="relative h-72 md:h-auto md:min-h-[320px] bg-[#111b30]">
          <iframe
            src={embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Info side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-white font-bold text-xl">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">{description}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4a9c4e] hover:bg-[#3a7d3e] text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {googleLabel}
            </a>
            <a
              href={yandexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {yandexLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
