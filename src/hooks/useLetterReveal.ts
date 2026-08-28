"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type LetterRevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
};

export function useLetterReveal<T extends HTMLElement = HTMLDivElement>({
  y = 110,
  stagger = 0.03,
  start = "top 85%",
}: LetterRevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", root);
      if (!letters.length) return;

      root.classList.add("reveal-hidden");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.remove("reveal-hidden");
        return;
      }

      gsap.from(letters, {
        opacity: 0,
        yPercent: y,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: root, start, once: true },
        onStart: () => root.classList.remove("reveal-hidden"),
      });
    },
    { scope: ref, dependencies: [y, stagger, start] }
  );

  return ref;
}