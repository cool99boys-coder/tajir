import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2Icon,
  ArrowRightIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { formatBirr } from "../lib/format";
import { Button } from "../components/ui/Button";
import { QuantitySelector } from "../components/ui/QuantitySelector";
import { SITE_NAME } from "../config/site";
export function Cart() {
  const { items, setQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `Cart — ${SITE_NAME}`;
  }, []);
  const total = subtotal;
  return (
    <div className="w-full bg-ink-950 pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-5xl font-semibold text-cream">
            Your cart
          </h1>
          <Link
            to="/products"
            className="hidden items-center gap-1.5 text-sm text-cream/60 hover:text-gold sm:flex"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="glass mt-12 flex flex-col items-center gap-5 rounded-4xl px-6 py-20 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/25">
              <ShoppingBagIcon className="h-7 w-7 text-gold" />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold text-cream">
                Your cart is empty
              </p>
              <p className="mt-2 text-cream/55">
                Discover our premium collection and add a treat.
              </p>
            </div>
            <Link to="/products">
              <Button size="lg">
                Browse products <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.product.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    className="glass flex gap-4 rounded-3xl p-4"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                    />

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-display text-lg font-semibold text-cream">
                            {item.product.name}
                          </h2>
                          <p className="text-xs text-cream/45">
                            {item.product.unit}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-cream/50 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(q) => setQuantity(item.product.id, q)}
                          size="sm"
                          min={1}
                        />

                        <p className="font-display text-lg font-semibold text-gold">
                          {formatBirr(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass rounded-4xl p-6">
                <h2 className="font-display text-xl font-semibold text-cream">
                  Order summary
                </h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-cream/70">
                    <dt>Subtotal</dt>
                    <dd>{formatBirr(subtotal)}</dd>
                  </div>
                  <div className="my-3 h-px bg-white/10" />
                  <div className="flex justify-between text-base font-semibold text-cream">
                    <dt>Total</dt>
                    <dd className="font-display text-xl text-gold">
                      {formatBirr(total)}
                    </dd>
                  </div>
                </dl>
                <Button
                  size="lg"
                  className="mt-6 w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Continue to checkout <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-xs text-cream/45">
                  Secure ordering · Manual payment confirmation · Delivery by
                  phone call
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
