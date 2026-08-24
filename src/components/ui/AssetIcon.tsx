import { cn } from "@/lib/utils";

type AssetIconProps = {
  /** Path to a file in /public, e.g. "/icons/arrow.svg". */
  src: string;
  className?: string;
};

/**
 * Renders a project SVG through a CSS mask so it inherits currentColor.
 * The exports carry baked-in paint (arrow.svg is white, menu.svg is #380610,
 * logo.svg is cream), so masking is the only way to reuse one file on both
 * light and dark surfaces without editing the asset.
 */
export default function AssetIcon({ src, className }: AssetIconProps) {
  const mask = {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskSize: "contain",
    WebkitMaskSize: "contain",
  };

  return (
    <span
      aria-hidden="true"
      style={mask}
      className={cn("inline-block size-6 shrink-0 bg-current", className)}
    />
  );
}
