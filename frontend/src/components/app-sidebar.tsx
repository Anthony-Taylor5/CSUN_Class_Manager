
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/classrooms", label: "Classrooms" },
  { href: "/buildings", label: "Buildings" },
  { href: "/departments", label: "Departments" },
  { href: "/users", label: "Users" },
  { href: "/conflict-logs", label: "Conflict Logs" },
  { href: "/blackout-hours", label: "Blackout Hours" },
  { href: "/requests", label: "Requests" },
  { href: "/search", label: "Search" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4 sticky top-0 h-screen">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-headline font-bold text-white/90">
              CSUN Classroom Manager
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
          <div className="flex items-center gap-3 p-2">
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold text-white">Admin User</p>
              <p className="text-xs text-white/70">
                alice.j@csun.edu
              </p>
            </div>
          </div>
          <Link href="/" className="w-full text-left p-2 block">Log Out</Link>
      </div>
    </div>
  );
}
