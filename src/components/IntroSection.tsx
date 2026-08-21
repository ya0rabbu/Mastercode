// src/components/IntroSection.tsx
export default function IntroSection() {
  return (
    <section className="w-full px-8 py-24 md:px-16 lg:px-72 bg-brand-primary-default text-white">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        
        <h2 className="text-5xl md:text-6xl font-cabinet font-500 leading-tight">
          <span className="text-white">Yasir</span>
          <span className="text-text-muted"> designs for the </span>
          <span className="text-white">moments</span>
          <span className="text-text-muted"> that matter — clear, </span>
          <span className="text-white">friction-free</span>
          <span className="text-text-muted"> products </span>
          <span className="text-white">across SaaS</span>
          <span className="text-text-muted">, healthcare and fintech.</span>
        </h2>

        <p className="text-base font-manrope text-text-disabled leading-relaxed max-w-2xl mx-auto">
          It started with a simple idea that good design shouldn't be noticed, it should just work. 
          That idea took Yasir across healthcare platforms where confusion cost people care, fintech 
          products where trust was everything, and SaaS tools people used every single day.
        </p>

        <button className="mx-auto px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-brand-primary-default transition">
          Read more →
        </button>
      </div>
    </section>
  );
}