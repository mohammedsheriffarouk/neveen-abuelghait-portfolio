import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

export default function NotFound() {
  const { t } = useLocale();
  return (
    <section className="section-wf">
      <div className="container-wf flex flex-col items-center gap-4 py-16 text-center">
        <p className="font-mono text-sm text-subtle">404</p>
        <h1 className="text-3xl font-semibold">{t('nf.title')}</h1>
        <p className="text-sm text-subtle">{t('nf.text')}</p>
        <Link to="/" className="btn-primary mt-2">{t('nf.back')}</Link>
      </div>
    </section>
  );
}
