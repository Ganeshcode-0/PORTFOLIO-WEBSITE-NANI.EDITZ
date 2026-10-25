-- ==============================================================================
-- NANI.EDITZ - VIDEO EDITOR PORTFOLIO: SUPABASE SCHEMA MIGRATION
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMINISTRATORS TABLE
CREATE TABLE IF NOT EXISTS public.administrators (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.administrators
        WHERE user_id = auth.uid()
          AND role = 'admin'
    );
$$;

-- 2. PROFILES TABLE (ABOUT ME DATA)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL DEFAULT 'NANI.EDITZ',
    biography TEXT,
    profile_image_path TEXT,
    profile_image_focal_x NUMERIC DEFAULT 50,
    profile_image_focal_y NUMERIC DEFAULT 50,
    experience_label TEXT NOT NULL DEFAULT '2 Years of Experience',
    editing_tools JSONB NOT NULL DEFAULT '["DaVinci Resolve", "Adobe Premiere Pro", "Adobe After Effects"]'::jsonb,
    skills JSONB DEFAULT '["Color Grading", "Sound Design", "Motion Graphics", "Pacing & Rhythm"]'::jsonb,
    show_photo BOOLEAN NOT NULL DEFAULT true,
    show_tools BOOLEAN NOT NULL DEFAULT true,
    show_experience BOOLEAN NOT NULL DEFAULT true,
    show_bio BOOLEAN NOT NULL DEFAULT false,
    section_visible BOOLEAN NOT NULL DEFAULT true,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    thumbnail_path TEXT,
    thumbnail_focal_position TEXT DEFAULT 'center',
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_order ON public.categories(display_order);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_provider TEXT NOT NULL DEFAULT 'youtube', -- 'youtube', 'cloudinary', 'vimeo', 'direct'
    video_url TEXT,
    thumbnail_path TEXT,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);

-- 5. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_path TEXT,
    website_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_order ON public.clients(display_order);

-- 6. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(setting_key);

-- 7. CONTACT FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_created ON public.contact_submissions(created_at);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.administrators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Administrators: only existing admins can read the administrators table
CREATE POLICY "Admins can view admin table"
    ON public.administrators FOR SELECT
    USING (public.is_admin());

-- Profiles
CREATE POLICY "Public read published profiles"
    ON public.profiles FOR SELECT
    USING (published = true OR public.is_admin());

CREATE POLICY "Admin manage profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Categories
CREATE POLICY "Public read published categories"
    ON public.categories FOR SELECT
    USING (published = true OR public.is_admin());

CREATE POLICY "Admin manage categories"
    ON public.categories FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Projects
CREATE POLICY "Public read published projects"
    ON public.projects FOR SELECT
    USING (published = true OR public.is_admin());

CREATE POLICY "Admin manage projects"
    ON public.projects FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Clients
CREATE POLICY "Public read published clients"
    ON public.clients FOR SELECT
    USING (published = true OR public.is_admin());

CREATE POLICY "Admin manage clients"
    ON public.clients FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Site Settings
CREATE POLICY "Public read site settings"
    ON public.site_settings FOR SELECT
    USING (true);

CREATE POLICY "Admin manage site settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Contact Submissions: Public can INSERT, Admin can SELECT/DELETE
CREATE POLICY "Public insert contact submissions"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin view contact submissions"
    ON public.contact_submissions FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admin delete contact submissions"
    ON public.contact_submissions FOR DELETE
    USING (public.is_admin());
