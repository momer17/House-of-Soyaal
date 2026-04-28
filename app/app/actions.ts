"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveProgress(
  lessonId: string,
  positionSeconds: number,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      playback_position_seconds: positionSeconds,
      started_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" },
  );
}

export async function markLessonComplete(lessonId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
      started_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" },
  );

  revalidatePath("/app");
  revalidatePath("/app/course/foundations-of-somali-poetry");
}
