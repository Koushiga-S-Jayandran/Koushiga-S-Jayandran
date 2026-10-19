/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroGlobe } from './components/HeroGlobe';
import { ParticlePortrait } from './components/ParticlePortrait';
import { WebBuilds } from './components/WebBuilds';
import { SignalStory } from './components/SignalStory';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { EducationInterests } from './components/EducationInterests';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#000000] text-[#F2F4F7] font-body selection:bg-[#7FA6E0]/20 selection:text-white">
        {/* Custom cursor (hidden on touch devices) */}
        <CustomCursor />

        {/* Sticky blur navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Section 1: Hero Orbit Globe */}
          <HeroGlobe />

          {/* Section 2: Intro Particle Portrait */}
          <ParticlePortrait />

          {/* Section 3: Web Builds (TamizN Visa & SREC Blood Donation) */}
          <WebBuilds />

          {/* Section 4: TriShield Signal Story (Scroll-Pinned) */}
          <SignalStory />

          {/* Section 5: Technical Skills */}
          <SkillsSection />

          {/* Section 6: Achievements & Milestones Timeline */}
          <AchievementsSection />

          {/* Section 7: Academic Background & Interests */}
          <EducationInterests />

          {/* Section 8: Contact & Footer */}
          <ContactFooter />
        </main>
      </div>
    </ErrorBoundary>
  );
}
