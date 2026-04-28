import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { updateLesson } from "@/app/admin/actions";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: lesson }, { data: modules }] = await Promise.all([
    supabase.from("lessons").select("*").eq("id", id).single(),
    supabase.from("modules").select("id, title, order, courses ( title )").order("order"),
  ]);

  if (!lesson) notFound();

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

  const action = updateLesson.bind(null, id);

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lessons</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Edit lesson</h1>
          </div>
          <Link href="/admin/lessons" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={action} submitLabel="Save changes">
          <AdminSelect label="Module" name="module_id" options={moduleOptions} required defaultValue={lesson.module_id} />
          <AdminField label="Slug" name="slug" required defaultValue={lesson.slug} />
          <AdminField label="Title" name="title" required defaultValue={lesson.title} />
          <AdminField label="Order" name="order" type="number" required defaultValue={String(lesson.order)} hint="Position within the module" />
          <AdminField label="Duration (minutes)" name="duration_minutes" type="number" defaultValue={String(lesson.duration_minutes ?? 0)} />
          <AdminField label="Summary" name="summary" multiline rows={3} defaultValue={lesson.summary ?? ""} />
          <AdminField label="Transcript" name="transcript" multiline rows={6} defaultValue={lesson.transcript ?? ""} />
          <AdminField label="Notes summary" name="notes_summary" multiline rows={4} defaultValue={lesson.notes_summary ?? ""} />
          <AdminField
            label="Captions"
            name="captions"
            defaultValue={(lesson.captions as string[] | null)?.join(", ") ?? ""}
            hint="Comma-separated list of available caption languages"
          />
          <AdminField
            label="Mux asset ID"
            name="mux_asset_id"
            defaultValue={lesson.mux_asset_id ?? ""}
            hint="Set automatically after Mux upload — edit with care"
          />
          <AdminField
            label="Mux playback ID"
            name="mux_playback_id"
            defaultValue={lesson.mux_playback_id ?? ""}
            hint="Set automatically after Mux asset is ready — edit with care"
          />
          <AdminCheckbox label="Published — visible to enrolled members" name="published" defaultChecked={lesson.published} />
        </AdminForm>
      </section>
    </div>
  );
}
