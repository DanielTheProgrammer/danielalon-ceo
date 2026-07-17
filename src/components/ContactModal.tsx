import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import gsap from 'gsap';
import { Calendar, Linkedin, MessageCircle, Instagram, X, type LucideIcon } from 'lucide-react';

interface ContactLink {
  icon: LucideIcon;
  label: string;
  sub: string;
  href: string;
}

// Real contact URLs are injected at build time from environment variables
// (GitHub Secrets in CI, .env.local for local dev) so they never live in the
// public repo source or git history. Note: they are still present in the
// deployed bundle — unavoidable for a static site the buttons must work on.
const LINKS: ContactLink[] = [
  {
    icon: Calendar,
    label: 'Book a meeting',
    sub: 'Google Calendar',
    href: import.meta.env.VITE_CAL_URL ?? '#',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Let’s connect',
    href: import.meta.env.VITE_LINKEDIN_URL ?? '#',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Message me',
    href: import.meta.env.VITE_WHATSAPP_URL ?? '#',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    sub: 'Follow along',
    href: import.meta.env.VITE_INSTAGRAM_URL ?? '#',
  },
];

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // Three.js: rising ember particles in bridge-red behind the panel
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const count = 240;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.3 + Math.random() * 0.8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xc41e24,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        let y = pos.getY(i) + speeds[i] * 0.02;
        if (y > 14) y = -14;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      points.rotation.z = Math.sin(t * 0.1) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  // GSAP entrance + Escape-to-close + body scroll lock
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.contact-link',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.18, ease: 'power3.out' }
      );
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div ref={canvasHostRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#0C0C0C]/90 p-8 md:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-white/50 transition-colors hover:text-white"
        >
          <X size={24} />
        </button>

        <h3 className="hero-heading-white text-center text-4xl font-black uppercase leading-none md:text-5xl">
          Let’s talk
        </h3>
        <p className="mt-3 text-center text-sm font-light text-[#D7E2EA]/70">
          Pick whatever’s easiest for you.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {LINKS.map(({ icon: Icon, label, sub, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:border-[#C41E24] hover:bg-[#C41E24]/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C41E24] text-white">
                <Icon size={20} />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-white">{label}</span>
                <span className="text-xs font-light uppercase tracking-wider text-white/45">{sub}</span>
              </span>
              <span className="ml-auto text-white/30 transition-colors group-hover:text-white">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
