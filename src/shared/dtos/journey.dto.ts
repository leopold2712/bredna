import { NodeType } from '../constants/node.types';
import { NoteDTO } from './note.dto';

export type JourneyDTO = {
  id: number;
  title: string;
  type: NodeType;
  notes: NoteDTO[];
  created_at: string;
};
