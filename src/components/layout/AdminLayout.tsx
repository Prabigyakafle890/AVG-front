import { useAuth } from '@/pages/auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building2, Menu, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, isPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <section className="flex min-h-screen bg-white font-sans">
      <aside
        className={clsx(
          'flex shrink-0 flex-col bg-[#0a2e3f] text-white transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tight">AVG Logo</div>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          <div
            className={clsx(
              'flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 transition-colors',
              isActive('/dashboard')
                ? 'bg-[#1e4a5e] text-white'
                : 'text-gray-300 hover:bg-[#1e4a5e] hover:text-white'
            )}
            onClick={() => navigate('/dashboard')}
          >
            <Home className="h-5 w-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3 transition-colors',
              isActive('/veterinarians')
                ? 'bg-[#1e4a5e] text-white'
                : 'text-gray-300 hover:bg-[#1e4a5e] hover:text-white'
            )}
            onClick={() => navigate('/veterinarians')}
          >
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-medium">Veterinarians & Techs</span>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-gray-100"
            title="Toggle Sidebar"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => logout()}
              disabled={isPending}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50/50 p-6">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </section>
  );
}
