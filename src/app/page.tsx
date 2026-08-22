import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/hero/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import ServicesSection from "@/components/sections/services/ServicesSection";

export default function Page() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </main>
  );
}