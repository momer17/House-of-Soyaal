import { createClient } from "@/lib/supabase/server";

export async function getFlagshipCourse() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select(
      `*, modules ( *, lessons ( *, lesson_resources (*) ) )`,
    )
    .eq("slug", "foundations-of-somali-poetry")
    .eq("published", true)
    .single();
  return data;
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select(
      `*, modules ( *, lessons ( *, lesson_resources (*) ) )`,
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}
