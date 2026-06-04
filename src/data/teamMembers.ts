import type { TeamMemberProfile } from "../types";

function avatar(seed: string): string {
  return `https://i.pravatar.cc/512?u=${encodeURIComponent(seed)}`;
}

function socialDummy(slug: string): Pick<TeamMemberProfile, "twitterUrl" | "linkedinUrl"> {
  return {
    twitterUrl: `https://x.com/lumbinix_${slug}`,
    linkedinUrl: `https://www.linkedin.com/in/lumbinix_${slug}`,
  };
}

/**
 * @param publicImage — filename in `public/` (e.g. `Ayush.png` → `/Ayush.png`)
 * @param linkedinUrl — optional real LinkedIn profile URL
 */
function member(
  name: string,
  role: string,
  slug: string,
  publicImage?: string,
  linkedinUrl?: string
): TeamMemberProfile {
  const social = socialDummy(slug);
  return {
    name,
    role,
    image: publicImage ? `/${publicImage}` : avatar(slug),
    twitterUrl: social.twitterUrl,
    linkedinUrl: linkedinUrl ?? social.linkedinUrl,
  };
}

export const eventLeads: TeamMemberProfile[] = [
  member(
    "Aayush Chapagain",
    "Event Lead",
    "aayush-chapagain",
    "Ayush.png",
    "https://www.linkedin.com/in/aayushchapagain/"
  ),
  member(
    "Abishkar Dhenga",
    "Event Lead",
    "abishkar-dhenga",
    "Abishkardhenga.jpeg",
    "https://www.linkedin.com/in/abishkar-dhenga/"
  ),
];

export const organizingCommittee: TeamMemberProfile[] = [
  member(
    "Kalpit Nepal",
    "Supervisor",
    "kalpit-nepal",
    "kalpit.jpeg",
    "https://www.linkedin.com/in/kalpit-nepal-0086aa331/"
  ),
  member(
    "Nishan Bhurtel",
    "Event Coordinator",
    "nishan-bhurtel",
    "Nishanbhurtel.png",
    "https://www.linkedin.com/in/nishan-bhurtel-a726312b7/"
  ),
  member(
    "Abhay Verma",
    "Graphic Designer Lead",
    "abhay-verma",
    "abhayverma.jpeg",
    "https://www.linkedin.com/in/abhayverma22/"
  ),
  member(
    "Raunak Amatya",
    "Graphic Designer Lead",
    "raunak-amatya",
    "raunak.jpeg",
    "https://www.linkedin.com/in/raunak-amatya-241102335/"
  ),
  {
    name: "Ishwor Bhattarai",
    role: "Logistic Lead",
    image: avatar("ishwor-bhattarai"),
    twitterUrl: "",
    linkedinUrl: "",
  },
  {
    name: "Smarika Gyawali",
    role: "Vice Logistic Lead",
    image: "/smarika.jpg",
    twitterUrl: "",
    linkedinUrl: "",
  },
];

// Volunteers - 5 positions (announcement coming soon)
export const volunteers: TeamMemberProfile[] = [
  {
    name: "Volunteer 1",
    role: "Volunteer",
    image: avatar("volunteer-1"),
    ...socialDummy("volunteer-1"),
  },
  {
    name: "Volunteer 2",
    role: "Volunteer",
    image: avatar("volunteer-2"),
    ...socialDummy("volunteer-2"),
  },
  {
    name: "Volunteer 3",
    role: "Volunteer",
    image: avatar("volunteer-3"),
    ...socialDummy("volunteer-3"),
  },
  {
    name: "Volunteer 4",
    role: "Volunteer",
    image: avatar("volunteer-4"),
    ...socialDummy("volunteer-4"),
  },
  {
    name: "Volunteer 5",
    role: "Volunteer",
    image: avatar("volunteer-5"),
    ...socialDummy("volunteer-5"),
  },
];

// Hidden for now - will be announced soon
// member("Ganesh Prasad Bhandari", "Documentation & Finance Manager", "ganesh-prasad-bhandari"),
// member("Aayush Poudel", "Tech Lead", "aayush-poudel", "Aayushpoudel.jpeg"),
// member("Bibek Bhusal", "Tech Lead", "bibek-bhusal"),
// member("Suhan Shrestha", "Content Lead", "suhan-shrestha", "suhan.jpeg"),
// member("Samyam Khanal", "Host / MC", "samyam-khanal", "samyamkhanal.jpg"),
// member("Smarika Gyawali", "Host / MC", "smarika-gyawali");
