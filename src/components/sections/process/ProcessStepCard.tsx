import Image from "next/image";

import Prose from "@/components/ui/Prose";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/data/process";

type ProcessStepCardProps = {
  step: ProcessStep;
  className?: string;
};

export default function ProcessStepCard({ step, className }: ProcessStepCardProps) {
  return (
    <article className={cn("flex flex-col items-center gap-6 p-6", className)}>
      <Image src={step.icon} alt="" width={56} height={56} aria-hidden="true"
        className="size-14 shrink-0"
      />

      <h3 className="text-center font-display text-[20px] font-bold leading-none tracking-[1px] text-ink lg:text-[24px]">
        {step.title}
      </h3>

      <Prose size="sm" align="center" className="max-w-[254px] leading-6">
        {step.description}
      </Prose>
    </article>
  );
}