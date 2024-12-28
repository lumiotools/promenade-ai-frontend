import { Skeleton } from "@/components/ui/skeleton";

export function InfoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-60 w-full" />
      ))}
    </div>
  );
}

