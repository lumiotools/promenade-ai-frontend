import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

interface StrategyCardProps {
  sources: Array<{
    id: string;
    source: StaticImageData;
  }>;
}

export function StrategyCard({ sources }: StrategyCardProps) {
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
                alt={source.id}
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
                  Significant investments in e-commerce and digital platforms,
                  resulting in robust online sales growth.
                </span>
              </li>
              <li>
                <span className="font-semibold">Sustainability Efforts:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Increased investment in sustainable practices and eco-friendly
                  product lines.
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  Luxury and Professional Segments:
                </span>{" "}
                <span className="text-sm text-muted-foreground">
                  Luxury and Professional Segments: Strong performance in luxury
                  cosmetics and professional haircare sectors, driving overall
                  revenue growth.
                </span>
              </li>
              <li>
                <span className="font-semibold">Innovation:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Continuous focus on research and development, introducing new,
                  innovative beauty products to the market.
                </span>
              </li>
              <li>
                <span className="font-semibold">Financial Performance:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Achieved solid financial results in 2022, reflecting
                  successful strategic initiatives.
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
                  Achieved solid financial results in 2022, reflecting
                  successful strategic initiatives.
                </span>
              </li>
              <li>
                <span className="font-semibold">Emerging Markets:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Strengthen presence and expand operations in emerging
                  economies.
                </span>
              </li>
              <li>
                <span className="font-semibold">Sustainability:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Maintain commitment to sustainability through eco-friendly
                  products and practices.
                </span>
              </li>
              <li>
                <span className="font-semibold">Innovation:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Continue investment in R&D for cutting-edge beauty
                  technologies.
                </span>
              </li>
              <li>
                <span className="font-semibold">Consumer Engagement:</span>{" "}
                <span className="text-sm text-muted-foreground">
                  Enhance direct-to-consumer channels to improve customer
                  experience and personalization.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
