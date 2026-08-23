"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ScrollRotateOptions = {
  /** Degrees added across the whole scroll pass, relative to the rest angle. */
  amount?: number;
  scrub?: number;
};

/**
 * Julian's `cta-link-border`: rotation is scrubbed against scroll position —
 * measured at -3deg / 13.20deg / 10.60deg in three snapshots, so roughly a
 * 17deg swing. Rotation is applied RELATIVELY so Figma's rest angle survives.
 */
export function useScrollRotate<T extends HTMLElement = HTMLElement>({
  amount = 17,
  scrub = 1,
}: ScrollRotateOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(el, {
        rotate: `+=${amount}`,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
    },
    { scope: ref, dependencies: [amount, scrub] }
  );

  return ref;
}
