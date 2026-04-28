import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteEvent } from "@/app/admin/actions";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  type EventRow = {
    id: string;
    slug: string;
    title: string;
    format: string;
    datetime_label: string | null;
    location_label: string | null;
    price_label: string | null;
    published: boolean;
  };

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Events</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Event publishing and link-outs</h1>
          </div>
          <Link href="/admin/events/new" className="button-primary warm text-sm">
            New event
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <div className="grid gap-3">
          {(events as EventRow[])?.map((event) => (
            <div key={event.id} className="paper-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">{event.format}</p>
                  <h2 className="mt-1 font-medium text-[var(--soy-brown-900)]">{event.title}</h2>
                  <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">
                    {event.datetime_label}{event.location_label ? ` · ${event.location_label}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={event.published ? "status-pill" : "tag"}>
                    {event.published ? "Published" : "Draft"}
                  </span>
                  {event.price_label && <span className="tag">{event.price_label}</span>}
                  <Link href={`/admin/events/${event.id}`} className="button-secondary text-sm">
                    Edit
                  </Link>
                  <form action={deleteEvent.bind(null, event.id)}>
                    <button type="submit" className="button-secondary text-sm text-red-600 hover:border-red-300">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
