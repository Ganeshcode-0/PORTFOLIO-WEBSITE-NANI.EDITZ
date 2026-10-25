'use client';

import React from 'react';
import Image from 'next/image';
import { Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Client } from '@/types/portfolio';

interface ClientsSectionProps {
  clients?: Client[];
}

export function ClientsSection({ clients = [] }: ClientsSectionProps) {
  // Filter out any creativebuddha references and keep only the two confirmed clients
  const activeClients = clients
    .filter((c) => c.published && !c.name.toLowerCase().includes('buddha'))
    .slice(0, 2);

  // Fallback if empty to ensure the two confirmed clients are always shown with their logos
  const displayClients = activeClients.length >= 2 ? activeClients : [
    {
      id: 'c1111111-1111-1111-1111-111111111111',
      name: '24framesphotography',
      logo_path: '/images/clients/24frames-logo.png',
      website_url: null,
      display_order: 1,
      published: true,
    },
    {
      id: 'c3333333-3333-3333-3333-333333333333',
      name: 'NRK Infotech',
      logo_path: '/images/clients/nrk-logo.png',
      website_url: null,
      display_order: 2,
      published: true,
    },
  ];

  return (
    <section id="clients" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Section Pill Badge */}
      <div className="flex items-center mb-6 sm:mb-8">
        <div className="glass-pill px-5 py-2.5 flex items-center space-x-3 text-xs sm:text-sm font-bold tracking-widest uppercase text-light-cyan shadow-lg">
          <Users className="w-4 h-4 text-[#85E4FF]" />
          <span>CLIENTS WORKED WITH</span>
          <div className="w-5 h-5 rounded-full bg-[#168BFF]/40 border border-[#85E4FF]/40 flex items-center justify-center ml-1">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Main Glass Tray with 3D Sculpted Structure */}
      <div className="glass-panel rounded-[36px] sm:rounded-[44px] p-5 sm:p-8 border border-[#85E4FF]/35 relative overflow-hidden">
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-b from-[#168BFF]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative z-10">
          {displayClients.map((client, idx) => {
            const is24Frames = client.name.toLowerCase().includes('24frames');
            const logoSrc = client.logo_path || (is24Frames
              ? '/images/clients/24frames-logo.png'
              : '/images/clients/nrk-logo.png');

            const clientDisplayName = is24Frames ? '24 Frames Photography' : 'NRK Infotech';
            const handleText = is24Frames ? '24framesphotography_official' : 'nrkinfotech';
            const nicheText = is24Frames ? 'Fine Art Luxury Photos & Films' : 'Software, Data & Digital Marketing';

            return (
              <div
                key={client.id || idx}
                className="group relative glass-panel-elevated rounded-[28px] sm:rounded-[34px] p-5 sm:p-7 border border-[#85E4FF]/45 hover:border-[#85E4FF]/80 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(22,139,255,0.35)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              >
                {/* 3D Liquid Corner Droplets */}
                <div className="absolute -top-3 -right-3 w-14 h-14 pointer-events-none tube-glow opacity-80 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <circle cx="65" cy="35" r="22" fill="#168BFF" fillOpacity="0.4" />
                    <circle cx="70" cy="30" r="14" fill="#85E4FF" fillOpacity="0.7" />
                    <circle cx="67" cy="27" r="4" fill="#FFFFFF" />
                  </svg>
                </div>

                {/* Left: Logo & Client Name */}
                <div className="flex items-center space-x-4 sm:space-x-5">
                  {/* 3D Glass Logo Badge */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#85E4FF]/60 shadow-[0_0_20px_rgba(99,208,242,0.3)] bg-[#031326] p-1 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={logoSrc}
                        alt={clientDisplayName}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Client Name & Niche */}
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-[#85E4FF] tracking-wider">
                        @{handleText}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#85E4FF] flex-shrink-0" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight group-hover:text-glow-cyan transition-all">
                      {clientDisplayName}
                    </h3>
                    <p className="text-xs text-[#A8C2DA]">
                      {nicheText}
                    </p>
                  </div>
                </div>

                {/* Right: Verified Client Tag (No external profile link) */}
                <div className="flex items-center space-x-1.5 self-start sm:self-auto glass-pill px-3.5 py-1.5 border border-[#85E4FF]/30 text-xs font-semibold text-[#85E4FF] bg-[#168BFF]/15">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Client</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
