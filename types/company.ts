export interface CompanyData {
  name: string;
  description: string;
  logo: string;
  website: string;
  type: string;
  employeeCount: number;
  incorporationYear: number;
  ceo: {
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
  };
  financials: {
    annualRevenue: string;
    funding: string;
  };
  category: string[];
}

export interface Source {
  id: number;
  name: string;
  color: string;
}

export interface InfoCardProps {
  title: string;
  sources: Source[];
  children: React.ReactNode;
}
