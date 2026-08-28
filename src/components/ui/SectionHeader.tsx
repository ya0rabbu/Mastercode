import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type Surface = "light" | "dark";
type Size = "h1" | "h1Tight" | "h2" | "hero" | "cta";

const surfaces: Record<Surface, { title: string; body: string }> = {
  light: { title: "text-ink-soft", body: "text-ink-soft" },
  dark: { title: "text-on-cta", body: "text-ink-faint" },
};

/** Full literal strings so Tailwind's scanner can see every class. */
const sizes: Record<Size, string> = {
  hero: "text-[32px] leading-[1.05] sm:text-[40px] md:text-[56px] lg:text-hero",
  h1: "text-[28px] leading-[1.18] sm:text-[36px] md:text-[44px] lg:text-h1",
  h1Tight: "text-[32px] leading-[1.12] sm:text-[36px] md:text-[48px] lg:text-h1-tight",
  h2: "text-[22px] leading-[1.18] sm:text-[28px] md:text-[32px] lg:text-h2",
  cta: "text-[48px] leading-none sm:text-[52px] md:text-[56px] lg:text-h1-tight",
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
  /** Per-section subtitle overrides (e.g. CTA bumps mobile to 20px). */
  subtitleClassName?: string;
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
  subtitleClassName,
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
            "font-body text-[16px] leading-[1.5] sm:text-body-sm",
            palette.body,
            widths[subtitleWidth],
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}