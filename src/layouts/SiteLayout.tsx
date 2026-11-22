import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp, Languages, Mail, MapPin, Menu, X } from 'lucide-react';
import { InstagramIcon } from '../components/BrandIcons';
import { mainNav, secondaryNav } from '../data/navigation';
import { socialLinks } from '../data/socialLinks';
import { isPlaceholder } from '../data/placeholder';
import { SocialLinks } from '../components/ui';
import { useContent, useLocale } from '../i18n/LocaleContext';

function Logo({ onDark = false }: { onDark?: boolean }) {
  const { profile } = useContent();
  const { t } = useLocale();
  // Temporary wordmark (name in the display face + on-air dot) until a real logo exists.
  return (
    <Link to="/" className="group inline-flex items-center gap-2" aria-label={t('logoHome', { name: profile.shortName })}>
      <span className={`font-display text-lg font-semibold sm:text-xl ${onDark ? 'text-canvas' : 'text-ink'}`}>{profile.shortName}</span>
      <span className="h-2.5 w-2.5 rounded-full bg-accent transition group-hover:scale-125" aria-hidden />
    </Link>
  );
}

/** Switches Arabic ⇄ English. Shows the name of the *other* language in its own script. */
function LangToggle({ className = '' }: { className?: string }) {
  const { t, toggle, locale } = useLocale();
  return (
    <button type="button" onClick={toggle} aria-label={t('switchLangLabel')} lang={locale === 'ar' ? 'en' : 'ar'} className={`btn-ghost min-h-[40px] gap-1.5 px-3 ${className}`}>
      <Languages className="h-4 w-4" aria-hidden />
      {t('switchLang')}
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLocale();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-xl px-4 py-2 text-sm transition ${isActive ? 'bg-surface font-semibold text-ink' : 'text-subtle hover:bg-surface/60 hover:text-ink'}`;

  return (
    // No backdrop-filter on the header: it would make the fixed mobile menu relative to the 64px header.
    <header className="sticky top-0 z-50 isolate bg-canvas">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        {t('skip')}
      </a>
      <div className="container-wf flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label={t('nav.main')} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((n) => (
              <li key={n.to}><NavLink to={n.to} end={n.to === '/'} className={linkCls}>{t(n.key)}</NavLink></li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-1 lg:flex">
          <LangToggle />
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <LangToggle className="px-2.5 text-xs" />
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t('closeMenu') : t('openMenu')} className="btn-ghost h-11 w-11 px-0">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-line bg-surface lg:hidden">
          <nav aria-label={t('nav.mobile')} className="container-wf py-4">
            <ul className="divide-y divide-line">
              {[...mainNav, ...secondaryNav].map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex min-h-[52px] items-center justify-between text-base ${isActive ? 'font-semibold' : 'text-subtle'}`}>
                    {({ isActive }) => (
                      <>
                        {t(n.key)}
                        {isActive && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="wf-label mb-2">{t('follow')}</p>
              <SocialLinks links={socialLinks} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { profile } = useContent();
  const { t } = useLocale();
  const c = profile.contact;
  const instagram = socialLinks.find((l) => l.platform === 'instagram')?.url;
  return (
    <footer className="container-wf pb-6">
      <div className="grid grid-cols-1 gap-10 rounded-3xl bg-surface p-8 sm:p-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 font-display text-xl">{profile.headline}</p>
          <p className="mt-2 max-w-sm text-sm text-subtle">{profile.title}</p>
          <div className="mt-6 [&_a]:bg-canvas"><SocialLinks links={socialLinks} size="sm" /></div>
        </div>
        <nav aria-label={t('nav.footer')} className="md:col-span-3">
          <p className="mb-4 text-sm font-medium text-subtle">{t('navigate')}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            {[...mainNav, ...secondaryNav].map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:underline">{t(n.key)}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="mb-4 text-sm font-medium text-subtle">{t('contact')}</p>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-subtle" />{isPlaceholder(c.email) ? <span>{c.email}</span> : <a href={`mailto:${c.email}`} dir="ltr" className="break-all hover:underline">{c.email}</a>}</li>
            <li className="flex items-center gap-2"><InstagramIcon className="h-4 w-4 text-subtle" /><a href={instagram} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:underline">@neveenabuelghait</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-subtle" />{c.location}</li>
          </ul>
          <Link to="/contact" className="btn-primary mt-6">{t('getInTouch')}</Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 pt-5 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. {t('rights')}</p>
        <p>{t('prototype')}</p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      aria-label={t('backToTop')}
      className={`fixed bottom-5 end-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white shadow-lg transition ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/** Resets scroll on route change (query-only changes, like filters, keep position). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
