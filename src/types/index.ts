export interface EventMeta {
  name: string;
  date: string;
  venue: string;
  description: string;
  registrationUrl: string;
  countdownDate: string; // ISO format for countdown
}

export interface RoadmapMilestone {
  title: string;
  bsDate: string;
  time: string;
  description: string;
}

export interface ScheduleDayRow {
  time: string;
  activity: string;
}

export interface ScheduleDayBlock {
  dayTitle: string;
  bsDay: string;
  rows: ScheduleDayRow[];
}

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Prize {
  tier: string;
  amount: string;
  description: string;
  image?: string;
}

export interface TrackAward {
  title: string;
  amount: string;
  perks: string;
}

export interface TeamMemberProfile {
  name: string;
  role: string;
  image: string;
  twitterUrl: string;
  linkedinUrl: string;
}
