'use client';

interface MapSectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  mapUrl: string;
  coordinates?: string;
}

export default function MapSection({
  title,
  description,
  buttonLabel,
  mapUrl,
  coordinates,
}: MapSectionProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a2744] to-[#243660] rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Map visual side */}
        <div className="relative h-72 md:h-auto bg-[#111b30] flex flex-col items-center justify-center gap-5 p-10">
          {/* Decorative map grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(#4a9c4e 1px, transparent 1px),
                linear-gradient(90deg, #4a9c4e 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Pin icon */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#4a9c4e]/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#4a9c4e]/40 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#4a9c4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          {coordinates && (
            <p className="relative z-10 text-gray-400 text-xs font-mono">{coordinates}</p>
          )}
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
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#4a9c4e] hover:bg-[#3a7d3e] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group self-start"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {buttonLabel}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
