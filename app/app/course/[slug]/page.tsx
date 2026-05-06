import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { getCourseBySlug } from "@/lib/data/courses";
import { getCourseProgress } from "@/lib/data/progress";
import { requireMember } from "@/lib/session";

export default async function MemberCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireMember();
  const { slug } = await params;

  const [course, progress] = await Promise.all([
    getCourseBySlug(slug),
    getCourseProgress(session.id, slug),
  ]);

  if (!course) {
    notFound();
  }

  type LessonRow = {
    id: string;
    slug: string;
    title: string;
    order: number;
    duration_minutes: number;
    summary: string;
  };
  type ModuleRow = {
    id: string;
    title: string;
    order: number;
    summary: string;
    lessons: LessonRow[];
  };

  const percentComplete = progress?.percentComplete ?? 0;
  const currentLessonSlug =
    progress?.currentLessonSlug ?? (course.modules as ModuleRow[])[0]?.lessons[0]?.slug;

  const sortedModules = [...(course.modules as ModuleRow[])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Course overview</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">{course.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-8 text-[var(--soy-ink-soft)]">{course.description}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <ProgressBar value={percentComplete} />
            <p className="mt-3 text-sm text-[var(--soy-ink-soft)]">
              {percentComplete}% complete · {progress?.completedLessons ?? 0} of{" "}
              {progress?.totalLessons ?? 9} lessons done
            </p>
          </div>
          {currentLessonSlug && (
            <Link
              className="button-primary warm justify-center"
              href={`/app/lesson/${currentLessonSlug}`}
            >
              Resume where you left off
            </Link>
          )}
        </div>
      </section>

      <section className="grid gap-4">
        {sortedModules.map((module) => {
          const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);
          return (
            <article key={module.id} className="top-panel">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                Module {module.order}
              </p>
              <h2 className="display-font mt-2 text-3xl text-[var(--soy-brown-900)]">{module.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{module.summary}</p>
              <div className="mt-5 grid gap-3">
                {sortedLessons.map((lesson) => {
                  const isCompleted = progress?.completedLessonIds?.has(lesson.id) ?? false;
                  return (
                    <Link
                      key={lesson.id}
                      className="paper-card flex items-center justify-between gap-4 p-4"
                      href={`/app/lesson/${lesson.slug}`}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                          Lesson {lesson.order}
                        </p>
                        <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{lesson.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{lesson.summary}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="tag">{lesson.duration_minutes} min</span>
                        {isCompleted && (
                          <span className="status-pill">Complete</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
