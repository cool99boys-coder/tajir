import { Loader2 } from "lucide-react";

interface ButtonLoaderProps {
  className?: string;
}

export function ButtonLoader({ className = "" }: ButtonLoaderProps) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`.trim()} />;
}
