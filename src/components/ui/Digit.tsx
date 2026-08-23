import { cn } from "@/lib/utils";

type DigitProps = {
  value: number;
  className?: string;
};

/**
 * One odometer column — Julian's `statistics-number-box`: five numerals
 * stacked inside a single-glyph window, the resting value last. The column
 * ships pre-translated so server HTML already shows the right number;
 * Odometer takes over the transform once GSAP mounts.
 */
export default function Digit({ value, className }: DigitProps) {
  const ladder = [6, 7, 8, 9, 10].map((step) => (value + step) % 10);

  return (
    <span className={cn("relative block h-[1em] overflow-hidden", className)}>
      <span
        data-odometer-col
        className="flex flex-col -translate-y-[80%] will-change-transform"
      >
        {ladder.map((digit, index) => (
          <span
            key={index}
            className="block h-[1em] leading-[1em] tabular-nums"
          >
            {digit}
          </span>
        ))}
      </span>
    </span>
  );
}
