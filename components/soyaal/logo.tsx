import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ href = "/", light = false }: { href?: string; light?: boolean }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3">
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-2xl border",
          light
            ? "border-white/15 bg-white/10 text-white"
            : "border-[rgba(61,46,32,0.1)] bg-[var(--soy-brown-900)] text-[var(--soy-cream-100)]",
        )}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <polygon
            points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6"
            fill="currentColor"
            opacity="0.92"
          />
        </svg>
      </span>
      <span className={cn("display-font text-lg tracking-[-0.02em]", light ? "text-white" : "text-[var(--soy-brown-900)]")}>
        House of Soyaal
      </span>
    </Link>
  );
}
