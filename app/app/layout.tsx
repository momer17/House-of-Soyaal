import { signOut } from "@/app/actions";
import { Logo } from "@/components/soyaal/logo";
import { SideNav } from "@/components/soyaal/side-nav";
import { requireMember } from "@/lib/session";

const memberNav = [
  { href: "/app", label: "Dashboard", shortLabel: "DB" },
  { href: "/app/course/foundations-of-somali-poetry", label: "Course", shortLabel: "CR" },
  { href: "/app/archive", label: "Archive", shortLabel: "AR" },
  { href: "/app/account", label: "Account", shortLabel: "AC" },
];

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireMember();

  return (
    <div className="app-frame">
      <aside className="app-sidebar">
        <Logo href="/app" />
        <div className="paper-card p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member</p>
          <p className="mt-2 font-medium text-[var(--soy-brown-900)]">{session.name}</p>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Subscription active</p>
        </div>
        <SideNav items={memberNav} />
        <div className="mt-auto space-y-3">
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
