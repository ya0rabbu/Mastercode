"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type LetterRevealOptions = {
  /** Travel distance as a percentage of each glyph's own height. */
  y?: number;
  stagger?: number;
  start?: string;
};

/** Staggers every [data-letter] inside the ref once it scrolls into view. */
export function useLetterReveal<T extends HTMLElement = HTMLDivElement>({
  y = 110,
  stagger = 0.03,
  start = "top 85%",
}: LetterRevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>(
        "[data-letter]",
        ref.current
      );
      if (!letters.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(letters, {
        opacity: 0,
        yPercent: y,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref, dependencies: [y, stagger, start] }
  );

  return ref;
}
