import React, { useEffect, useRef, useState } from 'react';
import profilePhoto from '../assets/profile.jpg';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useElementScrollProgress } from '../utils/useScrollProgress';
import { Sparkles, Scan } from 'lucide-react';

interface Particle {
  originX: number;
  originY: number;
  scatterX: number;
  scatterY: number;
  currentX: number;
  currentY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const ParticlePortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const portraitFrameRef = useRef<HTMLDivElement | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [isPhotoCrossfaded, setIsPhotoCrossfaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const stillTimerRef = useRef<number | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const assemblyProgressRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Track scroll assembly progress from 15% to 55% of section visibility
  const scrollAssembly = useElementScrollProgress(containerRef, 0.15, 0.6);

  useEffect(() => {
    assemblyProgressRef.current = scrollAssembly;
    if (scrollAssembly < 0.9 && isPhotoCrossfaded) {
      setIsPhotoCrossfaded(false);
    }
  }, [scrollAssembly, isPhotoCrossfaded]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Load photo into offscreen canvas and sample particles
  useEffect(() => {
    if (prefersReducedMotion) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = profilePhoto;

    img.onload = () => {
      setPhotoLoaded(true);

      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const targetDim = 400;
      offCanvas.width = targetDim;
      offCanvas.height = targetDim;
      offCtx.drawImage(img, 0, 0, targetDim, targetDim);

      const imgData = offCtx.getImageData(0, 0, targetDim, targetDim);
      const data = imgData.data;

      // Sample corner backdrop colour (plain grey backdrop)
      const cornerIndices = [0, (targetDim - 1) * 4, ((targetDim - 1) * targetDim) * 4];
      let bgR = 0;
      let bgG = 0;
      let bgB = 0;
      for (const idx of cornerIndices) {
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      }
      bgR /= cornerIndices.length;
      bgG /= cornerIndices.length;
      bgB /= cornerIndices.length;

      const isMobile = window.innerWidth < 768;
      const step = isMobile ? 6 : 4.5;
      const particles: Particle[] = [];

      for (let y = 0; y < targetDim; y += step) {
        for (let x = 0; x < targetDim; x += step) {
          const pixelIndex = (Math.floor(y) * targetDim + Math.floor(x)) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const a = data[pixelIndex + 3];

          if (a < 50) continue;

          // Check color difference from backdrop
          const colorDiff =
            Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);

          // Backdrop threshold: skip pixels close to grey studio backdrop
          if (colorDiff < 28 && r > 90 && r < 190 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
            continue;
          }

          // Luminance mapping
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Map luminance to steel-blue to crisp white
          let particleColor = '#7FA6E0';
          if (luminance > 0.65) {
            particleColor = '#FFFFFF';
          } else if (luminance > 0.45) {
            particleColor = '#C1D5F5';
          } else if (luminance > 0.25) {
            particleColor = '#7FA6E0';
          } else {
            particleColor = '#3F78DB';
          }

          const angle = Math.random() * Math.PI * 2;
          const distance = 160 + Math.random() * 260;

          particles.push({
            originX: x,
            originY: y,
            scatterX: x + Math.cos(angle) * distance,
            scatterY: y + Math.sin(angle) * distance,
            currentX: x,
            currentY: y,
            vx: 0,
            vy: 0,
            size: Math.max(1.1, 1.3 + luminance * 1.5),
            color: particleColor,
            alpha: Math.min(1.0, 0.45 + luminance * 0.55),
          });
        }
      }

      particlesRef.current = particles;
      setCanvasReady(true);
    };
  }, [prefersReducedMotion]);

  // Canvas render loop & particle dynamics
  useEffect(() => {
    if (prefersReducedMotion || !canvasReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 400 * dpr;
    canvas.height = 400 * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisibleRef.current = e.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = () => {
      animationFrameId.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      ctx.clearRect(0, 0, 400, 400);

      const progress = assemblyProgressRef.current;
      const particles = particlesRef.current;
      const mouse = mousePosRef.current;
      const repulsionRadius = 70;
      const repulsionStrength = 5.0;
      const springFactor = 0.12;
      const friction = 0.82;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base target position according to scroll assembly
        const targetX = p.scatterX + (p.originX - p.scatterX) * progress;
        const targetY = p.scatterY + (p.originY - p.scatterY) * progress;

        // Mouse repulsion if assembled
        if (mouse && progress > 0.8) {
          const dx = p.currentX - mouse.x;
          const dy = p.currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius && dist > 0.1) {
            const force = (1 - dist / repulsionRadius) * repulsionStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring back to target
        const ax = (targetX - p.currentX) * springFactor;
        const ay = (targetY - p.currentY) * springFactor;

        p.vx = (p.vx + ax) * friction;
        p.vy = (p.vy + ay) * friction;

        p.currentX += p.vx;
        p.currentY += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * Math.max(0.2, progress);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [canvasReady, prefersReducedMotion]);

  // Handle mouse movement on portrait frame for scattering and stillness crossfade
  const handleFrameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitFrameRef.current) return;
    const rect = portraitFrameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    mousePosRef.current = { x, y };
    isInteractingRef.current = true;

    // Reset photo crossfade while user is moving cursor
    if (isPhotoCrossfaded) {
      setIsPhotoCrossfaded(false);
    }

    // Set 1.5s still timer
    if (stillTimerRef.current) clearTimeout(stillTimerRef.current);
    stillTimerRef.current = window.setTimeout(() => {
      if (assemblyProgressRef.current >= 0.85) {
        setIsPhotoCrossfaded(true);
      }
    }, 1500);
  };

  const handleFrameMouseLeave = () => {
    mousePosRef.current = null;
    isInteractingRef.current = false;
    if (stillTimerRef.current) clearTimeout(stillTimerRef.current);
    if (assemblyProgressRef.current >= 0.85) {
      stillTimerRef.current = window.setTimeout(() => {
        setIsPhotoCrossfaded(true);
      }, 1500);
    }
  };

  return (
    <section
      id="particle-portrait"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#000000] border-t border-white/5 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Portrait Container (Particles + Photo Layer) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            ref={portraitFrameRef}
            onMouseMove={handleFrameMouseMove}
            onMouseLeave={handleFrameMouseLeave}
            className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-3xl overflow-hidden bg-[#0A0A0B] border border-[#7FA6E0]/25 shadow-2xl shadow-[#7FA6E0]/5 transition-all duration-500 group"
          >
            {/* Base static photo layer at ~30% opacity so face is always clearly recognizable */}
            <img
              src={profilePhoto}
              alt="Portrait of Koushiga S. Jayandran"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out pointer-events-none ${
                prefersReducedMotion || isPhotoCrossfaded ? 'opacity-100' : 'opacity-30'
              }`}
            />

            {/* Particle Canvas on top */}
            {!prefersReducedMotion && (
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
                  isPhotoCrossfaded ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              />
            )}

            {/* Faint scan line sweeping down on slow loop */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#7FA6E0]/15 to-transparent -translate-y-full animate-[scan_6s_ease-in-out_infinite]" />
            </div>

            {/* Minimal HUD frame overlays */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#000000]/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#7FA6E0] flex items-center gap-1.5">
              <Scan className="w-3 h-3 text-[#7FA6E0]" />
              <span>KSJ-BIO-ID</span>
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#000000]/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#9AA3AF]">
              SREC · M.Tech CSE (Int.)
            </div>
          </div>

          <p className="mt-4 text-xs font-mono text-[#9AA3AF]/60 tracking-wider text-center">
            {prefersReducedMotion
              ? 'Static portrait display'
              : 'Interactive particle array · Hover to disperse'}
          </p>
        </div>

        {/* Right Column: Statement, Vision, and 3 Chips */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Direction</span>
          </div>

          {/* Large primary statement */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-[#F2F4F7] leading-snug tracking-tight mb-8">
            {PORTFOLIO_DATA.intro.statement}
          </h2>

          {/* 5-year cybersecurity specialist vision */}
          <div className="relative pl-6 border-l-2 border-[#7FA6E0]/40 mb-10">
            <p className="text-base sm:text-lg md:text-xl text-[#9AA3AF] font-normal leading-relaxed">
              {PORTFOLIO_DATA.intro.vision}
            </p>
          </div>

          {/* 3 Prominent Chips */}
          <div className="flex flex-wrap gap-3">
            {PORTFOLIO_DATA.intro.chips.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0A0A0B] border border-white/10 text-xs md:text-sm font-medium text-[#F2F4F7] hover:border-[#7FA6E0]/40 hover:bg-[#111113] transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7FA6E0]" />
                <span>{chip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
