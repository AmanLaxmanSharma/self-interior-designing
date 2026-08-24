import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectGrid from '../components/ProjectGrid';
import InspirationCard from '../components/InspirationCard';
import ThreeDPreview from '../three/ThreeDPreview';
import ProcessSteps from '../components/ProcessSteps';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import ContactForm from '../components/ContactForm';
import apiClient from '../api/apiClient';
import { Sparkles, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ onOpenQuoteModal }) => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [inspirationItems, setInspirationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, projRes, galRes] = await Promise.all([
          apiClient.get('/services'),
          apiClient.get('/projects?featured=true'),
          apiClient.get('/gallery?type=Inspiration')
        ]);
        if (srvRes.data.success) setServices(srvRes.data.data.slice(0, 6));
        if (projRes.data.success) setFeaturedProjects(projRes.data.data);
        if (galRes.data.success) setInspirationItems(galRes.data.data.slice(0, 3));
      } catch (err) {
        console.warn('Using default initial data on homepage');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero onOpenQuoteModal={onOpenQuoteModal} />

      {/* Services Section */}
      <section className="py-20 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
                Comprehensive Interior Services
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Crafted Solutions For Modern Spaces
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                From specialized PVC ceilings and acoustic wall paneling to complete residential and commercial interior execution.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-olive hover:underline"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-20 bg-soft-beige/30 border-y border-warm-taupe/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
                Recent Transformations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Spaces We've Built & Transformed
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                Explore real completed projects featuring PVC paneling, false ceiling work, and custom wall moulding.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-olive hover:underline"
            >
              <span>Explore Portfolio Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProjectGrid projects={featuredProjects} onOpenQuoteModal={onOpenQuoteModal} />
        </div>
      </section>

      {/* 3D Studio Interactive Preview */}
      <ThreeDPreview onOpenQuoteModal={onOpenQuoteModal} />

      {/* Why Choose Karoli */}
      <WhyUs />

      {/* 4-Step Process */}
      <ProcessSteps />

      {/* Design Inspiration Showcase */}
      <section className="py-20 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
              Curated Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Find Your Interior Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75">
              Explore architectural concepts, classical wall moulding profiles, and contemporary lighting ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {inspirationItems.map((item) => (
              <InspirationCard key={item._id} item={item} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/inspiration"
              className="inline-flex items-center gap-2 bg-soft-beige hover:bg-warm-taupe/30 text-charcoal text-xs font-semibold px-6 py-3 rounded-full transition-colors border border-warm-taupe/30"
            >
              <span>Explore Full Inspiration Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-deep-olive" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Editorial CTA */}
      <CTASection onOpenQuoteModal={onOpenQuoteModal} />

      {/* Contact & Map Section */}
      <section className="py-20 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                Visit Our Studio or Schedule a Consultation
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                Whether you need advice on PVC ceiling panels, wall mouldings, or full interior execution, our team is ready to assist.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-soft-beige/60 p-4 rounded-xl border border-warm-taupe/30 space-y-1">
                  <div className="text-xs font-bold text-deep-olive">Direct Phone Lines</div>
                  <div className="text-sm font-semibold text-charcoal">
                    <a href="tel:7347733581" className="hover:underline">7347733581</a> &bull; <a href="tel:8808111000" className="hover:underline">8808111000</a>
                  </div>
                </div>

                <div className="bg-soft-beige/60 p-4 rounded-xl border border-warm-taupe/30 space-y-1">
                  <div className="text-xs font-bold text-deep-olive">Official Email</div>
                  <div className="text-sm font-semibold text-charcoal break-all">
                    <a href="mailto:Primepvcpannal@gmail.com" className="hover:underline">Primepvcpannal@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
