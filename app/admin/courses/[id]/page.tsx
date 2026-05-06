import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminForm, AdminField, AdminCheckbox } from "@/components/soyaal/admin-form";
import { updateCourse } from "@/app/admin/actions";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) notFound();

  const action = updateCourse.bind(null, id);

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Courses</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Edit course</h1>
          </div>
          <Link href="/admin/courses" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={action} submitLabel="Save changes">
          <AdminField label="Slug" name="slug" required defaultValue={course.slug} hint="URL-safe identifier, lowercase with hyphens" />
          <AdminField label="Title" name="title" required defaultValue={course.title} />
          <AdminField label="Subtitle" name="subtitle" defaultValue={course.subtitle ?? ""} />
          <AdminField label="Hero quote" name="hero_quote" multiline rows={3} defaultValue={course.hero_quote ?? ""} />
          <AdminField label="Description" name="description" multiline rows={5} defaultValue={course.description ?? ""} />
          <AdminCheckbox label="Published — visible to members" name="published" defaultChecked={course.published} />
        </AdminForm>
      </section>
    </div>
  );
}
