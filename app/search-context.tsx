"use client"

import React, { createContext, useState, useEffect } from "react";

interface SearchResult {
  query: string;
  response: string;
  sources: Array<{
    score: number;
    url: string;
  }>;
}

interface SearchContextType {
  searches: string[];
  currentQuery: string;
  searchResults: SearchResult[];
  setCurrentQuery: (query: string) => void;
  addSearch: (query: string, result: SearchResult) => void;
  getSearchResult: (query: string) => SearchResult | undefined;
}

export const SearchContext = createContext<SearchContextType>({
  searches: [],
  currentQuery: "",
  searchResults: [],
  setCurrentQuery: () => {},
  addSearch: () => {},
  getSearchResult: () => undefined,
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searches, setSearches] = useState<string[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("searches");
    const storedResults = localStorage.getItem("searchResults");
    if (storedSearches) {
      try {
        setSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error("Error parsing stored searches:", error);
        setSearches([]);
      }
    }
    if (storedResults) {
      try {
        setSearchResults(JSON.parse(storedResults));
      } catch (error) {
        console.error("Error parsing stored results:", error);
        setSearchResults([]);
      }
    }
  }, []);

  const addSearch = (query: string, result: SearchResult) => {
    const updatedSearches = [
      query,
      ...searches.filter((s) => s !== query),
    ].slice(0, 20);
    setSearches(updatedSearches);
    localStorage.setItem("searches", JSON.stringify(updatedSearches));

    const updatedResults = [
      result,
      ...searchResults.filter((r) => r.query !== query),
    ].slice(0, 20);
    setSearchResults(updatedResults);
    localStorage.setItem("searchResults", JSON.stringify(updatedResults));
  };

  const getSearchResult = (query: string) => {
    return searchResults.find((result) => result.query === query);
  };

  return (
    <SearchContext.Provider
      value={{
        searches,
        currentQuery,
        searchResults,
        setCurrentQuery,
        addSearch,
        getSearchResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
