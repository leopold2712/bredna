export type KlaviyoEventDTO = {
  name: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  price: number;
  currency: string;
  starts_at: string | number;
  exclude_from_pass: boolean;
  confirmation_message: string;
  participant_limit: number;
  cancellation_buffer: number;
  link?: string | null;
  instruction_language_id: number;
  thumbnail: string | null;
};

export type KlaviyoPublishEventRequestDTO = {
  token: string;
  event: 'PUBLISH EVENT';
  customer_properties: {
    email: string | undefined;
  };
  properties: {
    title: string;
    subtitle: string;
    event_description: string;
    image: string | null;
    price: number;
    currency: string;
    date: string;
    time: string;
    exclude_from_pass: boolean;
    confirmation_message: string;
    participant_limit: number;
    language: string | undefined;
    cancellation_window: number;
    disclaimer: string;
    link?: string | null;
    created_at: moment.Moment;
  };
};
