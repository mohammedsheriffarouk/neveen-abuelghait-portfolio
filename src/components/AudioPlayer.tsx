import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../lib/format';
import { isPlaceholder } from '../data/placeholder';
import { useLocale } from '../i18n/LocaleContext';

/** Deterministic bar heights so the waveform placeholder looks the same on every render. */
const BARS = Array.from({ length: 64 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)));

/** Waveform visualisation placeholder. `animated` is decorative only (hero). */
export function Waveform({ progress = 0, animated = false, bars = 64, className = 'h-12' }: { progress?: number; animated?: boolean; bars?: number; className?: string }) {
  const list = BARS.slice(0, bars);
  return (
    <div className={`flex w-full items-center gap-[2px] ${className}`} aria-hidden>
      {list.map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-full ${i / list.length < progress ? 'bg-accent' : 'bg-line'} ${animated ? 'wf-wave-bar' : ''}`}
          style={{ height: `${h * 100}%`, animationDelay: animated ? `${(i % 12) * 0.1}s` : undefined }}
        />
      ))}
    </div>
  );
}

/**
 * Native audio player. Real Play / Pause / seek only when `src` points to an actual file.
 * With no file it renders a clearly disabled state — it never fakes playback.
 */
export function AudioPlayer({ src, title, durationLabel }: { src?: string; title: string; durationLabel?: string }) {
  const { t } = useLocale();
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const available = !!src && !isPlaceholder(src) && !error;

  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setError(false);
  }, [src]);

  const toggle = async () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      try { await a.play(); } catch { setError(true); }
    } else a.pause();
  };

  const progress = duration ? time / duration : 0;

  return (
    <div className="card-wf p-4 text-ink sm:p-5">
      {available && (
        <audio
          ref={audio}
          src={src}
          preload="metadata"
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onError={() => setError(true)}
        />
      )}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          disabled={!available}
          aria-label={playing ? t('pause', { title }) : t('play', { title })}
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-line disabled:text-subtle"
        >
          {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="shrink-0 font-mono text-xs text-subtle" dir="ltr">
              {available ? `${formatTime(time)} / ${duration ? formatTime(duration) : durationLabel ?? '--:--'}` : durationLabel ?? '--:--'}
            </p>
          </div>
          <div className="relative mt-2">
            <Waveform progress={progress} className="h-10" />
            {available && (
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={time}
                onChange={(e) => {
                  const t = Number(e.target.value);
                  if (audio.current) audio.current.currentTime = t;
                  setTime(t);
                }}
                aria-label={t('seek')}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            )}
          </div>
        </div>
        {available && (
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? t('unmute') : t('mute')} className="btn-ghost hidden h-11 w-11 px-0 sm:inline-flex">
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        )}
      </div>
      {!available && (
        <p className="mt-3 text-xs text-subtle">
          <span className="needed">{error ? t('audioError') : t('audioNeeded')}</span>{t('audioNote')}
        </p>
      )}
    </div>
  );
}
