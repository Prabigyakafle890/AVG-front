import { useAuth } from '@/pages/auth/hooks/useAuth';

import clsx from 'clsx';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, isPending } = useAuth();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <section className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col bg-[#0a2e3f] text-white transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tight">AVG Logo</div>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          <div className="flex items-center space-x-3 rounded-lg bg-[#1e4a5e] px-4 py-3">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-[#1e4a5e] hover:text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-sm font-medium">Veterinarians & Techs</span>
          </div>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            title="Toggle Sidebar"
          >
            <svg
              className="h-5 w-5 text-gray-500"
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

          <div className="flex items-center space-x-4">
            <button
              onClick={() => logout()}
              disabled={isPending}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {isPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-white p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </section>
  );
}
