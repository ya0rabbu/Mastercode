import { cn } from "@/lib/utils";

type Tone = "ink" | "soft" | "muted" | "faint" | "onBrand";
type Size = "lg" | "base" | "sm" | "note" | "caption";
type Width = "none" | "sm" | "md" | "lg" | "xl";

const tones: Record<Tone, string> = {
  ink: "text-ink",
  soft: "text-ink-soft",
  muted: "text-ink-muted",
  faint: "text-ink-faint",
  onBrand: "text-on-brand",
};

const sizes: Record<Size, string> = {
  lg: "text-[18px] leading-[1.55] sm:text-body-lg",
  base: "text-[15px] leading-[1.6] sm:text-body",
  sm: "text-[14px] leading-[1.55] sm:text-body-sm",
  note: "text-[13px] leading-[1.5] sm:text-note",
  caption: "text-[13px] leading-[1.45] sm:text-caption",
};

/** Figma caps body copy at these four widths depending on the section. */
const widths: Record<Width, string> = {
  none: "",
  sm: "max-w-[520px]",
  md: "max-w-[566px]",
  lg: "max-w-[636px]",
  xl: "max-w-[824px]",
};

type ProseProps = {
  children: React.ReactNode;
  as?: "p" | "div" | "span";
  tone?: Tone;
  size?: Size;
  width?: Width;
  align?: "left" | "center";
  className?: string;
};

export default function Prose({
  children,
  as: Tag = "p",
  tone = "soft",
  size = "sm",
  width = "none",
  align = "left",
  className,
}: ProseProps) {
  return (
    <Tag
      className={cn(
        "font-body",
        sizes[size],
        tones[tone],
        widths[width],
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </Tag>
  );
}