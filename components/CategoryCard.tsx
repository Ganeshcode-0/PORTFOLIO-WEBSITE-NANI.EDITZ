'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Smartphone, HeartHandshake, Home, Wand2, Megaphone, Film, Play, RotateCw } from 'lucide-react';
import { Category, Project } from '@/types/portfolio';
import { isDirectVideoUrl } from '@/lib/video/embed-utils';

interface CategoryCardProps {
  category: Category;
  projects?: Project[];
}

export function CategoryCard({ category, projects = [] }: CategoryCardProps) {
  const isInstagram = category.slug.includes('instagram');
  const isWedding = category.slug.includes('wedding');
  const isRealEstate = category.slug.includes('real-estate');
  const isMotion = category.slug.includes('motion');
  const isCommercial = category.slug.includes('commercial');

  return (
    <Link
      href={`/works/${category.slug}`}
      className="group block rounded-[32px] glass-panel p-5 sm:p-6 transition-all duration-300 hover:border-[#85E4FF]/70 hover:shadow-cyan-neon relative overflow-hidden"
    >
      {/* Top Banner / Graphic Frame */}
      <div className="flex items-center justify-between pb-4">
        {/* Visual Badge / Preview Graphic */}
        <div className="relative">
          {isInstagram && (
            <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#031326] rounded-[14px] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-bold text-[#85E4FF] mt-1 tracking-wider">
                  9:16
                </span>
              </div>
            </div>
          )}

          {isWedding && (
            <div className="w-18 h-16 sm:w-20 sm:h-18 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#031326] rounded-[14px] flex flex-col items-center justify-center p-2">
                <HeartHandshake className="w-6 h-6 text-pink-400" />
                <span className="text-[9px] font-bold text-white tracking-widest mt-1">
                  FILMS
                </span>
              </div>
            </div>
          )}

          {isRealEstate && (
            <div className="w-18 h-16 sm:w-20 sm:h-18 rounded-2xl bg-gradient-to-tr from-[#168BFF] to-[#85E4FF] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#052B69] rounded-[14px] flex flex-col items-center justify-center p-2">
                <Home className="w-6 h-6 text-[#85E4FF]" />
                <span className="text-[9px] font-bold text-white tracking-widest mt-1">
                  ESTATE
                </span>
              </div>
            </div>
          )}

          {isMotion && (
            <div className="w-18 h-16 sm:w-20 sm:h-18 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#031326] rounded-[14px] flex flex-col items-center justify-center p-2">
                <Wand2 className="w-6 h-6 text-cyan-400" />
                <span className="text-[9px] font-bold text-white tracking-widest mt-1">
                  MOTION
                </span>
              </div>
            </div>
          )}

          {isCommercial && (
            <div className="w-18 h-16 sm:w-20 sm:h-18 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#031326] rounded-[14px] flex flex-col items-center justify-center p-2">
                <Megaphone className="w-6 h-6 text-amber-400" />
                <span className="text-[9px] font-bold text-white tracking-widest mt-1">
                  ADS
                </span>
              </div>
            </div>
          )}

          {!isInstagram && !isWedding && !isRealEstate && !isMotion && !isCommercial && (
            <div className="w-16 h-16 rounded-2xl bg-[#0757E8]/40 border border-[#85E4FF]/40 flex items-center justify-center">
              <Film className="w-7 h-7 text-[#85E4FF]" />
            </div>
          )}
        </div>

        {/* Title and navigation arrow */}
        <div className="flex-1 ml-4 flex flex-col justify-center">
          <h3 className="text-base sm:text-lg font-bold text-white-pure group-hover:text-light-cyan transition-colors line-clamp-1">
            {category.name}
          </h3>
          <p className="text-xs text-[#A8C2DA] mt-0.5">
            {projects.length > 0
              ? `${projects.length} ${isInstagram ? 'Reel(s)' : 'Video(s)'}`
              : category.projects_count !== undefined && category.projects_count > 0
              ? `${category.projects_count} ${isInstagram ? 'Reel(s)' : 'Video(s)'}`
              : 'Explore Category'}
          </p>
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-panel-subtle flex items-center justify-center text-[#85E4FF] border border-[#85E4FF]/40 group-hover:bg-[#168BFF] group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Mini preview thumbnail strip */}
      <div className="pt-3 border-t border-[#85E4FF]/15">
        {projects.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {projects.slice(0, 3).map((p, idx) => {
              const isDirect = p.video_url && isDirectVideoUrl(p.video_url);

              return (
                <div
                  key={p.id || idx}
                  className="aspect-video relative rounded-lg overflow-hidden border border-[#85E4FF]/25 bg-[#031326]"
                >
                  {isDirect ? (
                    <video
                      src={p.video_url!}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  ) : p.thumbnail_path ? (
                    <Image src={p.thumbnail_path} alt={p.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#052B69]/40">
                      <Film className="w-3.5 h-3.5 text-[#85E4FF]/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 opacity-40">
            <div className="h-10 rounded-lg bg-[#052B69]/30 border border-[#85E4FF]/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#85E4FF]/40" />
            </div>
            <div className="h-10 rounded-lg bg-[#052B69]/30 border border-[#85E4FF]/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#85E4FF]/40" />
            </div>
            <div className="h-10 rounded-lg bg-[#052B69]/30 border border-[#85E4FF]/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#85E4FF]/40" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
