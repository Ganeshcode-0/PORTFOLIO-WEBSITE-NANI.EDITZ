'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from 'lucide-react';
import { Client } from '@/types/portfolio';
import { ImageUpload } from './ImageUpload';

interface ClientManagerProps {
  clients: Client[];
  onSaveClient: (client: Partial<Client>) => Promise<void>;
  onDeleteClient: (id: string) => Promise<void>;
}

export function ClientManager({
  clients,
  onSaveClient,
  onDeleteClient,
}: ClientManagerProps) {
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startCreate() {
    setIsCreating(true);
    setEditingClient({
      name: '',
      logo_path: null,
      website_url: null,
      display_order: clients.length + 1,
      published: true,
    });
    setError(null);
  }

  function startEdit(client: Client) {
    setIsCreating(false);
    setEditingClient({ ...client });
    setError(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingClient?.name?.trim()) {
      setError('Client name is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSaveClient(editingClient);
      setEditingClient(null);
      setIsCreating(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to save client.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteConfirmId) return;
    setIsSubmitting(true);
    try {
      await onDeleteClient(deleteConfirmId);
      setDeleteConfirmId(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to delete client.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#85E4FF]/40">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">Client Management</h2>
          <p className="text-xs sm:text-sm text-[#A8C2DA] mt-1">
            Manage confirmed client relationships (24framesphotography, NRK Infotech) with 3D Instagram structures and official profiles.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#0757E8] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-neon flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {error && (
        <div className="rounded-2xl p-4 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Editor Modal */}
      {editingClient && (
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-[#85E4FF]/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#85E4FF]/20 pb-3">
            <h3 className="text-lg font-bold text-white">
              {isCreating ? 'Add Client' : `Edit Client: ${editingClient.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingClient(null)}
              className="text-xs text-[#A8C2DA] hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingClient.name || ''}
                  onChange={(e) =>
                    setEditingClient((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. 24framesphotography"
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#85E4FF] uppercase tracking-wider">
                  Website / Social Link (Optional)
                </label>
                <input
                  type="url"
                  value={editingClient.website_url || ''}
                  onChange={(e) =>
                    setEditingClient((prev) => ({ ...prev, website_url: e.target.value }))
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl bg-[#031326]/80 border border-[#85E4FF]/30 px-4 py-2.5 text-sm text-white placeholder-[#A8C2DA]/50 focus:border-[#85E4FF] focus:outline-none"
                />
              </div>
            </div>

            <ImageUpload
              label="Client Logo (Optional — Restrained monogram displayed if omitted)"
              value={editingClient.logo_path}
              folder="clients"
              onChange={(url) => setEditingClient((prev) => ({ ...prev, logo_path: url }))}
              onRemove={() => setEditingClient((prev) => ({ ...prev, logo_path: null }))}
              aspectRatio="square"
            />

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  setEditingClient((prev) => ({ ...prev, published: !prev?.published }))
                }
                className="flex items-center space-x-2 text-sm text-white"
              >
                {editingClient.published ? (
                  <ToggleRight className="w-8 h-8 text-[#85E4FF]" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-[#A8C2DA]/50" />
                )}
                <span>{editingClient.published ? 'Published' : 'Hidden'}</span>
              </button>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingClient(null)}
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
                <span>Save Client</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {clients.map((client) => (
          <div
            key={client.id}
            className="glass-panel rounded-2xl p-5 border border-[#85E4FF]/30 hover:border-[#85E4FF]/60 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  client.published
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {client.published ? 'Published' : 'Hidden'}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => startEdit(client)}
                  className="p-1.5 rounded-lg glass-panel-subtle text-[#85E4FF] hover:bg-[#168BFF]/30 hover:text-white"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(client.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl glass-panel-subtle border border-[#85E4FF]/20 min-h-[90px]">
              {client.logo_path ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#85E4FF]/40 shadow-md">
                  <Image src={client.logo_path} alt={client.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#052B69] border border-[#85E4FF]/40 flex items-center justify-center text-xs font-bold text-[#85E4FF] uppercase">
                  {client.name.substring(0, 2)}
                </div>
              )}
              <h4 className="text-sm font-bold text-white mt-2 truncate w-full text-center">
                {client.name}
              </h4>
            </div>

            {client.website_url && (
              <a
                href={client.website_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#85E4FF] hover:underline flex items-center justify-center space-x-1"
              >
                <span>Visit Client</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02070D]/80 backdrop-blur-md">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-500/40 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-300">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Remove Client?</h3>
              <p className="text-xs text-[#A8C2DA]">
                Are you sure you want to remove this client record?
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
                {isSubmitting ? 'Deleting...' : 'Delete Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
