'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Check, Loader2, AlertCircle } from 'lucide-react';
import { uploadPortfolioAsset } from '@/lib/storage/upload';

interface ImageUploadProps {
  label: string;
  value?: string | null;
  folder: 'profiles' | 'categories' | 'clients' | 'projects' | 'icons';
  onChange: (url: string) => void;
  onRemove?: () => void;
  aspectRatio?: 'square' | 'video' | 'portrait';
  helpText?: string;
}

export function ImageUpload({
  label,
  value,
  folder,
  onChange,
  onRemove,
  aspectRatio = 'square',
  helpText = 'JPEG, PNG, WEBP, or SVG up to 5MB',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(file: File) {
    setError(null);
    setIsUploading(true);

    try {
      const result = await uploadPortfolioAsset(file, { folder });
      onChange(result.url);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'portrait'
      ? 'aspect-[9/16]'
      : 'aspect-square';

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#85E4FF]">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-[#85E4FF]/40 glass-panel-subtle max-w-sm">
          <div className={`relative w-full ${aspectClass}`}>
            <Image src={value} alt={label} fill className="object-cover" />
          </div>

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-[#168BFF] text-white text-xs font-semibold hover:bg-[#63D0F2] transition-colors"
            >
              Replace
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 rounded-xl bg-red-600/80 text-white hover:bg-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all ${
            dragOver
              ? 'border-[#85E4FF] bg-[#168BFF]/20'
              : 'border-[#85E4FF]/30 hover:border-[#85E4FF]/60 hover:bg-[#168BFF]/10'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2 py-4">
              <Loader2 className="w-8 h-8 text-[#85E4FF] animate-spin" />
              <p className="text-xs text-[#85E4FF] font-medium">Uploading media...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 py-2">
              <div className="w-12 h-12 rounded-xl glass-panel-subtle flex items-center justify-center text-[#85E4FF]">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">Click or drag file to upload</p>
              <p className="text-xs text-[#A8C2DA]">{helpText}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-xs text-red-400 mt-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
