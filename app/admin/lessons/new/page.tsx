import { createClient } from "@/lib/supabase/server";
import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { createLesson } from "@/app/admin/actions";
import Link from "next/link";

export default async function NewLessonPage() {
  const supabase = await createClient();
  const { data: modules } = await supabase
    .from("modules")
    .select("id, title, order, courses ( title )")
    .order("order");

  type ModuleRow = {
    id: string;
    title: string;
    order: number;
    courses: { title: string } | null;
  };

  const moduleOptions = (modules as ModuleRow[] | null)?.map((m) => ({
    value: m.id,
    label: `${m.courses?.title ?? "Unknown course"} — Module ${m.order}: ${m.title}`,
  })) ?? [];

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lessons</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">New lesson</h1>
          </div>
          <Link href="/admin/lessons" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={createLesson} submitLabel="Create lesson">
          <AdminSelect label="Module" name="module_id" options={moduleOptions} required />
          <AdminField label="Slug" name="slug" required placeholder="introduction-to-gabay" hint="URL-safe identifier" />
          <AdminField label="Title" name="title" required placeholder="Introduction to Gabay" />
          <AdminField label="Order" name="order" type="number" required placeholder="1" hint="Position within the module" />
          <AdminField label="Duration (minutes)" name="duration_minutes" type="number" placeholder="45" />
          <AdminField label="Summary" name="summary" multiline rows={3} placeholder="What members will learn in this lesson…" />
          <AdminField label="Transcript" name="transcript" multiline rows={6} placeholder="Full lesson transcript…" />
          <AdminField label="Notes summary" name="notes_summary" multiline rows={4} placeholder="Key takeaways shown in the lesson notes tab…" />
          <AdminField
            label="Captions"
            name="captions"
            placeholder="English, Somali"
            hint="Comma-separated list of available caption languages"
          />
          <AdminField
            label="Mux asset ID"
            name="mux_asset_id"
            placeholder="asset_xxxxxxxxxxxx"
            hint="Leave blank — set automatically after Mux upload"
          />
          <AdminField
            label="Mux playback ID"
            name="mux_playback_id"
            placeholder="xxxxxxxxxxxxxxxx"
            hint="Leave blank — set automatically after Mux asset is ready"
          />
          <AdminCheckbox label="Published — visible to enrolled members" name="published" />
        </AdminForm>
      </section>
    </div>
  );
}
