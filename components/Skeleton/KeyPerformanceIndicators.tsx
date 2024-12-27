import { Skeleton } from "@/components/ui/skeleton";

export function KeyPerformanceIndicatorsSkeleton() {
  return (
    <div className="bg-white mx-4 md:mx-6 mt-5 p-4 rounded-lg">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
