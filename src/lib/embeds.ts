import { isRealUrl } from '../data/placeholder';

/**
 * Converts public platform URLs into OFFICIAL embed URLs.
 * Returns null when the URL is missing, a placeholder, or not embeddable → UI falls back to an external link.
 * No scraping, no private APIs.
 */
export function getEmbed(url?: string): { src: string; provider: 'spotify' | 'youtube' | 'instagram'; height?: number; ratio?: string } | null {
  if (!url || !isRealUrl(url)) return null;
  let u: URL;
  try { u = new URL(url); } catch { return null; }
  const host = u.hostname.replace(/^www\./, '');

  // Spotify: open.spotify.com/episode/<id> | /show/<id> | /track/<id>
  if (host === 'open.spotify.com') {
    const m = u.pathname.match(/\/(episode|show|track|playlist)\/([A-Za-z0-9]+)/);
    if (m) return { provider: 'spotify', src: `https://open.spotify.com/embed/${m[1]}/${m[2]}`, height: m[1] === 'show' ? 352 : 232 };
  }

  // YouTube: youtube.com/watch?v=<id> | youtu.be/<id> | youtube.com/shorts/<id>
  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be') {
    const id = host === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') || u.pathname.match(/\/(shorts|embed)\/([^/?]+)/)?.[2];
    if (id) return { provider: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}`, ratio: '16/9' };
  }

  // Instagram: instagram.com/reel/<id> | /p/<id>
  if (host === 'instagram.com') {
    const m = u.pathname.match(/\/(reel|p|tv)\/([^/?]+)/);
    if (m) return { provider: 'instagram', src: `https://www.instagram.com/${m[1]}/${m[2]}/embed`, ratio: '9/14' };
  }

  return null;
}
