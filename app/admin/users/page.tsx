import { seedUsers } from "@/lib/site-data";

export default function AdminUsersPage() {
  return (
    <div className="top-panel">
      <p className="eyebrow">Users</p>
      <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Members and roles</h1>
      <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[rgba(61,46,32,0.08)]">
        <table className="w-full border-collapse bg-white/90 text-left text-sm">
          <thead className="bg-[var(--soy-cream-100)] text-[var(--soy-ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Subscription</th>
            </tr>
          </thead>
          <tbody>
            {seedUsers.map((user) => (
              <tr key={`${user.name}-${user.role}`} className="border-t border-[rgba(61,46,32,0.08)]">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 capitalize">{user.subscriptionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
