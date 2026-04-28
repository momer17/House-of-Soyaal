import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { updateEvent } from "@/app/admin/actions";

const formatOptions = [
  { value: "Online workshop", label: "Online workshop" },
  { value: "Online seminar", label: "Online seminar" },
  { value: "In-person session", label: "In-person session" },
];

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) notFound();

  const action = updateEvent.bind(null, id);

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Events</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Edit event</h1>
          </div>
          <Link href="/admin/events" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={action} submitLabel="Save changes">
          <AdminField label="Slug" name="slug" required defaultValue={event.slug} hint="URL-safe identifier" />
          <AdminField label="Title" name="title" required defaultValue={event.title} />
          <AdminField label="Summary" name="summary" multiline rows={3} defaultValue={event.summary ?? ""} />
          <AdminSelect label="Format" name="format" options={formatOptions} required defaultValue={event.format} />
          <AdminField label="Date / time label" name="datetime_label" defaultValue={event.datetime_label ?? ""} />
          <AdminField label="Location label" name="location_label" defaultValue={event.location_label ?? ""} />
          <AdminField label="Seats label" name="seats_label" defaultValue={event.seats_label ?? ""} />
          <AdminField label="Price label" name="price_label" defaultValue={event.price_label ?? ""} />
          <AdminField label="Eventbrite URL" name="eventbrite_url" type="url" defaultValue={event.eventbrite_url ?? ""} />
          <AdminCheckbox label="Published — visible in the events listing" name="published" defaultChecked={event.published} />
        </AdminForm>
      </section>
    </div>
  );
}
