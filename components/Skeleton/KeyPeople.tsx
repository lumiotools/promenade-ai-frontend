import { Skeleton } from "@/components/ui/skeleton";

export function KeyPeopleSkeleton() {
  return (
    <div className="mx-6 mt-5 mb-20">
      <Skeleton className="h-6 w-1/4 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-1/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

