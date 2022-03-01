import { ProductPriceDTO } from './productPrice.dto';

export enum ProductTypes {
  IndividualTherapyTrial = 'IndividualTherapyTrial',
  ChatPass = 'ChatPass',
  ChatComboPass = 'ChatComboPass',
  IndividualTherapyPunchCard = 'IndividualTherapyPunchCard',
}
export type ProductType = `${ProductTypes}`;

export enum ValidityTypes {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  quarterly = 'quarterly',
  yearly = 'yearly',
}
export type ValidityType = `${ValidityTypes}`;

export type ProductBaseDTO = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  type: ProductType;
  credits: number;
  validity_type: ValidityType;
  validity_period: number;
  auto_renew: boolean;
  default_price: ProductPriceDTO;
};
