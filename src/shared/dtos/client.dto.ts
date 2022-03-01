import { PlanDTO } from './plan.dto';
import { SimpleType } from './simple.dto';

export type ClientDTO = {
  id: number;
  name: string;
  email: string;
  thumbnail: string;
  current_plans: PlanDTO[];
  tags: SimpleType[];
  last_order_placed_at: string;
  updated_at: string;
};
