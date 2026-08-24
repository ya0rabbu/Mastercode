export type Service = {
  title: string;
  summary: string;
  /** Shown in the right-hand panel when this row is active. */
  mockup: string;
  description: string;
};

export const servicesHeader = {
  title: "What I can do For You",
  subtitle:
    "Design isn't just how it looks — it's how it works, how it feels, " +
    "and how easy it is to trust. Here's everything Yasir brings to make " +
    "that happen.",
};

const sharedMockup = "/images/service-mockup.png";

export const services: Service[] = [
  {
    title: "Product Design",
    summary: "End-to-end UI/UX for web & mobile",
    mockup: sharedMockup,
    description:
      "I oversee the complete design process, turning a blank canvas into " +
      "a product ready for launch. This involves researching user needs, " +
      "crafting wireframes, designing high-fidelity user interfaces, and " +
      "building a scalable design system. My focus is on ensuring that " +
      "every design decision aligns with both user requirements and " +
      "business goals, creating a seamless experience that resonates with " +
      "users and meets strategic objectives. Ultimately, I strive to " +
      "innovate and elevate the UX at every stage.",
  },
  {
    title: "Design Systems",
    summary: "Scalable, token-based systems in Figma",
    mockup: sharedMockup,
    description:
      "Tokens, variants and documented rules, so your team ships new " +
      "screens without redesigning the basics every sprint.",
  },
  {
    title: "UX Research",
    summary: "User research, wireframing, usability testing",
    mockup: sharedMockup,
    description:
      "Talking to real users before pixels get pushed, then validating " +
      "flows with testing so decisions rest on evidence, not taste.",
  },
  {
    title: "Developer Handoff",
    summary: "Pixel-perfect Figma specs, zero back-and-forth",
    mockup: sharedMockup,
    description:
      "Specs, states and edge cases spelled out up front — engineers " +
      "build straight from the file without a single clarifying ping.",
  },
  {
    title: "Frontend Prototyping",
    summary: "Next.js / React / Tailwind builds",
    mockup: sharedMockup,
    description:
      "When static frames aren't enough, I build the real thing so you " +
      "can feel the interaction before committing to it.",
  },
];
