"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { mux } from "@/lib/mux";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ─── Guard: admin only ────────────────────────────────────────────────────────

async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") redirect("/app");

  return { supabase, user };
}

// ─── Courses ─────────────────────────────────────────────────────────────────

const courseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().default(""),
  hero_quote: z.string().default(""),
  description: z.string().default(""),
  published: z
    .string()
    .optional()
    .transform((v) => v === "on"),
});

export async function createCourse(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = courseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("courses").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

export async function updateCourse(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = courseSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("courses").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

// ─── Lessons ─────────────────────────────────────────────────────────────────

const lessonSchema = z.object({
  module_id: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  order: z.coerce.number().int().min(1),
  duration_minutes: z.coerce.number().int().min(0).default(0),
  summary: z.string().default(""),
  transcript: z.string().default(""),
  notes_summary: z.string().default(""),
  mux_playback_id: z.string().optional().nullable(),
  mux_asset_id: z.string().optional().nullable(),
  published: z
    .string()
    .optional()
    .transform((v) => v === "on"),
});

export async function createLesson(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const captionsRaw = formData.get("captions") as string;
  const captions = captionsRaw
    ? captionsRaw.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  const parsed = lessonSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase
    .from("lessons")
    .insert({ ...parsed.data, captions });
  if (error) return { error: error.message };

  revalidatePath("/admin/lessons");
  redirect("/admin/lessons");
}

export async function updateLesson(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();

  const captionsRaw = formData.get("captions") as string | null;
  const captions = captionsRaw
    ? captionsRaw.split(",").map((c) => c.trim()).filter(Boolean)
    : undefined;

  const parsed = lessonSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase
    .from("lessons")
    .update(captions !== undefined ? { ...parsed.data, captions } : parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/lessons");
  redirect("/admin/lessons");
}

export async function deleteLesson(id: string): Promise<void> {
  await requireAdminUser();
  const supabase = createAdminClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("mux_asset_id")
    .eq("id", id)
    .single();

  if (lesson?.mux_asset_id) {
    try {
      await mux.video.assets.delete(lesson.mux_asset_id);
    } catch {
      /* ignore Mux errors — delete the DB record regardless */
    }
  }

  await supabase.from("lessons").delete().eq("id", id);
  revalidatePath("/admin/lessons");
}

// ─── Events ──────────────────────────────────────────────────────────────────

const eventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().default(""),
  format: z.enum(["Online workshop", "Online seminar", "In-person session"]),
  datetime_label: z.string().default(""),
  location_label: z.string().default(""),
  seats_label: z.string().default(""),
  price_label: z.string().default(""),
  eventbrite_url: z.string().default(""),
  published: z
    .string()
    .optional()
    .transform((v) => v === "on"),
});

export async function createEvent(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = eventSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("events").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = eventSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const { error } = await supabase.from("events").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string): Promise<void> {
  const { supabase } = await requireAdminUser();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/events");
}

// ─── Archive items ────────────────────────────────────────────────────────────

const archiveSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  poet: z.string().default(""),
  era: z.string().default(""),
  description: z.string().default(""),
  preview: z.string().default(""),
  editorial_note: z.string().default(""),
  access: z.enum(["public", "members"]).default("members"),
  published: z
    .string()
    .optional()
    .transform((v) => v === "on"),
});

export async function createArchiveItem(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = archiveSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const passagesRaw = formData.get("passages") as string;
  const passages = passagesRaw
    ? passagesRaw.split("\n").map((p) => p.trim()).filter(Boolean)
    : [];

  const { error } = await supabase
    .from("archive_items")
    .insert({ ...parsed.data, tags, passages });
  if (error) return { error: error.message };

  revalidatePath("/admin/archive");
  redirect("/admin/archive");
}

export async function updateArchiveItem(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const parsed = archiveSchema.partial().safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.errors[0].message };

  const tagsRaw = formData.get("tags") as string | null;
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : undefined;

  const passagesRaw = formData.get("passages") as string | null;
  const passages = passagesRaw
    ? passagesRaw.split("\n").map((p) => p.trim()).filter(Boolean)
    : undefined;

  const { error } = await supabase
    .from("archive_items")
    .update({
      ...parsed.data,
      ...(tags !== undefined && { tags }),
      ...(passages !== undefined && { passages }),
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/archive");
  redirect("/admin/archive");
}

// ─── Announcements ────────────────────────────────────────────────────────────

export async function createAnnouncement(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const { supabase } = await requireAdminUser();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  if (!title || !body) return { error: "Title and body are required." };

  const { error } = await supabase.from("announcements").insert({ title, body });
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/app");
  return {};
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { supabase } = await requireAdminUser();
  await supabase.from("announcements").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/app");
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function toggleSubscription(
  userId: string,
  active: boolean,
): Promise<void> {
  await requireAdminUser();
  const supabase = createAdminClient();
  await supabase
    .from("profiles")
    .update({ subscription_status: active ? "active" : "inactive" })
    .eq("id", userId);
  revalidatePath("/admin/users");
}
