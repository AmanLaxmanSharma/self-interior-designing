import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const Footer = ({ onOpenQuoteModal }) => {
  const { settings } = useContext(SettingsContext);

  const phone1 = settings?.phones?.[0] || '7347733581';
  const phone2 = settings?.phones?.[1] || '8808111000';
  const email = settings?.email || 'Primepvcpannal@gmail.com';

  return (
    <footer className="bg-deep-olive text-white pt-16 pb-12 border-t border-muted-sage/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white text-deep-olive font-serif font-bold text-lg flex items-center justify-center">
                K
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Karoli <span className="font-sans font-light text-xs tracking-widest uppercase block text-muted-sage">Interior Hub</span>
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Transforming spaces with thoughtful design, modern materials, PVC panel craftsmanship, false ceilings, and precision execution across India.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="bg-white text-deep-olive hover:bg-warm-ivory text-xs font-semibold px-5 py-2.5 rounded-full transition-transform hover:scale-105 inline-flex items-center gap-1.5 shadow-md"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold tracking-wide text-warm-ivory">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/" className="hover:text-warm-ivory transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-warm-ivory transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">Our Services</Link></li>
              <li><Link to="/projects" className="hover:text-warm-ivory transition-colors">Portfolio Projects</Link></li>
              <li><Link to="/inspiration" className="hover:text-warm-ivory transition-colors">Design Inspiration</Link></li>
              <li><Link to="/3d-studio" className="hover:text-warm-ivory transition-colors text-amber-300 font-medium">3D Design Studio</Link></li>
              <li><Link to="/contact" className="hover:text-warm-ivory transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold tracking-wide text-warm-ivory">Specializations</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">False Ceiling Design</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">PVC Panel Work</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">Wall Paneling & Moulding</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">Residential Interiors</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">LED & Cove Lighting</Link></li>
              <li><Link to="/services" className="hover:text-warm-ivory transition-colors">TV Unit Designs</Link></li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold tracking-wide text-warm-ivory">Contact Studio</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-muted-sage shrink-0 mt-1" />
                <div>
                  <a href={`tel:${phone1}`} className="hover:underline block">{phone1}</a>
                  <a href={`tel:${phone2}`} className="hover:underline block">{phone2}</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-muted-sage shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline text-xs sm:text-sm break-all">{email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-muted-sage shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  Karoli Interior Hub, Premier Paneling & False Ceiling Studio, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-muted-sage" />
            <span>&copy; {new Date().getFullYear()} Karoli Interior Hub. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/login" className="hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
