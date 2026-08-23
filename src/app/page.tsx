import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/about/AboutSection";
import CtaSection from "@/components/sections/cta/CtaSection";
import FaqSection from "@/components/sections/faq/FaqSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import ProcessSection from "@/components/sections/process/ProcessSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import ResultsSection from "@/components/sections/results/ResultsSection";
import ServicesSection from "@/components/sections/services/ServicesSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <ResultsSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}