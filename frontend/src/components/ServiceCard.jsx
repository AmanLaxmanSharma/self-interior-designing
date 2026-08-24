import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-soft-beige/60 border border-warm-taupe/30 rounded-2xl overflow-hidden editorial-card flex flex-col justify-between h-full">
      <div>
        {/* Service Image with Subtle Zoom */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-warm-taupe/20">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-warm-ivory/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-deep-olive border border-warm-taupe/30">
            Karoli Specialty
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="font-serif text-2xl font-bold text-charcoal group-hover:text-deep-olive transition-colors">
            {service.title}
          </h3>
          <p className="text-charcoal/75 text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>

          {/* Features Badges */}
          {service.features && service.features.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {service.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] bg-warm-ivory border border-warm-taupe/30 px-2.5 py-1 rounded-md text-charcoal/80"
                >
                  <Sparkles className="w-2.5 h-2.5 text-muted-sage" />
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/services/${service.slug || service._id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-olive hover:text-charcoal transition-colors group-hover:translate-x-1 transition-transform"
        >
          <span>View Service Details</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
