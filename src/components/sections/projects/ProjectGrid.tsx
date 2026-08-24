import ProjectThumbnail from "./ProjectThumbnail";
import { projects } from "@/data/projects";

export default function ProjectGrid() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
      {projects.map((project, index) => (
        <ProjectThumbnail
          key={project.slug}
          project={project}
          /* Figma puts the gradient scrim on the third card only. */
          scrim={index === 2}
        />
      ))}
    </div>
  );
}