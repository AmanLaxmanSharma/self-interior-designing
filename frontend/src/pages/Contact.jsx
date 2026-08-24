import React, { useContext } from 'react';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const Contact = () => {
  const { settings } = useContext(SettingsContext);

  const phone1 = settings?.phones?.[0] || '7347733581';
  const phone2 = settings?.phones?.[1] || '8808111000';
  const email = settings?.email || 'Primepvcpannal@gmail.com';

  return (
    <div className="pt-28 pb-20 space-y-16 bg-warm-ivory">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">
          Connect With Karoli Interior Hub
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal tracking-tight">
          Contact Our Design Studio
        </h1>
        <p className="text-charcoal/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Reach out for consultations, PVC false ceiling inquiries, wall paneling estimates, or site visits.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Studio Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-soft-beige/60 border border-warm-taupe/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-luxury">
              <h3 className="font-serif text-2xl font-bold text-charcoal">Studio Details</h3>

              <div className="space-y-4 text-sm text-charcoal/80">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-deep-olive shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-charcoal">Phone Lines</div>
                    <a href={`tel:${phone1}`} className="hover:underline block">{phone1}</a>
                    <a href={`tel:${phone2}`} className="hover:underline block">{phone2}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-deep-olive shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-charcoal">Email Address</div>
                    <a href={`mailto:${email}`} className="hover:underline break-all">{email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-deep-olive shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-charcoal">Head Office & Studio</div>
                    <p className="text-xs leading-relaxed text-charcoal/70">
                      Karoli Interior Hub, Premier Paneling & False Ceiling Studio, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-deep-olive shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-charcoal">Studio Hours</div>
                    <p className="text-xs text-charcoal/70">Monday – Saturday: 9:30 AM – 7:30 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-warm-taupe/20">
                <a
                  href={`https://wa.me/${settings?.whatsapp || '917347733581'}?text=Hi%20Karoli%20Interior%20Hub,%20I%20would%20like%20to%20get%20a%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
