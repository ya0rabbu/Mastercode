// src/components/sections/results/ResultsLogo.tsx
import Image from "next/image";

import { testimonial } from "@/data/results";

/** Figma puts opacity: 0.5 on the whole cell (not just the mark) + a right rule on desktop. */
export default function ResultsLogo() {
  return (
    <div className="flex w-full items-center justify-center pb-8 opacity-50 border-b border-surface-hover lg:flex-1 lg:self-stretch lg:border-b-0 lg:border-r lg:pb-0">
      {/* Mobile: logo fills the column (Figma StyledHevawhite1 = stretch × 154px tall,
          which is the mark's native 350:161 ratio). Caps at 220/350px on sm/lg. */}
      <Image
        src={testimonial.logo.src}
        alt={testimonial.logo.alt}
        width={testimonial.logo.width}
        height={testimonial.logo.height}
        className="h-auto w-full sm:w-[220px] lg:w-[350px]"
      />
    </div>
  );
}