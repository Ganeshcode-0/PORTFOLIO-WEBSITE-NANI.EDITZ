import {
  Profile,
  Category,
  Project,
  Client,
  ContactSettings,
  AppearanceSettings,
  ContactSubmission,
} from '@/types/portfolio';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '../supabase/client';

export const DEFAULT_PROFILE: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  display_name: 'NANI.EDITZ',
  biography: '',
  profile_image_path: '/images/profile.jpg',
  profile_image_focal_x: 50,
  profile_image_focal_y: 50,
  experience_label: '2 Years of Experience',
  editing_tools: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Adobe After Effects'],
  skills: ['Color Grading', 'Sound Design', 'Motion Graphics', 'Pacing & Rhythm'],
  show_photo: true,
  show_tools: true,
  show_experience: true,
  show_bio: false,
  section_visible: true,
  published: true,
};

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Instagram Reels',
    slug: 'instagram-reels',
    thumbnail_path: null,
    thumbnail_focal_position: 'center',
    display_order: 1,
    published: true,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Wedding Reels & Films',
    slug: 'wedding-reels-films',
    thumbnail_path: null,
    thumbnail_focal_position: 'center',
    display_order: 2,
    published: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Real Estate Videos',
    slug: 'real-estate-videos',
    thumbnail_path: null,
    thumbnail_focal_position: 'center',
    display_order: 3,
    published: true,
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Motion Graphics',
    slug: 'motion-graphics',
    thumbnail_path: null,
    thumbnail_focal_position: 'center',
    display_order: 4,
    published: true,
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Commercials & Brand Ads',
    slug: 'commercials-brand-ads',
    thumbnail_path: null,
    thumbnail_focal_position: 'center',
    display_order: 5,
    published: true,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1111111-1111-1111-1111-111111111111',
    category_id: '11111111-1111-1111-1111-111111111111', // Instagram Reels
    title: 'Urban Streetwear Cinematic Reel',
    description: 'High-energy fast-paced rhythm editing with DaVinci Resolve color grade and kinetic typography.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_fill,ar_9:16,w_720/finish_line.mp4',
    aspect_ratio: '9:16',
    display_order: 1,
    published: true,
  },
  {
    id: 'p1111111-2222-2222-2222-111111111111',
    category_id: '11111111-1111-1111-1111-111111111111', // Instagram Reels
    title: 'Visual Flow & Underwater Pacing Reel',
    description: 'Smooth slow-motion ramps, cinematic depth, and ambient sound mastering.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_fill,ar_9:16,w_720/sea_turtle.mp4',
    aspect_ratio: '9:16',
    display_order: 2,
    published: true,
  },
  {
    id: 'p2222222-2222-2222-2222-222222222222',
    category_id: '22222222-2222-2222-2222-222222222222', // Wedding Reels & Films
    title: 'Royal Destination Wedding Film',
    description: 'Cinematic visual storytelling, romantic warm tones, and emotional sound design.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/elephants.mp4',
    aspect_ratio: '16:9',
    display_order: 1,
    published: true,
  },
  {
    id: 'p3333333-3333-3333-3333-333333333333',
    category_id: '44444444-4444-4444-4444-444444444444', // Motion Graphics
    title: '3D Kinetic Logo & Title Animation',
    description: 'After Effects motion design, sculpted 3D layers, sound design and glass textures.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/sea_turtle.mp4',
    aspect_ratio: '16:9',
    display_order: 1,
    published: true,
  },
  {
    id: 'p4444444-4444-4444-4444-444444444444',
    category_id: '33333333-3333-3333-3333-333333333333', // Real Estate Videos
    title: 'Luxury Villa Architectural Walkthrough',
    description: 'Gimbal stability, interior lighting balance, architectural pacing, and ambient sound.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/sea_turtle.mp4',
    aspect_ratio: '16:9',
    display_order: 1,
    published: true,
  },
  {
    id: 'p5555555-5555-5555-5555-555555555555',
    category_id: '55555555-5555-5555-5555-555555555555', // Commercials & Brand Ads
    title: 'Dynamic Sports Commercial Teaser',
    description: 'Speed ramps, punchy visual cuts, and high-impact sound design.',
    video_provider: 'direct',
    video_url: 'https://res.cloudinary.com/demo/video/upload/c_scale,w_720/finish_line.mp4',
    aspect_ratio: '16:9',
    display_order: 1,
    published: true,
  },
];

export const DEFAULT_CLIENTS: Client[] = [
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

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  instagram: 'https://www.instagram.com/nawin.fx/',
  instagram_enabled: true,
  phone: '8309249050',
  phone_enabled: true,
  email: '',
  email_enabled: false,
  whatsapp: 'https://wa.me/918309249050?text=Hi%20Nani,%20I%20am%20interested%20in%20your%20video%20editing%20services',
  whatsapp_enabled: true,
  contact_form_enabled: true,
};

export const DEFAULT_APPEARANCE_SETTINGS: AppearanceSettings = {
  sky_blue: '#38BDF8',
  light_cyan: '#BAE6FD',
  navy_text: '#0A192F',
  background_color: '#F8FAFC',
  glass_opacity: '0.80',
  glass_border_color: 'rgba(186, 230, 253, 0.7)',
  corner_radius: '28px',
  glow_intensity: 'soft',
  animation_intensity: 'smooth',
};

const STORAGE_KEYS = {
  PROFILE: 'nani_portfolio_profile_v3',
  CATEGORIES: 'nani_portfolio_categories_v3',
  PROJECTS: 'nani_portfolio_projects_v6',
  CLIENTS: 'nani_portfolio_clients_v5',
  CONTACT: 'nani_portfolio_contact_v3',
  APPEARANCE: 'nani_portfolio_appearance_v3',
  SUBMISSIONS: 'nani_portfolio_submissions_v3',
};

function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);

    // If existing projects in localStorage contain old youtube test links, flush them
    if (key.includes('projects') && Array.isArray(parsed)) {
      const hasOldYouTube = parsed.some(
        (p: any) => p?.video_url && (p.video_url.includes('youtube.com') || p.video_url.includes('youtu.be'))
      );
      if (hasOldYouTube) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    }

    return parsed;
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export const PortfolioStore = {
  // -------------------------------------------------------------
  // PROFILE / ABOUT ME
  // -------------------------------------------------------------
  async getProfile(): Promise<Profile> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('published', true)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          return {
            ...DEFAULT_PROFILE,
            ...data,
            editing_tools: data.editing_tools || DEFAULT_PROFILE.editing_tools,
          } as Profile;
        }
      } catch (e) {
        // Fallback to local
      }
    }
    return getLocalData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  },

  async updateProfile(profile: Partial<Profile>): Promise<Profile> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const current = await this.getProfile();
        const payload = {
          ...current,
          ...profile,
          updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase
          .from('profiles')
          .upsert(payload)
          .select()
          .single();

        if (!error && data) return data as Profile;
      } catch (e) {
        console.warn('Supabase profile save fallback to local:', e);
      }
    }

    const current = getLocalData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    const updated = { ...current, ...profile, updated_at: new Date().toISOString() };
    setLocalData(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  // -------------------------------------------------------------
  // CATEGORIES
  // -------------------------------------------------------------
  async getCategories(includeUnpublished = false): Promise<Category[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        let query = supabase
          .from('categories')
          .select('*, projects(count)')
          .order('display_order', { ascending: true });

        if (!includeUnpublished) {
          query = query.eq('published', true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            ...item,
            projects_count: item.projects?.[0]?.count || 0,
          })) as Category[];
        }
      } catch (e) {
        // Fallback to local
      }
    }

    const categories = getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    return includeUnpublished ? categories : categories.filter((c) => c.published);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getCategories(true);
    return categories.find((c) => c.slug === slug) || null;
  },

  async saveCategory(category: Partial<Category>): Promise<Category> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const payload = {
          ...category,
          updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase
          .from('categories')
          .upsert(payload)
          .select()
          .single();

        if (!error && data) return data as Category;
      } catch (e) {
        console.warn('Supabase category save fallback to local:', e);
      }
    }

    const categories = getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    let updatedList: Category[];
    let saved: Category;

    if (category.id) {
      saved = {
        ...categories.find((c) => c.id === category.id)!,
        ...category,
        updated_at: new Date().toISOString(),
      } as Category;
      updatedList = categories.map((c) => (c.id === category.id ? saved : c));
    } else {
      saved = {
        id: crypto.randomUUID(),
        name: category.name || 'New Category',
        slug: category.slug || `category-${Date.now()}`,
        display_order: categories.length + 1,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...category,
      } as Category;
      updatedList = [...categories, saved];
    }

    setLocalData(STORAGE_KEYS.CATEGORIES, updatedList);
    return saved;
  },

  async deleteCategory(id: string): Promise<void> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('categories').delete().eq('id', id);
      } catch (e) {}
    }

    const categories = getLocalData<Category[]>(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    setLocalData(STORAGE_KEYS.CATEGORIES, categories.filter((c) => c.id !== id));
  },

  // -------------------------------------------------------------
  // PROJECTS
  // -------------------------------------------------------------
  async getProjects(categoryId?: string, includeUnpublished = false): Promise<Project[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        let query = supabase
          .from('projects')
          .select('*, category:categories(*)')
          .order('display_order', { ascending: true });

        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }
        if (!includeUnpublished) {
          query = query.eq('published', true);
        }

        const { data, error } = await query;
        if (!error && data) return data as Project[];
      } catch (e) {}
    }

    const projects = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    let filtered = projects;
    if (categoryId) {
      filtered = filtered.filter((p) => p.category_id === categoryId);
    }
    if (!includeUnpublished) {
      filtered = filtered.filter((p) => p.published);
    }
    return filtered;
  },

  async saveProject(project: Partial<Project>): Promise<Project> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const payload = {
          ...project,
          updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase
          .from('projects')
          .upsert(payload)
          .select()
          .single();

        if (!error && data) return data as Project;
      } catch (e) {}
    }

    const projects = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    let updatedList: Project[];
    let saved: Project;

    if (project.id) {
      saved = {
        ...projects.find((p) => p.id === project.id)!,
        ...project,
        updated_at: new Date().toISOString(),
      } as Project;
      updatedList = projects.map((p) => (p.id === project.id ? saved : p));
    } else {
      saved = {
        id: crypto.randomUUID(),
        title: project.title || 'Untitled Project',
        video_provider: project.video_provider || 'youtube',
        display_order: projects.length + 1,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...project,
      } as Project;
      updatedList = [...projects, saved];
    }

    setLocalData(STORAGE_KEYS.PROJECTS, updatedList);
    return saved;
  },

  async deleteProject(id: string): Promise<void> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {}
    }

    const projects = getLocalData<Project[]>(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    setLocalData(STORAGE_KEYS.PROJECTS, projects.filter((p) => p.id !== id));
  },

  // -------------------------------------------------------------
  // CLIENTS
  // -------------------------------------------------------------
  async getClients(includeUnpublished = false): Promise<Client[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        let query = supabase
          .from('clients')
          .select('*')
          .order('display_order', { ascending: true });

        if (!includeUnpublished) {
          query = query.eq('published', true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Client[];
      } catch (e) {}
    }

    const clients = getLocalData<Client[]>(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS);
    return includeUnpublished ? clients : clients.filter((c) => c.published);
  },

  async saveClient(client: Partial<Client>): Promise<Client> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const payload = {
          ...client,
          updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase
          .from('clients')
          .upsert(payload)
          .select()
          .single();

        if (!error && data) return data as Client;
      } catch (e) {}
    }

    const clients = getLocalData<Client[]>(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS);
    let updatedList: Client[];
    let saved: Client;

    if (client.id) {
      saved = {
        ...clients.find((c) => c.id === client.id)!,
        ...client,
        updated_at: new Date().toISOString(),
      } as Client;
      updatedList = clients.map((c) => (c.id === client.id ? saved : c));
    } else {
      saved = {
        id: crypto.randomUUID(),
        name: client.name || 'New Client',
        logo_path: client.logo_path || null,
        display_order: clients.length + 1,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...client,
      } as Client;
      updatedList = [...clients, saved];
    }

    setLocalData(STORAGE_KEYS.CLIENTS, updatedList);
    return saved;
  },

  async deleteClient(id: string): Promise<void> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('clients').delete().eq('id', id);
      } catch (e) {}
    }

    const clients = getLocalData<Client[]>(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS);
    setLocalData(STORAGE_KEYS.CLIENTS, clients.filter((c) => c.id !== id));
  },

  // -------------------------------------------------------------
  // CONTACT & APPEARANCE SETTINGS
  // -------------------------------------------------------------
  async getContactSettings(): Promise<ContactSettings> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'contact_info')
          .maybeSingle();

        if (!error && data?.setting_value) {
          return { ...DEFAULT_CONTACT_SETTINGS, ...data.setting_value } as ContactSettings;
        }
      } catch (e) {}
    }

    return getLocalData(STORAGE_KEYS.CONTACT, DEFAULT_CONTACT_SETTINGS);
  },

  async updateContactSettings(settings: Partial<ContactSettings>): Promise<ContactSettings> {
    const current = await this.getContactSettings();
    const updated = { ...current, ...settings };

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('site_settings').upsert({
          setting_key: 'contact_info',
          setting_value: updated,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {}
    }

    setLocalData(STORAGE_KEYS.CONTACT, updated);
    return updated;
  },

  async getAppearanceSettings(): Promise<AppearanceSettings> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'appearance')
          .maybeSingle();

        if (!error && data?.setting_value) {
          return { ...DEFAULT_APPEARANCE_SETTINGS, ...data.setting_value } as AppearanceSettings;
        }
      } catch (e) {}
    }

    return getLocalData(STORAGE_KEYS.APPEARANCE, DEFAULT_APPEARANCE_SETTINGS);
  },

  async updateAppearanceSettings(settings: Partial<AppearanceSettings>): Promise<AppearanceSettings> {
    const current = await this.getAppearanceSettings();
    const updated = { ...current, ...settings };

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('site_settings').upsert({
          setting_key: 'appearance',
          setting_value: updated,
          updated_at: new Date().toISOString(),
        });
      } catch (e) {}
    }

    setLocalData(STORAGE_KEYS.APPEARANCE, updated);
    return updated;
  },

  // -------------------------------------------------------------
  // CONTACT FORM SUBMISSIONS
  // -------------------------------------------------------------
  async submitContactInquiry(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
    const payload: ContactSubmission = {
      id: crypto.randomUUID(),
      ...submission,
      created_at: new Date().toISOString(),
    };

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        await supabase.from('contact_submissions').insert(payload);
      } catch (e) {
        // Fallback local
      }
    }

    const current = getLocalData<ContactSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
    setLocalData(STORAGE_KEYS.SUBMISSIONS, [payload, ...current]);
    return payload;
  },

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as ContactSubmission[];
      } catch (e) {}
    }
    return getLocalData<ContactSubmission[]>(STORAGE_KEYS.SUBMISSIONS, []);
  },
};
