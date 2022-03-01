import { LanguageDTO } from '../../../dtos';

export type KlaviyoProfileDTO = {
  first_name?: string;
  last_name?: string;
  about?: string;
  languages?: LanguageDTO[];
  skills?: { id: number; name: string }[];
};

export type KlaviyoUpdateProfileRequestDTO = {
  token: string;
  event: 'UPDATE EXPERT PROFILE';
  customer_properties: {
    email: string | undefined;
    about: string | undefined;
    languages: string | undefined;
    share_link: string | undefined;
    skills: string | undefined;
  };
  properties: {
    email: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    phone_number: string | undefined;
    expertise: string | undefined;
    expected_growth_30d: number | undefined;
    expected_growth_90d: number | undefined;
    about: string | undefined;
    languages: string | undefined;
    share_link: string | undefined;
    skills: string | undefined;
    created_at: moment.Moment;
  };
};
