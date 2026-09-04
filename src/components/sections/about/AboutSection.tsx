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
  const proseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // ── 1. Heading: split every character → overflow-hidden wrapper ──
      const hEl = headingRef.current;
      if (hEl) {
        const spans = hEl.querySelectorAll("span > span");
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
      }

      // ── 2. Prose: split body into WORDS (not chars — body is calmer) ──
      const pEl = proseRef.current;
      if (pEl) {
        const raw = pEl.textContent || "";
        pEl.textContent = "";
        pEl.innerHTML = raw
          .split(/(\s+)/)
          .map((token) => {
            if (/^\s+$/.test(token)) {
              return `<span style="display:inline-block;width:0.28em"> </span>`;
            }
            return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.12em"><span style="display:inline-block" data-word>${token}</span></span>`;
          })
          .join("");
      }

      const chars = headingRef.current?.querySelectorAll("[data-char]") ?? [];
      const words = proseRef.current?.querySelectorAll("[data-word]") ?? [];

      // ════════════════════════════════════════════════════════════════
      // SMOOTH SCROLL-SCRUB TEXT REVEAL
      // ──────────────────────────────────────────────────────────────
      // NOT a one-time tween. Character progress FOLLOWS your scroll:
      //   • scroll slower → reveal slower
      //   • scroll back up → text masks itself again (reversible!)
      //   • scrub: 0.8 = 0.8s smooth easing lag behind the wheel
      //
      // Scrub window:
      //   start = when heading-top crosses 90% of viewport bottom area
      //   end   = when heading-top reaches 25% of viewport
      //   → ~65vh of scrolling to fully reveal.
      // ════════════════════════════════════════════════════════════════
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 92%",
          end: "top 22%",
          scrub: 0.8,
        },
      });

      // Phase 1 (0% → 72% of scroll): Headline chars slide + melt in.
      // yPercent: from below mask → settled
      // blur:     from soft → crisp (adds that "melt" premium feel)
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.007,
          ease: "none",
        },
        0
      );

      // Phase 2 (42% → 100% of scroll): BODY words trail the headline.
      // Starts slightly behind so you read headline → then body.
      tl.fromTo(
        words,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.018,
          ease: "none",
          duration: 0.6,
        },
        0.35
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
      reveal={false}
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

          <div
            ref={proseRef}
            className={
              // Exact equivalent of:
              //   <Prose tone="faint" size="sm" width="xl" align="center" className="text-[16px]! leading-[1.6]!">
              // — applied DIRECTLY because we overwrite this div's innerHTML.
              // If we wrapped <Prose> inside here, textContent="" would delete Prose's
              // element and drop all its styling (hence the centering bug).
              "font-body text-body-sm sm:text-body-sm text-ink-faint max-w-[824px] text-center text-[16px]! leading-[1.6]!"
            }
          >
            {about.body}
          </div>
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