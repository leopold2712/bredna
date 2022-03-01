export type KlaviyoHubDTO = {
  name?: string;
  description?: string;
  cover?: string;
  categories?: number[];
};

export type KlaviyoPublishHubRequestDTO = {
  token: string;
  event: 'PUBLISH HUB';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    name: string | undefined;
    hub_description: string | undefined;
    expertise: string | undefined;
    share_link: string | undefined;
    cover: string | undefined;
    status: string;
    created_at: moment.Moment;
  };
};
