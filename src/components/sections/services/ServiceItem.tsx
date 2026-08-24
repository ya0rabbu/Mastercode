import { cn } from "@/lib/utils";
import Prose from "@/components/ui/Prose";
import type { Service } from "@/data/services";

type ServiceItemProps = {
  service: Service;
  active: boolean;
  onSelect: () => void;
};

/** Figma StyledService: px 32 / py 28, radius 12, gap 12 title→summary. */
export default function ServiceItem({ service, active, onSelect }: ServiceItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "flex w-full flex-col items-start gap-3 rounded-card text-left",
        "px-6 py-5 transition-colors duration-300 lg:px-8 lg:py-7",
        active
          ? "bg-brand hover:bg-brand-hover"
          : "bg-surface hover:bg-surface-hover"
      )}
    >
      <h3
        className={cn(
          "font-display font-bold capitalize",
          "text-[22px] leading-[1.1] sm:text-[26px] lg:text-h3",
          active ? "text-on-cta" : "text-ink-soft"
        )}
      >
        {service.title}
      </h3>

      <Prose size="caption" tone={active ? "faint" : "soft"} className="capitalize">
        {service.summary}
      </Prose>
    </button>
  );
}
