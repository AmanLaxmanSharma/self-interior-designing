import React, { useState, useEffect, useContext } from 'react';
import { X, Send, Sparkles, CheckCircle, PhoneCall } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ToastContext } from '../context/ToastContext';

const ConsultationModal = ({ isOpen, onClose, autoTrigger = false }) => {
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: 'Full Home Interior',
    budget: '₹1 Lakh - ₹3 Lakhs',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/leads', {
        ...formData,
        source: autoTrigger ? 'Auto-Popup Modal' : 'Consultation Modal'
      });

      if (res.data.success) {
        setSubmitted(true);
        localStorage.setItem('karoli_lead_submitted', 'true');
        showToast('Consultation request sent! We will call you soon.');
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to submit lead. Please try calling directly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
      />

      {/* Modal Window */}
      <div className="relative bg-warm-ivory border border-warm-taupe/30 rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 my-8 text-charcoal overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-warm-taupe hover:text-charcoal transition-colors rounded-full hover:bg-soft-beige"
          aria-label="Close consultation modal"
        >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-muted-sage/20 text-deep-olive rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">Request Received!</h3>
              <p className="text-charcoal/80 text-sm max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our senior interior consultant will reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-beige text-xs font-semibold text-deep-olive">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Design Consultation</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                  Let's Design Your Dream Space
                </h2>
                <p className="text-xs sm:text-sm text-charcoal/70">
                  Tell us a little about your project and our team will help you plan the right solution.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 7347733581"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. user@gmail.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">City / Location</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Lucknow / Kanpur"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    >
                      <option value="Full Home Interior">Full Home Interior</option>
                      <option value="Living Room">Living Room</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="False Ceiling">False Ceiling</option>
                      <option value="PVC Panel">PVC Panel</option>
                      <option value="Wall Paneling">Wall Paneling</option>
                      <option value="TV Unit">TV Unit</option>
                      <option value="Commercial Interior">Commercial Interior</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Approximate Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage"
                    >
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                      <option value="₹1 Lakh - ₹3 Lakhs">₹1 Lakh - ₹3 Lakhs</option>
                      <option value="₹3 Lakhs - ₹5 Lakhs">₹3 Lakhs - ₹5 Lakhs</option>
                      <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                      <option value="₹10+ Lakhs">₹10+ Lakhs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Project Message / Requirements</label>
                  <textarea
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us any specific preferences (e.g. PVC ceiling with LED strip, white wall moulding...)"
                    className="w-full px-3.5 py-2 rounded-lg bg-soft-beige/70 border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage focus:ring-1 focus:ring-muted-sage resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm py-3 px-6 rounded-full shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-charcoal/70 hover:text-charcoal transition-colors text-center"
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
  );
};

export default ConsultationModal;
