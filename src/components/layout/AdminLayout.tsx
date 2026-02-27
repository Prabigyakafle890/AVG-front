import { useAuth } from '@/pages/auth/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Building2, Users, Menu, LogOut } from 'lucide-react';

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
    <section className="flex min-h-screen font-sans">
      <aside
        className={clsx(
          'fixed top-0 left-0 z-20 flex h-screen flex-col bg-[#354a71] transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <div className="p-6">
          <img src="/images/logo.png" alt="AVG Logo" className="h-10 w-auto" />
        </div>
        <nav className="flex-1 space-y-1 px-4">
          <div
            className={clsx(
              'flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3.5 transition-colors',
              isActive('/dashboard')
                ? 'bg-[#e70b04] font-semibold text-white'
                : 'text-white/70 hover:bg-[#53354A] hover:text-white'
            )}
            onClick={() => navigate('/dashboard')}
          >
            <Home className="h-8 w-6" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3.5 transition-colors',
              isActive('/veterinarians')
                ? 'bg-[#e70b04] font-semibold text-white'
                : 'text-white/70 hover:bg-[#53354A] hover:text-white'
            )}
            onClick={() => navigate('/veterinarians')}
          >
            <Building2 className="h-8 w-6" />
            <span className="text-sm font-medium">Veterinarians & Techs</span>
          </div>
          <div
            className={clsx(
              'flex cursor-pointer items-center space-x-3 rounded-lg px-4 py-3.5 transition-colors',
              isActive('/clinics')
                ? 'bg-[#e70b04] font-semibold text-white'
                : 'text-white/70 hover:bg-[#53354A] hover:text-white'
            )}
            onClick={() => navigate('/Accounts')}
          >
            <Users className="h-8 w-6" />
            <span className="text-sm font-medium">Accounts</span>
          </div>
        </nav>
      </aside>
      <div
        className={clsx(
          'flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'ml-64' : 'ml-0'
        )}
      >
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

        <main className="flex-1 overflow-auto bg-[#F4F4F4] p-6">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </section>
  );
}
