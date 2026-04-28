import Link from "next/link";
import { signOut } from "@/app/actions";
import { getViewerSession } from "@/lib/session";
import { Logo } from "@/components/soyaal/logo";

function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--soy-brown-900)] text-[var(--soy-cream-100)]">
      <div className="content-width flex flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <Logo href="/" light />
          <p className="mt-4 text-sm leading-7 text-white/70">
            Somali language and poetry, taught with warmth, structure, and a growing archive of reading material.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link className="footer-link" href="/course/foundations-of-somali-poetry">
            Course
          </Link>
          <Link className="footer-link" href="/events">
            Events
          </Link>
          <Link className="footer-link" href="/archive">
            Archive
          </Link>
          <Link className="footer-link" href="/pricing">
            Pricing
          </Link>
          <Link className="footer-link" href="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

async function PublicNav() {
  const session = await getViewerSession();

  return (
    <header className="top-nav">
      <div className="content-width flex items-center justify-between gap-4 px-4 py-4">
        <Logo href={session.role === "admin" ? "/admin" : session.role === "guest" ? "/" : "/app"} />
        <nav className="hidden items-center gap-6 text-sm text-[var(--soy-ink-soft)] md:flex">
          <Link href="/course/foundations-of-somali-poetry">Course</Link>
          <Link href="/events">Events</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          {session.role === "guest" ? (
            <>
              <Link href="/signin" className="button-secondary text-sm">
                Sign in
              </Link>
              <Link href="/pricing" className="button-primary warm text-sm">
                Join as a member
              </Link>
            </>
          ) : (
            <>
              <Link
                href={session.role === "admin" ? "/admin" : "/app"}
                className="button-secondary text-sm"
              >
                {session.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <form action={signOut}>
                <button className="button-primary text-sm" type="submit">
                  Sign out
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export async function PublicShell({
  children,
  footer = true,
}: {
  children: React.ReactNode;
  footer?: boolean;
}) {
  return (
    <div className="page-shell">
      <PublicNav />
      <main>{children}</main>
      {footer ? <SiteFooter /> : null}
    </div>
  );
}
