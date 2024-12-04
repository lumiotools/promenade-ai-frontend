"use client";

import { useContext } from "react";
import { SearchContext } from "@/app/search-context";
import SearchPage from "@/components/Search";

export default function Home() {
  const { currentQuery, setCurrentQuery, addSearch } =
    useContext(SearchContext);

  return (
    <div className="p-4 md:p-8">
      <SearchPage
        currentQuery={currentQuery}
        setCurrentQuery={setCurrentQuery}
        addSearch={addSearch}
      />
    </div>
  );
}
