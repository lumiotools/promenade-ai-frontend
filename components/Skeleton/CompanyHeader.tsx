import { Skeleton } from "@/components/ui/skeleton";

export function CompanyHeaderSkeleton() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="bg-white rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="flex-1 space-y-4 w-full">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

