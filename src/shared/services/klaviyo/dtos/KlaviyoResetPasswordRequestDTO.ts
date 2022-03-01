export type KlaviyoResetPasswordRequestDTO = {
  token: string;
  event: 'RESET PASSWORD';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    email: string | undefined;
    created_at: moment.Moment;
  };
};
