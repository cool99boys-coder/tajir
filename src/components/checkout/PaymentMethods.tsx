import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BuildingIcon,
  CheckIcon,
  CopyIcon,
  LandmarkIcon,
  SmartphoneIcon,
} from "lucide-react";
import { PAYMENT_METHODS } from "../../lib/data";
import { cn, formatBirr } from "../../lib/format";
import { PaymentMethodId } from "../../lib/types";
const ICONS: Record<
  PaymentMethodId,
  ComponentType<{
    className?: string;
  }>
> = {
  telebirr: SmartphoneIcon,
  cbe: LandmarkIcon,
  transfer: BuildingIcon,
};
interface PaymentMethodsProps {
  selected: PaymentMethodId | null;
  total: number;
  onSelect: (id: PaymentMethodId) => void;
}
export function PaymentMethods({
  selected,
  total,
  onSelect,
}: PaymentMethodsProps) {
  const [copiedMethod, setCopiedMethod] = useState<PaymentMethodId | null>(
    null,
  );
  const copyNumber = async (
    methodId: PaymentMethodId,
    accountNumber: string,
  ) => {
    try {
      await navigator.clipboard.writeText(accountNumber.replace(/\s/g, ""));
      setCopiedMethod(methodId);
      window.setTimeout(() => setCopiedMethod(null), 1800);
    } catch {
      setCopiedMethod(null);
    }
  };
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {PAYMENT_METHODS.map((method) => {
        const Icon = ICONS[method.id];
        const isActive = selected === method.id;
        const isCopied = copiedMethod === method.id;
        return (
          <section
            key={method.id}
            className={cn(
              "overflow-hidden rounded-3xl border transition-colors",
              isActive
                ? "border-gold/60 bg-gold/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20",
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(method.id)}
              aria-expanded={isActive}
              aria-controls={`${method.id}-payment-details`}
              className="relative flex w-full flex-col items-start gap-2 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold/60"
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl",
                  isActive ? "bg-gold text-ink-950" : "bg-white/5 text-gold",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-semibold text-cream">{method.label}</span>
              <span className="text-xs text-cream/50">
                {method.description}
              </span>
              {isActive && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-ink-950">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  id={`${method.id}-payment-details`}
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gold/20 px-4 pb-4 pt-3">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-gold/75">
                      Amount to pay
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-semibold text-gold">
                      {formatBirr(total)}
                    </p>

                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <p className="text-cream/45">Account name</p>
                        <p className="mt-0.5 font-medium text-cream">
                          {method.accountName}
                        </p>
                      </div>
                      <div>
                        <p className="text-cream/45">Account number</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <p className="font-display text-base font-semibold tracking-wide text-cream">
                            {method.accountNumber}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              copyNumber(method.id, method.accountNumber)
                            }
                            className="inline-flex items-center gap-1 rounded-full border border-gold/30 px-2 py-1 text-[11px] font-medium text-gold transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                            aria-label={`Copy ${method.label} account number`}
                          >
                            {isCopied ? (
                              <CheckIcon className="h-3 w-3" />
                            ) : (
                              <CopyIcon className="h-3 w-3" />
                            )}
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-cream/55">
                      Send exactly {formatBirr(total)}, then upload your payment
                      screenshot below.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}
