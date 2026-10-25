-- ==============================================================================
-- NANI.EDITZ - SEED SCRIPT
-- ==============================================================================

-- 1. Initial About Me Profile
INSERT INTO public.profiles (
    id,
    display_name,
    biography,
    profile_image_path,
    experience_label,
    editing_tools,
    skills,
    show_photo,
    show_tools,
    show_experience,
    show_bio,
    section_visible,
    published
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'NANI.EDITZ',
    NULL,
    '/images/profile.jpg',
    '2 Years of Experience',
    '["DaVinci Resolve", "Adobe Premiere Pro", "Adobe After Effects"]'::jsonb,
    '["Color Grading", "Sound Design", "Motion Graphics", "Pacing & Rhythm"]'::jsonb,
    true,
    true,
    true,
    false,
    true,
    true
) ON CONFLICT (id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    profile_image_path = EXCLUDED.profile_image_path,
    experience_label = EXCLUDED.experience_label,
    editing_tools = EXCLUDED.editing_tools;

-- 2. Initial Categories (5 Confirmed Channels)
INSERT INTO public.categories (id, name, slug, thumbnail_path, display_order, published)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'Instagram Reels', 'instagram-reels', NULL, 1, true),
    ('22222222-2222-2222-2222-222222222222', 'Wedding Reels & Films', 'wedding-reels-films', NULL, 2, true),
    ('33333333-3333-3333-3333-333333333333', 'Real Estate Videos', 'real-estate-videos', NULL, 3, true),
    ('44444444-4444-4444-4444-444444444444', 'Motion Graphics', 'motion-graphics', NULL, 4, true),
    ('55555555-5555-5555-5555-555555555555', 'Commercials & Brand Ads', 'commercials-brand-ads', NULL, 5, true)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    display_order = EXCLUDED.display_order;

-- 3. Initial Confirmed Clients (Only 2 Confirmed Clients)
INSERT INTO public.clients (id, name, logo_path, website_url, display_order, published)
VALUES
    ('c1111111-1111-1111-1111-111111111111', '24framesphotography', '/images/clients/24framesphotography.jpg', 'https://www.instagram.com/24framesphotography_official/', 1, true),
    ('c3333333-3333-3333-3333-333333333333', 'NRK Infotech', '/images/clients/nrkinfotech.jpg', 'https://www.instagram.com/nrkinfotech/', 2, true)
ON CONFLICT (id) DO UPDATE SET
    logo_path = EXCLUDED.logo_path,
    website_url = EXCLUDED.website_url;

-- 4. Initial Site Settings
INSERT INTO public.site_settings (setting_key, setting_value)
VALUES
    ('contact_info', '{
        "instagram": "https://www.instagram.com/nawin.fx/",
        "instagram_enabled": true,
        "phone": "8309249050",
        "phone_enabled": true,
        "email": "",
        "email_enabled": false,
        "whatsapp": "https://wa.me/918309249050?text=Hi%20Nani,%20I%20am%20interested%20in%20your%20video%20editing%20services",
        "whatsapp_enabled": true,
        "contact_form_enabled": true
    }'::jsonb),
        "contact_form_enabled": true
    }'::jsonb),
    ('appearance', '{
        "sky_blue": "#38BDF8",
        "light_cyan": "#BAE6FD",
        "navy_text": "#0A192F",
        "background_color": "#F8FAFC",
        "glass_opacity": "0.80",
        "glass_border_color": "rgba(186, 230, 253, 0.7)",
        "corner_radius": "28px",
        "glow_intensity": "soft",
        "animation_intensity": "smooth"
    }'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET
    setting_value = EXCLUDED.setting_value;
