"use client";

import { TopNav } from "@/components/TopNav";
import { CompanyHeader } from "@/components/CompanyHeader";
import { InfoGrid, sources } from "@/components/company-info-grid";
import { StrategyCard } from "@/components/StrategyCard";
import { KeyPerformanceIndicators } from "@/components/KeyPerformanceIndicators";
import { LatestActivities } from "@/components/LatestActivities";
import { KeyPeople } from "@/components/KeyPeople";

const people = [
  {
    name: "John Doe",
    title: "CEO & CO-Founder",
    description:
      "CEO Matracon, ex-Co-Founder ClidBlue Technologies, Office Tiger",
    email: "john@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "John Doe",
    title: "CEO & CO-Founder",
    description:
      "CEO Matracon, ex-Co-Founder ClidBlue Technologies, Office Tiger",
    email: "john@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "John Doe",
    title: "CEO & CO-Founder",
    description:
      "CEO Matracon, ex-Co-Founder ClidBlue Technologies, Office Tiger",
    email: "john@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen bg-[#F9FAFB] w-full">
        <TopNav />
        <CompanyHeader />
        <InfoGrid />
        <StrategyCard sources={Object.values(sources)} />
        <KeyPerformanceIndicators sources={Object.values(sources)} />
        <LatestActivities />
        <KeyPeople people={people} />
      </div>
    </div>
  );
}
