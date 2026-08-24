import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Phone } from 'lucide-react';
import CTASection from '../components/CTASection';

const About = ({ onOpenQuoteModal }) => {
  return (
    <div className="pt-28 pb-20 space-y-16 bg-warm-ivory">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
          About Karoli Interior Hub
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
          Architectural Elegance & Precision Execution
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Karoli Interior Hub delivers luxury interior design, PVC wall and ceiling paneling, false ceiling solutions, and custom furniture architecture for modern homes and commercial spaces.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-luxury border border-warm-taupe/30 h-[400px] sm:h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Karoli Design Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl font-bold text-charcoal">
              Our Design Philosophy
            </h2>
            <p className="text-charcoal/80 text-sm leading-relaxed">
              We believe a home should be a reflection of its occupants—warm, sophisticated, and functionally flawless. By combining classical design principles like French wall moulding with modern PVC false ceiling technologies and smart LED lighting, we craft spaces that feel timeless.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-deep-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-charcoal">Premium PVC & Wood Panel Materials</h4>
                  <p className="text-xs text-charcoal/70">100% waterproof, termite-proof, and durable interior paneling.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-deep-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-charcoal">Integrated 3D Studio Visualization</h4>
                  <p className="text-xs text-charcoal/70">Preview your exact ceiling patterns and wall color palettes before fabrication.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-deep-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-charcoal">Transparent Pricing & Turnkey Delivery</h4>
                  <p className="text-xs text-charcoal/70">No hidden costs. Complete end-to-end execution managed by specialists.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default About;
