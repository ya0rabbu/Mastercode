"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Container from "./Container";

type Tone = "white" | "cream" | "deep";
type Space = "none" | "hero" | "section" | "cta";
type Gap = "none" | "block" | "wide" | "cta";

/** bg + default text colour always travel together. */
const tones: Record<Tone, string> = {
  white: "bg-bg-white text-ink",
  cream: "bg-bg text-ink",
  deep: "bg-bg-deep text-on-brand",
};

const spaces: Record<Space, string> = {
  none: "",
  hero: "pt-10 md:pt-14 lg:pt-[60px]",
  section: "py-16 md:py-24 lg:py-section",
  cta: "pt-16 pb-6 md:pt-24 lg:pt-section",
};

const gaps: Record<Gap, string> = {
  none: "",
  block: "gap-8 md:gap-10 lg:gap-block",
  wide: "gap-12 md:gap-16 lg:gap-section",
  cta: "gap-16 md:gap-24 lg:gap-cta-gap",
};

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  space?: Space;
  gap?: Gap;
  /** Skip the Container — for sections that manage their own inner box. */
  bleed?: boolean;
  className?: string;
  innerClassName?: string;
  /** ⬇️ Scroll-reveal controls. */
  reveal?: boolean;
  revealY?: number;
  revealDelay?: number;
  /** Viewport amount (0–1) that must be visible before reveal fires. */
  revealAmount?: number;
};

export default function Section({
  children,
  id,
  tone = "cream",
  space = "section",
  gap = "block",
  bleed = false,
  className,
  innerClassName,
  reveal = true,
  revealY = 48,
  revealDelay = 0,
  revealAmount = 0.18,
}: SectionProps) {
  const motionInner = (
    <motion.div
      className={cn(
        "flex w-full flex-col items-center",
        gaps[gap],
        innerClassName
      )}
      initial={
        reveal
          ? { opacity: 0, y: revealY, scale: 0.985, filter: "blur(6px)" }
          : false
      }
      whileInView={
        reveal
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      viewport={reveal ? { once: true, amount: revealAmount } : undefined}
      transition={
        reveal
          ? {
              duration: 0.9,
              delay: revealDelay,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.6 },
              filter: { duration: 0.75 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );

  return (
    <section
      id={id}
      className={cn("relative w-full", tones[tone], spaces[space], className)}
    >
      {bleed ? motionInner : <Container>{motionInner}</Container>}
    </section>
  );
}