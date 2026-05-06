"use client";

import { useActionState } from "react";
import { createAnnouncement, deleteAnnouncement } from "@/app/admin/actions";

type Announcement = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export default function AnnouncementsClient({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [state, formAction, isPending] = useActionState(createAnnouncement, null);

  return (
    <div className="space-y-6">
      <section className="top-panel">
        <p className="eyebrow">Announcements</p>
        <h1 className="display-font mt-4 text-4xl text-[var(--soy-brown-900)]">Member announcements</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
          Announcements appear at the top of the member dashboard. Keep them brief and timely.
        </p>
      </section>

      {/* Create form */}
      <section className="top-panel">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Post new announcement</p>
        <form action={formAction} className="mt-5 space-y-4">
          {state?.error && (
            <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          )}
          <div>
            <label
              htmlFor="title"
              className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
            >
              Title <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              placeholder="New workshop dates announced"
              className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
            >
              Body <span className="ml-1 text-red-500">*</span>
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={3}
              placeholder="The full announcement message shown to members…"
              className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="button-primary warm disabled:opacity-60"
            >
              {isPending ? "Posting…" : "Post announcement"}
            </button>
          </div>
        </form>
      </section>

      {/* Existing announcements */}
      {announcements.length > 0 && (
        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
            Active announcements
          </p>
          <div className="mt-4 grid gap-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="paper-card flex items-start justify-between gap-4 p-4"
              >
                <div>
                  <h3 className="font-medium text-[var(--soy-brown-900)]">{ann.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-[var(--soy-ink-soft)]">{ann.body}</p>
                  <p className="mt-2 text-xs text-[var(--soy-ink-muted)]">
                    {new Date(ann.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <form action={deleteAnnouncement.bind(null, ann.id)}>
                  <button
                    type="submit"
                    className="button-secondary text-sm text-red-600 hover:border-red-300"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
