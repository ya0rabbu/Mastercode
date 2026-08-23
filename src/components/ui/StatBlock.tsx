import { cn } from "@/lib/utils";
import Odometer from "./Odometer";
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
        isProcess
          ? "justify-between gap-8 px-6 pb-4 pt-6 lg:h-stat-card"
          : "gap-4 p-6 lg:p-8",
        divider &&
          (isProcess
            ? "lg:border-l lg:border-line-strong"
            : "lg:border-l lg:border-hair-warm"),
        className
      )}
    >
      {isProcess && (
        <div className="flex flex-col gap-3">
          {label && (
            <p className="font-display text-h6 font-medium text-ink">{label}</p>
          )}
          <p className="font-body text-note font-light text-ink-soft">
            {description}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Odometer
          value={value}
          className={cn(
            "font-body text-[48px] leading-none sm:text-[64px] lg:text-stat",
            isProcess
              ? "font-bold tracking-[4px] text-brand-hover"
              : "font-semibold text-on-cta"
          )}
        />
        <ScaleRule
          tone={isProcess ? "bg-line-strong" : "bg-hair-warm"}
          delay={0.4}
        />
      </div>

      {!isProcess && (
        <p className="font-body text-h5 text-ink-faint">{description}</p>
      )}
    </div>
  );
}
