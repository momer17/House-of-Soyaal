import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session so it doesn't expire mid-visit
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Protect /app/* ─────────────────────────────────────────────────────────
  if (request.nextUrl.pathname.startsWith("/app")) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, role")
      .eq("id", user.id)
      .single();

    const isSubscribed =
      profile?.subscription_status === "active" || profile?.role === "admin";

    if (!isSubscribed) {
      return NextResponse.redirect(
        new URL("/pricing?reason=subscribe", request.url),
      );
    }
  }

  // ── Protect /admin/* ───────────────────────────────────────────────────────
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, icons, apple-icon
     * - public image files
     */
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
