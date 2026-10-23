export interface PortfolioData {
  hero: {
    yearLabel: string;
    name: string;
    subtitle: string;
    targetSectionId: string;
  };
  intro: {
    statement: string;
    vision: string;
    chips: string[];
  };
  builds: {
    heading: string;
    stats: { value: string; label: string }[];
    featured: {
      title: string;
      badge: string;
      description: string;
      workingPrototypeNote: string;
      featureStrip: string[];
      inDevelopment: string[];
      liveDemoUrl: string;
      codeUrl: string;
      mockupScreens: {
        id: string;
        title: string;
        subtitle: string;
        type: 'discover' | 'planner' | 'itinerary' | 'place' | 'offline';
        badge?: string;
      }[];
    };
    secondarySectionLabel: string;
    secondaryApp: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  triShield: {
    title: string;
    subtitle: string;
    badge: string;
    disclaimer: string;
    stages: {
      id: number;
      label: string;
      title: string;
      description: string;
      technicalDetails: string;
      metrics?: {
        label: string;
        value: string;
      }[];
    }[];
    features: string[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  achievements: {
    title: string;
    context: string;
    tag: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    location: string;
  };
  interests: string[];
  contact: {
    heading: string;
    email: string;
    emailHref: string;
    linkedInDisplay: string;
    linkedInHref: string;
    gitHubDisplay: string;
    gitHubHref: string;
    copyright: string;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  hero: {
    yearLabel: 'PORTFOLIO 2026',
    name: 'Koushiga S. Jayandran',
    subtitle: 'Aspiring security engineer · Web builder · AI/ML learner',
    targetSectionId: 'web-builds',
  },
  intro: {
    statement: 'Curious about how things work, especially networks and the threats against them.',
    vision:
      'In 5 years, I aim to be a cybersecurity specialist and security engineer who builds AI and ML-powered systems that protect people and networks from threats such as rogue cell towers.',
    chips: [
      'Fast conceptual learner',
      'Clear technical communicator',
      'Hackathon-tested problem solver',
    ],
  },
  builds: {
    heading: "Things I've built",
    stats: [
      { value: '30+', label: 'apps built' },
      { value: '1', label: 'live product' },
      { value: 'OWASP', label: 'Hackathon runner-up' },
    ],
    featured: {
      title: 'TamizN Visa',
      badge: 'Working prototype',
      description:
        'A bilingual (English + Tamil), mobile-first Tamil Nadu trip planner built with React and TypeScript, submitted to the Tamil Nadu Tourism Innovation Challenge 2026.',
      workingPrototypeNote:
        'A working prototype with limited curated data and a wide set of features.',
      featureStrip: [
        'Bilingual English + Tamil',
        'Smart search',
        '38 districts',
        '72 curated experiences',
        '8-step personalized planner',
        'Explainable itineraries',
        'Crowd badges',
        'Destination cards with sources',
        'Saved trips',
        'Offline trip dossier',
        'Emergency helplines',
        'QR deep links (beta)',
        'Zero-fabrication data principle',
      ],
      inDevelopment: [
        'One Area One Day planning',
        'No-repeat itinerary engine',
        'Solo and Women Safety Mode',
        'Bus and train guide',
      ],
      liveDemoUrl: 'https://tamizn-visa.ai.studio',
      codeUrl: 'https://github.com/Koushiga-S-Jayandran',
      mockupScreens: [
        {
          id: '01',
          title: 'Explore Tamil Nadu, Beyond the Usual',
          subtitle: '38 districts · 72 curated heritage & nature circuits',
          type: 'discover',
          badge: 'Bilingual EN / TA',
        },
        {
          id: '02',
          title: 'Personalized 8-Step Planner',
          subtitle: 'Pacing, transport choice, crowd threshold & culture focus',
          type: 'planner',
          badge: 'Smart Engine',
        },
        {
          id: '03',
          title: 'Explainable Day Itinerary',
          subtitle: '08:30 Brihadisvara Temple (Crowd: Low) → 11:30 Palace Craft',
          type: 'itinerary',
          badge: 'Real Timings',
        },
        {
          id: '04',
          title: 'Destination Card & Sources',
          subtitle: 'Verified local facts with zero-fabrication guarantees',
          type: 'place',
          badge: 'Verified Data',
        },
        {
          id: '05',
          title: 'Offline Trip Dossier',
          subtitle: 'Downloadable emergency helplines & offline PDF itinerary',
          type: 'offline',
          badge: 'Offline Ready',
        },
      ],
    },
    secondarySectionLabel:
      'Also: 30+ apps built with AI-assisted coding, for SREC and personal use',
    secondaryApp: {
      title: 'SREC Blood Donation',
      description:
        'A fast, responsive web app developed for Sri Ramakrishna Engineering College campus drives to coordinate eligible donors, verify availability, and connect volunteer helplines in real time.',
      tags: ['React', 'TypeScript', 'Campus Utility', 'Urgent Match'],
    },
  },
  triShield: {
    title: 'TriShield – Rogue Cellular Tower Detection',
    subtitle: 'Built for the OWASP Cybersecurity Hackathon (runner-up).',
    badge: 'Hackathon Prototype',
    disclaimer:
      'Note: Detection values and risk scores shown are illustrative hackathon prototype metrics for demonstration.',
    stages: [
      {
        id: 1,
        label: 'Connect',
        title: 'Cellular Uplink Initiated',
        description:
          'A mobile terminal searches for local cellular base stations and begins establishing an unauthenticated radio frequency handshake with the strongest broadcast signal.',
        technicalDetails:
          'Handshake over BCCH / 3GPP GSM/LTE broadcast frequencies. The terminal blindly synchronizes frequency and timing bursts without initial cryptographic station identity proof.',
        metrics: [
          { label: 'Carrier Frequency', value: '1805.2 MHz' },
          { label: 'RSSI Signal', value: '-62 dBm (Strong)' },
          { label: 'Protocol Tier', value: 'LTE / 2G Downgrade' },
        ],
      },
      {
        id: 2,
        label: 'Intercept',
        title: 'Anomalous Tower Broadcast Detected',
        description:
          'The connected base station requests emergency re-authentication and commands an encryption downgrade (e.g. A5/0 null cipher). The question triggers: Is this tower genuine or rogue?',
        technicalDetails:
          'Forced encryption downgrade alert and unlisted LAC/CID in local carrier regulatory database. Identity probe suggests IMSI catcher / rogue BTS activity.',
        metrics: [
          { label: 'Cipher Algorithm', value: 'A5/0 (Null Encryption!)' },
          { label: 'LAC / Cell ID', value: '0x4E12 (Unregistered)' },
          { label: 'Anomalous Power', value: '+14 dBm Deviation' },
        ],
      },
      {
        id: 3,
        label: 'Verify',
        title: 'Dual-Engine Telemetry Analysis',
        description:
          'Telemetry is fed into two parallel engines: a 70-point deterministic rule suite evaluating carrier compliance, and a 30-point Isolation Forest anomaly scoring model.',
        technicalDetails:
          'Rule engine checks LAC database, encryption enforcement, and power profile. Isolation Forest examines multi-dimensional broadcast feature outliers.',
        metrics: [
          { label: 'Rule-Based Checks', value: '54 / 70 points' },
          { label: 'Isolation Forest Model', value: '26 / 30 points' },
          { label: 'Combined Trust Score', value: '80 / 100 Risk Index' },
        ],
      },
      {
        id: 4,
        label: 'Protect',
        title: 'Shield Lock & Evidence Dossier',
        description:
          'The connection is flagged, baseband alert is logged, a tamper-proof cryptographic report is generated, and a direct complaint action is prepared for official cybersecurity reporting.',
        technicalDetails:
          'SHA-256 hash sealed report containing RF spectra, cell parameters, timestamps, and GPS boundary coordinates. One-tap cyber crime portal submission ready.',
        metrics: [
          { label: 'Defense Action', value: 'Radio Channel Isolation' },
          { label: 'Report Hash', value: 'e3b0c442...98fc (SHA-256)' },
          { label: 'Remediation', value: 'Direct Complaint Trigger' },
        ],
      },
    ],
    features: [
      'Tamper-proof cryptographic report generation',
      'Direct complaint filing on cybersecurity portal',
      'Customizable score weights per RF feature',
      'Map view of the connected tower & sector',
      'Interactive attack simulation sandbox',
    ],
  },
  skills: [
    {
      category: 'Programming',
      items: ['Python', 'C', 'C++'],
    },
    {
      category: 'Web',
      items: ['HTML', 'React', 'TypeScript'],
    },
    {
      category: 'Database',
      items: ['MySQL'],
    },
    {
      category: 'Tools',
      items: ['Git', 'GitHub', 'Google AI Studio'],
    },
    {
      category: 'Currently learning',
      items: ['Linux', 'SQL', 'API testing'],
    },
  ],
  achievements: [
    {
      title: 'Runner-up, OWASP Cybersecurity Hackathon',
      context:
        'Awarded runner-up for TriShield, an innovative rogue cellular tower detection concept and prototype leveraging rule engines and anomaly modeling.',
      tag: 'Hackathon Award',
    },
    {
      title: "Third Prize, Invictus'26",
      context:
        'Won Third Prize at Invictus\'26 held at Government College of Technology (GCT), Coimbatore, demonstrating rapid prototyping and technical execution.',
      tag: 'Competition Prize',
    },
    {
      title: 'Technical Seminar on Quantum Computing',
      context:
        'Delivered an interactive, conceptual seminar on quantum computing principles, qubits, and post-quantum cryptography implications to first-year students at SREC.',
      tag: 'Keynote & Presentation',
    },
  ],
  education: {
    degree: 'M.Tech Computer Science and Engineering (Integrated 5-Year Course)',
    institution: 'Sri Ramakrishna Engineering College (SREC), Coimbatore',
    year: '1st year',
    location: 'Coimbatore, Tamil Nadu',
  },
  interests: [
    'Cybersecurity',
    'Networking and cyber threats',
    'Building and training AI/ML models',
    'Learning how things work',
  ],
  contact: {
    heading: "Let's talk",
    email: 'koushiga.2653022@srec.ac.in',
    emailHref: 'mailto:koushiga.2653022@srec.ac.in',
    linkedInDisplay: 'www.linkedin.com/in/koushiga-s-jayandran-45b68a432',
    linkedInHref: 'https://www.linkedin.com/in/koushiga-s-jayandran-45b68a432',
    gitHubDisplay: 'https://github.com/Koushiga-S-Jayandran',
    gitHubHref: 'https://github.com/Koushiga-S-Jayandran',
    copyright: '© 2026 Koushiga S. Jayandran',
  },
};
