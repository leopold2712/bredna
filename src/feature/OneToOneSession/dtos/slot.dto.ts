import { SlotStatuses } from '../constants';

export type SlotDTO = {
  id: string;
  definition_id: number;
  start_time: string;
  end_time: string;
  status: SlotStatuses;
  title: string;
  subtitle: string;
  session_id: number | null;
};
