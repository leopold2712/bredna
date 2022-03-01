import { ClientDTO } from './client.dto';

export type SessionParticipantDTO = {
  id: number;
  client: ClientDTO;
  join_link: string;
  created_at: string;
};
