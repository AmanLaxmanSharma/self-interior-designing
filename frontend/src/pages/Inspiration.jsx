import React, { useState, useEffect } from 'react';
import InspirationCard from '../components/InspirationCard';
import CTASection from '../components/CTASection';
import apiClient from '../api/apiClient';

const categories = [
  'All',
  'Wall Design',
  'Ceiling Design',
  'PVC Panel',
  'Lighting',
  'Bedroom',
  'Living Room'
];

const Inspiration = ({ onOpenQuoteModal }) => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspiration = async () => {
      setLoading(true);
      try {
        let url = '/gallery?type=Inspiration';
        if (activeCategory !== 'All') url += `&category=${encodeURIComponent(activeCategory)}`;
        const res = await apiClient.get(url);
        if (res.data.success) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to load inspiration gallery');
      } finally {
        setLoading(false);
      }
    };
    fetchInspiration();
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-20 space-y-12 bg-warm-ivory">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
          Editorial Gallery
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
          Find Your Interior Inspiration
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Curated reference interior concepts, classical French moulding layouts, geometric PVC ceiling profiles, and mood lighting ideas.
        </p>
      </div>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-deep-olive text-white shadow-md'
                  : 'bg-soft-beige/70 text-charcoal/80 hover:bg-warm-taupe/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin mx-auto" />
            <span className="text-xs text-charcoal/70 mt-3 block">Loading inspiration gallery...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center bg-soft-beige/40 rounded-2xl border border-warm-taupe/20 p-8">
            <h3 className="font-serif text-xl font-semibold text-charcoal">No Inspiration Items In This Category</h3>
            <p className="text-xs text-charcoal/70 mt-1">Select another category or view All.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <InspirationCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default Inspiration;
