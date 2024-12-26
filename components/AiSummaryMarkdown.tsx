"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Node } from "@/app/search/page";
import { cn } from "@/lib/utils";

interface AiSummaryMarkdownProps {
  nodes: Node[];
  searchQuery: string;
  onBack: () => void;
}

export function AiSummaryMarkdown({
  nodes,
  searchQuery,
}: AiSummaryMarkdownProps) {
  const [summary, setSummary] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: string; content: string }>
  >([]);

  console.log(summary, error);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInitialSummary();
  }, [nodes, searchQuery]);

  const fetchInitialSummary = async () => {
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
            nodes,
            search_query: searchQuery,
            chat_history: [],
            message: "Provide me its summary",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI summary");
      }

      const data = await response.json();
      const assistantContent = data.response;

      setSummary(assistantContent);
      setChatHistory([
        {
          role: "assistant",
          content: assistantContent,
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI summary:", error);
      setError("Failed to fetch AI summary. Please try again.");
      setChatHistory([
        {
          role: "assistant",
          content: "Failed to fetch AI summary. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const updatedChatHistory = [
      ...chatHistory,
      { role: "user", content: input },
    ];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nodes,
            search_query: searchQuery,
            chat_history: chatHistory,
            message: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      const assistantContent = data.response;

      setSummary(assistantContent);
      setChatHistory([
        ...updatedChatHistory,
        { role: "assistant", content: assistantContent },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setError("Failed to fetch AI response. Please try again.");
      setChatHistory([
        ...updatedChatHistory,
        {
          role: "assistant",
          content: "Failed to fetch AI response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  if (!isExpanded) {
    return (
      <div className="relative w-full">
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
    <div className="w-full space-y-2">
      <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start mb-4">
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0 flex items-center gap-2 text-gray-600"
              onClick={() => setIsExpanded(false)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Results
            </Button>
          </div>
          <div
            className="max-h-[400px] overflow-y-auto mb-4 space-y-4"
            ref={chatContainerRef}
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-[80%] text-sm",
                    message.role === "user"
                      ? "bg-purple-100 text-purple-900"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose max-w-none"
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-500 p-3">
                <div className="animate-pulse">AI is thinking...</div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 pt-4 border-t border-gray-100"
          >
            <Input
              type="text"
              placeholder="Ask a question about the results..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-full border-gray-200"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
