'use client';

import React, { useState } from 'react';
import {
  Send,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ContactSettings } from '@/types/portfolio';
import { PortfolioStore } from '@/lib/data/portfolio-store';

interface ContactSectionProps {
  contactSettings: ContactSettings;
}

export function ContactSection({ contactSettings }: ContactSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formType, setFormType] = useState('Instagram Reels');
  const [formMessage, setFormMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setErrorMessage('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await PortfolioStore.submitContactInquiry({
        name: formName.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim() || undefined,
        project_type: formType,
        message: formMessage.trim(),
      });

      setIsSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      setTimeout(() => {
        setIsSuccess(false);
        setModalOpen(false);
      }, 3000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsappUrl = contactSettings.whatsapp && contactSettings.whatsapp.trim().length > 0
    ? (contactSettings.whatsapp.startsWith('http')
        ? contactSettings.whatsapp
        : `https://wa.me/${contactSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Nani,%20I%20am%20interested%20in%20your%20video%20editing%20services`)
    : "https://wa.me/918309249050?text=Hi%20Nani,%20I%20am%20interested%20in%20your%20video%20editing%20services";

  const instagramUrl = contactSettings.instagram || 'https://www.instagram.com/nawin.fx/';

  return (
    <>
      <footer id="contact" className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 px-4 pointer-events-none">
        <div className="max-w-fit mx-auto pointer-events-auto">
          <div className="glass-panel-elevated rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center space-x-2 sm:space-x-3 shadow-[0_10px_35px_rgba(2,7,13,0.85)] border border-[#85E4FF]/45 backdrop-blur-xl">
            {/* Contact Trigger Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white shadow-md hover:scale-105 transition-all text-xs sm:text-sm font-bold active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>

            {/* Direct WhatsApp Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Direct WhatsApp Chat"
              title="Direct WhatsApp Chat"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/50 text-emerald-300 hover:text-white transition-all duration-200 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Direct Instagram Link */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Direct Instagram DM"
              title="Direct Instagram DM"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/35 border border-pink-400/50 text-pink-300 hover:text-white transition-all duration-200 text-xs font-semibold shadow-[0_0_15px_rgba(244,114,182,0.25)] hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span className="hidden sm:inline">Instagram</span>
            </a>

            {/* Direct Phone Link */}
            {contactSettings.phone_enabled && contactSettings.phone && (
              <a
                href={`tel:${contactSettings.phone}`}
                aria-label="Call Direct"
                title="Call Phone Direct"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-panel-subtle flex items-center justify-center text-[#85E4FF] hover:text-white hover:bg-[#0757E8]/40 hover:scale-110 transition-all duration-200 border border-[#85E4FF]/30"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/50 shadow-2xl space-y-5">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-panel-subtle flex items-center justify-center text-[#A8C2DA] hover:text-white transition-colors border border-[#85E4FF]/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#85E4FF] uppercase tracking-widest">
                DIRECT INQUIRY &amp; INSTANT CONNECT
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white text-glow-cyan">
                Contact NANI.EDITZ
              </h3>
              <p className="text-xs text-[#A8C2DA]">
                Connect immediately via WhatsApp or Instagram, or submit your video project requirements below.
              </p>
            </div>

            {/* Direct Instant Action Buttons: WhatsApp & Instagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 border border-emerald-300/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(244,114,182,0.35)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 border border-pink-300/40"
              >
                <Instagram className="w-4 h-4" />
                <span>DM on Instagram</span>
              </a>
            </div>

            <div className="flex items-center space-x-3 py-1">
              <div className="flex-1 h-px bg-[#85E4FF]/20" />
              <span className="text-[10px] font-semibold text-[#A8C2DA] uppercase tracking-wider">
                Or Send Project Details
              </span>
              <div className="flex-1 h-px bg-[#85E4FF]/20" />
            </div>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-emerald-200">
                  Thank you! Your project details have been delivered directly to NANI.EDITZ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <input
                  type="text"
                  name="website_company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                      Project Category
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full rounded-xl bg-[#031326] border border-[#85E4FF]/30 px-3.5 py-2 text-sm text-white focus:border-[#85E4FF] focus:outline-none"
                    >
                      <option value="Instagram Reels">Instagram Reels</option>
                      <option value="Wedding Reels & Films">Wedding Reels & Films</option>
                      <option value="Real Estate Videos">Real Estate Videos</option>
                      <option value="Motion Graphics">Motion Graphics</option>
                      <option value="Commercials & Brand Ads">Commercials & Brand Ads</option>
                      <option value="Custom Project">Custom Project</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                    Project Vision & Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell NANI.EDITZ about your video project, footage, and timeline..."
                    className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-3.5 py-2 text-sm text-white focus:border-[#85E4FF] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white font-bold text-sm shadow-lg hover:shadow-cyan-neon transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
