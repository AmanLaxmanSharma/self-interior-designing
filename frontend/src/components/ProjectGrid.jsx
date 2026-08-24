import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';

const ProjectGrid = ({ projects, onOpenQuoteModal }) => {
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleOpenLightbox = (project) => {
    setActiveLightbox(project);
    setCurrentImageIdx(0);
  };

  const handleNextImage = () => {
    if (!activeLightbox || !activeLightbox.images) return;
    setCurrentImageIdx((prev) => (prev + 1) % activeLightbox.images.length);
  };

  const handlePrevImage = () => {
    if (!activeLightbox || !activeLightbox.images) return;
    setCurrentImageIdx((prev) => (prev - 1 + activeLightbox.images.length) % activeLightbox.images.length);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center bg-soft-beige/40 rounded-2xl border border-warm-taupe/20 p-8">
        <h3 className="font-serif text-2xl font-semibold text-charcoal">No Projects Found</h3>
        <p className="text-charcoal/70 text-sm mt-2">Try selecting another category or clear your search term.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onSelectLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      {/* Full-Screen Lightbox Preview */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-warm-ivory border border-warm-taupe/30 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-5 bg-warm-ivory border-b border-warm-taupe/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-deep-olive uppercase tracking-wider block">
                    {activeLightbox.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal">
                    {activeLightbox.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-2 text-warm-taupe hover:text-charcoal rounded-full hover:bg-soft-beige transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Main Image Carousel */}
              <div className="relative h-[350px] sm:h-[480px] bg-charcoal/95 flex items-center justify-center">
                <img
                  src={activeLightbox.images?.[currentImageIdx] || activeLightbox.thumbnail}
                  alt={activeLightbox.title}
                  className="max-h-full max-w-full object-contain p-2"
                />

                {activeLightbox.images && activeLightbox.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 p-2 bg-warm-ivory/80 hover:bg-warm-ivory text-charcoal rounded-full shadow-md transition-transform hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 p-2 bg-warm-ivory/80 hover:bg-warm-ivory text-charcoal rounded-full shadow-md transition-transform hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Footer Actions */}
              <div className="p-4 sm:p-5 bg-warm-ivory flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-charcoal/80 line-clamp-2 max-w-lg">
                  {activeLightbox.description}
                </p>

                <button
                  onClick={() => {
                    setActiveLightbox(null);
                    if (onOpenQuoteModal) onOpenQuoteModal();
                  }}
                  className="bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-xs px-6 py-3 rounded-full shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Similar Design</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGrid;
