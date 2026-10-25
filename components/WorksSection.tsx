import React from 'react';
import { ArrowRight, FolderKanban } from 'lucide-react';
import { Category, Project } from '@/types/portfolio';
import { CategoryCard } from './CategoryCard';

interface WorksSectionProps {
  categories: Category[];
  projectsByCategory?: Record<string, Project[]>;
}

export function WorksSection({
  categories,
  projectsByCategory = {},
}: WorksSectionProps) {
  return (
    <section id="works" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Section Pill Badge */}
      <div className="flex items-center mb-6 sm:mb-8">
        <div className="glass-pill px-5 py-2.5 flex items-center space-x-3 text-xs sm:text-sm font-bold tracking-widest uppercase text-light-cyan shadow-lg">
          <FolderKanban className="w-4 h-4 text-[#85E4FF]" />
          <span>EXPLORE MY WORKS</span>
          <div className="w-5 h-5 rounded-full bg-[#168BFF]/40 border border-[#85E4FF]/40 flex items-center justify-center ml-1">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Categories Grid (2-column on mobile, 3-column on tablet/desktop) */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              projects={projectsByCategory[category.id] || []}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-8 text-center space-y-2">
          <p className="text-base font-medium text-[#F5FAFF]">No categories published yet.</p>
          <p className="text-xs text-[#A8C2DA]">Categories managed via the Admin Dashboard will appear here.</p>
        </div>
      )}
    </section>
  );
}
