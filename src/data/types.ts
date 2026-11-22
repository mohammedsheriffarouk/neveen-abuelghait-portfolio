/**
 * Content model for the whole site.
 * Every page and component reads from these shapes — edit the data files, not the UI.
 */

export type Platform =
  | 'spotify'
  | 'apple'
  | 'youtube'
  | 'instagram'
  | 'radio'
  | 'soundcloud'
  | 'linkedin'
  | 'facebook'
  | 'tiktok'
  | 'x'
  | 'whatsapp'
  | 'email'
  | 'website'
  | 'other';

export interface ExternalLink {
  platform: Platform;
  label: string;
  /** Full https URL. Anything that is not a valid URL (e.g. "[SPOTIFY URL]") renders as "link needed". */
  url: string;
}

/** Image reference. Leave `src` empty to render a labelled wireframe placeholder. */
export interface ImageRef {
  src?: string;
  alt: string;
  /** Intended aspect ratio, e.g. "4/5", "16/9", "1/1". Used by placeholders and real images alike. */
  ratio: string;
  /** Optional CSS object-position for cropping a real photo, e.g. "50% 30%". */
  position?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  headline: string;
  intro: string;
  /** Short topic labels shown as the hero's pill stack (one is highlighted at a time). */
  topics?: string[];
  /** Places she has worked/studied — shown as a logo strip. logo: path under public/, else a typographic wordmark. */
  affiliations?: { id: string; name: string; caption: string; logo?: string; group?: 'academic' | 'training' }[];
  heroPortrait: ImageRef;
  aboutPreview: string;
  aboutImage: ImageRef;
  highlights: { id: string; label: string; value: string }[];
  audioIntro: {
    title: string;
    description: string;
    /** Path or URL to an audio file (mp3/m4a). Empty = player shows "audio needed", no fake playback. */
    src: string;
    /** Display duration if known, e.g. "1:30". The real player reads duration from the file. */
    duration: string;
    /** Fallback when no audio file exists yet: an official Spotify show/episode embed. */
    spotifyUrl?: string;
    image?: ImageRef;
  };
  about: {
    introduction: string;
    biography: string[];
    journey: { id: string; period: string; title: string; text: string }[];
    approach: string[];
    interests: string[];
    expertise: { id: string; title: string; text: string }[];
    photos: ImageRef[];
  };
  careerHighlights: { id: string; title: string; text: string; icon: 'radio' | 'mic' | 'users' | 'message' | 'calendar' | 'award' }[];
  /** Collaboration offerings shown in the "Work With Me" section. */
  services: { id: string; number: string; title: string; text: string }[];
  /** External media recognition (e.g. a platform feature), shown live-embedded and linked back to the source post for authenticity. */
  pressFeatures?: { id: string; title: string; description: string; logo: string; logoName: string; cover: ImageRef; instagramUrl: string; video?: string }[];
  contact: {
    intro: string;
    email: string;
    location: string;
    availability: string;
  };
  cvPdf: string;
}

export type ProgramFormat = 'Radio' | 'Podcast' | 'Video';

export interface Program {
  id: string;
  slug: string;
  name: string;
  station: string;
  format: ProgramFormat;
  category: string;
  shortDescription: string;
  description: string[];
  role: string;
  period: string;
  episodesCount: string;
  cover: ImageRef;
  /** Optional different image for program cards (list/home); the detail page uses `cover`. */
  thumb?: ImageRef;
  /** Gallery item IDs shown on the program page. */
  galleryIds: string[];
  externalLinks: ExternalLink[];
  /** Optional full recording played directly on the program page (replaces the 'Listen on' links). */
  audio?: { src: string; title: string; duration?: string };
  featured: boolean;
}

export type MediaCategory =
  | 'spotify-podcast'
  | 'radio-recording'
  | 'instagram-reel'
  | 'video-interview'
  | 'guest-appearance'
  | 'other';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  /** Program ID (optional — guest appearances may not belong to a program). */
  programId?: string;
  category: MediaCategory;
  platform: Platform;
  kind: 'audio' | 'video';
  /** ISO date YYYY-MM-DD, or a placeholder string. */
  date: string;
  duration?: string;
  /** Public page for the item (Spotify episode, Reel, YouTube...). */
  url: string;
  /** Optional local/hosted audio file for the native player (radio recordings). */
  audioSrc?: string;
  thumbnail: ImageRef;
  featured: boolean;
  /** Shows a "most viewed" badge on the card. */
  topViewed?: boolean;
}

/** Stable IDs (used in URLs/filters). Labels live per language in each locale's gallery.ts. */
export type GalleryCategory = 'studio' | 'bts' | 'interviews' | 'events' | 'portraits' | 'podcast';

export interface GalleryItem {
  id: string;
  image: ImageRef;
  category: GalleryCategory;
  caption: string;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  start: string;
  end: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  /** Gallery item IDs and/or media item IDs related to this role. */
  galleryIds: string[];
  mediaIds: string[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  year: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  instructor?: string;
  date: string;
  year: string;
  duration?: string;
  category: string;
  description: string;
  skills: string[];
  certificateImage: ImageRef;
  certificatePdf?: string;
  verifyUrl?: string;
}

export interface SkillGroup {
  id: string;
  group: string;
  skills: string[];
}

export interface Language {
  id: string;
  language: string;
  level: string;
}

export type Locale = 'ar' | 'en';

/** Everything one language version of the site needs. Built in src/data/<locale>/index.ts */
export interface Content {
  profile: Profile;
  programs: Program[];
  episodes: MediaItem[];
  mediaCategories: { id: MediaCategory; label: string }[];
  gallery: GalleryItem[];
  /** Photos of guests in the studio — shown in their own Home section. */
  guests: GalleryItem[];
  galleryCategories: { id: GalleryCategory; label: string }[];
  experience: Experience[];
  skillGroups: SkillGroup[];
  languages: Language[];
  professionalSummary: string;
  education: Education[];
  certifications: Certification[];
}
