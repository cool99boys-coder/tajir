import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon, ShoppingBagIcon } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { cn } from "../../lib/format";
import { useContact } from "../../hooks/useContact";
import { SITE_NAME } from "../../config/site";
const LINKS = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/products",
    label: "Products",
  },
  {
    to: "/contact",
    label: "Contact",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const contactQuery = useContact();
  const contact = contactQuery.data;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          scrolled
            ? "glass rounded-full py-2.5 shadow-soft mx-4 sm:mx-6 lg:mx-auto"
            : "",
        )}
        aria-label="Primary"
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label={`${SITE_NAME} home`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-sm font-bold tracking-wide text-gold ring-1 ring-gold/30">
            TE
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-cream">
            {contact?.phone ? SITE_NAME : SITE_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-gold" : "text-cream/70 hover:text-cream",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-gold/10 ring-1 ring-gold/25"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  exit={{
                    scale: 0,
                  }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink-950"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            className="glass mx-4 mt-2 rounded-3xl p-3 shadow-soft md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-2xl px-4 py-3 text-base font-medium",
                        isActive
                          ? "bg-gold/10 text-gold"
                          : "text-cream/80 hover:bg-white/5",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
