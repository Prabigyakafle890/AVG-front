import type { Veterinarian, ContactStatus } from '../types';
import { formatDate } from '../utils/formatDate';
import { EditVetForm } from './editVeterinarians';
import { Pagination } from './Pagination';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  data: Veterinarian[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  selectedRecords: Set<number>;
  onSelectionChange: (selected: Set<number>) => void;
  onOpenNotes: (record: Veterinarian) => void;
}

const HEADERS = [
  'Name',
  'State',
  'City',
  'County',
  'Profession',
  'License #',
  'Issue Date',
  'Expiration Date',
  'Contact Status',
  'Assigned To',
  'Email',
  'Phone',
  'Notes',
  'Action',
];

const STATUS_CONFIG: Record<ContactStatus, { color: string; label: string }> = {
  NOT_CONTACTED: { color: 'bg-gray-100 text-gray-700', label: 'Not Contacted' },
  CONTACTED: { color: 'bg-emerald-100 text-emerald-700', label: 'Contacted' },
  FOLLOW_UP_NEEDED: {
    color: 'bg-orange-100 text-orange-700',
    label: 'Follow-up Needed',
  },
  INTERVIEW_SCHEDULED: {
    color: 'bg-blue-100 text-blue-700',
    label: 'Interview Scheduled',
  },
  INTERVIEW_COMPLETED: {
    color: 'bg-indigo-100 text-indigo-700',
    label: 'Interview Completed',
  },
  HIRED: { color: 'bg-green-100 text-green-700', label: 'Hired' },
  NOT_INTERESTED: { color: 'bg-red-100 text-red-700', label: 'Not Interested' },
  IN_QUEUE: { color: 'bg-yellow-100 text-yellow-700', label: 'In Queue' },
};

export function VeterinariansTable({
  data,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  selectedRecords,
  onSelectionChange,
  onOpenNotes,
}: Props) {
  const [editingVetId, setEditingVetId] = useState<number | null>(null);

  const allSelected =
    data.length > 0 && data.every((r) => selectedRecords.has(r.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(new Set(data.map((r) => r.id)));
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRecords);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    onSelectionChange(newSelected);
  };

  const formatNotePreview = (notes: string | null) => {
    if (!notes) return 'No notes';
    return notes.length > 80 ? `${notes.slice(0, 80)}...` : notes;
  };

  return (
    <div className="relative">
      {editingVetId !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl">
            <div className="rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-100 shadow-2xl">
              <EditVetForm
                vetId={editingVetId}
                onClose={() => setEditingVetId(null)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {HEADERS.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((vet) => (
                <TableRow
                  key={vet.id}
                  className={selectedRecords.has(vet.id) ? 'bg-blue-50' : ''}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRecords.has(vet.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(vet.id, checked as boolean)
                      }
                    />
                  </TableCell>

                  <TableCell className="font-medium text-gray-900">
                    {vet.fullName}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{vet.state}</Badge>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {vet.city}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {vet.county || '—'}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      style={
                        vet.licenseProfession === 'Veterinarian'
                          ? { backgroundColor: '#e0f2fe', color: '#0369a1' }
                          : { backgroundColor: '#fee2e2', color: '#991b1b' }
                      }
                    >
                      {vet.licenseProfession}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-mono text-sm">
                    {vet.licenseNumber}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {formatDate(vet.issueDate)}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {formatDate(vet.expirationDate)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${STATUS_CONFIG[vet.contactStatus]?.color ?? 'bg-gray-100 text-gray-700'}`}
                    >
                      {STATUS_CONFIG[vet.contactStatus]?.label ??
                        vet.contactStatus}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {vet.assignedTo ? (
                      <span className="text-sm text-gray-700">
                        {vet.assignedTo.fullName.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Unassigned
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {vet.email ? (
                      <a
                        href={`mailto:${vet.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {vet.email}
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {vet.phone || '—'}
                  </TableCell>

                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onOpenNotes(vet)}
                            className="gap-1.5"
                          >
                            {vet.notes ? (
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 px-2 text-xs text-blue-700"
                              >
                                1
                              </Badge>
                            ) : (
                              <span className="text-xs text-gray-400">Add</span>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-white">
                          <p className="text-xs">
                            {formatNotePreview(vet.notes)}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingVetId(vet.id)}
                        aria-label="Edit veterinarian"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete veterinarian"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {data.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            No records found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
