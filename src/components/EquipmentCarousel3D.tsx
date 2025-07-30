// src/components/EquipmentCarousel3D.tsx
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useTexture, RoundedBox, Sparkles } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// Import your assets
import cameraImage from "@/assets/category-camera.jpg";
import droneImage from "@/assets/category-drone.jpg";
import gimbalImage from "@/assets/category-gimbal.jpg";
import audioImage from "@/assets/category-audio.jpg";
import lightingImage from "@/assets/equipment-lighting.jpg";
import fullKitImage from "@/assets/category-gearupkit.jpg";

interface EquipmentItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

const equipmentData: EquipmentItem[] = [
  {
    id: "mock-camera-101",
    name: "Cinema Cameras",
    image: cameraImage,
    category: "Photography",
  },
  {
    id: "mock-drone-456",
    name: "Aerial Drones",
    image: droneImage,
    category: "Aerial",
  },
  {
    id: "mock-gimbal-789",
    name: "Stabilizers & Gimbals",
    image: gimbalImage,
    category: "Stabilization",
  },
  {
    id: "mock-audio-112",
    name: "Professional Audio",
    image: audioImage,
    category: "Audio",
  },
  {
    id: "mock-lighting-131",
    name: "Lighting Kits",
    image: lightingImage,
    category: "Lighting",
  },
  {
    id: "mock-kit-007",
    name: "Complete Gear Kits",
    image: fullKitImage,
    category: "Kits",
  },
];

function EquipmentBox({
  equipment,
  position,
}: {
  equipment: EquipmentItem;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(equipment.image);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    // Smoothly animate scale on hover
    const targetScale = isHovered ? 1.2 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    // Gentle floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
  });

  const handleClick = () => navigate(`/equipment/${equipment.id}`);

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2.2, 2.2, 0.5]}
        radius={0.1}
        smoothness={4}
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <meshPhysicalMaterial
          map={texture}
          color={"#ffffff"}
          metalness={0.1}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
          emissive={
            isHovered ? new THREE.Color(0xff5e5e) : new THREE.Color(0x000000)
          }
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </RoundedBox>

      {/* Details now appear on hover */}
      {isHovered && (
        <Html
          position={[0, -1.8, 0]}
          center
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div className="bg-black/80 backdrop-blur-sm border border-primary/50 rounded-lg p-3 text-center shadow-glow animate-fade-in">
            <h3 className="text-white font-bold text-lg">{equipment.name}</h3>
            <p className="text-primary text-sm">{equipment.category}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function CarouselScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const velocity = useRef(0);
  const lastX = useRef(0);

  useFrame((state, delta) => {
    const { pointer } = state;
    // Calculate mouse velocity
    const speed = pointer.x - lastX.current;
    // Add velocity with a multiplier, and apply damping
    velocity.current += speed * 0.03;
    velocity.current *= 0.95; // Damping factor (friction)

    // Apply rotation
    groupRef.current.rotation.y += velocity.current;

    // Add a slow constant rotation
    groupRef.current.rotation.y += 0.001;

    lastX.current = pointer.x;
  });

  const radius = 5;
  const angleStep = (Math.PI * 2) / equipmentData.length;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[0, 5, 0]}
        intensity={2}
        color="#ff5e5e"
        distance={15}
      />
      <directionalLight position={[10, 10, 10]} intensity={0.5} />

      <Sparkles count={80} scale={12} size={1.2} speed={0.4} color="#ff5e5e" />

      <group ref={groupRef}>
        {equipmentData.map((equipment, index) => {
          const angle = index * angleStep;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <Suspense fallback={null} key={equipment.id}>
              <EquipmentBox position={[x, 0, z]} equipment={equipment} />
            </Suspense>
          );
        })}
        <points>
          <ringGeometry args={[radius * 1.05, radius * 1.06, 128]} />
          <pointsMaterial color="#ff5e5e" size={0.05} />
        </points>
      </group>
    </>
  );
}

export default function EquipmentCarousel3D() {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] cursor-move">
      <Canvas
        shadows
        camera={{ position: [0, 2, 12], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense
          fallback={
            <Html center className="text-white">
              Loading 3D Scene...
            </Html>
          }
        >
          <CarouselScene />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-muted text-xs bg-black/50 p-2 rounded">
        Move cursor to spin • Click an item to view
      </div>
    </div>
  );
}
