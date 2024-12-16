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
    <Card className="bg-white mx-6 mt-5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Key Performance Indicators
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sources:</span>
            <div className="flex items-center gap-2">
              {sources.map((source) => (
                <div key={source.id} className="flex items-center gap-1">
                  <Image
                    src={source.source}
                    alt={source.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(kpi).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-sm text-muted-foreground">{key}</span>
              <span className="font-medium text-sm">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
