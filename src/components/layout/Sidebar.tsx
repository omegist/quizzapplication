import { useState } from 'react';
import { Brain, LayoutDashboard, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';

export type AppPage = 'dashboard' | 'profile' | 'quiz';

interface SidebarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile' as const, label: 'Profile', icon: UserIcon },
  ];

  function handleNav(page: AppPage) {
    onNavigate(page);
    setMobileOpen(false);
  }

  async function handleSignOut() {
    setSignOutError('');
    const { error } = await signOut();
    if (error) setSignOutError(error);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Brain size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Quizly</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-brand-100/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User + Sign out */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 text-sm font-semibold text-white">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">{user?.name}</div>
            <div className="truncate text-xs text-brand-100/50">{user?.email}</div>
          </div>
        </div>
        {signOutError && <p className="px-3 py-2 text-xs text-red-300">{signOutError}</p>}
        <button
          onClick={handleSignOut}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-100/60 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-brand-950">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-brand-950 px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Brain size={20} />
          </div>
          <span className="text-lg font-bold">Quizly</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 hover:bg-white/10 transition-colors"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 bg-brand-950 animate-slide-up">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-brand-100/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
