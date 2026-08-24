import React from 'react';
import { Eye, Bookmark } from 'lucide-react';

const InspirationCard = ({ item, onSelect }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-warm-taupe/20 border border-warm-taupe/30 shadow-luxury cursor-pointer editorial-card">
      <img
        src={item.imageUrl}
        alt={item.title || 'Interior Design Inspiration'}
        className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Content Badge */}
      <div className="absolute top-3 left-3 bg-warm-ivory/90 backdrop-blur-md text-deep-olive text-[11px] font-bold px-3 py-1 rounded-full border border-warm-taupe/30">
        {item.category || 'Inspiration'}
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
        <h4 className="font-serif text-lg font-bold leading-snug drop-shadow-sm">
          {item.title}
        </h4>
        <p className="text-white/80 text-xs flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-muted-sage" />
          <span>Curated Architectural Inspiration</span>
        </p>
      </div>
    </div>
  );
};

export default InspirationCard;
