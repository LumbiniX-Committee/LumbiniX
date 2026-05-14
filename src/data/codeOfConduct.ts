import type { CodeOfConductSection } from "../types";

export const codeOfConductSections: CodeOfConductSection[] = [
  {
    id: "respect-conduct",
    number: 1,
    title: "Respect & conduct",
    chunks: [
      {
        type: "list",
        items: [
          "All participants must respect judges, mentors, fellow teams, and the organizing team at all times.",
          "Judges’ decisions are final and binding; no disputes regarding scores or outcomes will be entertained.",
          "Any disrespect, abusive language, or misbehavior towards organizers, mentors, judges, or other teams is strictly prohibited.",
          "Teams must cooperate and maintain a friendly and fair competitive environment.",
          "Disrespecting other teams’ ideas or work is strictly forbidden.",
        ],
      },
    ],
  },
  {
    id: "arena-venue",
    number: 2,
    title: "Arena / venue rules",
    chunks: [
      {
        type: "list",
        items: [
          "No tobacco, nicotine, alcohol, or intoxicating substances are allowed inside the hackathon arena.",
          "No disturbance to other teams: loud talking, hollering, music, or any disruptive behavior is prohibited.",
          "Participants cannot leave the venue/arena during the hackathon without written permission from organizers. Violation will result in immediate disqualification.",
          "All coding and development must be done on-site. Pulling code, libraries, or full solutions from external repositories is strictly prohibited.",
          "Keep the venue clean. Any damage to property or equipment will be the responsibility of the participants.",
        ],
      },
    ],
  },
  {
    id: "team-rules",
    number: 3,
    title: "Team rules",
    chunks: [
      {
        type: "list",
        items: [
          "Each participant must be registered and part of one team only.",
          "All submissions (code, presentation, GitHub repo if used for version control) must be completed within the hackathon arena and within the deadline.",
          "Plagiarism, idea theft, or unauthorized access to other teams’ work is strictly prohibited.",
          "Teams must respect time slots for demo, Q/A, and presentations.",
        ],
      },
    ],
  },
  {
    id: "ai-code-assistance",
    number: 4,
    title: "AI / code assistance rules",
    chunks: [
      { type: "subheading", text: "Allowed" },
      {
        type: "list",
        items: [
          "AI code assistants like GitHub Copilot, ChatGPT, Tabnine, etc. for hints, suggestions, or small code snippets.",
          "Learning resources, documentation, tutorials for guidance (e.g., understanding a function, API usage).",
        ],
      },
      { type: "subheading", text: "Not allowed" },
      {
        type: "list",
        items: [
          "Using AI or tools to generate the full solution/project.",
          "Copying large blocks of code from external repositories, courses, or forums.",
          "Using AI “project generator agents” that build the complete project automatically.",
        ],
      },
    ],
  },
  {
    id: "mentors-judges",
    number: 5,
    title: "Mentors & judges",
    chunks: [
      {
        type: "paragraph",
        text: "Mentors provide guidance and evaluate team process, collaboration, and improvement. Mentor marks are scaled according to the rubric; teams cannot request extra marks.",
      },
      {
        type: "paragraph",
        text: "Judges evaluate based on demo, Q/A, innovation, technical implementation, and impact. Judges’ decision is final and binding.",
      },
    ],
  },
  {
    id: "safety-responsibility",
    number: 6,
    title: "Safety & responsibility",
    chunks: [
      {
        type: "list",
        items: [
          "Participants are responsible for their personal belongings. Organizers are not liable for lost items.",
          "Any health or safety issues must be reported immediately to organizers.",
          "Emergency exits and safety guidelines must be followed at all times.",
        ],
      },
    ],
  },
  {
    id: "disqualification",
    number: 7,
    title: "Disqualification",
    chunks: [
      {
        type: "list",
        items: [
          "Disrespecting judges, mentors, organizing team, or other teams.",
          "Plagiarism, copying code, or idea/code theft.",
          "Using prohibited substances in the arena.",
          "Disturbing or harassing other teams.",
          "Leaving the venue/arena without written permission from organizers.",
          "Pulling code, libraries, or full solutions from external repositories (off-site) instead of on-site development.",
          "Using AI or tools to generate full projects (see AI/code assistance rules).",
          "Ignoring safety guidelines or instructions from organizers.",
        ],
      },
    ],
  },
  {
    id: "reporting-enforcement",
    number: 8,
    title: "Reporting & enforcement",
    chunks: [
      {
        type: "list",
        items: [
          "Any incidents must be reported immediately to the nearest organizer or help desk.",
          "Organizers will investigate and take appropriate action. All decisions are final and binding.",
        ],
      },
    ],
  },
  {
    id: "agreement",
    number: 9,
    title: "Agreement",
    chunks: [
      {
        type: "paragraph",
        text: "By registering and participating, all teams agree to abide by these rules.",
      },
      {
        type: "paragraph",
        text: "Any breach of rules will result in penalties, including possible disqualification.",
      },
    ],
  },
];
