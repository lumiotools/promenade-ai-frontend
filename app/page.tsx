"use client";

import { useContext } from "react";

import { SearchContext } from "@/app/search-context";
import SearchPage from "@/components/Search";

export default function Home() {
  const { currentQuery, setCurrentQuery, addSearch } =
    useContext(SearchContext);

  return (
    <SearchPage
      currentQuery={currentQuery}
      setCurrentQuery={setCurrentQuery}
      addSearch={addSearch}
    />
  );
}
