import Link from "next/link";
import { signOut } from "@/app/actions";
import { getViewerSession } from "@/lib/session";
import { Logo } from "@/components/soyaal/logo";

function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--br)] text-[var(--cr)]">
      <div className="content-width flex flex-col gap-5 px-4 py-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Logo href="/" light />
          <p className="mt-3 text-[12px] leading-6 text-white/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-[12px]">
          <Link className="opacity-70 hover:opacity-100 transition-opacity" href="/course/foundations-of-somali-poetry">
            Course
          </Link>
          <Link className="opacity-70 hover:opacity-100 transition-opacity" href="/events">
            Events
          </Link>
          <Link className="opacity-70 hover:opacity-100 transition-opacity" href="/archive">
            Archive
          </Link>
          <Link className="opacity-70 hover:opacity-100 transition-opacity" href="/pricing">
            Pricing
          </Link>
          <Link className="opacity-70 hover:opacity-100 transition-opacity" href="/about">
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
    <header className="bg-[var(--br)] text-[var(--cr)]">
      <div className="content-width flex items-center justify-between gap-4 px-4 py-3">
        <Logo href={session.role === "admin" ? "/admin" : session.role === "guest" ? "/" : "/app"} light />
        <nav className="hidden items-center gap-7 text-[13px] md:flex">
          <Link href="/course/foundations-of-somali-poetry" className="opacity-85 hover:opacity-100 transition-opacity">Course</Link>
          <Link href="/events" className="opacity-85 hover:opacity-100 transition-opacity">Events</Link>
          <Link href="/archive" className="opacity-85 hover:opacity-100 transition-opacity">Archive</Link>
          <Link href="/about" className="opacity-85 hover:opacity-100 transition-opacity">About</Link>
          <Link href="/pricing" className="opacity-85 hover:opacity-100 transition-opacity">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          {session.role === "guest" ? (
            <>
              <Link href="/signin" className="px-3 py-[6px] text-[12px] border border-white/20 rounded-md hover:bg-white/10 transition-colors">
                Sign in
              </Link>
              <Link href="/pricing" className="px-3 py-[6px] text-[12px] bg-[var(--am)] text-white rounded-md hover:bg-[var(--am2)] transition-colors">
                Get started
              </Link>
            </>
          ) : (
            <>
              <Link
                href={session.role === "admin" ? "/admin" : "/app"}
                className="px-3 py-[6px] text-[12px] border border-white/20 rounded-md hover:bg-white/10 transition-colors"
              >
                {session.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <form action={signOut}>
                <button className="px-3 py-[6px] text-[12px] bg-[var(--am)] text-white rounded-md hover:bg-[var(--am2)] transition-colors" type="submit">
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
