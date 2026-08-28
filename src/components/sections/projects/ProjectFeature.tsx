import HoverMedia from "@/components/ui/HoverMedia";
import IconButton from "@/components/ui/IconButton";
import Prose from "@/components/ui/Prose";
import ProjectCaption from "./ProjectCaption";
import { featuredProject } from "@/data/projects";

export default function ProjectFeature() {
  const { title, description, image, href } = featuredProject;

  return (
    <HoverMedia src={image} alt={title} size="feature" liquid>
      <ProjectCaption
        size="feature"
        action={
          <IconButton
            label={`Open ${title}`}
            href={href}
            size="lg"
            variant="deep"
          />
        }
      >
        <h3 className="font-display text-[20px] font-bold capitalize leading-none text-on-cta sm:text-[24px] lg:text-[28px]">
          {title}
        </h3>

        {/* Figma hides the blurb on phones — the short featured frame shows title only. */}
        <Prose size="sm" tone="onBrand" className="hidden font-medium md:block">
          {description}
        </Prose>
      </ProjectCaption>
    </HoverMedia>
  );
}