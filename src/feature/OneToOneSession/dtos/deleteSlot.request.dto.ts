import { SessionScopeTypes } from './scopeTypes.dto';

export type DeleteSlotRequestDTO = {
  id?: string;
  display_start_time: number;
  display_end_time: number;
  scope: SessionScopeTypes;
};
