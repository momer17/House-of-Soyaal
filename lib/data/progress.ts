import { createClient } from "@/lib/supabase/server";

export async function getCourseProgress(userId: string, courseSlug: string) {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, modules ( id, title, order, lessons ( id, slug, title, order ) )")
    .eq("slug", courseSlug)
    .single();

  if (!course) return null;

  type LessonRow = { id: string; slug: string; title: string; order: number };
  type ModuleRow = {
    id: string;
    title: string;
    order: number;
    lessons: LessonRow[];
  };

  const allLessons = (course.modules as ModuleRow[])
    .sort((a, b) => a.order - b.order)
    .flatMap((m) =>
      (m.lessons as LessonRow[])
        .sort((a, b) => a.order - b.order)
        .map((l) => ({ ...l, moduleTitle: m.title, moduleOrder: m.order })),
    );

  if (allLessons.length === 0) return null;

  const lessonIds = allLessons.map((l) => l.id);
  const { data: progressRecords } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds);

  const completedLessonIds = new Set(
    (progressRecords ?? [])
      .filter((p) => p.completed_at)
      .map((p) => p.lesson_id),
  );

  const completedCount = completedLessonIds.size;
  const percentComplete = Math.round(
    (completedCount / allLessons.length) * 100,
  );

  const currentLesson =
    allLessons.find((l) => !completedLessonIds.has(l.id)) ??
    allLessons[allLessons.length - 1];

  return {
    completedLessons: completedCount,
    totalLessons: allLessons.length,
    percentComplete,
    currentLessonSlug: currentLesson.slug,
    currentLessonTitle: currentLesson.title,
    currentModuleTitle: currentLesson.moduleTitle,
    allLessons,
    completedLessonIds,
    progressRecords: progressRecords ?? [],
  };
}

export async function getLessonProgress(userId: string, lessonId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .single();
  return data;
}
