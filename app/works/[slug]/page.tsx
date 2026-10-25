'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Film,
  Instagram,
  Video,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCw,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { DecorativeRibbons } from '@/components/DecorativeRibbons';
import { VideoModal } from '@/components/VideoModal';
import { PortfolioStore } from '@/lib/data/portfolio-store';
import { Category, Project } from '@/types/portfolio';
import {
  getInstagramEmbedUrl,
  getYouTubeEmbedUrl,
  isDirectVideoUrl,
} from '@/lib/video/embed-utils';

export default function CategoryWorksPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Per-project audio state for inline auto-looping videos (defaults to muted for guaranteed browser autoplay)
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const cat = await PortfolioStore.getCategoryBySlug(slug);
        if (cat) {
          setCategory(cat);
          const projs = await PortfolioStore.getProjects(cat.id);
          setProjects(projs);
        }
      } catch (err) {
        console.error('Failed to load category projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  function toggleAudio(projectId: string, e: React.MouseEvent) {
    e.stopPropagation();
    setMutedMap((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === false ? true : false,
    }));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center cinematic-bg">
        <div className="w-12 h-12 rounded-full border-4 border-[#85E4FF]/20 border-t-[#85E4FF] animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen cinematic-bg flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Category Not Found</h1>
        <p className="text-sm text-[#A8C2DA]">The requested category does not exist or is unpublished.</p>
        <Link
          href="/"
          className="glass-pill px-6 py-2.5 text-sm font-semibold text-[#85E4FF] hover:bg-[#168BFF]/30 inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  const isReelsCategory = category.slug.includes('reel');

  return (
    <div className="relative min-h-screen cinematic-bg pb-20">
      <DecorativeRibbons />
      <Header brandName="NANI.EDITZ" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/#works"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-medium text-[#85E4FF] hover:text-white transition-colors glass-pill px-4 py-2 border border-[#85E4FF]/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>
        </div>

        {/* Category Header Hero */}
        <div className="glass-panel-elevated rounded-[36px] p-6 sm:p-10 mb-10 relative overflow-hidden border border-[#85E4FF]/40 shadow-2xl">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#85E4FF]/40 text-[#85E4FF] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CATEGORY SHOWCASE • LIVE AUTO-LOOP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white text-glow-cyan">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#A8C2DA] max-w-2xl pt-1">
              Curated collection of high-end motion editing, pacing, sound design, and color grading. Videos play and loop automatically.
            </p>
          </div>
        </div>

        {/* Projects / Embedded Reels Grid — All Playing Automatically in a Loop */}
        {projects.length > 0 ? (
          <div
            className={`grid gap-6 ${
              isReelsCategory
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {projects.map((project) => {
              const isInsta =
                project.video_provider === 'instagram' ||
                (project.video_url && project.video_url.includes('instagram.com'));
              const isVertical = project.aspect_ratio === '9:16' || isInsta || isReelsCategory;
              const isDirect =
                project.video_provider === 'direct' ||
                project.video_provider === 'cloudinary' ||
                (project.video_url && isDirectVideoUrl(project.video_url));
              const isYouTube =
                project.video_provider === 'youtube' ||
                (project.video_url &&
                  (project.video_url.includes('youtube.com') || project.video_url.includes('youtu.be')));

              const isMuted = mutedMap[project.id] !== false;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer rounded-3xl glass-panel p-3 sm:p-4 hover:border-[#85E4FF]/80 hover:shadow-cyan-neon transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Auto-Looping Video Frame (NO Play/Pause Button Needed) */}
                  <div
                    className={`relative w-full rounded-2xl overflow-hidden bg-[#02070D] ${
                      isVertical ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                  >
                    {project.video_url ? (
                      isDirect ? (
                        <video
                          src={project.video_url}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : isYouTube ? (
                        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                          <iframe
                            src={getYouTubeEmbedUrl(project.video_url, {
                              autoplay: true,
                              loop: true,
                              muted: true,
                              controls: false,
                            })}
                            title={project.title}
                            className="absolute w-[135%] h-[135%] max-w-none border-0 pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        </div>
                      ) : isInsta ? (
                        <iframe
                          src={getInstagramEmbedUrl(project.video_url)}
                          title={project.title}
                          className="w-full h-full border-0 pointer-events-none"
                          allow="autoplay; encrypted-media"
                        />
                      ) : (
                        <video
                          src={project.video_url}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : project.thumbnail_path ? (
                      <Image
                        src={project.thumbnail_path}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#052B69]/70 via-[#031326] to-[#02070D] p-4 text-center">
                        <Film className="w-10 h-10 text-[#85E4FF]/60 opacity-80 mb-2" />
                        <span className="text-xs font-semibold text-white/80 line-clamp-2 px-2">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Top Left: Platform Badge */}
                    <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5">
                      {isInsta ? (
                        <span className="px-2.5 py-1 rounded-full bg-pink-600/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center space-x-1 shadow-md border border-pink-400/40">
                          <Instagram className="w-3 h-3" />
                          <span>Reel</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#052B69]/85 backdrop-blur-md text-[#85E4FF] text-[10px] font-bold flex items-center space-x-1 shadow-md border border-[#85E4FF]/40 uppercase">
                          <Video className="w-3 h-3" />
                          <span>{project.video_provider}</span>
                        </span>
                      )}

                      {/* Live Auto-Loop Tag */}
                      <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#85E4FF] text-[9px] font-bold flex items-center space-x-1 border border-[#85E4FF]/30">
                        <RotateCw className="w-2.5 h-2.5 animate-spin text-[#85E4FF]" style={{ animationDuration: '4s' }} />
                        <span>Loop</span>
                      </span>
                    </div>

                    {/* Top Right: Sound & Maximize Controls */}
                    <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5">
                      {isDirect && (
                        <button
                          type="button"
                          onClick={(e) => toggleAudio(project.id, e)}
                          className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#85E4FF]/40 flex items-center justify-center text-white hover:bg-[#168BFF] transition-all shadow-lg"
                          title={isMuted ? 'Click to unmute sound' : 'Mute sound'}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5 text-[#A8C2DA]" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-[#85E4FF]" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#85E4FF]/40 flex items-center justify-center text-white hover:bg-[#168BFF] transition-all shadow-lg opacity-80 group-hover:opacity-100"
                        title="View Full Size"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>

                    {/* Subtle bottom gradient for readability */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-2 pt-3">
                    <h3 className="text-base font-bold text-white group-hover:text-[#85E4FF] transition-colors truncate">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-xs text-[#A8C2DA] line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 border border-[#85E4FF]/30">
            <div className="w-16 h-16 rounded-2xl glass-panel-subtle mx-auto flex items-center justify-center text-[#85E4FF] border border-[#85E4FF]/30">
              <Film className="w-8 h-8 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No Reels or Videos Published Yet</h3>
              <p className="text-xs text-[#A8C2DA]">
                Videos and Instagram Reels can be embedded directly into{' '}
                <span className="text-[#85E4FF] font-semibold">{category.name}</span> from the Admin Dashboard Category Manager.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Cinematic Modal (Also Auto-Looping) */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
