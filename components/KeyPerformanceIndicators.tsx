import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Source {
  id: string;
  name: string;
  source: any;
}

interface KeyPerformanceIndicatorsProps {
  sources: Source[];
}

export function KeyPerformanceIndicators({
  sources,
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
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Product A - description
            </span>
            <span className="font-medium">$ 40.86 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Profit Margin</span>
            <span className="font-medium">$ 40.86 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Enterprise Value
            </span>
            <span className="font-medium">$ 54.09 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Return on Assets (ttm)
            </span>
            <span className="font-medium">$ 54.09 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Trailing P/E</span>
            <span className="font-medium">13.6 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Return on Equity (ttm)
            </span>
            <span className="font-medium">13.6 Mn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Forward P/E</span>
            <span className="font-medium">1.6%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Revenue (ttm)</span>
            <span className="font-medium">1.02 %</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              PEG Ratio (5yr expected)
            </span>
            <span className="font-medium">1.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Net Income Avi to Common (ttm)
            </span>
            <span className="font-medium">1.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Price/Sales (ttm)
            </span>
            <span className="font-medium">6.8%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Price/Sales (ttm)
            </span>
            <span className="font-medium">1.73%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Price/Book (mrq)
            </span>
            <span className="font-medium">1.02 %</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Price/Book (mrq)
            </span>
            <span className="font-medium">2.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Enterprise Value/Revenue
            </span>
            <span className="font-medium">1.73%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Enterprise Value/Revenue
            </span>
            <span className="font-medium">1.6%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Enterprise Value/EBITDA
            </span>
            <span className="font-medium">2.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Enterprise Value/EBITDA
            </span>
            <span className="font-medium">6.8%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
