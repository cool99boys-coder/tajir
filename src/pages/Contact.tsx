import { useEffect } from "react";
import { PhoneIcon, SendIcon, ArrowRightIcon } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { useContact } from "../hooks/useContact";
import { QueryErrorState } from "../components/ui/QueryErrorState";
import { SITE_NAME } from "../config/site";

function ActionLink({
  href,
  label,
  value,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon: typeof PhoneIcon;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition-all duration-200 hover:border-gold/30 hover:bg-gold/10"
    >
      <span className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold group-hover:text-ink-950">
          <Icon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs uppercase tracking-[0.24em] text-cream/45">
            {label}
          </span>
          <span className="mt-1 block text-lg font-medium text-cream">
            {value}
          </span>
        </span>
      </span>
      <ArrowRightIcon className="h-5 w-5 text-cream/40 transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
    </a>
  );
}

export function Contact() {
  const contactQuery = useContact();
  useEffect(() => {
    document.title = `Contact — ${SITE_NAME}`;
  }, []);

  if (contactQuery.isError) {
    return (
      <div className="w-full bg-ink-950 px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <QueryErrorState
            title="Unable to load contact details"
            description="Please retry to fetch contact information from Supabase."
            onRetry={() => void contactQuery.refetch()}
          />
        </div>
      </div>
    );
  }

  const contact = contactQuery.data;
  if (!contact) return null;
  const telegramUrl = contact.telegram_username
    ? `https://t.me/${contact.telegram_username}`
    : "#";

  return (
    <div className="w-full bg-ink-950 pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wider text-gold/70">
            Contact
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold text-cream sm:text-6xl">
            Reach {SITE_NAME}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cream/60">
            Use the direct phone link or message us on Telegram at @
            {contact.telegram_username}.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ActionLink
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              label="Phone"
              value={contact.phone}
              icon={PhoneIcon}
            />
            <ActionLink
              href={telegramUrl}
              label="Telegram"
              value={`@${contact.telegram_username}`}
              icon={SendIcon}
              external
            />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-cream/60">
            Telegram is the fastest way to reach us.
          </div>
        </Reveal>
      </div>
    </div>
  );
}
