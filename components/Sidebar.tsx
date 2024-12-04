"use client"

import * as React from "react"
import { useContext } from 'react'
import { useRouter } from "next/navigation"
import { ChevronDown } from 'lucide-react'
import { SearchContext } from '@/app/search-context'
import Image from "next/image"
import logo from "../public/images/logo pro.png"

export function AppSidebar() {
  const { searches, setCurrentQuery, getSearchResult } = useContext(SearchContext)
  const router = useRouter()

  const handleNewSearch = () => {
    setCurrentQuery("")
    router.push("/")
  }

  const handleSearchClick = (query: string) => {
    setCurrentQuery(query)
    const result = getSearchResult(query)
    if (result) {
      localStorage.setItem("currentSearchResult", JSON.stringify(result))
    }
    router.push("/search")
  }

  return (
    <div className="w-64 bg-[#0A0A0A] text-white flex flex-col min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Image src={logo} alt="Promenade" className="h-6" />
          <span className="font-semibold">PROMENADE</span>
          <span className="text-xs px-2 py-0.5 bg-gray-800 rounded">BETA</span>
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
      <nav className="flex-1 overflow-y-auto">
        {searches.map((query, index) => (
          <div key={index} className="px-2 py-1">
            <button 
              onClick={() => handleSearchClick(query)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span className="truncate">{query}</span>
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            </button>
          </div>
        ))}
      </nav>
    </div>
  )
}

