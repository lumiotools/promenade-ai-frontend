"use client";

import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchContext } from "@/app/search-context";
import { useSearchParams } from "next/navigation";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { CardTitle } from "../ui/card";

export interface Node {
  content: string;
  highlight_words: string[];
  title: string;
  source: string;
  doc_type: string;
  node_id: string;
}

interface ApiResponse {
  data: {
    searchId: string;
  };
}

export default function SearchResultsPage() {
  const { currentQuery, setCurrentQuery } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchQuery = useSearchParams().get("query");
  const searchFiles = useSearchParams().get("files");
  const router = useRouter();

  const currentDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (searchQuery) {
      setCurrentQuery(searchQuery);
      handleSearch(searchQuery, searchFiles?.split(",") ?? []);
    }
  }, [searchQuery, searchFiles]);

  const handleSearch = async (query: string, searchFiles: string[] = []) => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            files: searchFiles,
            user_id: "test",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ApiResponse = await response.json();

      if (!data) {
        throw new Error("Invalid response data");
      }

      router.push(`/search/${data.data.searchId}`);
    } catch (err) {
      console.error("Search error:", err);
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

  return (
    <div className="container mx-auto p-6 max-w-screen-2xl relative">

      {renderSkeletonLoading()}

      {isLoading && (
        <div className="absolute w-full h-screen top-0 left-0 flex justify-center items-center backdrop-blur-sm">
          <LoadingIndicator
            companyName={currentQuery}
            onBack={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
}
