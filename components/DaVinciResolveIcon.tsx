import React from 'react';

export function DaVinciResolveIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Red petal gradient */}
        <radialGradient id="dvRed" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="70%" stopColor="#E02424" />
          <stop offset="100%" stopColor="#9B1C1C" />
        </radialGradient>
        {/* Green petal gradient */}
        <radialGradient id="dvGreen" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#31C48D" />
          <stop offset="70%" stopColor="#0E9F6E" />
          <stop offset="100%" stopColor="#046C4E" />
        </radialGradient>
        {/* Blue petal gradient */}
        <radialGradient id="dvBlue" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#63D0F2" />
          <stop offset="60%" stopColor="#168BFF" />
          <stop offset="100%" stopColor="#0757E8" />
        </radialGradient>
        {/* Central hub glow */}
        <radialGradient id="dvCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#A8C2DA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* 3 Petals representing Blackmagic DaVinci Resolve Color Science */}
      {/* Top Petal - Red */}
      <circle cx="50" cy="35" r="18" fill="url(#dvRed)" />

      {/* Bottom Left Petal - Green */}
      <circle cx="36" cy="62" r="18" fill="url(#dvGreen)" />

      {/* Bottom Right Petal - Blue */}
      <circle cx="64" cy="62" r="18" fill="url(#dvBlue)" />

      {/* Center blend overlay */}
      <circle cx="50" cy="50" r="10" fill="url(#dvCenter)" />
    </svg>
  );
}
