import type { ReactNode } from 'react';
import { Sidebar, type AppPage } from './Sidebar';

interface AppLayoutProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  children: ReactNode;
}

export function AppLayout({ currentPage, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
