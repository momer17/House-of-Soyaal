import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { flagshipCourse } from "@/lib/site-data";

export default async function PricingPage() {
  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow">Membership</p>
            <h1 className="section-title mt-5">One subscription, full access to the pilot experience</h1>
            <p className="section-subtitle mt-6">
              Launch is subscription-only. Members unlock the full flagship course, archive reading workspace, and member
              pricing or access for live events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary warm" href="/signup">
                Start your membership
              </Link>
              <Link className="button-secondary" href={`/course/${flagshipCourse.slug}`}>
                Review the course
              </Link>
            </div>
          </div>

          <div className="editorial-card p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Pilot membership</p>
                <h2 className="display-font mt-3 text-5xl text-[var(--soy-brown-900)]">£{flagshipCourse.monthlyPriceGbp}</h2>
                <p className="mt-2 text-sm text-[var(--soy-ink-soft)]">per month, billed in GBP</p>
              </div>
              <span className="status-pill">UK-first launch</span>
            </div>
            <div className="mt-8 grid gap-4">
              {flagshipCourse.includes.map((item) => (
                <div key={item} className="paper-card p-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Stripe and subscription entitlements are represented here as a demo flow. The scaffold is structured so
              those integrations can replace the current placeholder auth later.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
