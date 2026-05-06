import Link from "next/link";
import { requireMember } from "@/lib/session";
import { getPublishedArchiveItems } from "@/lib/data/archive";

export default async function MemberArchivePage() {
  await requireMember();
  const items = await getPublishedArchiveItems();

  type ArchiveRow = {
    id: string;
    slug: string;
    title: string;
    poet: string | null;
    era: string | null;
    preview: string | null;
    access: string;
    tags: string[] | null;
  };

  const memberItems = (items as ArchiveRow[]).filter((item) => item.access === "members");

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Member archive</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Poems, reading notes, and PDF workspaces</h1>
        <p className="mt-4 max-w-4xl text-sm leading-8 text-[var(--soy-ink-soft)]">
          The pilot archive is intentionally small. Each entry opens into a lightweight workspace where you can label
          passages and save notes tied to the text.
        </p>
      </section>

      {memberItems.length === 0 ? (
        <section className="top-panel">
          <p className="text-sm text-[var(--soy-ink-muted)]">No archive entries published yet. Check back soon.</p>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {memberItems.map((item) => (
            <Link key={item.id} className="top-panel block" href={`/app/archive/${item.slug}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                    {item.poet}{item.era ? ` · ${item.era}` : ""}
                  </p>
                  <h2 className="display-font mt-2 text-3xl text-[var(--soy-brown-900)]">{item.title}</h2>
                </div>
                {item.era && <span className="tag">{item.era}</span>}
              </div>
              {item.preview && (
                <p className="mt-4 text-sm leading-8 text-[var(--soy-ink-soft)]">{item.preview}</p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
