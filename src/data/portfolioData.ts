export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  adminUrl?: string;
  githubUrl: string;
  featured: boolean;
  accentColor: string;
  role: string;
  client?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: {
    name: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: "Jenit Jenson",
  monogram: "JJ",
  designation: "Web Designer | UI/UX Designer",
  shortDesignation: "Web & UI/UX Designer",
  roleTagline: "WEB DESIGNER · UI/UX DESIGNER · DIGITAL CREATIVE",
  education: {
    degree: "B.Tech Computer Science and Engineering",
    year: "Third Year Student",
    institution: "Jyothi Engineering College",
    location: "Kerala, India",
  },
  location: "Kerala, India",
  email: "jenitson46@gmail.com",
  phone: "+91 9072105574",
  phoneFormatted: "+91 90721 05574",
  github: "https://github.com/jenitjenson45-debug",
  linkedin: "https://www.linkedin.com/in/jenit-jenson-116a2b387/",
  positioning:
    "I design meaningful digital experiences through thoughtful UI/UX, modern design systems and creative interactions.",
  heroBio:
    "I'm a Computer Science Engineering student with a passion for designing digital experiences that combine thoughtful aesthetics, intuitive interactions and modern design systems.",
  aboutStory: [
    "I'm Jenit Jenson, a third-year Computer Science Engineering student who enjoys exploring the intersection of design and technology.",
    "I believe a great website is more than just an attractive interface. It should communicate clearly, feel effortless to use and create a memorable experience.",
    "I enjoy transforming ideas into meaningful digital products through creative design, thoughtful layouts, design systems and interactive experiences.",
  ],
  footerTagline: "DESIGNED & BUILT BY JENIT JENSON.",
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Design & Creativity",
    description: "Creating intuitive interfaces, visual harmony, and brand storytelling.",
    skills: [
      { name: "UI/UX Design", description: "User research, wireframing, and interactive prototypes" },
      { name: "Website Layout Design", description: "Architecting editorial, asymmetric, and structured layouts" },
      { name: "Responsive Design", description: "Fluid adaptability across mobile, tablet, and desktop screens" },
      { name: "Visual Hierarchy", description: "Guiding user attention through typography, color, and pacing" },
      { name: "Design Systems", description: "Scalable component libraries, design tokens, and guidelines" },
      { name: "Interaction Design", description: "Micro-interactions, state transitions, and tactile feedback" },
    ],
  },
  {
    category: "Tools & Prototyping",
    description: "Industry-standard design suites and modern prototyping systems.",
    skills: [
      { name: "Figma", description: "Collaborative interface design, component auto-layout, and prototyping" },
      { name: "Design Tokens", description: "Systematized color variables, typography scales, and spacing units" },
      { name: "Wireframing", description: "Low and high-fidelity structural blueprints for web experiences" },
      { name: "Interactive Prototyping", description: "Clickable flows, micro-animations, and behavioral models" },
      { name: "Visual Hierarchy Systems", description: "Information architecture and content organization" },
    ],
  },
  {
    category: "Workflow & Platform",
    description: "Modern production tooling for seamless creative execution.",
    skills: [
      { name: "Git", description: "Version control, branching strategies, and repository management" },
      { name: "GitHub", description: "Code collaboration, open-source publishing, and portfolio hosting" },
      { name: "Antigravity", description: "Next-gen agentic development and high-precision UI engineering" },
      { name: "Modern AI-assisted Tools", description: "Accelerating visual exploration, layout ideation, and rapid review" },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "UI/UX DESIGN",
    tagline: "Intuitive interfaces with purposeful aesthetics",
    description:
      "I create intuitive and visually compelling interfaces that make digital experiences easier, clearer and more enjoyable.",
    iconName: "Palette",
    deliverables: [
      "User-focused layouts",
      "Visual hierarchy",
      "Interface design",
      "User experience improvements",
    ],
  },
  {
    number: "02",
    title: "WEBSITE DESIGN",
    tagline: "Distinctive digital presence tailored to your vision",
    description:
      "I design modern, responsive websites that communicate a brand's identity while delivering an engaging browsing experience.",
    iconName: "Layout",
    deliverables: [
      "Landing pages",
      "Business websites",
      "Portfolio websites",
      "Responsive layouts",
    ],
  },
  {
    number: "03",
    title: "BRANDING & IDENTITY",
    tagline: "Memorable visual systems and brand character",
    description:
      "I build visual identities, color palettes, and typographic systems that communicate a brand's character and leave a lasting impression.",
    iconName: "Layers",
    deliverables: [
      "Brand identity guidelines",
      "Typography systems",
      "Color architecture",
      "Visual storytelling assets",
    ],
  },
  {
    number: "04",
    title: "DESIGN SYSTEMS & CREATIVE WEB",
    tagline: "Scalable component libraries and interactive storytelling",
    description:
      "I explore motion, depth, and design systems to create websites that feel distinctive, memorable, and consistent across all screens.",
    iconName: "Sparkles",
    deliverables: [
      "Scalable design systems",
      "Component libraries & tokens",
      "Scroll-based motion experiences",
      "Modern visual storytelling",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understanding goals, target audience, and core project vision.",
  },
  {
    number: "02",
    title: "DEFINE",
    description: "Structuring information architecture and defining the aesthetic direction.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Crafting wireframes, high-fidelity layouts, and tactile interactions.",
  },
  {
    number: "04",
    title: "DEVELOP",
    description: "Structuring clean, responsive, and performance-conscious digital layouts.",
  },
  {
    number: "05",
    title: "DELIVER",
    description: "Testing across viewports, refining details, and successful launch.",
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "resqlink",
    title: "ResQLink Kerala",
    subtitle: "AI Disaster Early Warning & Rescue Intelligence",
    category: "Disaster Management Interface & UX System",
    year: "2026",
    role: "Lead UI/UX & System Designer",
    client: "Kerala State Disaster Management Authority (KSDMA) Aligned",
    description:
      "AI-assisted disaster early warning, resident digital twin risk intelligence, real-time GPS emergency SOS, and SEOC admin command operations for Kerala.",
    longDescription:
      "ResQLink Kerala is an integrated disaster management and rescue coordination ecosystem. It connects official IMD/KSDMA hazard polygon warnings, localized resident risk twins, Indian Telecom DLT-compliant SMS alert dissemination (in English & Malayalam), transparent multi-factor rescue priority scoring, and network-loss offline survival mode.",
    tags: ["UI/UX Design", "System Architecture", "Geospatial UI", "Design Tokens", "Tailwind CSS"],
    metrics: [
      { label: "Alert Latency", value: "< 1.2s" },
      { label: "Districts Supported", value: "14 Kerala Districts" },
      { label: "Survival Mode", value: "Offline IndexedDB + Mesh" },
    ],
    liveUrl: "https://resqlink-citizen-portal.vercel.app",
    adminUrl: "https://resqlink-admin-command.vercel.app",
    githubUrl: "https://github.com/jenitjenson45-debug/_Resqlink-",
    featured: true,
    accentColor: "#858D70",
  },
  {
    id: "royal-foods",
    title: "Royal Foods",
    subtitle: "Haute Kerala Heritage 3D E-Commerce Experience",
    category: "Creative Digital Experience & Brand E-Commerce",
    year: "2026",
    role: "Creative Web & 3D Designer",
    client: "Royal Foods Culinary Brand",
    description:
      "A cinematic luxury culinary digital experience celebrating traditional Kerala pickling heritage through cutting-edge 3D web technologies, glassmorphism, and interactive storytelling.",
    longDescription:
      "Featuring a 3D interactive floating pickle jar built with physical transmission, glass refraction, golden embossed lid, surrounded by floating ingredients responsive to cursor spotlight. Includes a 6-scene artisanal pickling journey, particle swarm, procedural audio soundscape, and an interactive taste explorer.",
    tags: ["3D Web Design", "Glassmorphism", "Interactive Storytelling", "Soundscape", "Creative Web"],
    metrics: [
      { label: "3D Render Engine", value: "Three.js / WebGL" },
      { label: "Audio Experience", value: "Procedural Web Audio" },
      { label: "Language", value: "English & Malayalam" },
    ],
    liveUrl: "https://royal-foods-nine.vercel.app",
    githubUrl: "https://github.com/jenitjenson45-debug/royal-foods",
    featured: true,
    accentColor: "#A0AA87",
  },
  {
    id: "portfolio-editorial",
    title: "Personal Portfolio 2026",
    subtitle: "Editorial Luxury Digital Showcase",
    category: "Web Design & Creative UI/UX",
    year: "2026",
    role: "Digital Designer & Web Creator",
    description:
      "A high-end editorial portfolio combining deep charcoal minimalism, warm ivory typography, muted olive accents, and interactive glassmorphism.",
    longDescription:
      "Built with Next.js 14, Tailwind CSS, Framer Motion, and Lenis smooth scrolling. Features dynamic GitHub repository synchronization, accessible glassmorphism components, custom cursor physics, and responsive editorial magazine grid.",
    tags: ["Editorial Web Design", "UI/UX Prototyping", "Glassmorphism", "Motion Direction"],
    metrics: [
      { label: "Design Language", value: "Editorial Luxury" },
      { label: "Performance", value: "99+ Lighthouse" },
      { label: "Experience", value: "Smooth Scroll & Parallax" },
    ],
    liveUrl: "https://jenitjenson.dev",
    githubUrl: "https://github.com/jenitjenson45-debug/PORTFOLIO",
    featured: true,
    accentColor: "#858D70",
  },
  {
    id: "aegis-platform",
    title: "Aegis Intelligence Platform",
    subtitle: "Real-Time Telemetry & Threat Surveillance",
    category: "Data Visualization & Dashboard UI/UX",
    year: "2025",
    role: "Product Designer & UI Architect",
    description:
      "Next-generation enterprise dashboard for live server telemetry, security anomaly detection, and distributed cluster monitoring.",
    longDescription:
      "Designed with ultra-dense data grids, real-time telemetry charts, ergonomic dark mode aesthetics, and customizable widget canvases for security operations centers.",
    tags: ["Dashboard Design", "Data Visualization", "Dark Mode UI", "Information Architecture"],
    metrics: [
      { label: "Telemetry Latency", value: "< 25ms" },
      { label: "Data Throughput", value: "10k events/sec" },
    ],
    githubUrl: "https://github.com/jenitjenson45-debug",
    featured: false,
    accentColor: "#20231D",
  },
];
