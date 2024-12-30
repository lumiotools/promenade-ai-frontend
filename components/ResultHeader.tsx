"use client";

import { Calendar, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ResultHeaderProps {
  query: string;
  date: string;
  url: string;
  pagesViewed: number;
  manHoursSaved: number;
  onShare: () => void;
}

export function ResultHeader({
  query,
  date,
  pagesViewed,
  manHoursSaved,
  onShare,
}: ResultHeaderProps) {
  return (
    <div className="w-full bg-white pb-8">
      <h1 className="text-xl font-semibold text-[#182230] py-4">
        Search Results For: &quot;{query}&quot;
      </h1>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 min-w-fit">
            <Calendar className="h-5 w-5 text-[#1F2A37]" />
            <span className="text-xs text-[#1F2A37]">As of {date}</span>
          </div>

          <div className="hidden sm:block h-5 border-l border-[#D2D6DB]" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#1F2A37]">Search Criteria:</span>
            <span className="bg-[#F3F4F6] text-xs px-3 py-2 rounded-full text-[#1F2A37]">
              www.matracon.com
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-4 px-4 py-2.5 rounded-lg border border-[#D2D6DB] w-full sm:w-auto bg-white">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[#079455]" />
              <span className="text-xs text-[#1F2A37] whitespace-nowrap">
                {pagesViewed}K pages viewed
              </span>
            </div>

            <div className="h-5 border-l border-[#D2D6DB]" />

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0BA5EC]" />
              <span className="text-xs text-[#1F2A37] whitespace-nowrap">
                {manHoursSaved} man-hrs saved
              </span>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none gap-2 px-4 py-2 h-10"
            >
              <Image
                src="/icons/Excel.svg"
                alt="Export to Excel"
                width={20}
                height={20}
                className="object-contain"
              />
              Export
            </Button>

            <Button
              size="sm"
              className="flex-1 sm:flex-none gap-2 px-4 py-2 h-10 bg-[#7C3AED] hover:bg-[#6D28D9]"
              onClick={onShare}
            >
              <Image
                src="/icons/Share.svg"
                alt="Share"
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
