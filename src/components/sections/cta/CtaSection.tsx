import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaButton from "./CtaButton";
import SocialGrid from "./SocialGrid";
import { cta } from "@/data/site";

export default function CtaSection() {
  return (
    <Section id="contact" tone="cream" space="cta" gap="cta">
      <div className="flex w-full flex-col items-center gap-10 lg:gap-block">
        <SectionHeader
          title={cta.title}
          subtitle={cta.subtitle}
          size="h1Tight"
          subtitleWidth="lg"
          className="max-w-[560px]"
        />
        <CtaButton />
      </div>

      <div className="flex w-full flex-col gap-12">
        <SocialGrid />
        <Footer />
      </div>
    </Section>
  );
}