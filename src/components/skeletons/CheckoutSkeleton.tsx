import { Skeleton } from "../ui/Skeleton";

export function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="mt-4 h-14 w-64 rounded-2xl" />
      <Skeleton className="mt-3 h-6 w-full max-w-2xl rounded-full" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <Skeleton className="h-64 rounded-4xl" />
          <Skeleton className="h-48 rounded-4xl" />
          <Skeleton className="h-48 rounded-4xl" />
        </div>
        <Skeleton className="h-[32rem] rounded-4xl" />
      </div>
    </div>
  );
}
