import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { US_STATES } from './FilterBar';

interface SourceStateFilterProps {
  value: string;
  onChange: (state: string) => void;
}

export function SourceStateFilter({ value, onChange }: SourceStateFilterProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-gray-800">
            Data Source State
          </span>
          <span className="text-xs text-gray-400">
            Filter by the state database where this data was scraped from
          </span>
        </div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Source States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Source States</SelectItem>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
