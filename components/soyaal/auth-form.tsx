"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";

interface AuthFormProps {
  action: (
    prev: { error?: string } | null,
    formData: FormData,
  ) => Promise<{ error?: string }>;
  children: ReactNode;
  submitLabel: string;
}

export function AuthForm({ action, children, submitLabel }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      {state?.error && (
        <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {children}
      <button
        type="submit"
        disabled={isPending}
        className="button-primary warm w-full disabled:opacity-60"
      >
        {isPending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
