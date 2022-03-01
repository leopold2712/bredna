import { EventInput } from '@fullcalendar/react';
import moment from 'moment';
import { SlotStatuses } from '../../../../../constants/slotStatuses';
import { SlotDTO } from '../../../../../dtos/slot.dto';
import { Colors, ColorsType } from '../constants/colors';

const getSlotBackground = (slot: SlotDTO, colors?: ColorsType): string => {
  if (colors) {
    if (moment(slot.end_time).isSameOrAfter(moment())) return colors[slot.status];
    const key = `${slot.status}_past`;
    return colors[key as Colors];
  }
  return Colors.DEFAULT;
};

const createSlot = (
  currentSlot: SlotDTO,
  tempSlot?: SlotDTO,
  relatedSlots?: SlotDTO[],
  colors?: ColorsType,
): EventInput => ({
  id: tempSlot ? tempSlot.id : currentSlot.id,
  start: tempSlot ? tempSlot.start_time : currentSlot.start_time,
  end: currentSlot.end_time,
  className:
    currentSlot.status === SlotStatuses.VACANT
      ? 'schedule--availableSlotBorder'
      : 'schedule--slotBorder',
  textColor: '#596172',
  backgroundColor: getSlotBackground(currentSlot, colors),
  title: currentSlot.status === 'booked' ? currentSlot.subtitle : '',
  extendedProps: {
    relatedSlots,
  },
});

export const convertSchedule = (schedule: SlotDTO[], colors: ColorsType): EventInput[] => {
  const slots: EventInput[] = [];

  const slotsByDefinitionOrSessions: { [key: number]: SlotDTO[] } = {};

  schedule.forEach((slot) => {
    if (slot.session_id === null)
      slotsByDefinitionOrSessions[slot.definition_id] = [
        ...(slotsByDefinitionOrSessions[slot.definition_id]
          ? slotsByDefinitionOrSessions[slot.definition_id]
          : []),
        slot,
      ];
    else
      slotsByDefinitionOrSessions[slot.session_id] = [
        ...(slotsByDefinitionOrSessions[slot.session_id]
          ? slotsByDefinitionOrSessions[slot.session_id]
          : []),
        slot,
      ];
  });

  Object.values(slotsByDefinitionOrSessions).forEach((value) => {
    const sortedSchedule = [...value].sort((a, b) =>
      moment(a.start_time) > moment(b.start_time) ? 1 : -1,
    );

    let tempSlots: SlotDTO[] = [];

    const createAndPushSlot = (scheduleSlot: SlotDTO) => {
      const slot = createSlot(scheduleSlot, tempSlots[0], [...tempSlots], colors);
      slots.push(slot);
      tempSlots = [];
    };

    const createSlotFromTemp = (newSlot: SlotDTO) => {
      const slot = createSlot(
        tempSlots[tempSlots.length - 1],
        tempSlots[0],
        [...tempSlots],
        colors,
      );
      slots.push(slot);
      tempSlots = [newSlot];
    };

    sortedSchedule.forEach((el) => {
      if (tempSlots.length === 0) tempSlots.push(el);
      else {
        const lastIndex = tempSlots.length - 1;
        if (
          el.start_time === tempSlots[lastIndex].end_time &&
          tempSlots[lastIndex].status === el.status &&
          (el.status !== 'booked' ||
            (el.status === 'booked' && el.session_id === tempSlots[lastIndex].session_id))
        ) {
          tempSlots.push(el);
        } else {
          createSlotFromTemp(el);
        }
      }
    });

    if (tempSlots.length) createAndPushSlot(tempSlots[tempSlots.length - 1]);
  });

  return slots;
};
