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
        <ErrorBoundary fallbackTitle="Navigation">
          <Navbar />
        </ErrorBoundary>

        {/* Main Content Sections */}
        <main>
          {/* Section 1: Hero Orbit Globe */}
          <ErrorBoundary fallbackTitle="Hero Section">
            <HeroGlobe />
          </ErrorBoundary>

          {/* Section 2: Intro Particle Portrait */}
          <ErrorBoundary fallbackTitle="About Section">
            <ParticlePortrait />
          </ErrorBoundary>

          {/* Section 3: Web Builds (TamizN Visa & SREC Blood Donation) */}
          <ErrorBoundary fallbackTitle="Web Builds Section">
            <WebBuilds />
          </ErrorBoundary>

          {/* Section 4: TriShield Signal Story (Scroll-Pinned) */}
          <ErrorBoundary fallbackTitle="TriShield Story Section">
            <SignalStory />
          </ErrorBoundary>

          {/* Section 5: Technical Skills */}
          <ErrorBoundary fallbackTitle="Technical Skills Section">
            <SkillsSection />
          </ErrorBoundary>

          {/* Section 6: Achievements & Milestones Timeline */}
          <ErrorBoundary fallbackTitle="Achievements Section">
            <AchievementsSection />
          </ErrorBoundary>

          {/* Section 7: Academic Background & Interests */}
          <ErrorBoundary fallbackTitle="Education & Interests Section">
            <EducationInterests />
          </ErrorBoundary>

          {/* Section 8: Contact & Footer */}
          <ErrorBoundary fallbackTitle="Contact & Footer Section">
            <ContactFooter />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}
