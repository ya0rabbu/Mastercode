import Image from "next/image";
import { hero } from "@/data/hero";

/** 92px display type — tuned for phones → tablets → desktop. */
const displayType =
  "font-display font-medium text-[32px] leading-[1] sm:text-[48px] md:text-[64px] lg:text-display";

export default function HeroTitle() {
  return (
    <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
      <p className="w-full font-body text-[13px] font-medium leading-4 text-ink sm:text-[16px]">
        {hero.eyebrow}
      </p>

      <div className="flex w-full max-w-[514px] flex-col gap-3 sm:gap-4">
        <p className={`text-center text-ink ${displayType}`}>{hero.titleTop}</p>

        <div className="flex items-stretch justify-center gap-2.5 sm:gap-4">
          <div className="relative h-[72px] min-w-[72px] flex-1 overflow-hidden rounded-[56px] sm:h-[96px] sm:min-w-[96px] sm:rounded-[78px] lg:h-[154px] lg:min-w-[154px] lg:rounded-oval">
            <Image
              src={hero.avatar.src}
              alt={hero.avatar.alt}
              fill
              sizes="(max-width: 640px) 72px, (max-width: 1024px) 96px, 154px"
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

      <p className="w-full text-right font-body text-[14px] font-medium leading-none text-ink-soft sm:text-[18px] md:text-h5">
        {hero.location}
      </p>
    </div>
  );
}