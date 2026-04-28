import { createAdminClient } from "@/lib/supabase/admin";
import { toggleSubscription } from "@/app/admin/actions";
import type { Profile } from "@/types/database";

export default async function AdminUsersPage() {
  const supabase = createAdminClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (profiles as Profile[]) ?? [];
  const activeCount = rows.filter((p) => p.subscription_status === "active").length;

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Users</p>
            <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Members and roles</h1>
          </div>
          <div className="flex gap-2">
            <span className="tag">{rows.length} total</span>
            <span className="status-pill">{activeCount} active</span>
          </div>
        </div>
      </section>

      <section className="top-panel overflow-hidden p-0">
        <div className="overflow-hidden rounded-[1.4rem] border border-[rgba(61,46,32,0.08)]">
          <table className="w-full border-collapse bg-white/90 text-left text-sm">
            <thead className="bg-[var(--soy-cream-100)] text-[var(--soy-ink-soft)]">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Subscription</th>
                <th className="px-4 py-3 font-medium">Onboarded</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((profile) => (
                <tr key={profile.id} className="border-t border-[rgba(61,46,32,0.08)]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--soy-brown-900)]">{profile.name || "—"}</p>
                  </td>
                  <td className="px-4 py-3 capitalize">{profile.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        profile.subscription_status === "active" ? "status-pill" : "tag"
                      }
                    >
                      {profile.subscription_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {profile.onboarded ? (
                      <span className="status-pill">Yes</span>
                    ) : (
                      <span className="tag">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--soy-ink-muted)]">
                    {new Date(profile.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {profile.role !== "admin" && (
                      <form
                        action={toggleSubscription.bind(
                          null,
                          profile.id,
                          profile.subscription_status !== "active",
                        )}
                      >
                        <button
                          type="submit"
                          className={
                            profile.subscription_status === "active"
                              ? "button-secondary text-sm text-red-600 hover:border-red-300"
                              : "button-secondary text-sm"
                          }
                        >
                          {profile.subscription_status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
