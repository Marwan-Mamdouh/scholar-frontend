import type { ResearcherProfile } from "./ResearcherProfile/researcherProfile.type";

export const mockResearcherProfiles: ResearcherProfile[] = [
  {
    id: "r-001",
    name: "Prof. Dr. Ahmed Mahmoud",
    initials: "AM",
    avatarColor: "green",
    institution: "Cairo University",
    institutionAbbr: "Cairo Univ",
    role: "Professor of Computer Science, Faculty of Engineering",
    description: "Pioneering research in distributed systems and cloud computing architectures. Leading the development of scalable middleware solutions for high-performance computing clusters across Egyptian research institutions.",
    stats: { publications: 142, citations: "8.4k", hIndex: 45 },
    tags: ["Distributed Systems", "Cloud Computing"],
    primaryField: "Computer Science",
    interests: ["Distributed Systems", "Cloud Architectures", "Middleware", "HPC"],
    papers: [
      { id: "p-001-1", year: 2024, title: "Scalable Middleware for Edge Computing in IoT Environments", journal: "IEEE Transactions on Cloud Computing", citations: 12 },
      { id: "p-001-2", year: 2023, title: "Optimizing Resource Allocation in Multi-tenant Cloud Data Centers", journal: "Journal of Grid Computing", citations: 28 },
      { id: "p-001-3", year: 2022, title: "Distributed Consensus Algorithms for High-Performance Computing", journal: "ACM Computing Surveys", citations: 45 },
      { id: "p-001-4", year: 2021, title: "Fault-Tolerant Architectures for Microservices in Cloud Native Applications", journal: "IEEE Cloud Computing", citations: 33 },
      { id: "p-001-5", year: 2021, title: "Evaluating Serverless Computing Performance at Scale", journal: "Future Generation Computer Systems", citations: 18 },
      { id: "p-001-6", year: 2020, title: "Energy-Efficient Scheduling in Distributed Systems", journal: "Sustainable Computing", citations: 22 },
      { id: "p-001-7", year: 2019, title: "Security Challenges in Federated Cloud Environments", journal: "IEEE Security & Privacy", citations: 39 },
      { id: "p-001-8", year: 2019, title: "A Survey of Load Balancing Techniques in Cloud Computing", journal: "Computer Science Review", citations: 15 }
    ],
    coAuthors: [
      { name: "Dr. Khaled Ibrahim", collaborations: 8 },
      { name: "Prof. Hoda Ali", collaborations: 6 },
      { name: "Dr. Yasser Mansour", collaborations: 5 },
      { name: "Amr Hassan", collaborations: 4 },
      { name: "Mohamed Samir", collaborations: 4 },
      { name: "Mona Adel", collaborations: 3 },
      { name: "Nourhan Tarek", collaborations: 3 },
      { name: "Dr. Wael Said", collaborations: 2 },
      { name: "Osama Farid", collaborations: 2 },
      { name: "Ramy Kamal", collaborations: 2 }
    ],
    fieldsOfStudy: [
      { name: "Computer Science", share: 40, color: "#70b5df" },
      { name: "Engineering", share: 25, color: "#37b5aa" },
      { name: "Mathematics", share: 15, color: "#ff8a81" },
      { name: "Information Systems", share: 12, color: "#3a90c9" },
      { name: "Physics", share: 8, color: "#7dd3cb" }
    ]
  },
  {
    id: "r-002",
    name: "Dr. Sarah El-Ghandour",
    initials: "SE",
    avatarColor: "green",
    institution: "American University in Cairo",
    institutionAbbr: "AUC",
    role: "Associate Professor of AI, School of Sciences",
    description: "Specializing in Natural Language Processing for Arabic dialects. Developed several state-of-the-art models for sentiment analysis and machine translation across regional Arabic variants.",
    stats: { publications: 89, citations: "3.2k", hIndex: 28 },
    tags: ["NLP", "Machine Learning"],
    primaryField: "Artificial Intelligence",
    interests: ["NLP", "Arabic Dialects", "Sentiment Analysis", "Machine Translation"],
    papers: [
      { id: "p-002-1", year: 2025, title: "Fine-tuning Large Language Models for Egyptian Arabic Dialect", journal: "Computational Linguistics", citations: 2 },
      { id: "p-002-2", year: 2024, title: "Cross-Lingual Sentiment Analysis for Middle Eastern Dialects", journal: "EMNLP Proceedings", citations: 15 },
      { id: "p-002-3", year: 2023, title: "Evaluating Neural Machine Translation on Maghrebi Dialects", journal: "Journal of Artificial Intelligence Research", citations: 22 },
      { id: "p-002-4", year: 2022, title: "A Comprehensive Dataset for Arabic Dialect Identification", journal: "LREC Proceedings", citations: 38 },
      { id: "p-002-5", year: 2021, title: "Pre-trained Language Models for Code-Switched Arabic Content", journal: "ACM Transactions on Asian and Low-Resource Language Information Processing", citations: 27 },
      { id: "p-002-6", year: 2021, title: "Zero-Shot Learning for Arabic Named Entity Recognition", journal: "ACL Proceedings", citations: 19 },
      { id: "p-002-7", year: 2020, title: "Morphological Segmentation Strategies for Arabic NLP", journal: "Natural Language Engineering", citations: 11 }
    ],
    coAuthors: [
      { name: "Dr. Nabil Farouk", collaborations: 7 },
      { name: "Prof. Salwa Fathi", collaborations: 5 },
      { name: "Karim Wael", collaborations: 4 },
      { name: "Dina Hisham", collaborations: 4 },
      { name: "Dr. Mahmoud Ezzat", collaborations: 3 },
      { name: "Salma Youssef", collaborations: 3 },
      { name: "Mostafa Amin", collaborations: 2 },
      { name: "Farida Hassan", collaborations: 2 }
    ],
    fieldsOfStudy: [
      { name: "Computer Science", share: 45, color: "#70b5df" },
      { name: "Linguistics", share: 25, color: "#37b5aa" },
      { name: "Mathematics", share: 18, color: "#ff8a81" },
      { name: "Psychology", share: 12, color: "#3a90c9" }
    ]
  },
  {
    id: "r-003",
    name: "Prof. Omar Morsi",
    initials: "OM",
    avatarColor: "green",
    institution: "Alexandria University",
    institutionAbbr: "Alex Univ",
    role: "Head of Department, Marine Biology",
    description: "Extensive research on Mediterranean marine ecosystems and climate change impact on coastal biodiversity. Leading multi-institutional conservation efforts across the southern Mediterranean basin.",
    stats: { publications: 215, citations: "12.1k", hIndex: 52 },
    tags: ["Marine Biology", "Ecology"],
    primaryField: "Marine Biology",
    interests: ["Marine Ecosystems", "Climate Change", "Coastal Biodiversity", "Conservation"],
    papers: [
      { id: "p-003-1", year: 2025, title: "Impact of Rising Sea Temperatures on Mediterranean Coral Reefs", journal: "Marine Biology", citations: 5 },
      { id: "p-003-2", year: 2024, title: "Assessing Biodiversity Changes in the Southern Mediterranean Basin", journal: "Global Change Biology", citations: 24 },
      { id: "p-003-3", year: 2023, title: "Invasive Species Migration through the Suez Canal: A Decade Review", journal: "Journal of Marine Ecology", citations: 41 },
      { id: "p-003-4", year: 2022, title: "Conservation Strategies for Endangered Mediterranean Monk Seals", journal: "Conservation Biology", citations: 33 },
      { id: "p-003-5", year: 2021, title: "Microplastic Pollution in Coastal Ecosystems of North Africa", journal: "Marine Pollution Bulletin", citations: 62 },
      { id: "p-003-6", year: 2020, title: "Nutrient Cycling in the Levantine Basin", journal: "Deep Sea Research", citations: 18 }
    ],
    coAuthors: [
      { name: "Dr. Laila Hassan", collaborations: 6 },
      { name: "Prof. Youssef Zaki", collaborations: 5 },
      { name: "Dr. Ayman Fouad", collaborations: 4 },
      { name: "Nada Samir", collaborations: 4 },
      { name: "Tarek Gomaa", collaborations: 3 },
      { name: "Hany Nabil", collaborations: 2 },
      { name: "Reem Magdy", collaborations: 2 }
    ],
    fieldsOfStudy: [
      { name: "Biology", share: 42, color: "#70b5df" },
      { name: "Environmental Science", share: 28, color: "#37b5aa" },
      { name: "Chemistry", share: 18, color: "#ff8a81" },
      { name: "Earth Science", share: 12, color: "#3a90c9" }
    ]
  },
  {
    id: "r-004",
    name: "Dr. Youssef Hassan",
    initials: "YH",
    avatarColor: "green",
    institution: "Mansoura University",
    institutionAbbr: "Mansoura U",
    role: "Assistant Professor, Biomedical Engineering",
    description: "Focusing on non-invasive diagnostic tools and wearable health monitoring devices for chronic disease management in resource-limited clinical environments.",
    stats: { publications: 45, citations: "1.1k", hIndex: 15 },
    tags: ["Biomedical", "Wearables"],
    primaryField: "Biomedical Engineering",
    interests: ["Diagnostic Tools", "Wearable Devices"],
    papers: [
      { id: "p-004-1", year: 2024, title: "Low-Cost Wearable Biosensors for Continuous Glucose Monitoring", journal: "IEEE Transactions on Biomedical Engineering", citations: 4 },
      { id: "p-004-2", year: 2023, title: "Non-Invasive Blood Pressure Estimation using Photoplethysmography", journal: "Biomedical Signal Processing and Control", citations: 12 },
      { id: "p-004-3", year: 2022, title: "Wearable ECG Monitoring in Resource-Limited Settings", journal: "Journal of Medical Systems", citations: 9 },
      { id: "p-004-4", year: 2021, title: "Machine Learning Approaches for Arrhythmia Detection from Wearable Data", journal: "Artificial Intelligence in Medicine", citations: 7 },
      { id: "p-004-5", year: 2021, title: "Design of a Modular Health Monitoring Platform for Rural Areas", journal: "Health Informatics Journal", citations: 1 }
    ],
    coAuthors: [],
    fieldsOfStudy: []
  },
  {
    id: "r-005",
    name: "Prof. Noha Kamal",
    initials: "NK",
    avatarColor: "green",
    institution: "Zewail City of Science",
    institutionAbbr: "Zewail City",
    role: "Professor, Nanotechnology",
    description: "Research in novel nanomaterials for water purification and targeted drug delivery systems. Pioneering graphene-oxide membrane technology for desalination applications.",
    stats: { publications: 112, citations: "5.6k", hIndex: 38 },
    tags: ["Nanotech", "Materials Science"],
    primaryField: "Nanotechnology",
    interests: ["Nanomaterials", "Water Purification", "Drug Delivery", "Graphene"],
    papers: [
      { id: "p-005-1", year: 2025, title: "Functionalized Graphene Oxide Membranes for High-Efficiency Water Desalination", journal: "Nature Nanotechnology", citations: 8 },
      { id: "p-005-2", year: 2024, title: "Targeted Delivery of Chemotherapeutics using Polymeric Nanoparticles", journal: "Advanced Drug Delivery Reviews", citations: 22 },
      { id: "p-005-3", year: 2023, title: "Synthesis of Metal-Organic Frameworks for Heavy Metal Adsorption", journal: "Environmental Science & Technology", citations: 35 },
      { id: "p-005-4", year: 2022, title: "Photocatalytic Degradation of Organic Dyes using Titanium Dioxide Nanotubes", journal: "Applied Catalysis B: Environment and Energy", citations: 19 },
      { id: "p-005-5", year: 2021, title: "Nanocellulose Aerogels for Oil Spill Cleanup Applications", journal: "Carbohydrate Polymers", citations: 14 },
      { id: "p-005-6", year: 2020, title: "Biocompatibility Assessment of Carbon Nanotubes in Drug Delivery", journal: "Biomaterials", citations: 27 }
    ],
    coAuthors: [
      { name: "Dr. Ahmed El-Sayed", collaborations: 5 },
      { name: "Prof. Magdi Youssef", collaborations: 4 },
      { name: "Sherif Mahmoud", collaborations: 4 },
      { name: "Rania Adel", collaborations: 3 },
      { name: "Dr. Eman Taha", collaborations: 2 },
      { name: "Hesham Sami", collaborations: 2 }
    ],
    fieldsOfStudy: [
      { name: "Materials Science", share: 35, color: "#70b5df" },
      { name: "Chemistry", share: 25, color: "#37b5aa" },
      { name: "Physics", share: 18, color: "#ff8a81" },
      { name: "Engineering", share: 14, color: "#3a90c9" },
      { name: "Medicine", share: 8, color: "#7dd3cb" }
    ]
  },
  {
    id: "r-006",
    name: "Dr. Tarek Fouad",
    initials: "TF",
    avatarColor: "green",
    institution: "Ain Shams University",
    institutionAbbr: "Ain Shams",
    role: "Associate Professor, Renewable Energy",
    description: "Developing high-efficiency photovoltaic cells and grid integration strategies for solar energy in arid climates. Leading Egypt's first smart-grid pilot programme.",
    stats: { publications: 76, citations: "2.8k", hIndex: 24 },
    tags: ["Solar Energy", "Power Systems"],
    primaryField: "Renewable Energy",
    interests: ["Photovoltaics", "Grid Integration", "Solar Energy", "Smart Grids"],
    papers: [
      { id: "p-006-1", year: 2026, title: "Performance Degradation of Perovskite Solar Cells in Arid Environments", journal: "Solar Energy Materials and Solar Cells", citations: 2 },
      { id: "p-006-2", year: 2025, title: "Smart Grid Integration Strategies for Distributed Solar Generation", journal: "IEEE Transactions on Smart Grid", citations: 7 },
      { id: "p-006-3", year: 2024, title: "Thermal Management of Concentrated Photovoltaic Systems", journal: "Renewable Energy", citations: 15 },
      { id: "p-006-4", year: 2023, title: "Energy Storage Optimization for Standalone Microgrids", journal: "Applied Energy", citations: 28 },
      { id: "p-006-5", year: 2022, title: "Techno-economic Assessment of Hybrid Solar-Wind Systems in Egypt", journal: "Energy Conversion and Management", citations: 19 },
      { id: "p-006-6", year: 2021, title: "Machine Learning for Solar Power Forecasting", journal: "Solar Energy", citations: 22 },
      { id: "p-006-7", year: 2020, title: "Evaluating Power Quality Issues in Grid-Tied PV Systems", journal: "Electric Power Systems Research", citations: 14 }
    ],
    coAuthors: [
      { name: "Prof. Hossam Zaki", collaborations: 6 },
      { name: "Dr. Yasser Ali", collaborations: 5 },
      { name: "Maged Salah", collaborations: 4 },
      { name: "Ibrahim Saad", collaborations: 4 },
      { name: "Hany Abdel-Rahman", collaborations: 3 },
      { name: "Tamer Nabil", collaborations: 2 },
      { name: "Walid Ezzat", collaborations: 2 },
      { name: "Khaled Sami", collaborations: 2 }
    ],
    fieldsOfStudy: [
      { name: "Engineering", share: 40, color: "#70b5df" },
      { name: "Physics", share: 25, color: "#37b5aa" },
      { name: "Environmental Science", share: 20, color: "#ff8a81" },
      { name: "Materials Science", share: 15, color: "#3a90c9" }
    ]
  }
];

export function getResearcherProfileById(id: string): ResearcherProfile | undefined {
  return mockResearcherProfiles.find((r) => r.id === id);
}
