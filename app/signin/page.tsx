import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { AuthForm } from "@/components/soyaal/auth-form";
import { signIn } from "@/app/actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <PublicShell footer={false}>
      <div className="section-space">
        <div className="content-narrow px-4">
          <div className="editorial-card p-8 sm:p-10">
            <p className="eyebrow">Member access</p>
            <h1 className="section-title mt-4">Sign in to House of Soyaal</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Welcome back. Sign in to access your courses, archive, and upcoming events.
            </p>

            {params.error === "auth_callback_failed" && (
              <p className="mt-4 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Authentication failed. Please try again.
              </p>
            )}

            <AuthForm action={signIn} submitLabel="Sign in">
              <div className="paper-card space-y-4 p-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </AuthForm>

            <p className="mt-6 text-center text-sm text-[var(--soy-ink-soft)]">
              Not a member yet?{" "}
              <Link
                href="/pricing"
                className="text-[var(--soy-amber-600)] hover:underline"
              >
                Join as a member
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
