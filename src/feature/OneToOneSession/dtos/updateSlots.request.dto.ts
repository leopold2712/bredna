import { RepeatCaps } from '../constants';

export type UpdateSlotsRequestDTO = {
  display_start_time: number;
  display_end_time: number;
  starts_at: number;
  ends_at: number;
  repeat_schedule?: string;
  repeat_cycle?: number;
  repeat_on?: string[];
  repeat_cap?: RepeatCaps;
  repeat_until?: number;
};
