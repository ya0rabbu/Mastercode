import Image from "next/image";
import Prose from "@/components/ui/Prose";
import type { Service } from "@/data/services";

type ServiceMockupProps = {
  service: Service;
};

export default function ServiceMockup({ service }: ServiceMockupProps) {
  return (
    <div className="flex flex-1 flex-col gap-5 self-stretch">
      {/* Figma: 648 x 432, radius 12 */}
      <div className="relative aspect-[648/432] w-full overflow-hidden rounded-card bg-surface">
        <Image
          key={service.mockup}
          src={service.mockup}
          alt={`${service.title} preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 648px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 items-center rounded-card bg-bg p-4 outline outline-1 outline-line">
        <Prose size="base" tone="soft">
          {service.description}
        </Prose>
      </div>
    </div>
  );
}