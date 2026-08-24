import React, { useState, lazy, Suspense } from 'react';
import CTASection from '../components/CTASection';
import { Sparkles, Cpu, Eye, Play, Loader2, Palette, Lightbulb, Square } from 'lucide-react';

// ✅ LAZY LOAD — Three.js only downloads when user clicks "Launch Studio"
const ThreeDViewer   = lazy(() => import('../three/ThreeDViewer'));
const MaterialSelector = lazy(() => import('../three/MaterialSelector'));

const DEFAULT_CONFIG = {
  wallColor:     'warm-ivory',
  floorMaterial: 'light-marble',
  ceilingStyle:  'cove-led',
  ledColor:      'warm',
  sofaColor:     'cream',
  tvBacklight:   true,
};

/* Loading spinner shown while Three.js bundle downloads */
const StudioLoader = () => (
  <div className="w-full h-[520px] sm:h-[640px] rounded-3xl bg-[#292A26] flex flex-col items-center justify-center gap-4 border border-[#3F5036]/40">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 border-4 border-[#3F5036]/30 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-[#9BAA91] rounded-full animate-spin" />
    </div>
    <div className="text-center">
      <p className="font-serif text-white font-semibold text-sm">Loading 3D Engine…</p>
      <p className="text-white/40 text-xs mt-1">This only happens once</p>
    </div>
  </div>
);

/* Pre-launch teaser shown before 3D is triggered */
const StudioTeaser = ({ onLaunch }) => (
  <div className="w-full h-[520px] sm:h-[640px] rounded-3xl overflow-hidden relative border border-[#E8DDCC] shadow-xl bg-[#292A26]">
    {/* Background image */}
    <img
      src="/portfolio/p1_living_ceiling.jpg"
      alt="3D Studio Preview"
      className="absolute inset-0 w-full h-full object-cover opacity-40"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#292A26] via-[#292A26]/50 to-transparent" />

    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#3F5036]/80 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-full border border-[#9BAA91]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#9BAA91]" />
          Interactive 3D Room Customizer
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
          Design Your Room<br />
          <span className="text-[#9BAA91] italic font-normal">in Real-Time</span>
        </h2>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
          Pick wall colors, flooring, ceiling style, LED lighting and sofa color — watch it update live in 3D.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { icon: Palette,    label: '12 Wall Colors' },
          { icon: Square,     label: '3 Ceiling Styles' },
          { icon: Lightbulb,  label: '6 LED Modes' },
        ].map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur text-white/80 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/15">
            <Icon className="w-3 h-3 text-[#9BAA91]" /> {label}
          </span>
        ))}
      </div>

      {/* Launch Button */}
      <button
        onClick={onLaunch}
        className="group flex items-center gap-3 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 text-sm"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <Play className="w-4 h-4 fill-white text-white" />
        </div>
        Launch 3D Studio
      </button>

      <p className="text-white/30 text-[10px]">Loads in ~2 seconds · No app download needed</p>
    </div>
  </div>
);

const Studio3D = ({ onOpenQuoteModal }) => {
  const [config, setConfig]       = useState(DEFAULT_CONFIG);
  const [launched, setLaunched]   = useState(false);

  const set = (key) => (val) => setConfig(prev => ({ ...prev, [key]: val }));
  const handleReset = () => setConfig(DEFAULT_CONFIG);

  const handleRequestDesign = () => {
    if (onOpenQuoteModal) onOpenQuoteModal({
      prefill: `My 3D design choices:\n• Wall: ${config.wallColor.replace(/-/g,' ')}\n• Floor: ${config.floorMaterial.replace(/-/g,' ')}\n• Ceiling: ${config.ceilingStyle.replace(/-/g,' ')}\n• LED: ${config.ledColor.replace(/-/g,' ')}\n• Sofa: ${config.sofaColor}\n• TV Backlight: ${config.tvBacklight ? 'Yes' : 'No'}`
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F5F0E6] min-h-screen">

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3F5036]/10 text-[#3F5036] text-xs font-bold border border-[#3F5036]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Design Studio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#292A26] tracking-tight leading-tight">
          Design Your Dream Room
        </h1>
        <p className="text-[#292A26]/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Customize wall colors, flooring, ceiling style, LED lighting and furniture in real-time.
          When you're happy — request the design and we'll bring it to life.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {[
            { icon: Eye,      label: 'Real-time 3D Preview' },
            { icon: Cpu,      label: '12 Wall Colors'       },
            { icon: Sparkles, label: '6 LED Modes'          },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 bg-white border border-[#E8DDCC] text-[#292A26]/70 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
              <Icon className="w-3 h-3 text-[#3F5036]" />{label}
            </span>
          ))}
        </div>
      </div>

      {/* Studio area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Show teaser until launched, then show 3D viewer */}
        {!launched ? (
          <StudioTeaser onLaunch={() => setLaunched(true)} />
        ) : (
          <Suspense fallback={<StudioLoader />}>
            <ThreeDViewer
              wallColor={config.wallColor}
              floorMaterial={config.floorMaterial}
              ceilingStyle={config.ceilingStyle}
              ledColor={config.ledColor}
              sofaColor={config.sofaColor}
              tvBacklight={config.tvBacklight}
            />
          </Suspense>
        )}

        {/* Customizer panel — only show after launched */}
        {launched && (
          <Suspense fallback={
            <div className="w-full h-40 rounded-3xl bg-white border border-[#E8DDCC] flex items-center justify-center gap-2 text-sm text-[#292A26]/50">
              <Loader2 className="w-5 h-5 animate-spin text-[#3F5036]" /> Loading controls…
            </div>
          }>
            <MaterialSelector
              wallColor={config.wallColor}       setWallColor={set('wallColor')}
              floorMaterial={config.floorMaterial} setFloorMaterial={set('floorMaterial')}
              ceilingStyle={config.ceilingStyle}  setCeilingStyle={set('ceilingStyle')}
              ledColor={config.ledColor}          setLedColor={set('ledColor')}
              sofaColor={config.sofaColor}        setSofaColor={set('sofaColor')}
              tvBacklight={config.tvBacklight}    setTvBacklight={set('tvBacklight')}
              onRequestDesign={handleRequestDesign}
              onReset={handleReset}
            />
          </Suspense>
        )}

        {/* How it works */}
        <div className="bg-white border border-[#E8DDCC] rounded-3xl p-6 shadow-sm">
          <p className="text-center text-xs font-bold text-[#3F5036] uppercase tracking-widest mb-5">How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Launch the Studio',   desc: 'Click the button above to open the live 3D room — loads in seconds.' },
              { step: '02', title: 'Customise Your Room',  desc: 'Pick wall color, floor, ceiling style, LED color and sofa. Changes reflect instantly.' },
              { step: '03', title: 'Request the Design',   desc: 'Love the look? Click "Request This Design" — our team calls you within 24 hours.' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-[#3F5036] text-white font-serif font-bold text-base flex items-center justify-center shrink-0 shadow">
                  {s.step}
                </span>
                <div>
                  <p className="font-bold text-sm text-[#292A26]">{s.title}</p>
                  <p className="text-xs text-[#292A26]/55 mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <CTASection onOpenQuoteModal={onOpenQuoteModal} />
      </div>
    </div>
  );
};

export default Studio3D;
