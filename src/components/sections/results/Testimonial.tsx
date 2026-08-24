import Image from "next/image";

import RichHeading from "@/components/ui/RichHeading";
import ResultsLogo from "./ResultsLogo";
import { testimonial } from "@/data/results";

export default function Testimonial() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-8 sm:gap-10 lg:flex-row lg:gap-14">
      <ResultsLogo />

      <figure className="flex w-full flex-col items-start justify-center gap-4 sm:gap-5 lg:w-[700px] lg:gap-6">
        <Image
          src="/icons/quote.svg"
          alt=""
          width={40}
          height={34}
          aria-hidden="true"
          className="h-auto w-8 shrink-0 sm:w-10"
        />

        <blockquote className="w-full">
          <RichHeading
            as="p"
            segments={testimonial.quote}
            surface="dark"
            size="text-[20px] leading-[1.2] sm:text-[26px] md:text-[32px] lg:text-h2"
            weight={500}
          />
        </blockquote>

        <figcaption className="font-body text-[16px] font-medium leading-tight text-on-brand sm:text-[20px] lg:text-quote-name">
          {testimonial.author.name}
          <span className="text-ink-muted">, {testimonial.author.role}</span>
        </figcaption>
      </figure>
    </div>
  );
}
