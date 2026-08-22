import Image from "next/image";
import { hero } from "@/data/hero";

/** 92px display type — tune the two smaller steps to taste. */
const displayType =
  "font-display font-medium text-[40px] leading-[1] sm:text-[64px] lg:text-display";

export default function HeroTitle() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="w-full font-body text-[16px] font-medium leading-4 text-ink">
        {hero.eyebrow}
      </p>

      <div className="flex w-full max-w-[514px] flex-col gap-4">
        <p className={`text-center text-ink ${displayType}`}>{hero.titleTop}</p>

        <div className="flex items-stretch justify-center gap-4">
          <div className="relative min-h-[120px] flex-1 overflow-hidden rounded-oval lg:min-h-0">
            <Image
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              fill
              sizes="154px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className={`text-cta ${displayType}`}>{hero.titleRole}</span>
            <span className={`text-ink ${displayType}`}>{hero.titleCraft}</span>
          </div>
        </div>
      </div>

      <p className="w-full text-right font-body text-[18px] font-medium leading-none text-ink-soft sm:text-h5">
        {hero.location}
      </p>
    </div>
  );
}