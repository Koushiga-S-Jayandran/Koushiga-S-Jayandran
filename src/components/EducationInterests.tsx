import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { GraduationCap, Compass, BookOpen, MapPin, Sparkles } from 'lucide-react';

export const EducationInterests: React.FC = () => {
  const { education, interests } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative py-24 px-6 md:px-12 bg-[#000000] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Education */}
        <div className="lg:col-span-7 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-8">
            Education
          </h2>

          <div className="p-8 rounded-3xl bg-[#0A0A0B] border border-white/10 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono text-[#7FA6E0] uppercase tracking-wider block mb-1">
                  {education.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-2 leading-snug">
                  {education.degree}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-[#111113] border border-white/10 text-[#7FA6E0]">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <p className="text-base text-[#F2F4F7] font-medium mb-4">
              {education.institution}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9AA3AF]">
              <MapPin className="w-4 h-4 text-[#7FA6E0]" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interests */}
        <div className="lg:col-span-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Curiosities & Focus</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-8">
            Core Interests
          </h2>

          <div className="space-y-3">
            {interests.map((interest, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0A0A0B] border border-white/8 hover:border-[#7FA6E0]/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-center text-[#7FA6E0] group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-medium text-[#F2F4F7] group-hover:text-white transition-colors">
                  {interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
