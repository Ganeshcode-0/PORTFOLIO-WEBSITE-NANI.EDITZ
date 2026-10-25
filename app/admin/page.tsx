'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import {
  PortfolioStore,
  DEFAULT_PROFILE,
  DEFAULT_CATEGORIES,
  DEFAULT_PROJECTS,
  DEFAULT_CLIENTS,
  DEFAULT_CONTACT_SETTINGS,
  DEFAULT_APPEARANCE_SETTINGS,
} from '@/lib/data/portfolio-store';
import { Profile, Category, Project, Client, ContactSettings, AppearanceSettings } from '@/types/portfolio';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { OverviewTab } from '@/components/admin/OverviewTab';
import { AboutMeForm } from '@/components/admin/AboutMeForm';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { ProjectManager } from '@/components/admin/ProjectManager';
import { ClientManager } from '@/components/admin/ClientManager';
import { ContactForm } from '@/components/admin/ContactForm';
import { SubmissionsTab } from '@/components/admin/SubmissionsTab';
import { AppearanceForm } from '@/components/admin/AppearanceForm';
import { SecurityTab } from '@/components/admin/SecurityTab';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication & session state
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@nanieditz.com');

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState<string>('overview');

  // Application data state
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [clients, setClients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [contactSettings, setContactSettings] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS);
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(DEFAULT_APPEARANCE_SETTINGS);

  // Initial authentication & data load
  useEffect(() => {
    async function initAdmin() {
      const supabase = getSupabaseBrowserClient();

      if (supabase) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            // Check if local dev session is present
            const session = localStorage.getItem('pc_admin_session');
            if (!session) {
              router.push('/admin/login');
              return;
            }
          } else {
            setUserEmail(user.email || 'admin@nanieditz.com');
          }
        } catch {
          // Continue with dev session if any
        }
        setIsAuthorized(true);
      } else {
        const session = localStorage.getItem('pc_admin_session');
        if (!session) {
          router.push('/admin/login');
          return;
        }
        setIsAuthorized(true);
      }

      // Load full database content
      try {
        const [prof, cats, projs, cls, contact, appearance] = await Promise.all([
          PortfolioStore.getProfile(),
          PortfolioStore.getCategories(true),
          PortfolioStore.getProjects(undefined, true),
          PortfolioStore.getClients(true),
          PortfolioStore.getContactSettings(),
          PortfolioStore.getAppearanceSettings(),
        ]);

        setProfile(prof);
        setCategories(cats);
        setProjects(projs);
        setClients(cls);
        setContactSettings(contact);
        setAppearanceSettings(appearance);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    }

    initAdmin();
  }, [router]);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    localStorage.removeItem('pc_admin_session');
    router.push('/admin/login');
  }

  // Save handlers
  async function handleSaveProfile(updated: Profile) {
    const saved = await PortfolioStore.updateProfile(updated);
    setProfile(saved);
  }

  async function handleSaveCategory(cat: Partial<Category>) {
    await PortfolioStore.saveCategory(cat);
    const refreshed = await PortfolioStore.getCategories(true);
    setCategories(refreshed);
  }

  async function handleDeleteCategory(id: string) {
    await PortfolioStore.deleteCategory(id);
    const refreshed = await PortfolioStore.getCategories(true);
    setCategories(refreshed);
  }

  async function handleSaveProject(proj: Partial<Project>) {
    await PortfolioStore.saveProject(proj);
    const refreshed = await PortfolioStore.getProjects(undefined, true);
    setProjects(refreshed);
  }

  async function handleDeleteProject(id: string) {
    await PortfolioStore.deleteProject(id);
    const refreshed = await PortfolioStore.getProjects(undefined, true);
    setProjects(refreshed);
  }

  async function handleSaveClient(cli: Partial<Client>) {
    await PortfolioStore.saveClient(cli);
    const refreshed = await PortfolioStore.getClients(true);
    setClients(refreshed);
  }

  async function handleDeleteClient(id: string) {
    await PortfolioStore.deleteClient(id);
    const refreshed = await PortfolioStore.getClients(true);
    setClients(refreshed);
  }

  async function handleSaveContact(settings: ContactSettings) {
    const saved = await PortfolioStore.updateContactSettings(settings);
    setContactSettings(saved);
  }

  async function handleSaveAppearance(settings: AppearanceSettings) {
    const saved = await PortfolioStore.updateAppearanceSettings(settings);
    setAppearanceSettings(saved);
  }

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen cinematic-bg flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-9 h-9 text-[#85E4FF] animate-spin" />
        <p className="text-xs font-bold text-[#85E4FF] tracking-widest uppercase">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      onLogout={handleLogout}
      userEmail={userEmail}
    >
      {currentTab === 'overview' && (
        <OverviewTab
          profile={profile}
          categories={categories}
          projects={projects}
          clients={clients}
          contactSettings={contactSettings}
          onNavigate={setCurrentTab}
        />
      )}

      {currentTab === 'about' && (
        <AboutMeForm
          initialProfile={profile}
          onSave={handleSaveProfile}
        />
      )}

      {currentTab === 'categories' && (
        <CategoryManager
          categories={categories}
          projects={projects}
          onSaveCategory={handleSaveCategory}
          onDeleteCategory={handleDeleteCategory}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {currentTab === 'projects' && (
        <ProjectManager
          projects={projects}
          categories={categories}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {currentTab === 'clients' && (
        <ClientManager
          clients={clients}
          onSaveClient={handleSaveClient}
          onDeleteClient={handleDeleteClient}
        />
      )}

      {currentTab === 'contact' && (
        <ContactForm
          initialSettings={contactSettings}
          onSave={handleSaveContact}
        />
      )}

      {currentTab === 'submissions' && (
        <SubmissionsTab />
      )}

      {currentTab === 'appearance' && (
        <AppearanceForm
          initialSettings={appearanceSettings}
          onSave={handleSaveAppearance}
        />
      )}

      {currentTab === 'security' && (
        <SecurityTab
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      )}
    </AdminLayout>
  );
}
