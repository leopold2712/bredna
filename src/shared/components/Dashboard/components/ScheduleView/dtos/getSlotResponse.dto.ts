import { SlotDTO } from '../../../../../dtos/slot.dto';

export type GetSlotsResponseDTO = {
  id: number;
  day: number;
  month: string;
  slots: SlotDTO[];
};
