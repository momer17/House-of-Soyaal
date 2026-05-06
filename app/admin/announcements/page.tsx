import { createClient } from "@/lib/supabase/server";
import AnnouncementsClient from "./client";

type AnnouncementRow = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  return <AnnouncementsClient announcements={(announcements as AnnouncementRow[]) ?? []} />;
}
