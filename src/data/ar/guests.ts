import type { GalleryItem } from '../types';

/** ضيوف الاستوديو — نفس الصور في النسختين. أضف الاسم في `description` لو حبّيت تعرضه. */
const G = 'assets/images/guests/';

export const guests: GalleryItem[] = [
  { id: 'guest-01', category: 'interviews', image: { src: G + 'guest-01.jpg', alt: 'نيفين مع ضيفة في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-02', category: 'interviews', image: { src: G + 'guest-02.jpg', alt: 'نيفين مع ضيف أمام الميكروفون في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-03', category: 'interviews', image: { src: G + 'guest-03.jpg', alt: 'نيفين مع ضيفة أمام شعار 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-04', category: 'interviews', image: { src: G + 'guest-04.jpg', alt: 'نيفين مع ضيف في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-05', category: 'interviews', image: { src: G + 'guest-05.jpg', alt: 'نيفين مع ضيفة في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-06', category: 'interviews', image: { src: G + 'guest-06.jpg', alt: 'نيفين تعانق ضيفتها في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-07', category: 'interviews', image: { src: G + 'guest-07.jpg', alt: 'نيفين مع ضيفة في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-08', category: 'interviews', image: { src: G + 'guest-08.jpg', alt: 'نيفين مع ضيف في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-09', category: 'interviews', image: { src: G + 'guest-09.jpg', alt: 'نيفين مع ضيفة في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-10', category: 'interviews', image: { src: G + 'guest-10.jpg', alt: 'نيفين مع ضيف أمام شعار 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-11', category: 'interviews', image: { src: G + 'guest-11.jpg', alt: 'نيفين مع ضيف في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-12', category: 'interviews', image: { src: G + 'guest-12.jpg', alt: 'نيفين مع ضيف أمام شعار 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
  { id: 'guest-13', category: 'interviews', image: { src: G + 'guest-13.jpg', alt: 'نيفين مع ضيفتين في استوديو 90s FM', ratio: '3/4' }, caption: 'من ضيوف الاستوديو' },
];
