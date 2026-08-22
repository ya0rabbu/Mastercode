import { cn } from "@/lib/utils";

type ArrowIconProps = {
  direction?: "right" | "up-right";
  className?: string;
};

/** Traced from Figma: 17.5×1.5 shaft, 7.16×7.16 head, inside a 24×24 box. */
export default function ArrowIcon({
  direction = "right",
  className,
}: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-6",
        direction === "up-right" && "-rotate-45",
        className
      )}
    >
      <path
        d="M3.25 12h17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.59 4.84 20.75 12l-7.16 7.16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}