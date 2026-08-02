import type { TeamMemberProfile } from "../types";

/** Photos live in `public/organizer photo/` — encode spaces for reliable URLs. */
function organizerPhoto(filename: string): string {
  return `/organizer%20photo/${encodeURIComponent(filename)}`;
}

function member(
  name: string,
  role: string,
  filename: string,
  linkedinUrl = ""
): TeamMemberProfile {
  return {
    name,
    role,
    image: organizerPhoto(filename),
    twitterUrl: "",
    linkedinUrl,
  };
}

/** Event leads — featured on the team page. */
export const eventLeads: TeamMemberProfile[] = [
  member(
    "Aayush Chapagain",
    "Event Lead",
    "Aayush Chapagain.PNG",
    "https://www.linkedin.com/in/aayushchapagain/"
  ),
  member(
    "Abishkar Dhenga",
    "Event Lead",
    "Aabishkar Dhenga.jpeg",
    "https://www.linkedin.com/in/abishkar-dhenga/"
  ),
];

/** Full organizing committee from the LumbiniX poster (excl. event leads). */
export const organizingCommittee: TeamMemberProfile[] = [
  member(
    "Nishan Bhurtel",
    "Supervisor",
    "Nishan Bhurtel.jpeg",
    "https://www.linkedin.com/in/nishan-bhurtel-a726312b7/"
  ),
  member("Aayam Regmi", "Director", "Aayam Regmi.jpeg", "https://www.linkedin.com/in/aayamregmi/"),
  member("Prabesh Khatri", "Design Lead", "Prabesh Khatri.jpg", "https://www.linkedin.com/in/prabeshkhatri/"),
  member("Suhan Shrestha", "Marketing Lead", "Suhan Sherestha.jpeg", "https://www.linkedin.com/in/suhan-shrestha-9223b1247/"),
  member("Sushil Basnet", "Logistic Lead", "Sushil Basnet.jpeg", "https://www.linkedin.com/in/sushil-basnet-59198036b/"),
  member("Smarika Gyawali", "Executive", "smarika Gyawali.jpeg", "https://www.linkedin.com/in/smarika-gyawali-6b9375355/"),
  member("Punaram Gaire", "Executive", "Punaram Gaire.jpeg"),
  member("Janam Kafle", "Executive", "Janam Kafle.jpeg", "https://www.linkedin.com/in/janam-kafle-455789425/"),
  member("Rabina Sunar", "Executive", "Rabina Sunar.jpeg", "https://www.linkedin.com/in/rabina-sunar-439194269/?skipRedirect=true"),
  member("Barsha Bhandari", "Executive", "Barsha Bhandari.jpeg", "https://www.linkedin.com/in/barsha-bhandari-2087ba3ab/"),
  member("Deepa Bhusal", "Executive", "Deepa .jpeg", "https://www.linkedin.com/in/dipa-bhusal-9725a7352/"),
  member("Epsita Malla", "Executive", "Epsita malla.jpeg", "https://www.linkedin.com/in/epsita-malla-54b41a31b/"),
  member("Bipin K.C. Bhattarai", "Executive", "Bipin K.C. Bhattarai.jpeg", "https://www.linkedin.com/in/bipin-bhattarai-63a3063a0/"),
];

/** Volunteers — not announced yet. */
export const volunteers: TeamMemberProfile[] = [];
