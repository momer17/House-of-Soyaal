import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { getCourseBySlug, getCourseProgressSnapshot } from "@/lib/site-data";
import { requireMember } from "@/lib/session";

export default async function MemberCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireMember();
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const progress = getCourseProgressSnapshot();

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Course overview</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">{course.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-8 text-[var(--soy-ink-soft)]">{course.description}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <ProgressBar value={progress.percentComplete} />
            <p className="mt-3 text-sm text-[var(--soy-ink-soft)]">
              {progress.percentComplete}% complete · currently on {progress.currentLessonTitle}
            </p>
          </div>
          <Link className="button-primary warm justify-center" href={`/app/lesson/${progress.currentLessonSlug}`}>
            Resume where you left off
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        {course.modules.map((module) => (
          <article key={module.id} className="top-panel">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Module {module.order}</p>
            <h2 className="display-font mt-2 text-3xl text-[var(--soy-brown-900)]">{module.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{module.summary}</p>
            <div className="mt-5 grid gap-3">
              {module.lessons.map((lesson) => (
                <Link key={lesson.id} className="paper-card flex items-center justify-between gap-4 p-4" href={`/app/lesson/${lesson.slug}`}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                      Lesson {lesson.order}
                    </p>
                    <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{lesson.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{lesson.summary}</p>
                  </div>
                  <span className="tag">{lesson.durationMinutes} min</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
