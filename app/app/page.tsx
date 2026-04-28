import Link from "next/link";
import { OnboardingCard } from "@/components/soyaal/onboarding-card";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { requireMember } from "@/lib/session";
import { getCourseProgress } from "@/lib/data/progress";
import { getPublishedEvents } from "@/lib/data/events";
import { getPublishedAnnouncements } from "@/lib/data/announcements";
import { getPublishedArchiveItems } from "@/lib/data/archive";
import { completeOnboarding } from "@/app/actions";

const COURSE_SLUG = "foundations-of-somali-poetry";

function parseEventDate(dateStr: string | null): { day: string; month: string } | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return {
      day: d.getDate().toString(),
      month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await requireMember();

  const [progress, events, announcements, archiveItems] = await Promise.all([
    getCourseProgress(session.id, COURSE_SLUG),
    getPublishedEvents(),
    getPublishedAnnouncements(),
    getPublishedArchiveItems(),
  ]);

  const currentLessonSlug = progress?.currentLessonSlug ?? "listening-for-repetition";
  const percentComplete = progress?.percentComplete ?? 0;

  return (
    <div className="space-y-7">
      {!session.onboarded ? <OnboardingCard onComplete={completeOnboarding} /> : null}

      {/* ── Floating greeting ──────────────────────────────────── */}
      <div className="flex items-end justify-between gap-4 px-1 pt-2">
        <h1 className="display-font text-4xl text-[var(--soy-brown-900)]">
          Welcome back, {session.name.split(" ")[0]}
        </h1>
        <p className="hidden text-sm text-[var(--soy-ink-muted)] md:block">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* ── Metrics ────────────────────────────────────────────── */}
      <section className="metric-grid">
        <div className="metric-card">
          <div className="metric-value">1</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Course enrolled</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{percentComplete}%</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Course progress</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{events.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Upcoming events</p>
        </div>
        <div className="metric-card">
          <div className="metric-value">{archiveItems.length}</div>
          <p className="mt-1 text-sm text-[var(--soy-ink-soft)]">Archive entries</p>
        </div>
      </section>

      {/* ── Dark espresso continue card ─────────────────────────── */}
      <section className="continue-card">
        <div className="mesh-glow opacity-30" />
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soy-amber-300)]">
            Continue where you left off
          </p>
          <p className="display-font mt-3 text-2xl italic leading-9 text-[var(--soy-cream-100)]">
            {progress?.currentModuleTitle ?? "Foundations of Somali Poetry"} &middot;{" "}
            {progress?.currentLessonTitle ?? "Listening for Repetition"}
          </p>
          <div className="mt-4">
            <ProgressBar value={percentComplete} />
          </div>
          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-xs text-white/50">{percentComplete}% complete</p>
            <Link
              className="button-primary warm mt-3 text-sm"
              href={`/app/lesson/${currentLessonSlug}`}
            >
              Resume lesson →
            </Link>
          </div>
        </div>
      </section>

      {/* ── My courses + Upcoming events ───────────────────────── */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">

        {/* Courses list */}
        <div className="top-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">My courses</p>
          <div className="mt-5 space-y-5">
            {[
              { title: "Foundations of Somali Poetry", module: "Listening for Form", percent: percentComplete, accent: "var(--soy-amber-600)" },
            ].map((course) => (
              <div key={course.title}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-1 flex-shrink-0 rounded-full"
                    style={{ background: course.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/app/course/${COURSE_SLUG}`}
                      className="font-medium text-[var(--soy-brown-900)] hover:text-[var(--soy-amber-600)] transition-colors"
                    >
                      {course.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-[var(--soy-ink-muted)]">{course.percent}% complete</p>
                  </div>
                </div>
                <div className="ml-4 mt-2.5">
                  <ProgressBar value={course.percent} />
                </div>
              </div>
            ))}
          </div>

          {/* Announcements inside the courses panel */}
          {announcements.length > 0 && (
            <div className="mt-6 border-t border-[var(--soy-border)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Announcements</p>
              <div className="mt-3 space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="paper-card p-4">
                    <h3 className="font-medium text-[var(--soy-brown-900)]">{ann.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--soy-ink-soft)]">{ann.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming events with date blocks */}
        <div className="top-panel">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Upcoming events</p>
            <Link className="button-link text-xs" href="/events">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {events.length === 0 ? (
              <p className="text-sm text-[var(--soy-ink-muted)]">No upcoming events scheduled.</p>
            ) : (
              events.map((event) => {
                const parsed = parseEventDate(event.event_date);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="paper-card flex items-start gap-4 p-4 transition-shadow hover:shadow-md"
                  >
                    {parsed ? (
                      <div className="event-date">
                        <span className="event-date-day">{parsed.day}</span>
                        <span className="event-date-month">{parsed.month}</span>
                      </div>
                    ) : (
                      <div className="event-date">
                        <span className="event-date-day text-sm">—</span>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-[var(--soy-brown-900)]">{event.title}</h3>
                      <p className="mt-0.5 text-xs text-[var(--soy-ink-soft)]">
                        {event.location_label} · {event.datetime_label?.split(",")[1]?.trim() ?? ""}
                      </p>
                      {event.price_label && (
                        <span className="mt-2 inline-block tag">{event.price_label}</span>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── Archive picks ──────────────────────────────────────── */}
      <section className="top-panel">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Archive picks</p>
          <Link className="button-link text-xs" href="/app/archive">Open archive</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {archiveItems
            .filter((item) => item.access === "members")
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.id}
                className="paper-card block p-4"
                href={`/app/archive/${item.slug}`}
              >
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--soy-ink-muted)]">{item.poet}</p>
                <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--soy-ink-soft)] line-clamp-2">{item.preview}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
