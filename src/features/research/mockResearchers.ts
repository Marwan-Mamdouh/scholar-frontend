import type { Researcher } from "./Research.type";

/**
 * Static mock data for the Researchers tab.
 *
 * Six realistic Egyptian-university researchers with varied stats,
 * tags, and avatar colours so the grid looks realistic in development.
 *
 * TODO(api-owner): delete this file once `getResearchers()` in `api.ts`
 * is wired to the real backend endpoint.
 */
export const mockResearchers: Researcher[] = [
  {
    id: "r-001",
    name: "Prof. Dr. Ahmed Mahmoud",
    initials: "AM",
    avatarColor: "green",
    institutionAbbr: "Cairo Univ",
    role: "Professor of Computer Science, Faculty of Engineering",
    institution: "Cairo University",
    description:
      "Pioneering research in distributed systems and cloud computing architectures. Leading the development of scalable middleware solutions for high-performance computing clusters across Egyptian research institutions.",
    stats: { publications: 142, citations: "8.4k", hIndex: 45 },
    tags: ["Distributed Systems", "Cloud Computing"],
    bookmarked: false,
  },
  {
    id: "r-002",
    name: "Dr. Sarah El-Ghandour",
    initials: "SE",
    avatarColor: "green",
    institutionAbbr: "AUC",
    role: "Associate Professor of AI, School of Sciences",
    institution: "American University in Cairo",
    description:
      "Specializing in Natural Language Processing for Arabic dialects. Developed several state-of-the-art models for sentiment analysis and machine translation across regional Arabic variants.",
    stats: { publications: 89, citations: "3.2k", hIndex: 28 },
    tags: ["NLP", "Machine Learning"],
    bookmarked: false,
  },
  {
    id: "r-003",
    name: "Prof. Omar Morsi",
    initials: "OM",
    avatarColor: "green",
    institutionAbbr: "Alex Univ",
    role: "Head of Department, Marine Biology",
    institution: "Alexandria University",
    description:
      "Extensive research on Mediterranean marine ecosystems and climate change impact on coastal biodiversity. Leading multi-institutional conservation efforts across the southern Mediterranean basin.",
    stats: { publications: 215, citations: "12.1k", hIndex: 52 },
    tags: ["Marine Biology", "Ecology"],
    bookmarked: false,
  },
  {
    id: "r-004",
    name: "Dr. Youssef Hassan",
    initials: "YH",
    avatarColor: "green",
    institutionAbbr: "Mansoura U",
    role: "Assistant Professor, Biomedical Engineering",
    institution: "Mansoura University",
    description:
      "Focusing on non-invasive diagnostic tools and wearable health monitoring devices for chronic disease management in resource-limited clinical environments.",
    stats: { publications: 45, citations: "1.1k", hIndex: 15 },
    tags: ["Biomedical", "Wearables"],
    bookmarked: false,
  },
  {
    id: "r-005",
    name: "Prof. Noha Kamal",
    initials: "NK",
    avatarColor: "green",
    institutionAbbr: "Zewail City",
    role: "Professor, Nanotechnology",
    institution: "Zewail City of Science",
    description:
      "Research in novel nanomaterials for water purification and targeted drug delivery systems. Pioneering graphene-oxide membrane technology for desalination applications.",
    stats: { publications: 112, citations: "5.6k", hIndex: 38 },
    tags: ["Nanotech", "Materials Science"],
    bookmarked: false,
  },
  {
    id: "r-006",
    name: "Dr. Tarek Fouad",
    initials: "TF",
    avatarColor: "green",
    institutionAbbr: "Ain Shams",
    role: "Associate Professor, Renewable Energy",
    institution: "Ain Shams University",
    description:
      "Developing high-efficiency photovoltaic cells and grid integration strategies for solar energy in arid climates. Leading Egypt's first smart-grid pilot programme.",
    stats: { publications: 76, citations: "2.8k", hIndex: 24 },
    tags: ["Solar Energy", "Power Systems"],
    bookmarked: false,
  },
];
