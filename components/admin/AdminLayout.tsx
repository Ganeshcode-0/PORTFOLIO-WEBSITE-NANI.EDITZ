'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Film,
  Users,
  Send,
  Palette,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Inbox,
} from 'lucide-react';
import { DecorativeRibbons } from '@/components/DecorativeRibbons';

interface AdminLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userEmail?: string;
  children: React.ReactNode;
}

export function AdminLayout({
  currentTab,
  onTabChange,
  onLogout,
  userEmail,
  children,
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'categories', label: 'Categories', icon: FolderKanban },
    { id: 'projects', label: 'Video Projects', icon: Film },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'contact', label: 'Contact & Social', icon: Send },
    { id: 'submissions', label: 'Inquiries', icon: Inbox },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Account & Security', icon: ShieldCheck },
  ];

  function handleNav(id: string) {
    onTabChange(id);
    setMobileMenuOpen(false);
  }

  return (
    <div className="relative min-h-screen cinematic-bg flex text-[#F5FAFF]">
      <DecorativeRibbons />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass-panel border-r border-[#85E4FF]/30 p-5 z-30 sticky top-0 h-screen justify-between">
        <div className="space-y-6">
          {/* Brand */}
          <div className="px-2 pt-2">
            <Link href="/" className="block">
              <span className="text-base font-extrabold tracking-wider text-white hover:text-light-cyan transition-colors block">
                NANI.EDITZ
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#85E4FF] uppercase">
                ADMIN CONSOLE
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#168BFF]/40 to-[#0757E8]/20 border border-[#85E4FF]/60 text-white shadow-glass-glow'
                      : 'text-[#A8C2DA] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#85E4FF]' : 'text-[#A8C2DA]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#85E4FF]/15 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl glass-panel-subtle text-xs text-[#85E4FF] hover:bg-[#168BFF]/20 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen z-10 w-full overflow-x-hidden">
        {/* Mobile Header Bar */}
        <header className="lg:hidden glass-panel px-4 py-3 flex items-center justify-between border-b border-[#85E4FF]/25 sticky top-0 z-40">
          <div>
            <h1 className="text-sm font-extrabold text-white">NANI.EDITZ</h1>
            <p className="text-[10px] text-[#85E4FF] uppercase tracking-wider">Admin Console</p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-xl glass-panel-subtle text-[#85E4FF]"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel-subtle text-white border border-[#85E4FF]/30"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[57px] z-50 glass-panel-elevated p-4 border-b border-[#85E4FF]/40 animate-in slide-in-from-top duration-200">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-[#168BFF]/40 border border-[#85E4FF]/60 text-white'
                        : 'text-[#A8C2DA] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#85E4FF]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
