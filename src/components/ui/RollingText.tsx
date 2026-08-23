import { cn } from "@/lib/utils";

type Direction = "up" | "down";

/** Full literal strings so Tailwind's scanner can see every class. */
const directions: Record<Direction, { shift: string; ghost: string }> = {
  up: { shift: "group-hover:-translate-y-full", ghost: "top-full" },
  down: { shift: "group-hover:translate-y-full", ghost: "bottom-full" },
};

type RollingTextProps = {
  children: string;
  direction?: Direction;
  className?: string;
};

/**
 * Marquee / Text Reveal hover. The label is printed twice: copy #1 sits in the
 * one-line window, copy #2 is parked flush against it just out of view. Hover
 * shifts the pair exactly one line, so copy #1 exits and copy #2 lands in place.
 * Figma measures the travel at 34px — one line-height — on a spring over 1022ms.
 * Parent MUST carry `group`.
 */
export default function RollingText({
  children,
  direction = "up",
  className,
}: RollingTextProps) {
  const { shift, ghost } = directions[direction];

  return (
    <span className="relative block overflow-hidden whitespace-nowrap">
      <span
        className={cn(
          "relative block transition-transform duration-1000 ease-spring",
          shift,
          className
        )}
      >
        <span className="block">{children}</span>
        <span aria-hidden="true" className={cn("absolute left-0 block w-full", ghost)}>
          {children}
        </span>
      </span>
    </span>
  );
}
