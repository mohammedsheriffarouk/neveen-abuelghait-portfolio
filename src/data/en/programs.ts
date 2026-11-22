import type { Program } from '../types';

/**
 * PROGRAMS — radio programs & podcast shows.
 * `slug` builds the detail URL (#/programs/<slug>). `featured: true` = shown on Home.
 * When there are fewer than 4 programs, the archive hides its filters automatically.
 */
export const programs: Program[] = [
  {
    id: 'prg-03',
    slug: 'raay-tany',
    name: 'رأي تاني · Raay Tany',
    station: 'Digital platforms',
    format: 'Video',
    category: 'Talk Show',
    shortDescription: 'A media project offering different perspectives on life, human behavior, relationships and conscious thinking.',
    description: [
      'Neveen’s current talk show on digital platforms: different perspectives on life, human behavior, relationships and conscious thinking, through social, cultural and intellectual conversations in Arabic.',
      '[PROGRAM DETAILS — platforms (YouTube / Instagram / podcast), format, episode length, publishing schedule]',
    ],
    role: 'Host & content creator',
    period: '[START YEAR] – Present',
    episodesCount: '[00]',
    cover: { src: 'assets/images/programs/raay-tany-cover.jpg', alt: '«رأي تاني» program cover', ratio: '1/1' },
    galleryIds: ['gal-01', 'gal-02'],
    externalLinks: [{ platform: 'instagram', label: 'Watch «رأي تاني» on Instagram', url: 'https://www.instagram.com/neveenabuelghait/' }],
    featured: true,
  },
  {
    id: 'prg-01',
    slug: 'andy-fekrah',
    name: 'عندي فكرة · Andy Fekrah',
    station: 'Radio 90s FM',
    format: 'Radio',
    category: 'Radio Show',
    shortDescription: '«مشكلتك مش دايمًا محتاجة حل جديد…» — Neveen presented season 3 on Radio 90s FM, Saturdays at 4 PM.',
    description: [
      'A radio show on 90s FM built on a simple idea: your problem doesn’t always need a new solution — sometimes it needs a new way of looking at it.',
      'Neveen presented season 3, broadcast every Saturday at 4:00 PM. Episodes are also available on Spotify.',
    ],
    role: 'Host — Season 3',
    period: '[SEASON 3 YEAR]',
    episodesCount: '[00]',
    cover: { src: 'assets/images/programs/andy-fekrah-3-poster.jpg', alt: '«عندي فكرة 3» cover — Neveen Abuelghait on Radio 90s FM', ratio: '16/9' },
    thumb: { src: 'assets/images/programs/andy-fekrah-cover.jpg', alt: '«عندي فكرة» program cover with Neveen Abuelghait', ratio: '16/9' },
    galleryIds: ['gal-13', 'gal-08', 'gal-09'],
    externalLinks: [
      { platform: 'radio', label: 'Program page on 90s FM', url: 'https://90sfm.com/index/program.php?id=63418' },
      { platform: 'spotify', label: 'Listen on Spotify', url: 'https://open.spotify.com/show/5flDkBxQZhXljNaKzhdN8O' },
    ],
    featured: true,
  },
  {
    id: 'prg-02',
    slug: 'sahra-ramadaniya',
    name: 'سهرة رمضانية · Ramadan Evening',
    station: 'Radio 90s FM',
    format: 'Radio',
    category: 'Ramadan Special',
    shortDescription: 'A Ramadan evening special co-hosted with Mohamed Sherif, part of #رمضان_التسعينات, at 11:30 PM.',
    description: [
      'A Ramadan evening radio special on 90s FM, co-hosted by Neveen Abuelghait and Mohamed Sherif, broadcast at 11:30 PM.',
      'Listen to the full recording with the player below. [Add a line on the topic and guests]',
    ],
    role: 'Co-host with Mohamed Sherif',
    period: 'Ramadan 2024',
    episodesCount: '1',
    cover: { src: 'assets/images/programs/ramadan-sahra-cover.jpg', alt: '«سهرة رمضانية» poster — Neveen Abuelghait & Mohamed Sherif on 90s FM', ratio: '16/9' },
    galleryIds: ['gal-14'],
    externalLinks: [],
    audio: { src: 'assets/audio/ramadan-sahra-90sfm.mp3', title: '«سهرة رمضانية» — Full recording', duration: '57:52' },
    featured: true,
  },
];
