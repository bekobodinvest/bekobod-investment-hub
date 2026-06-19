export type Language = 'en' | 'uz' | 'ru' | 'zh';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      sez: 'Bekobod SEZ',
      oybek: 'Oybek FTZ',
      yangi: "Yangi Uzbekistan",
      incentives: 'Incentives',
      contact: 'Contact',
      eAuction: 'E-Auction Portal',
    },
    home: {
      hero: {
        badge: 'Official Investment Portal',
        tagline: 'Invest in Bekobod',
        subtitle: "Your Gateway to Central Asia's Most Dynamic Investment Zone",
        description:
          'Bekobod Investment Hub offers world-class investment opportunities through transparent e-auction processes, comprehensive tax incentives, and a strategic location at the crossroads of Central Asia.',
        ctaButton: 'Participate in E-Auction',
        learnMore: 'Explore Opportunities',
      },
      stats: {
        title: 'Bekobod by the Numbers',
        investment: '$520M+',
        investmentLabel: 'Total Investment Potential',
        jobs: '5,800+',
        jobsLabel: 'Jobs to be Created',
        area: '535 ha',
        areaLabel: 'Total Development Area',
        taxYears: '10 Years',
        taxYearsLabel: 'Maximum Tax Exemption',
        taxYearsSuffix: ' Yrs',
        areaSuffix: ' ha',
      },
      directions: {
        title: 'Three Strategic Investment Directions',
        subtitle: "Choose your investment path in Bekobod's growing economy",
        learnMore: 'Learn More',
        sez: {
          title: 'Bekobod SEZ',
          subtitle: 'Special Economic Zone',
          description:
            '397 hectares of prime industrial land with 95 investment lots across 8 strategic sectors. The cornerstone of Bekobod\'s economic transformation.',
          stats: [
            { value: '$500M', label: 'Investment' },
            { value: '5000+', label: 'Jobs' },
            { value: 'Oct 2026', label: 'Launch' },
          ],
        },
        oybek: {
          title: 'Oybek FTZ',
          subtitle: 'Free Trade Zone',
          description:
            'Located at the Uzbekistan-Tajikistan border, this 34-hectare free trade zone creates a premier hub for cross-border commerce and logistics.',
          stats: [
            { value: '$20M', label: 'Investment' },
            { value: '200+', label: 'Jobs' },
            { value: 'Dec 2027', label: 'Launch' },
          ],
        },
        yangi: {
          title: "Yangi Uzbekistan",
          subtitle: 'Residential District',
          description:
            'A complete city within a city — 104 hectares featuring 7,800 apartments, schools, clinics, business centers, and world-class amenities.',
          stats: [
            { value: '11.25T UZS', label: 'Investment' },
            { value: '7800', label: 'Apartments' },
            { value: '2030', label: 'Launch' },
          ],
        },
      },
      why: {
        title: 'Why Invest in Bekobod?',
        subtitle: 'Strategic advantages for forward-thinking investors',
        reasons: [
          {
            title: 'Strategic Location',
            description:
              'Located at the heart of Central Asia with direct access to Uzbekistan-Tajikistan border and major transportation corridors.',
          },
          {
            title: 'Tax Incentives',
            description:
              'Up to 10 years of corporate, land, and property tax exemptions for SEZ resident companies.',
          },
          {
            title: 'E-Auction Transparency',
            description:
              'Fully transparent electronic auction system ensuring fair and competitive access to land lease rights.',
          },
          {
            title: 'Government Support',
            description:
              'Direct backing from Presidential Decree No. UP-4853 and full administrative support from district authorities.',
          },
          {
            title: 'Ready Infrastructure',
            description:
              '26.5 km of roads, utilities, and logistics infrastructure built into the SEZ from day one.',
          },
          {
            title: 'Legal Guarantees',
            description:
              'Long-term legal protections under Uzbek Tax Code Chapter 68, Article 473 with international standards.',
          },
        ],
      },
      cta: {
        title: 'Ready to Invest in Bekobod?',
        subtitle:
          "Join investors from around the world building Bekobod's economic future",
        button: 'Start Your Investment Journey',
        contact: 'Contact Our Team',
      },
    },
    about: {
      title: 'About Bekobod Investment Hub',
      subtitle: "Building tomorrow's economic powerhouse today",
      hero: {
        badge: 'Official Authority',
        description:
          'The official investment management company operating under Bekobod district hokimiyat, dedicated to attracting domestic and foreign capital.',
      },
      company: {
        title: 'Our Company',
        name: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        authority: 'Under Bekobod District Hokimiyat',
        description:
          'We are the official investment promotion and management body for Bekobod district, operating under the direct authority of the local administration. Our mandate is to attract qualified investors through transparent processes, provide comprehensive support, and ensure every investment contributes to the sustainable development of our district.',
      },
      director: {
        title: 'Leadership',
        name: 'Nizomiddinov Zaynilobiddin Shahobiddinovich',
        role: 'Bekobod District Governor',
        message:
          'We invite investors from around the world to participate in Bekobod\'s transformation. Through our transparent e-auction system and comprehensive support packages, we ensure every investor receives the strongest possible foundation for success. Bekobod is open for business — and we are here to make your investment journey smooth, transparent, and rewarding.',
      },
      mission: {
        title: 'Our Mission',
        description:
          'To attract qualified investors to participate in e-auctions and win land lease rights, creating a thriving economic ecosystem in Bekobod that benefits investors, local communities, and the national economy of Uzbekistan.',
      },
      vision: {
        title: 'Our Vision',
        description:
          "To position Bekobod as Uzbekistan's premier investment destination by 2030, with a fully developed Special Economic Zone, Free Trade Zone, and modern residential infrastructure supporting thousands of jobs and billions in investment.",
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Transparency',
            description: 'Open and fair processes for every investor',
          },
          {
            title: 'Innovation',
            description: 'Forward-thinking development approaches',
          },
          {
            title: 'Partnership',
            description: 'Long-term relationships with our investors',
          },
          {
            title: 'Excellence',
            description: 'World-class standards in everything we do',
          },
        ],
      },
    },
    sez: {
      title: 'Bekobod Special Economic Zone',
      subtitle: '397 Hectares of Industrial Opportunity',
      badge: 'Launch: October 2026',
      overview: {
        title: 'Zone Overview',
        description:
          'The Bekobod SEZ represents one of Uzbekistan\'s most ambitious industrial development projects. Spanning 397 hectares, this world-class special economic zone offers 95 investment lots across 8 strategic sectors, with total investment potential of $500M and 5,000+ jobs.',
      },
      stats: [
        { label: 'Total Area', value: '397 ha' },
        { label: 'Investment Lots', value: '95' },
        { label: 'Industrial Area', value: '301 ha' },
        { label: 'Road Network', value: '26.5 km' },
        { label: 'Green Zones', value: '45 ha' },
        { label: 'Total Investment', value: '$500M' },
        { label: 'Export Potential', value: '$150M/yr' },
        { label: 'Jobs Created', value: '5000+' },
        { label: 'Launch Date', value: 'Oct 2026' },
      ],
      overviewStats: [
        { label: 'Total Area', value: '397 ha' },
        { label: 'Investment Lots', value: '95' },
        { label: 'Investment', value: '$500M' },
        { label: 'Jobs', value: '5000+' },
      ],
      sectors: {
        title: '8 Strategic Industrial Sectors',
        subtitle: 'Diverse opportunities across key industrial verticals',
        items: [
          {
            name: 'Metallurgy',
            description: 'Steel production, metal fabrication and processing',
          },
          {
            name: 'Pharmaceuticals',
            description: 'Drug manufacturing, medical devices and biotech',
          },
          {
            name: 'Mechanical Engineering',
            description: 'Machinery, equipment and precision manufacturing',
          },
          {
            name: 'Construction Materials',
            description: 'Cement, brick, glass and building materials',
          },
          {
            name: 'Logistics & Warehousing',
            description: 'Distribution centers, cold storage and logistics hubs',
          },
          {
            name: 'Food Industry',
            description: 'Food processing, packaging and agricultural products',
          },
          {
            name: 'Energy',
            description: 'Renewable energy, power generation and distribution',
          },
          {
            name: 'Textiles',
            description: 'Textile manufacturing, garments and fiber processing',
          },
        ],
      },
      technopark: {
        title: 'Bekobod Technopark',
        badge: 'Anchor Investor — Bashkir Company',
        description:
          'The crown jewel within the SEZ, Bekobod Technopark is anchored by a major Bashkir company and represents the zone\'s flagship investment. This 100-hectare technology park will drive innovation and create premium employment opportunities.',
        descriptionSecond: {
          before:
            'Technopark residents enjoy 3–10 year tax and customs exemptions, ready-to-use engineering infrastructure, and direct access to international transit corridors via the Oybek border post on the Uzbekistan–Tajikistan border. Learn more about the technopark and available plots at ',
          linkText: 'tp-bekobod.uz',
          after: '.',
        },
        stats: [
          { label: 'Area', value: '100 ha' },
          { label: 'Lots', value: '23' },
          { label: 'Investment', value: '$200M' },
          { label: 'Jobs', value: '1000+' },
          { label: 'Launch', value: 'Dec 2026' },
        ],
        hectaresLabel: 'hectares',
        areaCaption: 'Technopark Area',
      },
      imageTags: { lots: 'lots', sectors: 'sectors' },
      map: {
        title: 'SEZ Location',
        description:
          'Strategically located in Bekobod district with excellent transport connectivity.',
        button: 'Google Maps', yandexButton: 'Yandex Maps',
      },
    },
    oybek: {
      title: 'Oybek Free Trade Zone',
      subtitle: 'Gateway to Cross-Border Commerce',
      badge: 'Launch: December 2027',
      overview: {
        title: 'Zone Overview',
        description:
          'Located at the Oybek border post on the Uzbekistan-Tajikistan border, the Oybek Free Trade Zone creates a premier commercial hub for international trade. This 34-hectare zone is designed to capture the significant cross-border trade flows between Uzbekistan and Tajikistan.',
      },
      stats: [
        { label: 'Total Area', value: '34 ha' },
        { label: 'Total Investment', value: '$20M' },
        { label: 'Foreign Investment', value: '$5M' },
        { label: 'Jobs Created', value: '200+' },
        { label: 'Launch Date', value: 'Dec 2027' },
      ],
      facilities: {
        title: 'World-Class Facilities',
        subtitle: 'Everything needed for seamless cross-border trade',
        items: [
          {
            name: 'Hotels',
            description: 'Modern accommodation for business travelers and transit guests',
          },
          {
            name: 'Gas Station',
            description: 'Full-service multi-fuel station serving all vehicle types',
          },
          {
            name: 'Car Wash',
            description: 'Professional automated and manual vehicle cleaning services',
          },
          {
            name: 'Auto Service',
            description: 'Comprehensive vehicle maintenance, repair and diagnostics',
          },
          {
            name: 'EV Charging',
            description: 'Modern electric vehicle charging infrastructure for the future',
          },
          {
            name: 'Large Parking',
            description:
              'Extensive secure parking for cars, trucks, trailers and all transport types',
          },
        ],
      },
      location: {
        title: 'Border Gateway Position',
        description:
          'The Oybek border post is the primary land crossing between Uzbekistan and Tajikistan. The Free Trade Zone\'s position here creates a natural commercial hub serving millions of annual border crossings.',
      },
      banner: [
        { label: 'Total Investment', sub: 'Complete project value' },
        { label: 'Foreign Investment', sub: 'International capital target' },
        { label: 'Jobs Created', sub: 'Direct employment' },
      ],
      map: {
        title: 'FTZ Location',
        description: 'Located at the Oybek border post, Uzbekistan-Tajikistan border.',
        button: 'Google Maps', yandexButton: 'Yandex Maps',
      },
    },
    yangi: {
      title: "Yangi Uzbekistan Residential District",
      subtitle: 'A Complete City Within a City',
      badge: 'Launch: 2030',
      overview: {
        title: 'District Overview',
        description:
          "Yangi Uzbekistan (New Uzbekistan) is an ambitious urban masterplan creating a fully self-contained modern city within Bekobod. Spanning 104 hectares, this transformational project features 7,800 apartments alongside comprehensive commercial, educational, healthcare, and recreational infrastructure.",
      },
      stats: [
        { label: 'Total Area', value: '104 ha' },
        { label: 'Investment', value: '11.25T UZS' },
        { label: 'Apartments', value: '7,800' },
        { label: 'Jobs Created', value: '800+' },
        { label: 'Launch Date', value: '2030' },
      ],
      facilities: {
        title: 'Comprehensive Urban Facilities',
        subtitle: 'Every essential service within reach',
        categories: [
          {
            name: 'Residential',
            icon: '🏠',
            items: ['Residential Complexes', 'Business Apartments', 'Hotel'],
          },
          {
            name: 'Commercial',
            icon: '🏢',
            items: ['Business Centers', 'Shopping Malls', 'Gas Stations', 'Auto Service'],
          },
          {
            name: 'Education',
            icon: '🎓',
            items: ['Kindergartens', 'Schools', 'Lyceum', 'College'],
          },
          {
            name: 'Health & Recreation',
            icon: '🌿',
            items: ['Clinic', 'Parks', 'Amphitheaters'],
          },
        ],
      },
      concept: {
        title: 'All-in-One City Concept',
        description:
          "Yangi Uzbekistan is designed on the 15-minute city principle — all essential services, education, healthcare, and recreation are within easy walking distance. This modern urban planning approach ensures residents enjoy the highest quality of life while fostering a vibrant community.",
      },
      minuteCityLabel: '15-Minute City',
      imageTagApartments: '7,800 Apts',
      highlights: [
        {
          title: 'City Within a City',
          description: 'Complete self-sufficient urban ecosystem with every necessary service within walking distance.',
        },
        {
          title: 'Education Hub',
          description: 'Kindergartens through college — a complete education ladder supporting families at every stage.',
        },
        {
          title: 'Green Living',
          description: 'Parks, amphitheaters, and green spaces woven throughout the district for quality of life.',
        },
      ],
      banner: [
        { label: 'Total Investment' },
        { label: 'Apartments' },
        { label: 'Jobs Created' },
        { label: 'Launch Year' },
      ],
      map: {
        title: 'District Location',
        description: 'Located in the heart of Bekobod district.',
        button: 'Google Maps', yandexButton: 'Yandex Maps',
      },
      lots: {
        title: 'Available Investment Lots',
        description:
          'Hover over a plot on the masterplan to see its area, price and availability — then bid directly on the e-auction portal.',
        lotLabel: 'Lot',
        areaLabel: 'Area',
        priceLabel: 'Starting price',
        auctionButton: 'Bid on auction',
        hint: 'Hover a plot for details · click it to open the auction window.',
        status: { pending: 'Pending', available: 'On auction', sold: 'Sold' },
        useLabels: { residential: 'Residential building', commercial: 'Non-residential building' },
      },
    },
    incentives: {
      title: 'Tax Incentives & Investment Benefits',
      subtitle: 'Comprehensive financial advantages for SEZ investors',
      badge: 'Based on Tax Code RUz, Chapter 68, Article 473',
      overview: {
        title: 'Why Our Incentives Matter',
        description:
          "Bekobod SEZ offers one of Uzbekistan's most competitive tax incentive packages, designed to maximize investor returns and accelerate business growth. Combined with presidential decree protections and full administrative support, these benefits make Bekobod the optimal choice for serious investors.",
      },
      corporate: {
        title: 'Profit Tax Exemption',
        subtitle: 'Full exemption from profit tax',
        headers: ['Investment Amount', 'Exemption Period'],
        table: [
          { investment: '$3,000,000 – $5,000,000', period: '3 Years' },
          { investment: '$5,000,000 – $15,000,000', period: '5 Years' },
          { investment: 'Over $15,000,000', period: '10 Years' },
        ],
      },
      land: {
        title: 'Land Tax Exemption',
        subtitle: 'Full exemption from land tax',
        headers: ['Investment Amount', 'Exemption Period'],
        table: [
          { investment: '$300,000 – $3,000,000', period: '3 Years' },
          { investment: '$3,000,000 – $5,000,000', period: '5 Years' },
          { investment: '$5,000,000 – $10,000,000', period: '7 Years' },
          { investment: 'Over $10,000,000', period: '10 Years' },
        ],
      },
      property: {
        title: 'Property Tax Exemption',
        subtitle: 'Same schedule as Land Tax — full property tax exemption',
        note: 'Property tax exemption follows the exact same investment-based schedule as land tax exemption above.',
      },
      water: {
        title: 'Water Resources Tax Exemption',
        subtitle: 'Full exemption from water resources tax',
        note: 'Water resources tax exemption is provided for sustainable resource management in SEZ operations.',
      },
      customs: {
        title: 'Customs Benefits',
        subtitle: 'Comprehensive customs advantages for SEZ residents',
        items: [
          {
            title: 'Duty-Free Imports',
            description: 'Import of technological equipment and construction materials without customs duties under SEZ regime',
          },
          {
            title: 'Tariff Exemptions',
            description: 'Extended exemption periods for import and export of goods produced within the SEZ',
          },
          {
            title: 'Simplified Customs Procedures',
            description: 'Expedited customs clearance for SEZ enterprises with reduced documentation requirements',
          },
        ],
      },
      legal: {
        title: 'Legal Framework',
        subtitle: 'Solid legal basis protecting your investment',
        items: [
          {
            title: 'Tax Code of the Republic of Uzbekistan',
            detail: 'Chapter 68, Article 473',
            description:
              'Provides the statutory basis for all tax exemptions within Special Economic Zones, ensuring long-term legal certainty for investors.',
          },
          {
            title: 'Presidential Decree No. UP-4853',
            detail: 'Dated October 26, 2016',
            description:
              'Establishes the foundational legal framework and additional protections for SEZ investors, backed by the highest executive authority.',
          },
        ],
      },
      additional: {
        title: 'Additional Investment Benefits',
        subtitle: 'Beyond tax incentives — comprehensive investor support',
        items: [
          {
            title: 'Government Support',
            description: 'Direct facilitation and support from district and national authorities',
          },
          {
            title: 'E-Auction Transparency',
            description:
              'Fully transparent electronic auction process ensuring fair competition for all investors',
          },
          {
            title: 'Legal Guarantees',
            description:
              'Long-term legal protections ensuring investment security and business continuity',
          },
          {
            title: 'Infrastructure Access',
            description:
              'Immediate access to roads, utilities, and logistics infrastructure from day one',
          },
          {
            title: 'Administrative Support',
            description:
              'Dedicated support team guiding you through every step of your investment journey',
          },
          {
            title: 'Installment Payments',
            description:
              'Flexible payment options including installment plans to ease capital deployment',
          },
        ],
      },
      keyNumbers: [
        { value: '10 Years', label: 'Maximum Tax Exemption' },
        { value: '3 Types', label: 'Tax Exemptions (Profit + Land + Property)' },
        { value: '2 Laws', label: 'Legal Frameworks' },
      ],
      taxSchedulesTitle: 'Tax Exemption Schedules',
      cta: {
        title: 'Ready to Claim Your Tax Benefits?',
        description: 'Participate in e-auction and start your tax-exempt journey in Bekobod SEZ today.',
        button: 'Participate in E-Auction',
        contact: 'Contact Our Team',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: "We're here to help you invest in Bekobod's future",
      heroBadge: 'Get In Touch',
      messageSent: 'Message Sent!',
      exploreProjects: 'Explore Investment Projects',
      projectCards: [
        { subtitle: '397 ha • $500M • Oct 2026' },
        { subtitle: '34 ha • $20M • Dec 2027' },
        { subtitle: '104 ha • 11.25T UZS • 2030' },
      ],
      director: {
        title: 'Investment Director',
        name: 'Umarov Umid Ahmadjanovich',
        role: 'Director, Bekobod Investment Hub',
        company: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        message: '"We invite investors from around the world to participate in Bekobod\'s transformation. Through our transparent e-auction system and comprehensive support packages, we ensure every investor receives the strongest possible foundation for success."',
      },
      office: {
        title: 'Our Office',
        address: 'Bekobod District Administration Building',
        city: 'Bekobod, Tashkent Region',
        country: 'Republic of Uzbekistan',
      },
      eauction: {
        title: 'E-Auction Portal',
        description:
          'Participate in our transparent electronic auction system to win land lease rights in Bekobod SEZ, Oybek FTZ, and Yangi O\'zbekiston district.',
        button: 'Visit E-Auction Portal',
        website: 'e-auksion.uz',
      },
      form: {
        title: 'Send Us a Message',
        name: 'Your Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        country: 'Country of Origin',
        interest: 'Investment Interest',
        interestOptions: ['Bekobod SEZ', 'Oybek FTZ', "Yangi Uzbekistan", 'General Inquiry'],
        message: 'Your Message',
        submit: 'Send Message',
        success: 'Thank you! Your message has been sent. We will contact you within 24 hours.',
        selectPlaceholder: 'Select...',
        namePlaceholder: 'John Smith',
        countryPlaceholder: 'United States',
        messagePlaceholder: 'Tell us about your investment interests...',
      },
    },
    footer: {
      description:
        'Official investment management company under Bekobod district administration, attracting domestic and foreign capital for sustainable economic development.',
      quickLinks: 'Quick Links',
      projects: 'Investment Projects',
      legal: 'Legal Basis',
      rights: 'All rights reserved.',
      authority: 'Bekobod District Administration',
      legalBasis: 'Tax Code RUz, Ch.68 Art.473 | Presidential Decree UP-4853',
    },
  },

  uz: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Biz haqimizda',
      sez: 'Bekobod MIQZ',
      oybek: 'Oybek ESZ',
      yangi: "Yangi O'zbekiston",
      incentives: 'Imtiyozlar',
      contact: 'Aloqa',
      eAuction: 'Elektron auksion',
    },
    home: {
      hero: {
        badge: 'Rasmiy investitsiya portali',
        tagline: "Bekobodga investitsiya qiling",
        subtitle: "Markaziy Osiyoning eng dinamik investitsiya zonasiga kirish eshiginiz",
        description:
          "Bekobod Investitsiya Boshqaruv Kompaniyasi shaffof elektron auksion jarayonlari, keng qamrovli soliq imtiyozlari va Markaziy Osiyo chorrahasidagi strategik joylashuv orqali jahon darajasidagi investitsiya imkoniyatlarini taklif etadi.",
        ctaButton: 'Elektron auksioniga ishtirok eting',
        learnMore: "Imkoniyatlarni o'rganing",
      },
      stats: {
        title: "Bekobod raqamlarda",
        investment: '$520M+',
        investmentLabel: "Umumiy investitsiya salohiyati",
        jobs: '5 800+',
        jobsLabel: "Yaratilajak ish o'rinlari",
        area: '535 ga',
        areaLabel: "Umumiy rivojlantirish maydoni",
        taxYears: '10 yil',
        taxYearsLabel: "Maksimal soliq imtiyozi",
        taxYearsSuffix: ' yil',
        areaSuffix: ' ga',
      },
      directions: {
        title: "Uchta strategik investitsiya yo'nalishi",
        subtitle: "Bekobodning o'sib kelayotgan iqtisodiyotida o'z investitsiya yo'lingizni tanlang",
        learnMore: "Batafsil",
        sez: {
          title: 'Bekobod MIQZ',
          subtitle: 'Maxsus iqtisodiy zona',
          description:
            "8 ta strategik tarmoq bo'yicha 95 ta investitsiya parsellaridan iborat 397 gektarlik sanoat eri. Bekobodning iqtisodiy o'zgarishining asosi.",
          stats: [
            { value: '$500M', label: 'Investitsiya' },
            { value: '5000+', label: "Ish o'rinlari" },
            { value: 'Okt 2026', label: "Ishga tushish" },
          ],
        },
        oybek: {
          title: 'Oybek ESZ',
          subtitle: 'Erkin savdo zonasi',
          description:
            "O'zbekiston-Tojikiston chegarasida joylashgan bu 34 gektarlik erkin savdo zonasi chegara savdo va logistika uchun asosiy markazga aylanadi.",
          stats: [
            { value: '$20M', label: 'Investitsiya' },
            { value: '200+', label: "Ish o'rinlari" },
            { value: 'Dek 2027', label: "Ishga tushish" },
          ],
        },
        yangi: {
          title: "Yangi O'zbekiston",
          subtitle: "Turar-joy tumani",
          description:
            "Shaharda shahar — 7 800 ta kvartira, maktablar, klinikalar, biznes markazlar va jahon darajasidagi infratuzilmaga ega 104 gektarlik kompleks.",
          stats: [
            { value: '11.25T so\'m', label: 'Investitsiya' },
            { value: '7800', label: 'Kvartira' },
            { value: '2030', label: "Ishga tushish" },
          ],
        },
      },
      why: {
        title: "Nima uchun Bekobodga investitsiya qilish kerak?",
        subtitle: "Ilg'or investorlar uchun strategik ustunliklar",
        reasons: [
          {
            title: 'Strategik joylashuv',
            description:
              "Markaziy Osiyo markazida, O'zbekiston-Tojikiston chegarasiga va asosiy transport yo'nalishlariga to'g'ridan-to'g'ri kirish imkoni mavjud.",
          },
          {
            title: 'Soliq imtiyozlari',
            description:
              "MIQZ rezident kompaniyalariga korporativ, yer va mol-mulk soliqlari bo'yicha 10 yilgacha imtiyozlar.",
          },
          {
            title: "Elektron auksionda shaffoflik",
            description:
              "Yer ijarasi huquqlariga adolatli va raqobatbardosh kirish imkonini ta'minlovchi to'liq shaffof elektron auksion tizimi.",
          },
          {
            title: "Hukumat ko'magi",
            description:
              "UP-4853-sonli Prezident Farmoni va tuman ma'muriyatining to'liq ma'muriy ko'magi.",
          },
          {
            title: 'Tayyor infratuzilma',
            description:
              "MIQZ da kunning birinchi kunidan 26,5 km yo'l, kommunal xizmatlar va logistika infratuzilmasi qurilgan.",
          },
          {
            title: "Huquqiy kafolatlar",
            description:
              "O'zbekiston Soliq kodeksining 68-bobi, 473-moddasi va xalqaro standartlar asosida uzoq muddatli huquqiy himoya.",
          },
        ],
      },
      cta: {
        title: "Bekobodga investitsiya qilishga tayyormisiz?",
        subtitle:
          "Bekobodning iqtisodiy kelajagini qurayotgan dunyoning turli burchaklaridan investorlar qatoriga qo'shiling",
        button: "Investitsiya safari boshlang",
        contact: "Jamoamiz bilan bog'laning",
      },
    },
    about: {
      title: "Bekobod Investitsiya Boshqaruv Kompaniyasi",
      subtitle: "Ertangi iqtisodiy qudratni bugun qurmoqdamiz",
      hero: {
        badge: 'Rasmiy organ',
        description:
          "Bekobod tuman hokimligi qoshida faoliyat yurituvchi rasmiy investitsiyalarni boshqarish kompaniyasi, mamlakat ichki va xorijiy kapitalini jalb etishga bag'ishlangan.",
      },
      company: {
        title: 'Kompaniyamiz haqida',
        name: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        authority: "Bekobod tuman hokimligi qoshida",
        description:
          "Biz Bekobod tumani uchun rasmiy investitsiyalarni rag'batlantirish va boshqarish organimiz bo'lib, mahalliy ma'muriyat tomonidan bevosita boshqariladi. Bizning vazifamiz — malakali investorlarni shaffof jarayonlar orqali jalb etish, keng qamrovli ko'mak ko'rsatish va har bir investitsiyaning tumanimiz, investorlar va milliy iqtisodiyot uchun maksimal foyda keltirishi.",
      },
      director: {
        title: 'Rahbariyat',
        name: 'Nizomiddinov Zaynilobiddin Shahobiddinovich',
        role: "Bekobod tumani hokimi",
        message:
          "Biz dunyo bo'ylab investorlarni Bekobod transformatsiyasida ishtirok etishga taklif qilamiz. Shaffof elektron auktsion tizimimiz va keng qo'llab-quvvatlash paketlarimiz orqali har bir investor uchun eng mustahkam muvaffaqiyat poydevorini ta'minlaymiz.",
      },
      mission: {
        title: 'Bizning missiyamiz',
        description:
          "Malakali investorlarni elektron auksionga jalb etish va yer ijarasi huquqlarini qozonish orqali investorlar, mahalliy jamiyat va O'zbekiston milliy iqtisodiyotiga foyda keltiradigan Bekobod iqtisodiy ekotizimini rivojlantirish.",
      },
      vision: {
        title: 'Bizning tasavvurimiz',
        description:
          "2030 yilga qadar Bekobodni O'zbekistonning eng yetakchi investitsiya markazi sifatida belgilash — minglab ish o'rinlari va milliardlab investitsiyalarni qo'llab-quvvatlovchi to'liq rivojlangan Maxsus iqtisodiy zona, Erkin savdo zonasi va zamonaviy turar-joy infratuzilmasi bilan.",
      },
      values: {
        title: 'Bizning qadriyatlarimiz',
        items: [
          {
            title: 'Shaffoflik',
            description: "Har bir investor uchun ochiq va adolatli jarayonlar",
          },
          {
            title: "Innovatsiya",
            description: "Ilg'or rivojlanish yondashuvlari",
          },
          {
            title: "Hamkorlik",
            description: "Investorlarimiz bilan uzoq muddatli munosabatlar",
          },
          {
            title: "Mukammallik",
            description: "Har bir ishimizda jahon darajasidagi standartlar",
          },
        ],
      },
    },
    sez: {
      title: 'Bekobod Maxsus Iqtisodiy Zonasi',
      subtitle: '397 gektarlik sanoat imkoniyati',
      badge: "Ishga tushishi: 2026 yil oktabr",
      overview: {
        title: 'Zona umumiy tavsifi',
        description:
          "Bekobod MIQZ O'zbekistonning eng yirik sanoat rivojlantirish loyihalaridan birini ifodalaydi. 397 gektarni qamrab olgan bu jahon darajasidagi maxsus iqtisodiy zona 8 ta strategik tarmoq bo'yicha 95 ta investitsiya parsellarini taklif etadi, umumiy investitsiya salohiyati $500M va 5 000+ ish o'rni.",
      },
      stats: [
        { label: "Umumiy maydon", value: '397 ga' },
        { label: "Investitsiya parsellari", value: '95' },
        { label: "Sanoat maydoni", value: '301 ga' },
        { label: "Yo'l tarmog'i", value: '26.5 km' },
        { label: "Yashil zonalar", value: '45 ga' },
        { label: "Umumiy investitsiya", value: '$500M' },
        { label: "Eksport salohiyati", value: '$150M/yil' },
        { label: "Ish o'rinlari", value: '5000+' },
        { label: "Ishga tushishi", value: 'Okt 2026' },
      ],
      overviewStats: [
        { label: "Umumiy maydon", value: '397 ga' },
        { label: "Investitsiya parsellari", value: '95' },
        { label: "Investitsiya", value: '$500M' },
        { label: "Ish o'rinlari", value: '5000+' },
      ],
      sectors: {
        title: "8 ta strategik sanoat tarmog'i",
        subtitle: "Asosiy sanoat yo'nalishlari bo'yicha turli imkoniyatlar",
        items: [
          { name: 'Metallurgiya', description: "Po'lat ishlab chiqarish, metallni qayta ishlash" },
          { name: 'Farmatsevtika', description: "Dori ishlab chiqarish, tibbiy asboblar, biotexnologiya" },
          { name: "Mashinasozlik", description: "Mashinalar, uskunalar va aniq ishlab chiqarish" },
          { name: "Qurilish materiallari", description: "Sement, g'isht, shisha va qurilish materiallari" },
          { name: "Logistika va ombor", description: "Tarqatish markazlari, sovutish xonalari va logistika markazlari" },
          { name: "Oziq-ovqat sanoati", description: "Oziq-ovqat qayta ishlash, qadoqlash va qishloq xo'jaligi mahsulotlari" },
          { name: "Energetika", description: "Qayta tiklanadigan energiya, elektr ishlab chiqarish va tarqatish" },
          { name: "To'qimachilik", description: "To'qimachilik ishlab chiqarish, kiyim-kechak va tolalarni qayta ishlash" },
        ],
      },
      technopark: {
        title: 'Bekobod Texnoparki',
        badge: "Asosiy investor — Boshqirdiston kompaniyasi",
        description:
          "MIQZ doirasidagi toj gavhar, Bekobod Texnoparki yirik Boshqirdiston kompaniyasining asosiy investitsiyasi bo'lib, zonaning flagman loyihasini ifodalaydi. Bu 100 gektarlik texnopark innovatsiyalarni rivojlantiradi va sifatli ish o'rinlari yaratadi.",
        descriptionSecond: {
          before:
            "Texnopark rezidentlari 3 yildan 10 yilgacha soliq va bojxona imtiyozlari, tayyor muhandislik infratuzilmasi va O'zbekiston–Tojikiston chegarasidagi «Oybek» bojxona posti orqali xalqaro transport koridorlariga to'g'ridan-to'g'ri chiqish imkoniyatiga ega. Texnopark va mavjud yer maydonlari haqida batafsil ma'lumot — ",
          linkText: 'tp-bekobod.uz',
          after: ' saytida.',
        },
        stats: [
          { label: "Maydon", value: '100 ga' },
          { label: "Parsel", value: '23' },
          { label: "Investitsiya", value: '$200M' },
          { label: "Ish o'rinlari", value: '1000+' },
          { label: "Ishga tushishi", value: 'Dek 2026' },
        ],
        hectaresLabel: 'gektar',
        areaCaption: 'Texnopark maydoni',
      },
      imageTags: { lots: 'parsel', sectors: 'tarmoq' },
      map: {
        title: "MIQZ joylashuvi",
        description: "Bekobod tumanida strategik jihatdan joylashgan, transport bilan yaxshi bog'langan.",
        button: 'Google Maps', yandexButton: 'Yandex Xaritalari',
      },
    },
    oybek: {
      title: 'Oybek Erkin Savdo Zonasi',
      subtitle: "Chegara savdosiga kirish eshigi",
      badge: "Ishga tushishi: 2027 yil dekabr",
      overview: {
        title: 'Zona umumiy tavsifi',
        description:
          "O'zbekiston-Tojikiston chegarasidagi Oybek chegara postida joylashgan Oybek Erkin Savdo Zonasi xalqaro savdo uchun asosiy tijorat markazini yaratadi. Bu 34 gektarlik zona O'zbekiston va Tojikiston o'rtasidagi muhim chegara savdo oqimlarini jalb etish uchun mo'ljallangan.",
      },
      stats: [
        { label: "Umumiy maydon", value: '34 ga' },
        { label: "Umumiy investitsiya", value: '$20M' },
        { label: "Xorijiy investitsiya", value: '$5M' },
        { label: "Ish o'rinlari", value: '200+' },
        { label: "Ishga tushishi", value: 'Dek 2027' },
      ],
      facilities: {
        title: "Jahon darajasidagi ob'ektlar",
        subtitle: "Chegara savdosi uchun barcha zaruriy xizmatlar",
        items: [
          { name: "Mehmonxonalar", description: "Biznes sayohatchilari va tranzit mehmonlar uchun zamonaviy turar joy" },
          { name: "Yoqilg'i quyish shoxobchasi", description: "Barcha transport turlari uchun to'liq xizmat ko'rsatuvchi stantsiya" },
          { name: "Avtoyuvish", description: "Professional avtomatik va qo'lda transport tozalash xizmatlari" },
          { name: "Avtoservis", description: "Transport vositalarini kompleks texnik xizmat ko'rsatish va ta'mirlash" },
          { name: "Elektromobil zaryadlash", description: "Kelajak uchun zamonaviy elektromobil zaryadlash infratuzilmasi" },
          { name: "Katta avtoturargoh", description: "Avtomobillar, yuk mashinalar, pritseplar va barcha transport turlari uchun keng xavfsiz turargoh" },
        ],
      },
      location: {
        title: "Chegara darvozasi pozitsiyasi",
        description:
          "Oybek chegara posti O'zbekiston va Tojikiston o'rtasidagi asosiy quruqlik o'tiş nuqtasidir. Erkin savdo zonasining bu joyda joylashuvi millionlab yillik chegara o'tishlariga xizmat ko'rsatuvchi tabiiy tijorat markazini yaratadi.",
      },
      banner: [
        { label: 'Umumiy investitsiya', sub: 'Loyihaning umumiy qiymati' },
        { label: 'Xorijiy investitsiya', sub: "Xalqaro kapital maqsadi" },
        { label: "Ish o'rinlari", sub: 'Bevosita bandlik' },
      ],
      map: {
        title: "ESZ joylashuvi",
        description: "Oybek chegara postida joylashgan, O'zbekiston-Tojikiston chegarasi.",
        button: 'Google Maps', yandexButton: 'Yandex Xaritalari',
      },
    },
    yangi: {
      title: "Yangi O'zbekiston Turar-joy Tumani",
      subtitle: "Shaharda shahar",
      badge: "Ishga tushishi: 2030",
      overview: {
        title: "Tuman umumiy tavsifi",
        description:
          "Yangi O'zbekiston — Bekobod shahrida to'liq mustaqil zamonaviy shahar yaratuvchi yirik urbanistik loyiha. 104 gektarni qamrab olgan bu o'zgartiruvchan loyiha 7 800 ta kvartiradan tashqari, tichorat, ta'lim, sog'liqni saqlash va ko'ngilochar infratuzilmani o'z ichiga oladi.",
      },
      stats: [
        { label: "Umumiy maydon", value: '104 ga' },
        { label: "Investitsiya", value: "11,25T so'm" },
        { label: "Kvartiralar", value: '7 800' },
        { label: "Ish o'rinlari", value: '800+' },
        { label: "Ishga tushishi", value: '2030' },
      ],
      facilities: {
        title: "Keng qamrovli shahar ob'ektlari",
        subtitle: "Barcha zaruriy xizmatlar qo'l ostida",
        categories: [
          {
            name: "Turar joy",
            icon: '🏠',
            items: ["Turar-joy majmualari", "Biznes apartamentlar", "Mehmonxona"],
          },
          {
            name: "Tijoriy",
            icon: '🏢',
            items: ["Biznes markazlar", "Savdo markazlari", "Yoqilg'i quyish shoxobchalari", "Avtoservis"],
          },
          {
            name: "Ta'lim",
            icon: '🎓',
            items: ["Bolalar bog'chalari", "Maktablar", "Litsey", "Kollej"],
          },
          {
            name: "Salomatlik va dam olish",
            icon: '🌿',
            items: ["Klinika", "Parklar", "Amfiteatrlar"],
          },
        ],
      },
      concept: {
        title: "'Barchasini bir joyda' kontseptsiyasi",
        description:
          "Yangi O'zbekiston 15 daqiqalik shahar tamoyili asosida loyihalashtirilgan — barcha zaruriy xizmatlar, ta'lim, sog'liqni saqlash va dam olish joylari qulay yurish masofasida. Bu zamonaviy shahar rejalashtirish yondashuvi aholining hayot sifatini ta'minlaydi va jonli jamoa muhitini yaratadi.",
      },
      minuteCityLabel: '15 daqiqalik shahar',
      imageTagApartments: '7 800 kvartira',
      highlights: [
        {
          title: 'Shaharda shahar',
          description: "Barcha zaruriy xizmatlar yurish masofasida bo'lgan to'liq mustaqil shahar ekotizimi.",
        },
        {
          title: "Ta'lim markazi",
          description: "Bog'chadan kollejgacha — oilalarni har bosqichda qo'llab-quvvatlovchi to'liq ta'lim zinapoyasi.",
        },
        {
          title: 'Yashil hayot',
          description: "Tumanbo'ylab yoyilgan parklar, amfiteatrlar va yashil hududlar hayot sifatini ta'minlaydi.",
        },
      ],
      banner: [
        { label: 'Umumiy investitsiya' },
        { label: 'Kvartiralar' },
        { label: "Ish o'rinlari" },
        { label: 'Ishga tushish yili' },
      ],
      map: {
        title: "Tuman joylashuvi",
        description: "Bekobod tuman markazida joylashgan.",
        button: 'Google Maps', yandexButton: 'Yandex Xaritalari',
      },
      lots: {
        title: 'Sotuvdagi investitsiya lotlari',
        description:
          "Bosh rejadagi uchastka ustiga kursorni olib boring — maydoni, narxi va holatini ko'rasiz, so'ng elektron auksionda to'g'ridan-to'g'ri ishtirok eting.",
        lotLabel: 'Lot',
        areaLabel: 'Maydoni',
        priceLabel: "Boshlang'ich narx",
        auctionButton: 'Auksionga',
        hint: "Kursorni olib boring — lot tafsilotlari, bosing — auksion oynasi ochiladi.",
        status: { pending: 'Kutilmoqda', available: 'Auksionda', sold: 'Sotilgan' },
        useLabels: { residential: 'Turar joy binosi', commercial: 'Noturar bino' },
      },
    },
    incentives: {
      title: "Soliq imtiyozlari va investitsiya afzalliklari",
      subtitle: "MIQZ investorlari uchun keng qamrovli moliyaviy ustunliklar",
      badge: "O'zbekiston Respublikasi Soliq kodeksi, 68-bob, 473-modda asosida",
      overview: {
        title: "Imtiyozlarimiz nima uchun muhim?",
        description:
          "Bekobod MIQZ investor daromadlarini maksimallashtirish va biznes o'sishini tezlashtirish uchun mo'ljallangan O'zbekistonning eng raqobatbardosh soliq imtiyozlari paketlaridan birini taklif etadi.",
      },
      corporate: {
        title: "Foyda solig'i imtiyozi",
        subtitle: "Foyda solig'idan to'liq ozod etish",
        headers: ["Investitsiya miqdori", "Imtiyoz muddati"],
        table: [
          { investment: "$3 000 000 – $5 000 000", period: "3 yil" },
          { investment: "$5 000 000 – $15 000 000", period: "5 yil" },
          { investment: "$15 000 000 dan ortiq", period: "10 yil" },
        ],
      },
      land: {
        title: "Yer solig'i imtiyozi",
        subtitle: "Yer solig'idan to'liq ozod etish",
        headers: ["Investitsiya miqdori", "Imtiyoz muddati"],
        table: [
          { investment: "$300 000 – $3 000 000", period: "3 yil" },
          { investment: "$3 000 000 – $5 000 000", period: "5 yil" },
          { investment: "$5 000 000 – $10 000 000", period: "7 yil" },
          { investment: "$10 000 000 dan ortiq", period: "10 yil" },
        ],
      },
      property: {
        title: "Mol-mulk solig'i imtiyozi",
        subtitle: "Yer solig'i bilan bir xil jadval — mol-mulk solig'idan to'liq ozod etish",
        note: "Mol-mulk solig'i imtiyozi yuqoridagi yer solig'i imtiyozi bilan bir xil jadval bo'yicha taqdim etiladi.",
      },
      water: {
        title: "Suv resurslari solig'i imtiyozi",
        subtitle: "Suv resurslari solig'idan to'liq ozod etish",
        note: "Suv resurslari solig'i imtiyozi MIQZ operatsiyasida barqaror resurslardan foydalanish uchun taqdim etiladi.",
      },
      customs: {
        title: "Bojxona imtiyozlari",
        subtitle: "MIQZ rezidentlari uchun keng qamrovli bojxona afzalliklari",
        items: [
          {
            title: "Bekorsimon import",
            description: "Texnologik uskunalar va qurilish materiallarini MIQZ rejimi asosida bojxona to'lovlari bilan import qilish",
          },
          {
            title: "Tariff imtiyozlari",
            description: "MIQZ ichida ishlab chiqarilgan tovarlarning import va eksportiga kengaytirilgan imtiyoz davrlari",
          },
          {
            title: "Soddalashtirilgan bojxona operatsiyalari",
            description: "MIQZ korxonalari uchun hujjat talablarini kamaytirgan vositali bojxona rahbarligi",
          },
        ],
      },
      legal: {
        title: "Huquqiy asos",
        subtitle: "Investitsiyangizni himoya qiluvchi mustahkam huquqiy asos",
        items: [
          {
            title: "O'zbekiston Respublikasi Soliq kodeksi",
            detail: "68-bob, 473-modda",
            description:
              "Maxsus iqtisodiy zonalardagi barcha soliq imtiyozlarining qonuniy asosini ta'minlaydi, investorlar uchun uzoq muddatli huquqiy barqarorlikni kafolatlaydi.",
          },
          {
            title: "UP-4853-sonli Prezident Farmoni",
            detail: "2016 yil 26 oktyabr",
            description:
              "MIQZ investorlari uchun asosiy huquqiy doira va qo'shimcha himoyani belgilaydi, eng yuqori ijroiya hokimiyati tomonidan qo'llab-quvvatlanadi.",
          },
        ],
      },
      additional: {
        title: "Qo'shimcha investitsiya imtiyozlari",
        subtitle: "Soliq imtiyozlaridan tashqari — keng qamrovli investor ko'magi",
        items: [
          {
            title: "Hukumat ko'magi",
            description: "Tuman va milliy hokimiyatlar tomonidan bevosita ko'maklashish va qo'llab-quvvatlash",
          },
          {
            title: "Elektron auksionda shaffoflik",
            description: "Barcha investorlar uchun adolatli raqobatni ta'minlovchi to'liq shaffof elektron auksion jarayoni",
          },
          {
            title: "Huquqiy kafolatlar",
            description: "Investitsiya xavfsizligi va biznes uzluksizligini ta'minlovchi uzoq muddatli huquqiy himoya",
          },
          {
            title: "Infratuzilmaga kirish",
            description: "Birinchi kundan boshlab yo'llar, kommunal xizmatlar va logistika infratuzilmasiga bevosita kirish",
          },
          {
            title: "Ma'muriy ko'mak",
            description: "Investitsiya safaringizning har bir bosqichida yo'naltiruvchi maxsus qo'llab-quvvatlash guruhi",
          },
          {
            title: "Bo'lib to'lash imkoniyati",
            description: "Kapitalning joylashtirilishini osonlashtiradigan bo'lib to'lash rejalari ham mavjud",
          },
        ],
      },
      keyNumbers: [
        { value: '10 yil', label: 'Maksimal soliq imtiyozi' },
        { value: '3 tur', label: 'Soliq imtiyozlari (Foyda + Yer + Mol-mulk)' },
        { value: '2 qonun', label: "Huquqiy asoslar" },
      ],
      taxSchedulesTitle: 'Soliq imtiyozi jadvallari',
      cta: {
        title: "Soliq imtiyozlaringizni olishga tayyormisiz?",
        description: "Elektron auksionida ishtirok eting va Bekobod MIQZda soliqdan ozod bo'lgan safaringizni boshlang.",
        button: 'Elektron auksioniga ishtirok eting',
        contact: "Jamoamiz bilan bog'laning",
      },
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle: "Bekobodning kelajagiga investitsiya qilishda sizga yordam berishga tayyormiz",
      heroBadge: "Biz bilan bog'laning",
      messageSent: 'Xabar yuborildi!',
      exploreProjects: "Investitsiya loyihalarini o'rganing",
      projectCards: [
        { subtitle: '397 ga • $500M • Okt 2026' },
        { subtitle: '34 ga • $20M • Dek 2027' },
        { subtitle: "104 ga • 11,25T so'm • 2030" },
      ],
      director: {
        title: "Investitsiya direktori",
        name: 'Umarov Umid Ahmadjanovich',
        role: "Bekobod Investitsiya Boshqaruv Kompaniyasi direktori",
        company: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        message: '"Biz dunyo bo\'ylab investorlarni Bekobod transformatsiyasida ishtirok etishga taklif qilamiz. Shaffof elektron auktsion tizimimiz va keng qo\'llab-quvvatlash paketlarimiz orqali har bir investor uchun eng mustahkam muvaffaqiyat poydevorini ta\'minlaymiz."',
      },
      office: {
        title: "Bizning ofisimiz",
        address: "Bekobod tuman hokimligi binosi",
        city: "Bekobod, Toshkent viloyati",
        country: "O'zbekiston Respublikasi",
      },
      eauction: {
        title: "Elektron auksion portali",
        description:
          "Bekobod MIQZ, Oybek ESZ va Yangi O'zbekiston tumanidagi yer ijarasi huquqlarini qozonish uchun shaffof elektron auksion tizimida ishtirok eting.",
        button: "Elektron auksion portaliga o'ting",
        website: 'e-auksion.uz',
      },
      form: {
        title: "Bizga xabar yuboring",
        name: "To'liq ismingiz",
        email: "Elektron pochta manzili",
        phone: "Telefon raqami",
        country: "Mamlakatinigiz",
        interest: "Investitsiya qiziqishi",
        interestOptions: ["Bekobod MIQZ", "Oybek ESZ", "Yangi O'zbekiston", "Umumiy so'rov"],
        message: "Xabaringiz",
        submit: "Xabar yuborish",
        success: "Rahmat! Xabaringiz yuborildi. Biz 24 soat ichida siz bilan bog'lanamiz.",
        selectPlaceholder: 'Tanlang...',
        namePlaceholder: 'Ismingiz',
        countryPlaceholder: 'Davlat',
        messagePlaceholder: "Investitsiya qiziqishlaringiz haqida bizga yozing...",
      },
    },
    footer: {
      description:
        "Bekobod tuman hokimligi qoshidagi rasmiy investitsiyalarni boshqarish kompaniyasi, barqaror iqtisodiy rivojlanish uchun ichki va xorijiy kapital jalb etadi.",
      quickLinks: "Tezkor havolalar",
      projects: "Investitsiya loyihalari",
      legal: "Huquqiy asos",
      rights: "Barcha huquqlar himoyalangan.",
      authority: 'Bekobod tumani hokimligi',
      legalBasis: "O'zR SK, 68-bob 473-modda | Prezident Farmoni UP-4853",
    },
  },

  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      sez: 'СЭЗ Бекобод',
      oybek: 'СТЗ Ойбек',
      yangi: 'Янги Узбекистан',
      incentives: 'Льготы',
      contact: 'Контакты',
      eAuction: 'Электронный аукцион',
    },
    home: {
      hero: {
        badge: 'Официальный инвестиционный портал',
        tagline: 'Инвестируйте в Бекобод',
        subtitle: 'Ваши ворота в самую динамичную инвестиционную зону Центральной Азии',
        description:
          'Инвестиционный хаб Бекобод предлагает инвестиционные возможности мирового класса через прозрачные электронные аукционы, комплексные налоговые льготы и стратегическое расположение на перекрёстке Центральной Азии.',
        ctaButton: 'Участвовать в электронном аукционе',
        learnMore: 'Изучить возможности',
      },
      stats: {
        title: 'Бекобод в цифрах',
        investment: '$520M+',
        investmentLabel: 'Общий инвестиционный потенциал',
        jobs: '5 800+',
        jobsLabel: 'Рабочих мест будет создано',
        area: '535 га',
        areaLabel: 'Общая площадь застройки',
        taxYears: '10 лет',
        taxYearsLabel: 'Максимальная налоговая льгота',
        taxYearsSuffix: ' лет',
        areaSuffix: ' га',
      },
      directions: {
        title: 'Три стратегических инвестиционных направления',
        subtitle: 'Выберите свой путь в растущей экономике Бекобода',
        learnMore: 'Подробнее',
        sez: {
          title: 'СЭЗ Бекобод',
          subtitle: 'Специальная экономическая зона',
          description:
            '397 гектаров первоклассных промышленных земель с 95 инвестиционными лотами по 8 стратегическим отраслям. Краеугольный камень экономической трансформации Бекобода.',
          stats: [
            { value: '$500M', label: 'Инвестиции' },
            { value: '5000+', label: 'Рабочих мест' },
            { value: 'Окт 2026', label: 'Запуск' },
          ],
        },
        oybek: {
          title: 'СТЗ Ойбек',
          subtitle: 'Свободная торговая зона',
          description:
            'Расположенная на границе Узбекистана с Таджикистаном, эта зона свободной торговли площадью 34 га создаёт главный центр приграничной торговли и логистики.',
          stats: [
            { value: '$20M', label: 'Инвестиции' },
            { value: '200+', label: 'Рабочих мест' },
            { value: 'Дек 2027', label: 'Запуск' },
          ],
        },
        yangi: {
          title: 'Янги Узбекистан',
          subtitle: 'Жилой район',
          description:
            'Полноценный город в городе — 104 га с 7 800 квартирами, школами, клиниками, бизнес-центрами и инфраструктурой мирового класса.',
          stats: [
            { value: '11.25T сум', label: 'Инвестиции' },
            { value: '7800', label: 'Квартир' },
            { value: '2030', label: 'Запуск' },
          ],
        },
      },
      why: {
        title: 'Почему инвестировать в Бекобод?',
        subtitle: 'Стратегические преимущества для дальновидных инвесторов',
        reasons: [
          {
            title: 'Стратегическое расположение',
            description:
              'В сердце Центральной Азии с прямым выходом к границе Узбекистана-Таджикистана и основным транспортным коридорам.',
          },
          {
            title: 'Налоговые льготы',
            description:
              'До 10 лет освобождения от корпоративного налога, земельного налога и налога на имущество для резидентов СЭЗ.',
          },
          {
            title: 'Прозрачный электронный аукцион',
            description:
              'Полностью прозрачная система электронных аукционов для справедливого и конкурентного доступа к правам аренды земли.',
          },
          {
            title: 'Государственная поддержка',
            description:
              'Прямая поддержка Указа Президента № УП-4853 и полная административная поддержка районных властей.',
          },
          {
            title: 'Готовая инфраструктура',
            description:
              '26,5 км дорог, коммунальных услуг и логистической инфраструктуры в СЭЗ с первого дня.',
          },
          {
            title: 'Правовые гарантии',
            description:
              'Долгосрочная правовая защита по Налоговому кодексу РУз Глава 68, Статья 473 с международными стандартами.',
          },
        ],
      },
      cta: {
        title: 'Готовы инвестировать в Бекобод?',
        subtitle: 'Присоединяйтесь к инвесторам со всего мира, строящим экономическое будущее Бекобода',
        button: 'Начните инвестиционный путь',
        contact: 'Связаться с нашей командой',
      },
    },
    about: {
      title: 'Инвестиционный хаб Бекобод',
      subtitle: 'Строим экономическую мощь завтрашнего дня сегодня',
      hero: {
        badge: 'Официальный орган',
        description:
          'Официальная компания по управлению инвестициями, действующая под хокимиятом Бекободского района, посвящённая привлечению отечественного и иностранного капитала.',
      },
      company: {
        title: 'О нашей компании',
        name: 'Бекобод Инвестиция Бошкарув Компания',
        authority: 'При хокимияте Бекободского района',
        description:
          'Мы являемся официальным органом по содействию инвестициям и управлению ими для Бекободского района, действующим под непосредственным руководством местной администрации. Наш мандат — привлекать квалифицированных инвесторов через прозрачные процессы, оказывать всестороннюю поддержку и обеспечивать максимальную пользу каждой инвестиции.',
      },
      director: {
        title: 'Руководство',
        name: 'Низомиддинов Зайнилобиддин Шахобиддинович',
        role: 'Хоким района Бекобод',
        message:
          'Мы приглашаем инвесторов со всего мира принять участие в преобразовании Бекобода. Благодаря нашей прозрачной системе электронных аукционов и комплексным пакетам поддержки, мы обеспечиваем каждому инвестору максимально прочную основу для успеха.',
      },
      mission: {
        title: 'Наша миссия',
        description:
          'Привлекать квалифицированных инвесторов к участию в электронных аукционах и получению прав аренды земли, создавая процветающую экономическую экосистему в Бекободе, приносящую пользу инвесторам, местным сообществам и национальной экономике Узбекистана.',
      },
      vision: {
        title: 'Наше видение',
        description:
          'Позиционировать Бекобод как ведущее инвестиционное направление Узбекистана к 2030 году, с полностью развитой Специальной экономической зоной, Зоной свободной торговли и современной жилой инфраструктурой, поддерживающей тысячи рабочих мест и миллиарды инвестиций.',
      },
      values: {
        title: 'Наши ценности',
        items: [
          {
            title: 'Прозрачность',
            description: 'Открытые и справедливые процессы для каждого инвестора',
          },
          {
            title: 'Инновации',
            description: 'Прогрессивные подходы к развитию',
          },
          {
            title: 'Партнёрство',
            description: 'Долгосрочные отношения с нашими инвесторами',
          },
          {
            title: 'Превосходство',
            description: 'Стандарты мирового класса во всём, что мы делаем',
          },
        ],
      },
    },
    sez: {
      title: 'Специальная экономическая зона Бекобод',
      subtitle: '397 гектаров промышленных возможностей',
      badge: 'Запуск: октябрь 2026',
      overview: {
        title: 'Обзор зоны',
        description:
          'СЭЗ Бекобод представляет один из самых амбициозных промышленных проектов развития Узбекистана. Охватывая 397 гектаров, эта СЭЗ мирового класса предлагает 95 инвестиционных лотов по 8 стратегическим отраслям с общим инвестиционным потенциалом $500M и 5 000+ рабочих мест.',
      },
      stats: [
        { label: 'Общая площадь', value: '397 га' },
        { label: 'Инвестиционных лотов', value: '95' },
        { label: 'Промышленная зона', value: '301 га' },
        { label: 'Дорожная сеть', value: '26,5 км' },
        { label: 'Зелёные зоны', value: '45 га' },
        { label: 'Общие инвестиции', value: '$500M' },
        { label: 'Экспортный потенциал', value: '$150M/год' },
        { label: 'Рабочих мест', value: '5000+' },
        { label: 'Дата запуска', value: 'Окт 2026' },
      ],
      overviewStats: [
        { label: 'Общая площадь', value: '397 га' },
        { label: 'Инвестиционных лотов', value: '95' },
        { label: 'Инвестиции', value: '$500M' },
        { label: 'Рабочих мест', value: '5000+' },
      ],
      sectors: {
        title: '8 стратегических промышленных отраслей',
        subtitle: 'Разнообразные возможности по ключевым промышленным направлениям',
        items: [
          { name: 'Металлургия', description: 'Производство стали, металлообработка и переработка' },
          { name: 'Фармацевтика', description: 'Производство лекарств, медицинские устройства и биотех' },
          { name: 'Машиностроение', description: 'Машины, оборудование и точное производство' },
          { name: 'Стройматериалы', description: 'Цемент, кирпич, стекло и строительные материалы' },
          { name: 'Логистика и склады', description: 'Распределительные центры, холодильные склады и логистические хабы' },
          { name: 'Пищевая промышленность', description: 'Переработка продуктов, упаковка и сельхозпродукция' },
          { name: 'Энергетика', description: 'Возобновляемая энергия, выработка и распределение электроэнергии' },
          { name: 'Текстиль', description: 'Текстильное производство, одежда и переработка волокна' },
        ],
      },
      technopark: {
        title: 'Технопарк Бекобод',
        badge: 'Якорный инвестор — Башкирская компания',
        description:
          'Жемчужина в короне СЭЗ, Технопарк Бекобод является якорной инвестицией крупной башкирской компании и представляет флагманскую инвестицию зоны. Этот технопарк площадью 100 га будет стимулировать инновации и создавать качественные рабочие места.',
        descriptionSecond: {
          before:
            'Резиденты технопарка получают налоговые и таможенные льготы сроком от 3 до 10 лет, готовую инженерную инфраструктуру и прямой выход на международные транспортные коридоры через пограничный пост «Ойбек» на границе Узбекистана и Таджикистана. Подробнее о технопарке и доступных площадках — на сайте ',
          linkText: 'tp-bekobod.uz',
          after: '.',
        },
        stats: [
          { label: 'Площадь', value: '100 га' },
          { label: 'Лотов', value: '23' },
          { label: 'Инвестиции', value: '$200M' },
          { label: 'Рабочих мест', value: '1000+' },
          { label: 'Запуск', value: 'Дек 2026' },
        ],
        hectaresLabel: 'гектаров',
        areaCaption: 'Площадь технопарка',
      },
      imageTags: { lots: 'лотов', sectors: 'секторов' },
      map: {
        title: 'Расположение СЭЗ',
        description: 'Стратегически расположена в Бекободском районе с отличной транспортной связью.',
        button: 'Google Maps', yandexButton: 'Яндекс Карты',
      },
    },
    oybek: {
      title: 'Свободная торговая зона Ойбек',
      subtitle: 'Ворота в приграничную торговлю',
      badge: 'Запуск: декабрь 2027',
      overview: {
        title: 'Обзор зоны',
        description:
          'Расположенная на пограничном посту Ойбек на границе Узбекистана с Таджикистаном, СТЗ Ойбек создаёт главный торговый центр для международной торговли. Эта зона площадью 34 га предназначена для освоения значительных потоков приграничной торговли между Узбекистаном и Таджикистаном.',
      },
      stats: [
        { label: 'Общая площадь', value: '34 га' },
        { label: 'Общие инвестиции', value: '$20M' },
        { label: 'Иностранные инвестиции', value: '$5M' },
        { label: 'Рабочих мест', value: '200+' },
        { label: 'Дата запуска', value: 'Дек 2027' },
      ],
      facilities: {
        title: 'Объекты мирового класса',
        subtitle: 'Всё необходимое для беспрепятственной приграничной торговли',
        items: [
          { name: 'Отели', description: 'Современное размещение для деловых путешественников и транзитных гостей' },
          { name: 'АЗС', description: 'Многотопливная заправочная станция полного обслуживания для всех типов транспорта' },
          { name: 'Автомойка', description: 'Профессиональная автоматическая и ручная мойка транспортных средств' },
          { name: 'Автосервис', description: 'Комплексное техобслуживание, ремонт и диагностика транспортных средств' },
          { name: 'Зарядка для EV', description: 'Современная инфраструктура зарядки электромобилей для будущего' },
          { name: 'Большая парковка', description: 'Обширная охраняемая парковка для автомобилей, грузовиков, прицепов и всех типов транспорта' },
        ],
      },
      location: {
        title: 'Позиция пограничного шлюза',
        description:
          'Пограничный пост Ойбек является основным наземным переходом между Узбекистаном и Таджикистаном. Расположение СТЗ здесь создаёт естественный торговый центр, обслуживающий миллионы ежегодных пограничных переходов.',
      },
      banner: [
        { label: 'Общие инвестиции', sub: 'Общая стоимость проекта' },
        { label: 'Иностранные инвестиции', sub: 'Целевой международный капитал' },
        { label: 'Создано рабочих мест', sub: 'Прямая занятость' },
      ],
      map: {
        title: 'Расположение СТЗ',
        description: 'На пограничном посту Ойбек, граница Узбекистана-Таджикистана.',
        button: 'Google Maps', yandexButton: 'Яндекс Карты',
      },
    },
    yangi: {
      title: 'Жилой район Янги Узбекистан',
      subtitle: 'Полноценный город в городе',
      badge: 'Запуск: 2030',
      overview: {
        title: 'Обзор района',
        description:
          'Янги Узбекистан (Новый Узбекистан) — амбициозный градостроительный проект, создающий полностью самодостаточный современный город в Бекободе. На площади 104 га этот трансформационный проект предусматривает 7 800 квартир наряду с комплексной коммерческой, образовательной, медицинской и рекреационной инфраструктурой.',
      },
      stats: [
        { label: 'Общая площадь', value: '104 га' },
        { label: 'Инвестиции', value: '11,25T сум' },
        { label: 'Квартир', value: '7 800' },
        { label: 'Рабочих мест', value: '800+' },
        { label: 'Дата запуска', value: '2030' },
      ],
      facilities: {
        title: 'Комплексная городская инфраструктура',
        subtitle: 'Все необходимые услуги в шаговой доступности',
        categories: [
          {
            name: 'Жилая',
            icon: '🏠',
            items: ['Жилые комплексы', 'Бизнес-апартаменты', 'Отель'],
          },
          {
            name: 'Коммерческая',
            icon: '🏢',
            items: ['Бизнес-центры', 'Торговые центры', 'АЗС', 'Автосервис'],
          },
          {
            name: 'Образование',
            icon: '🎓',
            items: ['Детские сады', 'Школы', 'Лицей', 'Колледж'],
          },
          {
            name: 'Здоровье и отдых',
            icon: '🌿',
            items: ['Клиника', 'Парки', 'Амфитеатры'],
          },
        ],
      },
      concept: {
        title: 'Концепция «Всё в одном месте»',
        description:
          'Янги Узбекистан спроектирован по принципу 15-минутного города — все необходимые услуги, образование, здравоохранение и отдых находятся в пешей доступности. Этот современный подход к городскому планированию обеспечивает жителям высочайшее качество жизни и формирует живое сообщество.',
      },
      minuteCityLabel: '15-минутный город',
      imageTagApartments: '7 800 квартир',
      highlights: [
        {
          title: 'Город в городе',
          description: 'Полностью самодостаточная городская экосистема с каждым необходимым сервисом в пешей доступности.',
        },
        {
          title: 'Образовательный центр',
          description: 'От детских садов до колледжей — полная образовательная лестница для семей на каждом этапе.',
        },
        {
          title: 'Экологичная жизнь',
          description: 'Парки, амфитеатры и зелёные пространства, вплетённые в ткань района для качественной жизни.',
        },
      ],
      banner: [
        { label: 'Общие инвестиции' },
        { label: 'Квартир' },
        { label: 'Создано рабочих мест' },
        { label: 'Год запуска' },
      ],
      map: {
        title: 'Расположение района',
        description: 'В центре Бекободского района.',
        button: 'Google Maps', yandexButton: 'Яндекс Карты',
      },
      lots: {
        title: 'Инвестиционные лоты в продаже',
        description:
          'Наведите курсор на участок генплана — увидите площадь, цену и статус, и сразу подайте заявку на электронном аукционе.',
        lotLabel: 'Лот',
        areaLabel: 'Площадь',
        priceLabel: 'Стартовая цена',
        auctionButton: 'На аукцион',
        hint: 'Наведите на участок — детали лота, нажмите — откроется окно с переходом на аукцион.',
        status: { pending: 'В ожидании', available: 'На аукционе', sold: 'Продан' },
        useLabels: { residential: 'Жилое здание', commercial: 'Нежилое здание' },
      },
    },
    incentives: {
      title: 'Льготы и инвестиционные преимущества',
      subtitle: 'Комплексные финансовые преимущества для инвесторов СЭЗ',
      badge: 'На основании НК РУз Глава 68, Статья 473',
      overview: {
        title: 'Почему наши льготы важны?',
        description:
          'СЭЗ Бекобод предлагает один из самых конкурентоспособных пакетов налоговых льгот Узбекистана, призванных максимизировать доходность инвесторов и ускорить рост бизнеса.',
      },
      corporate: {
        title: 'Освобождение от налога на прибыль',
        subtitle: 'Полное освобождение от налога на прибыль',
        headers: ['Сумма инвестиций', 'Период льготы'],
        table: [
          { investment: '$3 000 000 – $5 000 000', period: '3 года' },
          { investment: '$5 000 000 – $15 000 000', period: '5 лет' },
          { investment: 'Свыше $15 000 000', period: '10 лет' },
        ],
      },
      land: {
        title: 'Освобождение от земельного налога',
        subtitle: 'Полное освобождение от земельного налога',
        headers: ['Сумма инвестиций', 'Период льготы'],
        table: [
          { investment: '$300 000 – $3 000 000', period: '3 года' },
          { investment: '$3 000 000 – $5 000 000', period: '5 лет' },
          { investment: '$5 000 000 – $10 000 000', period: '7 лет' },
          { investment: 'Свыше $10 000 000', period: '10 лет' },
        ],
      },
      property: {
        title: 'Освобождение от налога на имущество',
        subtitle: 'Тот же график, что и земельный налог — полное освобождение',
        note: 'Льгота по налогу на имущество предоставляется по той же шкале в зависимости от объёма инвестиций, что и льгота по земельному налогу.',
      },
      water: {
        title: 'Льгота по налогу на водные ресурсы',
        subtitle: 'Полное освобождение от налога на водные ресурсы',
        note: 'Льгота по налогу на водные ресурсы предоставляется для обеспечения устойчивого использования ресурсов в операциях СЭЗ.',
      },
      customs: {
        title: 'Таможенные льготы',
        subtitle: 'Комплексные таможенные преимущества для резидентов СЭЗ',
        items: [
          {
            title: 'Беспошлинный импорт',
            description: 'Ввоз технологического оборудования и строительных материалов без уплаты таможенных пошлин в соответствии с режимом СЭЗ',
          },
          {
            title: 'Тарифные льготы',
            description: 'Расширенные периоды льгот на импорт и экспорт товаров, производимых внутри СЭЗ',
          },
          {
            title: 'Упрощённые таможенные процедуры',
            description: 'Ускоренное таможенное оформление для предприятий СЭЗ с сокращёнными требованиями к документации',
          },
        ],
      },
      legal: {
        title: 'Правовая база',
        subtitle: 'Прочная правовая основа для защиты ваших инвестиций',
        items: [
          {
            title: 'Налоговый кодекс Республики Узбекистан',
            detail: 'Глава 68, Статья 473',
            description:
              'Устанавливает законодательную основу для всех налоговых льгот в рамках Специальных экономических зон, обеспечивая долгосрочную правовую определённость для инвесторов.',
          },
          {
            title: 'Указ Президента № УП-4853',
            detail: 'От 26 октября 2016 года',
            description:
              'Устанавливает основополагающую правовую базу и дополнительную защиту для инвесторов СЭЗ, подкреплённую высшей исполнительной властью.',
          },
        ],
      },
      additional: {
        title: 'Дополнительные инвестиционные преимущества',
        subtitle: 'За рамками налоговых льгот — всесторонняя поддержка инвестора',
        items: [
          {
            title: 'Государственная поддержка',
            description: 'Прямое содействие и поддержка со стороны районных и национальных властей',
          },
          {
            title: 'Прозрачный электронный аукцион',
            description: 'Полностью прозрачный процесс электронного аукциона, обеспечивающий честную конкуренцию для всех инвесторов',
          },
          {
            title: 'Правовые гарантии',
            description: 'Долгосрочная правовая защита, обеспечивающая безопасность инвестиций и непрерывность бизнеса',
          },
          {
            title: 'Доступ к инфраструктуре',
            description: 'Немедленный доступ к дорогам, коммунальным услугам и логистической инфраструктуре с первого дня',
          },
          {
            title: 'Административная поддержка',
            description: 'Специальная команда поддержки, сопровождающая вас на каждом этапе инвестиционного пути',
          },
          {
            title: 'Рассрочка платежей',
            description: 'Гибкие варианты оплаты, включая планы рассрочки для облегчения размещения капитала',
          },
        ],
      },
      keyNumbers: [
        { value: '10 лет', label: 'Максимальная налоговая льгота' },
        { value: '3 вида', label: 'Налоговые льготы (На прибыль + Земельный + Имущественный)' },
        { value: '2 закона', label: 'Правовые основы' },
      ],
      taxSchedulesTitle: 'Графики налоговых льгот',
      cta: {
        title: 'Готовы воспользоваться налоговыми льготами?',
        description: 'Участвуйте в электронном аукционе и начните налогово-льготный путь в СЭЗ Бекобод сегодня.',
        button: 'Участвовать в электронном аукционе',
        contact: 'Связаться с нашей командой',
      },
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Мы здесь, чтобы помочь вам инвестировать в будущее Бекобода',
      heroBadge: 'Свяжитесь с нами',
      messageSent: 'Сообщение отправлено!',
      exploreProjects: 'Изучить инвестиционные проекты',
      projectCards: [
        { subtitle: '397 га • $500M • Окт 2026' },
        { subtitle: '34 га • $20M • Дек 2027' },
        { subtitle: '104 га • 11,25T сум • 2030' },
      ],
      director: {
        title: 'Инвестиционный директор',
        name: 'Умаров Умид Ахмаджанович',
        role: 'Директор, Инвестиционный хаб Бекобод',
        company: 'Бекобод Инвестиция Бошкарув Компания',
        message: '"Мы приглашаем инвесторов со всего мира принять участие в преобразовании Бекобода. Благодаря нашей прозрачной системе электронных аукционов и комплексным пакетам поддержки, мы обеспечиваем каждому инвестору максимально прочную основу для успеха."',
      },
      office: {
        title: 'Наш офис',
        address: 'Здание хокимията Бекободского района',
        city: 'Бекобод, Ташкентская область',
        country: 'Республика Узбекистан',
      },
      eauction: {
        title: 'Портал электронного аукциона',
        description:
          'Участвуйте в нашей прозрачной системе электронных аукционов для получения прав аренды земли в СЭЗ Бекобод, СТЗ Ойбек и районе Янги Узбекистан.',
        button: 'Перейти на портал электронного аукциона',
        website: 'e-auksion.uz',
      },
      form: {
        title: 'Отправьте нам сообщение',
        name: 'Ваше полное имя',
        email: 'Адрес электронной почты',
        phone: 'Номер телефона',
        country: 'Страна',
        interest: 'Инвестиционный интерес',
        interestOptions: ['СЭЗ Бекобод', 'СТЗ Ойбек', 'Янги Узбекистан', 'Общий запрос'],
        message: 'Ваше сообщение',
        submit: 'Отправить сообщение',
        success: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в течение 24 часов.',
        selectPlaceholder: 'Выберите...',
        namePlaceholder: 'Ваше имя',
        countryPlaceholder: 'Страна',
        messagePlaceholder: 'Расскажите нам о ваших инвестиционных интересах...',
      },
    },
    footer: {
      description:
        'Официальная компания по управлению инвестициями при хокимияте Бекободского района, привлекающая отечественный и иностранный капитал для устойчивого экономического развития.',
      quickLinks: 'Быстрые ссылки',
      projects: 'Инвестиционные проекты',
      legal: 'Правовая база',
      rights: 'Все права защищены.',
      authority: 'Хокимият Бекободского района',
      legalBasis: 'НК РУз, Гл.68 Ст.473 | Указ Президента УП-4853',
    },
  },

  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      sez: '别科博德经济特区',
      oybek: '奥伊贝克自贸区',
      yangi: '亚格新乌兹别克斯坦',
      incentives: '优惠',
      contact: '联系我们',
      eAuction: '电子拍卖平台',
    },
    home: {
      hero: {
        badge: '官方投资门户',
        tagline: '投资别科博德',
        subtitle: '您进入中亚最具活力投资区的门户',
        description:
          '别科博德投资中心通过透明的电子拍卖流程、全面的税收优惠以及中亚十字路口的战略位置，提供世界一流的投资机会。',
        ctaButton: '参与电子拍卖',
        learnMore: '探索投资机会',
      },
      stats: {
        title: '别科博德数据概览',
        investment: '5.2亿美元+',
        investmentLabel: '总投资潜力',
        jobs: '5,800+',
        jobsLabel: '将创造的工作岗位',
        area: '535公顷',
        areaLabel: '总开发面积',
        taxYears: '10年',
        taxYearsLabel: '最长免税期',
        taxYearsSuffix: '年',
        areaSuffix: '公顷',
      },
      directions: {
        title: '三大战略投资方向',
        subtitle: '在别科博德不断发展的经济中选择您的投资路径',
        learnMore: '了解更多',
        sez: {
          title: '别科博德经济特区',
          subtitle: '特别经济区',
          description:
            '397公顷优质工业用地，涵盖8大战略行业的95个投资地块，是别科博德经济转型的基石。',
          stats: [
            { value: '5亿美元', label: '投资额' },
            { value: '5000+', label: '工作岗位' },
            { value: '2026年10月', label: '启动时间' },
          ],
        },
        oybek: {
          title: '奥伊贝克自贸区',
          subtitle: '自由贸易区',
          description:
            '位于乌塔边境口岸，这个34公顷的自由贸易区将成为跨境贸易和物流的重要枢纽。',
          stats: [
            { value: '2000万美元', label: '投资额' },
            { value: '200+', label: '工作岗位' },
            { value: '2027年12月', label: '启动时间' },
          ],
        },
        yangi: {
          title: '亚格新乌兹别克斯坦',
          subtitle: '住宅区',
          description:
            '城中之城——104公顷土地上建有7,800套公寓、学校、诊所、商业中心及世界一流配套设施。',
          stats: [
            { value: '11.25万亿苏姆', label: '投资额' },
            { value: '7800套', label: '公寓' },
            { value: '2030年', label: '启动时间' },
          ],
        },
      },
      why: {
        title: '为什么投资别科博德？',
        subtitle: '面向具有前瞻视野的投资者的战略优势',
        reasons: [
          {
            title: '战略地理位置',
            description:
              '位于中亚腹地，可直接进入乌兹别克斯坦-塔吉克斯坦边境及主要交通走廊。',
          },
          {
            title: '税收优惠',
            description:
              '经济特区居民企业可享受最长10年的企业所得税、土地税和财产税全额减免。',
          },
          {
            title: '电子拍卖透明度',
            description:
              '全透明电子拍卖系统，确保所有投资者公平竞争获取土地租用权。',
          },
          {
            title: '政府支持',
            description:
              '总统令第UP-4853号直接支持，并获得地区行政机构全面行政协助。',
          },
          {
            title: '完善基础设施',
            description:
              '经济特区从第一天起就配备26.5公里道路、公用设施和物流基础设施。',
          },
          {
            title: '法律保障',
            description:
              '依据乌兹别克斯坦税法典第68章第473条提供符合国际标准的长期法律保障。',
          },
        ],
      },
      cta: {
        title: '准备好投资别科博德了吗？',
        subtitle: '加入来自世界各地共同建设别科博德经济未来的投资者行列',
        button: '开启您的投资之旅',
        contact: '联系我们的团队',
      },
    },
    about: {
      title: '别科博德投资中心',
      subtitle: '今天建设明天的经济强国',
      hero: {
        badge: '官方机构',
        description:
          '隶属于别科博德区霍基米亚特的官方投资管理公司，致力于吸引国内外资本。',
      },
      company: {
        title: '关于我们公司',
        name: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        authority: '隶属别科博德区霍基米亚特',
        description:
          '我们是别科博德区官方投资促进和管理机构，直接受当地行政机构领导。我们的使命是通过透明流程吸引合格投资者、提供全面支持，并确保每项投资为投资者、当地社区和乌兹别克斯坦国家经济带来最大效益。',
      },
      director: {
        title: '领导层',
        name: '乌马罗夫·乌米德·艾哈迈德扬诺维奇',
        role: '别科博德区长',
        message:
          '我们邀请全球投资者参与别科博德的转型。通过我们透明的电子拍卖系统和全面的支持方案，我们确保每位投资者获得最坚实的成功基础。',
      },
      mission: {
        title: '我们的使命',
        description:
          '吸引合格投资者参与电子拍卖并获得土地租用权，在别科博德打造蓬勃发展的经济生态系统，造福投资者、当地社区和乌兹别克斯坦国家经济。',
      },
      vision: {
        title: '我们的愿景',
        description:
          '到2030年将别科博德定位为乌兹别克斯坦首要投资目的地，建成完善的特别经济区、自由贸易区和现代住宅基础设施，支撑数千个工作岗位和数十亿美元投资。',
      },
      values: {
        title: '我们的价值观',
        items: [
          { title: '透明度', description: '面向每位投资者的公开公正流程' },
          { title: '创新', description: '前沿发展理念与方法' },
          { title: '伙伴关系', description: '与投资者建立长期合作关系' },
          { title: '卓越', description: '在我们所做的一切中坚守世界级标准' },
        ],
      },
    },
    sez: {
      title: '别科博德特别经济区',
      subtitle: '397公顷工业发展机遇',
      badge: '启动时间：2026年10月',
      overview: {
        title: '园区概况',
        description:
          '别科博德经济特区代表乌兹别克斯坦最具雄心的工业发展项目之一。占地397公顷，这一世界级特别经济区在8大战略行业中提供95个投资地块，总投资潜力达5亿美元，将创造5,000+个工作岗位。',
      },
      stats: [
        { label: '总面积', value: '397公顷' },
        { label: '投资地块', value: '95个' },
        { label: '工业用地', value: '301公顷' },
        { label: '道路网络', value: '26.5公里' },
        { label: '绿化区', value: '45公顷' },
        { label: '总投资', value: '5亿美元' },
        { label: '出口潜力', value: '1.5亿美元/年' },
        { label: '创造就业', value: '5000+' },
        { label: '启动日期', value: '2026年10月' },
      ],
      overviewStats: [
        { label: '总面积', value: '397公顷' },
        { label: '投资地块', value: '95个' },
        { label: '投资额', value: '5亿美元' },
        { label: '工作岗位', value: '5000+' },
      ],
      sectors: {
        title: '8大战略工业行业',
        subtitle: '跨越关键工业领域的多元化投资机会',
        items: [
          { name: '冶金', description: '钢铁生产、金属加工与冶炼' },
          { name: '制药', description: '药品生产、医疗器械与生物技术' },
          { name: '机械工程', description: '机械、设备与精密制造' },
          { name: '建筑材料', description: '水泥、砖瓦、玻璃及建筑材料' },
          { name: '物流与仓储', description: '配送中心、冷链仓储与物流枢纽' },
          { name: '食品工业', description: '食品加工、包装与农产品' },
          { name: '能源', description: '可再生能源、发电与配电' },
          { name: '纺织', description: '纺织制造、服装与纤维加工' },
        ],
      },
      technopark: {
        title: '别科博德技术园',
        badge: '主力投资方——巴什科尔托斯坦企业',
        description:
          '经济特区的明珠——别科博德技术园由一家重要的巴什科尔托斯坦企业作为主力投资方，代表着园区的旗舰投资项目。这个100公顷的技术园将推动创新并创造优质就业机会。',
        descriptionSecond: {
          before:
            '技术园入驻企业可享受3至10年的税收和海关优惠、即用型工程基础设施，并通过乌兹别克斯坦与塔吉克斯坦边境的"Oybek"口岸直接连接国际运输走廊。如需了解技术园及可用地块的更多信息，请访问 ',
          linkText: 'tp-bekobod.uz',
          after: '。',
        },
        stats: [
          { label: '面积', value: '100公顷' },
          { label: '地块数', value: '23个' },
          { label: '投资额', value: '2亿美元' },
          { label: '工作岗位', value: '1000+' },
          { label: '启动时间', value: '2026年12月' },
        ],
        hectaresLabel: '公顷',
        areaCaption: '技术园面积',
      },
      imageTags: { lots: '地块', sectors: '行业' },
      map: {
        title: '经济特区位置',
        description: '战略性地位于别科博德区，交通便利。',
        button: 'Google Maps', yandexButton: 'Yandex 地图',
      },
    },
    oybek: {
      title: '奥伊贝克自由贸易区',
      subtitle: '跨境贸易门户',
      badge: '启动时间：2027年12月',
      overview: {
        title: '园区概况',
        description:
          '奥伊贝克自由贸易区位于乌兹别克斯坦-塔吉克斯坦边境的奥伊贝克口岸，打造国际贸易的重要商业枢纽。这个34公顷的园区旨在吸引乌塔两国间的大量跨境贸易流量。',
      },
      stats: [
        { label: '总面积', value: '34公顷' },
        { label: '总投资', value: '2000万美元' },
        { label: '外资金额', value: '500万美元' },
        { label: '创造就业', value: '200+' },
        { label: '启动日期', value: '2027年12月' },
      ],
      facilities: {
        title: '世界一流配套设施',
        subtitle: '畅通跨境贸易所需的一切',
        items: [
          { name: '酒店', description: '为商务旅客和过境客提供现代住宿' },
          { name: '加油站', description: '为各类车辆提供全方位服务的多燃料加油站' },
          { name: '洗车', description: '专业自动及手工车辆清洗服务' },
          { name: '汽车服务', description: '全面的车辆维护、维修和诊断服务' },
          { name: '新能源充电站', description: '面向未来的现代电动汽车充电基础设施' },
          { name: '大型停车场', description: '可容纳轿车、卡车、拖车及各类运输工具的宽敞安全停车场' },
        ],
      },
      location: {
        title: '边境门户战略位置',
        description:
          '奥伊贝克口岸是乌兹别克斯坦和塔吉克斯坦之间的主要陆路过境点。自由贸易区在此的布局形成了一个天然商业枢纽，服务于数以百万计的年度边境过往人员。',
      },
      banner: [
        { label: '总投资', sub: '项目总价值' },
        { label: '外资金额', sub: '国际资本目标' },
        { label: '创造就业', sub: '直接就业人数' },
      ],
      map: {
        title: '自贸区位置',
        description: '位于奥伊贝克边境口岸，乌兹别克斯坦-塔吉克斯坦边境。',
        button: 'Google Maps', yandexButton: 'Yandex 地图',
      },
    },
    yangi: {
      title: '亚格新乌兹别克斯坦住宅区',
      subtitle: '城中之城',
      badge: '启动时间：2030年',
      overview: {
        title: '街区概况',
        description:
          '亚格新乌兹别克斯坦（新乌兹别克斯坦）是一项雄心勃勃的城市规划项目，在别科博德打造一座完全自给自足的现代化城市。这一104公顷的变革性项目除7,800套公寓外，还配备了完善的商业、教育、医疗和休闲基础设施。',
      },
      stats: [
        { label: '总面积', value: '104公顷' },
        { label: '投资额', value: '11.25万亿苏姆' },
        { label: '公寓套数', value: '7,800套' },
        { label: '创造就业', value: '800+' },
        { label: '启动日期', value: '2030年' },
      ],
      facilities: {
        title: '综合城市配套设施',
        subtitle: '触手可及的一切必要服务',
        categories: [
          {
            name: '住宅',
            icon: '🏠',
            items: ['住宅综合体', '商务公寓', '酒店'],
          },
          {
            name: '商业',
            icon: '🏢',
            items: ['商务中心', '购物中心', '加油站', '汽车服务'],
          },
          {
            name: '教育',
            icon: '🎓',
            items: ['幼儿园', '学校', '高中', '大专学院'],
          },
          {
            name: '健康与休闲',
            icon: '🌿',
            items: ['诊所', '公园', '露天剧场'],
          },
        ],
      },
      concept: {
        title: '"一站式城市"理念',
        description:
          '亚格新乌兹别克斯坦按照15分钟城市原则设计——所有基本服务、教育、医疗和休闲设施均在步行范围内。这一现代城市规划理念确保居民享有最高质量的生活，同时培育充满活力的社区氛围。',
      },
      minuteCityLabel: '15分钟城市',
      imageTagApartments: '7,800套公寓',
      highlights: [
        {
          title: '城中之城',
          description: '完全自给自足的城市生态系统，步行范围内即可获得所有必要服务。',
        },
        {
          title: '教育中心',
          description: '从幼儿园到大专——完整的教育阶梯，支持家庭每个成长阶段。',
        },
        {
          title: '绿色生活',
          description: '公园、露天剧场及绿色空间遍布整个街区，提升生活品质。',
        },
      ],
      banner: [
        { label: '总投资' },
        { label: '公寓套数' },
        { label: '创造就业' },
        { label: '启动年份' },
      ],
      map: {
        title: '街区位置',
        description: '位于别科博德区中心地带。',
        button: 'Google Maps', yandexButton: 'Yandex 地图',
      },
      lots: {
        title: '在售投资地块',
        description:
          '将鼠标悬停在总体规划图上的地块上，即可查看面积、价格和状态，并可直接在电子拍卖平台竞拍。',
        lotLabel: '地块',
        areaLabel: '面积',
        priceLabel: '起拍价',
        auctionButton: '参与拍卖',
        hint: '悬停查看地块详情 · 点击打开拍卖窗口。',
        status: { pending: '待定', available: '拍卖中', sold: '已售' },
        useLabels: { residential: '住宅建筑', commercial: '非住宅建筑' },
      },
    },
    incentives: {
      title: '税收优惠与投资福利',
      subtitle: '经济特区投资者的全面财税优势',
      badge: '依据乌兹别克斯坦税法典第68章第473条',
      overview: {
        title: '我们的优惠政策为何重要？',
        description:
          '别科博德经济特区提供乌兹别克斯坦最具竞争力的税收优惠方案之一，旨在最大化投资者回报、加速企业增长。',
      },
      corporate: {
        title: '利润税减免',
        subtitle: '全额免征利润税',
        headers: ['投资金额', '减免期限'],
        table: [
          { investment: '300万美元 – 500万美元', period: '3年' },
          { investment: '500万美元 – 1500万美元', period: '5年' },
          { investment: '超过1500万美元', period: '10年' },
        ],
      },
      land: {
        title: '土地税减免',
        subtitle: '全额免征土地税',
        headers: ['投资金额', '减免期限'],
        table: [
          { investment: '30万美元 – 300万美元', period: '3年' },
          { investment: '300万美元 – 500万美元', period: '5年' },
          { investment: '500万美元 – 1000万美元', period: '7年' },
          { investment: '超过1000万美元', period: '10年' },
        ],
      },
      property: {
        title: '财产税减免',
        subtitle: '与土地税相同的减免方案——全额免征财产税',
        note: '财产税减免依照与上述土地税减免完全相同的投资金额梯度执行。',
      },
      water: {
        title: '水资源税减免',
        subtitle: '全额免征水资源税',
        note: '水资源税减免为特区运营中的可持续资源利用提供税收优惠。',
      },
      customs: {
        title: '关税优惠',
        subtitle: '为特区居民提供全面关税优势',
        items: [
          {
            title: '免关税进口',
            description: '按特区制度进口技术设备和建筑材料，无需支付关税',
          },
          {
            title: '关税豁免',
            description: '特区内生产商品的进出口享受延长的豁免期',
          },
          {
            title: '简化海关程序',
            description: '特区企业加快海关报关，减少单证要求',
          },
        ],
      },
      legal: {
        title: '法律框架',
        subtitle: '保护您投资的坚实法律依据',
        items: [
          {
            title: '乌兹别克斯坦共和国税法典',
            detail: '第68章第473条',
            description:
              '为特别经济区内所有税收减免提供法定依据，确保投资者获得长期法律确定性。',
          },
          {
            title: '总统令第UP-4853号',
            detail: '2016年10月26日',
            description:
              '为经济特区投资者建立基础性法律框架和附加保护，由最高行政权力机关背书。',
          },
        ],
      },
      additional: {
        title: '额外投资福利',
        subtitle: '税收优惠之外——全方位投资者支持',
        items: [
          {
            title: '政府支持',
            description: '地区和国家当局直接提供便利化服务和支持',
          },
          {
            title: '电子拍卖透明度',
            description: '全透明电子拍卖流程，确保所有投资者公平竞争',
          },
          {
            title: '法律保障',
            description: '确保投资安全和企业持续经营的长期法律保护',
          },
          {
            title: '基础设施接入',
            description: '从第一天起即可使用道路、公用设施和物流基础设施',
          },
          {
            title: '行政协助',
            description: '专属支持团队全程陪伴您投资之旅的每一个步骤',
          },
          {
            title: '分期付款',
            description: '提供灵活的付款方式，包括分期付款计划，助力资金灵活部署',
          },
        ],
      },
      keyNumbers: [
        { value: '10年', label: '最长免税期' },
        { value: '3类', label: '税收减免（利润税+土地税+财产税）' },
        { value: '2项法规', label: '法律依据' },
      ],
      taxSchedulesTitle: '税收减免时间表',
      cta: {
        title: '准备好申请您的税收优惠了吗？',
        description: '参与电子拍卖，立即在别科博德经济特区开启您的免税之旅。',
        button: '参与电子拍卖',
        contact: '联系我们的团队',
      },
    },
    contact: {
      title: '联系我们',
      subtitle: '我们随时准备帮助您投资别科博德的未来',
      heroBadge: '联系我们',
      messageSent: '消息已发送！',
      exploreProjects: '探索投资项目',
      projectCards: [
        { subtitle: '397公顷 • 5亿美元 • 2026年10月' },
        { subtitle: '34公顷 • 2000万美元 • 2027年12月' },
        { subtitle: '104公顷 • 11.25万亿苏姆 • 2030年' },
      ],
      director: {
        title: '投资总监',
        name: '乌马罗夫·乌米德·艾哈迈德扬诺维奇',
        role: '别科博德投资中心主任',
        company: 'Bekobod Investitsiya Boshqaruv Kompaniyasi',
        message: '"我们邀请全球投资者参与别科博德的转型。通过我们透明的电子拍卖系统和全面的支持方案，我们确保每位投资者获得最坚实的成功基础。"',
      },
      office: {
        title: '我们的办公室',
        address: '别科博德区霍基米亚特办公楼',
        city: '别科博德，塔什干州',
        country: '乌兹别克斯坦共和国',
      },
      eauction: {
        title: '电子拍卖平台',
        description:
          '参与我们的透明电子拍卖系统，获取别科博德经济特区、奥伊贝克自贸区和亚格新乌兹别克斯坦住宅区的土地租用权。',
        button: '访问电子拍卖平台',
        website: 'e-auksion.uz',
      },
      form: {
        title: '向我们发送消息',
        name: '您的全名',
        email: '电子邮件地址',
        phone: '电话号码',
        country: '所在国家',
        interest: '投资意向',
        interestOptions: ['别科博德经济特区', '奥伊贝克自贸区', '亚格新乌兹别克斯坦', '一般咨询'],
        message: '您的留言',
        submit: '发送消息',
        success: '感谢您！您的消息已发送。我们将在24小时内与您联系。',
        selectPlaceholder: '请选择...',
        namePlaceholder: '您的姓名',
        countryPlaceholder: '所在国家',
        messagePlaceholder: '请告诉我们您的投资意向...',
      },
    },
    footer: {
      description:
        '隶属别科博德区霍基米亚特的官方投资管理公司，吸引国内外资本推动可持续经济发展。',
      quickLinks: '快速链接',
      projects: '投资项目',
      legal: '法律依据',
      rights: '版权所有。',
      authority: '别科博德区霍基米亚特',
      legalBasis: '乌兹别克斯坦税法典第68章473条 | 总统令UP-4853',
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
