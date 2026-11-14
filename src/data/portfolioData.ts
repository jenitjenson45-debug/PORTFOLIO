export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  problemStatement: string;
  proposedSolution: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  icon: string;
  category: "design" | "development";
  level?: string;
  description?: string;
}

export const PERSONAL_INFO = {
  name: "Jenit Jenson",
  brandName: "JENIT JENSON",
  monogram: "JJ",
  badge: "Graphic Designer • UI/UX Enthusiast",
  roleTagline: "DESIGNER · DEVELOPER · CREATIVE MIND",
  heroBio:
    "Crafting stunning visuals, designing better experiences, and turning ideas into impactful designs.",
  aboutHeading: "Turning Ideas into Impact.",
  aboutBio:
    "I'm Jenit Jenson, a Computer Science Engineering student with a passion for design, development, and creative problem solving. I love crafting visually appealing experiences that blend creativity with technology.",
  degree: "B.Tech – Computer Science and Engineering",
  degreeShort: "B.Tech CSE",
  college: "Jyothi Engineering College",
  status: "Currently pursuing 3rd Year",
  location: "Kerala, India",
  email: "jenitson46@gmail.com",
  github: "https://github.com/jenitjenson45-debug",
  linkedin: "https://www.linkedin.com/in/jenit-jenson-116a2b387",
  contributions:
    "Worked on innovative projects like ResQLink, ResQMesh and a personal portfolio, focusing on design, development and user experience.",
  philosophy: "DESIGN. DEVELOP. INNOVATE.",
  copyright: "© 2026 Jenit Jenson. All rights reserved.",
};

export const SKILLS_DATA = {
  design: [
    { name: "Graphic Design", icon: "palette", desc: "Visual storytelling & brand identity" },
    { name: "UI/UX Design", icon: "layout", desc: "Intuitive workflows & wireframes" },
    { name: "Typography", icon: "type", desc: "Editorial hierarchy & font pairing" },
    { name: "Colour Theory", icon: "disc", desc: "Harmonic palettes & emotional resonance" },
    { name: "Visual Composition", icon: "grid", desc: "Spatial balance & focal dynamics" },
    { name: "Digital Content", icon: "sparkles", desc: "Modern interactive web assets" },
    { name: "Figma", icon: "figma", desc: "High-fidelity prototyping & design systems" },
  ],
  development: [
    { name: "HTML5", icon: "html5", desc: "Semantic structural markup" },
    { name: "CSS3", icon: "css3", desc: "Modern responsive styling & animations" },
    { name: "JavaScript", icon: "javascript", desc: "ES6+ asynchronous logic" },
    { name: "React.js", icon: "react", desc: "Component architecture & state flow" },
    { name: "Next.js", icon: "nextjs", desc: "App router, SSR & performance optimization" },
    { name: "TypeScript", icon: "typescript", desc: "Type-safe robust web development" },
    { name: "C", icon: "c", desc: "Systems programming & algorithms" },
    { name: "Git", icon: "git", desc: "Version control & collaboration" },
    { name: "GitHub", icon: "github", desc: "Open-source development & workflows" },
  ],
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "resqlink",
    title: "ResQLink",
    subtitle: "Disaster Management Platform",
    category: "Disaster Management Platform",
    description:
      "A Kerala-focused disaster alert and emergency response platform designed to connect residents, administrators and rescue operators.",
    problemStatement:
      "During severe monsoons and natural disaster crises across Kerala, fragmented emergency communication, inaccurate social media rumors, and delays in emergency dispatch hinder rapid rescue coordination.",
    proposedSolution:
      "A unified, high-availability platform uniting citizens, relief administrators, and rescue teams in real time with verified incident reporting, geolocation SOS alerts, and live resource tracking.",
    features: [
      "Geo-referenced SOS emergency alert broadcast",
      "Interactive Kerala disaster zone map with live relief nodes",
      "Real-time emergency shelter inventory & supply tracker",
      "Role-based emergency command and dispatch console",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Mapbox", "Vercel"],
    liveUrl: "https://resqlink-citizen-portal.vercel.app/",
    githubUrl: "https://github.com/jenitjenson45-debug/_Resqlink-",
    image: "/images/hero-ref.jpg",
    featured: true,
  },
  {
    id: "resqmesh",
    title: "ResQMesh",
    subtitle: "Responder Identity Platform",
    category: "Responder Identity Platform",
    description:
      "A disaster-response project exploring responder identity, verification and trusted digital interactions.",
    problemStatement:
      "In chaotic emergency scenarios where cellular connectivity and power grids fail, ensuring first responders are legitimate and authorized without internet access poses a critical security challenge.",
    proposedSolution:
      "A decentralized identity validation framework enabling localized offline verification of responder credentials, team roles, and operational clearance.",
    features: [
      "Offline cryptographic credential verification",
      "Decentralized mesh responder registry",
      "Tamper-proof digital badge authentication",
      "Emergency squad role assignments & verification logs",
    ],
    technologies: ["React", "TypeScript", "Distributed Mesh", "Cryptography", "Tailwind CSS"],
    githubUrl: "https://github.com/austinjosephes/ResQMesh-DisasterManagement",
    image: "/images/full-ref.jpg",
    featured: true,
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    subtitle: "Creative Developer Portfolio",
    category: "Creative Developer Portfolio",
    description:
      "A personal portfolio showcasing creative design, interactive interfaces, web technologies and visual storytelling.",
    problemStatement:
      "Standard portfolio templates fail to reflect the nuance of high-end editorial design, realistic 3D lighting, and smooth interactive physics required by top-tier creative studios.",
    proposedSolution:
      "A bespoke luxury digital experience built with Next.js, Three.js metallic physics, GSAP smooth scroll choreography, and champagne-gold aesthetic depth.",
    features: [
      "Realistic 3D champagne-gold orbit rings with interactive lighting",
      "Glassmorphism cards with dynamic 3D perspective tilts",
      "Lenis smooth scroll choreography & GSAP timeline triggers",
      "Strict responsive fidelity across desktop, tablet, and mobile",
    ],
    technologies: ["Next.js", "React", "Three.js", "GSAP", "Lenis", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://portfolio-jenitjenson45-debug.vercel.app",
    githubUrl: "https://github.com/jenitjenson45-debug",
    image: "/images/design-ref.jpg",
    featured: true,
  },
];

export const CREATIVE_INTERESTS = [
  { name: "UI/UX Design", desc: "Crafting modern, intuitive interfaces" },
  { name: "Web Development", desc: "Interactive frontend & scalable web apps" },
  { name: "Cinematic Visuals", desc: "Atmospheric 3D lighting & motion graphics" },
  { name: "Branding", desc: "Distinctive identity & typography systems" },
  { name: "Tech Innovation", desc: "Exploring emerging digital frontiers" },
];
