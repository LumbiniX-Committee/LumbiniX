import type { Prize } from "../types";

export const prizes: Prize[] = [
  {
    tier: "1st Place",
    amount: "$5,000",
    description: "Grand prize for the most innovative and well-executed project. Includes mentorship from industry leaders.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=400&fit=crop",
  },
  {
    tier: "2nd Place",
    amount: "$3,000",
    description: "For the team that demonstrates exceptional technical skill and a solid vision.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop",
  },
  {
    tier: "3rd Place",
    amount: "$1,500",
    description: "Awarded to a project with great potential and creative implementation.",
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=400&fit=crop",
  },
];
