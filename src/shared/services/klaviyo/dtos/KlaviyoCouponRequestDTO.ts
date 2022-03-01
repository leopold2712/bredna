export type KlaviyoCouponDTO = {
  name: string;
  discount_amount?: number;
  discount_currency?: string;
  discount_percent?: number;
  expires_at: number;
};

export type KlaviyoCouponRequestDTO = {
  token: string;
  event: 'CREATE COUPON';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    code: string;
    expires_at: moment.Moment;
    type: string;
    discount_amount: number | undefined;
    discount_currency: string | undefined;
    discount_percent: number | undefined;
    created_at: moment.Moment;
  };
};
