import { cn } from "@/lib/utils";

type Size = "feature" | "thumb";

/** Figma: feature bar = 24px padding, thumbnail bar = 16px / 12px. */
const paddings: Record<Size, string> = {
  feature: "p-4 lg:p-6",
  thumb: "px-3 py-2.5 lg:px-4 lg:py-3",
};

type ProjectCaptionProps = {
  children: React.ReactNode;
  action?: React.ReactNode;
  size?: Size;
  className?: string;
};

export default function ProjectCaption({
  children,
  action,
  size = "thumb",
  className,
}: ProjectCaptionProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-between gap-4",
        "rounded-card border border-hair-card bg-bg-slate",
        paddings[size],
        className
      )}
    >
      <div className="flex flex-1 flex-col items-start gap-4">{children}</div>
      {action}
    </div>
  );
}