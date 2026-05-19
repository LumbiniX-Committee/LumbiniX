// src/data/seo.ts
import type { SEOConfig, PageSEO } from '../types/seo'

// Primary and secondary keywords for the site
export const keywords = {
  primary: [
    'LumbiniX Hackathon',
    'Nepal tech hackathon',
    'Lumbini technology event',
    'student hackathon Nepal'
  ],
  secondary: [
    'coding competition Nepal',
    'innovation challenge',
    'tech event Lumbini',
    'programming contest',
    'hackathon 2026 Nepal'
  ],
  longtail: [
    'best hackathon in Lumbini Nepal',
    'student technology competition Lumbini',
    'how to join LumbiniX hackathon',
    'prizes for hackathon in Nepal'
  ]
}

// Site-wide SEO configuration
export const siteConfig: SEOConfig = {
  siteName: 'LumbiniX Hackathon',
  siteUrl: 'https://lumbinix.com', // Update with actual domain
  defaultTitle: 'LumbiniX Hackathon 2026 | Nepal\'s Premier Tech Event',
  defaultDescription: 'Join LumbiniX Hackathon 2026 in Lumbini, Nepal. A premier technology event bringing together students, developers, and innovators to build solutions that matter. Register now for exciting prizes and networking opportunities.',
  defaultImage: '/og-image.jpg', // 1200x630px
  twitterHandle: '@lumbinix',
  locale: 'en_US',
  themeColor: '#7E4A9E',
  author: 'LumbiniX Organizing Team'
}

// Page-specific SEO data
export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'LumbiniX Hackathon 2026 | Innovation Meets Opportunity in Nepal',
    description: 'Join 500+ students at LumbiniX Hackathon 2026 in Lumbini, Nepal. 48-hour innovation challenge with ₹5 lakh in prizes. Register now for Nepal\'s biggest student tech event.',
    keywords: [...keywords.primary, ...keywords.secondary.slice(0, 3)],
    canonical: '/',
    ogType: 'website'
  },
  'coming-soon': {
    title: 'LUMBINIX | Coming Soon',
    description: 'LumbiniX | Something is coming. A new era of innovation is about to begin.',
    keywords: ['coming soon', 'LumbiniX teaser', ...keywords.primary],
    canonical: '/',
    ogType: 'website'
  },
  schedule: {
    title: 'Event Schedule | LumbiniX Hackathon 2026',
    description: 'Complete schedule for LumbiniX Hackathon 2026. Find registration times, workshop sessions, hacking periods, judging rounds, and award ceremonies. Plan your hackathon journey.',
    keywords: ['hackathon schedule', 'event timeline', ...keywords.primary],
    canonical: '/schedule',
    ogType: 'article'
  },
  prizes: {
    title: 'Prizes & Awards | ₹5 Lakh Prize Pool | LumbiniX Hackathon',
    description: 'Win from ₹5 lakh prize pool at LumbiniX Hackathon 2026. First prize ₹2 lakh, second prize ₹1.5 lakh, third prize ₹1 lakh, plus special category awards and swag.',
    keywords: ['hackathon prizes Nepal', 'tech competition rewards', ...keywords.primary],
    canonical: '/prizes',
    ogType: 'article'
  },
  sponsors: {
    title: 'Sponsors & Partners | LumbiniX Hackathon 2026',
    description: 'Thank you to our sponsors and partners making LumbiniX Hackathon possible. Join us as a sponsor to support Nepal\'s growing tech community.',
    keywords: ['hackathon sponsors', 'tech event partners Nepal', ...keywords.primary],
    canonical: '/sponsors',
    ogType: 'website'
  },
  team: {
    title: 'Organizing Team | LumbiniX Hackathon 2026',
    description: 'Meet the dedicated team behind LumbiniX Hackathon 2026. Passionate students and professionals working to create Nepal\'s premier tech event.',
    keywords: ['event organizers', 'hackathon team', ...keywords.primary],
    canonical: '/team',
    ogType: 'article'
  },
  faq: {
    title: 'FAQ | LumbiniX Hackathon 2026 - Your Questions Answered',
    description: 'Get answers to frequently asked questions about LumbiniX Hackathon 2026. Registration, eligibility, rules, accommodation, and more.',
    keywords: ['hackathon FAQ', 'event questions', ...keywords.primary],
    canonical: '/faq',
    ogType: 'article'
  },
  'code-of-conduct': {
    title: 'Code of Conduct | LumbiniX Hackathon 2026',
    description: 'Guidelines and rules for participants, mentors, and organizers of LumbiniX Hackathon 2026 to ensure a safe, inclusive, and collaborative environment.',
    keywords: ['hackathon rules', 'code of conduct', 'event guidelines', ...keywords.primary],
    canonical: '/code-of-conduct',
    ogType: 'article'
  }
}

// Breadcrumb schema data
export const breadcrumbs: Record<string, Array<{name: string, url: string}>> = {
  schedule: [
    { name: 'Home', url: '/' },
    { name: 'Schedule', url: '/schedule' }
  ],
  prizes: [
    { name: 'Home', url: '/' },
    { name: 'Prizes', url: '/prizes' }
  ],
  sponsors: [
    { name: 'Home', url: '/' },
    { name: 'Sponsors', url: '/sponsors' }
  ],
  team: [
    { name: 'Home', url: '/' },
    { name: 'Team', url: '/team' }
  ],
  faq: [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ],
  'code-of-conduct': [
    { name: 'Home', url: '/' },
    { name: 'Code of Conduct', url: '/code-of-conduct' }
  ]
}
