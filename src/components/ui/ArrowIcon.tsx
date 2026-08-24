import { cn } from "@/lib/utils";
import AssetIcon from "./AssetIcon";

type Direction = "right" | "up-right" | "down";

const rotations: Record<Direction, string> = {
  right: "rotate-0",
  "up-right": "-rotate-45",
  down: "rotate-90",
};

/** The real /icons/arrow.svg, masked so it takes the parent's text colour. */
export default function ArrowIcon({
  direction = "right",
  className,
}: {
  direction?: Direction;
  className?: string;
}) {
  return (
    <AssetIcon
      src="/icons/arrow.svg"
      className={cn(rotations[direction], className)}
    />
  );
}
