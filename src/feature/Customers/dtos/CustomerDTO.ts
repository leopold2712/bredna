import { TagType } from '../models';

export type CustomersPlan = {
  name: string;
  valid_until?: string;
  remaining_credits?: number;
  total_credits?: number;
};

export type CustomerDTO = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  thumbnail: string;
  purchases_count: number;
  last_purchase_made_at: Date;
  registered_at: Date;
  tags: TagType[];
  current_plan: CustomersPlan | null;
};
