import { SlotDTO } from './slot.dto';

export type ScheduleDTO = {
  day: number;
  id: number;
  month: number;
  slots: SlotDTO[];
};
