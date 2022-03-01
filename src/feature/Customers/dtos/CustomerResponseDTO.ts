import { TagType } from '../models';
import { OrderDTO } from './OrderDTO';
import { TimelineDTO } from './TimelineDTO';

export type CustomerResponseDTO = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  thumbnail: string;
  nickname: string;
  notes: string;
  purchases_count: number;
  orders: OrderDTO[];
  timeline: TimelineDTO[];
  tags: TagType[];
};
