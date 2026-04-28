import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLessonsPage() {
  const supabase = await createClient();
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*, modules ( title, order, courses ( title ) )")
    .order("order");

  type LessonRow = {
    id: string;
    slug: string;
    title: string;
    order: number;
    duration_minutes: number;
    published: boolean;
    mux_playback_id: string | null;
    modules: { title: string; order: number; courses: { title: string } | null } | null;
  };

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lessons</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Lesson uploads and resources</h1>
          </div>
          <Link href="/admin/lessons/new" className="button-primary warm text-sm">
            New lesson
          </Link>
        </div>
      </section>

      <section className="top-panel">
        <div className="grid gap-3">
          {(lessons as LessonRow[])?.map((lesson) => (
            <div key={lesson.id} className="paper-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                    {lesson.modules?.courses?.title ?? "Unknown course"} · Module {lesson.modules?.order} · {lesson.modules?.title}
                  </p>
                  <h2 className="mt-1 font-medium text-[var(--soy-brown-900)]">
                    {lesson.order}. {lesson.title}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {lesson.mux_playback_id ? (
                    <span className="status-pill">Video ready</span>
                  ) : (
                    <span className="tag">No video</span>
                  )}
                  <span className={lesson.published ? "status-pill" : "tag"}>
                    {lesson.published ? "Published" : "Draft"}
                  </span>
                  <span className="tag">{lesson.duration_minutes} min</span>
                  <Link
                    href={`/admin/lessons/${lesson.id}`}
                    className="button-secondary text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
