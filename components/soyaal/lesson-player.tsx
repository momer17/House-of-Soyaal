"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProgressBar } from "@/components/soyaal/progress-bar";
import type { Lesson } from "@/lib/site-data";

type TabId = "notes" | "transcript" | "resources";

interface LessonPlayerProps {
  courseTitle: string;
  moduleTitle: string;
  lesson: Lesson;
  previousLessonSlug?: string;
  nextLessonSlug?: string;
}

interface StoredLessonState {
  positionSeconds: number;
  completed: boolean;
}

function getStorageKey(slug: string) {
  return `soyaal:lesson:${slug}`;
}

export function LessonPlayer({
  courseTitle,
  moduleTitle,
  lesson,
  previousLessonSlug,
  nextLessonSlug,
}: LessonPlayerProps) {
  const totalSeconds = lesson.durationMinutes * 60;
  const [activeTab, setActiveTab] = useState<TabId>("notes");
  const [playing, setPlaying] = useState(false);
  const [positionSeconds, setPositionSeconds] = useState(Math.round(totalSeconds * 0.34));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(getStorageKey(lesson.slug));
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as StoredLessonState;
      setPositionSeconds(parsed.positionSeconds ?? Math.round(totalSeconds * 0.34));
      setCompleted(Boolean(parsed.completed));
    } catch {
      window.localStorage.removeItem(getStorageKey(lesson.slug));
    }
  }, [lesson.slug, totalSeconds]);

  useEffect(() => {
    const payload: StoredLessonState = {
      positionSeconds,
      completed,
    };
    window.localStorage.setItem(getStorageKey(lesson.slug), JSON.stringify(payload));
  }, [completed, lesson.slug, positionSeconds]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setPositionSeconds((current) => {
        if (current >= totalSeconds) {
          setPlaying(false);
          setCompleted(true);
          return totalSeconds;
        }

        return Math.min(current + 5, totalSeconds);
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing, totalSeconds]);

  const percent = useMemo(() => Math.round((positionSeconds / totalSeconds) * 100), [positionSeconds, totalSeconds]);
  const currentTime = useMemo(() => formatDuration(positionSeconds), [positionSeconds]);
  const totalTime = useMemo(() => formatDuration(totalSeconds), [totalSeconds]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.55fr_minmax(0,0.95fr)]">
      <div className="space-y-5">
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

            <div className="relative z-10 mt-8">
              <button
                className="button-primary warm min-w-[10rem]"
                type="button"
                onClick={() => setPlaying((value) => !value)}
              >
                {playing ? "Pause" : percent > 0 ? "Resume lesson" : "Start lesson"}
              </button>

              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-black/10 p-5">
                <div className="mb-4 flex items-center justify-between text-sm text-white/74">
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
                  onChange={(event) => setPositionSeconds(Number(event.target.value))}
                />
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/72">
                  <button className="button-secondary bg-white/10 text-white" type="button" onClick={() => setPositionSeconds((value) => Math.max(0, value - 15))}>
                    -15 sec
                  </button>
                  <button className="button-secondary bg-white/10 text-white" type="button" onClick={() => setPositionSeconds((value) => Math.min(totalSeconds, value + 30))}>
                    +30 sec
                  </button>
                  <span className="tag !bg-white/10 !text-white">Captions: {lesson.captions.join(" / ")}</span>
                  <span className="tag !bg-white/10 !text-white">Auto-resume enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="top-panel">
          <div className="flex flex-wrap gap-3">
            {(["notes", "transcript", "resources"] as TabId[]).map((tab) => (
              <button
                key={tab}
                className={tab === activeTab ? "button-primary warm text-sm" : "button-secondary text-sm"}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab === "notes" ? "Lesson notes" : tab === "transcript" ? "Transcript" : "Resources"}
              </button>
            ))}
          </div>

          {activeTab === "notes" ? (
            <div className="mt-5 rounded-[1.4rem] border border-[rgba(61,46,32,0.08)] bg-[var(--soy-cream-100)] p-5">
              <p className="text-sm leading-8 text-[var(--soy-ink-soft)]">{lesson.notesSummary}</p>
              <textarea
                className="mt-5 min-h-40 w-full rounded-[1.2rem] border border-[rgba(61,46,32,0.12)] bg-white px-4 py-4 text-sm text-[var(--soy-ink)] outline-none"
                defaultValue="Use this area for personal lesson notes. This pilot keeps notes lightweight and lesson-specific."
              />
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]">Personal lesson notes stay local in this demo scaffold.</p>
            </div>
          ) : null}

          {activeTab === "transcript" ? (
            <div className="mt-5 rounded-[1.4rem] border border-[rgba(61,46,32,0.08)] bg-[var(--soy-cream-100)] p-5">
              <p className="text-sm leading-8 text-[var(--soy-ink-soft)]">{lesson.transcriptExcerpt}</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
                <p>The transcript panel is ready for full text once lessons are connected to a CMS upload flow.</p>
                <p>Captions are surfaced separately in the player so multilingual support stays visible during playback.</p>
              </div>
            </div>
          ) : null}

          {activeTab === "resources" ? (
            <div className="mt-5 grid gap-3">
              {lesson.resources.map((resource) => (
                <a
                  key={resource.title}
                  className="paper-card flex items-center justify-between gap-4 p-5"
                  href={resource.href}
                  target={resource.type === "Link" ? "_blank" : undefined}
                  rel={resource.type === "Link" ? "noreferrer" : undefined}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]">{resource.type}</p>
                    <h3 className="mt-1 font-medium text-[var(--soy-brown-900)]">{resource.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--soy-ink-soft)]">{resource.description}</p>
                  </div>
                  <span className="button-secondary text-sm">{resource.type === "Link" ? "Open link" : "Download"}</span>
                </a>
              ))}
            </div>
          ) : null}
        </section>
      </div>

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
          <button className="button-primary warm mt-5 w-full" type="button" onClick={() => setCompleted(true)}>
            Mark complete
          </button>
        </section>

        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Lesson flow</p>
          <div className="mt-4 grid gap-3">
            {previousLessonSlug ? (
              <Link className="button-secondary justify-between text-sm" href={`/app/lesson/${previousLessonSlug}`}>
                Previous lesson
                <span>Open</span>
              </Link>
            ) : null}
            {nextLessonSlug ? (
              <Link className="button-primary warm justify-between text-sm" href={`/app/lesson/${nextLessonSlug}`}>
                Next lesson
                <span>Continue</span>
              </Link>
            ) : null}
          </div>
        </section>

        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member guidance</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soy-ink-soft)]">
            <li>Playback position saves automatically in this demo and resumes when you return.</li>
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
