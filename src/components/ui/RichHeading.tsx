import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type HeadingTone = "strong" | "soft" | "accent";

export type HeadingSegment = {
  text: string;
  tone?: HeadingTone;
  weight?: 400 | 500 | 700 | 800;
};

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
  size?: string;
  weight?: keyof typeof weights;
  capitalize?: boolean;
  className?: string;
};

const RichHeading = forwardRef<HTMLHeadingElement, RichHeadingProps>(
  (
    {
      segments,
      as: Tag = "h2",
      surface = "light",
      size = "text-h1",
      weight = 500,
      capitalize = false,
      className,
    },
    ref
  ) => {
    const palette = surfaces[surface];

    return (
      <Tag
        ref={ref as any}
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
);

RichHeading.displayName = "RichHeading";

export default RichHeading;