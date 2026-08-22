import Image from "next/image";
import { hero } from "@/data/hero";

export default function HeroPortrait() {
  return (
    <div className="flex w-full justify-center">
      <Image
        src={hero.portrait.src}
        alt={hero.portrait.alt}
        // Export at @2x; Next downsamples for the 600px slot.
        width={hero.portrait.width * 2}
        height={hero.portrait.height * 2}
        sizes="(max-width: 768px) 100vw, 600px"
        priority
        className="h-auto w-full max-w-[600px] object-contain"
      />
    </div>
  );
}