import { archiveItems } from "@/lib/site-data";

export default function AdminArchivePage() {
  return (
    <div className="top-panel">
      <p className="eyebrow">Archive</p>
      <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Archive entries and PDFs</h1>
      <div className="mt-6 grid gap-3">
        {archiveItems.map((item) => (
          <div key={item.id} className="paper-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-medium text-[var(--soy-brown-900)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  {item.poet} · {item.era} · {item.pdfName}
                </p>
              </div>
              <span className={item.access === "members" ? "tag" : "status-pill"}>
                {item.access === "members" ? "Members" : "Public preview"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
