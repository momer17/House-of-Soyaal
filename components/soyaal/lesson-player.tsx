"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import { saveProgress, markLessonComplete } from "@/app/app/actions";

type TabId = "notes" | "transcript" | "resources";

interface LessonResource {
  title: string;
  type: "PDF" | "Transcript" | "Worksheet" | "Link";
  href: string;
  description: string;
}

interface LessonData {
  id: string;
  slug: string;
  title: string;
  order: number;
  durationMinutes: number;
  summary: string;
  transcriptExcerpt: string;
  notesSummary: string;
  captions: string[];
  muxPlaybackId?: string;
  resources: LessonResource[];
}

interface LessonPlayerProps {
  courseTitle: string;
  moduleTitle: string;
  lessonId: string;
  lesson: LessonData;
  initialPositionSeconds?: number;
  initialCompleted?: boolean;
  previousLessonSlug?: string;
  nextLessonSlug?: string;
}

export function LessonPlayer({
  courseTitle,
  moduleTitle,
  lessonId,
  lesson,
  initialPositionSeconds = 0,
  initialCompleted = false,
  previousLessonSlug,
  nextLessonSlug,
}: LessonPlayerProps) {
  const totalSeconds = lesson.durationMinutes * 60;
  const [activeTab, setActiveTab] = useState<TabId>("notes");
  const [playing, setPlaying] = useState(false);
  const [positionSeconds, setPositionSeconds] = useState(initialPositionSeconds);
  const [completed, setCompleted] = useState(initialCompleted);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced save — fires 2s after last position change
  const debouncedSave = useCallback(
    (position: number) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveProgress(lessonId, position);
      }, 2000);
    },
    [lessonId],
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // Simulate playback advance (used when no Mux player)
  useEffect(() => {
    if (!playing || lesson.muxPlaybackId) return;

    const timer = window.setInterval(() => {
      setPositionSeconds((current) => {
        const next = Math.min(current + 5, totalSeconds);
        debouncedSave(next);
        if (next >= totalSeconds) {
          setPlaying(false);
          handleMarkComplete();
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing, lesson.muxPlaybackId, totalSeconds, debouncedSave]);

  const percent = useMemo(
    () => Math.round((positionSeconds / Math.max(totalSeconds, 1)) * 100),
    [positionSeconds, totalSeconds],
  );
  const currentTime = useMemo(() => formatDuration(positionSeconds), [positionSeconds]);
  const totalTime = useMemo(() => formatDuration(totalSeconds), [totalSeconds]);

  function handleSeek(value: number) {
    setPositionSeconds(value);
    debouncedSave(value);
  }

  async function handleMarkComplete() {
    setCompleted(true);
    await markLessonComplete(lessonId);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.55fr_minmax(0,0.95fr)]">
      <div className="space-y-5">
        {/* ── Video area ─────────────────────────────────────────────────── */}
        <section className="faux-video p-6 text-[var(--soy-cream-100)] shadow-[var(--soy-shadow)]">
          <div className="mesh-glow" />
          <div className="relative z-10 flex min-h-[22rem] flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--soy-amber-300)]">
                  {courseTitle} · {moduleTitle}
                </div>
                <h1 className="display-font mt-2 text-4xl">{lesson.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">{lesson.summary}</p>
              </div>
              <div className="tag !bg-white/10 !text-white">
                {completed ? "Marked complete" : `${lesson.durationMinutes} min lesson`}
              </div>
            </div>

            {lesson.muxPlaybackId ? (
              /* Real Mux player — rendered as a native video element wrapper */
              <div className="relative z-10 mt-6 overflow-hidden rounded-[1.4rem]">
                {/* @mux/mux-player-react is loaded only on client. Use a script-driven embed for SSR safety. */}
                <mux-player
                  playback-id={lesson.muxPlaybackId}
                  start-time={initialPositionSeconds}
                  style={{ width: "100%", aspectRatio: "16/9" }}
                  onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                    const t = Math.floor((e.target as HTMLVideoElement).currentTime);
                    setPositionSeconds(t);
                    debouncedSave(t);
                  }}
                  onEnded={() => handleMarkComplete()}
                />
              </div>
            ) : (
              /* Faux player — used before video is uploaded */
              <div className="relative z-10 mt-8">
                <button
                  className="button-primary warm min-w-[10rem]"
                  type="button"
                  onClick={() => setPlaying((v) => !v)}
                >
                  {playing ? "Pause" : percent > 0 ? "Resume lesson" : "Start lesson"}
                </button>

                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/10 p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-white/70">
                    <span>{currentTime}</span>
                    <span>{totalTime}</span>
                  </div>
                  <input
                    aria-label="Playback position"
                    className="w-full accent-[var(--soy-amber-500)]"
                    type="range"
                    min={0}
                    max={totalSeconds}
                    value={positionSeconds}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                  />
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
                    <button
                      className="button-secondary bg-white/10 text-white"
                      type="button"
                      onClick={() => handleSeek(Math.max(0, positionSeconds - 15))}
                    >
                      -15 sec
                    </button>
                    <button
                      className="button-secondary bg-white/10 text-white"
                      type="button"
                      onClick={() =>
                        handleSeek(Math.min(totalSeconds, positionSeconds + 30))
                      }
                    >
                      +30 sec
                    </button>
                    <span className="tag !bg-white/10 !text-white">
                      Captions: {lesson.captions.join(" / ")}
                    </span>
                    <span className="tag !bg-white/10 !text-white">Auto-resume enabled</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Tabs ──────────────────────────────────────────────────────── */}
        <section className="top-panel">
          <div className="flex flex-wrap gap-3">
            {(["notes", "transcript", "resources"] as TabId[]).map((tab) => (
              <button
                key={tab}
                className={
                  tab === activeTab ? "button-primary warm text-sm" : "button-secondary text-sm"
                }
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab === "notes"
                  ? "Lesson notes"
                  : tab === "transcript"
                    ? "Transcript"
                    : "Resources"}
              </button>
            ))}
          </div>

          {activeTab === "notes" && (
            <div className="mt-5 rounded-[1.4rem] border border-[rgba(61,46,32,0.08)] bg-[var(--soy-cream-100)] p-5">
              <p className="text-sm leading-8 text-[var(--soy-ink-soft)]">{lesson.notesSummary}</p>
              <textarea
                className="mt-5 min-h-40 w-full rounded-[1.2rem] border border-[rgba(61,46,32,0.12)] bg-white px-4 py-4 text-sm text-[var(--soy-ink)] outline-none focus:border-[var(--soy-amber-600)]"
                placeholder="Use this area for personal lesson notes…"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]">
                Personal notes are private to you
              </p>
            </div>
          )}

          {activeTab === "transcript" && (
            <div className="mt-5 rounded-[1.4rem] border border-[rgba(61,46,32,0.08)] bg-[var(--soy-cream-100)] p-5">
              <p className="text-sm leading-8 text-[var(--soy-ink-soft)]">{lesson.transcriptExcerpt}</p>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="mt-5 grid gap-3">
              {lesson.resources.length === 0 ? (
                <p className="text-sm text-[var(--soy-ink-muted)]">No resources attached to this lesson yet.</p>
              ) : (
                lesson.resources.map((resource) => (
                  <a
                    key={resource.title}
                    className="paper-card flex items-center justify-between gap-4 p-5"
                    href={resource.href}
                    target={resource.type === "Link" ? "_blank" : undefined}
                    rel={resource.type === "Link" ? "noreferrer" : undefined}
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]">
                        {resource.type}
                      </p>
                      <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{resource.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{resource.description}</p>
                    </div>
                    <span className="button-secondary text-sm">
                      {resource.type === "Link" ? "Open link" : "Download"}
                    </span>
                  </a>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="space-y-5">
        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Progress</p>
          <div className="mt-3">
            <ProgressBar value={percent} />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[var(--soy-ink-soft)]">
            <span>{percent}% of this lesson reviewed</span>
            <span>{completed ? "Completed" : "In progress"}</span>
          </div>
          <button
            className="button-primary warm mt-5 w-full disabled:opacity-60"
            type="button"
            disabled={completed}
            onClick={handleMarkComplete}
          >
            {completed ? "✓ Marked complete" : "Mark complete"}
          </button>
        </section>

        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Lesson flow</p>
          <div className="mt-4 grid gap-3">
            {previousLessonSlug && (
              <Link
                className="button-secondary justify-between text-sm"
                href={`/app/lesson/${previousLessonSlug}`}
              >
                Previous lesson
                <span>Open</span>
              </Link>
            )}
            {nextLessonSlug && (
              <Link
                className="button-primary warm justify-between text-sm"
                href={`/app/lesson/${nextLessonSlug}`}
              >
                Next lesson
                <span>Continue</span>
              </Link>
            )}
          </div>
        </section>

        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">
            Member guidance
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
            <li>Playback position saves automatically and resumes when you return.</li>
            <li>Flexible lesson order stays available even though the course suggests a recommended path.</li>
            <li>Archive items can be used alongside this lesson for reflection and note-making.</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
