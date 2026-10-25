'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WorksSection } from '@/components/WorksSection';
import { ClientsSection } from '@/components/ClientsSection';
import { AboutMeSection } from '@/components/AboutMeSection';
import { ContactSection } from '@/components/ContactSection';
import { DecorativeRibbons } from '@/components/DecorativeRibbons';
import {
  PortfolioStore,
  DEFAULT_PROFILE,
  DEFAULT_CATEGORIES,
  DEFAULT_CLIENTS,
  DEFAULT_CONTACT_SETTINGS,
} from '@/lib/data/portfolio-store';
import { Profile, Category, Client, ContactSettings, Project } from '@/types/portfolio';

export default function HomePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [clients, setClients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [contactSettings, setContactSettings] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS);
  const [projectsByCategory, setProjectsByCategory] = useState<Record<string, Project[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [prof, cats, cls, contacts] = await Promise.all([
          PortfolioStore.getProfile(),
          PortfolioStore.getCategories(),
          PortfolioStore.getClients(),
          PortfolioStore.getContactSettings(),
        ]);

        setProfile(prof);
        setCategories(cats);
        setClients(cls);
        setContactSettings(contacts);

        // Load mini thumbnails for categories
        const categoryProjects: Record<string, Project[]> = {};
        for (const cat of cats) {
          const projs = await PortfolioStore.getProjects(cat.id);
          categoryProjects[cat.id] = projs;
        }
        setProjectsByCategory(categoryProjects);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden pb-24 cinematic-bg">
      {/* Soft Sky-Blue Ambient Lighting */}
      <DecorativeRibbons />

      {/* A. Header */}
      <Header
        brandName={profile.display_name}
        subtitle="VIDEO EDITOR"
      />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-6 sm:space-y-10">
        {/* B. Hero Section */}
        <Hero
          brandName={profile.display_name}
          subtitle="VIDEO EDITOR"
          profileImagePath={profile.show_photo ? profile.profile_image_path : null}
          focalX={profile.profile_image_focal_x ?? 50}
          focalY={profile.profile_image_focal_y ?? 50}
        />

        {/* C. Explore My Works */}
        <WorksSection
          categories={categories}
          projectsByCategory={projectsByCategory}
        />

        {/* D. Clients Worked With */}
        <ClientsSection clients={clients} />

        {/* E. About Me Section */}
        <AboutMeSection profile={profile} />
      </main>

      {/* F. Contact Floating Dock & Inquiry Modal */}
      <ContactSection contactSettings={contactSettings} />
    </div>
  );
}
