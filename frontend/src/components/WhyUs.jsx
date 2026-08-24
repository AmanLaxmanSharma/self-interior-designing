import React from 'react';
import { ShieldCheck, Palette, Layers, Cpu, MessageSquare, Users, CheckCircle, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Quality Craftsmanship',
    desc: 'Uncompromising attention to detail in every PVC panel seam, ceiling cove, and wall moulding joint.'
  },
  {
    icon: Palette,
    title: 'Customized Designs',
    desc: 'Tailored interior plans created around your space layout, functional needs, and design tastes.'
  },
  {
    icon: Layers,
    title: 'Modern Materials',
    desc: 'Termite-proof PVC panels, moisture-resistant HDMR, high-durability UV marble sheets, and warm LED profiles.'
  },
  {
    icon: Cpu,
    title: 'Professional Execution',
    desc: 'Structured installation procedures, clean site management, and timely project delivery.'
  },
  {
    icon: MessageSquare,
    title: 'Transparent Communication',
    desc: 'Clear material specifications, straightforward pricing, and regular progress updates.'
  },
  {
    icon: Users,
    title: 'Experienced Team',
    desc: 'Skilled craftsmen, false ceiling specialists, and interior designers dedicated to quality.'
  },
  {
    icon: CheckCircle,
    title: 'End-to-End Solutions',
    desc: 'Ceiling, wall paneling, TV units, lighting, and full home interiors handled seamlessly.'
  },
  {
    icon: HeartHandshake,
    title: 'Customer-Focused Service',
    desc: 'Dedicated support before, during, and after project completion.'
  }
];

const WhyUs = () => {
  return (
    <section className="py-20 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
            Why Choose Karoli Interior Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Built On Trust & Architectural Excellence
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            We prioritize quality materials, honest communication, and precision workmanship for long-lasting luxury interiors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl p-6 editorial-card space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-warm-ivory border border-warm-taupe/30 text-deep-olive flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
