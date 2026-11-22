import { useParams } from 'react-router-dom';
import { socialLinks } from '../data/socialLinks';
import { contentFor } from '../i18n/LocaleContext';
import type { Locale } from '../data/types';

/**
 * Print-only CV, rendered from the same data as the site (route: #/cv-print/ar or #/cv-print/en).
 * Not linked in the navigation. Used to generate public/assets/documents/cv-<locale>.pdf:
 *   open the route in Chrome → Print → Save as PDF (A4, no margins), or run scripts/build-cv.py.
 */
const L = {
  ar: { contact: 'تواصل', summary: 'الملخّص المهني', programs: 'البرامج', experience: 'الخبرة العملية', education: 'التعليم', training: 'التدريب', skills: 'المهارات', languages: 'اللغات' },
  en: { contact: 'Contact', summary: 'Professional Summary', programs: 'Programs', experience: 'Experience', education: 'Education', training: 'Training', skills: 'Skills', languages: 'Languages' },
};

export default function CvPrint() {
  const { lang } = useParams();
  const locale: Locale = lang === 'en' ? 'en' : 'ar';
  const { profile, programs, experience, education, certifications, skillGroups, languages, professionalSummary } = contentFor(locale);
  const l = L[locale];
  const instagram = socialLinks.find((s) => s.platform === 'instagram')?.url ?? '';

  return (
    <div className="cv-sheet mx-auto bg-white text-ink" data-lang={locale} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <style>{`
        @page { size: A4; margin: 0; }
        html, body { background: #fff !important; }
        .cv-sheet { width: 210mm; min-height: 297mm; padding: 14mm 15mm 12mm; font-size: 10.5pt; line-height: 1.6; }
        .cv-sheet h1 { font-size: 26pt; line-height: 1.2; margin: 0; }
        .cv-sheet h2 { font-size: 12.5pt; margin: 0 0 2.5mm; padding-bottom: 1.5mm; border-bottom: 1.5px solid rgb(255 150 100); }
        .cv-sheet section { margin-top: 5mm; break-inside: avoid; }
        .cv-row { break-inside: avoid; }
        .cv-sheet[data-lang='ar'], .cv-sheet[data-lang='ar'] * { font-family: 'Amiri', serif; }
        .cv-sheet[data-lang='ar'] h1, .cv-sheet[data-lang='ar'] h2, .cv-sheet[data-lang='ar'] strong { font-weight: 700; }
        .cv-sheet[data-lang='en'], .cv-sheet[data-lang='en'] * { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        .cv-sheet[data-lang='en'] h1, .cv-sheet[data-lang='en'] h2 { font-family: 'Reem Kufi', sans-serif; }
        .cv-sheet[data-lang='en'] { font-size: 9.6pt; line-height: 1.5; }
        .cv-sheet[data-lang='en'] h1 { font-size: 24pt; }
      `}</style>

      <header className="flex items-start justify-between gap-6">
        <div>
          <h1>{profile.name}</h1>
          <p className="mt-1 text-[12.5pt] text-subtle">{profile.title}</p>
          <p className="mt-1 text-[11pt]">{profile.headline}</p>
        </div>
        <ul className="shrink-0 space-y-0.5 text-[9.5pt] text-subtle" dir="ltr" style={{ textAlign: locale === 'ar' ? 'left' : 'right' }}>
          <li>{profile.contact.email}</li>
          <li>{instagram.replace('https://www.', '').replace(/\/$/, '')}</li>
          <li dir={locale === 'ar' ? 'rtl' : 'ltr'}>{profile.contact.location}</li>
        </ul>
      </header>

      <section>
        <h2>{l.summary}</h2>
        <p>{professionalSummary}</p>
      </section>

      <section>
        <h2>{l.programs}</h2>
        <ul className="space-y-1.5">
          {programs.map((p) => (
            <li key={p.id} className="cv-row">
              <strong>{p.name}</strong> — {p.station}{p.period ? ` · ${p.period}` : ''}
              <span className="block text-subtle">{p.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{l.experience}</h2>
        <div className="space-y-3">
          {experience.map((e) => (
            <div key={e.id} className="cv-row">
              <div className="flex items-baseline justify-between gap-4">
                <p><strong>{e.title}</strong> — {e.organization}</p>
                {(e.start || e.end) && <p dir="ltr" className="shrink-0 text-[9.5pt] text-subtle">{[e.start, e.end].filter(Boolean).join(' – ')}</p>}
              </div>
              {e.responsibilities.length > 0 && (
                <ul className="mt-0.5 list-disc ps-5 text-[10pt]">{e.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-x-10">
        <section>
          <h2>{l.education}</h2>
          {education.map((e) => (
            <p key={e.id} className="cv-row"><strong>{e.qualification}</strong> — {e.field}<span className="block text-subtle">{e.institution} · {e.year}</span></p>
          ))}
        </section>
        <section>
          <h2>{l.training}</h2>
          {certifications.map((c) => (
            <p key={c.id} className="cv-row"><strong>{c.name}</strong><span className="block text-subtle">{c.provider}{c.instructor ? ` · ${c.instructor}` : ''}</span></p>
          ))}
        </section>
        <section>
          <h2>{l.skills}</h2>
          <p>{skillGroups.flatMap((g) => g.skills).join(' · ')}</p>
        </section>
        <section>
          <h2>{l.languages}</h2>
          {languages.map((x) => <p key={x.id}><strong>{x.language}</strong> — {x.level}</p>)}
        </section>
      </div>
    </div>
  );
}
