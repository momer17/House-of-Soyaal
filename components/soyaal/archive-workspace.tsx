"use client";

import { useEffect, useMemo, useState } from "react";
import type { ArchiveItem } from "@/lib/site-data";

interface Annotation {
  passage: string;
  label: string;
  note: string;
}

function getStorageKey(slug: string) {
  return `soyaal:archive:${slug}`;
}

export function ArchiveWorkspace({ item }: { item: ArchiveItem }) {
  const [selectedPassage, setSelectedPassage] = useState(item.passages[0] ?? "");
  const [label, setLabel] = useState("Theme");
  const [note, setNote] = useState("");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(getStorageKey(item.slug));
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Annotation[];
      setAnnotations(Array.isArray(parsed) ? parsed : []);
    } catch {
      window.localStorage.removeItem(getStorageKey(item.slug));
    }
  }, [item.slug]);

  useEffect(() => {
    window.localStorage.setItem(getStorageKey(item.slug), JSON.stringify(annotations));
  }, [annotations, item.slug]);

  const canSave = selectedPassage.trim() !== "" && note.trim() !== "";
  const savedCount = useMemo(() => annotations.length, [annotations.length]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_minmax(0,0.9fr)]">
      <section className="pdf-sheet p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Member reading workspace</p>
            <h1 className="display-font mt-2 text-4xl text-[var(--soy-brown-900)]">{item.title}</h1>
          </div>
          <div className="tag">{item.pdfName}</div>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--soy-ink-soft)]">{item.editorialNote}</p>

        <div className="mt-6 grid gap-4">
          {item.passages.map((passage, index) => {
            const isSelected = selectedPassage === passage;
            return (
              <button
                key={passage}
                type="button"
                onClick={() => setSelectedPassage(passage)}
                className={`rounded-[1.4rem] border p-5 text-left transition ${
                  isSelected
                    ? "border-[var(--soy-amber-500)] bg-[rgba(193,127,62,0.08)]"
                    : "border-[rgba(61,46,32,0.08)] bg-white/88"
                }`}
              >
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Page {index + 1}</div>
                <p className="mt-3 display-font text-2xl leading-10 text-[var(--soy-brown-900)]">“{passage}”</p>
                <p className="mt-4 text-sm leading-7 text-[var(--soy-ink-soft)]">
                  Click a passage to simulate highlighting it in the in-browser PDF reader.
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="top-panel">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Highlight and label</p>
          <div className="mt-4 rounded-[1.3rem] bg-[var(--soy-cream-100)] p-4">
            <p className="text-sm leading-7 text-[var(--soy-ink-soft)]">{selectedPassage}</p>
          </div>
          <div className="mt-4 grid gap-3">
            <label className="text-sm text-[var(--soy-ink-soft)]">
              Label
              <select
                className="mt-2 w-full rounded-[1rem] border border-[rgba(61,46,32,0.14)] bg-white px-4 py-3"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              >
                {["Theme", "Image", "Performance", "Question", "Metaphor"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-[var(--soy-ink-soft)]">
              Note
              <textarea
                className="mt-2 min-h-32 w-full rounded-[1rem] border border-[rgba(61,46,32,0.14)] bg-white px-4 py-3 outline-none"
                placeholder="Save a short reflection tied to this passage."
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
          </div>
          <button
            className="button-primary warm mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={!canSave}
            onClick={() => {
              if (!canSave) {
                return;
              }

              setAnnotations((current) => [{ passage: selectedPassage, label, note: note.trim() }, ...current]);
              setNote("");
            }}
          >
            Save to reading notes
          </button>
        </section>

        <section className="top-panel">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--soy-ink-muted)]">Saved notes</p>
            <span className="status-pill">{savedCount} saved</span>
          </div>
          <div className="mt-4 space-y-3">
            {annotations.length === 0 ? (
              <p className="text-sm leading-7 text-[var(--soy-ink-soft)]">
                No saved notes yet. Select a passage, add a label, and write a short note to persist it in this browser.
              </p>
            ) : (
              annotations.map((annotation, index) => (
                <div key={`${annotation.passage}-${index}`} className="paper-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="tag">{annotation.label}</span>
                    <button
                      className="text-sm text-[var(--soy-ink-muted)]"
                      type="button"
                      onClick={() =>
                        setAnnotations((current) => current.filter((_, annotationIndex) => annotationIndex !== index))
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--soy-ink-soft)]">{annotation.passage}</p>
                  <p className="mt-3 rounded-[1rem] bg-[var(--soy-cream-100)] px-4 py-3 text-sm leading-7 text-[var(--soy-ink)]">
                    {annotation.note}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}
