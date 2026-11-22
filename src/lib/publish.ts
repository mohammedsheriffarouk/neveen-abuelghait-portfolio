import type { Content } from '../data/types';
import { isRealUrl } from '../data/placeholder';

const BRACKETS = /\s*\[[^\]]*\]/g;

/** Strips every "[...]" note from strings, recursively. Keeps structure, never mutates the source. */
function strip<T>(value: T): T {
  if (typeof value === 'string') {
    if (!BRACKETS.test(value)) return value as T;
    BRACKETS.lastIndex = 0;
    // Remove notes, then any dash/dot left dangling at either end (e.g. "[YEAR] – Present" → "Present").
    return value.replace(BRACKETS, '').replace(/\s{2,}/g, ' ').replace(/^[\s–—\-·:]+|[\s–—\-·:]+$/g, '').trim() as T;
  }
  if (Array.isArray(value)) {
    return value.map(strip).filter((v) => !(typeof v === 'string' && v === '')) as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = strip(v);
    return out as T;
  }
  return value;
}

/** Turns a draft content bundle into what visitors should see. */
export function publishable(c: Content): Content {
  const s = strip(c);
  return {
    ...s,
    programs: s.programs.map((p) => ({ ...p, externalLinks: p.externalLinks.filter((l) => isRealUrl(l.url) && l.label) })),
    // Episodes without a real title, or with neither a real link nor an audio file, are not ready.
    episodes: s.episodes.filter((e) => e.title && (isRealUrl(e.url) || !!e.audioSrc)),
    gallery: s.gallery.filter((g) => !!g.image.src),
    guests: s.guests.filter((g) => !!g.image.src),
    experience: s.experience.map((e) => ({ ...e, title: e.title || e.organization })),
    certifications: s.certifications.map((x) => ({ ...x, certificatePdf: undefined, verifyUrl: isRealUrl(x.verifyUrl) ? x.verifyUrl : undefined })),
    profile: {
      ...s.profile,
      about: {
        ...s.profile.about,
        journey: s.profile.about.journey.filter((j) => j.title),
      },
    },
  };
}
