import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import StatRow from "@/components/ui/StatRow";
import { resultsHeader } from "@/data/results";
import { resultStats } from "@/data/stats";
import Testimonial from "@/components/sections/results/Testimonial";

export default function ResultsSection() {
  return (
    <Section id="results" tone="deep" space="section" gap="block">
      <SectionHeader
        title={resultsHeader.title}
        subtitle={resultsHeader.subtitle}
        surface="dark"
        size="h1Tight"
        subtitleWidth="md"
        className="max-w-[780px]"
      />
<div className="flex w-full flex-col items-start gap-8">
        <Reveal target="> *" stagger={0.12}>
          <Testimonial />
        </Reveal>
        <Reveal target="> *" stagger={0.12}>
          <StatRow stats={resultStats} variant="result" />
        </Reveal>
      </div>
    </Section>
  );
}
