import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { AuthForm } from "@/components/soyaal/auth-form";
import { signUp } from "@/app/actions";

export default function SignUpPage() {
  return (
    <PublicShell footer={false}>
      <div className="section-space">
        <div className="content-narrow px-4">
          <div className="editorial-card p-8 sm:p-10">
            <p className="eyebrow">Create your account</p>
            <h1 className="section-title mt-4">Join House of Soyaal</h1>
            <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Create a free account. After confirming your email you&apos;ll be taken to
              choose your membership and complete checkout.
            </p>

            <div className="paper-card mt-6 space-y-2 p-4 text-sm text-[var(--soy-ink-soft)]">
              <p className="font-medium text-[var(--soy-brown-900)]">Membership includes</p>
              <ul className="space-y-1">
                {[
                  "Full access to the flagship course — 9 structured lessons",
                  "Members-only poetry archive with annotation workspace",
                  "Priority access and member pricing for live events",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-[var(--soy-green-700)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <AuthForm action={signUp} submitLabel="Create account · £19/month">
              <div className="paper-card space-y-4 p-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
                    placeholder="Asha Mohamed"
                  />
                </div>
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
                    autoComplete="new-password"
                    minLength={8}
                    className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>
            </AuthForm>

            <p className="mt-6 text-center text-sm text-[var(--soy-ink-soft)]">
              Already a member?{" "}
              <Link
                href="/signin"
                className="text-[var(--soy-amber-600)] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
