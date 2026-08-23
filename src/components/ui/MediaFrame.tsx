import type { ReactNode, Ref } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Size = "feature" | "thumb";

/** Figma: feature = 760px tall / 20px pad, thumb = 324px tall / 16px pad. */
const sizes: Record<Size, { frame: string; sizes: string }> = {
  feature: {
    frame: "h-[380px] p-4 md:h-[560px] lg:h-feature lg:p-5",
    sizes: "(max-width: 1024px) 100vw, 1320px",
  },
  thumb: {
    frame: "h-[260px] p-3 md:h-[300px] lg:h-thumb lg:p-4",
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={spec.sizes}
        priority={priority}
        className="object-cover"
      />

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
