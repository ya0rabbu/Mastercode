import ProcessStepCard from "@/components/sections/process/ProcessStepCard";
import { processSteps } from "@/data/process";

export default function ProcessSteps() {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step) => (
        <ProcessStepCard key={step.id} step={step} />
      ))}
    </div>
  );
}