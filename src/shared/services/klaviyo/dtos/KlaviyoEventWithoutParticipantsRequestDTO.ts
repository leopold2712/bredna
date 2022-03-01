export type KlaviyoEventWithoutParticipantsRequestDTO = {
  token: string;
  event: 'EVENT WITHOUT PARTICIPANTS';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    email: string | undefined;
    created_at: moment.Moment;
  };
};
