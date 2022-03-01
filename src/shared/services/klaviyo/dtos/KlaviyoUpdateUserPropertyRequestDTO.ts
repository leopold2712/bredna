export type KlaviyoUserPropertiesDTO = {
  had_customer?: boolean;
  had_order?: boolean;
  has_future_event?: boolean;
  have_experts?: boolean;
  last_active?: moment.Moment;
  last_order?: moment.Moment;
};

export type KlaviyoUpdateUserPropertyRequestDTO = {
  token: string;
  properties: { email: string | undefined } & KlaviyoUserPropertiesDTO;
};
