import React from 'react';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-28 pb-20 bg-warm-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-beige text-deep-olive text-xs font-semibold">
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Terms & Conditions</h1>
          <p className="text-xs text-charcoal/60">Last updated: June 2026</p>
        </div>

        <div className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal/80 text-sm leading-relaxed shadow-luxury">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">1. Intellectual Property & Branding</h2>
            <p>
              All original design concepts, 3D studio models, brand identity assets, and project writeups on Karoli Interior Hub belong exclusively to Karoli Interior Hub.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">2. Portfolio & Reference Photography</h2>
            <p>
              Portfolio imagery includes actual completed projects and curated editorial design inspiration reference material. Reference designs are explicitly presented to help customers visualize possibilities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">3. Quotations & Contracts</h2>
            <p>
              Project price estimates provided via consultation forms are indicative. Final formal quotations are finalized after site measurements and material approvals.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
