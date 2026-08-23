import Image from "next/image";

import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import FaqList from "./FaqList";
import { faqHeader, faqVisual } from "@/data/faq";

export default function FaqSection() {
  return (
    <Section id="faq" tone="cream" space="section" gap="block">
      <SectionHeader
        title={faqHeader.title}
        subtitle={faqHeader.subtitle}
        size="h1Tight"
        subtitleWidth="lg"
        className="max-w-[900px]"
      />

      <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
        <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-frame md:h-[460px] lg:h-[613px] lg:w-[624px]">
          <Image
            src={faqVisual.src}
            alt={faqVisual.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 624px"
            className="object-cover"
          />
        </div>

        <FaqList />
      </div>
    </Section>
  );
}