import { useEffect, useRef } from 'react';
import { ImageBox } from './ui';
import type { ImageRef } from '../data/types';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptPromise: Promise<void> | null = null;
/** Loads Instagram's official embed script once per page (instagram.com/embed.js — the same script their own "Embed" button provides). */
function loadInstagramScript(): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      if (window.instgrm) return resolve();
      const existing = document.querySelector<HTMLScriptElement>('script[data-instagram-embed]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.dataset.instagramEmbed = 'true';
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * A live, native Instagram embed (post/reel) via Instagram's own embed.js — the same
 * result as pasting their "Embed" code. Until the script loads (or if the network/script
 * is blocked), it shows the real cover photo linking out to the post, so there is always
 * a working, attributable link back to the original — never a dead placeholder.
 */
export function InstagramEmbed({ url, cover, label }: { url: string; cover: ImageRef; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadInstagramScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[400px]">
      <noscript>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ImageBox image={cover} className="rounded-2xl" />
        </a>
      </noscript>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
        style={{ background: '#fff', border: 0, borderRadius: '1rem', margin: '0 auto', maxWidth: 400, minWidth: 280, width: '100%' }}
      >
        {/* Shown instantly while embed.js loads (or in place of it if it can't) — always a real photo linking to the real post. */}
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="block">
          <ImageBox image={cover} className="rounded-2xl" />
        </a>
      </blockquote>
    </div>
  );
}
