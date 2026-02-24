import type { Veterinarian, ContactStatus } from '../types';
import { formatDate } from '../utils/formatDate';

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
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              State
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              City
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Country
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Profession
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              License #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              License Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Registered Through
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Assigned To
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Email
            </th>
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
  );
}
