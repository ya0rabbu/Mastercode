"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Axis = "x" | "y";

/** Base box + which scale property draws it. className can override the length. */
const axes: Record<Axis, { base: string; prop: "scaleX" | "scaleY" }> = {
  x: { base: "h-px w-full origin-left", prop: "scaleX" },
  y: { base: "h-full w-px origin-top", prop: "scaleY" },
};

type ScaleRuleProps = {
  /** A bg-color utility, e.g. "bg-line-strong". */
  tone?: string;
  axis?: Axis;
  delay?: number;
  className?: string;
};

/** Julian's `statistics-timeline`: a hairline that draws itself from its origin. */
export default function ScaleRule({
  tone = "bg-line-strong",
  axis = "x",
  delay = 0,
  className,
}: ScaleRuleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { base, prop } = axes[axis];

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { [prop]: 0 },
        {
          [prop]: 1,
          duration: 1.1,
          delay,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [delay, prop] }
  );

  return <span ref={ref} aria-hidden="true" className={cn("block", base, tone, className)} />;
}
