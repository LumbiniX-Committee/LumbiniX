export interface SEOConfig {
  siteName: string
  siteUrl: string
  defaultTitle: string
  defaultDescription: string
  defaultImage: string
  twitterHandle: string
  locale: string
  themeColor: string
  author: string
}

export interface PageSEO {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogType: 'website' | 'article' | 'profile'
  ogImage?: string
  noindex?: boolean
  nofollow?: boolean
}

export interface SchemaOrganization {
  '@context': string
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  sameAs: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    email: string
    contactType: string
  }
}

export interface SchemaEvent {
  '@context': string
  '@type': 'Event'
  name: string
  description: string
  startDate: string
  endDate: string
  eventStatus: string
  eventAttendanceMode: string
  location: {
    '@type': 'Place'
    name: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      addressRegion: string
      addressCountry: string
    }
  }
  image: string[]
  offers?: {
    '@type': 'Offer'
    url: string
    price: string
    priceCurrency: string
    availability: string
    validFrom: string
  }
  organizer: {
    '@type': 'Organization'
    name: string
    url: string
  }
}

export interface SchemaFAQPage {
  '@context': string
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export interface SchemaBreadcrumb {
  '@context': string
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}
