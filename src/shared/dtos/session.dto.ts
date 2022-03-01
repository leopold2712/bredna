import { SessionParticipantDTO } from './sessionParticipant.dto';

export type SessionDTO = {
  id: number;
  participants: SessionParticipantDTO[];
  start_time: string;
  end_time: string;
  start_link: string;
  created_at: string;
  show: string;
  type: string;
};
