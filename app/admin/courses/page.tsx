import { flagshipCourse } from "@/lib/site-data";

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Courses</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Course publishing</h1>
        <div className="paper-card mt-6 p-5">
          <p className="text-sm leading-8 text-[var(--soy-ink-soft)]">
            This pilot keeps the catalogue intentionally narrow. The CMS therefore exposes a single flagship course rather
            than a multi-course taxonomy.
          </p>
        </div>
      </section>

      <section className="top-panel">
        <h2 className="display-font text-3xl text-[var(--soy-brown-900)]">{flagshipCourse.title}</h2>
        <div className="mt-5 grid gap-3">
          {flagshipCourse.modules.map((module) => (
            <div key={module.id} className="paper-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Module {module.order}</p>
                  <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{module.title}</h3>
                </div>
                <span className="tag">{module.lessons.length} lessons</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
