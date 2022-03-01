export type KlaviyoUpdateMeDTO = {
  email?: string | undefined;
  phone_number?: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
};

export type KlaviyoUpdateMeRequestDTO = {
  token: string;
  event: 'UPDATE ME';
  customer_properties: KlaviyoUpdateMeDTO;
  properties: KlaviyoUpdateMeDTO & { created_at: moment.Moment };
};
