"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  label?: string;
  className?: string;
}

export function CheckoutButton({
  label = "Join as a member · £19/month",
  className = "button-primary warm w-full",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        // If unauthorized, redirect to sign in
        if (response.status === 401) {
          window.location.href = "/signin?next=pricing";
          return;
        }
        throw new Error(data.error ?? "Something went wrong");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className={className}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error && (
        <p className="text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
