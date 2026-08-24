import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import apiClient from '../api/apiClient';
import CTASection from '../components/CTASection';

const ServiceDetails = ({ onOpenQuoteModal }) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await apiClient.get(`/services/${id}`);
        if (res.data.success) {
          setService(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to load service detail');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory">
        <div className="w-10 h-10 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-32 text-center bg-warm-ivory space-y-4">
        <h2 className="font-serif text-3xl font-bold text-charcoal">Service Not Found</h2>
        <Link to="/services" className="text-xs font-bold text-deep-olive underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 space-y-16 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-olive mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Service Image */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-luxury border border-warm-taupe/30 h-[400px]">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Karoli Service Detail</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">{service.title}</h1>
            <p className="text-charcoal/80 text-sm leading-relaxed">{service.longDescription || service.description}</p>

            {service.features && service.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-deep-olive">Key Offerings & Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-charcoal/90 bg-soft-beige/60 p-2.5 rounded-lg border border-warm-taupe/20">
                      <CheckCircle2 className="w-4 h-4 text-deep-olive shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={onOpenQuoteModal}
                className="bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-md transition-transform hover:scale-105"
              >
                Request Quote For {service.title}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default ServiceDetails;
