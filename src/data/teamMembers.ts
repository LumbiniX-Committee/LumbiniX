import type { TeamMemberProfile } from "../types";

function avatar(seed: string): string {
  return `https://i.pravatar.cc/512?u=${encodeURIComponent(seed)}`;
}

interface MemberSocials {
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
}

function member(
  name: string,
  role: string,
  slug: string,
  publicImage?: string,
  socials?: MemberSocials
): TeamMemberProfile {
  return {
    name,
    role,
    image: publicImage ? `/${publicImage}` : avatar(slug),
    instagramUrl: socials?.instagramUrl,
    facebookUrl: socials?.facebookUrl,
    linkedinUrl: socials?.linkedinUrl,
  };
}

export const eventLeads: TeamMemberProfile[] = [
  member(
    "Aayush Chapagain",
    "Event Lead",
    "aayush-chapagain",
    "Ayush.png",
    {
      linkedinUrl: "https://www.linkedin.com/in/aayushchapagain/",
      instagramUrl: "https://www.instagram.com/insta.aayushchapagain/",
    }
  ),
  member(
    "Abishkar Dhenga",
    "Event Lead",
    "abishkar-dhenga",
    "Abishkardhenga.jpeg",
    {
      linkedinUrl: "https://www.linkedin.com/in/abishkar-dhenga/",
      instagramUrl: "https://www.instagram.com/aabiskardhenga/",
    }
  ),
];

export const organizingCommittee: TeamMemberProfile[] = [
  member(
    "Kalpit Nepal",
    "Supervisor",
    "kalpit-nepal",
    "kalpit.jpeg",
    {
      linkedinUrl: "https://www.linkedin.com/in/kalpit-nepal-0086aa331/",
      instagramUrl: "https://www.instagram.com/kalpit_sarkarrr/",
    }
  ),
  member(
    "Nishan Bhurtel",
    "Event Coordinator",
    "nishan-bhurtel",
    "Nishanbhurtel.png",
    {
      linkedinUrl: "https://www.linkedin.com/in/nishan-bhurtel-a726312b7/",
      instagramUrl: "https://www.instagram.com/nishanbhurtel/",
    }
  ),
  member(
    "Abhay Verma",
    "Graphic Designer Lead",
    "abhay-verma",
    "abhayverma.jpeg",
    {
      linkedinUrl: "https://www.linkedin.com/in/abhayverma22/",
      instagramUrl: "https://www.instagram.com/abhay_verma_22/",
    }
  ),
  member(
    "Raunak Amatya",
    "Graphic Designer Lead",
    "raunak-amatya",
    "raunak.jpeg",
    {
      linkedinUrl: "https://www.linkedin.com/in/raunak-amatya-241102335/",
      instagramUrl: "https://www.instagram.com/ra_un_ak_07/",
    }
  ),
  member(
    "Ishwor Neupane",
    "Logistic Lead",
    "ishwor-neupane",
    "ishworsui.jpg",
    {
      instagramUrl: "https://www.instagram.com/ishwor_cr7/",
    }
  ),
  member(
    "Smarika Gyawali",
    "Vice Logistic Lead",
    "smarika-gyawali",
    "smarika.jpg",
    {
      instagramUrl: "https://www.instagram.com/smarika_gyawali/",
    }
  ),
];

// Volunteers - 5 positions (announcement coming soon)
export const volunteers: TeamMemberProfile[] = [
  member("Volunteer 1", "Volunteer", "volunteer-1"),
  member("Volunteer 2", "Volunteer", "volunteer-2"),
  member("Volunteer 3", "Volunteer", "volunteer-3"),
  member("Volunteer 4", "Volunteer", "volunteer-4"),
  member("Volunteer 5", "Volunteer", "volunteer-5"),
];

// Hidden for now - will be announced soon
// member("Ganesh Prasad Bhandari", "Documentation & Finance Manager", "ganesh-prasad-bhandari"),
// member("Aayush Poudel", "Tech Lead", "aayush-poudel", "Aayushpoudel.jpeg"),
// member("Bibek Bhusal", "Tech Lead", "bibek-bhusal"),
// member("Suhan Shrestha", "Content Lead", "suhan-shrestha", "suhan.jpeg"),
// member("Samyam Khanal", "Host / MC", "samyam-khanal", "samyamkhanal.jpg"),
// member("Smarika Gyawali", "Host / MC", "smarika-gyawali");
