import React from 'react';
import Image from 'next/image';
import { User, Briefcase, ArrowRight, Wrench } from 'lucide-react';
import { Profile } from '@/types/portfolio';
import { ToolIcon } from './ToolIcons';

interface AboutMeSectionProps {
  profile: Profile;
  isPreview?: boolean;
}

export function AboutMeSection({ profile, isPreview = false }: AboutMeSectionProps) {
  if (!profile.section_visible && !isPreview) {
    return null;
  }

  const tools = profile.editing_tools && profile.editing_tools.length > 0
    ? profile.editing_tools
    : ['DaVinci Resolve', 'Adobe Premiere Pro', 'Adobe After Effects'];

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Section Pill Badge */}
      <div className="flex items-center mb-6 sm:mb-8">
        <div className="glass-pill px-5 py-2.5 flex items-center space-x-3 text-xs sm:text-sm font-bold tracking-widest uppercase text-light-cyan shadow-lg">
          <User className="w-4 h-4 text-[#85E4FF]" />
          <span>ABOUT ME</span>
          <div className="w-5 h-5 rounded-full bg-[#168BFF]/40 border border-[#85E4FF]/40 flex items-center justify-center ml-1">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Main Outer Sculpted 3D Glass Structure Floating Above Dark Navy */}
      <div className="relative glass-panel-elevated about-me-curve p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        {/* Decorative 3D Fluid Ribbon wrapping the top-right corner */}
        <div className="absolute -top-12 -right-12 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-85 tube-glow">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="cornerTube" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#85E4FF" />
                <stop offset="50%" stopColor="#168BFF" />
                <stop offset="100%" stopColor="#052B69" />
              </linearGradient>
            </defs>
            <path
              d="M 50,40 C 120,20 180,60 170,130 C 160,180 110,190 70,160"
              stroke="url(#cornerTube)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 80,45 C 130,35 165,70 155,120"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </svg>
        </div>

        {/* Ambient Inner Lighting */}
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0757E8]/25 to-transparent blur-3xl pointer-events-none" />

        {/* 2-Column Responsive Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Brand Name & Experience Badge */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div className="glass-panel rounded-[32px] sm:rounded-[38px] p-6 sm:p-8 relative overflow-hidden border border-[#85E4FF]/40 shadow-glass-glow">
              <div className="space-y-2">
                <span className="text-sm sm:text-base font-semibold tracking-[0.2em] text-[#85E4FF] uppercase block">
                  CREATIVE PROFILE
                </span>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white-pure text-glow-cyan tracking-tight">
                  {profile.display_name}
                </h3>
              </div>

              {/* Cyan Accent Bar */}
              <div className="w-24 sm:w-32 h-1.5 rounded-full bg-gradient-to-r from-[#85E4FF] to-[#168BFF] my-5 sm:my-6 shadow-[0_0_10px_#63D0F2]" />

              {/* Profile Photo Avatar */}
              {profile.show_photo && (
                <div className="mb-5 flex items-center space-x-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#85E4FF]/60 shadow-[0_0_20px_rgba(99,208,242,0.3)] bg-[#02070D] flex-shrink-0">
                    <Image
                      src={profile.profile_image_path || '/images/profile.jpg'}
                      alt={profile.display_name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#85E4FF] uppercase tracking-widest block">
                      VERIFIED EDITOR
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Creative Direction &amp; Post-Production
                    </span>
                  </div>
                </div>
              )}

              {/* Experience Badge: "2 Years of Experience" */}
              {profile.show_experience && (
                <div className="flex items-center space-x-3.5 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0757E8]/40 to-[#031326] border border-[#85E4FF]/60 flex items-center justify-center text-[#85E4FF] shadow-lg flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-[#85E4FF]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#85E4FF] uppercase">
                      EXPERIENCE
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-white-pure">
                      {profile.experience_label || '2 Years of Experience'}
                    </span>
                  </div>
                </div>
              )}

              {/* Optional Biography (only if configured) */}
              {profile.show_bio && profile.biography && (
                <div className="mt-5 pt-4 border-t border-[#85E4FF]/20">
                  <p className="text-xs sm:text-sm text-[#A8C2DA] leading-relaxed">
                    {profile.biography}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Confirmed Editing Tools Widgets */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-2 pb-1 text-[#85E4FF]">
              <Wrench className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">
                TOOLS USE
              </span>
            </div>

            {tools.map((toolName, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-[26px] sm:rounded-[32px] p-4 sm:p-6 flex items-center space-x-5 border border-[#85E4FF]/40 hover:border-[#85E4FF]/70 transition-all duration-300 shadow-glass-glow group"
              >
                {/* 3D Glossy Button Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#168BFF]/40 to-[#031326] border border-[#85E4FF]/60 flex items-center justify-center shadow-lg relative overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
                  <ToolIcon name={toolName} className="w-8 h-8" />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold tracking-widest text-[#85E4FF] uppercase">
                    PRIMARY TOOL #{idx + 1}
                  </span>
                  <span className="text-base sm:text-xl md:text-2xl font-extrabold text-white-pure uppercase tracking-tight">
                    {toolName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
