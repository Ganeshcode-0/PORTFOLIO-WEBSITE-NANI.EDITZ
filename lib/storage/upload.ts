import { getSupabaseBrowserClient } from '../supabase/client';

export interface UploadOptions {
  folder: 'profiles' | 'categories' | 'clients' | 'projects' | 'icons';
  maxSizeBytes?: number; // default 5MB
}

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

export async function uploadPortfolioAsset(
  file: File,
  options: UploadOptions
): Promise<UploadResult> {
  const maxBytes = options.maxSizeBytes || 5 * 1024 * 1024; // 5MB

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WEBP, and SVG are supported.');
  }

  if (file.size > maxBytes) {
    throw new Error(`File size exceeds limit (${(maxBytes / (1024 * 1024)).toFixed(0)}MB).`);
  }

  const supabase = getSupabaseBrowserClient();
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${options.folder}/${fileName}`;

  // If Supabase is connected, upload to Supabase Storage bucket 'portfolio-assets'
  if (supabase) {
    const { data, error } = await supabase.storage
      .from('portfolio-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(`Storage upload error: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(filePath);

    return {
      url: publicUrlData.publicUrl,
      path: filePath,
    };
  }

  // Local preview fallback: convert to base64 Data URL so it persists and previews instantly in browser
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        path: `local/${filePath}`,
      });
    };
    reader.onerror = () => reject(new Error('Failed to read file locally.'));
    reader.readAsDataURL(file);
  });
}
