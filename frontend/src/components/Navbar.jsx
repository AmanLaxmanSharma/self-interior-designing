import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, User, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';

const Navbar = ({ onOpenQuoteModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { settings } = useContext(SettingsContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Inspiration', path: '/inspiration' },
    { name: '3D Studio', path: '/3d-studio', highlight: true },
    { name: 'Contact', path: '/contact' }
  ];

  const primaryPhone = settings?.phones?.[0] || '7347733581';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-warm-ivory/95 backdrop-blur-md shadow-luxury border-b border-warm-taupe/20 py-3'
          : 'bg-gradient-to-b from-charcoal/40 via-charcoal/10 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg transition-transform group-hover:scale-105 ${
            scrolled ? 'bg-deep-olive text-white' : 'bg-white text-deep-olive shadow-lg'
          }`}>
            K
          </div>
          <div>
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight block leading-none ${
              scrolled ? 'text-charcoal' : 'text-white drop-shadow-sm'
            }`}>
              Karoli <span className="font-sans font-light text-sm tracking-wider uppercase block text-muted-sage">Interior Hub</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-deep-olive font-semibold'
                    : scrolled
                    ? 'text-charcoal hover:text-deep-olive'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1">
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
                  {link.name}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-deep-olive rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${primaryPhone}`}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${
              scrolled
                ? 'bg-soft-beige text-charcoal hover:bg-warm-taupe/30'
                : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-deep-olive" />
            <span>{primaryPhone}</span>
          </a>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-colors ${
                  scrolled
                    ? 'border-warm-taupe/40 text-charcoal hover:bg-soft-beige'
                    : 'border-white/30 text-white hover:bg-white/20'
                }`}
              >
                {isAdmin ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Admin</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-deep-olive" />
                    <span>Dashboard</span>
                  </>
                )}
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className={`text-xs font-medium px-3 py-2 rounded-full transition-colors ${
                scrolled ? 'text-charcoal hover:text-deep-olive' : 'text-white/90 hover:text-white'
              }`}
            >
              Sign In
            </Link>
          )}

          <button
            onClick={onOpenQuoteModal}
            className="bg-deep-olive hover:bg-deep-olive/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Get Free Quote</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onOpenQuoteModal}
            className="bg-deep-olive text-white text-xs font-semibold px-3 py-2 rounded-full"
          >
            Quote
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-warm-ivory border-b border-warm-taupe/20 px-4 pt-4 pb-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-deep-olive text-white font-semibold'
                    : 'text-charcoal hover:bg-soft-beige'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-warm-taupe/20 flex flex-col gap-2">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-soft-beige text-charcoal text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-deep-olive" />
                <span>Call {primaryPhone}</span>
              </a>

              {user ? (
                <div className="flex gap-2">
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-lg bg-warm-taupe/20 text-charcoal text-sm font-medium"
                  >
                    {isAdmin ? 'Admin Portal' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-lg border border-warm-taupe text-charcoal text-sm font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
