"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, Loader2, Telescope, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ValueChain from "../public/icons/value-chain.png";
import Birdeye from "../public/icons/birdeye.png";
import { CompanyProfileModal } from "../components/CompanyProfileModal";
import { MarketingTrendsModal } from "../components/MarketingTrendsModal";
import { ValueChainModal } from "../components/ValueChainModal";
import { MarketingMapModal } from "../components/MarketingMapModal";
import { LoadingCard } from "../components/LoadingCard";
import { SearchResult } from "@/types/search";

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
  const [activeModal, setActiveModal] = useState<
    "companyProfile" | "marketingTrends" | "valueChain" | "marketingMap" | null
  >(null);
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
    setActiveModal(null);
    try {
      router.push("/company-profile");
    } catch (error) {
      console.error("Error submitting company profile:", error);
      setError("Failed to submit company profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (
    modalType:
      | "companyProfile"
      | "marketingTrends"
      | "valueChain"
      | "marketingMap"
  ) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-end justify-end">
      <div
        className={cn(
          "flex-grow flex flex-col items-end justify-end p-4 mb-16 md:mt-0 transition-all duration-200",
          (activeModal !== null || isLoading) &&
            "blur-[2px] pointer-events-none"
        )}
      >
        <div className="w-full max-w-5xl text-center">
          <div>
            <p className="text-[#4D5761] font-normal">
              Promenade AI Research Assistant
            </p>
            <h1 className="text-3xl md:text-3xl font-medium mb-6">
              How may I assist you today?
            </h1>
          </div>

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

          <div className="flex flex-col md:flex-row w-full mt-16 mb-3 items-center justify-between">
            <div></div>
            <h2 className="text-base font-light mb-2 text-[#333333]">
              Discover Key Insights to Enhance Your Search
            </h2>
            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("marketingTrends");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Telescope className="w-5 h-5" />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("marketingTrends");
                  }}
                >
                  See Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-base">Marketing Trends</h3>
              <p className="text-sm text-gray-600 w-full">
                Get a comprehensive overview of key competitors
              </p>
            </div>
            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("companyProfile");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Building2 className="w-5 h-5" />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("companyProfile");
                  }}
                >
                  See Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2">Company Profile</h3>
              <p className="text-sm text-gray-600">
                Get a quick snapshot of a company
              </p>
            </div>
            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("valueChain");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Image
                    src={ValueChain}
                    alt="Value Chain"
                    className="w-5 h-5"
                  />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("valueChain");
                  }}
                >
                  See Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2">Value Chain</h3>
              <p className="text-sm text-gray-600">
                Analyze an end-to-end industry/segment value chain
              </p>
            </div>
            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("marketingMap");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Image
                    src={Birdeye}
                    alt="Marketing Map"
                    className="w-5 h-5"
                  />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("marketingMap");
                  }}
                >
                  See Preview
                </button>
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

      {activeModal && (
        <div className="absolute inset-0 flex items-center justify-center">
          {activeModal === "marketingTrends" && (
            <MarketingTrendsModal
              isOpen={true}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          )}
          {activeModal === "companyProfile" && (
            <CompanyProfileModal
              isOpen={true}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          )}
          {activeModal === "valueChain" && (
            <ValueChainModal
              isOpen={true}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          )}
          {activeModal === "marketingMap" && (
            <MarketingMapModal
              isOpen={true}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          )}
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
