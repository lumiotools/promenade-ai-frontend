"use client";
import { SearchResult } from "@/types/search";
import React, { createContext, useState, useEffect } from "react";

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
    const parseLocalStorage = <T,>(key: string, defaultValue: T[]): T[] => {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
      } catch (error) {
        console.error(`Error parsing ${key}:`, error);
        return defaultValue;
      }
    };

    setSearches(parseLocalStorage("searches", []));
    setSearchResults(parseLocalStorage("searchResults", []));
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
    return Array.isArray(searchResults) 
      ? searchResults.find((result) => result.query === query)
      : undefined;
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
