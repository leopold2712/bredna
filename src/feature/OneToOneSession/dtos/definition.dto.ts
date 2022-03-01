import { DaysOfWeek } from '../../../shared/constants/dates';
import { RepeatCaps, SlotScheduleOptions } from '../constants';

export type DefinitionDTO = {
  id: number;
  starts_at: string;
  ends_at: string;
  repeat_schedule: SlotScheduleOptions;
  repeat_cycle: number;
  repeat_on: DaysOfWeek[];
  repeat_cap: RepeatCaps;
  repeat_until: string | number;
};
