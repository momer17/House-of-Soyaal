import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type ViewerRole = "guest" | "member" | "admin";

export interface ViewerSession {
  id: string;
  role: ViewerRole;
  name: string;
  onboarded: boolean;
  subscriptionActive: boolean;
}

export async function getViewerSession(): Promise<ViewerSession> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      id: "",
      role: "guest",
      name: "Guest",
      onboarded: false,
      subscriptionActive: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role, subscription_status, onboarded")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return {
      id: user.id,
      role: "guest",
      name: "Guest",
      onboarded: false,
      subscriptionActive: false,
    };
  }

  return {
    id: user.id,
    role: profile.role as ViewerRole,
    name: profile.name,
    onboarded: profile.onboarded,
    subscriptionActive:
      profile.subscription_status === "active" || profile.role === "admin",
  };
}

export async function requireMember(): Promise<ViewerSession> {
  const session = await getViewerSession();
  if (session.role === "guest" || !session.subscriptionActive) {
    redirect("/signin");
  }
  return session;
}

export async function requireAdmin(): Promise<ViewerSession> {
  const session = await getViewerSession();
  if (session.role !== "admin") {
    redirect("/app");
  }
  return session;
}
