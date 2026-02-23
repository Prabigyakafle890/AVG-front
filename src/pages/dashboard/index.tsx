import { AdminLayout } from '@/components';
import { useDashboard } from '@/hooks/useDashboard';

export default function Dashboard() {
  const { stats, breakdown, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-12">
          <div className="h-8 w-96 animate-pulse rounded bg-gray-200" />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
          <div className="space-y-6">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="py-12 text-center">
          <p className="text-red-600">Failed to load dashboard</p>
        </div>
      </AdminLayout>
    );
  }

  if (!stats || !breakdown) return null;

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Overview of veterinary professionals across all states
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          <StatCard
            title="Total Candidates"
            value={stats.totalCandidates.toLocaleString()}
          />
          <StatCard
            title="Veterinarians"
            value={stats.totalVets.toLocaleString()}
          />
          <StatCard
            title="Vet Techs"
            value={stats.totalTechs.toLocaleString()}
          />
        </div>

        {/* Breakdown Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">
            Breakdown by State
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {breakdown.map((item) => (
              <StateCard
                key={item.state}
                state={item.state}
                total={item.total.toLocaleString()}
                vets={item.veterinarians.toLocaleString()}
                techs={item.vet_techs.toLocaleString()}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="box-border flex h-full min-h-30 w-full min-w-0 flex-col justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="text-base font-medium text-gray-600">{title}</div>
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function StateCard({
  state,
  total,
  vets,
  techs,
}: {
  state: string;
  total: string;
  vets: string;
  techs: string;
}) {
  return (
    <div className="box-border flex h-full min-h-25 w-full min-w-0 flex-col justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">{state}</span>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Veterinarians:</span>
          <span className="font-semibold text-gray-900">{vets}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vet Techs:</span>
          <span className="font-semibold text-gray-900">{techs}</span>
        </div>
      </div>
    </div>
  );
}
