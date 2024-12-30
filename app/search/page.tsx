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
        <div className="w-full bg-white pb-8">
          <Skeleton className="h-8 w-3/4 mb-6" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <Skeleton className="h-10 w-64 sm:w-auto" />
              <div className="flex gap-2 w-full sm:w-auto">
                <Skeleton className="h-10 w-56" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden mt-8">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white rounded-lg shadow-sm h-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-lg font-semibold">
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg shadow-sm h-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="text-lg font-semibold">
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Skeleton className="h-10 w-full max-w-3xl mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full w-full"
              >
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-4/5 mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mt-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
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
