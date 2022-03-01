import { ProductDTO } from './product.dto';

export type PlanDTO = {
  id: number;
  product: ProductDTO;
  total_credits: number;
  used_credits: number;
  expires_at: string;
  last_interaction_made_at: string;
  next_interaction_expected_at: string;
  order_item_id: number;
};
