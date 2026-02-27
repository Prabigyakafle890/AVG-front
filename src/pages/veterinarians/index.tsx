import { AdminLayout } from '@/components';
import { VeterinariansTable } from './components/veterinariansTable';
import { FilterBar, type FilterValues } from './components/FilterBar';
import { NotesDrawer } from './components/NotesDrawer';
import { BulkActionsBar } from './components/BulkActionsBar';
import { BulkNotesDialog } from './components/BulkNotesDialog';
import { useVetsList } from './hooks/useVetsList';
import { useState } from 'react';
import type { Veterinarian, ContactStatus } from './types';

export default function VeterinariansPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRecords, setSelectedRecords] = useState<Set<number>>(
    new Set()
  );
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false);
  const [bulkNotesOpen, setBulkNotesOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<Veterinarian | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    contactStatus: 'all',
    profession: 'all',
    state: 'all',
  });

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const { data: vetsData, isLoading: isVetsLoading } = useVetsList(
    currentPage,
    pageSize,
    {
      state: filters.state,
      contactStatus: filters.contactStatus,
      profession: filters.profession,
      search: filters.search,
    }
  );

  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleOpenNotes = (record: Veterinarian) => {
    setActiveRecord(record);
    setNotesDrawerOpen(true);
  };

  const handleAddNote = (recordId: number, note: string) => {
    // TODO: Integrate with API to persist notes
    console.log('Add note to record', recordId, note);
  };

  const handleBulkAddNote = (note: string) => {
    const selectedIds = Array.from(selectedRecords);
    // TODO: Integrate with API to persist bulk notes
    console.log('Bulk add note to records', selectedIds, note);
    setBulkNotesOpen(false);
  };

  const handleBulkUpdateStatus = (
    recordIds: number[],
    newStatus: ContactStatus
  ) => {
    // TODO: Integrate with API to bulk update status
    console.log('Bulk update status', recordIds, newStatus);
  };

  if (isVetsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1
            className="mb-1 text-3xl font-bold tracking-tight"
            style={{ color: '#1f2454' }}
          >
            Veterinarians & Vet Techs
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track outreach to veterinary professionals
          </p>
        </div>

        <FilterBar onFilter={handleFilter} />

        {selectedRecords.size > 0 && (
          <BulkActionsBar
            selectedCount={selectedRecords.size}
            selectedIds={Array.from(selectedRecords)}
            onUpdateStatus={handleBulkUpdateStatus}
            onClearSelection={() => setSelectedRecords(new Set())}
            onOpenBulkNotes={() => setBulkNotesOpen(true)}
          />
        )}

        <VeterinariansTable
          data={vetsData?.data.results || []}
          currentPage={currentPage}
          totalCount={vetsData?.data.count || 0}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
          selectedRecords={selectedRecords}
          onSelectionChange={setSelectedRecords}
          onOpenNotes={handleOpenNotes}
        />

        <NotesDrawer
          open={notesDrawerOpen}
          onOpenChange={setNotesDrawerOpen}
          record={activeRecord}
          onAddNote={handleAddNote}
        />

        <BulkNotesDialog
          open={bulkNotesOpen}
          onOpenChange={setBulkNotesOpen}
          selectedCount={selectedRecords.size}
          onAddNote={handleBulkAddNote}
        />
      </div>
    </AdminLayout>
  );
}
