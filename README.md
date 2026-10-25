# NANI.EDITZ — Production-Ready Video Editor Portfolio

A production-grade, highly responsive video editor portfolio website featuring a premium **white and soft sky-blue glassmorphism aesthetic**, a dynamic About Me section, and a secure admin dashboard backed by Supabase PostgreSQL, Supabase Auth, and Supabase Storage.

---

## 🎨 Visual Identity & Aesthetic

- **Design Style**: Predominantly white and soft sky-blue glassmorphism aesthetic.
- **Color Palette**:
  - Backgrounds: `#F8FAFC` to `#F0F9FF` soft sky-blue ambient wash
  - Translucent White Glass Panels: `rgba(255, 255, 255, 0.78)` with `backdrop-filter: blur(24px)`
  - Thin Light Blue Borders: `rgba(186, 230, 253, 0.65)`
  - Primary Sky Blue: `#38BDF8`
  - Deep Navy Typography: `#0A192F` for crisp contrast and readability
- **Curvature & 3D**: Organically curved hero and category cards with restrained ambient lighting.
- **Mobile-First**: Tested and responsive at ~390px viewport width with no horizontal overflow.

---

## 🎬 Confirmed Client Details (Zero Fabrication)

- **Brand Name**: `NANI.EDITZ`
- **Subtitle**: `VIDEO EDITOR`
- **Experience**: **`2 Years of Experience`**
- **Confirmed Editing Tools**:
  1. `DaVinci Resolve`
  2. `Adobe Premiere Pro`
  3. `Adobe After Effects`
- **Portrait Photo**: Reserved visual slot (awaiting client image; no fake portrait generated).
- **Categories (5 Initial Database Records)**:
  1. Instagram Reels (`/works/instagram-reels`)
  2. Wedding Reels & Films (`/works/wedding-reels-films`)
  3. Real Estate Videos (`/works/real-estate-videos`)
  4. Motion Graphics (`/works/motion-graphics`)
  5. Commercials & Brand Ads (`/works/commercials-brand-ads`)
- **Clients Worked With (3 Confirmed Client Names)**:
  - `24framesphotography`
  - `creativebuddha`
  - `NRK Infotech`
  *(Rendered in restrained, elegant typography monograms without fake logos)*.
- **Contact Channels**:
  - Instagram DM: `https://www.instagram.com/nawin.fx/`
  - Direct Phone: `8309249050`
  - Working website inquiry contact modal with anti-spam protection.
  - Optional Email & WhatsApp (admin configurable).

---

## 🗄️ Database & Admin Architecture

- **Supabase Credentials**: Connected to `https://ycwemroeuymfodvnulow.supabase.co` with Row Level Security (RLS) policies.
- **Storage**: `portfolio-assets` public bucket initialized on Supabase Storage.
- **Migrations**:
  - [`supabase/migrations/001_initial_schema.sql`](file:///C:/Users/mogil/.gemini/antigravity/scratch/punith-chowdary-portfolio/supabase/migrations/001_initial_schema.sql): tables for `profiles`, `categories`, `projects`, `clients`, `site_settings`, `contact_submissions`, `administrators`.
  - [`supabase/seed.sql`](file:///C:/Users/mogil/.gemini/antigravity/scratch/punith-chowdary-portfolio/supabase/seed.sql): seeds NANI.EDITZ profile, 5 categories, and 3 clients.
- **Admin Dashboard (`/admin`)**:
  - **Overview**: Real counts (categories, projects, clients, contact channels).
  - **About Me**: Live mirror preview, edit tools, experience, photo upload with focal point, field toggles.
  - **Categories**: Create/edit 5 categories, slug generator, thumbnails, display order, publish toggle.
  - **Video Projects**: Modular media provider (YouTube, Cloudinary, Vimeo, MP4 direct), custom thumbnails, category assignment.
  - **Clients**: Manage 3 clients, upload logos, set website links.
  - **Contact & Social**: Manage Instagram, phone, email, contact modal toggle.
  - **Inquiries**: View inquiries submitted from the website contact modal.
  - **Appearance**: Adjust light sky-blue theme, opacity, curvature, glow.
  - **Security**: Supabase status, RLS policies, session logout.

---

## 🚀 Running Locally

```bash
# Start the production server
npm run start
```
- Public Portfolio: [http://localhost:3000](http://localhost:3000)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
