import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatBirr } from "../../lib/format";
import { Product } from "../../lib/types";
import { QuantitySelector } from "../ui/QuantitySelector";
interface MenuProductCardProps {
  product: Product;
}
export function MenuProductCard({ product }: MenuProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setQuantity(1);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return (
    <motion.article
      layout
      whileHover={{
        y: -2,
      }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 26,
      }}
      className="glass grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-2xl p-2.5 shadow-card sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-3 sm:p-3"
    >
      <div className="h-14 w-14 overflow-hidden rounded-xl bg-ink-800 sm:h-[4.5rem] sm:w-[4.5rem]">
        <motion.img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.35,
          }}
        />
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-display text-base font-semibold text-cream sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-0.5 font-display text-sm font-semibold text-gold sm:text-base">
          {formatBirr(product.price)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <QuantitySelector value={quantity} onChange={setQuantity} size="sm" />
        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{
            scale: 0.92,
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink-950 transition-colors hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 sm:h-10 sm:w-10"
          aria-label={`Add ${product.name} to cart`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                }}
              >
                <CheckIcon className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                }}
              >
                <PlusIcon className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  );
}
