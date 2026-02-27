import { useState } from 'react';
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

const CONTACT_STATUSES: { value: ContactStatus; label: string }[] = [
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

const US_STATES = [
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
  onFilter: (filters: FilterValues) => void;
}

export function FilterBar({ onFilter }: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [contactStatus, setContactStatus] = useState('all');
  const [profession, setProfession] = useState('all');
  const [state, setState] = useState('all');

  const current = () => ({ search, contactStatus, profession, state });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilter({ ...current(), search: value });
  };

  const handleStatusChange = (value: string) => {
    setContactStatus(value);
    onFilter({ ...current(), contactStatus: value });
  };

  const handleProfessionChange = (value: string) => {
    setProfession(value);
    onFilter({ ...current(), profession: value });
  };

  const handleStateChange = (value: string) => {
    setState(value);
    onFilter({ ...current(), state: value });
  };

  const handleClearFilters = () => {
    setSearch('');
    setContactStatus('all');
    setProfession('all');
    setState('all');
    onFilter({
      search: '',
      contactStatus: 'all',
      profession: 'all',
      state: 'all',
    });
  };

  const hasActiveFilters =
    search !== '' ||
    contactStatus !== 'all' ||
    profession !== 'all' ||
    state !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative max-w-sm min-w-50 flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name, email, phone, license..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={state} onValueChange={handleStateChange}>
        <SelectTrigger className="w-36">
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

      <Select value={contactStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-45">
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

      <Select value={profession} onValueChange={handleProfessionChange}>
        <SelectTrigger className="w-50">
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

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
