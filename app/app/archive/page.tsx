import Link from "next/link";
import { archiveItems } from "@/lib/site-data";
import { requireMember } from "@/lib/session";

export default async function MemberArchivePage() {
  await requireMember();

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Member archive</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Poems, reading notes, and PDF workspaces</h1>
        <p className="mt-4 max-w-4xl text-sm leading-8 text-[var(--soy-ink-soft)]">
          The pilot archive is intentionally small. Each entry opens into a lightweight PDF workspace where you can label
          passages and save notes tied to the text.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {archiveItems
          .filter((item) => item.access === "members")
          .map((item) => (
            <Link key={item.id} className="top-panel block" href={`/app/archive/${item.slug}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                    {item.poet} · {item.era}
                  </p>
                  <h2 className="display-font mt-2 text-3xl text-[var(--soy-brown-900)]">{item.title}</h2>
                </div>
                <span className="tag">{item.pdfName}</span>
              </div>
              <p className="mt-4 text-sm leading-8 text-[var(--soy-ink-soft)]">{item.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}
