/**
 * Small reusable building blocks: image placeholders, headings, breadcrumbs,
 * platform icons, external CTAs, social links, filters, search, empty state, CTA block.
 * All directional styles use logical properties (start/end) so they flip in RTL.
 */
import { Link } from 'react-router-dom';
import { useCallback, type ReactNode } from 'react';
import {
  AudioLines, ChevronRight, ExternalLink, Globe, Image as ImageIcon, Mail,
  MessageCircle, Podcast, Radio, RotateCcw, Search, X as XIcon,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from './BrandIcons';
import type { ExternalLink as ExtLink, ImageRef, Platform } from '../data/types';
import { isRealUrl } from '../data/placeholder';
import { useLocale } from '../i18n/LocaleContext';

/** Class for arrow/chevron icons that must point the other way in RTL. */
export const flip = 'rtl:-scale-x-100';

/* ------------------------------------------------------------------ */
/* Image / placeholder                                                 */
/* ------------------------------------------------------------------ */
export function ImageBox({ image, className = '', label, fit = 'cover' }: { image: ImageRef; className?: string; label?: string; fit?: 'cover' | 'contain' }) {
  const { t } = useLocale();
  const ratioLabel = image.ratio.replace('/', ':');
  return (
    <div className={`relative w-full overflow-hidden bg-placeholder ${className}`} style={{ aspectRatio: image.ratio }}>
      {image.src ? (
        <img src={image.src} alt={image.alt} loading="lazy" style={{ objectPosition: image.position }} className={`h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`} />
      ) : (
        <div role="img" aria-label={t('placeholder', { alt: image.alt })} className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
          <svg className="absolute inset-0 h-full w-full text-line" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="relative flex flex-col items-center gap-1 rounded bg-placeholder/90 px-2 py-1">
            <ImageIcon className="h-5 w-5 text-subtle" aria-hidden />
            <span className="text-[11px] font-medium leading-tight text-subtle">{label ?? image.alt}</span>
            <span className="wf-label" dir="ltr">{ratioLabel}</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Headings                                                            */
/* ------------------------------------------------------------------ */
export function SectionHeading({ eyebrow, title, intro, action, center }: { index?: string; eyebrow?: string; title: string; intro?: string; action?: ReactNode; center?: boolean }) {
  return (
    <div className={`mb-10 flex flex-col gap-4 sm:mb-12 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-base leading-relaxed text-subtle">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * Concentric "broadcast" rings — the site's signature motif, echoing the
 * ripples in the «عندي فكرة» artwork. Purely decorative.
 */
export function Rings({ className = '', count = 9 }: { className?: string; count?: number }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx="200" cy="200" r={22 + i * 22} stroke="currentColor" strokeWidth={i % 2 ? 1 : 10} opacity={1 - i * 0.07} />
      ))}
    </svg>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { t } = useLocale();
  return (
    <nav aria-label={t('nav.breadcrumb')} className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-subtle">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className={`h-3 w-3 ${flip}`} aria-hidden />}
            {it.to ? (
              <Link to={it.to} className="rounded px-0.5 hover:text-ink hover:underline">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({ crumbs, title, intro, children }: { crumbs: { label: string; to?: string }[]; title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="container-wf pt-6 sm:pt-8">
      <div className="rounded-3xl bg-surface px-6 py-10 sm:px-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="max-w-3xl text-4xl tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-subtle sm:text-lg">{intro}</p>}
        {children}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Platforms                                                           */
/* ------------------------------------------------------------------ */
type IconC = (p: { className?: string }) => JSX.Element;
/** Official Spotify mark (full-colour) — the only platform icon that keeps its brand colour. */
const SpotifyLogo: IconC = ({ className = 'h-4 w-4' }) => <img src="assets/images/logos/spotify-mark.png" alt="" aria-hidden className={`${className} shrink-0 object-contain`} />;
const platformIcons: Record<Platform, typeof Globe | IconC> = {
  spotify: SpotifyLogo, apple: Podcast, youtube: YouTubeIcon, instagram: InstagramIcon, radio: Radio, soundcloud: AudioLines,
  linkedin: LinkedInIcon, facebook: FacebookIcon, tiktok: TikTokIcon, x: XIcon, whatsapp: MessageCircle, email: Mail, website: Globe, other: Globe,
};

/** Returns a function that gives the localized platform name. */
export function usePlatformLabel() {
  const { t } = useLocale();
  return useCallback((p: Platform) => t(`platform.${p}` as Parameters<typeof t>[0]), [t]);
}

export function PlatformIcon({ platform, className = 'h-4 w-4' }: { platform: Platform; className?: string }) {
  const Icon = platformIcons[platform];
  return <Icon className={className} />;
}

export function PlatformBadge({ platform }: { platform: Platform }) {
  const label = usePlatformLabel();
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-surface/95 px-2 py-0.5 text-[11px] font-medium text-ink">
      <PlatformIcon platform={platform} className="h-3 w-3" />
      {label(platform)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* External link CTA — degrades to "link needed" while URL is a placeholder */
/* ------------------------------------------------------------------ */
export function ExternalCTA({ url, label, variant = 'secondary', platform, className = '' }: { url: string; label: string; variant?: 'primary' | 'secondary' | 'ghost'; platform?: Platform; className?: string }) {
  const { t } = useLocale();
  const cls = `${variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : 'btn-secondary'} ${className}`;
  const icon = platform ? <PlatformIcon platform={platform} /> : null;
  if (isRealUrl(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        {label}
        <ExternalLink className={`h-3.5 w-3.5 ${flip}`} aria-hidden />
      </a>
    );
  }
  return (
    <button type="button" disabled className={`${cls} cursor-not-allowed`} title={t('urlNeeded', { url })}>
      {icon}
      {label}
      <span className="needed text-[10px]">{t('linkNeeded')}</span>
    </button>
  );
}

export function SocialLinks({ links, size = 'md' }: { links: ExtLink[]; size?: 'sm' | 'md' }) {
  const { t } = useLocale();
  const label = usePlatformLabel();
  const box = size === 'sm' ? 'h-10 w-10' : 'h-11 w-11';
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => {
        const name = label(l.platform);
        const content = <PlatformIcon platform={l.platform} className="h-4 w-4" />;
        return (
          <li key={l.platform + l.url}>
            {isRealUrl(l.url) ? (
              <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name} className={`${box} inline-flex items-center justify-center rounded-xl bg-surface text-ink transition hover:bg-accent`}>
                {content}
              </a>
            ) : (
              <span title={`${name} — ${t('linkNeeded')}`} aria-label={`${name} (${t('linkNeeded')})`} className={`${box} inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-line bg-surface text-subtle`}>
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Filters & search                                                    */
/* ------------------------------------------------------------------ */
export function FilterChips<T extends string>({ label, options, value, onChange }: { label: string; options: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)} className={`chip whitespace-nowrap ${value === o.value ? 'chip-active' : ''}`}>
            {o.label}
            {o.count !== undefined && <span className="ms-1.5 opacity-60">{o.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectFilter({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="wf-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-wf pe-8">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export function SearchInput({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label?: string }) {
  const { t } = useLocale();
  return (
    <label className="flex flex-col gap-1">
      <span className="wf-label">{label ?? t('search')}</span>
      <span className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden />
        <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input-wf ps-9" />
      </span>
    </label>
  );
}

export function EmptyState({ title, text, onReset }: { title: string; text?: string; onReset?: () => void }) {
  const { t } = useLocale();
  return (
    <div className="card-wf flex flex-col items-center gap-3 border-dashed px-6 py-14 text-center">
      <p className="font-medium">{title}</p>
      {text && <p className="max-w-sm text-sm text-subtle">{text}</p>}
      {onReset && (
        <button type="button" onClick={onReset} className="btn-secondary mt-2">
          <RotateCcw className="h-4 w-4" aria-hidden /> {t('clearFilters')}
        </button>
      )}
    </div>
  );
}

export function ResultCount({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  const { t } = useLocale();
  return (
    <p className="text-xs text-subtle" aria-live="polite">
      {t('showing', { shown, total, noun })}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* CTA block                                                           */
/* ------------------------------------------------------------------ */
export function CTABlock({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children: ReactNode }) {
  return (
    <section className="section-wf">
      <div className="container-wf">
        <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-accent p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="text-3xl tracking-tight sm:text-4xl">{title}</h2>
            {text && <p className="mt-3 text-sm leading-relaxed text-subtle sm:text-base">{text}</p>}
          </div>
          <div className="relative flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
