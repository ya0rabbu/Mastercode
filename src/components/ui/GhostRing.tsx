import { cn } from "@/lib/utils";

type GhostRingProps = {
  /** A border-color utility, e.g. "border-brand-active". */
  tone: string;
  className?: string;
};

const ring = cn(
  "pointer-events-none absolute inset-0 rounded-pill border",
  "-rotate-12 transition-transform duration-1000 ease-spring",
  "group-hover:rotate-0 group-focus-visible:rotate-0"
);

export default function GhostRing({ tone, className }: GhostRingProps) {
  return <span aria-hidden="true" className={cn(ring, tone, className)} />;
}
