import { signInAsAdmin, signInAsMember } from "@/app/actions";
import { PublicShell } from "@/components/soyaal/public-shell";

export default async function SignInPage() {
  return (
    <PublicShell footer={false}>
      <section className="section-space">
        <div className="content-width grid gap-6 px-4 md:grid-cols-2">
          <div className="editorial-card p-6 sm:p-8">
            <p className="eyebrow">Member sign-in</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Enter the learner portal</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
              This scaffold uses demo auth so the gated flows can be exercised without Supabase in place yet.
            </p>
            <form action={signInAsMember} className="mt-8">
              <button className="button-primary warm w-full" type="submit">
                Sign in as demo member
              </button>
            </form>
          </div>

          <div className="editorial-card p-6 sm:p-8">
            <p className="eyebrow">Admin sign-in</p>
            <h2 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Open the simple CMS</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
              The admin area is intended for one operator: upload lessons, manage events, review users, and publish archive entries.
            </p>
            <form action={signInAsAdmin} className="mt-8">
              <button className="button-secondary w-full" type="submit">
                Sign in as demo admin
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
