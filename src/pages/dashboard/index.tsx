import { AdminLayout } from '@/components';

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome to your Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Dashboard stats/cards placeholder */}
          <div className="flex h-32 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 font-medium text-gray-400 italic shadow-sm">
            Overview statistics coming soon...
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 font-medium text-gray-400 italic shadow-sm">
            Pending recruitment tasks...
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 font-medium text-gray-400 italic shadow-sm">
            Current applicant summary...
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
