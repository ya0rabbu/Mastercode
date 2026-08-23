"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Digit from "./Digit";

type OdometerProps = {
  /** "1.7+", "35%", "25X", "10M" — digits roll, other glyphs stay put. */
  value: string;
  className?: string;
};

/** Each digit column rolls up four numerals and lands on its value. */
export default function Odometer({ value, className }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const cols = gsap.utils.toArray<HTMLElement>(
        "[data-odometer-col]",
        ref.current
      );
      if (!cols.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cols, { yPercent: -80 });
        return;
      }

      gsap.fromTo(
        cols,
        { yPercent: 0 },
        {
          yPercent: -80,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={cn("inline-flex items-baseline", className)}>
      {[...value].map((char, index) =>
        /\d/.test(char) ? (
          <Digit key={index} value={Number(char)} />
        ) : (
          <span key={index} className="block">
            {char}
          </span>
        )
      )}
    </span>
  );
}
