import { SimpleType } from '../../../shared/dtos/simple.dto';

export type ClientsTableRow = {
  id: string;
  name: string;
  thumbnail: string;
  currentPlan: string;
  expiredAt: string;
  usage: string;
  lastInteractionDate: string;
  nextInteractionDate: string;
  tags: SimpleType[];
};
