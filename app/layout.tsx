import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NANI.EDITZ — VIDEO EDITOR PORTFOLIO',
  description:
    'Production-ready video editing portfolio for NANI.EDITZ featuring Instagram Reels, Wedding Reels & Films, Real Estate Videos, Motion Graphics, and Commercials with 3D Blue Glassmorphism aesthetic.',
  keywords: [
    'NANI.EDITZ',
    'Video Editor',
    'Instagram Reels',
    'Wedding Films',
    'DaVinci Resolve',
    'Premiere Pro',
    'After Effects',
  ],
  authors: [{ name: 'NANI.EDITZ' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#031326',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="cinematic-bg antialiased text-[#F5FAFF] min-h-screen relative selection:bg-[#63D0F2]/30 selection:text-[#F5FAFF]">
        {children}
      </body>
    </html>
  );
}
