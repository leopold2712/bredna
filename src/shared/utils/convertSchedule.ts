import { EventInput } from '@fullcalendar/react';
import { SlotStatuses } from '../constants/slotStatuses';
import { SlotsDTO } from '../dtos/slots.dto';
import { GetSlotsResponseDTO } from '../../feature/OneToOneSession/dtos/getSlots.response.dto';

export const convertSchedule = (
  schedule: GetSlotsResponseDTO[],
  colors: { [key: string]: string },
): EventInput[] => {
  const result: EventInput[] = [];

  if (!schedule) return result;
  schedule?.forEach((day) => {
    day.slots.forEach((slot) => {
      result.push({
        id: slot.id.toString(),
        start: slot.start_time,
        end: slot.end_time,
        className: slot.status === SlotStatuses.VACANT ? 'availableSlotBorder' : 'slotBorder',
        textColor: '#596172',
        backgroundColor: colors[slot.status],
        title: '',
      });
    });
  });

  return result;
};
