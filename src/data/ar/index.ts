import type { Content } from '../types';
import { profile } from './profile';
import { programs } from './programs';
import { episodes, mediaCategories } from './episodes';
import { gallery, galleryCategories } from './gallery';
import { guests } from './guests';
import { experience, languages, professionalSummary, skillGroups } from './experience';
import { education } from './education';
import { certifications } from './certifications';

/** المحتوى العربي — اللغة الأساسية للموقع. */
export const ar: Content = { profile, programs, episodes, mediaCategories, gallery, guests, galleryCategories, experience, skillGroups, languages, professionalSummary, education, certifications };
