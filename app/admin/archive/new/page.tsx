import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { createArchiveItem } from "@/app/admin/actions";
import Link from "next/link";

const accessOptions = [
  { value: "members", label: "Members only" },
  { value: "public", label: "Public preview" },
];

export default function NewArchiveItemPage() {
  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Archive</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">New archive entry</h1>
          </div>
          <Link href="/admin/archive" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={createArchiveItem} submitLabel="Create entry">
          <AdminField label="Slug" name="slug" required placeholder="gabay-by-raage-ugaas" hint="URL-safe identifier" />
          <AdminField label="Title" name="title" required placeholder="Gabay of the Wandering Scholar" />
          <AdminField label="Poet" name="poet" placeholder="Raage Ugaas" />
          <AdminField label="Era" name="era" placeholder="Late 19th century" />
          <AdminField label="Description" name="description" multiline rows={4} placeholder="Context and significance of this archive entry…" />
          <AdminField label="Preview excerpt" name="preview" multiline rows={3} placeholder="Short excerpt shown to non-members as a teaser…" />
          <AdminField label="Editorial note" name="editorial_note" multiline rows={4} placeholder="Scholar's notes on this piece for member study…" />
          <AdminField
            label="Tags"
            name="tags"
            placeholder="gabay, classical, oral-tradition"
            hint="Comma-separated list of tags"
          />
          <AdminField
            label="Passages"
            name="passages"
            multiline
            rows={6}
            placeholder={"One passage per line:\nGabay passage one\nGabay passage two"}
            hint="One passage per line — used for annotation and study tools"
          />
          <AdminSelect label="Access" name="access" options={accessOptions} defaultValue="members" />
          <AdminCheckbox label="Published — visible in the archive" name="published" />
        </AdminForm>
      </section>
    </div>
  );
}
