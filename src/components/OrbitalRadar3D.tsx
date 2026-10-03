'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { NearEarthObject } from '../types/neo';

export interface TrajectoryData {
  neo: NearEarthObject;
  curve: THREE.CatmullRomCurve3;
  lineMesh: THREE.Line;
  markerPos: THREE.Vector3;
  missDistLd: number;
  velocityKms: number;
  inclinationDeg: number;
  isPha: boolean;
}

export interface ScreenLabelItem {
  id: string;
  name: string;
  isPha: boolean;
  markerX: number;
  markerY: number;
  labelX: number;
  labelY: number;
  visible: boolean;
}

interface OrbitalRadar3DProps {
  neos: NearEarthObject[];
  selectedNeo: NearEarthObject;
  isEarthSelected: boolean;
  onSelectNeo: (neo: NearEarthObject) => void;
  onSelectEarth: () => void;
  hoveredNeoId: string | null;
  setHoveredNeoId: (id: string | null) => void;
}

/**
 * Procedural Earth Texture Generator
 * Generates an authentic ocean, continent landmass, and night-lights texture map
 * in-memory with zero network latency.
 */
function createEarthCanvasTexture(): THREE.CanvasTexture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Deep oceanic gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#040b17');
  oceanGrad.addColorStop(0.5, '#07152d');
  oceanGrad.addColorStop(1, '#030814');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Stylized realistic continent landmass contours
  ctx.fillStyle = '#101c30';
  ctx.strokeStyle = '#1b2d49';
  ctx.lineWidth = 1.5;

  const drawPolygon = (points: [number, number][]) => {
    ctx.beginPath();
    points.forEach(([x, y], idx) => {
      const px = (x / 360) * width;
      const py = ((90 - y) / 180) * height;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // North America
  drawPolygon([
    [-165, 68], [-140, 70], [-100, 72], [-70, 60], [-55, 50],
    [-75, 38], [-80, 28], [-95, 20], [-105, 24], [-120, 36],
    [-130, 50], [-160, 58]
  ]);
  // Greenland
  drawPolygon([[-50, 80], [-20, 80], [-25, 70], [-45, 62], [-55, 72]]);
  // South America
  drawPolygon([
    [-80, 10], [-50, -5], [-35, -8], [-40, -22], [-55, -35],
    [-68, -52], [-75, -45], [-72, -20], [-80, -2]
  ]);
  // Eurasia
  drawPolygon([
    [-10, 60], [20, 70], [60, 72], [100, 75], [140, 72], [170, 65],
    [160, 45], [130, 42], [120, 30], [105, 20], [80, 22], [70, 35],
    [50, 40], [30, 36], [10, 42], [-5, 48]
  ]);
  // Africa
  drawPolygon([
    [-15, 30], [10, 36], [32, 30], [50, 12], [42, -10],
    [32, -30], [18, -34], [10, -10], [0, 5], [-18, 15]
  ]);
  // Australia
  drawPolygon([[115, -20], [135, -12], [150, -24], [148, -38], [130, -38], [115, -30]]);
  // Antarctica
  drawPolygon([[-180, -78], [180, -78], [180, -88], [-180, -88]]);

  // Night-side glowing city lights clusters
  ctx.fillStyle = 'rgba(255, 215, 120, 0.75)';
  const cityClusters: [number, number, number][] = [
    [-75, 40, 8], [-85, 42, 6], [-118, 34, 7], [-122, 37, 5], // North America
    [2, 48, 8], [12, 52, 6], [28, 41, 5], [37, 55, 6],        // Europe
    [77, 28, 9], [72, 19, 7], [88, 22, 6],                    // India
    [116, 39, 9], [121, 31, 8], [139, 35, 10], [127, 37, 6],  // East Asia
    [-46, -23, 7], [-58, -34, 5],                             // South America
    [151, -33, 6], [144, -37, 5]                              // Australia
  ];

  cityClusters.forEach(([lon, lat, count]) => {
    const cx = (lon / 360) * width;
    const cy = ((90 - lat) / 180) * height;
    for (let i = 0; i < count; i++) {
      const ox = (Math.random() - 0.5) * 16;
      const oy = (Math.random() - 0.5) * 12;
      const rad = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(cx + ox, cy + oy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const OrbitalRadar3D: React.FC<OrbitalRadar3DProps> = ({
  neos,
  selectedNeo,
  isEarthSelected,
  onSelectNeo,
  onSelectEarth,
  hoveredNeoId,
  setHoveredNeoId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [screenLabels, setScreenLabels] = useState<ScreenLabelItem[]>([]);
  const [earthScreenPos, setEarthScreenPos] = useState<{ x: number; y: number } | null>(null);

  // References to keep Three.js animation alive
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const selectedReticleRef = useRef<THREE.Mesh | null>(null);
  const trajectoryMapRef = useRef<Map<string, TrajectoryData>>(new Map());
  const markersGroupRef = useRef<THREE.Group | null>(null);

  // 1. Initialize Three.js Scene, Camera, Earth, and Lighting
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Directional Sun Light (Illuminates from upper-left for day-night terminator)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(-18, 10, 14);
    scene.add(sunLight);

    // Space ambient fill
    const ambientLight = new THREE.AmbientLight(0x0a1628, 0.8);
    scene.add(ambientLight);

    // Subtle atmospheric cyan rim light
    const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.9);
    rimLight.position.set(16, -8, -10);
    scene.add(rimLight);

    // EARTH - REFERENCE BODY (Positioned at right-center x: 2.4, y: 0.1, z: 0)
    const earthRadius = 1.95;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTexture = createEarthCanvasTexture();

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.15,
      bumpScale: 0.05,
    });

    const earthGroup = new THREE.Group();
    earthGroup.position.set(2.4, 0.1, 0); // Solid right-center anchor
    earthGroup.rotation.z = (23.4 * Math.PI) / 180; // Axial tilt
    scene.add(earthGroup);

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.name = 'EARTH_BODY';
    earthGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // Atmospheric Rayleigh Cyan Glow (Custom Fresnel Shader)
    const atmosphereGeo = new THREE.SphereGeometry(earthRadius * 1.055, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.9);
          vec3 glowColor = vec3(0.0, 0.88, 1.0);
          gl_FragColor = vec4(glowColor, fresnel * 0.85);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    // Group for NEO Trajectories and Markers
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow, restrained planetary rotation
      if (earthMeshRef.current) {
        earthMeshRef.current.rotation.y = elapsedTime * 0.025;
      }

      // Gentle pulse on selected reticle ring
      if (selectedReticleRef.current) {
        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
        selectedReticleRef.current.scale.set(pulse, pulse, 1);
      }

      // Project 3D points to 2D screen coordinates with collision-aware leader lines
      if (cameraRef.current && container) {
        const cWidth = container.clientWidth;
        const cHeight = container.clientHeight;

        // Project Earth Center
        const earthWorld = new THREE.Vector3();
        earthGroup.getWorldPosition(earthWorld);
        const projectedEarth = earthWorld.clone().project(cameraRef.current);
        const eScreenX = ((projectedEarth.x + 1) * cWidth) / 2;
        const eScreenY = ((-projectedEarth.y + 1) * cHeight) / 2;
        setEarthScreenPos({ x: eScreenX, y: eScreenY });

        // Project NEO Markers and compute leader line endpoints
        const rawItems: {
          id: string;
          name: string;
          isPha: boolean;
          markerX: number;
          markerY: number;
          angle: number;
        }[] = [];

        trajectoryMapRef.current.forEach((data, id) => {
          const worldPos = data.markerPos.clone();
          const projected = worldPos.project(cameraRef.current!);

          if (projected.z < 1) {
            const mx = ((projected.x + 1) * cWidth) / 2;
            const my = ((-projected.y + 1) * cHeight) / 2;
            const angle = Math.atan2(my - eScreenY, mx - eScreenX);

            rawItems.push({
              id,
              name: data.neo.name,
              isPha: data.isPha,
              markerX: mx,
              markerY: my,
              angle,
            });
          }
        });

        // Compute collision-aware label offsets
        const updatedLabels: ScreenLabelItem[] = rawItems.map((item, idx) => {
          const dx = item.markerX - eScreenX;
          const dy = item.markerY - eScreenY;
          const dist = Math.hypot(dx, dy) || 1;
          const uX = dx / dist;
          const uY = dy / dist;

          // Compute radial leader length
          const baseLeader = 38;
          let lx = item.markerX + uX * baseLeader;
          let ly = item.markerY + uY * baseLeader;

          // Prevent overlapping Earth (Earth radius ~110px on screen)
          const labelDistFromEarth = Math.hypot(lx - eScreenX, ly - eScreenY);
          if (labelDistFromEarth < 145) {
            lx = eScreenX + uX * 155;
            ly = eScreenY + uY * 155;
          }

          // Stagger slightly vertically to prevent adjacent label collisions
          ly += (idx % 2 === 0 ? -12 : 12);

          // Boundary safe-zone clamping
          lx = Math.max(90, Math.min(cWidth - 120, lx));
          ly = Math.max(40, Math.min(cHeight - 40, ly));

          return {
            id: item.id,
            name: item.name,
            isPha: item.isPha,
            markerX: item.markerX,
            markerY: item.markerY,
            labelX: lx,
            labelY: ly,
            visible: true,
          };
        });

        setScreenLabels(updatedLabels);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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

  // 2. Build 5 Primary Trajectories (Strictly Attached to Real Data)
  useEffect(() => {
    if (!sceneRef.current || !markersGroupRef.current) return;
    const markersGroup = markersGroupRef.current;

    // Clear previous trajectories and markers
    while (markersGroup.children.length > 0) {
      markersGroup.remove(markersGroup.children[0]);
    }
    trajectoryMapRef.current.clear();
    selectedReticleRef.current = null;

    const earthCenter = new THREE.Vector3(2.4, 0.1, 0);

    // Limit to 5 primary meaningful trajectories for clean visual hierarchy
    const primaryNeos = neos.slice(0, 5);

    primaryNeos.forEach((neo, idx) => {
      const approach = neo.close_approach_data[0];
      const missDistLd = parseFloat(approach?.miss_distance?.lunar || '12.0');
      const velKms = parseFloat(approach?.relative_velocity?.kilometers_per_second || '25.0');
      const inclinationDeg = parseFloat(neo.orbital_data?.inclination || '6.0');
      const isPha = neo.is_potentially_hazardous_asteroid;
      const isSelected = selectedNeo.id === neo.id;
      const isHovered = hoveredNeoId === neo.id;

      // Conformal encounter scaling relative to Earth geocenter
      const normalizedMissDist = 2.15 + Math.min(5.2, Math.sqrt(Math.max(0.01, missDistLd)) * 0.95);

      // Deterministic physical arrival azimuth angles
      const azimuthAngles = [-145, -75, 25, 110, 165];
      const arrivalAngle = (azimuthAngles[idx % azimuthAngles.length] * Math.PI) / 180;
      const incRad = (inclinationDeg * Math.PI) / 180;

      const pathSpan = 9.0;

      // Periapsis direction
      const periapsisDir = new THREE.Vector3(
        Math.cos(arrivalAngle),
        Math.sin(arrivalAngle),
        Math.sin(incRad) * 0.7
      ).normalize();

      // Tangent direction
      const tangentDir = new THREE.Vector3(
        -Math.sin(arrivalAngle),
        Math.cos(arrivalAngle),
        Math.cos(incRad) * 0.4
      ).normalize();

      // Periapsis point (closest approach)
      const pClosest = earthCenter.clone().add(periapsisDir.clone().multiplyScalar(normalizedMissDist));

      // Ingress / Egress encounter curves
      const pEntry = pClosest
        .clone()
        .add(tangentDir.clone().multiplyScalar(-pathSpan))
        .add(periapsisDir.clone().multiplyScalar(pathSpan * 0.45));

      const pExit = pClosest
        .clone()
        .add(tangentDir.clone().multiplyScalar(pathSpan))
        .add(periapsisDir.clone().multiplyScalar(pathSpan * 0.45));

      const pCurveIn = pClosest
        .clone()
        .add(tangentDir.clone().multiplyScalar(-pathSpan * 0.45))
        .add(periapsisDir.clone().multiplyScalar(pathSpan * 0.12));

      const pCurveOut = pClosest
        .clone()
        .add(tangentDir.clone().multiplyScalar(pathSpan * 0.45))
        .add(periapsisDir.clone().multiplyScalar(pathSpan * 0.12));

      const curve = new THREE.CatmullRomCurve3([pEntry, pCurveIn, pClosest, pCurveOut, pExit]);
      curve.curveType = 'centripetal';

      // 1. Trajectory Line Mesh
      const curvePoints = curve.getPoints(128);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      // Trajectory visual hierarchy: Selected is bright cyan; non-selected are quiet
      const baseLineColor = isPha ? 0xf43f5e : 0x38bdf8;
      const lineMat = new THREE.LineBasicMaterial({
        color: isSelected ? 0x00f0ff : baseLineColor,
        transparent: true,
        opacity: isSelected ? 0.95 : isHovered ? 0.75 : isPha ? 0.35 : 0.22,
        linewidth: isSelected ? 2 : 1,
      });

      const lineMesh = new THREE.Line(lineGeo, lineMat);
      markersGroup.add(lineMesh);

      // 2. CRITICAL: Marker is sampled directly from the trajectory line curve at closest approach (t = 0.50)
      const markerPos = curve.getPointAt(0.50);

      // Marker Mesh: small discreet sphere centered on trajectory line
      const markerRadius = isSelected ? 0.13 : isPha ? 0.09 : 0.08;
      const markerGeo = new THREE.SphereGeometry(markerRadius, 24, 24);
      const markerMat = new THREE.MeshBasicMaterial({
        color: isSelected ? 0x00f0ff : isPha ? 0xf43f5e : 0x7dd3fc,
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(markerPos);
      markerMesh.name = `NEO_${neo.id}`;
      markersGroup.add(markerMesh);

      // Concentric reticle ring strictly for the selected NEO
      if (isSelected) {
        const ringGeo = new THREE.RingGeometry(0.22, 0.26, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(markerPos);
        ringMesh.lookAt(new THREE.Vector3(0, 0, 16)); // Face camera
        markersGroup.add(ringMesh);
        selectedReticleRef.current = ringMesh;
      }

      trajectoryMapRef.current.set(neo.id, {
        neo,
        curve,
        lineMesh,
        markerPos,
        missDistLd,
        velocityKms: velKms,
        inclinationDeg,
        isPha,
      });
    });
  }, [neos, selectedNeo, hoveredNeoId]);

  // Handle Raycast clicks on Earth and Markers
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
    if (intersects.length > 0) {
      for (const hit of intersects) {
        if (hit.object.name === 'EARTH_BODY') {
          onSelectEarth();
          return;
        }
        if (hit.object.name.startsWith('NEO_')) {
          const neoId = hit.object.name.replace('NEO_', '');
          const match = neos.find((n) => n.id === neoId);
          if (match) {
            onSelectNeo(match);
            return;
          }
        }
      }
    }
  };

  return (
    <div
      ref={mountRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 cursor-crosshair select-none overflow-hidden"
    >
      {/* SVG Leader Lines: trajectory ── ● ── label */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {screenLabels.map((lbl) => {
          const isSelected = selectedNeo.id === lbl.id;
          const isHovered = hoveredNeoId === lbl.id;
          const strokeColor = isSelected
            ? '#00f0ff'
            : isHovered
            ? '#7dd3fc'
            : lbl.isPha
            ? 'rgba(244, 63, 94, 0.45)'
            : 'rgba(56, 189, 248, 0.28)';

          return (
            <g key={`leader-${lbl.id}`}>
              {/* Anchor dot on trajectory line */}
              <circle
                cx={lbl.markerX}
                cy={lbl.markerY}
                r={isSelected ? 3.5 : 2}
                fill={isSelected ? '#00f0ff' : lbl.isPha ? '#f43f5e' : '#38bdf8'}
              />
              {/* Delicate leader line to label */}
              <line
                x1={lbl.markerX}
                y1={lbl.markerY}
                x2={lbl.labelX}
                y2={lbl.labelY}
                stroke={strokeColor}
                strokeWidth={isSelected ? 1.5 : 1}
                strokeDasharray={isSelected ? undefined : '2,2'}
                opacity={isSelected ? 0.95 : 0.65}
              />
            </g>
          );
        })}
      </svg>

      {/* Synchronized Projected Screen Labels */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {screenLabels.map((lbl) => {
          const isSelected = selectedNeo.id === lbl.id;
          const isHovered = hoveredNeoId === lbl.id;

          return (
            <div
              key={lbl.id}
              style={{
                left: `${lbl.labelX}px`,
                top: `${lbl.labelY}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-150"
              onClick={(e) => {
                e.stopPropagation();
                const match = neos.find((n) => n.id === lbl.id);
                if (match) onSelectNeo(match);
              }}
              onMouseEnter={() => setHoveredNeoId(lbl.id)}
              onMouseLeave={() => setHoveredNeoId(null)}
            >
              <div
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono whitespace-nowrap transition-all flex items-center space-x-1.5 border shadow-lg ${
                  isSelected
                    ? 'bg-space-950/95 border-cyan-glow text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                    : isHovered
                    ? 'bg-space-950/90 border-cyan-ice/80 text-white scale-105'
                    : lbl.isPha
                    ? 'bg-space-950/80 border-rose-500/30 text-slate-200 hover:text-white'
                    : 'bg-space-950/75 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? 'bg-cyan-glow shadow-[0_0_6px_#00F0FF]'
                      : lbl.isPha
                      ? 'bg-rose-400'
                      : 'bg-cyan-ice'
                  }`}
                />
                <span className="font-semibold">{lbl.name}</span>
                <span
                  className={`text-[9px] ${
                    lbl.isPha ? 'text-rose-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {lbl.isPha ? 'PHA' : 'NOMINAL'}
                </span>
              </div>
            </div>
          );
        })}

        {/* Earth Reference Label (Positioned right below Earth) */}
        {earthScreenPos && (
          <div
            style={{
              left: `${earthScreenPos.x}px`,
              top: `${earthScreenPos.y + 72}px`,
              transform: 'translate(-50%, 0)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectEarth();
            }}
            className="absolute pointer-events-auto cursor-pointer"
          >
            <div
              className={`px-3 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
                isEarthSelected
                  ? 'bg-space-950 border-cyan-glow text-cyan-ice shadow-[0_0_16px_rgba(0,240,255,0.5)]'
                  : 'bg-space-950/80 border-blue-500/40 text-slate-300 hover:border-cyan-glow hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#38BDF8]" />
              <span className="font-bold tracking-wider">EARTH</span>
              <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">// REFERENCE BODY</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
