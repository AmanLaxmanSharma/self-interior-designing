import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-28 pb-20 bg-warm-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-beige text-deep-olive text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Privacy Policy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">Privacy Policy</h1>
          <p className="text-xs text-charcoal/60">Last updated: June 2026</p>
        </div>

        <div className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl p-6 sm:p-8 space-y-6 text-charcoal/80 text-sm leading-relaxed shadow-luxury">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">1. Information Collection</h2>
            <p>
              Karoli Interior Hub collects personal details (Name, Phone Number, Email, City, Project Preferences) submitted voluntarily via consultation lead forms, 3D design requests, or direct contact inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">2. Use of Information</h2>
            <p>
              Your contact details are used strictly to provide interior design consultations, share portfolio quotes, and schedule site inspections. We do not sell or rent customer data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">3. Data Security & Storage</h2>
            <p>
              All customer lead data and user account records are stored securely with encrypted JWT authentication and password hashing protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-charcoal">4. Contact Us</h2>
            <p>
              For privacy concerns or data removal requests, contact us at <strong>Primepvcpannal@gmail.com</strong> or call <strong>7347733581 / 8808111000</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
