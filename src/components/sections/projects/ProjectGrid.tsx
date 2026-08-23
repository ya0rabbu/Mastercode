import ProjectThumbnail from "./ProjectThumbnail";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-stretch">
      {projects.map((project, index) => (
        <ProjectThumbnail
          key={project.slug}
          project={project}
          /* Figma puts the gradient scrim on the third card only. */
          scrim={index === 2}
          className="md:flex-1"
        />
      ))}
    </div>
  );
}