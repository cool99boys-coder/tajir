import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuProductCard } from "../components/product/MenuProductCard";
import { cn } from "../lib/format";
import { TextField } from "../components/ui/Field";
import { useProducts } from "../hooks/useProducts";
import { QueryErrorState } from "../components/ui/QueryErrorState";
import { ProductCardSkeleton } from "../components/skeletons/ProductCardSkeleton";
import { SITE_NAME } from "../config/site";
const CATEGORIES = [
  { id: "all", label: "All products" },
  { id: "honey", label: "Honey" },
  { id: "supplements", label: "Supplements" },
  { id: "chocolate", label: "Chocolate" },
  { id: "packaged", label: "Packaged" },
] as const;
export function Products() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("all");
  const [search, setSearch] = useState("");
  const productsQuery = useProducts();
  useEffect(() => {
    document.title = `Shop — ${SITE_NAME}`;
  }, []);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = productsQuery.data ?? [];
    const activeCategory = active.toLowerCase();
    const searched = term
      ? base.filter((product) => {
          const name = product.name.toLowerCase();
          const description = product.description.toLowerCase();
          return name.includes(term) || description.includes(term);
        })
      : base;

    return activeCategory === "all"
      ? searched
      : base
          .filter(
            (product) =>
              product.category?.trim().toLowerCase() === activeCategory,
          )
          .filter((product) => {
            if (!term) return true;
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
            return name.includes(term) || description.includes(term);
          });
  }, [active, productsQuery.data, search]);
  const isLoading = productsQuery.isLoading;
  const isError = productsQuery.isError;
  const noResultsMessage = search.trim()
    ? `We couldn't find any products matching "${search.trim()}".`
    : `No ${
        active === "all"
          ? "products"
          : active === "supplements"
            ? "creatine products"
            : active === "honey"
              ? "honey products"
              : active === "chocolate"
                ? "chocolate products"
                : "packaged products"
      } are available right now.`;

  if (isError) {
    return (
      <div className="w-full bg-ink-950 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <QueryErrorState
            title="Unable to load products"
            description="Please retry to fetch the latest catalog from Supabase."
            onRetry={() => void productsQuery.refetch()}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-ink-950 pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-sm font-medium uppercase tracking-wider text-gold/70"
          >
            Our menu
          </motion.p>
          <motion.h1
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.05,
            }}
            className="mt-2 font-display text-5xl font-semibold text-cream sm:text-6xl"
          >
            The collection
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="mt-4 text-lg text-cream/60"
          >
            Browse our full range of premium honey, supplements, and treats —
            add to cart and check out in minutes.
          </motion.p>
        </div>

        <div className="mt-8 max-w-xl">
          <TextField
            label="Search products"
            name="search-products"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div
          className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
          role="tablist"
          aria-label="Product categories"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              role="tab"
              aria-selected={active === category.id}
              aria-pressed={active === category.id}
              className={cn(
                "group relative flex min-h-11 items-center justify-center rounded-full border px-3 py-2 text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
                active === category.id
                  ? "border-gold/70 bg-gold text-ink-950 shadow-[0_10px_24px_-14px_rgba(212,175,55,0.8)]"
                  : "border-white/10 bg-white/[0.03] text-cream/75 hover:border-white/20 hover:bg-white/[0.05] hover:text-cream",
              )}
            >
              {active === category.id && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 -z-10 rounded-2xl bg-gold"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`product-skeleton-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCardSkeleton />
                </motion.div>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MenuProductCard product={p} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="products-empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2"
              >
                <div className="glass rounded-4xl border border-white/10 px-6 py-14 text-center">
                  <p className="font-display text-2xl font-semibold text-cream">
                    No products found
                  </p>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/60">
                    {noResultsMessage}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {search.trim() && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold-soft"
                      >
                        Clear search
                      </button>
                    )}
                    {active !== "all" && (
                      <button
                        type="button"
                        onClick={() => setActive("all")}
                        className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/30 hover:text-gold"
                      >
                        Show all products
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
