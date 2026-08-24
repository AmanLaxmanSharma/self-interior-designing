import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Tag, Sparkles, CheckCircle } from 'lucide-react';
import apiClient from '../api/apiClient';
import CTASection from '../components/CTASection';

const ProjectDetails = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await apiClient.get(`/projects/${id}`);
        if (res.data.success) {
          setProject(res.data.data);
          setActiveImage(res.data.data.images?.[0] || res.data.data.thumbnail);
        }
      } catch (err) {
        console.warn('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory">
        <div className="w-10 h-10 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-32 text-center bg-warm-ivory space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal">Project Case Study Not Found</h2>
        <Link to="/projects" className="text-xs font-bold text-deep-olive underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 space-y-16 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-olive mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Projects</span>
        </Link>

        {/* Project Header Title */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-soft-beige text-deep-olive">
            <Tag className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-charcoal/70 pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-muted-sage" /> Location: <strong>{project.location}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-muted-sage" /> Completed: <strong>{project.completionDate}</strong>
            </span>
          </div>
        </div>

        {/* Gallery Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-luxury border border-warm-taupe/30 h-[400px] sm:h-[500px] bg-charcoal/95 flex items-center justify-center">
              <img src={activeImage} alt={project.title} className="max-h-full max-w-full object-contain p-2" />
            </div>

            {/* Thumbnail Row */}
            {project.images && project.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-deep-olive scale-105 shadow-md' : 'border-warm-taupe/30 opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 bg-soft-beige/60 border border-warm-taupe/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-charcoal">Design Overview</h3>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">{project.description}</p>

            {project.materialsUsed && project.materialsUsed.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-deep-olive uppercase tracking-wider">Materials & Finish Details</h4>
                <div className="space-y-2">
                  {project.materialsUsed.map((mat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-charcoal font-medium">
                      <CheckCircle className="w-4 h-4 text-deep-olive shrink-0" />
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-warm-taupe/20 space-y-3">
              <button
                onClick={onOpenQuoteModal}
                className="w-full bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-xs py-3.5 px-6 rounded-full shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Discuss Your Project</span>
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="w-full bg-warm-ivory border border-warm-taupe/40 text-charcoal hover:bg-white text-xs font-semibold py-3 px-6 rounded-full transition-colors text-center"
              >
                Request Similar Design
              </button>
            </div>
          </div>
        </div>
      </div>

      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default ProjectDetails;
