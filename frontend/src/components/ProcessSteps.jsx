import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Understand your space requirements, aesthetic preferences, lifestyle needs, and budget boundaries in detail.'
  },
  {
    num: '02',
    title: 'Design Concept',
    desc: 'Create 3D room renders, PVC panel layouts, false ceiling profiles, and tailored color palette proposals.'
  },
  {
    num: '03',
    title: 'Execution & Fabrication',
    desc: 'Precision material selection, on-site framing, PVC panel installation, electrical LED wiring, and woodworking.'
  },
  {
    num: '04',
    title: 'Completion & Handover',
    desc: 'Rigorous quality check, final cleaning, trim finishing, and official handover of your transformed dream space.'
  }
];

const ProcessSteps = () => {
  return (
    <section className="py-20 bg-soft-beige/50 border-y border-warm-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
            Seamless 4-Step Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            How We Bring Your Vision To Life
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            From initial concept consultation to flawless final handover, our structured workflow ensures transparency and craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl p-6 relative shadow-luxury flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-serif text-5xl font-bold text-muted-sage block leading-none">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-warm-taupe/15 text-[11px] font-semibold text-deep-olive flex items-center justify-between">
                <span>Phase {step.num}</span>
                <span>Karoli Process</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
