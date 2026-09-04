export type Project = {
  slug: string;
  title: string;
  image: string;
  href: string;
};

export type FeaturedProject = Project & { description: string };

export const projectsHeader = {
  title: "My Latest Project",
  subtitle:
    "Great design doesn't happen by accident. It's a process one Yasir has " +
    "refined project after project, so nothing gets missed and nothing " +
    "feels rushed.",
};

export const featuredProject: FeaturedProject = {
  slug: "hexon",
  title: "HEXON | Cybersecurity SaaS Landing Page",
  description:
    "Designed a high-conviction landing page for HEXON — an AI-powered " +
    "autonomous threat defence platform built for the modern enterprise. " +
    "The brief was simple: stop looking like every other \u201Cwe detect " +
    "threats\u201D SaaS site. Stop selling fear. Start selling decisive action.",
  image: "/images/project-hexon-hero.png",
  href: "https://dribbble.com/shots/27412079-HEXON-Cybersecurity-SaaS-Landing-Page",
};

export const projects: Project[] = [
  {
    slug: "hexon",
    title: "HEXON",
    image: "/images/project-hexon.png",
    href: "https://dribbble.com/shots/27412079-HEXON-Cybersecurity-SaaS-Landing-Page",
  },
  {
    slug: "void-studio",
    title: "VOID/STUDIO",
    image: "/images/project-void-studio.png",
    href: "https://dribbble.com/shots/27359253-VOID-STUDIO-Dark-Agency-Landing-Page-UI",
  },
  {
    slug: "alpinevista",
    title: "AlpineVista",
    image: "/images/project-alpinevista.jpg",
    href: "https://dribbble.com/shots/26802463-AlpineVista-Ski-Resort-Winter-Vacation-Website",
  },
];

export const projectsCta = { label: "View more projects", href: "https://dribbble.com/yasirabedrabbu" };