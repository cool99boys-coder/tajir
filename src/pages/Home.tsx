import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { HERO_IMAGE, SITE_NAME, SITE_TAGLINE } from "../config/site";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { MenuProductCard } from "../components/product/MenuProductCard";
import { useProducts } from "../hooks/useProducts";
import { QueryErrorState } from "../components/ui/QueryErrorState";
import { ProductCardSkeleton } from "../components/skeletons/ProductCardSkeleton";
export function Home() {
  const productsQuery = useProducts();
  useEffect(() => {
    document.title = `${SITE_NAME} — ${SITE_TAGLINE}`;
  }, []);
  const products = productsQuery.data ?? [];
  const isLoading = productsQuery.isLoading;
  const isError = productsQuery.isError;

  if (isError) {
    return (
      <div className="w-full bg-ink-950 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <QueryErrorState
            title="Unable to load the storefront"
            description="Product data could not be loaded from Supabase."
            onRetry={() => void productsQuery.refetch()}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-ink-950">
      <section className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.88)_0%,rgba(10,10,12,0.6)_38%,rgba(10,10,12,0.18)_68%,rgba(10,10,12,0.08)_100%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 lg:px-8">
          <div className="mr-auto flex max-w-2xl justify-start text-left">
            <div className="rounded-[2rem] border border-white/10 bg-ink-950/22 px-5 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-1.5 text-xs font-medium text-cream/80"
              >
                <SparklesIcon className="h-3.5 w-3.5" /> Curated goods · Fast
                replies · Ethiopia
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 font-display text-6xl font-semibold leading-none tracking-tight text-cream sm:text-7xl lg:text-8xl"
              >
                {SITE_NAME}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-cream/78"
              >
                Premium honey, chocolate, and wellness goods in a clean
                storefront with quick contact and simple ordering.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-9 flex flex-wrap justify-start gap-3"
              >
                <a href="#menu">
                  <Button size="lg">
                    View menu <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="secondary">
                    Contact us
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="scroll-mt-24 border-y border-white/[0.06] bg-ink-900/70 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-gold/70">
                  Order online
                </p>
                <h2 className="mt-2 font-display text-4xl font-semibold text-cream sm:text-5xl">
                  Choose from the menu
                </h2>
              </div>
              <Link
                to="/products"
                className="inline-flex w-fit items-center text-sm font-medium text-gold hover:text-gold-soft"
              >
                Full product details <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Reveal
                    key={`home-skeleton-${index}`}
                    delay={index * 0.05}
                    y={16}
                    className="min-w-0"
                  >
                    <ProductCardSkeleton />
                  </Reveal>
                ))
              : products.slice(0, 8).map((product, index) => (
                  <Reveal
                    key={product.id}
                    delay={index * 0.05}
                    y={16}
                    className="min-w-0"
                  >
                    <MenuProductCard product={product} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
