export type KlaviyoExpertProfileDTO = {
  id: number;
  about: string;
};

export type KlaviyoExpertProfileRequestDTO = {
  token: string;
  event: 'CREATE EXPERT PROFILE';
  customer_properties: {
    email: string | undefined;
    hub_share_link: string | undefined;
  };
  properties: {
    id: number;
    about: string;
    created_at: moment.Moment;
  };
};
