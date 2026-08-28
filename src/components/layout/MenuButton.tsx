"use client";

import AssetIcon from "@/components/ui/AssetIcon";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
  open: boolean;
  onToggle: () => void;
  menuId: string;
};

export default function MenuButton({ open, onToggle, menuId }: MenuButtonProps) {
  const layer = "absolute inset-0 m-auto transition-all duration-700 ease-spring text-white";

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls={menuId}
      onClick={onToggle}
      // ← text-white এখানে দিলে AssetIcon এর bg-current white হবে
      className={cn(
        "relative z-50 flex shrink-0 items-center justify-center text-white",
        "border border-[#B89088] bg-[#5C0A1A]",
        "transition-colors duration-300 hover:bg-[#7A0E22]",
        // Mobile: 32px, Desktop: 48px
        "size-8 rounded-[5.33px] sm:size-12 sm:rounded-[8px]"
      )}
    >
      <AssetIcon
        src="/icons/menu.svg"
        className={cn(
          layer,
          // Mobile: 18px, Desktop: 28px
          "size-[18px] sm:size-7",
          open ? "scale-50 opacity-0" : "scale-100 opacity-100"
        )}
      />
      <AssetIcon
        src="/icons/plus.svg"
        className={cn(
          layer,
          "size-[18px] sm:size-7",
          open ? "rotate-45 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        )}
      />
    </button>
  );
}