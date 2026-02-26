import type { Veterinarian, ContactStatus } from '../types';
import { formatDate } from '../utils/formatDate';
import { EditVetForm } from './editVeterinarians';
import { useState } from 'react';

interface Props {
  data: Veterinarian[];
}

const statusBadgeConfig: Record<
  ContactStatus,
  { color: string; label: string }
> = {
  NOT_CONTACTED: {
    color: 'bg-gray-100 text-gray-800',
    label: 'Not Contacted',
  },
  INTERVIEW_SCHEDULED: {
    color: 'bg-blue-100 text-blue-800',
    label: 'Interview Scheduled',
  },
  NOT_INTERESTED: {
    color: 'bg-red-100 text-red-800',
    label: 'Not Interested',
  },
  IN_QUEUE: {
    color: 'bg-yellow-100 text-yellow-800',
    label: 'In Queue',
  },
};

const formatStatus = (status: ContactStatus): string => {
  return statusBadgeConfig[status]?.label || status.replace(/_/g, ' ');
};

export function VeterinariansTable({ data }: Props) {
  console.log('Vets', data);

  const tableHeaders = [
    'Name',
    'State',
    'County',
    'Profession',
    'License #',
    'Issue Date',
    'Expiration Date',
    'Assigned to',
    'Status',
    'Phone',
    'Email',
    'Action',
  ];

  const [editingVetId, setEditingVetId] = useState<number | null>(null);

  const handleClose = () => setEditingVetId(null);

  return (
    <div className="relative">
      {editingVetId !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative my-8 w-full max-w-2xl">
            <div className="rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-100 shadow-2xl">
              <EditVetForm vetId={editingVetId} onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {tableHeaders.map((header) => (
                <th key={header} className="divide-y divide-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((vet) => (
              <tr
                key={vet.id}
                className="transition-colors duration-150 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">
                  {vet.fullName}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {vet.state}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {vet.city}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {vet.county || '—'}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {vet.licenseProfession}
                </td>
                <td className="px-4 py-3 font-mono text-sm whitespace-nowrap text-gray-600">
                  {vet.licenseNumber}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {formatDate(vet.issueDate)}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {formatDate(vet.expirationDate)}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeConfig[vet.contactStatus]?.color || 'bg-gray-100 text-gray-800'}`}
                  >
                    {formatStatus(vet.contactStatus)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                  {vet.assignedTo ?? (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
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
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <button
                    onClick={() => setEditingVetId(vet.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Showing {data.length} record{data.length !== 1 ? 's' : ''}
          </div>
        )}

        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No veterinarians found
          </div>
        )}
      </div>
    </div>
  );
}
