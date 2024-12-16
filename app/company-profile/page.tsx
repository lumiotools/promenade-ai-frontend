"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TopNav } from "@/components/TopNav";
import { CompanyHeader } from "@/components/CompanyHeader";
import { StrategyCard } from "@/components/StrategyCard";
import { KeyPerformanceIndicators } from "@/components/KeyPerformanceIndicators";
import { LatestActivities } from "@/components/LatestActivities";
import { KeyPeople } from "@/components/KeyPeople";
import { fetchCompanyData, CompanyData } from "@/lib/dummyApi";
import { InfoGrid } from "@/components/company-info-grid";
import { LoadingCard } from "@/components/LoadingCard";

export default function CompanyProfile() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadData = useCallback(async () => {
    try {
      const data = await fetchCompanyData();
      setCompanyData(data);
    } catch (error) {
      console.error("Failed to fetch company data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <LoadingCard
          companyName={companyData?.name || "Company"}
          onBack={handleBack}
        />
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="bg-white rounded-2xl p-8 shadow-lg border text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Failed to load company data
          </h2>
          <p className="text-gray-600 mb-6">
            There was an error fetching the company profile. Please try again
            later.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#7F56D9] hover:bg-[#6941C6] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <TopNav />
      <div className="container mx-auto px-4 py-8">
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
