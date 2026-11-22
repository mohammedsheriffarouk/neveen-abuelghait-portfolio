import type { Certification } from '../types';

export const certifications: Certification[] = [
  {
    id: 'cert-01',
    name: 'دورة التقديم الإذاعي',
    provider: '90s FM',
    instructor: 'د. يوسف الضالع',
    date: '[الشهر والسنة]',
    year: '[السنة]',
    duration: '[المدة]',
    category: 'الإذاعة',
    description: 'تدريب على التقديم الإذاعي في 90s FM مع د. يوسف الضالع، انتهى بشهادة إتمام الدورة. [أضف سطرًا أو اثنين عن محتوى الدورة]',
    skills: ['التقديم الإذاعي', 'الأداء على الهواء', '[مهارة]'],
    certificateImage: { alt: 'شهادة إتمام دورة التقديم الإذاعي — 90s FM (صورة الشهادة مطلوبة)', ratio: '4/3' },
    certificatePdf: 'assets/documents/certificates/cert-01.pdf',
  },
];
