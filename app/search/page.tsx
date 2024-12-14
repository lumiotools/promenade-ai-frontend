"use client";

import { useState, useEffect, useContext } from "react";
import { Search, Share2, MoreVertical, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SearchContext } from "@/app/search-context";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Stars from "../../public/icons/stars.png";

interface Node {
  content: string;
  source: string;
  doc_type: string;
}

interface Source {
  doc_type: string;
  url: string;
}

interface ApiResponse {
  response: Node[];
  sources: Array<{
    score: number;
    url: string;
  }>;
  valid_sources: Source[];
  invalid_sources: Source[];
}

export default function SearchResultsPage() {
  const { currentQuery, setCurrentQuery } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = useSearchParams().get("query");

  useEffect(() => {
    if (searchQuery) {
      setCurrentQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }, [searchQuery, setCurrentQuery]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
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
            message: query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ApiResponse = await response.json();

      if (!data || !data.response) {
        throw new Error("Invalid response data");
      }

      setSearchResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // const getFileNameFromUrl = (url: string) => {
  //   try {
  //     const pathname = new URL(url).pathname;
  //     let filename = pathname.split("/").pop() || "";
  //     if (filename) {
  //       filename = filename.replace(/\.[^/.]+$/, "");
  //       filename = filename.replace(/[-_]/g, " ");
  //       filename = filename
  //         .split(" ")
  //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");
  //       if (filename.length > 45) {
  //         filename = filename.substring(0, 42) + "...";
  //       }
  //       return filename;
  //     }
  //     return url.length > 45 ? url.substring(0, 42) + "..." : url;
  //   } catch {
  //     return url.length > 45 ? url.substring(0, 42) + "..." : url;
  //   }
  // };

  const renderSourceList = (sources: Source[], title: string) => {
    const docTypes = Array.from(
      new Set(sources?.map((source) => source.doc_type))
    );

    return (
      <Card className="">
        <CardHeader className="border-b mb-2">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] overflow-y-auto">
          <div className="space-y-4">
            {docTypes.map((docType) => (
              <div key={docType}>
                <h4 className="font-semibold mb-2 text-[#333333] text-sm">{docType}</h4>
                <ul className="space-y-2">
                  {sources
                    .filter((source) => source.doc_type === docType)
                    .map((source, index) =>
                      isValidUrl(source.url) ? (
                        <li key={index}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-slate-600 hover:underline"
                          >
                            <Globe className="w-4 h-4 flex-shrink-0" />
                            {/* <span className="truncate inline-block w-full">
                              {getFileNameFromUrl(source.url)}
                            </span> */}
                                 <span className="truncate">
                              {new URL(source.url).hostname.replace("www.", "")}
                            </span>
                          </a>
                        </li>
                      ) : (
                        <li key={index}>
                          <span>Invalid URL: {source.url}</span>
                        </li>
                      )
                    )}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mx-5">
        <div className="flex-1 w-full sm:w-auto">
          <h1 className="text-lg mb-4 sm:mb-0">
            Search Result for:{" "}
            <span className="font-medium">{currentQuery}</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full bg-white w-full sm:w-auto"
          >
            <Image
              src={Stars}
              alt="stars"
              className="w-6 h-6 object-contain"
            ></Image>
            <span className="bg-custom-gradient bg-clip-text text-transparent">
              AI Summarize
            </span>
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-12 w-12 object-contain" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-12 w-12" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-12 w-12" />
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="w-full max-w-3xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      ) : searchResults ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mx-5">
            <div className="lg:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="h-[calc(100vh-170px)] overflow-y-auto px-6 py-1 space-y-2 shadow-lg rounded-xl">
                  {searchResults.response?.length > 0 ? (
                    searchResults.response.map((content, index) => (
                      <div key={index} className="space-y-2">
                        <div className="overflow-hidden prose">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            className="text-gray-800"
                            components={{
                              a: (props) => (
                                <a
                                  href={props.href}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {props.children}
                                </a>
                              ),
                            }}
                          >
                            {content.content}
                          </ReactMarkdown>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-blue-500">
                            {isValidUrl(content.source) ? (
                              <p className="flex gap-x-1 line-clamp-1 items-center">
                                <Globe className="w-5 h-5" />
                                <a
                                  href={content.source}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {new URL(content.source).hostname.replace(
                                    "www.",
                                    ""
                                  )}
                                </a>
                              </p>
                            ) : (
                              <p>Source not available</p>
                            )}
                          </div>
                          <div className="mb-6 px-2 py-1 text-purple-500 border-2 border-purple-200 bg-purple-100 rounded-lg transition-colors">
                            {content.doc_type}
                          </div>
                        </div>
                        {index < searchResults.response.length - 1 && (
                          <div className="border-b border-gray-200 mt-6" />
                        )}
                      </div>
                    ))
                  ) : (
                    <h1>No results found.</h1>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {searchResults.valid_sources.length > 0 &&
                renderSourceList(
                  searchResults.valid_sources,
                  "Found Answers From"
                )}
              {searchResults.invalid_sources.length > 0 &&
                renderSourceList(
                  searchResults.invalid_sources,
                  "No Answer Found From"
                )}
            </div>
          </div>

          <div className="w-full border my-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Elon Musk's Opening Remarks",
                content:
                  "Tesla is on track to hit record deliveries, supported by increasing adoption of EVs globally.",
                link: "Read Earnings Call Transcript",
                action: "SEC Filing",
              },
              {
                title: "Income Statement Highlights",
                content:
                  "Revenue: $25.7B (+12% YoY), Gross Profit: $6.2B (-5% YoY), Net Income: $2.8B (-10% YoY).",
                link: "View Tesla's Q3 2024 Income Statement",
                action: "IR Presentation",
              },
              {
                title: "Stock Performance Post-Earnings",
                content:
                  "Tesla's stock rose 6% post-earnings due to higher guidance for Q4.",
                link: "Read Detailed Analysis",
                action: "Industry Reports",
              },
              {
                title: "Comparison with Rivian",
                content:
                  "Tesla's revenue growth outpaces Rivian's 8% YoY growth in Q3 Year 2024.",
                link: "See Comparative Analysis",
                action: "Industry Reports",
              },
            ].map((card, index) => (
              <Card key={index} className="p-4">
                <CardContent className="p-0">
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.content}</p>
                  <div className="flex flex-col items-start text-sm w-full space-y-2">
                    <a
                      href="#"
                      className="text-[#0C0C0C] hover:underline w-full font-medium"
                    >
                      {card.link}
                    </a>
                    <div className="p-2 bg-[#F2EEFB] rounded-xl font-normal">
                      <span className="text-[#333333]">{card.action}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-600">
            No search results available. Please perform a search.
          </p>
        </div>
      )}
    </div>
  );
}
