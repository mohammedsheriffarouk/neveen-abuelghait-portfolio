# Neveen Abuelghait — Portfolio (Wireframe Prototype)

A complete, navigable, responsive **wireframe prototype** of a portfolio website for a Radio Presenter, Podcast Host and Media Personality.
The structure, content model and interactions are final-ready. The visual layer is deliberately neutral, so a designer can apply a visual direction without rebuilding anything.

**Stack:** React 18 · TypeScript · Tailwind CSS 3 · React Router 6 (HashRouter) · Lucide icons · Vite 6

---

## Run

```bash
npm install
npm run dev       # local dev server → http://localhost:5173
npm run build     # production build → /dist (static, host anywhere)
npm run preview   # preview the build
```

The build uses relative paths and hash routing (`/#/programs`), so `/dist` works from any folder or static host with no server config.
To get clean URLs (`/programs`), switch `HashRouter` → `BrowserRouter` in `src/App.tsx` and enable SPA fallback on the host (Netlify `_redirects`, Vercel rewrites).

---

## Sitemap / routes

| Route | Page |
|---|---|
| `/` | Home: 01 Hero · 02 Audio Intro · 03 About Preview · 04 Featured Programs · 05 Featured Episodes · 06 Highlights · 07 Behind the Microphone · 08 Experience Preview · 09 Contact CTA |
| `/about` | About: introduction, biography, journey, approach, interests, expertise, highlights, photography, CTA |
| `/programs` | Programs archive: format chips, category filter, search |
| `/programs/:slug` | Program detail: cover, station, period, role, description, links, featured episodes, gallery, related episodes, prev/next |
| `/media` | Media library: featured section, category chips, program and platform filters, title search |
| `/gallery` | Gallery: category filters, masonry grid, lightbox (prev/next, keyboard arrows, swipe) |
| `/experience` | Experience & CV: summary, expandable timeline, education, skills, languages, Download CV |
| `/education` | Education & Certifications: filters (category, year), search, certificate viewer |
| `/contact` | Contact: methods, socials, booking CTA, validated form with demo success state (`?type=booking` preselects) |

Filters are stored in the URL (`/media?program=prg-01&platform=spotify`), so filtered views are shareable and the browser's Back button works.

---

## Project structure

```
src/
  App.tsx               routes
  index.css             WIREFRAME DESIGN TOKENS + base component classes (.btn, .card-wf, .chip…)
  layouts/SiteLayout.tsx  header, mobile menu, footer, back-to-top, scroll reset
  components/
    ui.tsx              ImageBox (placeholder), SectionHeading, PageHeader, Breadcrumbs, PlatformIcon,
                        ExternalCTA, SocialLinks, FilterChips, SelectFilter, SearchInput, EmptyState, CTABlock
    Cards.tsx           ProgramCard, MediaCard, MediaGrid, TimelineItem, CertificationCard
    Media.tsx           MediaViewer + MediaEmbed (Spotify / YouTube / Instagram / audio / fallback)
    AudioPlayer.tsx     AudioPlayer + Waveform
    Gallery.tsx         GalleryGrid + Lightbox
    Modal.tsx
  pages/                one file per page
  data/                 ← ALL CONTENT LIVES HERE
    types.ts            content model (read this first)
    ar/ · en/           one content bundle per language (profile, programs, episodes, gallery, experience…)
    profile.ts          name, titles, bios, highlights, about page, contact, CV path
    programs.ts         programs & shows
    episodes.ts         all media items + media categories
    gallery.ts          photos + gallery categories
    experience.ts       work experience, skills, languages, summary
    education.ts        degrees
    certifications.ts   courses & certificates
    socialLinks.ts      social platforms
    navigation.ts       menu order
    placeholder.ts      lorem() filler + placeholder/URL detection
  lib/                  embeds, formatting, URL query state, icon map
public/assets/
  images/{portraits,programs,media,gallery,certificates}/
  audio/
  documents/cv.pdf  documents/certificates/*.pdf   (placeholder PDFs — replace)
```

> Assets live in `public/assets` (not `src/assets`), so data files can point to them with plain strings like `"assets/images/gallery/studio-01.jpg"` and no imports.

---

## Publish mode vs draft mode

`src/config.ts → SHOW_PLACEHOLDERS`
- `false` (default): anything still written as `[LIKE THIS]` in the data files is hidden automatically. Bracket notes are stripped, empty fields and their labels disappear, and items with no real title, link or image are left out, so visitors only see finished content.
- `true`: every placeholder shows. Turn this on while filling content to see what's missing.

## Fonts (self-hosted)
- **Arabic:** Amiri. **English:** IBM Plex Sans Arabic for text, Reem Kufi for headings. All three are loaded from `@fontsource` packages, so there are no Google Fonts requests.

## CV PDF (generated from the site's data)
- `#/cv-print/ar` and `#/cv-print/en` are print-only pages that are not linked in the menu.
- To regenerate after editing content, run `npm run build && python3 scripts/build-cv.py && npm run build`. The second build copies the new PDFs into `dist`.
- This writes `public/assets/documents/cv-ar.pdf` and `cv-en.pdf`.

## Contact form
- Validation runs in the browser. On submit, it opens the visitor's email app with a ready message to Neveen's email, so no backend is needed.
- To receive messages without relying on the visitor's mail app, connect Formspree or Netlify Forms inside `submit()` in `src/pages/Contact.tsx`.

## Share preview
- `index.html` has Open Graph tags plus `public/assets/images/og-cover.jpg` (1200×630).
- After deploying, change `og:image` to the absolute URL on the real domain.

## Languages (Arabic first)

- **Arabic is the default** (RTL). **English** is a secondary version, switched from the header (عربي / English). The choice is remembered per browser.
- Content lives in **two parallel folders**: `src/data/ar/` and `src/data/en/`. Keep the same `id`, `slug`, image paths and URLs in both, and translate only the text.
- Interface strings (buttons, labels, errors) live in `src/i18n/ui.ts`. Every key must exist in both `ar` and `en`, and TypeScript enforces this.
- Layout uses logical utilities (`ps-`, `ms-`, `start-`, `end-`, `text-start`), and arrows use the `rtl:-scale-x-100` flip. Play icons stay unmirrored on purpose.
- Arabic disables letter-spacing and uppercase (they break letter joining). This is set in `src/index.css`.
- To remove English entirely, delete `src/data/en`, drop it from `LocaleContext.tsx`, and remove the toggle in `SiteLayout.tsx`.

## Editing content

Each item has a unique `id`. Add, remove or reorder items in the data files and the UI updates. You don't need to touch any component.

- **Text:** replace `[BRACKETED]` tokens and `lorem(n)` filler. To find everything still missing, search the project for `[` and `lorem(`.
- **Images:** set `src` on any `ImageRef` (`{ src: 'assets/images/...', alt, ratio }`). With no `src`, a labelled placeholder shows at the intended aspect ratio.
- **Featured items:** set `featured: true` on programs or episodes.
- **Linking:** episodes link to programs with `programId`. Programs and experience entries pull photos with `galleryIds`, and experience entries pull media with `mediaIds`.

### Placeholder behaviour (built-in, no extra work)
- A URL like `[SPOTIFY URL]` renders as a disabled button marked **"link needed"**. A real `https://` URL turns it into a live link automatically.
- An empty email or WhatsApp value shows as text. Fill in `whatsappNumber` (digits only, e.g. `2010…`) to enable the `wa.me` link.

### Audio
- Home voice intro: put the file in `public/assets/audio/` and set `profile.audioIntro.src = 'assets/audio/voice-intro.mp3'`.
- Radio recordings: set `audioSrc` on the episode.
- The player **never fakes playback**: with no file, Play is disabled and the player says so.

### Spotify / Instagram / YouTube (official embeds only)
Paste the public URL into `episodes.ts → url`:
- `https://open.spotify.com/episode/<id>` (also `/show/`): official Spotify embed
- `https://www.instagram.com/reel/<id>/`: official Instagram embed
- `https://www.youtube.com/watch?v=<id>` or `youtu.be/<id>`: privacy-enhanced YouTube embed

Any other platform (Apple Podcasts, SoundCloud, etc.) falls back to thumbnail + external link. No scraping and no private APIs. If an embed is blocked or removed, the external link still works.

### Contact form
Front-end validation plus a clearly labelled demo success state. **Nothing is sent.** To go live, connect a service (Formspree, Netlify Forms, or an API route) inside `submit()` in `src/pages/Contact.tsx`.

---

## Notes for the designer

- **Tokens:** `src/index.css` `:root` (`--wf-*`, as RGB channels) and `tailwind.config.js`. Change these to re-skin the whole site.
- **No final font, palette, logo or brand icons have been chosen.** Platform icons are generic Lucide icons mapped in `components/ui.tsx → platformMeta`. Swap them for an official brand icon set.
- Section labels (`01 — Hero`, `.wf-label`) are wireframe annotations. Remove or restyle them in the visual phase.
- **Accessibility:** includes a skip link, focus rings, aria-labels on icon buttons, a modal focus return, `prefers-reduced-motion` support, and 44px touch targets.
- **Arabic / RTL:** the site is English and LTR right now. If a bilingual version is planned, decide early: the layout uses logical flex/grid patterns, but it needs an `i18n` layer and a `dir="rtl"` pass.

## QA done
Headless Chrome check of every route at 390 / 820 / 1440px: no horizontal overflow, no console errors, one `h1` per page. Interactions tested: mobile menu, filters, search, lightbox prev/next and Esc, media viewer, program detail navigation, contact form validation and success state, booking preset, and the CV PDF download.

See **CONTENT_INVENTORY.md** for everything needed to finalize the site.
