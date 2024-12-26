"use client";

import { useState, useEffect, useContext } from "react";
import { Globe, SearchIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SearchContext } from "@/app/search-context";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Stars from "../../public/icons/stars.png";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { CardTitle } from "../ui/card";
import { AiSummaryMarkdown } from "@/components/AiSummaryMarkdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/navigation";

export interface Node {
  content: string;
  title: string;
  source: string;
  doc_type: string;
  node_id: string;
}

interface Source {
  doc_type: string;
  title: string;
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

const getTagColor = (docType: string): string => {
  switch (docType) {
    case "SEC Filing":
      return "bg-green-100 text-green-800";
    case "Industry Report":
      return "bg-orange-100 text-orange-800";
    case "IR Page":
      return "bg-blue-100 text-blue-800";
    case "Earnings Call":
      return "bg-cyan-100 text-cyan-800";
    case "Press":
      return "bg-purple-100 text-purple-800";
    case "Uploaded Document":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function SearchResultsPage() {
  const { currentQuery, setCurrentQuery } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Node | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    valid: false,
    invalid: false,
  });

  console.log(selectedContent);

  const searchQuery = useSearchParams().get("query");
  const searchFiles = useSearchParams().get("files");
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      setCurrentQuery(searchQuery);
      handleSearch(searchQuery,searchFiles?.split(",") ?? []);
    }
  }, [searchQuery, searchFiles, setCurrentQuery]);

  const handleSearch = async (query: string, searchFiles: string[] = []) => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: query,
            files: searchFiles,
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
      setExpandedSections({ valid: false, invalid: false });
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSourceList = (
    sources: Source[],
    title: string,
    type: "valid" | "invalid"
  ) => {
    const docTypes = Array.from(
      new Set(sources?.map((source) => source.doc_type))
    );

    const isExpanded = expandedSections[type];
    const visibleDocTypes = isExpanded ? docTypes : docTypes.slice(0, 1);

    return (
      <Card className="bg-white rounded-lg shadow-sm h-full">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {visibleDocTypes.map((docType) => {
            const docTypeSources = sources.filter(
              (s) => s.doc_type === docType
            );
            const visibleSources = isExpanded
              ? docTypeSources
              : docTypeSources.slice(0, 4);
            const hasMore = docTypeSources.length > 4;

            return (
              <div key={docType} className="mb-6 last:mb-0">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {docType}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {visibleSources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 truncate font-normal">
                        {source.title}
                      </span>
                    </a>
                  ))}
                </div>
                {hasMore && !isExpanded && (
                  <button
                    onClick={() =>
                      setExpandedSections((prev) => ({
                        ...prev,
                        [type]: true,
                      }))
                    }
                    className="text-sm text-gray-500 hover:text-gray-700 mt-2 flex items-center gap-1"
                  >
                    {`+${docTypeSources.length - 4} Show More`}
                  </button>
                )}
              </div>
            );
          })}

          {isExpanded && docTypes.length > 0 && (
            <button
              onClick={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  [type]: false,
                }))
              }
              className="text-sm text-gray-500 hover:text-gray-700 mt-4 flex items-center gap-1"
            >
              Show Less
            </button>
          )}
        </CardContent>
      </Card>
    );
  };

  const handleAiSummarize = () => {
    if (searchResults) {
      const allContent = searchResults.response
        .map((node) => node.content)
        .join("\n\n");
      setSelectedContent({
        content: allContent,
        source: "All Sources",
        node_id: "all-results",
        title: "Combined Results",
        doc_type: "Summary",
      });
      setShowAiSummary(true);
    }
  };

  const renderAiSummary = () => {
    if (!searchResults) return null;

    return (
      <AiSummaryMarkdown
        key={`${Date.now()}`}
        nodes={searchResults.response}
        searchQuery={currentQuery}
        onBack={() => setShowAiSummary(false)}
        // initialContent={selectedContent.content}
        // nodeId={`${selectedContent.source}-${Date.now()}`}
        // source={selectedContent.source}
      />
    );
  };

  const renderResultCard = (content: Node) => {
    return (
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full w-full">
        <CardContent className="p-6 flex flex-col flex-grow">
          <Badge
            variant="secondary"
            className={`mb-4 ${getTagColor(
              content.doc_type
            )} text-xs font-medium px-3 py-1 rounded-full self-start`}
          >
            {content.doc_type}
          </Badge>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {content.title}
          </h3>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw as any]}
            className="text-gray-600 mb-4 flex-grow prose"
            components={{
              a: (props) => (
                <a href={props.href} target="_blank" rel="noreferrer">
                  {props.children}
                </a>
              ),
              mark: (props) => (
                <mark className="bg-yellow-300">{props.children}</mark>
              ),
            }}
          >
            {content.content}
          </ReactMarkdown>
          {/* <p className="text-gray-600 text-sm mb-4 flex-grow text-justify">
            {formatContent(content.content)}
          </p> */}
          <div className="flex justify-between items-center">
            <a
              href={content.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg transition-colors max-w-full"
            >
              <span className="text-xs text-black font-medium hover:underline break-words line-clamp-1">
                {content.title}
              </span>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFilteredResults = (filter: string) => {
    if (!searchResults) return null;

    const filteredContent =
      filter === "all"
        ? searchResults.response
        : searchResults.response.filter((content) =>
            content.doc_type.toLowerCase().includes(filter.toLowerCase())
          );

    if (filteredContent.length === 0) {
      return (
        <div className="flex justify-center items-center p-8">
          <p className="text-gray-500 text-center">
            No results available for this category.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        {filteredContent.map((content, index) => (
          <div key={content.node_id || index} className="flex">
            {renderResultCard(content)}
          </div>
        ))}
      </div>
    );
  };

  const renderContentTabs = () => {
    return (
      <Tabs
        defaultValue="all"
        className="w-full flex flex-col items-start mb-10 md:mt-5"
      >
        <div className="my-1">
          <TabsList className="flex flex-wrap gap-2 md:gap-4 w-full bg-transparent items-start">
            {[
              { value: "all", label: "All" },
              { value: "sec", label: "SEC Filing" },
              { value: "industry", label: "Industry Reports" },
              { value: "ir", label: "IR Page" },
              { value: "earnings", label: "Earnings Call" },
              { value: "press", label: "Press" },
              { value: "uploadedDocument", label: "Uploaded Document" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="border px-4 py-2 font-normal text-xs rounded-md bg-[#F3F4F6] hover:bg-gray-100 hover:text-gray-900 transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-[#384250]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {[
          { value: "all", filter: "all" },
          { value: "sec", filter: "SEC Filing" },
          { value: "industry", filter: "Industry Report" },
          { value: "ir", filter: "IR Page" },
          { value: "earnings", filter: "Earnings Call" },
          { value: "press", filter: "Press" },
          { value: "uploadedDocument", filter: "Uploaded Document" },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderFilteredResults(tab.filter)}
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl relative">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center justify-between mb-6 mt-4">
        <div className="flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 max-w-2xl relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 text-gray-700 placeholder-gray-500 text-base bg-white"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleSearch(currentQuery)}
              disabled={isLoading}
              className="h-10 px-8 py-2 rounded-md font-medium text-white transition-all disabled:opacity-50 bg-[#7F56D9] hover:bg-[#6941C6]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="default" className="h-10 gap-2">
              <Image
                src="/icons/Excel.svg"
                alt="excel"
                width={20}
                height={20}
                className="object-contain"
              />
              Export
            </Button>
            <Button
              size="default"
              className="h-10 gap-2 bg-[#7C3AED] hover:bg-[#6D28D9]"
            >
              <Image
                src="/icons/share.svg"
                alt="share"
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="md:mx-5 flex items-center gap-5 my-5">
        <h2 className="text-lg font-normal">
          Search Result for: <span className="font-medium">{currentQuery}</span>
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full bg-white w-full sm:w-auto"
          onClick={handleAiSummarize}
        >
          <Image src={Stars} alt="stars" className="w-6 h-6 object-contain" />
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            AI Summarize
          </span>
        </Button>
      </div>

      {error && (
        <div className="w-full max-w-3xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingIndicator
            companyName={currentQuery}
            onBack={() => router.push("/")}
          />
        </div>
      ) : searchResults ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {searchResults.valid_sources.length > 0 &&
              renderSourceList(
                searchResults.valid_sources,
                "Found Answers From",
                "valid"
              )}
            {searchResults.invalid_sources.length > 0 &&
              renderSourceList(
                searchResults.invalid_sources,
                "No Answer Found From",
                "invalid"
              )}
          </div>

          {showAiSummary ? (
            <div className="space-y-6">
              {renderAiSummary()}
              <div className="border border-gray-100 w-full"></div>
              {renderContentTabs()}
            </div>
          ) : (
            <>
              <div className="border border-gray-100 w-full"></div>
              {renderContentTabs()}
            </>
          )}
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
