/** @type {import('tailwindcss').Config} */
// Design tokens live as CSS variables in src/index.css.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--wf-canvas) / <alpha-value>)',
        surface: 'rgb(var(--wf-surface) / <alpha-value>)',
        muted: 'rgb(var(--wf-muted) / <alpha-value>)',
        line: 'rgb(var(--wf-line) / <alpha-value>)',
        ink: 'rgb(var(--wf-ink) / <alpha-value>)',
        subtle: 'rgb(var(--wf-subtle) / <alpha-value>)',
        accent: 'rgb(var(--wf-accent) / <alpha-value>)',
        calm: 'rgb(var(--wf-calm) / <alpha-value>)',
        placeholder: 'rgb(var(--wf-placeholder) / <alpha-value>)',
      },
      fontFamily: {
        // Body: IBM Plex Sans Arabic (Arabic + Latin). Display: Reem Kufi. Loaded in index.html.
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'Segoe UI', 'Tahoma', 'sans-serif'],
        display: ['"Reem Kufi"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '76rem' },
    },
  },
  plugins: [],
};
