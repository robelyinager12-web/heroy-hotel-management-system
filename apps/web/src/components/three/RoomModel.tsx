"use client";

interface WindowGridProps {
  floors: number;
  windowsPerFloor: number;
  width: number;
  height: number;
}

export function WindowGrid({ floors, windowsPerFloor, width, height }: WindowGridProps) {
  const windows = [];
  const floorHeight = height / floors;
  const windowSpacing = width / (windowsPerFloor + 1);

  for (let f = 0; f < floors; f++) {
    for (let w = 0; w < windowsPerFloor; w++) {
      const lit = Math.random() > 0.4;
      const x = -width / 2 + windowSpacing * (w + 1);
      const y = -height / 2 + floorHeight * (f + 0.5);

      windows.push(
        <mesh key={`${f}-${w}`} position={[x, y, 0.51]}>
          <planeGeometry args={[0.35, 0.5]} />
          <meshStandardMaterial
            color={lit ? "#e6c368" : "#1c1f29"}
            emissive={lit ? "#e6c368" : "#000000"}
            emissiveIntensity={lit ? 0.8 : 0}
          />
        </mesh>
      );
    }
  }

  return <group>{windows}</group>;
}