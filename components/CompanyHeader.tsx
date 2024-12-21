"use client";

import { useState } from "react";
import {
  Calendar,
  Eye,
  Clock,
  Globe,
  Phone,
  Twitter,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CompanyData } from "../lib/dummyApi";

interface CompanyHeaderProps {
  companyData: CompanyData;
}

export function CompanyHeader({ companyData }: CompanyHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl font-semibold">
          Finding Tear-sheet for {companyData.name}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-[#1F2A37]" />
              <span className="text-[#1F2A37]">
                As of {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="hidden md:block h-5 border-l w-1 border-[#D2D6DB]"></div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs md:text-sm text-black">
                Search Criteria:
              </span>
              <span className="bg-[#E5E7EB] text-xs md:text-sm px-2 py-1 rounded-xl">
                www.{companyData.name.toLowerCase()}.com
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center gap-4 border px-1 py-1.5 rounded-md text-xs md:text-sm w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#079455]" />
                <span>10K pages viewed</span>
              </div>
              <div className="h-5 border-l w-1 border-[#D2D6DB]"></div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0BA5EC]" />
                <span>20 man-hrs saved</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 w-full md:w-auto"
              >
                <Image
                  src="/icons/Excel.svg"
                  alt="excel"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                Export
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] w-full md:w-auto"
              >
                <Image
                  src="/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                  className="object-contain"
                  style={{ filter: "invert(100%) brightness(5)" }}
                />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <Image
            src={companyData.logo}
            alt={companyData.name}
            width={96}
            height={96}
            className="rounded-lg object-contain mx-auto md:mx-0"
          />

          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-2 md:space-y-0">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  {companyData.name}
                </h2>
                <p className="text-[#344054] text-xs md:text-sm">
                  {companyData.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm h-7 w-7 border"
                >
                  <Globe className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm h-7 w-7 border"
                >
                  <Phone className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm h-7 w-7 border"
                >
                  <Twitter className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm h-7 w-7 border"
                >
                  <Linkedin className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div
              className={`flex flex-col md:flex-row gap-4 ${
                isExpanded
                  ? ""
                  : "w-full max-h-40 overflow-hidden md:max-h-none md:overflow-visible"
              }`}
            >
              <div className="bg-[#F8F9FA] rounded-lg p-4 w-full">
                <div className="grid grid-cols-2 md:grid-cols3 gap-y-4 md:gap-y-6">
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Type
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      No. of Employees
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.employees}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Incorporation Year
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.incorporationYear}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Annual Revenue
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.annualRevenue}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Funding
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.funding}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Category
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-lg p-4 w-full">
                <div className="grid grid-cols-2 gap-y-4 md:gap-y-6">
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      CEO First Name
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.ceo.firstName}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      CEO Last Name
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.ceo.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      Email
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.ceo.email}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      LinkedIn
                    </div>
                    <div className="font-medium text-xs">
                      {companyData.ceo.linkedin}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full md:hidden flex items-center justify-center"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show More
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
