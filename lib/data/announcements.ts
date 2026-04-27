import { createClient } from "@/lib/supabase/server";

export async function getPublishedAnnouncements() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return data ?? [];
}
