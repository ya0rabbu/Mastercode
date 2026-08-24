import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import RuledAction from "@/components/ui/RuledAction";
import ProjectFeature from "./ProjectFeature";
import ProjectGrid from "./ProjectGrid";
import { projectsCta, projectsHeader } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Section id="projects" tone="deep" space="section" gap="block">
      <SectionHeader
        title={projectsHeader.title}
        subtitle={projectsHeader.subtitle}
        surface="dark"
        size="h1Tight"
        subtitleWidth="lg"
        className="max-w-[780px]"
      />

      <div className="flex w-full flex-col gap-6">
        <ProjectFeature />
        <ProjectGrid />
      </div>

      <RuledAction tone="dark">
        <Button href={projectsCta.href} variant="light">
          {projectsCta.label}
        </Button>
      </RuledAction>
    </Section>
  );
}
