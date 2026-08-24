import HoverMedia from "@/components/ui/HoverMedia";
import IconButton from "@/components/ui/IconButton";
import ProjectCaption from "./ProjectCaption";
import type { Project } from "@/data/projects";

type ProjectThumbnailProps = {
  project: Project;
  scrim?: boolean;
  className?: string;
};

export default function ProjectThumbnail({
  project,
  scrim,
  className,
}: ProjectThumbnailProps) {
  const { title, image, href } = project;

  return (
    <HoverMedia
      src={image}
      alt={title}
      size="thumb"
      scrim={scrim}
      liquid
      className={className}
    >
      <ProjectCaption
        size="thumb"
        action={
          <IconButton label={`Open ${title}`} href={href} size="sm" variant="cta" />
        }
      >
        <h3 className="font-display text-[20px] font-bold capitalize leading-none text-on-cta lg:text-h5">
          {title}
        </h3>
      </ProjectCaption>
    </HoverMedia>
  );
}
