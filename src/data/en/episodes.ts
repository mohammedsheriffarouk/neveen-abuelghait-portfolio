import type { MediaCategory, MediaItem, Platform } from '../types';
import { lorem } from '../placeholder';

/**
 * EPISODES & MEDIA — one list for every audio/video item across platforms.
 *
 * How each item is presented (decided automatically from the data):
 *  - Spotify / YouTube / Instagram URL that is real → official embed in the media viewer.
 *  - `audioSrc` set → native audio player with real Play / Pause.
 *  - Otherwise → thumbnail + external link (or "link needed" while the URL is a placeholder).
 * Nothing simulates playback.
 */
export const mediaCategories: { id: MediaCategory; label: string }[] = [
  { id: 'spotify-podcast', label: 'Spotify Podcast Episodes' },
  { id: 'radio-recording', label: 'Radio Recordings' },
  { id: 'instagram-reel', label: 'Instagram Reels' },
  { id: 'video-interview', label: 'Video Episodes' },
  { id: 'guest-appearance', label: 'Guest Appearances' },
  { id: 'other', label: 'Other Media Features' },
];

const m = (n: number, o: Partial<MediaItem> & Pick<MediaItem, 'category' | 'platform' | 'kind'>): MediaItem => {
  const num = String(n).padStart(2, '0');
  const ratio = o.category === 'instagram-reel' ? '9/16' : o.kind === 'video' ? '16/9' : '1/1';
  return {
    id: `med-${num}`,
    title: `[EPISODE TITLE ${num}]`,
    description: `[EPISODE DESCRIPTION] ${lorem(26, n * 4)}`,
    date: '[YYYY-MM-DD]',
    duration: o.kind === 'audio' ? '[00:00]' : undefined,
    url: urlToken(o.platform),
    thumbnail: o.programId === 'prg-01'
      ? { src: 'assets/images/programs/andy-fekrah-cover.jpg', alt: '«عندي فكرة» artwork', ratio: '1/1' }
      : { alt: `Thumbnail for item ${num}`, ratio },
    featured: false,
    ...o,
  };
};

function urlToken(p: Platform) {
  const map: Partial<Record<Platform, string>> = {
    spotify: '[SPOTIFY EPISODE URL]',
    instagram: '[INSTAGRAM REEL URL]',
    youtube: '[YOUTUBE URL]',
    apple: '[APPLE PODCASTS URL]',
    radio: '[RECORDING URL]',
  };
  return map[p] ?? '[EXTERNAL URL]';
}

const RAMADAN = { src: 'assets/images/programs/ramadan-sahra-cover.jpg', alt: '«سهرة رمضانية» poster', ratio: '16/9', position: '88% 50%' };

export const episodes: MediaItem[] = [
  // «رأي تاني» — most-viewed Instagram reels (official embeds load on real hosting)
  m(21, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«مات ولسه عايش»', description: 'The «مات ولسه عايش» episode of «رأي تاني» on Instagram. [One line on the episode’s idea]', url: 'https://www.instagram.com/reel/DeM0QU2MsS3/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-mat-w-lesa-3ayesh.jpg', alt: '«مات ولسه عايش» episode cover — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(22, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«جرب تعيش حياتك»', description: 'The «جرب تعيش حياتك» episode of «رأي تاني» on Instagram. [One line on the episode’s idea]', url: 'https://www.instagram.com/reel/De4nUqEOKcP/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-garrab-te3eesh.jpg', alt: '«جرب تعيش حياتك» episode cover — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(23, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«السعي المنظم»', description: 'The «السعي المنظم» episode of «رأي تاني» on Instagram. [One line on the episode’s idea]', url: 'https://www.instagram.com/reel/DfHOBUqOPAE/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-el-sa3y-el-monazzam.jpg', alt: '«السعي المنظم» episode cover — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(0, {
    category: 'radio-recording', platform: 'radio', kind: 'audio', programId: 'prg-01', featured: true,
    title: '«عندي فكرة 3» — Promo',
    description: 'The season 3 promo for «عندي فكرة» on Radio 90s FM, in Neveen’s voice.',
    date: '[YYYY-MM-DD]', duration: '0:52',
    url: 'https://90sfm.com/index/program.php?id=63418',
    audioSrc: 'assets/audio/andy-fekrah-promo.mp3',
  }),
  m(9, {
    category: 'radio-recording', platform: 'radio', kind: 'audio', programId: 'prg-02', featured: true,
    title: '«سهرة رمضانية» — Full recording',
    description: 'A Ramadan evening special on Radio 90s FM, presented by Neveen Abuelghait and Mohamed Sherif. [Add a line on the topic]',
    date: '[YYYY-MM-DD]', duration: '57:52',
    url: 'https://90sfm.com',
    audioSrc: 'assets/audio/ramadan-sahra-90sfm.mp3',
    thumbnail: RAMADAN,
  }),
  m(1, { category: 'spotify-podcast', platform: 'spotify', kind: 'audio', programId: 'prg-01', featured: true, title: '[«عندي فكرة» — EPISODE TITLE on Spotify]' }),
  m(2, { category: 'spotify-podcast', platform: 'spotify', kind: 'audio', programId: 'prg-01', title: '[«عندي فكرة» — EPISODE TITLE on Spotify]' }),
  m(7, { category: 'guest-appearance', platform: 'spotify', kind: 'audio', title: '[GUEST APPEARANCE — SHOW NAME]', description: '[HOST / SHOW / TOPIC]' }),
];
