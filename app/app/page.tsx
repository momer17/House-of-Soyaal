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
    <div className="space-y-5">
      {!session.onboarded ? <OnboardingCard onComplete={completeOnboarding} /> : null}

      {/* Greeting */}
      <div className="flex items-end justify-between gap-4 px-1 pt-1">
        <h1 className="font-serif text-[24px] text-[var(--br)]">
          Welcome back, {session.name.split(" ")[0]}
        </h1>
        <p className="hidden text-[11px] text-[var(--tx3)] md:block">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-[var(--cr)] rounded-lg p-3 text-center border border-[var(--soy-border)]">
          <div className="font-serif text-[22px] text-[var(--br)]">1</div>
          <p className="mt-0.5 text-[10px] text-[var(--tx3)]">Course enrolled</p>
        </div>
        <div className="bg-[var(--cr)] rounded-lg p-3 text-center border border-[var(--soy-border)]">
          <div className="font-serif text-[22px] text-[var(--br)]">{percentComplete}%</div>
          <p className="mt-0.5 text-[10px] text-[var(--tx3)]">Progress</p>
        </div>
        <div className="bg-[var(--cr)] rounded-lg p-3 text-center border border-[var(--soy-border)]">
          <div className="font-serif text-[22px] text-[var(--br)]">{events.length}</div>
          <p className="mt-0.5 text-[10px] text-[var(--tx3)]">Upcoming events</p>
        </div>
        <div className="bg-[var(--cr)] rounded-lg p-3 text-center border border-[var(--soy-border)]">
          <div className="font-serif text-[22px] text-[var(--br)]">{archiveItems.length}</div>
          <p className="mt-0.5 text-[10px] text-[var(--tx3)]">Archive entries</p>
        </div>
      </section>

      {/* Continue card */}
      <section 
        className="rounded-lg p-5 text-[var(--cr)] relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0f08, #2e1c0e 52%, #3d2918)" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--am3)]">
          Continue where you left off
        </p>
        <p className="font-serif mt-2 text-[18px] italic leading-[1.4] text-[var(--cr)]">
          {progress?.currentModuleTitle ?? "Module Name"} &middot;{" "}
          {progress?.currentLessonTitle ?? "Lesson Title"}
        </p>
        <div className="mt-3">
          <ProgressBar value={percentComplete} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-[10px] text-white/50">{percentComplete}% complete</p>
          <Link
            className="px-3 py-[6px] text-[11px] font-medium bg-[var(--am)] text-white rounded-md hover:bg-[var(--am2)] transition-colors"
            href={`/app/lesson/${currentLessonSlug}`}
          >
            Resume lesson
          </Link>
        </div>
      </section>

      {/* My courses + Upcoming events */}
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">

        {/* Courses list */}
        <div className="bg-[var(--cr)] rounded-lg p-4 border border-[var(--soy-border)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">My courses</p>
          <div className="mt-4 space-y-4">
            {[
              { title: "Course Title Placeholder", module: "Module Name", percent: percentComplete, accent: "var(--am)" },
            ].map((course) => (
              <div key={course.title}>
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-1 flex-shrink-0 rounded-full"
                    style={{ background: course.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/app/course/${COURSE_SLUG}`}
                      className="text-[13px] font-medium text-[var(--br)] hover:text-[var(--am)] transition-colors"
                    >
                      {course.title}
                    </Link>
                    <p className="mt-0.5 text-[10px] text-[var(--tx3)]">{course.percent}% complete</p>
                  </div>
                </div>
                <div className="ml-4 mt-2">
                  <ProgressBar value={course.percent} />
                </div>
              </div>
            ))}
          </div>

          {/* Announcements */}
          {announcements.length > 0 && (
            <div className="mt-4 border-t border-[var(--soy-border)] pt-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">Announcements</p>
              <div className="mt-2 space-y-2">
                {announcements.map((ann) => (
                  <div key={ann.id} className="bg-[var(--wh)] rounded-md p-3 border border-[var(--soy-border)]">
                    <h3 className="text-[12px] font-medium text-[var(--br)]">{ann.title}</h3>
                    <p className="mt-1 text-[11px] leading-[1.5] text-[var(--tx2)]">{ann.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming events */}
        <div className="bg-[var(--cr)] rounded-lg p-4 border border-[var(--soy-border)]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">Upcoming events</p>
            <Link className="text-[11px] font-medium text-[var(--am)] hover:underline" href="/events">View all</Link>
          </div>
          <div className="mt-3 space-y-2">
            {events.length === 0 ? (
              <p className="text-[11px] text-[var(--tx3)]">No upcoming events scheduled.</p>
            ) : (
              events.map((event) => {
                const parsed = parseEventDate(event.event_date);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="bg-[var(--wh)] rounded-md flex items-start gap-3 p-3 border border-[var(--soy-border)] transition-shadow hover:shadow-sm"
                  >
                    {parsed ? (
                      <div className="w-10 h-10 bg-[var(--br)] text-[var(--cr)] rounded-md flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[12px] font-medium leading-none">{parsed.day}</span>
                        <span className="text-[8px] uppercase tracking-wider opacity-70">{parsed.month}</span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-[var(--br)] text-[var(--cr)] rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px]">—</span>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[12px] font-medium text-[var(--br)]">{event.title}</h3>
                      <p className="mt-0.5 text-[10px] text-[var(--tx3)]">
                        {event.location_label} · {event.datetime_label?.split(",")[1]?.trim() ?? ""}
                      </p>
                      {event.price_label && (
                        <span className="mt-1 inline-block px-2 py-0.5 text-[9px] bg-[var(--cr)] text-[var(--tx3)] rounded">{event.price_label}</span>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Archive picks */}
      <section className="bg-[var(--cr)] rounded-lg p-4 border border-[var(--soy-border)]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--tx3)]">Archive picks</p>
          <Link className="text-[11px] font-medium text-[var(--am)] hover:underline" href="/app/archive">Open archive</Link>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {archiveItems
            .filter((item) => item.access === "members")
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.id}
                className="bg-[var(--wh)] rounded-md block p-3 border border-[var(--soy-border)] hover:shadow-sm transition-shadow"
                href={`/app/archive/${item.slug}`}
              >
                <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--am)]">{item.poet}</p>
                <h3 className="mt-1 text-[12px] font-medium text-[var(--br)]">{item.title}</h3>
                <p className="mt-1 text-[10px] leading-[1.5] text-[var(--tx2)] line-clamp-2">{item.preview}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
