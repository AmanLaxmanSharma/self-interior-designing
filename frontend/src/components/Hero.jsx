import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

const Hero = ({ onOpenQuoteModal }) => {
  const { settings } = useContext(SettingsContext);
  const primaryPhone = settings?.phones?.[0] || '7347733581';
  const secondaryPhone = settings?.phones?.[1] || '8808111000';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-warm-ivory">
      {/* Background Architectural Photography with Soft Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Karoli Interior Hub Architectural Design"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100 opacity-35"
        />
        {/* Soft Warm Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-ivory via-warm-ivory/85 to-warm-ivory/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-ivory via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-soft-beige/80 border border-warm-taupe/30 text-charcoal text-xs sm:text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-deep-olive" />
            <span>Premimum Interior Design & PVC Panel Architecture</span>
          </motion.div>

          {/* Hero Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-[1.1] tracking-tight"
          >
            Transform Your Space Into <span className="italic font-normal text-deep-olive">Something Extraordinary</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl text-charcoal/80 font-normal leading-relaxed max-w-2xl"
          >
            {settings?.hero?.subtitle ||
              'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern homes and spaces.'}
          </motion.p>

          {/* Highlights Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-charcoal/90 pt-2 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-deep-olive" />
              <span>Modern False Ceilings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-deep-olive" />
              <span>PVC Panel Work</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-deep-olive" />
              <span>Interactive 3D Studio</span>
            </div>
          </motion.div>

          {/* CTAs & Phone Quick Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={onOpenQuoteModal}
              className="bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-luxury transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              to="/projects"
              className="border border-warm-taupe/60 hover:border-deep-olive text-charcoal hover:bg-soft-beige/50 font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all text-center"
            >
              Explore Our Work
            </Link>
          </motion.div>

          {/* Direct Phone Floating Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 flex items-center gap-4 text-xs text-charcoal/80"
          >
            <div className="flex items-center gap-2 bg-soft-beige/90 px-4 py-2 rounded-full border border-warm-taupe/30">
              <Phone className="w-3.5 h-3.5 text-deep-olive" />
              <span>Call Us Direct:</span>
              <a href={`tel:${primaryPhone}`} className="font-bold text-deep-olive hover:underline">
                {primaryPhone}
              </a>
              <span>/</span>
              <a href={`tel:${secondaryPhone}`} className="font-bold text-deep-olive hover:underline">
                {secondaryPhone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-charcoal/50 text-xs tracking-wider uppercase font-medium">
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
