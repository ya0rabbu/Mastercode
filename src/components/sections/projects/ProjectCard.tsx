import Image from "next/image";
import type { Project } from "@/data/projects";
type ProjectCardProps = Project & {
  cards: string[];
};

export default function ProjectCard({
  title,
  description,
  image,
  href,
  cards,
}: ProjectCardProps) {
  return (
    <div className="relative w-full aspect-[1120/645] max-w-[1120px] rounded-2xl outline outline-2 outline-white -outline-offset-2 overflow-hidden p-5">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 90vw, 1120px"
        priority
      />

      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center gap-5 bg-[#1A1A1A] outline outline-1 outline-[#E8D8D0]/20 -outline-offset-1 rounded-xl p-5">
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-white font-[Cabinet_Grotesk] font-bold text-[28px] leading-[28px] capitalize">
            {title}
          </h3>
          <p className="text-[#F5EDE8] font-[Manrope] font-medium text-[16px] leading-[25.6px] capitalize">
            {description}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-[#701520] hover:bg-[#8a1a28] transition-colors"
          aria-label={`Open ${title}`}
        >
          <Image
            src="/icons/arrow-up-right.svg"
            alt=""
            width={20}
            height={20}
          />
        </a>
      </div>
    </div>
  );
}