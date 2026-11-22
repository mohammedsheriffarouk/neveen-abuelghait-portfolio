import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import type { MediaItem } from '../data/types';
import { getEmbed } from '../lib/embeds';
import { isPlaceholder, isRealUrl } from '../data/placeholder';
import { useContent, useLocale } from '../i18n/LocaleContext';
import { Modal } from './Modal';
import { AudioPlayer } from './AudioPlayer';
import { ExternalCTA, ImageBox, PlatformBadge, usePlatformLabel } from './ui';

/**
 * Media destination. Presentation priority:
 *  1. Own audio file (`audioSrc`) → native player (e.g. the show promo).
 *  2. Official embed (Spotify / YouTube / Instagram) when the URL is real.
 *  3. Fallback: thumbnail + external link — graceful degradation, never fake playback.
 */
export function MediaEmbed({ item }: { item: MediaItem }) {
  const { t } = useLocale();
  const label = usePlatformLabel();
  if (item.audioSrc && !isPlaceholder(item.audioSrc)) {
    return <AudioPlayer src={item.audioSrc} title={item.title} durationLabel={item.duration} />;
  }
  const embed = getEmbed(item.url);
  if (embed) {
    return (
      <div className="overflow-hidden rounded-2xl bg-canvas" style={embed.ratio ? { aspectRatio: embed.ratio } : { height: embed.height }}>
        <iframe src={embed.src} title={item.title} className="h-full w-full" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="mx-auto max-w-sm">
        <ImageBox image={item.thumbnail} className="rounded-lg border border-line" />
      </div>
      <p className="flex items-start gap-2 rounded-md border border-dashed border-line bg-muted p-3 text-xs text-subtle">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{t('noEmbed', { p: label(item.platform) })}</span>
      </p>
    </div>
  );
}

/** Instagram reel inside the viewer: the same cover as the card, linking out to the reel. */
function ReelCover({ item }: { item: MediaItem }) {
  const { t } = useLocale();
  const label = usePlatformLabel();
  const inner = (
    <>
      <ImageBox image={{ ...item.thumbnail, ratio: '9/16' }} className="rounded-2xl" />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/10 transition group-hover:bg-ink/20">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-ink shadow transition group-hover:scale-105"><Play className="ml-0.5 h-7 w-7" /></span>
      </span>
    </>
  );
  return isRealUrl(item.url) ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group relative mx-auto block w-full max-w-[17rem] sm:mx-0" aria-label={t('watchOn', { p: label(item.platform) })}>{inner}</a>
  ) : (
    <div className="relative mx-auto block w-full max-w-[17rem] sm:mx-0">{inner}</div>
  );
}

export function MediaViewer({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  const { t } = useLocale();
  const { getProgram, mediaLabel } = useContent();
  const label = usePlatformLabel();
  if (!item) return null;
  const program = item.programId ? getProgram(item.programId) : undefined;
  const isReel = item.platform === 'instagram' && item.category === 'instagram-reel';
  return (
    <Modal open onClose={onClose} title={item.title} size="lg">
      <div className={`p-5 pt-16 sm:p-8 sm:pt-16 ${isReel ? 'grid grid-cols-1 gap-6 sm:grid-cols-[17rem_1fr] sm:items-start sm:gap-8' : 'space-y-5'}`}>
        {isReel && <ReelCover item={item} />}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <PlatformBadge platform={item.platform} />
            <span className="tag">{mediaLabel(item.category)}</span>
            <span className="tag">{item.kind === 'video' ? t('video') : t('audio')}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">{item.title}</h2>
            <p className="mt-1 text-sm text-subtle">
              {program ? <Link to={`/programs/${program.slug}`} onClick={onClose} className="hover:text-ink hover:underline">{program.name}</Link> : t('independent')}
              {item.duration && <> · <span dir="ltr">{item.duration}</span></>}
            </p>
          </div>
          {!isReel && <MediaEmbed item={item} />}
          <p className="text-sm leading-relaxed text-subtle">{item.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <ExternalCTA url={item.url} label={t(item.kind === 'video' ? 'watchOn' : 'listenOn', { p: label(item.platform) })} platform={item.platform} variant="primary" />
            <button type="button" onClick={onClose} className="btn-ghost">{t('close')}</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/** Official embed for any supported URL (e.g. a Spotify show), with an always-visible external link fallback. */
export function ShowEmbed({ url, title, linkLabel, hideLink = false }: { url: string; title: string; linkLabel?: string; hideLink?: boolean }) {
  const { t } = useLocale();
  const embed = getEmbed(url);
  return (
    <div className="space-y-3">
      {embed && (
        <div className="overflow-hidden rounded-2xl bg-canvas" style={embed.ratio ? { aspectRatio: embed.ratio } : { height: embed.height }}>
          <iframe src={embed.src} title={title} className="h-full w-full" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
        </div>
      )}
      {!hideLink && <ExternalCTA url={url} label={linkLabel ?? t('openOnSpotify')} platform="spotify" />}
    </div>
  );
}
