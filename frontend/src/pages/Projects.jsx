import React, { useState, useEffect } from 'react';
import ProjectFilter from '../components/ProjectFilter';
import ProjectGrid from '../components/ProjectGrid';
import CTASection from '../components/CTASection';
import apiClient from '../api/apiClient';

const Projects = ({ onOpenQuoteModal }) => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = `/projects?category=${activeCategory}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        const res = await apiClient.get(url);
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch portfolio projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeCategory, search]);

  return (
    <div className="pt-28 pb-20 space-y-12 bg-warm-ivory">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
          Karoli Interior Hub Portfolio
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
          Spaces We've Transformed
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore our collection of false ceiling designs, PVC paneling work, classical French wall moulding compositions, and custom interior execution projects.
        </p>
      </div>

      {/* Filter & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ProjectFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin mx-auto" />
            <span className="text-xs text-charcoal/70 mt-3 block">Loading projects...</span>
          </div>
        ) : (
          <ProjectGrid projects={projects} onOpenQuoteModal={onOpenQuoteModal} />
        )}
      </div>

      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default Projects;
