import Link from "next/link";
import { requireMember } from "@/lib/session";
import { createClient } from "@/lib/supabase/server";
import { ManageBillingButton } from "./manage-billing-button";

export default async function AccountPage() {
  const session = await requireMember();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, subscription_status, created_at")
    .eq("id", session.id)
    .single();

  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="top-panel">
        <p className="eyebrow">Account</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Membership and preferences</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="paper-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member name</p>
            <p className="mt-2 text-lg font-medium text-[var(--soy-brown-900)]">
              {profile?.name ?? session.name}
            </p>
          </div>
          <div className="paper-card p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Subscription status</p>
            <p className="mt-2">
              <span className={profile?.subscription_status === "active" ? "status-pill" : "tag"}>
                {profile?.subscription_status ?? "inactive"}
              </span>
            </p>
          </div>
          {joinedDate && (
            <div className="paper-card p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member since</p>
              <p className="mt-2 text-lg font-medium text-[var(--soy-brown-900)]">{joinedDate}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Billing</p>
          <div className="mt-3 paper-card p-5">
            <p className="text-sm leading-7 text-[var(--soy-ink-soft)]">
              Manage your subscription, update your payment method, or download invoices via the Stripe customer portal.
            </p>
            <div className="mt-4">
              <ManageBillingButton />
            </div>
          </div>
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
