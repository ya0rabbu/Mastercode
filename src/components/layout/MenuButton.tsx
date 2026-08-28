"use client";

import AssetIcon from "@/components/ui/AssetIcon";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
  open: boolean;
  onToggle: () => void;
};

/** Both glyphs already exist: menu.svg for closed, plus.svg turned 45deg for
 *  the close cross. 36px box on phones (export), 48px from sm up. */
export default function MenuButton({ open, onToggle }: MenuButtonProps) {
  const layer =
    "absolute inset-0 m-auto size-5 transition-all duration-1000 ease-spring sm:size-8";

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className={cn(
        "relative z-50 size-9 shrink-0 rounded-card border border-line-strong sm:size-12",
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