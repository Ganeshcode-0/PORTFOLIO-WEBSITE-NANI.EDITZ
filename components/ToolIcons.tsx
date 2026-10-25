import React from 'react';

export function DaVinciResolveIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dvRed" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="70%" stopColor="#E02424" />
          <stop offset="100%" stopColor="#9B1C1C" />
        </radialGradient>
        <radialGradient id="dvGreen" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#31C48D" />
          <stop offset="70%" stopColor="#0E9F6E" />
          <stop offset="100%" stopColor="#046C4E" />
        </radialGradient>
        <radialGradient id="dvBlue" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="34" r="18" fill="url(#dvRed)" />
      <circle cx="36" cy="62" r="18" fill="url(#dvGreen)" />
      <circle cx="64" cy="62" r="18" fill="url(#dvBlue)" />
      <circle cx="50" cy="49" r="9" fill="#FFFFFF" fillOpacity="0.8" />
    </svg>
  );
}

export function PremiereProIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#00005B" />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="44"
        fill="#EA77FF"
        letterSpacing="-1"
      >
        Pr
      </text>
    </svg>
  );
}

export function AfterEffectsIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#00005B" />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="44"
        fill="#9999FF"
        letterSpacing="-1"
      >
        Ae
      </text>
    </svg>
  );
}

export function ToolIcon({ name, className = 'w-7 h-7' }: { name: string; className?: string }) {
  const normalized = name.toLowerCase();
  if (normalized.includes('davinci')) {
    return <DaVinciResolveIcon className={className} />;
  }
  if (normalized.includes('premiere')) {
    return <PremiereProIcon className={className} />;
  }
  if (normalized.includes('after effects')) {
    return <AfterEffectsIcon className={className} />;
  }
  return (
    <div className={`${className} rounded-lg bg-sky-100 border border-sky-300 flex items-center justify-center text-xs font-bold text-sky-700`}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}
