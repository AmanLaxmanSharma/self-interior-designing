import React, { useContext } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const FloatingContact = () => {
  const { settings } = useContext(SettingsContext);

  const phone1 = settings?.phones?.[0] || '7347733581';
  const whatsappNumber = settings?.whatsapp || '917347733581';

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Action Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20Karoli%20Interior%20Hub,%20I%20would%20like%20to%20inquire%20about%20interior%20design%20and%20false%20ceiling%20work.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group relative"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute left-14 bg-charcoal text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${phone1}`}
        className="w-12 h-12 rounded-full bg-deep-olive hover:bg-deep-olive/90 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group relative"
        aria-label="Call Karoli Interior Hub"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute left-14 bg-charcoal text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call: {phone1}
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
