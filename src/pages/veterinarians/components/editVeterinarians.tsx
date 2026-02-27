import { useState, useEffect } from 'react';
import {
  useDetailVeterinarians,
  useEditVeterinarians,
} from '../hooks/useVetsList';
import type { VetEditPayload } from '../types';
import { Button } from '@/components/ui/button';

type Props = {
  vetId: number;
  onClose: () => void;
};

export const EditVetForm = ({ vetId, onClose }: Props) => {
  const { data, isLoading } = useDetailVeterinarians(vetId);
  const { mutate: updateVet, isPending: isSaving } = useEditVeterinarians();

  const [formData, setFormData] = useState<Partial<VetEditPayload>>({});

  useEffect(() => {
    if (data?.data) {
      const { id, assignedTo, addedBy, ...editable } = data.data;
      setFormData(editable);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateVet(
      { id: vetId, payload: formData },
      {
        onSuccess: () => onClose(),
        onError: (error) => console.error('Update failed:', error),
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-lg border border-gray-100 bg-white p-5 shadow-md"
    >
      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Edit Veterinarian
        </h2>
        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
          ID: {vetId}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            First Name
          </label>
          <input
            name="firstName"
            value={formData.firstName ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Email
          </label>
          <input
            name="email"
            value={formData.email ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Phone
          </label>
          <input
            name="phone"
            value={formData.phone ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            State
          </label>
          <input
            name="state"
            value={formData.state ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            City
          </label>
          <input
            name="city"
            value={formData.city ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            County
          </label>
          <input
            name="county"
            value={formData.county ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Zip Code
          </label>
          <input
            name="zipCode"
            value={formData.zipCode ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            License #
          </label>
          <input
            name="licenseNumber"
            value={formData.licenseNumber ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Profession
          </label>
          <input
            name="licenseProfession"
            value={formData.licenseProfession ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Issue Date
          </label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate?.split('T')[0] ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Expiration
          </label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate?.split('T')[0] ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Status
          </label>
          <input
            name="status"
            value={formData.status ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Contact Status
          </label>
          <input
            name="contactStatus"
            value={formData.contactStatus ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Assigned To
          </label>
          <input
            name="assignedTo"
            value={data?.data?.assignedTo?.fullName ?? ''}
            readOnly
            className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm text-gray-500 transition outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Notes
          </label>
          <input
            name="notes"
            value={formData.notes ?? ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-200 p-2 text-sm transition outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isSaving}>
          {isSaving ? (
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Saving</span>
            </span>
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </form>
  );
};
