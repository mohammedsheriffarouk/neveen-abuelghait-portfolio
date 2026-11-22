import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Calendar, ChevronDown, Clock, Download, FileText, Headphones, MapPin, Play, ShieldCheck } from 'lucide-react';
import type { Certification, Experience, MediaItem, Program } from '../data/types';
import { useContent, useLocale } from '../i18n/LocaleContext';
import { ExternalCTA, ImageBox, PlatformBadge, Rings, flip, usePlatformLabel } from './ui';
import { GalleryGrid } from './Gallery';
import { Modal } from './Modal';
import { MediaViewer, ShowEmbed } from './Media';

/* ------------------------------------------------------------------ */
/* Program card → opens program detail page                            */
/* ------------------------------------------------------------------ */
export function ProgramCard({ program }: { program: Program }) {
  const { t } = useLocale();
  return (
    <article className="card-wf card-lift group flex h-full flex-col overflow-hidden">
      <Link to={`/programs/${program.slug}`} className="block" tabIndex={-1} aria-hidden>
        <ImageBox image={program.cover} className="transition duration-500 group-hover:scale-[1.02]" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="tag">{t(`format.${program.format}`)}</span>
          <span className="tag">{program.category}</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold leading-snug">
            <Link to={`/programs/${program.slug}`} className="hover:underline">{program.name}</Link>
          </h3>
          <p className="mt-0.5 text-sm text-subtle">{program.station}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-subtle">{program.shortDescription}</p>
        <ProgramMeta program={program} className="mt-auto" />
        <Link to={`/programs/${program.slug}`} className={`btn-secondary w-full ${program.period || program.episodesCount ? '' : 'mt-auto'}`}>
          {t('explore')} <ArrowRight className={`h-4 w-4 ${flip}`} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/** Broadcast period + episode count, showing only the fields that are filled in. */
function ProgramMeta({ program, className = '' }: { program: Program; className?: string }) {
  const { t } = useLocale();
  const rows = [
    { label: t('broadcasting'), value: program.period },
    { label: t('episodes'), value: program.episodesCount },
  ].filter((r) => r.value);
  if (!rows.length) return null;
  return (
    <dl className={`grid grid-cols-2 gap-2 border-t border-line pt-3 text-xs ${className}`}>
      {rows.map((r) => <div key={r.label}><dt className="wf-label">{r.label}</dt><dd className="mt-0.5">{r.value}</dd></div>)}
    </dl>
  );
}

/** Wide layout used when there are only one or two programs. */
export function FeaturedProgram({ program }: { program: Program }) {
  const { t } = useLocale();
  const spotify = program.externalLinks.find((l) => l.platform === 'spotify');
  return (
    <article className="card-wf grid grid-cols-1 overflow-hidden md:grid-cols-12">
      <Link to={`/programs/${program.slug}`} className="block self-start p-6 pb-0 sm:p-8 sm:pb-0 md:col-span-5 md:pb-8 md:pe-0" tabIndex={-1} aria-hidden>
        <ImageBox image={program.cover} className="rounded-lg border border-line" />
      </Link>
      <div className="flex flex-col gap-4 p-6 sm:p-8 md:col-span-7">
        <div className="flex flex-wrap gap-1.5">
          <span className="tag">{t(`format.${program.format}`)}</span>
          <span className="tag">{program.category}</span>
        </div>
        <div>
          <h3 className="font-display text-3xl font-semibold leading-snug">
            <Link to={`/programs/${program.slug}`} className="hover:underline">{program.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-subtle">{program.station} · {program.role}</p>
        </div>
        <p className="text-sm leading-relaxed text-subtle sm:text-base">{program.shortDescription}</p>
        <ProgramMeta program={program} />
        {spotify && <ShowEmbed url={spotify.url} title={program.name} />}
        <Link to={`/programs/${program.slug}`} className="btn-secondary self-start">
          {t('explore')} <ArrowRight className={`h-4 w-4 ${flip}`} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Media / episode card → opens media viewer                           */
/* ------------------------------------------------------------------ */
export function MediaCard({ item, onOpen }: { item: MediaItem; onOpen: (m: MediaItem) => void }) {
  const { t } = useLocale();
  const { getProgram, mediaLabel } = useContent();
  const label = usePlatformLabel();
  const program = item.programId ? getProgram(item.programId) : undefined;
  const verb = item.kind === 'video' ? t('watch') : t('listen');
  return (
    <article className="card-wf card-lift group flex h-full flex-col overflow-hidden">
      <button type="button" onClick={() => onOpen(item)} className="group relative block w-full text-start" aria-label={`${verb}: ${item.title}`}>
        <ImageBox image={{ ...item.thumbnail, ratio: '1/1' }} className="transition duration-500 group-hover:scale-[1.02]" />
        <span className="absolute start-2 top-2 flex flex-wrap gap-1.5">
          <PlatformBadge platform={item.platform} />
          {item.topViewed && <span className="inline-flex items-center rounded bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-ink">{t('mostViewed')}</span>}
        </span>
        <span className="absolute bottom-2 end-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink shadow transition group-hover:scale-105">
          {item.kind === 'video' ? <Play className="ml-0.5 h-5 w-5" /> : <Headphones className="h-5 w-5" />}
        </span>
        {item.duration && <span dir="ltr" className="absolute bottom-2 start-2 rounded bg-surface/95 px-1.5 py-0.5 font-mono text-[11px]">{item.duration}</span>}
      </button>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="wf-label">{mediaLabel(item.category)} · {item.kind === 'video' ? t('video') : t('audio')}</p>
        <h3 className="font-semibold leading-snug">{item.title}</h3>
        <p className="text-xs text-subtle">
          {program ? <Link to={`/programs/${program.slug}`} className="hover:text-ink hover:underline">{program.name}</Link> : t('independent')}
          {' · '}{label(item.platform)}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-subtle">{item.description}</p>
        <button type="button" onClick={() => onOpen(item)} className="btn-secondary mt-auto w-full">
          {item.kind === 'video' ? <Play className="h-4 w-4" /> : <Headphones className="h-4 w-4" />} {verb}
        </button>
      </div>
    </article>
  );
}

/** Grid of media cards that manages its own viewer. */
export function MediaGrid({ items, cols = 'sm:grid-cols-2 lg:grid-cols-3' }: { items: MediaItem[]; cols?: string }) {
  const [active, setActive] = useState<MediaItem | null>(null);
  return (
    <>
      <ul className={`grid grid-cols-1 gap-4 sm:gap-6 ${cols}`}>
        {items.map((m) => <li key={m.id}><MediaCard item={m} onOpen={setActive} /></li>)}
      </ul>
      <MediaViewer item={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Experience timeline item — expandable                               */
/* ------------------------------------------------------------------ */
export function TimelineItem({ exp, defaultOpen = false, compact = false }: { exp: Experience; defaultOpen?: boolean; compact?: boolean }) {
  const { t } = useLocale();
  const { getGalleryItems, getMedia } = useContent();
  const [open, setOpen] = useState(defaultOpen);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const photos = getGalleryItems(exp.galleryIds);
  const related = exp.mediaIds.map(getMedia).filter((m): m is MediaItem => !!m);
  const panelId = `${exp.id}-details`;

  return (
    <li className="relative ps-8 sm:ps-10">
      <span className="absolute start-[7px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-surface sm:start-[11px]" aria-hidden />
      <div className="card-wf p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="font-semibold">{exp.title}</h3>
            <p className="text-sm text-subtle">{exp.organization}</p>
          </div>
          {(exp.start || exp.end) && <p dir="ltr" className="shrink-0 text-sm text-subtle">{[exp.start, exp.end].filter(Boolean).join(' — ')}</p>}
        </div>
        {!compact && (exp.type || exp.location) && (
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle">
            {exp.type && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{exp.type}</span>}
            {exp.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-subtle">{exp.summary}</p>

        {!compact && (exp.responsibilities.length > 0 || exp.achievements.length > 0 || photos.length > 0 || related.length > 0) && (
          <>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={panelId} className="btn-ghost -ms-3 mt-2">
              {open ? t('hideDetails') : t('showDetails')}
              <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div id={panelId} className="mt-3 grid grid-cols-1 gap-6 border-t border-line pt-4 md:grid-cols-2">
                {exp.responsibilities.length > 0 && (
                  <div>
                    <p className="wf-label mb-2">{t('responsibilities')}</p>
                    <ul className="list-disc space-y-1.5 ps-4 text-sm text-subtle">{exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
                  </div>
                )}
                {exp.achievements.length > 0 && (
                  <div>
                    <p className="wf-label mb-2">{t('achievements')}</p>
                    <ul className="list-disc space-y-1.5 ps-4 text-sm text-subtle">{exp.achievements.map((r, i) => <li key={i}>{r}</li>)}</ul>
                  </div>
                )}
                {(photos.length > 0 || related.length > 0) && (
                  <div className="md:col-span-2">
                    <p className="wf-label mb-2">{t('related')}</p>
                    {related.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {related.map((m) => (
                          <button key={m.id} type="button" onClick={() => setMedia(m)} className="chip">
                            <Headphones className="me-1.5 h-3.5 w-3.5" /> {m.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {photos.length > 0 && <GalleryGrid items={photos} columns="columns-2 sm:columns-3" />}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <MediaViewer item={media} onClose={() => setMedia(null)} />
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Certification card                                                  */
/* ------------------------------------------------------------------ */
export function CertificationCard({ cert }: { cert: Certification }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  return (
    <article className="card-wf flex h-full flex-col overflow-hidden">
      {cert.certificateImage.src ? (
        <button type="button" onClick={() => setOpen(true)} className="block text-start" aria-label={`${t('viewCert')}: ${cert.name}`}>
          <ImageBox image={cert.certificateImage} />
        </button>
      ) : (
        <CertificateFallback cert={cert} />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="tag self-start">{cert.category}</span>
        <h3 className="font-semibold leading-snug">{cert.name}</h3>
        <p className="text-sm text-subtle">{cert.provider}{cert.instructor && <> · {cert.instructor}</>}</p>
        {(cert.date || cert.duration) && (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle">
            {cert.date && <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{cert.date}</span>}
            {cert.duration && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{cert.duration}</span>}
          </p>
        )}
        <p className="line-clamp-3 text-sm leading-relaxed text-subtle">{cert.description}</p>
        <div className="flex flex-wrap gap-1.5">{cert.skills.map((s, i) => <span key={i} className="tag normal-case">{s}</span>)}</div>
        {(cert.certificateImage.src || cert.certificatePdf || cert.verifyUrl) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {(cert.certificateImage.src || cert.certificatePdf) && <button type="button" onClick={() => setOpen(true)} className="btn-secondary flex-1"><FileText className="h-4 w-4" /> {t('viewCert')}</button>}
            {cert.verifyUrl && <ExternalCTA url={cert.verifyUrl} label={t('verify')} variant="ghost" />}
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={cert.name} size="lg">
        <div className="p-5 pt-16 sm:p-8 sm:pt-16">
          <ImageBox image={cert.certificateImage} className="rounded-lg border border-line" />
          <h3 className="mt-5 text-lg font-semibold">{cert.name}</h3>
          <p className="text-sm text-subtle">{cert.provider} · {cert.date}</p>
          <p className="mt-3 text-sm leading-relaxed text-subtle">{cert.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cert.certificatePdf && <a href={cert.certificatePdf} download className="btn-primary"><Download className="h-4 w-4" /> {t('downloadPdf')}</a>}
            {cert.verifyUrl ? (
              <ExternalCTA url={cert.verifyUrl} label={t('verifyCredential')} platform="website" />
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-subtle"><ShieldCheck className="h-4 w-4" />{t('noVerify')}</span>
            )}
          </div>
        </div>
      </Modal>
    </article>
  );
}

/** Shown instead of an empty placeholder when no certificate scan exists yet. */
function CertificateFallback({ cert }: { cert: Certification }) {
  return (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden bg-calm/40 p-6 text-center">
      <Rings className="pointer-events-none absolute -bottom-24 -end-20 h-64 w-64 text-white/70" />
      <Award className="relative h-10 w-10 text-accent" aria-hidden />
      <p className="relative font-display text-xl font-semibold">{cert.provider}</p>
      {cert.instructor && <p className="relative text-sm text-subtle">{cert.instructor}</p>}
    </div>
  );
}
