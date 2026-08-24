import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'Karoli Interior Hub',
    phones: ['7347733581', '8808111000'],
    email: 'Primepvcpannal@gmail.com',
    whatsapp: '917347733581',
    address: 'Karoli Interior Hub, Premier Paneling & False Ceiling Studio, India',
    hero: {
      title: 'Transform Your Space Into Something Extraordinary',
      subtitle: 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern spaces.',
      ctaText: 'Get Free Consultation'
    },
    popupSettings: {
      delaySeconds: 5,
      enabled: true
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/settings');
        if (res.data.success && res.data.data) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.warn('Using default settings context');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const updateSettingsInContext = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettingsInContext }}>
      {children}
    </SettingsContext.Provider>
  );
};
