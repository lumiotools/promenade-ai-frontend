"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  Loader2,
  Telescope,
  Building2,
  Paperclip,
  FileText,
  X,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ValueChain from "../public/icons/Value Chain Icon.svg"
import Birdeye from "../public/icons/Segment Breakdown Icon.svg"
import { CompanyProfileModal } from "../components/CompanyProfileModal";
import { MarketingTrendsModal } from "../components/MarketingTrendsModal";
import { ValueChainModal } from "../components/ValueChainModal";
import { MarketingMapModal } from "../components/MarketingMapModal";
import { LoadingCard } from "../components/LoadingCard";
import { SearchResult } from "@/types/search";
import { BusinessEvolutionModal } from "../components/BusinessEvolutionModal";
import { FindProductModal } from "../components/FindProductModal";
import BusinessEvolutionIcon from "../public/icons/Business Evolution Icon.svg";
import MarketSizeIcon from "../public/icons/Market size Icon.svg";

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
    | "companyProfile"
    | "marketingTrends"
    | "valueChain"
    | "marketingMap"
    | "businessEvolution"
    | "findProduct"
    | null
  >(null);
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    setFiles(Array.from(files));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) {
      setError("Please enter a search query");
      return;
    }
    setError(null);
    setIsUploading(true);
    try {
      let searchUrl = `/search?query=${encodeURIComponent(currentQuery)}`;
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("file", file);
        });

        formData.append("user_id", "test");

        const response = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search/upload_files`,
            {
              method: "POST",
              body: formData,
            }
          )
        ).json();

        if (!response.success) {
          throw new Error("Failed to upload files");
        }

        if (response.data.files.length === 0) {
          throw new Error("No files uploaded");
        }

        searchUrl += `&files=${encodeURIComponent(
          response.data.files.join(",")
        )}`;
      }
      setIsUploading(false);
      router.push(searchUrl);
    } catch (error) {
      setIsUploading(false);
      setError("Failed to search. Please try again.");
    }
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
      | "businessEvolution"
      | "findProduct"
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
          "flex-grow flex flex-col items-end justify-end p-4 mb-5 md:mt-0 transition-all duration-200",
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
                className="w-full px-12 py-2 rounded-xl border border-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-purple-100 focus:border-purple-400 text-gray-700 placeholder-gray-500 text-lg bg-white"
              />
              {files.length > 0 ? (
                <div className="absolute right-4 top-1/2 size-6 -translate-y-1/2">
                  <FileText className="size-6 text-[#7F56D9]" />
                  <p className="absolute top-3 left-4 text-xs bg-[#7F56D9] rounded-full px-1 text-white">
                    {files.length}
                  </p>
                  <button
                    type="button"
                    className="absolute bottom-4 left-4 text-xs bg-destructive rounded-full p-0.5 text-white transition-all ease-in-out duration-150"
                    onClick={() => setFiles([])}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-gray-400 hover:text-[#7F56D9] transition-all ease-in-out duration-150"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" />
                </button>
              )}
              <input
                type="file"
                accept="application/pdf"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFilesAttach}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="px-6 py-1.5 rounded-xl font-medium text-white transition-opacity disabled:opacity-50 bg-[#7F56D9]"
            >
              {isLoading || isUploading ? (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
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
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("marketingTrends");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">
                Competitive Landscape
              </h3>
              <p className="text-sm text-gray-600 w-full">
                Get a comprehensive overview of key competitors
              </p>
            </div>

            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
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
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("companyProfile");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">
                Company Profile
              </h3>
              <p className="text-sm text-gray-600 font-normal">
                Get an analyst summary of private and public companies
              </p>
            </div>

            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
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
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("valueChain");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">Value Chain</h3>
              <p className="text-sm text-gray-600">
                Analyze an end-to-end industry/segment value chain
              </p>
            </div>

            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
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
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("marketingMap");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">Marketing Map</h3>
              <p className="text-sm text-gray-600">
                Get a detailed breakdown of market segments
              </p>
            </div>

            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("businessEvolution");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Image
                    src={BusinessEvolutionIcon}
                    alt="Marketing Map"
                    className="w-5 h-5"
                  />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("businessEvolution");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">
                Business Evolution
              </h3>
              <p className="text-sm text-gray-600">
                Track and compare the business evolution of two or more
                companies over time
              </p>
            </div>

            <div
              className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-[280px]"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal("findProduct");
              }}
            >
              <div className="relative flex justify-between items-start mb-2">
                <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
                  <Image
                    src={MarketSizeIcon}
                    alt="Marketing Map"
                    className="w-5 h-5"
                  />
                </div>
                <button
                  className="absolute top-[-5px] right-[-5px] hover:text-purple-700 text-xs flex items-center gap-1 bg-[#F2EEFB] py-1 px-2 text-[#333333] rounded-lg border border-[#C4B1EE]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal("findProduct");
                  }}
                >
                  <Eye className="w-3 h-4 object-contain"></Eye>
                  Preview
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-[14px]">
                Find Product & Service
              </h3>
              <p className="text-sm text-gray-600">
                Quickly grasp views on the overall size and growth potential of
                the market
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
          {activeModal === "businessEvolution" && (
            <BusinessEvolutionModal
              isOpen={true}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
            />
          )}
          {activeModal === "findProduct" && (
            <FindProductModal
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
