import type { Profile } from '../types';

/**
 * PROFILE — personal & page-level copy.
 *
 * Source: Neveen's CV (Nov 2026) + Spotify show page.
 * Lines marked "DRAFT COPY" were written from CV facts and need her approval / her own voice.
 * Values in [BRACKETS] are still missing → see CONTENT_INVENTORY.md.
 */
export const profile: Profile = {
  // On-air name confirmed: Neveen Abuelghait (matches Spotify & Instagram).
  name: 'Neveen Abuelghait',
  shortName: 'Neveen Abuelghait',
  title: 'Broadcaster and talk-show host specializing in human behavior, social topics and communication',
  headline: 'I create content and conversations that open new angles on people, life and relationships.',
  intro: 'Through media, dialogue and content creation, I share ideas that help us think more consciously and connect better.',
  affiliations: [
    { id: 'af-fue', name: 'Future University in Egypt', logo: 'assets/images/logos/fue.png', caption: 'Economics & Political Science', group: 'academic' },
    { id: 'af-marriott', name: 'Marriott', logo: 'assets/images/logos/marriott.png', caption: 'Guest relations', group: 'academic' },
    { id: 'af-enbd', name: 'Emirates NBD', logo: 'assets/images/logos/emirates-nbd.png', caption: 'Banking experience', group: 'academic' },
    { id: 'af-90s', name: '90s FM Academy', caption: 'Radio & broadcast training', logo: 'assets/images/logos/90s-fm.png', group: 'training' },
    { id: 'af-almentor', name: 'al mentor', caption: 'Digital learning platform', logo: 'assets/images/logos/almentor-black.png', group: 'training' },
    { id: 'af-yanfaa', name: 'Yanfaa', caption: 'Training partner', logo: 'assets/images/logos/yanfaa.png', group: 'training' },
  ],
  topics: ['Awareness', 'Human Behavior', 'Communication', '«رأي تاني»', 'Conversation'],
  heroPortrait: { src: 'assets/images/portraits/nevine-headphones.jpg', alt: 'Neveen Abuelghait wearing studio headphones at the microphone', ratio: '4/5', position: '50% 38%' },

  // Neveen's approved About text (translated) — paragraphs separated by a blank line
  aboutPreview: [
    'Neveen Abuelghait is a program presenter and media content creator. She holds a Bachelor’s degree in Economics and Political Science, began her career in guest relations, then moved into banking — gaining experience in communication and understanding people’s needs across different personalities.',
    'Driven by her passion for media and understanding human behavior, she moved into media training, radio presenting and content creation, producing media projects centered on awareness, relationships, communication and human thinking.',
    'She currently hosts «رأي تاني» (Raay Tany), which offers different angles on life and people and encourages audiences to think outside the ordinary.',
    'She believes good conversation doesn’t stop at asking questions — it opens new space for understanding.',
  ].join('\n\n'),
  aboutImage: { src: 'assets/images/portraits/neveen-about-mic.jpg', alt: 'Neveen Abuelghait at the microphone in the 90s FM studio', ratio: '4/5', position: '50% 22%' },
  highlights: [
    { id: 'hl-01', value: '2+', label: 'Years on air' },
    { id: 'hl-02', value: '3', label: 'Programs hosted' },
    { id: 'hl-03', value: '50+', label: 'Episodes recorded' },
    { id: 'hl-04', value: '25+', label: 'Guests interviewed' },
  ],

  audioIntro: {
    title: 'Listen to My Voice',
    // DRAFT COPY
    description: 'The promo for season 3 of «عندي فكرة» on Radio 90s FM — under a minute of my voice on air.',
    src: 'assets/audio/andy-fekrah-promo.mp3',
    duration: '0:52',
    spotifyUrl: 'https://open.spotify.com/show/5flDkBxQZhXljNaKzhdN8O',
    image: { src: 'assets/images/portraits/nevine-podcast-mic.jpg', alt: 'Neveen Abuelghait at the studio microphone', ratio: '4/5', position: '54% 50%' },
  },

  about: {
    // DRAFT COPY (first person)
    introduction:
      'I’m drawn to the conversations that tell us something about ourselves — how we behave, what we believe, and why. The microphone is where I get to have them out loud.',
    biography: [
      'Neveen Abuelghait is a broadcaster, program presenter and creator of thought-driven content. She holds a Bachelor’s degree in Economics and Political Science, majoring in Political Science, from Future University in Egypt.',
      'She began her career in relations at Marriott, then moved into banking at Emirates NBD — giving her broad experience in communicating with people and understanding their needs.',
      'Driven by a passion for media and human connection, she joined a specialized radio presentation training program at 90s FM, followed by hands-on experience recording and presenting radio episodes online. On air at Radio 90s FM she presented season 3 of «عندي فكرة» and co-hosted «سهرة رمضانية» with Mohamed Sherif.',
      'Neveen currently hosts her talk show «رأي تاني» (Raay Tany — “A Second Opinion”) on digital platforms: a media project offering different perspectives on life, human behavior, relationships and conscious thinking, through social, cultural and intellectual ideas.',
    ],
    journey: [
      { id: 'jr-01', period: '2015', title: 'B.A. Economics & Political Science', text: 'Political Science major — Future University in Egypt.' },
      { id: 'jr-02', period: '2018 – 2020', title: 'Guest Relations — Marriott', text: 'Welcoming guests, communicating with them and understanding their needs.' },
      { id: 'jr-03', period: '2020 – 2025', title: 'Emirates NBD', text: 'SME department, in a client-facing banking environment.' },
      { id: 'jr-04', period: '[YEAR]', title: 'Radio training — 90s FM', text: 'Specialized radio presentation program with Dr. Youssef El-Daly.' },
      { id: 'jr-05', period: '[YEAR]', title: 'On air at Radio 90s FM', text: 'Season 3 of «عندي فكرة», and «سهرة رمضانية» with Mohamed Sherif.' },
      { id: 'jr-06', period: 'Now', title: '«رأي تاني» — digital platforms', text: 'Her talk show on life, human behavior, relationships and conscious thinking.' },
    ],
    // DRAFT COPY — must be rewritten / approved in her own words.
    approach: [
      'Good conversation starts with listening. Years in guest relations and client-facing banking taught me to read people quickly, make them comfortable, and ask the question behind the question.',
      'On air, I look for the human side of every topic — the behavior, the culture, the everyday problem that a listener recognizes as their own.',
    ],
    interests: ['Awareness & conscious thinking', 'Human Behavior', 'Relationships & Communication', 'Social & Cultural Topics', 'Intellectual Discussions', 'Talk Shows'],
    expertise: [
      { id: 'ex-01', title: 'Conversation & Interviews', text: 'Structuring a dialogue, following up and keeping a guest talking naturally.' },
      { id: 'ex-02', title: 'Audience Engagement', text: 'Speaking to listeners directly and keeping them with the conversation.' },
      { id: 'ex-03', title: 'Public Speaking & Presentation', text: 'Comfortable on microphone and on camera, in Modern Standard Arabic and Egyptian colloquial.' },
      { id: 'ex-04', title: 'Active Listening', text: 'Hearing what is said — and what isn’t — before responding.' },
      { id: 'ex-05', title: 'Guest Relations', text: 'Hosting people with warmth and professionalism, built in hospitality.' },
      { id: 'ex-06', title: 'Social & Cultural Awareness', text: 'A Political Science lens on society, culture and current conversation.' },
    ],
    photos: [
      { src: 'assets/images/portraits/neveen-studio-interview.jpg', alt: 'On set for a studio interview', ratio: '3/2', position: '50% 48%' },
      { src: 'assets/images/portraits/neveen-polka-seated.jpg', alt: 'Portrait', ratio: '1/1', position: '60% 25%' },
      { src: 'assets/images/portraits/neveen-event-red.jpg', alt: 'At an event', ratio: '1/1', position: '50% 38%' },
    ],
  },

  careerHighlights: [
    { id: 'ch-01', icon: 'radio', title: 'On air at Radio 90s FM', text: 'Presented season 3 of «عندي فكرة» on Radio 90s FM.' },
    { id: 'ch-02', icon: 'calendar', title: '«سهرة رمضانية»', text: 'Co-hosted a Ramadan evening special with Mohamed Sherif on Radio 90s FM.' },
    { id: 'ch-03', icon: 'mic', title: '«رأي تاني»', text: 'Her current talk show on digital platforms.' },
    { id: 'ch-04', icon: 'message', title: '25+ guests · 50+ episodes', text: 'Conversations and recorded episodes across radio and digital.' },
    { id: 'ch-05', icon: 'award', title: 'Specialized radio training', text: 'Radio presentation program at 90s FM with Dr. Youssef El-Daly.' },
    { id: 'ch-06', icon: 'users', title: 'A background in communication', text: 'Guest Relations at Marriott, then Emirates NBD.' },
  ],

  contact: {
    intro: 'For radio presenting and talk-show opportunities, podcast guest spots, interviews, voice work and collaborations — I’d love to hear from you.',
    email: 'neveenabuelghait223@gmail.com',
    location: 'Cairo, Egypt',
    availability: 'Open to Arabic radio presenting, talk-show hosting and podcast opportunities.',
  },

  services: [
    { id: 'sv-01', number: '01', title: 'Media Presenting', text: 'Hosting radio, TV and digital programs.' },
    { id: 'sv-02', number: '02', title: 'Conversation Management', text: 'Moderating interviews, panel discussions, talks and conferences.' },
    { id: 'sv-03', number: '03', title: 'Content Creation', text: 'Developing media and awareness content for brands and institutions.' },
    { id: 'sv-04', number: '04', title: 'Media Appearances', text: 'Appearing as a guest on shows, podcasts and media conversations.' },
    { id: 'sv-05', number: '05', title: 'Public Speaking', text: 'Delivering talks and interactive sessions at events and conferences.' },
  ],

  pressFeatures: [
    {
      id: 'pf-almentor',
      title: 'Featured on al mentor',
      description: 'Neveen shared her media experience in a dedicated recording for al mentor, one of the leading learning platforms in the Arab world.',
      logo: 'assets/images/logos/almentor-white.png',
      logoName: 'al mentor',
      cover: { src: 'assets/images/press/almentor-cover.jpg', alt: 'Neveen Abuelghait recording with al mentor', ratio: '4/5', position: '50% 30%' },
      instagramUrl: 'https://www.instagram.com/p/DBto7iaq5wO/',
      video: 'assets/video/almentor-feature.mp4',
    },
  ],

  cvPdf: 'assets/documents/cv-en.pdf', // generated from site data by scripts/build-cv.py
};
