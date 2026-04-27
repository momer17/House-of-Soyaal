import Link from "next/link";
import { requireMember } from "@/lib/session";

export default async function AccountPage() {
  const session = await requireMember();

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="top-panel">
        <p className="eyebrow">Account</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Membership and preferences</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="paper-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member name</p>
            <p className="mt-2 text-lg font-medium text-[var(--soy-brown-900)]">{session.name}</p>
          </div>
          <div className="paper-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Subscription status</p>
            <p className="mt-2 text-lg font-medium text-[var(--soy-brown-900)]">Active</p>
          </div>
        </div>
        <div className="paper-card mt-6 p-5 text-sm leading-8 text-[var(--soy-ink-soft)]">
          Billing is represented as a placeholder in this scaffold. The production version will replace this card with a
          Stripe-powered customer portal and persistent profile settings backed by Supabase.
        </div>
      </section>

      <aside className="top-panel">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Quick links</p>
        <div className="mt-4 grid gap-3">
          <Link className="button-secondary justify-between text-sm" href="/app/course/foundations-of-somali-poetry">
            Course overview
            <span>Open</span>
          </Link>
          <Link className="button-secondary justify-between text-sm" href="/app/archive">
            Archive
            <span>Open</span>
          </Link>
          <Link className="button-secondary justify-between text-sm" href="/events">
            Events
            <span>View</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
