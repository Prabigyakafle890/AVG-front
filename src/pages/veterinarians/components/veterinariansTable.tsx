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

interface Props {
  data: Veterinarian[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const STATUS: Record<ContactStatus, { color: string; label: string }> = {
  NOT_CONTACTED: { color: 'bg-gray-100 text-gray-800', label: 'Not Contacted' },
  CONTACTED: { color: 'bg-emerald-100 text-emerald-800', label: 'Contacted' },
  FOLLOW_UP_NEEDED: {
    color: 'bg-orange-100 text-orange-800',
    label: 'Follow Up Needed',
  },
  INTERVIEW_SCHEDULED: {
    color: 'bg-blue-100 text-blue-800',
    label: 'Interview Scheduled',
  },
  INTERVIEW_COMPLETED: {
    color: 'bg-indigo-100 text-indigo-800',
    label: 'Interview Completed',
  },
  HIRED: { color: 'bg-green-100 text-green-800', label: 'Hired' },
  NOT_INTERESTED: { color: 'bg-red-100 text-red-800', label: 'Not Interested' },
  IN_QUEUE: { color: 'bg-yellow-100 text-yellow-800', label: 'In Queue' },
};

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
  'Assigned to',
  'Phone',
  'Email',
  'Action',
];

export function VeterinariansTable({
  data,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const [editingVetId, setEditingVetId] = useState<number | null>(null);

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

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {HEADERS.map((h) => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((vet) => (
              <TableRow key={vet.id}>
                <TableCell className="font-medium text-gray-900">
                  {vet.fullName}
                </TableCell>

                <TableCell>{vet.state}</TableCell>
                <TableCell>{vet.city}</TableCell>
                <TableCell>{vet.county || '—'}</TableCell>
                <TableCell>{vet.licenseProfession}</TableCell>

                <TableCell className="font-mono">{vet.licenseNumber}</TableCell>

                <TableCell>{formatDate(vet.issueDate)}</TableCell>
                <TableCell>{formatDate(vet.expirationDate)}</TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS[vet.contactStatus].color}`}
                  >
                    {STATUS[vet.contactStatus].label}
                  </span>
                </TableCell>

                <TableCell>
                  {vet.assignedTo?.fullName ?? (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </TableCell>

                <TableCell>{vet.phone || '—'}</TableCell>

                <TableCell>
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

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingVetId(vet.id)}
                      aria-label="Edit veterinarian"
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete veterinarian"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {data.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        ) : (
          <div className="py-8 text-center text-gray-500">
            No veterinarians found
          </div>
        )}
      </div>
    </div>
  );
}
