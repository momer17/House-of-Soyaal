import Link from "next/link";
import { signOut } from "@/app/actions";
import { IconNav } from "@/components/soyaal/icon-nav";
import { requireMember } from "@/lib/session";

const memberNav = [
  {
    href: "/app",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/app/course/foundations-of-somali-poetry",
    label: "Course",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    href: "/app/archive",
    label: "Archive",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    href: "/app/account",
    label: "Account",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireMember();

  return (
    <div className="app-frame-slim">
      <aside className="app-sidebar-slim">
        {/* Logo mark only */}
        <Link
          href="/app"
          aria-label="House of Soyaal dashboard"
          className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(61,46,32,0.1)] bg-[var(--br)] text-[var(--cr)] transition-opacity hover:opacity-85"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polygon
              points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6"
              fill="currentColor"
              opacity="0.92"
            />
          </svg>
        </Link>

        <div className="mx-auto mb-1 h-px w-6 bg-[var(--soy-border)]" />

        <IconNav items={memberNav} />

        <div className="mt-auto">
          <form action={signOut}>
            <button
              type="submit"
              title="Sign out"
              aria-label="Sign out"
              className="sidebar-icon-link"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </form>
        </div>
      </aside>
      <main className="app-main">{children}</main>
    </div>
  );
}
