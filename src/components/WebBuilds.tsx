import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import {
  ExternalLink,
  Github,
  Compass,
  Calendar,
  Clock,
  Shield,
  Layers,
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
  MapPin,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

export const WebBuilds: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLAnchorElement | null>(null);

  const { featured, secondaryApp, stats, heading, secondarySectionLabel } =
    PORTFOLIO_DATA.builds;

  // Carousel crossfade every 3.5s, paused on hover
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featured.mockupScreens.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isCarouselHovered, featured.mockupScreens.length]);

  // Phone 3D tilt towards cursor
  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handlePhoneMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsCarouselHovered(false);
  };

  return (
    <section
      id="web-builds"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#000000] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading & Stat Counters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack & Web Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#F2F4F7]">
              {heading}
            </h2>
          </div>

          {/* 3 Verified Metric Counters */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 bg-[#0A0A0B] p-4 sm:p-5 rounded-2xl border border-white/8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start px-2">
                <span className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-[#9AA3AF] mt-0.5 uppercase tracking-wider font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Project: TamizN Visa */}
        <div className="bg-[#0A0A0B] rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 bg-[#7FA6E0]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Details, chips, links */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white">
                  {featured.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#7FA6E0]/15 text-[#7FA6E0] text-xs font-medium border border-[#7FA6E0]/30">
                  {featured.badge}
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#F2F4F7] leading-relaxed mb-3">
                {featured.description}
              </p>

              <p className="text-xs sm:text-sm text-[#9AA3AF] italic mb-6">
                {featured.workingPrototypeNote}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={featured.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7FA6E0] text-[#000000] text-sm font-semibold hover:bg-[#9BBDF2] transition-colors shadow-md shadow-[#7FA6E0]/10"
                >
                  <span>Live demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={featured.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111113] text-[#F2F4F7] text-sm font-medium border border-white/10 hover:border-[#7FA6E0]/40 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code repository</span>
                </a>
              </div>

              {/* Feature-rich Chip Strip */}
              <div className="w-full mb-6">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA3AF] mb-2.5">
                  Working Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {featured.featureStrip.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#111113] border border-white/8 text-[11px] font-medium text-[#F2F4F7]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* In Development Row (Muted) */}
              <div className="w-full pt-4 border-t border-white/5">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA3AF]/60 mb-2">
                  In Development (Not live)
                </span>
                <div className="flex flex-wrap gap-2">
                  {featured.inDevelopment.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] text-[#9AA3AF]/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Phone Mockup (390 x 844 aspect) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <a
                href={featured.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                ref={phoneRef}
                onMouseMove={handlePhoneMouseMove}
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={handlePhoneMouseLeave}
                className="relative block w-[280px] sm:w-[320px] h-[580px] sm:h-[660px] rounded-[48px] bg-[#000000] p-3 shadow-2xl border-4 border-[#242428] cursor-pointer transition-transform duration-200 ease-out will-change-transform group"
                style={{
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
                aria-label="TamizN Visa live prototype preview phone mockup. Click to launch."
              >
                {/* Dynamic island / speaker pill */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#111113] rounded-full z-30 flex items-center justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-[#202026]" />
                </div>

                {/* Inner screen viewport */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0A0A0B] text-white flex flex-col justify-between p-4 pt-10 select-none border border-white/5">
                  {/* Slide Carousel Screens */}
                  {featured.mockupScreens.map((screen, idx) => {
                    const isActive = activeSlide === idx;
                    return (
                      <div
                        key={screen.id}
                        className={`absolute inset-0 p-5 pt-12 flex flex-col justify-between transition-opacity duration-600 ease-in-out ${
                          isActive
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {/* Mockup Screen Header */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7FA6E0]">
                              TamizN Visa
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#F2F4F7]">
                              {screen.badge}
                            </span>
                          </div>

                          <h4 className="text-xl font-display font-medium text-white mb-2 leading-tight">
                            {screen.title}
                          </h4>
                          <p className="text-xs text-[#9AA3AF] leading-relaxed mb-6">
                            {screen.subtitle}
                          </p>
                        </div>

                        {/* Screen-specific UI visualization */}
                        <div className="flex-1 flex flex-col justify-center gap-3">
                          {screen.type === 'discover' && (
                            <div className="space-y-2.5">
                              <div className="p-3 rounded-xl bg-[#111113] border border-white/5 flex items-center gap-3">
                                <Compass className="w-5 h-5 text-[#7FA6E0]" />
                                <div className="text-left">
                                  <div className="text-xs font-medium text-white">
                                    Thanjavur & Chola Temples
                                  </div>
                                  <div className="text-[10px] text-[#9AA3AF]">
                                    Heritage Circuit · 4 curated stops
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 rounded-xl bg-[#111113] border border-white/5 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-[#7FA6E0]" />
                                <div className="text-left">
                                  <div className="text-xs font-medium text-white">
                                    Nilgiris Eco Belt
                                  </div>
                                  <div className="text-[10px] text-[#9AA3AF]">
                                    Nature Circuit · High altitude trail
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {screen.type === 'planner' && (
                            <div className="p-4 rounded-2xl bg-[#111113] border border-white/8 space-y-3">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-[#9AA3AF]">Step 4 of 8</span>
                                <span className="text-[#7FA6E0] font-mono text-[11px]">
                                  Crowd Pref
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-[#7FA6E0]" />
                              </div>
                              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-[#F2F4F7]">
                                Low crowd preference prioritized for temples & viewpoints.
                              </div>
                            </div>
                          )}

                          {screen.type === 'itinerary' && (
                            <div className="space-y-2">
                              <div className="p-2.5 rounded-xl bg-[#111113] border border-white/5 flex justify-between items-center text-left">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-[#7FA6E0]" />
                                  <span className="text-xs font-medium text-white">
                                    08:30 Brihadisvara
                                  </span>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                                  Crowd: Low
                                </span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-[#111113] border border-white/5 flex justify-between items-center text-left">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-[#7FA6E0]" />
                                  <span className="text-xs font-medium text-white">
                                    11:30 Palace Craft
                                  </span>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                                  Crowd: Mod
                                </span>
                              </div>
                            </div>
                          )}

                          {screen.type === 'place' && (
                            <div className="p-3.5 rounded-2xl bg-[#111113] border border-white/8 space-y-2 text-left">
                              <div className="flex items-center gap-1.5 text-[#7FA6E0] text-[10px] font-mono">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Zero-Fabrication Data</span>
                              </div>
                              <div className="text-xs font-medium text-white">
                                Brihadisvara Temple, Thanjavur
                              </div>
                              <div className="text-[10px] text-[#9AA3AF] leading-relaxed">
                                Sourced from ASI architectural logs & official TN Tourism dossiers.
                              </div>
                            </div>
                          )}

                          {screen.type === 'offline' && (
                            <div className="p-3.5 rounded-2xl bg-[#111113] border border-white/8 text-left space-y-2">
                              <div className="flex items-center gap-2 text-white text-xs font-medium">
                                <FileCheck className="w-4 h-4 text-[#7FA6E0]" />
                                <span>Offline PDF Dossier</span>
                              </div>
                              <div className="text-[10px] text-[#9AA3AF]">
                                Complete turn-by-turn itinerary, emergency numbers & offline maps.
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Phone Bottom Tap Cue */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#7FA6E0]">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Tap to launch prototype
                          </span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}

                  {/* Carousel Indicators */}
                  <div className="relative z-20 flex justify-center gap-1.5 pt-2">
                    {featured.mockupScreens.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(i);
                        }}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeSlide === i ? 'w-6 bg-[#7FA6E0]' : 'w-2 bg-white/20'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Web Builds Row: SREC Blood Donation */}
        <div className="space-y-4">
          <h4 className="text-xs sm:text-sm font-mono tracking-wider uppercase text-[#9AA3AF]">
            {secondarySectionLabel}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl bg-[#0A0A0B] border border-white/8 p-6 hover:border-[#7FA6E0]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Abstract UI representation in steel-blue palette */}
                <div className="w-full h-40 rounded-xl bg-[#111113] border border-white/5 mb-6 overflow-hidden relative p-3 flex flex-col justify-between group-hover:scale-[1.04] transition-transform duration-300">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[9px] font-mono text-[#9AA3AF]">
                      srec-blood-connect.app
                    </span>
                  </div>

                  <div className="space-y-2 py-2">
                    <div className="h-4 w-3/4 bg-[#7FA6E0]/20 rounded" />
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 bg-white/5 rounded-lg p-1.5 text-[9px] text-[#7FA6E0] flex items-center gap-1">
                        <HeartHandshake className="w-3 h-3 text-[#7FA6E0]" />
                        <span>O+ Priority</span>
                      </div>
                      <div className="h-8 flex-1 bg-white/5 rounded-lg p-1.5 text-[9px] text-[#9AA3AF] flex items-center justify-center">
                        Verified 12 Donors
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-[#9AA3AF] pt-2 border-t border-white/5">
                    <span>SREC Campus Drive</span>
                    <span className="text-emerald-400">Live Status</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-lg font-medium text-white group-hover:text-[#7FA6E0] transition-colors">
                    {secondaryApp.title}
                  </h5>
                  <ArrowUpRight className="w-4 h-4 text-[#9AA3AF] group-hover:text-[#7FA6E0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-sm text-[#9AA3AF] leading-relaxed mb-4">
                  {secondaryApp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {secondaryApp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#111113] border border-white/8 text-[11px] font-mono text-[#7FA6E0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
