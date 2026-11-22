import type { Content } from '../types';
import { profile } from './profile';
import { programs } from './programs';
import { episodes, mediaCategories } from './episodes';
import { gallery, galleryCategories } from './gallery';
import { experience, languages, professionalSummary, skillGroups } from './experience';
import { education } from './education';
import { certifications } from './certifications';

/** ENGLISH content bundle (secondary language). */
export const en: Content = { profile, programs, episodes, mediaCategories, gallery, galleryCategories, experience, skillGroups, languages, professionalSummary, education, certifications };
