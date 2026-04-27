import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ViewerRole } from "@/lib/site-data";

export interface ViewerSession {
  role: ViewerRole;
  name: string;
  onboarded: boolean;
  subscriptionActive: boolean;
}

const ROLE_COOKIE = "house_of_soyaal_role";
const NAME_COOKIE = "house_of_soyaal_name";
const ONBOARD_COOKIE = "house_of_soyaal_onboarded";

export async function getViewerSession(): Promise<ViewerSession> {
  const cookieStore = await cookies();
  const roleValue = cookieStore.get(ROLE_COOKIE)?.value;
  const role: ViewerRole =
    roleValue === "member" || roleValue === "admin" ? roleValue : "guest";

  return {
    role,
    name:
      cookieStore.get(NAME_COOKIE)?.value ??
      (role === "admin" ? "Admin" : role === "member" ? "Asha" : "Guest"),
    onboarded: cookieStore.get(ONBOARD_COOKIE)?.value !== "0",
    subscriptionActive: role === "member" || role === "admin",
  };
}

export async function requireMember() {
  const session = await getViewerSession();

  if (session.role === "guest") {
    redirect("/signin");
  }

  return session;
}

export async function requireAdmin() {
  const session = await getViewerSession();

  if (session.role !== "admin") {
    redirect("/signin");
  }

  return session;
}
