import { NoteDTO } from './note.dto';

export type MessagingDTO = {
  id: number;
  title: string;
  type: string;
  notes: NoteDTO[];
  created_at: string;
};
