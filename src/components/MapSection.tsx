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
              className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-50 text-[#3c4043] font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              {/* Google Maps pin — official multi-color style */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 6 8 12 8 12s8-6 8-12c0-4.42-3.58-8-8-8z" fill="#34A853" />
                <path d="M12 2C7.58 2 4 5.58 4 10c0 1.7.65 3.33 1.69 4.77L12 10V2z" fill="#4285F4" />
                <path d="M12 2v8l6.31 4.77C19.35 13.33 20 11.7 20 10c0-4.42-3.58-8-8-8z" fill="#EA4335" />
                <path d="M5.69 14.77C7.16 16.8 9.41 19 12 22c2.59-3 4.84-5.2 6.31-7.23L12 10l-6.31 4.77z" fill="#FBBC04" />
                <circle cx="12" cy="10" r="2.5" fill="#fff" />
              </svg>
              {googleLabel}
            </a>
            <a
              href={yandexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-50 text-[#1a1a1a] font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              {/* Yandex Maps pin — red drop with white center */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="#FC3F1D"
                />
                <circle cx="12" cy="9" r="2.6" fill="#fff" />
              </svg>
              {yandexLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
