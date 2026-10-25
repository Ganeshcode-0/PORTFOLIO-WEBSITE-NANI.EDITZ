'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  RotateCcw,
  Eye,
  Check,
  AlertCircle,
  Loader2,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
} from 'lucide-react';
import { Profile } from '@/types/portfolio';
import { AboutMeSection } from '../AboutMeSection';
import { ImageUpload } from './ImageUpload';

interface AboutMeFormProps {
  initialProfile: Profile;
  onSave: (updated: Profile) => Promise<void>;
}

export function AboutMeForm({ initialProfile, onSave }: AboutMeFormProps) {
  const [formData, setFormData] = useState<Profile>(initialProfile);
  const [savedData, setSavedData] = useState<Profile>(initialProfile);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newToolInput, setNewToolInput] = useState('');

  useEffect(() => {
    const isDifferent = JSON.stringify(formData) !== JSON.stringify(savedData);
    setHasUnsavedChanges(isDifferent);
  }, [formData, savedData]);

  function handleChange(field: keyof Profile, value: any) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSaveSuccess(false);
    setErrorMessage(null);
  }

  function handleAddTool() {
    if (!newToolInput.trim()) return;
    const currentTools = formData.editing_tools || [];
    handleChange('editing_tools', [...currentTools, newToolInput.trim()]);
    setNewToolInput('');
  }

  function handleRemoveTool(index: number) {
    const currentTools = formData.editing_tools || [];
    handleChange(
      'editing_tools',
      currentTools.filter((_, i) => i !== index)
    );
  }

  async function handleFormSubmit(e: React.FormEvent, publish = true) {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const payload = {
        ...formData,
        published: publish,
        updated_at: new Date().toISOString(),
      };
      await onSave(payload);
      setSavedData(payload);
      setFormData(payload);
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save About Me profile.');
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setFormData(savedData);
    setHasUnsavedChanges(false);
    setErrorMessage(null);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">About Me Manager</h2>
            {hasUnsavedChanges && (
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold animate-pulse">
                Unsaved changes
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Manage your verified creative identity: brand name, confirmed editing tools, experience metric, and portrait photo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={handleReset}
              className="glass-pill px-4 py-2 text-xs font-semibold text-[#A8C2DA] hover:text-white inline-flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Changes</span>
            </button>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={(e) => handleFormSubmit(e, true)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 transition-all flex items-center space-x-2"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4 text-emerald-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Published!' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="rounded-2xl p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2 shadow-lg animate-in fade-in duration-200">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>About Me profile updated successfully in Supabase.</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center space-x-2 shadow-lg animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Editor & Live Mirror Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Editor Column */}
        <div className="xl:col-span-6 space-y-6">
          <form onSubmit={(e) => handleFormSubmit(e, true)} className="space-y-6">
            {/* Visibility Toggle */}
            <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Section Visibility</h4>
                  <p className="text-xs text-[#A8C2DA]">Show or hide the About Me section on the public homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('section_visible', !formData.section_visible)}
                  className="text-[#85E4FF] focus:outline-none"
                >
                  {formData.section_visible ? (
                    <ToggleRight className="w-8 h-8 text-[#63D0F2]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#A8C2DA]" />
                  )}
                </button>
              </div>
            </div>

            {/* Core Identity */}
            <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
              <h4 className="text-sm font-bold text-white border-b border-[#85E4FF]/15 pb-2">
                Brand & Experience
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.display_name}
                  onChange={(e) => handleChange('display_name', e.target.value)}
                  placeholder="NANI.EDITZ"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                    Experience Metric *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleChange('show_experience', !formData.show_experience)}
                    className="flex items-center space-x-1 text-xs text-[#85E4FF]"
                  >
                    <span>{formData.show_experience ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.experience_label}
                  onChange={(e) => handleChange('experience_label', e.target.value)}
                  placeholder="2 Years of Experience"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                />
              </div>
            </div>

            {/* Confirmed Editing Tools */}
            <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-[#85E4FF]/15 pb-2">
                <h4 className="text-sm font-bold text-white">Confirmed Editing Tools</h4>
                <button
                  type="button"
                  onClick={() => handleChange('show_tools', !formData.show_tools)}
                  className="flex items-center space-x-1 text-xs text-[#85E4FF]"
                >
                  <span>{formData.show_tools ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {(formData.editing_tools || []).map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle border border-[#85E4FF]/20"
                  >
                    <span className="text-sm font-semibold text-white">{tool}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTool(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove tool"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <input
                  type="text"
                  value={newToolInput}
                  onChange={(e) => setNewToolInput(e.target.value)}
                  placeholder="e.g. Adobe Premiere Pro"
                  className="flex-1 rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-xs text-white focus:border-[#85E4FF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTool}
                  className="px-4 py-2 rounded-xl bg-[#168BFF] text-white text-xs font-bold hover:bg-[#63D0F2] hover:text-[#031326] flex items-center space-x-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tool</span>
                </button>
              </div>
            </div>

            {/* Profile Photo Uploader */}
            <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-[#85E4FF]/15 pb-2">
                <h4 className="text-sm font-bold text-white">Profile Photo</h4>
                <button
                  type="button"
                  onClick={() => handleChange('show_photo', !formData.show_photo)}
                  className="flex items-center space-x-1 text-xs text-[#85E4FF]"
                >
                  <span>{formData.show_photo ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>

              <ImageUpload
                label="Portrait Image (When Provided)"
                value={formData.profile_image_path}
                folder="profiles"
                onChange={(url) => handleChange('profile_image_path', url)}
                onRemove={() => handleChange('profile_image_path', null)}
                aspectRatio="portrait"
                helpText="Reserved slot: upload genuine portrait when provided."
              />

              {formData.profile_image_path && (
                <div className="space-y-3 pt-2 border-t border-white/5">
                  <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider block">
                    Focal Alignment
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-[#A8C2DA]">X: {formData.profile_image_focal_x ?? 50}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.profile_image_focal_x ?? 50}
                        onChange={(e) => handleChange('profile_image_focal_x', Number(e.target.value))}
                        className="w-full accent-[#85E4FF]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A8C2DA]">Y: {formData.profile_image_focal_y ?? 50}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.profile_image_focal_y ?? 50}
                        onChange={(e) => handleChange('profile_image_focal_y', Number(e.target.value))}
                        className="w-full accent-[#85E4FF]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Optional Biography */}
            <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-[#85E4FF]/15 pb-2">
                <h4 className="text-sm font-bold text-white">Biography (Optional)</h4>
                <button
                  type="button"
                  onClick={() => handleChange('show_bio', !formData.show_bio)}
                  className="flex items-center space-x-1 text-xs text-[#85E4FF]"
                >
                  <span>{formData.show_bio ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>

              <textarea
                rows={3}
                value={formData.biography || ''}
                onChange={(e) => handleChange('biography', e.target.value)}
                placeholder="Only add confirmed biography information. If empty, it will not render on the public site."
                className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-xs text-white focus:border-[#85E4FF] focus:outline-none resize-none"
              />
            </div>
          </form>
        </div>

        {/* Live Mirror Preview */}
        <div className="xl:col-span-6 space-y-4 sticky top-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#85E4FF]">
              <Eye className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Live Public Preview
              </h3>
            </div>
            <span className="text-[11px] text-[#A8C2DA]">Instantaneous mirror</span>
          </div>

          <div className="rounded-3xl border border-[#85E4FF]/40 overflow-hidden bg-[#02070D] p-2 shadow-2xl">
            <div className="scale-90 sm:scale-95 origin-top">
              <AboutMeSection profile={formData} isPreview={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
