import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Trophy, Award, Presentation, Milestone } from 'lucide-react';

const ACHIEVEMENT_ICONS = [
  <Trophy className="w-5 h-5 text-[#7FA6E0]" />,
  <Award className="w-5 h-5 text-[#7FA6E0]" />,
  <Presentation className="w-5 h-5 text-[#7FA6E0]" />,
];

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-24 px-6 md:px-12 bg-[#000000] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-4">
            <Milestone className="w-3.5 h-3.5" />
            <span>Competitive Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-3">
            Honors & Achievements
          </h2>
          <p className="text-sm md:text-base text-[#9AA3AF] max-w-2xl">
            Key competitive wins, hackathon recognitions, and technical knowledge-sharing.
          </p>
        </div>

        {/* Vertical Timeline with Animated Connecting Line */}
        <div className="relative max-w-3xl ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-8 border-l border-white/10 space-y-12">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div key={idx} className="relative group text-left">
              {/* Timeline Marker Dot with subtle glow */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-[#0A0A0B] border border-[#7FA6E0]/40 flex items-center justify-center group-hover:border-[#7FA6E0] group-hover:scale-110 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-[#7FA6E0]" />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-[#0A0A0B] border border-white/8 group-hover:border-[#7FA6E0]/30 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {ACHIEVEMENT_ICONS[idx]}
                    <span className="text-xs font-mono text-[#7FA6E0] uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#9AA3AF]">
                    2026
                  </span>
                </div>

                <h3 className="text-xl font-display font-medium text-white mb-2 group-hover:text-[#7FA6E0] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#9AA3AF] leading-relaxed">
                  {item.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
