import React, { useState, useContext } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ToastContext } from '../context/ToastContext';

const ContactForm = () => {
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'False Ceiling',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      showToast('Please fill in your Name, Phone, and Email.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/leads', formData);
      if (res.data.success) {
        setSuccess(true);
        showToast('Message sent! Our team will contact you shortly.');
        setFormData({ name: '', phone: '', email: '', projectType: 'False Ceiling', message: '' });
      }
    } catch (err) {
      showToast('Error sending message. Please call our direct phone numbers.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-soft-beige/70 border border-warm-taupe/30 rounded-2xl p-6 sm:p-8 shadow-luxury">
      <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">
        Send Us a Message
      </h3>
      <p className="text-xs sm:text-sm text-charcoal/70 mb-6">
        Have questions about false ceiling design, PVC paneling, or full interior execution? Fill out the form below.
      </p>

      {success ? (
        <div className="py-8 text-center space-y-3 bg-warm-ivory rounded-xl border border-muted-sage/40 p-6">
          <CheckCircle2 className="w-12 h-12 text-deep-olive mx-auto" />
          <h4 className="font-serif text-xl font-bold text-charcoal">Thank You!</h4>
          <p className="text-xs text-charcoal/80">
            We have received your message and will reach out promptly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs font-bold text-deep-olive underline pt-2"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vikram Singh"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 7347733581"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. vikram@gmail.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Primary Service Requirement</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage"
            >
              <option value="False Ceiling">False Ceiling Design</option>
              <option value="PVC Panel">PVC Panel Work</option>
              <option value="Wall Paneling">Wall Paneling & Moulding</option>
              <option value="TV Unit">TV Unit Design</option>
              <option value="Full Home Interior">Full Home Interior</option>
              <option value="Living Room">Living Room Interior</option>
              <option value="Bedroom">Bedroom Interior</option>
              <option value="Commercial Interior">Commercial Interior</option>
              <option value="Renovation">Renovation & Upgrades</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Message</label>
            <textarea
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your space dimensions, design preferences..."
              className="w-full px-4 py-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 text-charcoal text-sm focus:outline-none focus:border-muted-sage resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm py-3.5 px-6 rounded-full shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            {loading ? 'Sending...' : 'Submit Inquiry'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
