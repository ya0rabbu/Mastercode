"use client";

import Image from "next/image";
import { useLiquidHover } from "@/hooks/useLiquidHover";

type LiquidImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

export default function LiquidImage({ src, alt, sizes, priority }: LiquidImageProps) {
  const { containerRef, canvasRef } = useLiquidHover(src);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
