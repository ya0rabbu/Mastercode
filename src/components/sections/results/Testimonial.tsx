// src/components/sections/results/Testimonial.tsx
import Image from "next/image";

import RichHeading from "@/components/ui/RichHeading";
import ResultsLogo from "./ResultsLogo";
import { testimonial } from "@/data/results";

export default function Testimonial() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-8 sm:gap-10 lg:flex-row lg:gap-14">
      <ResultsLogo />

      <figure className="flex w-full flex-col items-start justify-center gap-4 sm:gap-5 lg:w-[700px] lg:gap-6">
        {/* Figma StyledVector34: quote mark is 40px on mobile (was 32px). */}
        <Image
          src="/icons/quote.svg"
          alt=""
          width={40}
          height={34}
          aria-hidden="true"
          className="h-auto w-10 shrink-0"
        />

        <blockquote className="w-full">
          {/* Mobile 32px Cabinet-500, line-height 39.68px (1.24); scales to h2 (40px) at lg. */}
          <RichHeading
            as="p"
            segments={testimonial.quote}
            surface="dark"
            size="text-[32px] leading-[1.24] md:text-[36px] lg:text-h2"
            weight={500}
          />
        </blockquote>

        {/* Figma hides the author name and role on phones — the short featured frame shows quote only. */}
        <figcaption className="hidden font-body text-[16px] font-medium leading-tight text-on-brand sm:text-[20px] lg:text-quote-name md:block">
          {testimonial.author.name}
          <span className="text-ink-muted">, {testimonial.author.role}</span>
        </figcaption>
      </figure>
    </div>
  );
}