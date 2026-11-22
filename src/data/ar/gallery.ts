import type { GalleryCategory, GalleryItem } from '../types';

/** المعرض — النسخة العربية. نفس الـ id والصور في النسختين؛ النصوص فقط تختلف. */
export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'studio', label: 'استوديو الراديو' },
  { id: 'bts', label: 'كواليس' },
  { id: 'interviews', label: 'مقابلات' },
  { id: 'events', label: 'فعاليات' },
  { id: 'portraits', label: 'بورتريه' },
  { id: 'podcast', label: 'جلسات تسجيل البودكاست' },
];

const P = 'assets/images/portraits/';
const G = 'assets/images/programs/';

// gal-01…07: real photos · gal-08…11: generated/retouched studio images (replace with a real studio shoot)
export const gallery: GalleryItem[] = [
  { id: 'gal-13', category: 'studio', image: { src: G + 'andy-fekrah-3-90sfm.jpg', alt: 'ملصق «عندي فكرة 3» مع نيفين أبو الغيط على راديو 90s FM', ratio: '16/9' }, caption: '«عندي فكرة 3» — 90s FM' },
  { id: 'gal-14', category: 'events', image: { src: G + 'ramadan-sahra-cover.jpg', alt: 'ملصق «سهرة رمضانية» مع نيفين أبو الغيط ومحمد شريف', ratio: '16/9' }, caption: '«سهرة رمضانية» — 90s FM' },
  { id: 'gal-01', category: 'interviews', image: { src: P + 'neveen-studio-interview.jpg', alt: 'في جلسة تصوير مقابلة', ratio: '3/4' }, caption: 'على الهواء أمام الكاميرا' },
  { id: 'gal-02', category: 'portraits', image: { src: P + 'neveen-headshot-green.jpg', alt: 'بورتريه', ratio: '1/1' }, caption: 'بورتريه' },
  { id: 'gal-03', category: 'events', image: { src: P + 'neveen-event-red.jpg', alt: 'في إحدى الفعاليات', ratio: '3/4' }, caption: 'فعالية' },
  { id: 'gal-04', category: 'events', image: { src: P + 'neveen-evening-street.jpg', alt: 'لقطة مسائية', ratio: '3/4' }, caption: 'مساءً' },
  { id: 'gal-05', category: 'portraits', image: { src: P + 'neveen-polka-standing.jpg', alt: 'بورتريه', ratio: '3/4' }, caption: 'بأسلوبها' },
  { id: 'gal-06', category: 'portraits', image: { src: P + 'neveen-polka-seated.jpg', alt: 'بورتريه جالسة', ratio: '3/4' }, caption: 'بورتريه' },
  { id: 'gal-07', category: 'portraits', image: { src: P + 'neveen-striped.jpg', alt: 'بورتريه', ratio: '3/4' }, caption: 'بورتريه' },
  { id: 'gal-08', category: 'studio', image: { src: P + 'nevine-on-air.jpg', alt: 'نيفين على مكتب الاستوديو تحت لافتة ON AIR', ratio: '3/2' }, caption: 'على الهواء' },
  { id: 'gal-09', category: 'podcast', image: { src: P + 'nevine-headphones.jpg', alt: 'نيفين تستمع بسمّاعات الاستوديو', ratio: '3/2' }, caption: 'لحظة استماع' },
  { id: 'gal-10', category: 'podcast', image: { src: P + 'nevine-podcast-mic.jpg', alt: 'نيفين أمام ميكروفون البودكاست', ratio: '3/2' }, caption: 'أمام الميكروفون' },
  { id: 'gal-11', category: 'studio', image: { src: P + 'nevine-studio-white.jpg', alt: 'بورتريه أمام الميكروفون', ratio: '3/2' }, caption: 'بورتريه في الاستوديو' },
  { id: 'gal-12', category: 'bts', image: { alt: 'صورة كواليس مطلوبة', ratio: '4/5' }, caption: '[صورة مطلوبة — كواليس]' },
];
