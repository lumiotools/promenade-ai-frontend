"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import MarketSizeIcon from "../public/icons/Market size Icon.svg";

import Image from "next/image";
interface FindProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { product: string; market: string }) => void;
}

export function FindProductModal({
  isOpen,
  onClose,
  onSubmit,
}: FindProductModalProps) {
  const [product, setProduct] = useState("");
  const [market, setMarket] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ product, market });
  };

  return (
    <div className="relative inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <div className="w-full max-w-[580px] mx-auto bg-white rounded-2xl shadow-xl border">
        <div className="flex items-center gap-3 py-3 px-5 border-b">
          <div className="p-2 border rounded-lg">
            <Image
              src={MarketSizeIcon}
              alt="Marketing Map"
              className="w-5 h-5"
            />
          </div>
          <h2 className="text-lg font-medium">Find Product & Service</h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-4 p-1 text-gray-500 hover:text-gray-700 bg-[#F3F4F6] rounded-full"
            style={{ boxShadow: "0px 0.89px 1.78px 0px #1018280D" }}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="product"
              className="block text-sm font-medium text-gray-700"
            >
              Product/Service
            </label>
            <input
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product or service name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="market"
              className="block text-sm font-medium text-gray-700"
            >
              Target Market
            </label>
            <input
              type="text"
              id="market"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="Enter target market"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="border-t p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-b-2xl gap-4 sm:gap-1">
          <div className="flex items-center justify-between gap-1 text-xs sm:text-sm text-[#4B5563]">
            <Info className="w-4 h-4 text-gray-400" />
            <span className="text-[#6B7280]">To perform this action</span>
            <span className="font-medium text-[#111827]">01 credit</span>
            <span className="text-[#6B7280]">will be deducted</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#FFFFFF] rounded-lg border bg-[#FFFFFF] border-[#D2D6DB]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 sm:flex-initial px-4 py-2 text-sm font-medium text-white bg-[#7F56D9] rounded-lg hover:bg-[#6941C6]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
