import React from 'react';
import profilePhoto from '../assets/profile.jpg';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Mail, Linkedin, Github, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { ResumeDownload } from './ResumeDownload';

export const ContactFooter: React.FC = () => {
  const { contact } = PORTFOLIO_DATA;

  return (
    <footer
      id="contact"
      className="relative bg-[#000000] border-t border-white/8 pt-24 pb-12 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Contact Header with Avatar */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-6">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Circular avatar with the same imported photo */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#7FA6E0]/40 p-0.5 shrink-0">
              <img
                src="/profile.jpeg"
                alt="Koushiga S. Jayandran"
                width={56}
                height={56}
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-white tracking-tight">
              {contact.heading}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#9AA3AF] leading-relaxed max-w-xl mx-auto">
            Open for cybersecurity research discussions, security tooling inquiries, AI/ML
            collaborations, and student hackathon teams.
          </p>
        </div>

        {/* 3 Clickable Contact Rows */}
        <div className="max-w-2xl mx-auto space-y-3 mb-20">
          {/* Email Row */}
          <a
            href={contact.emailHref}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#0A0A0B] border border-white/8 hover:border-[#7FA6E0]/50 hover:bg-[#111113] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-center text-[#7FA6E0] group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA3AF]">
                  Official Academic Email
                </div>
                <div className="text-sm sm:text-base font-medium text-white group-hover:text-[#7FA6E0] transition-colors">
                  {contact.email}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#9AA3AF] group-hover:text-[#7FA6E0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* LinkedIn Row */}
          <a
            href={contact.linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-[#0A0A0B] border border-white/8 hover:border-[#7FA6E0]/50 hover:bg-[#111113] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-center text-[#7FA6E0] group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA3AF]">
                  Professional Network
                </div>
                <div className="text-sm sm:text-base font-medium text-white group-hover:text-[#7FA6E0] transition-colors">
                  {contact.linkedInDisplay}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#9AA3AF] group-hover:text-[#7FA6E0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          {/* GitHub Row */}
          <a
            href={contact.gitHubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-[#0A0A0B] border border-white/8 hover:border-[#7FA6E0]/50 hover:bg-[#111113] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-center text-[#7FA6E0] group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#9AA3AF]">
                  Code & Engineering
                </div>
                <div className="text-sm sm:text-base font-medium text-white group-hover:text-[#7FA6E0] transition-colors">
                  {contact.gitHubDisplay}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#9AA3AF] group-hover:text-[#7FA6E0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* Footer Sub-Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9AA3AF]">
          <div>{contact.copyright}</div>
          <div className="flex items-center gap-6">
            <ResumeDownload variant="footer" />
            <a
              href={contact.emailHref}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
            <a
              href={contact.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={contact.gitHubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
