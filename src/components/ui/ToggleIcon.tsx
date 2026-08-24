import { cn } from "@/lib/utils";
import AssetIcon from "./AssetIcon";

type ToggleIconProps = {
  open: boolean;
  className?: string;
};

/** plus.svg spins 45 degrees out as minus.svg spins in — both real assets. */
export default function ToggleIcon({ open, className }: ToggleIconProps) {
  const layer =
    "absolute inset-0 m-auto size-6 transition-all duration-1000 ease-spring";

  return (
    <span
      aria-hidden="true"
      className={cn("relative block size-6 shrink-0", className)}
    >
      <AssetIcon
        src="/icons/plus.svg"
        className={cn(layer, open ? "rotate-45 opacity-0" : "rotate-0 opacity-100")}
      />
      <AssetIcon
        src="/icons/minus.svg"
        className={cn(layer, open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0")}
      />
    </span>
  );
}
