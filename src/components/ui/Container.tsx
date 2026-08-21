import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "nav";
};

/**
 * Figma content box = 1320px centred (300px gutters on a 1920 canvas).
 * max-width is 1320 + 5rem so that at lg (px-10 = 2.5rem each side) the
 * inner width lands on exactly 1320px, while smaller screens just shrink.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[calc(var(--container-shell)+5rem)]",
        "px-5 sm:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </Tag>
  );
}