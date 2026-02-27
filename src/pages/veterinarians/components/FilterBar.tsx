import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import type { ContactStatus } from '../types';

export const CONTACT_STATUSES: { value: ContactStatus; label: string }[] = [
  { value: 'NOT_CONTACTED', label: 'Not Contacted' },
  { value: 'IN_QUEUE', label: 'In Queue' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'FOLLOW_UP_NEEDED', label: 'Follow Up Needed' },
  { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
  { value: 'INTERVIEW_COMPLETED', label: 'Interview Completed' },
  { value: 'HIRED', label: 'Hired' },
  { value: 'NOT_INTERESTED', label: 'Not Interested' },
];

const PROFESSIONS = ['VMD', 'TECH'];

export const US_STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export interface FilterValues {
  search: string;
  contactStatus: string;
  profession: string;
  state: string;
}

interface FilterBarProps {
  filters: FilterValues;
  onFilter: (filters: FilterValues) => void;
}

export function FilterBar({ filters, onFilter }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFilter({ ...filters, search: searchInput });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleClearFilters = () => {
    setSearchInput('');
    onFilter({
      search: '',
      contactStatus: 'all',
      profession: 'all',
      state: 'all',
    });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.contactStatus !== 'all' ||
    filters.profession !== 'all' ||
    filters.state !== 'all';

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">Filters</span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-7 gap-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="min-full relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                onFilter({ ...filters, search: '' });
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select
          value={filters.profession}
          onValueChange={(value) => onFilter({ ...filters, profession: value })}
        >
          <SelectTrigger>
            <span className="text-sm text-gray-500">Profession</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All professions</SelectItem>
            {PROFESSIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.state}
          onValueChange={(value) => onFilter({ ...filters, state: value })}
        >
          <SelectTrigger>
            <span className="text-sm text-gray-500">States</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {US_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.contactStatus}
          onValueChange={(value) =>
            onFilter({ ...filters, contactStatus: value })
          }
        >
          <SelectTrigger>
            <span className="text-sm text-gray-500">Status</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CONTACT_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
