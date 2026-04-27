import Link from "next/link";
import { PublicShell } from "@/components/soyaal/public-shell";

export default function ConfirmEmailPage() {
  return (
    <PublicShell footer={false}>
      <div className="section-space">
        <div className="content-narrow px-4">
          <div className="editorial-card p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--soy-green-100)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--soy-green-700)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="eyebrow justify-center">Account created</p>
            <h1 className="section-title mt-4">Check your inbox</h1>
            <p className="section-subtitle mx-auto mt-4 text-center">
              We sent a confirmation link to your email. Click it to verify your address,
              then you&apos;ll be taken to choose your membership.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signin" className="button-secondary text-sm">
                Back to sign in
              </Link>
              <Link href="/pricing" className="button-primary warm text-sm">
                View membership options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
