import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import {
  generateFibonacciSpherePoints,
  latLngToVector3D,
  project3DTo2D,
  calculateGreatCircleArc,
  Point3D,
} from '../utils/globeMath';
import { ArrowDown, FileText, ChevronDown } from 'lucide-react';

export const HeroGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [targetYaw, setTargetYaw] = useState<number>(0.2);
  const [targetTilt, setTargetTilt] = useState<number>(0.25);

  const yawRef = useRef<number>(0.2);
  const tiltRef = useRef<number>(0.25);
  const isVisibleRef = useRef<boolean>(true);
  const isTouchRef = useRef<boolean>(false);
  const animationFrameId = useRef<number | null>(null);

  // Canvas 2D 3D Globe Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect headless or touch
    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));
    const isTouch =
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
    isTouchRef.current = isTouch;

    const pointCount = isHeadless ? 600 : window.innerWidth < 768 ? 1200 : 2000;
    const baseSphereRadius = 1.0;
    const spherePoints: Point3D[] = generateFibonacciSpherePoints(pointCount, baseSphereRadius);

    // Coimbatore Coordinates (11.0168° N, 76.9558° E)
    const coimbatorePt = latLngToVector3D(11.0168, 76.9558, baseSphereRadius);

    // Connected partner hubs for 5-6 animated data arcs (Tokyo, London, San Francisco, Singapore, Frankfurt, Sydney)
    const hubCoords = [
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
      { lat: 50.1109, lng: 8.6821, name: 'Frankfurt' },
      { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
    ];

    const arcs = hubCoords.map((hub) => {
      const hubPt = latLngToVector3D(hub.lat, hub.lng, baseSphereRadius);
      const curvePoints = calculateGreatCircleArc(coimbatorePt, hubPt, 28, 0.26);
      return {
        points: curvePoints,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let pulseTimer = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId.current = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth steering toward target or slow auto-rotation
      if (isTouchRef.current) {
        yawRef.current += 0.003;
        tiltRef.current = 0.2 + Math.sin(time * 0.0005) * 0.08;
      } else {
        yawRef.current += 0.0018 + (targetYaw - yawRef.current) * 0.04;
        tiltRef.current += (targetTilt - tiltRef.current) * 0.04;
      }

      pulseTimer += delta;

      ctx.clearRect(0, 0, width, height);

      // Globe center position: centered slightly to right on desktop
      const isDesktop = width >= 768;
      const cx = isDesktop ? width * 0.68 : width * 0.5;
      const cy = isDesktop ? height * 0.52 : height * 0.68;
      const spherePixelRadius = Math.min(width, height) * (isDesktop ? 0.38 : 0.42);

      // Render 3D points
      const projected = spherePoints.map((pt) => {
        const scaledPt = {
          x: pt.x * spherePixelRadius,
          y: pt.y * spherePixelRadius,
          z: pt.z * spherePixelRadius,
        };
        return project3DTo2D(scaledPt, yawRef.current, tiltRef.current, spherePixelRadius, cx, cy);
      });

      // Draw faint connections or back points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (!p.visible) continue;

        ctx.beginPath();
        const dotRadius = Math.max(0.7, 1.4 * p.scale);
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);

        // Gradient from deeper steel-blue to light steel-blue
        ctx.fillStyle = `rgba(127, 166, 224, ${Math.min(0.9, p.alpha * 0.85)})`;
        ctx.fill();
      }

      // Draw Great-Circle Arcs
      for (const arc of arcs) {
        arc.progress = (arc.progress + arc.speed) % 1.0;

        ctx.beginPath();
        let started = false;
        const projectedArc = arc.points.map((pt) => {
          const scaledPt = {
            x: pt.x * spherePixelRadius,
            y: pt.y * spherePixelRadius,
            z: pt.z * spherePixelRadius,
          };
          return project3DTo2D(
            scaledPt,
            yawRef.current,
            tiltRef.current,
            spherePixelRadius,
            cx,
            cy
          );
        });

        // Draw faint trajectory
        for (let i = 0; i < projectedArc.length; i++) {
          const pt = projectedArc[i];
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y);
              started = true;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
        }
        ctx.strokeStyle = 'rgba(63, 120, 219, 0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw travelling data signal bead along arc
        const headIndex = Math.min(
          projectedArc.length - 1,
          Math.floor(arc.progress * (projectedArc.length - 1))
        );
        const headPt = projectedArc[headIndex];
        if (headPt && headPt.visible) {
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 2.5 * headPt.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#7FA6E0';
          ctx.shadowColor = '#7FA6E0';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Project Coimbatore coordinate
      const scaledCoimbatore = {
        x: coimbatorePt.x * spherePixelRadius,
        y: coimbatorePt.y * spherePixelRadius,
        z: coimbatorePt.z * spherePixelRadius,
      };
      const projCoimbatore = project3DTo2D(
        scaledCoimbatore,
        yawRef.current,
        tiltRef.current,
        spherePixelRadius,
        cx,
        cy
      );

      // Draw Coimbatore with Pulsing Amber Ring (ONLY amber element for regional node)
      if (projCoimbatore.visible) {
        const pulse = (Math.sin(pulseTimer * 3.5) + 1) / 2;
        const outerRadius = 8 + pulse * 14;

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(projCoimbatore.x, projCoimbatore.y, outerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240, 177, 90, ${0.7 - pulse * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner solid amber dot
        ctx.beginPath();
        ctx.arc(projCoimbatore.x, projCoimbatore.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#F0B15A';
        ctx.fill();

        // Faint label
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = 'rgba(240, 177, 90, 0.9)';
        ctx.fillText('Coimbatore (SREC)', projCoimbatore.x + 12, projCoimbatore.y + 3);
      }
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetYaw, targetTilt]);

  // Steer globe with cursor movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    setTargetYaw(nx * 1.8);
    setTargetTilt(-ny * 0.8 + 0.2);
  };

  const handleScrollToWork = () => {
    const el = document.getElementById(PORTFOLIO_DATA.hero.targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000000] pt-24 pb-16 px-6 md:px-12 select-none"
    >
      {/* Background 2D Canvas 3D Dotted Globe (pointer-events: none) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 flex flex-col items-start text-left">
          {/* Label PORTFOLIO 2026 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7FA6E0] animate-pulse" />
            {PORTFOLIO_DATA.hero.yearLabel}
          </div>

          {/* Name in large display serif */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#F2F4F7] tracking-tight leading-[1.05] mb-6">
            {PORTFOLIO_DATA.hero.name}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#9AA3AF] font-light max-w-2xl leading-relaxed mb-10">
            {PORTFOLIO_DATA.hero.subtitle}
          </p>

          {/* Buttons: View my work & Download resume */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleScrollToWork}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#7FA6E0] text-[#000000] text-sm font-semibold hover:bg-[#9BBDF2] transition-all duration-200 cursor-pointer shadow-lg shadow-[#7FA6E0]/15"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href="/resume.pdf"
              download="Koushiga_S_Jayandran_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A0A0B] text-[#F2F4F7] text-sm font-medium border border-white/15 hover:border-[#7FA6E0]/50 hover:bg-[#111113] transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-[#7FA6E0]" />
              <span>Download resume</span>
            </a>
          </div>
        </div>

        {/* Space on desktop for the globe to be visually prominent */}
        <div className="md:col-span-5 h-72 md:h-full pointer-events-none" />
      </div>

      {/* Quiet Scroll Cue at bottom */}
      <button
        type="button"
        onClick={() => {
          const intro = document.getElementById('particle-portrait');
          if (intro) intro.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#9AA3AF]/60 hover:text-[#7FA6E0] transition-colors cursor-pointer text-[11px] tracking-widest uppercase font-mono"
        aria-label="Scroll down to intro section"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
