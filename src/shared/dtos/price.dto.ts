export type PriceDTO = {
  format: string;
  currency: 'ils' | 'usd';
  cents: number;
  value: number;
};
