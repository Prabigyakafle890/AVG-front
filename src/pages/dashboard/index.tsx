import { AdminLayout } from '@/components';
import { useDashboard } from './hooks/useDashboard';
import { DashboardSkeleton, StatCard, StateCard } from './components';

export default function Dashboard() {
  const { stats, breakdown, isLoading } = useDashboard();

  console.log('status', stats);
  console.log('breakdown', breakdown);

  if (isLoading) {
    return (
      <AdminLayout>
        <DashboardSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Overview of veterinary professionals across all states
        </h1>

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
