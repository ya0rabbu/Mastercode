import { cn } from "@/lib/utils";

type GhostRingProps = {
  /** A border-color utility, e.g. "border-brand-active". */
  tone: string;
  className?: string;
};

/**
 * The hand-drawn loop around a pill button. It's a stroked ellipse sitting
 * BEHIND the pill, so only the arcs that escape the pill are visible — which
 * is why Figma reads as two loose strokes rather than a closed ring.
 *
 * Figma motion: rotate -2.93deg -> 0.21deg and scaleY -1 -> 1, i.e. the loop
 * flips vertically as it straightens. Spring, 1022ms. Parent needs `group`
 * and must NEVER have overflow-hidden.
 */
export default function GhostRing({ tone, className }: GhostRingProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -inset-y-7 rounded-[50%] border",
        "-rotate-[2.93deg] -scale-y-100",
        "transition-transform duration-1000 ease-spring",
        "group-hover:rotate-[0.21deg] group-hover:scale-y-100",
        tone,
        className
      )}
    />
  );
}
