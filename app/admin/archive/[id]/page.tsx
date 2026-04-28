import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminForm, AdminField, AdminCheckbox, AdminSelect } from "@/components/soyaal/admin-form";
import { updateArchiveItem } from "@/app/admin/actions";

const accessOptions = [
  { value: "members", label: "Members only" },
  { value: "public", label: "Public preview" },
];

export default async function EditArchiveItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("archive_items")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) notFound();

  const action = updateArchiveItem.bind(null, id);

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Archive</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Edit archive entry</h1>
          </div>
          <Link href="/admin/archive" className="button-secondary text-sm">
            Cancel
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <AdminForm action={action} submitLabel="Save changes">
          <AdminField label="Slug" name="slug" required defaultValue={item.slug} hint="URL-safe identifier" />
          <AdminField label="Title" name="title" required defaultValue={item.title} />
          <AdminField label="Poet" name="poet" defaultValue={item.poet ?? ""} />
          <AdminField label="Era" name="era" defaultValue={item.era ?? ""} />
          <AdminField label="Description" name="description" multiline rows={4} defaultValue={item.description ?? ""} />
          <AdminField label="Preview excerpt" name="preview" multiline rows={3} defaultValue={item.preview ?? ""} />
          <AdminField label="Editorial note" name="editorial_note" multiline rows={4} defaultValue={item.editorial_note ?? ""} />
          <AdminField
            label="Tags"
            name="tags"
            defaultValue={(item.tags as string[] | null)?.join(", ") ?? ""}
            hint="Comma-separated list of tags"
          />
          <AdminField
            label="Passages"
            name="passages"
            multiline
            rows={6}
            defaultValue={(item.passages as string[] | null)?.join("\n") ?? ""}
            hint="One passage per line"
          />
          <AdminSelect label="Access" name="access" options={accessOptions} defaultValue={item.access ?? "members"} />
          <AdminCheckbox label="Published — visible in the archive" name="published" defaultChecked={item.published} />
        </AdminForm>
      </section>
    </div>
  );
}
