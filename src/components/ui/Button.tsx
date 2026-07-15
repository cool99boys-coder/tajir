import { motion, HTMLMotionProps } from "framer-motion";
import { ButtonLoader } from "../loaders/ButtonLoader";
import { cn } from "../../lib/format";
type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  loadingText?: string;
}
const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink-950 font-semibold hover:bg-gold-soft shadow-[0_10px_30px_-8px_rgba(212,175,55,0.5)]",
  secondary: "glass text-cream hover:bg-white/10",
  ghost: "text-cream/80 hover:text-cream hover:bg-white/5",
  outline: "border border-gold/40 text-gold hover:bg-gold/10",
};
const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-full",
  md: "text-sm px-5 py-2.5 rounded-full",
  lg: "text-base px-7 py-3.5 rounded-full",
};
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  loadingText,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <ButtonLoader /> {loadingText || children}
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
