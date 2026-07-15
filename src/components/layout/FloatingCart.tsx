import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBagIcon } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatBirr } from "../../lib/format";
export function FloatingCart() {
  const { itemCount, subtotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const hidden =
    location.pathname === "/cart" || location.pathname === "/checkout";
  return (
    <AnimatePresence>
      {itemCount > 0 && !hidden && (
        <motion.button
          type="button"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 40,
            scale: 0.9,
          }}
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 26,
          }}
          onClick={() => navigate("/cart")}
          className="glow-gold fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-gold px-5 py-3.5 text-ink-950 shadow-soft sm:bottom-8 sm:right-8"
          aria-label={`View cart, ${itemCount} items, ${formatBirr(subtotal)}`}
        >
          <span className="relative">
            <ShoppingBagIcon className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink-950 px-1 text-[11px] font-bold text-gold">
              {itemCount}
            </span>
          </span>
          <span className="text-sm font-bold">{formatBirr(subtotal)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
