import type { UIKey } from '../i18n/ui';

/** Main navigation — order here = order in header, mobile menu and footer. Labels come from src/i18n/ui.ts */
export const mainNav: { to: string; key: UIKey }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/media', key: 'nav.media' },
];

/** Secondary links (footer, mobile menu, Experience page). */
export const secondaryNav: { to: string; key: UIKey }[] = [];
