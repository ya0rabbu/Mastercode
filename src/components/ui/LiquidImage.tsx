"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLiquidHover } from "@/hooks/useLiquidHover";

type LiquidImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Cover image with a cursor-driven liquid ripple on hover (WebGL). The plain
 * <Image> carries SSR/LCP and stays as the fallback on touch / reduced-motion /
 * no-WebGL; once the canvas paints its first frame we cross-fade to it.
 */
export default function LiquidImage({ src, alt, sizes, priority }: LiquidImageProps) {
  const { containerRef, canvasRef, ready } = useLiquidHover(src);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover transition-opacity duration-300", ready && "opacity-0")}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300",
          ready && "opacity-100"
        )}
      />
    </div>
  );
}
