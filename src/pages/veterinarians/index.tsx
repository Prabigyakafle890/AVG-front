import { AdminLayout } from '@/components';
import { VeterinariansTable } from './components/veterinariansTable';
import { useVetsList } from './hooks/useVetsList';
import { useState } from 'react';

export default function VeterinariansPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  const { data: vetsData, isLoading: isVetsLoading } = useVetsList(
    currentPage,
    pageSize
  );

  if (isVetsLoading) {
    return <p>Loading veterinarians...</p>;
  }
  console.log('Index', vetsData);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Veterinarians & Vet Techs
        </h1>
        <p className="mt-2 inline-block rounded-lg bg-gray-50 px-4 py-2 text-gray-600">
          Manage and track outreach to veterinary professionals
        </p>
      </div>
      <VeterinariansTable
        data={vetsData?.data.results || []}
        currentPage={currentPage}
        totalCount={vetsData?.data.count || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </AdminLayout>
  );
}
