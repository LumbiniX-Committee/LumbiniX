import type { ScheduleEntry } from "../types";

export const schedule: ScheduleEntry[] = [
  {
    time: "09:00 AM",
    title: "Check-in & Breakfast",
    description: "Grab your badge and some coffee to start the day.",
    type: "logistics",
  },
  {
    time: "10:30 AM",
    title: "Opening Ceremony",
    description: "Introduction to themes, sponsors, and rules.",
    type: "social",
  },
  {
    time: "11:30 AM",
    title: "Hacking Begins",
    description: "Start building your projects!",
    type: "competition",
  },
  {
    time: "02:00 PM",
    title: "Intro to Web3 Workshop",
    description: "A deep dive into decentralized applications.",
    type: "workshop",
    location: "Hall A",
  },
  {
    time: "07:00 PM",
    title: "Dinner & Networking",
    description: "Connect with fellow hackers over delicious food.",
    type: "social",
  },
];
