import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminOverviewPage() {
  const [supabase, adminSupabase] = [await createClient(), createAdminClient()];

  const [
    { count: userCount },
    { count: lessonCount },
    { count: eventCount },
    { count: archiveCount },
    { count: activeSubCount },
  ] = await Promise.all([
    adminSupabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("lessons").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("archive_items").select("*", { count: "exact", head: true }),
    adminSupabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("subscription_status", "active"),
  ]);

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
          <div className="metric-value">{userCount ?? 0}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Total members</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{activeSubCount ?? 0}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Active subscriptions</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{lessonCount ?? 0}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Lessons configured</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{eventCount ?? 0}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Published events</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{archiveCount ?? 0}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Archive entries</p>
        </div>
      </section>
    </div>
  );
}
