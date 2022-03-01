export type KlaviyoVodDTO = {
  name?: string;
  subtitle?: string;
  description?: string;
  disclaimer?: string;
  price?: string | number;
  currency?: string;
  video_duration?: string;
  exclude_from_pass?: boolean;
  confirmation_message?: string | null;
  link?: string;
};

export type KlaviyoPublishVodRequestDTO = {
  token: string;
  event: 'PUBLISH VOD';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    title: string | undefined;
    subtitle: string | undefined;
    video_description: string | undefined;
    video: string | undefined;
    price: string | number | undefined;
    currency: string | undefined;
    duration: string | undefined;
    eligibility: boolean | undefined;
    disclaimer: string | undefined;
    confirmation_message: string | undefined | null;
    created_at: moment.Moment;
  };
};
