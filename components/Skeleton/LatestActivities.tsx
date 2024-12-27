import { Skeleton } from "@/components/ui/skeleton";

export function LatestActivitiesSkeleton() {
  return (
    <div className="bg-white mt-5 mx-4 md:mx-6 p-4 rounded-lg">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-3 w-3 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

