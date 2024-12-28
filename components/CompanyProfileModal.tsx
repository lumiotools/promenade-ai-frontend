"use client";

import { useState } from "react";
import { Building2, X, Info } from "lucide-react";

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    url: string;
    businessLine: string;
    country: string;
  }) => void;
}

export function CompanyProfileModal({
  isOpen,
  onClose,
  onSubmit,
}: CompanyProfileModalProps) {
  const [formData, setFormData] = useState({
    url: "",
    businessLine: "",
    country: "China",
  });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlPattern = new RegExp(
      "^(https?://)?(www\\.)?([a-zA-Z0-9]+\\.[a-zA-Z]{2,})"
    );
    if (!urlPattern.test(formData.url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <div className="relative inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <div className="w-full max-w-[580px] mx-auto bg-white rounded-2xl shadow-xl border overflow-hidden">
        <div className="flex items-center gap-3 py-3 px-4 sm:px-5 border-b">
          <div className="p-2 border rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium">Company Profile</h2>
          <button
            onClick={onClose}
            className="absolute right-4 sm:right-6 top-4 p-1 text-gray-500 hover:text-gray-700 bg-[#F3F4F6] rounded-full"
            style={{ boxShadow: "0px 0.89px 1.78px 0px #1018280D" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Homepage URL
            </label>
            <div className="relative flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden">
              <span className="px-3 py-2 bg-gray-50 text-gray-500 border-b sm:border-b-0 sm:border-r">
                http://
              </span>
              <input
                type="text"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="www.nvidia.com"
                className="flex-1 px-3 py-2 focus:outline-none text-gray-900 placeholder:text-[#1F2A37]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Business Line <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.businessLine}
                onChange={(e) =>
                  setFormData({ ...formData, businessLine: e.target.value })
                }
                placeholder="Type here"
                className="outline-none w-full px-3 py-2 rounded-lg border border-gray-300 placeholder:text-[#1F2A37] placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="outline-none w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
              >
                <option value="China">China</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
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
        {error && <p className="text-red-500 text-sm p-4">{error}</p>}
      </div>
    </div>
  );
}
