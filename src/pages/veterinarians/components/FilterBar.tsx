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
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
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
    }, 600);

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

  const activeFilterCount = [
    filters.search !== '',
    filters.contactStatus !== 'all',
    filters.profession !== 'all',
    filters.state !== 'all',
  ].filter(Boolean).length;

  const activeSelectClass = 'border-blue-400 bg-blue-50 ring-1 ring-blue-200';

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm min-w-70 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, phone, license..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`pl-9 ${filters.search ? 'border-blue-400 ring-1 ring-blue-200' : ''}`}
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
          value={filters.state}
          onValueChange={(value) => onFilter({ ...filters, state: value })}
        >
          <SelectTrigger
            className={`w-37.5 ${filters.state !== 'all' ? activeSelectClass : ''}`}
          >
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
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
          <SelectTrigger
            className={`w-50 ${filters.contactStatus !== 'all' ? activeSelectClass : ''}`}
          >
            <SelectValue placeholder="Contact Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {CONTACT_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.profession}
          onValueChange={(value) => onFilter({ ...filters, profession: value })}
        >
          <SelectTrigger
            className={`w-42.5 ${filters.profession !== 'all' ? activeSelectClass : ''}`}
          >
            <SelectValue placeholder="Profession" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Professions</SelectItem>
            {PROFESSIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            Clear All
            <Badge
              variant="secondary"
              className="ml-0.5 bg-red-100 px-1.5 text-xs text-red-700"
            >
              {activeFilterCount}
            </Badge>
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-500">Active filters:</span>
          {filters.search && (
            <Badge
              variant="secondary"
              className="gap-1 bg-blue-50 text-blue-700"
            >
              Search: "{filters.search}"
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  onFilter({ ...filters, search: '' });
                }}
                className="ml-0.5 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.state !== 'all' && (
            <Badge
              variant="secondary"
              className="gap-1 bg-blue-50 text-blue-700"
            >
              State: {filters.state}
              <button
                type="button"
                onClick={() => onFilter({ ...filters, state: 'all' })}
                className="ml-0.5 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.contactStatus !== 'all' && (
            <Badge
              variant="secondary"
              className="gap-1 bg-blue-50 text-blue-700"
            >
              Status:{' '}
              {CONTACT_STATUSES.find((s) => s.value === filters.contactStatus)
                ?.label ?? filters.contactStatus}
              <button
                type="button"
                onClick={() => onFilter({ ...filters, contactStatus: 'all' })}
                className="ml-0.5 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.profession !== 'all' && (
            <Badge
              variant="secondary"
              className="gap-1 bg-blue-50 text-blue-700"
            >
              Profession: {filters.profession}
              <button
                type="button"
                onClick={() => onFilter({ ...filters, profession: 'all' })}
                className="ml-0.5 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
