import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import apiClient from '../api/apiClient';

const Services = ({ onOpenQuoteModal }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.warn('Using default services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-28 pb-20 space-y-16 bg-warm-ivory">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
          Karoli Services
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal tracking-tight">
          Specialized Interior Solutions & Execution
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore our complete range of services—from PVC false ceilings and wall paneling to custom TV units and turnkey home interiors.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>

      <CTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};

export default Services;
