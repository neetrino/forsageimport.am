"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  type Group,
  type Mesh,
  type Points,
} from "three";

type HeroRoad3DProps = {
  active: number;
};

const sceneTint = [
  { fog: "#090b10", accent: "#f05a18", rim: "#1a4a78" },
  { fog: "#090b10", accent: "#ff6a28", rim: "#245f96" },
  { fog: "#090b10", accent: "#e85a1a", rim: "#163d66" },
] as const;

export function HeroRoad3D({ active }: HeroRoad3DProps) {
  const tint = sceneTint[active] ?? sceneTint[0];

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 2.4, 8.5], fov: 55, near: 0.1, far: 120 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={[tint.fog]} />
        <fog attach="fog" args={[tint.fog, 12, 78]} />
        <ambientLight intensity={0.22} />
        <directionalLight position={[4, 8, 2]} intensity={0.35} color="#d8e2f0" />
        <pointLight position={[0, 3, -18]} intensity={18} distance={55} color={tint.accent} />
        <pointLight position={[-8, 2.5, -8]} intensity={10} distance={40} color={tint.rim} />
        <pointLight position={[8, 2.2, -6]} intensity={6} distance={35} color="#c6281e" />
        <RoadWorld accent={tint.accent} rim={tint.rim} speed={active === 1 ? 1.25 : 1} />
      </Canvas>
    </div>
  );
}

type RoadWorldProps = {
  accent: string;
  rim: string;
  speed: number;
};

function RoadWorld({ accent, rim, speed }: RoadWorldProps) {
  const rig = useRef<Group>(null);
  const dashes = useRef<Group>(null);
  const sparks = useRef<Points>(null);
  const accentColor = useMemo(() => new Color(accent), [accent]);
  const rimColor = useMemo(() => new Color(rim), [rim]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const move = delta * (14 * speed);

    if (dashes.current) {
      dashes.current.position.z += move;
      if (dashes.current.position.z > 8) {
        dashes.current.position.z -= 8;
      }
    }

    if (sparks.current) {
      const positions = sparks.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i += 1) {
        let z = positions.getZ(i) + move * (1.4 + (i % 5) * 0.12);
        if (z > 10) z = -70 - ((i * 17) % 20);
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }

    if (rig.current) {
      rig.current.rotation.z = Math.sin(t * 0.35) * 0.012;
      rig.current.position.y = Math.sin(t * 0.55) * 0.04;
    }

    state.camera.position.x = Math.sin(t * 0.22) * 0.22;
    state.camera.position.y = 2.35 + Math.sin(t * 0.4) * 0.05;
    state.camera.lookAt(0, 0.4, -35);
  });

  const dashSlots = useMemo(() => {
    const slots: number[] = [];
    for (let z = -70; z <= 12; z += 8) slots.push(z);
    return slots;
  }, []);

  const sparkPositions = useMemo(() => {
    const count = 90;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const n1 = ((i * 37) % 100) / 100;
      const n2 = ((i * 53) % 100) / 100;
      const n3 = ((i * 91) % 100) / 100;
      data[i * 3] = side * (3.2 + n1 * 7);
      data[i * 3 + 1] = 0.4 + n2 * 3.5;
      data[i * 3 + 2] = -n3 * 80;
    }
    return data;
  }, []);

  return (
    <group ref={rig}>
      {/* Asphalt deck */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]} receiveShadow>
        <planeGeometry args={[16, 110]} />
        <meshStandardMaterial color="#10131a" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Soft shoulder washes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6.2, 0.01, -30]}>
        <planeGeometry args={[3.2, 110]} />
        <meshStandardMaterial
          color={rimColor}
          emissive={rimColor}
          emissiveIntensity={0.35}
          transparent
          opacity={0.22}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6.2, 0.01, -30]}>
        <planeGeometry args={[3.2, 110]} />
        <meshStandardMaterial
          color="#c6281e"
          emissive="#c6281e"
          emissiveIntensity={0.22}
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* Orange drive lanes */}
      <LaneStripe x={-2.55} color={accentColor} />
      <LaneStripe x={2.55} color={accentColor} />

      {/* Center dashes */}
      <group ref={dashes}>
        {dashSlots.map((z) => (
          <mesh key={z} position={[0, 0.03, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22, 3.2]} />
            <meshStandardMaterial
              color="#f4f7fb"
              emissive="#ffffff"
              emissiveIntensity={0.35}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Horizon gate */}
      <mesh position={[0, 4.5, -68]}>
        <planeGeometry args={[90, 28]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 3.2, -66]}>
        <planeGeometry args={[70, 10]} />
        <meshBasicMaterial color={rimColor} transparent opacity={0.12} />
      </mesh>

      {/* Speed sparks */}
      <points ref={sparks}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={accentColor}
          transparent
          opacity={0.75}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function LaneStripe({ x, color }: { x: number; color: Color }) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const mat = mesh.current.material;
    if ("emissiveIntensity" in mat) {
      mat.emissiveIntensity = 0.55 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, -30]}>
      <planeGeometry args={[1.35, 110]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.65}
        transparent
        opacity={0.72}
        roughness={0.35}
        metalness={0.2}
      />
    </mesh>
  );
}
