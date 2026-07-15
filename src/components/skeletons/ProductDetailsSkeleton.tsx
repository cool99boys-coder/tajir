import { Skeleton } from "../ui/Skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Skeleton className="aspect-square w-full rounded-[2rem]" />
        <div className="space-y-5">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-14 w-4/5 rounded-2xl" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
          <Skeleton className="h-24 w-full rounded-3xl" />
          <Skeleton className="h-12 w-44 rounded-full" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-3xl" />
            <Skeleton className="h-24 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
