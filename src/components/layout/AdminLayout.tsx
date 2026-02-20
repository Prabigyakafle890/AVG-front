import { useAuth } from '@/pages/auth/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import clsx from 'clsx';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, isPending } = useAuth();
  const user = useAuthStore((state) => state.user);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <section className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col bg-[#1a4a5e] text-white transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Recruitment</h2>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          <div className="rounded-lg bg-white/10 px-4 py-2 font-medium">
            Dashboard
          </div>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            title="Toggle Sidebar"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-800">
                {user?.firstName || user?.username || 'User'}
              </span>
              <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                Administrator
              </span>
            </div>
            <button
              onClick={() => logout()}
              disabled={isPending}
              className="rounded-lg px-4 py-2 text-sm font-bold text-red-600 transition-all hover:bg-red-50 active:scale-95 disabled:opacity-50"
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </section>
  );
}
