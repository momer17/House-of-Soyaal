import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/soyaal/public-shell";
import { getEventBySlug } from "@/lib/data/events";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,1.1fr)_24rem]">
          <div>
            <p className="eyebrow">{event.format}</p>
            <h1 className="section-title mt-5">{event.title}</h1>
            <p className="section-subtitle mt-6">{event.summary}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">When</p>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{event.datetime_label}</p>
              </div>
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Where</p>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{event.location_label}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary warm" href={event.eventbrite_url} target="_blank" rel="noreferrer">
                Book on Eventbrite
              </a>
              <Link className="button-secondary" href="/events">
                Back to all events
              </Link>
            </div>
          </div>

          <aside className="editorial-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Booking</p>
            <h2 className="display-font mt-3 text-3xl text-[var(--soy-brown-900)]">{event.price_label}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{event.seats_label}</p>
            <div className="paper-card mt-6 p-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Registration is intentionally routed out to Eventbrite for v1. The site keeps discovery and context on-brand,
              while ticketing remains operationally simple.
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
