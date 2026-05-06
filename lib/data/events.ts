import { createClient } from "@/lib/supabase/server";

export async function getPublishedEvents() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });
  return data ?? [];
}

export async function getEventBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}
