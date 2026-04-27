import { allLessons } from "@/lib/site-data";

export default function AdminLessonsPage() {
  return (
    <div className="top-panel">
      <p className="eyebrow">Lessons</p>
      <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Lesson uploads and resources</h1>
      <div className="mt-6 grid gap-3">
        {allLessons.map((lesson) => (
          <div key={lesson.id} className="paper-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">{lesson.moduleTitle}</p>
                <h2 className="mt-1 font-medium text-[var(--soy-brown-900)]">{lesson.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  Ready for Mux asset linkage, captions, transcript text, and downloadable notes.
                </p>
              </div>
              <span className="tag">{lesson.resources.length} resources</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
