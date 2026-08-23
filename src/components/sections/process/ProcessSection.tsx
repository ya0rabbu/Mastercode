import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import StatRow from "@/components/ui/StatRow";
import { processHeader } from "@/data/process";
import { processStats } from "@/data/stats";
import ProcessSteps from "./ProcessSteps";

export default function ProcessSection() {
  return (
    <Section id="process" tone="white" space="section" gap="wide">
      <div className="flex w-full flex-col items-center gap-8 lg:gap-block">
        <SectionHeader
          title={processHeader.title}
          subtitle={processHeader.subtitle}
          size="h1Tight"
          subtitleWidth="lg"
          className="max-w-[900px]"
        />
        <ProcessSteps />
      </div>

      <StatRow stats={processStats} variant="process" />
    </Section>
  );
}