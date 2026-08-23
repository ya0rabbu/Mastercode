import Image from "next/image";

import { testimonial } from "@/data/results";

/** Figma puts opacity: 0.5 on the whole cell (not just the mark) + a right rule. */
export default function ResultsLogo() {
  return (
    <div className="flex w-full items-center justify-center opacity-50 lg:flex-1 lg:self-stretch lg:border-r lg:border-surface-hover">
      <Image
        src={testimonial.logo.src}
        alt={testimonial.logo.alt}
        width={testimonial.logo.width}
        height={testimonial.logo.height}
        className="h-auto w-[220px] lg:w-[350px]"
      />
    </div>
  );
}