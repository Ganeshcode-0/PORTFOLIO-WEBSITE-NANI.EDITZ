'use client';

import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Film,
  Instagram,
  Play,
  X,
  Sparkles,
  CheckCircle,
  Video,
  Layers,
} from 'lucide-react';
import { Category, Project, VideoProvider } from '@/types/portfolio';
import { ImageUpload } from './ImageUpload';
import { VideoModal } from '@/components/VideoModal';
import {
  detectProviderFromUrl,
  getInstagramEmbedUrl,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
} from '@/lib/video/embed-utils';

interface CategoryManagerProps {
  categories: Category[];
  projects: Project[];
  onSaveCategory: (category: Partial<Category>) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onSaveProject?: (project: Partial<Project>) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
}

export function CategoryManager({
  categories,
  projects,
  onSaveCategory,
  onDeleteCategory,
  onSaveProject,
  onDeleteProject,
}: CategoryManagerProps) {
  // Category state
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Category media (Reels & Videos) modal state
  const [activeCategoryForMedia, setActiveCategoryForMedia] = useState<Category | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  function showSuccess(msg: string) {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  }

  // Category CRUD
  function startCreate() {
    setIsCreating(true);
    setEditingCategory({
      name: '',
      slug: '',
      thumbnail_path: null,
      display_order: categories.length + 1,
      published: true,
    });
    setError(null);
  }

  function startEdit(cat: Category) {
    setIsCreating(false);
    setEditingCategory({ ...cat });
    setError(null);
  }

  function handleNameChange(name: string) {
    if (editingCategory) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      setEditingCategory((prev) => ({
        ...prev,
        name,
        slug: isCreating ? generatedSlug : prev?.slug || generatedSlug,
      }));
    }
  }

  async function handleSaveCategorySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCategory?.name?.trim() || !editingCategory?.slug?.trim()) {
      setError('Category name and slug are required.');
      return;
    }

    const duplicate = categories.find(
      (c) => c.slug === editingCategory.slug && c.id !== editingCategory.id
    );
    if (duplicate) {
      setError('A category with this URL slug already exists.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSaveCategory(editingCategory);
      setEditingCategory(null);
      setIsCreating(false);
      showSuccess('Category saved successfully.');
    } catch (err: any) {
      setError(err?.message || 'Failed to save category.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteConfirmId) return;
    setIsSubmitting(true);
    try {
      await onDeleteCategory(deleteConfirmId);
      setDeleteConfirmId(null);
      showSuccess('Category deleted.');
    } catch (err: any) {
      setError(err?.message || 'Failed to delete category.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // -------------------------------------------------------------
  // REELS & VIDEOS WITHIN CATEGORY
  // -------------------------------------------------------------
  function openMediaManager(cat: Category) {
    setActiveCategoryForMedia(cat);
    setEditingProject(null);
    setIsCreatingProject(false);
    setError(null);
  }

  function startCreateReelOrVideo(cat: Category, defaultFormat: '9:16' | '16:9' = '9:16') {
    setIsCreatingProject(true);
    const isReelsCategory = cat.slug.includes('reel');
    const format = isReelsCategory ? '9:16' : defaultFormat;

    setEditingProject({
      title: '',
      category_id: cat.id,
      description: '',
      video_provider: format === '9:16' ? 'instagram' : 'youtube',
      video_url: '',
      embed_code: '',
      aspect_ratio: format,
      thumbnail_path: null,
      display_order: projects.filter((p) => p.category_id === cat.id).length + 1,
      published: true,
    });
  }

  function startEditReelOrVideo(project: Project) {
    setIsCreatingProject(false);
    setEditingProject({ ...project });
  }

  function handleVideoUrlChange(url: string) {
    if (!editingProject) return;
    const detected = detectProviderFromUrl(url);
    const isInsta = detected === 'instagram' || url.includes('instagram.com/reel');
    const isShorts = url.includes('/shorts/');

    setEditingProject((prev) => ({
      ...prev,
      video_url: url,
      video_provider: detected,
      aspect_ratio: isInsta || isShorts ? '9:16' : prev?.aspect_ratio || '16:9',
    }));
  }

  async function handleSaveProjectSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject?.title?.trim()) {
      setError('Please provide a title for this reel or video.');
      return;
    }
    if (!editingProject.video_url?.trim() && !editingProject.embed_code?.trim()) {
      setError('Please provide a video/reel URL or embed code.');
      return;
    }
    if (!onSaveProject) {
      setError('Project saving handler not available.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSaveProject({
        ...editingProject,
        category_id: activeCategoryForMedia?.id || editingProject.category_id,
      });
      setEditingProject(null);
      setIsCreatingProject(false);
      showSuccess('Reel / Video embedded and saved into category!');
    } catch (err: any) {
      setError(err?.message || 'Failed to save reel/video.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDeleteProject() {
    if (!deleteProjectId || !onDeleteProject) return;
    setIsSubmitting(true);
    try {
      await onDeleteProject(deleteProjectId);
      setDeleteProjectId(null);
      showSuccess('Reel / video removed from category.');
    } catch (err: any) {
      setError(err?.message || 'Failed to delete project.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const categoryToDelete = categories.find((c) => c.id === deleteConfirmId);
  const associatedProjectsCount = deleteConfirmId
    ? projects.filter((p) => p.category_id === deleteConfirmId).length
    : 0;

  const currentCatProjects = activeCategoryForMedia
    ? projects.filter((p) => p.category_id === activeCategoryForMedia.id)
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white flex items-center space-x-3">
            <span>Category & Embed Management</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#168BFF]/20 border border-[#85E4FF]/40 text-[#85E4FF] font-semibold">
              Reels + Videos
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Organize showcase categories, and directly embed or manage Instagram Reels and YouTube videos inside each category.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {successMessage && (
        <div className="rounded-2xl p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-300 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Category Editor Form */}
      {editingCategory && (
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#85E4FF]/20 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <FolderKanban className="w-5 h-5 text-[#85E4FF]" />
              <span>{isCreating ? 'Create Category' : `Edit Category: ${editingCategory.name}`}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="text-xs text-[#A8C2DA] hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveCategorySubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Wedding Reels & Films"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.slug || ''}
                  onChange={(e) =>
                    setEditingCategory((prev) => ({
                      ...prev,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, ''),
                    }))
                  }
                  placeholder="wedding-reels-films"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none font-mono"
                />
                <p className="text-[10px] text-[#A8C2DA]">Public URL: /works/{editingCategory.slug || '...'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingCategory.display_order ?? 1}
                  onChange={(e) =>
                    setEditingCategory((prev) => ({
                      ...prev,
                      display_order: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setEditingCategory((prev) => ({
                      ...prev,
                      published: !prev?.published,
                    }))
                  }
                  className="flex items-center space-x-2 text-sm text-white"
                >
                  {editingCategory.published ? (
                    <ToggleRight className="w-8 h-8 text-[#63D0F2]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#A8C2DA]" />
                  )}
                  <span>{editingCategory.published ? 'Published' : 'Draft Mode'}</span>
                </button>
              </div>
            </div>

            <ImageUpload
              label="Cover Thumbnail (Optional)"
              value={editingCategory.thumbnail_path}
              folder="categories"
              onChange={(url) => setEditingCategory((prev) => ({ ...prev, thumbnail_path: url }))}
              onRemove={() => setEditingCategory((prev) => ({ ...prev, thumbnail_path: null }))}
              aspectRatio="video"
            />

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="px-5 py-2.5 rounded-full glass-panel-subtle text-xs font-semibold text-[#A8C2DA] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs font-bold shadow-md hover:shadow-cyan-neon disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Save Category</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Cards List with Integrated Reels/Video Management */}
      <div className="space-y-4">
        {categories.map((category) => {
          const catProjects = projects.filter((p) => p.category_id === category.id);
          const reelCount = catProjects.filter(
            (p) =>
              p.aspect_ratio === '9:16' ||
              p.video_provider === 'instagram' ||
              (p.video_url && p.video_url.includes('instagram.com'))
          ).length;
          const videoCount = catProjects.length - reelCount;

          return (
            <div
              key={category.id}
              className="glass-panel-elevated rounded-3xl p-5 sm:p-6 border border-[#85E4FF]/30 hover:border-[#85E4FF]/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="flex items-start sm:items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl glass-panel-subtle flex items-center justify-center text-[#85E4FF] font-black text-lg border border-[#85E4FF]/40 shadow-inner flex-shrink-0">
                  {category.display_order}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{category.name}</h4>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        category.published
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}
                    >
                      {category.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8C2DA] font-mono mt-0.5">/works/{category.slug}</p>

                  {/* Summary of embedded media */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-[#031326] border border-[#85E4FF]/30 text-[#85E4FF] font-medium flex items-center space-x-1.5">
                      <Film className="w-3.5 h-3.5" />
                      <span>{catProjects.length} Total Embed(s)</span>
                    </span>
                    {reelCount > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-400/30 text-pink-300 font-medium flex items-center space-x-1.5">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>{reelCount} 9:16 Reel(s)</span>
                      </span>
                    )}
                    {videoCount > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-400/30 text-blue-300 font-medium flex items-center space-x-1.5">
                        <Video className="w-3.5 h-3.5 text-blue-400" />
                        <span>{videoCount} 16:9 Video(s)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Category */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
                {/* PRIMARY ACTION: EMBED REELS & VIDEOS */}
                <button
                  type="button"
                  onClick={() => openMediaManager(category)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#168BFF]/30 to-[#0757E8]/40 hover:from-[#168BFF] hover:to-[#0757E8] border border-[#85E4FF]/50 text-white text-xs font-bold shadow-md hover:shadow-cyan-neon flex items-center space-x-2 transition-all"
                  title="Manage and embed reels or videos into this category"
                >
                  <Sparkles className="w-4 h-4 text-[#85E4FF]" />
                  <span>Manage Reels & Videos ({catProjects.length})</span>
                </button>

                <a
                  href={`/works/${category.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-panel-subtle text-[#A8C2DA] hover:text-[#85E4FF] border border-[#85E4FF]/20"
                  title="View Public Category Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  className="p-2.5 rounded-xl glass-panel-subtle text-[#85E4FF] hover:bg-[#168BFF]/20 border border-[#85E4FF]/20"
                  title="Edit Category Details"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(category.id)}
                  className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/30"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================= */}
      {/* CATEGORY MEDIA MANAGER MODAL (EMBED REELS & VIDEOS)           */}
      {/* ============================================================= */}
      {activeCategoryForMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="glass-panel-elevated rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-[#85E4FF]/60 shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#85E4FF]/20 flex items-center justify-between bg-[#031326]/60 rounded-t-3xl">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#85E4FF] uppercase">
                  CATEGORY MEDIA STUDIO
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2 mt-0.5">
                  <span>{activeCategoryForMedia.name}</span>
                </h3>
                <p className="text-xs text-[#A8C2DA] mt-0.5">
                  Embed, organize, and delete Instagram Reels or videos shown in this category.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveCategoryForMedia(null);
                  setEditingProject(null);
                  setIsCreatingProject(false);
                }}
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#A8C2DA] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#052B69]/30 p-4 rounded-2xl border border-[#85E4FF]/25">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {currentCatProjects.length} Embedded Item(s) in this Category
                  </h4>
                  <p className="text-xs text-[#A8C2DA]">
                    Reels display as vertical 9:16 cards; videos display as cinematic 16:9 widescreen.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => startCreateReelOrVideo(activeCategoryForMedia, '9:16')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold hover:shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>+ Embed Instagram Reel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => startCreateReelOrVideo(activeCategoryForMedia, '16:9')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs font-bold hover:shadow-cyan-neon flex items-center space-x-1.5 transition-transform hover:scale-105"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>+ Embed Video (YouTube / MP4)</span>
                  </button>
                </div>
              </div>

              {/* Form: Add or Edit Reel/Video */}
              {editingProject && (
                <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/50 bg-[#02070D]/70 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#85E4FF]/20 pb-3">
                    <h4 className="text-base font-bold text-white flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#85E4FF]" />
                      <span>
                        {isCreatingProject
                          ? `Embed New ${editingProject.aspect_ratio === '9:16' ? 'Reel' : 'Video'}`
                          : `Edit: ${editingProject.title}`}
                      </span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-[#A8C2DA] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveProjectSubmit} className="space-y-4">
                    {/* Format Toggle: 9:16 Reel vs 16:9 Video */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                        Display Format & Aspect Ratio
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject((prev) => ({
                              ...prev,
                              aspect_ratio: '9:16',
                              video_provider: prev?.video_provider === 'youtube' ? 'instagram' : prev?.video_provider,
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                            editingProject.aspect_ratio === '9:16'
                              ? 'bg-pink-600/30 border-pink-400 text-white shadow-lg'
                              : 'glass-panel-subtle border-[#85E4FF]/20 text-[#A8C2DA] hover:text-white'
                          }`}
                        >
                          <Instagram className="w-4 h-4 text-pink-400" />
                          <span>📱 9:16 Vertical Reel (Instagram / Shorts)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject((prev) => ({
                              ...prev,
                              aspect_ratio: '16:9',
                              video_provider: prev?.video_provider === 'instagram' ? 'youtube' : prev?.video_provider,
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                            editingProject.aspect_ratio === '16:9'
                              ? 'bg-[#168BFF]/30 border-[#85E4FF] text-white shadow-lg'
                              : 'glass-panel-subtle border-[#85E4FF]/20 text-[#A8C2DA] hover:text-white'
                          }`}
                        >
                          <Video className="w-4 h-4 text-[#85E4FF]" />
                          <span>🎬 16:9 Widescreen Video</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                          Reel / Video Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) =>
                            setEditingProject((prev) => ({ ...prev, title: e.target.value }))
                          }
                          placeholder="e.g. Cinematic Streetwear Reel"
                          className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                          Provider Platform
                        </label>
                        <select
                          value={editingProject.video_provider || 'instagram'}
                          onChange={(e) =>
                            setEditingProject((prev) => ({
                              ...prev,
                              video_provider: e.target.value as VideoProvider,
                            }))
                          }
                          className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                        >
                          <option value="instagram">Instagram Reel / Post</option>
                          <option value="youtube">YouTube / YouTube Shorts</option>
                          <option value="vimeo">Vimeo</option>
                          <option value="direct">Direct MP4 Video Stream</option>
                          <option value="cloudinary">Cloudinary Video</option>
                          <option value="embed">Custom Embed Code / iframe</option>
                        </select>
                      </div>
                    </div>

                    {/* URL Input */}
                    {editingProject.video_provider !== 'embed' ? (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                          {editingProject.video_provider === 'instagram'
                            ? 'Instagram Reel Link *'
                            : 'Video URL *'}
                        </label>
                        <input
                          type="text"
                          value={editingProject.video_url || ''}
                          onChange={(e) => handleVideoUrlChange(e.target.value)}
                          placeholder={
                            editingProject.video_provider === 'instagram'
                              ? 'https://www.instagram.com/reel/C-xyz123/'
                              : 'https://www.youtube.com/watch?v=... or https://youtu.be/...'
                          }
                          className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white font-mono placeholder-[#A8C2DA]/40 focus:border-[#85E4FF] focus:outline-none"
                        />
                        <p className="text-[11px] text-[#A8C2DA]">
                          Paste any reel link or video link directly; the platform and aspect ratio auto-configure automatically!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                          Custom HTML Embed Code *
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.embed_code || ''}
                          onChange={(e) =>
                            setEditingProject((prev) => ({ ...prev, embed_code: e.target.value }))
                          }
                          placeholder='<iframe src="..." width="100%" height="100%"></iframe>'
                          className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white font-mono placeholder-[#A8C2DA]/40 focus:border-[#85E4FF] focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Live Preview Bar if URL entered */}
                    {editingProject.video_url && (
                      <div className="p-3 rounded-xl bg-[#031326] border border-[#85E4FF]/30 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-[#A8C2DA]">Target Stream:</span>
                          <span className="text-xs font-mono text-[#85E4FF] truncate max-w-xs sm:max-w-md">
                            {editingProject.video_url}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewProject(editingProject as Project)}
                          className="px-3 py-1 rounded-lg bg-[#168BFF]/30 hover:bg-[#168BFF] text-[#85E4FF] hover:text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Test Play</span>
                        </button>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                        Description / Editing Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.description || ''}
                        onChange={(e) =>
                          setEditingProject((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Color graded in DaVinci Resolve, dynamic speed ramps, sound design..."
                        className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <ImageUpload
                        label="Custom Thumbnail (Optional)"
                        value={editingProject.thumbnail_path}
                        folder="projects"
                        onChange={(url) =>
                          setEditingProject((prev) => ({ ...prev, thumbnail_path: url }))
                        }
                        onRemove={() =>
                          setEditingProject((prev) => ({ ...prev, thumbnail_path: null }))
                        }
                        aspectRatio={editingProject.aspect_ratio === '9:16' ? 'portrait' : 'video'}
                      />

                      <div className="flex items-center space-x-3 pt-4 sm:pt-0">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject((prev) => ({
                              ...prev,
                              published: !prev?.published,
                            }))
                          }
                          className="flex items-center space-x-2 text-sm text-white"
                        >
                          {editingProject.published ? (
                            <ToggleRight className="w-8 h-8 text-[#63D0F2]" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-[#A8C2DA]" />
                          )}
                          <span>{editingProject.published ? 'Published in Category' : 'Draft'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-3 border-t border-[#85E4FF]/20">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-5 py-2.5 rounded-full glass-panel-subtle text-xs font-semibold text-[#A8C2DA] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 flex items-center space-x-2"
                      >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>Save to {activeCategoryForMedia.name}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of Embedded Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#85E4FF] uppercase tracking-wider">
                  Current Media in &quot;{activeCategoryForMedia.name}&quot; ({currentCatProjects.length})
                </h4>

                {currentCatProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentCatProjects.map((proj) => {
                      const isInsta =
                        proj.video_provider === 'instagram' ||
                        (proj.video_url && proj.video_url.includes('instagram.com'));
                      const is916 = proj.aspect_ratio === '9:16' || isInsta;

                      return (
                        <div
                          key={proj.id}
                          className="glass-panel rounded-2xl p-4 border border-[#85E4FF]/25 hover:border-[#85E4FF]/60 transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-[#031326] border border-[#85E4FF]/30 flex items-center justify-center flex-shrink-0 text-[#85E4FF]">
                              {isInsta ? (
                                <Instagram className="w-6 h-6 text-pink-400" />
                              ) : (
                                <Film className="w-6 h-6 text-[#85E4FF]" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h5 className="text-sm font-bold text-white truncate group-hover:text-[#85E4FF] transition-colors">
                                  {proj.title}
                                </h5>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#168BFF]/20 text-[#85E4FF] border border-[#85E4FF]/30 uppercase">
                                  {proj.video_provider}
                                </span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                                  {is916 ? '9:16 Reel' : '16:9 Video'}
                                </span>
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    proj.published
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : 'bg-yellow-500/20 text-yellow-300'
                                  }`}
                                >
                                  {proj.published ? 'Live' : 'Draft'}
                                </span>
                              </div>

                              {proj.video_url && (
                                <p className="text-[10px] text-[#A8C2DA] font-mono truncate mt-1">
                                  {proj.video_url}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#85E4FF]/10">
                            <button
                              type="button"
                              onClick={() => setPreviewProject(proj)}
                              className="px-3 py-1.5 rounded-lg bg-[#168BFF]/20 hover:bg-[#168BFF]/40 text-[#85E4FF] text-xs font-semibold flex items-center space-x-1"
                              title="Test embed playback"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Play</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => startEditReelOrVideo(proj)}
                              className="p-1.5 rounded-lg glass-panel-subtle text-[#85E4FF] hover:bg-[#168BFF]/20"
                              title="Edit item"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteProjectId(proj.id)}
                              className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/30"
                              title="Delete reel/video"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="glass-panel rounded-2xl p-8 text-center space-y-3 border border-dashed border-[#85E4FF]/30">
                    <Film className="w-10 h-10 text-[#85E4FF] mx-auto opacity-50" />
                    <h5 className="text-sm font-bold text-white">No Reels or Videos in this Category yet</h5>
                    <p className="text-xs text-[#A8C2DA] max-w-sm mx-auto">
                      Click either &quot;+ Embed Instagram Reel&quot; or &quot;+ Embed Video&quot; above to embed content directly into {activeCategoryForMedia.name}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#85E4FF]/20 flex justify-end bg-[#031326]/60 rounded-b-3xl">
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryForMedia(null);
                  setEditingProject(null);
                  setIsCreatingProject(false);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs font-bold shadow-md hover:shadow-cyan-neon"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/40 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Delete Category?</h3>
              <p className="text-xs sm:text-sm text-[#A8C2DA]">
                Are you sure you want to delete category{' '}
                <strong className="text-white">{categoryToDelete?.name}</strong>?
              </p>
              {associatedProjectsCount > 0 && (
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs mt-2">
                  <strong>Notice:</strong> This category has {associatedProjectsCount} assigned reel(s)/video(s). Deleting the category will NOT delete the videos; they will remain safe in your project archive as unassigned.
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded-full glass-panel-subtle text-xs font-semibold text-[#A8C2DA] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project / Reel Confirmation Modal */}
      {deleteProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/40 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Remove Reel / Video?</h3>
              <p className="text-xs sm:text-sm text-[#A8C2DA]">
                Are you sure you want to delete this embedded reel or video from the category?
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteProjectId(null)}
                className="px-5 py-2.5 rounded-full glass-panel-subtle text-xs font-semibold text-[#A8C2DA] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDeleteProject}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete Media'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Video / Reel Preview Modal */}
      <VideoModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
