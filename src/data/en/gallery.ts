import type { GalleryCategory, GalleryItem } from '../types';

/** GALLERY — English. Same IDs and images as Arabic; only text differs. Real photos first. */
export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'studio', label: 'Radio Studio' },
  { id: 'bts', label: 'Behind the Scenes' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'events', label: 'Events' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'podcast', label: 'Podcast Recording Sessions' },
];

const P = 'assets/images/portraits/';
const G = 'assets/images/programs/';

// gal-01…07: real photos · gal-08…11: generated/retouched studio images (replace with a real studio shoot)
export const gallery: GalleryItem[] = [
  { id: 'gal-13', category: 'studio', image: { src: G + 'andy-fekrah-3-90sfm.jpg', alt: '«عندي فكرة 3» poster — Neveen Abuelghait on Radio 90s FM', ratio: '16/9' }, caption: '«عندي فكرة 3» — 90s FM' },
  { id: 'gal-14', category: 'events', image: { src: G + 'ramadan-sahra-cover.jpg', alt: '«سهرة رمضانية» poster — Neveen Abuelghait & Mohamed Sherif', ratio: '16/9' }, caption: '«سهرة رمضانية» — 90s FM' },
  { id: 'gal-01', category: 'interviews', image: { src: P + 'neveen-studio-interview.jpg', alt: 'On set for a studio interview', ratio: '3/4' }, caption: 'On camera' },
  { id: 'gal-02', category: 'portraits', image: { src: P + 'neveen-headshot-green.jpg', alt: 'Portrait', ratio: '1/1' }, caption: 'Portrait' },
  { id: 'gal-03', category: 'events', image: { src: P + 'neveen-event-red.jpg', alt: 'At an event', ratio: '3/4' }, caption: 'Event' },
  { id: 'gal-04', category: 'events', image: { src: P + 'neveen-evening-street.jpg', alt: 'Evening portrait', ratio: '3/4' }, caption: 'Evening' },
  { id: 'gal-05', category: 'portraits', image: { src: P + 'neveen-polka-standing.jpg', alt: 'Portrait', ratio: '3/4' }, caption: 'Signature style' },
  { id: 'gal-06', category: 'portraits', image: { src: P + 'neveen-polka-seated.jpg', alt: 'Seated portrait', ratio: '3/4' }, caption: 'Portrait' },
  { id: 'gal-07', category: 'portraits', image: { src: P + 'neveen-striped.jpg', alt: 'Portrait', ratio: '3/4' }, caption: 'Portrait' },
  { id: 'gal-08', category: 'studio', image: { src: P + 'nevine-on-air.jpg', alt: 'At the studio desk under an ON AIR sign', ratio: '3/2' }, caption: 'On air' },
  { id: 'gal-09', category: 'podcast', image: { src: P + 'nevine-headphones.jpg', alt: 'Listening back on studio headphones', ratio: '3/2' }, caption: 'Listening back' },
  { id: 'gal-10', category: 'podcast', image: { src: P + 'nevine-podcast-mic.jpg', alt: 'At the podcast microphone', ratio: '3/2' }, caption: 'At the mic' },
  { id: 'gal-11', category: 'studio', image: { src: P + 'nevine-studio-white.jpg', alt: 'Studio portrait at the microphone', ratio: '3/2' }, caption: 'Studio portrait' },
  { id: 'gal-12', category: 'bts', image: { alt: 'Behind-the-scenes photo — needed', ratio: '4/5' }, caption: '[PHOTO NEEDED — Behind the Scenes]' },
];
