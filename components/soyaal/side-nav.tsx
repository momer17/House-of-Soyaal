"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface SideNavItem {
  href: string;
  label: string;
  shortLabel: string;
}

export function SideNav({ items }: { items: SideNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2">
      {items.map((item) => {
        const active =
          item.href === "/app" || item.href === "/admin"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link key={item.href} className={cn("sidebar-link", active && "active")} href={item.href}>
            <span className="tag !px-3 !py-1.5">{item.shortLabel}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
