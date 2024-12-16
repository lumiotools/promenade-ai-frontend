import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CompanyData } from "@/lib/dummyApi";

interface KeyPerformanceIndicatorsProps {
  sources: CompanyData["sources_KeyPerformanceIndicators"][keyof CompanyData["sources_KeyPerformanceIndicators"]][];
  kpi: CompanyData["kpi"];
}

export function KeyPerformanceIndicators({
  sources,
  kpi,
}: KeyPerformanceIndicatorsProps) {
  return (
    <Card className="bg-white mx-4 md:mx-6 mt-5">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-base font-semibold">
            Key Performance Indicators
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Sources:</span>
            <div className="flex flex-wrap items-center gap-2">
              {sources.map((source) => (
                <div key={source.id} className="flex items-center gap-1">
                  <Image
                    src={source.source}
                    alt={source.name}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  <span className="text-xs sm:text-sm">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-4">
          {Object.entries(kpi).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center border-b pb-2 sm:pb-0 sm:border-b-0">
              <span className="text-xs sm:text-sm text-muted-foreground">{key}</span>
              <span className="font-medium text-xs sm:text-sm">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

