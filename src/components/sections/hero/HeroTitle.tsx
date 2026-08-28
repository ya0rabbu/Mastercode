import Image from "next/image";
import { hero } from "@/data/hero";

/** 92px display type — tuned for phones (48px) → tablets → desktop. */
const displayType =
  "font-display font-medium text-[48px] leading-[1] sm:text-[56px] md:text-[64px] lg:text-display";

export default function HeroTitle() {
  return (
    <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
      <p className="w-full font-body text-[16px] font-medium leading-4 text-ink">
        {hero.eyebrow}
      </p>

      <div className="flex w-full max-w-[514px] flex-col gap-3 sm:gap-4">
        <p className={`text-center text-ink ${displayType}`}>{hero.titleTop}</p>

        <div className="flex items-center justify-center gap-3 sm:items-stretch sm:gap-4">
          <div className="relative h-[112px] w-[86px] shrink-0 overflow-hidden rounded-[73px] sm:h-[96px] sm:w-[96px] sm:rounded-[78px] lg:h-[154px] lg:w-[154px] lg:rounded-oval">
            <Image
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              fill
              sizes="(max-width: 640px) 86px, (max-width: 1024px) 96px, 154px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <span className={`text-cta ${displayType}`}>{hero.titleRole}</span>
            <span className={`text-ink ${displayType}`}>{hero.titleCraft}</span>
          </div>
        </div>
      </div>

      <p className="w-full text-right font-body text-[20px] font-medium leading-none text-ink-soft md:text-h5">
        {hero.location}
      </p>
    </div>
  );
}