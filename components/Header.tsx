'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreHorizontal, Lock, ExternalLink, Video, User, Mail, FolderKanban, MessageCircle, Instagram } from 'lucide-react';

interface HeaderProps {
  brandName?: string;
  subtitle?: string;
}

export function Header({
  brandName = 'NANI.EDITZ',
  subtitle = 'VIDEO EDITOR',
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-panel rounded-full px-5 py-3 sm:py-3.5 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Brand identity */}
        <Link href="/" className="flex flex-col group focus:outline-none">
          <span className="text-base sm:text-lg font-extrabold tracking-wider text-white-pure group-hover:text-light-cyan transition-colors">
            {brandName}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#85E4FF]/80 uppercase -mt-0.5">
            {subtitle}
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#A8C2DA]">
          <Link href="#works" className="hover:text-light-cyan transition-colors">
            Explore Works
          </Link>
          <Link href="#about" className="hover:text-light-cyan transition-colors">
            About Me
          </Link>
          <Link href="#clients" className="hover:text-light-cyan transition-colors">
            Clients
          </Link>
          <Link href="#contact" className="hover:text-light-cyan transition-colors">
            Contact
          </Link>
        </div>

        {/* Three-dot menu in top-right corner */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#85E4FF] hover:text-white-pure hover:bg-[#168BFF]/20 active:scale-95 transition-all duration-200 border border-[#85E4FF]/30"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Glass Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel-elevated p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-2 text-xs font-semibold text-[#85E4FF] uppercase tracking-wider border-b border-[#85E4FF]/15">
                Navigation
              </div>

              <div className="py-1">
                <Link
                  href="#works"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-[#F5FAFF] hover:bg-[#168BFF]/20 hover:text-light-cyan transition-colors"
                >
                  <FolderKanban className="w-4 h-4 text-[#85E4FF]" />
                  <span>Explore Works</span>
                </Link>
                <Link
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-[#F5FAFF] hover:bg-[#168BFF]/20 hover:text-light-cyan transition-colors"
                >
                  <User className="w-4 h-4 text-[#85E4FF]" />
                  <span>About Me</span>
                </Link>
                <a
                  href="https://wa.me/918309249050?text=Hi%20Nani,%20I%20am%20interested%20in%20your%20video%20editing%20services"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Direct</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href="https://www.instagram.com/nawin.fx/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-pink-300 hover:bg-pink-500/20 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>Instagram Direct</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-[#F5FAFF] hover:bg-[#168BFF]/20 hover:text-light-cyan transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#85E4FF]" />
                  <span>Inquiry Form</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-[#85E4FF]/15">
                <Link
                  href="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#85E4FF] hover:bg-[#168BFF]/30 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Administrator Login</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
