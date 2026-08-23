import { cn } from "@/lib/utils";

type SplitLettersProps = {
  children: string;
  className?: string;
  letterClassName?: string;
};

/**
 * Julian's `cta-link-text`: every glyph is its own element so GSAP can stagger
 * them. A space becomes a fixed-width cell (Webflow calls it `.gap`) rather
 * than a text node, so the stagger index stays clean.
 */
export default function SplitLetters({
  children,
  className,
  letterClassName,
}: SplitLettersProps) {
  return (
    <span className={cn("inline-flex", className)} aria-label={children}>
      {[...children].map((char, index) =>
        char === " " ? (
          <span
            key={index}
            aria-hidden="true"
            className="inline-block w-[0.28em]"
          />
        ) : (
          <span
            key={index}
            aria-hidden="true"
            data-letter
            className={cn("inline-block will-change-transform", letterClassName)}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}
