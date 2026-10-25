'use client';

import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Instagram, RotateCw } from 'lucide-react';
import { Project } from '@/types/portfolio';
import {
  getInstagramEmbedUrl,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
  isDirectVideoUrl,
} from '@/lib/video/embed-utils';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Ensure automatic playback when project changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If unmuted autoplay is blocked by browser policy, fallback to muted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [project]);

  if (!project) return null;

  const isReel =
    project.aspect_ratio === '9:16' ||
    project.video_provider === 'instagram' ||
    project.category?.slug.includes('reel') ||
    project.title.toLowerCase().includes('reel');

  const isInstagram =
    project.video_provider === 'instagram' ||
    (project.video_url && project.video_url.includes('instagram.com'));

  const isDirect =
    project.video_provider === 'direct' ||
    project.video_provider === 'cloudinary' ||
    (project.video_url && isDirectVideoUrl(project.video_url));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          isReel ? 'max-w-md h-[85vh] max-h-[720px]' : 'max-w-4xl aspect-video'
        } glass-panel-elevated rounded-3xl overflow-hidden p-2 shadow-2xl flex flex-col border border-[#85E4FF]/40`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/20 transition-all border border-[#85E4FF]/40 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video / Reel Player — Plays Automatically in Continuous Loop */}
        <div className="w-full flex-1 rounded-2xl overflow-hidden bg-black flex items-center justify-center relative">
          {project.embed_code ? (
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              dangerouslySetInnerHTML={{ __html: project.embed_code }}
            />
          ) : project.video_url ? (
            isInstagram ? (
              <div className="relative w-full h-full flex items-center justify-center bg-[#02070D]">
                <iframe
                  src={getInstagramEmbedUrl(project.video_url)}
                  title={project.title}
                  className="w-full h-full border-0 rounded-2xl"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
                {/* Floating direct link to Instagram */}
                <a
                  href={project.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 z-20 glass-pill px-3 py-1.5 text-xs font-semibold text-pink-300 hover:text-white hover:bg-pink-600/30 border border-pink-400/40 flex items-center space-x-1.5 shadow-lg backdrop-blur-md"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Open on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : isDirect ? (
              <video
                ref={videoRef}
                src={project.video_url}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            ) : project.video_provider === 'youtube' || project.video_url.includes('youtube.com') || project.video_url.includes('youtu.be') ? (
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <iframe
                  src={getYouTubeEmbedUrl(project.video_url, {
                    autoplay: true,
                    loop: true,
                    muted: true,
                    controls: false,
                  })}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : project.video_provider === 'vimeo' || project.video_url.includes('vimeo.com') ? (
              <iframe
                src={getVimeoEmbedUrl(project.video_url, {
                  autoplay: true,
                  loop: true,
                  muted: false,
                })}
                title={project.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                src={project.video_url}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-white">No video stream or embed URL configured</p>
              <p className="text-xs text-[#A8C2DA]">Reel or video can be embedded via the admin dashboard.</p>
            </div>
          )}
        </div>

        {/* Caption Bar with Auto-Loop Indicator */}
        <div className="p-3 bg-gradient-to-t from-[#02070D] to-transparent flex items-center justify-between">
          <div className="space-y-0.5 truncate pr-2">
            <h4 className="text-sm font-bold text-white truncate">{project.title}</h4>
            {project.description && (
              <p className="text-xs text-[#A8C2DA] line-clamp-1">{project.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#168BFF]/25 text-[#85E4FF] border border-[#85E4FF]/30 uppercase flex items-center space-x-1">
              <RotateCw className="w-2.5 h-2.5 animate-spin text-[#85E4FF]" style={{ animationDuration: '6s' }} />
              <span>Auto-Loop</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
