import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { StaticImageData } from 'next/image';

interface ImageSource {
  id: string;
  source: StaticImageData;
}

interface InfoCardProps {
  title: string;
  sources: ImageSource[];
  children: React.ReactNode;
}

export function CompanyInfoCard({ title, sources, children }: InfoCardProps) {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">Sources:</span>
          <div className="flex gap-1">
            {sources.map((source) => (
              <Image
                src={source.source}
                key={source.id}
                className="h-5 w-5 rounded-full"
                alt=""
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
