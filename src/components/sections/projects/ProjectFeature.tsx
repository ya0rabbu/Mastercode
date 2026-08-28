"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconButton from "@/components/ui/IconButton";
import { featuredProject, projects } from "@/data/projects";

// featured সামনে, বাকি দুটো পেছনে
const allProjects = [
  {
    slug: featuredProject.slug,
    title: featuredProject.title,
    description: featuredProject.description,
    image: featuredProject.image,
    href: featuredProject.href,
  },
  ...projects
    .filter((p) => p.slug !== featuredProject.slug)
    .map((p) => ({ ...p, description: "" })),
];

// Figma: card offsets — সামনেরটা left:0, মাঝেরটা left:50 top:40, পেছনেরটা left:100 top:0
const CARD_OFFSETS = [
  { left: 0,   top: 111, width: 1320, height: 760  }, // সামনে (featured)
  { left: 50,  top: 40,  width: 1220, height: 702  }, // মাঝে
  { left: 100, top: 0,   width: 1120, height: 645  }, // পেছনে
];

export default function ProjectFeature() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      if (cards.length < 2) return;

      // pin করো
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(cards.length - 1) * 700}`,
        pin: true,
        pinSpacing: true,
      });

      // প্রতিটা card scroll করলে উপরে উঠে যাবে
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top+=${i * 700} top`,
          end: `top+=${(i + 1) * 700} top`,
          scrub: 1.2,
          onUpdate: (self) => {
            gsap.set(card, {
              yPercent: -120 * self.progress,
              opacity: 1 - self.progress,
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    // Figma: 1320 × 871 container
    <div
      ref={containerRef}
      className="relative mx-auto w-full"
      style={{ height: "871px", maxWidth: "1320px" }}
    >
      {/* reverse করে render করি — পেছনেরটা আগে, সামনেরটা শেষে */}
      {[...allProjects].reverse().map((project, reversedI) => {
        const i = allProjects.length - 1 - reversedI;
        const offset = CARD_OFFSETS[i];
        const zIndex = i + 1;

        return (
          <div
            key={project.slug}
            data-project-card
            className="absolute overflow-hidden rounded-frame"
            style={{
              left: `${(offset.left / 1320) * 100}%`,
              top: offset.top,
              width: `${(offset.width / 1320) * 100}%`,
              height: offset.height,
              zIndex,
              outline: "2px white solid",
            }}
          >
            {/* image */}
            <div className="relative h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover"
                priority={i === 0}
              />

              {/* caption — Figma: p-5, dark bg, outline */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div
                  className="flex items-center justify-between gap-6 rounded-card bg-bg-slate p-5"
                  style={{ outline: "1px rgba(232,216,208,0.20) solid" }}
                >
                  {/* text */}
                  <div className="flex flex-1 flex-col gap-4">
                    <h3 className="font-display text-[28px] font-bold capitalize leading-none text-on-cta">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="font-body text-[16px] font-medium capitalize leading-[1.6] text-on-brand">
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* arrow button */}
                  <IconButton
                    label={`Open ${project.title}`}
                    href={project.href}
                    size="lg"
                    variant="deep"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}