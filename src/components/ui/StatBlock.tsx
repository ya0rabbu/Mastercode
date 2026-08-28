// src/components/ui/StatBlock.tsx  (SUPERSEDES the Process-batch version)
import { cn } from "@/lib/utils";
import CountUp from "./CountUp";
import ScaleRule from "./ScaleRule";

type Variant = "process" | "result";

type StatBlockProps = {
  value: string;
  label?: string;
  description: string;
  variant?: Variant;
  /** Figma draws the divider with border-left; skip it on the first card. */
  divider?: boolean;
  className?: string;
};

export default function StatBlock({
  value,
  label,
  description,
  variant = "process",
  divider = true,
  className,
}: StatBlockProps) {
  const isProcess = variant === "process";

  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        // Process — mobile: 12px-gap left column; sm+ restores justify-between block.
        isProcess
          ? "gap-3 px-5 pb-4 pt-5 sm:justify-between sm:gap-8 sm:px-6 sm:pt-6 lg:h-stat-card"
          : "gap-4 p-5 sm:p-6 lg:p-8",
        divider &&
          (isProcess
            ? "border-t border-line-strong lg:border-l lg:border-t-0"
            : "border-t border-hair-warm lg:border-l lg:border-t-0"),
        className
      )}
    >
      {isProcess && (
        <div className="flex flex-col gap-3">
          {label && (
            <p className="font-display text-[16px] font-medium text-ink lg:text-h6">
              {label}
            </p>
          )}
          <p className="font-body text-note font-light text-ink-soft">
            {description}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <CountUp
          value={value}
          className={cn(
            "font-body text-[40px] leading-none sm:text-[48px] md:text-[64px] lg:text-stat",
            isProcess
              ? "font-bold tracking-[2px] sm:tracking-[4px] text-brand-hover"
              : "font-semibold text-on-cta"
          )}
        />
        <ScaleRule
          tone={isProcess ? "bg-line-strong" : "bg-hair-warm"}
          delay={0.4}
        />
      </div>

      {/* Result caption — mobile 16px (Figma StyledStatdescription), was 18px. */}
      {!isProcess && (
        <p className="font-body text-[16px] sm:text-h5 text-ink-faint">{description}</p>
      )}
    </div>
  );
}