import Link from "next/link";
import { cn } from "@/lib/utils";
import ArrowIcon from "./ArrowIcon";
import GhostRing from "./GhostRing";
import RollingText from "./RollingText";

type Variant = "cta" | "light";

type ButtonProps = {
  /** String only — RollingText duplicates the label to roll it. */
  children: string;
  href?: string;
  variant?: Variant;
  withArrow?: boolean;
  /** Figma has instances rolling both ways; "up" is the default. */
  rollDirection?: "up" | "down";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

/** Background and arrow stay put — the text slide is the whole effect. */
const variants: Record<Variant, { pill: string; ring: string }> = {
  cta: { pill: "bg-cta text-on-cta", ring: "border-brand-active" },
  light: { pill: "bg-on-cta text-ink", ring: "border-on-cta" },
};

/** `group` on the outer span drives the text roll AND the loop. */
export default function Button({
  children,
  href,
  variant = "cta",
  withArrow = true,
  rollDirection = "up",
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const { pill, ring } = variants[variant];

  const face = cn(
    "relative z-10 inline-flex h-[48px] items-center justify-center gap-1",
    "rounded-pill px-5 font-ui text-[14px] font-medium sm:h-control sm:px-8 sm:text-label lg:px-10 lg:gap-2",
    pill
  );

  const inner = (
    <>
      <RollingText direction={rollDirection}>{children}</RollingText>
      {withArrow && <ArrowIcon className="size-6 shrink-0" />}
    </>
  );

  return (
    <span className={cn("group relative inline-flex h-[48px] sm:h-control", className)}>
      <GhostRing tone={ring} />
      {href ? (
        <Link href={href} className={face}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={face}>
          {inner}
        </button>
      )}
    </span>
  );
}
