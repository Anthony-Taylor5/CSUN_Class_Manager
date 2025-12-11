
import type { ReactNode } from 'react';
import { StudentSidebar } from '@/components/student-sidebar';

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen bg-background">
        <StudentSidebar />
        <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
      </div>
  );
}
