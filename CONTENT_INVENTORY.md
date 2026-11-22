# Content Inventory — Neveen Abuelghait

> **Status (v0.3):** CV data, social links, the «عندي فكرة» show, its artwork, the 52-second promo and 7 real photos are in.
> Arabic is the primary language. Every text item below is needed in **Arabic first**, then English.
> Items already provided are marked ✅.

### Still missing (hidden from visitors until provided)
| # | Item | Where it shows |
|---|---|---|
| 1 | Years / dates: «رأي تاني» start year, 90s FM period, «عندي فكرة» season-3 year, radio course date | Programs, Experience, About milestones, CV |
| 2 | Episode counts per program | Program cards & pages |
| 3 | «عندي فكرة» episodes on Spotify (title + episode link) | Media library, program page |
| 4 | Short line per reel / Ramadan show (what the episode is about) | Media cards & viewer |
| 5 | Certificate scan (image or PDF) of the 90s FM course | Education page |
| 6 | Responsibilities at Emirates NBD & Marriott (optional) | Experience timeline, CV |
| 7 | Real studio photos to replace the 4 generated images (incl. current hero) | Hero, voice section, gallery |
| 8 | Logo / wordmark (currently the name + coral dot) | Header, footer, favicon |
| 9 | Domain + hosting; then absolute og:image URL | Sharing previews |
| 10 | Neveen's approval of draft voice copy (hero line, approach, highlights) | Home, About |

### Provided
- ✅ On-air name: Neveen Abuelghait / نيفين أبو الغيط
- ✅ CV facts (education, Marriott, Emirates NBD, 90s FM course, skills, languages, interests)
- ✅ Instagram, Facebook, Spotify show links
- ✅ Email: neveenabuelghait223@gmail.com · City: Cairo · WhatsApp removed by request
- ✅ 3 most-viewed «رأي تاني» reels + covers · ✅ «سهرة رمضانية» full recording + poster · ✅ «عندي فكرة 3» 90s FM poster
- ✅ Show artwork «عندي فكرة» · ✅ Promo audio (0:52)
- ✅ 7 real photos (studio interview, events, portraits, headshot)
- ⚠️ 4 generated/retouched studio images (on-air, headphones, mic, white) — replace with a real studio shoot

Everything needed to replace placeholders and finalize the site.
Tick each box as content arrives. **File** = where to enter it (`src/data/…` or `public/assets/…`).

Recommended image export: JPG/WebP, sRGB, long edge 2000px for full-width images or 1200px for cards, under 400 KB each after compression.

---

## 1. Personal Information
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Full name, plus a short/display name | — | Text (EN, plus AR spelling if bilingual) | Header, hero, footer, page titles, `<title>` | `profile.ts → name, shortName` |
| ☐ | Professional title (confirm "Radio Presenter / Podcast Host" or adjust) | — | Text, max 6 words | Hero, footer, CV | `profile.ts → title` |
| ☐ | Introductory headline | — | 6–10 words | Home hero | `profile.ts → headline` |
| ☐ | Short professional introduction | — | 35–50 words | Home hero, footer (shortened) | `profile.ts → intro` |
| ☐ | Main hero portrait | 1 portrait photo | 4:5, min 1600×2000 JPG | Home hero | `assets/images/portraits/` → `heroPortrait.src` |
| ☐ | Logo or wordmark (if any) | Logo file | SVG (light + dark) | Header, footer, favicon | `SiteLayout.tsx → Logo` |
| ☐ | Voice introduction clip | Audio file | MP3 128–192 kbps or M4A, 45–90 s | Home → Audio Introduction | `assets/audio/` → `audioIntro.src`, `duration` |
| ☐ | Voice clip description | — | 20–30 words | Home → Audio Introduction | `audioIntro.description` |

## 2. Professional Biography
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Short bio | — | 60–80 words | Home → About Preview | `profile.ts → aboutPreview` |
| ☐ | Key numbers (years on air, programs, episodes, guests), **real figures only** | — | 4 × number + label | Home → About Preview | `profile.ts → highlights` |
| ☐ | Personal introduction (first person) | — | 40–60 words | About §1 | `about.introduction` |
| ☐ | Full biography | — | 3 paragraphs, 50–70 words each | About §2 | `about.biography` |
| ☐ | Career journey milestones | — | 4–6 × (year, title, 25 words) | About §3 | `about.journey` |
| ☐ | Approach to communication & storytelling | — | 2 paragraphs | About §4 | `about.approach` |
| ☐ | Professional interests | — | 5–8 short tags | About §5 | `about.interests` |
| ☐ | Areas of expertise | — | 4–6 × (title, 20 words) | About §6 | `about.expertise` |
| ☐ | Career highlights (radio, podcast, guest relations, interviews, events…) | — | 4–6 × (title, 20 words) | Home §06, About §7 | `profile.ts → careerHighlights` |
| ☐ | Editorial / supporting portraits | 1 editorial + 3 supporting photos | 4:5 and 3:2 JPG | Home §03, About §1 & §4 | `aboutImage`, `about.photos` |

## 3. Programs & Shows (per program)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Program name | — | Text | Program cards, detail page, media cards, filters | `programs.ts → name` |
| ☐ | Radio station / platform | — | Text | Cards, detail page | `station` |
| ☐ | Format (Radio / Podcast / Video) and category | — | Pick one format + 1 category label | Filters, tags | `format`, `category` |
| ☐ | Short description | — | 20–25 words | Program card | `shortDescription` |
| ☐ | Full description | — | 2 paragraphs, 100 words total | Detail page | `description` |
| ☐ | Presenter role | — | e.g. Host, Co-host, Producer & Host | Detail page | `role` |
| ☐ | Broadcasting period | — | "2021 – Present" | Card, detail page | `period` |
| ☐ | Number of episodes | — | Number | Card, detail page | `episodesCount` |
| ☐ | Cover / logo | Cover artwork | 1:1, 1400×1400 JPG/PNG | Card, detail page | `assets/images/programs/` → `cover.src` |
| ☐ | Program photos | 3–6 photos | Any ratio, JPG | Detail → Program Gallery | add to `gallery.ts`, link via `galleryIds` |
| ☐ | External listening links | — | Full https URLs (Spotify show, Apple Podcasts, station page) | Detail → Listen on | `externalLinks` |
| ☐ | Which programs to feature on Home (max 3) | — | — | Home §04 | `featured: true` |

## 4. Spotify Episodes (per episode)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Episode title, description (25 words), date, duration | — | Text, `YYYY-MM-DD`, `mm:ss` | Media cards, viewer | `episodes.ts` |
| ☐ | Spotify episode URL | — | `https://open.spotify.com/episode/…` | Official embed + "Listen on Spotify" | `url` |
| ☐ | Linked program | — | Program ID (`prg-01`…) | Card, program page, filters | `programId` |
| ☐ | Thumbnail (optional; Spotify art can be reused with rights) | Image | 1:1, 800×800 | Media card | `thumbnail.src` |

## 5. Instagram Content (per Reel)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Reel title, short description, date, duration | — | Text | Media cards, viewer | `episodes.ts` |
| ☐ | Public Reel URL (account must be public for embeds) | — | `https://www.instagram.com/reel/…/` | Official embed + external link | `url` |
| ☐ | Fallback thumbnail (cover frame) | Image | 9:16 or 4:5, 1080×1350 | Media card, fallback if embed is blocked | `thumbnail.src` |
| ☐ | Instagram profile URL | — | https URL | Social links everywhere | `socialLinks.ts` |

## 6. Other Media Appearances (radio recordings, video interviews, guest spots, press)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Title, outlet/show name, date, short description | — | Text | Media library | `episodes.ts` (category: `radio-recording`, `video-interview`, `guest-appearance`, `other`) |
| ☐ | Radio recordings (aircheck clips) | Audio files | MP3/M4A, 1–5 min, normalized | Native audio player | `assets/audio/` → `audioSrc` |
| ☐ | YouTube / Apple Podcasts / other links | — | https URLs | Embed (YouTube) or external link | `url` |
| ☐ | Thumbnails | Images | 16:9 for video, 1:1 for audio | Media cards | `thumbnail.src` |
| ☐ | Which items to feature (4–6) | — | — | Home §05, Media → Featured | `featured: true` |

## 7. Professional Photography
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Radio Studio photos | 3+ | JPG, any ratio | Gallery, Home §07 | `assets/images/gallery/` → `gallery.ts` |
| ☐ | Behind the Scenes photos | 3+ | JPG | Gallery | ″ |
| ☐ | Interviews photos | 3+ | JPG | Gallery, program pages | ″ |
| ☐ | Events photos | 3+ | JPG | Gallery, experience entries | ″ |
| ☐ | Professional Portraits | 3+ | JPG, 4:5 / 2:3 | Gallery, About | ″ |
| ☐ | Podcast Recording Sessions | 3+ | JPG | Gallery, program pages | ″ |
| ☐ | Caption per photo (+ optional description), photographer credit if required | — | 5–10 words + optional 20 words | Gallery tiles, lightbox | `caption`, `description` |
| ☐ | Usage rights confirmed for all photos | — | — | — | — |

## 8. Work Experience (per role)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Job title, organization | — | Text | Experience page, Home §08 | `experience.ts` |
| ☐ | Start / end dates, employment type, location | — | `MMM YYYY`, Full-time/Freelance… | Experience page | `start`, `end`, `type`, `location` |
| ☐ | Role summary | — | 25–35 words | Timeline (collapsed) | `summary` |
| ☐ | Responsibilities | — | 3–5 bullets | Timeline (expanded) | `responsibilities` |
| ☐ | Achievements (real, verifiable) | — | 2–4 bullets | Timeline (expanded) | `achievements` |
| ☐ | Related media / photos | — | Gallery and media IDs | Timeline (expanded) | `galleryIds`, `mediaIds` |
| ☐ | Professional summary | — | 40–60 words | Experience §1 | `professionalSummary` |
| ☐ | Skills grouped (confirm or rename the 4 groups) | — | 3–6 skills per group | Experience §4 | `skillGroups` |
| ☐ | Languages + proficiency | — | e.g. Arabic — Native | Experience §5 | `languages` |
| ☐ | Full CV | PDF | PDF, under 2 MB, named `cv.pdf` | Download CV buttons | `public/assets/documents/cv.pdf` |

## 9. Education
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Institution, qualification, field of study, graduation year | — | Text | Experience §3, Education page | `education.ts` |

## 10. Certifications (per course)
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Course name, provider, completion date, category | — | Text | Education page cards & filters | `certifications.ts` |
| ☐ | Instructor, duration (optional) | — | Text | Card | `instructor`, `duration` |
| ☐ | Description + skills acquired | — | 25 words + 3–5 skills | Card, viewer | `description`, `skills` |
| ☐ | Certificate image | Scan or export | 4:3 JPG/PNG, 1600px | Card, viewer | `assets/images/certificates/` → `certificateImage.src` |
| ☐ | Certificate PDF (optional) | PDF | PDF | Viewer → Download | `assets/documents/certificates/` → `certificatePdf` |
| ☐ | Verification URL (optional) | — | https URL | Verify button | `verifyUrl` |

## 11. Contact Information
| ☐ | Required information | Required asset | Recommended format | Appears on | File |
|---|---|---|---|---|---|
| ☐ | Professional email (ideally on a custom domain) | — | Email | Contact page, Home §09, footer | `profile.ts → contact.email` |
| ☐ | WhatsApp number (display + digits for link) | — | `+20 10 …` / `2010…` | Contact page, Home §09, footer | `whatsapp`, `whatsappNumber` |
| ☐ | Location | — | City, Country | Contact page, footer | `location` |
| ☐ | Availability / booking statement | — | 15–25 words | Contact → Bookings | `availability` |
| ☐ | Contact page introduction | — | 25–35 words | Contact header | `contact.intro` |
| ☐ | Inquiry types (confirm list) | — | 4–6 options | Contact form | `Contact.tsx → inquiryTypes` |
| ☐ | Form delivery destination (inbox / service) | — | Formspree, Netlify Forms, etc. | Contact form (go-live) | `Contact.tsx → submit()` |

## 12. Social Media Links
| ☐ | Platform | Format | Appears on | File |
|---|---|---|---|---|
| ☐ | Instagram | https URL | Hero, footer, contact, mobile menu | `socialLinks.ts` |
| ☐ | Spotify (artist/podcast profile) | https URL | ″ | ″ |
| ☐ | LinkedIn | https URL | ″ | ″ |
| ☐ | YouTube | https URL | ″ | ″ |
| ☐ | Facebook | https URL | ″ | ″ |
| ☐ | TikTok / X / others (delete unused rows) | https URL | ″ | ″ |

---

### Decisions still open (not content, but they block the final design)
- [ ] Single language (EN), or bilingual EN/AR with RTL?
- [ ] Domain name and hosting
- [ ] Visual identity: palette, typography, logo/wordmark, brand icon set
- [ ] Which program categories to use for filtering (currently `[CATEGORY A/B/C]`)
