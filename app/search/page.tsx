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
  highlight_words: string[];
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
  summary: string;
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

const DUMMY_RESPONSE = {
  sources: [],
  response: [
    {
      node_id: "04591cfb-6669-4105-a89c-135f276be79f",
      content:
        "In February 2024, Apple released the Vision Pro headset, marking its entrance into a new product category. In March 2024, Apple announced new MacBook Air models with M3 chips. In May 2024, redesigned iPad Pro models and an updated iPad Air were introduced.",
      highlight_words: ["Vision Pro", "MacBook Air", "iPad Pro", "iPad Air"],
      title:
        "Upcoming Apple Products Guide: What's Coming in 2024 and Beyond - MacRumors",
      source:
        "https://www.macrumors.com/guide/upcoming-apple-products/#:~:text=In%20February%202024,and%20an%20updated",
      doc_type: "Industry Report",
    },
    {
      node_id: "80bb3bcd-9004-4719-8f70-13979408e229",
      content:
        "Significant announcements during fiscal year 2024 included the following: First Quarter 2024: MacBook Pro 14-in.; MacBook Pro 16-in.; and iMac. Second Quarter 2024: MacBook Air 13-in.; and MacBook Air 15-in. Third Quarter 2024: iPad Air; iPad Pro; iOS 18, macOS Sequoia, iPadOS 18, watchOS 11, visionOS 2 and tvOS 18, updates to the Company’s operating systems; and Apple Intelligence™, a personal intelligence system that uses generative models. Fourth Quarter 2024: iPhone 16, iPhone 16 Plus, iPhone 16 Pro and iPhone 16 Pro Max; Apple Watch Series 10; and AirPods 4.",
      highlight_words: [
        "new launches",
        "Apple",
        "iPhone 16",
        "MacBook Pro",
        "iPad Pro",
      ],
      title: "Apple Inc. Form 10-K - 11/01/2024",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318680792&type=HTML&symbol=AAPL&cdn=a6ac3148f61462e1b7d60719ee317ef9&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2024-11-01#:~:text=Significant%20announcements%20during,and%20AirPods%204.",
      doc_type: "SEC Filing",
    },
    {
      node_id: "b7f2e804-dfe5-4cfa-afed-9601cacd7002",
      content:
        "Significant announcements during fiscal year 2024 included the following: MacBook Pro 14-in., MacBook Pro 16-in., iMac, MacBook Air 13-in., MacBook Air 15-in., iPad Air, iPad Pro, iPhone 16, iPhone 16 Plus, iPhone 16 Pro and iPhone 16 Pro Max, Apple Watch Series 10, and AirPods 4.",
      highlight_words: ["new", "launches", "Apple"],
      title: "Apple Inc. Form 10-K - 11/01/2024",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318680792&type=HTML&symbol=AAPL&cdn=a6ac3148f61462e1b7d60719ee317ef9&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2024-11-01#:~:text=Significant%20announcements%20during,and%20AirPods%204.",
      doc_type: "SEC Filing",
    },
    {
      node_id: "559037f5-cf42-40ce-b23a-488df75e24c4",
      content:
        "Significant announcements during fiscal year 2023 included the following: iPad and iPad Pro; Next-generation Apple TV 4K; MLS Season Pass; MacBook Pro 14”, MacBook Pro 16” and Mac mini; Second-generation HomePod; MacBook Air 15”, Mac Studio and Mac Pro; Apple Vision Pro™; iPhone 15 series; Apple Watch Series 9 and Apple Watch Ultra 2.",
      highlight_words: ["new product", "service", "software offerings"],
      title: "Apple Inc. Form 10-K - 11/03/2023",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317840268&type=HTML&symbol=AAPL&cdn=438829151a8c993b52ce4aa1a1799f41&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2023-11-03#:~:text=Significant%20announcements%20during,and%20Apple%20Watch%20Ultra%202.",
      doc_type: "SEC Filing",
    },
    {
      node_id: "ce452931-c040-436c-b28d-4c1f18f0e0f8",
      content:
        "During the third quarter of 2023, the Company announced the following new products: 15-inch MacBook Air®, powered by the M2 chip; Mac Studio™, powered by the M2 Max chip and the new M2 Ultra chip; Mac Pro®, powered by the new M2 Ultra chip; and Apple Vision Pro™, the Company’s first spatial computer featuring its new visionOS™, expected to be available in early calendar year 2024.",
      highlight_words: [
        "new products",
        "15-inch MacBook Air",
        "Apple Vision Pro",
      ],
      title: "Apple Inc. Form 10-Q - 08/04/2023",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317662536&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2023-08-04#:~:text=During%20the%20third,in%20early%20calendar",
      doc_type: "SEC Filing",
    },
    {
      node_id: "c5b3ca52-fd94-4d29-a620-4d00f4d23896",
      content:
        "During the second quarter of 2023, the Company announced the following new products: MacBook Pro® 14” and MacBook Pro 16”, powered by the Apple M2 Pro and M2 Max chip; Mac mini®, powered by the Apple M2 and M2 Pro chip; and Second-generation HomePod®.",
      highlight_words: ["new products", "MacBook Pro", "Mac mini", "HomePod"],
      title: "Apple Inc. Form 10-Q - 05/05/2023",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317464321&type=HTML&symbol=AAPL&cdn=8870df057a9d3e494bcbdcfe5533e742&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2023-05-05#:~:text=During%20the%20second,and%20M2%20Pro%20chip%3B",
      doc_type: "SEC Filing",
    },
    {
      node_id: "2191a407-d6a1-44fb-8059-17c3af9e7220",
      content:
        "Significant announcements during fiscal 2022 included the updated MacBook Pro, third generation of AirPods, updated iPhone SE, all-new Mac Studio, updated iPad Air, updated MacBook Air, iPhone 14 series, second generation of AirPods Pro, and Apple Watch Series 8.",
      highlight_words: ["new product", "service", "software offerings"],
      title: "Apple Inc. Form 10-K - 10/28/2022",
      source:
        "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=117017468&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2022-10-28#:~:text=Significant%20announcements%20during,AirPods%20Pro%2C%20and%20Apple",
      doc_type: "SEC Filing",
    },
  ],
  summary: "I don't have information on that.",
  valid_sources: [
    {
      doc_type: "Industry Report",
      title:
        "Upcoming Apple Products Guide: What's Coming in 2024 and Beyond - MacRumors",
      url: "https://www.macrumors.com/guide/upcoming-apple-products/",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-K - 11/01/2024",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318680792&type=HTML&symbol=AAPL&cdn=a6ac3148f61462e1b7d60719ee317ef9&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2024-11-01",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-K - 11/03/2023",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317840268&type=HTML&symbol=AAPL&cdn=438829151a8c993b52ce4aa1a1799f41&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2023-11-03",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-Q - 08/04/2023",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317662536&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2023-08-04",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-Q - 05/05/2023",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=317464321&type=HTML&symbol=AAPL&cdn=8870df057a9d3e494bcbdcfe5533e742&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2023-05-05",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-K - 10/28/2022",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=117017468&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2022-10-28",
    },
  ],
  invalid_sources: [
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-Q - 07/29/2022",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=116848603&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2022-07-29",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-K - 10/29/2021",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=116215295&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-K&formDescription=Annual+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2021-10-29",
    },
    {
      doc_type: "Earnings Call",
      title: "Apple (AAPL) Q1 2023 Earnings Call Transcript",
      url: "https://www.fool.com/earnings/call-transcripts/2023/02/02/apple-aapl-q1-2023-earnings-call-transcript/",
    },
    {
      doc_type: "Earnings Call",
      title: "Apple (AAPL) Q4 2022 Earnings Call Transcript",
      url: "https://www.fool.com/earnings/call-transcripts/2022/10/27/apple-aapl-q4-2022-earnings-call-transcript/",
    },
    {
      doc_type: "Earnings Call",
      title: "Apple (AAPL) Q4 2024 Earnings Call Transcript",
      url: "https://www.fool.com/earnings/call-transcripts/2024/10/31/apple-aapl-q4-2024-earnings-call-transcript/",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 02/02/2023",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=117210318&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2023-02-02",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 10/31/2024",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318679785&type=HTML&symbol=AAPL&cdn=f7eff34fbbd60ad782cbe98de2cc3d9e&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2024-10-31",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 01/27/2022",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=116400626&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2022-01-27",
    },
    {
      doc_type: "Earnings Call",
      title: "Apple (AAPL) Q3 2022 Earnings Call Transcript",
      url: "https://www.fool.com/earnings/call-transcripts/2022/07/28/apple-aapl-q3-2022-earnings-call-transcript/",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 07/27/2021",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=116018144&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2021-07-27",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 04/28/2021",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=115818810&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2021-04-28",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 8-K - 01/27/2021",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=115574807&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=8-K&formDescription=Current+report+pursuant+to+Section+13+or+15%28d%29&dateFiled=2021-01-27",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 10-Q - 01/28/2022",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=116401944&type=HTML&symbol=AAPL&companyName=Apple+Inc.&formType=10-Q&formDescription=General+form+for+quarterly+reports+under+Section+13+or+15%28d%29&dateFiled=2022-01-28",
    },
    {
      doc_type: "Industry Report",
      title: "New Apple Products Expected This Year - SimplyMac",
      url: "https://www.simplymac.com/tech/new-apple-products-expected-this-year",
    },
    {
      doc_type: "Industry Report",
      title:
        "Apple Prepares Major Product Launches And OS Upgrades - The Pinnacle Gazette",
      url: "https://evrimagaci.org/tpg/apple-prepares-major-product-launches-and-os-upgrades-114027",
    },
    {
      doc_type: "Industry Report",
      title:
        "Apple introduces new iMac supercharged by M4 and Apple Intelligence - Apple",
      url: "https://www.apple.com/newsroom/2024/10/apple-introduces-new-imac-supercharged-by-m4-and-apple-intelligence/",
    },
    {
      doc_type: "Industry Report",
      title:
        "iPhone 16: Every Feature We Expect Apple To Announce Today - CNET",
      url: "https://www.cnet.com/tech/mobile/the-iphone-16-debut-hours-away-heres-what-we-expect-apple-to-announce/",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 4 - 12/18/2024",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318795368&type=HTML&symbol=AAPL&cdn=8b0a87401521c654c006e7d4fb63adf5&companyName=Apple+Inc.&formType=4&formDescription=Statement+of+changes+in+beneficial+ownership+of+securities&dateFiled=2024-12-18",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form 144 - 12/16/2024",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318788973&type=HTML&symbol=AAPL&cdn=85eeb05583d39187b905b8386aafd4f2&companyName=Apple+Inc.&formType=144&formDescription=Notice+of+proposed+sale+of+securities+pursuant+to+Rule+144&dateFiled=2024-12-16",
    },
    {
      doc_type: "SEC Filing",
      title: "Apple Inc. Form S-3ASR - 11/01/2024",
      url: "https://app.quotemedia.com/data/downloadFiling?webmasterId=90423&ref=318681034&type=HTML&symbol=AAPL&cdn=8f07367ab4ca9a867a6e04a6c9f5dfd2&companyName=Apple+Inc.&formType=S-3ASR&formDescription=Automatic+shelf+registration+statement+of+securities+of+well-known+seasoned+issuers&dateFiled=2024-11-01",
    },
  ],
};

export default function SearchResultsPage() {
  const { currentQuery, setCurrentQuery } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAiSummary, setShowAiSummary] = useState(true);
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
      handleSearch(searchQuery, searchFiles?.split(",") ?? []);
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

  // const handleAiSummarize = () => {
  //   if (searchResults) {
  //     const allContent = searchResults.response
  //       .map((node) => node.content)
  //       .join("\n\n");
  //     setSelectedContent({
  //       content: allContent,
  //       source: "All Sources",
  //       node_id: "all-results",
  //       title: "Combined Results",
  //       doc_type: "Summary",
  //     });
  //     setShowAiSummary(true);
  //   }
  // };

  const renderAiSummary = () => {
    if (!searchResults) return null;

    return (
      <AiSummaryMarkdown
        key={`${Date.now()}`}
        summary={searchResults.summary}
        // nodes={searchResults.response}
        // searchQuery={currentQuery}
        // onBack={() => setShowAiSummary(false)}
        // initialContent={selectedContent.content}
        // nodeId={`${selectedContent.source}-${Date.now()}`}
        // source={selectedContent.source}
      />
    );
  };

  const renderResultCard = (node: Node) => {
    const limitedContent = node.content.split(" ").slice(0, 50).join(" ");
    const isOverLimit = node.content.length > limitedContent.length;
    let highlightedContent = limitedContent;
    node.highlight_words.forEach((word) => {
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
              node.doc_type
            )} text-xs font-medium px-3 py-1 rounded-full self-start`}
          >
            {node.doc_type}
          </Badge>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {node.title}
          </h3>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw as any]}
            className="text-gray-600 mb-4 flex-grow prose !text-sm"
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
          {/* <p className="text-gray-600 text-sm mb-4 flex-grow text-justify">
            {formatContent(content.content)}
          </p> */}
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
              onClick={() =>
                handleSearch(currentQuery, searchFiles?.split(",") ?? [])
              }
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
      </div>

      <div className="md:mx-5 flex items-center gap-5 my-5">
        <h2 className="text-lg font-normal">
          Search Result for: <span className="font-medium">{currentQuery}</span>
        </h2>
        {/* <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full bg-white w-full sm:w-auto"
          onClick={handleAiSummarize}
        >
          <Image src={Stars} alt="stars" className="w-6 h-6 object-contain" />
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            AI Summarize
          </span>
        </Button> */}
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

          {showAiSummary ? renderAiSummary() : <></>}

          <div className="border border-gray-100 w-full"></div>
          {renderContentTabs()}
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
