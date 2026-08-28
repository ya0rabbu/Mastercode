"use client";

import Image from "next/image";
import Link from "next/link";

import ArrowIcon from "@/components/ui/ArrowIcon";
import ScrollRing from "@/components/ui/ScrollRing";
import SplitLetters from "@/components/ui/SplitLetters";
import { useLetterReveal } from "@/hooks/useLetterReveal";
import { cta } from "@/data/site";

/**
 * Figma: 1066x300 stage. Pill at left:0 / top:2px, a 5.61px ghost ring rotated
 * -168deg from its own top-left (scroll scrubs it further), and the avatar as a
 * SIBLING of the link so it never eats the click. No overflow-hidden anywhere.
 */
export default function CtaButton() {
  const ref = useLetterReveal<HTMLDivElement>({ y: 110, stagger: 0.035 });

  return (
    <div ref={ref} className="relative w-full max-w-[1066px] lg:h-cta-block">
      <ScrollRing
        amount={17}
        className="left-0 top-0 hidden h-[297px] w-[1066px] origin-top-left translate-x-[1023.71px] translate-y-[406.51px] -rotate-[168deg] rounded-cta border-[5.61px] border-cta lg:block"
      />

      <Link
        href={cta.action.href}
        className="group relative z-10 flex w-full items-center justify-center gap-4 rounded-[48px] bg-cta px-6 py-8 text-center transition-colors duration-300 hover:bg-cta-hover sm:gap-6 sm:rounded-[80px] sm:px-10 sm:py-12 md:py-16 lg:absolute lg:left-0 lg:top-[2px] lg:gap-12 lg:rounded-cta lg:px-[170px] lg:py-[84px]"
      >
        <SplitLetters className="font-ui text-[26px] font-medium leading-tight text-on-cta sm:text-[32px] md:text-[48px] lg:text-cta-xl">
          {cta.action.label}
        </SplitLetters>

        <ArrowIcon className="size-8 shrink-0 text-on-cta transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-2 group-hover:-translate-y-2 sm:size-12 lg:size-[110px]" />
      </Link>

      <Image
        src={cta.avatar.src}
        alt={cta.avatar.alt}
        width={140}
        height={140}
        className="pointer-events-none absolute -left-[41px] -top-[61px] z-20 hidden size-[140px] rounded-full border-[5px] border-on-cta object-cover lg:block"
      />
    </div>
  );
}