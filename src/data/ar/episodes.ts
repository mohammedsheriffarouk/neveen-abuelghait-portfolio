import type { MediaCategory, MediaItem, Platform } from '../types';

/** الحلقات والوسائط — النسخة العربية. نفس الـ id في النسختين. */
export const mediaCategories: { id: MediaCategory; label: string }[] = [
  { id: 'spotify-podcast', label: 'حلقات سبوتيفاي' },
  { id: 'radio-recording', label: 'تسجيلات إذاعية' },
  { id: 'instagram-reel', label: 'ريلز إنستجرام' },
  { id: 'video-interview', label: 'حلقات فيديو' },
  { id: 'guest-appearance', label: 'ظهور كضيفة' },
  { id: 'other', label: 'ظهور إعلامي آخر' },
];

const COVER = { src: 'assets/images/programs/andy-fekrah-cover.jpg', alt: 'شعار «عندي فكرة»', ratio: '1/1' };

const m = (n: number, o: Partial<MediaItem> & Pick<MediaItem, 'category' | 'platform' | 'kind'>): MediaItem => {
  const num = String(n).padStart(2, '0');
  const ratio = o.category === 'instagram-reel' ? '9/16' : o.kind === 'video' ? '16/9' : '1/1';
  return {
    id: `med-${num}`,
    title: `[عنوان الحلقة ${num}]`,
    description: '[وصف الحلقة — سطران عن موضوعها وضيفها إن وُجد]',
    date: '[YYYY-MM-DD]',
    duration: o.kind === 'audio' ? '[00:00]' : undefined,
    url: urlToken(o.platform),
    thumbnail: o.programId === 'prg-01' ? COVER : { alt: `صورة مصغّرة ${num}`, ratio },
    featured: false,
    ...o,
  };
};

function urlToken(p: Platform) {
  const map: Partial<Record<Platform, string>> = {
    spotify: '[رابط الحلقة على سبوتيفاي]',
    instagram: '[رابط الريل على إنستجرام]',
    youtube: '[رابط يوتيوب]',
    radio: '[رابط التسجيل]',
  };
  return map[p] ?? '[رابط خارجي]';
}

const RAMADAN = { src: 'assets/images/programs/ramadan-sahra-cover.jpg', alt: 'ملصق «سهرة رمضانية»', ratio: '16/9', position: '88% 50%' };

export const episodes: MediaItem[] = [
  // «رأي تاني» — most-viewed Instagram reels (official embeds load on real hosting)
  m(21, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«مات ولسه عايش»', description: 'حلقة «مات ولسه عايش» من برنامج «رأي تاني» على إنستجرام. [سطر عن فكرة الحلقة]', url: 'https://www.instagram.com/reel/DeM0QU2MsS3/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-mat-w-lesa-3ayesh.jpg', alt: 'غلاف حلقة «مات ولسه عايش» — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(22, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«جرب تعيش حياتك»', description: 'حلقة «جرب تعيش حياتك» من برنامج «رأي تاني» على إنستجرام. [سطر عن فكرة الحلقة]', url: 'https://www.instagram.com/reel/De4nUqEOKcP/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-garrab-te3eesh.jpg', alt: 'غلاف حلقة «جرب تعيش حياتك» — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(23, { category: 'instagram-reel', platform: 'instagram', kind: 'video', programId: 'prg-03', featured: true, topViewed: true, title: '«السعي المنظم»', description: 'حلقة «السعي المنظم» من برنامج «رأي تاني» على إنستجرام. [سطر عن فكرة الحلقة]', url: 'https://www.instagram.com/reel/DfHOBUqOPAE/', duration: undefined, thumbnail: { src: 'assets/images/media/raay-tany-el-sa3y-el-monazzam.jpg', alt: 'غلاف حلقة «السعي المنظم» — رأي تاني', ratio: '9/16', position: '50% 28%' } }),
  m(0, {
    category: 'radio-recording', platform: 'radio', kind: 'audio', programId: 'prg-01', featured: true,
    title: '«عندي فكرة 3» — البرومو',
    description: 'برومو الموسم الثالث من «عندي فكرة» على راديو 90s FM، بصوت نيفين.',
    duration: '0:52',
    url: 'https://90sfm.com/index/program.php?id=63418',
    audioSrc: 'assets/audio/andy-fekrah-promo.mp3',
  }),
  m(9, {
    category: 'radio-recording', platform: 'radio', kind: 'audio', programId: 'prg-02', featured: true,
    title: '«سهرة رمضانية» — التسجيل الكامل',
    description: 'سهرة إذاعية رمضانية على راديو 90s FM، تقديم نيفين أبو الغيط ومحمد شريف. [أضف سطرًا عن موضوع السهرة]',
    date: '[YYYY-MM-DD]', duration: '57:52',
    url: 'https://90sfm.com',
    audioSrc: 'assets/audio/ramadan-sahra-90sfm.mp3',
    thumbnail: RAMADAN,
  }),
  m(1, { category: 'spotify-podcast', platform: 'spotify', kind: 'audio', programId: 'prg-01', featured: true, title: '[«عندي فكرة» — عنوان الحلقة على سبوتيفاي]' }),
  m(2, { category: 'spotify-podcast', platform: 'spotify', kind: 'audio', programId: 'prg-01', title: '[«عندي فكرة» — عنوان الحلقة على سبوتيفاي]' }),
  m(7, { category: 'guest-appearance', platform: 'spotify', kind: 'audio', title: '[مشاركة كضيفة — اسم البرنامج]', description: '[المقدّم / البرنامج / الموضوع]' }),
];
