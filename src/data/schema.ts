// src/data/schema.ts
import type { 
  SchemaOrganization, 
  SchemaEvent, 
  SchemaFAQPage,
  SchemaBreadcrumb 
} from '../types/seo'
import { siteConfig } from './seo'
import { eventMeta } from './event'
import { faqs } from './faqs'

// Organization Schema (used site-wide)
export const organizationSchema: SchemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.siteName,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/lumbinix logo.png`,
  sameAs: [
    'https://www.facebook.com/share/18hWaP5zwX/?mibextid=wwXIfr',
    'https://www.instagram.com/insta.lumbinix?igsh=eW9kZHNnZTM0ejJ3',
    'https://www.tiktok.com/@tiktok.lumbinix?lang=en',
    'https://discord.gg/WRwdEq2g2n'
  ]
}

// Event Schema (for homepage and event-related pages)
export const eventSchema: SchemaEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: eventMeta.name,
  description: eventMeta.description,
  startDate: '2026-08-08T09:00:00+05:45',
  endDate: '2026-08-10T18:00:00+05:45',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Lumbini Convention Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lumbini Convention Center',
      addressLocality: 'Lumbini',
      addressRegion: 'Lumbini Province',
      addressCountry: 'NP'
    }
  },
  image: [
    `${siteConfig.siteUrl}/lumbinix logo.png`,
    `${siteConfig.siteUrl}/og-image.jpg`
  ],
  offers: {
    '@type': 'Offer',
    url: `${siteConfig.siteUrl}${eventMeta.registrationUrl}`,
    price: '0',
    priceCurrency: 'NPR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-05-19T00:00:00+05:45'
  },
  organizer: {
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl
  }
}

// FAQ Schema
export const faqSchema: SchemaFAQPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(
  items: Array<{name: string, url: string}>
): SchemaBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`
    }))
  }
}
