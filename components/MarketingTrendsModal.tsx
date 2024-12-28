"use client";

import { useState } from "react";
import { Telescope, X, Info } from "lucide-react";

interface MarketingTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { competitor: string }) => void;
}

export function MarketingTrendsModal({
  isOpen,
  onClose,
  onSubmit,
}: MarketingTrendsModalProps) {
  const [competitor, setCompetitor] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ competitor });
  };

  return (
    <div className="relative inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-[580px] mx-auto bg-white rounded-2xl shadow-xl border">
        <div className="flex items-center gap-3 py-3 px-5 border-b">
          <div className="p-2 border rounded-lg">
            <Telescope className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium">Marketing Trends</h2>
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
              htmlFor="competitor"
              className="block text-sm font-medium text-gray-700"
            >
              Competitor Name
            </label>
            <input
              type="text"
              id="competitor"
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="Enter competitor name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="border-t p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-b-2xl gap-4 sm:gap-8">
          <div className="flex items-center gap-1 text-xs sm:text-sm text-[#4B5563]">
            <Info className="w-3 h-3 text-gray-400" />
            <span className="text-[#6B7280] text-xs">
              To perform this action
            </span>
            <span className="font-medium text-[#111827] text-xs">
              01 credit
            </span>
            <span className="text-[#6B7280] text-xs">will be deducted</span>
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
