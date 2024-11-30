"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const apiResponse = {
  symbol: "AACG",
  company_name: "Ata Creativity Global ADR",
  ir_website: "https://ir.atai.net.cn/",
  structured_data: [
    {
      section_name: "Latest News",
      links: [
        {
          title: "ATA Creativity Global Reports Q3 2024 Financial Results",
          url: "https://ir.atai.net.cn/news-events/press-releases/detail/1323/ata-creativity-global-reports-q3-2024-financial-results",
          content:
            "Press Releases\n\n# ATA Creativity Global Reports Q3 2024 Financial Results",
        },
      ],
    },
    {
      section_name: "Financial Results",
      links: [
        {
          title: "Earnings Release Q3 2024 PDF",
          url: "https://d1io3yog0oux5.cloudfront.net/_f44b3be72139116695f5b873160e6404/ata/news/2024-11-07_ATA_Creativity_Global_Reports_Q3_2024_Financial_1323.pdf",
          content:
            "November 7, 2024\nATA Creativity Global Reports Q3 2024 Financial Results",
        },
      ],
    },
    {
      section_name: "Annual Filing",
      links: [
        {
          title: "View 20-F",
          url: "https://ir.atai.net.cn/sec-filings/content/0001104659-24-045459/aacg-20231231x20f.htm",
          content: "Form 20-F",
        },
      ],
    },
  ],
};

export default function CompanyDataDisplay() {
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
      <h1 className="text-2xl font-bold mb-4">Promenade ai</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter any search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "send"}
        </Button>
      </form>

      {showData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {apiResponse.company_name} ({apiResponse.symbol})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={apiResponse.ir_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                Investor Relations Website{" "}
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          {apiResponse.structured_data.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.section_name}</CardTitle>
              </CardHeader>
              <CardContent>
                {section.links.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4 last:mb-0">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.content.substring(0, 100)}...
                    </p>
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        View Details <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
