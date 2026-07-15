import { MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "../../lib/format";
interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "sm" | "md";
  className?: string;
}
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  size = "md",
  className,
}: Props) {
  const btn =
    "flex items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-30 disabled:pointer-events-none";
  const dims = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={cn(btn, dims)}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span
        className={cn(
          "min-w-[1.75rem] text-center font-semibold text-cream",
          size === "sm" ? "text-sm" : "text-base",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={cn(btn, dims)}
        onClick={() => onChange(value + 1)}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
