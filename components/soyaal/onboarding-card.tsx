import { completeOnboarding } from "@/app/actions";

export function OnboardingCard() {
  return (
    <section className="top-panel mb-6 bg-[linear-gradient(135deg,rgba(61,46,32,0.96),rgba(92,68,51,0.98))] text-[var(--soy-cream-100)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow !text-[var(--soy-amber-300)] before:!bg-[var(--soy-amber-300)]">
            First-time walkthrough
          </p>
          <h2 className="display-font mt-3 text-3xl">Start with a short orientation</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
            The pilot opens with one course, a small archive, and live events. Use this quick guide to see where lessons,
            saved reading notes, and bookings live.
          </p>
        </div>
        <form action={completeOnboarding} className="flex gap-3">
          <button className="button-secondary bg-white/8 text-white" type="submit">
            Skip for now
          </button>
          <button className="button-primary warm" type="submit">
            Mark walkthrough complete
          </button>
        </form>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          "Open your course from the dashboard or course overview.",
          "Use the lesson tabs for notes, transcript, and resources.",
          "Resume from your last playback position automatically.",
          "Save archive highlights with a label and a short note.",
        ].map((step, index) => (
          <div key={step} className="rounded-3xl border border-white/10 bg-white/6 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--soy-amber-300)]">Step {index + 1}</div>
            <p className="mt-2 text-sm leading-6 text-white/80">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
