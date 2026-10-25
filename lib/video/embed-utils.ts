/**
 * Video & Reel Embed Utilities
 * Parses and generates responsive embed URLs for Instagram Reels, YouTube (including Shorts),
 * Vimeo, and direct video streaming with automatic looping and autoplay support.
 */

export interface EmbedOptions {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export function extractInstagramId(url: string): string | null {
  if (!url) return null;
  // Match https://www.instagram.com/reel/C-xyz123/ or /p/C-xyz123/
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  return match ? match[1] : null;
}

export function getInstagramEmbedUrl(url: string): string {
  const id = extractInstagramId(url);
  if (id) {
    return `https://www.instagram.com/reel/${id}/embed/`;
  }
  if (url.includes('/embed')) return url;
  return url.replace(/\/?$/, '/embed/');
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // Match youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([A-Za-z0-9_-]{11})/i
  );
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(
  url: string,
  options: boolean | EmbedOptions = true
): string {
  const id = extractYouTubeId(url);
  if (!id) return url;

  // Default to muted + autoplay + loop + NO controls for zero YT play button interference
  const opts: EmbedOptions =
    typeof options === 'boolean'
      ? { autoplay: options, loop: true, muted: true, controls: false }
      : { autoplay: true, loop: true, muted: true, controls: false, ...options };

  const autoplayParam = opts.autoplay ? 1 : 0;
  const loopParam = opts.loop ? 1 : 0;
  const muteParam = opts.muted ? 1 : 0;
  const controlsParam = opts.controls ? 1 : 0;

  // Comprehensive YouTube parameters hiding the red YT play button, title, and chrome
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplayParam}&mute=${muteParam}&loop=${loopParam}&playlist=${id}&controls=${controlsParam}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&showinfo=0&enablejsapi=1`;
}

export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i
  );
  return match ? match[3] : null;
}

export function getVimeoEmbedUrl(
  url: string,
  options: boolean | EmbedOptions = true
): string {
  const id = extractVimeoId(url);
  if (!id) return url;

  const opts: EmbedOptions =
    typeof options === 'boolean'
      ? { autoplay: options, loop: true, muted: true }
      : { autoplay: true, loop: true, muted: true, ...options };

  const autoplayParam = opts.autoplay ? 1 : 0;
  const loopParam = opts.loop ? 1 : 0;
  const muteParam = opts.muted ? 1 : 0;

  return `https://player.vimeo.com/video/${id}?autoplay=${autoplayParam}&loop=${loopParam}&muted=${muteParam}&playsinline=1`;
}

export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v') ||
    lower.includes('cloudinary.com') ||
    lower.includes('/video/upload/') ||
    lower.includes('.mp4?')
  );
}

export function detectProviderFromUrl(url: string): 'instagram' | 'youtube' | 'vimeo' | 'direct' {
  if (!url) return 'youtube';
  const lower = url.toLowerCase();
  if (lower.includes('instagram.com/reel') || lower.includes('instagram.com/p/')) {
    return 'instagram';
  }
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return 'youtube';
  }
  if (lower.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'direct';
}
