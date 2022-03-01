export type KlaviyoLoginDTO = {
  email?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  phone_number?: string | undefined;
  expertise?: string | undefined;
  preferred_language?: { name: string | undefined };
};

export type KlaviyoLoginRequestDTO = {
  token: string;
  event: 'LOG IN';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    email: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    phone_number: string | undefined;
    expertise: string | undefined;
    preferred_language: string | undefined;
    created_at: moment.Moment;
  };
};
