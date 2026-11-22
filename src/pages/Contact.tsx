import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { InstagramIcon } from '../components/BrandIcons';
import { socialLinks } from '../data/socialLinks';
import { isPlaceholder } from '../data/placeholder';
import { ExternalCTA, PageHeader, scrollToId, usePlatformLabel } from '../components/ui';
import { useContent, useLocale } from '../i18n/LocaleContext';
import type { UIKey } from '../i18n/ui';

const inquiryTypes = ['booking', 'collaboration', 'media', 'podcast', 'voice', 'other'] as const;

type Fields = { name: string; email: string; subject: string; type: string; message: string };
type Errors = Partial<Record<keyof Fields, UIKey>>;
const EMPTY: Fields = { name: '', email: '', subject: '', type: '', message: '' };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'err.name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'err.email';
  if (f.subject.trim().length < 3) e.subject = 'err.subject';
  if (!f.type) e.type = 'err.type';
  if (f.message.trim().length < 20) e.message = 'err.message';
  return e;
}

export default function Contact() {
  const { t } = useLocale();
  const { profile } = useContent();
  const label = usePlatformLabel();
  const [params] = useSearchParams();
  const preset = params.get('type') ?? '';
  const valid = (v: string) => (inquiryTypes as readonly string[]).includes(v);
  const [fields, setFields] = useState<Fields>({ ...EMPTY, type: valid(preset) ? preset : '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const c = profile.contact;

  useEffect(() => {
    if (valid(preset)) {
      setFields((f) => ({ ...f, type: preset }));
      setTimeout(() => scrollToId('inquiry'), 50);
    }
  }, [preset]);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...fields, [k]: e.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => () => {
    setTouched((x) => ({ ...x, [k]: true }));
    setErrors(validate(fields));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, type: true, message: true });
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const typeLabel = fields.type ? t(`type.${fields.type}` as UIKey) : '';

    // Sent directly from the site (no mail app opens for the visitor) via FormSubmit's
    // mail-relay endpoint — it delivers straight to Neveen's inbox below. One-time setup:
    // the first submission makes FormSubmit email c.email an "activate this form" link;
    // once clicked, every submission after that is delivered automatically.
    if (!isPlaceholder(c.email)) {
      setSending(true);
      setSendError(false);
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(c.email)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            subject: `[${typeLabel}] ${fields.subject}`,
            type: typeLabel,
            message: fields.message,
            _subject: `New website inquiry — ${fields.subject}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
        if (!res.ok) throw new Error('bad status');
        setSent(true);
      } catch {
        // Fallback so nothing gets lost: open the visitor's mail app with the message pre-filled.
        setSendError(true);
        const body = `${fields.message}\n\n— ${fields.name}\n${fields.email}${typeLabel ? `\n${t('contact.type')}: ${typeLabel}` : ''}`;
        window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(`[${typeLabel}] ${fields.subject}`)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      } finally {
        setSending(false);
      }
    } else {
      setSent(true);
    }
  };

  const reset = () => {
    setFields(EMPTY);
    setErrors({});
    setTouched({});
    setSent(false);
  };

  const err = (k: keyof Fields) => (touched[k] && errors[k] ? t(errors[k]!) : undefined);

  const methods = [
    { icon: <Mail className="h-5 w-5" />, label: t('contact.email'), value: c.email, href: isPlaceholder(c.email) ? '' : `mailto:${c.email}` },
    { icon: <InstagramIcon className="h-5 w-5" />, label: t('contact.instagram'), value: '@neveenabuelghait', href: socialLinks.find((l) => l.platform === 'instagram')?.url ?? '' },
    { icon: <MapPin className="h-5 w-5" />, label: t('contact.basedIn'), value: c.location, href: '' },
  ];

  return (
    <>
      <PageHeader crumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.contact') }]} title={t('contact.title')} intro={c.intro} />

      <section className="section-wf">
        <div className="container-wf grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-5">
            <ul className="space-y-3">
              {methods.map((m) => (
                <li key={m.label} className="card-wf flex items-center gap-4 p-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">{m.icon}</span>
                  <div className="min-w-0">
                    <p className="wf-label">{m.label}</p>
                    {m.href ? (
                      <a href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" dir="ltr" className="break-all text-sm font-medium hover:underline">{m.value}</a>
                    ) : (
                      <p className="truncate text-sm font-medium">{m.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <p className="wf-label mb-3">{t('contact.social')}</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {socialLinks.map((s) => (
                  <li key={s.platform}><ExternalCTA url={s.url} label={label(s.platform)} platform={s.platform} className="w-full justify-start" /></li>
                ))}
              </ul>
            </div>

            <div className="card-wf border-dashed p-5">
              <p className="wf-label mb-1">{t('contact.bookings')}</p>
              <p className="text-sm text-subtle">{c.availability}</p>
              <button type="button" onClick={() => { setFields((f) => ({ ...f, type: 'booking' })); scrollToId('inquiry'); }} className="btn-primary mt-4 w-full">
                {t('contact.sendBooking')}
              </button>
            </div>
          </aside>

          <div id="inquiry" className="scroll-mt-24 lg:col-span-7">
            <div className="card-wf p-5 sm:p-8">
              {sent ? (
                <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 className="h-12 w-12" />
                  <h2 className="text-2xl font-semibold">{t('contact.thanks', { name: fields.name.split(' ')[0] })}</h2>
                  <p className="max-w-md text-sm text-subtle">{t(sendError ? 'contact.passedFallback' : 'contact.passed')}</p>
                  <p className="max-w-md text-sm text-subtle">
                    {t('contact.demo')}{' '}
                    <a href={`mailto:${c.email}`} dir="ltr" className="font-medium text-ink underline">{c.email}</a>
                  </p>
                  <button type="button" onClick={reset} className="btn-secondary mt-4">{t('contact.another')}</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} noValidate className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold">{t('contact.formTitle')}</h2>
                    <p className="mt-1 text-xs text-subtle">{t('contact.required')}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label={t('contact.name')} id="name" error={err('name')}>
                      <input id="name" name="name" autoComplete="name" value={fields.name} onChange={set('name')} onBlur={blur('name')} className="input-wf" aria-invalid={!!err('name')} aria-describedby={err('name') ? 'name-err' : undefined} />
                    </Field>
                    <Field label={t('contact.emailField')} id="email" error={err('email')}>
                      <input id="email" name="email" type="email" dir="ltr" autoComplete="email" inputMode="email" value={fields.email} onChange={set('email')} onBlur={blur('email')} className="input-wf text-start" aria-invalid={!!err('email')} aria-describedby={err('email') ? 'email-err' : undefined} />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label={t('contact.subject')} id="subject" error={err('subject')}>
                      <input id="subject" name="subject" value={fields.subject} onChange={set('subject')} onBlur={blur('subject')} className="input-wf" aria-invalid={!!err('subject')} aria-describedby={err('subject') ? 'subject-err' : undefined} />
                    </Field>
                    <Field label={t('contact.type')} id="type" error={err('type')}>
                      <select id="type" name="type" value={fields.type} onChange={set('type')} onBlur={blur('type')} className="input-wf" aria-invalid={!!err('type')} aria-describedby={err('type') ? 'type-err' : undefined}>
                        <option value="">{t('contact.select')}</option>
                        {inquiryTypes.map((v) => <option key={v} value={v}>{t(`type.${v}`)}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label={t('contact.message')} id="message" error={err('message')} hint={t('contact.chars', { n: fields.message.trim().length })}>
                    <textarea id="message" name="message" rows={6} value={fields.message} onChange={set('message')} onBlur={blur('message')} className="input-wf py-2.5" aria-invalid={!!err('message')} aria-describedby={err('message') ? 'message-err' : 'message-hint'} />
                  </Field>
                  <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 sm:w-auto"><Send className="h-4 w-4 rtl:-scale-x-100" /> {sending ? t('contact.sending') : t('contact.submit')}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, error, hint, children }: { label: string; id: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div className={error ? '[&_.input-wf]:border-red-600 [&_.input-wf]:ring-red-600' : ''}>{children}</div>
      {error ? (
        <p id={`${id}-err`} className="flex items-center gap-1 text-xs text-red-700"><AlertCircle className="h-3.5 w-3.5" />{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}
