import { SlotStatuses } from '../constants/slotStatuses';

export type SlotsDTO = {
  id: number;
  day: number;
  month: number;
  slots: [
    {
      id: number;
      definition_id: number;
      start_time: number;
      end_time: number;
      status: SlotStatuses;
    },
  ];
};
