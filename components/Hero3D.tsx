'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// 회전하는 금빛 링
function RotatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[2, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// 보라색 Glow 박스
function GlowBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#12061A"
        emissive="#12061A"
        emissiveIntensity={0.8}
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// 파티클 효과
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[600px] md:h-[800px] relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        {/* 카메라 */}
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        
        {/* 조명 */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          color="#D4AF37"
        />
        <pointLight
          position={[-5, -5, 5]}
          intensity={0.5}
          color="#12061A"
        />
        
        {/* 환경 */}
        <Environment preset="night" />
        
        {/* 3D 오브젝트 */}
        <RotatingRing />
        <GlowBox />
        <Particles />
        
        {/* 포스트프로세싱 - Bloom 효과 */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        
        {/* 컨트롤 (선택적) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}

