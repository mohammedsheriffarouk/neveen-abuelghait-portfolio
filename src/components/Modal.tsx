import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

/** Accessible modal: Esc to close, click backdrop to close, scroll lock, focus returns on close. */
export function Modal({ open, onClose, title, children, size = 'lg', dark = false }: { open: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'md' | 'lg' | 'xl' | 'full'; dark?: boolean }) {
  const panel = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  const width = { md: 'max-w-lg', lg: 'max-w-3xl', xl: 'max-w-5xl', full: 'max-w-none' }[size];

  return createPortal(
    <div className={`fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6 ${dark ? 'bg-black/90' : 'bg-black/50'}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative max-h-[92vh] w-full overflow-y-auto outline-none ${width} ${dark ? 'text-white' : 'rounded-t-xl bg-surface sm:rounded-xl'}`}
      >
        <button type="button" onClick={onClose} aria-label={t('close')} className={`absolute end-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full ${dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-surface/90 text-ink hover:bg-muted'}`}>
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
