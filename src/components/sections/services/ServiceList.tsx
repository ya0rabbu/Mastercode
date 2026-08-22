"use client";

import { useState } from "react";
import ServiceItem from "./ServiceItem";
import ServiceMockup from "./ServiceMockup";
import { services } from "@/data/services";

export default function ServiceList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:items-center">
      <div className="flex flex-1 flex-col gap-3 lg:gap-6">
        {services.map((service, index) => (
          <ServiceItem
            key={service.title}
            service={service}
            active={index === activeIndex}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <ServiceMockup service={active} />
    </div>
  );
}