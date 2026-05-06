"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";

interface AdminFormProps {
  action: (
    prev: { error?: string } | null,
    formData: FormData,
  ) => Promise<{ error?: string }>;
  submitLabel?: string;
  children: ReactNode;
}

export function AdminForm({
  action,
  submitLabel = "Save",
  children,
}: AdminFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {children}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="button-primary warm disabled:opacity-60"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

export function AdminField({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
  multiline,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}) {
  const inputClass =
    "mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]";
  const labelEl = (
    <label
      htmlFor={name}
      className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
    >
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );

  return (
    <div>
      {labelEl}
      {multiline ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {hint && <p className="mt-1 text-xs text-[var(--soy-ink-muted)]">{hint}</p>}
    </div>
  );
}

export function AdminCheckbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        name={name}
        value="on"
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-[var(--soy-amber-600)]"
      />
      <span className="text-sm text-[var(--soy-ink-soft)]">{label}</span>
    </label>
  );
}

export function AdminSelect({
  label,
  name,
  options,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-[0.12em] text-[var(--soy-ink-muted)]"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full rounded-[1rem] border border-[var(--soy-border)] bg-white px-4 py-3 text-sm text-[var(--soy-ink)] outline-none transition-colors focus:border-[var(--soy-amber-600)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
