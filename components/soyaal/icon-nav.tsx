"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface IconNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
}

export function IconNav({ items }: { items: IconNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            aria-label={item.label}
            className={cn("sidebar-icon-link", active && "active")}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}
