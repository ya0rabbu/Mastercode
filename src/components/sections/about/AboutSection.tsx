import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import ScaleRule from "@/components/ui/ScaleRule";
import RichHeading from "@/components/ui/RichHeading";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";
import RuledAction from "@/components/ui/RuledAction";
import { about, aboutHeadline } from "@/data/about";

export default function AboutSection() {
  return (
    <Section
      id="about"
      tone="deep"
      gap="block"
      space="none"
      className="py-12 md:py-20 lg:pt-[50px] lg:pb-[100px]"
    >
      <Stack gap="md">
        <ScaleRule axis="y" tone="bg-hair-light" className="h-[80px] sm:h-[120px] lg:h-[200px]" />

        <Stack gap="sm">
          <RichHeading
            segments={aboutHeadline}
            as="h2"
            surface="dark"
            size="text-[24px] leading-[1.2] sm:text-[32px] md:text-[44px] lg:text-h1"
            weight={500}
            capitalize
            className="max-w-[1058px] text-center"
          />

          <Prose tone="faint" size="sm" width="xl" align="center">
            {about.body}
          </Prose>
        </Stack>
      </Stack>

      <RuledAction tone="dark">
        <Button href={about.cta.href} variant="light">
          {about.cta.label}
        </Button>
      </RuledAction>
    </Section>
  );
}
