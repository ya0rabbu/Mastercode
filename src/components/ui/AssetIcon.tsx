import { cn } from "@/lib/utils";

type AssetIconProps = {
  src: string;
  className?: string;
};

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