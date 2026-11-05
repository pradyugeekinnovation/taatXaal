import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SilkThreadsHeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let renderer, scene, camera, animationFrameId;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.z = 25;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Create golden silk thread spline curves
      const threadCount = 18;
      const threads = [];
      const threadGroup = new THREE.Group();
      scene.add(threadGroup);

      const goldColors = [
        new THREE.Color('#C6A15B'),
        new THREE.Color('#E8D7B7'),
        new THREE.Color('#DEBE7E'),
        new THREE.Color('#7B263C'),
      ];

      for (let i = 0; i < threadCount; i++) {
        const points = [];
        const numPoints = 6;
        const xOffset = (i - threadCount / 2) * 2.2;
        const zOffset = (Math.random() - 0.5) * 8;

        for (let j = 0; j < numPoints; j++) {
          points.push(
            new THREE.Vector3(
              xOffset + Math.sin(j * 0.8 + i) * 3,
              (j - numPoints / 2) * 5 + (Math.random() - 0.5) * 1.5,
              zOffset + Math.cos(j * 0.5 + i) * 3
            )
          );
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.05 + Math.random() * 0.04, 8, false);
        
        const material = new THREE.MeshBasicMaterial({
          color: goldColors[i % goldColors.length],
          transparent: true,
          opacity: 0.25 + (i % 3) * 0.15,
        });

        const mesh = new THREE.Mesh(tubeGeometry, material);
        mesh.userData = {
          speed: 0.0006 + Math.random() * 0.0008,
          rotSpeed: 0.0003 + Math.random() * 0.0005,
          phase: Math.random() * Math.PI * 2,
        };

        threadGroup.add(mesh);
        threads.push(mesh);
      }

      // Golden particles
      const particleCount = 40;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount * 3; p += 3) {
        positions[p] = (Math.random() - 0.5) * 35;
        positions[p + 1] = (Math.random() - 0.5) * 25;
        positions[p + 2] = (Math.random() - 0.5) * 15;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xC6A15B,
        size: 0.14,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        threads.forEach((mesh, idx) => {
          mesh.rotation.y = Math.sin(elapsedTime * mesh.userData.rotSpeed + mesh.userData.phase) * 0.3;
          mesh.rotation.x = Math.cos(elapsedTime * 0.2 + idx) * 0.1;
          mesh.position.y = Math.sin(elapsedTime * 0.5 + mesh.userData.phase) * 0.8;
        });

        threadGroup.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05;
        particles.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        width = container.clientWidth;
        height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer?.dispose();
      };
    } catch (err) {
      console.warn("SilkThreadsHeroCanvas WebGL fallback:", err);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
}
