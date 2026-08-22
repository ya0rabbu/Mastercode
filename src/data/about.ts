import type { HeadingSegment } from "@/components/ui/RichHeading";

/** Two-tone headline. Spaces live inside the strings — don't trim them. */
export const aboutHeadline: HeadingSegment[] = [
  { text: "Yasir", tone: "strong" },
  { text: " designs for the ", tone: "soft" },
  { text: "moments", tone: "strong" },
  { text: " that matter — clear, ", tone: "soft" },
  { text: "friction-free", tone: "strong" },
  { text: " products ", tone: "soft" },
  { text: "across SaaS", tone: "strong" },
  { text: ", healthcare and fintech, built around ", tone: "soft" },
  { text: "real user", tone: "strong" },
  { text: " needs.", tone: "soft" },
];

export const about = {
  body:
    "It started with a simple idea — that good design shouldn't be noticed, " +
    "it should just work. That idea took Yasir across healthcare platforms " +
    "where confusion cost people care, fintech products where trust was " +
    "everything, and SaaS tools people used every single day.",
  cta: { label: "Read more", href: "#projects" },
};