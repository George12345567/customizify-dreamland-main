import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Simple hoodie model component
const HoodieModel = ({ position, rotation, scale = 1, hovered = false }) => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Create a simple hoodie shape using basic geometries
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: position[1] + (hovered ? 0.5 : 0),
        duration: 0.5,
        ease: 'power2.out'
      });
      
      gsap.to(meshRef.current.rotation, {
        y: rotation[1] + (hovered ? Math.PI / 4 : 0),
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [hovered, position, rotation]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {/* Hoodie body */}
        <mesh>
          <boxGeometry args={[1, 1.5, 0.5]} />
          <meshStandardMaterial 
            color={hovered ? '#4a90e2' : '#2c3e50'} 
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        {/* Hood */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? '#4a90e2' : '#2c3e50'} 
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Main background component
const HoodieBackground = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const modelsRef = useRef([]);
  
  // Generate random positions for hoodie models
  const generatePositions = () => {
    const positions = [];
    for (let i = 0; i < 5; i++) {
      positions.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      ]);
    }
    return positions;
  };

  const [positions] = React.useState(generatePositions());

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        {positions.map((position, index) => (
          <HoodieModel
            key={index}
            position={position}
            rotation={[0, Math.random() * Math.PI * 2, 0]}
            scale={0.8}
            hovered={hoveredIndex === index}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default HoodieBackground; 