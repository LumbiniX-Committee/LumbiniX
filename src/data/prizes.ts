import type { Prize, TrackAward } from "../types";

export const mainPrizes: Prize[] = [
  {
    tier: "1st place",
    amount: "NPR 50,000",
    description: "Cash prize + exclusive perks",
  },
  {
    tier: "2nd place",
    amount: "NPR 30,000",
    description: "Cash prize + exclusive perks",
  },
  {
    tier: "3rd place",
    amount: "NPR 20,000",
    description: "Cash prize + exclusive perks",
  },
];

export const trackAwards: TrackAward[] = [
  {
    title: "Best Social Impact Award",
    amount: "NPR 10,000",
    perks: "Medal + certificate",
  },
  {
    title: "Best Solana / blockchain solution",
    amount: "NPR 10,000",
    perks: "Medal + certificate",
  },
  {
    title: "Best use of AI / tech",
    amount: "NPR 10,000",
    perks: "Medal + certificate",
  },
];

export const prizePoolGrandTotalNPR = 200_000;

/** Suspense teaser for top 10 teams on prizes page. */
export const top10TeamsTeaser = "🎁 Top 10 teams will receive Claude Pro + Canva Pro subscriptions!";

export const prizeCeremonyNote =
  "All prizes are awarded at the closing ceremony on Day 3 in the main hall of Lumbini City College.";
