"use client";
import React, { createContext, useState, useEffect } from "react";

interface Node {
  content: string;
  source: string;
}

interface Source {
  doc_type: string;
  url: string;
}

export interface ApiResponse {
  response: Node[];
  sources: Array<{
    score: number;
    url: string;
  }>;
  valid_sources: Source[];
  invalid_sources: Source[];
}

export interface SearchResult {
  query: string;
  result: ApiResponse;
}

export interface SearchContextType {
  searches: SearchResult[];
  currentQuery: string;
  currentResult: ApiResponse | null;
  setCurrentQuery: (query: string) => void;
  addSearch: (query: string, result: ApiResponse) => void;
  getSearchResult: (query: string) => ApiResponse | null;
  setCurrentResult: (result: ApiResponse | null) => void;
}

export const SearchContext = createContext<SearchContextType>({
  searches: [],
  currentQuery: "",
  currentResult: null,
  setCurrentQuery: () => {},
  addSearch: () => {},
  getSearchResult: () => null,
  setCurrentResult: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searches, setSearches] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [currentResult, setCurrentResult] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const storedSearches = localStorage.getItem("searches");
    if (storedSearches) {
      setSearches(JSON.parse(storedSearches));
    }
  }, []);

  const addSearch = (query: string, result: ApiResponse) => {
    const newSearch = { query, result };
    const updatedSearches = [
      newSearch,
      ...searches.filter((s) => s.query !== query),
    ].slice(0, 20);

    setSearches(updatedSearches);
    setCurrentResult(result);
    localStorage.setItem("searches", JSON.stringify(updatedSearches));
  };

  const getSearchResult = (query: string): ApiResponse | null => {
    const search = searches.find((s) => s.query === query);
    return search ? search.result : null;
  };

  return (
    <SearchContext.Provider
      value={{
        searches,
        currentQuery,
        currentResult,
        setCurrentQuery,
        addSearch,
        getSearchResult,
        setCurrentResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
