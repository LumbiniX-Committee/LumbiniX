import type { Sponsor } from "../types";

/** Logos live in `public/alllogo/<folder>/<file>` — encode spaces for reliable URLs. */
function logo(folder: string, file: string): string {
  return `/alllogo/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

function partner(
  name: string,
  folder: string,
  file: string,
  extras: Partial<Omit<Sponsor, "name" | "logo" | "tier" | "url">> & {
    tier?: Sponsor["tier"];
    url?: string;
  } = {}
): Sponsor {
  return {
    name,
    logo: logo(folder, file),
    tier: extras.tier ?? "bronze",
    url: extras.url ?? "#",
    role: extras.role,
    description: extras.description,
    message: extras.message,
  };
}

export const sponsors: Sponsor[] = [
  partner("Lumbini City College", "Lumbini City College", "logo .png", {
    tier: "platinum",
    url: "https://www.lcc.edu.np/",
    role: "Title Sponsor",
    description:
      "Established in 2069 B.S. and affiliated with Tribhuvan University, Lumbini City College has been at the forefront of CSIT education in Tilottama, Butwal. Guided by “Learn, Innovate, Earn & Lead the Nation”, LCC is the Title Sponsor of LumbiniX Hackathon 2026.",
    message:
      "As the A.Campus Chief of Lumbini City College, I am honored to lead this vibrant academic community in Tilottama, Butwal. With state-of-the-art facilities and experienced faculty, we have successfully graduated thousands of students who are now thriving professionals in Nepal and abroad. I encourage all students to embrace the opportunities at LCC, develop your potential, and contribute to the ever-evolving fields of technology and innovation. Your journey here is not just about earning a degree, but about transforming into global citizens ready to make a meaningful impact.",
  }),

  partner("Shine Resunga Development Bank Ltd.", "Shine Resunga bank ", "unnamed.png", {
    url: "https://srdb.com.np/",
    role: "Official Banking Partner",
    description:
      "A trusted development bank supporting community growth and innovation across Lumbini Province.",
  }),
  partner("Inovex Media & Tech", "Innovex Media and tech", "logo.webp", {
    url: "https://www.inovexmediatech.com/",
    role: "Official Media & Tech Partner",
    description:
      "Official media and tech partner delivering digital solutions, web, and media support for LumbiniX.",
  }),
  partner(
    "Paramount Boarding High School",
    "Paramount Boarding Higher Secondary School",
    "logo.jpg",
    {
      url: "https://www.paramountschool.edu.np/",
      role: "Official Education Partner",
      description:
        "A symbol of quality education since 1995 — Official Education Partner of LumbiniX Hackathon 2026.",
    }
  ),
  partner("Hotel Madani", "Hotel Madani", "logo.jpg", {
    url: "https://www.facebook.com/HotelMadani/",
    role: "Official Hospitality Partner",
    description:
      "Tilottama-9, Shankharpur, Rupandehi — hospitality partner supporting LumbiniX guests and teams throughout the event.",
  }),
  partner("Ek Surup", "Ek surup", "613085895_17863616340558327_7241865760298761245_n.jpg", {
    url: "tel:+9779766720516",
    role: "Official Chiya Partner",
    description:
      "Famous chiya pasal in Butwal. Tilottama-5, Machapuchre Path, Manigram · Contact: 9766720516.",
  }),
  partner("Mawali Ghar", "Mawali Bhansa Ghar", "logo.jpg", {
    url: "https://www.facebook.com/p/Mawali-Ghar-61558740892629/",
    role: "Official Fooding Partner",
    description: "मावली भान्छा — serving home-style meals for LumbiniX teams. “मिठास मामा घरकै”.",
  }),
  partner(
    "QFX Cinemas",
    "QFX Cinemas",
    "1732596051296-qfx_square_logo_without_background0201_3.png",
    {
      url: "https://www.qfxcinemas.com/",
      role: "Official Movie Partner",
      description:
        "Official movie partner bringing cinema entertainment for LumbiniX teams and attendees.",
    }
  ),
  partner("Butwal Computer Supplier", "Butwal Computer Suppliers", "butwal computer suppliers.jpg", {
    url: "https://butwalcomputer.com.np/",
    role: "Official Tech Accessories Partner",
    description:
      "Trusted supplier of laptops, accessories, and tech gear supporting LumbiniX teams in Butwal.",
  }),
  partner("The Chocolatier Nepal", "Chocolatier Nepal", "logo.jpg", {
    url: "https://www.instagram.com/chocolatier.nepal/",
    role: "Official Chocolate Partner",
    description:
      "Artisan chocolate partner bringing handcrafted treats and sweet moments to LumbiniX 2026.",
  }),

  // Additional partners from public/alllogo
  partner("ABS Soft Pvt. Ltd.", "Abs soft pvt . ltd ", "abs.png"),
  partner("Aroma Hospitality", "Aroma Hospitality", "aroma.webp"),
  partner("Chiya Siya", "Chiya Siya", "logo.jpeg"),
  partner("Dhaulagiri", "Dhaulagiri", "5e3044e9-7fbc-400a-ae0e-ded742a7ab62.jpeg"),
  partner("Emergent Lab", "Emergentlab", "logo.webp"),
  partner("Expert Education", "Expert", "Expert_Primary-Logo-e1615787957750.png"),
  partner("First Choice Foods", "First Choice Foods ", "logo.svg"),
  partner("Friends Cinemas", "Friends Cinemas", "logo.png"),
  partner("Grace Beauty Zone", "Grace Beauty Zone ", "logo.jpeg"),
  partner("HUB IT", "Hubit ", "logo.png"),
  partner("Kaira Aesthetics", "Kaira asthetics", "logo.jpg"),
  partner("Lakai Electric", "Lakai Electric  ", "lakai.webp"),
  partner("Laziz Pizza", "Laziz Pizza ", "logo.png"),
  partner(
    "Lumbini Buddhist University",
    "Lumbini Buddhist University",
    "Lumbini-Buddhist-University.webp"
  ),
  partner("Lumbini Cable Car", "Lumbini Cable Car", "logo.png"),
  partner(
    "Lumbini Tech Innovation Center",
    "Lumbini Tech INNOVATION CENTER",
    "c7f13c9d-c2c6-4de6-92b6-9d9e935baf87.jpeg"
  ),
  partner(
    "Modern Diagnostic Center",
    "Moder Diagnostic Center",
    "475981162_122205945110211478_2134296576032023092_n.jpg"
  ),
  partner("Mount Everest Kattha Factory", "Mount Everest Kattha Factory", "width_200.webp"),
  partner("MusicHub", "Musichub", "logo.jpg"),
  partner("NASA Computers", "Nasa Computers ", "329087239_738329200981350_815248283743288242_n.jpg"),
  partner("National Bag House", "National Bag House", "IMG_4598.PNG"),
  partner("Navyan Tech Store", "Navyan Tech Store", "NavYantra-Logo.png"),
  partner("Nayan Eye Care Center", "Nayan Eye Care Center", "logo.jpg"),
  partner("One Cover", "One Cover", "477ceccd-ffb8-4415-a328-70c736ef26e4.jpeg"),
  partner("Roto Quality Packaging", "Roto Quality Packagin ", "logo.png"),
  partner("Safal Auto Trading", "Safal Auto trading", "logo.jpg"),
  partner(
    "Samdi Ko Chiya",
    "Samdi Ko Chiya",
    "684963311_122113555809266921_4324497021104234486_n.jpg"
  ),
  partner("Shreesha Dental Care", "Shreesha Dental Care", "dd.jpg"),
  partner("Superteam Nepal", "SuperteamNepal", "logo.jpeg"),
  partner("Western", "Western", "424729928_715440530741267_2360657280914742913_n.jpg"),
  partner("Yatra Link", "Yatra Link", "286d91c5-65cf-4306-9998-5ef439f5a2ed.jpeg"),
  partner("WorldLink", "worldlink", "logo-587-396.jpg"),
];
