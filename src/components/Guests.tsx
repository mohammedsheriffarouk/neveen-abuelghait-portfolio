import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import type { GalleryItem } from '../data/types';
import { useLocale } from '../i18n/LocaleContext';
import { Lightbox } from './Gallery';
import { ImageBox } from './ui';

/**
 * Studio guests — a calm, snap-scrolling row of portrait photos.
 * Every photo opens the shared lightbox. Arrows scroll visually left/right in both directions.
 */
export function GuestsStrip({ items }: { items: GalleryItem[] }) {
  const { t } = useLocale();
  const row = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scroll = (side: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    el.scrollBy({ left: side * Math.max(260, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ul
        ref={row}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {items.map((g, i) => (
          <li key={g.id} className="w-[62%] shrink-0 snap-start sm:w-[34%] md:w-[28%] lg:w-[22.5%]">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={t('openImage', { c: g.image.alt })}
              className="group relative block w-full overflow-hidden rounded-3xl bg-surface text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ImageBox image={g.image} className="transition duration-700 ease-out group-hover:scale-[1.03]" />
              <span className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="h-4 w-4" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden justify-center gap-3 sm:flex">
        <button type="button" onClick={() => scroll(-1)} aria-label={t('prevImage')} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface transition hover:bg-accent">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label={t('nextImage')} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface transition hover:bg-accent">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </div>
  );
}
