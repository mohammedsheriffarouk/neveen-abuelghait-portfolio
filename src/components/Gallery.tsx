import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import type { GalleryItem } from '../data/types';
import { ImageBox, flip } from './ui';
import { Modal } from './Modal';
import { useContent, useLocale } from '../i18n/LocaleContext';

/**
 * Lightbox with previous/next, keyboard arrows and touch swipe.
 * Direction-aware: in RTL, "previous" sits on the right and the arrow keys follow the reading direction.
 */
export function Lightbox({ items, index, onClose, onChange }: { items: GalleryItem[]; index: number | null; onClose: () => void; onChange: (i: number) => void }) {
  const { t, dir } = useLocale();
  const { galleryLabel } = useContent();
  const open = index !== null && !!items[index];
  const touchX = useRef<number | null>(null);
  const go = useCallback(
    (step: 1 | -1) => {
      if (index !== null) onChange((index + step + items.length) % items.length);
    },
    [index, items.length, onChange],
  );
  const forwardKey = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  const backKey = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === forwardKey) go(1);
      if (e.key === backKey) go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, go, forwardKey, backKey]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <Modal open onClose={onClose} title={t('imageOf', { i: index + 1, n: items.length })} size="xl" dark>
      <div
        className="flex min-h-[70vh] flex-col justify-center gap-4 px-2 pb-6 pt-16 sm:px-16"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          // Swipe toward the reading direction = next.
          if (Math.abs(dx) > 50) go((dx < 0) === (dir === 'ltr') ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: `min(100%, calc(70vh * ${item.image.ratio.replace('/', ' / ')}))` }}>
          <ImageBox image={item.image} className="rounded" fit="contain" />
        </div>
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-widest text-white/60">
            {galleryLabel(item.category)} · {index + 1} / {items.length}
          </p>
          <p className="mt-1 font-medium">{item.caption}</p>
          {item.description && <p className="mt-1 text-sm text-white/70">{item.description}</p>}
        </div>
      </div>
      <button type="button" onClick={() => go(-1)} aria-label={t('prevImage')} className="absolute start-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:start-2">
        <ChevronLeft className={`h-6 w-6 ${flip}`} />
      </button>
      <button type="button" onClick={() => go(1)} aria-label={t('nextImage')} className="absolute end-1 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:end-2">
        <ChevronRight className={`h-6 w-6 ${flip}`} />
      </button>
    </Modal>
  );
}

/** Masonry grid (CSS columns) — every tile opens the lightbox. */
export function GalleryGrid({ items, columns = 'columns-2 md:columns-3 lg:columns-4' }: { items: GalleryItem[]; columns?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const { t } = useLocale();
  const { galleryLabel } = useContent();
  return (
    <>
      <ul className={`${columns} gap-3 sm:gap-4 [&>li]:mb-3 sm:[&>li]:mb-4`}>
        {items.map((g, i) => (
          <li key={g.id} className="break-inside-avoid">
            <button type="button" onClick={() => setActive(i)} aria-label={t('openImage', { c: g.caption })} className="group block w-full overflow-hidden rounded-lg border border-line bg-surface text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-ink">
              <div className="relative">
                <ImageBox image={g.image} label={galleryLabel(g.category)} />
                <span className="absolute end-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <div className="px-3 py-2">
                <p className="truncate text-xs font-medium">{g.caption}</p>
                <p className="wf-label mt-0.5">{galleryLabel(g.category)}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </>
  );
}
