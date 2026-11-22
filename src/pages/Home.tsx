import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Download, Headphones, Mail } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';
import { isPlaceholder } from '../data/placeholder';
import { useContent, useLocale } from '../i18n/LocaleContext';
import { AudioPlayer, Waveform } from '../components/AudioPlayer';
import { FeaturedProgram, MediaGrid, ProgramCard } from '../components/Cards';
import { ShowEmbed } from '../components/Media';
import { ExternalCTA, ImageBox, Rings, SectionHeading, SocialLinks, flip, scrollToId } from '../components/ui';

/**
 * Home — "On Air" direction.
 * Rhythm: light hero → dark studio band (voice) → light about → programs → episodes → highlights → timeline → calm CTA.
 */
export default function Home() {
  const { t } = useLocale();
  const { profile, programs, episodes } = useContent();
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3);
  // Home shows Instagram reels only (most viewed first).
  const reels = episodes.filter((e) => e.category === 'instagram-reel').sort((a, b) => Number(!!b.topViewed) - Number(!!a.topViewed)).slice(0, 3);
  const current = programs[0];
  const c = profile.contact;
  const instagram = socialLinks.find((l) => l.platform === 'instagram')?.url ?? '';
  const a = profile.audioIntro;
  const Arrow = <ArrowRight className={`h-4 w-4 ${flip}`} />;
  const delay = (n: number) => ({ animationDelay: `${n * 90}ms` });

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
        <Rings className="pointer-events-none absolute -start-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 text-calm/60 lg:-start-24" />
        <div className="container-wf relative grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-sm font-medium backdrop-blur" style={delay(0)}>
              <span className="on-air-dot h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
              {profile.title}
            </p>
            <h1 id="hero-title" className="rise mt-6 text-5xl tracking-tight sm:text-6xl lg:text-7xl" style={delay(1)}>{profile.name}</h1>
            <p className="rise mt-6 max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl" style={delay(2)}>{profile.headline}</p>
            <p className="rise mt-4 max-w-lg text-base leading-relaxed text-subtle sm:text-lg" style={delay(3)}>{profile.intro}</p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(4)}>
              <Link to="/programs" className="btn-primary">{t('home.explore')} {Arrow}</Link>
              <button type="button" onClick={() => scrollToId('voice')} className="btn-secondary"><Headphones className="h-4 w-4" /> {t('home.listen')}</button>
            </div>
            <div className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4" style={delay(5)}>
              <SocialLinks links={socialLinks} size="sm" />
              <div className="hidden w-44 sm:block"><Waveform animated bars={28} className="h-8" /></div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="rise relative mx-auto max-w-sm lg:max-w-none" style={delay(2)}>
              {/* Coral block breaking out of the grid behind the portrait */}
              <div className="absolute -bottom-3 -start-2.5 h-full w-full rounded-[2rem] bg-accent sm:-bottom-5 sm:-start-5" aria-hidden />
              <ImageBox image={profile.heroPortrait} className="relative rounded-[2rem]" />
              {current && (
                <Link to={`/programs/${current.slug}`} className="absolute -bottom-6 end-4 z-10 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-[0_16px_40px_-20px_rgb(20_18_17/0.45)] transition hover:-translate-y-0.5 sm:end-6">
                  <span className="on-air-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="leading-tight">
                    <span className="block text-[11px] text-subtle">{t('home.nowHosting')}</span>
                    <span className="block font-display text-base font-semibold">{current.name}</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VOICE — dark studio band */}
      <section id="voice" aria-labelledby="voice-title" className="relative scroll-mt-16 overflow-hidden bg-ink text-canvas">
        <Rings className="pointer-events-none absolute -end-48 -top-48 h-[620px] w-[620px] text-white/[0.06]" />
        <div className="container-wf section-wf relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {a.image && (
            <div className="hidden lg:col-span-3 lg:block">
              <ImageBox image={a.image} className="rounded-[1.5rem] ring-1 ring-white/10" />
            </div>
          )}
          <div className={a.image ? 'lg:col-span-4' : 'lg:col-span-5'}>
            <p className="eyebrow mb-3 text-white/60">{t('home.onAir')}</p>
            <h2 id="voice-title" className="text-4xl tracking-tight sm:text-5xl">{a.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">{a.description}</p>
          </div>
          <div className={`space-y-4 ${a.image ? 'lg:col-span-5' : 'lg:col-span-7'}`}>
            {a.src || !a.spotifyUrl ? (
              <>
                <AudioPlayer src={a.src} title={t('voiceIntro', { name: profile.shortName })} durationLabel={a.duration} />
                {a.spotifyUrl && <ExternalCTA url={a.spotifyUrl} label={t('openShowOnSpotify')} platform="spotify" className="btn-on-dark" />}
              </>
            ) : (
              <ShowEmbed url={a.spotifyUrl} title={profile.shortName} />
            )}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section id="about" aria-labelledby="about-title" className="section-wf scroll-mt-16">
        <div className="container-wf grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -start-4 -top-4 h-24 w-24 rounded-full bg-calm sm:-start-6 sm:-top-6 sm:h-32 sm:w-32" aria-hidden />
              <ImageBox image={profile.aboutImage} className="relative rounded-[2rem]" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">{t('nav.about')}</p>
            <h2 id="about-title" className="text-4xl tracking-tight sm:text-5xl">{t('home.about', { name: profile.shortName })}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-subtle sm:text-lg">
              {profile.aboutPreview.split('\n\n').map((para, i) => <p key={i} className={i === 0 ? 'text-ink' : ''}>{para}</p>)}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {profile.highlights.map((h) => (
                <div key={h.id} className="bg-surface p-5">
                  <dd dir="ltr" className="text-start font-display text-4xl font-semibold rtl:text-end">{h.value}</dd>
                  <dt className="mt-1 text-xs text-subtle">{h.label}</dt>
                </div>
              ))}
            </dl>
            <a href={profile.cvPdf} download className="btn-secondary mt-10"><Download className="h-4 w-4" /> {t('exp.download')}</a>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section-wf border-t border-line bg-surface">
        <div className="container-wf">
          <SectionHeading eyebrow={t('nav.programs')} title={t('home.programsTitle')} intro={t('home.programsIntro')}
            action={<Link to="/programs" className="btn-ghost">{t('home.allPrograms')} {Arrow}</Link>} />
          {featuredPrograms.length <= 2 ? (
            <div className="space-y-6">{featuredPrograms.map((p) => <FeaturedProgram key={p.id} program={p} />)}</div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPrograms.map((p) => <li key={p.id}><ProgramCard program={p} /></li>)}
            </ul>
          )}
        </div>
      </section>

      {/* EPISODES */}
      <section className="section-wf">
        <div className="container-wf">
          <SectionHeading eyebrow={t('platform.instagram')} title={t('home.episodesTitle')} intro={t('home.episodesIntro')}
            action={<Link to="/media?category=instagram-reel" className="btn-ghost">{t('home.library')} {Arrow}</Link>} />
          <MediaGrid items={reels} cols="sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      {/* CONTACT CTA */}
      <section aria-labelledby="cta-title" className="pb-20 sm:pb-28">
        <div className="container-wf">
          <div className="relative grid grid-cols-1 gap-10 overflow-hidden rounded-[2rem] bg-calm p-8 sm:p-14 lg:grid-cols-2 lg:items-center">
            <Rings className="pointer-events-none absolute -bottom-48 -start-40 h-[520px] w-[520px] text-white/60" />
            <div className="relative">
              <p className="eyebrow mb-3 text-ink/70">{t('home.collab')}</p>
              <h2 id="cta-title" className="text-4xl tracking-tight sm:text-5xl">{t('home.ctaTitle')}</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{t('home.ctaText')}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">{t('home.ctaInquiry')} {Arrow}</Link>
                <Link to="/contact?type=booking" className="btn-secondary">{t('home.ctaBooking')}</Link>
              </div>
            </div>
            <ul className="relative space-y-3 text-sm">
              <li className="flex items-center gap-3 rounded-2xl bg-surface/90 p-4">
                <Mail className="h-5 w-5 text-accent" />
                {isPlaceholder(c.email) ? <span className="text-subtle">{c.email}</span> : <a href={`mailto:${c.email}`} dir="ltr" className="break-all hover:underline">{c.email}</a>}
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-surface/90 p-4">
                <Camera className="h-5 w-5 text-accent" />
                <a href={instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:underline">@neveenabuelghait</a>
              </li>
              <li className="pt-2"><SocialLinks links={socialLinks} size="sm" /></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
