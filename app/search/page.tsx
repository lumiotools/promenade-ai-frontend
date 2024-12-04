"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Search, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface ApiResponse {
  response: string;
  sources: Array<{
    score: number;
    url: string;
  }>;
}

type TabType = "earnings" | "financials" | "industry" | "market";

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<TabType>("earnings");
  console.log(selectedTab);

  useEffect(() => {
    const results = localStorage.getItem("searchResults");
    const lastQuery = localStorage.getItem("lastSearchQuery");
    if (results) {
      setSearchResults(JSON.parse(results));
    }
    if (lastQuery) {
      setSearchQuery(lastQuery);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: searchQuery,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ApiResponse = await response.json();
      setSearchResults(data);
      localStorage.setItem("searchResults", JSON.stringify(data));
      localStorage.setItem("lastSearchQuery", searchQuery);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="relative w-3/4 max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What are the key financial highlights of Tesla Inc. for Q3 2024?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
              style={{
                border: "1.5px solid transparent",
                borderRadius: "9999px",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(299.73deg, #B689FF 18.18%, #00EC9D 100.4%, #B588FE 210.75%, #D3FF95 297.18%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full px-6 py-3 font-medium text-white transition-opacity disabled:opacity-50"
            style={{
              background:
                "linear-gradient(285.8deg, #B689FF 11.03%, #00EC9D 50%, #D3FF95 88.97%)",
            }}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full relative mb-4">
          {error}
        </div>
      )}

      {searchResults && (
        <>
          <div className="mb-8 prose mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {searchResults.response}
            </ReactMarkdown>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <button
              className={cn(
                "p-4 text-purple-500 border-2 border-purple-200 rounded-2xl transition-colors"
              )}
              onClick={() => handleTabClick("earnings")}
            >
              Quarterly Earnings Call
            </button>
            <button
              className={cn(
                "p-4 text-purple-500 border-2 border-purple-200 rounded-2xl transition-colors"
              )}
              onClick={() => handleTabClick("financials")}
            >
              Financial Statements
            </button>
            <button
              className={cn(
                "p-4 text-purple-500 border-2 border-purple-200 rounded-2xl transition-colors"
              )}
              onClick={() => handleTabClick("industry")}
            >
              Industry Comparisons
            </button>
            <button
              className={cn(
                "p-4 text-purple-500 border-2 border-purple-200 rounded-2xl transition-colors"
              )}
              onClick={() => handleTabClick("market")}
            >
              Market Performance
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.sources.map((source, index) => (
              <Card key={index} className="rounded-xl border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Source {index + 1}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Information from {new URL(source.url).hostname}
                  </p>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-700 inline-flex items-center"
                  >
                    View Source Details
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">
              Want More Information?
            </h2>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="rounded-full border-purple-500 text-purple-500 hover:bg-purple-50 hover:text-purple-500"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-purple-500 text-purple-500 hover:bg-purple-50 hover:text-purple-500"
              >
                Browse Documentation
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
