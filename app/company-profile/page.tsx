"use client";

import { TopNav } from "@/components/TopNav";
import { CompanyHeader } from "@/components/CompanyHeader";
import { InfoGrid } from "@/components/company-info-grid";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-h-screen bg-[#F9FAFB] w-full">
        <TopNav />
        <CompanyHeader />
        <InfoGrid />
      </div>
    </div>
  );
}
