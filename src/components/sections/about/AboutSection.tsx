"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Section from "@/components/ui/Section";
import Stack from "@/components/ui/Stack";
import ScaleRule from "@/components/ui/ScaleRule";
import RichHeading from "@/components/ui/RichHeading";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";
import RuledAction from "@/components/ui/RuledAction";
import { about, aboutHeadline } from "@/data/about";

export default function AboutSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = headingRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // সব span গুলো নাও
      const spans = el.querySelectorAll("span > span");
      if (!spans.length) return;

      // প্রতিটা span কে character এ ভাগ করো
      spans.forEach((span) => {
        const text = span.textContent || "";
        span.textContent = "";
        span.innerHTML = [...text]
          .map((char) =>
            char === " "
              ? `<span style="display:inline-block;width:0.28em"> </span>`
              : `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block" data-char>${char}</span></span>`
          )
          .join("");
      });

      const chars = el.querySelectorAll("[data-char]");

      // slide up from bottom
      gsap.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.018,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: headingRef }
  );

  return (
    <Section
      id="about"
      tone="deep"
      gap="block"
      space="none"
      className="pt-0 pb-12 md:pb-20 lg:pb-[100px]"
    >
      <Stack gap="md">
        <ScaleRule axis="y" tone="bg-hair-light" className="h-[80px] sm:h-[120px] lg:h-[200px]" />

        <Stack gap="sm">
          <RichHeading
            ref={headingRef}
            segments={aboutHeadline}
            as="h2"
            surface="dark"
            size="text-[36px] leading-[1.14] md:text-[44px] lg:text-h1"
            weight={500}
            capitalize
            className="max-w-[1058px] text-center"
          />

          <Prose
            tone="faint"
            size="sm"
            width="xl"
            align="center"
            className="text-[16px]! leading-[1.6]!"
          >
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