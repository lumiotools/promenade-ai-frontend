"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const apiResponse = {
  text: "Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.",
  sources: [
    "https://en.wikipedia.org/wiki/Artificial_intelligence",
    "https://www.ibm.com/cloud/learn/what-is-artificial-intelligence",
    "https://www.britannica.com/technology/artificial-intelligence",
  ],
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setShowData(true);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Promenade AI</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter your query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </Button>
      </form>

      {showData && (
        <Card className="mt-6">
          <CardContent className="space-y-4">
            <div>
              <p className="text-gray-700 p-3 mt-2">{apiResponse.text}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Sources</h2>
              <ul className="list-disc pl-5 space-y-1">
                {apiResponse.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      {new URL(source).hostname}
                      <ExternalLink className="ml-1 h-4 w-4 inline" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
