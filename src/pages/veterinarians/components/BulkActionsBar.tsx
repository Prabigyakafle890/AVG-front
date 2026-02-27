import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, X, MessageSquare } from 'lucide-react';
import type { ContactStatus } from '../types';
import { CONTACT_STATUSES } from './FilterBar';

interface BulkActionsBarProps {
  selectedCount: number;
  selectedIds: number[];
  onUpdateStatus: (recordIds: number[], newStatus: ContactStatus) => void;
  onClearSelection: () => void;
  onOpenBulkNotes: () => void;
}

export function BulkActionsBar({
  selectedCount,
  selectedIds,
  onUpdateStatus,
  onClearSelection,
  onOpenBulkNotes,
}: BulkActionsBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
      <Badge variant="default" className="bg-blue-600 text-white">
        {selectedCount} selected
      </Badge>

      <div className="h-4 w-px bg-blue-200" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            Update Status
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {CONTACT_STATUSES.map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => onUpdateStatus(selectedIds, status.value)}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={onOpenBulkNotes}
        className="gap-1"
      >
        <MessageSquare className="h-4 w-4" />
        Add Notes
      </Button>

      <div className="ml-auto">
        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          <X className="mr-1 h-4 w-4" />
          Clear Selection
        </Button>
      </div>
    </div>
  );
}
