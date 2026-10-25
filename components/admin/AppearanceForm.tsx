'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  Save,
  Check,
  Loader2,
} from 'lucide-react';
import { AppearanceSettings } from '@/types/portfolio';
import { DEFAULT_APPEARANCE_SETTINGS } from '@/lib/data/portfolio-store';

interface AppearanceFormProps {
  initialSettings: AppearanceSettings;
  onSave: (settings: AppearanceSettings) => Promise<void>;
}

export function AppearanceForm({ initialSettings, onSave }: AppearanceFormProps) {
  const [formData, setFormData] = useState<AppearanceSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof AppearanceSettings, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  }

  function handleReset() {
    setFormData(DEFAULT_APPEARANCE_SETTINGS);
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await onSave(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to update appearance settings.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Appearance &amp; Theme</h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Fine-tune the 3D blue glassmorphism theme, cyan highlights, and sculpted card curvature.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="glass-pill px-4 py-2 text-xs font-semibold text-[#A8C2DA] hover:text-white inline-flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 flex items-center space-x-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Apply Appearance'}</span>
          </button>
        </div>
      </div>

      {success && (
        <div className="rounded-2xl p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Appearance settings saved successfully.</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-[#85E4FF]/20 pb-2">
            Color Palette
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
                Primary Sky Blue
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.sky_blue}
                  onChange={(e) => handleChange('sky_blue', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-[#85E4FF]/40"
                />
                <input
                  type="text"
                  value={formData.sky_blue}
                  onChange={(e) => handleChange('sky_blue', e.target.value)}
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3 py-1.5 text-xs text-white font-mono focus:border-[#85E4FF] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
                Secondary Cyan
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.light_cyan}
                  onChange={(e) => handleChange('light_cyan', e.target.value)}
                  className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-[#85E4FF]/40"
                />
                <input
                  type="text"
                  value={formData.light_cyan}
                  onChange={(e) => handleChange('light_cyan', e.target.value)}
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3 py-1.5 text-xs text-white font-mono focus:border-[#85E4FF] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Glass Surface */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-[#85E4FF]/20 pb-2">
            Glass Surface &amp; Curvature
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#A8C2DA] mb-1">
                <span>Glass Opacity</span>
                <span className="font-mono text-[#85E4FF] font-bold">{formData.glass_opacity}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.80"
                step="0.05"
                value={formData.glass_opacity}
                onChange={(e) => handleChange('glass_opacity', e.target.value)}
                className="w-full accent-[#85E4FF]"
              />
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
                Card Curvature
              </label>
              <select
                value={formData.corner_radius}
                onChange={(e) => handleChange('corner_radius', e.target.value)}
                className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#85E4FF]"
              >
                <option value="20px">20px Subtle</option>
                <option value="28px">28px Standard (Recommended)</option>
                <option value="36px">36px Sculpted 3D</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
