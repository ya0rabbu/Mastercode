import Image from "next/image";

import RichHeading from "@/components/ui/RichHeading";
import ResultsLogo from "./ResultsLogo";
import { testimonial } from "@/data/results";

export default function Testimonial() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-10 lg:flex-row lg:gap-14">
      <ResultsLogo />

      <figure className="flex w-full flex-col items-start justify-center gap-4 lg:w-[700px]">
        <Image
          src="/icons/quote.svg"
          alt=""
          width={40}
          height={34}
          aria-hidden="true"
          className="h-auto w-10 shrink-0"
        />

        <blockquote className="w-full">
          <RichHeading
            as="p"
            segments={testimonial.quote}
            surface="dark"
            size="text-[26px] leading-[1.14] sm:text-[32px] lg:text-h2"
            weight={500}
          />
        </blockquote>

        <figcaption className="font-body text-[20px] font-medium leading-tight text-on-brand lg:text-quote-name">
          {testimonial.author.name}
          <span className="text-ink-muted">, {testimonial.author.role}</span>
        </figcaption>
      </figure>
    </div>
  );
}
