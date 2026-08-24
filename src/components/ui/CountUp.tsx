"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CountUpProps = {
  /** "1.7+", "35%", "25X", "10M" — the numeral counts up, prefix/suffix stay. */
  value: string;
  className?: string;
};

/** Counts 0 → target when the number scrolls into view (once). */
export default function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
      if (!match) return; // no numeral (e.g. "N/A") — leave the literal text
      const [, prefix, num, suffix] = match;
      const target = parseFloat(num);
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;
      const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = format(target);
        return;
      }

      const counter = { n: 0 };
      el.textContent = format(0);
      gsap.to(counter, {
        n: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  // SSR / no-JS renders the real value; the hook resets to 0 then counts.
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
    </span>
  );
}
