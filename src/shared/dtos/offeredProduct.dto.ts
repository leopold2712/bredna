import { ProductTypes } from '../constants/products.types';
import { ValidityTypes } from '../constants/validityTypes';

export type OfferedProductDTO = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  type: ProductTypes;
  credits: number;
  validity_type: ValidityTypes;
  validity_period: number;
  auto_renew: boolean;
  default_price: {
    format: string;
    currency: string;
    cents: number;
    value: number;
  };
};
