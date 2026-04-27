import { events } from "@/lib/site-data";

export default function AdminEventsPage() {
  return (
    <div className="top-panel">
      <p className="eyebrow">Events</p>
      <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Event publishing and link-outs</h1>
      <div className="mt-6 grid gap-3">
        {events.map((event) => (
          <div key={event.id} className="paper-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-medium text-[var(--soy-brown-900)]">{event.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  {event.datetimeLabel} · {event.locationLabel}
                </p>
              </div>
              <span className="tag">{event.priceLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
