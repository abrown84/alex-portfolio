"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}

function GradientSphere({ position, color, speed = 1, distort = 0.3 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function WobbleTorus({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.2, 32, 64]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function IcoSphere({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Octahedron({ position, color, speed = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5]} />
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

interface MouseFollowerProps {
  mousePosition: { x: number; y: number };
}

function MouseFollower({ mousePosition }: MouseFollowerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      const targetX = (mousePosition.x * viewport.width) / 2;
      const targetY = (mousePosition.y * viewport.height) / 2;

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;

      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <dodecahedronGeometry args={[0.15]} />
      <meshStandardMaterial
        color="#2dd4bf"
        emissive="#2dd4bf"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

interface FloatingShapesProps {
  mousePosition?: { x: number; y: number };
}

export function FloatingShapes({ mousePosition = { x: 0, y: 0 } }: FloatingShapesProps) {
  const { theme } = useTheme();

  const colors = useMemo(() => {
    const isDark = theme === "dark";
    return {
      primary: isDark ? "#38bdf8" : "#0284c7",      // Sky blue
      accent: isDark ? "#2dd4bf" : "#14b8a6",       // Teal
      secondary: isDark ? "#0ea5e9" : "#0369a1",   // Ocean blue
      tertiary: isDark ? "#5eead4" : "#0d9488",    // Bright teal
    };
  }, [theme]);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={colors.accent} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={colors.primary} />

      {/* Floating shapes */}
      <GradientSphere position={[-2.5, 1.5, -2]} color={colors.primary} speed={0.8} />
      <WobbleTorus position={[2.5, -1, -1]} color={colors.accent} speed={1.2} />
      <IcoSphere position={[-1.5, -1.5, -1.5]} color={colors.secondary} speed={1} />
      <Octahedron position={[2, 1.5, -2.5]} color={colors.tertiary} speed={0.9} />

      {/* Small accent shapes */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 2.5, -3]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-3, 0, -2]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial
            color={colors.primary}
            emissive={colors.primary}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Mouse follower */}
      <MouseFollower mousePosition={mousePosition} />
    </>
  );
}
