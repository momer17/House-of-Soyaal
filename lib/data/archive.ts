import { createClient } from "@/lib/supabase/server";

export async function getPublishedArchiveItems() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("archive_items")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getPublicArchiveItems() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("archive_items")
    .select("*")
    .eq("published", true)
    .eq("access", "public")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getArchiveItemBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("archive_items")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}
