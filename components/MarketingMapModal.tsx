"use client";

import { useState } from "react";
import { Map, X, Info } from "lucide-react";

interface MarketingMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { segment: string }) => void;
}

export function MarketingMapModal({
  isOpen,
  onClose,
  onSubmit,
}: MarketingMapModalProps) {
  const [segment, setSegment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ segment });
  };

  return (
    <div className="relative inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <div className="w-full max-w-[580px] mx-auto bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="flex items-center gap-3 py-3 sm:px-5 border-b">
          <div className="p-2 border rounded-lg">
            <Map className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium">Marketing Map</h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-4 p-1 text-gray-500 hover:text-gray-700 bg-[#F3F4F6] rounded-full"
            style={{ boxShadow: "0px 0.89px 1.78px 0px #1018280D" }}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="segment"
              className="block text-sm font-medium text-gray-700"
            >
              Market Segment
            </label>
            <input
              type="text"
              id="segment"
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              placeholder="Enter market segment"
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
