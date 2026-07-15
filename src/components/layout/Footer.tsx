import { Link } from "react-router-dom";
import {
  HexagonIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
} from "lucide-react";
import { useContact } from "../../hooks/useContact";
import { SITE_NAME } from "../../config/site";
export function Footer() {
  const contactQuery = useContact();
  const contact = contactQuery.data;
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
              <HexagonIcon className="h-5 w-5 text-gold" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-semibold text-cream">
              {SITE_NAME}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/55">
            Premium Yemeni honey, pure supplements, and artisanal treats —
            sourced with care and delivered across Ethiopia.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold/80">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/60">
            <li>
              <Link className="hover:text-gold" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold" to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold" to="/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="hover:text-gold" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold/80">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/60">
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 text-gold/70" />
              {contact?.phone || "Loading..."}
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 text-gold/70" />
              orders@tajirempire.et
            </li>
            <li className="flex items-center gap-2.5">
              <SendIcon className="h-4 w-4 text-gold/70" />@
              {contact?.telegram_username || "tajiempire"}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
              {contact?.address || "Loading..."}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-cream/40 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {SITE_NAME}. Crafted with care in Addis
          Ababa.
        </div>
      </div>
    </footer>
  );
}
