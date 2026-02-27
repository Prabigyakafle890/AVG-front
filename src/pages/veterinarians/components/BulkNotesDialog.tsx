import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface BulkNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onAddNote: (note: string) => void;
}

export function BulkNotesDialog({
  open,
  onOpenChange,
  selectedCount,
  onAddNote,
}: BulkNotesDialogProps) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!note.trim()) return;
    onAddNote(note.trim());
    setNote('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note to Selected Records</DialogTitle>
          <DialogDescription>
            This note will be added to{' '}
            <Badge variant="secondary" className="mx-1">
              {selectedCount}
            </Badge>{' '}
            selected records.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder="Write a note for all selected records..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-30"
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!note.trim()}>
            Add Note to {selectedCount} Records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
