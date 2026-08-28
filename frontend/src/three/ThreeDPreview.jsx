import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, Layers, Box, Play } from 'lucide-react';

const ThreeDViewer = lazy(() => import('./ThreeDViewer'));

export const ThreeDPreview = ({ onOpenQuoteModal }) => {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <section className="py-20 bg-soft-beige/40 border-y border-warm-taupe/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-sage/20 text-deep-olive text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Technology</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              Visualize Your Dream Interior Before We Build
            </h2>

            <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
              Experience Karoli Interior Hub's real-time 3D Design Studio. Customize PVC false ceilings, wooden rafter textures, wall mouldings, and LED strip lighting temperatures instantly.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-charcoal/90">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-deep-olive text-white flex items-center justify-center text-xs font-bold">1</div>
                <span>Test PVC & Wood finish ceiling options</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-deep-olive text-white flex items-center justify-center text-xs font-bold">2</div>
                <span>Toggle LED cove strip temperatures (Warm/Cool/RGB)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-deep-olive text-white flex items-center justify-center text-xs font-bold">3</div>
                <span>360-degree interactive camera rotation</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/3d-studio"
                className="bg-deep-olive hover:bg-deep-olive/90 text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Enter Full 3D Design Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3D Canvas Preview Widget */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-deep-olive/10 via-muted-sage/20 to-warm-taupe/10 rounded-3xl blur-xl opacity-70" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal min-h-[420px] flex items-center justify-center border border-white/20">
              {isInteractive ? (
                <Suspense
                  fallback={
                    <div className="h-[420px] w-full flex flex-col items-center justify-center text-white/80 gap-3">
                      <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                      <span className="text-xs uppercase tracking-widest font-medium">Initializing 3D Studio…</span>
                    </div>
                  }
                >
                  <ThreeDViewer
                    wallMaterial="warm-ivory"
                    ceilingMaterial="white-pvc"
                    floorMaterial="light-marble"
                    lightColor="warm"
                    rgbEnabled={false}
                  />
                </Suspense>
              ) : (
                <div className="relative w-full h-[420px] bg-gradient-to-br from-[#292A26] via-[#3F5036] to-[#1f2a1a] flex flex-col items-center justify-center p-8 text-center">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/portfolio/p1_living_ceiling.jpg')" }}
                  />
                  <div className="relative z-10 space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center mx-auto text-white shadow-xl group hover:scale-110 transition-transform">
                      <Box className="w-8 h-8 text-amber-300 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-white font-serif text-xl font-bold">Interactive 3D Room Viewer</h3>
                      <p className="text-white/70 text-xs mt-1">
                        Rotate 360°, inspect PVC ceiling patterns, lighting coves, and wall textures in real-time.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsInteractive(true)}
                      className="bg-amber-500 hover:bg-amber-400 text-charcoal font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch 3D Interaction</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDPreview;
