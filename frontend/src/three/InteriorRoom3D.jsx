import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Color/material helpers ─────────────────────────────────── */
const WALL_COLORS = {
  'warm-ivory':   '#F5F0E6',
  'pure-white':   '#FFFFFF',
  'soft-beige':   '#E8DDCC',
  'warm-taupe':   '#B9A895',
  'sage-green':   '#9BAA91',
  'deep-olive':   '#3F5036',
  'navy-blue':    '#1B3A5C',
  'charcoal':     '#292A26',
  'terracotta':   '#C1694F',
  'dusty-rose':   '#C9A5A0',
  'slate-grey':   '#6B7280',
  'cream-yellow': '#F9F3DC',
};

const FLOOR_PROPS = {
  'light-marble': { color: '#EAE6E1', roughness: 0.08, metalness: 0.08 },
  'dark-marble':  { color: '#2A2A2A', roughness: 0.1,  metalness: 0.1  },
  'light-wood':   { color: '#D2B48C', roughness: 0.55, metalness: 0.0  },
  'dark-wood':    { color: '#5C3D1E', roughness: 0.6,  metalness: 0.0  },
  'grey-tile':    { color: '#9CA3AF', roughness: 0.3,  metalness: 0.05 },
  'beige-tile':   { color: '#D4C5A9', roughness: 0.35, metalness: 0.02 },
};

const SOFA_COLORS = {
  'cream':    '#F5F0E6',
  'charcoal': '#3A3A3A',
  'olive':    '#6B7A5F',
  'terracotta':'#C1694F',
  'navy':     '#1B3A5C',
};

const LED_COLORS = {
  'warm':    '#FFB347',
  'neutral': '#FFF8F0',
  'cool':    '#B8D8FF',
  'rgb-red': '#FF3366',
  'rgb-cyan':'#00F5FF',
  'rgb-purple': '#BF5FFF',
};

export const InteriorRoom3D = ({
  wallColor      = 'warm-ivory',
  floorMaterial  = 'light-marble',
  ceilingStyle   = 'cove-led',
  ledColor       = 'warm',
  sofaColor      = 'cream',
  tvBacklight    = true,
}) => {
  const fanRef   = useRef();
  const glowRef  = useRef();

  const wc  = WALL_COLORS[wallColor]   || '#F5F0E6';
  const fp  = FLOOR_PROPS[floorMaterial] || FLOOR_PROPS['light-marble'];
  const lc  = LED_COLORS[ledColor]     || '#FFB347';
  const sc  = SOFA_COLORS[sofaColor]   || '#F5F0E6';

  // Fan rotation
  useFrame((_, delta) => {
    if (fanRef.current) fanRef.current.rotation.y += delta * 3;
    if (glowRef.current) {
      glowRef.current.intensity = 1.8 + Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  const woodCeiling = ceilingStyle === 'rafter-wood';
  const coveLED     = ceilingStyle === 'cove-led' || ceilingStyle === 'flat-pvc';

  return (
    <group position={[0, -1.5, 0]}>

      {/* ── LIGHTING ─────────────────────────────────── */}
      <ambientLight intensity={0.55} color="#FFF8EE" />
      <directionalLight position={[3, 6, 3]} intensity={0.6} castShadow
        shadow-mapSize={[2048, 2048]} color="#FFFFFF" />

      {/* LED Cove strip */}
      {coveLED && (
        <rectAreaLight ref={glowRef}
          width={5.8} height={5.8} color={lc}
          intensity={2.0} position={[0, 4.82, 0]}
          rotation={[Math.PI / 2, 0, 0]} />
      )}

      {/* Recessed spotlights */}
      <pointLight position={[-1.8, 4.5, -1.8]} intensity={1.2} color={lc} distance={5} />
      <pointLight position={[ 1.8, 4.5, -1.8]} intensity={1.2} color={lc} distance={5} />
      <pointLight position={[-1.8, 4.5,  1.8]} intensity={0.9} color={lc} distance={4} />
      <pointLight position={[ 1.8, 4.5,  1.8]} intensity={0.9} color={lc} distance={4} />

      {/* TV backlight */}
      {tvBacklight && (
        <pointLight position={[0, 2.9, -3.7]} intensity={0.8} color={lc} distance={3} />
      )}

      {/* ── FLOOR ────────────────────────────────────── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color={fp.color} roughness={fp.roughness} metalness={fp.metalness} />
      </mesh>

      {/* ── WALLS ────────────────────────────────────── */}
      {/* Back wall */}
      <mesh receiveShadow position={[0, 2.7, -4.5]}>
        <planeGeometry args={[9, 5.5]} />
        <meshStandardMaterial color={wc} roughness={0.65} />
      </mesh>
      {/* Left wall */}
      <mesh receiveShadow rotation={[0, Math.PI / 2, 0]} position={[-4.5, 2.7, 0]}>
        <planeGeometry args={[9, 5.5]} />
        <meshStandardMaterial color={wc} roughness={0.65} />
      </mesh>
      {/* Right wall */}
      <mesh receiveShadow rotation={[0, -Math.PI / 2, 0]} position={[4.5, 2.7, 0]}>
        <planeGeometry args={[9, 5.5]} />
        <meshStandardMaterial color={wc} roughness={0.65} />
      </mesh>

      {/* ── CEILING ──────────────────────────────────── */}
      {woodCeiling ? (
        // Wooden rafter beams
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.1, 0]}>
            <planeGeometry args={[9, 9]} />
            <meshStandardMaterial color="#8B6340" roughness={0.7} />
          </mesh>
          {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
            <mesh key={i} position={[x, 4.9, 0]} castShadow>
              <boxGeometry args={[0.12, 0.25, 9]} />
              <meshStandardMaterial color="#5C3D1E" roughness={0.8} />
            </mesh>
          ))}
          {[-3, -1.5, 0, 1.5, 3].map((z, i) => (
            <mesh key={`z${i}`} position={[0, 4.9, z]} castShadow>
              <boxGeometry args={[9, 0.25, 0.12]} />
              <meshStandardMaterial color="#5C3D1E" roughness={0.8} />
            </mesh>
          ))}
        </>
      ) : (
        // PVC flat / cove ceiling
        <>
          {/* Main ceiling slab */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.1, 0]}>
            <planeGeometry args={[9, 9]} />
            <meshStandardMaterial color="#F8F8F8" roughness={0.4} />
          </mesh>
          {/* Cove tray */}
          <mesh position={[0, 4.9, 0]}>
            <boxGeometry args={[6, 0.22, 6]} />
            <meshStandardMaterial color="#F2EFE9" roughness={0.3} />
          </mesh>
          {/* Inner inset */}
          <mesh position={[0, 4.78, 0]}>
            <boxGeometry args={[4.8, 0.06, 4.8]} />
            <meshStandardMaterial color="#ECE8E1" roughness={0.2} />
          </mesh>
          {/* Recessed spotlight discs */}
          {[[-1.8,-1.8],[ 1.8,-1.8],[-1.8, 1.8],[ 1.8, 1.8]].map(([x, z], i) => (
            <mesh key={i} position={[x, 4.77, z]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.09, 16]} />
              <meshStandardMaterial color="#FFFFEE" emissive="#FFFFF0" emissiveIntensity={1.5} />
            </mesh>
          ))}
        </>
      )}

      {/* ── WALL MOULDING (Back wall decorative panels) ── */}
      {/* Left panel frame */}
      {[[-2.6, 2.8, -4.42], [2.6, 2.8, -4.42]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1.8, 3.2, 0.04]} />
          <meshStandardMaterial color={wc} roughness={0.5} />
        </mesh>
      ))}
      {/* Moulding border lines */}
      {[[-2.6, 2.8, -4.43], [2.6, 2.8, -4.43]].map(([x, y, z], i) => (
        <mesh key={`ml${i}`} position={[x, y, z]}>
          <boxGeometry args={[2.0, 3.4, 0.02]} />
          <meshStandardMaterial color="#D4C8B8" roughness={0.4} />
        </mesh>
      ))}

      {/* ── TV WALL FEATURE ─────────────────────────── */}
      {/* Dark backdrop panel */}
      <mesh position={[0, 2.8, -4.42]}>
        <boxGeometry args={[2.8, 3.4, 0.06]} />
        <meshStandardMaterial color="#292A26" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Fluted vertical panels */}
      {[-0.8,-0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 2.8, -4.38]}>
          <boxGeometry args={[0.06, 3.2, 0.06]} />
          <meshStandardMaterial color="#3A3A38" roughness={0.3} />
        </mesh>
      ))}
      {/* TV Screen */}
      <mesh position={[0, 3.0, -4.3]}>
        <boxGeometry args={[2.2, 1.3, 0.06]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* TV screen glow */}
      <mesh position={[0, 3.0, -4.24]}>
        <planeGeometry args={[2.1, 1.2]} />
        <meshStandardMaterial color="#1A2A3A" emissive="#0D1B2A" emissiveIntensity={0.6} />
      </mesh>
      {/* TV bezel thin border */}
      <mesh position={[0, 3.0, -4.29]}>
        <boxGeometry args={[2.26, 1.36, 0.02]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Floating TV console */}
      <mesh position={[0, 1.6, -4.1]} castShadow>
        <boxGeometry args={[2.8, 0.35, 0.55]} />
        <meshStandardMaterial color="#4A3728" roughness={0.5} />
      </mesh>
      {/* Console legs */}
      {[-1.0, 1.0].map((x, i) => (
        <mesh key={i} position={[x, 1.35, -4.1]}>
          <boxGeometry args={[0.06, 0.1, 0.06]} />
          <meshStandardMaterial color="#222" metalness={0.9} />
        </mesh>
      ))}
      {/* TV backlight strip glow mesh */}
      {tvBacklight && (
        <mesh position={[0, 3.0, -4.22]}>
          <planeGeometry args={[2.5, 1.5]} />
          <meshStandardMaterial color={lc} transparent opacity={0.04} emissive={lc} emissiveIntensity={0.3} />
        </mesh>
      )}

      {/* ── SOFA ─────────────────────────────────────── */}
      {/* Seat cushion */}
      <mesh position={[0, 0.45, 0.8]} receiveShadow castShadow>
        <boxGeometry args={[3.4, 0.38, 1.5]} />
        <meshStandardMaterial color={sc} roughness={0.85} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 1.12, 1.48]} castShadow>
        <boxGeometry args={[3.4, 0.9, 0.32]} />
        <meshStandardMaterial color={sc} roughness={0.85} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-1.86, 0.72, 0.8]} castShadow>
        <boxGeometry args={[0.32, 0.7, 1.5]} />
        <meshStandardMaterial color={sc} roughness={0.8} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[1.86, 0.72, 0.8]} castShadow>
        <boxGeometry args={[0.32, 0.7, 1.5]} />
        <meshStandardMaterial color={sc} roughness={0.8} />
      </mesh>
      {/* Sofa legs */}
      {[[-1.5,0.12,0.2],[ 1.5,0.12,0.2],[-1.5,0.12,1.5],[ 1.5,0.12,1.5]].map(([x,y,z],i) => (
        <mesh key={i} position={[x,y,z]} castShadow>
          <boxGeometry args={[0.08, 0.24, 0.08]} />
          <meshStandardMaterial color="#3A2E22" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      {/* Cushions */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.73, 1.3]}>
          <boxGeometry args={[0.75, 0.55, 0.18]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#9BAA91' : sc} roughness={0.9} />
        </mesh>
      ))}

      {/* ── COFFEE TABLE ─────────────────────────────── */}
      {/* Marble top */}
      <mesh position={[0, 0.36, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.95]} />
        <meshStandardMaterial color="#DEDAD5" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* Gold frame legs */}
      {[[-0.7,-0.3],[ 0.7,-0.3],[-0.7, 0.3],[ 0.7, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z + (-0.9)]}>
          <boxGeometry args={[0.05, 0.36, 0.05]} />
          <meshStandardMaterial color="#B8960C" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      {/* Decorative objects on table */}
      <mesh position={[-0.4, 0.46, -0.9]}>
        <cylinderGeometry args={[0.06, 0.08, 0.22, 16]} />
        <meshStandardMaterial color="#9BAA91" roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 0.44, -0.85]}>
        <boxGeometry args={[0.18, 0.04, 0.12]} />
        <meshStandardMaterial color="#F5F0E6" roughness={0.5} />
      </mesh>

      {/* ── INDOOR PLANT ─────────────────────────────── */}
      {/* Pot */}
      <mesh position={[3.5, 0.28, -2.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.38, 12]} />
        <meshStandardMaterial color="#6B5B4E" roughness={0.7} />
      </mesh>
      {/* Stem */}
      <mesh position={[3.5, 0.7, -2.5]}>
        <cylinderGeometry args={[0.025, 0.03, 0.65, 8]} />
        <meshStandardMaterial color="#3A5A2A" roughness={0.6} />
      </mesh>
      {/* Leaves */}
      {[[0,0.9,0],[0.2,0.85,0.1],[-0.2,0.8,-0.1],[0.1,0.95,-0.15],[-0.15,0.92,0.2]].map(([dx,dy,dz], i) => (
        <mesh key={i} position={[3.5+dx, dy, -2.5+dz]} rotation={[0.3*i, 0.8*i, 0.2*i]}>
          <sphereGeometry args={[0.18, 8, 6]} />
          <meshStandardMaterial color="#3D7A2B" roughness={0.9} />
        </mesh>
      ))}

      {/* ── CEILING FAN ──────────────────────────────── */}
      <group position={[0, 4.75, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
          <meshStandardMaterial color="#444" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.9} />
        </mesh>
        <group ref={fanRef}>
          {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.65, -0.18, Math.sin(angle) * 0.65]}
              rotation={[0, angle, -0.1]}
            >
              <boxGeometry args={[1.1, 0.02, 0.18]} />
              <meshStandardMaterial color="#5C3D1E" roughness={0.6} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── SIDE TABLE ───────────────────────────────── */}
      <mesh position={[-3.0, 0.55, -1.5]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 20]} />
        <meshStandardMaterial color="#8B6340" roughness={0.4} />
      </mesh>
      <mesh position={[-3.0, 0.28, -1.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 10]} />
        <meshStandardMaterial color="#B8960C" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Lamp on side table */}
      <mesh position={[-3.0, 0.9, -1.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.55, 8]} />
        <meshStandardMaterial color="#B8960C" metalness={0.9} />
      </mesh>
      <mesh position={[-3.0, 1.22, -1.5]}>
        <coneGeometry args={[0.22, 0.3, 16, 1, true]} />
        <meshStandardMaterial color="#F5F0E6" side={THREE.DoubleSide} roughness={0.7} transparent opacity={0.85} />
      </mesh>
      <pointLight position={[-3.0, 1.1, -1.5]} intensity={0.5} color="#FFA060" distance={2.5} />

    </group>
  );
};

export default InteriorRoom3D;
