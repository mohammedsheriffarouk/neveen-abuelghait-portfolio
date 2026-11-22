/** Minimal brand marks drawn on a 24px grid in currentColor, matching lucide's 1.75 stroke weight. */
type P = { className?: string };
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const InstagramIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="M15.5 3.5h-2.2c-2.3 0-3.8 1.5-3.8 3.9V10H7v3.4h2.5v7.1h3.4v-7.1h2.6l.4-3.4h-3V7.9c0-.8.4-1.2 1.2-1.2h1.4z" />
  </svg>
);

export const SpotifyIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M7.5 9.6c3.1-.9 6.6-.6 9.2.9" />
    <path d="M8 12.6c2.5-.7 5.2-.4 7.3.8" />
    <path d="M8.6 15.4c1.9-.5 3.8-.3 5.4.6" />
  </svg>
);

export const YouTubeIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.3 9.4v5.2l4.4-2.6z" fill="currentColor" />
  </svg>
);

export const TikTokIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <path d="M13.5 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3" />
    <path d="M13.5 3.5c.4 2.4 2.1 4 4.7 4.2" />
  </svg>
);

export const LinkedInIcon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.5 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
  </svg>
);
