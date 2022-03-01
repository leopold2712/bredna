import { TagType } from '../models';

export type OrderDTO = {
  id: number;
  order_number: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    thumbnail: string;
  };
  order_items: OrderItemDTO[];
  total: {
    format: string;
    currency: string;
    cents: number;
    value: number;
  };
  status: string;
  tags: TagType[];
  created_at: string;
};

export type OrderItemDTO = {
  id: number;
  quantity: number;
  price: {
    format: string;
    currency: string;
    cents: number;
    value: number;
  };
  product: {
    id: number;
    name: string;
    hub: {
      id: number;
      name: string;
      cover: string;
      created_at: string;
    };
    owner: {
      id: number;
      first_name: string;
      last_name: string;
      thumbnail: string;
      reviews_count: number;
      avg_rating: number;
      created_at: string;
    };
    thumbnail: string;
    cropped_thumbnail: string;
    price: {
      format: string;
      currency: string;
      cents: number;
      value: number;
    };
    clients_joined: number;
    clients_cancelled: number;
    type: string;
    status: string;
    created_at: string;
  };
};
