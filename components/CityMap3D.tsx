'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface Building {
  id: string;
  residentId: string;
  position: [number, number, number];
  height: number;
  color: string;
  name: string;
  activity: number; // 활동 지수 (0-100)
}

interface CityMap3DProps {
  buildings: Building[];
  onBuildingClick?: (buildingId: string) => void;
}

// 개별 건물 컴포넌트
function BuildingMesh({ building, onClick }: { building: Building; onClick?: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // 미세한 떨림 효과 (활동 지수에 따라)
      meshRef.current.position.y = building.position[1] + Math.sin(state.clock.elapsedTime * 2 + building.id.length) * 0.02 * (building.activity / 100);
    }
  });

  // 활동 지수에 따른 색상 계산
  const glowColor = useMemo(() => {
    if (building.activity > 70) return '#D4AF37'; // Gold - 활발
    if (building.activity > 40) return '#12061A'; // Purple - 보통
    return '#12061A'; // Dark - 비활성
  }, [building.activity]);

  return (
    <group position={building.position}>
      {/* 건물 본체 */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, building.height, 1]} />
        <meshStandardMaterial
          color={building.color}
          emissive={glowColor}
          emissiveIntensity={hovered ? 0.8 : building.activity / 200}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* 건물 이름 (hover 시) */}
      {hovered && (
        <Text
          position={[0, building.height / 2 + 0.5, 0]}
          fontSize={0.2}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
        >
          {building.name}
        </Text>
      )}

      {/* 활동 지표 (빛나는 링) */}
      {building.activity > 50 && (
        <mesh position={[0, building.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}

// 바닥 그리드
function Grid() {
  return (
    <gridHelper args={[20, 20, '#12061A', '#0C081A']} position={[0, 0, 0]} />
  );
}

// 조명
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        color="#D4AF37"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#12061A" />
    </>
  );
}

export default function CityMap3D({ buildings, onBuildingClick }: CityMap3DProps) {
  return (
    <div className="w-full h-[600px] md:h-[800px] relative rounded-2xl overflow-hidden border border-[#D4AF37]/20">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [8, 8, 8], fov: 60 }}
      >
        {/* 조명 */}
        <Lighting />

        {/* 환경 */}
        <Environment preset="night" />

        {/* 바닥 그리드 */}
        <Grid />

        {/* 건물들 */}
        {buildings.map((building) => (
          <BuildingMesh
            key={building.id}
            building={building}
            onClick={() => onBuildingClick?.(building.id)}
          />
        ))}

        {/* 포스트프로세싱 */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        {/* 컨트롤 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={5}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* 오버레이 UI */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-lg p-4 border border-white/10">
        <h3 className="text-white font-semibold mb-2">발루루체</h3>
        <div className="text-sm text-gray-400">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
            <span>활발한 활동</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#12061A]" />
            <span>일반 활동</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#12061A]" />
            <span>비활성</span>
          </div>
        </div>
      </div>
    </div>
  );
}

