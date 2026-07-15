import { Skeleton } from "../ui/Skeleton";

export function ContactSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="mt-3 h-14 w-3/4 rounded-2xl" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl rounded-full" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-24 rounded-3xl" />
        <Skeleton className="h-24 rounded-3xl" />
      </div>
      <Skeleton className="mt-6 h-14 rounded-3xl" />
    </div>
  );
}
