import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DrapedFabricVisualizer({
  fabricType = 'Pat',
  colorHex = '#7B263C',
  motif = 'Kingkhap',
  borderStyle = 'Heavy Zari Anchal',
  height = '420px'
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let heightPx = container.clientHeight || 420;

    let renderer, scene, camera, animationId, planeGeo, material, borderGeo, borderMat;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, heightPx);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xfff9f0, 1.2);
      scene.add(ambientLight);

      const goldKeyLight = new THREE.DirectionalLight(0xE8D7B7, 2.2);
      goldKeyLight.position.set(5, 8, 6);
      scene.add(goldKeyLight);

      const fillLight = new THREE.DirectionalLight(0xC6A15B, 1.4);
      fillLight.position.set(-6, -3, 4);
      scene.add(fillLight);

      const backRimLight = new THREE.DirectionalLight(0xffffff, 1.8);
      backRimLight.position.set(0, 6, -5);
      scene.add(backRimLight);

      const segX = 48;
      const segY = 48;
      planeGeo = new THREE.PlaneGeometry(4.2, 5.2, segX, segY);

      let roughness = 0.35;
      let metalness = 0.15;
      let clearcoat = 0.5;

      if (fabricType.includes('Muga')) {
        roughness = 0.25;
        metalness = 0.45;
        clearcoat = 0.8;
      } else if (fabricType.includes('Pat')) {
        roughness = 0.2;
        metalness = 0.25;
        clearcoat = 0.9;
      } else if (fabricType.includes('Eri')) {
        roughness = 0.75;
        metalness = 0.05;
        clearcoat = 0.1;
      } else if (fabricType.includes('Cotton')) {
        roughness = 0.8;
        metalness = 0.02;
        clearcoat = 0.05;
      }

      material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorHex),
        roughness: roughness,
        metalness: metalness,
        clearcoat: clearcoat,
        clearcoatRoughness: 0.15,
        side: THREE.DoubleSide,
        flatShading: false,
      });

      const fabricMesh = new THREE.Mesh(planeGeo, material);
      scene.add(fabricMesh);

      borderGeo = new THREE.PlaneGeometry(4.2, 0.65, 32, 8);
      borderMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C6A15B'),
        metalness: 0.85,
        roughness: 0.25,
        side: THREE.DoubleSide
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.y = -2.25;
      borderMesh.position.z = 0.02;
      fabricMesh.add(borderMesh);

      const posAttribute = planeGeo.attributes.position;
      const initialPositions = posAttribute.array.slice();

      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;

      const onMouseDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        fabricMesh.rotation.y += deltaX * 0.008;
        fabricMesh.rotation.x += deltaY * 0.008;
        fabricMesh.rotation.x = Math.max(-0.5, Math.min(0.5, fabricMesh.rotation.x));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const canvasElem = renderer.domElement;
      canvasElem.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      let clock = new THREE.Clock();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        const positions = planeGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = initialPositions[i];
          const y = initialPositions[i + 1];
          const fold = Math.sin(x * 3.5 + Math.PI / 4) * 0.22;
          const gentleWave = Math.sin(time * 1.5 + x * 2.0 + y * 1.2) * 0.08;
          positions[i + 2] = fold + gentleWave;
        }
        planeGeo.attributes.position.needsUpdate = true;
        planeGeo.computeVertexNormals();

        if (!isDragging) {
          fabricMesh.rotation.y = Math.sin(time * 0.6) * 0.12;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (canvasElem) canvasElem.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer?.dispose();
        planeGeo?.dispose();
        material?.dispose();
        borderGeo?.dispose();
        borderMat?.dispose();
      };
    } catch (err) {
      console.warn("DrapedFabricVisualizer WebGL fallback:", err);
    }
  }, [fabricType, colorHex, motif, borderStyle]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#220c15] to-[#120509] shadow-2xl border border-gold/30">
      <div 
        ref={containerRef} 
        style={{ height, backgroundColor: colorHex }} 
        className="w-full cursor-grab active:cursor-grabbing flex items-center justify-center relative overflow-hidden"
      >
        {/* Visual fallback drape lines if WebGL is disabled or still rendering */}
        <div className="absolute inset-0 bg-silk-texture opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gold/40 to-transparent pointer-events-none border-b-4 border-gold" />
      </div>
      
      {/* Floating Badges */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1.5">
        <span className="px-3 py-1 bg-burgundy/80 backdrop-blur-md text-gold text-xs font-semibold uppercase tracking-wider rounded-full border border-gold/40">
          3D Silk Drape Simulation
        </span>
        <span className="text-white/80 text-xs font-editorial italic tracking-wide">
          {fabricType} &bull; {motif} &bull; {borderStyle}
        </span>
      </div>

      <div className="absolute bottom-3 right-4 pointer-events-none">
        <span className="text-[11px] text-champagne/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 animate-pulse text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Drag to rotate silk drape
        </span>
      </div>
    </div>
  );
}
