import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceList from "./ServiceList";
import { servicesHeader } from "@/data/services";

export default function ServicesSection() {
  return (
    <Section id="services" tone="white" space="none" gap="none" bleed className="px-5 py-4 sm:py-5 lg:px-10">
      <div className="w-full rounded-frame bg-bg py-10 sm:py-14 md:py-20 lg:py-section-sm">
        <div className="mx-auto flex w-full max-w-[var(--container-shell)] flex-col items-center gap-8 px-5 sm:px-8 lg:gap-block lg:px-0">
          <SectionHeader
            title={servicesHeader.title}
            subtitle={servicesHeader.subtitle}
            size="h1Tight"
            subtitleWidth="sm"
          />
          <ServiceList />
        </div>
      </div>
    </Section>
  );
}
