import { ValidityTypes } from '../constants/validityTypes';
import { ProductTypes } from '../constants/products.types';
import { PriceDTO } from './price.dto';

export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  type: ProductTypes;
  credits: number;
  validity_type: ValidityTypes;
  validity_period: number;
  auto_renew: boolean;
  default_price: PriceDTO;
};
