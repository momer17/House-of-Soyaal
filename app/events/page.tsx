import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { getPublishedEvents } from "@/lib/data/events";

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width px-4">
          <p className="eyebrow">Events</p>
          <h1 className="section-title mt-4 max-w-3xl">Small workshops and reading circles around the course</h1>
          <p className="section-subtitle mt-5">
            Event discovery stays on-platform, but ticketing and registration are handled externally through Eventbrite to
            keep v1 operationally light.
          </p>

          <div className="grid-cards mt-10">
            {events.map((event) => (
              <article key={event.id} className="editorial-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">{event.format}</p>
                  <span className="tag">{event.price_label}</span>
                </div>
                <h2 className="display-font mt-3 text-2xl text-[var(--soy-brown-900)]">{event.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{event.summary}</p>
                <div className="mt-5 space-y-2 text-sm text-[var(--soy-ink-soft)]">
                  <p>{event.datetime_label}</p>
                  <p>{event.location_label}</p>
                  <p>{event.seats_label}</p>
                </div>
                <Link className="button-link mt-5 text-sm" href={`/events/${event.slug}`}>
                  Open event page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
