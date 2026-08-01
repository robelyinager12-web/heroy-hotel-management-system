"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { WindowGrid } from "./RoomModel";

function HotelTower({
  position,
  width,
  height,
  depth,
  floors,
  windowsPerFloor,
  color,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  floors: number;
  windowsPerFloor: number;
  color: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
      </mesh>
      <WindowGrid floors={floors} windowsPerFloor={windowsPerFloor} width={width} height={height} />
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#1c2434" />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 12, 6]} intensity={1.8} color="#e8d4a3" castShadow />
      <pointLight position={[-6, 4, -4]} intensity={0.9} color="#8b909e" />
      <pointLight position={[0, 8, 10]} intensity={0.8} color="#f4f5f7" />

      <HotelTower
        position={[0, 1, 0]}
        width={5}
        height={8}
        depth={4}
        floors={12}
        windowsPerFloor={5}
        color="#2a3448"
      />
      <HotelTower
        position={[-6, -0.5, -2]}
        width={3}
        height={5}
        depth={3}
        floors={7}
        windowsPerFloor={3}
        color="#3a3320"
      />
      <HotelTower
        position={[6, -1, -3]}
        width={3}
        height={4}
        depth={3}
        floors={6}
        windowsPerFloor={3}
        color="#1c2434"
      />

      <Ground />
      <Stars radius={80} depth={40} count={2000} factor={2} fade speed={0.5} />
      <Environment preset="city" />

      <OrbitControls
        enablePan={false}
        minDistance={10}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
}

/**
 * Monitors the WebGL context lifecycle and prevents context exhaustion
 * during Fast Refresh / StrictMode remounts.
 *
 * - `webglcontextlost`: preventDefault so the browser can try to restore it.
 * - `webglcontextrestored`: log recovery so the scene resumes.
 * - On unmount: forceContextLoss() to actually release the GPU context slot
 *   (otherwise every HMR rebuild leaks a context until the browser evicts
 *   the oldest one — which surfaces as "THREE.WebGLRenderer: Context Lost").
 */
function WebGLContextGuard({ onContextLost }: { onContextLost?: () => void }) {
  const gl = useThree((state) => state.gl);
  const lostRef = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      lostRef.current = true;
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WebGL] Context lost — attempting restoration…");
      }
      onContextLost?.();
    };

    const handleContextRestored = () => {
      lostRef.current = false;
      if (process.env.NODE_ENV !== "production") {
        console.info("[WebGL] Context restored.");
      }
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      // Release this context so the next remount can acquire a fresh one.
      try {
        gl.forceContextLoss();
      } catch {
        /* context already gone */
      }
    };
  }, [gl, onContextLost]);

  return null;
}

export function HotelScene() {
  const [contextLost, setContextLost] = useState(false);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-platinum-100/10 bg-gradient-to-b from-navy-800 to-navy-950">
      <Canvas
        camera={{ position: [14, 6, 14], fov: 45 }}
        shadows
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <WebGLContextGuard onContextLost={handleContextLost} />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {contextLost && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-navy-800 to-navy-950 text-center">
          <span className="text-4xl">🏨</span>
          <p className="max-w-xs text-sm text-white/70">
            The 3D view is temporarily unavailable. It will reappear automatically.
          </p>
        </div>
      )}
    </div>
  );
}
