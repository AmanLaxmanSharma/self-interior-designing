import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Save, Settings, Phone, Mail, MessageSquare, MapPin } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';
import { SettingsContext } from '../../context/SettingsContext';

const AdminSettings = () => {
  const { showToast } = useContext(ToastContext);
  const { updateSettingsInContext } = useContext(SettingsContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    companyName: 'Karoli Interior Hub',
    phone1: '7347733581',
    phone2: '8808111000',
    email: 'Primepvcpannal@gmail.com',
    whatsapp: '917347733581',
    address: 'Karoli Interior Hub Studio, India',
    heroTitle: 'Transform Your Space Into Something Extraordinary',
    heroSubtitle: 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern spaces.',
    heroCta: 'Get Free Consultation',
    popupDelay: 5
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/settings');
        if (res.data.success && res.data.data) {
          const s = res.data.data;
          setFormData({
            companyName: s.companyName || 'Karoli Interior Hub',
            phone1: s.phones?.[0] || '7347733581',
            phone2: s.phones?.[1] || '8808111000',
            email: s.email || 'Primepvcpannal@gmail.com',
            whatsapp: s.whatsapp || '917347733581',
            address: s.address || 'Karoli Interior Hub Studio, India',
            heroTitle: s.hero?.title || 'Transform Your Space Into Something Extraordinary',
            heroSubtitle: s.hero?.subtitle || 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern spaces.',
            heroCta: s.hero?.ctaText || 'Get Free Consultation',
            popupDelay: s.popupSettings?.delaySeconds || 5
          });
        }
      } catch (err) {
        showToast('Using default settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      companyName: formData.companyName,
      phones: [formData.phone1, formData.phone2],
      email: formData.email,
      whatsapp: formData.whatsapp,
      address: formData.address,
      hero: {
        title: formData.heroTitle,
        subtitle: formData.heroSubtitle,
        ctaText: formData.heroCta
      },
      popupSettings: {
        delaySeconds: Number(formData.popupDelay),
        enabled: true
      }
    };

    try {
      const res = await apiClient.put('/settings', payload);
      if (res.data.success) {
        showToast('Website settings updated successfully');
        updateSettingsInContext(res.data.data);
      }
    } catch (err) {
      showToast('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">System Configuration</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">Website Settings</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          {/* Business Contact Configuration */}
          <div className="bg-soft-beige/70 border border-warm-taupe/30 rounded-2xl p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
              <Phone className="w-5 h-5 text-deep-olive" />
              <span>Business & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Primary Phone Number *</label>
                <input
                  type="text"
                  value={formData.phone1}
                  onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Secondary Phone Number</label>
                <input
                  type="text"
                  value={formData.phone2}
                  onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Configurable WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="917347733581"
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Consultation Popup Delay (seconds)</label>
                <input
                  type="number"
                  value={formData.popupDelay}
                  onChange={(e) => setFormData({ ...formData, popupDelay: e.target.value })}
                  min="2"
                  max="15"
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hero Banner Configuration */}
          <div className="bg-soft-beige/70 border border-warm-taupe/30 rounded-2xl p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal flex items-center gap-2">
              <Settings className="w-5 h-5 text-deep-olive" />
              <span>Homepage Hero Configuration</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Hero Main Title</label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none font-serif text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Hero Subtitle</label>
                <textarea
                  rows="2"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroCta}
                  onChange={(e) => setFormData({ ...formData, heroCta: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-warm-ivory border border-warm-taupe/40 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-md transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Settings...' : 'Save Website Settings'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminSettings;
