import { NoteDTO } from './note.dto';
import { NodeType } from './nodeType.dto';

export type JourneyDTO = {
  id: number;
  title: string;
  type: NodeType;
  notes: NoteDTO[];
  created_at: string;
  context_id?: number;
  participant_id?: number;
};
