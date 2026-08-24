import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Amitabh Saxena',
    location: 'Lucknow',
    service: 'PVC False Ceiling & LED Strip',
    comment: 'Karoli Interior Hub completely transformed our living room ceiling. The PVC panel finish with warm cove lights looks extremely modern and premium.'
  },
  {
    name: 'Pooja Srivastava',
    location: 'Kanpur',
    service: 'Wall Moulding & TV Unit',
    comment: 'The French wall moulding and charcoal fluted TV background unit exceeded my expectations. Professional team and clean workmanship.'
  },
  {
    name: 'Dr. Manish Pandey',
    location: 'Prayagraj',
    service: 'Full Bedroom Interior',
    comment: 'Very happy with the 3D design process and execution. Their 3D studio preview gave us complete confidence before starting the project.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-soft-beige/30 border-t border-warm-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            What Homeowners Say
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75">
            Real feedback from clients whose spaces we have designed and transformed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl p-6 shadow-luxury space-y-4 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-warm-taupe/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal">{rev.name}</h4>
                  <span className="text-[11px] text-muted-sage font-medium">{rev.location} &bull; {rev.service}</span>
                </div>
                <Quote className="w-6 h-6 text-warm-taupe/40 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
