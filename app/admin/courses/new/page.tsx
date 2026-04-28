import { AdminForm, AdminField, AdminCheckbox } from "@/components/soyaal/admin-form";
import { createCourse } from "@/app/admin/actions";
import Link from "next/link";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Courses</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">New course</h1>
          </div>
          <Link href="/admin/courses" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={createCourse} submitLabel="Create course">
          <AdminField label="Slug" name="slug" required placeholder="foundations-of-somali-poetry" hint="URL-safe identifier, lowercase with hyphens" />
          <AdminField label="Title" name="title" required placeholder="Foundations of Somali Poetry" />
          <AdminField label="Subtitle" name="subtitle" placeholder="A journey through oral tradition" />
          <AdminField label="Hero quote" name="hero_quote" multiline rows={3} placeholder="A memorable opening quote for the course hero…" />
          <AdminField label="Description" name="description" multiline rows={5} placeholder="Full course description shown to prospective members…" />
          <AdminCheckbox label="Published — visible to members" name="published" />
        </AdminForm>
      </section>
    </div>
  );
}
