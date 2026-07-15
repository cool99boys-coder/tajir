import { Skeleton } from "../ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="glass grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-2xl p-2.5 shadow-card sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-3 sm:p-3">
      <Skeleton className="h-14 w-14 rounded-xl sm:h-[4.5rem] sm:w-[4.5rem]" />

      <div className="min-w-0">
        <Skeleton className="h-5 w-32 rounded-full sm:h-6 sm:w-40" />
        <Skeleton className="mt-2 h-4 w-20 rounded-full sm:mt-2.5 sm:h-5 sm:w-24" />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Skeleton className="h-9 w-[4.5rem] rounded-full sm:h-10 sm:w-[5rem]" />
        <Skeleton className="h-9 w-9 rounded-full sm:h-10 sm:w-10" />
      </div>
    </div>
  );
}
