import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "./Button";

interface QueryErrorStateProps {
  title?: string;
  description?: string;
  onRetry: () => void;
}

export function QueryErrorState({
  title = "Something went wrong",
  description = "We couldn't load this section right now.",
  onRetry,
}: QueryErrorStateProps) {
  return (
    <div className="glass rounded-4xl border border-red-400/20 bg-red-500/5 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-300 ring-1 ring-red-400/20">
        <AlertTriangleIcon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold text-cream">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/60">
        {description}
      </p>
      <Button size="lg" variant="outline" className="mt-5" onClick={onRetry}>
        <RefreshCwIcon className="h-4 w-4" /> Retry
      </Button>
    </div>
  );
}
