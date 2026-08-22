import Link from "next/link";
import { cn } from "@/lib/utils";
import ArrowIcon from "./ArrowIcon";

type Variant = "cta" | "light";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  withArrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

const variants: Record<Variant, { pill: string; ring: string }> = {
  cta: {
    pill: "bg-cta text-on-cta hover:bg-cta-hover",
    ring: "border-brand-active",
  },
  light: {
    pill: "bg-on-cta text-ink hover:bg-surface",
    ring: "border-on-cta",
  },
};

/** Never put overflow-hidden on a parent — it would clip the ghost ring. */
export default function Button({
  children,
  href,
  variant = "cta",
  withArrow = true,
  type = "button",
  onClick,
  className,
}: ButtonProps) {
  const { pill, ring } = variants[variant];

  const face = cn(
    "relative z-10 inline-flex h-control items-center justify-center gap-2.5",
    "rounded-pill px-8 font-ui text-label font-medium lg:px-10",
    "transition-colors duration-300",
    pill
  );

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowIcon className="size-6 shrink-0" />}
    </>
  );

  return (
    <span className={cn("relative inline-flex h-control", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-pill border",
          "origin-top-left -translate-x-[3.74px] translate-y-[20.82px] -rotate-12",
          ring
        )}
      />
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