import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Product } from "../../lib/types";
import { useCart } from "../../hooks/useCart";
import { formatBirr } from "../../lib/format";
import { QuantitySelector } from "../ui/QuantitySelector";
export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setQty(1);
    window.setTimeout(() => setAdded(false), 1600);
  };
  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className="group relative flex flex-col overflow-hidden rounded-4xl border border-white/8 bg-ink-800/60 shadow-card"
    >
      <div className="relative aspect-square overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink-800/90 via-transparent to-transparent" />
        <motion.img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-gold/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950 backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gold/70">
          {product.tagline}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold text-cream">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/55">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-cream">
              {formatBirr(product.price)}
            </p>
            <p className="text-xs text-cream/45">per {product.unit}</p>
          </div>
          <QuantitySelector value={qty} onChange={setQty} size="sm" />
        </div>

        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{
            scale: 0.97,
          }}
          className="relative mt-4 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-800"
          aria-label={`Add ${product.name} to cart`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                className="flex items-center gap-2"
              >
                <CheckIcon className="h-4 w-4" /> Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" /> Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.article>
  );
}
