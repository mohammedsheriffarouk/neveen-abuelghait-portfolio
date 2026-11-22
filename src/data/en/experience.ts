import type { Experience, Language, SkillGroup } from '../types';

/**
 * WORK EXPERIENCE — newest first. Source: CV.
 * The CV gives departments but not job titles or locations → marked [BRACKETS].
 */
export const experience: Experience[] = [
  {
    id: 'exp-01',
    title: 'Host & Content Creator',
    organization: '«رأي تاني» — digital platforms',
    start: '[YEAR]',
    end: 'Present',
    type: 'Independent media project',
    location: '[CITY, COUNTRY]',
    summary: 'A talk show offering different perspectives on life, human behavior, relationships and conscious thinking.',
    responsibilities: ['Developing and presenting episode ideas.', 'Leading conversations with guests.', '[RESPONSIBILITY — e.g. editing or publishing]'],
    achievements: ['[ACHIEVEMENT — episodes / views / notable guest]'],
    galleryIds: ['gal-01'],
    mediaIds: ['med-21', 'med-22', 'med-23'],
  },
  {
    id: 'exp-01b',
    title: 'Radio Presenter',
    organization: 'Radio 90s FM',
    start: '[YEAR]',
    end: '[YEAR]',
    type: '[CONTRACT TYPE]',
    location: '[CITY, COUNTRY]',
    summary: 'On-air presenting after a specialized radio presentation program with Dr. Youssef El-Daly.',
    responsibilities: [
      'Presented season 3 of «عندي فكرة» (Saturdays, 4:00 PM).',
      'Co-hosted «سهرة رمضانية» with Mohamed Sherif in the Ramadan line-up (11:30 PM).',
      'Recorded radio episodes and interviewed guests.',
    ],
    achievements: ['50+ episodes recorded and 25+ guests interviewed (career total).'],
    galleryIds: ['gal-13', 'gal-14'],
    mediaIds: ['med-00', 'med-09'],
  },
  {
    id: 'exp-02',
    title: 'Small & Medium Enterprises (SME) Department',
    organization: 'Emirates NBD',
    start: '2020',
    end: '2025',
    type: '[EMPLOYMENT TYPE]',
    location: '[CITY, COUNTRY]',
    summary: 'Five years in the SME department of Emirates NBD, in a client-facing banking environment. [ROLE SUMMARY — 1–2 lines in her words]',
    responsibilities: ['[RESPONSIBILITY — e.g. client communication with SME owners]', '[RESPONSIBILITY]'],
    achievements: ['[ACHIEVEMENT — optional]'],
    galleryIds: [],
    mediaIds: [],
  },
  {
    id: 'exp-03',
    title: 'Guest Relations',
    organization: 'Marriott',
    start: '2018',
    end: '2020',
    type: '[EMPLOYMENT TYPE]',
    location: '[HOTEL / CITY]',
    summary: 'Guest relations in an international hotel: welcoming guests, communicating with them and handling their requests.',
    responsibilities: ['[RESPONSIBILITY]', '[RESPONSIBILITY]'],
    achievements: ['[ACHIEVEMENT — optional]'],
    galleryIds: [],
    mediaIds: [],
  },
];

/** SKILLS — from the CV, grouped for scanning. */
export const skillGroups: SkillGroup[] = [
  { id: 'sk-01', group: 'Presentation', skills: ['Public Speaking & Presentation', 'On-Camera Presentation', 'Audio & Talk-Show Recording'] },
  { id: 'sk-02', group: 'Hosting & Interviewing', skills: ['Conversation & Interview Skills', 'Audience Engagement', 'Active Listening'] },
  { id: 'sk-03', group: 'People', skills: ['Communication & Interpersonal Skills', 'Guest Relations'] },
  { id: 'sk-04', group: 'Perspective', skills: ['Social & Cultural Awareness', 'Political Science background'] },
];

export const languages: Language[] = [
  { id: 'lng-01', language: 'Arabic', level: 'Native — Modern Standard Arabic & Egyptian Colloquial' },
  { id: 'lng-02', language: 'English', level: 'Basic' },
];

export const professionalSummary =
  'Broadcaster, program presenter and creator of thought-driven content. Presented season 3 of «عندي فكرة» and co-hosted «سهرة رمضانية» on Radio 90s FM, and currently hosts the talk show «رأي تاني» on digital platforms. Economics & Political Science graduate with a background in Guest Relations at Marriott and banking at Emirates NBD — experience in communicating with people and understanding their needs.';
