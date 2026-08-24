import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Tag, MapPin } from 'lucide-react';

const ProjectCard = ({ project, onSelectLightbox }) => {
  return (
    <div className="group bg-warm-ivory border border-warm-taupe/30 rounded-2xl overflow-hidden editorial-card flex flex-col justify-between">
      <div>
        {/* Project Thumbnail */}
        <div
          onClick={() => onSelectLightbox && onSelectLightbox(project)}
          className="relative h-64 sm:h-72 overflow-hidden bg-warm-taupe/20 cursor-pointer"
        >
          <img
            src={project.thumbnail || project.images?.[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-deep-olive text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
            {project.category}
          </div>

          {/* Quick Lightbox Action Icon */}
          <div className="absolute bottom-3 right-3 w-9 h-9 bg-warm-ivory/90 backdrop-blur-md rounded-full text-deep-olive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Info Area */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-charcoal/60">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-muted-sage" />
              {project.location || 'India'}
            </span>
            <span>{project.completionDate || '2026'}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-deep-olive transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-charcoal/75 text-xs line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-soft-beige text-charcoal/80 px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-5 pb-5 pt-1 border-t border-warm-taupe/15 flex items-center justify-between">
        <Link
          to={`/projects/${project.slug || project._id}`}
          className="text-xs font-bold text-deep-olive hover:underline flex items-center gap-1"
        >
          <span>Explore Project Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
