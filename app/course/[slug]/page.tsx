import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/soyaal/public-shell";
import { getCourseBySlug } from "@/lib/site-data";
import { getViewerSession } from "@/lib/session";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const session = await getViewerSession();

  if (!course) {
    notFound();
  }

  return (
    <PublicShell>
      <section className="section-space">
        <div className="content-width grid gap-8 px-4 lg:grid-cols-[minmax(0,1.05fr)_24rem]">
          <div>
            <p className="eyebrow">Flagship course</p>
            <h1 className="section-title mt-5">{course.title}</h1>
            <p className="section-subtitle mt-6">{course.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary warm" href={session.role === "guest" ? "/pricing" : `/app/course/${course.slug}`}>
                {session.role === "guest" ? "Join to unlock the course" : "Open your course"}
              </Link>
              <Link className="button-secondary" href="/events">
                See related events
              </Link>
            </div>
          </div>

          <aside className="editorial-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Included with membership</p>
            <div className="mt-4 space-y-3">
              {course.includes.map((item) => (
                <div key={item} className="paper-card p-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="content-width px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div className="editorial-card p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Modules</p>
            <div className="mt-5 space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="paper-card p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                    Module {module.order}
                  </p>
                  <h2 className="display-font mt-2 text-2xl text-[var(--soy-brown-900)]">{module.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{module.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soy-ink-soft)]">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        {lesson.order}. {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="editorial-card p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Who it is for</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
                {course.audience.map((audienceItem) => (
                  <li key={audienceItem}>{audienceItem}</li>
                ))}
              </ul>
            </div>
            <div className="editorial-card p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">What learners should leave with</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
