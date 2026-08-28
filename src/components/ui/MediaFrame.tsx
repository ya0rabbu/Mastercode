import type { ReactNode, Ref } from "react";
import Image from "next/image";
import LiquidImage from "./LiquidImage";
import { cn } from "@/lib/utils";

type Size = "feature" | "thumb";

/** Figma: feature = 760px tall / 20px pad, thumb = 324px tall / 16px pad.
 *  On phones both scale by width — featured 1320:760, thumb 3:2. */
const sizes: Record<Size, { frame: string; sizes: string }> = {
  feature: {
    frame: "aspect-[1320/760] p-5 md:aspect-auto md:h-[560px] lg:h-feature",
    sizes: "(max-width: 1024px) 100vw, 1320px",
  },
  thumb: {
    frame: "aspect-[3/2] p-4 md:aspect-auto md:h-[300px] lg:h-thumb",
    sizes: "(max-width: 1024px) 100vw, 424px",
  },
};

type MediaFrameProps = {
  src: string;
  alt: string;
  /** Bottom-aligned overlay — the caption bar. */
  children?: ReactNode;
  /** Motion layers (wipe, cursor arrow) — clipped by the frame's radius. */
  overlay?: ReactNode;
  size?: Size;
  /** Subtle dark scrim so light imagery doesn't swallow the caption. */
  scrim?: boolean;
  priority?: boolean;
  /** Swap the still image for a WebGL cursor-ripple (falls back gracefully). */
  liquid?: boolean;
  ref?: Ref<HTMLDivElement>;
  className?: string;
};

export default function MediaFrame({
  src,
  alt,
  children,
  overlay,
  size = "thumb",
  scrim = false,
  priority = false,
  liquid = false,
  ref,
  className,
}: MediaFrameProps) {
  const spec = sizes[size];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full items-end justify-center overflow-hidden",
        "rounded-frame bg-bg-slate",
        spec.frame,
        className
      )}
    >
      {liquid ? (
        <LiquidImage src={src} alt={alt} sizes={spec.sizes} priority={priority} />
      ) : (
        <Image src={src} alt={alt} fill sizes={spec.sizes} priority={priority} className="object-cover" />
      )}

      {scrim && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"
        />
      )}

      {overlay}

      {children && <div className="relative z-10 flex w-full">{children}</div>}
    </div>
  );
}