import { Badge } from '@/components/ui/badge';
import { US_STATES } from './FilterBar';

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
