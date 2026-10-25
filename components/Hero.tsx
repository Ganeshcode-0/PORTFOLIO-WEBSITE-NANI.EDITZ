import React from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface HeroProps {
  brandName?: string;
  subtitle?: string;
  profileImagePath?: string | null;
  focalX?: number;
  focalY?: number;
}

export function Hero({
  brandName = 'NANI.EDITZ',
  subtitle = 'VIDEO EDITOR',
  profileImagePath = '/images/profile.jpg',
  focalX = 50,
  focalY = 50,
}: HeroProps) {
  const activePhoto = profileImagePath || '/images/profile.jpg';

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Asymmetric Curved Sky-Blue Glass Hero Panel */}
        <div className="lg:col-span-7 glass-panel-elevated hero-curve p-8 sm:p-12 md:p-14 flex flex-col justify-center relative overflow-hidden group">
          {/* Subtle Ambient Light Spill inside panel */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-[#85E4FF]/25 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-40 bg-gradient-to-tl from-[#0757E8]/20 to-transparent blur-xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <span className="text-sm sm:text-base md:text-lg font-medium text-[#85E4FF] tracking-wide block">
              Hey i&apos;m
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white-pure text-glow-cyan">
              {brandName}
            </h1>

            {/* Glowing Accent Line */}
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-gradient-to-r from-[#85E4FF] via-[#168BFF] to-transparent shadow-[0_0_12px_#63D0F2]" />

            <div className="pt-2">
              <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#A8C2DA] uppercase">
                {subtitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Right: Sculpted 3D Glass Card Framing Profile Photo Perfectly */}
        <div className="lg:col-span-5 glass-panel-elevated rounded-[36px] sm:rounded-[44px] p-3.5 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-300 hover:border-[#85E4FF]/80 hover:shadow-cyan-neon border border-[#85E4FF]/45">
          {/* 3D Liquid Corner Droplets */}
          <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none tube-glow opacity-85 group-hover:scale-110 transition-transform z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <circle cx="65" cy="35" r="22" fill="#168BFF" fillOpacity="0.45" />
              <circle cx="70" cy="30" r="14" fill="#85E4FF" fillOpacity="0.75" />
              <circle cx="67" cy="27" r="4" fill="#FFFFFF" />
            </svg>
          </div>

          <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[380px] rounded-[28px] sm:rounded-[34px] overflow-hidden border border-[#85E4FF]/40 shadow-inner bg-[#02070D]">
            <Image
              src={activePhoto}
              alt={brandName}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
            />

            {/* Specular Glass Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02070D]/80 via-transparent to-white/10 pointer-events-none" />

            {/* Bottom Status Pill */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 glass-pill px-3.5 sm:px-4 py-2 flex items-center justify-between text-xs backdrop-blur-xl border border-[#85E4FF]/40 bg-[#031326]/75 shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="font-bold text-white tracking-wider text-[11px] sm:text-xs">
                  NANI • VIDEO EDITOR
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#168BFF]/30 text-[#85E4FF] border border-[#85E4FF]/30">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
