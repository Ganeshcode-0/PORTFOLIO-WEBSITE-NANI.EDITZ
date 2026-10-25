'use client';

import React, { useState } from 'react';
import {
  Save,
  Check,
  Loader2,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
  Send,
} from 'lucide-react';
import { ContactSettings } from '@/types/portfolio';

interface ContactFormProps {
  initialSettings: ContactSettings;
  onSave: (settings: ContactSettings) => Promise<void>;
}

export function ContactForm({ initialSettings, onSave }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof ContactSettings, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    if (formData.email_enabled && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address.');
        setIsSaving(false);
        return;
      }
    }

    try {
      await onSave(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to update contact settings.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Contact &amp; Social Channels</h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Configure confirmed contact endpoints: Instagram, Phone, Email, and public Inquiry Form.
          </p>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 flex items-center space-x-2"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {success && (
        <div className="rounded-2xl p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center space-x-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Contact channels saved successfully.</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instagram */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Instagram className="w-5 h-5 text-pink-400" />
              <span>Instagram Profile</span>
            </div>
            <button
              type="button"
              onClick={() => handleChange('instagram_enabled', !formData.instagram_enabled)}
              className="flex items-center space-x-1.5 text-xs text-[#85E4FF] font-semibold"
            >
              {formData.instagram_enabled ? (
                <ToggleRight className="w-7 h-7 text-[#85E4FF]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#A8C2DA]/40" />
              )}
              <span>{formData.instagram_enabled ? 'Active' : 'Disabled'}</span>
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
              Profile URL
            </label>
            <input
              type="url"
              value={formData.instagram || ''}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="https://www.instagram.com/nawin.fx/"
              className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
            />
          </div>
        </div>

        {/* Direct Phone */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Phone className="w-5 h-5 text-[#85E4FF]" />
              <span>Direct Phone</span>
            </div>
            <button
              type="button"
              onClick={() => handleChange('phone_enabled', !formData.phone_enabled)}
              className="flex items-center space-x-1.5 text-xs text-[#85E4FF] font-semibold"
            >
              {formData.phone_enabled ? (
                <ToggleRight className="w-7 h-7 text-[#85E4FF]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#A8C2DA]/40" />
              )}
              <span>{formData.phone_enabled ? 'Active' : 'Disabled'}</span>
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="8309249050"
              className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Mail className="w-5 h-5 text-[#85E4FF]" />
              <span>Email Address</span>
            </div>
            <button
              type="button"
              onClick={() => handleChange('email_enabled', !formData.email_enabled)}
              className="flex items-center space-x-1.5 text-xs text-[#85E4FF] font-semibold"
            >
              {formData.email_enabled ? (
                <ToggleRight className="w-7 h-7 text-[#85E4FF]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#A8C2DA]/40" />
              )}
              <span>{formData.email_enabled ? 'Active' : 'Disabled'}</span>
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
              Inquiries Mailbox (Optional)
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="nani@example.com"
              className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
            />
          </div>
        </div>

        {/* Optional WhatsApp (Only when explicitly confirmed) */}
        <div className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp (Optional)</span>
            </div>
            <button
              type="button"
              onClick={() => handleChange('whatsapp_enabled', !formData.whatsapp_enabled)}
              className="flex items-center space-x-1.5 text-xs text-[#85E4FF] font-semibold"
            >
              {formData.whatsapp_enabled ? (
                <ToggleRight className="w-7 h-7 text-[#85E4FF]" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-[#A8C2DA]/40" />
              )}
              <span>{formData.whatsapp_enabled ? 'Active' : 'Disabled'}</span>
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-[#85E4FF] font-bold uppercase tracking-wider">
              WhatsApp Link or Number
            </label>
            <input
              type="text"
              value={formData.whatsapp || ''}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder="https://wa.me/..."
              className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
            />
          </div>
        </div>

        {/* Public Contact Form Toggle */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Website Contact Modal</h4>
            <p className="text-xs text-[#A8C2DA]">
              Enable direct visitor inquiries through the &quot;Get in Touch&quot; modal on the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleChange('contact_form_enabled', !formData.contact_form_enabled)}
            className="text-[#85E4FF] focus:outline-none"
          >
            {formData.contact_form_enabled ? (
              <ToggleRight className="w-8 h-8 text-[#85E4FF]" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-[#A8C2DA]/40" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
