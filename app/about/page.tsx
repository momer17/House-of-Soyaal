import { PublicShell } from "@/components/soyaal/public-shell";

export default async function AboutPage() {
  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-narrow px-4">
          <p className="eyebrow">About House of Soyaal</p>
          <h1 className="section-title mt-5">A teaching platform shaped like an editorial reading room</h1>
          <div className="mt-8 space-y-5 text-base leading-8 text-[var(--soy-ink-soft)]">
            <p>
              House of Soyaal exists to make Somali language and poetry easier to approach without flattening either into
              generic courseware. The pilot is intentionally focused: one flagship course, a small archive, and a small
              number of live sessions that keep the learning personal.
            </p>
            <p>
              The design takes its cues from print culture and oral tradition rather than startup dashboards. That means
              slower pacing, generous reading space, careful typography, and a member area that feels more like a study
              room than a SaaS backend.
            </p>
            <p>
              Over time the platform can grow into a broader library of courses, learner tools, and dictionaries. For
              launch, the aim is simpler: teach one course well, support readers with a usable archive, and create a
              place people want to return to.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
