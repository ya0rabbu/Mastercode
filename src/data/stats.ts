export type Stat = {
  value: string;
  label?: string;
  description: string;
};

/** Process section — label + description above, giant number below. */
export const processStats: Stat[] = [
  {
    value: "1.7+",
    label: "Years of Hands-On Experience",
    description: "Designing across SaaS, healthcare, and fintech since day one.",
  },
  {
    value: "35%",
    label: "Reduction in User Friction",
    description:
      "Achieved through a full onboarding redesign for a telehealth platform.",
  },
  {
    value: "25%",
    label: "Faster Sign-up Time",
    description:
      "Streamlined navigation cut drop-off before users even got started.",
  },
  {
    value: "40%",
    label: "Increase in Mobile Engagement",
    description:
      "Responsive-first design decisions that actually moved the needle.",
  },
];

/** Results section — number first, short caption under it. */
export const resultStats: Stat[] = [
  { value: "25X", description: "revenue growth" },
  { value: "15%", description: "conversion rate" },
  { value: "10M", description: "average traffic" },
];