import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProgramFormat } from '../data/types';
import { FeaturedProgram, ProgramCard } from '../components/Cards';
import { EmptyState, FilterChips, PageHeader, ResultCount, SearchInput, SelectFilter } from '../components/ui';
import { matches } from '../lib/format';
import { useQueryState } from '../lib/useQueryState';
import { useContent, useLocale } from '../i18n/LocaleContext';

const formats: ProgramFormat[] = ['Radio', 'Podcast', 'Video'];

export default function Programs() {
  const { t } = useLocale();
  const { programs } = useContent();
  const [format, setFormat] = useQueryState('format');
  const [category, setCategory] = useQueryState('category');
  const [q, setQ] = useQueryState('q', '');
  const [, setParams] = useSearchParams();

  const categories = useMemo(() => Array.from(new Set(programs.map((p) => p.category))), [programs]);
  const filtered = programs.filter(
    (p) => (format === 'all' || p.format === format) && (category === 'all' || p.category === category) && matches(q, p.name, p.station, p.shortDescription, p.category),
  );
  const showFilters = programs.length >= 4; // filters only earn their place in a bigger archive

  return (
    <>
      <PageHeader crumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.programs') }]} title={t('nav.programs')} intro={t('programs.intro')} />
      <section className="section-wf">
        <div className="container-wf">
          {showFilters && (
            <>
              <div className="card-wf mb-8 space-y-4 p-4 sm:p-5">
                <FilterChips
                  label={t('programs.format')}
                  value={format}
                  onChange={setFormat}
                  options={[{ value: 'all', label: t('programs.allFormats'), count: programs.length }, ...formats.map((f) => ({ value: f, label: t(`format.${f}`), count: programs.filter((p) => p.format === f).length }))]}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <SearchInput value={q} onChange={setQ} placeholder={t('programs.searchPh')} />
                  <SelectFilter label={t('programs.category')} value={category} onChange={setCategory} options={[{ value: 'all', label: t('programs.allCategories') }, ...categories.map((c) => ({ value: c, label: c }))]} />
                </div>
              </div>
              <div className="mb-4"><ResultCount shown={filtered.length} total={programs.length} noun={t('noun.programs')} /></div>
            </>
          )}

          {programs.length <= 2 ? (
            <div className="space-y-6">{programs.map((p) => <FeaturedProgram key={p.id} program={p} />)}</div>
          ) : filtered.length ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => <li key={p.id}><ProgramCard program={p} /></li>)}
            </ul>
          ) : (
            <EmptyState title={t('programs.empty')} text={t('programs.emptyText')} onReset={() => setParams({}, { replace: true })} />
          )}
        </div>
      </section>
    </>
  );
}
