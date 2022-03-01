import moment from 'moment';
import { SlotDTO } from '../dtos';

export const convertSlotToHourOption = (slot: SlotDTO) => {
  return `${moment(slot.start_time).format('h:mma')} - ${moment(slot.end_time).format('h:mma')}`;
};
