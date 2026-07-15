import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, LockIcon, ShieldCheckIcon } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { formatBirr } from "../lib/format";
import { SITE_NAME } from "../config/site";
import {
  DELIVERY_FEES,
  DELIVERY_OPTIONS,
  DeliveryLocation,
} from "../config/deliveryFees";
import { PaymentMethodId } from "../lib/types";
import { Button } from "../components/ui/Button";
import { TextField, TextArea, SelectField } from "../components/ui/Field";
import { PaymentMethods } from "../components/checkout/PaymentMethods";
import { ScreenshotUpload } from "../components/checkout/ScreenshotUpload";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useContact } from "../hooks/useContact";
import { QueryErrorState } from "../components/ui/QueryErrorState";
interface FormState {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
  deliveryLocation: DeliveryLocation;
}
interface Errors {
  fullName?: string;
  phone?: string;
  address?: string;
  payment?: string;
  screenshot?: string;
}
export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const contactQuery = useContact();
  const orderMutation = useCreateOrder();
  const orderSubmittedRef = useRef(false);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
    deliveryLocation: "addis_ababa",
  });
  const [payment, setPayment] = useState<PaymentMethodId | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const SUCCESS_SESSION_KEY = "tajirEmpire:last-order";
  useEffect(() => {
    document.title = `Checkout — ${SITE_NAME}`;
  }, []);
  useEffect(() => {
    if (items.length === 0 && !submitting && !orderSubmittedRef.current)
      navigate("/cart", {
        replace: true,
      });
  }, [items.length, navigate, submitting]);
  const deliveryFee =
    DELIVERY_FEES[
      form.deliveryLocation === "addis_ababa" ? "ADDIS_ABABA" : "OUTSIDE_ADDIS"
    ];
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);
  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    };
  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    else if (phoneDigits.length < 9) next.phone = "Enter a valid phone number.";
    if (!form.address.trim())
      next.address = "Please enter your delivery address.";
    if (!form.deliveryLocation)
      next.address = next.address || "Please choose a delivery location.";
    if (!payment) next.payment = "Please select a payment method.";
    if (!screenshot) next.screenshot = "Please upload your payment screenshot.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderCode = `TE-${Date.now().toString().slice(-6)}`;
    try {
      const order = await orderMutation.refetch({
        order: {
          order_code: orderCode,
          full_name: form.fullName,
          phone: form.phone,
          address: form.address,
          notes: form.notes || null,
          payment_method: payment,
          screenshot_url: null,
          subtotal,
          total,
        },
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          unit_price: item.product.price,
          quantity: item.quantity,
          line_total: item.product.price * item.quantity,
        })),
        screenshotFile: screenshot,
      });
      orderSubmittedRef.current = true;
      window.sessionStorage.setItem(
        SUCCESS_SESSION_KEY,
        JSON.stringify({
          orderId: order.order_code,
          name: form.fullName,
          total,
          phone: form.phone,
        }),
      );
      navigate("/success", {
        replace: true,
        state: {
          orderId: order.order_code,
          name: form.fullName,
          total,
          phone: form.phone,
        },
      });
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };
  if (contactQuery.isError) {
    return (
      <div className="w-full bg-ink-950 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <QueryErrorState
            title="Unable to load checkout support data"
            description="Please retry to fetch contact details from Supabase."
            onRetry={() => void contactQuery.refetch()}
          />
        </div>
      </div>
    );
  }
  if (items.length === 0) return null;
  return (
    <div className="w-full bg-ink-950 pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-cream/60 hover:text-gold"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to cart
        </Link>
        <h1 className="mt-4 font-display text-5xl font-semibold text-cream">
          Checkout
        </h1>
        <p className="mt-2 text-cream/60">
          Fill in your details, send payment, and upload your receipt to confirm
          the order. Delivery is arranged by phone call.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div className="space-y-8">
            {/* Delivery details */}
            <motion.section
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="glass rounded-4xl p-6"
            >
              <h2 className="font-display text-xl font-semibold text-cream">
                Delivery details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Full Name"
                  name="fullName"
                  required
                  placeholder="Abebe Kebede"
                  value={form.fullName}
                  onChange={update("fullName")}
                  error={errors.fullName}
                  autoComplete="name"
                />

                <TextField
                  label="Phone Number"
                  name="phone"
                  required
                  type="tel"
                  placeholder="+251 9XX XXX XXX"
                  value={form.phone}
                  onChange={update("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                />

                <div className="sm:col-span-2">
                  <TextField
                    label="Delivery Address"
                    name="address"
                    required
                    placeholder="Sub-city, woreda, street / building, landmark"
                    value={form.address}
                    onChange={update("address")}
                    error={errors.address}
                    autoComplete="street-address"
                  />
                </div>
                <div className="sm:col-span-2">
                  <SelectField
                    label="Delivery Location"
                    name="deliveryLocation"
                    required
                    value={form.deliveryLocation}
                    onChange={update("deliveryLocation") as never}
                  >
                    {DELIVERY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <div className="sm:col-span-2">
                  <TextArea
                    label="Additional Notes"
                    name="notes"
                    rows={3}
                    placeholder="Delivery instructions, preferred time, etc. (optional)"
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>
              </div>
            </motion.section>

            {/* Payment */}
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
                delay: 0.05,
              }}
              className="glass rounded-4xl p-6"
            >
              <h2 className="font-display text-xl font-semibold text-cream">
                Payment method
              </h2>
              <p className="mt-1 text-sm text-cream/55">
                Choose how you'd like to pay. Payment is confirmed manually via
                screenshot.
              </p>
              <div className="mt-5">
                <PaymentMethods
                  selected={payment}
                  total={total}
                  onSelect={(id) => {
                    setPayment(id);
                    setErrors((prev) => ({
                      ...prev,
                      payment: undefined,
                    }));
                  }}
                />

                {errors.payment && (
                  <p className="mt-2 text-sm text-red-400" role="alert">
                    {errors.payment}
                  </p>
                )}
              </div>
            </motion.section>

            {/* Upload */}
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
                delay: 0.1,
              }}
              className="glass rounded-4xl p-6"
            >
              <h2 className="font-display text-xl font-semibold text-cream">
                Payment screenshot
              </h2>
              <p className="mt-1 text-sm text-cream/55">
                Upload a clear screenshot of your completed transfer.
              </p>
              <div className="mt-5">
                <ScreenshotUpload
                  file={screenshot}
                  onChange={(f) => {
                    setScreenshot(f);
                    setErrors((prev) => ({
                      ...prev,
                      screenshot: undefined,
                    }));
                  }}
                  error={errors.screenshot}
                />
              </div>
            </motion.section>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass rounded-4xl p-6">
              <h2 className="font-display text-xl font-semibold text-cream">
                Order summary
              </h2>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-cream">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-cream/45">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-cream/80">
                      {formatBirr(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-cream/70">
                  <dt>Subtotal</dt>
                  <dd>{formatBirr(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-cream/70">
                  <dt>Delivery</dt>
                  <dd>{formatBirr(deliveryFee)}</dd>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-cream">
                  <dt>Total</dt>
                  <dd className="font-display text-xl text-gold">
                    {formatBirr(total)}
                  </dd>
                </div>
              </dl>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                isLoading={submitting || orderMutation.isLoading}
                loadingText="Placing order…"
              >
                <LockIcon className="h-4 w-4" /> Place order
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-cream/45">
                <ShieldCheckIcon className="h-3.5 w-3.5 text-gold/70" /> Your
                details are safe with us
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
