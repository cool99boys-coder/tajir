import { useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloudIcon,
  XIcon,
  ImageIcon,
  AlertCircleIcon,
} from "lucide-react";
import { cn } from "../../lib/format";
interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}
const MAX_MB = 5;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
export function ScreenshotUpload({ file, onChange, error }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = useCallback(
    (f: File | undefined) => {
      setLocalError(null);
      if (!f) return;
      if (!ACCEPTED.includes(f.type)) {
        setLocalError("Please upload a PNG, JPG, or WEBP image.");
        return;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setLocalError(`Image must be under ${MAX_MB}MB.`);
        return;
      }
      const url = URL.createObjectURL(f);
      setPreview(url);
      onChange(f);
    },
    [onChange],
  );
  const clear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const shownError = localError || error;
  return (
    <div>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
            }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800"
          >
            <img
              src={preview}
              alt="Payment screenshot preview"
              className="max-h-80 w-full object-contain"
            />

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-ink-900/80 px-4 py-3">
              <span className="flex items-center gap-2 truncate text-sm text-cream/70">
                <ImageIcon className="h-4 w-4 shrink-0 text-gold" />
                <span className="truncate">{file?.name}</span>
              </span>
              <button
                type="button"
                onClick={clear}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
              >
                <XIcon className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.label
            key="dropzone"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            htmlFor="screenshot-input"
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors",
              dragging
                ? "border-gold bg-gold/10"
                : "border-white/15 bg-white/[0.02] hover:border-gold/40 hover:bg-white/[0.04]",
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/25">
              <UploadCloudIcon className="h-6 w-6 text-gold" />
            </span>
            <div>
              <p className="font-medium text-cream">
                Drag &amp; drop your payment screenshot
              </p>
              <p className="mt-1 text-sm text-cream/50">
                or <span className="text-gold">browse files</span> · PNG, JPG,
                WEBP up to {MAX_MB}MB
              </p>
            </div>
          </motion.label>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        id="screenshot-input"
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {shownError && (
        <p
          className="mt-2 flex items-center gap-1.5 text-sm text-red-400"
          role="alert"
        >
          <AlertCircleIcon className="h-4 w-4" /> {shownError}
        </p>
      )}
    </div>
  );
}
