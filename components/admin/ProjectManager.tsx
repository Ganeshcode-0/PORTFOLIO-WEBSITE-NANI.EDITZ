'use client';

import React, { useState } from 'react';
import {
  Film,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Info,
  Instagram,
  Play,
  Video,
  CheckCircle,
} from 'lucide-react';
import { Project, Category, VideoProvider } from '@/types/portfolio';
import { ImageUpload } from './ImageUpload';
import { VideoModal } from '@/components/VideoModal';
import { detectProviderFromUrl } from '@/lib/video/embed-utils';

interface ProjectManagerProps {
  projects: Project[];
  categories: Category[];
  onSaveProject: (project: Partial<Project>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export function ProjectManager({
  projects,
  categories,
  onSaveProject,
  onDeleteProject,
}: ProjectManagerProps) {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function showSuccess(msg: string) {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  function startCreate(aspectRatio: '9:16' | '16:9' = '16:9') {
    setIsCreating(true);
    setEditingProject({
      title: '',
      category_id: categories[0]?.id || null,
      description: '',
      video_provider: aspectRatio === '9:16' ? 'instagram' : 'youtube',
      video_url: '',
      embed_code: '',
      aspect_ratio: aspectRatio,
      thumbnail_path: null,
      display_order: projects.length + 1,
      published: true,
    });
    setError(null);
  }

  function startEdit(project: Project) {
    setIsCreating(false);
    setEditingProject({ ...project });
    setError(null);
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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProject?.title?.trim()) {
      setError('Project title is required.');
      return;
    }
    if (!editingProject?.video_url?.trim() && !editingProject?.embed_code?.trim()) {
      setError('Video URL or embed code is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSaveProject(editingProject);
      setEditingProject(null);
      setIsCreating(false);
      showSuccess('Project saved successfully.');
    } catch (err: any) {
      setError(err?.message || 'Failed to save project.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteConfirmId) return;
    setIsSubmitting(true);
    try {
      await onDeleteProject(deleteConfirmId);
      setDeleteConfirmId(null);
      showSuccess('Project deleted.');
    } catch (err: any) {
      setError(err?.message || 'Failed to delete project.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Video & Reel Projects</h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Manage your full video portfolio catalog. Supports vertical 9:16 Instagram Reels, YouTube videos/shorts, and direct MP4 streams.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => startCreate('9:16')}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-pink-500/30 flex items-center space-x-2"
          >
            <Instagram className="w-4 h-4" />
            <span>+ Add Reel (9:16)</span>
          </button>
          <button
            onClick={() => startCreate('16:9')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Video</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="rounded-2xl p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Editor Modal */}
      {editingProject && (
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#85E4FF]/20 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              {editingProject.aspect_ratio === '9:16' ? (
                <Instagram className="w-5 h-5 text-pink-400" />
              ) : (
                <Film className="w-5 h-5 text-[#85E4FF]" />
              )}
              <span>{isCreating ? 'Create Video / Reel Project' : `Edit: ${editingProject.title}`}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="text-xs text-[#A8C2DA] hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Aspect Ratio Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                Video Format & Aspect Ratio
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Wedding Cinematic Teaser"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Assigned Category
                </label>
                <select
                  value={editingProject.category_id || ''}
                  onChange={(e) =>
                    setEditingProject((prev) => ({
                      ...prev,
                      category_id: e.target.value || null,
                    }))
                  }
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                >
                  <option value="">-- Unassigned --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Streaming Platform
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
                  <option value="direct">Direct Video Stream (MP4/WebM)</option>
                  <option value="cloudinary">Cloudinary</option>
                  <option value="embed">Custom HTML Embed Code</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  {editingProject.video_provider === 'instagram' ? 'Instagram Reel Link *' : 'Video URL / Stream ID *'}
                </label>
                <input
                  type="text"
                  value={editingProject.video_url || ''}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  placeholder={
                    editingProject.video_provider === 'instagram'
                      ? 'https://www.instagram.com/reel/C-xyz123/'
                      : 'https://www.youtube.com/watch?v=... or MP4 URL'
                  }
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none font-mono"
                />
              </div>
            </div>

            {editingProject.video_provider === 'embed' && (
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
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none font-mono"
                />
              </div>
            )}

            {editingProject.video_url && (
              <div className="p-3 rounded-xl bg-[#031326] border border-[#85E4FF]/30 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#A8C2DA]">Stream:</span>
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
                  <span>Preview</span>
                </button>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                Description / Editing Pipeline
              </label>
              <textarea
                rows={2}
                value={editingProject.description || ''}
                onChange={(e) =>
                  setEditingProject((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="DaVinci Resolve color grading notes, audio sync, sound design..."
                className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <ImageUpload
                label="Custom Video Thumbnail"
                value={editingProject.thumbnail_path}
                folder="projects"
                onChange={(url) => setEditingProject((prev) => ({ ...prev, thumbnail_path: url }))}
                onRemove={() => setEditingProject((prev) => ({ ...prev, thumbnail_path: null }))}
                aspectRatio={editingProject.aspect_ratio === '9:16' ? 'portrait' : 'video'}
              />

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditingProject((prev) => ({ ...prev, published: !prev?.published }))
                  }
                  className="flex items-center space-x-2 text-sm text-white"
                >
                  {editingProject.published ? (
                    <ToggleRight className="w-8 h-8 text-[#85E4FF]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#A8C2DA]/50" />
                  )}
                  <span>{editingProject.published ? 'Published' : 'Draft'}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="glass-pill px-5 py-2.5 text-xs font-semibold text-[#A8C2DA] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Catalog */}
      <div className="space-y-3.5">
        {projects.length > 0 ? (
          projects.map((project) => {
            const cat = categories.find((c) => c.id === project.category_id);
            const isInsta =
              project.video_provider === 'instagram' ||
              (project.video_url && project.video_url.includes('instagram.com'));
            const is916 = project.aspect_ratio === '9:16' || isInsta;

            return (
              <div
                key={project.id}
                className="glass-panel rounded-2xl p-4 sm:p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#031326] border border-[#85E4FF]/30 flex items-center justify-center text-[#85E4FF] flex-shrink-0">
                    {isInsta ? (
                      <Instagram className="w-6 h-6 text-pink-400" />
                    ) : (
                      <Film className="w-6 h-6 text-[#85E4FF]" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-white">{project.title}</h4>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          project.published
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                        {is916 ? '9:16 Reel' : '16:9 Video'}
                      </span>
                    </div>
                    <p className="text-xs text-[#85E4FF] font-medium mt-0.5">
                      Category: {cat ? cat.name : 'Unassigned'} • Provider: {project.video_provider}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewProject(project)}
                    className="p-2 rounded-xl bg-[#168BFF]/20 text-[#85E4FF] hover:bg-[#168BFF]/40"
                    title="Preview Video / Reel"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(project)}
                    className="p-2 rounded-xl glass-panel-subtle text-[#85E4FF] hover:bg-[#168BFF]/30 hover:text-white"
                    title="Edit Project"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/40"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto space-y-3 border border-[#85E4FF]/30">
            <Film className="w-10 h-10 text-[#85E4FF] mx-auto opacity-70" />
            <h3 className="text-base font-bold text-white">No Projects in Database</h3>
            <p className="text-xs text-[#A8C2DA]">
              Click &quot;+ Add Reel&quot; or &quot;+ Add Video&quot; above to embed your first edit.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02070D]/80 backdrop-blur-md">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/40 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Delete Video Project?</h3>
              <p className="text-xs sm:text-sm text-[#A8C2DA]">
                Are you sure you want to delete this video project record from the database?
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="glass-pill px-5 py-2.5 text-xs font-semibold text-[#A8C2DA] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete Project'}
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
