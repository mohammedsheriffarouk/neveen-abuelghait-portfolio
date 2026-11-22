import type { Certification } from '../types';

/**
 * COURSES & CERTIFICATIONS — Education & Certifications page.
 * Filters appear automatically once there are 4 or more items.
 */
export const certifications: Certification[] = [
  {
    id: 'cert-01',
    name: 'Radio Presentation Course',
    provider: '90s FM',
    instructor: 'Dr. Youssef El-Daly',
    date: '[MMM YYYY]',
    year: '[YEAR]',
    duration: '[00 hours / weeks]',
    category: 'Broadcasting',
    description: 'Radio presentation training at 90s FM with Dr. Youssef El-Daly, completed with a certificate of completion. [Add 1–2 lines on what the course covered.]',
    skills: ['Radio presentation', 'On-air delivery', '[SKILL]'],
    certificateImage: { alt: 'Certificate of completion — Radio Presentation Course, 90s FM (scan needed)', ratio: '4/3' },
    certificatePdf: 'assets/documents/certificates/cert-01.pdf',
  },
];
