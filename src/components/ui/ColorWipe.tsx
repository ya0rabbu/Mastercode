import { cn } from "@/lib/utils";

type ColorWipeProps = {
  /** A bg utility, e.g. "bg-cta/80". */
  tone?: string;
  className?: string;
};

/**
 * Julian's `animation-color-background`: parked at translateY(101%) below the
 * card and wiping upward on hover. Needs a `group` ancestor with overflow-hidden.
 */
export default function ColorWipe({
  tone = "bg-cta/80",
  className,
}: ColorWipeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[5] translate-y-[101%]",
        "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]",
        "group-hover:translate-y-0",
        tone,
        className
      )}
    />
  );
}
