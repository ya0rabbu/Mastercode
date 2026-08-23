import Image from "next/image";

import { cn } from "@/lib/utils";

type ToggleIconProps = {
  open: boolean;
  className?: string;
};

export default function ToggleIcon({ open, className }: ToggleIconProps) {
  return (
    <Image
      src={open ? "/icons/minus.svg" : "/icons/plus.svg"}
      alt=""
      width={24}
      height={24}
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    />
  );
}