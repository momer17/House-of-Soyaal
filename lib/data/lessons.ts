import { createClient } from "@/lib/supabase/server";

export async function getLessonBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select(`*, lesson_resources (*), modules ( title, order, courses ( title, slug ) )`)
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

export async function getLessonSequence(lessonSlug: string) {
  const supabase = await createClient();

  // Get the current lesson to find its module + course
  const { data: current } = await supabase
    .from("lessons")
    .select("id, order, module_id, modules ( order, course_id )")
    .eq("slug", lessonSlug)
    .single();

  if (!current) return null;

  const moduleData = current.modules as { order: number; course_id: string } | null;
  if (!moduleData) return null;

  // Get all published lessons for this course, ordered by module then lesson
  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, slug, title, order, module_id, modules!inner ( order, course_id )")
    .eq("modules.course_id", moduleData.course_id)
    .eq("published", true);

  if (!allLessons) return null;

  type LessonWithModule = (typeof allLessons)[0] & {
    modules: { order: number; course_id: string };
  };

  const sorted = (allLessons as LessonWithModule[]).sort((a, b) => {
    const modDiff = a.modules.order - b.modules.order;
    return modDiff !== 0 ? modDiff : a.order - b.order;
  });

  const index = sorted.findIndex((l) => l.id === current.id);
  if (index === -1) return null;

  return {
    previous: index > 0 ? sorted[index - 1] : undefined,
    current: sorted[index],
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}
