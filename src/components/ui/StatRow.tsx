import StatBlock from "@/components/ui/StatBlock";
import { cn } from "@/lib/utils";

export type Stat = {
  value: string;
  label?: string;
  description: string;
};

type StatRowProps = {
  stats: Stat[];
  variant?: "process" | "result";
  className?: string;
};

export default function StatRow({ stats, variant = "process", className }: StatRowProps) {
  return (
    <div className={cn("flex w-full flex-col lg:flex-row", className)}>
      {stats.map((stat, index) => (
        <StatBlock
          key={`${stat.value}-${index}`}
          value={stat.value}
          label={stat.label}
          description={stat.description}
          variant={variant}
          divider={index > 0}
        />
      ))}
    </div>
  );
}