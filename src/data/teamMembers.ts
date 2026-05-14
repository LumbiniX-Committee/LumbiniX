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
  member(
    "Ganesh Prasad Bhandari",
    "Documentation & Finance Manager",
    "ganesh-prasad-bhandari",
    "Ganeshprasadbhandari.jpeg",
    "https://www.linkedin.com/in/ganesh-prasad-bhandari-b54a34323/"
  ),
  member(
    "Aayush Poudel",
    "Tech Lead",
    "aayush-poudel",
    "Aayushpoudel.jpeg",
    "https://www.linkedin.com/in/aayushpoudel1/"
  ),
  member("Bibek Bhusal", "Tech Lead", "bibek-bhusal"),
  member(
    "Suhan Shrestha",
    "Content Lead",
    "suhan-shrestha",
    "suhan.jpeg",
    "https://www.linkedin.com/in/suhan-shrestha-9223b1247/"
  ),
  member("Samyam Khanal", "Host / MC", "samyam-khanal", "samyamkhanal.jpg"),
  member("Smarika Gyawali", "Host / MC", "smarika-gyawali"),
  {
    name: "Volunteer team",
    role: "Volunteers — 5 roles (applications opening soon)",
    image: avatar("lumbinix-volunteers"),
    ...socialDummy("volunteers"),
  },
];
