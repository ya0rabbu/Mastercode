import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceList from "./ServiceList";
import { servicesHeader } from "@/data/services";

export default function ServicesSection() {
  return (
    <Section id="services" tone="white" space="none" bleed className="py-5">
      <Container>
        {/* The cream rounded panel — Figma: py 80, radius 16 */}
        <div className="flex w-full flex-col items-center gap-8 rounded-frame bg-bg px-5 py-16 sm:px-10 md:gap-10 lg:gap-block lg:px-20 lg:py-section-sm">
          <SectionHeader
            title={servicesHeader.title}
            subtitle={servicesHeader.subtitle}
            size="h1Tight"
            subtitleWidth="sm"
          />
          <ServiceList />
        </div>
      </Container>
    </Section>
  );
}