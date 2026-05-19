# Astro SEO Implementation Skill

**Use this skill when:** The user wants to implement SEO for an Astro website, optimize for search engines, improve site rankings, add meta tags, create sitemaps, implement schema markup, optimize for keywords, improve page speed, or implement any SEO best practices for static sites.

---

## 🎯 SEO Strategy Overview

SEO for Astro sites leverages the framework's excellent performance characteristics and requires a systematic approach across technical, on-page, and content optimization.

### SEO Checklist
- [ ] Keyword research and targeting strategy
- [ ] On-page optimization (meta tags, headings, content)
- [ ] Technical SEO (robots.txt, sitemap, canonical URLs)
- [ ] Schema markup (JSON-LD structured data)
- [ ] Performance optimization (Core Web Vitals)
- [ ] Internal linking strategy
- [ ] Mobile optimization
- [ ] Image optimization and alt text
- [ ] Social media meta tags (Open Graph, Twitter Cards)

---

## 📋 Step 1: Keyword Strategy & Data Structure

### 1.1 Create SEO Data File

Create `src/data/seo.ts` to centralize all SEO-related data:

```typescript
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
    'hackathon 2024 Nepal'
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
  defaultTitle: 'LumbiniX Hackathon 2024 | Nepal\'s Premier Tech Event',
  defaultDescription: 'Join LumbiniX Hackathon 2024 in Lumbini, Nepal. A premier technology event bringing together students, developers, and innovators to build solutions that matter. Register now for exciting prizes and networking opportunities.',
  defaultImage: '/og-image.jpg', // 1200x630px
  twitterHandle: '@lumbinix',
  locale: 'en_US',
  themeColor: '#8B5CF6',
  author: 'LumbiniX Organizing Team'
}

// Page-specific SEO data
export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'LumbiniX Hackathon 2024 | Innovation Meets Opportunity in Nepal',
    description: 'Join 500+ students at LumbiniX Hackathon 2024 in Lumbini, Nepal. 48-hour innovation challenge with ₹5 lakh in prizes. Register now for Nepal\'s biggest student tech event.',
    keywords: [...keywords.primary, ...keywords.secondary.slice(0, 3)],
    canonical: '/',
    ogType: 'website'
  },
  schedule: {
    title: 'Event Schedule | LumbiniX Hackathon 2024',
    description: 'Complete schedule for LumbiniX Hackathon 2024. Find registration times, workshop sessions, hacking periods, judging rounds, and award ceremonies. Plan your hackathon journey.',
    keywords: ['hackathon schedule', 'event timeline', ...keywords.primary],
    canonical: '/schedule',
    ogType: 'article'
  },
  speakers: {
    title: 'Speakers & Mentors | LumbiniX Hackathon 2024',
    description: 'Meet industry experts, tech leaders, and experienced mentors at LumbiniX Hackathon. Learn from professionals in AI, web development, blockchain, and more.',
    keywords: ['tech speakers Nepal', 'hackathon mentors', ...keywords.primary],
    canonical: '/speakers',
    ogType: 'article'
  },
  prizes: {
    title: 'Prizes & Awards | ₹5 Lakh Prize Pool | LumbiniX Hackathon',
    description: 'Win from ₹5 lakh prize pool at LumbiniX Hackathon 2024. First prize ₹2 lakh, second prize ₹1.5 lakh, third prize ₹1 lakh, plus special category awards and swag.',
    keywords: ['hackathon prizes Nepal', 'tech competition rewards', ...keywords.primary],
    canonical: '/prizes',
    ogType: 'article'
  },
  sponsors: {
    title: 'Sponsors & Partners | LumbiniX Hackathon 2024',
    description: 'Thank you to our sponsors and partners making LumbiniX Hackathon possible. Join us as a sponsor to support Nepal\'s growing tech community.',
    keywords: ['hackathon sponsors', 'tech event partners Nepal', ...keywords.primary],
    canonical: '/sponsors',
    ogType: 'website'
  },
  team: {
    title: 'Organizing Team | LumbiniX Hackathon 2024',
    description: 'Meet the dedicated team behind LumbiniX Hackathon 2024. Passionate students and professionals working to create Nepal\'s premier tech event.',
    keywords: ['event organizers', 'hackathon team', ...keywords.primary],
    canonical: '/team',
    ogType: 'article'
  },
  faq: {
    title: 'FAQ | LumbiniX Hackathon 2024 - Your Questions Answered',
    description: 'Get answers to frequently asked questions about LumbiniX Hackathon 2024. Registration, eligibility, rules, accommodation, and more.',
    keywords: ['hackathon FAQ', 'event questions', ...keywords.primary],
    canonical: '/faq',
    ogType: 'article'
  }
}

// Breadcrumb schema data
export const breadcrumbs: Record<string, Array<{name: string, url: string}>> = {
  schedule: [
    { name: 'Home', url: '/' },
    { name: 'Schedule', url: '/schedule' }
  ],
  speakers: [
    { name: 'Home', url: '/' },
    { name: 'Speakers', url: '/speakers' }
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
  ]
}
```

### 1.2 Create SEO Type Definitions

Create `src/types/seo.ts`:

```typescript
// src/types/seo.ts
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
```

---

## 📄 Step 2: SEO Component

### 2.1 Create SEO Component

Create `src/components/SEO.astro`:

```astro
---
// src/components/SEO.astro
import { siteConfig } from '../data/seo'
import type { PageSEO } from '../types/seo'

interface Props {
  seo: PageSEO
  schema?: Array<Record<string, any>>
}

const { seo, schema = [] } = Astro.props
const canonicalURL = new URL(seo.canonical, siteConfig.siteUrl).href
const ogImage = seo.ogImage || siteConfig.defaultImage
const fullImageURL = new URL(ogImage, siteConfig.siteUrl).href

// Build keywords string
const keywordsString = seo.keywords.join(', ')
---

<!-- Primary Meta Tags -->
<title>{seo.title}</title>
<meta name="title" content={seo.title} />
<meta name="description" content={seo.description} />
<meta name="keywords" content={keywordsString} />
<meta name="author" content={siteConfig.author} />
<meta name="robots" content={`${seo.noindex ? 'noindex' : 'index'},${seo.nofollow ? 'nofollow' : 'follow'}`} />
<meta name="googlebot" content={`${seo.noindex ? 'noindex' : 'index'},${seo.nofollow ? 'nofollow' : 'follow'}`} />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={seo.ogType} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={seo.title} />
<meta property="og:description" content={seo.description} />
<meta property="og:image" content={fullImageURL} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content={siteConfig.siteName} />
<meta property="og:locale" content={siteConfig.locale} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalURL} />
<meta name="twitter:title" content={seo.title} />
<meta name="twitter:description" content={seo.description} />
<meta name="twitter:image" content={fullImageURL} />
<meta name="twitter:site" content={siteConfig.twitterHandle} />
<meta name="twitter:creator" content={siteConfig.twitterHandle} />

<!-- Additional Meta Tags -->
<meta name="theme-color" content={siteConfig.themeColor} />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Geo Tags (for local SEO) -->
<meta name="geo.region" content="NP-P5" />
<meta name="geo.placename" content="Lumbini" />
<meta name="geo.position" content="27.4833;83.2764" />
<meta name="ICBM" content="27.4833, 83.2764" />

<!-- JSON-LD Schema Markup -->
{schema.map((schemaItem) => (
  <script type="application/ld+json" set:html={JSON.stringify(schemaItem)} />
))}

<!-- Preconnect to external domains for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 2.2 Update Base Layout

Update `src/layouts/BaseLayout.astro` to use the SEO component:

```astro
---
// src/layouts/BaseLayout.astro
import SEO from '../components/SEO.astro'
import { pageSEO } from '../data/seo'
import type { PageSEO } from '../types/seo'

interface Props {
  pageKey: keyof typeof pageSEO
  schema?: Array<Record<string, any>>
}

const { pageKey, schema = [] } = Astro.props
const seo = pageSEO[pageKey]
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <SEO seo={seo} schema={schema} />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## 🔍 Step 3: Schema Markup (JSON-LD)

### 3.1 Create Schema Data File

Create `src/data/schema.ts`:

```typescript
// src/data/schema.ts
import type { 
  SchemaOrganization, 
  SchemaEvent, 
  SchemaFAQPage,
  SchemaBreadcrumb 
} from '../types/seo'
import { siteConfig } from './seo'
import { eventData } from './event'
import { faqs } from './faqs'

// Organization Schema (used site-wide)
export const organizationSchema: SchemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LumbiniX Hackathon',
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/logo.png`,
  sameAs: [
    'https://facebook.com/lumbinix',
    'https://twitter.com/lumbinix',
    'https://instagram.com/lumbinix',
    'https://linkedin.com/company/lumbinix'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@lumbinix.com',
    contactType: 'Customer Service'
  }
}

// Event Schema (for homepage and event-related pages)
export const eventSchema: SchemaEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'LumbiniX Hackathon 2024',
  description: 'A premier 48-hour technology hackathon in Lumbini, Nepal, bringing together students and developers to innovate and build impactful solutions.',
  startDate: '2024-12-15T09:00:00+05:45',
  endDate: '2024-12-17T18:00:00+05:45',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Lumbini Convention Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Buddha Marg',
      addressLocality: 'Lumbini',
      addressRegion: 'Lumbini Province',
      addressCountry: 'NP'
    }
  },
  image: [
    `${siteConfig.siteUrl}/event-image-1.jpg`,
    `${siteConfig.siteUrl}/event-image-2.jpg`,
    `${siteConfig.siteUrl}/og-image.jpg`
  ],
  offers: {
    '@type': 'Offer',
    url: `${siteConfig.siteUrl}/#register`,
    price: '0',
    priceCurrency: 'NPR',
    availability: 'https://schema.org/InStock',
    validFrom: '2024-11-01T00:00:00+05:45'
  },
  organizer: {
    '@type': 'Organization',
    name: 'LumbiniX',
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
```

### 3.2 Use Schema in Pages

Example for `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import { organizationSchema, eventSchema } from '../data/schema'

const schema = [organizationSchema, eventSchema]
---

<BaseLayout pageKey="home" schema={schema}>
  <!-- Page content -->
</BaseLayout>
```

Example for `src/pages/faq.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import { organizationSchema, faqSchema, generateBreadcrumbSchema } from '../data/schema'
import { breadcrumbs } from '../data/seo'

const schema = [
  organizationSchema, 
  faqSchema,
  generateBreadcrumbSchema(breadcrumbs.faq)
]
---

<BaseLayout pageKey="faq" schema={schema}>
  <!-- FAQ content -->
</BaseLayout>
```

---

## 🤖 Step 4: robots.txt & Sitemap

### 4.1 Create robots.txt

Create `public/robots.txt`:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin or private sections (if any)
# Disallow: /admin/
# Disallow: /private/

# Crawl-delay for polite bots (optional)
Crawl-delay: 1

# Sitemap location
Sitemap: https://lumbinix.com/sitemap-index.xml
```

### 4.2 Install Sitemap Integration

```bash
npm install @astrojs/sitemap
```

### 4.3 Configure Sitemap in astro.config.mjs

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://lumbinix.com', // Your production URL
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom entries for dynamic priority
      customPages: [
        'https://lumbinix.com/', // Homepage - highest priority
      ],
      serialize(item) {
        // Customize priority based on path
        if (item.url === 'https://lumbinix.com/') {
          item.priority = 1.0
          item.changefreq = 'daily'
        } else if (item.url.includes('/schedule') || item.url.includes('/prizes')) {
          item.priority = 0.9
          item.changefreq = 'weekly'
        } else {
          item.priority = 0.7
          item.changefreq = 'monthly'
        }
        return item
      }
    })
  ]
})
```

---

## ⚡ Step 5: Performance Optimization

### 5.1 Image Optimization

Install Astro Image Integration:

```bash
npm install @astrojs/image sharp
```

Update `astro.config.mjs`:

```javascript
import image from '@astrojs/image'

export default defineConfig({
  // ... other config
  integrations: [
    // ... other integrations
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    })
  ]
})
```

### 5.2 Optimize Images in Components

```astro
---
// Before: Regular img tag
// <img src="/speaker.jpg" alt="Speaker" />

// After: Optimized image
import { Picture } from '@astrojs/image/components'
---

<Picture
  src="/speaker.jpg"
  alt="John Doe - AI Expert and Keynote Speaker at LumbiniX Hackathon"
  widths={[320, 640, 960]}
  sizes="(max-width: 640px) 320px, (max-width: 960px) 640px, 960px"
  formats={['avif', 'webp', 'jpeg']}
  loading="lazy"
  decoding="async"
/>
```

### 5.3 Font Optimization

Update font loading in base layout:

```astro
---
// src/layouts/BaseLayout.astro
---
<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  
  <!-- Use font-display: swap for better performance -->
  <style>
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
  </style>
</head>
```

### 5.4 Critical CSS Inlining

Astro already inlines critical CSS automatically. Ensure styles are scoped:

```astro
---
// Component with scoped styles (automatically inlined)
---
<div class="hero">
  <h1>Welcome</h1>
</div>

<style>
  .hero {
    /* These styles are automatically scoped and inlined */
  }
</style>
```

### 5.5 Lazy Loading Strategy

```astro
---
// Lazy load below-the-fold images
---
<img 
  src="/image.jpg" 
  alt="Descriptive alt text with keywords"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
/>

<!-- Eager load above-the-fold images -->
<img 
  src="/hero.jpg" 
  alt="LumbiniX Hackathon 2024 main stage"
  loading="eager"
  fetchpriority="high"
  width="1920"
  height="1080"
/>
```

---

## 🔗 Step 6: Internal Linking Strategy

### 6.1 Create Navigation Component with SEO-Optimized Links

```astro
---
// src/components/Navbar.astro
const navLinks = [
  { href: '/', text: 'Home', title: 'LumbiniX Hackathon Homepage' },
  { href: '/schedule', text: 'Schedule', title: 'Event Schedule and Timeline' },
  { href: '/speakers', text: 'Speakers', title: 'Meet Our Expert Speakers' },
  { href: '/prizes', text: 'Prizes', title: 'Prize Pool and Awards' },
  { href: '/sponsors', text: 'Sponsors', title: 'Our Sponsors and Partners' },
  { href: '/team', text: 'Team', title: 'Organizing Team Members' },
  { href: '/faq', text: 'FAQ', title: 'Frequently Asked Questions' }
]
---

<nav aria-label="Main navigation">
  <ul>
    {navLinks.map(link => (
      <li>
        <a 
          href={link.href} 
          title={link.title}
          aria-label={link.title}
        >
          {link.text}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

### 6.2 Contextual Internal Links

Add contextual links within content:

```astro
---
// Example in Hero section
---
<section class="hero">
  <h1>LumbiniX Hackathon 2024</h1>
  <p>
    Join us for 48 hours of innovation. Check out our 
    <a href="/prizes" title="View prize pool and awards">amazing prizes</a> 
    and meet our 
    <a href="/speakers" title="Expert speakers and mentors">industry expert speakers</a>.
  </p>
  <p>
    Review the 
    <a href="/schedule" title="Complete event timeline">event schedule</a> 
    and 
    <a href="/faq" title="Common questions answered">frequently asked questions</a> 
    before registering.
  </p>
</section>
```

### 6.3 Footer with Rich Links

```astro
---
// src/components/Footer.astro
---
<footer>
  <div class="footer-links">
    <div class="link-group">
      <h3>Event</h3>
      <ul>
        <li><a href="/schedule" title="Full event schedule">Schedule</a></li>
        <li><a href="/speakers" title="Speaker profiles">Speakers</a></li>
        <li><a href="/prizes" title="Prize details">Prizes</a></li>
        <li><a href="/faq" title="FAQ">FAQ</a></li>
      </ul>
    </div>
    <div class="link-group">
      <h3>About</h3>
      <ul>
        <li><a href="/team" title="Meet the team">Our Team</a></li>
        <li><a href="/sponsors" title="Event sponsors">Sponsors</a></li>
        <li><a href="/contact" title="Contact us">Contact</a></li>
      </ul>
    </div>
  </div>
</footer>
```

---

## 📱 Step 7: Mobile & Accessibility SEO

### 7.1 Viewport & Mobile Tags

Already included in SEO component, but ensure responsive images:

```astro
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="mobile-web-app-capable" content="yes" />
```

### 7.2 Semantic HTML & ARIA

```astro
---
// Use semantic HTML5 elements
---
<header>
  <nav aria-label="Main navigation">
    <!-- Navigation -->
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Page Title</h1>
    <!-- Content -->
  </article>
</main>

<aside aria-label="Related information">
  <!-- Sidebar -->
</aside>

<footer>
  <!-- Footer content -->
</footer>
```

### 7.3 Skip Links for Accessibility

```astro
---
// Add at top of body in BaseLayout
---
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }
  
  .skip-link:focus {
    top: 0;
  }
</style>
```

---

## 📊 Step 8: Content Optimization with Keywords

### 8.1 Heading Hierarchy with Keywords

```astro
---
// Proper heading structure with natural keyword placement
---
<main>
  <h1>LumbiniX Hackathon 2024 - Nepal's Premier Tech Event</h1>
  
  <section>
    <h2>Join the Biggest Student Hackathon in Lumbini</h2>
    <p>
      LumbiniX Hackathon brings together innovative students and developers 
      for a 48-hour coding competition in the heart of Nepal.
    </p>
  </section>
  
  <section>
    <h2>Why Participate in LumbiniX Hackathon?</h2>
    <h3>Win Exciting Prizes</h3>
    <!-- Content -->
    
    <h3>Learn from Expert Mentors</h3>
    <!-- Content -->
    
    <h3>Network with Tech Leaders</h3>
    <!-- Content -->
  </section>
</main>
```

### 8.2 Alt Text Optimization

```astro
---
// Bad alt text
---
<img src="/speaker.jpg" alt="speaker" />

---
// Good alt text with keywords and context
---
<img 
  src="/speaker-john-doe.jpg" 
  alt="John Doe, AI Expert and keynote speaker at LumbiniX Hackathon 2024, presenting on machine learning in Nepal" 
/>
```

### 8.3 Content with LSI Keywords

Create content using Latent Semantic Indexing (related) keywords:

```astro
<article>
  <h1>LumbiniX Hackathon 2024 Guide</h1>
  
  <p>
    <!-- Primary keyword -->
    <strong>LumbiniX Hackathon</strong> is Nepal's premier 
    
    <!-- LSI keywords -->
    <em>technology event</em> for students and developers. This 
    <em>innovation challenge</em> brings together the brightest minds in 
    <em>software development</em>, <em>artificial intelligence</em>, and 
    <em>web development</em>.
  </p>
  
  <p>
    <!-- Long-tail keyword -->
    If you're wondering <strong>how to join LumbiniX hackathon</strong>, 
    registration is simple. Visit our homepage and complete the 
    <em>online registration form</em>.
  </p>
</article>
```

---

## 🎯 Step 9: Local SEO Optimization

### 9.1 Local Business Schema

```typescript
// Add to src/data/schema.ts
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LumbiniX Hackathon',
  image: `${siteConfig.siteUrl}/logo.png`,
  '@id': siteConfig.siteUrl,
  url: siteConfig.siteUrl,
  telephone: '+977-XXXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Buddha Marg',
    addressLocality: 'Lumbini',
    addressRegion: 'Lumbini Province',
    postalCode: '32900',
    addressCountry: 'NP'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.4833,
    longitude: 83.2764
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Friday',
      'Saturday',
      'Sunday'
    ],
    opens: '09:00',
    closes: '18:00'
  }
}
```

### 9.2 Location Pages

If targeting multiple cities, create location-specific pages with unique content:

```astro
---
// src/pages/lumbini-tech-event.astro
---
<BaseLayout pageKey="home">
  <h1>Technology Events in Lumbini | LumbiniX Hackathon</h1>
  <p>
    Looking for tech events in Lumbini, Nepal? LumbiniX Hackathon is 
    the region's premier coding competition and innovation challenge...
  </p>
</BaseLayout>
```

---

## 🚀 Step 10: Final Checklist & Testing

### 10.1 Pre-Launch SEO Checklist

```markdown
## Technical SEO
- [ ] robots.txt configured and accessible
- [ ] XML sitemap generated and submitted to Google Search Console
- [ ] All pages have unique titles under 60 characters
- [ ] All pages have unique descriptions under 160 characters
- [ ] Canonical URLs set correctly on all pages
- [ ] No broken internal links
- [ ] 404 page created with helpful navigation
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Mobile-friendly test passed
- [ ] Page speed score > 90 on PageSpeed Insights
- [ ] Core Web Vitals in "good" range (LCP, FID, CLS)

## On-Page SEO
- [ ] Primary keyword in H1 on each page
- [ ] Heading hierarchy (H1 → H2 → H3) properly structured
- [ ] Alt text on all images with descriptive, keyword-rich text
- [ ] Internal links using descriptive anchor text
- [ ] External links open in new tab with rel="noopener"
- [ ] Schema markup implemented (Organization, Event, FAQ, Breadcrumb)
- [ ] Open Graph tags on all pages
- [ ] Twitter Card tags on all pages

## Content SEO
- [ ] Primary keywords naturally integrated in content
- [ ] LSI keywords included throughout
- [ ] Content is original, valuable, and >300 words per page
- [ ] Call-to-actions clear and prominent
- [ ] Contact information easily accessible

## Performance
- [ ] Images optimized and lazy loaded
- [ ] Fonts preloaded and using font-display: swap
- [ ] CSS and JS minified
- [ ] Gzip compression enabled
- [ ] Browser caching configured
- [ ] CDN configured (if applicable)

## Local SEO
- [ ] Google My Business profile created
- [ ] NAP (Name, Address, Phone) consistent across web
- [ ] Local business schema implemented
- [ ] Location pages created with unique content
```

### 10.2 Testing Tools

Use these tools to validate SEO implementation:

1. **Google Search Console**: Submit sitemap, check indexing status
2. **PageSpeed Insights**: Test performance and Core Web Vitals
3. **Google Rich Results Test**: Validate schema markup
4. **Mobile-Friendly Test**: Ensure mobile optimization
5. **Schema Markup Validator**: Check JSON-LD implementation
6. **Lighthouse**: Comprehensive audit (SEO, Performance, Accessibility)
7. **Screaming Frog**: Crawl site for technical issues

### 10.3 Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://lumbinix.com --view --output html --output-path ./lighthouse-report.html
```

---

## 📈 Step 11: Post-Launch Monitoring

### 11.1 Analytics Setup

```astro
---
// Add to BaseLayout.astro <head>
---
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="your-verification-code" />
```

### 11.2 Track Important Metrics

- Organic traffic growth
- Keyword rankings
- Click-through rates (CTR)
- Bounce rate
- Average session duration
- Pages per session
- Conversion rate (registrations)
- Core Web Vitals scores

---

## 🛠 Common SEO Fixes

### Issue: Duplicate Content
**Solution**: Use canonical tags to specify preferred version

```astro
<link rel="canonical" href="https://lumbinix.com/preferred-url" />
```

### Issue: Slow Page Load
**Solutions**:
- Optimize images (use WebP, AVIF)
- Implement lazy loading
- Minimize JavaScript
- Use CDN for static assets
- Enable compression

### Issue: Poor Mobile Experience
**Solutions**:
- Use responsive design (Tailwind mobile-first approach)
- Ensure tap targets are at least 48x48px
- Avoid intrusive interstitials
- Test on real devices

### Issue: Low Engagement
**Solutions**:
- Improve content quality and relevance
- Add compelling CTAs
- Use engaging multimedia (videos, infographics)
- Implement internal linking to reduce bounce rate

---

## 🎓 Best Practices Summary

1. **Content First**: Create valuable, original content that serves user intent
2. **Keywords Naturally**: Integrate keywords organically, never force or stuff
3. **Mobile Priority**: Design and optimize for mobile users first
4. **Speed Matters**: Every second counts; optimize ruthlessly
5. **Schema Markup**: Help search engines understand your content
6. **User Experience**: SEO follows UX; make users happy first
7. **Monitor & Iterate**: SEO is ongoing; continuously measure and improve
8. **White Hat Only**: Never use black hat tactics; they backfire
9. **Local Focus**: Optimize for local search if targeting regional audience
10. **Accessibility**: Accessible sites rank better and serve more users

---

## 📚 Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev - Learn SEO](https://web.dev/learn/seo/)
- [Astro SEO Best Practices](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**This skill provides a complete SEO implementation strategy for Astro websites. Follow all steps systematically for maximum search visibility.**