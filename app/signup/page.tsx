import { signUpDemoMember } from "@/app/actions";
import { PublicShell } from "@/components/soyaal/public-shell";

export default async function SignUpPage() {
  return (
    <PublicShell footer={false}>
      <section className="section-space">
        <div className="content-narrow px-4">
          <div className="editorial-card p-6 sm:p-8">
            <p className="eyebrow">Start membership</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Join the House of Soyaal pilot</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
              In the production build this flow will hand off to Stripe Billing and Supabase Auth. For this scaffold, the
              button below creates a demo member session and takes you directly to the learner portal.
            </p>
            <div className="paper-card mt-6 p-5 text-sm leading-7 text-[var(--soy-ink-soft)]">
              Membership unlocks the flagship course, archive workspace, and member access to the event calendar.
            </div>
            <form action={signUpDemoMember} className="mt-8">
              <button className="button-primary warm w-full" type="submit">
                Start demo membership
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
