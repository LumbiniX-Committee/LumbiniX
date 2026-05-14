import type { ScheduleDayBlock } from "../types";

export const eventScheduleDays: ScheduleDayBlock[] = [
  {
    dayTitle: "Day 1 — Kickoff & build phase",
    bsDay: "Shrawan 22, 2083 BS",
    rows: [
      { time: "7:00 – 8:00", activity: "Registration & breakfast" },
      { time: "8:00 – 9:00", activity: "Opening ceremony" },
      { time: "09:00", activity: "Hackathon officially commences" },
      { time: "11:00 – 12:00", activity: "Lunch break" },
      { time: "12:00 – 15:00", activity: "Development sprint" },
      { time: "15:00 – 16:00", activity: "Snacks & networking break" },
      { time: "16:00 – 20:00", activity: "Development sprint" },
      { time: "20:00 – 21:00", activity: "Dinner" },
      { time: "21:00 – 01:00", activity: "Overnight development marathon" },
      { time: "01:00 – 02:00", activity: "Midnight recreation session" },
      { time: "02:00 onwards", activity: "Continuous development" },
    ],
  },
  {
    dayTitle: "Day 2 — Intensive development",
    bsDay: "Shrawan 23, 2083 BS",
    rows: [
      { time: "7:00 – 8:00", activity: "Breakfast" },
      { time: "11:00 – 12:00", activity: "Lunch break" },
      { time: "15:00 – 16:00", activity: "Snack & refreshment" },
      { time: "20:00 – 21:00", activity: "Dinner" },
      { time: "All remaining hours", activity: "Uninterrupted development" },
      { time: "02:00 onwards", activity: "Continuous development" },
    ],
  },
  {
    dayTitle: "Day 3 — Submission, demos & awards",
    bsDay: "Shrawan 24, 2083 BS",
    rows: [
      { time: "7:00 – 8:00", activity: "Breakfast" },
      { time: "9:00", activity: "Final submission deadline" },
      { time: "10:00 onwards", activity: "Project presentation & live demos" },
      { time: "11:30 – 12:30", activity: "Lunch break" },
      { time: "15:00 – 15:30", activity: "Refreshment" },
      { time: "15:30 – 17:00", activity: "Closing ceremony & prize distribution" },
    ],
  },
];
