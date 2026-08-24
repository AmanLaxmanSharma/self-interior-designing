import React from 'react';
import ContactForm from '../components/ContactForm';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const Quote = () => {
  return (
    <div className="pt-28 pb-20 space-y-12 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-beige text-deep-olive text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Estimation</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
          Get Your Free Design Quote
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Tell us about your space dimensions, room type, and preferences. Our estimation team will generate a detailed project breakdown.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </div>
  );
};

export default Quote;
