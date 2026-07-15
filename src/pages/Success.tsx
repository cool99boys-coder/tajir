import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckIcon,
  HomeIcon,
  MessageCircleIcon,
  PhoneCallIcon,
} from "lucide-react";
import { formatBirr } from "../lib/format";
import { Button } from "../components/ui/Button";
import { useContact } from "../hooks/useContact";
import { SITE_NAME } from "../config/site";
const SUCCESS_SESSION_KEY = "tajirEmpire:last-order";
interface OrderState {
  orderId?: string;
  name?: string;
  total?: number;
}
export function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const contactQuery = useContact();
  const state = useMemo(() => {
    const locationState = (location.state as OrderState) || {};
    if (locationState.orderId) return locationState;

    try {
      const raw = window.sessionStorage.getItem(SUCCESS_SESSION_KEY);
      if (!raw) return {};
      return JSON.parse(raw) as OrderState;
    } catch {
      return {};
    }
  }, [location.state]);
  const orderId = state.orderId || "GH-000000";
  useEffect(() => {
    document.title = `Order received — ${SITE_NAME}`;
  }, []);
  useEffect(() => {
    if (!state.orderId) {
      navigate("/cart", { replace: true });
    }
  }, [navigate, state.orderId]);
  const contact = contactQuery.data;
  const whatsappUrl = contact?.phone
    ? `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${SITE_NAME}, I submitted payment for order ${orderId}.`)}`
    : "#";
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-ink-950 px-4 pb-16 pt-32 sm:pt-40">
      <div className="w-full max-w-xl text-center">
        <motion.div
          initial={{
            scale: 0,
            rotate: -20,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 16,
          }}
          className="relative mx-auto flex h-24 w-24 items-center justify-center"
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-emerald-glow/20"
            animate={{
              scale: [1, 1.55, 1.55],
              opacity: [0.65, 0, 0],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />

          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-glow text-ink-950 shadow-[0_0_40px_-8px_rgba(52,211,153,0.55)]">
            <CheckIcon className="h-11 w-11" strokeWidth={3} />
          </span>
        </motion.div>

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
            delay: 0.18,
          }}
          className="mt-8 font-display text-4xl font-semibold text-cream sm:text-5xl"
        >
          Payment submitted successfully
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
            delay: 0.28,
          }}
          className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-cream/60"
        >
          Thank you{state.name ? `, ${state.name.split(" ")[0]}` : ""}. Your
          order has been received and your payment screenshot is waiting for
          confirmation.
        </motion.p>

        <motion.section
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.38,
          }}
          className="glass mt-8 rounded-4xl p-6 text-left"
          aria-label="Order confirmation details"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm text-cream/55">Order number</span>
            <span className="font-display text-lg font-semibold text-gold">
              {orderId}
            </span>
          </div>
          {typeof state.total === "number" && (
            <div className="flex items-center justify-between border-b border-white/10 py-4">
              <span className="text-sm text-cream/55">Payment submitted</span>
              <span className="font-display text-lg font-semibold text-cream">
                {formatBirr(state.total)}
              </span>
            </div>
          )}
          <div className="pt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gold/70">
              Need help with your order?
            </p>
            <a
              href={contact ? `tel:${contact.phone.replace(/\s/g, "")}` : "#"}
              className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-cream transition-colors hover:text-gold"
            >
              <PhoneCallIcon className="h-5 w-5 text-gold" />{" "}
              {contact?.phone || "Loading..."}
            </a>
            <p className="mt-2 text-sm text-cream/55">
              Call us directly and quote your order number.
            </p>
          </div>
        </motion.section>

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.48,
          }}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            className="sm:flex-1 w-full bg-emerald-glow text-ink-950 hover:bg-emerald-glow/90 shadow-[0_10px_30px_-8px_rgba(52,211,153,0.5)]"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircleIcon className="h-5 w-5" /> Contact us on WhatsApp
            </a>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="sm:flex-1"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="h-4 w-4" /> Back to home
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
