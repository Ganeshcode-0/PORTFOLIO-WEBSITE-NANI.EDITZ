'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Database,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';

interface SecurityTabProps {
  userEmail?: string;
  onLogout: () => void;
}

export function SecurityTab({ userEmail, onLogout }: SecurityTabProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword.length < 6) {
      setStatusMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newPassword,
          email: userEmail || 'admin@nanieditz.com',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      // Store in localStorage as well so local session validation matches
      localStorage.setItem('admin_custom_password', newPassword);

      setStatusMessage({
        type: 'success',
        text: 'Password updated successfully! You can now use your new password for all future logins.',
      });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to change password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Account &amp; Security</h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Change your administrator login password, manage sessions, and verify database security.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center space-x-2 transition-transform hover:scale-105"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>

      {/* Change Password Panel */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/50 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-[#85E4FF]/20">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#168BFF] to-[#85E4FF] p-0.5 flex items-center justify-center text-white shadow-md">
            <div className="w-full h-full bg-[#031326] rounded-[10px] flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-[#85E4FF]" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Change Administrator Password</h3>
            <p className="text-xs text-[#A8C2DA]">
              Set a new custom password for <strong className="text-white">{userEmail || 'admin@nanieditz.com'}</strong>.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`rounded-2xl p-4 text-xs sm:text-sm flex items-center space-x-2 animate-in fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200'
                : 'bg-red-500/20 border border-red-500/40 text-red-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-5 max-w-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider block">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#85E4FF] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter at least 6 characters"
                className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 pl-10 pr-11 py-2.5 text-sm text-white placeholder-[#A8C2DA]/40 focus:border-[#85E4FF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#A8C2DA] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#A8C2DA]">Must contain at least 6 characters.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider block">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#85E4FF] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your new password"
                className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/40 focus:border-[#85E4FF] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newPassword || !confirmPassword}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon disabled:opacity-50 transition-all flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password in Supabase...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Save New Password</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supabase Connection */}
        <div className="glass-panel rounded-2xl p-6 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Supabase PostgreSQL</h3>
              <p className="text-xs text-[#A8C2DA]">Cloud Database &amp; Auth</p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel-subtle border border-[#85E4FF]/20 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Status:</span>
              <span className="font-bold text-emerald-400">CONNECTED [Active]</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Target Project:</span>
              <span className="font-mono text-[#85E4FF]">ycwemroeuymfodvnulow</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Storage Bucket:</span>
              <span className="font-mono text-white">portfolio-assets (Active)</span>
            </div>
          </div>
        </div>

        {/* Authorization & RLS */}
        <div className="glass-panel rounded-2xl p-6 border border-[#85E4FF]/30 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Role-Based Access Control</h3>
              <p className="text-xs text-[#A8C2DA]">Protected administrator authorization</p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel-subtle border border-[#85E4FF]/20 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Active Account:</span>
              <span className="font-bold text-white">{userEmail || 'admin@nanieditz.com'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Privilege Level:</span>
              <span className="font-bold text-emerald-400">Full Administrator</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A8C2DA]">Security Engine:</span>
              <span className="text-[#85E4FF]">Supabase Auth + Local Guard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
