export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: string;
  employees: number;
  incorporationYear: number;
  annualRevenue: string;
  funding: string;
  category: string;
  ceo: {
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
  };
  productsAndBrands: {
    consumerProducts: string[];
    luxeDivision: string[];
    professionalProducts: string[];
    activeCosmetics: string[];
  };
  businessModel: string;
  customers: string;
  geographicPresence: {
    hq: string;
    operation: string;
  };
  strategy: {
    recentStrategy: {
      digitalFocus: string;
      sustainabilityEfforts: string;
      luxuryAndProfessionalSegments: string;
      innovation: string;
      financialPerformance: string;
    };
    strategicFocus: {
      digitalTransformation: string;
      emergingMarkets: string;
      sustainability: string;
      innovation: string;
      consumerEngagement: string;
    };
  };
  kpi: Record<string, string>;
  activities: Array<{
    date: string;
    month: string;
    category: {
      name: string;
      textColor: string;
      bgColor:string
    };
    source: string;
    title: string;
    randomText: string;
  }>;
  keyPeople: Array<{
    name: string;
    title: string;
    description: string;
    email: string;
    linkedin: string;
  }>;
  sources_StrategyCard: {
    [key: string]: {
      id: string;
      name: string;
      source: string;
    };
  };
  sources_KeyPerformanceIndicators: {
    [key: string]: {
      id: string;
      name: string;
      source: string;
    };
  };
  sources_CompanyInfoCard: {
    [key: string]: {
      id: string;
      name: string;
      source: string;
    };
  };
}

export async function fetchCompanyData(): Promise<CompanyData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: "loreal",
    name: "L'Oréal",
    logo: "/images/test-company-logo.png",
    description: "Provider of platform for on-demand distributed manufacturing",
    type: "Public",
    employees: 10000,
    incorporationYear: 2004,
    annualRevenue: "$20M",
    funding: "$10M (Seed A)",
    category: "Fashion, eCommerce",
    ceo: {
      firstName: "Sylvia",
      lastName: "Woo",
      email: "Sylviawoo@gmail.com",
      linkedin: "www.Linkedin.com",
    },
    productsAndBrands: {
      consumerProducts: [
        "L'Oréal Paris",
        "Garnier",
        "Maybelline",
        "NYX Cosmetics",
      ],
      luxeDivision: ["Lancôme", "Yves Saint Laurent", "Giorgio Armani Beauty"],
      professionalProducts: ["Redken", "Matrix", "Pureology"],
      activeCosmetics: ["Vichy", "La Roche-Posay", "CeraVe"],
    },
    businessModel:
      "L'Oréal operates a multi-channel distribution strategy, including sales through mass-market retailers, department stores, pharmacies, salons, and e-commerce. They also invest significantly in R&D and sustainability initiatives.",
    customers:
      "L'Oréal's customers range from mass-market consumers to luxury buyers, professional hairdressers, and dermatologists, catering to diverse beauty needs worldwide.",
    geographicPresence: {
      hq: "Paris, France",
      operation:
        "L'Oreal has a global presence with operations in over 150 countries, including major markets in North America, Europe, Asia, and Latin America. Their headquarters are in Clichy, France.",
    },
    strategy: {
      recentStrategy: {
        digitalFocus:
          "Significant investments in e-commerce and digital platforms, resulting in robust online sales growth.",
        sustainabilityEfforts:
          "Increased investment in sustainable practices and eco-friendly product lines.",
        luxuryAndProfessionalSegments:
          "Strong performance in luxury cosmetics and professional haircare sectors, driving overall revenue growth.",
        innovation:
          "Continuous focus on research and development, introducing new, innovative beauty products to the market.",
        financialPerformance:
          "Achieved solid financial results in 2022, reflecting successful strategic initiatives.",
      },
      strategicFocus: {
        digitalTransformation:
          "Achieved solid financial results in 2022, reflecting successful strategic initiatives.",
        emergingMarkets:
          "Strengthen presence and expand operations in emerging economies.",
        sustainability:
          "Maintain commitment to sustainability through eco-friendly products and practices.",
        innovation:
          "Continue investment in R&D for cutting-edge beauty technologies.",
        consumerEngagement:
          "Enhance direct-to-consumer channels to improve customer experience and personalization.",
      },
    },
    kpi: {
      "Product A - description": "$ 40.86 Mn",
      "Profit Margin": "$ 40.86 Mn",
      "Enterprise Value": "$ 54.09 Mn",
      "Return on Assets (ttm)": "$ 54.09 Mn",
      "Trailing P/E": "13.6 Mn",
      "Return on Equity (ttm)": "13.6 Mn",
      "Forward P/E": "1.6%",
      "Revenue (ttm)": "1.02 %",
      "PEG Ratio (5yr expected)": "1.5%",
      "Net Income Avi to Common (ttm)": "1.5%",
      "Price/Sales (ttm)": "6.8%",
      "Price/Book (mrq)": "1.02 %",
      "Enterprise Value/Revenue": "1.73%",
      "Enterprise Value/EBITDA": "2.5%",
    },
    activities: [
      {
        date: "2024,06",
        month: "11/Jun/2024",
        category: {
          name: "Product & Services",
          textColor: "text-green-700",
          bgColor:"bg-[#ECFDF3]",
        },
        source: "New York Times",
        title:
          "L'Oréal launches new sustainable beauty line - The Financial Express",
        randomText: "Exciting new product launch!",
      },
      {
        date: "2024,05",
        month: "11/May/2024",
        category: {
          name: "Financing & Investment",
          textColor: "text-gray-800",
          bgColor: "bg-[#D1FAE5]",
        },
        source: "New York Times",
        title:
          "L'Oréal invests in beauty tech startup for personalized skincare",
        randomText: "Investment in innovation!",
      },
      {
        date: "2024,04",
        month: "11/Apr/2024",
        category: {
          name: "Corporate Strategy",
          textColor: "text-purple-800",
          bgColor: "bg-[#E0C3FC]",
        },
        source: "New York Times",
        title:
          "L'Oréal expands presence in emerging markets with new acquisition",
        randomText: "Strategic growth initiative!",
      },
      {
        date: "2024,03",
        month: "11/Mar/2024",
        category: {
          name: "Corporate Social Responsibilities",
          textColor: "text-pink-800",
          bgColor: "bg-[#FBCFE8]",
        },
        source: "New York Times",
        title: "L'Oréal pledges to achieve carbon neutrality by 2025",
        randomText: "Commitment to sustainability!",
      },
      {
        date: "2023,11",
        month: "11/Nov/2023",
        category: {
          name: "Financial Performance",
          textColor: "text-blue-800",
          bgColor: "bg-[#BFDBFE]",
        },
        source: "New York Times",
        title:
          "L'Oréal reports strong Q3 results, driven by luxury and active cosmetics divisions",
        randomText: "Strong financial results!",
      },
    ],
    keyPeople: [
      {
        name: "Nicolas Hieronimus",
        title: "CEO",
        description: "CEO of L'Oréal Group since May 2021",
        email: "nicolas.hieronimus@loreal.com",
        linkedin: "https://www.linkedin.com/in/nicolas-hieronimus/",
      },
      {
        name: "Barbara Lavernos",
        title: "Deputy CEO",
        description: "In charge of Research, Innovation and Technology",
        email: "barbara.lavernos@loreal.com",
        linkedin: "https://www.linkedin.com/in/barbara-lavernos/",
      },
      {
        name: "Christophe Babule",
        title: "Executive Vice-President, Chief Financial Officer",
        description: "Responsible for the Group's finance and legal functions",
        email: "christophe.babule@loreal.com",
        linkedin: "https://www.linkedin.com/in/christophe-babule/",
      },
    ],
    sources_StrategyCard: {
      yahoo: {
        id: "yahoo",
        name: "Yahoo finance",
        source: "/images/Source1.png",
      },
      finazon: {
        id: "finazon",
        name: "Finazon",
        source: "/images/Source2.png",
      },
    },
    sources_KeyPerformanceIndicators: {
      iex: { id: "iex", name: "IEX Cloud", source: "/images/Source3.png" },
      polygon: {
        id: "polygon",
        name: "Polygon.io",
        source: "/images/Source4.png",
      },
    },
    sources_CompanyInfoCard: {
      yahoo: {
        id: "yahoo",
        name: "Yahoo finance",
        source: "/images/Source1.png",
      },
      finazon: {
        id: "finazon",
        name: "Finazon",
        source: "/images/Source2.png",
      },
      iex: { id: "iex", name: "IEX Cloud", source: "/images/Source3.png" },
      polygon: {
        id: "polygon",
        name: "Polygon.io",
        source: "/images/Source4.png",
      },
    },
  };
}
