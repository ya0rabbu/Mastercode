import Link from "next/link";
import { cn } from "@/lib/utils";
import ArrowIcon from "./ArrowIcon";

type Size = "sm" | "md" | "lg";
type Variant = "cta" | "deep" | "outline";

const sizes: Record<Size, { box: string; icon: string }> = {
  sm: { box: "rounded-card p-2", icon: "size-5" },
  md: { box: "rounded-card p-2", icon: "size-8" },
  lg: { box: "rounded-frame p-6", icon: "size-10" },
};

const variants: Record<Variant, string> = {
  cta: "bg-cta text-on-cta hover:bg-cta-hover",
  deep: "bg-cta-hover text-on-cta hover:bg-brand",
  outline: "border border-line-strong text-ink hover:bg-surface",
};

type IconButtonProps = {
  /** Accessible name — the icon alone conveys nothing to a screen reader. */
  label: string;
  href?: string;
  size?: Size;
  variant?: Variant;
  /** Custom icon; defaults to the ↗ arrow. */
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function IconButton({
  label,
  href,
  size = "sm",
  variant = "cta",
  children,
  onClick,
  className,
}: IconButtonProps) {
  const { box, icon } = sizes[size];

  const shell = cn(
    "inline-flex items-center justify-center transition-colors duration-300",
    box,
    variants[variant],
    className
  );

  const glyph = children ?? (
    <ArrowIcon direction="up-right" className={cn(icon, "shrink-0")} />
  );

  return href ? (
    <Link href={href} aria-label={label} className={shell}>
      {glyph}
    </Link>
  ) : (
    <button type="button" aria-label={label} onClick={onClick} className={shell}>
      {glyph}
    </button>
  );
}