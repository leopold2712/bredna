import { SlotStatuses, SlotScheduleOptions, RepeatCaps } from '.';
import { NodeType } from '../../../shared/constants/node.types';
import { initialPagination } from '../../../shared/constants/pagination';
import { SlotFullInfoDTO } from '../dtos';

export const defaultDefinition = {
  id: 0,
  starts_at: new Date().toISOString(),
  ends_at: new Date().toISOString(),
  repeat_schedule: SlotScheduleOptions.NONE,
  repeat_cycle: 1,
  repeat_on: [],
  repeat_cap: RepeatCaps.OCCURRENCES,
  repeat_until: new Date().toISOString(),
};

export const initialValues: SlotFullInfoDTO = {
  id: '',
  definition_id: 0,
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  status: SlotStatuses.BOOKED,
  definition: defaultDefinition,
  session: {
    id: 0,
    start_time: new Date().toISOString(),
    end_time: new Date().toISOString(),
    start_link: null,
    created_at: new Date().toISOString(),
    participants: [
      {
        id: 0,
        client: {
          name: '',
          email: '',
          id: 0,
          thumbnail: '',
          current_plans: [],
          tags: [],
          last_order_placed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        created_at: new Date().toISOString(),
        join_link: null,
      },
    ],
    notes: [
      {
        id: 0,
        body: '',
        created_at: new Date().toISOString(),
      },
    ],
  },
};

export const initialJourney = {
  id: 0,
  title: '',
  type: NodeType.Sessions,
  notes: [],
  created_at: '',
};

export const initialNotices = {
  list: [],
  pagination: initialPagination,
  isEmptySearch: false,
};
