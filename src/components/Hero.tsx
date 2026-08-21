// src/components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full px-8 py-20 md:px-16 lg:px-72 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">
              Hey, I am Yasir Abed Rabbu
            </p>
            
            <h1 className="text-6xl md:text-7xl font-cabinet font-500 leading-tight">
              User-centric
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-32 h-40 bg-gray-200 rounded-2xl" />
              <div>
                <p className="text-5xl font-cabinet text-brand-accent-default">
                  Product
                </p>
                <p className="text-5xl font-cabinet text-text-primary">
                  Designer
                </p>
              </div>
            </div>

            <p className="text-sm font-manrope text-text-secondary">
              Based in Dhaka, Bangladesh.
            </p>
          </div>

          <button className="px-8 py-4 bg-brand-cta-default text-white rounded-full font-semibold hover:bg-brand-cta-hover transition">
            Get in Touch →
          </button>
        </div>

        {/* Right Image */}
        <div className="relative h-96 md:h-full">
          <Image
            src="/images/profile-hero.png"
            alt="Yasir"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}