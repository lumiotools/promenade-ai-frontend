import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CompanyData } from "@/lib/dummyApi";

interface StrategyCardProps {
  sources: CompanyData["sources_StrategyCard"][keyof CompanyData["sources_StrategyCard"]][];
  strategy: CompanyData["strategy"];
}

export function StrategyCard({ sources, strategy }: StrategyCardProps) {
  return (
    <Card className="bg-white mx-6 mt-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-base font-semibold">Strategy</CardTitle>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">Sources:</span>
          <div className="flex gap-1">
            {sources.map((source) => (
              <Image
                key={source.id}
                src={source.source}
                alt={source.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">
              Recent Strategy and Outcomes Digital Focus
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Digital Focus:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.recentStrategy.digitalFocus}
                </span>
              </li>
              <li>
                <span className="font-semibold">Sustainability Efforts:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.recentStrategy.sustainabilityEfforts}
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  Luxury and Professional Segments:
                </span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.recentStrategy.luxuryAndProfessionalSegments}
                </span>
              </li>
              <li>
                <span className="font-semibold">Innovation:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.recentStrategy.innovation}
                </span>
              </li>
              <li>
                <span className="font-semibold">Financial Performance:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.recentStrategy.financialPerformance}
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold">
              Strategic Focus Going Forward
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Digital Transformation:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.strategicFocus.digitalTransformation}
                </span>
              </li>
              <li>
                <span className="font-semibold">Emerging Markets:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.strategicFocus.emergingMarkets}
                </span>
              </li>
              <li>
                <span className="font-semibold">Sustainability:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.strategicFocus.sustainability}
                </span>
              </li>
              <li>
                <span className="font-semibold">Innovation:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.strategicFocus.innovation}
                </span>
              </li>
              <li>
                <span className="font-semibold">Consumer Engagement:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {strategy.strategicFocus.consumerEngagement}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
