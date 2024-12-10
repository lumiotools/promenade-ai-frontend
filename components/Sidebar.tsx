"use client";

import * as React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Menu, Trash2 } from "lucide-react";
import { SearchContext, SearchResult } from "@/app/search-context";
import Image from "next/image";
import logo from "../public/images/logo pro.png";

export function AppSidebar() {
  const { searches, setCurrentQuery, setCurrentResult, deleteSearch } =
    useContext(SearchContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNewSearch = () => {
    setCurrentQuery("");
    setCurrentResult(null);
    router.push("/");
    setIsOpen(false);
  };

  const handleSearchClick = (search: SearchResult) => {
    setCurrentQuery(search.query);
    setCurrentResult(search.result);
    router.push("/search");
    setIsOpen(false);
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
        className={`fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] text-white flex flex-col z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Image src={logo} alt="Promenade" className="h-6 w-auto" />
            <span className="font-semibold">PROMENADE</span>
            <span className="text-xs px-2 py-0.5 bg-gray-800 rounded">
              BETA
            </span>
          </div>
          <button
            onClick={handleNewSearch}
            className="w-full py-2 px-4 rounded-full text-black font-medium flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(to right, #00ffcc, #00ccff)",
            }}
          >
            <span>+ New</span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto h-full">
          {searches.map((search, index) => (
            <div key={index} className="px-2 py-1">
              <button
                onClick={() => handleSearchClick(search)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span className="truncate">{search.query}</span>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSearch(search.query);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
