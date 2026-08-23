"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScaleRuleProps = {
  /** A bg-color utility, e.g. "bg-line-strong". */
  tone?: string;
  delay?: number;
  className?: string;
};

/** Julian's `statistics-timeline`: a hairline that draws itself left to right. */
export default function ScaleRule({
  tone = "bg-line-strong",
  delay = 0,
  className,
}: ScaleRuleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          delay,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("block h-px w-full origin-left", tone, className)}
    />
  );
}
