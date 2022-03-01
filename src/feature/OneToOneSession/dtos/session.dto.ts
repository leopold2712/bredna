import { ClientDTO } from '../../../shared/dtos/client.dto';
import { SessionNoteDTO } from './sessionNote.dto';

export type SessionDTO = {
  id: number;
  start_time: string;
  end_time: string;
  start_link: string | null;
  created_at: string;
  participants: {
    client: ClientDTO;
    created_at: string;
    id: number;
    join_link: string | null;
  }[];
  notes: SessionNoteDTO[];
};
