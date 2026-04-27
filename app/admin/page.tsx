import { archiveItems, events, flagshipCourse, seedUsers } from "@/lib/site-data";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Admin overview</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Simple CMS for the pilot launch</h1>
        <p className="mt-4 max-w-4xl text-sm leading-8 text-[var(--soy-ink-soft)]">
          The admin area focuses on one operator. It exposes the entities that matter for launch: users, the flagship
          course, lesson materials, live events, and archive entries.
        </p>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <div className="metric-value">{seedUsers.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Visible users</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{flagshipCourse.modules.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Modules configured</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{events.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Published events</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{archiveItems.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Archive entries</p>
        </div>
      </section>
    </div>
  );
}
