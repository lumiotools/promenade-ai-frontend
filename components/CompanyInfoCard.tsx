import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CompanyData } from "@/lib/dummyApi";

interface CompanyInfoCardProps {
  title: string;
  sources: CompanyData["sources_CompanyInfoCard"][keyof CompanyData["sources_CompanyInfoCard"]][];
  children: React.ReactNode;
}

export function CompanyInfoCard({
  title,
  sources,
  children,
}: CompanyInfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
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
      <CardContent>{children}</CardContent>
    </Card>
  );
}
