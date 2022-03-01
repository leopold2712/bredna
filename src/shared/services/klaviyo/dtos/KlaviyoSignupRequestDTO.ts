export type KlaviyoSignupDTO = {
  email?: string;
  first_name?: string;
  last_name?: string;
};

export type KlaviyoSignupRequestDTO = {
  token: string;
  event: 'SIGN UP';
  customer_properties: KlaviyoSignupDTO;
  properties: KlaviyoSignupDTO & { created_at: moment.Moment };
};
