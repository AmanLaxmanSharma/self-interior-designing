import React from 'react';
import { Search } from 'lucide-react';

const categories = [
  'All',
  'Living Room',
  'Bedroom',
  'False Ceiling',
  'PVC Panel',
  'Wall Panel',
  'TV Unit',
  'Lighting',
  'Commercial'
];

const ProjectFilter = ({ activeCategory, setActiveCategory, search, setSearch }) => {
  return (
    <div className="space-y-6">
      {/* Search Input & Category Pills */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-deep-olive text-white shadow-md'
                  : 'bg-soft-beige/70 text-charcoal/80 hover:bg-warm-taupe/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-xs focus:outline-none focus:border-muted-sage"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
