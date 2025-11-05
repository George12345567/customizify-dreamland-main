import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

interface Hoodie3DModelProps {
  color: string;
  size: string;
  designUrl?: string;
  onModelLoaded?: () => void;
}

const Hoodie3DModel: React.FC<Hoodie3DModelProps> = ({ 
  color, 
  size, 
  designUrl, 
  onModelLoaded 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const hoodieRef = useRef<THREE.Group | null>(null);
  const designTextureRef = useRef<THREE.Texture | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;
    
    // Load hoodie model
    const loader = new GLTFLoader();
    
    // For now, we'll use a placeholder model
    // In a real application, you would load your actual hoodie model
    const geometry = new THREE.BoxGeometry(2, 2, 0.5);
    const material = new THREE.MeshStandardMaterial({ 
      color: color,
      roughness: 0.7,
      metalness: 0.1
    });
    
    const hoodie = new THREE.Mesh(geometry, material);
    hoodie.castShadow = true;
    hoodie.receiveShadow = true;
    scene.add(hoodie);
    hoodieRef.current = hoodie;
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (hoodieRef.current) {
        // Gentle rotation animation
        hoodieRef.current.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Notify that the model is loaded
    setIsLoading(false);
    if (onModelLoaded) onModelLoaded();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (designTextureRef.current) {
        designTextureRef.current.dispose();
      }
    };
  }, []);
  
  // Update hoodie color when color prop changes
  useEffect(() => {
    if (!hoodieRef.current) return;
    
    // Animate color change with GSAP
    const currentColor = new THREE.Color();
    const targetColor = new THREE.Color(color);
    
    gsap.to(currentColor, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (hoodieRef.current && hoodieRef.current.material instanceof THREE.MeshStandardMaterial) {
          hoodieRef.current.material.color.copy(currentColor);
        }
      }
    });
  }, [color]);
  
  // Update hoodie size when size prop changes
  useEffect(() => {
    if (!hoodieRef.current) return;
    
    // Map size to scale
    const sizeMap: Record<string, number> = {
      'XS': 0.8,
      'S': 0.9,
      'M': 1.0,
      'L': 1.1,
      'XL': 1.2,
      'XXL': 1.3
    };
    
    const targetScale = sizeMap[size] || 1.0;
    
    // Animate scale change with GSAP
    gsap.to(hoodieRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  }, [size]);
  
  // Update design texture when designUrl changes
  useEffect(() => {
    if (!designUrl || !hoodieRef.current || !sceneRef.current) return;
    
    // Load texture
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(
      designUrl,
      (texture) => {
        // Dispose of old texture if it exists
        if (designTextureRef.current) {
          designTextureRef.current.dispose();
        }
        
        // Store reference to new texture
        designTextureRef.current = texture;
        
        // Apply texture to hoodie
        if (hoodieRef.current && hoodieRef.current.material instanceof THREE.MeshStandardMaterial) {
          // Create a new material with the texture
          const newMaterial = new THREE.MeshStandardMaterial({
            color: color,
            map: texture,
            roughness: 0.7,
            metalness: 0.1
          });
          
          // Animate material change
          gsap.to(hoodieRef.current.material, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              // Replace material
              hoodieRef.current!.material = newMaterial;
              
              // Fade in new material
              gsap.to(hoodieRef.current!.material, {
                opacity: 1,
                duration: 0.3
              });
            }
          });
        }
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        setError('Failed to load design texture');
      }
    );
  }, [designUrl, color]);
  
  return (
    <div className="hoodie-3d-model">
      {isLoading && (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading 3D model...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <div className="error"></div>
          <p>{error}</p>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="three-container"
        style={{ 
          width: '100%', 
          height: '400px',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}
      />
    </div>
  );
};

export default Hoodie3DModel; 