import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'particle-portrait', label: 'About' },
  { id: 'web-builds', label: 'Builds' },
  { id: 'signal-story', label: 'TriShield' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Milestones' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const scrollPos = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/80 backdrop-blur-md border-b border-white/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          aria-label="Scroll to top of portfolio"
        >
          <div className="w-8 h-8 rounded-lg bg-[#111113] border border-white/10 flex items-center justify-center text-[#7FA6E0] group-hover:border-[#7FA6E0]/40 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#7FA6E0]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-tight text-[#F2F4F7] group-hover:text-white transition-colors">
              KSJ
            </span>
            <span className="text-[10px] tracking-wider text-[#9AA3AF] uppercase">
              Security · AI/ML
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0A0A0B]/60 p-1.5 rounded-full border border-white/8 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-[#9AA3AF] hover:text-[#F2F4F7] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 rounded-full text-xs font-medium bg-[#111113] text-[#F2F4F7] border border-white/10 hover:border-[#7FA6E0]/40 hover:text-white transition-all cursor-pointer"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#111113] border border-white/10 text-[#F2F4F7] hover:text-white focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`py-2.5 px-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-[#9AA3AF] hover:bg-white/5 hover:text-[#F2F4F7]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-white/8">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 rounded-lg text-center text-sm font-medium bg-[#7FA6E0] text-[#000000] hover:bg-[#9BBDF2] transition-colors"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
