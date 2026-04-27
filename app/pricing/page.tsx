import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { CheckoutButton } from "@/components/soyaal/checkout-button";
import { getViewerSession } from "@/lib/session";

const MONTHLY_PRICE = 19;
const COURSE_SLUG = "foundations-of-somali-poetry";

const includes = [
  "Instant access to the flagship course and member archive.",
  "Downloadable lesson notes, worksheets, and transcripts.",
  "Member pricing and priority registration for live events.",
  "A persistent reading workspace for poem annotations and notes.",
];

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; canceled?: string }>;
}) {
  const params = await searchParams;
  const session = await getViewerSession();
  const isGuest = session.role === "guest";

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow">Membership</p>
            <h1 className="section-title mt-5">
              One subscription, full access to the pilot experience
            </h1>
            <p className="section-subtitle mt-6">
              Launch is subscription-only. Members unlock the full flagship course, archive
              reading workspace, and member pricing or access for live events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {isGuest ? (
                <Link className="button-secondary" href="/signup">
                  Create an account first
                </Link>
              ) : null}
              <Link
                className="button-secondary"
                href={`/course/${COURSE_SLUG}`}
              >
                Review the course
              </Link>
            </div>

            {params.reason === "subscribe" && (
              <div className="mt-6 rounded-[1rem] border border-[var(--soy-amber-600)]/30 bg-[rgba(193,127,62,0.08)] px-4 py-3 text-sm text-[var(--soy-amber-600)]">
                A membership is required to access that page.
              </div>
            )}
            {params.canceled === "1" && (
              <div className="mt-6 rounded-[1rem] border border-[rgba(61,46,32,0.12)] bg-[var(--soy-cream-100)] px-4 py-3 text-sm text-[var(--soy-ink-soft)]">
                No charge was made. You can subscribe whenever you&apos;re ready.
              </div>
            )}
          </div>

          <div className="editorial-card p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                  Pilot membership
                </p>
                <h2 className="display-font mt-3 text-5xl text-[var(--soy-brown-900)]">
                  £{MONTHLY_PRICE}
                </h2>
                <p className="mt-2 text-sm text-[var(--soy-ink-soft)]">
                  per month, billed in GBP · cancel anytime
                </p>
              </div>
              <span className="status-pill">UK-first launch</span>
            </div>

            <div className="mt-8 grid gap-3">
              {includes.map((item) => (
                <div
                  key={item}
                  className="paper-card flex items-start gap-3 p-4 text-sm leading-7 text-[var(--soy-ink-soft)]"
                >
                  <span className="mt-0.5 shrink-0 text-[var(--soy-green-700)]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8">
              {session.subscriptionActive ? (
                <Link href="/app" className="button-primary warm w-full text-center block">
                  Go to your dashboard
                </Link>
              ) : (
                <CheckoutButton />
              )}
            </div>

            <p className="mt-4 text-center text-xs text-[var(--soy-ink-muted)]">
              Secure checkout via Stripe · GBP only · cancel anytime in your account
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
