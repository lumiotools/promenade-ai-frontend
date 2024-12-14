"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, Loader2, Eye, Telescope, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/types/search";
import Image from "next/image";
import ValueChain from "../public/icons/value-chain.png";
import Birdeye from "../public/icons/Birdeye.png";
import { CompanyProfileModal } from "./CompanyProfileModal";
import { LoadingCard } from "./LoadingCard";

interface SearchPageProps {
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
  addSearch: (query: string, result: SearchResult) => void;
}

export default function SearchPage({
  currentQuery,
  setCurrentQuery,
}: SearchPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"sec" | "all" | "upload">("sec");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) {
      setError("Please enter a search query");
      return;
    }
    setError(null);
    router.push(`/search?query=${encodeURIComponent(currentQuery)}`);
  };

  const handleModalSubmit = async () => {
    setIsLoading(true);
    setIsModalOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 200000));
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className={cn(
          "flex-grow flex flex-col items-center justify-center p-4 mt-10 md:mt-0 transition-all duration-200",
          (isModalOpen || isLoading) && "blur-[2px] pointer-events-none"
        )}
      >
        <div className="w-full max-w-5xl text-center">
          <h1 className="text-3xl md:text-3xl font-medium mb-6">
            Search for any topics
          </h1>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-3xl mx-auto mb-8 flex gap-4"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-xl border border-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-400 text-gray-700 placeholder-gray-500 text-lg bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-1.5 rounded-xl font-medium text-white transition-opacity disabled:opacity-50 bg-[#7F56D9]"
              style={{
                background: "linear-gradient(to right, #8B5CF6, #6366F1)",
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Search"
              )}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              type="button"
              className={cn(
                "px-6 py-2 rounded-xl transition-colors border text-sm text-[#545454]",
                searchMode === "sec" ? "bg-white" : "bg-[#F3F3F3]"
              )}
              onClick={() => setSearchMode("sec")}
            >
              SEC Filing & IR Presentation only
            </button>
            <button
              type="button"
              className={cn(
                "px-6 py-2 rounded-xl transition-colors border text-sm text-[#545454]",
                searchMode === "all" ? "bg-white" : "bg-[#F3F3F3]"
              )}
              onClick={() => setSearchMode("all")}
            >
              All sources including web
            </button>
            <button
              type="button"
              className={cn(
                "px-6 py-2 rounded-xl transition-colors border text-sm text-[#545454]",
                searchMode === "upload" ? "bg-white" : "bg-[#F3F3F3]"
              )}
              onClick={() => setSearchMode("upload")}
            >
              Upload Internal File
            </button>
          </div>

          <div className="flex flex-col md:flex-row w-full mt-16 mb-3 items-center justify-between">
            <div></div>
            <h2 className="text-base font-light mb-2 text-[#333333]">
              Discover Key Insights to Enhance Your Search
            </h2>
            <button className="hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-2 px-3 text-[#333333] rounded-lg">
              <Eye className="w-3 h-3" />
              See Preview
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 text-left">
              <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px] mb-2">
                <Telescope className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Marketing Trends</h3>
              <p className="text-sm text-gray-600">
                Get a comprehensive overview of key competitors
              </p>
            </div>
            <div
              className="p-6 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px] mb-2">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Company Profile</h3>
              <p className="text-sm text-gray-600">
                Get a quick snapshot of a company
              </p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 text-left">
              <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px] mb-2">
                <Image src={ValueChain} alt="" className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Value Chain</h3>
              <p className="text-sm text-gray-600">
                Analyze an end-to-end industry/segment value chain
              </p>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 text-left">
              <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px] mb-2">
                <Image src={Birdeye} alt="" className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Marketing Map</h3>
              <p className="text-sm text-gray-600">
                Get a detailed breakdown of market segments
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative w-full max-w-3xl mx-auto">
              {error}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CompanyProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingCard
            companyName="Nvidia"
            onBack={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  );
}
