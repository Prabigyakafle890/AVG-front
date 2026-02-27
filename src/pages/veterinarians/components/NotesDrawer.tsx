import { useState } from 'react';
import type { Veterinarian } from '../types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';

interface NotesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: Veterinarian | null;
  onAddNote: (recordId: number, note: string) => void;
}

export function NotesDrawer({
  open,
  onOpenChange,
  record,
  onAddNote,
}: NotesDrawerProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (!record || !newNote.trim()) return;
    onAddNote(record.id, newNote.trim());
    setNewNote('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-100 sm:max-w-100">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Notes for {record?.fullName}
          </SheetTitle>
          <SheetDescription>
            View and add notes for this veterinary professional.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto">
            {record?.notes ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="text-sm whitespace-pre-wrap text-gray-700">
                  {record.notes}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare className="mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">No notes yet</p>
                <p className="text-xs text-gray-400">
                  Add a note below to get started
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3 border-t pt-4">
            <Textarea
              placeholder="Write a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-25 resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={!newNote.trim()}
              className="w-full"
            >
              <Send className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
