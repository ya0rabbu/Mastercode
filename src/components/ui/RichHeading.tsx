import { cn } from "@/lib/utils";

export type HeadingTone = "strong" | "soft" | "accent";

export type HeadingSegment = {
  /** Keep leading/trailing spaces inside the string — they render as-is. */
  text: string;
  tone?: HeadingTone;
  weight?: 400 | 500 | 700 | 800;
};

/** Tone resolves differently on light vs dark surfaces. */
const surfaces = {
  light: { strong: "text-ink", soft: "text-ink-soft", accent: "text-cta" },
  dark: { strong: "text-on-brand", soft: "text-ink-muted", accent: "text-cta" },
} as const;

const weights = {
  400: "font-normal",
  500: "font-medium",
  700: "font-bold",
  800: "font-extrabold",
} as const;

type RichHeadingProps = {
  segments: HeadingSegment[];
  as?: "h1" | "h2" | "h3" | "p" | "blockquote";
  surface?: keyof typeof surfaces;
  /** Any text-* token class, e.g. "text-display" or "text-h1". */
  size?: string;
  /** Fallback weight for segments that don't set their own. */
  weight?: keyof typeof weights;
  capitalize?: boolean;
  className?: string;
};

export default function RichHeading({
  segments,
  as: Tag = "h2",
  surface = "light",
  size = "text-h1",
  weight = 500,
  capitalize = false,
  className,
}: RichHeadingProps) {
  const palette = surfaces[surface];

  return (
    <Tag
      className={cn("font-display", size, capitalize && "capitalize", className)}
    >
      {segments.map((segment, index) => (
        <span
          key={`${index}-${segment.text}`}
          className={cn(
            palette[segment.tone ?? "soft"],
            weights[segment.weight ?? weight]
          )}
        >
          {segment.text}
        </span>
      ))}
    </Tag>
  );
}