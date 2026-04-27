import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { getFlagshipCourse } from "@/lib/data/courses";
import { getPublishedEvents } from "@/lib/data/events";
import { getPublishedArchiveItems } from "@/lib/data/archive";

export default async function HomePage() {
  const [course, events, archiveItems] = await Promise.all([
    getFlagshipCourse(),
    getPublishedEvents(),
    getPublishedArchiveItems(),
  ]);

  // Fallback values for when DB is not yet seeded
  const courseTitle = course?.title ?? "Foundations of Somali Poetry";
  const courseSlug = course?.slug ?? "foundations-of-somali-poetry";
  const heroQuote =
    course?.hero_quote ??
    "A course shaped like a reading circle: attentive, warm, and grounded in the living oral tradition.";
  const heroStats = (course?.hero_stats as Array<{ value: string; label: string }>) ?? [
    { value: "9", label: "Lessons in the pilot course" },
    { value: "3", label: "Live sessions this term" },
    { value: "12", label: "Archive PDFs at launch" },
  ];

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,1.15fr)_28rem] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(61,46,32,0.08)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(247,241,232,0.96))] px-6 py-10 shadow-[var(--soy-shadow)] sm:px-10 sm:py-14">
            <div className="mesh-glow opacity-70" />
            <div className="relative z-10">
              <p className="eyebrow">Somali language and poetry</p>
              <h1 className="section-title mt-5 max-w-3xl">
                A warm, editorial home for learning Somali through poetry, listening, and close reading.
              </h1>
              <p className="section-subtitle mt-6">
                House of Soyaal launches with one carefully structured course, a member archive of poems and reading
                materials, and a small calendar of live workshops designed to keep the learning intimate and usable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button-primary warm" href="/pricing">
                  Join as a member
                </Link>
                <Link className="button-secondary" href={`/course/${courseSlug}`}>
                  Explore the flagship course
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[var(--soy-ink-soft)]">
                <span className="tag">UK-first launch</span>
                <span className="tag">Single-course pilot</span>
                <span className="tag">Archive + events included</span>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="editorial-card p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Flagship course</p>
              <h2 className="display-font mt-3 text-3xl text-[var(--soy-brown-900)]">{courseTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{heroQuote}</p>
              <div className="mt-6 space-y-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="paper-card flex items-center justify-between p-4">
                    <span className="display-font text-2xl text-[var(--soy-brown-900)]">{stat.value}</span>
                    <span className="text-sm text-[var(--soy-ink-soft)]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="editorial-card bg-[linear-gradient(135deg,var(--soy-brown-900),var(--soy-brown-700))] p-6 text-[var(--soy-cream-100)]">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-amber-300)]">Member archive</p>
              <p className="display-font mt-3 text-2xl leading-10">
                &ldquo;A name carried in the mouth can outlive the road that first taught it to us.&rdquo;
              </p>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Preview the archive publicly, then annotate poems and save personal reading notes inside the member area.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-width px-4 pb-10">
        <div className="metric-grid">
          <div className="metric-card">
            <div className="metric-value">1</div>
            <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Flagship course for the pilot launch</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">9</div>
            <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Structured lessons across three modules</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">{events.length || 3}</div>
            <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Live events across the current season</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">12</div>
            <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Archive PDFs prepared for the first release</p>
          </div>
        </div>
      </section>

      <section className="section-space bg-[rgba(247,241,232,0.78)]">
        <div className="content-width px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What membership unlocks</p>
              <h2 className="section-title mt-4 max-w-3xl">A clear first release, with room to deepen later</h2>
            </div>
            <Link className="button-link text-sm" href="/pricing">
              See pricing and access
            </Link>
          </div>

          <div className="grid-cards mt-10">
            {[
              {
                title: "Structured learning",
                body: "Course, module, and lesson pages keep the pilot focused on a single coherent learning path.",
              },
              {
                title: "Archive reading workspace",
                body: "Members can open poem PDFs, label passages, and save short notes that persist across visits.",
              },
              {
                title: "Live events",
                body: "Workshops and reading circles stay discoverable from the site while booking is handled through Eventbrite.",
              },
            ].map((feature) => (
              <div key={feature.title} className="editorial-card p-6">
                <p className="eyebrow">{feature.title}</p>
                <p className="mt-4 text-sm leading-8 text-[var(--soy-ink-soft)]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="editorial-card p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Learner view</p>
                <h2 className="display-font mt-4 text-3xl text-[var(--soy-brown-900)]">Continue where you left off</h2>
              </div>
              <span className="status-pill">Member dashboard</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
              The member experience prioritises clarity over catalogue sprawl: resume the current lesson, track course
              progress, and keep upcoming events in view.
            </p>
            <div className="paper-card mt-6 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Meaning and Context</p>
                  <h3 className="display-font mt-2 text-2xl text-[var(--soy-brown-900)]">Metaphor and Layered Meaning</h3>
                </div>
                <span className="tag">44% complete</span>
              </div>
              <div className="mt-4">
                <ProgressBar value={44} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="button-primary warm" href="/signup">
                  Start your membership
                </Link>
                <Link className="button-secondary" href="/signin">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className="editorial-card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">{event.format}</p>
                <h3 className="display-font mt-3 text-2xl text-[var(--soy-brown-900)]">{event.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{event.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--soy-ink-soft)]">
                  <span className="tag">{event.datetime_label}</span>
                  <span className="tag">{event.price_label}</span>
                </div>
                <Link className="button-link mt-4 text-sm" href={`/events/${event.slug}`}>
                  View event details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[rgba(247,241,232,0.78)]">
        <div className="content-width px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Archive preview</p>
              <h2 className="section-title mt-4 max-w-3xl">A members-only reading room, visible from the outside</h2>
            </div>
            <Link className="button-link text-sm" href="/archive">
              Browse the teaser archive
            </Link>
          </div>

          <div className="grid-cards mt-10">
            {archiveItems.slice(0, 3).map((item) => (
              <article key={item.id} className="editorial-card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                  {item.poet} · {item.era}
                </p>
                <h3 className="display-font mt-3 text-2xl text-[var(--soy-brown-900)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{item.preview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
