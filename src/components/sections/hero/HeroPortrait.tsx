import Image from "next/image";
import { hero } from "@/data/hero";

export default function HeroPortrait() {
  return (
    <div className="flex w-full justify-center">
      <Image
        src={hero.portrait.src}
        alt={hero.portrait.alt}
        width={756}
        height={792}
        priority
        className="object-contain"
      />
    </div>
  );
}