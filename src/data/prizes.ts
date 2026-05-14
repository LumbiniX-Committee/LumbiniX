import type { Prize, TrackAward } from "../types";

export const mainPrizes: Prize[] = [
  {
    tier: "1st place",
    amount: "NPR 50,000",
    description: "Gold trophy + certificate",
  },
  {
    tier: "2nd place",
    amount: "NPR 30,000",
    description: "Silver trophy + certificate",
  },
  {
    tier: "3rd place",
    amount: "NPR 20,000",
    description: "Bronze trophy + certificate",
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

/** Partner tool access called out in copy (bracket style on the prizes page). */
export const prizePartnerPerksBracket = "[Claude Pro (Anthropic), Canva Pro]";

export const prizeCeremonyNote =
  "All prizes are awarded at the closing ceremony on Day 3 in the main hall of Lumbini City College.";
