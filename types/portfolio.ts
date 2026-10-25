export interface Profile {
  id: string;
  display_name: string;
  biography?: string | null;
  profile_image_path?: string | null;
  profile_image_focal_x?: number;
  profile_image_focal_y?: number;
  experience_label: string; // "2 Years of Experience"
  editing_tools: string[]; // ["DaVinci Resolve", "Adobe Premiere Pro", "Adobe After Effects"]
  skills?: string[];
  show_photo: boolean;
  show_tools: boolean;
  show_experience: boolean;
  show_bio: boolean;
  section_visible: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  thumbnail_path?: string | null;
  thumbnail_focal_position?: string;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
  projects_count?: number;
}

export type VideoProvider = 'instagram' | 'youtube' | 'direct' | 'cloudinary' | 'vimeo' | 'embed';

export interface Project {
  id: string;
  category_id?: string | null;
  title: string;
  description?: string | null;
  video_provider: VideoProvider;
  video_url?: string | null;
  embed_code?: string | null;
  aspect_ratio?: '9:16' | '16:9';
  thumbnail_path?: string | null;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
  category?: Category | null;
}

export interface Client {
  id: string;
  name: string;
  logo_path?: string | null;
  website_url?: string | null;
  display_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactSettings {
  instagram?: string; // https://www.instagram.com/nawin.fx/
  instagram_enabled: boolean;
  phone?: string; // 8309249050
  phone_enabled: boolean;
  email?: string;
  email_enabled: boolean;
  whatsapp?: string;
  whatsapp_enabled: boolean;
  contact_form_enabled: boolean;
}

export interface AppearanceSettings {
  sky_blue: string;
  light_cyan: string;
  navy_text: string;
  background_color: string;
  glass_opacity: string;
  glass_border_color: string;
  corner_radius: string;
  glow_intensity: 'subtle' | 'medium' | 'soft';
  animation_intensity: 'subtle' | 'smooth' | 'off';
}

export interface SiteSettings {
  contact_info: ContactSettings;
  appearance: AppearanceSettings;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
  created_at: string;
}
