import { Link, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Disc3, Mic, Radio } from 'lucide-react';
import { MediaGrid } from '../components/Cards';
import { ShowEmbed } from '../components/Media';
import { AudioPlayer } from '../components/AudioPlayer';
import { GalleryGrid } from '../components/Gallery';
import { Breadcrumbs, EmptyState, ExternalCTA, ImageBox, SectionHeading, flip } from '../components/ui';
import { useContent, useLocale } from '../i18n/LocaleContext';

export default function ProgramDetail() {
  const { slug } = useParams();
  const { t } = useLocale();
  const { programs, episodes, getProgram, getGalleryItems } = useContent();
  const program = getProgram(slug);

  if (!program) {
    return (
      <div className="container-wf section-wf">
        <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('nav.programs'), to: '/programs' }, { label: t('program.notFound') }]} />
        <h1 className="mb-6 text-3xl font-semibold">{t('program.notFound')}</h1>
        <EmptyState title={t('program.notFound')} text={t('program.notFoundText', { slug: slug ?? '' })} />
        <div className="mt-6 text-center"><Link to="/programs" className="btn-primary">{t('program.back')}</Link></div>
      </div>
    );
  }

  const idx = programs.findIndex((p) => p.id === program.id);
  const prev = programs[(idx - 1 + programs.length) % programs.length];
  const next = programs[(idx + 1) % programs.length];

  const own = episodes.filter((e) => e.programId === program.id);
  const featured = [...own].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);
  const featuredIds = new Set(featured.map((f) => f.id));
  const remaining = own.filter((e) => !featuredIds.has(e.id));
  const sameFormat = new Set(programs.filter((p) => p.format === program.format && p.id !== program.id).map((p) => p.id));
  const related = [...remaining, ...episodes.filter((e) => e.programId && sameFormat.has(e.programId))].slice(0, 3);
  const photos = getGalleryItems(program.galleryIds);
  const spotify = program.externalLinks.find((l) => l.platform === 'spotify');

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-wf py-10 sm:py-14">
          <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('nav.programs'), to: '/programs' }, { label: program.name }]} />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <ImageBox image={program.cover} className="mx-auto max-w-md rounded-xl border border-line lg:max-w-none" />
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-1.5">
                <span className="tag">{t(`format.${program.format}`)}</span>
                <span className="tag">{program.category}</span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{program.name}</h1>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: <Radio className="h-4 w-4" />, label: t('program.station'), value: program.station },
                  { icon: <Mic className="h-4 w-4" />, label: t('program.role'), value: program.role },
                  { icon: <Calendar className="h-4 w-4" />, label: t('program.period'), value: program.period },
                  { icon: <Disc3 className="h-4 w-4" />, label: t('program.count'), value: program.episodesCount },
                ].filter((f) => f.value).map((f) => <Fact key={f.label} {...f} />)}
              </dl>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-subtle sm:text-base">
                {program.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {program.audio && (
                <div className="mt-6">
                  <p className="wf-label mb-2">{t('listen')}</p>
                  <AudioPlayer src={program.audio.src} title={program.audio.title} durationLabel={program.audio.duration} />
                </div>
              )}
              {program.externalLinks.length > 0 && (
                <div className="mt-6">
                  <p className="wf-label mb-2">{t('program.listenOn')}</p>
                  <div className="flex flex-wrap gap-2">
                    {program.externalLinks.map((l) => <ExternalCTA key={l.label} url={l.url} label={l.label} platform={l.platform} />)}
                  </div>
                </div>
              )}
              {spotify && <div className="mt-6"><ShowEmbed url={spotify.url} title={program.name} hideLink /></div>}
            </div>
          </div>
        </div>
      </header>

      <section className="section-wf">
        <div className="container-wf">
          <SectionHeading eyebrow={t('program.featured')} title={t('program.startHere')}
            action={<Link to={`/media?program=${program.id}`} className="btn-ghost">{t('program.allEpisodes')} <ArrowRight className={`h-4 w-4 ${flip}`} /></Link>} />
          {featured.length ? <MediaGrid items={featured} /> : <EmptyState title={t('program.noEpisodes')} />}
        </div>
      </section>

      <section className="section-wf border-y border-line bg-surface">
        <div className="container-wf">
          <SectionHeading eyebrow={t('program.gallery')} title={t('program.onSet')} />
          {photos.length ? <GalleryGrid items={photos} columns="columns-2 md:columns-3" /> : <EmptyState title={t('program.noPhotos')} />}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-wf">
          <div className="container-wf">
            <SectionHeading eyebrow={t('program.related')} title={t('program.mayLike')} />
            <MediaGrid items={related} />
          </div>
        </section>
      )}

      <nav aria-label={t('program.nav')} className="border-t border-line bg-surface">
        <div className="container-wf grid grid-cols-1 gap-3 py-8 sm:grid-cols-3 sm:items-center">
          {programs.length > 1 ? (
            <Link to={`/programs/${prev.slug}`} className="btn-ghost justify-start"><ArrowLeft className={`h-4 w-4 ${flip}`} /> <span className="truncate">{prev.name}</span></Link>
          ) : <span />}
          <Link to="/programs" className="btn-secondary justify-self-center">{t('program.all')}</Link>
          {programs.length > 1 && (
            <Link to={`/programs/${next.slug}`} className="btn-ghost justify-end"><span className="truncate">{next.name}</span> <ArrowRight className={`h-4 w-4 ${flip}`} /></Link>
          )}
        </div>
      </nav>
    </>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-md border border-line p-3">
      <span className="mt-0.5 text-subtle">{icon}</span>
      <div>
        <dt className="wf-label">{label}</dt>
        <dd className="mt-0.5 text-sm">{value}</dd>
      </div>
    </div>
  );
}
