"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AiSummaryMarkdown({ summary }: { summary: string }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isExpanded) {
    return (
      <div className="relative w-full mb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          aria-expanded={false}
          aria-label="Expand summary"
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mb-8 relative">
      <button
        onClick={() => setIsExpanded(false)}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
        aria-expanded={true}
        aria-label="Collapse summary"
      >
        <ChevronUp className="h-4 w-4 text-gray-500" />
      </button>
      <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden mt-4">
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {"## Search Results Summary\n" + summary}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
