import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { AlertCircleIcon } from "lucide-react";
import { cn } from "../../lib/format";
interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
}
const baseInput =
  "w-full rounded-2xl border bg-white/[0.03] px-4 py-3 text-cream placeholder:text-cream/35 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50";
export function TextField({
  label,
  name,
  error,
  required,
  hint,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-cream/80"
      >
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          baseInput,
          error ? "border-red-400/60" : "border-white/10",
        )}
        {...props}
      />

      {hint && !error && <p className="mt-1 text-xs text-cream/45">{hint}</p>}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 flex items-center gap-1 text-sm text-red-400"
          role="alert"
        >
          <AlertCircleIcon className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
export function TextArea({
  label,
  name,
  error,
  required,
  hint,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-cream/80"
      >
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          baseInput,
          "resize-none",
          error ? "border-red-400/60" : "border-white/10",
        )}
        {...props}
      />

      {hint && !error && <p className="mt-1 text-xs text-cream/45">{hint}</p>}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 flex items-center gap-1 text-sm text-red-400"
          role="alert"
        >
          <AlertCircleIcon className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  required,
  hint,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-cream/80"
      >
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <select
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          baseInput,
          error ? "border-red-400/60" : "border-white/10",
        )}
        {...props}
      >
        {children}
      </select>

      {hint && !error && <p className="mt-1 text-xs text-cream/45">{hint}</p>}
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 flex items-center gap-1 text-sm text-red-400"
          role="alert"
        >
          <AlertCircleIcon className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
