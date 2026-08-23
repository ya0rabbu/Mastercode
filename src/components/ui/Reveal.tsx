"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  y?: number;
  delay?: number;
  stagger?: number;
  target?: string;
  /** Blur radius in px to melt away as the element settles. */
  blur?: number;
  className?: string;
};

export default function Reveal({
  children,
  y,
  delay,
  stagger,
  target,
  blur,
  className,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ y, delay, stagger, target, blur });

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {children}
    </div>
  );
}
