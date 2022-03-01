import { SessionDTO } from './session.dto';
import { SlotStatuses } from '../constants';
import { DefinitionDTO } from './definition.dto';

export type SlotFullInfoDTO = {
  id: string;
  definition_id: number;
  start_time: string;
  end_time: string;
  status: SlotStatuses;
  definition: DefinitionDTO;
  session: SessionDTO;
};
