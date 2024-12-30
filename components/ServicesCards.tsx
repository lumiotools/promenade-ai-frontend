"use client";

import { Telescope, Building2, Eye } from "lucide-react";
import Image from "next/image";
import ValueChain from "../public/icons/Value Chain Icon.svg";
import Birdeye from "../public/icons/Segment Breakdown Icon.svg";
import { CompanyProfileModal } from "../components/CompanyProfileModal";
import { MarketingTrendsModal } from "../components/MarketingTrendsModal";
import { ValueChainModal } from "../components/ValueChainModal";
import { MarketingMapModal } from "../components/MarketingMapModal";
import { LoadingCard } from "../components/LoadingCard";
import { BusinessEvolutionModal } from "../components/BusinessEvolutionModal";
import { FindProductModal } from "../components/FindProductModal";
import BusinessEvolutionIcon from "../public/icons/Business Evolution Icon.svg";
import MarketSizeIcon from "../public/icons/Market size Icon.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ServicesCards = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(error);
  const [activeModal, setActiveModal] = useState<
    | "companyProfile"
    | "marketingTrends"
    | "valueChain"
    | "marketingMap"
    | "businessEvolution"
    | "findProduct"
    | null
  >(null);

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        <div
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
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
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
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
          <h3 className="font-semibold mb-2 text-[14px]">Company Profile</h3>
          <p className="text-sm text-gray-600 font-normal">
            Get an analyst summary of private and public companies
          </p>
        </div>

        <div
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal("valueChain");
          }}
        >
          <div className="relative flex justify-between items-start mb-2">
            <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
              <Image src={ValueChain} alt="Value Chain" className="w-5 h-5" />
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
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal("marketingMap");
          }}
        >
          <div className="relative flex justify-between items-start mb-2">
            <div className="border rounded-md flex items-center justify-center w-[40px] h-[40px]">
              <Image src={Birdeye} alt="Marketing Map" className="w-5 h-5" />
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
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
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
          <h3 className="font-semibold mb-2 text-[14px]">Business Evolution</h3>
          <p className="text-sm text-gray-600">
            Track and compare the business evolution of two or more companies
            over time
          </p>
        </div>

        <div
          className="p-3 rounded-xl border border-gray-200 text-left cursor-pointer hover:border-purple-200 transition-colors relative w-full"
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
            Quickly grasp views on the overall size and growth potential of the
            market
          </p>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
          <LoadingCard
            companyName="Nvidia"
            onBack={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ServicesCards;
