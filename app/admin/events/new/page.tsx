import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { createEvent } from "@/app/admin/actions";
import Link from "next/link";

const formatOptions = [
  { value: "Online workshop", label: "Online workshop" },
  { value: "Online seminar", label: "Online seminar" },
  { value: "In-person session", label: "In-person session" },
];

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Events</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">New event</h1>
          </div>
          <Link href="/admin/events" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={createEvent} submitLabel="Create event">
          <AdminField label="Slug" name="slug" required placeholder="somali-poetry-workshop-june" hint="URL-safe identifier" />
          <AdminField label="Title" name="title" required placeholder="Somali Poetry Workshop" />
          <AdminField label="Summary" name="summary" multiline rows={3} placeholder="Brief description shown on the events listing…" />
          <AdminSelect label="Format" name="format" options={formatOptions} required />
          <AdminField label="Date / time label" name="datetime_label" placeholder="Saturday 14 June, 10:00–12:00 BST" />
          <AdminField label="Location label" name="location_label" placeholder="Online via Zoom" />
          <AdminField label="Seats label" name="seats_label" placeholder="12 seats remaining" />
          <AdminField label="Price label" name="price_label" placeholder="£25 / Free for members" />
          <AdminField label="Eventbrite URL" name="eventbrite_url" type="url" placeholder="https://www.eventbrite.co.uk/e/…" />
          <AdminCheckbox label="Published — visible in the events listing" name="published" />
        </AdminForm>
      </section>
    </div>
  );
}
