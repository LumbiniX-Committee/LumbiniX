export interface EventMeta {
  name: string;
  date: string;
  venue: string;
  description: string;
  registrationUrl: string;
  countdownDate: string; // ISO format for countdown
}

export interface ScheduleEntry {
  time: string;
  title: string;
  description: string;
  location?: string;
  type: 'workshop' | 'competition' | 'social' | 'logistics';
}

export interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
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
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
