import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { getPublishedArchiveItems } from "@/lib/data/archive";

export default async function ArchiveTeaserPage() {
  const archiveItems = await getPublishedArchiveItems();

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Archive teaser</p>
              <h1 className="section-title mt-4 max-w-3xl">A visible archive, with the full reading workspace kept for members</h1>
              <p className="section-subtitle mt-5">
                Public visitors can see the editorial tone and a handful of preview entries. Members unlock the full PDF
                workspace, saved labels, and linked reading notes.
              </p>
            </div>
            <Link className="button-primary warm" href="/pricing">
              Unlock the full archive
            </Link>
          </div>

          <div className="grid-cards mt-10">
            {archiveItems.map((item) => (
              <article key={item.id} className="editorial-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                    {item.poet} · {item.era}
                  </p>
                  <span className={item.access === "members" ? "tag" : "status-pill"}>
                    {item.access === "members" ? "Member entry" : "Public preview"}
                  </span>
                </div>
                <h2 className="display-font mt-3 text-2xl text-[var(--soy-brown-900)]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{item.preview}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {item.access === "public" ? (
                  <div className="paper-card mt-5 p-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
                    Public preview entry. The full archive workspace lives inside the member area.
                  </div>
                ) : (
                  <div className="paper-card mt-5 p-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
                    Locked in public view. Join as a member to open the PDF workspace and save annotations.
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
