import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*, modules ( id, title, order, lessons ( id ) )")
    .order("created_at", { ascending: false });

  type ModuleWithLessons = { id: string; title: string; order: number; lessons: { id: string }[] };
  type CourseRow = {
    id: string;
    slug: string;
    title: string;
    published: boolean;
    modules: ModuleWithLessons[];
  };

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Courses</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Course publishing</h1>
          </div>
          <Link href="/admin/courses/new" className="button-primary warm text-sm">
            New course
          </Link>
        </div>
      </section>

      {(courses as CourseRow[])?.map((course) => {
        const sortedModules = [...course.modules].sort((a, b) => a.order - b.order);
        const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

        return (
          <section key={course.id} className="top-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="display-font text-3xl text-[var(--soy-brown-900)]">{course.title}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="tag">{totalLessons} lessons</span>
                  <span className={course.published ? "status-pill" : "tag"}>
                    {course.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <Link
                href={`/admin/courses/${course.id}`}
                className="button-secondary text-sm"
              >
                Edit
              </Link>
            </div>
            <div className="mt-5 grid gap-3">
              {sortedModules.map((module) => (
                <div key={module.id} className="paper-card p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
                        Module {module.order}
                      </p>
                      <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{module.title}</h3>
                    </div>
                    <span className="tag">{module.lessons.length} lessons</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
