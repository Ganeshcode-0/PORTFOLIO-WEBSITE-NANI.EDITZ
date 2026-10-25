import React from 'react';

export function DecorativeRibbons() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Top Left Fluid Torus / Ribbon */}
      <svg
        className="absolute -top-24 -left-24 w-96 h-96 opacity-75 tube-glow animate-pulse"
        style={{ animationDuration: '8s' }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="blueGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#63D0F2" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#168BFF" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#0757E8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="tubeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#85E4FF" />
            <stop offset="35%" stopColor="#168BFF" />
            <stop offset="70%" stopColor="#0757E8" />
            <stop offset="100%" stopColor="#031326" />
          </linearGradient>
        </defs>
        <path
          d="M 60,180 C 40,80 180,30 260,90 C 340,150 300,280 200,300 C 110,320 80,240 60,180 Z"
          fill="url(#blueGlow1)"
        />
        <path
          d="M 100,160 C 80,100 170,60 230,110 C 290,160 260,250 180,260 C 110,270 110,200 100,160 Z"
          stroke="url(#tubeGrad1)"
          strokeWidth="38"
          strokeLinecap="round"
          filter="blur(1px)"
        />
        <path
          d="M 120,130 C 150,90 200,90 230,120"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.6"
          filter="blur(2px)"
        />
      </svg>

      {/* Top Right Subtle Ambient Sphere */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-[#168BFF]/20 to-[#0757E8]/10 blur-3xl pointer-events-none" />

      {/* Center Right Fluid 3D Ribbon Accent */}
      <svg
        className="absolute top-1/3 -right-20 w-80 h-96 opacity-65 tube-glow hidden md:block"
        viewBox="0 0 350 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tubeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#031326" />
            <stop offset="30%" stopColor="#0757E8" />
            <stop offset="70%" stopColor="#168BFF" />
            <stop offset="100%" stopColor="#85E4FF" />
          </linearGradient>
        </defs>
        <path
          d="M 300,50 C 200,90 120,180 160,280 C 190,360 300,380 340,320"
          stroke="url(#tubeGrad2)"
          strokeWidth="42"
          strokeLinecap="round"
        />
        <path
          d="M 260,80 C 180,130 140,210 170,290"
          stroke="#F5FAFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.45"
          filter="blur(2px)"
        />
      </svg>

      {/* Bottom Left 3D Ribbon Loop */}
      <svg
        className="absolute -bottom-28 -left-20 w-[420px] h-[420px] opacity-70 tube-glow"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50,320 C 120,380 260,360 300,280 C 340,200 240,120 160,160 C 80,200 60,280 120,340"
          stroke="url(#tubeGrad1)"
          strokeWidth="48"
          strokeLinecap="round"
        />
        <path
          d="M 90,335 C 160,370 250,350 280,290"
          stroke="#85E4FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.7"
          filter="blur(2px)"
        />
      </svg>
    </div>
  );
}
