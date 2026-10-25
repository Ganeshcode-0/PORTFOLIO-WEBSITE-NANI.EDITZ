'use client';

import React from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Film,
  Users,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Profile, Category, Project, Client, ContactSettings } from '@/types/portfolio';

interface OverviewTabProps {
  profile: Profile;
  categories: Category[];
  projects: Project[];
  clients: Client[];
  contactSettings: ContactSettings;
  onNavigate: (tab: string) => void;
}

export function OverviewTab({
  profile,
  categories,
  projects,
  clients,
  contactSettings,
  onNavigate,
}: OverviewTabProps) {
  const publishedCategories = categories.filter((c) => c.published).length;
  const publishedProjects = projects.filter((p) => p.published).length;
  const publishedClients = clients.filter((c) => c.published).length;

  const activeContactChannels = [
    contactSettings.instagram_enabled && contactSettings.instagram,
    contactSettings.phone_enabled && contactSettings.phone,
    contactSettings.email_enabled && contactSettings.email,
    contactSettings.whatsapp_enabled && contactSettings.whatsapp,
    contactSettings.contact_form_enabled,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#85E4FF]/40">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#85E4FF]">
              MANAGEMENT PORTAL
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Welcome, Administrator
          </h1>
          <p className="text-xs sm:text-sm text-[#A8C2DA] max-w-xl">
            Managing public video portfolio content for <span className="text-[#85E4FF] font-semibold">{profile.display_name}</span>. Real-time updates sync to the live website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="glass-pill px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#85E4FF] hover:bg-[#168BFF]/30 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>View Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onNavigate('about')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-transform"
          >
            Edit About Me
          </button>
        </div>
      </div>

      {/* Real Database Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Categories */}
        <div
          onClick={() => onNavigate('categories')}
          className="cursor-pointer glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/70 hover:shadow-cyan-neon transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8C2DA] uppercase tracking-wider">
              Categories
            </span>
            <div className="w-9 h-9 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{categories.length}</span>
            <span className="text-xs text-emerald-400 font-medium">
              ({publishedCategories} Published)
            </span>
          </div>
        </div>

        {/* Video Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="cursor-pointer glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/70 hover:shadow-cyan-neon transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8C2DA] uppercase tracking-wider">
              Video Projects
            </span>
            <div className="w-9 h-9 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
              <Film className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{projects.length}</span>
            <span className="text-xs text-emerald-400 font-medium">
              ({publishedProjects} Published)
            </span>
          </div>
        </div>

        {/* Clients */}
        <div
          onClick={() => onNavigate('clients')}
          className="cursor-pointer glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/70 hover:shadow-cyan-neon transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8C2DA] uppercase tracking-wider">
              Clients
            </span>
            <div className="w-9 h-9 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{clients.length}</span>
            <span className="text-xs text-emerald-400 font-medium">
              ({publishedClients} Verified)
            </span>
          </div>
        </div>

        {/* Contact Channels */}
        <div
          onClick={() => onNavigate('contact')}
          className="cursor-pointer glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/70 hover:shadow-cyan-neon transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#A8C2DA] uppercase tracking-wider">
              Contact Channels
            </span>
            <div className="w-9 h-9 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{activeContactChannels}</span>
            <span className="text-xs text-[#A8C2DA]">Channels Active</span>
          </div>
        </div>
      </div>

      {/* Summary Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Breakdown */}
        <div className="glass-panel rounded-3xl p-6 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#85E4FF]/15 pb-3">
            <h3 className="text-base font-bold text-white">Active Video Categories</h3>
            <button
              onClick={() => onNavigate('categories')}
              className="text-xs text-[#85E4FF] hover:underline"
            >
              Manage
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                  <p className="text-xs text-[#A8C2DA]">/works/{c.slug}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    c.published
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}
                >
                  {c.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About Me Highlights */}
        <div className="glass-panel rounded-3xl p-6 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between border-b border-[#85E4FF]/15 pb-3">
            <h3 className="text-base font-bold text-white">NANI.EDITZ Profile Details</h3>
            <button
              onClick={() => onNavigate('about')}
              className="text-xs text-[#85E4FF] hover:underline"
            >
              Configure
            </button>
          </div>
          <div className="space-y-2.5 text-xs text-[#A8C2DA]">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Brand:</span>
              <span className="font-semibold text-white">{profile.display_name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Experience:</span>
              <span className="font-semibold text-white">{profile.experience_label}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Editing Tools:</span>
              <span className="font-semibold text-[#85E4FF]">
                {(profile.editing_tools || []).join(', ')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Portrait Photo:</span>
              <span className="font-semibold text-[#85E4FF]">
                {profile.profile_image_path ? 'Uploaded' : 'Reserved Slot (Awaiting photo)'}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span>Section Visibility:</span>
              <span className="font-semibold text-emerald-400">
                {profile.section_visible ? 'Visible on Homepage' : 'Hidden'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
