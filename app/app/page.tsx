import Link from "next/link";
import { OnboardingCard } from "@/components/soyaal/onboarding-card";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { announcements, archiveItems, events, flagshipCourse, getCourseProgressSnapshot } from "@/lib/site-data";
import { requireMember } from "@/lib/session";

export default async function DashboardPage() {
  const session = await requireMember();
  const progress = getCourseProgressSnapshot();

  return (
    <div className="space-y-6">
      {!session.onboarded ? <OnboardingCard /> : null}

      <section className="top-panel">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Welcome back, {session.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--soy-ink-soft)]">
              Continue the flagship course, check the next event, and return to your archive reading notes from one place.
            </p>
          </div>
          <Link className="button-primary warm" href={`/app/lesson/${progress.currentLessonSlug}`}>
            Resume current lesson
          </Link>
        </div>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <div className="metric-value">1</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Active course enrollment</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{progress.percentComplete}%</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Course progress snapshot</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{events.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Upcoming live events</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{archiveItems.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Archive entries ready to open</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="top-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Continue learning</p>
              <h2 className="display-font mt-2 text-3xl text-[var(--soy-brown-900)]">{progress.currentLessonTitle}</h2>
            </div>
            <span className="status-pill">{progress.percentComplete}% complete</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
            You are currently in <strong>{progress.currentModuleTitle}</strong> of {flagshipCourse.title}.
          </p>
          <div className="mt-5">
            <ProgressBar value={progress.percentComplete} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary warm" href={`/app/lesson/${progress.currentLessonSlug}`}>
              Resume lesson
            </Link>
            <Link className="button-secondary" href={`/app/course/${flagshipCourse.slug}`}>
              View course overview
            </Link>
          </div>
        </div>

        <div className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Announcements</p>
          <div className="mt-4 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.title} className="paper-card p-4">
                <h3 className="font-medium text-[var(--soy-brown-900)]">{announcement.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{announcement.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="top-panel">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Upcoming events</p>
            <Link className="button-link text-sm" href="/events">
              Public event pages
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="paper-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-[var(--soy-brown-900)]">{event.title}</h3>
                    <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">{event.datetimeLabel}</p>
                  </div>
                  <span className="tag">{event.priceLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-panel">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Archive picks</p>
            <Link className="button-link text-sm" href="/app/archive">
              Open archive
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {archiveItems
              .filter((item) => item.access === "members")
              .map((item) => (
                <Link key={item.id} className="paper-card block p-4" href={`/app/archive/${item.slug}`}>
                  <h3 className="font-medium text-[var(--soy-brown-900)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{item.preview}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
