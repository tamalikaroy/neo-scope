'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Earth3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Three.js scene for sparse star field and subtle background orbital lines
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Sparse, organic star field with varying sizes and brightness
    const starCount = 280;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 65;
      starPositions[i + 1] = (Math.random() - 0.5) * 45;
      starPositions[i + 2] = -Math.random() * 22;

      // Soft blue-white star colors with natural luminance variations
      const brightness = Math.random() * 0.65 + 0.3;
      const tint = Math.random();
      starColors[i] = (0.78 + tint * 0.22) * brightness;
      starColors[i + 1] = (0.86 + tint * 0.14) * brightness;
      starColors[i + 2] = 1.0 * brightness;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Subtle background orbital splines (Restrained, thin, confined to the right background)
    const orbitCurve = new THREE.EllipseCurve(
      6, -1,           // Centered near Earth horizon
      13, 7.5,         // Radii
      0, 2 * Math.PI,
      false,
      Math.PI / 6      // Rotation
    );

    const orbitPoints = orbitCurve.getPoints(120);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map((p) => new THREE.Vector3(p.x, p.y, -3))
    );
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.14,
      linewidth: 1,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    scene.add(orbitLine);

    // Secondary inclination orbit
    const orbitCurve2 = new THREE.EllipseCurve(
      5, 1,
      11, 8.5,
      0, 2 * Math.PI,
      false,
      -Math.PI / 4
    );
    const orbitPoints2 = orbitCurve2.getPoints(120);
    const orbitGeo2 = new THREE.BufferGeometry().setFromPoints(
      orbitPoints2.map((p) => new THREE.Vector3(p.x, p.y, -4))
    );
    const orbitMat2 = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.08,
      linewidth: 1,
    });
    const orbitLine2 = new THREE.Line(orbitGeo2, orbitMat2);
    scene.add(orbitLine2);

    let animationFrameId: number;
    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();
        // Very slow, subtle orbital precession
        orbitLine.rotation.z = Math.sin(elapsedTime * 0.03) * 0.05;
        orbitLine2.rotation.z = Math.cos(elapsedTime * 0.025) * 0.04;
        starField.rotation.y = elapsedTime * 0.0015;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden bg-space-950">
      {/* Authentic NASA Earth orbital photography view:
          - Sits on the right 45-50% of the composition
          - Mostly in shadow/night with real city lights and atmospheric Rayleigh rim
          - Seamless mask blending into deep space void on the left
          - NO artificial circle, NO neon ring, NO polygon artifacts
      */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[75%] lg:w-[60%] xl:w-[54%] overflow-hidden pointer-events-none">
        <img
          alt="NASA orbital photography view of Earth from space with subtle night-side city lights and razor-thin blue atmospheric rim"
          className="w-full h-full object-cover object-right pointer-events-none"
          src="/images/earth-hero.jpg"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, transparent 12%, rgba(0,0,0,0.5) 28%, black 48%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, transparent 12%, rgba(0,0,0,0.5) 28%, black 48%, black 100%)',
          }}
        />
      </div>

      {/* Atmospheric Rayleigh blue rim diffusion bloom */}
      <div className="absolute right-0 top-1/4 w-[450px] h-[450px] rounded-full bg-cyan-neon/10 blur-[130px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 w-[260px] h-[260px] rounded-full bg-blue-600/15 blur-[90px] pointer-events-none" />

      {/* Three.js Canvas Layer for Orbital Mechanics & Stars */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};
