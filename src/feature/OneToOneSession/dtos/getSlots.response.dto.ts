import { SlotDTO } from './slot.dto';

export type GetSlotsResponseDTO = {
  id: number;
  day: number;
  month: string;
  slots: SlotDTO[];
};
