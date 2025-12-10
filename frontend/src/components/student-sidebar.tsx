
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/student/schedule", label: "Schedule" },
  { href: "/student/search", label: "Search" },
  { href: "/student/classrooms", label: "Classrooms" },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4 sticky top-0 h-screen">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-headline font-bold text-white/90">
              CSUN
            </h2>
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`block p-2 rounded ${pathname.startsWith(item.href) ? 'bg-gray-700' : ''}`}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <Link href="/" className="w-full text-left p-2 block">Log Out</Link>
      </div>
    </div>
  );
}
