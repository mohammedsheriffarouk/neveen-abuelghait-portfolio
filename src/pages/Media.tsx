import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MediaCategory } from '../data/types';
import { MediaGrid } from '../components/Cards';
import { EmptyState, FilterChips, PageHeader, ResultCount, SearchInput, SectionHeading, SelectFilter, usePlatformLabel } from '../components/ui';
import { matches } from '../lib/format';
import { useQueryState } from '../lib/useQueryState';
import { useContent, useLocale } from '../i18n/LocaleContext';

export default function Media() {
  const { t } = useLocale();
  const { episodes, mediaCategories, programs } = useContent();
  const label = usePlatformLabel();
  const [category, setCategory] = useQueryState('category');
  const [program, setProgram] = useQueryState('program');
  const [platform, setPlatform] = useQueryState('platform');
  const [q, setQ] = useQueryState('q', '');
  const [, setParams] = useSearchParams();

  const platforms = useMemo(() => Array.from(new Set(episodes.map((e) => e.platform))), [episodes]);
  const featured = episodes.filter((e) => e.featured).slice(0, 4);
  const anyFilter = category !== 'all' || program !== 'all' || platform !== 'all' || q !== '';
  const reset = () => setParams({}, { replace: true });

  const filtered = episodes.filter(
    (e) =>
      (category === 'all' || e.category === category) &&
      (program === 'all' || (program === 'none' ? !e.programId : e.programId === program)) &&
      (platform === 'all' || e.platform === platform) &&
      matches(q, e.title),
  );

  return (
    <>
      <PageHeader crumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.media') }]} title={t('nav.media')} intro={t('media.intro')} />

      {!anyFilter && (
        <section className="section-wf border-b border-line">
          <div className="container-wf">
            <SectionHeading eyebrow={t('media.featuredEyebrow')} title={t('media.featured')} />
            <MediaGrid items={featured} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        </section>
      )}

      <section className="section-wf">
        <div className="container-wf">
          <SectionHeading eyebrow={t('media.libraryEyebrow')} title={t('media.all')} />
          <div className="card-wf mb-8 space-y-4 p-4 sm:p-5">
            <FilterChips<'all' | MediaCategory>
              label={t('media.category')}
              value={category as 'all' | MediaCategory}
              onChange={setCategory}
              options={[
                { value: 'all', label: t('all'), count: episodes.length },
                ...mediaCategories.map((c) => ({ value: c.id, label: c.label, count: episodes.filter((e) => e.category === c.id).length })).filter((o) => o.count > 0),
              ]}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SearchInput value={q} onChange={setQ} placeholder={t('media.searchPh')} label={t('media.searchLabel')} />
              <SelectFilter
                label={t('media.program')}
                value={program}
                onChange={setProgram}
                options={[{ value: 'all', label: t('media.allPrograms') }, ...programs.map((p) => ({ value: p.id, label: p.name })), ...(episodes.some((e) => !e.programId) ? [{ value: 'none', label: t('media.noProgram') }] : [])]}
              />
              <SelectFilter label={t('media.platform')} value={platform} onChange={setPlatform} options={[{ value: 'all', label: t('media.allPlatforms') }, ...platforms.map((p) => ({ value: p, label: label(p) }))]} />
            </div>
            {anyFilter && <button type="button" onClick={reset} className="btn-ghost -ms-3">{t('resetFilters')}</button>}
          </div>

          <div className="mb-4"><ResultCount shown={filtered.length} total={episodes.length} noun={t('noun.items')} /></div>
          {filtered.length ? <MediaGrid items={filtered} /> : <EmptyState title={t('media.empty')} text={t('media.emptyText')} onReset={reset} />}
        </div>
      </section>
    </>
  );
}
