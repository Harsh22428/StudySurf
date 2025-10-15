// components/main/Animation.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimationData {
  scenes?: string[];
  focus_equations?: string[];
  javascript_code?: string;
  animation_description?: string;
  educational_purpose?: string;
  interaction_hints?: string[];
  duration_seconds?: number;
  complexity_level?: string;
}

interface AnimationProps {
  data: AnimationData | null;
}

// Declare THREE as a global variable since we're loading it from CDN
declare global {
  interface Window {
    THREE: any;
  }
}

const Animation: React.FC<AnimationProps> = ({ data }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  
  const atomsRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      setIsLoaded(true);
      initScene();
    };
    document.head.appendChild(script);

    return cleanup;
  }, []);

  const cleanup = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (rendererRef.current && mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
      mountRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }
    atomsRef.current = [];
  };

  const initScene = () => {
    if (!mountRef.current || !window.THREE) return;

    const THREE = window.THREE;

    // Simple scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Simple lighting
    const light = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(light);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Create simple atoms
    createAtoms(THREE, scene);

    // Start animation with actual chemistry
    const startTime = Date.now();
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const elapsed = (Date.now() - startTime) * 0.001; // time in seconds
      const cycle = elapsed % 8; // 8-second animation cycle
      
      if (atomsRef.current.length >= 4) {
        const sodium = atomsRef.current[0];
        const chlorine = atomsRef.current[1];
        const electron = atomsRef.current[2];
        const bond = atomsRef.current[3];

        if (cycle < 2) {
          // Phase 1: Atoms approach each other
          const progress = cycle / 2;
          sodium.position.x = -5 + progress * 2;
          chlorine.position.x = 5 - progress * 2;
          electron.position.x = -3.5 + progress * 0.5;
          bond.material.opacity = 0;
          
        } else if (cycle < 4) {
          // Phase 2: Electron transfers from Na to Cl
          const progress = (cycle - 2) / 2;
          sodium.position.x = -3;
          chlorine.position.x = 3;
          
          // Electron moves from sodium to chlorine with arc
          electron.position.x = -3 + progress * 6;
          electron.position.y = Math.sin(progress * Math.PI) * 2;
          
          // Atoms start glowing as they become ions
          if (progress > 0.7) {
            sodium.material.emissive.setHex(0x664400); // Na+ glow
            chlorine.material.emissive.setHex(0x006600); // Cl- glow
          }
          
        } else if (cycle < 6) {
          // Phase 3: Bond formation - atoms attracted
          const progress = (cycle - 4) / 2;
          sodium.position.x = -3 + progress * 1;
          chlorine.position.x = 3 - progress * 1;
          
          // Electron stays with chlorine
          electron.position.x = 3 + progress * (-1);
          electron.position.y = 0;
          
          // Bond becomes visible
          bond.material.opacity = progress * 0.8;
          bond.scale.x = 1 - progress * 0.3;
          
          // Stronger ion glow
          sodium.material.emissive.setHex(0x885500);
          chlorine.material.emissive.setHex(0x008800);
          
        } else {
          // Phase 4: Stable ionic compound
          sodium.position.x = -2;
          chlorine.position.x = 2;
          electron.position.x = 2.8;
          electron.position.y = 0;
          
          bond.material.opacity = 0.8;
          bond.scale.x = 0.7;
          
          // Gentle pulsing to show stability
          const pulse = 1 + Math.sin(elapsed * 3) * 0.05;
          sodium.scale.setScalar(pulse);
          chlorine.scale.setScalar(pulse);
          
          sodium.material.emissive.setHex(0x885500);
          chlorine.material.emissive.setHex(0x008800);
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();
  };

  const createAtoms = (THREE: any, scene: any) => {
    // Create sodium atom
    const sodiumGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const sodiumMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      emissive: 0x332200,
      shininess: 100 
    });
    const sodium = new THREE.Mesh(sodiumGeometry, sodiumMaterial);
    sodium.position.set(-5, 0, 0);
    scene.add(sodium);
    atomsRef.current.push(sodium);

    // Create chlorine atom
    const chlorineGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const chlorineMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      emissive: 0x003300,
      shininess: 100 
    });
    const chlorine = new THREE.Mesh(chlorineGeometry, chlorineMaterial);
    chlorine.position.set(5, 0, 0);
    scene.add(chlorine);
    atomsRef.current.push(chlorine);

    // Create the transferring electron (small blue sphere)
    const electronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const electronMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.9
    });
    const electron = new THREE.Mesh(electronGeometry, electronMaterial);
    electron.position.set(-3.5, 0, 0); // Start near sodium
    scene.add(electron);
    atomsRef.current.push(electron);

    // Create bond line (initially invisible)
    const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
    const bondMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0
    });
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bond.rotation.z = Math.PI / 2;
    bond.position.set(0, 0, 0);
    scene.add(bond);
    atomsRef.current.push(bond);
  };

  // Simple UI return

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Simple Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Chemistry Animation</h2>
          <p className="text-gray-600">Autonomous molecular visualization</p>
        </div>

        {/* Animation Container */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-center">
            <div ref={mountRef} className="border border-gray-200 rounded-lg overflow-hidden" />
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-center">
            <div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Sodium (Na)</span>
            </div>
            <div>
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Chlorine (Cl)</span>
            </div>
            <div>
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <span className="text-gray-600">Electron (e⁻)</span>
            </div>
          </div>
        </div>

        {/* Animation Explanation */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ionic Bond Formation (NaCl)</h3>
          <p className="text-gray-600 text-sm mb-3">
            Watch sodium and chlorine form table salt through electron transfer:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700"><strong>Phase 1:</strong> Atoms approach each other</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700"><strong>Phase 2:</strong> Electron jumps from Na to Cl (beautiful arc!)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700"><strong>Phase 3:</strong> Ions attract and bond forms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700"><strong>Phase 4:</strong> Stable salt crystal - both atoms happy!</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-gray-600 text-xs">
              <strong>Key insight:</strong> Sodium wants to give up its outer electron, chlorine wants to gain one. 
              Perfect match = stable salt (NaCl)!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;