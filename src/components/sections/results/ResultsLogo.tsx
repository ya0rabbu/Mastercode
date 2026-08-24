import Image from "next/image";

import { testimonial } from "@/data/results";

/** Figma puts opacity: 0.5 on the whole cell (not just the mark) + a right rule on desktop. */
export default function ResultsLogo() {
  return (
    <div className="flex w-full items-center justify-center pb-8 opacity-50 border-b border-surface-hover lg:flex-1 lg:self-stretch lg:border-b-0 lg:border-r lg:pb-0">
      <Image
        src={testimonial.logo.src}
        alt={testimonial.logo.alt}
        width={testimonial.logo.width}
        height={testimonial.logo.height}
        className="h-auto w-[180px] sm:w-[220px] lg:w-[350px]"
      />
    </div>
  );
}