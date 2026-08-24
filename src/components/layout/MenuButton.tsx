"use client";

import AssetIcon from "@/components/ui/AssetIcon";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
  open: boolean;
  onToggle: () => void;
};

/** Both glyphs already exist: menu.svg for closed, plus.svg turned 45deg for
 *  the close cross. Same 48px box the outline IconButton had. */
export default function MenuButton({ open, onToggle }: MenuButtonProps) {
  const layer =
    "absolute inset-0 m-auto size-8 transition-all duration-1000 ease-spring";

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className={cn(
        "relative z-50 size-12 shrink-0 rounded-card border border-line-strong",
        "text-ink transition-colors duration-300 hover:bg-surface"
      )}
    >
      <AssetIcon
        src="/icons/menu.svg"
        className={cn(layer, open ? "scale-50 opacity-0" : "scale-100 opacity-100")}
      />
      <AssetIcon
        src="/icons/plus.svg"
        className={cn(
          layer,
          open ? "rotate-45 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
    </button>
  );
}
