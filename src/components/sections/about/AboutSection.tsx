import Section from "@/components/ui/Section";
import RichHeading from "@/components/ui/RichHeading";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";
import { about, aboutHeadline } from "@/data/about";

export default function AboutSection() {
  return (
    <Section id="about" tone="deep" space="section" gap="block">
      <RichHeading
        segments={aboutHeadline}
        as="h2"
        surface="dark"
        size="text-[28px] leading-[1.14] sm:text-[44px] lg:text-h1"
        weight={500}
        className="max-w-[1058px] text-center"
      />

      <Prose tone="faint" size="sm" width="xl" align="center">
        {about.body}
      </Prose>

      <Button href={about.cta.href} variant="light">
        {about.cta.label}
      </Button>
    </Section>
  );
}