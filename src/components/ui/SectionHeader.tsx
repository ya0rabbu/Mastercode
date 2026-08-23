import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type Surface = "light" | "dark";
type Size = "h1" | "h1Tight" | "h2" | "hero";

const surfaces: Record<Surface, { title: string; body: string }> = {
  light: { title: "text-ink-soft", body: "text-ink-soft" },
  dark: { title: "text-on-cta", body: "text-ink-faint" },
};

/** Full literal strings so Tailwind's scanner can see every class. */
const sizes: Record<Size, string> = {
  hero: "text-[40px] leading-[1.05] sm:text-[64px] lg:text-hero",
  h1: "text-[36px] leading-[1.14] sm:text-[48px] lg:text-h1",
  h1Tight: "text-[36px] leading-[1.05] sm:text-[48px] lg:text-h1-tight",
  h2: "text-[28px] leading-[1.14] sm:text-[34px] lg:text-h2",
};

const widths = {
  none: "",
  sm: "max-w-[520px]",
  md: "max-w-[566px]",
  lg: "max-w-[636px]",
  xl: "max-w-[824px]",
} as const;

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  surface?: Surface;
  size?: Size;
  align?: "center" | "left";
  /** Figma caps the subtitle per section: 520 / 566 / 636 / 824px. */
  subtitleWidth?: keyof typeof widths;
  className?: string;
};

/** Title and subtitle blur in one after the other, like Julian's heading-block. */
export default function SectionHeader({
  title,
  subtitle,
  surface = "light",
  size = "h1Tight",
  align = "center",
  subtitleWidth = "sm",
  className,
}: SectionHeaderProps) {
  const palette = surfaces[surface];

  return (
    <Reveal
      blur={10}
      y={24}
      stagger={0.14}
      target="> *"
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <h2
        className={cn(
          "font-display font-bold capitalize",
          sizes[size],
          palette.title
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-body text-body-sm",
            palette.body,
            widths[subtitleWidth]
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
