import type { HeadingSegment } from "@/components/ui/RichHeading";

export const resultsHeader = {
  title: "The Results Speak For Themselves",
  subtitle:
    "Every product is different, but the process stays sharp — discovery, structure, design, and handoff, done in an order that actually prevents chaos later.",
};

const quote: HeadingSegment[] = [
  { text: "Yasir's ability to ", tone: "soft" },
  { text: "translate complex ", tone: "strong" },
  { text: "healthcare workflows into ", tone: "soft" },
  { text: "simple", tone: "strong" },
  { text: ", ", tone: "soft" },
  { text: "intuitive interfaces", tone: "strong" },
  { text: " was a game changer for our platform. ", tone: "soft" },
  { text: "Highly recommend ", tone: "strong" },
  { text: "him for any ", tone: "soft" },
  { text: "product", tone: "strong" },
  { text: " needing both design polish and ", tone: "soft" },
  { text: "real usability", tone: "strong" },
  { text: " thinking.", tone: "soft" },
];

export const testimonial = {
  quote,
  /** Julian splits these into two spans so the role can sit at a lower tone. */
  author: { name: "Raj Gupta", role: "Founder at Heva" },
  logo: { src: "/images/testimonial-heva.png", alt: "Heva", width: 350, height: 161 },
};
