import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminArchivePage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("archive_items")
    .select("*")
    .order("created_at", { ascending: false });

  type ArchiveRow = {
    id: string;
    slug: string;
    title: string;
    poet: string | null;
    era: string | null;
    access: string;
    published: boolean;
    tags: string[] | null;
  };

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Archive</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Archive entries and PDFs</h1>
          </div>
          <Link href="/admin/archive/new" className="button-primary warm text-sm">
            New entry
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <div className="grid gap-3">
          {(items as ArchiveRow[])?.map((item) => (
            <div key={item.id} className="paper-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-medium text-[var(--soy-brown-900)]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">
                    {item.poet}{item.era ? ` · ${item.era}` : ""}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="tag text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={item.access === "public" ? "status-pill" : "tag"}>
                    {item.access === "public" ? "Public preview" : "Members only"}
                  </span>
                  <span className={item.published ? "status-pill" : "tag"}>
                    {item.published ? "Published" : "Draft"}
                  </span>
                  <Link href={`/admin/archive/${item.id}`} className="button-secondary text-sm">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
