import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import HeroTitle from "./HeroTitle";
import HeroPortrait from "./HeroPortrait";
import { hero } from "@/data/hero";

export default function HeroSection() {
  return (
    <Section id="home" tone="white" space="hero" gap="block">
      <HeroTitle />
      <Button href={hero.cta.href}>{hero.cta.label}</Button>
      <HeroPortrait />
    </Section>
  );
}