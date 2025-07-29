import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import tripodImage from '@/assets/equipment-tripod.jpg';
import droneImage from '@/assets/equipment-drone.jpg';
import drillImage from '@/assets/equipment-drill.jpg';
import cameraImage from '@/assets/equipment-camera.jpg';
import generatorImage from '@/assets/equipment-generator.jpg';
import lightingImage from '@/assets/equipment-lighting.jpg';

interface EquipmentItem {
  id: number;
  name: string;
  image: string;
  price: string;
  category: string;
}

const equipmentData: EquipmentItem[] = [
  { id: 1, name: "Professional Tripod", image: tripodImage, price: "$25/day", category: "Photography" },
  { id: 2, name: "Professional Drone", image: droneImage, price: "$150/day", category: "Aerial" },
  { id: 3, name: "Power Drill", image: drillImage, price: "$30/day", category: "Tools" },
  { id: 4, name: "DSLR Camera", image: cameraImage, price: "$80/day", category: "Photography" },
  { id: 5, name: "Power Generator", image: generatorImage, price: "$120/day", category: "Power" },
  { id: 6, name: "Stage Lighting", image: lightingImage, price: "$90/day", category: "Lighting" },
];

function EquipmentPlane({ position, imageUrl, equipment, isActive, onClick }: {
  position: [number, number, number];
  imageUrl: string;
  equipment: EquipmentItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Glow effect for active item
      if (isActive) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial 
          map={texture} 
          transparent
          emissive={isActive ? new THREE.Color(0xff5e5e) : new THREE.Color(0x000000)}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </mesh>
      
      {isActive && (
        <Html
          position={[0, -1.5, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="bg-surface/90 backdrop-blur-sm border border-primary/30 rounded-lg p-3 text-center shadow-glow">
            <h3 className="text-foreground font-semibold text-sm">{equipment.name}</h3>
            <p className="text-primary text-xs">{equipment.price}</p>
            <span className="text-muted-foreground text-xs">{equipment.category}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function CarouselScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useFrame((state) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const radius = 4;
  const angleStep = (Math.PI * 2) / equipmentData.length;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ff5e5e" />
      
      <group 
        ref={groupRef}
        onPointerEnter={() => setIsRotating(false)}
        onPointerLeave={() => setIsRotating(true)}
      >
        {equipmentData.map((equipment, index) => {
          const angle = index * angleStep;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <EquipmentPlane
              key={equipment.id}
              position={[x, 0, z]}
              imageUrl={equipment.image}
              equipment={equipment}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </group>
      
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function EquipmentCarousel3D() {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gradient-dark">
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <CarouselScene />
      </Canvas>
      
      {/* Overlay gradient for better integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      
      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-text-muted text-xs">
        Hover to pause • Click to select
      </div>
    </div>
  );
}