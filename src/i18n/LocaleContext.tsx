import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Content, Locale } from '../data/types';
import { ar } from '../data/ar';
import { en } from '../data/en';
import { dictionaries, type UIKey } from './ui';
import { SHOW_PLACEHOLDERS } from '../config';
import { publishable } from '../lib/publish';

/**
 * Language handling.
 * - Arabic is the default (primary) language; English is secondary.
 * - The choice is remembered per browser (localStorage, if available).
 * - <html lang dir> is updated so the whole layout flips to RTL / LTR.
 */
const DEFAULT_LOCALE: Locale = 'ar';
const STORAGE_KEY = 'portfolio-locale';
const bundles: Record<Locale, Content> = SHOW_PLACEHOLDERS ? { ar, en } : { ar: publishable(ar), en: publishable(en) };

interface LocaleValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  content: Content;
}

const Ctx = createContext<LocaleValue | null>(null);

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage unavailable — fall back to default */
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const dir: 'rtl' | 'ltr' = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    const p = bundles[locale].profile;
    document.title = `${p.name} — ${p.title}`;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, dir]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(() => setLocaleState((l) => (l === 'ar' ? 'en' : 'ar')), []);

  const t = useCallback(
    (key: UIKey, vars?: Record<string, string | number>) => {
      let s = dictionaries[locale][key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
      return s;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, dir, setLocale, toggle, t, content: bundles[locale] }), [locale, dir, setLocale, toggle, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLocale must be used inside <LocaleProvider>');
  return v;
}

/** Content of a specific language, without switching the site's language (used by the print CV). */
export const contentFor = (l: Locale) => bundles[l];

/** Shortcut: current language's content plus lookup helpers. */
export function useContent() {
  const { content } = useLocale();
  return useMemo(
    () => ({
      ...content,
      getProgram: (idOrSlug?: string) => content.programs.find((p) => p.id === idOrSlug || p.slug === idOrSlug),
      getMedia: (id: string) => content.episodes.find((e) => e.id === id),
      getGalleryItems: (ids: string[]) => ids.map((id) => content.gallery.find((g) => g.id === id)).filter((g): g is NonNullable<typeof g> => !!g),
      galleryLabel: (id: string) => content.galleryCategories.find((c) => c.id === id)?.label ?? id,
      mediaLabel: (id: string) => content.mediaCategories.find((c) => c.id === id)?.label ?? id,
    }),
    [content],
  );
}
