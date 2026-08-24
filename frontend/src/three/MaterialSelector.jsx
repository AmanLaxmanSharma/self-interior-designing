import React from 'react';
import {
  Layers, Sun, Disc, Zap, Send, Armchair,
  Tv2, Lightbulb, Check, RotateCcw
} from 'lucide-react';

/* ── Option Data ─────────────────────────────────────────────── */
const WALL_COLORS = [
  { id: 'warm-ivory',   name: 'Warm Ivory',    hex: '#F5F0E6' },
  { id: 'pure-white',   name: 'Pure White',    hex: '#FFFFFF' },
  { id: 'soft-beige',   name: 'Soft Beige',    hex: '#E8DDCC' },
  { id: 'warm-taupe',   name: 'Warm Taupe',    hex: '#B9A895' },
  { id: 'sage-green',   name: 'Sage Green',    hex: '#9BAA91' },
  { id: 'deep-olive',   name: 'Deep Olive',    hex: '#3F5036' },
  { id: 'navy-blue',    name: 'Navy Blue',     hex: '#1B3A5C' },
  { id: 'charcoal',     name: 'Charcoal',      hex: '#292A26' },
  { id: 'terracotta',   name: 'Terracotta',    hex: '#C1694F' },
  { id: 'dusty-rose',   name: 'Dusty Rose',    hex: '#C9A5A0' },
  { id: 'slate-grey',   name: 'Slate Grey',    hex: '#6B7280' },
  { id: 'cream-yellow', name: 'Cream',         hex: '#F9F3DC' },
];

const FLOOR_OPTIONS = [
  { id: 'light-marble', name: 'Italian Marble', hex: '#EAE6E1', tag: 'Luxury' },
  { id: 'dark-marble',  name: 'Onyx Marble',   hex: '#2A2A2A', tag: 'Bold' },
  { id: 'light-wood',   name: 'Light Oak Wood', hex: '#D2B48C', tag: 'Natural' },
  { id: 'dark-wood',    name: 'Walnut Wood',   hex: '#5C3D1E', tag: 'Warm' },
  { id: 'grey-tile',    name: 'Grey Tile',     hex: '#9CA3AF', tag: 'Modern' },
  { id: 'beige-tile',   name: 'Beige Tile',    hex: '#D4C5A9', tag: 'Classic' },
];

const CEILING_OPTIONS = [
  { id: 'cove-led',    name: 'PVC Cove LED',    icon: '💡', desc: 'False ceiling with LED cove strip' },
  { id: 'flat-pvc',   name: 'Flat White PVC',  icon: '⬜', desc: 'Clean flat PVC panel ceiling' },
  { id: 'rafter-wood',name: 'Wood Rafter Grid', icon: '🪵', desc: 'Decorative wooden beam grid' },
];

const LED_OPTIONS = [
  { id: 'warm',      name: 'Warm 2700K',   dot: '#FFB347' },
  { id: 'neutral',   name: 'Daylight 4000K',dot: '#FFF8F0' },
  { id: 'cool',      name: 'Cool 6000K',   dot: '#B8D8FF' },
  { id: 'rgb-red',   name: 'RGB Red',      dot: '#FF3366' },
  { id: 'rgb-cyan',  name: 'RGB Cyan',     dot: '#00F5FF' },
  { id: 'rgb-purple',name: 'RGB Purple',   dot: '#BF5FFF' },
];

const SOFA_OPTIONS = [
  { id: 'cream',      name: 'Cream Fabric',  hex: '#F5F0E6' },
  { id: 'charcoal',   name: 'Charcoal',      hex: '#3A3A3A' },
  { id: 'olive',      name: 'Olive Green',   hex: '#6B7A5F' },
  { id: 'terracotta', name: 'Terracotta',    hex: '#C1694F' },
  { id: 'navy',       name: 'Navy Blue',     hex: '#1B3A5C' },
];

/* ── Section header helper ───────────────────────────────────── */
const SectionLabel = ({ icon: Icon, label, color = 'text-deep-olive' }) => (
  <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${color}`}>
    <Icon className="w-3.5 h-3.5" />
    <span>{label}</span>
  </div>
);

/* ── Main Component ──────────────────────────────────────────── */
export const MaterialSelector = ({
  wallColor,       setWallColor,
  floorMaterial,   setFloorMaterial,
  ceilingStyle,    setCeilingStyle,
  ledColor,        setLedColor,
  sofaColor,       setSofaColor,
  tvBacklight,     setTvBacklight,
  onRequestDesign,
  onReset,
}) => {
  return (
    <div className="bg-white border border-[#E8DDCC] rounded-3xl shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-[#3F5036] px-6 py-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-white leading-tight">3D Room Customizer</h3>
          <p className="text-white/60 text-[11px] mt-0.5">Changes reflect instantly in the 3D view</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={onRequestDesign}
            className="flex items-center gap-1.5 bg-white text-[#3F5036] hover:bg-[#F5F0E6] font-bold text-xs px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
          >
            <Send className="w-3.5 h-3.5" /> Request This Design
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* ── 1. WALL COLOR ──────────────────────────── */}
        <div className="space-y-3">
          <SectionLabel icon={Layers} label="Wall Color" />
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {WALL_COLORS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setWallColor(opt.id)}
                title={opt.name}
                className={`relative group flex flex-col items-center gap-1.5 transition-all`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border-2 shadow-sm transition-all ${
                    wallColor === opt.id
                      ? 'border-[#3F5036] scale-110 shadow-md'
                      : 'border-[#E8DDCC] hover:border-[#B9A895] hover:scale-105'
                  }`}
                  style={{ backgroundColor: opt.hex }}
                >
                  {wallColor === opt.id && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                      <Check className="w-3.5 h-3.5 text-[#3F5036] drop-shadow-sm" />
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-medium text-[#292A26]/60 leading-tight text-center hidden sm:block">
                  {opt.name.split(' ')[0]}
                </span>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#292A26] text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {opt.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E8DDCC]" />

        {/* ── 2. FLOOR MATERIAL ──────────────────────── */}
        <div className="space-y-3">
          <SectionLabel icon={Disc} label="Floor Material" color="text-[#9BAA91]" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {FLOOR_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFloorMaterial(opt.id)}
                className={`relative flex items-center gap-2.5 p-2.5 rounded-xl border-2 transition-all text-left ${
                  floorMaterial === opt.id
                    ? 'border-[#3F5036] bg-[#F5F0E6] shadow-sm'
                    : 'border-[#E8DDCC] hover:border-[#B9A895] bg-white'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg shrink-0 shadow-inner border border-black/10"
                  style={{ backgroundColor: opt.hex }}
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#292A26] truncate">{opt.name}</p>
                  <p className="text-[9px] text-[#292A26]/50">{opt.tag}</p>
                </div>
                {floorMaterial === opt.id && (
                  <Check className="w-3.5 h-3.5 text-[#3F5036] absolute top-1.5 right-1.5 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E8DDCC]" />

        {/* ── 3. CEILING STYLE ───────────────────────── */}
        <div className="space-y-3">
          <SectionLabel icon={Sun} label="Ceiling Style" color="text-amber-600" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CEILING_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setCeilingStyle(opt.id)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  ceilingStyle === opt.id
                    ? 'border-[#3F5036] bg-[#F5F0E6] shadow-sm'
                    : 'border-[#E8DDCC] hover:border-[#B9A895] bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-xs font-bold text-[#292A26]">{opt.name}</span>
                  {ceilingStyle === opt.id && <Check className="w-3.5 h-3.5 text-[#3F5036] ml-auto" />}
                </div>
                <p className="text-[10px] text-[#292A26]/50 leading-snug">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E8DDCC]" />

        {/* ── 4. LED LIGHT COLOR ─────────────────────── */}
        <div className="space-y-3">
          <SectionLabel icon={Zap} label="LED Cove Light Color" color="text-amber-500" />
          <div className="flex flex-wrap gap-2">
            {LED_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setLedColor(opt.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border-2 text-xs font-semibold transition-all ${
                  ledColor === opt.id
                    ? 'border-[#3F5036] bg-[#3F5036] text-white shadow-md scale-105'
                    : 'border-[#E8DDCC] bg-white text-[#292A26] hover:border-[#B9A895]'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: opt.dot }}
                />
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E8DDCC]" />

        {/* ── 5. SOFA COLOR + TV BACKLIGHT ───────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Sofa */}
          <div className="space-y-3">
            <SectionLabel icon={Armchair} label="Sofa Color" color="text-[#B9A895]" />
            <div className="flex flex-wrap gap-2">
              {SOFA_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSofaColor(opt.id)}
                  title={opt.name}
                  className={`relative group flex items-center gap-2 px-3 py-2 rounded-full border-2 text-xs font-semibold transition-all ${
                    sofaColor === opt.id
                      ? 'border-[#3F5036] bg-[#F5F0E6] text-[#292A26] shadow-md'
                      : 'border-[#E8DDCC] bg-white text-[#292A26]/70 hover:border-[#B9A895]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: opt.hex }}
                  />
                  {opt.name}
                  {sofaColor === opt.id && <Check className="w-3 h-3 text-[#3F5036]" />}
                </button>
              ))}
            </div>
          </div>

          {/* TV backlight toggle */}
          <div className="space-y-3">
            <SectionLabel icon={Tv2} label="TV Backlight" color="text-[#292A26]" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTvBacklight(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-xs font-bold transition-all ${
                  tvBacklight ? 'border-[#3F5036] bg-[#3F5036] text-white' : 'border-[#E8DDCC] bg-white text-[#292A26]/60 hover:border-[#B9A895]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" /> On
              </button>
              <button
                onClick={() => setTvBacklight(false)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-xs font-bold transition-all ${
                  !tvBacklight ? 'border-[#3F5036] bg-[#3F5036] text-white' : 'border-[#E8DDCC] bg-white text-[#292A26]/60 hover:border-[#B9A895]'
                }`}
              >
                Off
              </button>
              <p className="text-[10px] text-[#292A26]/50 leading-snug max-w-[160px]">
                Ambient LED glow behind the TV screen
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA bar ──────────────────────────── */}
        <div className="bg-[#F5F0E6] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#E8DDCC]">
          <div>
            <p className="font-serif text-sm font-bold text-[#292A26]">Love what you've designed?</p>
            <p className="text-[11px] text-[#292A26]/60 mt-0.5">
              Submit your custom design choices — our team will turn it into reality.
            </p>
          </div>
          <button
            onClick={onRequestDesign}
            className="shrink-0 flex items-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" /> Request This Design
          </button>
        </div>

      </div>
    </div>
  );
};

export default MaterialSelector;
