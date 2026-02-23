import { AdminLayout } from '@/components';
import { useDashboard } from './hooks/useDashboard';
import { DashboardSkeleton, StatCard, StateCard } from './components';

export default function Dashboard() {
  const { overviewData, breakdownData, isLoading } = useDashboard();

  console.log('overviewData', overviewData);
  console.log('breakdown', breakdownData);

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
            value={overviewData?.totalCandidates.toLocaleString() ?? '0'}
          />
          <StatCard
            title="Veterinarians"
            value={overviewData?.totalVeterinarians.toLocaleString() ?? '0'}
          />
          <StatCard
            title="Vet Techs"
            value={overviewData?.totalVetTechnicians.toLocaleString() ?? '0'}
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">
            Breakdown by State
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {(breakdownData?.stateBreakdown ?? []).map((item) => (
              <StateCard
                key={item.state}
                state={item.state}
                total={(item.totalCandidates ?? 0).toLocaleString()}
                vets={(item.totalVeterinarians ?? 0).toLocaleString()}
                techs={(item.totalVetTechnicians ?? 0).toLocaleString()}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
