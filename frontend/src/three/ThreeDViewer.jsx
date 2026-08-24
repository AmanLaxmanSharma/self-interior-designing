import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import { InteriorRoom3D } from './InteriorRoom3D';
import { RotateCcw, Compass, Maximize2 } from 'lucide-react';

const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F0E6]/90 backdrop-blur-sm z-20">
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#E8DDCC] rounded-full" />
        <div className="absolute inset-0 border-4 border-t-[#3F5036] rounded-full animate-spin" />
      </div>
      <span className="font-serif text-sm font-semibold text-[#292A26] tracking-wide">
        Rendering 3D Room...
      </span>
    </div>
  </div>
);

export const ThreeDViewer = ({
  wallColor,
  floorMaterial,
  ceilingStyle,
  ledColor,
  sofaColor,
  tvBacklight,
}) => {
  const controlsRef = useRef();

  const handleReset = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DDCC] bg-[#F5F0E6]">

      {/* Top toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3.5 py-2 rounded-full border border-[#E8DDCC] text-[11px] font-semibold text-[#292A26] shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#3F5036]" />
          <span className="hidden sm:inline">Drag · Scroll to Zoom · Double-click to Reset</span>
          <span className="sm:hidden">Drag to explore</span>
        </div>
      </div>

      {/* Reset view button */}
      <button
        onClick={handleReset}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white text-[11px] font-bold px-3.5 py-2 rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset View
      </button>

      {/* Three.js Canvas */}
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows
          className="w-full h-full"
          gl={{ antialias: true, toneMappingExposure: 1.2 }}
        >
          <PerspectiveCamera makeDefault position={[1.5, 3.2, 7]} fov={48} />

          {/* Soft background environment */}
          <color attach="background" args={['#F0EBE0']} />
          <fog attach="fog" args={['#F0EBE0', 12, 22]} />

          <InteriorRoom3D
            wallColor={wallColor}
            floorMaterial={floorMaterial}
            ceilingStyle={ceilingStyle}
            ledColor={ledColor}
            sofaColor={sofaColor}
            tvBacklight={tvBacklight}
          />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={12}
            blur={2.5}
            far={4}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={11}
            maxPolarAngle={Math.PI / 2 + 0.08}
            autoRotate={false}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </Suspense>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-2 bg-white/85 backdrop-blur px-4 py-2.5 border-t border-[#E8DDCC]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-semibold text-[#292A26]/70">
          <span>🎨 Wall: <span className="text-[#3F5036] capitalize">{wallColor?.replace('-', ' ')}</span></span>
          <span>🪵 Floor: <span className="text-[#3F5036] capitalize">{floorMaterial?.replace('-', ' ')}</span></span>
          <span>💡 Ceiling: <span className="text-[#3F5036] capitalize">{ceilingStyle?.replace('-', ' ')}</span></span>
          <span>🛋️ Sofa: <span className="text-[#3F5036] capitalize">{sofaColor}</span></span>
        </div>
        <span className="text-[10px] font-bold text-[#3F5036] hidden sm:inline">
          Karoli Interior Hub · 3D Studio
        </span>
      </div>
    </div>
  );
};

export default ThreeDViewer;
