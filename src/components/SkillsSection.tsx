import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Cpu, Code, Globe, Database, Wrench, GraduationCap } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Programming: <Code className="w-4 h-4 text-[#7FA6E0]" />,
  Web: <Globe className="w-4 h-4 text-[#7FA6E0]" />,
  Database: <Database className="w-4 h-4 text-[#7FA6E0]" />,
  Tools: <Wrench className="w-4 h-4 text-[#7FA6E0]" />,
  'Currently learning': <GraduationCap className="w-4 h-4 text-[#7FA6E0]" />,
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-12 bg-[#000000] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-3">
            Skills & Tooling
          </h2>
          <p className="text-sm md:text-base text-[#9AA3AF] max-w-2xl">
            Focused technical proficiencies across systems, web engineering, database architecture,
            and continuous exploration.
          </p>
        </div>

        {/* Grouped Panels (Tags only, no percentage bars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((group, idx) => {
            const isCurrentlyLearning = group.category === 'Currently learning';
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#0A0A0B] border transition-all duration-300 flex flex-col justify-between ${
                  isCurrentlyLearning
                    ? 'border-[#7FA6E0]/20 bg-gradient-to-b from-[#0A0A0B] to-[#111113]'
                    : 'border-white/8 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
                    {CATEGORY_ICONS[group.category] || (
                      <Cpu className="w-4 h-4 text-[#7FA6E0]" />
                    )}
                    <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isCurrentlyLearning
                            ? 'bg-[#111113] border border-[#7FA6E0]/30 text-[#7FA6E0]'
                            : 'bg-[#111113] border border-white/8 text-[#F2F4F7] hover:border-[#7FA6E0]/30'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {isCurrentlyLearning && (
                  <div className="mt-6 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA3AF]/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7FA6E0] animate-ping" />
                    <span>Active deep-dive trajectory</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
