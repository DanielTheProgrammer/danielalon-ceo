import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface JourneyCanvasProps {
  // 0..1 scroll progress of the pinned journey section, written by ScrollTrigger.
  progressRef: React.MutableRefObject<number>;
  stopCount: number;
}

export default function JourneyCanvas({ progressRef, stopCount }: JourneyCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
    camera.position.set(-28, 0, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Drifting ink-dark particles for depth
    const particleCount = 380;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 96;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -6 + Math.random() * 7;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0c0c0c,
      size: 0.09,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // The journey line: soft ambient tube that draws itself with scroll
    // (kept neutral so it doesn't compete with the DOM metro line)
    const waypoints: THREE.Vector3[] = [];
    for (let i = 0; i < stopCount; i++) {
      const x = -30 + (60 * i) / (stopCount - 1);
      const y = Math.sin(i * 1.15) * 2.4 - 0.4;
      const z = -1.5 + Math.sin(i * 0.7) * 1.2;
      waypoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(waypoints);
    const tubeGeometry = new THREE.TubeGeometry(curve, 260, 0.07, 10, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x2b2b2b,
      transparent: true,
      opacity: 0.35,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    const tubeIndexCount = tubeGeometry.index ? tubeGeometry.index.count : 0;
    tubeGeometry.setDrawRange(0, 0);

    const startTime = performance.now();
    let frameId = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const render = () => {
      const t = (performance.now() - startTime) / 1000;
      const progress = progressRef.current;

      // Camera travels along the line as the user scrolls through the stops
      camera.position.x = -28 + 56 * progress;
      camera.position.y = Math.sin(t * 0.4) * 0.4;
      camera.lookAt(camera.position.x + 6, 0, -2);

      particles.position.y = Math.sin(t * 0.25) * 0.35;

      tubeGeometry.setDrawRange(0, Math.floor(tubeIndexCount * Math.min(progress * 1.04, 1)));

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      particleMaterial.dispose();
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progressRef, stopCount]);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}
