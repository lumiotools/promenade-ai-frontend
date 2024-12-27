import { Skeleton } from "@/components/ui/skeleton";

export function StrategyCardSkeleton() {
  return (
    <div className="bg-white mx-6 mt-5 p-6 rounded-lg">
      <Skeleton className="h-6 w-1/4 mb-4" />
      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-5 w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-5 w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

