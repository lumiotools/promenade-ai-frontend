"use client";

import * as React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Upload, Globe, FileText } from "lucide-react";
import { SearchContext } from "@/app/search-context";
import Image from "next/image";
import logo from "../public/images/promenade logo.svg";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for testing
const DUMMY_SEARCHES = [
  "www.tesla.com",
  "chubb.com",
  "chubb.com",
  "www.apple.com",
  "GenZ",
  "Defence Industry",
  "www.matracon.com",
  "www.qualcomm.com",
  "OTT Industry",
  "OTT Industry",
  "Netflix.com",
  "Netflix.com",
  "Contents Industry",
  "ECG Strategy",
  "Private Equity Deal Soup",
  "CRM for Venture Capital",
  "salesforce.com",
  "P&C Insurance in the next decade",
  "P&C Insurance in the next decade",
  "P&C Insurance in the next decade",
];

export function AppSidebar() {
  const { setCurrentQuery, getSearchResult } = useContext(SearchContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchHistory, setSearchHistory] = React.useState("");
  const [filteredSearches, setFilteredSearches] =
    React.useState(DUMMY_SEARCHES);

  const handleNewSearch = () => {
    setCurrentQuery("");
    router.push("/");
    setIsOpen(false);
  };

  const handleSearchClick = (query: string) => {
    setCurrentQuery(query);
    const result = getSearchResult(query);
    if (result) {
      // localStorage.setItem("currentSearchResult", JSON.stringify(result));
    }
    router.push("/search");
    setIsOpen(false);
  };

  // Filter searches based on search history input
  React.useEffect(() => {
    const filtered = DUMMY_SEARCHES.filter((query) =>
      query.toLowerCase().includes(searchHistory.toLowerCase())
    );
    setFilteredSearches(filtered);
  }, [searchHistory]);

  // Function to determine icon based on the search query
  const getQueryIcon = (query: string) => {
    if (query.includes(".com")) {
      return <Globe className="h-4 w-4 text-gray-400" />;
    }
    return <FileText className="h-4 w-4 text-gray-400" />;
  };

  return (
    <>
      <button
        className="md:hidden fixed top-3 right-4 z-50 p-2 bg-[#0A0A0A] text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-[250px] bg-[#0A0A0A] text-white flex flex-col z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* Header */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-center gap-2 mt-5">
            <Image src={logo} alt="Promenade" width={140} height={140} className="object-cover"/>
          </div>

          {/* New Search Button */}
          <button
            onClick={handleNewSearch}
            className="text-black w-full h-10 rounded-full font-medium flex items-center justify-center gap-2 transition-all"
            style={{
              background:
                "linear-gradient(91.93deg, #F8F5B1 2.3%, #C6A1FD 35.25%, #89FDD6 66.76%, #9294F0 97.79%)",
            }}
          >
            <div className="flex items-center justify-center w-full gap-2 text-center">
              <span className="text-4xl font-light text-center mb-2">+</span>
              <span className="text-base font-semibold">New</span>
            </div>
          </button>

          {/* Search History Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            <Input
              value={searchHistory}
              onChange={(e) => setSearchHistory(e.target.value)}
              placeholder="Search History"
              className=" outline-none w-full bg-[#1C1C1C] pl-10 text-sm text-gray-300 placeholder:text-gray-400 border border-[#38383A]"
            />
          </div>
        </div>

        {/* Search List */}
        <nav className="scrollbar-dark-sm flex-1 overflow-y-auto px-2 space-y-1">
          {filteredSearches.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSearchClick(query)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#1C1C1C] rounded-lg transition-colors group"
            >
              {getQueryIcon(query)}
              <span className="flex-1 text-left truncate">{query}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-4">
          {/* Upload Button */}
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#42307D] transition-colors text-sm font-normal">
            <Upload className="h-4 w-4" />
            Upload Internal File
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1C1C1C]">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.png" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200">Maksud Alam</p>
              <p className="text-xs text-gray-400 truncate">maksud@ruse.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
