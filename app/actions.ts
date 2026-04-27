"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ROLE_COOKIE = "house_of_soyaal_role";
const NAME_COOKIE = "house_of_soyaal_name";
const ONBOARD_COOKIE = "house_of_soyaal_onboarded";

async function setViewerCookies(role: "member" | "admin", name: string, onboarded: boolean) {
  const cookieStore = await cookies();
  cookieStore.set(ROLE_COOKIE, role, { path: "/" });
  cookieStore.set(NAME_COOKIE, name, { path: "/" });
  cookieStore.set(ONBOARD_COOKIE, onboarded ? "1" : "0", { path: "/" });
}

export async function signInAsMember() {
  await setViewerCookies("member", "Asha", true);
  redirect("/app");
}

export async function signInAsAdmin() {
  await setViewerCookies("admin", "Admin", true);
  redirect("/admin");
}

export async function signUpDemoMember() {
  await setViewerCookies("member", "Asha", false);
  redirect("/app");
}

export async function completeOnboarding() {
  const cookieStore = await cookies();
  cookieStore.set(ONBOARD_COOKIE, "1", { path: "/" });
  redirect("/app");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(ROLE_COOKIE);
  cookieStore.delete(NAME_COOKIE);
  cookieStore.delete(ONBOARD_COOKIE);
  redirect("/");
}
