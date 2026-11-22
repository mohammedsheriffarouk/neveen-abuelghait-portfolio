import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, Mail, Play } from 'lucide-react';
import { InstagramIcon } from '../components/BrandIcons';
import { socialLinks } from '../data/socialLinks';
import { isPlaceholder } from '../data/placeholder';
import type { Profile } from '../data/types';
import { useContent, useLocale } from '../i18n/LocaleContext';
import { AudioPlayer } from '../components/AudioPlayer';
import { FeaturedProgram, MediaGrid, ProgramCard } from '../components/Cards';
import { ShowEmbed } from '../components/Media';
import { GuestsStrip } from '../components/Guests';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { Modal } from '../components/Modal';
import { ImageBox, SectionHeading, SocialLinks, flip, scrollToId } from '../components/ui';

type PressFeature = NonNullable<Profile['pressFeatures']>[number];

/**
 * Press feature — a full-width banner (logo over the real cover photo), closed by default.
 * Clicking it opens the actual video in a modal, so the section reads as a single clean reveal.
 */
function PressFeatureCard({ f }: { f: PressFeature }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  return (
    <section aria-labelledby={`${f.id}-title`} className="container-wf pb-16 sm:pb-24">
      <div className="overflow-hidden rounded-3xl bg-ink">
        <button type="button" onClick={() => setOpen(true)} className="group relative block w-full text-start">
          <ImageBox image={{ ...f.cover, ratio: '16/9' }} className="transition duration-500 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" aria-hidden />
          <span className="absolute start-4 top-4 inline-flex items-center rounded-lg bg-ink/80 px-3 py-1.5 backdrop-blur sm:start-6 sm:top-6">
            <img src={f.logo} alt={f.logoName} className="h-4 w-auto sm:h-5" />
          </span>
          <span className="absolute end-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-ink shadow transition group-hover:scale-105 sm:end-6 sm:top-6 sm:h-14 sm:w-14">
            <Play className="ms-0.5 h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8">
            <span className="wf-label text-white/70">{t('home.featuredEyebrow')}</span>
            <h2 id={`${f.id}-title`} className="mt-1 font-display text-2xl font-semibold text-white sm:text-4xl">{f.title}</h2>
          </span>
        </button>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{f.description}</p>
          <a href={f.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
            {t('home.viewOnInstagram')} <ArrowRight className={`h-4 w-4 ${flip}`} aria-hidden />
          </a>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={f.title} size="lg" dark>
        <div className="p-4 pt-16 sm:p-8 sm:pt-16">
          {f.video ? (
            <video
              src={f.video}
              poster={f.cover.src}
              autoPlay
              controls
              playsInline
              aria-label={f.title}
              className="mx-auto block max-h-[75vh] w-auto rounded-2xl bg-black"
              style={{ aspectRatio: '9/16' }}
            >
              <a href={f.instagramUrl} target="_blank" rel="noopener noreferrer">{t('home.viewOnInstagram')}</a>
            </video>
          ) : (
            <InstagramEmbed url={f.instagramUrl} cover={f.cover} label={f.title} />
          )}
          <div className="mt-5 flex justify-center">
            <a href={f.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              {t('home.viewOnInstagram')} <ArrowRight className={`h-4 w-4 ${flip}`} aria-hidden />
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}

/**
 * Home — "Soft Lavender".
 * Light grey page, white rounded surfaces, one lavender accent.
 */
export default function Home() {
  const { t } = useLocale();
  const { profile, programs, episodes, guests } = useContent();
  const aff = profile.affiliations ?? [];
  const academicAff = aff.filter((o) => o.group !== 'training');
  const trainingAff = aff.filter((o) => o.group === 'training');
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3);
  const reels = episodes.filter((e) => e.category === 'instagram-reel').sort((a, b) => Number(!!b.topViewed) - Number(!!a.topViewed)).slice(0, 3);
  const current = programs[0];
  const services = profile.services ?? [];
  const pressFeatures = profile.pressFeatures ?? [];
  const c = profile.contact;
  const a = profile.audioIntro;
  const instagram = socialLinks.find((l) => l.platform === 'instagram')?.url ?? '';
  const Arrow = <ArrowRight className={`h-4 w-4 ${flip}`} />;
  const delay = (n: number) => ({ animationDelay: `${n * 90}ms` });

  return (
    <>
      {/* HERO — portrait + stacked topic pills */}
      <section aria-labelledby="hero-title" className="container-wf pb-16 pt-6 sm:pt-8 lg:pb-24">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2 lg:gap-10">
          {/* Text column (start side) */}
          <div className="order-2 flex flex-col items-center justify-between gap-10 rounded-3xl py-6 text-center lg:order-1 lg:py-10">
            <div className="rise" style={delay(0)}>
              <h1 id="hero-title" className="text-5xl sm:text-6xl">{profile.name}</h1>
              <div className="mx-auto mt-4 h-px w-12 bg-ink/20" aria-hidden />
              <p className="mt-4 text-sm tracking-wide text-subtle sm:text-base">{profile.title}</p>
            </div>

            <div className="rise flex flex-col items-center gap-5" style={delay(1)}>
              <p className="max-w-sm text-base leading-relaxed text-subtle">{profile.intro}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                <Link to="/programs" className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2">{t('home.seePrograms')}</Link>
                <button type="button" onClick={() => scrollToId('voice')} className="inline-flex items-center gap-1.5 font-medium underline decoration-1 underline-offset-4 hover:decoration-2">
                  <Headphones className="h-4 w-4" /> {t('home.listen')}
                </button>
              </div>
            </div>
          </div>

          {/* Portrait (end side) */}
          <div className="rise order-1 lg:order-2 lg:self-center" style={delay(1)}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
            <ImageBox image={profile.heroPortrait} className="rounded-3xl" />
            {current && (
              <Link to={`/programs/${current.slug}`} className="absolute bottom-4 start-4 flex items-center gap-3 rounded-2xl bg-surface/95 px-4 py-3 backdrop-blur transition hover:-translate-y-0.5 sm:bottom-6 sm:start-6">
                <span className="on-air-dot h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden />
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

      {/* VOICE */}
      <section id="voice" aria-labelledby="voice-title" className="container-wf scroll-mt-20 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-ink p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-12">
          {a.image && (
            <div className="hidden lg:col-span-3 lg:block">
              <ImageBox image={a.image} className="rounded-2xl" />
            </div>
          )}
          <div className={a.image ? 'lg:col-span-4' : 'lg:col-span-5'}>
            <p className="eyebrow mb-3 text-white/60">{t('home.onAir')}</p>
            <h2 id="voice-title" className="text-3xl tracking-tight text-white sm:text-4xl">{a.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">{a.description}</p>
          </div>
          <div className={`space-y-4 ${a.image ? 'lg:col-span-5' : 'lg:col-span-7'}`}>
            {a.src || !a.spotifyUrl ? (
              <>
                <div className="[&>.card-wf]:bg-canvas"><AudioPlayer src={a.src} title={t('voiceIntro', { name: profile.shortName })} durationLabel={a.duration} /></div>
                {a.spotifyUrl && (
                  <a href={a.spotifyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary bg-canvas" aria-label={t('openShowOnSpotify')}>
                    {t('home.fullOnSpotify')} <img src="assets/images/logos/spotify.png" alt="Spotify" className="h-5 w-auto" />
                  </a>
                )}
              </>
            ) : (
              <ShowEmbed url={a.spotifyUrl} title={profile.shortName} />
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" aria-labelledby="about-title" className="container-wf scroll-mt-20 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ImageBox image={profile.aboutImage} className="mx-auto max-w-sm rounded-3xl lg:sticky lg:top-24 lg:max-w-none" />
          </div>
          <div className="rounded-3xl bg-surface p-6 sm:p-10 lg:col-span-7">
            <p className="eyebrow mb-3">{t('nav.about')}</p>
            <h2 id="about-title" className="text-3xl tracking-tight sm:text-4xl">{t('home.about', { name: profile.shortName })}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-subtle sm:text-lg">
              {profile.aboutPreview.split('\n\n').map((para, i) => <p key={i} className={i === 0 ? 'text-ink' : ''}>{para}</p>)}
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.highlights.map((h, i) => (
                <div key={h.id} className={`rounded-2xl p-4 ${i === 0 ? 'bg-accent' : 'bg-canvas'}`}>
                  <dd dir="ltr" className="text-start font-display text-3xl font-medium rtl:text-end">{h.value}</dd>
                  <dt className="mt-1 text-xs text-subtle">{h.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FEATURED — full-width banner (logo, then the cover photo); clicking it opens the actual video */}
      {pressFeatures.map((f) => <PressFeatureCard key={f.id} f={f} />)}

      {/* BACKGROUND — academic/professional history, then media training, as two grouped logo rows */}
      {aff.length > 0 && (
        <section aria-labelledby="academic-title" className="container-wf pb-16 sm:pb-24">
          <div className="rounded-3xl bg-surface px-6 py-10 sm:px-12 sm:py-12">
            {academicAff.length > 0 && (
              <div className={trainingAff.length > 0 ? 'mb-10' : ''}>
                <h2 id="academic-title" className="mb-6 text-center text-xl font-semibold tracking-tight sm:text-2xl">{t('home.academicTitle')}</h2>
                <ul className="grid grid-cols-1 border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-ink/10 sm:rtl:divide-x-reverse">
                  {academicAff.map((o) => (
                    <li key={o.id} className="group flex flex-col items-center justify-center gap-3 px-4 py-6 text-center">
                      <div className="flex h-16 items-center justify-center">
                        {o.logo ? (
                          <img src={o.logo} alt={o.name} loading="lazy" className="max-h-14 w-auto max-w-[10rem] object-contain opacity-80 grayscale contrast-125 transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100" />
                        ) : (
                          <span dir="ltr" className="whitespace-nowrap font-serif text-xl font-semibold tracking-wide text-ink/70 transition group-hover:text-ink sm:text-[1.7rem]">{o.name}</span>
                        )}
                      </div>
                      <span className="text-xs tracking-wide text-subtle">{o.caption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {trainingAff.length > 0 && (
              <div className={academicAff.length > 0 ? 'border-t border-ink/10 pt-10' : ''}>
                <h2 className="mb-6 text-center text-xl font-semibold tracking-tight sm:text-2xl">{t('home.trainingTitle')}</h2>
                <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                  {trainingAff.map((o) => (
                    <li key={o.id} className="group flex flex-col items-center justify-center gap-3 px-4 text-center">
                      <div className="flex h-16 items-center justify-center">
                        {o.logo ? (
                          <img src={o.logo} alt={o.name} loading="lazy" className="max-h-14 w-auto max-w-[10rem] object-contain opacity-80 grayscale contrast-125 transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100" />
                        ) : (
                          <span dir="ltr" className="whitespace-nowrap font-serif text-xl font-semibold tracking-wide text-ink/70 transition group-hover:text-ink sm:text-[1.7rem]">{o.name}</span>
                        )}
                      </div>
                      <span className="text-xs tracking-wide text-subtle">{o.caption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PROGRAMS */}
      <section className="container-wf pb-16 sm:pb-24">
        <SectionHeading eyebrow={t('nav.programs')} title={t('home.programsTitle')} intro={t('home.programsIntro')}
          action={<Link to="/programs" className="btn-secondary">{t('home.allPrograms')} {Arrow}</Link>} />
        {featuredPrograms.length <= 2 ? (
          <div className="space-y-6">{featuredPrograms.map((p) => <FeaturedProgram key={p.id} program={p} />)}</div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((p) => <li key={p.id}><ProgramCard program={p} /></li>)}
          </ul>
        )}
      </section>

      {/* GUESTS — photos from the studio */}
      {guests.length > 0 && (
        <section aria-labelledby="guests-title" className="container-wf pb-16 sm:pb-24">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <p className="eyebrow mb-3">{t('home.guestsEyebrow')}</p>
            <h2 id="guests-title" className="text-3xl tracking-tight sm:text-4xl">{t('home.guestsTitle')}</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-subtle">{t('home.guestsIntro')}</p>
          </div>
          <GuestsStrip items={guests} />
        </section>
      )}

      {/* INSTAGRAM */}
      <section className="container-wf pb-16 sm:pb-24">
        <SectionHeading eyebrow={t('platform.instagram')} title={t('home.episodesTitle')} intro={t('home.episodesIntro')}
          action={<a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t('home.library')} {Arrow}</a>} />
        <MediaGrid items={reels} cols="sm:grid-cols-2 lg:grid-cols-3" />
      </section>

      {/* WORK WITH ME — collaboration offerings + contact */}
      <section aria-labelledby="cta-title" className="container-wf pb-20 sm:pb-28">
        <div className="rounded-3xl bg-accent p-8 sm:p-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-ink/70 before:bg-ink">{t('home.collab')}</p>
            <h2 id="cta-title" className="text-4xl tracking-tight sm:text-5xl">{t('home.ctaTitle')}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75">{t('home.ctaText')}</p>
          </div>

          {services.length > 0 && (
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.id} className="rounded-2xl bg-surface p-5">
                  <span dir="ltr" className="font-display text-sm font-semibold text-subtle">{s.number}</span>
                  <p className="mt-2 font-medium">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-subtle">{s.text}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">{t('home.ctaInquiry')} {Arrow}</Link>
              <Link to="/contact?type=booking" className="btn-secondary">{t('home.ctaBooking')}</Link>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                <Mail className="h-5 w-5" />
                {isPlaceholder(c.email) ? <span className="text-subtle">{c.email}</span> : <a href={`mailto:${c.email}`} dir="ltr" className="break-all hover:underline">{c.email}</a>}
              </li>
              <li className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                <InstagramIcon className="h-5 w-5" />
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
