import { signOut } from "@/app/actions";
import { Logo } from "@/components/soyaal/logo";
import { SideNav } from "@/components/soyaal/side-nav";
import { requireAdmin } from "@/lib/session";

const adminNav = [
  { href: "/admin", label: "Overview", shortLabel: "OV" },
  { href: "/admin/users", label: "Users", shortLabel: "US" },
  { href: "/admin/courses", label: "Courses", shortLabel: "CO" },
  { href: "/admin/lessons", label: "Lessons", shortLabel: "LE" },
  { href: "/admin/events", label: "Events", shortLabel: "EV" },
  { href: "/admin/archive", label: "Archive", shortLabel: "AR" },
  { href: "/admin/announcements", label: "Announcements", shortLabel: "AN" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="app-frame">
      <aside className="app-sidebar">
        <Logo href="/admin" />
        <div className="paper-card p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Admin CMS</p>
          <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">
            One-operator content management for lessons, events, archive entries, and user visibility.
          </p>
        </div>
        <SideNav items={adminNav} />
        <div className="mt-auto">
          <form action={signOut}>
            <button className="button-secondary w-full" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
