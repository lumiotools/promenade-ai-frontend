"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CardTitle } from "../../ui/card";
import { AiSummaryMarkdown } from "@/components/AiSummaryMarkdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "../../ui/use-toast";
import calender from "../../../public/icons/calendar-icon.svg";

export interface Node {
  content: string;
  highlights: string[];
  title: string;
  source: string;
  type: string;
}

interface Source {
  type: string;
  title: string;
  url: string;
}

interface Files {
  id: string;
  name: string;
  mimeType: string;
  size: number;
}

interface ApiResponse {
  date: string;
  query: string;
  summary: string;
  searchResults: Node[];
  validSources: Source[];
  invalidSources: Source[];
  attachedFiles: Files[];
}

const getTagColor = (docType: string): string => {
  switch (docType) {
    case "SEC Filing":
      return "bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647]";
    case "Industry Report":
      return "bg-[#FFFAEB] text-[#F79D09] border border-[#FEE689]";
    case "IR Page":
      return "bg-[#F0F9FF] text-[#026AA2] border border-[#B9E6FE]";
    case "Earnings Call":
      return "bg-[#F0F9FF] text-[#026AA2] border border-[#B9E6FE]";
    case "Press":
      return "bg-[#F4F3FF] text-[#5925DC] border border-[#D9D6FE]";
    case "Uploaded Document":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function SearchResultsPage({
  params: { searchId },
}: {
  params: { searchId: string };
}) {
  console.log("searchId", searchId);

  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAiSummary] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  console.log("Line 78 - searchResults", searchResults);

  const currentDate = searchResults?.date
    ? new Date(searchResults.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    if (searchId) {
      handleSearch(searchId);
    }
  }, [searchId]);

  const handleSearch = async (searchId: string) => {
    setIsLoading(true);
    setError(null);

    console.log("searchId new", searchId);

    try {
      const response = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search/${searchId}`
        )
      ).json();

      if (!response.success) {
        throw new Error(response.message);
      }

      const data: ApiResponse = response.data;

      if (!data) {
        throw new Error("Invalid response data");
      }

      setSearchResults(data);
      setIsExpanded(false);
    } catch (err) {
      setError(err.message)
      console.error("Search error:", err);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkeletonLoading = () => {
    return (
      <>
        <div className="flex justify-between items-end mb-6 mt-4">
          <div className="flex flex-col items-start gap-2">
            <Skeleton className="h-6 w-96 rounded-full"></Skeleton>
            <div className="flex flex-row gap-2 items-end">
              <Skeleton className="w-5 h-5"></Skeleton>
              <Skeleton className="w-40 h-5"></Skeleton>
            </div>
          </div>
          <div className="flex space-x-4">
            <Skeleton className="w-24 h-10"></Skeleton>
            <Skeleton className="w-24 h-10"></Skeleton>
          </div>
        </div>

        <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="prose prose-sm">
              <h3 className="font-medium">Search Results Summary</h3>
            </div>
            <div className="flex flex-col gap-3 my-4">
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-2/5 h-4" />
              <Skeleton className="w-2/4 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-3/5 h-4" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 my-8">
          <Skeleton className="w-40 h-12" />
          <Skeleton className="w-56 h-12" />
          <Skeleton className="w-36 h-12" />
          <Skeleton className="w-28 h-12" />
          <Skeleton className="w-44 h-12" />
        </div>

        <div className="grid grid-cols-4 gap-8">
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="w-full aspect-video" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white rounded-lg shadow-sm h-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-lg font-semibold">
                Found Answers From
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2 grid grid-cols-2 gap-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-sm h-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-lg font-semibold">
                No Answer Found From
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2 grid grid-cols-2 gap-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderSourceList = (
    sources: Source[],
    title: string,
    type: "valid" | "invalid"
  ) => {
    console.log(
      `${type.charAt(0).toUpperCase() + type.slice(1)} Sources:`,
      sources
    );

    const docTypes = Array.from(new Set(sources.map((source) => source.type)));
    const totalSources = sources.length;

    const visibleDocTypes = isExpanded ? docTypes : [docTypes[0]];
    const initialVisibleCount = 3;
    let shownSources = 0;

    return (
      <Card className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        <CardHeader className="border-b py-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-2 flex-grow overflow-auto">
          {visibleDocTypes.map((docType) => {
            const docTypeSources = sources.filter((s) => s.type === docType);
            const visibleSources = isExpanded
              ? docTypeSources
              : docTypeSources.slice(0, initialVisibleCount - shownSources);

            shownSources += visibleSources.length;

            return (
              <div key={docType} className="mb-4 last:mb-0">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {docType} ({docTypeSources.length})
                </h4>
                <div className="grid grid-cols-3 gap-3">
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
              </div>
            );
          })}

          {!isExpanded && totalSources > initialVisibleCount && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm text-gray-500 mt-2 hover:text-gray-700"
            >
              +{totalSources - initialVisibleCount} more source
              {totalSources - initialVisibleCount !== 1 ? "s" : ""}
            </button>
          )}

          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-sm text-gray-500 mt-4 hover:text-gray-700"
            >
              Show less
            </button>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderAiSummary = () => {
    if (!searchResults) return null;

    return (
      <AiSummaryMarkdown
        key={`${Date.now()}`}
        summary={searchResults.summary}
      />
    );
  };

  const renderResultCard = (node: Node) => {
    const limitedContent = node.content.split(" ").slice(0, 50).join(" ");
    const isOverLimit = node.content.length > limitedContent.length;
    let highlightedContent = limitedContent;
    node.highlights.forEach((word) => {
      highlightedContent = highlightedContent.replace(
        new RegExp(word, "gi"),
        `<mark>${word}</mark>`
      );
    });
    return (
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full w-full">
        <CardContent className="p-6 flex flex-col flex-grow">
          <Badge
            variant="secondary"
            className={`mb-4 ${getTagColor(
              node.type
            )} text-xs font-medium px-3 py-1 rounded-full self-start`}
          >
            {node.type}
          </Badge>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {node.title}
          </h3>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw as any]}
            className="text-gray-600 mb-4 flex-grow prose text-sm"
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
            {highlightedContent + (isOverLimit ? "..." : "")}
          </ReactMarkdown>
          <div className="flex justify-between items-center">
            <a
              href={node.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg transition-colors max-w-full"
            >
              <span className="text-xs text-black font-medium hover:underline break-words line-clamp-1">
                {node.title}
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
        ? searchResults.searchResults
        : searchResults.searchResults.filter((content) =>
            content.type.toLowerCase().includes(filter.toLowerCase())
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
          <div key={index} className="flex">
            {renderResultCard(content)}
          </div>
        ))}
      </div>
    );
  };

  const renderContentTabs = () => {
    const getCategoryCount = (filter: string) => {
      if (!searchResults) return 0;
      return filter === "all"
        ? searchResults.searchResults.length
        : searchResults.searchResults.filter((content) =>
            content.type.toLowerCase().includes(filter.toLowerCase())
          ).length;
    };
    return (
      <Tabs
        defaultValue="all"
        className="w-full flex flex-col items-start mb-10 md:mt-5"
      >
        <div className="my-1">
          <TabsList className="flex flex-wrap gap-2 md:gap-4 w-full bg-transparent items-start">
            {[
              { value: "all", label: "All", filter: "all" },
              { value: "sec", label: "SEC Filing", filter: "SEC Filing" },
              {
                value: "industry",
                label: "Industry Reports",
                filter: "Industry Report",
              },
              { value: "ir", label: "IR Page", filter: "IR Page" },
              {
                value: "earnings",
                label: "Earnings Call",
                filter: "Earnings Call",
              },
              { value: "press", label: "Press", filter: "Press" },
              {
                value: "uploadedDocument",
                label: "Uploaded Document",
                filter: "Uploaded Document",
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="border px-4 py-2 font-normal text-xs rounded-md bg-[#F3F4F6] hover:bg-gray-100 hover:text-gray-900 transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-[#384250]"
              >
                {tab.label} ({getCategoryCount(tab.filter)})
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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The URL has been copied to your clipboard",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the URL to your clipboard",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (

    

    <div className="container mx-auto p-6 max-w-screen-2xl relative">

{error && (
            <div className="w-full max-w-3xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

      {isLoading ? (
        renderSkeletonLoading()
      ) : searchResults ? (
        <>
          <div className="flex justify-between items-end mb-6 mt-4">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-xl font-semibold text-[#182230]">
                Search Results For: &quot;{searchResults?.query}&quot;
              </h1>
              <div className="flex flex-row gap-2 items-end">
                <Image
                  src={calender}
                  alt="calender"
                  className="w-5 h-5 object-contain"
                ></Image>
                <p className="text-[11px] font-medium text-[#1F2A37]">
                  As of {currentDate}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
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
                onClick={handleShare}
              >
                <Image
                  src="/icons/Share.svg"
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

          {showAiSummary ? renderAiSummary() : <></>}

          <div className="border border-gray-100 w-full"></div>
          {renderContentTabs()}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {searchResults.validSources.length > 0 &&
              renderSourceList(
                searchResults.validSources,
                "Found Answers From",
                "valid"
              )}
            {searchResults.invalidSources.length > 0 &&
              renderSourceList(
                searchResults.invalidSources,
                "No Answer Found From",
                "invalid"
              )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
