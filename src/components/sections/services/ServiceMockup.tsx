import Image from "next/image";
import Prose from "@/components/ui/Prose";
import ServiceMockupBackdrop from "./ServiceMockupBackdrop";
import type { Service } from "@/data/services";

type ServiceMockupProps = {
  service: Service;
};

/** Figma StyledMockup: a 648×432 dark showcase card + a description panel. */
export default function ServiceMockup({ service }: ServiceMockupProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 self-stretch sm:gap-5">
      <div className="relative aspect-[648/432] w-full overflow-hidden rounded-card">
        <ServiceMockupBackdrop />
        <div className="absolute left-[17.5%] top-[13.1%] h-[87.9%] w-[67.6%]">
          <Image
            key={service.mockup}
            src={service.mockup}
            alt={`${service.title} preview`}
            fill
            sizes="(max-width: 1024px) 68vw, 438px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 items-start rounded-card bg-bg p-4 sm:p-5 outline outline-1 outline-line">
        <Prose size="base" tone="soft">
          {service.description}
        </Prose>
      </div>
    </div>
  );
}
