"use client";

import { useEffect, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { CompanyHeader } from "@/components/CompanyHeader";
import { StrategyCard } from "@/components/StrategyCard";
import { KeyPerformanceIndicators } from "@/components/KeyPerformanceIndicators";
import { LatestActivities } from "@/components/LatestActivities";
import { KeyPeople } from "@/components/KeyPeople";
import { fetchCompanyData, CompanyData } from "@/lib/dummyApi";
import { InfoGrid } from "@/components/company-info-grid";

export default function CompanyProfile() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCompanyData();
        setCompanyData(data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!companyData) {
    return <div>Failed to load company data.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen bg-[#F9FAFB] w-full">
        <TopNav />
        <CompanyHeader companyData={companyData} />
        <InfoGrid companyData={companyData} />
        <StrategyCard
          sources={Object.values(companyData.sources_StrategyCard)}
          strategy={companyData.strategy}
        />
        <KeyPerformanceIndicators
          sources={Object.values(companyData.sources_KeyPerformanceIndicators)}
          kpi={companyData.kpi}
        />
        <LatestActivities activities={companyData.activities} />
        <KeyPeople people={companyData.keyPeople} />
      </div>
    </div>
  );
}
