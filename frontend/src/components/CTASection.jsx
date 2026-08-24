import React, { useContext } from 'react';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const CTASection = ({ onOpenQuoteModal }) => {
  const { settings } = useContext(SettingsContext);

  const phone1 = settings?.phones?.[0] || '7347733581';
  const phone2 = settings?.phones?.[1] || '8808111000';

  return (
    <section className="py-20 bg-deep-olive text-white relative overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5F0E6_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-warm-ivory text-xs font-semibold backdrop-blur-sm border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Start Your Interior Transformation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Ready to Transform Your Space?
        </h2>

        <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Talk to Karoli Interior Hub today. Whether it's a modern false ceiling, PVC panel work, or a full home interior, our experts are ready to bring your vision to life.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto bg-white text-deep-olive hover:bg-warm-ivory font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Get Free Quote & Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${phone1}`}
            className="w-full sm:w-auto border border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold text-sm px-7 py-4 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Call: {phone1} / {phone2}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
