import { Badge } from '@/components/ui/badge';

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

interface SourceStateFilterProps {
  value: string;
  onChange: (state: string) => void;
}

export function SourceStateFilter({ value, onChange }: SourceStateFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-gray-600">State:</span>
      <Badge
        variant={value === 'all' ? 'default' : 'outline'}
        className="cursor-pointer transition-colors"
        onClick={() => onChange('all')}
      >
        All
      </Badge>
      {US_STATES.map((state) => (
        <Badge
          key={state}
          variant={value === state ? 'default' : 'outline'}
          className="cursor-pointer transition-colors"
          onClick={() => onChange(state)}
        >
          {state}
        </Badge>
      ))}
    </div>
  );
}
