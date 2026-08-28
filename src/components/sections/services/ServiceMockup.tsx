"use client";

import { useRef } from "react";
import Image from "next/image";
import Prose from "@/components/ui/Prose";
import ServiceMockupBackdrop from "./ServiceMockupBackdrop";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Service } from "@/data/services";

type ServiceMockupProps = {
  service: Service;
};

export default function ServiceMockup({ service }: ServiceMockupProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = imgWrapRef.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    { dependencies: [service.mockup] }
  );

  return (
    <div className="flex flex-1 flex-col gap-4 self-stretch sm:gap-5">
      <div className="relative aspect-[648/432] w-full overflow-hidden rounded-card">
        <ServiceMockupBackdrop />
        <div
          ref={imgWrapRef}
          className="absolute left-[17.5%] top-[13.1%] h-[87.9%] w-[67.6%]"
        >
          <Image
            key={service.mockup}
            src={service.mockup}
            alt={`${service.title} preview`}
            fill
            sizes="(max-width: 1024px) 68vw, 438px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 items-start rounded-card bg-bg p-4 sm:p-5 outline outline-1 outline-line">
        <Prose size="base" tone="soft">
          {service.description}
        </Prose>
      </div>
    </div>
  );
}