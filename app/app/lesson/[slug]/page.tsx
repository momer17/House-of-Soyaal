import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/soyaal/lesson-player";
import { getLessonBySlug, getLessonSequence } from "@/lib/data/lessons";
import { getLessonProgress } from "@/lib/data/progress";
import { requireMember } from "@/lib/session";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireMember();
  const { slug } = await params;

  const [lesson, sequence] = await Promise.all([
    getLessonBySlug(slug),
    getLessonSequence(slug),
  ]);

  if (!lesson || !sequence) {
    notFound();
  }

  type ModuleWithCourse = {
    title: string;
    order: number;
    courses: { title: string; slug: string };
  };

  const moduleData = lesson.modules as ModuleWithCourse | null;
  const courseTitle = moduleData?.courses?.title ?? "Foundations of Somali Poetry";
  const moduleTitle = moduleData?.title ?? "";

  // Get the user's existing progress for this lesson
  const existingProgress = await getLessonProgress(session.id, lesson.id);
  const initialPositionSeconds = existingProgress?.playback_position_seconds ?? 0;
  const initialCompleted = !!existingProgress?.completed_at;

  type LessonResource = {
    id: string;
    title: string;
    type: "PDF" | "Transcript" | "Worksheet" | "Link";
    href: string | null;
    storage_path: string | null;
    description: string;
    order: number;
  };

  const resources = ((lesson.lesson_resources as LessonResource[]) ?? []).sort(
    (a, b) => a.order - b.order,
  );

  return (
    <LessonPlayer
      courseTitle={courseTitle}
      moduleTitle={moduleTitle}
      lessonId={lesson.id}
      lesson={{
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        order: lesson.order,
        durationMinutes: lesson.duration_minutes,
        summary: lesson.summary,
        transcriptExcerpt: lesson.transcript,
        notesSummary: lesson.notes_summary,
        captions: lesson.captions,
        muxPlaybackId: lesson.mux_playback_id ?? undefined,
        resources: resources.map((r) => ({
          title: r.title,
          type: r.type,
          href: r.href ?? r.storage_path ?? "#",
          description: r.description,
        })),
      }}
      initialPositionSeconds={initialPositionSeconds}
      initialCompleted={initialCompleted}
      previousLessonSlug={sequence.previous?.slug}
      nextLessonSlug={sequence.next?.slug}
    />
  );
}
