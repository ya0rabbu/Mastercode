"use client";

import { useScrollRotate } from "@/hooks/useScrollRotate";
import { cn } from "@/lib/utils";

type ScrollRingProps = {
  /** Degrees of extra rotation across the scroll pass. */
  amount?: number;
  className?: string;
};

/**
 * A decorative outline whose rotation is tied to scroll rather than hover.
 * The caller owns size, offset, rest angle, radius and border — this only
 * adds the scrubbed spin on top.
 */
export default function ScrollRing({ amount, className }: ScrollRingProps) {
  const ref = useScrollRotate<HTMLSpanElement>({ amount });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    />
  );
}
